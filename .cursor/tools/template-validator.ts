/// <reference path="../../global.d.ts" />
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";

export default defineTool({
    name: "validateTemplate",
    description: "Validate that a document (PRD, TRD, etc.) follows the template structure and includes all required sections. Helps ensure consistency and catch missing sections before reviews.",
    parameters: z.object({
        file: z
            .string()
            .describe("File path to validate (relative to workspace/docs/ or absolute path)"),
        template: z
            .string()
            .optional()
            .describe("Optional: Template file to validate against (e.g., 'prd-simple.md', 'trd-function-ai.md'). If not provided, will auto-detect based on file content."),
    }),
    async execute({ file, template }) {
        try {
            const workspaceRoot = process.cwd();
            let filePath: string;
            let templatePath: string | null = null;

            // Resolve file path
            if (path.isAbsolute(file)) {
                filePath = file;
            } else {
                filePath = path.join(workspaceRoot, "workspace", "docs", file);
                if (!fs.existsSync(filePath)) {
                    filePath = path.join(workspaceRoot, file);
                }
            }

            if (!fs.existsSync(filePath)) {
                return `File not found: ${file}`;
            }

            const fileContent = fs.readFileSync(filePath, "utf-8");

            // Auto-detect template if not provided
            if (!template) {
                // Try to detect based on file content or name
                if (fileContent.includes("AI/Clinical PRD") || fileContent.includes("Langfuse") || fileContent.includes("evaluator")) {
                    template = "prd-function-ai.md";
                } else if (fileContent.includes("PRD") || file.toLowerCase().includes("prd")) {
                    template = "prd-simple.md";
                } else if (fileContent.includes("TRD") || fileContent.includes("Technical Requirements") || file.toLowerCase().includes("trd")) {
                    template = "trd-function-ai.md";
                } else if (fileContent.includes("Feature Spec") || file.toLowerCase().includes("feature")) {
                    template = "feature-spec.md";
                } else {
                    return `Could not auto-detect template. Please specify template parameter.`;
                }
            }

            // Resolve template path
            const templatesPath = path.join(workspaceRoot, "workspace", "templates");
            templatePath = path.join(templatesPath, template);

            if (!fs.existsSync(templatePath)) {
                return `Template not found: ${template} (tried: ${templatePath})`;
            }

            const templateContent = fs.readFileSync(templatePath, "utf-8");

            // Extract sections from template (headers starting with ##)
            const templateSections = templateContent
                .split(/\n/)
                .filter(line => line.match(/^##+\s+/))
                .map(line => line.replace(/^##+\s+/, "").trim())
                .filter(section => section.length > 0);

            // Extract sections from file
            const fileSections = fileContent
                .split(/\n/)
                .filter(line => line.match(/^##+\s+/))
                .map(line => line.replace(/^##+\s+/, "").trim())
                .filter(section => section.length > 0);

            // Compare sections
            const missingSections = templateSections.filter(
                templateSection => !fileSections.some(
                    fileSection => fileSection.toLowerCase().includes(templateSection.toLowerCase()) ||
                                  templateSection.toLowerCase().includes(fileSection.toLowerCase())
                )
            );

            const extraSections = fileSections.filter(
                fileSection => !templateSections.some(
                    templateSection => fileSection.toLowerCase().includes(templateSection.toLowerCase()) ||
                                      templateSection.toLowerCase().includes(fileSection.toLowerCase())
                )
            );

            // Check for empty sections
            const emptySections: string[] = [];
            for (const section of fileSections) {
                const sectionRegex = new RegExp(`##+\\s+${section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([\\s\\S]*?)(?=##+|$)`, "i");
                const match = fileContent.match(sectionRegex);
                if (match && match[1]) {
                    const sectionContent = match[1].trim();
                    // Check if section is mostly empty (just bullets with no content, or very short)
                    if (sectionContent.length < 50 || sectionContent.match(/^[-*]\s*\[?\]?\s*$/m)) {
                        emptySections.push(section);
                    }
                }
            }

            // Build validation report
            const validationReport = {
                file: file,
                template: template,
                isValid: missingSections.length === 0 && emptySections.length === 0,
                summary: {
                    totalTemplateSections: templateSections.length,
                    totalFileSections: fileSections.length,
                    missingSections: missingSections.length,
                    emptySections: emptySections.length,
                    extraSections: extraSections.length,
                },
                details: {
                    missingSections: missingSections,
                    emptySections: emptySections,
                    extraSections: extraSections,
                    allTemplateSections: templateSections,
                    allFileSections: fileSections,
                },
                recommendations: [] as string[],
            };

            // Add recommendations
            if (missingSections.length > 0) {
                validationReport.recommendations.push(
                    `Add the following missing sections: ${missingSections.join(", ")}`
                );
            }

            if (emptySections.length > 0) {
                validationReport.recommendations.push(
                    `Fill in the following empty sections: ${emptySections.join(", ")}`
                );
            }

            if (extraSections.length > 0) {
                validationReport.recommendations.push(
                    `Consider if these extra sections should be in the template: ${extraSections.join(", ")}`
                );
            }

            if (validationReport.isValid) {
                validationReport.recommendations.push("Document follows template structure correctly!");
            }

            return JSON.stringify(validationReport, null, 2);
        } catch (err: any) {
            return `Error validating template: ${err.message}`;
        }
    },
});

