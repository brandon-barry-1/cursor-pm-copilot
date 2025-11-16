
# New Templates & Integrations - Changelog

## Summary

This document summarizes all the new templates, guides, and integrations added to make the workspace more complete for Product Manager, Program Manager, and Engineering roles.

## Meeting Note Templates (4 new)

All meeting note templates include perspectives from **Product Manager**, **Program Manager**, and **Engineering**:

1. **meeting-notes-sprint-planning.md** - Sprint planning notes with PM, Program Manager, and Engineering perspectives
2. **meeting-notes-product-trio.md** - Product trio (PM, Design, Engineering) meeting notes
3. **meeting-notes-leadership.md** - Leadership meeting notes with all three perspectives
4. **meeting-notes-board.md** - Board meeting notes with PM, Program Manager, and Engineering perspectives

## Analytics Templates (3 new)

1. **ab-test-plan.md** - Comprehensive A/B test planning template with Statsig/Mixpanel integration
2. **experiment-design.md** - Experiment design template for any type of experiment
3. **cohort-analysis.md** - Cohort analysis template for user behavior analysis

## Integration Tools (4 new TypeScript tools)

Custom Cursor tools for direct API integration:

1. **langfuse.ts** - Query Langfuse for traces, evaluations, and metrics
2. **statsig.ts** - Query Statsig for experiments and feature flags
3. **mixpanel.ts** - Query Mixpanel for events, funnels, and cohorts
4. **honeycomb.ts** - Query Honeycomb for observability data and traces

## Integration Guides (11 guides)

Comprehensive guides for all integrated tools:

1. **integrations-overview.md** - Overview of all integrations and setup
2. **langfuse.md** - Langfuse integration guide
3. **statsig.md** - Statsig integration guide
4. **mixpanel.md** - Mixpanel integration guide
5. **honeycomb.md** - Honeycomb integration guide
6. **figma.md** - Figma integration guide (existing tool)
7. **github.md** - GitHub integration guide
8. **databricks.md** - Databricks integration guide
9. **notion.md** - Notion integration guide
10. **google-docs.md** - Google Docs integration guide
11. **slack.md** - Slack integration guide

## Setup Required

### Environment Variables

Add these to your `.env` file:

```bash
# Figma
FIGMA_TOKEN=your_figma_token

# Langfuse
LANGFUSE_PUBLIC_KEY=your_public_key
LANGFUSE_SECRET_KEY=your_secret_key
LANGFUSE_URL=https://cloud.langfuse.com

# Statsig
STATSIG_API_KEY=your_api_key
STATSIG_URL=https://api.statsig.com

# Mixpanel
MIXPANEL_API_SECRET=your_api_secret

# Honeycomb
HONEYCOMB_API_KEY=your_api_key
HONEYCOMB_URL=https://api.honeycomb.io
```

### Getting API Keys

- **Figma**: Settings → Account → Personal Access Tokens
- **Langfuse**: Settings → API Keys
- **Statsig**: Settings → API Keys
- **Mixpanel**: Project Settings → Service Account
- **Honeycomb**: Settings → API Keys

## Usage Examples

### In Cursor Chat

```
@langfuse query traces limit 5
@statsig query experiments
@mixpanel query events event "user_signup"
@honeycomb query "SELECT COUNT(*) WHERE service='api'"
@getFigmaFrames fileId=abc123
```

### In Documents

Reference integration data in your PRDs, status updates, and analysis docs:

```markdown
## Experiment Results
[Query Statsig for experiment results]

## User Behavior
[Query Mixpanel for funnel data]

## System Performance
[Query Honeycomb for latency metrics]
```

## Total Additions

- **7 new templates** (4 meeting notes + 3 analytics)
- **4 new integration tools** (TypeScript)
- **11 new integration guides** (Markdown)
- **Updated index.md** with all new content

## Next Steps

1. Set up environment variables in `.env`
2. Get API keys for tools you want to use
3. Try the integration tools in Cursor chat
4. Use the new templates for your next meetings and experiments
5. Reference integration guides when working with external tools

