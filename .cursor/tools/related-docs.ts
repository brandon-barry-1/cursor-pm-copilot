/// <reference path="../../global.d.ts" />
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import { glob } from "glob";

export default defineTool({
    name: "findRelatedDocuments",
    description: "Find related documents based on content similarity, shared topics, or keywords. Helps discover connections between projects and find relevant context.",
    parameters: z.object({
        file: z
            .string()
            .describe("File path to find related documents for (relative to workspace/docs/ or absolute path)"),
        similarity: z
            .number()
            .min(0)
            .max(1)
            .optional()
            .default(0.3)
            .describe("Minimum similarity threshold (0-1, default 0.3)"),
        maxResults: z
            .number()
            .optional()
            .default(10)
            .describe("Maximum number of results to return (default: 10)"),
        keywords: z
            .array(z.string())
            .optional()
            .describe("Optional: Additional keywords to search for"),
    }),
    async execute({ file, similarity, maxResults, keywords }) {
        try {
            const workspaceRoot = process.cwd();
            let filePath: string;

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

            const sourceContent = fs.readFileSync(filePath, "utf-8");

            // Extract keywords from source file (simple approach: words that appear multiple times)
            const sourceWords = sourceContent
                .toLowerCase()
                .replace(/[^\w\s]/g, " ")
                .split(/\s+/)
                .filter(w => w.length > 3);

            const sourceWordFreq: Record<string, number> = {};
            sourceWords.forEach(word => {
                sourceWordFreq[word] = (sourceWordFreq[word] || 0) + 1;
            });

            // Get top keywords (appear at least 2 times)
            const topKeywords = Object.entries(sourceWordFreq)
                .filter(([_, count]) => count >= 2)
                .sort(([_, a], [__, b]) => b - a)
                .slice(0, 20)
                .map(([word]) => word);

            // Add user-provided keywords
            const allKeywords = [...new Set([...topKeywords, ...(keywords || [])])];

            // Find all markdown files in workspace/docs
            const docsPath = path.join(workspaceRoot, "workspace", "docs");
            const allFiles = await glob("**/*.md", {
                cwd: docsPath,
                absolute: true,
                ignore: ["node_modules/**", ".git/**"],
            });

            const relatedDocs: Array<{
                file: string;
                similarity: number;
                sharedKeywords: string[];
                snippet: string;
            }> = [];

            // Compare with each file
            for (const otherFilePath of allFiles) {
                // Skip the source file itself
                if (otherFilePath === filePath) {
                    continue;
                }

                const otherContent = fs.readFileSync(otherFilePath, "utf-8");
                const otherWords = otherContent
                    .toLowerCase()
                    .replace(/[^\w\s]/g, " ")
                    .split(/\s+/)
                    .filter(w => w.length > 3);

                // Calculate shared keywords
                const sharedKeywords = allKeywords.filter(keyword =>
                    otherWords.includes(keyword.toLowerCase())
                );

                // Simple similarity: shared keywords / total keywords
                const sim = sharedKeywords.length / Math.max(allKeywords.length, 1);

                if (sim >= similarity) {
                    // Find a snippet containing shared keywords
                    let snippet = "";
                    for (const keyword of sharedKeywords.slice(0, 3)) {
                        const keywordIndex = otherContent.toLowerCase().indexOf(keyword);
                        if (keywordIndex !== -1) {
                            const start = Math.max(0, keywordIndex - 100);
                            const end = Math.min(otherContent.length, keywordIndex + 200);
                            snippet = otherContent.substring(start, end).trim();
                            break;
                        }
                    }

                    if (!snippet) {
                        snippet = otherContent.substring(0, 200).trim();
                    }

                    relatedDocs.push({
                        file: path.relative(workspaceRoot, otherFilePath),
                        similarity: sim,
                        sharedKeywords: sharedKeywords.slice(0, 10),
                        snippet: snippet.replace(/\n/g, " ").substring(0, 200),
                    });
                }
            }

            // Sort by similarity
            relatedDocs.sort((a, b) => b.similarity - a.similarity);

            // Limit results
            const results = relatedDocs.slice(0, maxResults);

            // Format output
            const output = {
                sourceFile: path.relative(workspaceRoot, filePath),
                keywords: allKeywords,
                relatedDocuments: results.map(doc => ({
                    file: doc.file,
                    similarity: Math.round(doc.similarity * 100) + "%",
                    sharedKeywords: doc.sharedKeywords,
                    snippet: doc.snippet,
                })),
                summary: {
                    totalFilesScanned: allFiles.length - 1,
                    relatedDocumentsFound: results.length,
                    averageSimilarity: results.length > 0
                        ? Math.round((results.reduce((sum, d) => sum + d.similarity, 0) / results.length) * 100) + "%"
                        : "0%",
                },
            };

            return JSON.stringify(output, null, 2);
        } catch (err: any) {
            return `Error finding related documents: ${err.message}`;
        }
    },
});

