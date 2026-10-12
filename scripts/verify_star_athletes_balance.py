"""Verify balance integration through isolated real mobile UI flows.
Fixture-assisted progression checks do not establish fresh-player pacing or Safari performance.
"""
import argparse, json, mimetypes, os, shutil
from pathlib import Path
from urllib.parse import unquote, urlparse
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
ap=argparse.ArgumentParser();ap.add_argument('--output',type=Path,default=Path('/tmp/star-balance-qa'));args=ap.parse_args();OUT=args.output;OUT.mkdir(parents=True,exist_ok=True)
errors=[];missing=[];report={}
def serve(route):
 u=urlparse(route.request.url);target=(ROOT/unquote(u.path).lstrip('/')).resolve()
 if u.hostname!='games.local' or not target.is_relative_to(ROOT):route.abort();return
 if target.is_dir():target/= 'index.html'
 if not target.is_file():route.fulfill(status=404,body='Missing');return
 route.fulfill(status=200,body=target.read_bytes(),content_type=mimetypes.guess_type(target.name)[0] or 'text/plain')
def settle(page):page.wait_for_timeout(300)
def close_reveals(page):
 for selector in ('[data-close277]','[data-close350]','[data-close278]','#abilityResult352 button'):
  if page.locator(selector).count():page.locator(selector).first.click()
