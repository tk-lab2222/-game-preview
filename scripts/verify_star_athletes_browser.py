"""Exercise the shipped STAR ATHLETES source in a mobile Chromium browser.

Requires Python 3.12+, playwright, and Chromium (or playwright install chromium).
Run: python scripts/verify_star_athletes_browser.py --output /tmp/star-athletes-qa
Screenshots and verified-flow.json are written to --output; no game saves leave
this isolated browser context. This is not a Safari/device/production-site test.
"""
import argparse
import json
import mimetypes
import os
import re
import shutil
from pathlib import Path
from urllib.parse import unquote, urlparse

from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', type=Path, default=Path('/tmp/star-athletes-qa'))
parser.add_argument('--compare-from', type=Path, help='Optional pre-change source files for a same-save typography comparison')
args = parser.parse_args()
ROOT = Path(__file__).resolve().parents[1]
OUT = args.output.resolve()
OUT.mkdir(parents=True, exist_ok=True)
baseline_mode = args.compare_from is not None


def serve(route):
    url = urlparse(route.request.url)
    if url.hostname != 'games.local':
        route.abort()
        return
    target = (ROOT / unquote(url.path).lstrip('/')).resolve()
    if not target.is_relative_to(ROOT):
        route.fulfill(status=403, body='Forbidden')
        return
    if target.is_dir():
        target /= 'index.html'
    if baseline_mode:
        previous = args.compare_from.resolve() / target.relative_to(ROOT)
        if previous.is_file():
            target = previous
    if not target.is_file():
        route.fulfill(status=404, body='Missing game asset: ' + str(target.relative_to(ROOT)))
        return
    route.fulfill(status=200, body=target.read_bytes(),
                  content_type=mimetypes.guess_type(target.name)[0] or 'text/plain')

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or shutil.which('chromium') or shutil.which('chromium-browser'),headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
    context=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,service_workers='block',reduced_motion='reduce')
    context.route('**/*',serve)
    page=context.new_page();page.set_default_timeout(10000)
    errors=[];missing=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.on('response',lambda r:missing.append(r.url) if r.status>=400 else None)
    page.goto('https://games.local/star-athletes/',wait_until='load');page.wait_for_timeout(1000)
    if baseline_mode:
        page.evaluate('async()=>{await document.fonts.ready}')
        page.screenshot(path=str(OUT/'typography-before.png'))
        original_ids=page.evaluate('S.starters.map(m=>m.id)')
        original_names=page.evaluate('S.starters.map(m=>m.name)')
        baseline_mode=False
        page.reload(wait_until='load')
        page.wait_for_timeout(1000)
        assert page.evaluate('S.starters.map(m=>m.id)')==original_ids
        assert page.evaluate('S.starters.map(m=>m.name)')==original_names, 'Saved names were changed during startup'
    page.evaluate('async()=>{await document.fonts.ready}')
    fonts=page.evaluate('[...document.fonts].filter(f=>f.status==="loaded").map(f=>({family:f.family,weight:f.weight}))')
    assert any(f['family'].strip(chr(34))=='Stellar Text' for f in fonts),fonts
    assert any(f['family'].strip(chr(34))=='Stellar Display' for f in fonts),fonts
    assert {f['weight'] for f in fonts if f['family'].strip(chr(34))=='Stellar Text'} >= {'400','600','700'},fonts
    assert page.locator('.labScene>h3,.sceneEyebrow,.journey').count()==0
    assert page.locator('#breeders .nm b').first.evaluate('(el)=>getComputedStyle(el).fontWeight')=='700'
    assert not errors,errors
    assert not missing,missing
    assert page.locator('#recoveryDiag200,#recoveryDiag3281').count()==0
    assert page.evaluate('S===window.S')
    assert page.evaluate('(()=>{const nodes=[...document.querySelectorAll("#breeders .athlete369 > .avatar,#breeders .athlete369 > .art")];STAR_UI369.sync();return nodes.length===2&&nodes.every(n=>n.isConnected&&n.closest(".athlete369"))})()'), 'Character art nodes were replaced'
    assert page.locator('#breeders .athlete369 canvas').evaluate_all('(nodes)=>nodes.every(c=>Array.from(c.getContext("2d").getImageData(0,0,c.width,c.height).data).some((v,i)=>i%4===3&&v>0))'), 'A character canvas is blank'
    summary=page.locator('#breeders .parentInfo321 > summary').first
    summary.click()
    assert page.locator('#breeders .parentInfo321').first.evaluate('(el)=>el.open')
    assert page.evaluate('S.parents.length')==0
    summary.click()
    assert page.locator('.tabs > .tab').count()==4
    for destination in ('dex','hall323','mission203','rep285'):
        page.get_by_role('button',name='研究ノートとメニュー').click()
        page.wait_for_function('document.getElementById("labJournal").open')
        assert page.locator('#journalNav .tab').count()==4
        page.locator(f'#journalNav [data-v="{destination}"]').click()
        assert page.locator(f'#{destination}').is_visible()
        assert not page.evaluate('document.getElementById("labJournal").open')
        page.locator('.tabs [data-v="breed"]').click()
    page.wait_for_timeout(500)
    page.locator('#labRecords>summary').click()
    page.wait_for_timeout(1000)
    assert page.locator('#recordsBody321 #research276').is_visible()
    assert page.locator('#recordsBody321 .lineageArchive118').is_visible()
    assert page.evaluate('S.parents.length')==0
    page.locator('#labRecords>summary').click()
    page.screenshot(path=str(OUT/'athletes-viewport-after.png'))
    page.screenshot(path=str(OUT/'athletes-after.png'),full_page=True)
    print('PASS initial load: no errors or failed assets, live character art retained, diagnostics hidden, canonical state identity preserved.',flush=True)
    for index in range(3):
        for parent in range(2):page.locator('#breeders > .card').nth(parent).tap(position={'x':15,'y':15})
        page.wait_for_function('S.parents.length===2')
        page.locator('#breedBtn').click();page.wait_for_function('!!S.egg')
        page.locator('#hatch').click();page.wait_for_function(f'!S.egg&&S.cands.length==={index+1}')
        if index==0:page.locator('#birth').screenshot(path=str(OUT/'athletes-birth-after.png'))
        print(f'PASS parent selection, breeding and hatch {index+1}.',flush=True)
    assert page.evaluate('S.cands.every(m=>m.rareSkillRolled347===true)')
    generated_names=page.evaluate('S.cands.map(m=>m.name)')
    assert len(set(generated_names))==3 and all(re.fullmatch('[ァ-ヶー・]+',name) for name in generated_names),generated_names
    page.wait_for_timeout(500)
    candidate_summary=page.locator('#cands .athleteInfo369 > summary').first
    candidate_summary.click()
    assert page.locator('#cands .athleteInfo369').first.evaluate('(el)=>el.open')
    assert page.evaluate('S.sel.length')==0
    candidate_summary.click()
    page.wait_for_timeout(300)
    for index in range(3):
        card=page.locator('#cands > .card').nth(index)
        card.locator('.stage369').tap()
        page.wait_for_function(f'S.sel.length==={index+1}')
    page.wait_for_function('S.sel.length===3')
    page.wait_for_timeout(600)
    assert page.evaluate('innerWidth===390&&document.documentElement.scrollWidth===390'), 'Candidate/archive content expanded the mobile viewport'
    page.locator('#adopt').click()
    page.wait_for_function('S.nest.length===3&&S.cands.length===0')
    ids=page.evaluate('S.nest.map(m=>m.id)')
    page.once('dialog',lambda d:d.accept('カスタム名'))
    page.locator('#train [data-rename224="'+ids[0]+'"]').first.click()
    assert page.evaluate('S.nest[0].name')=='カスタム名'
    page.evaluate("S.qualityProbe={nested:{preserved:true}};STAR_SAVE_CORE.save('quality-flow')")
    page.locator('#doTrain263').click();page.wait_for_function('S.turn===1')
    page.reload(wait_until='load');page.wait_for_timeout(700)
    assert page.evaluate('S===window.S')
    assert page.evaluate('S.nest.map(m=>m.id)')==ids
    assert page.evaluate('S.nest[0].name')=='カスタム名', 'Manual name did not survive reload'
    assert page.evaluate('S.turn')==1
    assert page.evaluate('S.qualityProbe.nested.preserved')
    print('PASS adoption, first training round and reload preserve roster IDs, progress and unknown nested state.',flush=True)
    if page.locator('[data-event267="b"]').count():
        page.locator('[data-event267="b"]').click()
    fatigue_before=page.evaluate('S.nest.map(m=>Number(S.training263.fatigue[m.id])||0)')
    page.evaluate("S.nest.forEach(m=>S.training263.intensity[m.id]='high')")
    page.locator('#doTrain263').click();page.wait_for_function('S.turn===2')
    assert page.evaluate('S.nest.map(m=>S.training263.fatigue[m.id])')==[min(2,x+1) for x in fatigue_before]
    page.wait_for_timeout(300)
    if page.locator('[data-event267="b"]').count():
        page.locator('[data-event267="b"]').click()
    fatigue_before=page.evaluate('S.nest.map(m=>Number(S.training263.fatigue[m.id])||0)')
    page.evaluate("S.nest.forEach(m=>S.training263.intensity[m.id]='safe')")
    page.locator('#doTrain263').click();page.wait_for_function('S.turn===3')
    assert page.evaluate('S.nest.map(m=>S.training263.fatigue[m.id])')==[max(0,x-1) for x in fatigue_before]
    print('PASS high-load fatigue increments once; safe training recovers once.',flush=True)
    page.wait_for_timeout(300)
    if page.locator('[data-event267="b"]').count():
        page.locator('[data-event267="b"]').click()
    page.locator('#toMeet').click();page.locator('#run').click()
    page.wait_for_function('(S.seasonHistory||[]).length>0');page.wait_for_timeout(500)
    page.screenshot(path=str(OUT/'athletes-tournament-after.png'),full_page=True)
    print('PASS first tournament produces a persisted result.',flush=True)
    page.evaluate('STAR_PRETEST352.protect(true)')
    page.evaluate("S.qualityProbe.nested.preserved=false;STAR_SAVE_CORE.save('restore-fixture')")
    page.on('dialog',lambda d:d.accept())
    assert page.evaluate('STAR_PRETEST352.restore()')
    assert page.evaluate('S===window.S&&S.qualityProbe.nested.preserved')
    assert page.evaluate('S.nest.map(m=>m.id)')==ids
    primary=page.evaluate("localStorage.getItem('star-athletes-save-v200')")
    print('PASS explicit protected-save restore preserves state identity and complete roster.',flush=True)
    backup_context=browser.new_context(viewport={'width':390,'height':844},service_workers='block')
    backup_context.route('**/*',serve)
    backup_context.add_init_script("localStorage.setItem('star-athletes-save-v200','{broken');localStorage.setItem('star-athletes-save-v200-backup',"+json.dumps(primary)+");")
    bp=backup_context.new_page()
    bp.on('pageerror',lambda e:errors.append(str(e)))
    bp.on('response',lambda r:missing.append(r.url) if r.status>=400 else None)
    bp.goto('https://games.local/star-athletes-v112/',wait_until='load');bp.wait_for_timeout(700)
    assert bp.evaluate('S===window.S&&S.qualityProbe.nested.preserved')
    assert bp.evaluate('S.nest.map(m=>m.id)')==ids
    print('PASS malformed primary recovers valid backup without splitting canonical state.',flush=True)
    for width in (320,390,414):
        responsive=browser.new_context(viewport={'width':width,'height':844},is_mobile=True,has_touch=True,service_workers='block',reduced_motion='reduce')
        responsive.route('**/*',serve)
        rp=responsive.new_page()
        rp.on('pageerror',lambda e:errors.append(str(e)))
        rp.goto('https://games.local/star-athletes/',wait_until='load');rp.wait_for_timeout(500)
        rp.evaluate('async()=>{await document.fonts.ready}')
        assert rp.evaluate('document.documentElement.scrollWidth<=innerWidth'), f'Horizontal overflow at {width}px'
        rp.goto('https://games.local/',wait_until='load')
        links=rp.locator('a.card').evaluate_all('(nodes)=>nodes.map(n=>n.getAttribute("href"))')
        assert links==['./star-athletes/','./doodle-dash/','./starfire-pinball/','https://star-climb.tkms-ponoe.chatgpt.site'], links
        assert rp.evaluate('document.documentElement.scrollWidth<=innerWidth')
        responsive.close()
    print('PASS disclosure does not select parents; game and hub fit 320/390/414px; hub has all four destinations.',flush=True)
    naming=page.evaluate("""()=>{const before=JSON.stringify(S),names=Object.keys(SP).flatMap(sp=>Array.from({length:48},()=>STAR_NAMES.generate(sp)));return {names,stateUnchanged:JSON.stringify(S)===before}}""")
    assert naming['stateUnchanged'] and len(set(naming['names']))==192
    assert all(re.fullmatch('[ァ-ヶー・]+',name) and len(name)<=8 for name in naming['names'])
    gallery_context=browser.new_context(viewport={'width':390,'height':1200},device_scale_factor=2,is_mobile=True,has_touch=True,service_workers='block',reduced_motion='reduce')
    gallery_context.route('**/*',serve)
    gp=gallery_context.new_page()
    gp.on('pageerror',lambda e:errors.append(str(e)))
    gp.on('response',lambda r:missing.append(r.url) if r.status>=400 else None)
    gp.goto('https://games.local/star-athletes/',wait_until='load')
    gp.evaluate('async()=>{await document.fonts.ready}')
    gp.evaluate('S.starters=Object.keys(SP).map(sp=>monster(sp));render()')
    gp.add_style_tag(content='#breeders{grid-auto-flow:row!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;grid-auto-columns:auto!important;overflow:visible!important}')
    gp.wait_for_timeout(1500)
    art=gp.evaluate("""async()=>{const out=[];for(const sp of Object.keys(SP)){const im=new Image();im.src='../star-athletes/assets/creatures/'+sp+'.png?v=3403';await im.decode();out.push({species:sp,width:im.naturalWidth,height:im.naturalHeight})}return out}""")
    assert len(art)==4 and all(im['width']>=1024 and im['height']>=1024 for im in art),art
    assert gp.locator('#breeders canvas.speciesCanvas').evaluate_all('(nodes)=>nodes.length===3&&nodes.every(c=>c.width>0&&Array.from(c.getContext("2d").getImageData(0,0,c.width,c.height).data).some((v,i)=>i%4===3&&v>0))')
    assert gp.locator('#breeders .dracoStableImg329').evaluate('(el)=>el.complete&&el.naturalWidth>=1024')
    gp.screenshot(path=str(OUT/'four-species-after.png'))
    gallery_context.close()
    print('PASS new names are unique without numeric suffixes; manual naming survives reload; all four high-resolution sprites render.',flush=True)
    assert not errors,errors
    assert not missing,missing
    report={'errors':errors,'missing':missing,'roster_ids_preserved':True,'training_reload_preserved':True,'protected_restore_preserved':True,'backup_recovery_identity_preserved':True,'newborn_rare_skill_marker':True,'disclosure_does_not_select_parents':True,'responsive_widths':[320,390,414],'hub_destinations':4,'main_navigation_count':4,'journal_destinations_verified':['dex','hall323','mission203','rep285'],'candidate_disclosure_does_not_select':True,'candidate_viewport_width':390,'loaded_fonts':fonts,'same_save_typography_comparison':args.compare_from is not None,'generated_names':generated_names,'generated_name_sample_unique':192,'manual_name_reload_preserved':True,'records_disclosure_verified':True,'high_resolution_art':art,'metrics':page.evaluate('({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:innerHeight,scrollHeight:document.documentElement.scrollHeight})')}
    (OUT/'verified-flow.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
    print(json.dumps(report,ensure_ascii=False),flush=True)
    browser.close()
