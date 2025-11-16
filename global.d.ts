// Allow Cursor's defineTool helper to type-check without errors in this repo.
declare function defineTool(config: {
    name: string;
    description: string;
    parameters?: any;
    inputSchema?: any;
    execute: (args: any) => any | Promise<any>;
}): any;
