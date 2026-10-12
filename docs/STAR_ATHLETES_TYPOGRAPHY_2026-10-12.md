# STAR ATHLETES typography decision — v0.34.02

The previous v0.34.01 Mincho + rounded Gothic direction was rejected by the user as looking cheap. This revision changes the actual shipped fonts and their hierarchy, rather than treating that revision as accepted.

## Reference evidence

Visual analysis of publicly available real game screenshots, not executable reverse engineering or purchased hands-on play. Font identities in the reference games have not been verified; the observations below describe visible structure. Source screenshots are linked, not redistributed as game assets.

| Reference | Observed structure | Application to STAR ATHLETES |
| --- | --- | --- |
| [Cassette Beasts](https://store.steampowered.com/app/1321440/?l=japanese) — store screenshots 0 and 3 | English combat labels use narrow upright shapes; Japanese names and actions use plain Gothic. Names and levels occupy stable locations above health bars. | Keep Japanese controls readable; use condensed Latin for brand/numeric accents; distinguish names from secondary species data. |
| [Hades](https://store.steampowered.com/app/1145360/Hades/) — store screenshots 0, 1 and 2 | Dialogue uses a distinctive angular name heading and a separate readable body face; combat resource numbers are bold and spatially separate from decoration. | Establish explicit roles for brand, Japanese headings, body and numbers. Decoration should not set the reading order. |
| [Cult of the Lamb — artist Reid Armansin's UI/icon showcase](https://www.behance.net/gallery/151034387/Cult-of-the-Lamb-Icons) — doctrinal decision screenshot | Ritual names use serif shapes while descriptions use sans shapes. Selected card uses red outline and accents; body and title remain readable against the panel. | Consistency with the game's art and interaction matters more than using an ornamental font everywhere. Keep the existing selection border and clear title/body contrast. |

The initial six Cult of the Lamb Steam screenshots hid the UI, so those were not used as typography evidence. The linked artist showcase supplies an actual interface. Cassette Beasts includes a Japanese screenshot; Hades and the artist screenshot were inspected in English. No exact font, Japanese Hades/Cult font, sales effect, or mobile readability claim is inferred from them.

## Decision

GAME CORE: modify the existing release skin (`style-v094.css`), breeding copy owner321 and character owner369. SHARED ASSET: keep consuming existing preview/dialog behavior; do not impose this theme on other games. RETIRE: old three font files, two licenses, faces and preloads. No new runtime patch.

- Japanese UI: Noto Sans JP-derived `Stellar Text`, actual 400/600/700 weights. Body 400, controls/section labels 600, main heading and names 700.
- English wordmark and selected numeric values: Barlow Condensed SemiBold-derived `Stellar Display`, actual 600. No stretching, fake bold, or bitmap title.
- Main heading: 29px, 700, tight spacing, explicit two-line grouping; 26px at narrow widths. Copy states the breeding objective: 「次の世代を、育てよう。」.
- Character names: 20px/700 with reduced tracking. Species and disclosed detail remain secondary.
- Numeric values use tabular figures; important values gain a distinct condensed face without changing game data.
- Both sources are SIL OFL1.1, self-hosted with original attribution and complete licenses. Subset build is reproducible. Unshipped user-name glyphs use platform fallback.

## Verification and limits

`scripts/verify_star_athletes_browser.py --compare-from /path/to/v03401-source --output /tmp/star-qa` captures old and new source using the same isolated save. It waits for font loading, verifies all four faces and heading/name weight, then exercises breeding, hatching, adoption, training, tournament, reload and save recovery. Screenshots are actual Chromium gameplay, not generated concepts. The release/save/rare-inheritance guards also cover the canonical release.

See [before](quality-2026-10-12/typography-before.png) and [after](quality-2026-10-12/athletes-viewport-after.png). Browser geometry is checked at 320/390/414px. This is a reviewable visual proposal; physical Safari/device readability, performance, user preference and commercial success remain unverified. Public main/deployment is not changed by updating the draft PR.
