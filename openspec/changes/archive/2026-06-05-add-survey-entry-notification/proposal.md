# Proposal: Add Survey Entry Notification

## Intent

To increase user engagement and gather valuable feedback, we will introduce a floating notification on the landing page. This notification will direct users to an external survey, providing a low-friction channel for capturing user sentiment and improvement ideas. This change addresses the current lack of a proactive feedback mechanism.

## Scope

### In Scope
- A new, stateless React component for the survey notification.
- Styling the component with Tailwind CSS to match the provided mockup, ensuring it's responsive and visually integrated.
- Displaying the notification on the main landing page upon initial load and on every subsequent reload.
- The primary Call to Action (CTA) will navigate the user to the external survey URL: `https://xuj1u4f6.forms.app/formulario-sin-titulo`.
- Secondary dismiss/close actions will hide the notification for the current browser session only (using component state).

### Out of Scope
- Persisting the dismissed state of the notification across page reloads or sessions (e.g., using `localStorage` or cookies).
- Analytics or tracking for notification impressions or clicks.
- The creation or hosting of the survey form itself.
- Any backend functionality to support the notification.
- A/B testing different designs or copy for the notification.

## Capabilities

> This section is the CONTRACT between the proposal and specs phases. The `sdd-spec` agent reads this to know exactly which spec files to create or update.

### New Capabilities
- `survey-notification`: Governs the appearance, behavior, and content of the user survey notification component.

### Modified Capabilities
- `landing-page-layout`: The layout of the main landing page will be modified to incorporate the new floating notification component.

## Approach

The implementation will focus on creating a single, self-contained React component (`<SurveyNotification />`). This component will manage its own visibility state (e.g., using `useState`). It will be rendered on the main landing page component (`/app/page.tsx`). Styling will be handled entirely with Tailwind CSS utilities to align with the project's existing design system and the provided mockup. No new dependencies will be added.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app/page.tsx` | Modified | The main landing page file will be updated to import and render the new `SurveyNotification` component. |
| `src/components/` | New | A new file, likely `src/components/survey-notification.tsx`, will be created for the notification component. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Visual obstruction | Low | The notification will be placed at the bottom of the viewport to minimize interference with primary hero content. It will include a clear dismiss action. |
| Style conflicts | Low | By using the existing Tailwind CSS configuration and design tokens, we minimize the risk of style clashes with the current UI. |
| Performance impact | Low | The component is lightweight, stateless, and has no external dependencies beyond React, making any performance impact negligible. |

## Rollback Plan

If issues arise, the change can be reverted by removing the `<SurveyNotification />` component import and its usage from `src/app/page.tsx`. The component file can then be safely deleted. This is a single-point rollback with no database or backend implications.

## Success Criteria

- [ ] The notification component is successfully rendered on the landing page on load.
- [ ] Clicking the primary CTA button correctly redirects the user to the specified external survey URL.
- [ ] Clicking the dismiss or close button hides the notification from view.
- [ ] The notification reappears after the page is reloaded, even if previously dismissed.
- [ ] The component's styling and placement match the approved design mockup on all target screen sizes.
