"""Verify training controls, a same-save UI comparison and seeded fresh-save first seasons.
Uses actual births/training/tournaments; no ability, league, turn or win fixtures.
Chromium only. Seeded automated play does not establish enjoyment or full-game pacing.
"""
import argparse,json,mimetypes,os,shutil
from pathlib import Path
from urllib.parse import unquote,urlparse
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
ap=argparse.ArgumentParser();ap.add_argument('--output',type=Path,default=Path('/tmp/star-training-ui'));ap.add_argument('--compare-from',type=Path);ap.add_argument('--baseline-source',help='Commit of the comparison source files, if known');ap.add_argument('--skip-fresh',action='store_true',help='Only repeat the same-save UI/controls check after presentation-only edits');args=ap.parse_args();OUT=args.output;OUT.mkdir(parents=True,exist_ok=True)
errors=[];missing=[]
def server(previous=None):
 def serve(route):
  u=urlparse(route.request.url);target=(ROOT/unquote(u.path).lstrip('/')).resolve()
  if u.hostname!='games.local' or not target.is_relative_to(ROOT):route.abort();return
  if target.is_dir():target/='index.html'
  if previous and (previous/target.relative_to(ROOT)).is_file():target=previous/target.relative_to(ROOT)
  if not target.is_file():route.fulfill(status=404,body='Missing');return
  route.fulfill(status=200,body=target.read_bytes(),content_type=mimetypes.guess_type(target.name)[0] or 'text/plain')
 return serve
def context(browser,seed,save=None,previous=None):
 c=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,service_workers='block',reduced_motion='reduce');c.route('**/*',server(previous))
 c.add_init_script('let qaSeed='+str(seed)+';Math.random=()=>{qaSeed=(Math.imul(qaSeed,1664525)+1013904223)>>>0;return qaSeed/4294967296}')
 if save:c.add_init_script('for(const [k,v] of Object.entries('+json.dumps(save,ensure_ascii=False)+'))if(!localStorage.getItem(k))localStorage.setItem(k,v)')
 page=c.new_page();page.set_default_timeout(15000);page.on('pageerror',lambda e:errors.append(str(e)));page.on('response',lambda r:missing.append(r.url) if r.status>=400 else None)
 page.goto('https://games.local/star-athletes/',wait_until='load');page.wait_for_timeout(800)
 return c,page
def settle(page):page.wait_for_timeout(400)
def close_reveals(page):
 for sel in ('[data-close277]','[data-close350]','#abilityResult352 button','[data-close278]'):
  if page.locator(sel).count():page.locator(sel).first.click()
def adopt(page):
 for i in range(3):
  for n in (0,1):page.locator('#breeders>.card').nth(n).tap(position={'x':12,'y':12})
  page.locator('#breedBtn').click();page.locator('#hatch').click();settle(page);close_reveals(page)
 for i in range(3):page.locator('#cands>.card').nth(i).locator('.stage369').tap()
 page.locator('#adopt').click();page.wait_for_function('S.nest.length===3');page.wait_for_timeout(1200)
