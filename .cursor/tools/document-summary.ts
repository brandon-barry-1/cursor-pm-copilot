/// <reference path="../../global.d.ts" />
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";

export default defineTool({
    name: "summarizeDocuments",
    description: "Prepare a concise summary prompt for multiple documents (Markdown). Truncates content to keep it Cursor-friendly.",
    parameters: z.object({
        files: z.array(z.string()).describe("File paths to include (relative to workspace root or workspace/docs)").min(1),
        perFileCharLimit: z
            .number()
            .optional()
            .default(4000)
            .describe("Max characters to include per file (default 4000)"),
        outputFile: z
            .string()
            .optional()
            .describe("Optional: save the prompt to this file (workspace/docs/<name>.md if relative)"),
    }),
    async execute({ files, perFileCharLimit, outputFile }) {
        try {
            const workspaceRoot = process.cwd();
            const docs: Array<{ path: string; content: string; truncated: boolean }> = [];

            for (const file of files) {
                let fullPath: string;
                if (path.isAbsolute(file)) {
                    fullPath = file;
                } else {
                    fullPath = path.join(workspaceRoot, "workspace", "docs", file);
                    if (!fs.existsSync(fullPath)) {
                        fullPath = path.join(workspaceRoot, file);
                    }
                }

                if (!fs.existsSync(fullPath)) {
                    return `File not found: ${file}`;
                }

                const content = fs.readFileSync(fullPath, "utf-8");
                const truncated = content.length > perFileCharLimit;
                docs.push({ path: path.relative(workspaceRoot, fullPath), content: content.slice(0, perFileCharLimit), truncated });
            }

            const prompt = `# Summarize Documents\n\nGoal: Produce an executive summary, key risks, decisions, and action items across all docs. Be concise and cite source filenames.\n\n## Files\n${docs
                .map(d => `- ${d.path} (included ${d.content.length} chars${d.truncated ? "; truncated" : ""})`)
                .join("\n")}\n\n## Contents\n${docs
                .map(d => `=== ${d.path} ===\n${d.content}\n${d.truncated ? "...[truncated]" : ""}`)
                .join("\n\n")}\n\n## Instructions\nSummarize the documents above into:\n1) Executive summary (5-8 bullets)\n2) Key risks / blockers (with owners if present)\n3) Decisions made / pending\n4) Action items with owners and due dates if stated\n5) Notable metrics or goals\n6) Open questions / missing info\nKeep it under ~300 words.`;

            if (outputFile) {
                const targetPath = path.isAbsolute(outputFile)
                    ? outputFile
                    : path.join(workspaceRoot, "workspace", "docs", outputFile);
                fs.writeFileSync(targetPath, prompt, "utf-8");
                return `Summary prompt saved to ${targetPath}`;
            }

            return prompt;
        } catch (err: any) {
            return `Error preparing summary: ${err.message}`;
        }
    },
});
