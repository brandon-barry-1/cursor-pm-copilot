
# GitHub Integration Guide

## Overview

GitHub is used for code repositories, issues, and project management. This guide covers how to reference and work with GitHub in your PM workflow.

## Usage

### Linking to GitHub

Reference GitHub issues, PRs, and code in your docs:

```markdown
## Implementation
- GitHub Issue: [Issue #123](https://github.com/org/repo/issues/123)
- Pull Request: [PR #456](https://github.com/org/repo/pull/456)
- Code Reference: [File path](https://github.com/org/repo/blob/main/path/to/file.ts)
```

### In PRDs

Link to implementation:

```markdown
## Implementation Status
- GitHub Issue: [Issue #123]
- PR: [PR #456]
- Status: [In Progress / Complete]
```

### In Release Plans

Track deliverables:

```markdown
## Features Included
- [Feature 1]
  - GitHub Issue: [Issue #123]
  - PR: [PR #456]
  - Status: [Complete]
```

### In Task Lists

Reference GitHub issues:

```markdown
## Tasks
- [ ] [Task 1] – GitHub: [Issue #123]
- [ ] [Task 2] – GitHub: [Issue #124]
```

## Best Practices

1. **Link issues in PRDs**: Always link to GitHub issues in PRDs
2. **Track PRs in release plans**: Include PR links in release planning
3. **Reference code in TRDs**: Link to relevant code files in technical docs
4. **Use issue templates**: Create GitHub issue templates for consistency

## Related Templates

- `templates/prd-simple.md` - Product requirements
- `templates/release-plan.md` - Release planning
- `templates/user-story.md` - User stories

