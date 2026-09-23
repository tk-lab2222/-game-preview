from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
shell = (ROOT / 'star-athletes-v112/index.html').read_text(encoding='utf-8')
core_save = (ROOT / 'star-athletes/patch-v200.js').read_text(encoding='utf-8')
recovery = (ROOT / 'star-athletes/patch-v326.js').read_text(encoding='utf-8')
immediate = (ROOT / 'star-athletes/patch-v336.js').read_text(encoding='utf-8')
growth = (ROOT / 'star-athletes/patch-v226.js').read_text(encoding='utf-8')
pretest = (ROOT / 'star-athletes/patch-v352.js').read_text(encoding='utf-8')
reset = (ROOT / 'star-athletes/patch-v354.js').read_text(encoding='utf-8')

errors = []

def require(ok, message):
    if not ok:
        errors.append(message)

# B-004: recovery must run before the legacy/core loader so malformed primary
# state is repaired before patch-v200 can hydrate runtime S. Immediate-save stays last.
pos200 = shell.find('patch-v200.js')
pos326 = shell.find('patch-v326.js')
pos336 = shell.find('patch-v336.js')
pos352 = shell.find('patch-v352.js')
pos354 = shell.find('patch-v354.js')
require(pos200 >= 0, 'release shell is missing patch-v200.js authoritative save layer')
require(pos326 >= 0, 'release shell is missing patch-v326.js save recovery')
require(pos336 >= 0, 'release shell is missing patch-v336.js immediate persistence')
require(pos352 >= 0, 'release shell is missing patch-v352.js playtest save protection')
require(pos354 >= 0, 'release shell is missing patch-v354.js safe playtest reset')
require(pos200 >= 0 and pos326 >= 0 and pos336 >= 0 and pos326 < pos200 < pos336,
        'save recovery must load before authoritative hydration, with immediate persistence last')
require(pos352 >= 0 and pos354 >= 0 and pos352 < pos354,
        'safe reset must load after playtest snapshot/restore controls')

# Authoritative save contract: persist and restore the complete runtime S object.
require("const SAVE200='star-athletes-save-v200'" in core_save,
        'authoritative save layer must use the v200 save key')
require('JSON.stringify({savedAt:Date.now(),S})' in core_save,
        'authoritative save must serialize the complete runtime S object')
require('S=d.S;init200();return true' in core_save,
        'authoritative load must restore the complete runtime S object')
require('render=function(){const out=renderBefore200();decorate200();save200();return out}' in core_save,
        'core render path must continue to persist runtime state')

# Recovery contract: malformed primary may recover, but an intentionally absent save must not resurrect backup.
require("if(raw===null||parse326(raw))return false" in recovery,
        'recovery must not restore backup when primary save is absent')
require("localStorage.setItem(PRIMARY326,back)" in recovery,
        'recovery must restore a valid backup into the primary key')
require("window.S=d.S" in recovery,
        'recovery must restore runtime state as well as localStorage')
require("typeof d.S==='object'&&!Array.isArray(d.S)" in recovery,
        'recovery must reject array-shaped state instead of treating it as a valid save object')

# Growth migration must initialize every legacy ID-less athlete.
require('if(m.id!=null&&seen.has(m.id))return;' in growth,
        'growth migration must deduplicate only athletes that actually have an id')
require('if(m.id!=null)seen.add(m.id);' in growth,
        'growth migration must not add undefined ID-less athletes to the dedupe Set')
require('meta226(m);' in growth,
        'growth migration must initialize inheritance metadata after ID-aware dedupe')

# Core select changes do not necessarily render; they must persist independently.
selector = 'select[data-plan],select[data-a],select[data-s]'
require(selector in immediate,
        'training plan / entrant / strategy selects are not covered by immediate persistence')
require('pagehide' in immediate and 'save336' in immediate,
        'pagehide persistence guard is missing')
require("const SAVE336='star-athletes-save-v200'" in immediate,
        'immediate persistence must use the authoritative v200 save key')

# v0.32.34 playtest protection must snapshot the exact authoritative save and restore it exactly.
require("const SAVE='star-athletes-save-v200',SNAP='star-athletes-save-v200-prebalance-03234'" in pretest,
        'playtest protection must snapshot the authoritative v200 save key')
require("const raw=localStorage.getItem(SAVE);if(!valid352(raw))return false;" in pretest,
        'playtest protection must reject a missing or malformed primary save')
require("localStorage.setItem(SNAP,raw)" in pretest,
        'playtest protection must preserve the complete raw authoritative save')
require("localStorage.setItem(SAVE,raw);window.S=d.S;location.reload();return true" in pretest,
        'playtest restore must replace both persistent and runtime state before reload')
require('JSON.stringify({savedAt:Date.now(),S})' in pretest,
        'v0.32.34 save helper must continue serializing the complete runtime S object')

# v0.32.37 reset must really start from G1 without destroying the explicit protected snapshot.
require("const PRIMARY='star-athletes-save-v200',BACKUP='star-athletes-save-v200-backup',SNAP='star-athletes-save-v200-prebalance-03234'" in reset,
        'safe reset must use the authoritative primary/backup keys and protected snapshot key')
require('localStorage.removeItem(PRIMARY);localStorage.removeItem(BACKUP);' in reset,
        'safe reset must remove both live primary and automatic backup to prevent roster resurrection')
require("k!==SNAP" in reset,
        'safe reset must preserve the explicit pre-balance protected snapshot')
require('sessionStorage.clear();' in reset,
        'safe reset must clear transient session state')
require("u.searchParams.set('reset354','1')" in reset and 'location.replace(u.toString())' in reset,
        'safe reset must reload through a fresh reset URL after storage cleanup')

# "Load latest" may build a cache-busting URL dynamically.
shell_cache = re.search(r'patch-v336\.js\?v=(\d+)', shell)
replace_call = re.search(r'location\.replace\(([^\n;]+)\)', immediate)
require(shell_cache is not None, 'release shell cache generation for patch-v336.js is missing')
require(replace_call is not None, 'latest reload handler is missing')
if replace_call:
    expr = replace_call.group(1)
    require('star-athletes-v112/' in expr,
            'latest reload must target the current STAR ATHLETES release path')
    pinned = re.search(r'[?&]v=(\d+)', expr)
    if pinned and shell_cache:
        require(pinned.group(1) == shell_cache.group(1),
                f'latest reload cache generation {pinned.group(1)} does not match release {shell_cache.group(1)}')

# Keep the no-broad-observer rule explicit in the save/reset path too.
for name, text in [('patch-v200.js', core_save), ('patch-v326.js', recovery), ('patch-v336.js', immediate), ('patch-v352.js', pretest), ('patch-v354.js', reset)]:
    require('new MutationObserver' not in text,
            f'{name} must not introduce MutationObserver-based persistence')

if errors:
    print('STAR ATHLETES save contract: FAIL')
    for error in errors:
        print(f'- {error}')
    raise SystemExit(1)

print('STAR ATHLETES save contract: OK')
