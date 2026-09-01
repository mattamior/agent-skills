---
name: pet-avatar-generation
description: Create or refine stylized avatar images from a user's pet photo while preserving recognizable identity, markings, proportions, and requested background treatment. Use for pet profile pictures, multi-style avatar exploration, style-reference transfer, transparent-background pet portraits, or refinement of a selected pet-avatar direction; not for human avatars, generic animal illustrations without a source pet, or unrelated photo retouching.
---

# Pet Avatar Generation

Turn a real pet image into a recognizable avatar. When image generation or image editing is available and the user asks for an actual image, generate the image instead of stopping at a prompt description.

## Establish the image roles

Identify the source pet image, any style-reference image, and any previously generated avatar selected for refinement.

If the user asks to transform a pet but no usable source image is available in the conversation, ask for the pet image. Do not pretend an opaque identifier or a verbal description is the editable source. If source and reference images are both present and their roles are clear from context, proceed without unnecessary clarification.

Use the source pet as the identity reference. Use style references only for visual treatment, composition, palette, lighting, line quality, texture, and background cues.

## Preserve pet identity

Keep the features that make the pet recognizable: species and breed cues, face shape, fur colors and pattern boundaries, eye color, ear shape, muzzle and nose proportions, distinctive asymmetry, and other visible markings.

Do not silently change the pet into another breed, replace distinctive markings, add accessories, or alter age/body proportions merely to fit a style. Simplification is allowed when the style requires it, but identity cues must survive the simplification.

For multiple pets, preserve each animal's distinguishing traits and keep them individually recognizable. Do not combine them into one avatar unless the user asks for a group portrait.

## Choose the workflow

Use direct generation when the user already specifies a style or provides a clear style reference.

Use style exploration when the user asks for options, alternatives, or different styles. Generate a small set of materially different directions rather than near-duplicates. Vary rendering language and mood while keeping the pet identity and avatar framing stable. Read [style direction guidance](references/style-directions.md) when choosing fallback directions.

When the user selects a direction, treat that selection as the new style anchor. Refine the selected output or selected style without drifting back into unrelated exploration.

## Compose for avatar use

Default to a square-first portrait unless the user requests another format. Favor a head, bust, or upper-body crop with a clean silhouette, centered visual weight, and enough safe margin around ears, whiskers, horns, feathers, or other defining features.

Avoid accidental clipping, cluttered scenery, text, logos, or watermarks unless explicitly requested. Keep the face readable at small profile-picture sizes.

For transparent backgrounds, request real alpha transparency when the image system supports it and avoid a baked white matte or visible white halo around fur. For a solid or decorative background, follow the user's requested color or mood. If the user gives no background preference, use a simple non-distracting treatment that separates the pet from the background.

## Generate, inspect, and refine

After each generation, check the result against the source pet for identity fidelity, markings, facial proportions, crop, style consistency, and background treatment.

If one property is wrong, correct that property while preserving the rest of the approved direction. Do not reset the whole design unnecessarily.

For an exploration set, keep the options distinct enough that the user can make a meaningful choice. For a final selected avatar, prefer one clean finished image unless the user asks for variants.

When exact file-format guarantees are not exposed by the image system, describe the visible result accurately rather than claiming properties that were not verified.
