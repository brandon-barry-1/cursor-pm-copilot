import { z } from "zod";
import * as fs from "fs";
import * as path from "path";

export default defineTool({
    name: "readLocalNote",
    description:
        "Read a local Markdown note from workspace/docs/ by filename, for summarization or editing.",
    parameters: z.object({
        filename: z
            .string()
            .describe("Markdown file name in workspace/docs/, e.g. 'project-x-notes.md'")
    }),
    async execute({ filename }) {
        try {
            const fullPath = path.join(process.cwd(), "workspace", "docs", filename);

            if (!fs.existsSync(fullPath)) {
                return `File not found: ${fullPath}`;
            }

            const content = fs.readFileSync(fullPath, "utf-8");
            return content;
        } catch (err: any) {
            return `Error reading local note: ${err.message}`;
        }
    }
});
