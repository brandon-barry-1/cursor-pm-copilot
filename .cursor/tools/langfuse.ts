/// <reference path="../../global.d.ts" />
import { z } from "zod";

export default defineTool({
    name: "queryLangfuse",
    description: "Query Langfuse for traces, evaluations, or metrics. Useful for analyzing AI/ML model performance and debugging.",
    parameters: z.object({
        query: z
            .string()
            .describe("What to query: 'traces', 'evaluations', 'metrics', or a specific trace ID"),
        traceId: z
            .string()
            .optional()
            .describe("Optional: Specific trace ID to fetch details for"),
        limit: z
            .number()
            .optional()
            .default(10)
            .describe("Number of results to return (default: 10)"),
    }),
    async execute({ query, traceId, limit }) {
        try {
            const apiKey = process.env.LANGFUSE_PUBLIC_KEY ?? "";
            const secretKey = process.env.LANGFUSE_SECRET_KEY ?? "";
            const baseUrl = process.env.LANGFUSE_URL ?? "https://cloud.langfuse.com";

            if (!apiKey || !secretKey) {
                return "LANGFUSE_PUBLIC_KEY and LANGFUSE_SECRET_KEY must be set in .env";
            }

            const auth = Buffer.from(`${apiKey}:${secretKey}`).toString("base64");

            if (traceId) {
                // Fetch specific trace
                const res = await fetch(`${baseUrl}/api/public/traces/${traceId}`, {
                    headers: {
                        Authorization: `Basic ${auth}`,
                    },
                });

                if (!res.ok) {
                    return `Langfuse error: ${res.status} ${res.statusText}`;
                }

                const trace = await res.json();
                return JSON.stringify(trace, null, 2);
            }

            // Query traces or evaluations
            if (query === "traces" || query === "evaluations") {
                const endpoint = query === "traces" ? "traces" : "evaluations";
                const res = await fetch(`${baseUrl}/api/public/${endpoint}?limit=${limit}`, {
                    headers: {
                        Authorization: `Basic ${auth}`,
                    },
                });

                if (!res.ok) {
                    return `Langfuse error: ${res.status} ${res.statusText}`;
                }

                const data = await res.json();
                return JSON.stringify(data, null, 2);
            }

            return `Unknown query type: ${query}. Use 'traces', 'evaluations', or provide a traceId.`;
        } catch (err: any) {
            return `Error querying Langfuse: ${err.message}`;
        }
    },
});

