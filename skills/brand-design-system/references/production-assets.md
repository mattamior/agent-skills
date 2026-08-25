# Production Asset Guidance

Use this reference only after a logo direction has been approved, or when auditing a final brand pack.

## Choose the asset set by use case

Start with a vector master and publish only variants that serve an identified surface:

- **Logo system:** mark, wordmark, and lockups only when each will be used. Include light, dark, monochrome, and reverse variants only where contrast requires them.
- **Web app:** SVG brand mark/lockup as needed; favicon PNG sizes and ICO; Apple touch icon; PWA icons and manifest only if the application uses a manifest.
- **Maskable icons:** use an opaque safe-zone background only for the maskable export. The visual mark's intended negative space must still read correctly against that background.
- **Social sharing:** create Open Graph and X/Twitter images only when metadata will reference them. Standard sizes are 1200x630 and 1200x675 respectively.
- **Print or external handoff:** preserve an editable vector master and document the exact colors, clear space, and minimum size before creating raster derivatives.

## Vector and raster rules

- Keep production SVGs self-contained: no external images, stylesheets, or font dependencies. Convert final wordmarks to paths when cross-device consistency is required and font licensing allows it.
- Preserve the approved viewBox, proportions, stroke widths, joins, and colors. Derivatives may scale or crop only where their format calls for it.
- Raster exports must be generated from the approved master, not redrawn separately. Retain transparency wherever the asset is expected to overlay arbitrary backgrounds.
- Name files by role and background treatment, for example `mark-color-on-dark.svg`, `lockup-horizontal-white.svg`, and `icon-512x512-maskable.png`.

## Web integration

When authorized, place assets in the project's existing public/static location and use the project framework's normal path rules. Update favicon, Apple icon, manifest, and social metadata consistently. Make the primary favicon link canonical and version its URL when a previously cached icon needs replacement.

Do not assume a relative social image URL will be accepted by every social crawler. Use an absolute public URL when a deployment domain is known; otherwise state that deployment configuration still needs to supply it.
