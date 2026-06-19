# Delta for landing-page-layout

## MODIFIED Requirements

### Requirement: Component Integration
(Previously: The requirement was for a generic floating overlay.)

The landing page layout MUST incorporate the survey notification component.

#### Scenario: Displaying the Survey Notification
- GIVEN the application is configured to show the survey notification
- WHEN the landing page is rendered
- THEN the `survey-notification` component MUST be included in the page structure.
- AND the notification MUST be displayed as a wider, shorter floating banner centered at the bottom of the viewport, without disrupting the primary layout of the page.
- AND it MUST remain fixed at the bottom of the viewport during scroll.
