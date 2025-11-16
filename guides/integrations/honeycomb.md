
# Honeycomb Integration Guide

## Overview

Honeycomb is an observability platform. Use it to debug issues, analyze performance, and understand system behavior.

## Setup

1. Set environment variables in `.env`:
   ```bash
   HONEYCOMB_API_KEY=your_api_key
   HONEYCOMB_URL=https://api.honeycomb.io
   ```

2. Get API key from Honeycomb: Settings → API Keys

## Usage

### Query Traces

```
@honeycomb query "SELECT COUNT(*) WHERE service='api'" dataset production timeRange 1h
```

### Query Metrics

```
@honeycomb query "SELECT AVG(duration_ms) WHERE service='api' GROUP BY endpoint" dataset production
```

## Use Cases

### In Post-Mortems

Analyze incidents with Honeycomb data:

```markdown
## Timeline
### [Time] – [Event]
- Honeycomb Query: [Query Honeycomb for traces during this time]
- Error Details: [Query for error traces]
- Impact: [Query for affected services]
```

### In TRDs

Reference observability setup:

```markdown
## Observability & Ops
- Logging: [What gets logged]
- Metrics: [Query Honeycomb for current metrics]
- Alerting: [Set up alerts in Honeycomb]
```

### In Release Plans

Monitor system health:

```markdown
## Post-Release
- Monitoring: [Query Honeycomb for key metrics]
- Performance: [Query Honeycomb for latency]
- Errors: [Query Honeycomb for error rates]
```

## Best Practices

1. **Link queries in docs**: Include Honeycomb query links in your documentation
2. **Monitor key metrics**: Set up queries for critical system metrics
3. **Debug with traces**: Use Honeycomb traces to debug issues
4. **Track performance**: Regularly query performance metrics

## Related Templates

- `templates/post-mortem.md` - Incident analysis
- `templates/trd-function-ai.md` - Technical requirements
- `templates/release-plan.md` - Release planning

