// Minimal smoke checks to ensure tools load and return friendly errors without API keys.
// Run with: npm run smoke

(globalThis as any).defineTool = (config: any) => config; // runtime shiv so tool modules load

import mixpanel from "../.cursor/tools/mixpanel";
import statsig from "../.cursor/tools/statsig";
import honeycomb from "../.cursor/tools/honeycomb";
import drive from "../.cursor/tools/google-drive";

type SmokeCase = { name: string; run: () => Promise<boolean> };

const cases: SmokeCase[] = [
    {
        name: "mixpanel requires api secret",
        run: async () => {
            const res = await mixpanel.execute({ query: "jql", jql: "function main() { return []; }" });
            return typeof res === "string" && res.includes("MIXPANEL_API_SECRET");
        },
    },
    {
        name: "statsig requires api key",
        run: async () => {
            const res = await statsig.execute({ query: "experiments" });
            return typeof res === "string" && res.includes("STATSIG_API_KEY");
        },
    },
    {
        name: "honeycomb requires api key",
        run: async () => {
            const res = await honeycomb.execute({ query: "VISUALIZE count()", timeRange: "1h" });
            return typeof res === "string" && res.includes("HONEYCOMB_API_KEY");
        },
    },
    {
        name: "drive needs oauth or api key",
        run: async () => {
            const res = await drive.execute({ query: "list", limit: 1, fileType: "all" });
            return typeof res === "string" && res.toLowerCase().includes("google");
        },
    },
];

async function main() {
    let failures = 0;
    for (const test of cases) {
        try {
            const ok = await test.run();
            if (!ok) {
                failures++;
                console.error(`✖ ${test.name}`);
            } else {
                console.log(`✔ ${test.name}`);
            }
        } catch (err) {
            failures++;
            console.error(`✖ ${test.name}:`, err);
        }
    }

    if (failures > 0) {
        console.error(`Smoke failed: ${failures} case(s)`);
        process.exitCode = 1;
    } else {
        console.log("All smoke checks passed (env-less mode)");
    }
}

main();
