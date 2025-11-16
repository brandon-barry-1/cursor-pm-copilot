/// <reference path="../../global.d.ts" />
import { z } from "zod";

type DriveAuth = { headers: Record<string, string>; authMode: "oauth" | "apiKey" };

function getAuth(): DriveAuth | string {
    const oauthToken = process.env.GOOGLE_OAUTH_TOKEN;
    const apiKey = process.env.GOOGLE_API_KEY;

    if (oauthToken) {
        return { headers: { Authorization: `Bearer ${oauthToken}` }, authMode: "oauth" };
    }

    if (apiKey) {
        return { headers: {}, authMode: "apiKey" };
    }

    return "Set GOOGLE_OAUTH_TOKEN for private Drive access (recommended). GOOGLE_API_KEY works only for public files.";
}

function buildMimeTypeFilter(fileType: "document" | "spreadsheet" | "presentation" | "all") {
    if (fileType === "document") return " and mimeType='application/vnd.google-apps.document'";
    if (fileType === "spreadsheet") return " and mimeType='application/vnd.google-apps.spreadsheet'";
    if (fileType === "presentation") return " and mimeType='application/vnd.google-apps.presentation'";
    return "";
}

async function handleDriveError(res: Response) {
    const body = await res.text();
    const hint =
        res.status === 401 || res.status === 403
            ? " (check GOOGLE_OAUTH_TOKEN scopes and that the file is accessible)"
            : "";
    return `Google Drive API error: ${res.status} ${res.statusText}${hint} | ${body.slice(0, 300)}`;
}

export default defineTool({
    name: "queryGoogleDrive",
    description: "Query Google Drive: search/list, file metadata, folder listing, or export file contents for docs.",
    parameters: z.object({
        query: z
            .enum(["search", "file", "folder", "list", "export"])
            .describe("'search' | 'file' | 'folder' | 'list' | 'export'") ,
        searchQuery: z
            .string()
            .optional()
            .describe("For 'search': query string"),
        fileId: z
            .string()
            .optional()
            .describe("For 'file' or 'export': Google Drive file ID"),
        folderId: z
            .string()
            .optional()
            .describe("For 'folder': Google Drive folder ID"),
        fileType: z
            .enum(["document", "spreadsheet", "presentation", "all"])
            .optional()
            .default("all")
            .describe("Filter by file type (search/list)"),
        limit: z
            .number()
            .optional()
            .default(10)
            .describe("Max results for search/list"),
        exportMime: z
            .enum(["text/plain", "text/csv", "application/pdf"])
            .optional()
            .default("text/plain")
            .describe("For 'export': mime type. Docs/Slides -> text/plain/pdf; Sheets -> text/csv/text/plain."),
    }),
    async execute({ query, searchQuery, fileId, folderId, fileType, limit, exportMime }) {
        try {
            const baseUrl = "https://www.googleapis.com/drive/v3";
            const auth = getAuth();

            if (typeof auth === "string") {
                return auth;
            }

            const headers = auth.headers;

            if (query === "search" && searchQuery) {
                const mimeTypeFilter = buildMimeTypeFilter(fileType);
                const q = `name contains '${searchQuery}' or fullText contains '${searchQuery}'${mimeTypeFilter} and trashed=false`;
                const url = `${baseUrl}/files?q=${encodeURIComponent(q)}&pageSize=${limit}&fields=files(id,name,mimeType,webViewLink,modifiedTime,createdTime)`;
                const res = await fetch(auth.authMode === "apiKey" ? `${url}&key=${process.env.GOOGLE_API_KEY}` : url, { headers });
                if (!res.ok) return handleDriveError(res);
                const data = await res.json();
                return JSON.stringify({ summary: `Found ${data.files?.length ?? 0} files`, raw: data }, null, 2);
            }

            if (query === "file" && fileId) {
                const url = `${baseUrl}/files/${fileId}?fields=id,name,mimeType,webViewLink,modifiedTime,createdTime,size,owners,permissions`;
                const res = await fetch(auth.authMode === "apiKey" ? `${url}&key=${process.env.GOOGLE_API_KEY}` : url, { headers });
                if (!res.ok) return handleDriveError(res);
                const data = await res.json();
                return JSON.stringify({ summary: `${data.name} (${data.mimeType})`, raw: data }, null, 2);
            }

            if (query === "folder" && folderId) {
                const q = `'${folderId}' in parents and trashed=false`;
                const url = `${baseUrl}/files?q=${encodeURIComponent(q)}&pageSize=${limit}&fields=files(id,name,mimeType,webViewLink,modifiedTime)`;
                const res = await fetch(auth.authMode === "apiKey" ? `${url}&key=${process.env.GOOGLE_API_KEY}` : url, { headers });
                if (!res.ok) return handleDriveError(res);
                const data = await res.json();
                return JSON.stringify({ summary: `Found ${data.files?.length ?? 0} items in folder`, raw: data }, null, 2);
            }

            if (query === "list") {
                const mimeTypeFilter = buildMimeTypeFilter(fileType);
                const q = `trashed=false${mimeTypeFilter}`;
                const url = `${baseUrl}/files?q=${encodeURIComponent(q)}&orderBy=modifiedTime desc&pageSize=${limit}&fields=files(id,name,mimeType,webViewLink,modifiedTime)`;
                const res = await fetch(auth.authMode === "apiKey" ? `${url}&key=${process.env.GOOGLE_API_KEY}` : url, { headers });
                if (!res.ok) return handleDriveError(res);
                const data = await res.json();
                return JSON.stringify({ summary: `Found ${data.files?.length ?? 0} recent files`, raw: data }, null, 2);
            }

            if (query === "export" && fileId) {
                const exportUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=${encodeURIComponent(exportMime ?? "text/plain")}`;
                const res = await fetch(auth.authMode === "apiKey" ? `${exportUrl}&key=${process.env.GOOGLE_API_KEY}` : exportUrl, { headers });
                if (!res.ok) return handleDriveError(res);
                const content = await res.text();
                const truncated = content.length > 10000 ? `${content.slice(0, 10000)}\n...[truncated]` : content;
                return JSON.stringify({ summary: `Exported content (${exportMime}) length=${content.length}`, content: truncated }, null, 2);
            }

            return "Invalid parameters. Use: search+searchQuery, file+fileId, folder+folderId, list, or export+fileId.";
        } catch (err: any) {
            return `Error querying Google Drive: ${err.message}`;
        }
    },
});
