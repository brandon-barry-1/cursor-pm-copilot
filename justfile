# justfile for cursor-pm-copilot
# These commands simply print prompts for you to paste into Cursor Chat.

# Daily planning helper
daily:
    @echo "=== Daily planning prompt (copy this into Cursor Chat) ==="
    @echo
    @echo "Review my current projects in workspace/docs/current-projects.md and any other relevant docs in workspace/docs/."
    @echo "Then propose a prioritized plan for today with 5–7 tasks and rough time estimates."

# Weekly status helper
weekly-status:
    @echo "=== Weekly status prompt (copy this into Cursor Chat) ==="
    @echo
    @echo "Using everything under workspace/docs/ (including current-projects and any notes),"
    @echo "draft a weekly status update using the structure in workspace/templates/status-weekly.md."
    @echo "Create or update a file under workspace/docs/status/ named status-[YYYY-MM-DD].md."

# Create a PRD prompt helper
prd NAME:
    @echo "=== PRD prompt for: {{NAME}} (copy into Cursor Chat) ==="
    @echo
    @echo "I want to write a PRD for a feature called \"{{NAME}}\"."
    @echo "Use workspace/templates/prd-simple.md as the structure."
    @echo "Ask me 5–10 clarifying questions first."
    @echo "Then create a new file under workspace/docs/ with a kebab-case filename based on the feature name"
    @echo "(for example, 'Notifications v2' -> 'prd-notifications-v2.md') and fill in the PRD."

# Create an AI/clinical PRD prompt
prd-ai NAME:
    @echo "=== AI/Clinical PRD prompt for: {{NAME}} (copy into Cursor Chat) ==="
    @echo
    @echo "I want to write a PRD for an AI/clinical feature called \"{{NAME}}\"."
    @echo "Use workspace/templates/prd-function-ai.md as the structure."
    @echo "Ask me 5–10 clarifying questions first."
    @echo "Then create a new file under workspace/docs/ with a kebab-case filename based on the feature name"
    @echo "(for example, 'Clinician Notes Validator v2' -> 'prd-clinician-notes-validator-v2.md') and fill in the PRD."

# Create a TRD prompt
trd-ai NAME:
    @echo "=== TRD prompt for: {{NAME}} (copy into Cursor Chat) ==="
    @echo
    @echo "I want to write a Technical Requirements Document (TRD) for a system called \"{{NAME}}\"."
    @echo "Use workspace/templates/trd-function-ai.md as the structure."
    @echo "Read any relevant docs in workspace/docs/ first (especially project notes or PRDs)."
    @echo "Ask me any clarifying questions you need, then create a file under workspace/docs/"
    @echo "with a kebab-case filename like 'trd-<name>.md' and fill in the TRD."

# Summarize a specific note using the readLocalNote tool
note-summary FILENAME:
    @echo "=== Note summary prompt for: {{FILENAME}} (copy into Cursor Chat) ==="
    @echo
    @echo "Use the readLocalNote tool with filename='{{FILENAME}}' (from workspace/docs/)."
    @echo "Then:"
    @echo "- Summarize the note"
    @echo "- Extract clear action items with owners"
    @echo "- Propose next steps and follow-ups I should schedule."
