# STAR ATHLETES integration removal audit

Baseline: v0.31.65 / 120 loaded scripts
Integration branch: 77 loaded scripts
Removed from release shell: 43

## Removal decisions

### Character art / shell
- fix-v096.js — obsolete image-source correction; current art is owned by draco-art-v103/species-art-v116.
- patch-v106.js — obsolete WebP/avatar wrapper; superseded by current canvas art owners.
- patch-v104.js — legacy training/parent UI; training is v210, breeding is v321. Required hatch CSS was moved to style-v094.css.
- patch-v118.js — lineage archive layout absorbed by v321.
- patch-v122.js — retired shop shell; required CSS moved to style-v094.css, shop behavior owned by v309.
- patch-v123.js — legacy training-card polish no longer used by current v210 UI.
- patch-v124.js — legacy meet/prep presentation superseded by current tournament UI.
- patch-v125.js — legacy tournament card shell; required CSS moved to style-v094.css.
- patch-v306.js — retired mobile shop shell; required touch CSS moved to style-v094.css.
- patch-v313.js / patch-v315.js — obsolete release shells with no current unique ownership.

### Breeding / hatch
- patch-v126.js — old affinity/UI shell; visual shell moved to v321, compatibility calculation/display owned by v233/v321.
- patch-v128.js — breed count/result strip absorbed by v201.
- patch-v129.js — candidate counters absorbed by v260.
- patch-v202.js — hatch contrast absorbed by v201.
- patch-v204.js — obsolete shell with no remaining unique behavior.
- patch-v206.js — egg crack animation absorbed by v127.
- patch-v234.js / patch-v235.js / patch-v236.js — old compatibility/skill display layers superseded by v233/v254/v321.
- patch-v244.js — compatibility cleanup-only patch; old affinity UI no longer exists.
- patch-v246.js / patch-v247.js — legacy skill/affinity display layers superseded by v254/v321.
- patch-v250.js — rarity spectacle absorbed by v249.
- patch-v298.js — duplicate-skill hide-only patch; historical skill renderers no longer load.

### Training
- patch-v205.js — obsolete training UI, superseded by v210.
- patch-v207.js — interaction bridge only for v205 DOM.
- patch-v208.js / patch-v209.js — old training/shiny layers; superseded by v210/v243.
- patch-v211.js — old generation lock superseded by v264; next-generation lock remains v230.
- patch-v237.js / patch-v239.js / patch-v241.js — duplicate training-choice memory layers; centralized in v210 with legacy v239 storage migration preserved.

### Tournament / progression
- patch-v098.js — obsolete tournament runner; normal tournament owned by v225.
- patch-v212.js — legacy tournament marker; tournament selection owned by v290.
- patch-v217.js — old season/generation progression; progression owned by v225/v233.
- patch-v245.js / patch-v248.js — duplicate premature-promotion cleanup; normalization moved to v225.
- patch-v300.js — next-season recovery absorbed by v225.
- patch-v307.js — annual promotion action recovery absorbed by v233.

### Candidate / adoption
- patch-v299.js — candidate-panel recovery duplicated v262.
- patch-v310.js / patch-v311.js — obsolete candidate selection/recovery layers; selection is owned by v262 and adoption by v210.

## Current canonical owners
- breeding UI / parent cards / compatibility display / archive layout: v321
- genetics / compatibility calculation / skill inheritance / annual progression: v233
- egg display and crack: v127
- hatch/result/breed count: v201
- candidate generation/count: v260
- candidate ranking/selection/recovery: v262
- training UI + remembered plans: v210
- training execution: v263
- active-generation breeding lock: v264
- next-generation lock: v230
- normal tournament: v225
- tournament selection: v290
- lineage release: v288
- shop: v309
- visible skills: v254
- rarity visuals: v249
- shiny/visual genetics: v243
- draco art: draco-art-v103
- other species art: species-art-v116

No removed script has an unresolved unique responsibility after the final owner audit.
