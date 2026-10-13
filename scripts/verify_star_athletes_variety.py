"""Verify varied practice, real competition scenes, skip parity and reload-safe outcomes.
Actual births/training/match; fixed RNG for repeatability, no ability/turn/win fixture.
Mobile Chromium only. Does not prove enjoyment, retention or physical Safari.
"""
import argparse,json,mimetypes,os,shutil
from pathlib import Path
from urllib.parse import unquote,urlparse
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
ap=argparse.ArgumentParser();ap.add_argument('--output',type=Path,default=Path('/tmp/star-variety'));args=ap.parse_args();OUT=args.output;OUT.mkdir(parents=True,exist_ok=True)
errors=[];missing=[]
def serve(route):
 u=urlparse(route.request.url);target=(ROOT/unquote(u.path).lstrip('/')).resolve()
 if u.hostname!='games.local' or not target.is_relative_to(ROOT):route.abort();return
 if target.is_dir():target/='index.html'
 if not target.is_file():route.fulfill(status=404,body='Missing');return
 route.fulfill(status=200,body=target.read_bytes(),content_type=mimetypes.guess_type(target.name)[0] or 'text/plain')
def create(browser,motion='no-preference',save=None):
 ctx=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion=motion,service_workers='block');ctx.route('**/*',serve)
 if save:ctx.add_init_script('for(const [k,v] of Object.entries('+json.dumps(save,ensure_ascii=False)+'))if(!localStorage.getItem(k))localStorage.setItem(k,v)')
 page=ctx.new_page();page.set_default_timeout(12000);page.on('pageerror',lambda e:errors.append(str(e)));page.on('response',lambda r:missing.append(r.url) if r.status>=400 else None)
 page.goto('https://games.local/star-athletes/',wait_until='load');page.wait_for_timeout(800);page.evaluate('Math.random=()=>.5');return ctx,page
def settle(page):page.wait_for_timeout(350)
def clear_reveals(page):
 for s in ('[data-close277]','[data-close350]','#abilityResult352 button','[data-close278]'):
  if page.locator(s).count():page.locator(s).first.click()
