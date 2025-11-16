# 🚀 Cursor for Product Managers 🤖

Welcome to **Cursor for Product Managers**! This repository provides a comprehensive toolkit and framework designed to supercharge your product management workflow using Cursor as an AI-native PM copilot. Originally inspired by the [Maven course on AI-native PMs](https://maven.com/p/0a96cb/cursor-isn-t-just-for-coding-how-ai-native-p-ms-work), the [AI Dev Tasks](https://github.com/snarktank/ai-dev-tasks/tree/main) structured workflow approach, and [Lee Robinson's YouTube video](https://www.youtube.com/watch?v=8QN23ZThdRY), this toolkit transforms Cursor from a coding tool into a powerful product thinking, strategic decision-making, and document creation platform.

Stop wrestling with fragmented product management tools and start building a unified, AI-powered PM workspace that grows smarter with every conversation!

## ✨ The Core Idea

Product management involves complex workflows across research, discovery, and delivery. This toolkit aims to bring structure, clarity, and AI-native efficiency to the process by:

1. **Unified Context Management**: Centralizing all PM knowledge, frameworks, and insights in one AI-accessible workspace
2. **Structured Discovery**: Leveraging proven frameworks like Continuous Discovery Habits for systematic user research
3. **AI-Native Workflows**: Using Cursor's capabilities for document-centric work, selective context, and visual diffs
4. **Iterative Improvement**: Building documents that grow smarter with every AI interaction

This approach helps ensure your AI copilot stays on track, makes it easier to manage complex product initiatives, and gives you confidence in AI-generated strategic content.

## 🗂️ Repository Structure

### Company Level Context (`company-level-context/`)
- **Product Vision & Strategy** (`product-vision-and-strateggy/`):
  - `product-strategy-review.mdc`: PRISM-aligned strategy review framework with auto-gate evidence readiness
  - `product-vision-review.mdc`: Vision evaluation framework with 4-criteria scoring system
- **OKRs** (`okrs/`):
  - `okr-sparring-partner.mdc`: Context-aware OKR coaching and sparring partner
- **Team Structure** (`team-structure/`):
  - `readme.md`: Team organization models, design principles, and re-org considerations

### Copilots (`copilots/`)
- **PM Strategic Copilot** (`pm-strategic-copilot.mdc`): Preconfigured prompts and workflows for strategic assistance

### Frameworks (`frameworks/`)
- **Continuous Discovery Habits** (`continuous-discovery-habits/`):
  - `create-interview-snapshots.mdc`
  - `create-opportunities.mdc`
  - `generate-solutions.mdc`
  - `indentify-and-test-assumptions.mdc`
  - `synthesize-interview-snapshots.mdc`
- **Evidence-Guided** (`evidence-guided/`):
  - `calculate-ice-score.mdc`
- **Strategic Review** (in `company-level-context/product-vision-and-strateggy/`):
  - **PRISM Product Strategy Review**: 5-dimension framework (Problem, Reframe, Intentional Bets, Systemized Execution, Momentum) with auto-gate evidence readiness
  - **Product Vision Review**: 4-criteria evaluation (Lofty & Inspiring, Realistic & Attainable, Constraint-Free, Grounded in User Problem)

### Guides (`guides/`)
- **Meetings** (`meetings/`): `1-1s.mdc`
- **Product** (`product/`):
  - `create-1-pager.mdc`: One-pager creation framework
  - `create-design-brief.mdc`: Design brief generation guide
  - `create-prd.mdc`: Product Requirements Document creation
  - `generate-figma-make-prompt.mdc`: Figma design prompt generation
  - `generate-tasks.mdc`: Task breakdown and generation
  - `process-task-list.mdc`: Task list processing and management
- **Integrations** (`integrations/`):
  - `integrations-overview.md`: Overview of all tool integrations
  - Individual guides for Langfuse, Statsig, Mixpanel, Honeycomb, Figma, GitHub, Databricks, Notion, Google Docs, Slack
- **Writing** (`writing/`): `writing.mdc`

### Initiatives (`initiatives/`)
- **Templates** (`_templates/`):
  - `setup-new-initiative.mdc`: New initiative setup guide
  - `initiative-template/` with subfolders for:
    - `assumptions/`: Assumption testing and validation
    - `design/`: Design artifacts and specifications
    - `opportunities/`: Opportunity identification and mapping
    - `prd/`: Product Requirements Documents
    - `product-analytics/`: Analytics and measurement frameworks
    - `solutions/`: Solution ideation and development
    - `tasks/`: Task management and tracking
    - `user-interviews/`: User research with `snapshots/`, `synthesis/`, and `transcripts/` subfolders
- **Archive** (`archive/`): Archived initiatives (`README.md`)

### Meeting Notes (`meeting-notes/`)
- `1-1 notes/`: One-on-one meeting documentation
- `leadership/`: Leadership team meeting notes
- `product-trio/`: Product trio (PM, Design, Engineering) collaboration notes
- `board-n-investor/`: Board and investor meeting documentation

### Workspace (`workspace/`)
- **Docs** (`docs/`): Your personal workspace for project notes, central registers (stakeholders, decisions, risks, metrics, glossary), and current projects
- **Templates** (`templates/`): Comprehensive template library including:
  - Product planning (PRDs, TRDs, feature specs)
  - Roadmaps & planning (quarterly, feature, release, sprint)
  - User stories & requirements (stories, epics, acceptance criteria)
  - Communication (status updates, stakeholder updates, stakeholder maps)
  - Decision making & risk (decision logs, risk registers, change requests)
  - Retrospectives & analysis (retros, post-mortems, competitive analysis)
  - Go-to-market & launch (GTM plans)
  - Metrics & analytics (dashboards, experiment logs, A/B tests, cohort analysis)
  - Meeting notes (sprint planning, product trio, leadership, board - all with PM, Program Manager, and Engineering perspectives)

### Custom Tools (`.cursor/tools/`)
- **Integration Tools**: TypeScript tools for direct API access to:
  - `figma-frames.ts`: Get Figma file frames
  - `local-notes.ts`: Read local notes from workspace/docs/
  - `langfuse.ts`: Query Langfuse for traces, evaluations, metrics
  - `statsig.ts`: Query Statsig for experiments and feature flags
  - `mixpanel.ts`: Query Mixpanel for events, funnels, cohorts
  - `honeycomb.ts`: Query Honeycomb for observability data
  - `linear.ts`: Query Linear for issues, projects, teams
  - `google-drive.ts`: Query Google Drive for documents, sheets, slides
- **Analysis Tools**: Tools for document analysis and reporting:
  - `document-synthesis.ts`: Synthesize multiple documents and answer questions
  - `cross-project-report.ts`: Generate reports across multiple projects
  - `template-validator.ts`: Validate documents against templates
  - `related-docs.ts`: Find related documents by similarity
  - `action-item-tracker.ts`: Extract and track action items across documents

> Tip: When referencing files in Cursor, use the exact path names above.

## 🧭 Quick Start

1. **Clone this repository** to your local workspace
2. **Set up environment variables** (optional, for integrations):
   - Copy `.env.example` to `.env` (if it exists) or create `.env`
   - Add API keys for tools you want to use (Figma, Langfuse, Statsig, Mixpanel, Honeycomb)
   - See `guides/integrations/integrations-overview.md` for details
3. **In Cursor, use `@` to mention files** (e.g., `@company-level-context/product-vision-and-strateggy/product-strategy-review.mdc`)
4. **Start with one of these workflows**:
   - **Strategic Review**: `@company-level-context/product-vision-and-strateggy/product-strategy-review.mdc`
   - **Vision Evaluation**: `@company-level-context/product-vision-and-strateggy/product-vision-review.mdc`
   - **OKR Coaching**: `@company-level-context/okrs/okr-sparring-partner.mdc`
   - **Create a PRD**: `@guides/product/create-prd.mdc`
   - **Start a New Initiative**: `@initiatives/_templates/setup-new-initiative.mdc`
   - **Use a Template**: `@workspace/templates/prd-simple.md`

## 🚀 How to Use

### 1️⃣ Setup Your AI-Native PM Workspace

First, ensure you have Cursor installed and these framework files accessible:

1. Clone or download this repository to your local workspace
2. In Cursor's Agent chat, reference files with `@` (e.g., `@frameworks/continuous-discovery-habits/create-interview-snapshots.mdc`)
3. Follow the structured workflows for different PM activities

### 2️⃣ Leverage AI Dev Tasks Framework

This toolkit integrates with the [AI Dev Tasks](https://github.com/snarktank/ai-dev-tasks/tree/main) structured workflow for complex product initiatives:

1. **Create PRDs**: Use AI to generate comprehensive Product Requirement Documents
2. **Break Down Tasks**: Decompose PRDs into actionable, granular task lists
3. **Iterative Implementation**: Guide AI through one task at a time with verification checkpoints
4. **Progress Tracking**: Visual representation of completed tasks and next steps

### 3️⃣ Document-Centric Workflow

Instead of chat-based interactions, work directly in documents that grow smarter:

- **Selective Context**: Provide only necessary information to AI for focused assistance
- **Visual Diffs**: Clearly see AI-generated content changes and modifications
- **Continuous Learning**: Documents improve with every AI interaction and iteration

## 🔄 Common Workflows

### Product Development
- **Create a PRD**: Start with `guides/product/create-prd.mdc` or use `workspace/templates/prd-simple.md`
- **Create AI/Clinical PRD**: Use `workspace/templates/prd-function-ai.md` for AI/ML features
- **Create TRD**: Use `workspace/templates/trd-function-ai.md` for technical requirements
- **Create One-Pager**: Use `guides/product/create-1-pager.mdc` for concise product summaries
- **Generate Design Brief**: Use `guides/product/create-design-brief.mdc` for design specifications
- **Create Feature Spec**: Use `workspace/templates/feature-spec.md` for lighter-weight specs
- **Generate and Process Tasks**: Use `guides/product/generate-tasks.mdc` and `guides/product/process-task-list.mdc`

### Planning & Roadmaps
- **Create Quarterly Roadmap**: Use `workspace/templates/roadmap-quarterly.md`
- **Create Feature Roadmap**: Use `workspace/templates/roadmap-feature.md`
- **Plan a Release**: Use `workspace/templates/release-plan.md`
- **Plan a Sprint**: Use `workspace/templates/sprint-plan.md`

### Discovery & Research
- **Run Continuous Discovery**: Follow `frameworks/continuous-discovery-habits/*`
- **Create Interview Snapshots**: Use `frameworks/continuous-discovery-habits/create-interview-snapshots.mdc`
- **Synthesize Research**: Use `frameworks/continuous-discovery-habits/synthesize-interview-snapshots.mdc`
- **Score Ideas (ICE)**: Use `frameworks/evidence-guided/calculate-ice-score.mdc`

### Strategy & OKRs
- **Review Product Strategy**: Use `company-level-context/product-vision-and-strateggy/product-strategy-review.mdc` with PRISM framework
- **Evaluate Product Vision**: Use `company-level-context/product-vision-and-strateggy/product-vision-review.mdc` with 4-criteria scoring
- **Coach OKRs**: Use `company-level-context/okrs/okr-sparring-partner.mdc` for context-aware OKR development
- **Design Team Structure**: Reference `company-level-context/team-structure/readme.md` for organizational models

### Analytics & Experiments
- **Plan A/B Test**: Use `workspace/templates/ab-test-plan.md`
- **Design Experiment**: Use `workspace/templates/experiment-design.md`
- **Analyze Cohorts**: Use `workspace/templates/cohort-analysis.md`
- **Track Experiments**: Use `workspace/templates/experiment-log.md`

### Meetings & Communication
- **Sprint Planning Notes**: Use `workspace/templates/meeting-notes-sprint-planning.md` (PM, Program Manager, Engineering perspectives)
- **Product Trio Notes**: Use `workspace/templates/meeting-notes-product-trio.md` (PM, Design, Engineering perspectives)
- **Leadership Notes**: Use `workspace/templates/meeting-notes-leadership.md` (PM, Program Manager, Engineering perspectives)
- **Board Notes**: Use `workspace/templates/meeting-notes-board.md` (PM, Program Manager, Engineering perspectives)
- **Weekly Status**: Use `workspace/templates/status-weekly.md`
- **Stakeholder Update**: Use `workspace/templates/stakeholder-update.md`

### Decision Making & Risk
- **Log Decisions**: Use `workspace/templates/decision-log.md`
- **Track Risks**: Use `workspace/templates/risk-register.md`
- **Request Changes**: Use `workspace/templates/change-request.md`

### Retrospectives & Analysis
- **Run Retrospective**: Use `workspace/templates/retrospective.md`
- **Post-Mortem**: Use `workspace/templates/post-mortem.md`
- **Competitive Analysis**: Use `workspace/templates/competitive-analysis.md`

### Initiatives
- **Start a New Initiative**: Use `initiatives/_templates/setup-new-initiative.mdc` and the `initiative-template/` structure

## 🌟 Key Benefits

* **Structured PM Workflow**: Enforces clear processes from research to delivery
* **AI-Native Efficiency**: Leverages Cursor's capabilities for PM-specific tasks
* **Context Preservation**: Maintains product context across all AI interactions
* **Framework Integration**: Built-in proven PM methodologies and frameworks
* **Strategic Review System**: PRISM-aligned strategy evaluation with auto-gate evidence readiness
* **Vision & OKR Coaching**: Systematic evaluation and coaching for vision clarity and goal setting
* **Organizational Intelligence**: Team structure models and design principles for better alignment
* **Design Integration**: Seamless workflow from product requirements to design specifications
* **Comprehensive Documentation**: From one-pagers to detailed PRDs and design briefs
* **Iterative Improvement**: Documents and frameworks evolve with use
* **Unified Knowledge Base**: Single source of truth for all PM activities

## 🛠️ Framework Integration

### Continuous Discovery Habits
- **Interview Snapshots**: Structured templates for user research documentation
- **Opportunity Mapping**: Systematic approach to identifying product opportunities
- **Solution Generation**: AI-assisted ideation and solution development
- **Synthesis**: Research insights consolidation and pattern recognition

### Evidence-Guided Decision Making
- Data-driven frameworks for strategic decisions
- A/B testing templates and analysis tools
- User behavior analysis frameworks
- ROI calculation and measurement tools

### Strategic Review & Evaluation
- **PRISM Product Strategy Review**: Comprehensive 5-dimension evaluation framework (Problem Diagnosis, Reframe Opportunity, Intentional Bets, Systemized Execution, Momentum & Meta-Reflection) with auto-gate evidence readiness checks
- **Product Vision Review**: 4-criteria vision evaluation system (Lofty & Inspiring, Realistic & Attainable, Constraint-Free, Grounded in User Problem) with 0-5 scoring
- **OKR Sparring Partner**: Context-aware OKR coaching that considers organization size, industry, and maturity level for realistic, executable goal setting
- **Team Structure Design**: Organizational models (Functional, Matrix, Value Stream, Divisional) with design principles and re-org considerations


## 🔧 Cursor-Specific Features

- **Document-Centric Work**: Work in documents rather than chats for better context retention
- **Selective Context**: Choose what information to share with AI for focused assistance
- **Visual Diffs**: Clearly see AI-generated changes and modifications
- **From Instructions to Initiatives**: Build complete product initiatives step by step
- **Custom Tools**: Direct API integration with Langfuse, Statsig, Mixpanel, Honeycomb, and Figma
- **Local Notes Tool**: Read and summarize notes from `workspace/docs/` using `@readLocalNote`

## 🔌 Tool Integrations

This repository includes custom tools and guides for integrating with your existing toolchain:

### Analytics & Experimentation
- **Statsig**: Query experiments and feature flags (`@statsig`)
- **Mixpanel**: Query events, funnels, and cohorts (`@mixpanel`)

### AI/ML Observability
- **Langfuse**: Query traces, evaluations, and metrics (`@langfuse`)

### Observability
- **Honeycomb**: Query observability data and traces (`@honeycomb`)

### Design & Collaboration
- **Figma**: Get frames from Figma files (`@getFigmaFrames`)
- **GitHub**: Link to issues, PRs, and code
- **Notion**: Reference and link to Notion pages
- **Google Docs**: Reference and link to Google Docs
- **Slack**: Link to Slack threads and channels

### Data & Analytics
- **Databricks**: Reference tables, notebooks, and jobs

### Project Management
- **Linear**: Query issues, projects, and teams

See `guides/integrations/integrations-overview.md` for setup and usage details.

## 🎯 High-Priority Tools

### Document Synthesis
Analyze multiple documents (PRDs, TRDs, Linear tickets) and ask questions:
```
@synthesizeDocuments files=["prd-notifications-v2.md", "trd-notifications.md"]
question="What needs to be done and what are the missing issues?"
```

### Cross-Project Reports
Generate comprehensive reports across projects:
```
@generateCrossProjectReport reportType=weekly include=["projects", "metrics", "risks"]
```

### Template Validator
Validate documents against templates:
```
@validateTemplate file=prd-notifications-v2.md template=prd-simple.md
```

### Related Documents Finder
Find related documents by similarity:
```
@findRelatedDocuments file=prd-notifications-v2.md similarity=0.5
```

### Action Item Tracker
Extract and track action items:
```
@trackActionItems scope=workspace/docs/ status=open owner="John Doe"
```

See `guides/tools/high-priority-tools-guide.md` for detailed usage.

## 📚 Documentation

- **README.md** (this file): Overview and quick start
- **USAGE_GUIDE.md**: Comprehensive usage guide with detailed workflows, best practices, and troubleshooting
- **ADDITIONAL_FUNCTIONALITY.md**: Ideas for additional features and functionality
- **workspace/docs/index.md**: Complete index of all templates and docs

## 🙏 Acknowledgments

- **[Cursor isn't just for coding: how AI-native PMs work](https://maven.com/p/0a96cb/cursor-isn-t-just-for-coding-how-ai-native-p-ms-work)** - Tal Raviv and Hilary Gridley's course on transforming Cursor into a PM AI copilot
- **[AI Dev Tasks](https://github.com/snarktank/ai-dev-tasks/tree/main)** - Structured workflow framework for AI-assisted development that inspired our PM workflow approach
- **[Cursor AI Agents Work Like 10 Developers (Cursor VP Live Demo)](https://www.youtube.com/watch?v=8QN23ZThdRY)** - Lee Robinson demonstrates how Cursor AI agents automate developer tasks.

- **[Continuous Discovery Habits](https://www.youtube.com/watch?v=9RFaz9ZBXpk)** - Teresa Torres' framework on continuous discovery
- **[Evidence-Guided](https://www.youtube.com/watch?v=aJWSn-tz3jQ)** - Itamar Gilad's framework on evidence-guided product development

---

Happy AI-assisted product managing! 🚀
