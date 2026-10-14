"""Verify physical growth from actual births and nine committed training rounds.
Separate LIMIT/legacy/four-species boundary fixtures are explicit. Chromium only.
"""
import argparse,json,mimetypes,re,shutil,hashlib
from pathlib import Path
from urllib.parse import unquote,urlparse
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
ap=argparse.ArgumentParser();ap.add_argument('--output',type=Path,default=Path('/tmp/star-appearance'));ap.add_argument('--compare-from',type=Path);args=ap.parse_args();OUT=args.output;OUT.mkdir(parents=True,exist_ok=True)
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
 c.add_init_script('let qa=84009;Math.random=()=>{qa=(Math.imul(qa,1664525)+1013904223)>>>0;return qa/4294967296}')
 if save:c.add_init_script('for(const [k,v] of Object.entries('+json.dumps(save)+'))if(!localStorage.getItem(k))localStorage.setItem(k,v)')
 p=c.new_page();p.set_default_timeout(15000);p.on('pageerror',lambda e:errors.append(str(e)));p.on('response',lambda r:missing.append(r.url) if r.status>=400 else None);p.goto('https://games.local/star-athletes/');p.wait_for_timeout(1100);return c,p

def settle(p):p.wait_for_timeout(500)
def view(p):return p.evaluate('S.nest.map(m=>STAR_GROWTH226.appearance(m))')
def save(p):return p.evaluate('Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)]))')
def identity(p):return p.evaluate('S.nest.map(m=>({id:m.id,name:m.name,species:m.species,gen:m.gen,visual:m.visual,grade:STAR_GRADE_ENGINE362.athleteGrade(m)}))')
def capture(p,name):
 p.locator('.tabs [data-v="train"]').click();settle(p);p.locator('#plans>.train210:visible').screenshot(path=str(OUT/(name+'.png')))
def events(p):
 if p.locator('[data-event267="b"]').count():p.locator('[data-event267="b"]').click();settle(p)
def meet(p,next_season=True):
 p.locator('.tabs [data-v="train"]').click();settle(p)
 p.locator('#toMeet').click();settle(p);p.locator('#run').click();p.wait_for_function('S.battle225?.done');p.wait_for_timeout(400)
 if next_season:
  season=p.evaluate('S.season');p.locator('#next225').click();p.wait_for_function("(season)=>typeof S!=='undefined'&&S.season===season+1",arg=season);settle(p);p.evaluate('Math.random=()=>.5')
