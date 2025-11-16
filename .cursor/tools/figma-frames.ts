/// <reference path="../../global.d.ts" />
import { z } from "zod";

export default defineTool({
    name: "getFigmaFrames",
    description: "List top-level frames from a Figma file for overview and mapping to docs.",
    parameters: z.object({
        fileId: z.string().describe("Figma file ID from the URL (the long ID in the link)")
    }),
    async execute({ fileId }) {
        try {
            const token = process.env.FIGMA_TOKEN ?? "";
            if (!token) {
                return "FIGMA_TOKEN is not set in .env.";
            }

            const res = await fetch(`https://api.figma.com/v1/files/${fileId}`, {
                headers: {
                    "X-Figma-Token": token
                }
            });

            if (!res.ok) {
                return `Figma error: ${res.status} ${res.statusText}`;
            }

            const json = await res.json();

            const frames =
                json.document?.children?.map((node: any) => node.name) ?? [];

            return frames;
        } catch (err: any) {
            return `Error calling Figma: ${err.message}`;
        }
    }
});
