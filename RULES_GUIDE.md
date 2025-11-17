````markdown
# 🧠 Cursor PM Copilot – Usage Guide

This repo turns Cursor into your **personal PM/TPM + AI/ML/SWE copilot**, with:

- Global **rules** and **user commands** that work in *any* repo
- Repo-specific **project rules** and **project commands** for this workspace
- Simple **tools** to read local notes and peek at Figma files

You can use this even with **limited IDE / programming experience**. Most of the time, you’ll:

- Open this repo in Cursor
- Run pre-defined commands (they have simple, lowercase, hyphenated names)
- Answer questions in plain language

---

## 1. Mental Model

Think of this setup in three layers:

1. **Global layer (works in all repos)**
   - Global Rules – how the AI behaves for you, everywhere
   - User Commands – shortcuts like `repo-orientation`, `daily-focus`, `explain-selected-code`, etc.

2. **Project layer (only for this repo: `cursor-pm-copilot`)**
   - Project Rules – tells Cursor “this is my PM control center; use `workspace/docs` and `workspace/templates`”
   - Project Commands – things like `daily-plan-this-repo`, `create-ai-prd`, `create-ai-trd`

3. **Tools layer (for this repo)**
   - `.cursor/tools/local-notes.ts` – `readLocalNote` to read markdown files from `workspace/docs`
   - `.cursor/tools/figma-frames.ts` – `getFigmaFrames` to pull frame names from a Figma file

You don’t have to remember every file. You mostly interact through **Cursor commands** and **simple instructions in Chat**.

---

## 2. Repo Layout (What Lives Where)

From the repo root, you’ll see something like:

