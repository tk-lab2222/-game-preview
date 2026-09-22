from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
shell = (ROOT / 'star-athletes-v112/index.html').read_text(encoding='utf-8')
recovery = (ROOT / 'star-athletes/patch-v326.js').read_text(encoding='utf-8')
immediate = (ROOT / 'star-athletes/patch-v336.js').read_text(encoding='utf-8')

errors = []

def require(ok, message):
    if not ok:
        errors.append(message)

# B-004: recovery must be loaded before the final immediate-save patch.
pos326 = shell.find('patch-v326.js')
pos336 = shell.find('patch-v336.js')
require(pos326 >= 0, 'release shell is missing patch-v326.js save recovery')
require(pos336 >= 0, 'release shell is missing patch-v336.js immediate persistence')
require(pos326 >= 0 and pos336 >= 0 and pos326 < pos336,
        'save recovery must load before immediate persistence')

# Recovery contract: malformed primary may recover, but an intentionally absent save must not resurrect backup.
require("if(raw===null||parse326(raw))return false" in recovery,
        'recovery must not restore backup when primary save is absent')
require("localStorage.setItem(PRIMARY326,back)" in recovery,
        'recovery must restore a valid backup into the primary key')
require("window.S=d.S" in recovery,
        'recovery must restore runtime state as well as localStorage')

# Core select changes do not necessarily render; they must persist independently.
selector = 'select[data-plan],select[data-a],select[data-s]'
require(selector in immediate,
        'training plan / entrant / strategy selects are not covered by immediate persistence')
require('pagehide' in immediate and 'save336' in immediate,
        'pagehide persistence guard is missing')
require("const SAVE336='star-athletes-save-v200'" in immediate,
        'immediate persistence must use the authoritative v200 save key')

# Keep the no-broad-observer rule explicit in the save path too.
for name, text in [('patch-v326.js', recovery), ('patch-v336.js', immediate)]:
    require('new MutationObserver' not in text,
            f'{name} must not introduce MutationObserver-based persistence')

if errors:
    print('STAR ATHLETES save contract: FAIL')
    for error in errors:
        print(f'- {error}')
    raise SystemExit(1)

print('STAR ATHLETES save contract: OK')
