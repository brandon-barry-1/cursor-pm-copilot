
# Tool Integrations Overview

This guide covers how to integrate and use various tools in your PM workflow with Cursor.

## Available Integrations

### Analytics & Experimentation
- **Statsig** - A/B testing and feature flags
- **Mixpanel** - Product analytics and user behavior
- **Honeycomb** - Observability and debugging

### AI/ML Observability
- **Langfuse** - LLM observability and evaluation

### Design & Collaboration
- **Figma** - Design files and frames
- **Google Drive** - Google Docs, Sheets, and Slides
- **Notion** - Knowledge base and documentation
- **Slack** - Team communication

### Development & Data
- **GitHub** - Code repository and issues
- **Linear** - Issue tracking and project management
- **Databricks** - Data analytics and ML

## Setup

### Environment Variables

Create a `.env` file in the root directory with the following:

```bash
# Figma
FIGMA_TOKEN=your_figma_token

# Langfuse
LANGFUSE_PUBLIC_KEY=your_public_key
LANGFUSE_SECRET_KEY=your_secret_key
LANGFUSE_URL=https://cloud.langfuse.com  # or your self-hosted URL

# Statsig
STATSIG_API_KEY=your_api_key
STATSIG_URL=https://api.statsig.com

# Mixpanel
MIXPANEL_API_SECRET=your_api_secret

# Honeycomb
HONEYCOMB_API_KEY=your_api_key
HONEYCOMB_URL=https://api.honeycomb.io

# Linear
LINEAR_API_KEY=your_linear_api_key

# Google Drive
GOOGLE_API_KEY=your_google_api_key
```

### Getting API Keys

- **Figma**: Settings → Account → Personal Access Tokens
- **Langfuse**: Settings → API Keys
- **Statsig**: Settings → API Keys
- **Mixpanel**: Project Settings → Service Account
- **Honeycomb**: Settings → API Keys
- **Linear**: Settings → API → Create Personal API Key
- **Google Drive**: Google Cloud Console → Enable Drive API → Create API Key

## Usage

### In Cursor Chat

You can use these tools directly in Cursor chat:

```
@langfuse query traces limit 5
@statsig query experiments
@mixpanel query events event "user_signup"
@honeycomb query "SELECT COUNT(*) WHERE service='api'"
@getFigmaFrames fileId=abc123
@queryLinear query issues limit 10
@queryGoogleDrive query search searchQuery "project roadmap"
```

### In Documents

Reference integration data in your documents:

```markdown
## Experiment Results
[Query Statsig for experiment results]

## User Behavior
[Query Mixpanel for funnel data]

## System Performance
[Query Honeycomb for latency metrics]
```

## Integration Guides

- [Langfuse Integration](./langfuse.md)
- [Statsig Integration](./statsig.md)
- [Mixpanel Integration](./mixpanel.md)
- [Honeycomb Integration](./honeycomb.md)
- [Figma Integration](./figma.md)
- [Linear Integration](./linear.md)
- [Google Drive Integration](./google-drive.md)
- [GitHub Integration](./github.md)
- [Databricks Integration](./databricks.md)
- [Notion Integration](./notion.md)
- [Slack Integration](./slack.md)

