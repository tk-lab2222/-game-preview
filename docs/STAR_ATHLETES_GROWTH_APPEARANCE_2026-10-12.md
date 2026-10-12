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

[Draco lifecycle concept](quality-2026-10-12/draco-growth-concept.png) is generated original concept art using the current Draco sprite as reference, not a game screenshot. It shows left-to-right juvenile/adolescent/adult and is intended for visual comparison. It is not an animation sheet, a set of separately integrated sprites or proof of genetic consistency for every individual. No runtime code, statistics, save schema or public deployment is changed by this proposal.

Before implementation is called complete, verify actual birth → valid training → visible stage transition → reload/protected restore/corrupt-primary recovery → lineage/representative display; preserve naming/identity/rarity/genes, count valid actions once, and verify mobile framing and asset performance for every supported species/stage. Existing runtime CI validates v0.34.03 and does not validate an unimplemented growth system.
