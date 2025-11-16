
# Linear Integration Guide

## Overview

Linear is a modern issue tracking and project management tool. Use it to track work items, understand project status, and extract action items for your PM workflow.

## Setup

1. Set environment variables in `.env`:
   ```bash
   LINEAR_API_KEY=your_linear_api_key
   ```

2. Get API key from Linear:
   - Go to Linear Settings → API
   - Create a new Personal API Key
   - Copy the key to your `.env` file

## Usage

### Query Issues

```
@queryLinear query issues limit 10
```

### Get Specific Issue

```
@queryLinear query issues issueId ENG-123
```

### Query Projects

```
@queryLinear query projects limit 5
```

### Query Teams

```
@queryLinear query teams
```

### Get Specific Project

```
@queryLinear query projects projectId project-id-here
```

### Filter Issues

You can use GraphQL filters (as JSON string):
```
@queryLinear query issues filter '{"assignee":{"isMe":{"eq":true}}}' limit 20
```

## Use Cases

### In Document Synthesis

Combine Linear issues with PRDs and TRDs:

```
@synthesizeDocuments files=["prd-notifications-v2.md", "trd-notifications.md"]
question="What Linear issues are related to this project and what needs to be done?"
```

Then query Linear:
```
@queryLinear query issues filter '{"project":{"name":{"eq":"Notifications v2"}}}'
```

### In Cross-Project Reports

Include Linear data in reports:

```markdown
## Project Status
- Linear Issues: [Query Linear for project issues]
- Open Issues: [Count from Linear]
- Blocked Issues: [Filter by status]
```

### In Action Item Tracking

Extract action items from Linear:

```markdown
## Action Items from Linear
- [Query Linear for issues assigned to me]
- [Query Linear for high-priority issues]
```

### In PRDs

Link to Linear issues:

```markdown
## Implementation
- Linear Issues: [Issue #123](https://linear.app/issue/ENG-123)
- Related Issues: [Query Linear for related issues]
```

## Best Practices

1. **Link Issues in Docs**: Always include Linear issue links in PRDs and TRDs
2. **Query for Status**: Use Linear API to get real-time project status
3. **Track Dependencies**: Use Linear's dependency features and reference in docs
4. **Extract Action Items**: Query Linear for open issues assigned to you or your team

## Linear GraphQL Schema

Linear uses GraphQL. Common fields:
- `id`: Issue ID
- `identifier`: Issue identifier (e.g., "ENG-123")
- `title`: Issue title
- `description`: Issue description
- `state`: Issue state (name, type)
- `assignee`: Assigned user
- `priority`: Priority level
- `project`: Associated project
- `team`: Team
- `labels`: Labels
- `url`: Issue URL

## Related Templates

- `templates/prd-simple.md` - Product requirements
- `templates/release-plan.md` - Release planning
- `templates/user-story.md` - User stories
- `templates/action-item-tracker.md` - Action item tracking (use with Linear)