def journal(page,destination):
 page.get_by_role('button',name='研究ノートとメニュー').click();page.locator(f'#journalNav [data-v="{destination}"]').click();settle(page)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or shutil.which('chromium'),headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 ctx=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce',service_workers='block');ctx.route('**/*',serve)
 page=ctx.new_page();page.set_default_timeout(10000);page.on('pageerror',lambda e:errors.append(str(e)));page.on('response',lambda r:missing.append(r.url) if r.status>=400 else None)
 page.goto('https://games.local/star-athletes/',wait_until='load');page.wait_for_timeout(700);page.evaluate('Math.random=()=>.5')
 for i in range(3):
  page.locator('#breeders>.card').nth(0).tap(position={'x':12,'y':12});page.locator('#breeders>.card').nth(1).tap(position={'x':12,'y':12});page.locator('#breedBtn').click();page.locator('#hatch').click();close_reveals(page);settle(page)
 for i in range(3):page.locator('#cands>.card').nth(i).locator('.stage369').tap()
 page.locator('#adopt').click();settle(page)
 # Controlled event RNG exercises a committed round and rejected/replayed input.
 page.evaluate('S.training263.event267.count=0;S.training263.event267.pending=null;Math.random=()=>0')
 page.locator('#doTrain263').click();settle(page)
 assert page.evaluate('S.turn===1&&STAR_EVENTS267.pending()')
 state=page.evaluate('JSON.stringify(S.nest.map(m=>m.stats))');count=page.evaluate('S.training263.event267.count')
 page.evaluate("document.getElementById('doTrain263').dispatchEvent(new MouseEvent('click',{bubbles:true}));render();STAR_EVENTS267.afterTraining()")
 settle(page);assert page.evaluate('S.turn')==1 and page.evaluate('S.training263.event267.count')==count
 assert page.evaluate('JSON.stringify(S.nest.map(m=>m.stats))')==state
 page.locator('#event267').screenshot(path=str(OUT/'training-event.png'))
 page.reload(wait_until='load');page.wait_for_timeout(650);assert page.evaluate('STAR_EVENTS267.pending()&&S.turn===1')
 page.evaluate('Math.random=()=>.5');before=page.evaluate('S.nest.map(m=>({id:m.id,stats:{...m.stats},gain:{...m.trainingGain226}}))')
 page.locator('[data-event267="b"]').click();settle(page)
 after=page.evaluate('S.nest.map(m=>({id:m.id,stats:{...m.stats},gain:{...m.trainingGain226}}))')
 for x,y in zip(before,after):
  for k in x['stats']:assert y['stats'][k]-x['stats'][k]==y['gain'][k]-x['gain'][k]
 assert not page.evaluate('STAR_EVENTS267.pending()');report['event_commit_reload_idempotence']=True;print('PASS event commit/reload/idempotence',flush=True)
 # Existing progress is not proof of pure ancestry; new births track true same-species branches.
 report['lineage']=page.evaluate('''()=>{const a=structuredClone(S.nest[0]),z=structuredClone(S.nest[1]);a.species=z.species='draco';a.gen=z.gen=12;delete a.pureLineage273;delete z.pureLineage273;let c={species:'draco',gen:13,skills233:[],hidden233:{mutation:3,heredity:3,luck:3}};const before=JSON.stringify([a,z,c]);if(STAR_RARE273.evaluate(c,a,z).some(x=>x.id==='pureblood'))throw Error('false pure');if(JSON.stringify([a,z,c])!==before)throw Error('preview mutation');let x=a,y=z;const depths=[];for(let i=0;i<4;i++){const child=baby(x,y);depths.push(child.pureLineage273);x=child;}if(depths.join(',')!=='2,3,4,5')throw Error('streak lost');const same=baby(x,y);if(!same.rareRecipeCandidates273.some(r=>r.id==='pureblood'))throw Error('missing pure recipe');const other=structuredClone(y);other.species='unil';const mixed=baby(x,other);if(mixed.pureLineage273!==1)throw Error('mix not reset');return{depths,oldGenerationNotPure:true,previewReadOnly:true,mixedResets:true}}''')
 # Bounded mission rewards preserve legacy earned stats and are not repeatedly paid.
 page.evaluate('S.missions269.completed=Object.fromEntries(Array.from({length:20},(_,i)=>["g"+(i+30)+":two-skills",{generation:i+30}]));S.missions269.claimed=Object.fromEntries(Object.keys(S.missions269.completed).map(k=>[k,true]));S.nest.forEach(m=>{m.missionBonusApplied269=0;for(const k in m.stats)m.stats[k]=990});render()');settle(page)
 assert page.evaluate('S.missionStatBonus269')==30 and page.evaluate('S.nest.every(m=>Object.values(m.stats).every(v=>v<=999))')
 coins=page.evaluate('S.coins');stats=page.evaluate('JSON.stringify(S.nest.map(m=>m.stats))');page.evaluate('render();render()');settle(page);assert page.evaluate('S.coins')==coins and page.evaluate('JSON.stringify(S.nest.map(m=>m.stats))')==stats
 report['mission_cap_and_idempotence']=True
 # Actual six-season UI path; ability fixture isolates routing/promotion from tuning claims.
 page.evaluate('S.missions269={completed:{},claimed:{}};S.training263.event267={generation:1,count:2,pending:null,resolved:[]};S.nest.forEach((m,i)=>{for(const k in m.stats)m.stats[k]=350;m.geneticBase226={...m.stats};m.trainingGain226=Object.fromEntries(Object.keys(m.stats).map(k=>[k,0]));m.matchGain226={...m.trainingGain226};S.plans[m.id]=["speed","power","tech"][i]});STAR_SAVE_CORE.save("balance-progress-fixture");render()');settle(page)
 ids=page.evaluate('S.nest.map(m=>m.id)');progress=[]
 for season in range(1,7):
  page.locator('.tabs [data-v="train"]').click();settle(page);page.evaluate('Math.random=()=>.5')
  while page.evaluate('S.turn')<3:
   page.locator('#doTrain263').click();settle(page)
   if page.locator('[data-event267="b"]').count():page.locator('[data-event267="b"]').click();settle(page)
  rival_before=page.evaluate('JSON.stringify(S.rivals225)')
  page.locator('#toMeet').click();settle(page);assert page.evaluate('JSON.stringify(S.rivals225)')==rival_before
  page.locator('#run').click();page.wait_for_function(f'(S.seasonHistory||[]).some(h=>h.season==={season}&&h.generation===1)');settle(page)
  assert page.evaluate('S.seasonHistory.at(-1).overall')==1
  coin_before=page.evaluate('S.coins');page.evaluate('document.getElementById("run").onclick()');settle(page);assert page.evaluate('S.coins')==coin_before
  progress.append(page.evaluate('({season:S.season,generation:S.generation233,overall:S.seasonHistory.at(-1).overall})'))
  if season<6:
   page.locator('#next225').click();page.wait_for_load_state('load');page.wait_for_timeout(550);assert page.evaluate('S.season')==season+1 and page.evaluate('S.nest.map(m=>m.id)')==ids
  else:page.locator('#next225').click();settle(page)
 assert page.evaluate('S.nemesis268.defeated[0]&&S.nemesisRewards302[0]')
 page.locator('#annualNext233').click();settle(page);assert page.evaluate('S.promotion233')
 page.locator('#run').click();page.wait_for_function('!S.promotion233&&S.leagueRank===1');page.wait_for_timeout(800);close_reveals(page);settle(page)
 page.locator('#annualNext233').click();page.wait_for_load_state('load');page.wait_for_timeout(650)
 assert page.evaluate('S.generation233===2&&S.season===1&&S.needsBreeding')
 report['six_seasons_promotion_next_generation']={'fixture':True,'seasons':progress,'leagueAfter':page.evaluate('S.leagueRank')}
 # Representatives consume real UI selection; no live-roster mutation and no rarity-only bonus.
 page.evaluate('Math.random=()=>.5');journal(page,'rep285');nest_before=page.evaluate('JSON.stringify(S.nest)')
 for i in range(3):page.locator('[data-pick280]').nth(i).click();settle(page)
 page.evaluate('S.rep280.best={score:99999,at:Date.now(),members:[],savedNote:{keep:true}}');page.locator('#register280').click();settle(page);assert page.evaluate('S.rep280.legacyBests280.at(-1).savedNote.keep');assert page.evaluate('S.rep280.best.scoringVersion280')==2
 page.locator('.repChallenge280>summary').click();page.locator('#challenge280').click();settle(page)
 battle=page.evaluate('JSON.stringify(S.rep280.lastBattle280)');assert page.locator('.repBattle280').is_visible();page.locator('#challenge280').click();settle(page);assert page.evaluate('JSON.stringify(S.rep280.lastBattle280)')==battle
 assert page.evaluate('JSON.stringify(S.nest)')==nest_before
 page.locator('#rep280').screenshot(path=str(OUT/'representative-battle.png'))
 page.evaluate('STAR_SAVE_CORE.save("balance-rep")');page.reload(wait_until='load');page.wait_for_timeout(600);assert page.evaluate('JSON.stringify(S.rep280.lastBattle280)')==battle
 report['representative_battle_repeat_reload_no_roster_mutation']=True;print('PASS full-season progression and representatives',flush=True)
 # Adopt next generation through the real breeding UI; training stays locked until adoption.
 page.evaluate('Math.random=()=>.5');page.locator('.tabs [data-v="breed"]').click();settle(page)
 for i in range(3):
  page.locator('#breeders>.card').nth(0).tap(position={'x':12,'y':12});page.locator('#breeders>.card').nth(1).tap(position={'x':12,'y':12});page.locator('#breedBtn').click();page.locator('#hatch').click();close_reveals(page);settle(page)
 for i in range(3):page.locator('#cands>.card').nth(i).locator('.stage369').tap()
 page.locator('#adopt').click();settle(page);assert page.evaluate('S.generationActive&&!S.needsBreeding')
 report['next_generation_birth_adoption']=True
 # Fixture-assisted final match checks the actual annual champion -> planet -> LIMIT unlock path.
 page.evaluate('S.leagueRank=5;S.season=6;S.turn=3;Math.random=()=>.5;S.nest.forEach(m=>{for(const k in m.stats)m.stats[k]=999;m.hidden233={...m.hidden233,clutch:3,stability:3,luck:3}});S.assign={};S.annual233={generation:S.generation233,league:5,season:6,recorded:{"6":{rank:1,pts:10}},table:[{id:"you",name:"あなた",pts:60,wins:6},...Array.from({length:7},(_,i)=>({id:"npc"+i,name:"相手"+i,pts:0,wins:0}))]};render()');settle(page)
 page.locator('.tabs [data-v="meet"]').click();settle(page);page.evaluate('STAR_ANNUAL233.annualFinish()');settle(page)
 page.locator('#annualNext233').click();settle(page);assert page.evaluate('S.planetRepresentative233&&!S.limit278.released')
 page.locator('#run').click();page.wait_for_function('!S.planetRepresentative233');assert page.evaluate('S.planetRepresentativeWon233&&S.limit278.released'),page.evaluate('({text:document.getElementById("result").textContent,nest:S.nest.map(m=>m.hidden233)})');page.wait_for_timeout(800);close_reveals(page);settle(page)
 report['planet_final_unlock']={'fixture':True,'realMatch':True,'released':True}
 # LIMIT training is then verified on the actual unlocked state.
 page.evaluate('S.limit278.shown=true;document.getElementById("limitRelease278")?.remove();S.nest.forEach(m=>{for(const k in m.stats)m.stats[k]=1200});S.limit279={energy:4,lastEnergyAt:Date.now()-15*60*1000,sessions:0,alloc:Object.fromEntries(S.nest.map((m,i)=>[m.id,i?0:4])),target:Object.fromEntries(S.nest.map(m=>[m.id,"speed"]))};render()');settle(page)
 page.locator('.tabs [data-v="train"]').click();settle(page)
 before=page.evaluate('S.nest.map(m=>({id:m.id,speed:m.stats.speed,gain:m.trainingGain226.speed}))');clock=page.evaluate('S.limit279.lastEnergyAt')
 page.locator('#limitGo279').click();settle(page)
 after=page.evaluate('S.nest.map(m=>({id:m.id,speed:m.stats.speed,gain:m.trainingGain226.speed}))')
 assert after[0]['speed']>before[0]['speed'] and after[0]['speed']-before[0]['speed']==after[0]['gain']-before[0]['gain']
 assert after[1:]==before[1:] and page.evaluate('S.limit279.energy')==3 and page.evaluate('S.limit279.lastEnergyAt')==clock
 page.locator('#limitTrain279').screenshot(path=str(OUT/'limit-training.png'))
 page.evaluate('S.nest.forEach(m=>{for(const k in m.stats)m.stats[k]=3000});render()');settle(page);energy=page.evaluate('S.limit279.energy');sessions=page.evaluate('S.limit279.sessions');assert page.locator('#limitGo279').is_disabled();page.evaluate("document.getElementById('limitGo279').dispatchEvent(new MouseEvent('click',{bubbles:true}))");settle(page);assert page.evaluate('S.limit279.energy')==energy and page.evaluate('S.limit279.sessions')==sessions
 page.evaluate('S.nest[0].stats.speed=3500;render()');settle(page);assert page.evaluate('S.nest[0].stats.speed')==3500
 report['limit_participant_journal_clock_no_waste_overcap']=True
 for width in (320,390,414):
  page.set_viewport_size({'width':width,'height':844});settle(page);assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),width
 assert not errors,errors;assert not missing,missing
 report.update(errors=errors,missing=missing,device='isolated Chromium',physicalSafari=False)
 (OUT/'balance-flow.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False));b.close()
