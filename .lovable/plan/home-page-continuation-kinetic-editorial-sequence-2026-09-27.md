# Home page continuation: kinetic editorial sequence

## Goal
Keep the cinematic portrait opening intact. Redesign **only the home page beneath it**, using the selected **Kinetic editorial sequence** as the structural reference: oversized Chakra Petch typography, asymmetrical full-width chapters, charcoal and ember contrast, a restrained cool-blue echo, and depth created by real imagery, layered planes, scroll pacing, and motion rather than repeated rounded cards. The other pages remain unchanged for now.

## What will change
1. **A seamless handoff from the portrait:** let the final portrait frame lead into a monumental About chapter. Use the existing profile, education/location and achievements data; arrange them as editorial copy, a narrow information rail and sharp-lined counters rather than a panel-and-card grid.
2. **Work becomes the visual centerpiece:** follow with a gallery-led Selected Work chapter using actual projects from the existing backend. Feature a small number of projects with large, staggered imagery and typography, then provide an accessible way to browse the remainder without reverting to a wall of cards. Preserve project links and category filtering. Use genuine project screenshots when available; otherwise use typographic compositions from real project names, not fabricated screenshots.
3. **Recompose every remaining home section:** Experience as a typographic timeline; Why Choose Me and Services as crisp numbered editorial rows; Skills as an open technical index; GitHub as a compact live activity band; Testimonials as a large quote treatment; Contact as a strong closing chapter with the existing working form. Preserve the sections, their backend-fed content, navigation anchors, and form submission behavior.
4. **Unify the motion language:** build a smooth chapter-to-chapter rhythm with subtle scroll-linked offsets, layered depth, precise reveal timing and restrained interaction feedback. Avoid exaggerated tilt, heavy blur, pill buttons and broad rounded corners. Respect reduced-motion settings and keep the page usable without animation.
5. **Review the image needs:** use the existing portrait sequence and available real project media first. Identify exactly which additional portraits or project screenshots would materially improve the design; do not replace missing images with invented work or block the redesign on uploads.

## Technical approach
- Limit changes to home-only presentation and shared styling where it does not alter the other pages; keep the existing TanStack/Vite/React/Tailwind setup and server data calls.
- Keep all displayed profile, experience, project, skill, service, GitHub, testimonial and contact information sourced from the existing APIs. Prototype wording and fake projects are **not** content to ship.
- Preserve the selected composition's strong About → featured Work → capability chapters → closing Contact arc while keeping the rest of the current home content discoverable and all existing anchor targets working.
- Use semantic design tokens in global CSS, Chakra Petch for display, IBM Plex Mono for metadata, and Work Sans for body. Keep flat or very small radii and use accessible contrast/focus states.
- Verify desktop and phone layouts, portrait-to-content transition, all project/category interactions, navigation anchors, form states and reduced-motion behavior in the preview; check for errors before completion.

## Scope boundary
No redesign of Experience, project detail, Apps, E-Books or Admin pages in this pass. No backend schema or API changes, and no invented biography, claims or assets.
