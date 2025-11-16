
# Mixpanel Integration Guide

## Overview

Mixpanel is a product analytics platform. Use it to track user behavior, analyze funnels, cohorts, and retention.

## Setup

1. Set environment variables in `.env`:
   ```bash
   MIXPANEL_API_SECRET=your_api_secret
   ```

2. Get API secret from Mixpanel: Project Settings → Service Account

## Usage

### Query Events

```
@mixpanel query events event "user_signup" limit 100
```

### Execute JQL Query

```
@mixpanel query jql jql "function main() { return Events({from_date: '2024-01-01', to_date: '2024-01-31'}).groupBy(['name'], mixpanel.reducer.count()); }"
```

## Use Cases

### In Metrics Dashboards

Pull Mixpanel data into your metrics docs:

```markdown
## Engagement Metrics
- User Signups: [Query Mixpanel for signup events]
- Daily Active Users: [Query Mixpanel for DAU]
- Retention: [Query Mixpanel for retention metrics]
```

### In Cohort Analysis

Use Mixpanel data for cohort analysis:

```markdown
## Cohort Analysis
- Data Source: Mixpanel
- Cohorts: [Query Mixpanel for cohort data]
- Retention: [Query Mixpanel for retention by cohort]
```

### In PRDs

Reference user behavior data:

```markdown
## Success Metrics
- Primary Metric: [Query Mixpanel for current baseline]
- User Behavior: [Query Mixpanel for related events]
```

### In Weekly Status

Include key metrics:

```markdown
## Metrics & KPIs
- Signups: [Query Mixpanel] – Trend: ↑
- Engagement: [Query Mixpanel] – Trend: ↑
```

## Best Practices

1. **Define events clearly**: Use consistent event naming in Mixpanel
2. **Link to dashboards**: Reference Mixpanel dashboard URLs in docs
3. **Track funnels**: Use Mixpanel funnel data in your analysis
4. **Monitor cohorts**: Regularly query cohort data for insights

## Related Templates

- `templates/metrics-dashboard.md` - Metrics tracking
- `templates/cohort-analysis.md` - Cohort analysis
- `templates/status-weekly.md` - Weekly status updates

