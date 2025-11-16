
# Figma Integration Guide

## Overview

Figma is used for design files and prototypes. Use the `getFigmaFrames` tool to list frames from Figma files.

## Setup

1. Set environment variables in `.env`:
   ```bash
   FIGMA_TOKEN=your_figma_token
   ```

2. Get token from Figma: Settings → Account → Personal Access Tokens

## Usage

### Get Frames from Figma File

```
@getFigmaFrames fileId abc123def456
```

The file ID is the long ID in the Figma URL: `https://www.figma.com/file/abc123def456/File-Name`

## Use Cases

### In PRDs

Reference Figma designs:

```markdown
## UX & Interactions
- Figma File: [File Name](https://figma.com/file/abc123)
- Frames: [Query Figma for frames]
- Key Screens: [List of frame names]
```

### In Design Briefs

Link to Figma:

```markdown
## Design Artifacts
- Figma File: [File Name](link)
- Frames: [Query Figma for frames]
- Components: [List components used]
```

### In Feature Specs

Reference designs:

```markdown
## Design
- Figma Link: [Link](link)
- Key Screens: [Query Figma for frames]
- Design Notes: [Any special considerations?]
```

## Best Practices

1. **Link to files**: Always include Figma file links in your docs
2. **List frames**: Use the tool to get frame names for documentation
3. **Version designs**: Reference specific Figma file versions when needed
4. **Track changes**: Note design changes in your docs

## Related Templates

- `templates/prd-simple.md` - Product requirements
- `templates/feature-spec.md` - Feature specifications
- `templates/design-brief.md` - Design briefs (in guides)

