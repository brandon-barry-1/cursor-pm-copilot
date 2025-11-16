
# Document Synthesis Tool Guide

## Overview

The `synthesizeDocuments` tool allows you to analyze multiple documents (PRDs, TRDs, Linear tickets, etc.) and ask questions from Product Management, Program Management, or Engineering perspectives. It helps identify what needs to be done, missing issues, risks, dependencies, and more.

## Usage

### Basic Usage

```
@synthesizeDocuments files=["prd-notifications-v2.md", "trd-notifications.md"]
question="What needs to be done and what are the missing issues?"
```

### With Specific Perspective

```
@synthesizeDocuments files=["prd-notifications-v2.md", "trd-notifications.md"]
perspective=product question="What are the key product requirements and gaps?"
```

### With Linear Issues

First, get Linear issues:
```
@queryLinear query issues filter '{"project":{"name":{"eq":"Notifications v2"}}}'
```

Then synthesize:
```
@synthesizeDocuments files=["prd-notifications-v2.md", "linear-issues.json"]
perspective=program question="What are the dependencies and risks?"
```

### Save Output to File

```
@synthesizeDocuments files=["prd-notifications-v2.md", "trd-notifications.md"]
outputFile=synthesis-report.md
```

## Perspectives

- **`product`**: Product Management perspective - focuses on user needs, product strategy, features, metrics
- **`program`**: Program Management perspective - focuses on timelines, dependencies, risks, resources, coordination
- **`engineering`**: Engineering perspective - focuses on technical architecture, implementation, technical risks
- **`all`** (default): All perspectives combined

## Analysis Sections

The tool automatically analyzes:

1. **Executive Summary** - Key themes and findings
2. **What Needs to Be Done** - Action items and tasks
3. **Missing Issues & Gaps** - Documentation gaps, unanswered questions
4. **Risks & Dependencies** - Identified risks and dependencies
5. **Key Decisions Needed** - Decisions requiring resolution
6. **Timeline & Milestones** - Dates, milestones, timeline concerns
7. **Resource & Capacity** - Resource requirements and capacity needs
8. **Metrics & Success Criteria** - Success metrics and measurement
9. **Stakeholder Considerations** - Stakeholders and communication needs
10. **Recommendations** - Priority recommendations and next steps

## Use Cases

### Project Kickoff

```
@synthesizeDocuments files=["prd-project-x.md", "trd-project-x.md", "design-brief.md"]
perspective=all question="What do we need to know to start this project?"
```

### Gap Analysis

```
@synthesizeDocuments files=["prd-notifications-v2.md", "linear-issues.json"]
perspective=program question="What's missing or incomplete?"
```

### Risk Assessment

```
@synthesizeDocuments files=["prd-notifications-v2.md", "trd-notifications.md", "risks.md"]
perspective=program question="What are the key risks and dependencies?"
```

### Decision Support

```
@synthesizeDocuments files=["prd-notifications-v2.md", "decision-log.md"]
perspective=all question="What decisions need to be made?"
```

## Best Practices

1. **Include Related Docs**: Include PRDs, TRDs, design docs, Linear issues, and any relevant notes
2. **Be Specific**: Ask specific questions for better results
3. **Use Perspectives**: Choose the right perspective for your needs
4. **Save Output**: Save synthesis reports for future reference
5. **Iterate**: Use synthesis output to identify gaps, then add more documents and re-synthesize

## Example Workflow

1. **Collect Documents**: Gather all relevant docs (PRD, TRD, Linear issues, etc.)
2. **Synthesize**: Run synthesis with a specific question
3. **Review Output**: Review the analysis
4. **Fill Gaps**: Add missing information to documents
5. **Re-synthesize**: Run again to verify completeness

## Related Tools

- `generateCrossProjectReport` - Generate reports across multiple projects
- `findRelatedDocuments` - Find related documents
- `trackActionItems` - Extract action items
- `validateTemplate` - Validate document structure

