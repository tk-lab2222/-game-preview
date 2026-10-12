# STAR ATHLETES — growth appearance proposal

The human suggested that appearance could change as a character grows, after seeing the new character art. This is a visual/design proposal, not a shipped growth system. Current runtime remains v0.34.03, source `c086aee0e55d9ef76ca53e8005b5afbc5d57fe5f`.

## Recommended direction

Use three base life stages: juvenile, adolescent and adult. Preserve species, recognizable colors/markings and identifying features across stages. Change proportions, horn/wing development, mane/feather volume, tail, stance and expression. Growth should visibly communicate the player's care for the same individual.

| Stage | Visible difference | Provisional progression |
| --- | --- | --- |
| 幼体 | Round head, short limbs, horn buds/small wings, curious expression | Birth/start of individual development |
| 育成期 | Longer limbs/neck, developing horns/wings, more balanced proportions | After the first three completed training sessions |
| 成体 | Athletic body, mature horns/wings/mane, longer tail, confident expression | After nine completed training sessions |

Three and nine sessions are design candidates, not implemented or verified balance values. A normal generation has six seasons with three training rounds each, so this would give a visible milestone around the first season and another around the third. Training injuries and incomplete/failed actions need an explicit progression policy before implementation; do not award sessions for canceled input or count a render/reload as training.

## Distinctions to preserve

- Growth stage is an individual's development, separate from generational index (`G1`, `G2`) and birth rarity. A rare newborn can still be a juvenile. Adult appearance does not automatically award a combat bonus or raise rarity.
- Identity/genes remain recognizable: do not change species, reroll color/pattern, rename the individual or silently replace its inherited traits at a life-stage boundary.
- Training specialization could later affect build or posture, but do not start with a full species × life-stage × every-trait × every-plan sprite matrix. Four species × three base stages is a manageable first art scope; existing individual color/trait presentation can remain a separate concern.
- Keep the UI short: a brief visual reveal when a milestone is reached, respect reduced-motion, keep ordinary training available, and retain the current low-text direction. No lengthy new explanation panel or paid requirement is necessary.

## Current code and integration path

Training263 currently persists actual cumulative stat gains on each monster as `trainingGain226`. `S.turn` is only the current season's training counter and resets in `advanceSeason233()`. The current runtime has no individual age/life-stage counter. Global season/generation cannot safely choose an archived character's appearance.

For a session-based rule, the existing training owner263 should update individual completed-session progress exactly once per valid training action, before canonical persistence. Stage is derived from that per-character progress, and preserved when moving to lineage/Nest or registering a representative. A new offspring starts its own progression; it must not inherit the parent's age/stage. The existing sprite owners116/329/330 select the appropriate species/stage asset; all birth/training/entry/archive/representative/share views must consume the same selection rule.

For existing saves, do not fabricate precise past training-session counts from accumulated stat gains: gain depends on plan, league, luck, injury and bonuses. Migration must retain valid character data, keep stage stable through reload/restore, and define a conservative legacy presentation before shipping. Already trained saved characters should not appear to become younger after a migration.

GAME CORE: stage/progression belongs to existing training/domain owners and species art. SHARED ASSET: reuse existing reveal/dialog/reduced-motion conventions where appropriate. RETIRE: normal-render paths that always choose one static base sprite once stage-aware selection becomes canonical. Do not add another runtime patch or leave competing stage calculators alive.

## Visual evidence and limits

### Remaining three species — refined visual proposals

The human asked whether physical growth fits the current training loop and requested refinement of the remaining three creatures. The following original comparison sheets use the currently implemented species sprites as image references. Left to right: juvenile / adolescent / adult. They are generated concepts, not gameplay screenshots, separately usable sprites or animations.

| Species | Visual development | Comparison |
| --- | --- | --- |
| ユニル (`unil`) | Short legs and horn bud → developing spiral horn/mane → longer legs/neck, elegant equine proportions and flowing mane. Keep ivory, pink/lilac, violet eyes and flank markings. | [Unil](quality-2026-10-12/unil-growth-concept.png) |
| グリフォン (`grimo`) | Compact fluffy chick → developing flight feathers/talons → stronger lion hindquarters, mature eagle profile, closed beak and substantial wings. Keep navy/ivory/gold. | [Griffin](quality-2026-10-12/grimo-growth-concept.png) |
| ネリス (`puru`) | Small droplet → rounded water spirit → flowing wave crest, longer liquid limbs and more composed expression. Keep cyan translucent water and the luminous core. | [Neris](quality-2026-10-12/puru-growth-concept.png) |

Griffin received a second composition/maturity pass after the first output clipped the adult at the right edge. The selected sheet improves full-body framing and adult expression. Neris still needs more outer margin in a production sprite and assessment of whether its adult silhouette retains enough of the original droplet identity. Unil's adult mane and tail may need simplified highlights at actual mobile size. These are remaining art tasks, not hidden verification claims. Original outputs are copied byte-for-byte; metadata/hashes are in [the manifest](quality-2026-10-12/growth-refinements-manifest.json).

### Feasibility within the existing training loop

Physical life stages are absent, but the game already grows abilities and has six seasons × three normal training rounds. Appearance milestones can therefore accompany existing play without adding an age-management screen, extra training currency, waiting timer, lifespan/death rule or new compulsory action. First implement visible development; adult status should not be an extra requirement for competing or breeding. Three/nine individual rounds remain provisional art milestones, with playtesting needed to judge pacing.

Proposed counting policy: one committed normal training round counts once for each participating individual, independent of safe/normal/high intensity, success grade or stat gain; an injury still uses the round and counts as experience. Canceled/blocked actions, rerenders, reloads and tournaments do not count. This avoids making safe training slower to mature or making high-load the visual-growth shortcut. Confirm this policy when implementing.

`patch-v279.js::train279()` is also a live training path: LIMIT training allocates points selectively and currently records a global LIMIT session count, not individual age. If it contributes to appearance growth, advance only participants with positive allocation, once per committed session regardless of allocated points. Unallocated individuals do not advance. Owners263/279 should consume one core progression rule; do not introduce competing counters or an extra wrapper/patch.

For legacy saves, retain the existing static appearance and mark historic session progress unknown rather than reverse-engineering age from stats. At migration, fix a presentation floor matching the legacy sprite; new valid sessions can move forward without making existing athletes visually younger. Birth initialization must distinguish new offspring from restored legacy data. Save identity, genes, names, lineage and representative references remain intact. This migration is a proposal, not implemented code.

### Original additional-species scope

The human recalled an original plan of “あと5種”. Searches of Alpha Lab's current project state, canonical product direction, milestone roadmap, repository file tree/code search and species-related issues, plus the runtime repository's current species assets, did not recover those five names/motifs. This is not proof that the older idea never existed. A clarification is pending; do not replace the original roster with invented species or silently decide whether the intended total was six or nine. The three existing species above are refined now; original additional species remain to be recovered.

[Draco lifecycle concept](quality-2026-10-12/draco-growth-concept.png) is generated original concept art using the current Draco sprite as reference, not a game screenshot. It shows left-to-right juvenile/adolescent/adult and is intended for visual comparison. It is not an animation sheet, a set of separately integrated sprites or proof of genetic consistency for every individual. No runtime code, statistics, save schema or public deployment is changed by this proposal.

Before implementation is called complete, verify actual birth → valid training → visible stage transition → reload/protected restore/corrupt-primary recovery → lineage/representative display; preserve naming/identity/rarity/genes, count valid actions once, and verify mobile framing and asset performance for every supported species/stage. Existing runtime CI validates v0.34.03 and does not validate an unimplemented growth system.
