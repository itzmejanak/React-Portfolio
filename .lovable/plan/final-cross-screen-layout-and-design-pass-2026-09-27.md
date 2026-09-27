# Final cross-screen layout and design pass

## Goal
Finish the portfolio’s presentation across small phones, larger phones, tablets, laptops and wide desktops. Keep the existing charcoal-and-ember editorial direction, real project imagery, moving portrait scenes, opening sequence, and all live content and interactions. This is a presentation pass, not a backend or content rewrite.

## What will change
1. **Shared layout:** Establish consistent page gutters, text widths, section spacing and heading wraps across all public pages. Treat tablet widths as their own layout, rather than letting a desktop composition squeeze until it suddenly stacks. Keep chapter numbering, rules and transitions aligned.
2. **Navigation:** Make the name, links and Contact action fit comfortably at intermediate widths; make the phone menu easy to open, read, close and navigate with a keyboard. Keep footer columns, contact information and links legible without cramped wrapping.
3. **Home journey:** Review every chapter from About through Contact at representative widths. Adjust portrait framing and dimming around readable text, preserve the current motion narrative and the opening sequence, and ensure the Work filters, featured projects, archive, skills/services rows, testimonials and contact form never collide or create dead space. Preserve the earlier rule that scroll-controlled portraits settle before their section’s content ends.
4. **Inner pages:** Refine the openings and content layouts of Experience, project details, Apps and E-Books for portrait and landscape tablets as well as phones and desktops. Keep each portrait behind its content, protect faces from unintended crops, and make long titles, descriptions, lists, images and download links fit their available width. Include the practical Admin sign-in and inbox layouts without turning them into cinematic pages.
5. **Controls and accessibility:** Keep filters, links, downloads, form fields and menu controls comfortably usable on touch and keyboard. Retain readable contrast, visible focus, stable loading/empty states and reduced-motion stills. Do not send a contact message or create an admin account while testing.

## Confirmed starting points
- The site currently uses screen-width rules at 600, 700 and 800 pixels, with shared two-column sections and large portrait openings. A width audit found horizontal overflow in the Apps list at 320 pixels; other tested pages did not show page-wide overflow at 320, 390, 768, 896, 1024 or 1280 pixels.
- The navigation displays the full desktop link row from tablet widths upward. Home content has separate phone/tablet stacking rules, so intermediate-width composition needs deliberate review rather than only a no-overflow check.

## Verification
Review the full journey at 320, 390, 768, 896, 1024 and 1280 pixels, including a landscape tablet and short-height screen. Check actual screenshots and bounding boxes for clipped text, horizontal scrolling, portrait crops, content overlap, section transitions and excessive gaps. Exercise menu navigation, Work filters/project links, downloads and contact focus/validation; check reduced motion and console errors. Keep all existing live data and backend behavior unchanged.

## Technical approach
Make focused responsive changes in the existing design tokens, shared page/header/footer elements, and the home/inner-page presentation components. Use content-driven grid and width constraints rather than broad fixed offsets, and preserve the existing scene and data modules unless a responsive rendering issue requires a narrow adjustment.
