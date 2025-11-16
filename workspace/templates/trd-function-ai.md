
# [Service / Feature Name] – Technical Requirements Document (TRD)

## 1. Overview
- Summary of the system
- Link back to PRD
- Owners (PM, TL, key contributors)

## 2. Architecture
- High-level diagram (describe in text if no diagram)
- Components (services, jobs, queues)
- Data flow (inputs, transformations, outputs)

## 3. Data & Models
### Inputs
- Source systems (Databricks tables, APIs, events)
- Schemas and key fields
### Models
- Model types (LLM, classifier, heuristic)
- Versioning strategy (how we tag & roll out models)
- Where models are stored / loaded

## 4. API & Interfaces
- External APIs (request/response shapes)
- Internal interfaces (between components)
- Error handling & retry behavior

## 5. Evaluations & Guardrails
- Evaluators (what we check: correctness, safety, formatting)
- Metrics (AUROC/F1 if classifier, accuracy, FP/FN, etc.)
- Thresholds for rollout
- Connection to Langfuse (what gets logged, how we inspect failures)

## 6. Observability & Ops
- Logging (what fields, where they go)
- Metrics (counters, histograms, dashboards)
- Alerting (conditions, channels)

## 7. Performance & Reliability
- Latency targets
- SLOs / SLAs (if any)
- Scalability considerations

## 8. Security & Compliance
- PHI/PII handling
- Access controls
- Data retention

## 9. Rollout & Migration
- Environments (dev/stage/prod)
- Feature flags / kill switches
- Migration steps (if replacing an existing flow)

## 10. Open Questions & Decisions
- Open design questions
- Decisions made (with rationale)
