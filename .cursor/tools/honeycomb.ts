/// <reference path="../../global.d.ts" />
import { z } from "zod";

type TimeRangePreset = "1h" | "24h" | "7d";

function buildTimeRange(preset: TimeRangePreset) {
    const now = Math.floor(Date.now() / 1000);
    const lookbackSeconds = preset === "1h" ? 3600 : preset === "24h" ? 86400 : 604800;
    return { start: now - lookbackSeconds, end: now }; // unix seconds
}

export default defineTool({
    name: "queryHoneycomb",
    description: "Query Honeycomb for observability data, traces, or metrics using the Query Data API.",
    parameters: z.object({
        query: z
            .string()
            .describe("Honeycomb query expression (e.g., \\"VISUALIZE count()\\" ...)") ,
        dataset: z
            .string()
            .optional()
            .default("default")
            .describe("Dataset name"),
        timeRange: z
            .enum(["1h", "24h", "7d"])
            .optional()
            .default("1h")
            .describe("Time range preset"),
    }),
    async execute({ query, dataset, timeRange }) {
        try {
            const apiKey = process.env.HONEYCOMB_API_KEY ?? "";
            const baseUrl = process.env.HONEYCOMB_URL ?? "https://api.honeycomb.io";

            if (!apiKey) {
                return "HONEYCOMB_API_KEY must be set in .env";
            }

            const range = buildTimeRange(timeRange as TimeRangePreset);
            const payload = {
                query: { op: "query", arguments: [query] },
                time_range: { start: range.start, end: range.end },
            };

            const res = await fetch(`${baseUrl}/1/queries/${dataset || "default"}/run`, {
                method: "POST",
                headers: {
                    "X-Honeycomb-Team": apiKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const body = await res.text();
                return `Honeycomb error: ${res.status} ${res.statusText} | ${body.slice(0, 300)}`;
            }

            const data = await res.json();
            return JSON.stringify({ summary: `Query succeeded with ${data?.results?.length ?? 0} rows`, raw: data }, null, 2);
        } catch (err: any) {
            return `Error querying Honeycomb: ${err.message}`;
        }
    },
});
