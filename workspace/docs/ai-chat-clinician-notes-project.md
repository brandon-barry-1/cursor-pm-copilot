
# AI Chat – Clinician Notes Validator

## Context
We are building/iterating an AI-powered clinician notes system with validators/guardrails.
Key constraints:
- Clinical accuracy and safety
- PHI/PII considerations
- Evaluation + Langfuse integration

## Goals
- Improve correctness of OOR biomarker labeling and autoimmune handling.
- Increase clinician trust and reduce manual corrections.
- Provide clear, explainable outputs.

## Current Status
- V1 pipeline in place.
- Evaluators/validators partially configured.
- Some known issues with autoimmune JSON structure and ANA interpretation.

## Open Questions
- What are the highest-impact evaluator improvements?
- How should we structure a proper TRD for this?
- How do we measure “trust” and “quality” in a robust way?

## Action Items (brain dump)
- [ ] Define clear success metrics for clinician notes validator.
- [ ] Identify 3 main evaluator types we need (e.g., factuality, range correctness, safety).
- [ ] Draft a PRD or TRD structure for this work.
