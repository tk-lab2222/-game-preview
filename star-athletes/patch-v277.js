(()=>{
// v0.29.0 / M4.4: miracle birth share card.
// Dedicated celebratory result for ultra-rare or special-lineage births. No external posting is automatic.
const SAVE277='star-athletes-save-v200';
const STAT277=['power','speed','stamina','agility','tech','guts'];
const SK277={power:'豪腕',speed:'疾風',stamina:'鉄肺',agility:'軽業',tech:'精密',guts:'勝負魂'};
function n277(v){return Number(v)||0}
function all277(){return [...(S.cands||[]),...(S.nest||[]),...(S.lineage||[]),...(S.starters||[])]}
function special277(m){return m?.ultraRare274||m?.specialLineage273||null}
function level277(m){
 if(m?.ultraRare274){
   const ids=['ex','mutation','miracle','mythic'];
   return 10+Math.max(0,ids.indexOf(m.ultraRare274.id));
 }
 return m?.specialLineage273?5:0;
}
function chance277(m){
 const x=m?.ultraRare274?.chance??m?.specialLineage273?.chance;
 return Number.isFinite(Number(x))?Number(x):null;
}
function chanceText277(m){
 const c=chance277(m);if(c===null)return '推定非公開';
 const p=c*100;
 if(p<.00001)return p.toFixed(6)+'%';
 if(p<.001)return p.toFixed(4)+'%';
 if(p<.1)return p.toFixed(3)+'%';
 return p.toFixed(2)+'%';
}
function skills277(m){
 const a=Array.isArray(m?.skills233)?m.skills233:[];
 return a.length?a.map(k=>SK277[k]||k).join(' / '):'未取得';
}
function lineage277(m){
 return m?.specialLineage273?.name||m?.lineageTitle271?.name||m?.origin||'ネスト血統';
}
function rareName277(m){return m?.ultraRare274?.name||m?.specialLineage273?.name||m?.rarity||'SPECIAL'}
function benefit277(m){
 if(m?.ultraRare274?.benefit)return m.ultraRare274.benefit;
 const id=m?.ultraRare274?.id;
 return {
  ex:'子の隠れ素質 上振れ判定UP',
  mutation:'特殊血統レシピ成立率UP',
  miracle:'奇跡因子を低確率で子へ継承',
  mythic:'上振れ・特殊血統・奇跡因子継承を強化'
 }[id]||'';
}
function save277(){try{localStorage.setItem(SAVE277,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function shown277(){
 if(!S.share277||typeof S.share277!=='object')S.share277={shown:{}};
 if(!S.share277.shown)S.share277.shown={};
 return S.share277.shown;
}
function shareText277(m){
 const top=STAT277.slice().sort((a,b)=>n277(m.stats?.[b])-n277(m.stats?.[a]))[0];
 return [
   'STAR ATHLETES — 奇跡の誕生',
   `${m.name} / ${m.rarity} / G${n277(m.gen)}`,
   `${rareName277(m)} / 推定出生確率 ${chanceText277(m)}`,
   `得意: ${SL?.[top]||top} ${n277(m.stats?.[top])}`,
   `SKILL: ${skills277(m)}`,
   `血統: ${lineage277(m)}`
 ].join('\n');
}
async function share277(m,btn){
 const text=shareText277(m),url=location.href.split('?')[0];
 try{
   if(navigator.share){await navigator.share({title:'STAR ATHLETES 奇跡の誕生',text,url});return}
 }catch(e){if(e?.name==='AbortError')return}
 try{
   await navigator.clipboard.writeText(text+'\n'+url);
   if(btn){const old=btn.textContent;btn.textContent='コピーしました';setTimeout(()=>btn.textContent=old,1400)}
 }catch(_){
   if(btn){const old=btn.textContent;btn.textContent='共有文を選択してコピー';setTimeout(()=>btn.textContent=old,1600)}
 }
}
function close277(){document.getElementById('miracle277')?.remove()}
function card277(m){
 const sp=typeof SP!=='undefined'&&SP[m.species]?SP[m.species][0]:m.species||'';
 const statHtml=STAT277.map(k=>`<span><small>${SL?.[k]||k}</small><b>${n277(m.stats?.[k])}</b></span>`).join('');
 const ultra=!!m.ultraRare274;
 return `<div class="miracleBackdrop277" id="miracle277"><section class="miracleShell277 ${ultra?'ultra277':'special277'}">
   <button type="button" class="close277" data-close277>×</button>
   <div class="eyebrow277">${ultra?'MIRACLE BIRTH':'SPECIAL BLOODLINE'}</div>
   <h2>${ultra?'✦ 奇跡の誕生 ✦':'✦ 特殊血統誕生 ✦'}</h2>
   <div class="shareCard277">
     <div class="rarity277"><span><small>通常レア度</small><b>${m.rarity||'-'}</b></span><strong><small>特殊誕生</small><b>${rareName277(m)}</b></strong></div>
     <div class="art277">${typeof avatar==='function'?avatar(m,true):''}</div>
     <div class="name277"><b>${m.name}</b><span>${sp} ・ G${n277(m.gen)}</span></div>
     <div class="odds277"><small>SPECIAL BIRTH RATE</small><b>${chanceText277(m)}</b><em>この「特殊誕生ランク」を引く推定確率</em></div>
     <div class="benefit277">${benefit277(m)?`<small>SPECIAL BLOODLINE EFFECT</small><b>✨ ${benefit277(m)}</b>`:''}</div><div class="stats277">${statHtml}</div>
     <div class="meta277"><span>SKILL</span><b>${skills277(m)}</b></div>
     <div class="meta277"><span>血統</span><b>${lineage277(m)}</b></div>
   </div>
   <div class="actions277"><button type="button" class="btn or" data-share277="${m.id}">共有する</button><button type="button" class="btn" data-close277>閉じる</button></div>
   <small class="privacy277">共有はボタンを押した時だけ実行されます。自動投稿はしません。</small>
 </section></div>`;
}
function show277(m){
 if(!m?.id||!special277(m)||document.getElementById('miracle277'))return;
 shown277()[m.id]=Date.now();save277();
 document.body.insertAdjacentHTML('beforeend',card277(m));
 try{window.paintSpecies&&window.paintSpecies()}catch(_){}
}
function scan277(){
 const shown=shown277();
 const fresh=all277().filter(m=>m?.id&&special277(m)&&!shown[m.id]).sort((a,b)=>level277(b)-level277(a));
 if(fresh[0])setTimeout(()=>show277(fresh[0]),120);
}
window.addEventListener('click',e=>{
 const close=e.target?.closest?.('[data-close277]');if(close){e.preventDefault();close277();return}
 const sh=e.target?.closest?.('[data-share277]');if(sh){e.preventDefault();const m=all277().find(x=>x.id===sh.dataset.share277);if(m)share277(m,sh);return}
 if(e.target?.closest?.('#batchGo260,#hatch'))[350,900,1400].forEach(ms=>setTimeout(scan277,ms));
},true);
function late277(){scan277()}
try{const prev277=render;render=function(){const out=prev277();setTimeout(late277,0);return out}}catch(e){console.warn('render277',e)}
const css=document.createElement('style');css.textContent=`
.miracleBackdrop277{position:fixed;inset:0;z-index:99999;background:#050812dc;display:flex;align-items:center;justify-content:center;padding:18px;overflow:auto}
.miracleShell277{position:relative;width:min(430px,100%);border-radius:22px;padding:16px;background:linear-gradient(155deg,#10182d,#1f2740 55%,#33224a);color:#fff;box-shadow:0 18px 80px #000a,0 0 45px #9f7cff55;border:1px solid #ffffff28}
.miracleShell277.ultra277{background:radial-gradient(circle at 50% 0,#57326c,#151a31 42%,#0b1020);box-shadow:0 18px 80px #000a,0 0 55px #c56cff88}
.close277{position:absolute;right:10px;top:9px;width:32px;height:32px;border:0;border-radius:50%;background:#ffffff18;color:#fff;font-size:20px}
.eyebrow277{text-align:center;font-size:7px;letter-spacing:.22em;color:#9eeaff;font-weight:1000}.miracleShell277 h2{text-align:center;margin:4px 0 12px;font-size:19px}
.shareCard277{position:relative;overflow:hidden;border-radius:18px;padding:13px;background:linear-gradient(145deg,#f8fbff,#fff8df);color:#172033;border:2px solid #d8b85a;box-shadow:inset 0 0 30px #fff}
.shareCard277:before{content:'';position:absolute;inset:-40%;background:conic-gradient(transparent,#7eeaff24,transparent,#ff7cd424,transparent);animation:spin277 8s linear infinite;pointer-events:none}@keyframes spin277{to{transform:rotate(360deg)}}
.shareCard277>*{position:relative;z-index:1}.rarity277{display:flex;justify-content:space-between;align-items:center}.rarity277 span,.rarity277 strong{display:grid;gap:1px}.rarity277 span{background:#172033;color:#ffe171;border-radius:9px;padding:4px 8px}.rarity277 span small,.rarity277 strong small{font-size:5px;font-weight:900;opacity:.72}.rarity277 span b{font-size:18px}.rarity277 strong{font-size:9px;color:#774d00;text-align:right}.rarity277 strong b{font-size:10px}
.art277{height:175px;margin:7px 0}.art277 .avatar,.art277 .bigArt{height:175px!important;border:0!important;background:transparent!important}.name277{text-align:center}.name277 b{display:block;font-size:22px}.name277 span{font-size:8px;color:#667}
.odds277{text-align:center;margin:9px 0;padding:8px;border-radius:10px;background:#172033;color:#fff}.odds277 small{display:block;font-size:6px;color:#91dcff}.odds277 b{font-size:19px;color:#ffe273}.odds277 em{display:block;margin-top:2px;font-size:6px;font-style:normal;color:#c8d5e9}.benefit277{margin:7px 0;padding:7px 8px;border:1px solid #d9b64f;border-radius:9px;background:#fff3be;text-align:center}.benefit277:empty{display:none}.benefit277 small{display:block;font-size:5px;color:#886600}.benefit277 b{font-size:8px;color:#5b4300}
.stats277{display:grid;grid-template-columns:repeat(3,1fr);gap:5px}.stats277 span{display:flex;justify-content:space-between;border:1px solid #ccd6df;border-radius:8px;padding:5px;background:#fff}.stats277 small{font-size:6px}.stats277 b{font-size:9px}
.meta277{display:grid;grid-template-columns:46px 1fr;gap:6px;margin-top:6px;padding-top:6px;border-top:1px dashed #c9b86b;font-size:7px}.meta277 span{font-weight:1000;color:#785b16}.meta277 b{text-align:right}
.actions277{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:11px}.actions277 .btn{width:100%}.privacy277{display:block;text-align:center;margin-top:7px;font-size:6px;color:#aeb8ca}
`;document.head.appendChild(css);setTimeout(scan277,0);
})();