def outcomes(p):return p.evaluate('({stats:S.nest.map(m=>m.stats),coins:S.coins,fame:S.fame,history:S.seasonHistory.map(x=>({season:x.season,overall:x.overall,pts:x.pts}))})')
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path=shutil.which('chromium'),args=['--no-sandbox','--disable-dev-shm-usage']);c,p=context(b)
 # Legacy starter appearance stays mature without inserting a fabricated history on render.
 assert p.evaluate('S.starters.every(m=>!m.appearanceGrowth226&&STAR_GROWTH226.appearance(m).stage===2)')
 for i in range(3):
  for n in (0,1):p.locator('#breeders>.card').nth(n).tap(position={'x':12,'y':12})
  p.locator('#breedBtn').click();p.locator('#hatch').click();settle(p);p.wait_for_function('S.cands?.length>='+str(i+1))
  assert p.evaluate('S.cands.at(-1).appearanceGrowth226.sessions===0&&STAR_GROWTH226.appearance(S.cands.at(-1)).stage===0')
  for s in ('[data-close277]','[data-close350]','#abilityResult352 button','[data-close278]'):
   if p.locator(s).count():p.locator(s).first.click()
 for i in range(3):p.locator('#cands>.card').nth(i).locator('.stage369').tap()
 p.locator('#adopt').click();settle(p);p.evaluate('Math.random=()=>.5;S.appearanceProbe={nested:{keep:true}};S.nest.forEach(m=>m.appearanceGrowth226.futureField={keep:true});STAR_SAVE_CORE.save("appearance-before")')
 initial=save(p);ident=identity(p);capture(p,'growth-juvenile');assert all(x['stage']==0 for x in view(p))
 p.locator('#doTrain263').click();settle(p);events(p);p.locator('#doTrain263').click();settle(p);events(p);assert all(x['sessions']==2 and x['stage']==0 for x in view(p))
 p.locator('#plans>.train210:visible [data-my-star323]').click();settle(p);assert p.evaluate('STAR_GROWTH226.appearance(S.myStars323[0].athlete).stage')==0
 p.locator('#doTrain263').click();settle(p);events(p);assert all(x['sessions']==3 and x['stage']==1 for x in view(p));capture(p,'growth-adolescent');assert p.locator('.roundFeedback263').inner_text().find('育成期へ')>=0
 blocked=view(p);p.evaluate('document.getElementById("doTrain263").dispatchEvent(new MouseEvent("click",{bubbles:true}))');settle(p);assert view(p)==blocked
 p.evaluate('STAR_PRETEST352.protect(true)');protected=save(p);p.reload();settle(p);p.evaluate('Math.random=()=>.5');assert all(x['stage']==1 and x['sessions']==3 for x in view(p))
 meet(p)
 for season in (2,3):
  for i in range(3):
   p.locator('#doTrain263').click();settle(p);events(p)
  assert all(x['sessions']==season*3 for x in view(p))
  if season==3:capture(p,'growth-adult')
  meet(p,next_season=season!=3)
 assert all(x['stage']==2 and x['sessions']==9 for x in view(p));assert identity(p)==ident
 assert p.evaluate('STAR_GROWTH226.appearance(S.myStars323[0].athlete).stage')==0
 p.locator('.tabs [data-v="nest201"]').click();settle(p);p.locator('[data-nest-group201="stars"]').click();settle(p);p.screenshot(path=str(OUT/'growth-my-star-juvenile.png'))
 current_outcomes=outcomes(p)
 # Same initial saved athletes in the prior runtime, fixed RNG, same9inputs/3matches.
 parity=None
 if args.compare_from:
  bc,bp=context(b,initial,args.compare_from);bp.evaluate('Math.random=()=>.5');bp.locator('.tabs [data-v="train"]').click();settle(bp)
  for season in (1,2,3):
   for i in range(3):
    bp.locator('#doTrain263').click();settle(bp);events(bp)
    if season==1 and i==1:bp.locator('#plans>.train210:visible [data-my-star323]').click();settle(bp)
   meet(bp,next_season=season!=3)
  parity=outcomes(bp)==current_outcomes;assert parity,(outcomes(bp),current_outcomes);bc.close();print('PASS prior-source outcome parity',flush=True)
 # Protected restore and corrupt-primary backup retain stage/counter/unknown fields in the canonical S object.
 p.evaluate('window.qaIdentity=S');p.locator('#nestRecords201>summary').click();p.once('dialog',lambda d:d.accept());p.locator('#restore352').click();settle(p);assert p.evaluate('S===window.qaIdentity&&S.appearanceProbe.nested.keep&&S.nest.every(m=>m.appearanceGrowth226.futureField.keep)');assert all(x['sessions']==3 and x['stage']==1 for x in view(p))
 p.evaluate('STAR_SAVE_CORE.save("appearance-backup");const raw=localStorage.getItem("star-athletes-save-v200");localStorage.setItem("star-athletes-save-v200-backup",raw);localStorage.setItem("star-athletes-save-v200","{bad")');p.reload();settle(p);assert all(x['sessions']==3 and x['stage']==1 for x in view(p))
 # Birth boundary: a mature parent's development is not inherited by its child.
 born=p.evaluate('()=>{const a=JSON.parse(JSON.stringify(S.nest[0])),b=JSON.parse(JSON.stringify(S.nest[1]));a.appearanceGrowth226.sessions=b.appearanceGrowth226.sessions=9;const child=baby(a,b);return STAR_GROWTH226.appearance(child)}');assert born['sessions']==0 and born['stage']==0
 # Injury boundary: a valid committed training with injury counts once, without giving a stat bonus.
 ic,ip=context(b,initial);ip.locator('.tabs [data-v="train"]').click();settle(ip);before=ip.evaluate('JSON.stringify(S.nest.map(m=>m.stats))');ip.evaluate('Math.random=()=>0');ip.locator('#doTrain263').click();settle(ip);assert all(x['sessions']==1 for x in view(ip));assert ip.evaluate('S.training263.lastRound263.athletes.every(x=>x.injury&&Object.values(x.deltas).every(v=>v===0))');ic.close()
 # Explicit LIMIT fixture: allocation4/0/0 advances only participant, one energy prevents repeats.
 lc,lp=context(b,initial);lp.evaluate('S.limitReleased=true;S.limit278={released:true,shown:true,stage:1};S.limit279={energy:1,lastEnergyAt:Date.now(),sessions:0,alloc:Object.fromEntries(S.nest.map((m,i)=>[m.id,i===0?4:0])),target:Object.fromEntries(S.nest.map(m=>[m.id,"power"]))};S.nest.forEach(m=>{m.appearanceGrowth226.sessions=2;m.stats.power=1000});render()');settle(lp);lp.locator('.tabs [data-v="train"]').click();settle(lp);lp.locator('#limitGo279').click();settle(lp);assert [x['sessions'] for x in view(lp)]==[3,2,2];assert [x['stage'] for x in view(lp)]==[1,0,0];limit_before=view(lp);lp.evaluate('document.getElementById("limitGo279").dispatchEvent(new MouseEvent("click",{bubbles:true}))');settle(lp);assert view(lp)==limit_before;lc.close();c.close()
 # Legacy/art boundary fixtures: no forged historic counter, no younger presentation on new sessions.
 ac,art=context(b,initial);art.evaluate('S.lineage=Object.keys(SP).flatMap((species,i)=>[0,1,2].map(stage=>({...JSON.parse(JSON.stringify(S.nest[0])),id:"growth-art-"+i+"-"+stage,species,name:SP[species][0]+" "+["幼体","育成期","成体"][stage],appearanceGrowth226:{version:1,floor:0,sessions:[0,3,9][stage],historyKnown:true}})));STAR_NEST201.sync()');art.locator('.tabs [data-v="nest201"]').click();settle(art);art.locator('[data-nest-group201="lineage"]').click();settle(art)
 frames={}
 for i,sp in enumerate(('draco','unil','grimo','puru')):
  frames[sp]=[]
  for stage in (0,1,2):
   art.locator('[data-nest-pick201="growth-art-'+str(i)+'-'+str(stage)+'"]').click();settle(art);node=art.locator('.nestPortrait201');assert node.evaluate('(el)=>{const img=el.querySelector("img");if(img)return img.complete&&img.naturalWidth>0;const c=el.querySelector("canvas");return !!c&&c.dataset.error==="0"&&Array.from(c.getContext("2d").getImageData(0,0,c.width,c.height).data).some((v,i)=>i%4===3&&v>0)}');frames[sp].append(hashlib.sha256(node.screenshot()).hexdigest());art.locator('#nestGallery201').screenshot(path=str(OUT/(sp+'-stage'+str(stage)+'.png')))
  assert len(set(frames[sp]))==3
 for width in (320,390,414):art.set_viewport_size({'width':width,'height':844});settle(art);assert art.evaluate('document.documentElement.scrollWidth<=innerWidth')
 legacy=art.evaluate('()=>{const m=JSON.parse(JSON.stringify(S.nest[0]));delete m.appearanceGrowth226;const before=JSON.stringify(m),a=STAR_GROWTH226.appearance(m),unchanged=JSON.stringify(m)===before;STAR_GROWTH226.appearanceTraining(m,"normal","legacy-test");return{a,unchanged,after:STAR_GROWTH226.appearance(m)}}');assert legacy['a']['stage']==legacy['after']['stage']==2 and legacy['a']['sessions'] is None and legacy['unchanged']
 assert not errors,errors;assert not missing,missing
 report={'version':'v0.34.09','actualBirthsNineRoundsThreeMatches':True,'thresholds':[0,3,9],'blockedInputNoAdvance':True,'injuryCommittedRoundCountsOnce':True,'protectedRestoreCorruptBackupUnknownFields':True,'birthIdentityGenesRarityPreserved':True,'myStarJuvenileSnapshotFrozen':True,'nineRoundsThreeMatchesOutcomesEqualPriorSource':parity,'matureParentBirthCounterResetBoundary':True,'limitAllocationEnergyBoundaryFixture':True,'legacyKeepsMatureHistoryUnknown':True,'fourSpeciesThreeStagesArtFixture':True,'frameHashes':frames,'viewportWidths':[320,390,414],'physicalSafari':False,'errors':errors,'missing':missing}
 (OUT/'appearance-flow.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False));b.close()
