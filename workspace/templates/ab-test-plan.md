
# A/B Test Plan – [Feature / Experiment Name]

## Metadata
- **Test Name**: [Name]
- **Owner**: [Name]
- **Created**: [YYYY-MM-DD]
- **Status**: [Planning / Running / Complete]
- **Platform**: [Statsig / Mixpanel / Custom]

## Hypothesis
- **Hypothesis**: [What are we testing?]
- **Expected Outcome**: [What do we expect to happen?]
- **Rationale**: [Why do we believe this?]

## Test Design

### Variants
- **Control (A)**: [Description]
  - Key Changes: [What's different?]
  - Expected Behavior: [How should users behave?]

- **Treatment (B)**: [Description]
  - Key Changes: [What's different?]
  - Expected Behavior: [How should users behave?]

### Test Configuration
- **Platform**: [Statsig / Mixpanel / Custom]
- **Test Type**: [A/B / A/B/n / Multivariate]
- **Traffic Allocation**: [% to each variant]
- **Target Audience**: [Who is included?]
- **Exclusions**: [Who is excluded?]

## Success Metrics

### Primary Metric
- **Metric**: [Name]
- **Definition**: [How is this calculated?]
- **Current Baseline**: [Value]
- **Target Improvement**: [% or absolute]
- **Statistical Significance**: [p-value threshold, e.g., 0.05]
- **Minimum Detectable Effect**: [MDE]

### Secondary Metrics
- **Metric 1**: [Name] – Definition: [How calculated?]
- **Metric 2**: [Name] – Definition: [How calculated?]
- **Metric 3**: [Name] – Definition: [How calculated?]

### Guardrail Metrics
- **Metric 1**: [Name] – Threshold: [Must not decrease by X%]
- **Metric 2**: [Name] – Threshold: [Must not decrease by X%]

## Implementation

### Technical Implementation
- **Feature Flag**: [Flag name / ID]
- **Code Changes**: [What code changes are needed?]
- **Data Tracking**: [What events/metrics need to be tracked?]
- **Platform Integration**: [How is this set up in Statsig/Mixpanel?]

### Rollout Plan
- **Phase 1**: [% traffic] – Duration: [Days] – Start: [Date]
- **Phase 2**: [% traffic] – Duration: [Days] – Start: [Date]
- **Phase 3**: [100% traffic] – Duration: [Days] – Start: [Date]

## Sample Size & Duration

### Sample Size Calculation
- **Required Sample Size**: [Number of users]
- **Expected Duration**: [Days / Weeks]
- **Traffic Estimate**: [Users per day]

### Early Stopping Criteria
- **Stop if**: [Condition] – Reason: [Why?]
- **Stop if**: [Condition] – Reason: [Why?]

## Analysis Plan

### Statistical Analysis
- **Method**: [t-test / chi-square / Bayesian]
- **Confidence Level**: [95% / 99%]
- **Segmentation**: [How will we segment results?]

### Reporting
- **Dashboard**: [Link to Statsig/Mixpanel dashboard]
- **Update Frequency**: [Daily / Weekly]
- **Stakeholders**: [Who needs updates?]

## Risks & Mitigation

### Risks
- **Risk 1**: [Description] – Mitigation: [Plan]
- **Risk 2**: [Description] – Mitigation: [Plan]

### Rollback Plan
- **Trigger Conditions**: [When would we rollback?]
- **Rollback Steps**: [How to rollback]
- **Owner**: [Name]

## Results & Decision

### Results Summary
- **Primary Metric**: [Result] – Statistically Significant: [Yes / No]
- **Secondary Metrics**: [Results]
- **Guardrail Metrics**: [Results]

### Decision
- **Decision**: [Launch / Don't Launch / Iterate]
- **Rationale**: [Why?]
- **Next Steps**: [What happens next?]

## Notes
- [Additional context or considerations]