def saved(page):return page.evaluate('Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)]))')
def summary(page):return page.evaluate('({scores:S.battle225.rows.map(r=>r.scores),ranks:S.battle225.rows.map(r=>r.rank),overall:S.battle225.result.overall,coins:S.coins,fame:S.fame,history:S.seasonHistory.length})')
def capture(page,kind):
 page.wait_for_function('(kind)=>document.querySelector(".arena225")?.dataset.kind===kind&&Number(document.querySelector(".arena225").dataset.progress225)>=.23&&Number(document.querySelector(".arena225").dataset.progress225)<.9',arg=kind)
 assert page.locator('.arenaStage225>canvas').evaluate('(c)=>Array.from(c.getContext("2d").getImageData(0,0,c.width,c.height).data).some((v,i)=>i%4===3&&v>0)')
 page.locator('#events').evaluate('(el)=>el.scrollIntoView({block:"center"})')
 page.locator('#events').screenshot(path=str(OUT/('competition-'+kind+'.png')))
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or shutil.which('chromium'),headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 ctx,page=create(b)
 for i in range(3):
  for n in (0,1):page.locator('#breeders>.card').nth(n).tap(position={'x':12,'y':12})
  page.locator('#breedBtn').click();page.locator('#hatch').click();settle(page);clear_reveals(page)
 for i in range(3):page.locator('#cands>.card').nth(i).locator('.stage369').tap()
 page.locator('#adopt').click();settle(page)
 assert page.evaluate('S.meetChoice225')=='safe'
 # A forced early input must not leave temporary match boosts on unready athletes.
 initial_stats=page.evaluate('JSON.stringify(S.nest.map(m=>m.stats))')
 page.evaluate('const b=document.getElementById("run");b.disabled=false;b.dispatchEvent(new MouseEvent("click",{bubbles:true}));STAR_GATE222?.update?.()')
 assert page.evaluate('JSON.stringify(S.nest.map(m=>m.stats))')==initial_stats
 ids=page.evaluate('S.nest.map(m=>m.id)');plans=['speed','power','tech'];drills=['focus','steady','support']
 for i in range(3):
  page.locator('[data-focus210="'+ids[i]+'"]').click();page.locator('[data-p210="'+plans[i]+'"][data-m210="'+ids[i]+'"]').click();settle(page)
  before=page.evaluate('(i)=>STAR_TRAIN263.bases(S.nest[i],S.plans[S.nest[i].id])',i)
  page.locator('[data-drill275="'+drills[i]+'"][data-ath275="'+ids[i]+'"]').click();settle(page)
  after=page.evaluate('(i)=>STAR_TRAIN263.bases(S.nest[i],S.plans[S.nest[i].id])',i)
  assert sum(before.values())==sum(after.values())==8
  if i==0:assert after=={'speed':6,'agility':2}
  if i==2:assert after=={'tech':4,'agility':4}
 page.evaluate('S.varietyProbe={nested:{keep:true}};S.training263.drill263.futureField={keep:true};STAR_SAVE_CORE.save("variety-probe")');page.reload(wait_until='load');page.wait_for_timeout(700);page.evaluate('Math.random=()=>.5')
 assert page.evaluate('S.nest.map(m=>S.training263.drill263[m.id])')==drills
 expected=page.evaluate('S.nest.map(m=>STAR_TRAIN263.preview(m,S.plans[m.id],S.training263.intensity[m.id]))');before=page.evaluate('S.nest.map(m=>({...m.stats}))')
 page.locator('#doTrain263').click();settle(page)
 after=page.evaluate('S.nest.map(m=>({...m.stats}))')
 for x,y,gains in zip(before,after,expected):
  for k,v in gains.items():assert y[k]-x[k]==v
 assert page.locator('.roundFeedback263 article').count()==3
 page.locator('.tabs [data-v="train"]').click();settle(page);page.locator('#train').screenshot(path=str(OUT/'practice-after.png'))
 assert page.evaluate('S.training263.lastRound263.turn')==1
 page.reload(wait_until='load');page.wait_for_timeout(700);assert page.locator('.roundFeedback263 article').count()==3;page.evaluate('Math.random=()=>.5')
 assert page.evaluate('S.training263.drill263.futureField.keep&&S.varietyProbe.nested.keep')
 while page.evaluate('S.turn')<3:
  page.locator('#doTrain263').click();settle(page)
  if page.locator('[data-event267="b"]').count():page.locator('[data-event267="b"]').click();settle(page)
 page.locator('#meetPicker290>summary').click();page.locator('[data-star-meet290="2"]').click();settle(page);page.locator('#meetPicker290>summary').click()
 page.locator('#toMeet').click();settle(page);page.evaluate('STAR_SAVE_CORE.save("variety-before-match")');snapshot=saved(page);stats=page.evaluate('JSON.stringify(S.nest.map(m=>m.stats))')
 page.locator('#run').click();capture(page,'race');cached=page.evaluate('JSON.stringify(S.battle225.rows)');assert page.evaluate('JSON.stringify(S.nest.map(m=>m.stats))')==stats,'Temporary competition modifiers leaked into saved stats'
 choice=page.evaluate('S.seasonMeet.name');page.evaluate("document.querySelector('[data-star-meet290]').dispatchEvent(new MouseEvent('click',{bubbles:true}))")
 assert page.evaluate('S.seasonMeet.name')==choice
 page.evaluate('S.battle225.futureField={keep:true};STAR_SAVE_CORE.save("variety-mid-match")');pending=saved(page)
 # Ordinary navigation may finish on visibilitychange. Either way, it must retain the same scores.
 page.reload(wait_until='load');page.wait_for_timeout(700);assert page.evaluate('JSON.stringify(S.battle225.rows)')==cached
 # A new isolated profile restores the actual in-flight save, simulating a hard restart before final settlement.
 pctx,pp=create(b,'no-preference',pending);assert not pp.evaluate('S.battle225.done');assert pp.evaluate('S.battle225.futureField.keep')
 if not pp.locator('#meet').is_visible():pp.locator('#toMeet').click();settle(pp)
 pp.locator('#run').click();capture(pp,'precision');capture(pp,'power');pp.locator('.arenaSkip225').click();pp.wait_for_function('S.battle225.done&&S.seasonHistory.length>0');pp.wait_for_timeout(600)
 watched=summary(pp);assert pp.evaluate('JSON.stringify(S.battle225.rows)')==cached
 coins=pp.evaluate('S.coins');history=pp.evaluate('S.seasonHistory.length');pp.evaluate('document.getElementById("run").onclick()');settle(pp);assert pp.evaluate('S.coins')==coins and pp.evaluate('S.seasonHistory.length')==history
 pp.reload(wait_until='load');pp.wait_for_timeout(800);assert pp.locator('#result').inner_text().find('総合')>=0;assert pp.locator('#next225').count()==1;assert pp.locator('#run').is_hidden();assert summary(pp)==watched
 pp.screenshot(path=str(OUT/'competition-result.png'),full_page=True)
 # Motion-reduced version consumes the same competition rules, not a different difficulty or outcome.
 rctx,rp=create(b,'reduce',snapshot)
 if not rp.locator('#meet').is_visible():rp.locator('#toMeet').click();settle(rp)
 rp.locator('#run').click();rp.wait_for_function('S.battle225.done&&S.seasonHistory.length>0');rp.wait_for_timeout(600);assert summary(rp)==watched,(summary(rp),watched)
 assert rp.locator('.arena225').evaluate('(el)=>el.dataset.finished225')=='true'
 for width in (320,390,414):
  rp.set_viewport_size({'width':width,'height':844});settle(rp);assert rp.evaluate('document.documentElement.scrollWidth<=innerWidth')
 # Separate boundary fixture: existing over-cap values must survive a competition and match growth.
 oc,op=create(b,'reduce',snapshot);op.evaluate('S.nest.forEach(m=>Object.keys(m.stats).forEach(k=>m.stats[k]=3500));STAR_SAVE_CORE.save("over-cap-boundary")');op.locator('#run').click();op.wait_for_function('S.battle225.done');op.wait_for_timeout(700);assert op.evaluate('S.nest.every(m=>Object.values(m.stats).every(v=>v===3500))')
 assert not errors,errors;assert not missing,missing
 report={'version':'v0.34.06','baseBudgetPreserved':8,'focusVsSupportDistinct':True,'drillSaveReloadPreserved':True,'normalSuccessPreviewMatchesActual':True,'threeParticipantFeedbackReload':True,'competitionScenes':['race','precision','power'],'midSceneScoresReloadPreserved':True,'temporaryStatsRestoredBeforeAnimation':True,'inFlightMeetSelectionBlocked':True,'watchedSkipReducedMotionOutcomesEqual':True,'resultReloadHasNextAction':True,'duplicateRewardsBlocked':True,'unknownNestedStatePreserved':True,'overCap3500BoundaryFixturePreserved':True,'viewportWidths':[320,390,414],'scores':watched['scores'],'ranks':watched['ranks'],'physicalSafari':False,'errors':errors,'missing':missing}
 (OUT/'variety-flow.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False));b.close()