def metrics(page):
 return page.evaluate('''()=>{const root=document.getElementById('train'),exclude='.stats210,.statHud369,.labMeta,.grade369,.rank369,.seasonDots119,.wallet119,.leagueTrack225,.condition275,.powerCompare225,.entries210>button>small,.entries210>button>div:not(.avatar):not(.entrySkillHost254)';const closed=[...root.querySelectorAll('details:not([open])')];const walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let text='',n;while(n=walk.nextNode()){if(n.parentElement.closest(exclude)||n.parentElement.closest('style,script,option')||closed.some(d=>d.contains(n)&&!d.querySelector(':scope>summary')?.contains(n)))continue;const range=document.createRange();range.selectNode(n);if([...range.getClientRects()].some(r=>r.width&&r.height))text+=n.textContent.trim();}return{nonStatusVisibleCharacters:Array.from(text).filter(c=>c.trim()).length,text,height:root.scrollHeight,viewportWidth:innerWidth,documentWidth:document.documentElement.scrollWidth}}''')
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or shutil.which('chromium'),headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 # Same saved athletes/state, not a fresh reroll comparison.
 c,base=context(browser,72012,previous=args.compare_from);adopt(base);baseline=metrics(base)
 base.screenshot(path=str(OUT/'training-before.png'),full_page=True)
 save=base.evaluate('Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)]))');base_stats=base.evaluate('S.nest.map(m=>({id:m.id,name:m.name,stats:m.stats}))');c.close()
 c,page=context(browser,72012,save=save);page.locator('.tabs [data-v="train"]').click();settle(page)
 assert page.evaluate('S.nest.map(m=>({id:m.id,name:m.name,stats:m.stats}))')==base_stats
 after=metrics(page);page.screenshot(path=str(OUT/'training-after.png'),full_page=True);page.screenshot(path=str(OUT/'training-viewport.png'))
 assert page.locator('#plans>.train210:visible').count()==1
 assert page.locator('#plans .statHud369').count()==0,'Repeated stat HUD survived'
 assert page.locator('#plans .fresh237').count()==0
 ids=page.evaluate('S.nest.map(m=>m.id)')
 # Set each athlete through visible controls. The focused athlete survives rerenders.
 for i,(plan,mode) in enumerate(zip(('speed','power','tech'),('safe','normal','high'))):
  page.locator('[data-focus210="'+ids[i]+'"]').click()
  page.locator('[data-p210="'+plan+'"][data-m210="'+ids[i]+'"]').click();settle(page)
  page.locator('[data-int275="'+mode+'"][data-ath275="'+ids[i]+'"]').click();settle(page)
  assert page.locator('#plans>.train210:visible').get_attribute('data-athlete210')==ids[i]
  assert page.locator('#plans>.train210:visible .athlete369 canvas').evaluate_all('(nodes)=>nodes.every(c=>Array.from(c.getContext("2d").getImageData(0,0,c.width,c.height).data).some((v,i)=>i%4===3&&v>0))')
  forecast=page.evaluate('(id)=>STAR_TRAIN263.preview(S.nest.find(m=>m.id===id),S.plans[id],S.training263.intensity[id])',ids[i])
  for k,v in forecast.items():assert page.locator('[data-athlete210="'+ids[i]+'"] [data-stat210="'+k+'"] em').inner_text()=='+'+str(v)
 assert page.evaluate('S.nest.map(m=>S.plans[m.id])')==['speed','power','tech']
 assert page.evaluate('S.nest.map(m=>S.training263.intensity[m.id])')==['safe','normal','high']
 # Open state and assignments persist through re-render, not merely hidden by CSS.
 event=page.evaluate('S.schedule[0]');page.locator('#prep [data-event210="0"]>summary').click()
 page.locator('[data-e210="0"][data-m210="'+ids[1]+'"]').click();settle(page)
 page.locator('[data-s210="0"][data-v210="温存"]').click();settle(page)
 assert page.locator('#prep [data-event210="0"]').evaluate('(el)=>el.open')
 assert page.evaluate('S.assign[0]')==ids[1] and page.evaluate('S.strat[0]')=='温存'
 page.locator('#prep [data-event210="0"]>summary').click()
 # Selecting a different meet immediately rebuilds its actual preparation events.
 page.locator('#meetPicker290>summary').click();page.locator('[data-star-meet290="0"]').click();settle(page)
 assert page.locator('#prep summary>b').all_inner_texts()==page.evaluate('S.schedule')
 page.locator('#meetPicker290>summary').click()
 page.locator('#policy266 summary').click();page.locator('[data-policy266="growth"]').click();settle(page)
 assert page.locator('#policy266 details').evaluate('(el)=>el.open')
 page.locator('#policy266 summary').click()
 assert page.evaluate('S.training263.policy266')=='growth',page.evaluate('({policy:S.training263.policy266,turn:S.turn,pending:STAR_EVENTS267.pending()})')
 # Normal-success forecast uses the real multiplier including the explicit plan (skill policy).
 report={'baselineSource':args.baseline_source,'metricScope':'Default training screen, all scroll depth, non-whitespace text excluding ability/status panels, closed native details and hidden athletes','sameSave':True,'before':baseline,'after':after,'focusAndIndividualSettings':True,'eventAssignmentAndDisclosure':True,'meetSelectionRefreshesPreparation':True}
 # Existing saved over-cap athlete: preview reports zero instead of negative or phantom growth.
 report['forecastBounds']=page.evaluate('''()=>{const m=structuredClone(S.nest[0]);m.stats.speed=3500;m.stats.agility=999;const before=JSON.stringify(S);const p=STAR_TRAIN263.preview(m,'speed','normal');if(p.speed!==0||p.agility!==0||JSON.stringify(S)!==before)throw Error('forecast mutated/overstated');return true}''')
 for width in (320,390,414):
  page.set_viewport_size({'width':width,'height':844});settle(page);assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),width
  boxes=page.locator('#plans>.train210:visible .opts210 button').evaluate_all('(nodes)=>nodes.map(b=>{const r=b.getBoundingClientRect();return{top:r.top,width:r.width,height:r.height}})')
  assert len(boxes)==5 and max(b['top'] for b in boxes)-min(b['top'] for b in boxes)<1 and all(b['width']>=40 and b['height']>=44 for b in boxes),(width,boxes)
 page.set_viewport_size({'width':390,'height':844})
 page.evaluate('STAR_SAVE_CORE.save("training-ui-controls")');page.reload(wait_until='load');page.wait_for_timeout(700)
 assert page.evaluate('S.training263.policy266')=='growth',page.evaluate('({policy:S.training263.policy266,save:JSON.parse(localStorage.getItem("star-athletes-save-v200")).S.training263})')
 c.close();print('PASS same-save text/height comparison, focused controls, gain previews, preparation, save/reload, widths',flush=True)
 # Two independent, seeded fresh starts. All abilities come from shipped births and growth.
 progress=[]
 for seed in (() if args.skip_fresh else (72012,92019)):
  c,page=context(browser,seed);adopt(page);initial=page.evaluate('S.nest.map(m=>({name:m.name,stats:m.stats}))');seasons=[]
  for season in range(1,7):
   page.locator('.tabs [data-v="train"]').click();settle(page)
   page.locator('#meetPicker290>summary').click();page.locator('[data-star-meet290="'+('0' if season<=2 else ('1' if season<=4 else '0'))+'"]').click();settle(page);page.locator('#meetPicker290>summary').click()
   page.locator('#policy266 summary').click();page.locator('[data-policy266="compete"]').click();settle(page);page.locator('#policy266 summary').click()
   while page.evaluate('S.turn')<3:
    page.locator('#doTrain263').click();settle(page)
    if page.locator('[data-event267="b"]').count():page.locator('[data-event267="b"]').click();settle(page)
   assert page.locator('#doTrain263').is_disabled()
   frozen=page.evaluate('JSON.stringify(S.plans)');page.evaluate('document.querySelector("[data-p210]").dispatchEvent(new MouseEvent("click",{bubbles:true}))');assert page.evaluate('JSON.stringify(S.plans)')==frozen
   page.locator('#toMeet').click();settle(page)
   assert page.locator('.rivalDetails225').count(),page.evaluate('document.getElementById("rival").innerHTML')
   assert not page.locator('.rivalDetails225').evaluate('(el)=>el.open')
   if season==1:
    page.screenshot(path=str(OUT/('tournament-ready-'+str(seed)+'.png')),full_page=True);page.locator('.rivalDetails225>summary').click();assert page.locator('.rivalCards225').is_visible();page.locator('.rivalDetails225>summary').click()
   page.locator('#run').click();page.wait_for_function(f'(S.seasonHistory||[]).some(h=>h.season==={season}&&h.generation===1)');settle(page);close_reveals(page)
   seasons.append(page.evaluate('({season:S.season,tier:S.meetChoice225,rank:S.seasonHistory.at(-1).overall,average:Math.round(S.nest.reduce((a,m)=>a+Object.values(m.stats).reduce((x,y)=>x+y,0)/6,0)/3),league:S.leagueRank})'))
   page.locator('#next225').click();page.wait_for_timeout(800)
  if page.evaluate('!!S.promotion233'):
   page.locator('#run').click();settle(page);close_reveals(page)
  # Annual results must provide an actual next-generation action, whether victorious or defeated.
  page.locator('#annualNext233').click();page.wait_for_timeout(800)
  if page.evaluate('!!S.promotion233'):
   page.locator('#run').click();settle(page);close_reveals(page);page.locator('#annualNext233').click();page.wait_for_timeout(800)
  assert page.evaluate('S.generation233===2&&S.needsBreeding')
  progress.append({'seed':seed,'initialAthletes':initial,'seasons':seasons,'nextGeneration':page.evaluate('S.generation233'),'leagueAfter':page.evaluate('S.leagueRank')});c.close();print('PASS fresh-save six seasons and next-generation route, seed '+str(seed),flush=True)
 assert not errors,errors;assert not missing,missing
 report.update(freshSaveProgression=progress,errors=errors,missing=missing,physicalSafari=False,seededAutomatedPlay=not args.skip_fresh)
 (OUT/'training-ui-flow.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'before':report['before']['nonStatusVisibleCharacters'],'after':report['after']['nonStatusVisibleCharacters'],'heightBefore':report['before']['height'],'heightAfter':report['after']['height'],'ranks':[{'seed':x['seed'],'ranks':[s['rank'] for s in x['seasons']]} for x in progress],'errors':errors,'missing':missing},ensure_ascii=False));browser.close()
