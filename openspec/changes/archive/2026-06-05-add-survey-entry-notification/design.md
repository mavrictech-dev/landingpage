# Design: Survey Entry Notification

## Technical Approach

Create a single self-contained `SurveyEntryNotification` component rendered in `Landing.jsx` alongside existing floating UI. Local `useState` for visibility (true on mount, false on dismiss — no persistence). Glass-morphism card with framer-motion entry, following existing WhatsApp/ThemeControlPanel patterns.

## Key Correction

The exploration.md suggested adding a `/survey` route and `Survey.jsx` page. **This is wrong for the current scope.** The spec requires navigation to the external URL `https://xuj1u4f6.forms.app/formulario-sin-titulo`, not an internal route. No new routes, no new pages.

## Architecture Decisions

| Decision | Choice | Alternatives rejected | Rationale |
|----------|--------|-----------------------|-----------|
| Component style | Custom glass card (inline `style` prop) | shadcn Card composition | Card has header/content/footer structure too heavy for a compact notification; existing floating UI uses raw `style` props with theme tokens — follow that pattern |
| Icons | Lucide `MessageSquareHeart` | Custom SVG, emoji | Already a project dependency; icon exists in v0.475+; matches survey/friendship theme |
| Primary CTA | `<a target="_blank" rel="noopener noreferrer">` | `window.open()` or react-router `Link` | External navigation; `target="_blank"` opens in new tab; no security leak with `noopener` |
| Escape key | `useEffect` keydown listener, local to component | Global key manager | Component self-contained; adds 6 lines; avoids global state |
| Visibility state | `useState(true)` in component | Context, URL param, localStorage | Spec requires reappear on reload — local state resets on mount automatically; zero external dependencies |
| Component file | `src/components/landing/SurveyEntryNotification.jsx` | `src/pages/`, `src/components/ui/` | Landing-specific component; all landing components live under `components/landing/` |

## Component Tree

```
Landing.jsx (ThemeProvider wrapper)
├── BackgroundAtmosphere
├── Navbar
├── main > HeroSection, SolutionsSection, ...
├── Footer
├── WhatsAppFloatingButton    (fixed, z-50, bottom-4 right-4)
├── ThemeControlPanel          (fixed, z-50, top-20 right-4)
└── SurveyEntryNotification    (fixed, z-40)  ← NEW
```

## Z-Index & Positioning

| Element | z-index | Desktop (≥1024px) | Mobile (<1024px) |
|---------|---------|-------------------|-------------------|
| ThemeControlPanel | z-50 | top-20 right-4 | same |
| WhatsAppFloating | z-50 | bottom-4 right-4 | same |
| SurveyNotification | z-40 | bottom-24 right-6, max-w-sm | bottom-0 left-0 right-0, full-width banner, mx-2 |

Desktop: notification at 6rem from bottom gives ~5rem clearance above WhatsApp button. Mobile: full-width bottom banner (`rounded-t-xl mx-2`); WhatsApp at z-50 floats above the notification naturally.

## Data / State Model

```
const [visible, setVisible] = useState(true)
```
- Mount: `true` → notification appears (every page load/reload)
- Dismiss (secondary button, close button, Escape key): `setVisible(false)` → hidden for current view
- No localStorage, sessionStorage, cookies, or URL params
- Component unmounts on page navigation; fresh state on next mount

## Interaction Model

| Trigger | Action |
|---------|--------|
| Click "Take Survey" | Navigate to `https://xuj1u4f6.forms.app/formulario-sin-titulo` in new tab |
| Click "Dismiss" | `setVisible(false)` |
| Click close icon (×) | `setVisible(false)` |
| Press Escape | `setVisible(false)` |

## Styling Approach

Glass-morphism matching existing patterns:
- `backdropFilter: 'blur(24px)'`
- Background: theme-aware RGBA (light: `rgba(255,255,255,0.6)`, dark: `rgba(10,16,32,0.65)`)
- Border: theme-aware RGBA (light: `rgba(15,23,42,0.08)`, dark: `rgba(248,250,252,0.08)`)
- Text colors from `useTheme()` tokens: `theme.textPrimary`, `theme.textSecondary`, `theme.textMuted`
- CTA button: `theme.btnBg` / `theme.btnText`
- Rounded: `rounded-2xl` (matches ThemeControlPanel)
- Box shadow layered: directional + glow from `theme.glow`

## Motion Strategy

- Framer Motion `AnimatePresence` wrapping component for exit animation
- Entry: fade + slide up (`opacity: 0, y: 12` → `opacity: 1, y: 0`)
- Exit: reverse
- Duration: 0.35s (matches WhatsApp pattern)
- **Reduced motion**: Use framer-motion `useReducedMotion()` hook; when true, skip animation (instant show/hide)

## Accessibility

| Concern | Implementation |
|---------|---------------|
| Role | `role="region"` with `aria-label="Survey notification"` (non-modal, does not block interaction) |
| Close button | `aria-label="Close survey notification"` |
| Dismiss button | Native `<button>`, text content provides accessible name |
| CTA link | `<a>` with clear text; `aria-label` not needed (text is descriptive) |
| Keyboard | Tab order: close → CTA → dismiss. All operable via Enter/Space |
| Escape | `keydown` listener dismisses notification |
| Motion | `useReducedMotion()` disables animations for `prefers-reduced-motion` users |
| Contrast | Glass opacity tuned per theme (`isLight` check); text uses `theme.textPrimary`/`theme.textMuted` which already meet WCAG AA |

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/landing/SurveyEntryNotification.jsx` | **Create** | Self-contained notification component (~80-100 lines) |
| `src/pages/Landing.jsx` | **Modify** | Add import + `<SurveyEntryNotification />` render (~3 lines) |

Total: 2 files touched, ~85-105 new lines, no dependencies added.

## Open Questions

None. All decisions resolved.
