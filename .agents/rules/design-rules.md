# VS Studio — Design & Architecture Rules

## 1. Palette: White & Green Shades Only
Strictly enforce these theme tokens in Tailwind (`tailwind.config.js`) and CSS variables. Do not use any colors outside of this set:
- `white`: `#FFFFFF` (cards, form panels, clean surfaces)
- `paper`: `#F6F8F5` (page background, subtle surface)
- `mint`: `#E4F7EB` (soft sections, subtle badge backgrounds, hover fills)
- `sage`: `#9EDBB3` (borders, dividers, secondary accent shapes)
- `green`: `#1DB954` (primary buttons, links, active indicators, highlights)
- `forest`: `#0D2B1F` (deep headings, footer background, contact section background)
- `ink`: `#0B1E16` (primary body text, dark borders, dark accents)

### Contrast & Color Constraints
- **WCAG AA Compliance**: White text is ONLY permitted on `green` (`#2E7D55`) or `forest` (`#14392B`). NEVER use white text on `sage` or `mint`.
- **Absolute Bans**:
  - No pure black (`#000000`) — use `ink` (`#10211A`).
  - No saffron, orange, yellow, neon, or lime.
  - No blue, purple, or multi-hue gradients.
  - No glow effects, drop-shadow glow, or glassmorphism (frosted blurs).
- **Surface & Geometry**: Flat shapes, generous whitespace. Mix organic and structured radii (circles, pills, large asymmetric corner radius on select tiles) rather than monotonous uniform rounded rectangles.

---

## 2. Typography
- **Headings**: `Young Serif` (`font-serif`)
- **Body & UI**: `Schibsted Grotesk` (`font-sans`)
- **Strict Bans**: Do NOT use Inter, Roboto, Poppins, Space Grotesk, or Arial.
- **Styling Rules**:
  - Sentence case only. No all-caps labels or headers.
  - Optimal line length: under 80 characters for readable reading columns.

---

## 3. Motion & Micro-interactions
- **Hero Moment**:
  - Headline lines slide up gracefully on load.
  - Two overlapping green circles (representing V and S) gently drift in the background with subtle ambient float.
- **Inquiry Form**:
  - Step transitions slide smoothly.
  - Progress bar dynamically fills.
  - Green pop/tick animation upon successful submission.
- **Micro-interactions**:
  - Hover and active/press feedback on interactive buttons and links only.
  - DO NOT attach entrance fade-in animations to every section.
  - Full support for `prefers-reduced-motion: reduce`.

---

## 4. Tech Stack & Engineering Standards
- **Frontend**: React 18+ / React 19 + Vite + Tailwind CSS + Lucide React (or custom SVG) + React Router v6/v7 + React Hook Form + Zod.
- **Backend / Database**: Supabase (Postgres, Auth, Storage, RLS, Edge Functions).
- **Security**:
  - Row Level Security (RLS) on all tables.
  - Public can only INSERT inquiries and upload to restricted inquiry-attachments bucket.
  - Admin/Founder routes locked behind Supabase Auth and RLS. No public user registration.
  - Honeypot anti-spam field and rate limiting on inquiry endpoint.
  - Never expose `SUPABASE_SERVICE_ROLE_KEY` on client.

---

## 5. Working Mode & Quality Assurance
- Work strictly one phase at a time.
- After completing a phase:
  1. Run the local dev server.
  2. Open the page in the browser.
  3. Verify and capture screenshots at 360px (mobile), 768px (tablet), and 1280px (desktop).
  4. Fix all layout and visual flaws before progressing to the next phase.
