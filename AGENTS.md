# AGENTS.md — VS Studio Instructions & Design Directives

Please refer to [.agents/rules/design-rules.md](file:///.agents/rules/design-rules.md) for full design system details.

## Core Rules Summary
1. **Palette**: Only use the 7 tokens: `white` (#FFFFFF), `paper` (#F6F8F5), `mint` (#E4F7EB), `sage` (#9EDBB3), `green` (#1DB954), `forest` (#0D2B1F), `ink` (#0B1E16). No black (#000000), no neon, no lime, no glassmorphism, no extra colors.
2. **Typography**: Headings = `Young Serif`, Body = `Schibsted Grotesk`. No Inter, Roboto, Poppins, Space Grotesk, or Arial. Sentence case only.
3. **Phase-by-Phase**: Execute one phase at a time. Run dev server, inspect in browser subagent, take screenshots at 360px, 768px, and 1280px, fix visual bugs, and provide a test walkthrough before proceeding.
4. **No Unasked Features**: Strictly implement the requested features, database tables, and clean production code.
