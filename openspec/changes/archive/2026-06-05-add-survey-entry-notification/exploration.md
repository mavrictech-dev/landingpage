# Exploration: add-survey-entry-notification

## Current State

The landing page (`src/pages/Landing.jsx`) is a single-page React app (Vite + React 18 + react-router-dom v6) with exactly two routes: `/` → `Landing` and `*` → `PageNotFound`. There is **no survey page or route** in the codebase.

The page renders a full-screen hero section followed by sections (solutions, about-us, team, contact CTA, footer). Floating UI already exists in two forms:

- `WhatsAppFloatingButton.jsx` — fixed bottom-right, framer-motion, z-50
- `ThemeControlPanel.jsx` — fixed top-right, collapsible, glass panel

Both follow a consistent pattern: **fixed positioning, framer-motion entry animation, theme-aware styling via `useTheme()`, glass-morphism aesthetics** (`backdropFilter`, subtle borders, `rgba` backgrounds).

Three.js is used for the background atmosphere (`BackgroundAtmosphere.jsx`), snow/rain overlays, and border rain effects.

The design system uses:
- **shadcn/ui** components (Button, Card, etc.)
- **Tailwind CSS v3** with dark mode via class strategy
- **Framer Motion** for animations
- **Lucide React** for icons
- **ThemeContext** — 6 time-of-day themes + weather modes, all using the same CSS variable tokens

## Affected Areas

| File | Why affected |
|------|-------------|
| `src/pages/Landing.jsx` | Mount point for the new notification component |
| `src/App.jsx` | Needs new `/survey` route (currently does not exist) |
| `src/pages/Survey.jsx` | **NEW** — survey page that the notification redirects to (does not exist) |
| `src/components/landing/SurveyEntryNotification.jsx` | **NEW** — the notification component itself |
| `src/components/landing/WhatsAppFloatingButton.jsx` | Z-index/positioning reference for coexistence |

## Route/Page Gap Analysis

| Requirement | Status | Gap |
|-------------|--------|-----|
| Survey destination page | ❌ Does not exist | Must create `src/pages/Survey.jsx` and add `<Route path="/survey" element={<Survey />} />` in `App.jsx` |
| Survey form/flow | ❌ Not specified | Out of scope for this change — the notification only needs a `Link` to `/survey` |
| Navigation to survey | ❌ Not implemented | Notification primary action: `<Link to="/survey">` |

**Verdict**: The survey destination page is a prerequisite. It can be a minimal placeholder with just a heading, but it MUST exist as a route before the notification can redirect to it.

## Recommended Component Tree Placement

```
Landing.jsx
├── ThemeProvider
│   ├── BackgroundAtmosphere
│   ├── Navbar
│   ├── main
│   │   ├── HeroSection
│   │   ├── SolutionsSection
│   │   └── ...
│   ├── Footer
│   ├── WhatsAppFloatingButton         (fixed, z-50, bottom-4 right-4)
│   └── SurveyEntryNotification        (fixed, z-40, bottom-20 right-4)
```

The notification should be placed **in `Landing.jsx` directly**, alongside `WhatsAppFloatingButton`. Its z-index should be one below the WhatsApp button (or the same z-stack, positioned differently) to avoid overlap.

## Recommended State Model

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| Visibility | `useState(true)` in the component | Starts visible on every mount (first visit + reload) |
| Persistence | **None** | Requirement #9: must reappear on reload. No localStorage/sessionStorage |
| State scope | **Local only** | No URL params, no route-level state needed. Purely presentational |
| Dismiss | `setVisible(false)` on secondary action or close click | Simple local toggle, no side effects |

**Tradeoff**: If the user later wants "don't show again" across sessions, that would require localStorage and changes the requirement. Explicitly ruled out for now per requirement #9.

## Approaches

1. **Standalone component with framer-motion animation**
   - Leverage existing patterns (WhatsAppFloatingButton pattern)
   - Glass card with backdrop blur, matching the Navbar/ThemeControlPanel style
   - Uses `useTheme()` for theme-aware colors
   - Pros: Follows existing patterns exactly, easy to implement, consistent aesthetic
   - Cons: None significant
   - Effort: Low

