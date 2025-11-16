/// <reference path="../../global.d.ts" />
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import { glob } from "glob";

export default defineTool({
    name: "trackActionItems",
    description: "Extract and track action items across all documents in workspace/docs/. Can filter by status, owner, due date, and generate action item reports.",
    parameters: z.object({
        scope: z
            .string()
            .optional()
            .default("workspace/docs/")
            .describe("Scope to search (directory path or 'all' for entire workspace)"),
        status: z
            .enum(["open", "closed", "all"])
            .default("all")
            .describe("Filter by status: open (unchecked), closed (checked), or all"),
        owner: z
            .string()
            .optional()
            .describe("Filter by owner (case-insensitive partial match)"),
        dueDate: z
            .string()
            .optional()
            .describe("Filter by due date (e.g., '2024-01-31' or 'overdue')"),
        outputFile: z
            .string()
            .optional()
            .describe("Optional: File path to save the action items report"),
    }),
    async execute({ scope, status, owner, dueDate, outputFile }) {
        try {
            const workspaceRoot = process.cwd();
            let searchPath: string;

            if (scope === "all" || scope === "workspace") {
                searchPath = path.join(workspaceRoot, "workspace");
            } else if (path.isAbsolute(scope)) {
                searchPath = scope;
            } else {
                searchPath = path.join(workspaceRoot, scope);
            }

            if (!fs.existsSync(searchPath)) {
                return `Path not found: ${scope}`;
            }

            // Find all markdown files
            const files = await glob("**/*.md", {
                cwd: searchPath,
                absolute: true,
                ignore: ["node_modules/**", ".git/**"],
            });

            const actionItems: Array<{
                file: string;
                line: number;
                content: string;
                status: "open" | "closed";
                owner?: string;
                dueDate?: string;
                context?: string;
            }> = [];

            // Extract action items from each file
            for (const filePath of files) {
                const content = fs.readFileSync(filePath, "utf-8");
                const lines = content.split("\n");

                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];

                    // Match checkbox patterns: - [ ] or - [x] or * [ ] or * [x]
                    const checkboxMatch = line.match(/^[\s]*[-*]\s+\[([ xX])\]\s+(.+)$/);

                    if (checkboxMatch) {
                        const isChecked = checkboxMatch[1].toLowerCase() === "x";
                        const itemContent = checkboxMatch[2].trim();

                        // Extract owner and due date from content
                        let extractedOwner: string | undefined;
                        let extractedDueDate: string | undefined;

                        // Look for owner patterns: "Owner: Name" or "(assigned to Name)" or "– Owner: Name"
                        const ownerMatch = itemContent.match(/(?:owner|assigned to|– owner):\s*([^–(]+)/i);
                        if (ownerMatch) {
                            extractedOwner = ownerMatch[1].trim();
                        }

                        // Look for due date patterns: "Due: 2024-01-31" or "due: 2024-01-31"
                        const dueMatch = itemContent.match(/(?:due|due date):\s*(\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4})/i);
                        if (dueMatch) {
                            extractedDueDate = dueMatch[1];
                        }

                        // Get context (previous and next lines)
                        const contextLines = [];
                        for (let j = Math.max(0, i - 2); j <= Math.min(lines.length - 1, i + 2); j++) {
                            if (j !== i) {
                                contextLines.push(lines[j]);
                            }
                        }
                        const context = contextLines.join("\n").substring(0, 200);

                        const actionItem = {
                            file: path.relative(workspaceRoot, filePath),
                            line: i + 1,
                            content: itemContent,
                            status: isChecked ? "closed" : "open",
                            owner: extractedOwner,
                            dueDate: extractedDueDate,
                            context: context,
                        };

                        // Apply filters
                        let include = true;

                        if (status !== "all" && actionItem.status !== status) {
                            include = false;
                        }

                        if (owner && !actionItem.owner?.toLowerCase().includes(owner.toLowerCase())) {
                            include = false;
                        }

                        if (dueDate) {
                            if (dueDate === "overdue" && actionItem.dueDate) {
                                const due = new Date(actionItem.dueDate);
                                const now = new Date();
                                if (due >= now) {
                                    include = false;
                                }
                            } else if (actionItem.dueDate !== dueDate) {
                                include = false;
                            }
                        }

                        if (include) {
                            actionItems.push(actionItem);
                        }
                    }
                }
            }

            // Sort by status (open first), then by due date
            actionItems.sort((a, b) => {
                if (a.status !== b.status) {
                    return a.status === "open" ? -1 : 1;
                }
                if (a.dueDate && b.dueDate) {
                    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                }
                if (a.dueDate) return -1;
                if (b.dueDate) return 1;
                return 0;
            });

            // Build report
            const report = {
                generatedAt: new Date().toISOString(),
                scope: scope,
                filters: {
                    status,
                    owner,
                    dueDate,
                },
                summary: {
                    total: actionItems.length,
                    open: actionItems.filter(a => a.status === "open").length,
                    closed: actionItems.filter(a => a.status === "closed").length,
                    withOwner: actionItems.filter(a => a.owner).length,
                    withDueDate: actionItems.filter(a => a.dueDate).length,
                },
                actionItems: actionItems,
            };

            // Format as markdown report
            const markdownReport = `# Action Items Report

Generated: ${report.generatedAt}
Scope: ${scope}
Filters: Status=${status}, Owner=${owner || "any"}, Due Date=${dueDate || "any"}

## Summary

- **Total Action Items**: ${report.summary.total}
- **Open**: ${report.summary.open}
- **Closed**: ${report.summary.closed}
- **With Owner**: ${report.summary.withOwner}
- **With Due Date**: ${report.summary.withDueDate}

## Action Items

${actionItems.map((item, index) => `
### ${index + 1}. ${item.status === "open" ? "☐" : "☑"} ${item.content}

- **File**: \`${item.file}\` (line ${item.line})
- **Status**: ${item.status}
${item.owner ? `- **Owner**: ${item.owner}` : ""}
${item.dueDate ? `- **Due Date**: ${item.dueDate}${new Date(item.dueDate) < new Date() && item.status === "open" ? " ⚠️ OVERDUE" : ""}` : ""}
${item.context ? `- **Context**:\n  \`\`\`\n  ${item.context}\n  \`\`\`` : ""}
`).join("\n")}
`;

            if (outputFile) {
                const outputPath = path.isAbsolute(outputFile)
                    ? outputFile
                    : path.join(workspaceRoot, "workspace", "docs", outputFile);

                fs.writeFileSync(outputPath, markdownReport, "utf-8");
                return `Action items report saved to ${outputPath}\n\nSummary: ${report.summary.total} items found (${report.summary.open} open, ${report.summary.closed} closed)`;
            }

            return markdownReport;
        } catch (err: any) {
            return `Error tracking action items: ${err.message}`;
        }
    },
});

