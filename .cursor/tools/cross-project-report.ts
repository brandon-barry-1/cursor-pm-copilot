/// <reference path="../../global.d.ts" />
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";

export default defineTool({
    name: "generateCrossProjectReport",
    description: "Generate comprehensive reports across multiple projects by pulling data from PRDs, status docs, metrics, risks, and decisions. Supports weekly/monthly reports, portfolio reviews, and stakeholder updates.",
    parameters: z.object({
        reportType: z
            .enum(["weekly", "monthly", "quarterly", "portfolio", "stakeholder", "custom"])
            .describe("Type of report to generate"),
        projects: z
            .array(z.string())
            .optional()
            .describe("Optional: Specific projects to include (by folder name or doc filename). If not provided, includes all projects."),
        include: z
            .array(z.enum(["projects", "metrics", "risks", "decisions", "action-items", "experiments", "all"]))
            .default(["all"])
            .describe("What to include in the report"),
        dateRange: z
            .string()
            .optional()
            .describe("Optional: Date range (e.g., 'last-week', 'last-month', '2024-01-01:2024-01-31')"),
        outputFile: z
            .string()
            .optional()
            .describe("Optional: File path to save the report"),
    }),
    async execute({ reportType, projects, include, dateRange, outputFile }) {
        try {
            const workspaceRoot = process.cwd();
            const docsPath = path.join(workspaceRoot, "workspace", "docs");

            if (!fs.existsSync(docsPath)) {
                return "No docs folder found at workspace/docs. Add project docs before generating a report.";
            }

            // Collect data from various sources
            const reportData: any = {
                reportType,
                generatedAt: new Date().toISOString(),
                dateRange: dateRange || "all-time",
                projects: [],
                metrics: [],
                risks: [],
                decisions: [],
                actionItems: [],
                experiments: [],
            };

            // Find project documents
            const projectFiles: string[] = [];
            if (projects && projects.length > 0) {
                // Specific projects requested
                for (const project of projects) {
                    const possiblePaths = [
                        path.join(docsPath, `${project}.md`),
                        path.join(docsPath, `prd-${project}.md`),
                        path.join(docsPath, `trd-${project}.md`),
                    ];

                    for (const filePath of possiblePaths) {
                        if (fs.existsSync(filePath)) {
                            projectFiles.push(filePath);
                            break;
                        }
                    }
                }
            } else {
                // All projects
                const allFiles = fs.readdirSync(docsPath);
                projectFiles.push(...allFiles
                    .filter(f => f.endsWith(".md") && !f.startsWith("index") && !f.startsWith("CHANGELOG"))
                    .map(f => path.join(docsPath, f)));
            }

            // Read project files
            for (const filePath of projectFiles) {
                if (fs.existsSync(filePath)) {
                    const content = fs.readFileSync(filePath, "utf-8");
                    const fileName = path.basename(filePath, ".md");

                    // Extract key information
                    const projectInfo = {
                        name: fileName,
                        path: filePath,
                        content: content.substring(0, 5000), // Limit content size
                        lastModified: fs.statSync(filePath).mtime.toISOString(),
                    };

                    reportData.projects.push(projectInfo);
                }
            }

            // Read central registers if they exist
            if (include.includes("all") || include.includes("metrics")) {
                const metricsPath = path.join(docsPath, "metrics.md");
                if (fs.existsSync(metricsPath)) {
                    reportData.metrics.push({
                        source: "metrics.md",
                        content: fs.readFileSync(metricsPath, "utf-8"),
                    });
                }
            }

            if (include.includes("all") || include.includes("risks")) {
                const risksPath = path.join(docsPath, "risks.md");
                if (fs.existsSync(risksPath)) {
                    reportData.risks.push({
                        source: "risks.md",
                        content: fs.readFileSync(risksPath, "utf-8"),
                    });
                }
            }

            if (include.includes("all") || include.includes("decisions")) {
                const decisionsPath = path.join(docsPath, "decisions.md");
                if (fs.existsSync(decisionsPath)) {
                    reportData.decisions.push({
                        source: "decisions.md",
                        content: fs.readFileSync(decisionsPath, "utf-8"),
                    });
                }
            }

            // Build report prompt
            const reportPrompt = `# ${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report

Generated: ${reportData.generatedAt}
Date Range: ${reportData.dateRange}

## Report Data

### Projects (${reportData.projects.length})
${reportData.projects.map((p: any) => `- ${p.name} (last modified: ${p.lastModified})`).join("\n")}

${include.includes("all") || include.includes("metrics") ? `### Metrics\n${reportData.metrics.map((m: any) => `- ${m.source}`).join("\n")}` : ""}

${include.includes("all") || include.includes("risks") ? `### Risks\n${reportData.risks.map((r: any) => `- ${r.source}`).join("\n")}` : ""}

${include.includes("all") || include.includes("decisions") ? `### Decisions\n${reportData.decisions.map((d: any) => `- ${d.source}`).join("\n")}` : ""}

## Report Structure

Generate a comprehensive ${reportType} report with the following sections:

1. **Executive Summary**
   - Overall status across all projects
   - Key highlights and wins
   - Major challenges or risks

2. **Project Status** (for each project)
   - Current status and progress
   - Key accomplishments
   - Challenges and blockers
   - Next steps

3. **Metrics & KPIs** (if included)
   - Key metrics across projects
   - Trends and insights
   - Targets vs. actuals

4. **Risks & Issues** (if included)
   - Active risks across portfolio
   - New risks identified
   - Risk mitigation status

5. **Decisions & Changes** (if included)
   - Key decisions made
   - Pending decisions
   - Change requests

6. **Action Items** (if included)
   - Open action items across projects
   - Owners and due dates
   - Priority items

7. **Experiments & Learnings** (if included)
   - Active experiments
   - Results and learnings
   - Next experiments

8. **Recommendations**
   - Priority recommendations
   - Areas requiring attention
   - Suggested next steps

## Project Details

${reportData.projects.map((p: any) => `\n### ${p.name}\n\n${p.content.substring(0, 2000)}...`).join("\n\n")}

${reportData.metrics.length > 0 ? `\n## Metrics Data\n\n${reportData.metrics.map((m: any) => m.content).join("\n\n")}` : ""}

${reportData.risks.length > 0 ? `\n## Risks Data\n\n${reportData.risks.map((r: any) => r.content).join("\n\n")}` : ""}

${reportData.decisions.length > 0 ? `\n## Decisions Data\n\n${reportData.decisions.map((d: any) => d.content).join("\n\n")}` : ""}

## Instructions

Generate a comprehensive, well-structured ${reportType} report based on the data above. Use the report structure provided and ensure all sections are addressed. Be specific, cite sources, and provide actionable insights.`;

            // Save or return the prompt
            if (outputFile) {
                const outputPath = path.isAbsolute(outputFile)
                    ? outputFile
                    : path.join(docsPath, outputFile);

                fs.writeFileSync(outputPath, reportPrompt, "utf-8");
                return `Report prompt created at ${outputPath}. Use this file with Cursor to generate the report. The prompt includes all project data and report structure.`;
            }

            return reportPrompt;
        } catch (err: any) {
            return `Error generating report: ${err.message}`;
        }
    },
});
