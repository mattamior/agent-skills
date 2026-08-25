# Brand Design System Trigger Cases

Use these prompts for human or agent forward-testing after material changes to the skill name, description, or workflow.

## Should activate

| Prompt | Expected behavior |
| --- | --- |
| Create three distinct logo directions for a bilingual developer tool and record how we choose between them. | Establish the brief, explore materially distinct directions, and maintain a process record. |
| Turn this approved SVG mark into the favicon, PWA, and social assets our application actually needs. | Inspect the approved master, load production guidance, generate only requested assets, and run visual QA. |
| Audit the brand files in this repository and explain what is evidence, what can only be inferred, and what history is missing. | Inspect available records and history without inventing the missing design process. |
| Review whether our shipped logo variants preserve the approved negative space and work at 16px. | Load visual QA guidance and validate rendered output. |

## Should not activate

| Prompt | Reason |
| --- | --- |
| Draw a one-off editorial illustration for this blog post. | This is illustration work, not a reusable brand identity or asset system. |
| Change the padding on this existing button component. | This is an unrelated design-system micro-edit. |
| Crop this product photo for a social post. | This does not create, package, or review a brand identity. |

## Authorization boundary

| Prompt | Expected behavior |
| --- | --- |
| Here is our approved logo. Update the website to use it. | Inspect the website and integrate only the approved branding surface because authorization is explicit. |
| Here is our approved logo. Package the production assets. | Produce the requested asset pack, but do not modify a website without separate authorization. |
