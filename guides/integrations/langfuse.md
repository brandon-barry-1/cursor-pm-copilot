
# Langfuse Integration Guide

## Overview

Langfuse is an open-source LLM observability platform. Use it to track traces, evaluations, and metrics for AI/ML features.

## Setup

1. Set environment variables in `.env`:
   ```bash
   LANGFUSE_PUBLIC_KEY=your_public_key
   LANGFUSE_SECRET_KEY=your_secret_key
   LANGFUSE_URL=https://cloud.langfuse.com  # or your self-hosted URL
   ```

2. Get API keys from Langfuse: Settings → API Keys

## Usage

### Query Traces

```
@langfuse query traces limit 10
```

### Query Evaluations

```
@langfuse query evaluations limit 5
```

### Get Specific Trace

```
@langfuse query traces traceId trace_abc123
```

## Use Cases

### In PRDs

Reference Langfuse traces when documenting AI features:

```markdown
## Evaluation & Guardrails
- Evaluator types: factuality, range correctness, safety
- Langfuse integration: [Query traces for recent evaluations]
- Key metrics: accuracy, FP/FN, "trust" proxy
```

### In Experiment Logs

Track model performance over time:

```markdown
## Run 001
- Date: 2024-01-15
- Langfuse Trace: [trace_id]
- Metrics: [Query trace for metrics]
- Observations: [Review trace details]
```

### In Post-Mortems

Analyze failures and issues:

```markdown
## Root Cause Analysis
- Langfuse Trace: [trace_id]
- Error Details: [Query trace for error information]
- Evaluation Results: [Query evaluations for this period]
```

## Best Practices

1. **Link traces in PRDs**: Include trace IDs in PRDs for AI features
2. **Track evaluations**: Use Langfuse to track evaluator results over time
3. **Debug with traces**: Use trace details to debug model issues
4. **Monitor metrics**: Set up dashboards in Langfuse and reference them in docs

## Related Templates

- `templates/prd-function-ai.md` - AI/Clinical PRD template
- `templates/trd-function-ai.md` - Technical Requirements Document
- `templates/experiment-log.md` - Experiment tracking

