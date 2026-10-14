#!/usr/bin/env python3
"""Static release guard for STAR ATHLETES.
Checks the public shell without changing game state.
"""
from pathlib import Path
import re
import sys
import json
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
SHELL = ROOT / "star-athletes-v112" / "index.html"
GAME = ROOT / "star-athletes"

errors = []
text = SHELL.read_text(encoding="utf-8")
refs = re.findall(r'(?:src|href)="\.\./star-athletes/([^"?]+)(?:\?v=([^"&]+))?', text)
# Public release shells must not embed individual saved-athlete recovery payloads.
if re.search(r'\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b', text, re.I):
    errors.append("release shell embeds a saved-athlete identifier")
if re.search(r'g24ProgressRepair3301|traceDiag3289|runRecovery3281', text):
    errors.append("one-off personal recovery code is still loaded")
if 'id="reloadBtn" data-game-refresh' not in text:
    errors.append("latest refresh must consume GamePreviewStandard")
if not refs:
    errors.append("release shell has no STAR ATHLETES assets")

keys = {v for _, v in refs if v}
if len(keys) != 1:
    errors.append(f"mixed cache keys: {sorted(keys)}")

for rel, _ in refs:
    if not (GAME / rel).is_file():
        errors.append(f"missing asset: star-athletes/{rel}")

# Follow the shipped skin's local URLs as well as the shell's script/link URLs.
# Scene art and font files must ship with the CSS that consumes them.
css_assets = set()
for rel, _ in refs:
    css = GAME / rel
    if not css.is_file() or css.suffix != '.css':
        continue
    for url in re.findall(r'url\(\s*[\"\']?([^\"\')\s]+)', css.read_text(encoding='utf-8')):
        if url.startswith(('data:', 'http:', 'https:')):
            continue
        asset = (css.parent / url.split('?', 1)[0]).resolve()
        css_assets.add(asset)
        if not asset.is_relative_to(ROOT) or not asset.is_file():
            errors.append(f"missing local CSS asset: {url}")

creature_manifest = GAME / 'assets/creatures/manifest.json'
if creature_manifest.is_file():
    appearance = json.loads(creature_manifest.read_text(encoding='utf-8')).get('appearanceStages', {})
    for atlas in appearance.get('atlases', []):
        image = (creature_manifest.parent / atlas['file']).resolve()
        if not image.is_relative_to(ROOT) or not image.is_file():
            errors.append(f"missing appearance atlas: {atlas['file']}")

# Guard only the JavaScript actually loaded by the public release shell.
# Historical/unreferenced patch files intentionally remain in the repository and
# must not make a current release fail merely because they contain an old pattern.
loaded_js = sorted({rel for rel, _ in refs if rel.endswith(".js")})
syntax_sources = {}
for src in re.findall(r'<script[^>]+src="([^"?]+)', text):
    path = (SHELL.parent / src).resolve()
    if path.is_file():
        syntax_sources[str(path.relative_to(ROOT))] = path.read_text(encoding='utf-8')
for index, inline in enumerate(re.findall(r'<script(?:\s[^>]*)?>([\s\S]*?)</script>', text)):
    if inline.strip():
        syntax_sources[f'release-inline-{index}'] = inline
node = shutil.which('node')
if not node:
    errors.append('Node.js is required to check the shipped JavaScript syntax')
else:
    syntax = subprocess.run([node, '-e', "const fs=require('fs'),vm=require('vm');let failed=false;for(const [name,code] of Object.entries(JSON.parse(fs.readFileSync(0,'utf8')))){try{new vm.Script(code,{filename:name})}catch(e){failed=true;console.error(name+': '+e.message)}}process.exitCode=failed?1:0"], input=json.dumps(syntax_sources), text=True, capture_output=True, timeout=30)
    if syntax.returncode:
        errors.extend(syntax.stderr.strip().splitlines())
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
    f"({len(refs)} shell assets, {len(css_assets)} CSS assets, {len(loaded_js)} loaded JS, cache key {next(iter(keys), 'none')})"
)
