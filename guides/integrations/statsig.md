
# Statsig Integration Guide

## Overview

Statsig is a feature flag and A/B testing platform. Use it to manage experiments, feature flags, and analyze results.

## Setup

1. Set environment variables in `.env`:
   ```bash
   STATSIG_API_KEY=your_api_key
   STATSIG_URL=https://api.statsig.com
   ```

2. Get API key from Statsig: Settings → API Keys

## Usage

### Query Experiments

```
@statsig query experiments
```

### Get Specific Experiment Results

```
@statsig query experiments experimentId exp_abc123
```

### Query Feature Flags

```
@statsig query feature-flags
```

## Use Cases

### In A/B Test Plans

Reference Statsig experiments in your test plans:

```markdown
## Test Configuration
- Platform: Statsig
- Experiment ID: [Query Statsig for experiment details]
- Variants: [Get variant information from Statsig]
```

### In Weekly Status

Include experiment results:

```markdown
## Highlights
- Experiment Results: [Query Statsig for latest experiment results]
- Key Metrics: [Get metrics from Statsig]
```

### In Decision Logs

Document experiment-driven decisions:

```markdown
## Decision
- Chosen Option: [Option name]
- Rationale: Based on Statsig experiment [exp_id] results
- Evidence: [Query Statsig for experiment results]
```

## Best Practices

1. **Link experiments in test plans**: Include experiment IDs in A/B test plans
2. **Track results**: Use Statsig API to pull results into your docs
3. **Monitor flags**: Query feature flag status for release planning
4. **Document decisions**: Reference experiment results in decision logs

## Related Templates

- `templates/ab-test-plan.md` - A/B test planning
- `templates/experiment-design.md` - Experiment design
- `templates/decision-log.md` - Decision documentation

