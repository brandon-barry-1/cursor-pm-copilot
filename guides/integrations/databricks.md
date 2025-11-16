
# Databricks Integration Guide

## Overview

Databricks is used for data analytics, ML, and data processing. This guide covers how to reference Databricks in your PM workflow.

## Usage

### Linking to Databricks

Reference Databricks notebooks, tables, and jobs:

```markdown
## Data Sources
- Databricks Table: `schema.table_name`
- Notebook: [Notebook Name](databricks://workspace/notebooks/path)
- Job: [Job Name](databricks://workspace/jobs/job_id)
```

### In PRDs

Reference data sources:

```markdown
## Data & Constraints
- Data sources: Databricks tables (schema.table_name)
- Dependencies: [Link to Databricks notebooks/jobs]
```

### In TRDs

Document data pipelines:

```markdown
## Data & Models
### Inputs
- Source systems: Databricks tables (schema.table_name)
- Schemas: [Link to schema documentation]
- Data processing: [Link to Databricks notebooks]
```

### In Experiment Logs

Track data used:

```markdown
## Setup
- Data used: Databricks table `schema.table_name`
- Sample size: [Number]
- Date range: [Start] – [End]
```

## Best Practices

1. **Document schemas**: Include Databricks table schemas in TRDs
2. **Link notebooks**: Reference Databricks notebooks in data processing docs
3. **Track data lineage**: Document data flow from Databricks to features
4. **Version data**: Reference specific table versions or snapshots

## Related Templates

- `templates/prd-function-ai.md` - AI/Clinical PRD
- `templates/trd-function-ai.md` - Technical requirements
- `templates/experiment-log.md` - Experiment tracking

