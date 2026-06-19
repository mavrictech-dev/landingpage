# Delta for survey-notification

## MODIFIED Requirements

### Requirement: Notification Content and Structure
(Previously: Content was in English and had a different structure.)

The notification component MUST contain a title, a description, a primary CTA button, a secondary dismiss action, and a close button.

#### Scenario: Verify Component Structure
- GIVEN the survey notification is visible
- WHEN a user inspects the notification
- THEN it MUST contain the title text: "Tu feedback es importante".
- AND it MUST contain the description text: "Responde una encuesta rápida y ayúdanos a mejorar tu experiencia.".
- AND it MUST contain a primary button with the text "Responder encuesta".
- AND it MUST contain a secondary action with the text "Más tarde".
- AND it MUST contain a close button (icon).

### Requirement: Primary Call to Action (CTA)
(Previously: The CTA button had a different text label.)

The system MUST redirect the user to the external survey URL when the primary CTA is clicked.

#### Scenario: Clicking the Primary CTA
- GIVEN the survey notification is visible
- WHEN the user clicks the "Responder encuesta" button
- THEN the user's browser MUST navigate to `https://xuj1u4f6.forms.app/formulario-sin-titulo`.

### Requirement: Notification Dismissal
(Previously: The dismiss action had a different text label.)

The system MUST hide the notification for the current page view when either the secondary dismiss action or the close button is clicked. This dismissal is not persistent.

#### Scenario: Clicking the Secondary Dismiss Action
- GIVEN the survey notification is visible
- WHEN the user clicks the "Más tarde" action
- THEN the survey notification MUST be hidden from view.

#### Scenario: Clicking the Close Button
- GIVEN the survey notification is visible
- WHEN the user clicks the close button
- THEN the survey notification MUST be hidden from view.

## ADDED Requirements

### Requirement: Notification Placement and Behavior

The system MUST display the notification as a fixed banner centered at the bottom of the viewport. It MUST remain visible and fixed in place while the user scrolls the page.

#### Scenario: Scrolling the Page
- GIVEN the survey notification is visible
- WHEN the user scrolls the main page content up or down
- THEN the notification's position relative to the viewport MUST NOT change.
