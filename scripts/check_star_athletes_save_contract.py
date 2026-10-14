from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
shell = (ROOT / 'star-athletes-v112/index.html').read_text(encoding='utf-8')
core_save = (ROOT / 'star-athletes/patch-v200.js').read_text(encoding='utf-8')
recovery = (ROOT / 'star-athletes/patch-v326.js').read_text(encoding='utf-8')
shared = (ROOT / '_shared/game-preview-standard.js').read_text(encoding='utf-8')
immediate = (ROOT / 'star-athletes/patch-v336.js').read_text(encoding='utf-8')
growth = (ROOT / 'star-athletes/patch-v226.js').read_text(encoding='utf-8')
pretest = (ROOT / 'star-athletes/patch-v352.js').read_text(encoding='utf-8')
reset = (ROOT / 'star-athletes/patch-v354.js').read_text(encoding='utf-8')
early_reset = (ROOT / 'star-athletes/patch-v356.js').read_text(encoding='utf-8')

errors = []

def require(ok, message):
    if not ok:
        errors.append(message)

# B-004: recovery and the early reset handshake must run before the legacy/core
# loader so malformed state is repaired, or an intentional reset is completed,
# before patch-v200 can hydrate runtime S. Immediate-save stays last.
pos200 = shell.find('patch-v200.js')
pos326 = shell.find('patch-v326.js')
pos336 = shell.find('patch-v336.js')
pos352 = shell.find('patch-v352.js')
pos354 = shell.find('patch-v354.js')
pos356 = shell.find('patch-v356.js')
require(pos200 >= 0, 'release shell is missing patch-v200.js authoritative save layer')
require(pos326 >= 0, 'release shell is missing patch-v326.js save recovery')
require(pos336 >= 0, 'release shell is missing patch-v336.js immediate persistence')
require(pos352 >= 0, 'release shell is missing patch-v352.js playtest save protection')
require(pos354 >= 0, 'release shell is missing patch-v354.js safe playtest reset')
require(pos356 >= 0, 'release shell is missing patch-v356.js early reset handshake')
require(pos200 >= 0 and pos326 >= 0 and pos356 >= 0 and pos336 >= 0 and pos326 < pos356 < pos200 < pos336,
        'save recovery and early reset must load before authoritative hydration, with immediate persistence last')
require(pos352 >= 0 and pos354 >= 0 and pos352 < pos354,
        'safe reset must load after playtest snapshot/restore controls')

# Authoritative save contract: persist and restore the complete runtime S object.
require("const SAVE200='star-athletes-save-v200'" in core_save,
        'authoritative save layer must use the v200 save key')
require('JSON.stringify({savedAt:Date.now(),source,S})' in core_save,
        'authoritative save must serialize the complete runtime S object')
require('Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,saved);init200();return true;' in core_save
        and 'applySave200(chosen.S);' in core_save,
        'authoritative load must restore the complete state while preserving the canonical S reference')
require('render=function(){const out=renderBefore200();decorate200();save200();return out}' in core_save,
        'core render path must continue to persist runtime state')

# Recovery contract: malformed primary may recover, but an intentionally absent save must not resurrect backup.
require("if(raw===null||parse326(raw))return false" in recovery,
        'recovery must not restore backup when primary save is absent')
require("localStorage.setItem(PRIMARY326,back)" in recovery,
        'recovery must restore a valid backup into the primary key')
require('Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,d.S);' in recovery
        and 'window.S=d.S' not in recovery,
        'recovery must restore runtime state without replacing the shared S reference')
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
require("window.STAR_SAVE_CORE?.save?.('core-controls336')" in immediate and 'localStorage.setItem' not in immediate,
        'immediate persistence must delegate to the authoritative core save instead of writing a parallel payload')

# v0.32.34 playtest protection must snapshot the exact authoritative save and restore it exactly.
require("const SAVE='star-athletes-save-v200',SNAP='star-athletes-save-v200-prebalance-03234'" in pretest,
        'playtest protection must snapshot the authoritative v200 save key')
require("const raw=localStorage.getItem(SAVE);if(!valid352(raw))return false;" in pretest,
        'playtest protection must reject a missing or malformed primary save')
require("localStorage.setItem(SNAP,raw)" in pretest,
        'playtest protection must preserve the complete raw authoritative save')
require('Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,d.S);save352();render();return true;' in pretest
        and "if(!confirm('" in pretest,
        'playtest restore must confirm and restore complete canonical runtime and persisted state in place')
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

# v0.32.39: reset completion must execute before patch-v200 can restore stale roster data.
require("const FLAG='star-athletes-reset-pending-v356',KEEP='star-athletes-save-v200-prebalance-03234'" in early_reset,
        'early reset must use a dedicated pending flag while preserving the protected snapshot')
require("k.startsWith('star-athletes-')&&k!==KEEP&&k!==FLAG" in early_reset,
        'early reset must clear STAR ATHLETES persisted state except the protected snapshot and handshake flag')
require('sessionStorage.clear();' in early_reset,
        'early reset must clear transient session state before authoritative hydration')
require("localStorage.getItem(FLAG)==='1'" in early_reset
        and "searchParams.has('fresh356')" not in early_reset,
        'early reset must require its pending handshake; a URL alone must not erase a save')
require('clear356();localStorage.removeItem(FLAG);' in early_reset,
        'early reset must clear persisted state before consuming its pending flag')
require('window.__STAR_FRESH_RESET356=true;' in early_reset,
        'early reset must expose completion without replacing the genuine empty base runtime state')
require('window.S={}' not in early_reset and 'S={}' not in early_reset,
        'early reset must not replace the base runtime state with an incomplete empty object')

# Shared refresh must bind after its button exists, before game JS can fail.
shell_cache = re.search(r'patch-v336\.js\?v=(\d+)', shell)
install = re.search(r"GamePreviewStandard.install\(\{version:'(\d+)'", shell)
button_pos = shell.find('id="reloadBtn" data-game-refresh')
install_pos = shell.find('GamePreviewStandard.install')
app_pos = shell.find('app-v094.js')
require(shell_cache is not None and install is not None and shell_cache.group(1) == install.group(1),
        'shared refresh generation must match release assets')
require(0 <= button_pos < install_pos < app_pos,
        'shared refresh must install after button creation and before game runtime')
require("document.querySelectorAll('[data-game-refresh]')" in shared
        and 'new URL(location.href)' in shared
        and "u.searchParams.set('v',version||Date.now())" in shared
        and "u.searchParams.set('_',Date.now())" in shared
        and 'location.replace(u.toString())' in shared,
        'shared refresh must retain the canonical URL and bust its asset/cache generation')
for path in ('app-v094.js','patch-v097.js','patch-v318.js','patch-v336.js'):
    require('reloadBtn' not in (ROOT / 'star-athletes' / path).read_text(encoding='utf-8'),
            f'{path} must not restore a competing reload handler')

# Keep the no-broad-observer rule explicit in the save/reset path too.
for name, text in [('patch-v200.js', core_save), ('patch-v326.js', recovery), ('patch-v336.js', immediate), ('patch-v352.js', pretest), ('patch-v354.js', reset), ('patch-v356.js', early_reset)]:
    require('new MutationObserver' not in text,
            f'{name} must not introduce MutationObserver-based persistence')

if errors:
    print('STAR ATHLETES save contract: FAIL')
    for error in errors:
        print(f'- {error}')
    raise SystemExit(1)

print('STAR ATHLETES save contract: OK')
