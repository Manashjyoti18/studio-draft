# STUDIO DRAFT — DESIGN SYSTEM SPECIFICATION
## AirPods Pro 3 Cinematic Engineering & Editorial System

### 1. Brand Philosophy & Aesthetic Foundations
Studio Draft is an independent website design and engineering studio founded by Abhigyan Saikia. The visual language merges **Apple's cinematic product storytelling** (controlled camera dolly, layered spatial depth, scrubbed scroll choreography) with **high-end Swiss/editorial typographic discipline** (sharp high contrast, crisp borders, tactile physical mockups).

---

### 2. Color System Tokens

| Semantic Token | Hex Value | Role & Usage | Contrast Ratio (vs White / Ink) |
|---|---|---|---|
| `--color-canvas` | `#FFFFFF` | Primary canvas & light surfaces | 21:1 (vs Ink) |
| `--color-ink` | `#111111` | Primary text, heavy borders, dark accents | 21:1 (vs Canvas) |
| `--color-surface-subtle` | `#F8F8F8` | Secondary panel backgrounds | 19.8:1 (vs Ink) |
| `--color-accent` | `#FF6B35` | Studio Orange — focal CTAs, indicators, links | 3.6:1 (large text) / 7.2:1 (on black) |
| `--color-accent-hover` | `#E0531E` | Pressed / hover state for orange actions | 4.2:1 |
| `--color-secondary` | `#B7E4C7` | Soft Mint Green — verified badges, fill light | 1.3:1 (surface) / 12.8:1 (on black) |
| `--color-border-strong` | `#111111` | High-contrast structural boundaries (2px) | AAA |
| `--color-border-subtle` | `rgba(17, 17, 17, 0.15)` | Metadata dividers, datum lines | Informational |
| `--color-text-muted` | `rgba(17, 17, 17, 0.72)` | Body copy, secondary descriptions | 5.8:1 (Passes AA) |
| `--color-text-dim` | `rgba(17, 17, 17, 0.48)` | Micro-datums, timestamps, specs | AA Large |

#### Strict Rules:
- **No Gradients:** Flat, pure color surfaces only.
- **No Unrelated Colors:** Absolutely zero purple, blue, teal, neon or pastel yellow.
- **Orange Restraint:** Orange attracts visual attention to primary actions; it is never used as large solid background fills.

---

### 3. Typography Hierarchy

| Token | Family | Size (Mobile / Desktop) | Line Height | Tracking | Weight |
|---|---|---|---|---|---|
| `font-hero-display` | Space Grotesk / Display | `3.25rem` / `6.25rem` (100px) | `0.88` | `-0.05em` | 800 (Extrabold) |
| `font-section-heading` | Space Grotesk / Display | `2.75rem` / `5.0rem` (80px) | `0.92` | `-0.04em` | 700 (Bold) |
| `font-chapter-heading` | Space Grotesk / Display | `2.25rem` / `3.75rem` (60px) | `0.95` | `-0.03em` | 700 (Bold) |
| `font-card-title` | Space Grotesk / Display | `1.5rem` / `2.0rem` (32px) | `1.05` | `-0.02em` | 700 (Bold) |
| `font-body-lead` | Inter / Sans | `1.125rem` / `1.25rem` (20px) | `1.55` | `0` | 400 / 500 (Medium) |
| `font-body` | Inter / Sans | `0.9375rem` / `1.0rem` (16px) | `1.6` | `0` | 400 (Regular) |
| `font-datum-code` | JetBrains Mono / Mono | `0.6875rem` / `0.75rem` (12px) | `1.4` | `0.15em` | 600 / 700 (Bold) |

---

### 4. Spacing & Spatial Rhythm
Based on an 8px modular cadence:

- `space-1`: 4px — micro gaps, status dot padding
- `space-2`: 8px — tight badge margins
- `space-4`: 16px — standard component gutters
- `space-6`: 24px — card internal padding (compact)
- `space-8`: 32px — default card padding, content separation
- `space-12`: 48px — sub-section headers
- `space-16`: 64px — section datum dividers
- `space-28`: 112px — standard section vertical breathing room (`py-28`)
- `space-36`: 144px — immersive section vertical padding (`py-36`)

---

### 5. Elevation & Structural Borders
- **Borders:** Crisp, physical 2px solid `#111111` (`border-2 border-[#111111]`).
- **Tactile Drop Shadows:** Hard-edge offset shadows without blur:
  - `shadow-sm`: `3px 3px 0px 0px #111111`
  - `shadow-md`: `4px 4px 0px 0px #111111`
  - `shadow-lg`: `6px 6px 0px 0px #111111`
  - `shadow-xl`: `8px 8px 0px 0px #111111`
  - `shadow-orange`: `4px 4px 0px 0px #FF6B35`
  - `shadow-mint`: `4px 4px 0px 0px #B7E4C7`

---

### 6. Component Interaction States
Every interactive element must explicitly define:

1. **Default:** High-contrast crisp border, solid text, hard offset shadow.
2. **Hover:** Instant color inversion or accent color fill (`hover:bg-[#FF6B35] text-white`).
3. **Focus-Visible:** Distinct WCAG AA ring: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2`.
4. **Active / Pressed:** Translation down-right (`translate-x-[2px] translate-y-[2px]`) with reduced shadow.
5. **Disabled:** Reduced opacity (`opacity-50 cursor-not-allowed`).

---

### 7. Motion & Scroll Choreography Tokens
Tied to user scroll position with zero scroll-hijacking:

- **Scroll Engine:** GSAP ScrollTrigger synchronized directly with Lenis smooth scrolling (`smoothWheel: true, duration: 1.15s`).
- **Hero Scroll Story:**
  - Camera dolly push-in ($Z: 7.5 \to 3.8$).
  - Foreground browser straightens from perspective angle to $(0, 0, 0)$ and expands $+42\%$.
  - Background browsers separate outwards into deeper space ($X, Y, Z$ separation).
  - Headline fades and shifts upward naturally.
- **Past Works Scroll Story:**
  - Pinned presentation frame scrubbed through 4 distinct visual chapters.
  - Perspective frame tilts subtly ($2.5^\circ$) during chapter transitions.
  - Fluid mobile fallback when viewport width is below `1024px`.
- **Eases:**
  - `apple-smooth`: `power2.out`
  - `cinematic-transition`: `power2.inOut`
  - `spring-card`: `damping: 18, stiffness: 180`
- **Accessibility:** Full `prefers-reduced-motion` compliance — all scrubbed pins and 3D camera shifts cleanly bypass to standard static responsive layouts.

---

### 8. WCAG 2.2 AA Accessibility Compliance
- All interactive controls have accessible names (`aria-label`).
- Headings follow strict $H1 \to H2 \to H3 \to H4$ document outline.
- Contrast ratio between text and surface strictly exceeds 4.5:1.
- Complete keyboard accessibility (Tab, Shift+Tab, Enter, Space to flip pass cards).
- All images have descriptive `alt` attributes.
