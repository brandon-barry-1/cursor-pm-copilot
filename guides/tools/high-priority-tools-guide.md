
# High-Priority Tools Guide

This guide covers the high-priority tools for document synthesis, reporting, validation, and tracking.

## Tools Overview

1. **Document Synthesis** - Analyze multiple documents and ask questions
2. **Cross-Project Reports** - Generate comprehensive reports across projects
3. **Template Validator** - Validate documents against templates
4. **Related Documents Finder** - Find related documents by similarity
5. **Action Item Tracker** - Extract and track action items

## 1. Document Synthesis

See [Document Synthesis Guide](./document-synthesis-guide.md) for detailed usage.

**Quick Start**:
```
@synthesizeDocuments files=["prd-notifications-v2.md", "trd-notifications.md"]
question="What needs to be done?"
```

## 2. Cross-Project Reports

Generate comprehensive reports across multiple projects.

### Weekly Report

```
@generateCrossProjectReport reportType=weekly include=["projects", "metrics", "risks", "action-items"]
```

### Monthly Report

```
@generateCrossProjectReport reportType=monthly include=["all"] outputFile=monthly-report-2024-01.md
```

### Portfolio Review

```
@generateCrossProjectReport reportType=portfolio projects=["project1", "project2"] include=["all"]
```

### Stakeholder Update

```
@generateCrossProjectReport reportType=stakeholder include=["projects", "metrics", "risks"]
outputFile=stakeholder-update-2024-01.md
```

### With Date Range

```
@generateCrossProjectReport reportType=weekly dateRange=last-week include=["all"]
```

## 3. Template Validator

Validate that documents follow template structure.

### Auto-Detect Template

```
@validateTemplate file=prd-notifications-v2.md
```

### Specify Template

```
@validateTemplate file=prd-notifications-v2.md template=prd-simple.md
```

### Output

Returns JSON with:
- Validation status (valid/invalid)
- Missing sections
- Empty sections
- Extra sections
- Recommendations

## 4. Related Documents Finder

Find related documents based on content similarity.

### Basic Usage

```
@findRelatedDocuments file=prd-notifications-v2.md
```

### With Similarity Threshold

```
@findRelatedDocuments file=prd-notifications-v2.md similarity=0.5 maxResults=5
```

### With Keywords

```
@findRelatedDocuments file=prd-notifications-v2.md keywords=["notifications", "alerts"]
```

## 5. Action Item Tracker

Extract and track action items across documents.

### All Action Items

```
@trackActionItems scope=workspace/docs/
```

### Open Items Only

```
@trackActionItems scope=workspace/docs/ status=open
```

### By Owner

```
@trackActionItems scope=workspace/docs/ owner="John Doe"
```

### Overdue Items

```
@trackActionItems scope=workspace/docs/ status=open dueDate=overdue
```

### Save Report

```
@trackActionItems scope=workspace/docs/ status=open outputFile=action-items-report.md
```

## Combined Workflows

### Project Health Check

1. Validate PRD: `@validateTemplate file=prd-notifications-v2.md`
2. Find related docs: `@findRelatedDocuments file=prd-notifications-v2.md`
3. Track action items: `@trackActionItems scope=workspace/docs/`
4. Synthesize: `@synthesizeDocuments files=[...] question="What's the project status?"`

### Weekly Review

1. Generate report: `@generateCrossProjectReport reportType=weekly include=["all"]`
2. Track action items: `@trackActionItems scope=workspace/docs/ status=open`
3. Review risks: Check `workspace/docs/risks.md`

### Project Kickoff

1. Validate templates: `@validateTemplate file=prd-new-project.md`
2. Find related: `@findRelatedDocuments file=prd-new-project.md`
3. Synthesize: `@synthesizeDocuments files=[...] question="What do we need to know?"`

## Best Practices

1. **Regular Validation**: Validate PRDs/TRDs before reviews
2. **Track Action Items**: Run action item tracker weekly
3. **Use Synthesis**: Synthesize documents for complex questions
4. **Generate Reports**: Use cross-project reports for updates
5. **Find Related**: Use related docs finder to discover connections

## Tips

- **File Paths**: Use relative paths from `workspace/docs/` or absolute paths
- **Output Files**: Save outputs for future reference
- **Combine Tools**: Use multiple tools together for comprehensive analysis
- **Iterate**: Run tools multiple times as documents evolve

