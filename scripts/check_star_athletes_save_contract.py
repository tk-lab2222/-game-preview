from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
shell = (ROOT / 'star-athletes-v112/index.html').read_text(encoding='utf-8')
core_save = (ROOT / 'star-athletes/patch-v200.js').read_text(encoding='utf-8')
recovery = (ROOT / 'star-athletes/patch-v326.js').read_text(encoding='utf-8')
immediate = (ROOT / 'star-athletes/patch-v336.js').read_text(encoding='utf-8')
growth = (ROOT / 'star-athletes/patch-v226.js').read_text(encoding='utf-8')

errors = []

def require(ok, message):
    if not ok:
        errors.append(message)

# B-004: recovery must run before the legacy/core loader so malformed primary
# state is repaired before patch-v200 can hydrate runtime S. Immediate-save stays last.
pos200 = shell.find('patch-v200.js')
pos326 = shell.find('patch-v326.js')
pos336 = shell.find('patch-v336.js')
require(pos200 >= 0, 'release shell is missing patch-v200.js authoritative save layer')
require(pos326 >= 0, 'release shell is missing patch-v326.js save recovery')
require(pos336 >= 0, 'release shell is missing patch-v336.js immediate persistence')
require(pos200 >= 0 and pos326 >= 0 and pos336 >= 0 and pos326 < pos200 < pos336,
        'save recovery must load before authoritative hydration, with immediate persistence last')

# Authoritative save contract: persist and restore the complete runtime S object.
# This intentionally protects nest/lineage/stats/skills/hidden traits/season/league/
# next-generation flags together instead of maintaining a fragile field allow-list.
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

# Growth migration must initialize every legacy ID-less athlete. Using undefined as a
# Set key would silently skip the second and later ID-less athlete, leaving inheritance
# metadata absent and making progression depend on roster order.
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

# "Load latest" may build a cache-busting URL dynamically (for example ?t=Date.now()).
# Guard the actual destination path, and only enforce cache-generation equality when
# the handler explicitly pins a numeric ?v= generation.
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

# Keep the no-broad-observer rule explicit in the save path too.
for name, text in [('patch-v200.js', core_save), ('patch-v326.js', recovery), ('patch-v336.js', immediate)]:
    require('new MutationObserver' not in text,
            f'{name} must not introduce MutationObserver-based persistence')

if errors:
    print('STAR ATHLETES save contract: FAIL')
    for error in errors:
        print(f'- {error}')
    raise SystemExit(1)

print('STAR ATHLETES save contract: OK')
