# Notifications v2 – PRD

## 1. Context & Problem
- **What problem are we solving?**
  - Current notifications system is not communicating effectively with internal team members
  - Users are missing important alerts, particularly around request approvals
  - Notifications lack clarity or timeliness, leading to workflow delays

- **Who is impacted?**
  - Internal team members who need to be notified when their requests are approved

## 2. Goals & Non-Goals
- **Goals:**
  - Improve communication effectiveness of notifications
  - Ensure team members are promptly informed when their requests are approved
  - Increase action rate on notifications
  - Deliver notifications via Slack for better visibility and integration with team workflows

- **Non-goals:**
  - Complete rebuild of the notifications system (incremental improvements only)
  - Support for multiple notification channels beyond Slack
  - Support for notification types beyond alerts

## 3. Users & Use Cases
- **Primary user(s):**
  - Internal team members

- **Key use cases:**
  - User needs to know when their request is approved
  - User should be able to take action based on the notification (high priority)

## 4. Solution Overview
- **High-level approach**
  - Incremental improvements to the existing notifications system
  - Focus on Slack delivery for alerts, specifically request approval notifications
  - Enhance message clarity and timing to improve communication effectiveness

- **Dependencies & assumptions**
  - Slack integration is available and configured
  - Request approval system exists and can trigger notifications
  - No major technical constraints or dependencies

## 5. UX / UI
- **Link to Figma (if any)**
  - TBD

- **Key flows**
  - Request approval → Notification triggered → Slack message delivered → User sees and acts on notification

## 6. Requirements
- **Functional:**
  - Send Slack notifications when requests are approved
  - Notifications must clearly communicate approval status
  - Notifications should include actionable information
  - High priority delivery for approval alerts

- **Non-functional:**
  - Notifications delivered promptly (within acceptable latency)
  - Reliable delivery to Slack
  - Clear, concise messaging that encourages action

## 7. Success Metrics
- **Primary metrics:**
  - Action rate: Percentage of notifications that result in user action

- **Guardrail metrics:**
  - Notification delivery rate
  - Time to delivery
  - User feedback on notification clarity

## 8. Risks / Open Questions
- What specific information should be included in approval notifications to maximize action rate?
- How should we handle notification preferences or opt-out scenarios?
- What is the acceptable latency for notification delivery?
- Should notifications include deep links or actionable buttons in Slack?
- How will we measure and track action rate?
- Are there specific request types that need different notification formats?

