# Tasks: Add Survey Entry Notification

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 90–120 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Delivery strategy | ask-always |
| Suggested work units | Single PR |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Placement Clarification (User Correction)

- WhatsApp button overlap is **not** a conflict risk.
- Notification must be horizontally **centered** at the bottom of the viewport (`fixed bottom-4 left-0 right-0 mx-auto`), wider (`max-w-4xl`) and shorter in height.
- Must remain fixed while user scrolls.
- Only disappears on user dismissal (not on scroll).

## Phase 1: Component Creation

- [x] 1.1 Create `src/components/landing/SurveyEntryNotification.jsx`: glass card with `useTheme()`, local `useState(true)`, `AnimatePresence` wrapper, framer-motion fade+slide-up entry (0.35s), `useReducedMotion()` guard. Wider centered-bottom banner: `fixed bottom-4 left-0 right-0 mx-auto z-40 max-w-4xl w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] lg:w-[min(64rem,calc(100%-3rem))]`. Glass styling: `backdropFilter: blur(24px)`, theme-aware RGBA bg/border with linear gradient, layered box-shadow + glow, `rounded-[24px]`.
- [x] 1.2 Implement content layout: `MessageSquareHeart` icon (lucide v0.475+), title "Tu feedback es importante", description "Responde una encuesta rápida y ayúdanos a mejorar tu experiencia.", "Responder encuesta" CTA (`<a target="_blank" rel="noopener noreferrer" href="https://xuj1u4f6.forms.app/formulario-sin-titulo">`, themed button style), "Más tarde" secondary `<button>`, close icon `<button>` with `aria-label="Close survey notification"`.
- [x] 1.3 Wire dismiss logic: all three dismiss triggers (close button, Dismiss button, Escape key via `useEffect` keydown) call `setVisible(false)`. Tab order: close → CTA → Dismiss. All operable via Enter/Space. `role="region" aria-label="Survey notification"`.

## Phase 2: Integration

- [x] 2.1 Import `SurveyEntryNotification` in `src/pages/Landing.jsx` and render `<SurveyEntryNotification />` inside `<ThemeProvider>` alongside existing floating components (WhatsAppFloatingButton, ThemeControlPanel). ~3 lines changed.

## Phase 3: Verification

- [ ] 3.1 Run `npm run lint` and `npm run typecheck` — confirm zero new warnings/errors from `SurveyEntryNotification.jsx` and `Landing.jsx`.
- [ ] 3.2 Manual visual: notification appears as wider, shorter centered banner at viewport bottom on load, stays fixed on scroll, displays Spanish copy ("Tu feedback es importante", "Responder encuesta", "Más tarde"), disappears on dismiss/close/Escape, reappears on full page reload.
- [ ] 3.3 Manual visual: CTA opens external survey URL `https://xuj1u4f6.forms.app/formulario-sin-titulo` in new tab with `noopener noreferrer`. Responsive check at 320px, 768px, 1440px — banner width scales per `max-w-4xl` breakpoints. Dark/light theme glass contrast with gradient background + glow shadow.