```text
cursor-pm-copilot/
  company-level-context/
  copilots/
  frameworks/
  guides/
  initiatives/
  meeting-notes/
  workspace/
    docs/
      ...your notes, PRDs, TRDs, status docs...
    templates/
      prd-function-ai.md
      trd-function-ai.md
      status-weekly.md      (or similar)
  .cursor/
    tools/
      local-notes.ts        # readLocalNote tool
      figma-frames.ts       # getFigmaFrames tool
  global.d.ts
  tsconfig.json
  justfile
  package.json
  package-lock.json
  README.md                 # (this file)
````

You mainly care about:

* `workspace/docs/` → where your notes, PRDs, TRDs, daily/weekly docs go
* `workspace/templates/` → PRD/TRD/status templates
* `.cursor/tools/` → helper tools Cursor can call automatically

---

## 3. Opening the Repo in Cursor

### 3.1 From Terminal

```bash
cd ~/workspace/cursor-pm-copilot
cursor .
```

This opens Cursor with **this repo** as the current project.

### 3.2 Confirm You’re in the Right Repo

At the top of the Cursor window or in the file explorer, you should see:

* Folder name: `cursor-pm-copilot`
* Subfolders like `company-level-context`, `workspace`, `guides`, etc.

If you don’t see those, you may have opened the wrong folder. Close Cursor and try `cursor .` again from the correct directory.

---

## 4. How Rules Work (Global vs Project)

### 4.1 Global Rules (always on)

You have a set of **Global Rules** that tell Cursor things like:

* Act like a hybrid PM/TPM + senior engineer
* Plan → execute in small steps → summarize
* Favor readability and safety
* For AI/ML tasks, think in terms of data, evals, guardrails

These are pasted into **Settings → Rules / User / Global Rules**.

You **don’t need to do anything** to “use” them – they apply automatically in all repos.

---

### 4.2 Project Rules (only for `cursor-pm-copilot`)

For this repo, you also have **Project Rules** that say:

* Use `workspace/docs` as the main place for notes and docs
* Use `workspace/templates` for PRD / TRD / status structures
* Treat code in this repo as examples, not production-critical

These **only apply when this repo is open**.

If you think they were entered incorrectly, see section **9. Fixing Project Rules** at the bottom of this file.

---

## 5. Global User Commands (Work Everywhere)

These commands are configured under **User Commands** and are available in **any** repo you open.

All names are **lowercase with hyphens**.

### 5.1 How to Run a User Command

1. Open any repo in Cursor (this one, or any other).
2. Open the **command palette** / commands menu:

   * Usually `⌘ + Shift + P` or a “Commands” / “AI Commands” button in the UI.
3. Start typing the command name (for example, `repo-orientation`).
4. Select it and press Enter.

If the command mentions `{{selection_or_input}}`, Cursor will use:

* Whatever text you selected in the editor, or
* The current chat message / input you provide

---

### 5.2 User Commands Overview

You should have these **User Commands**:

1. `repo-orientation`
2. `blueprint-before-code`
3. `multi-role-planning-squad`
4. `daily-focus`
5. `explain-selected-code`
6. `write-tests-for-selection`
7. `refactor-selected-code`
8. `review-pr-diff`
9. `summarize-meeting-notes`
10. `improve-doc-section`
11. `generate-status-update`

Below is how to use each one.

---

### 5.3 `repo-orientation`

**Purpose:** Quickly understand *any* repo you open.

**Use when:** You open a new or unfamiliar repo.

**How:**

1. Open the repo in Cursor.
2. Run `repo-orientation`.
3. Read:

   * What the project appears to do
   * Tech stack
   * Where important files and tests live
4. Answer the clarifying questions in Chat.

---

### 5.4 `blueprint-before-code`

**Purpose:** Force a small plan before AI edits code.

**Use when:** You’re about to ask Cursor to make non-trivial code changes.

**How:**

1. Select the function/file you want to change **or** type a description into Chat.
2. Run `blueprint-before-code`.
3. Cursor will:

   * Propose a plan: files, functions, tests, risks.
4. You:

   * Approve the plan (“Yes, go ahead”), or
   * Ask it to adjust the plan (“Change X, don’t touch Y”).

Once the plan is agreed, let it start making changes.

---

### 5.5 `multi-role-planning-squad`

**Purpose:** Get PM + SWE + ML + QA perspectives and a phased plan.

**Use when:** You’re thinking about a new feature or system.

**How:**

1. In Chat, paste or type your idea (e.g. “New evaluator for ANA interpretation”).
2. Run `multi-role-planning-squad`.
3. Cursor will:

   * Restate the problem from 4 roles
   * Propose MVP → v1 → v2
   * Ask clarifying questions
4. Answer the questions and use the plan as input to PRDs/TRDs/roadmaps.

---

### 5.6 `daily-focus`

**Purpose:** Turn a messy brain dump into a prioritized daily plan.

**Use when:** You have scattered notes from Slack, Notion, docs, etc.

**How:**

1. In Chat, paste:

   * Bullet lists, notes, fragments, Slack messages, etc.
2. Run `daily-focus`.
3. You get:

   * “Must do today” vs “Nice to have”
   * Time estimates
   * Suggested schedule
4. Copy the result into:

   * A `today-[date].md` file in `workspace/docs`, or
   * Notion / Slack, etc.

---

### 5.7 `explain-selected-code`

**Purpose:** Explain what a piece of code does and how risky it is to change.

**How:**

1. Select code in the editor.
2. Run `explain-selected-code`.
3. Read:

   * What it does, step-by-step
   * How it fits into the repo (if possible)
   * Risks and edge cases

---

### 5.8 `write-tests-for-selection`

**Purpose:** Generate test cases for selected code.

**How:**

1. Select a function or block of code.
2. Run `write-tests-for-selection`.
3. Cursor generates tests using the likely framework (pytest, Jest, etc.).
4. Copy tests into the appropriate test file (`tests/`, `__tests__/`, etc.) and run them.

---

### 5.9 `refactor-selected-code`

**Purpose:** Safely refactor a selected block of code without changing behavior.

**How:**

1. Select the code you want cleaned up.
2. Run `refactor-selected-code`.
3. Review:

   * Refactored code
   * Short explanation of changes
4. Accept or tweak as needed.

---

### 5.10 `review-pr-diff`

**Purpose:** Review changes like a senior engineer and PM.

**How:**

1. Copy a diff (from GitHub or `git diff`) **or** select changed code.
2. Run `review-pr-diff`.
3. Cursor will:

   * Summarize intent
   * Call out risks
   * Suggest improvements
   * Provide a summary you can paste into a PR comment

---

### 5.11 `summarize-meeting-notes`

**Purpose:** Turn raw notes into summary, decisions, and action items.

**How:**

1. Paste your raw meeting notes into Chat (or select a note file’s contents).
2. Run `summarize-meeting-notes`.
3. You get:

   * Summary
   * Decisions
   * Action items with owners
   * Open questions

---

### 5.12 `improve-doc-section`

**Purpose:** Clean up a messy section of a document (PRD, TRD, strategy, etc.).

**How:**

1. Open the doc file in Cursor.
2. Select the section to improve.
3. Run `improve-doc-section`.
4. Compare old vs new and keep what you like.

---

### 5.13 `generate-status-update`

**Purpose:** Turn mixed context (notes, changes, PRs) into a weekly status update.

**How:**

1. Collect context:

   * Bullet notes, key changes, relevant summaries.
2. Paste into Chat.
3. Run `generate-status-update`.
4. Paste the result into Slack, Linear, or email and tweak as needed.

---

## 6. Project Commands (Only in `cursor-pm-copilot`)

These commands are configured under **Project Commands** and only appear when this repo is open.

### 6.1 How to Run a Project Command

1. Open the `cursor-pm-copilot` repo in Cursor (`cursor .` from its folder).
2. Open the command palette / commands UI.
3. Choose **Project Commands** (if there’s a filter).
4. Run the desired command by name.

---

### 6.2 `daily-plan-this-repo`

**Purpose:** Daily plan based on `workspace/docs` in this repo.

**How:**

1. Make sure `cursor-pm-copilot` is open.
2. Run `daily-plan-this-repo`.
3. Cursor will:

   * Check `workspace/docs` (e.g. `current-projects.md`, other notes).
   * Summarize active work.
   * Propose 5–7 tasks with estimates.
4. Paste the checklist into:

   * A `today-[date].md` under `workspace/docs`, or
   * Notion / Slack, etc.

---

### 6.3 `create-ai-prd`

**Purpose:** Create an AI/clinical PRD using your template.

**How:**

1. With `cursor-pm-copilot` open, run `create-ai-prd`.
2. When asked, describe the feature (e.g. “Clinician Notes Validator v2”).
3. Answer the clarifying questions.
4. Cursor will:

   * Use `workspace/templates/prd-function-ai.md`.
   * Create `workspace/docs/prd-<kebab-name>.md`.
   * Populate it with structured content.
   * Provide a short summary at the end.
5. Open the new PRD file and tweak details as needed.

---

### 6.4 `create-ai-trd`

**Purpose:** Create a TRD for a system, based on your TRD template and existing docs.

**How:**

1. With `cursor-pm-copilot` open, run `create-ai-trd`.
2. Describe the system (e.g. “Clinician Notes Evaluator Pipeline”).
3. Cursor will:

   * Read relevant docs in `workspace/docs`.
   * Ask clarifying questions.
   * Create `workspace/docs/trd-<name>.md`.
   * Fill in architecture, data, evals, guardrails, observability, rollout.
4. Review and tweak as needed.

---

## 7. Using the Tools (`.cursor/tools`)

### 7.1 `readLocalNote` (from `local-notes.ts`)

**What it does:** Reads a markdown file by filename from `workspace/docs`.

**Typical use:**

> “Use `readLocalNote` with filename `clinician-notes-v2-notes.md`, then summarize it and propose next steps.”

**Steps:**

1. Ensure the file exists, e.g.:

   * `workspace/docs/clinician-notes-v2-notes.md`

2. In Chat (with this repo open), type something like:

   ```text
   Use the readLocalNote tool with filename: "clinician-notes-v2-notes.md".
   Then:
   - Summarize the note
   - Extract action items with owners
   - Suggest what should be added to the PRD and TRD.
   ```

3. Cursor will:

   * Call the tool,
   * Read the file content,
   * Respond with summary + actions.

---

### 7.2 `getFigmaFrames` (from `figma-frames.ts`)

**What it does:** Lists top-level frames in a Figma file using your `FIGMA_TOKEN`.

**Steps:**

1. Copy a Figma file URL, e.g.:

   * `https://www.figma.com/file/FILE_ID/Design-Name?...`

