#!/usr/bin/env python3
"""Static release guard for STAR ATHLETES.
Checks the public shell without changing game state.
"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SHELL = ROOT / "star-athletes-v112" / "index.html"
GAME = ROOT / "star-athletes"

errors = []
text = SHELL.read_text(encoding="utf-8")
refs = re.findall(r'(?:src|href)="\.\./star-athletes/([^"?]+)(?:\?v=([^"&]+))?', text)
if not refs:
    errors.append("release shell has no STAR ATHLETES assets")

keys = {v for _, v in refs if v}
if len(keys) != 1:
    errors.append(f"mixed cache keys: {sorted(keys)}")

for rel, _ in refs:
    if not (GAME / rel).is_file():
        errors.append(f"missing asset: star-athletes/{rel}")

# Guard only the JavaScript actually loaded by the public release shell.
# Historical/unreferenced patch files intentionally remain in the repository and
# must not make a current release fail merely because they contain an old pattern.
loaded_js = sorted({rel for rel, _ in refs if rel.endswith(".js")})
for rel in loaded_js:
    js = GAME / rel
    if not js.is_file():
        continue
    src = js.read_text(encoding="utf-8", errors="replace")
    if re.search(r'new\s+MutationObserver[\s\S]{0,1200}observe\s*\(\s*document\.(?:body|documentElement)', src):
        errors.append(f"broad MutationObserver in loaded asset: {rel}")

# Critical B-004 recovery layer must stay connected to the release shell.
if "patch-v326.js" not in text:
    errors.append("save recovery guard patch-v326.js is not loaded")

# v0.32.42 made ability rank a single explicit chip and removed legacy
# C/U/R/SR/SSR/UR/EX badges beside athlete names. Keep the cleanup connected so
# old renderers cannot silently reintroduce duplicate/misleading rank labels.
if "patch-v359.js" not in text:
    errors.append("v0.32.42 name-rank cleanup patch-v359.js is not loaded")
else:
    cleanup = (GAME / "patch-v359.js")
    if cleanup.is_file():
        cleanup_src = cleanup.read_text(encoding="utf-8", errors="replace")
        if "abilityRank340" not in cleanup_src or "athleteGrade340" not in cleanup_src:
            errors.append("patch-v359.js no longer preserves explicit ability-rank chips")
        if not re.search(r'\^\(C\|U\|R\|SR\|SSR\|UR\|EX\)\$', cleanup_src):
            errors.append("patch-v359.js no longer targets the legacy rank badge set")

if errors:
    print("STAR ATHLETES release guard: FAIL")
    for e in errors:
        print(f"- {e}")
    sys.exit(1)

print(
    "STAR ATHLETES release guard: OK "
    f"({len(refs)} assets, {len(loaded_js)} loaded JS, cache key {next(iter(keys), 'none')})"
)
