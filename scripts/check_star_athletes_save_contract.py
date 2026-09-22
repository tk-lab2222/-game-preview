from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
shell = (ROOT / 'star-athletes-v112/index.html').read_text(encoding='utf-8')
core_save = (ROOT / 'star-athletes/patch-v200.js').read_text(encoding='utf-8')
recovery = (ROOT / 'star-athletes/patch-v326.js').read_text(encoding='utf-8')
immediate = (ROOT / 'star-athletes/patch-v336.js').read_text(encoding='utf-8')

errors = []

def require(ok, message):
    if not ok:
        errors.append(message)

# B-004: recovery must be loaded before the final immediate-save patch.
pos200 = shell.find('patch-v200.js')
pos326 = shell.find('patch-v326.js')
pos336 = shell.find('patch-v336.js')
require(pos200 >= 0, 'release shell is missing patch-v200.js authoritative save layer')
require(pos326 >= 0, 'release shell is missing patch-v326.js save recovery')
require(pos336 >= 0, 'release shell is missing patch-v336.js immediate persistence')
require(pos200 >= 0 and pos326 >= 0 and pos336 >= 0 and pos200 < pos326 < pos336,
        'authoritative save, recovery, and immediate persistence must load in that order')

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

# Core select changes do not necessarily render; they must persist independently.
selector = 'select[data-plan],select[data-a],select[data-s]'
require(selector in immediate,
        'training plan / entrant / strategy selects are not covered by immediate persistence')
require('pagehide' in immediate and 'save336' in immediate,
        'pagehide persistence guard is missing')
require("const SAVE336='star-athletes-save-v200'" in immediate,
        'immediate persistence must use the authoritative v200 save key')

# "Load latest" must not point at an older cache generation than the release shell.
shell_cache = re.search(r'patch-v336\.js\?v=(\d+)', shell)
reload_cache = re.search(r"star-athletes-v112/\?v=(\d+)-", immediate)
require(shell_cache is not None, 'release shell cache generation for patch-v336.js is missing')
require(reload_cache is not None, 'latest reload target cache generation is missing')
if shell_cache and reload_cache:
    require(shell_cache.group(1) == reload_cache.group(1),
            f'latest reload cache generation {reload_cache.group(1)} does not match release {shell_cache.group(1)}')

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
