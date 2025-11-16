
# Notion Integration Guide

## Overview

Notion is used for knowledge base, documentation, and project management. This guide covers how to work with Notion in your PM workflow.

## Usage

### Linking to Notion

Reference Notion pages and databases:

```markdown
## Related Documentation
- Product Strategy: [Notion Page](https://notion.so/page-id)
- User Research: [Notion Database](https://notion.so/database-id)
- Meeting Notes: [Notion Page](https://notion.so/page-id)
```

### Syncing Content

While Cursor can't directly sync with Notion, you can:

1. **Copy content**: Copy from Notion to Cursor docs
2. **Reference links**: Link to Notion pages in your docs
3. **Export**: Export Notion pages as Markdown and import to Cursor

### In PRDs

Reference Notion docs:

```markdown
## Context & Problem
- User Research: [Notion Research Doc](link)
- Market Analysis: [Notion Market Analysis](link)
```

### In Meeting Notes

Link to Notion:

```markdown
## Related Docs
- Strategy Doc: [Notion](link)
- Previous Meeting: [Notion](link)
```

## Best Practices

1. **Link, don't duplicate**: Reference Notion pages rather than copying content
2. **Use consistent structure**: Align Cursor doc structure with Notion structure
3. **Export when needed**: Export Notion pages as Markdown for Cursor analysis
4. **Keep in sync**: Update both Cursor and Notion when content changes

## Related Templates

- `templates/prd-simple.md` - Product requirements
- `templates/meeting-notes-*.md` - Meeting notes

