/// <reference path="../../global.d.ts" />
import { z } from "zod";

export default defineTool({
    name: "queryStatsig",
    description: "Query Statsig for experiment results, feature flag status, or metrics. Useful for A/B test analysis.",
    parameters: z.object({
        query: z
            .string()
            .describe("What to query: 'experiments', 'feature-flags', or 'metrics'"),
        experimentId: z
            .string()
            .optional()
            .describe("Optional: Specific experiment ID to fetch results for"),
        metricName: z
            .string()
            .optional()
            .describe("Optional: Specific metric name to query"),
    }),
    async execute({ query, experimentId, metricName }) {
        try {
            const apiKey = process.env.STATSIG_API_KEY ?? "";
            const baseUrl = process.env.STATSIG_URL ?? "https://api.statsig.com";

            if (!apiKey) {
                return "STATSIG_API_KEY must be set in .env";
            }

            if (experimentId) {
                // Fetch specific experiment results
                const res = await fetch(`${baseUrl}/v1/experiments/${experimentId}`, {
                    headers: {
                        "statsig-api-key": apiKey,
                    },
                });

                if (!res.ok) {
                    return `Statsig error: ${res.status} ${res.statusText}`;
                }

                const experiment = await res.json();
                return JSON.stringify(experiment, null, 2);
            }

            if (query === "experiments") {
                const res = await fetch(`${baseUrl}/v1/experiments`, {
                    headers: {
                        "statsig-api-key": apiKey,
                    },
                });

                if (!res.ok) {
                    return `Statsig error: ${res.status} ${res.statusText}`;
                }

                const data = await res.json();
                return JSON.stringify(data, null, 2);
            }

            if (query === "feature-flags") {
                const res = await fetch(`${baseUrl}/v1/feature-flags`, {
                    headers: {
                        "statsig-api-key": apiKey,
                    },
                });

                if (!res.ok) {
                    return `Statsig error: ${res.status} ${res.statusText}`;
                }

                const data = await res.json();
                return JSON.stringify({ summary: `Fetched ${data?.length ?? 0} feature flags`, raw: data }, null, 2);
            }

            if (query === "metrics") {
                if (!metricName) {
                    return "Provide metricName when query='metrics'";
                }

                const res = await fetch(`${baseUrl}/v1/metrics/${metricName}`, {
                    headers: {
                        "statsig-api-key": apiKey,
                    },
                });

                if (!res.ok) {
                    return `Statsig error: ${res.status} ${res.statusText}`;
                }

                const data = await res.json();
                return JSON.stringify({ summary: `Fetched metric ${metricName}`, raw: data }, null, 2);
            }

            return `Unknown query type: ${query}. Use 'experiments', 'feature-flags', or 'metrics'.`;
        } catch (err: any) {
            return `Error querying Statsig: ${err.message}`;
        }
    },
});
