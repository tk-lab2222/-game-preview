from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SHELL = ROOT / 'star-athletes-v112' / 'index.html'
PATCH_DIR = ROOT / 'star-athletes'


def fail(msg: str) -> None:
    raise SystemExit(f'FAIL: {msg}')


shell = SHELL.read_text(encoding='utf-8')
required = [f'patch-v{n}.js' for n in range(342, 348)]
pos = []
for name in required:
    i = shell.find(name)
    if i < 0:
        fail(f'{name} is not connected to the release shell')
    pos.append(i)
if pos != sorted(pos):
    fail('upper-rarity patches must load in dependency order v342 -> v347')

for name in required:
    text = (PATCH_DIR / name).read_text(encoding='utf-8')
    if 'MutationObserver' in text:
        fail(f'{name} must not introduce MutationObserver')

# These systems mutate monster state and therefore must keep using the canonical full-state save.
for n in (342, 343, 344, 345, 346, 347):
    text = (PATCH_DIR / f'patch-v{n}.js').read_text(encoding='utf-8')
    if 'star-athletes-save-v200' not in text:
        fail(f'patch-v{n}.js must persist through the canonical v200 save key')

p344 = (PATCH_DIR / 'patch-v344.js').read_text(encoding='utf-8')
p347 = (PATCH_DIR / 'patch-v347.js').read_text(encoding='utf-8')
for token in ('const prevBaby347=baby', 'baby=function(a,b){return ensure347(prevBaby347(a,b))}', 'rareSkillRolled347=true'):
    if token not in p347:
        fail(f'patch-v347 rare-skill birth contract missing: {token}')
if p347.count('m.skills233.length<6') < 2:
    fail('patch-v347 must preserve the six-skill cap for both upper-rarity skill routes')

# Migration must cover every athlete pool used by the resonance system. Otherwise an
# eligible archived/released/foster athlete can skip the one-time roll after reload.
for pool in ('starters', 'nest', 'lineage', 'released', 'cands', 'foster'):
    if f"'{pool}'" not in p347:
        fail(f'patch-v347 migration must cover {pool}')
if 'S?.egg' not in p347:
    fail('patch-v347 migration must cover the current egg')
if 'seen=new Set()' not in p347:
    fail('patch-v347 migration must deduplicate athletes before one-time rolls')

# Legacy/imported athletes can exist without an id. They must not collapse into the
# same Set(undefined) entry, or only the first such athlete receives resonance/skill migration.
idless_contract = 'm.id==null||!seen.has(m.id)'
for name, text in (('patch-v344.js', p344), ('patch-v347.js', p347)):
    if idless_contract not in text or 'if(m.id!=null)seen.add(m.id)' not in text:
        fail(f'{name} must process every ID-less athlete while deduplicating normal IDs')

print('OK: STAR ATHLETES upper-rarity inheritance/save contract is intact')
