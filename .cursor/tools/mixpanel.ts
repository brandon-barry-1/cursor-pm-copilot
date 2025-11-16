/// <reference path="../../global.d.ts" />
import { z } from "zod";

export default defineTool({
    name: "queryMixpanel",
    description: "Query Mixpanel for event data, funnels, cohorts, or retention metrics. Useful for product analytics.",
    parameters: z.object({
        query: z
            .string()
            .describe("What to query: 'events', 'funnel', 'cohort', 'retention', or 'jql' (JQL script)"),
        event: z
            .string()
            .optional()
            .describe("Optional: Specific event name to query"),
        jql: z
            .string()
            .optional()
            .describe("Required when query='jql': JQL script for custom queries"),
        limit: z
            .number()
            .optional()
            .default(100)
            .describe("Number of results to return (default: 100)"),
    }),
    async execute({ query, event, jql, limit }) {
        try {
            const apiSecret = process.env.MIXPANEL_API_SECRET ?? "";
            const baseUrl = "https://mixpanel.com/api/2.0";

            if (!apiSecret) {
                return "MIXPANEL_API_SECRET must be set in .env";
            }

            if (query === "jql") {
                if (!jql) {
                    return "Provide 'jql' script when query='jql'";
                }

                const res = await fetch(`${baseUrl}/jql`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${Buffer.from(`${apiSecret}:`).toString("base64")}`,
                    },
                    body: JSON.stringify({ script: jql }),
                });

                if (!res.ok) {
                    return `Mixpanel error: ${res.status} ${res.statusText}`;
                }

                const data = await res.json();
                return JSON.stringify({ summary: `JQL returned ${Array.isArray(data) ? data.length : "n"} rows`, raw: data }, null, 2);
            }

            if (query === "events" && event) {
                // Query specific event
                const params = new URLSearchParams({
                    event: `["${event}"]`,
                    unit: "day",
                    interval: "1",
                    limit: limit.toString(),
                });

                const res = await fetch(`${baseUrl}/events?${params}`, {
                    headers: {
                        Authorization: `Basic ${Buffer.from(`${apiSecret}:`).toString("base64")}`,
                    },
                });

                if (!res.ok) {
                    return `Mixpanel error: ${res.status} ${res.statusText}`;
                }

                const data = await res.json();
                return JSON.stringify({ summary: `Fetched event ${event}`, raw: data }, null, 2);
            }

            return `Use 'jql' with a JQL query string, or 'events' with an event name. Mixpanel API requires specific query formats.`;
        } catch (err: any) {
            return `Error querying Mixpanel: ${err.message}`;
        }
    },
});
