/// <reference path="../../global.d.ts" />
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import { glob } from "glob";

export default defineTool({
    name: "synthesizeDocuments",
    description: "Synthesize information from multiple documents (PRDs, TRDs, Linear tickets, etc.) to answer questions from a PM/Program Manager perspective. Analyzes documents for missing issues, what needs to be done, risks, dependencies, etc.",
    parameters: z.object({
        files: z
            .array(z.string())
            .describe("Array of file paths to analyze (relative to workspace root or absolute paths)"),
        question: z
            .string()
            .optional()
            .describe("Optional: Specific question to answer about the documents"),
        perspective: z
            .enum(["product", "program", "engineering", "all"])
            .default("all")
            .describe("Perspective to analyze from: product (PM), program (Program Manager), engineering, or all"),
        outputFile: z
            .string()
            .optional()
            .describe("Optional: File path to save the synthesis output"),
    }),
    async execute({ files, question, perspective, outputFile }) {
        try {
            const documents: Array<{ path: string; content: string }> = [];
            const workspaceRoot = process.cwd();

            // Read all specified files
            for (const filePath of files) {
                let fullPath: string;

                // Handle both relative and absolute paths
                if (path.isAbsolute(filePath)) {
                    fullPath = filePath;
                } else {
                    // Try workspace/docs first, then root
                    fullPath = path.join(workspaceRoot, "workspace", "docs", filePath);
                    if (!fs.existsSync(fullPath)) {
                        fullPath = path.join(workspaceRoot, filePath);
                    }
                }

                if (!fs.existsSync(fullPath)) {
                    return `File not found: ${filePath} (tried: ${fullPath})`;
                }

                const content = fs.readFileSync(fullPath, "utf-8");
                documents.push({ path: filePath, content });
            }

            if (documents.length === 0) {
                return "No documents found to analyze.";
            }

            // Build synthesis prompt based on perspective
            let analysisFocus = "";
            switch (perspective) {
                case "product":
                    analysisFocus = "Product Management perspective: focus on user needs, product strategy, feature requirements, success metrics, and user experience.";
                    break;
                case "program":
                    analysisFocus = "Program Management perspective: focus on timelines, dependencies, risks, resource allocation, cross-team coordination, and delivery planning.";
                    break;
                case "engineering":
                    analysisFocus = "Engineering perspective: focus on technical architecture, implementation details, technical risks, dependencies, and feasibility.";
                    break;
                default:
                    analysisFocus = "All perspectives: analyze from Product Management, Program Management, and Engineering viewpoints.";
            }

            const fileList = documents.map(d => `- ${d.path}`).join("\n");
            const totalContent = documents.map(d => `\n\n=== ${d.path} ===\n${d.content}`).join("\n");

            let synthesisPrompt = `# Document Synthesis Analysis

## Documents Analyzed
${fileList}

## Analysis Perspective
${analysisFocus}

## Document Contents
${totalContent}

## Analysis Requested
${question || "Provide a comprehensive analysis covering:"}

### Required Analysis Sections:

1. **Executive Summary**
   - Key themes and findings across all documents
   - Overall project/initiative status

2. **What Needs to Be Done**
   - Action items and tasks identified
   - Missing or incomplete items
   - Next steps required

3. **Missing Issues & Gaps**
   - Gaps in documentation
   - Unanswered questions
   - Missing requirements or considerations
   - Inconsistencies between documents

4. **Risks & Dependencies**
   - Identified risks
   - Dependencies (internal and external)
   - Blockers or potential blockers

5. **Key Decisions Needed**
   - Decisions that need to be made
   - Open questions requiring resolution
   - Trade-offs to consider

6. **Timeline & Milestones**
   - Key dates and milestones mentioned
   - Timeline gaps or concerns
   - Delivery planning considerations

7. **Resource & Capacity**
   - Resource requirements mentioned
   - Team/capacity considerations
   - Allocation needs

8. **Metrics & Success Criteria**
   - Success metrics defined
   - Measurement approach
   - Missing metrics or unclear criteria

9. **Stakeholder Considerations**
   - Stakeholders mentioned
   - Communication needs
   - Alignment requirements

10. **Recommendations**
    - Priority recommendations
    - Suggested next steps
    - Areas requiring immediate attention

## Instructions
Analyze the documents from the specified perspective(s) and provide a comprehensive synthesis addressing all sections above. Be specific, cite document sources, and provide actionable insights.`;

            // If output file specified, save the prompt for AI to process
            if (outputFile) {
                const outputPath = path.isAbsolute(outputFile)
                    ? outputFile
                    : path.join(workspaceRoot, "workspace", "docs", outputFile);

                fs.writeFileSync(outputPath, synthesisPrompt, "utf-8");
                return `Synthesis prompt created at ${outputPath}. Use this file with Cursor to generate the analysis. The prompt includes all document contents and analysis framework.`;
            }

            // Return the synthesis prompt for immediate use
            return synthesisPrompt;
        } catch (err: any) {
            return `Error synthesizing documents: ${err.message}`;
        }
    },
});

