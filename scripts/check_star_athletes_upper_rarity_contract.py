from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SHELL = ROOT / 'star-athletes-v112' / 'index.html'
PATCH_DIR = ROOT / 'star-athletes'


def fail(msg: str) -> None:
    raise SystemExit(f'FAIL: {msg}')


shell = SHELL.read_text(encoding='utf-8')
required = [f'patch-v{n}.js' for n in range(342, 352)]
pos = []
for name in required:
    i = shell.find(name)
    if i < 0:
        fail(f'{name} is not connected to the release shell')
    pos.append(i)
if pos != sorted(pos):
    fail('upper-rarity patches must load in dependency order v342 -> v351')

for name in required:
    text = (PATCH_DIR / name).read_text(encoding='utf-8')
    if 'MutationObserver' in text:
        fail(f'{name} must not introduce MutationObserver')

for n in (342, 343, 344, 345, 346, 347):
    text = (PATCH_DIR / f'patch-v{n}.js').read_text(encoding='utf-8')
    if 'star-athletes-save-v200' not in text:
        fail(f'patch-v{n}.js must persist through the canonical v200 save key')

p344 = (PATCH_DIR / 'patch-v344.js').read_text(encoding='utf-8')
p347 = (PATCH_DIR / 'patch-v347.js').read_text(encoding='utf-8')
p350 = (PATCH_DIR / 'patch-v350.js').read_text(encoding='utf-8')
for token in ('const prevBaby347=baby', 'baby=function(a,b){return ensure347(prevBaby347(a,b))}', 'rareSkillRolled347=true'):
    if token not in p347:
        fail(f'patch-v347 rare-skill birth contract missing: {token}')
if p347.count('m.skills233.length<6') < 2:
    fail('patch-v347 must preserve the six-skill cap for both upper-rarity skill routes')

# Resonance direct-stat application is a one-time migration. The applied marker must be
# checked before any stat mutation, set after mutation, and immediately persisted by sync344.
direct_start = p344.find('function directStats344')
direct_guard = p344.find('if(!m||m.starResonanceStatApplied344)return false;', direct_start)
first_stat_write = p344.find('m.stats[k]=', direct_start)
res_marker_set = p344.find('m.starResonanceStatApplied344=', direct_start)
sync_start = p344.find('function sync344')
res_save = p344.find('if(changed)persist344();', sync_start)
if min(direct_start, direct_guard, first_stat_write, res_marker_set, sync_start, res_save) < 0:
    fail('patch-v344 resonance reload-idempotence contract is incomplete')
if not (direct_start < direct_guard < first_stat_write < res_marker_set):
    fail('patch-v344 must guard starResonanceStatApplied344 before direct stat mutation')
if "JSON.stringify({savedAt:Date.now(),S})" not in p344:
    fail('patch-v344 must persist resonance markers through the full canonical state')
if not (sync_start < res_save):
    fail('patch-v344 sync must immediately save one-time resonance stat markers')

# LIMIT RELEASE can raise the live cap above 999. Resonance must use that dynamic cap for
# both visible stats and geneticBase. It must also never lower an already-over-cap legacy
# value when the restored LIMIT RELEASE state temporarily reports a smaller cap.
if 'Math.max(999,Number(window.STAR_LIMIT278?.cap?.())||999)' not in p344:
    fail('patch-v344 LIMIT RELEASE compatibility missing: dynamic cap resolver')
for token, label in (
    ('const safeCap=Math.max(cap344(),cur);', 'visible stats'),
    ('m.stats[k]=Math.min(safeCap,Math.max(cur+1,Math.round(cur*(1+pct))));', 'visible stats write'),
    ('const safeCap=Math.max(cap344(),v);', 'geneticBase'),
    ('m.geneticBase226[k]=Math.min(safeCap,Math.max(v+1,Math.round(v*(1+pct))));', 'geneticBase write'),
):
    if token not in p344:
        fail(f'patch-v344 must preserve existing over-cap {label} during resonance migration')

# The rolled marker is the reload-idempotence boundary: it must be checked before any
# RNG and saved inside the canonical full-state payload after migration.
ensure_start = p347.find('function ensure347')
marker_guard = p347.find('if(m.rareSkillRolled347)return m;', ensure_start)
first_rng = p347.find('Math.random()', ensure_start)
marker_set = p347.find('m.rareSkillRolled347=true;', ensure_start)
if min(ensure_start, marker_guard, first_rng, marker_set) < 0:
    fail('patch-v347 reload-idempotence contract is incomplete')
if not (ensure_start < marker_guard < first_rng < marker_set):
    fail('patch-v347 must guard rareSkillRolled347 before any upper-rarity RNG')
if "JSON.stringify({savedAt:Date.now(),S})" not in p347:
    fail('patch-v347 must persist the rolled marker through the full canonical state')
if 'if(changed)save347();' not in p347:
    fail('patch-v347 migration must save immediately after assigning one-time roll markers')

for pool in ('starters', 'nest', 'lineage', 'released', 'cands', 'foster'):
    if f"'{pool}'" not in p347:
        fail(f'patch-v347 migration must cover {pool}')
if 'S?.egg' not in p347:
    fail('patch-v347 migration must cover the current egg')
if 'seen=new Set()' not in p347:
    fail('patch-v347 migration must deduplicate athletes before one-time rolls')

idless_contract = 'm.id==null||!seen.has(m.id)'
for name, text in (('patch-v344.js', p344), ('patch-v347.js', p347)):
    if idless_contract not in text or 'if(m.id!=null)seen.add(m.id)' not in text:
        fail(f'{name} must process every ID-less athlete while deduplicating normal IDs')

# God-Star hatch playback must not collapse multiple ID-less newborns into one undefined
# Set key. v350 uses a deterministic fallback key built from athlete data + candidate index,
# while normal athletes remain deduplicated by their stable id.
for token in (
    "if(m?.id)return 'id:'+m.id;",
    "return 'anon:'+[m?.name||'',m?.species||'',m?.gen||m?.generation||'',m?.bornAt||m?.createdAt||'',st,i].join('|');",
    'grade350(m)>=5&&!played.has(key350(m,i))',
    'played.add(key350(x,i))',
):
    if token not in p350:
        fail(f'patch-v350 ID-less God-Star hatch dedupe contract missing: {token}')

print('OK: STAR ATHLETES upper-rarity inheritance/save contract is intact through v351')
