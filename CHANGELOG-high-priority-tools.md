
# High-Priority Tools - Implementation Summary

## Overview

All high-priority functionalities have been implemented, along with Linear and Google Drive integrations.

## New Tools Created

### 1. Document Synthesis Tool (`document-synthesis.ts`)

**Purpose**: Analyze multiple documents (PRDs, TRDs, Linear tickets, etc.) and answer questions from PM/Program Manager/Engineering perspectives.

**Features**:
- Multi-document analysis
- Perspective-based analysis (product, program, engineering, all)
- Comprehensive analysis framework (10 sections)
- Question-answering capability
- Output to file option

**Usage**:
```
@synthesizeDocuments files=["prd-notifications-v2.md", "trd-notifications.md"]
question="What needs to be done and what are the missing issues?"
perspective=program
```

**Analysis Sections**:
1. Executive Summary
2. What Needs to Be Done
3. Missing Issues & Gaps
4. Risks & Dependencies
5. Key Decisions Needed
6. Timeline & Milestones
7. Resource & Capacity
8. Metrics & Success Criteria
9. Stakeholder Considerations
10. Recommendations

### 2. Cross-Project Report Generator (`cross-project-report.ts`)

**Purpose**: Generate comprehensive reports across multiple projects by pulling data from PRDs, status docs, metrics, risks, and decisions.

**Features**:
- Multiple report types (weekly, monthly, quarterly, portfolio, stakeholder, custom)
- Configurable data sources (projects, metrics, risks, decisions, action-items, experiments)
- Date range filtering
- Automatic data collection from workspace
- Output to file option

**Usage**:
```
@generateCrossProjectReport reportType=weekly include=["projects", "metrics", "risks"]
outputFile=weekly-report-2024-01.md
```

### 3. Template Validator (`template-validator.ts`)

**Purpose**: Validate that documents (PRDs, TRDs, etc.) follow template structure and include all required sections.

**Features**:
- Auto-detection of template type
- Section comparison
- Missing section detection
- Empty section detection
- Extra section identification
- Recommendations

**Usage**:
```
@validateTemplate file=prd-notifications-v2.md template=prd-simple.md
```

### 4. Related Documents Finder (`related-docs.ts`)

**Purpose**: Find related documents based on content similarity, shared topics, or keywords.

**Features**:
- Content similarity analysis
- Keyword extraction
- Similarity threshold configuration
- Snippet extraction
- Shared keywords identification

**Usage**:
```
@findRelatedDocuments file=prd-notifications-v2.md similarity=0.5 maxResults=10
```

### 5. Action Item Tracker (`action-item-tracker.ts`)

**Purpose**: Extract and track action items across all documents in workspace/docs/.

**Features**:
- Automatic extraction from markdown checkboxes
- Status filtering (open, closed, all)
- Owner filtering
- Due date filtering (including overdue detection)
- Context extraction
- Markdown report generation

**Usage**:
```
@trackActionItems scope=workspace/docs/ status=open owner="John Doe"
dueDate=overdue outputFile=action-items-report.md
```

## New Integrations

### 6. Linear Integration (`linear.ts`)

**Purpose**: Query Linear for issues, projects, teams, and other data.

**Features**:
- Query issues (with filters)
- Get specific issue details
- Query projects
- Query teams
- GraphQL-based API

**Usage**:
```
@queryLinear query issues limit 10
@queryLinear query issues issueId ENG-123
@queryLinear query projects
```

**Setup**: Add `LINEAR_API_KEY` to `.env`

### 7. Google Drive Integration (`google-drive.ts`)

**Purpose**: Query Google Drive for documents, sheets, and slides.

**Features**:
- Search for files
- List recent files
- Get file metadata
- List files in folder
- Filter by type (document, spreadsheet, presentation)

**Usage**:
```
@queryGoogleDrive query search searchQuery "project roadmap" fileType document
@queryGoogleDrive query list fileType spreadsheet
@queryGoogleDrive query file fileId your-file-id
```

**Setup**: Add `GOOGLE_API_KEY` to `.env`

## Documentation Created

1. **`guides/tools/document-synthesis-guide.md`** - Comprehensive guide for document synthesis
2. **`guides/tools/high-priority-tools-guide.md`** - Guide for all high-priority tools
3. **`guides/integrations/linear.md`** - Linear integration guide
4. **`guides/integrations/google-drive.md`** - Google Drive integration guide
5. **Updated `guides/integrations/integrations-overview.md`** - Added Linear and Google Drive

## Dependencies Added

- `glob@^11.0.0` - For file pattern matching
- `@types/glob@^8.1.0` - TypeScript types for glob

## Updated Files

1. **`README.md`** - Added high-priority tools section
2. **`package.json`** - Added glob dependency
3. **`guides/integrations/integrations-overview.md`** - Added Linear and Google Drive

## Usage Examples

### Complete Workflow: Project Health Check

```bash
# 1. Validate PRD
@validateTemplate file=prd-notifications-v2.md

# 2. Find related documents
@findRelatedDocuments file=prd-notifications-v2.md

# 3. Get Linear issues
@queryLinear query issues filter '{"project":{"name":{"eq":"Notifications v2"}}}'

# 4. Synthesize documents
@synthesizeDocuments files=["prd-notifications-v2.md", "trd-notifications.md"]
question="What needs to be done and what are the missing issues?"

# 5. Track action items
@trackActionItems scope=workspace/docs/ status=open

# 6. Generate weekly report
@generateCrossProjectReport reportType=weekly include=["all"]
```

### Document Synthesis with Linear

```bash
# Get Linear issues for a project
@queryLinear query issues filter '{"project":{"name":{"eq":"Notifications v2"}}}'

# Save to file (manually or via tool)
# Then synthesize
@synthesizeDocuments files=["prd-notifications-v2.md", "linear-issues.json"]
perspective=program question="What are the dependencies and risks?"
```

## Next Steps

1. **Install Dependencies**: Run `npm install` (already done)
2. **Set Up API Keys**: Add Linear and Google Drive API keys to `.env`
3. **Try the Tools**: Start with document synthesis on an existing project
4. **Generate Reports**: Create your first cross-project report
5. **Track Action Items**: Run action item tracker to see what's open

## Environment Variables Needed

Add to `.env`:

```bash
# Linear
LINEAR_API_KEY=your_linear_api_key

# Google Drive
GOOGLE_API_KEY=your_google_api_key
```

## Questions or Issues?

- Check `guides/tools/high-priority-tools-guide.md` for detailed usage
- Check `guides/integrations/linear.md` for Linear setup
- Check `guides/integrations/google-drive.md` for Google Drive setup

All tools are ready to use! 🚀

