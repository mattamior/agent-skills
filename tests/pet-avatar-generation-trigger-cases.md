# Pet Avatar Generation Trigger Cases

Use these prompts for human or agent forward-testing after material changes to the skill name, description, or workflow.

## Should activate

| Prompt | Expected behavior |
| --- | --- |
| I uploaded my dog plus a reference illustration. Turn the dog into an avatar in that visual style and keep the white blaze on her face. | Treat the dog photo as identity evidence, the illustration as style evidence, and generate an avatar without changing the distinctive marking. |
| Extract my cat from this photo and give me four clearly different avatar styles to choose from. | Preserve the cat's identity while producing a small set of materially distinct avatar directions. |
| Make the cute chibi pet-avatar option we picked into a clean transparent-background version. | Refine the selected direction, preserve its style and identity, and request real transparency without a white matte when supported. |
| Turn these two rabbit photos into matching profile avatars, but keep the rabbits individually recognizable. | Apply a coherent style while preserving each rabbit's distinct appearance. |

## Should not activate

| Prompt | Reason |
| --- | --- |
| Make a professional LinkedIn avatar from my headshot. | This skill is for pet avatars, not human portraits. |
| Invent a fantasy dragon mascot for my game studio. | There is no source pet whose identity needs to be preserved. |
| Remove a trash can from the background of this dog photo. | This is generic photo editing unless the request is specifically to create a pet avatar. |
| Design a veterinary clinic logo with a paw icon. | This is logo and brand work, not pet-avatar generation. |

## Identity and refinement boundary

| Prompt | Expected behavior |
| --- | --- |
| Make the ears more like a corgi even though my dog is a beagle. | Follow the explicit transformation request, but recognize that this intentionally departs from identity fidelity. |
| The selected avatar is right except the left-eye patch disappeared. Fix only that. | Correct the missing marking while preserving the selected composition and style. |
