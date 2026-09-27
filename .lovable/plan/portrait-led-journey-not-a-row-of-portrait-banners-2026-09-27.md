# Portrait-led journey, not a row of portrait banners

## Goal
Keep the opening portrait sequence as it is. Rebuild the later portrait moments so Janak feels present and moving **behind** the main content, rather than appearing as a repeated image strip above it. Text, project imagery, links, and forms remain the foreground and stay easy to read and use.

## Visual journey
- **Home — About:** a closer, thoughtful portrait that turns toward the introduction; a restrained scroll-controlled movement behind the copy.
- **Home — Work:** a distinct, more active pose and camera distance, with the portrait kept in a dim background area that does not cover real project previews or filters.
- **Home — Experience:** a composed side-to-forward movement behind the timeline, paced to the reading rather than alternating sides for its own sake.
- **Home — Contact:** a quieter, direct and inviting look behind the closing invitation, never obscuring the form.
- Other home sections use the shared editorial rhythm without another portrait just to fill space. Public pages for Experience, projects, Apps, and E-Books get **one** short, distinct entrance moment each, composed around that page's content; the Admin page stays practical.

## Portrait direction
Use the existing portrait as the identity source. Create different expressions/actions, camera distances/poses, and subtle ember/blue lighting or depth changes for these moments. Produce genuinely changing motion frames or short clips for selected scenes, not crossfades between two static side portraits. Reserve full scroll-controlled movement for the most meaningful home moments; use brief motion that settles for page entrances. Check likeness and reject distorted or unnatural shots before using them.

## Layout and behavior
- Remove the current repeated top-of-section portrait strips and the left/right-by-page rule. Compose each scene as a background layer within its section, with a deliberate face-safe crop and dimming that protects the foreground. No cropped heads, competing project pictures, or portrait over controls.
- Keep one consistent type, spacing and navigation rhythm across the journey. On smaller screens, reposition or crop each scene intentionally rather than shrinking a desktop composition; if it cannot fit cleanly, use a suitable still without sacrificing content.
- Honor reduced-motion preferences with a clear static frame. Load later motion progressively so the opening and reading experience remain usable.
- Keep existing backend-fed content, filters, links, downloads, and contact form unchanged.

## Technical approach and checks
Reuse a scene system with per-scene assets, crop/focal settings, foreground-safe overlays and either scroll-scrubbed frames or a short entry sequence. Keep the opening canvas implementation untouched. Inspect the resulting scene motion and identity, then check every targeted scene on desktop and phone, including reduced motion, text legibility, project-image visibility, and the existing interactions.