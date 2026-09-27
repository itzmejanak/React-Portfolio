<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## GitHub data
- Live GitHub repos are fetched in `src/lib/github.functions.ts` through the Lovable connector gateway, never from the browser — the connector key is server-only.

## Home presentation
- Keep the kinetic editorial home continuation isolated in `HomeEditorial.tsx` while inner pages retain their existing section components, so homepage redesigns cannot accidentally alter other routes.
- Use real project imagery only when a project provides it; the local Katha preview is a screenshot of the live public project, while other missing previews remain typographic, to avoid fabricated portfolio visuals.
- Keep the original opening canvas sequence unchanged; selected home moments and public-page openings share `PortraitStage` with scene-specific video behind foreground content and a reduced-motion poster, so distinct motion stays readable without touching backend data or the private admin area.
- Map home portrait scrub timing to the visible scene stage rather than the full data-list height, so movement settles before long section content ends and holds its final pose.
