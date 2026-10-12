# STAR ATHLETES typography assets

The release uses two theme roles: `Stellar Story` (a modified subset of Shippori Mincho Medium) for the story heading and wordmark, and `Stellar UI` (modified Zen Maru Gothic Regular/Medium subsets) for controls, names, and data. Fonts are self-hosted; playing the game does not request Google Fonts or a third-party font service.

The original fonts are licensed under the SIL Open Font License 1.1. Copyright and license records are retained inside the fonts, and the complete original license files are included here. The modified fonts have distinct internal family names. Original source URLs and SHA-256 hashes are recorded in `manifest.json`.

The UI subset includes the shipped game vocabulary, Latin, kana, and a small Japanese name vocabulary. Glyphs beyond that set use the platform fallback. The story subset includes the game vocabulary, Latin, and kana. Use the UI role for editable names.

To reproduce the assets, download the three original TTFs and two license files identified in `scripts/build_star_athletes_fonts.py`, then run:

```sh
python -m pip install fonttools brotli
python scripts/build_star_athletes_fonts.py --source-dir /path/to/font-sources
```

WOFF2 files are preloaded by the release shell, use `font-display: swap`, and contain actual 400/500 weights. The release skin disables synthetic weight/style. The three files total the sizes recorded in `manifest.json`; physical-device transfer and rendering performance remain unverified.
