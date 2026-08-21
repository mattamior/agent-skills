# Visual QA Guidance

Use this reference for final production assets, website integration, or a visual regression review.

## Master fidelity

- Compare every derivative against the approved master at a useful display size. Verify geometry, palette, stroke weight, wordmark case, lockup spacing, and background treatment.
- Do not pass an asset because its SVG paths look plausible. Rasterize and inspect the output.
- When a logo includes negative space or knockout shapes, inspect actual alpha values in standard transparent PNG exports. A hole intended to be transparent must have alpha `0`; a mask or coordinate-system mistake can look correct in source but fail after rendering.

## Variant checks

- Verify dark, light, black, and white variants use the approved outline and contrast treatment. Do not convert an approved colored outline to black or white unless that variant explicitly calls for it.
- Check 16px, 32px, and an application-size rendering. Simplify only if that simplification was explicitly approved; document it as a separate small-size variant.
- For maskable app icons, verify the mark remains inside the safe zone after circular or squircle cropping. Its background may be opaque, but this must not be confused with the transparent standard icon export.

## Delivery checks

- Parse SVG and verify it has no external dependencies, unexpected text/font dependency, malformed XML, or duplicate IDs.
- Verify PNG dimensions, color mode, and alpha behavior. Inspect ICO entries at each intended size.
- Request actual served favicon and manifest URLs from the running site or built static output. Browser tabs cache favicon candidates aggressively: use a versioned canonical URL when replacing an existing icon.
- Run the project's production build after web integration. Report browser, visual, and build evidence separately; a successful build is not proof of visual fidelity.
