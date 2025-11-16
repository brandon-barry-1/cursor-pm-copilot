/// <reference path="../../global.d.ts" />
import { z } from "zod";

export default defineTool({
    name: "queryLinear",
    description: "Query Linear for issues, projects, teams, and other data. Useful for tracking work items, understanding project status, and extracting action items.",
    parameters: z.object({
        query: z
            .string()
            .describe("What to query: 'issues', 'projects', 'teams', or a specific issue ID"),
        issueId: z
            .string()
            .optional()
            .describe("Optional: Specific Linear issue ID (e.g., 'ENG-123')"),
        projectId: z
            .string()
            .optional()
            .describe("Optional: Specific Linear project ID"),
        teamId: z
            .string()
            .optional()
            .describe("Optional: Specific Linear team ID"),
        filter: z
            .string()
            .optional()
            .describe("Optional: GraphQL filter string for issues"),
        limit: z
            .number()
            .optional()
            .default(10)
            .describe("Number of results to return (default: 10)"),
    }),
    async execute({ query, issueId, projectId, teamId, filter, limit }) {
        try {
            const apiKey = process.env.LINEAR_API_KEY ?? "";
            const baseUrl = "https://api.linear.app/graphql";

            if (!apiKey) {
                return "LINEAR_API_KEY must be set in .env. Get your API key from Linear Settings → API.";
            }

            // GraphQL queries
            let graphqlQuery = "";
            let variables: any = {};

            if (issueId) {
                // Get specific issue
                graphqlQuery = `
                    query GetIssue($id: String!) {
                        issue(id: $id) {
                            id
                            identifier
                            title
                            description
                            priority
                            state {
                                name
                                type
                            }
                            assignee {
                                name
                                email
                            }
                            creator {
                                name
                                email
                            }
                            labels {
                                nodes {
                                    name
                                }
                            }
                            project {
                                name
                            }
                            team {
                                name
                                key
                            }
                            createdAt
                            updatedAt
                            dueDate
                            estimate
                            url
                        }
                    }
                `;
                variables = { id: issueId };
            } else if (query === "issues") {
                // List issues
                graphqlQuery = `
                    query GetIssues($filter: IssueFilter, $first: Int!) {
                        issues(filter: $filter, first: $first) {
                            nodes {
                                id
                                identifier
                                title
                                description
                                priority
                                state {
                                    name
                                    type
                                }
                                assignee {
                                    name
                                    email
                                }
                                team {
                                    name
                                    key
                                }
                                project {
                                    name
                                }
                                url
                                createdAt
                                updatedAt
                            }
                        }
                    }
                `;
                variables = {
                    filter: filter ? JSON.parse(filter) : undefined,
                    first: limit,
                };
            } else if (query === "projects") {
                // List projects
                graphqlQuery = `
                    query GetProjects($first: Int!) {
                        projects(first: $first) {
                            nodes {
                                id
                                name
                                description
                                state
                                progress
                                startDate
                                targetDate
                                url
                            }
                        }
                    }
                `;
                variables = { first: limit };
            } else if (query === "teams") {
                // List teams
                graphqlQuery = `
                    query GetTeams {
                        teams {
                            nodes {
                                id
                                name
                                key
                                description
                            }
                        }
                    }
                `;
            } else if (projectId) {
                // Get specific project
                graphqlQuery = `
                    query GetProject($id: String!) {
                        project(id: $id) {
                            id
                            name
                            description
                            state
                            progress
                            startDate
                            targetDate
                            issues {
                                nodes {
                                    id
                                    identifier
                                    title
                                    state {
                                        name
                                    }
                                }
                            }
                            url
                        }
                    }
                `;
                variables = { id: projectId };
            } else {
                return `Unknown query type: ${query}. Use 'issues', 'projects', 'teams', or provide an issueId/projectId.`;
            }

            const res = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: apiKey,
                },
                body: JSON.stringify({
                    query: graphqlQuery,
                    variables: Object.keys(variables).length > 0 ? variables : undefined,
                }),
            });

            if (!res.ok) {
                return `Linear API error: ${res.status} ${res.statusText}`;
            }

            const data = await res.json();

            if (data.errors) {
                return `Linear GraphQL error: ${JSON.stringify(data.errors)}`;
            }

            return JSON.stringify(data.data, null, 2);
        } catch (err: any) {
            return `Error querying Linear: ${err.message}`;
        }
    },
});

