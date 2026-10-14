"""Actual births and three training rounds: readonly earned-star view and prior-source parity.
The legacy journal boundary is an explicit fixture. Chromium only.
"""
import argparse,json,mimetypes,shutil
from pathlib import Path
from urllib.parse import urlparse,unquote
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
ap=argparse.ArgumentParser();ap.add_argument('--output',type=Path,default=Path('/tmp/star-constellation'));ap.add_argument('--compare-from',type=Path);args=ap.parse_args();OUT=args.output;OUT.mkdir(parents=True,exist_ok=True)
errors=[];missing=[]
def serve(previous=None):
 def route(r):
  u=urlparse(r.request.url);f=(ROOT/unquote(u.path).lstrip('/')).resolve()
  if u.hostname!='games.local' or not f.is_relative_to(ROOT):r.abort();return
  if f.is_dir():f=f/'index.html'
  if previous and (previous/f.relative_to(ROOT)).is_file():f=previous/f.relative_to(ROOT)
  if not f.is_file():r.fulfill(status=404,body='missing');return
  r.fulfill(status=200,body=f.read_bytes(),content_type=mimetypes.guess_type(f.name)[0] or 'text/plain')
 return route
def context(b,save=None,previous=None):
 c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce',service_workers='block');c.route('**/*',serve(previous))
 c.add_init_script('let qa=84111;Math.random=()=>{qa=(Math.imul(qa,1664525)+1013904223)>>>0;return qa/4294967296}')
 if save:c.add_init_script('for(const [k,v] of Object.entries('+json.dumps(save)+'))if(!localStorage.getItem(k))localStorage.setItem(k,v)')
 p=c.new_page();p.set_default_timeout(15000);p.on('pageerror',lambda e:errors.append(str(e)));p.on('response',lambda r:missing.append(r.url) if r.status>=400 else None);p.goto('https://games.local/star-athletes/');p.wait_for_timeout(1100);return c,p
def settle(p):p.wait_for_timeout(550)
def events(p):
 if p.locator('[data-event267="b"]').count():p.locator('[data-event267="b"]').click();settle(p)
def outcomes(p):return p.evaluate('({athletes:S.nest,coins:S.coins,fame:S.fame,turn:S.turn,round:S.training263.lastRound263})')
def train_view(p):p.locator('.tabs [data-v="train"]').click();settle(p)
def check_map(p,sel,athlete):
 if not p.locator(sel).evaluate('(el)=>el.open'):p.locator(sel+'>summary').click()
 for mode in ('earned','current'):
  p.locator(sel+' [data-star-mode226="'+mode+'"]').click()
  for key in ('power','speed','stamina','agility','tech','guts'):
   p.locator(sel+' [data-star-key226="'+key+'"]').click()
   expected=athlete['stats'][key] if mode=='current' else athlete.get('trainingGain226',{}).get(key,0)+athlete.get('matchGain226',{}).get(key,0)
   expected=str(expected) if mode=='current' or expected<0 else '+'+str(expected)
   assert p.locator(sel+' .starReadout226 strong').inner_text()==expected
   assert p.locator(sel+' [data-star-key226="'+key+'"]').get_attribute('aria-pressed')=='true'
  assert not any(x in p.locator(sel+' .starSky226 svg').get_attribute('aria-label') for x in ('NaN','Infinity','undefined'))
def capture(p,name):
 p.locator('#plans>.train210:visible .starMap226').screenshot(path=str(OUT/(name+'.png')))
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path=shutil.which('chromium'),args=['--no-sandbox','--disable-dev-shm-usage']);c,p=context(b)
 for i in range(3):
  for n in (0,1):p.locator('#breeders>.card').nth(n).tap(position={'x':12,'y':12})
  p.locator('#breedBtn').click();p.locator('#hatch').click();p.wait_for_function('S.cands.length>='+str(i+1));settle(p)
  for sel in ('[data-close277]','[data-close350]','#abilityResult352 button','[data-close278]'):
   if p.locator(sel).count():p.locator(sel).first.click()
 for i in range(3):p.locator('#cands>.card').nth(i).locator('.stage369').tap()
 p.locator('#adopt').click();settle(p);train_view(p)
 ids=p.evaluate('S.nest.map(m=>m.id)')
 for ident,plan in zip(ids,('speed','power','tech')):
  p.locator('[data-focus210="'+ident+'"]').click();p.locator('[data-p210="'+plan+'"][data-m210="'+ident+'"]').click();settle(p)
 p.locator('[data-focus210="'+ids[0]+'"]').click();settle(p);capture(p,'star-before')
 initial=p.evaluate('Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)]))')
 before=p.evaluate('JSON.stringify(S)');old_shape=p.locator('.train210:visible .starSky226 .starShape226').get_attribute('points')
 for athlete in p.evaluate('S.nest'):
  p.locator('[data-focus210="'+athlete['id']+'"]').click();check_map(p,'.train210:visible .starMap226',athlete)
 assert p.evaluate('JSON.stringify(S)')==before,'Star browsing changed canonical state'
 p.locator('[data-focus210="'+ids[0]+'"]').click();p.locator('.train210:visible [data-star-mode226="earned"]').click()
 p.evaluate('Math.random=()=>.5');p.locator('#doTrain263').click();settle(p);events(p)
 assert p.locator('.train210:visible .starSky226 .starShape226').get_attribute('points')!=old_shape
 for m in p.evaluate('S.nest'):assert sum(m['trainingGain226'].values())>0
 p.locator('.train210:visible [data-my-star323]').click();settle(p)
 frozen=p.evaluate('S.myStars323[0].athlete');p.evaluate('STAR_PRETEST352.protect(true)');protected=p.evaluate('S.nest')
 for _ in range(2):p.locator('#doTrain263').click();settle(p);events(p)
 final=outcomes(p);signatures=[]
 for ident,plan in zip(ids,('speed','power','tech')):
  p.locator('[data-focus210="'+ident+'"]').click();p.locator('.train210:visible [data-star-mode226="earned"]').click();p.locator('.train210:visible [data-star-key226="'+plan+'"]').click();capture(p,'star-'+plan)
  signatures.append(p.locator('.train210:visible .starSky226 .starShape226').get_attribute('points'))
 assert len(set(signatures))==3,'Different actual training paths produced identical stars'
 # Capture the normal compact screen as well as the expanded star. Keep navigation visible.
 p.locator('[data-focus210="'+ids[0]+'"]').click()
 if p.locator('.train210:visible .starMap226').evaluate('(el)=>el.open'):p.locator('.train210:visible .starMap226>summary').click()
 p.locator('.train210:visible .stage369').scroll_into_view_if_needed();p.screenshot(path=str(OUT/'star-main.png'))
 p.reload();settle(p);train_view(p)
 assert outcomes(p)==final,'Reload changed earned journals or numeric outcomes'
 readonly=p.evaluate('JSON.stringify(S)')
 p.locator('.tabs [data-v="nest201"]').click();settle(p)
 check_map(p,'.nestGallery201 .starMap226',final['athletes'][0])
 p.locator('[data-nest-group201="stars"]').click();settle(p);check_map(p,'.nestGallery201 .starMap226',frozen)
 p.locator('.nestGallery201 [data-star-mode226="earned"]').click();p.locator('.nestGallery201 [data-star-key226="speed"]').click();p.locator('#nestGallery201').screenshot(path=str(OUT/'star-my-star.png'))
 assert p.evaluate('JSON.stringify(S)')==readonly,'Nest star browsing changed canonical state'
 p.locator('[data-nest-group201="team"]').click();settle(p);p.locator('.nestGallery201 [data-star-mode226="earned"]').click();p.locator('#nestGallery201').screenshot(path=str(OUT/'star-nest.png'))
 # Restore through the actual native confirmation flow, then redraw the journal.
 p.locator('#nestRecords201>summary').click();p.once('dialog',lambda d:d.accept());p.locator('#restore352').click();settle(p)
 assert p.evaluate('S.nest')==protected;train_view(p)
 for width in (320,390,414):
  p.set_viewport_size({'width':width,'height':844});settle(p)
  assert p.evaluate('document.documentElement.scrollWidth<=innerWidth')
  if not p.locator('.train210:visible .starMap226').evaluate('(el)=>el.open'):p.locator('.train210:visible .starMap226>summary').click()
  assert p.locator('.train210:visible .starMap226 button').evaluate_all('(els)=>els.every(e=>e.getBoundingClientRect().height>=44&&e.getBoundingClientRect().width>=44)')
  p.locator('.train210:visible .starMap226').screenshot(path=str(OUT/('star-width-'+str(width)+'.png')))
 # Explicit legacy fixture: a missing journal must not infer growth from current stats.
 legacy=p.evaluate('''()=>{const m=JSON.parse(JSON.stringify(S.nest[0]));delete m.trainingGain226;delete m.matchGain226;delete m.appearanceGrowth226;const before=JSON.stringify(m),node=STAR_GROWTH226.starMap(m);document.body.appendChild(node);node.querySelector('[data-star-key226="power"]').click();const result={readonly:JSON.stringify(m)===before,value:node.querySelector('.starReadout226 strong').textContent,rows:STAR_GROWTH226.starValues(m)};node.remove();return result}''')
 assert legacy['readonly'] and legacy['value']=='+0' and all(r['training']==r['match']==0 for r in legacy['rows'])
 parity=None
 if args.compare_from:
  old,prior=context(b,initial,args.compare_from);train_view(prior);prior.evaluate('Math.random=()=>.5')
  for _ in range(3):prior.locator('#doTrain263').click();settle(prior);events(prior)
  # Registered MY STAR/protection do not alter RNG or training outcomes. Compare live athletes and round only.
  parity=outcomes(prior)==final;assert parity;old.close()
 report={'release':'v0.34.11','actualBirthsThreeTrainingRounds':True,'trainingPaths':['speed','power','tech'],'differentSignatures':len(set(signatures)),'allSixAxesBothModesCorrect':True,'browsingReadonly':True,'reloadJournalsPreserved':True,'protectedRestore':True,'savedStarUsesFrozenSnapshot':True,'legacyMissingJournalReadonlyZero':legacy['readonly'],'priorSourceNumericParity':parity,'widths':[320,390,414],'errors':errors,'missing':missing}
 assert not errors and not missing
 (OUT/'constellation-flow.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False));c.close();b.close()
