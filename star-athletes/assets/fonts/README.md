# STAR ATHLETES typography assets

The v0.34.02 skin replaces the previous rounded UI and Mincho heading with `Stellar Text` (modified Noto Sans JP subsets at actual 400/600/700 weights) and `Stellar Display` (modified Barlow Condensed SemiBold). Japanese body text uses 400, controls use 600, and the main heading and character names use 700. The English wordmark and selected numeric values use the condensed display face. Fonts are self-hosted; playing does not request a third-party font service. These are independently chosen licensed fonts, not fonts extracted from reference games.

The original fonts are licensed under the SIL Open Font License 1.1. Copyright and license records are retained inside the fonts, and the complete original license files are included here. The modified fonts have distinct internal family names. Original source URLs and SHA-256 hashes are recorded in `manifest.json`.

The Japanese subsets include shipped game vocabulary, Latin, kana, and a small Japanese name vocabulary. Glyphs beyond that set use platform fallback. The display subset is Latin, not Japanese. Use the Japanese role for editable names.

To reproduce the assets, download the two original TTFs and two license files identified in `scripts/build_star_athletes_fonts.py`, using its input filenames, then run:

```sh
python -m pip install fonttools brotli
python scripts/build_star_athletes_fonts.py --source-dir /path/to/font-sources
```

The variable Noto Sans JP source is instantiated at the three weights before subsetting. Four WOFF2 files are preloaded, use `font-display: swap`, and contain actual 400/600/700 weights. The release disables synthetic weight/style. Sizes are recorded in `manifest.json`; physical-device performance remains unverified. Previous Zen Maru Gothic and Shippori Mincho assets and references are retired.
