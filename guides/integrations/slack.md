
# Slack Integration Guide

## Overview

Slack is used for team communication. This guide covers how to reference Slack in your PM workflow.

## Usage

### Linking to Slack

Reference Slack messages and channels:

```markdown
## Discussion
- Slack Thread: [Message Link](https://workspace.slack.com/archives/channel-id/p1234567890)
- Channel: [#channel-name](https://workspace.slack.com/archives/channel-id)
```

### In Decision Logs

Reference Slack discussions:

```markdown
## Stakeholders Consulted
- [Name] – Role: [Title] – Feedback: [Summary]
- Discussion: [Slack Thread](link)
```

### In Meeting Notes

Link to Slack threads:

```markdown
## Follow-up Discussion
- Slack Thread: [Link](link)
- Channel: [#channel-name](link)
```

### In PRDs

Reference team discussions:

```markdown
## Open Questions
- [Question 1] – Discussion: [Slack Thread](link)
- [Question 2] – Discussion: [Slack Thread](link)
```

## Best Practices

1. **Link to threads**: Reference Slack threads for important discussions
2. **Use channels consistently**: Use dedicated channels for different topics
3. **Archive decisions**: Move important decisions from Slack to decision logs
4. **Keep context**: Include Slack thread context when referencing

## Related Templates

- `templates/decision-log.md` - Decision documentation
- `templates/meeting-notes-*.md` - Meeting notes