2. Extract the `FILE_ID` portion.

3. In Chat (with this repo open), type:

   ```text
   Call the getFigmaFrames tool with fileId: "YOUR_FILE_ID_HERE".
   Then summarize the main frames and suggest how they could map to sections in a PRD using my templates.
   ```

4. Cursor will:

   * Call the tool,
   * Return frame names,
   * Then continue reasoning based on that.

---

## 8. Example End-to-End Workflow

### 8.1 New AI Feature (Zero → Plan → PRD → TRD)

1. **Ideation / Planning**

   * In any repo (or this one), run `multi-role-planning-squad` with your idea.
   * Answer questions; keep the phased plan handy.

2. **PRD**

   * Open `cursor-pm-copilot`.
   * Run `create-ai-prd`.
   * Use your answers and the planning output.
   * Review and refine the generated PRD in `workspace/docs`.

3. **TRD**

   * Make sure relevant notes + PRD are present in `workspace/docs`.
   * Run `create-ai-trd`.
   * Answer extra questions.
   * Review the TRD file created in `workspace/docs`.

4. **Implementation in the real service repo**

   * Open the actual code repo.
   * Run `repo-orientation`.
   * Use `blueprint-before-code` to plan changes.
   * Use `explain-selected-code`, `write-tests-for-selection`, and `refactor-selected-code` on real code as needed.

