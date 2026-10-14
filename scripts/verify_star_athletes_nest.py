"""Verify actual Nest browsing, read-only snapshots and selection→training.
Actual births/adoption/training; isolated saved-lineage/art boundary fixtures marked.
Mobile Chromium only; no enjoyment or physical Safari claim.
"""
import argparse,json,mimetypes,re,shutil
from pathlib import Path
from urllib.parse import unquote,urlparse
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
ap=argparse.ArgumentParser();ap.add_argument('--output',type=Path,default=Path('/tmp/star-nest'));ap.add_argument('--compare-from',type=Path);args=ap.parse_args();OUT=args.output;OUT.mkdir(parents=True,exist_ok=True)
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
 c.add_init_script('let qa=84008;Math.random=()=>{qa=(Math.imul(qa,1664525)+1013904223)>>>0;return qa/4294967296}')
 if save:c.add_init_script('for(const [k,v] of Object.entries('+json.dumps(save)+'))localStorage.setItem(k,v)')
 p=c.new_page();p.set_default_timeout(12000);p.on('pageerror',lambda e:errors.append(str(e)));p.on('response',lambda r:missing.append(r.url) if r.status>=400 else None);p.goto('https://games.local/star-athletes/');p.wait_for_timeout(1200);return c,p

def settle(p):p.wait_for_timeout(750)
def core(p):return p.evaluate('JSON.stringify({nest:S.nest,lineage:S.lineage,stars:S.myStars323,coins:S.coins,parents:S.parents,turn:S.turn,probe:S.galleryProbe})')
def textmetrics(p):
 return p.evaluate('''()=>{const root=document.getElementById('nest201');let text='';const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(n.parentElement.closest('script,style,option'))continue;const closed=n.parentElement.closest('details:not([open])');if(closed&&!closed.querySelector(':scope>summary')?.contains(n))continue;const r=document.createRange();r.selectNode(n);if([...r.getClientRects()].some(x=>x.width&&x.height))text+=n.textContent.trim()}return{characters:[...text].filter(c=>c.trim()).length,height:root.scrollHeight}}''')
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path=shutil.which('chromium'),args=['--no-sandbox','--disable-dev-shm-usage']);c,p=context(b)
 p.locator('.tabs [data-v="nest201"]').click();settle(p);assert p.locator('#nestGallery201 .nestEmpty201').count()==1;p.screenshot(path=str(OUT/'nest-empty.png'));p.locator('[data-nest-go201="breed"]').click();settle(p)
 for i in range(3):
  for n in (0,1):p.locator('#breeders>.card').nth(n).tap(position={'x':12,'y':12})
  p.locator('#breedBtn').click();p.locator('#hatch').click();settle(p)
  for sel in ('[data-close277]','[data-close350]','#abilityResult352 button','[data-close278]'):
   if p.locator(sel).count():p.locator(sel).first.click()
 for i in range(3):p.locator('#cands>.card').nth(i).locator('.stage369').tap()
 p.locator('#adopt').click();settle(p);p.evaluate('S.galleryProbe={nested:{keep:true}};STAR_SAVE_CORE.save("nest-qa")');p.screenshot(path=str(OUT/'training-first.png'))
 assert p.evaluate('document.getElementById("train").firstElementChild.contains(document.getElementById("plans"))')
 assert p.evaluate('document.getElementById("season119").parentElement===document.getElementById("sched").closest(".box")')
 ids=p.evaluate('S.nest.map(m=>m.id)');before=core(p);save=p.evaluate('Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)]))')
 p.locator('.tabs [data-v="nest201"]').click();settle(p);p.screenshot(path=str(OUT/'nest-after.png'),full_page=True);p.screenshot(path=str(OUT/'nest-viewport.png'));aftermetric=textmetrics(p)
 assert p.locator('[data-nest-pick201]').count()==3
 assert p.locator('#nestFacilities201').get_attribute('open') is None and p.locator('#nestRecords201').get_attribute('open') is None
 for id in ids:
  p.locator('[data-nest-pick201="'+id+'"]').click();settle(p);assert p.locator('[data-nest-pick201="'+id+'"]').get_attribute('aria-pressed')=='true';assert p.locator('.nestName201 h2').inner_text()==p.evaluate('(id)=>S.nest.find(m=>m.id===id).name',id)
 for group in ('lineage','stars','team'):
  p.locator('[data-nest-group201="'+group+'"]').click();settle(p)
 p.locator('#nestFacilities201>summary').click();settle(p);p.locator('#nestFacilities201>summary').click();assert core(p)==before,'Browsing changed canonical collections or coins'
 # Selection reaches210's actual focused athlete without a second training owner.
 p.locator('[data-nest-pick201="'+ids[1]+'"]').click();p.locator('[data-nest-go201="train"]').click();settle(p);assert p.locator('#plans>.train210:visible').get_attribute('data-athlete210')==ids[1]
 p.locator('.tabs [data-v="nest201"]').click();settle(p);p.locator('#nestGallery201 [data-my-star323]').click();settle(p);assert p.evaluate('S.myStars323[0].sourceId')==ids[1]
 archived=p.evaluate('JSON.stringify(S.myStars323[0].athlete.stats)');p.locator('[data-nest-group201="stars"]').click();settle(p);p.screenshot(path=str(OUT/'nest-my-star.png'));p.locator('[data-nest-go201="hall323"]').click();settle(p);assert p.locator('#hall323').is_visible()
 p.locator('.tabs [data-v="train"]').click();settle(p);p.locator('#doTrain263').click();settle(p);assert p.evaluate('S.turn')==1;assert p.evaluate('JSON.stringify(S.myStars323[0].athlete.stats)')==archived
 p.locator('.tabs [data-v="nest201"]').click();settle(p);p.locator('[data-nest-group201="team"]').click();p.locator('[data-nest-pick201="'+ids[1]+'"]').click();p.locator('.nestProfile201>summary').click();settle(p)
 shown=p.locator('.nestStats201 b').all_text_contents();assert shown==p.evaluate('Object.keys(SL).map(k=>String(S.nest[1].stats[k]))');p.screenshot(path=str(OUT/'nest-trained-profile.png'))
 # Read-only saved archive fixture: display a historical record without adopting or releasing it.
 p.evaluate('S.lineage=[{...JSON.parse(JSON.stringify(S.nest[0])),id:"saved-lineage-fixture",name:"アーカイブ確認",futureField:{keep:true}}];STAR_SAVE_CORE.save("archive-display-fixture");STAR_NEST201.sync()');settle(p);original=core(p);p.locator('[data-nest-group201="lineage"]').click();settle(p);assert p.locator('.nestName201 h2').inner_text()=='アーカイブ確認';assert core(p)==original
 p.reload();settle(p);p.locator('.tabs [data-v="nest201"]').click();settle(p);assert p.evaluate('S.galleryProbe.nested.keep&&S.lineage[0].futureField.keep');p.locator('[data-nest-group201="stars"]').click();settle(p);assert p.evaluate('JSON.stringify(S.myStars323[0].athlete.stats)')==archived
 # Existing protected save is still accessible through the native disclosure.
 p.locator('#nestRecords201>summary').click();p.locator('#protect352').click();settle(p);assert p.locator('#restore352').is_enabled()
 for width in (320,390,414):
  p.set_viewport_size({'width':width,'height':844});settle(p);assert p.evaluate('document.documentElement.scrollWidth<=innerWidth')
 # Four art boundary fixtures, including late image painters and long manual names.
 p.evaluate('S.lineage=["draco","unil","grimo","puru"].map((species,i)=>({...JSON.parse(JSON.stringify(S.nest[0])),id:"art-fixture-"+i,species,name:i===3?"長い手動名の表示確認あいうえおかきくけこ":"表示確認"+i}));STAR_NEST201.sync()');settle(p);p.locator('[data-nest-group201="lineage"]').click();settle(p)
 for i in range(4):
  p.locator('[data-nest-pick201="art-fixture-'+str(i)+'"]').click();settle(p);assert p.locator('.nestPortrait201').evaluate('(el)=>{const img=el.querySelector("img");if(img)return img.complete&&img.naturalWidth>0;const c=el.querySelector("canvas");return !!c&&Array.from(c.getContext("2d").getImageData(0,0,c.width,c.height).data).some((v,i)=>i%4===3&&v>0)}');assert p.evaluate('document.documentElement.scrollWidth<=innerWidth')
 beforemetric=None
 if args.compare_from:
  bc,bp=context(b,save,args.compare_from);bp.locator('.tabs [data-v="nest201"]').click();settle(bp);beforemetric=textmetrics(bp);bp.screenshot(path=str(OUT/'nest-before.png'),full_page=True);bc.close()
 assert not errors,errors;assert not missing,missing
 report={'version':re.search(r'STAR ATHLETES (v[0-9.]+)',(ROOT/'star-athletes-v112/index.html').read_text()).group(1),'actualBirthsAdoptionTraining':True,'emptyNestRoute':True,'threeAthleteBrowsingReadOnly':True,'selectedAthleteToCanonicalTraining':True,'trainingFirstInDOM':True,'seasonShellOwnHost':True,'facilitiesNoSpendOnOpen':True,'myStarSnapshotIndependentOfLaterTraining':True,'protectedSaveDisclosureAccessible':True,'unknownNestedFieldsReloadPreserved':True,'savedLineageFixture':True,'fourArtAndLongNameBoundaryFixtures':True,'viewportWidths':[320,390,414],'defaultNestMetricBefore':beforemetric,'defaultNestMetricAfter':aftermetric,'physicalSafari':False,'errors':errors,'missing':missing}
 (OUT/'nest-flow.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False));b.close()
