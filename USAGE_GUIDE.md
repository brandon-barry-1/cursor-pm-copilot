
# 📖 Complete Usage Guide

This comprehensive guide covers everything you need to know to effectively use the Cursor PM Copilot repository.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Repository Structure](#repository-structure)
3. [Core Workflows](#core-workflows)
4. [Templates Library](#templates-library)
5. [Tool Integrations](#tool-integrations)
6. [Best Practices](#best-practices)
7. [Advanced Usage](#advanced-usage)
8. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites

- **Cursor IDE** installed and configured
- **Node.js** (for custom tools, if using integrations)
- **Git** (for version control)

### Initial Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd cursor-pm-copilot
   ```

2. **Install dependencies** (if using custom tools):
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional, for integrations):
   - Create a `.env` file in the root directory
   - Add API keys for tools you want to use:
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

4. **Open in Cursor**:
   - Open the repository folder in Cursor
   - The AI will automatically have access to all files

### Integration Quickstart (auth)

- **Google Drive**: Set `GOOGLE_OAUTH_TOKEN` (Bearer) for private files; `GOOGLE_API_KEY` only works for public files. Use `queryGoogleDrive` with `export` to pull Doc/Sheet/Slide content as text.
- **Mixpanel**: Set `MIXPANEL_API_SECRET`; for JQL, pass `query="jql"` and `jql="function main() { ... }"`.
- **Statsig**: Set `STATSIG_API_KEY`; use `query="experiments" | "feature-flags" | "metrics"` (metrics requires `metricName`).
- **Honeycomb**: Set `HONEYCOMB_API_KEY`; use `queryHoneycomb` with a query expression and `timeRange` (1h/24h/7d).
- **Drive summarization**: Use `summarizeDocuments` to build a summary prompt from multiple docs (auto-truncates to keep context small).

### Your First Task

Try creating a PRD:

1. In Cursor chat, type: `@guides/product/create-prd.mdc`
2. Or use a template: `@workspace/templates/prd-simple.md`
3. Follow the prompts to create your first PRD

---

## Repository Structure

### High-Level Organization

```
cursor-pm-copilot/
├── company-level-context/    # Strategic frameworks and company context
├── copilots/                  # Preconfigured AI copilots
├── frameworks/                # PM methodologies (Continuous Discovery, etc.)
├── guides/                    # Step-by-step guides
│   ├── integrations/          # Tool integration guides
│   ├── meetings/              # Meeting guides
│   ├── product/               # Product development guides
│   └── writing/               # Writing style guides
├── initiatives/               # Initiative templates and structure
├── meeting-notes/             # Your meeting notes
├── workspace/                 # Your personal workspace
│   ├── docs/                  # Your project notes and registers
│   └── templates/             # Template library
└── .cursor/                   # Cursor configuration
    ├── rules/                 # AI behavior rules
    └── tools/                 # Custom integration tools
```

### Understanding the Workspace

The `workspace/` directory is **your personal workspace**:

- **`workspace/docs/`**: Your project notes, central registers, and current projects
- **`workspace/templates/`**: Comprehensive template library (30+ templates)

### Understanding Frameworks vs. Templates

- **Frameworks** (`frameworks/`): AI-powered workflows that guide you through processes
- **Templates** (`workspace/templates/`): Document structures you fill in
- **Guides** (`guides/`): Step-by-step instructions for using frameworks and templates

---

## Core Workflows

### 1. Creating a PRD

**Option A: Using the Guide**
```
@guides/product/create-prd.mdc
```
The guide will ask clarifying questions and help you create a comprehensive PRD.

**Option B: Using a Template**
```
@workspace/templates/prd-simple.md
```
Copy the template and fill it in with Cursor's help.

**Option C: Using Justfile**
```bash
just prd "Feature Name"
```
This generates a prompt you can paste into Cursor chat.

### 2. Starting a New Initiative

1. Reference the setup guide:
   ```
   @initiatives/_templates/setup-new-initiative.mdc
   ```

2. Create a new folder under `initiatives/`:
   ```
   initiatives/my-new-initiative/
   ```

3. Copy the structure from `initiatives/_templates/initiative-template/`

4. Use the frameworks to populate each section:
   - User interviews: `@frameworks/continuous-discovery-habits/create-interview-snapshots.mdc`
   - Opportunities: `@frameworks/continuous-discovery-habits/create-opportunities.mdc`
   - Solutions: `@frameworks/continuous-discovery-habits/generate-solutions.mdc`
   - Assumptions: `@frameworks/continuous-discovery-habits/indentify-and-test-assumptions.mdc`

### 3. Running Continuous Discovery

1. **Conduct Interviews**: Use `@frameworks/continuous-discovery-habits/create-interview-snapshots.mdc`
2. **Create Snapshots**: Document each interview
3. **Synthesize**: Use `@frameworks/continuous-discovery-habits/synthesize-interview-snapshots.mdc`
4. **Identify Opportunities**: Use `@frameworks/continuous-discovery-habits/create-opportunities.mdc`
5. **Generate Solutions**: Use `@frameworks/continuous-discovery-habits/generate-solutions.mdc`
6. **Test Assumptions**: Use `@frameworks/continuous-discovery-habits/indentify-and-test-assumptions.mdc`

### 4. Planning a Sprint

1. Use the template: `@workspace/templates/sprint-plan.md`
2. Or use meeting notes template: `@workspace/templates/meeting-notes-sprint-planning.md`
3. Fill in from PM, Program Manager, and Engineering perspectives
4. Reference previous sprint plans for context

### 5. Running an Experiment

1. **Design the Experiment**: Use `@workspace/templates/experiment-design.md`
2. **Plan A/B Test** (if applicable): Use `@workspace/templates/ab-test-plan.md`
3. **Track Results**: Use `@workspace/templates/experiment-log.md`
4. **Query Analytics**: Use integration tools (`@statsig`, `@mixpanel`)
5. **Analyze Cohorts**: Use `@workspace/templates/cohort-analysis.md`

### 6. Strategic Review

1. **Product Strategy Review**: `@company-level-context/product-vision-and-strateggy/product-strategy-review.mdc`
   - Uses PRISM framework
   - Auto-gate evidence readiness
   - 5-dimension evaluation

2. **Vision Evaluation**: `@company-level-context/product-vision-and-strateggy/product-vision-review.mdc`
   - 4-criteria scoring system
   - Lofty & Inspiring, Realistic & Attainable, Constraint-Free, Grounded in User Problem

3. **OKR Coaching**: `@company-level-context/okrs/okr-sparring-partner.mdc`
   - Context-aware OKR development
   - Considers organization size, industry, maturity

---

## Templates Library

### When to Use Which Template

#### Product Planning & Strategy
- **`prd-simple.md`**: Standard product features
- **`prd-function-ai.md`**: AI/ML/Clinical features (includes Langfuse, evaluation, guardrails)
- **`trd-function-ai.md`**: Technical requirements for AI/ML systems
- **`feature-spec.md`**: Lighter-weight specs (smaller than PRD)

#### Roadmaps & Planning
- **`roadmap-quarterly.md`**: Quarterly planning with themes, goals, initiatives
- **`roadmap-feature.md`**: Feature area roadmaps (Now/Next/Later)
- **`release-plan.md`**: Release planning with phases, rollout strategy
- **`sprint-plan.md`**: Sprint planning with capacity, stories, tasks

#### User Stories & Requirements
- **`user-story.md`**: Individual user stories with acceptance criteria
- **`epic.md`**: Epic planning with multiple stories
- **`acceptance-criteria.md`**: Detailed acceptance criteria template

#### Communication & Updates
- **`status-weekly.md`**: Weekly status updates
- **`stakeholder-update.md`**: Stakeholder communications (leadership, board, etc.)
- **`stakeholder-map.md`**: Stakeholder analysis and mapping

#### Decision Making & Risk
- **`decision-log.md`**: Track important decisions with context and rationale
- **`risk-register.md`**: Risk tracking and mitigation
- **`change-request.md`**: Change management and scope changes

#### Retrospectives & Analysis
- **`retrospective.md`**: Sprint/team retrospectives
- **`post-mortem.md`**: Incident/launch post-mortems
- **`competitive-analysis.md`**: Competitive landscape analysis

#### Go-to-Market & Launch
- **`gtm-plan.md`**: Go-to-market planning with phases, messaging, channels

#### Metrics & Analytics
- **`metrics-dashboard.md`**: Metrics tracking and dashboards
- **`experiment-log.md`**: Experiment tracking over time
- **`ab-test-plan.md`**: A/B test planning (Statsig/Mixpanel ready)
- **`experiment-design.md`**: Experiment design for any type
- **`cohort-analysis.md`**: Cohort analysis for user behavior

#### Meeting Notes
All meeting note templates include **PM, Program Manager, and Engineering perspectives**:
- **`meeting-notes-sprint-planning.md`**: Sprint planning
- **`meeting-notes-product-trio.md`**: Product trio (PM, Design, Engineering)
- **`meeting-notes-leadership.md`**: Leadership meetings
- **`meeting-notes-board.md`**: Board meetings

### Template Usage Pattern

1. **Find the right template**: Check `workspace/docs/index.md` for the full list
2. **Reference in Cursor**: `@workspace/templates/template-name.md`
3. **Copy or create**: Either copy the template or ask Cursor to create a new file based on it
4. **Fill in with AI help**: Use Cursor to help fill in each section
5. **Iterate**: Documents improve with each AI interaction

---

## Tool Integrations

### Available Integration Tools

#### Langfuse (LLM Observability)
```bash
@langfuse query traces limit 5
@langfuse query evaluations limit 5
@langfuse query traces traceId trace_abc123
```

**Use Cases**:
- Track AI/ML model performance in PRDs
- Debug model issues in post-mortems
- Monitor evaluations in experiment logs

#### Statsig (A/B Testing)
```bash
@statsig query experiments
@statsig query experiments experimentId exp_abc123
@statsig query feature-flags
```

**Use Cases**:
- Get experiment results for A/B test plans
- Check feature flag status for release planning
- Document experiment-driven decisions

#### Mixpanel (Product Analytics)
```bash
@mixpanel query events event "user_signup" limit 100
@mixpanel query jql jql "function main() { return Events().groupBy(['name'], mixpanel.reducer.count()); }"
```

**Use Cases**:
- Pull metrics into dashboards
- Analyze user behavior in PRDs
- Track funnels and cohorts

#### Honeycomb (Observability)
```bash
@honeycomb query "SELECT COUNT(*) WHERE service='api'" dataset production timeRange 1h
```

**Use Cases**:
- Debug incidents in post-mortems
- Monitor system health in release plans
- Track performance metrics

#### Figma (Design)
```bash
@getFigmaFrames fileId abc123def456
```

**Use Cases**:
- List frames from Figma files in PRDs
- Reference designs in feature specs
- Track design changes

### Integration Setup

1. **Get API Keys**: See `guides/integrations/integrations-overview.md`
2. **Add to `.env`**: Add your API keys
3. **Test**: Try a query in Cursor chat
4. **Use in Docs**: Reference integration data in your documents

### Integration Guides

Each tool has a dedicated guide in `guides/integrations/`:
- `langfuse.md`
- `statsig.md`
- `mixpanel.md`
- `honeycomb.md`
- `figma.md`
- `github.md`
- `databricks.md`
- `notion.md`
- `google-docs.md`
- `slack.md`

---

## Best Practices

### Document Organization

1. **Use Central Registers**: Keep stakeholders, decisions, risks, and metrics in central docs
   - `workspace/docs/stakeholders.md`
   - `workspace/docs/decisions.md`
   - `workspace/docs/risks.md`
   - `workspace/docs/metrics.md`
   - `workspace/docs/glossary.md`

2. **Project Notes**: Keep project-specific notes in `workspace/docs/`
   - Use descriptive filenames: `prd-notifications-v2.md`
   - Link to related docs

3. **Meeting Notes**: Organize by type in `meeting-notes/`
   - Use templates for consistency
   - Include all perspectives (PM, Program Manager, Engineering)

### Using AI Effectively

1. **Be Specific**: Reference specific files and templates
   - ✅ `@workspace/templates/prd-simple.md create a PRD for notifications`
   - ❌ `create a PRD`

2. **Provide Context**: Share relevant information
   - Reference related docs
   - Include constraints and requirements

3. **Iterate**: Build documents over multiple interactions
   - Start with structure
   - Fill in sections one at a time
   - Refine based on feedback

4. **Use Templates**: Always start with templates
   - Ensures consistency
   - Includes all necessary sections
   - Makes AI assistance more effective

### Integration Best Practices

1. **Link, Don't Duplicate**: Reference external tools rather than copying content
2. **Use Integration Tools**: Query APIs directly in Cursor chat
3. **Document Links**: Include links to external resources in your docs
4. **Keep in Sync**: Update both Cursor docs and external tools

### Meeting Notes Best Practices

1. **Use Templates**: Always use the appropriate template
2. **Include All Perspectives**: Fill in PM, Program Manager, and Engineering sections
3. **Action Items**: Clearly mark action items with owners
4. **Follow-up**: Link to related docs and previous meetings

---

## Advanced Usage

### Custom Tools Development

You can create custom tools in `.cursor/tools/`:

1. **Create a TypeScript file**: `my-tool.ts`
2. **Use the pattern**: See existing tools for examples
3. **Add to `.env`**: Add any required API keys
4. **Test**: Try using it in Cursor chat

### Workflow Automation

Use the `justfile` for common tasks:

```bash
# Daily planning
just daily

# Weekly status
just weekly-status

# Create PRD
just prd "Feature Name"

# Create AI/Clinical PRD
just prd-ai "Feature Name"

# Create TRD
just trd-ai "System Name"

# Summarize note
just note-summary filename.md
```

### Cross-Document Analysis

Use Cursor to analyze across multiple documents:

```
Analyze all PRDs in workspace/docs/ and identify:
1. Common patterns
2. Missing sections
3. Areas for improvement
```

### Template Customization

1. **Copy a template**: Create a customized version
2. **Modify for your needs**: Adjust sections as needed
3. **Save in workspace**: Keep customized templates in `workspace/templates/`
4. **Document changes**: Note what you changed and why

---

## Troubleshooting

### Integration Tools Not Working

1. **Check `.env`**: Ensure API keys are set correctly
2. **Verify API Keys**: Test keys in the tool's UI
3. **Check URLs**: Verify base URLs are correct
4. **Review Error Messages**: Check Cursor chat for specific errors

### Templates Not Found

1. **Check Path**: Use exact paths from `workspace/docs/index.md`
2. **Use `@` Symbol**: Always prefix with `@` in Cursor chat
3. **Check File Exists**: Verify the file exists in the repository

### AI Not Following Instructions

1. **Be More Specific**: Provide more context and details
2. **Reference Files**: Use `@` to reference specific files
3. **Break Down Tasks**: Split complex tasks into smaller steps
4. **Use Templates**: Start with templates for structure

### Documents Not Updating

1. **Save Files**: Ensure files are saved
2. **Refresh Context**: Re-reference files in Cursor chat
3. **Check File Permissions**: Ensure files are writable

---

## Quick Reference

### Common Commands

```bash
# Justfile commands
just daily                    # Daily planning prompt
just weekly-status            # Weekly status prompt
just prd "Feature Name"       # PRD creation prompt
just prd-ai "Feature Name"   # AI/Clinical PRD prompt
just trd-ai "System Name"    # TRD creation prompt
just note-summary filename.md # Note summary prompt
```

### Common Cursor Chat Patterns

```
# Create a PRD
@workspace/templates/prd-simple.md create a PRD for [feature]

# Start an initiative
@initiatives/_templates/setup-new-initiative.mdc help me start [initiative]

# Query integration
@langfuse query traces limit 5

# Summarize a note
@readLocalNote filename=project-notes.md then summarize and extract action items
```

### File Locations

- **Your Project Notes**: `workspace/docs/`
- **Templates**: `workspace/templates/`
- **Meeting Notes**: `meeting-notes/`
- **Initiatives**: `initiatives/`
- **Integration Guides**: `guides/integrations/`

---

## Getting Help

1. **Check the Guides**: Start with `guides/integrations/integrations-overview.md`
2. **Review Templates**: See `workspace/docs/index.md` for all templates
3. **Read the README**: See `README.md` for overview
4. **Ask Cursor**: Use Cursor chat to ask questions about the repository

---

## Next Steps

1. **Set up integrations**: Add API keys to `.env`
2. **Create your first PRD**: Use `@workspace/templates/prd-simple.md`
3. **Start an initiative**: Use `@initiatives/_templates/setup-new-initiative.mdc`
4. **Try integrations**: Query Langfuse, Statsig, or Mixpanel
5. **Organize your workspace**: Set up central registers in `workspace/docs/`

Happy product managing! 🚀