5. **Status Update**

   * Collect key points, decisions, and shipped changes.
   * Run `generate-status-update` to get a weekly update draft.
   * Paste into Slack, Linear, or email and tweak.

---

## 9. Fixing Project Rules (If They Were Entered Incorrectly)

If the **Project Rules** for this repo were entered incorrectly (for example, pasted into the Global Rules area), follow these steps.

### 9.1 Step 1 – Check Global Rules vs Project Rules

1. Open Cursor.
2. Press `⌘ + ,` to open **Settings**.
3. Go to the **Rules / User Rules / Global Rules** section.
4. Look at the content there:

   * It should be the general “Global Rules – Brandon (PM/TPM + AI/ML/SWE)” block.
   * It should **not** mention `workspace/docs/` or `cursor-pm-copilot` by name.

If you see project-specific content in Global Rules:

* Cut that project-specific content out (paste it temporarily into a text editor).
* Leave only the generic global rules there.

---

### 9.2 Step 2 – Open Project Rules for `cursor-pm-copilot`

1. Make sure `cursor-pm-copilot` is the **open project**:

   * The file explorer should show that folder as the root.

2. In Cursor’s sidebar or settings, go to the panel that shows:

   * `Project Rules`
   * `Project Commands`
   * `User Commands`
   * `Include CLAUDE.md in context`

3. Click **Project Rules**.

   * You should now be editing rules specific to **this** repo only.

---

### 9.3 Step 3 – Paste the Correct Project Rules

Delete everything in the **Project Rules** box for `cursor-pm-copilot`, and paste this:

```markdown
# Project Rules – Product (cursor-pm-copilot)

- Treat this repository as my personal PM/TPM control center.
- Prefer using:
  - workspace/docs/ for project notes, daily notes, and status.
  - workspace/templates/ for PRD, TRD, and status templates.
- When I ask you to create a PRD or TRD in this repo:
  - Use the templates in workspace/templates/ if they exist.
  - Suggest a filename and location under workspace/docs/.
- For “summarize this project / feature” requests:
  - Look at PRDs, TRDs, and project notes under workspace/docs/.
  - Produce bullet-first summaries that I can paste into Slack, Linear, or Notion.


# Project Rules – Engineering (cursor-pm-copilot)

- This repo is primarily for PM/TPM workflows and examples, not production services.
- Code examples should be:
  - Simple, didactic, and easy to follow.
  - In Python or TypeScript unless the repo clearly dictates otherwise.
- Prefer:
  - Small, well-commented helpers over large abstractions.
- If you add utilities or tools:
  - Keep them in clearly named folders (e.g. workspace/scripts/, .cursor/tools/).
  - Add a short usage note whenever you create a new helper.
```

Save or close the Project Rules panel (depending on Cursor’s UI).

---

### 9.4 Step 4 – Sanity Check

* **Global Rules**:

  * Should be generic, describing how the AI should act everywhere.
  * No hard-coded paths or repo names.

* **Project Rules (cursor-pm-copilot)**:

  * Should mention `workspace/docs/`, `workspace/templates/`, and “cursor-pm-copilot”.

If that’s true, your rules are now correctly separated and the system will behave as intended.

---

You can keep iterating on this guide as your workflows evolve, but this version should give you (or anyone else) a complete map of **what’s set up** and **exactly how to use it**.

```
::contentReference[oaicite:0]{index=0}
```