2. **shadcn Card + Button composition**
   - Use existing shadcn `Card`, `Button` components
   - Wrap with framer-motion for entry animation
   - Pros: Reuses existing UI primitives, shadcn styling is already set up
   - Cons: shadcn Card is more structured (CardHeader/CardTitle/CardContent/CardFooter) — the notification is a smaller, more compact component, so a custom glass card may fit better
   - Effort: Low

3. **Reusable notification system (sonner/dialog)**
   - Use `sonner` toast or `Dialog` component
   - Pros: Built-in accessibility, keyboard handling
   - Cons: Doesn't match the floating-card mockup requirement; sonner toasts are ephemeral and don't support CTA buttons well; Dialog is modal (blocks page interaction)
   - Effort: Low-Medium

### Recommendation

**Approach 2 (shadcn Card + Button composition, wrapped in framer-motion)**, but with custom glass styling rather than the default Card appearance. This keeps the notification visually integrated with the landing page's aesthetic (glass-morphism) while using shadcn primitives for accessible interactive elements (Button with proper focus management).

## Responsive Strategy

| Breakpoint | Layout | Notes |
|------------|--------|-------|
| Desktop (≥1024px) | Side card, max-w-sm, fixed bottom-6 right-6 (above WhatsApp) or bottom-24 right-6 | Two actions side by side |
| Tablet (768-1023px) | Same as desktop, slightly wider padding | Ensure touch targets ≥44px |
| Mobile (<768px) | Full-width card, bottom-0 left-0 right-0, rounded-b-none or small rounding | Stack actions vertically; close icon remains top-right |

Mobile consideration: avoid covering too much of the hero section. On mobile, the card could be narrower with inset horizontal margins (`mx-4`) and positioned at the bottom with `bottom-4`.

## Accessibility Notes

| Concern | Recommendation |
|---------|---------------|
| **Semantics** | Use `role="dialog"` with `aria-modal="false"` (since it doesn't block interaction), or `role="region"` with `aria-label="Encuesta"` |
| **Focus** | On mount, focus the primary CTA button so keyboard users can navigate to the survey immediately |
| **Dismiss** | Escape key dismisses the notification; close button has `aria-label="Cerrar notificación"` |
| **Keyboard** | All interactive elements (primary button, secondary text, close icon) must be focusable and operable via keyboard |
| **Screen reader** | Use `aria-describedby` for the supporting text; use `role="status"` or `aria-live="polite"` so the notification is announced |
| **Motion** | Respect `prefers-reduced-motion` via framer-motion's `useReducedMotion()` — already used in `HeroSection.jsx` as a pattern reference |
| **Color contrast** | Glass backgrounds with `backdropFilter` must have sufficient opacity to meet WCAG AA contrast (ensure `rgba` values don't wash out text) |

## Risks

- **No survey page exists** — the notification's primary action will 404 unless the survey route/page is created as part of this change or before it.
- **Mobile overlap** — with WhatsApp button (bottom-right), ThemeControlPanel (top-right), and this notification (bottom-right area), there's a risk of crowding on mobile. Responsive positioning must be carefully coordinated.
- **Glass contrast** — On light themes (morning/midday), the glass card with theme.cardBg (`rgba(255, 255, 255, 0.6)`) might not provide enough contrast for the supporting text. Need to test against `theme.textMuted` values.
- **Framed/border visual** — The mockup specifies "subtle border/shadow". The existing pattern uses `rgba(...)` border colors that shift with the theme, which is correct but may need tweaking for visibility on the notification card.

## Ready for Proposal

**Yes**. The exploration is complete. The change is well-scoped: create a notification component, add the survey route/page placeholder, and wire them together. No complex state or multi-team coordination needed.

Key decisions to confirm in the proposal:
1. Whether the survey page should be a minimal placeholder or a real form
2. The exact positioning relative to the WhatsApp button
3. Whether to use shadcn `Button` or a custom-styled anchor/Link for the CTA
