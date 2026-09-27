# A guided portrait journey across the portfolio

## Goal
Keep the opening portrait sequence as it is. Make the rest of the public website feel like one clear, cinematic journey, with Janak reappearing at every home chapter and at inner-page openings. The movement should help tell the story rather than interrupt reading or repeat the same visual effect everywhere.

## Visual and motion direction
- Use the **current portrait** as the source for new left-facing, right-facing and forward-facing moments, preserving facial identity, blue/ember lighting and the existing charcoal-and-ember visual language. Generate coherent transition frames between approved anchor poses; do not fabricate project imagery or change the original opening frames.
- Give the recurring portrait a narrative path: the opening gaze resolves toward the person behind the work; a leftward glance leads into About and Experience; a rightward turn reveals Work and making/building; later chapters vary the crop and depth without random alternation; the closing Contact moment returns to direct eye contact. Use the same visual vocabulary for Experience, project detail, Apps and E-Books openings, adapted to each page's content. Keep Admin practical, not cinematic.
- Place portrait moments as background or edge-stage transitions, with a consistent typographic rail and clear reading zones. Text, links, filters and the contact form must never be covered by the subject. Use sharper edges, open editorial rows and a small set of repeatable spacing/type rules instead of mixed cards, pills and competing effects.
- Give each chapter one distinct purpose and a predictable progression: **Person → Work → Experience → Approach → Skills/Services → GitHub → Contact**. Show verified reviews only when real review data exists. Reduce redundant headings and make the jump from a chapter to its related page obvious.

## Implementation approach
1. Review the current portrait for likeness and pose limits; create a small set of source-derived anchor images and in-between frames for left/right/direct turns. Reject any frames with distorted identity; if reliable angles cannot be made from this single source, use fewer subtle turns rather than claiming a faithful side profile.
2. Build a reusable portrait-sequence treatment with scroll-linked progress for home chapters and shorter entry sequences for public inner pages. Sequence timing and direction follow the narrative map, not a generic alternating rule. The opening hero remains unchanged.
3. Recompose the home chapters and public inner pages into a shared editorial system, replacing old card-heavy treatments where they conflict with the journey. Keep genuine project previews and all existing API-fed profile, experience, projects, apps, books, services, skills and GitHub information; preserve links, category filters, downloads and the working contact form. No new backend endpoints or invented copy.
4. Provide static first frames, progressive loading and responsive crops so portrait moments remain legible on phones and do not block content while frames load. Respect reduced-motion preferences with stable still images and no scroll scrubbing; keep keyboard navigation and focus visible.
5. Verify the journey on desktop and phone: portrait continuity at every chapter, route transitions, content readability, scroll performance, filters, links, form validation and reduced motion. Check for preview errors and ensure the opening hero remains intact.

## Technical notes
The app already uses React, Vite, Tailwind and Motion. The original opening is a 90-frame canvas sequence; the later home content is isolated in `HomeEditorial.tsx`. Inner pages currently use a generic banner or card-based layout. Reuse the existing data calls, semantic color tokens and route metadata. Store any generated media in project assets; avoid adding large sequences everywhere when short, optimized clips or sparse frames suffice.
