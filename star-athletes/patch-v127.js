(()=>{
const EGG127={C:['#f7f1df','#d6cab0'],U:['#dff7ff','#77c9ef'],R:['#e5f3ff','#5b8cff'],SR:['#eee5ff','#9a6cff'],SSR:['#fff3c7','#ffbe2e'],UR:['#fff0fa','#ff66c4'],EX:['#ffffff','#7df7ff']};
let hatching127=false;
function tone127(r){return EGG127[r]||EGG127.C}
function decorateEgg127(){
 const egg=document.getElementById('egg');if(!egg)return;
 egg.classList.add('eggStage127');
 if(!S.egg){egg.classList.remove('shinyEgg127');return}
 const r=S.egg.rarity||'C',c=tone127(r);
 egg.style.setProperty('--eggA',c[0]);egg.style.setProperty('--eggB',c[1]);
 egg.dataset.rarity=r;egg.classList.toggle('shinyEgg127',!!S.egg.shiny);
 egg.innerHTML=`<div class="eggAura127"></div><div class="eggShell127"><span>🥚</span><i>${r}${S.egg.shiny?' ✨':''}</i></div><div class="eggStars127">✦　✧　✦</div>`;
}
function result127(m){
 const birth=document.getElementById('birth');if(!birth||!m)return;
 const stats=Object.entries(m.stats||{}).map(([k,v])=>`<span><small>${SL?.[k]||k}</small><b>${v}</b></span>`).join('');
 const sp=SP?.[m.species]?.[0]||m.species||'';
 birth.classList.add('birthStage128');birth.dataset.rarity=m.rarity||'C';
 birth.innerHTML=`<div class="hatchReveal hatchReveal127">
   <div class="revealBeam127"></div>
   <div class="resultBadge128">${['SSR','UR','EX'].includes(m.rarity)?'★ SPECIAL BIRTH ★':'NEW ATHLETE'}</div>
   <div class="newbornLabel">BORN FROM THE NEST</div>
   <div class="hatchArt127">${typeof avatar==='function'?avatar(m,true):''}</div>
   <div class="hatchName"><b>${m.name||'ATHLETE'}</b><span>${m.rarity||'C'}</span></div>
   <div class="hatchMeta">${sp} ・ G${m.gen??0} ・ ${m.personality||''}</div>
   <div class="hatchStats127">${stats}</div>
   <div class="inheritBox"><b>🧬 継承</b><br>親：${m.origin||'ネスト'}<br>見た目：${m.visual?.color||'-'} / ${m.visual?.pattern||'-'} / ${m.visual?.part||'-'}${m.visual?.acc&&m.visual.acc!=='なし'?' / '+m.visual.acc:''}</div>
 </div>`;
 try{window.paintSpecies&&window.paintSpecies()}catch(_){}
 try{window.STAR_SKILL254?.renderHatch?.()}catch(_){}
}
function commit127(m){
 if(!m)return;
 if(!Array.isArray(S.cands))S.cands=[];
 if(!S.cands.some(x=>x?.id===m.id))S.cands.push(m);
 S.dex=S.dex||{};S.dex.b=(Number(S.dex.b)||0)+1;
 S.breedCount=(Number(S.breedCount)||0)+1;
 S.egg=null;S.parents=[];
 try{typeof save200==='function'&&save200()}catch(_){}
 try{render()}catch(_){}
 result127(m);
 try{window.STAR_SKILL254?.sync?.()}catch(_){}
}
function hatch127(e){
 if(!S.egg||hatching127)return;
 e?.preventDefault?.();e?.stopPropagation?.();e?.stopImmediatePropagation?.();
 hatching127=true;
 const m=S.egg,hatch=document.getElementById('hatch'),egg=document.getElementById('egg');
 if(hatch)hatch.disabled=true;
 if(!egg){commit127(m);hatching127=false;return}
 egg.classList.remove('hatchPulse127','hatchCrack127','hatchBurst127');
 void egg.offsetWidth;egg.classList.add('hatchPulse127');
 setTimeout(()=>egg.classList.add('hatchCrack127'),330);
 setTimeout(()=>egg.classList.add('hatchBurst127'),760);
 setTimeout(()=>{
   commit127(m);
   egg.classList.remove('hatchPulse127','hatchCrack127','hatchBurst127');
   egg.innerHTML='<div class="hatchAfter127">✦</div>';
   hatching127=false;
 },1280);
}
function bind127(){
 const hatch=document.getElementById('hatch');if(!hatch||hatch.dataset.owner127==='1')return;
 hatch.dataset.owner127='1';
 hatch.addEventListener('click',hatch127,true);
}
const prevRender127=render;
render=function(){const out=prevRender127();bind127();requestAnimationFrame(decorateEgg127);return out};
const css=document.createElement('style');css.textContent=`
.eggStage127{position:relative!important;min-height:158px!important;display:grid!important;place-items:center!important;overflow:hidden!important;border-radius:20px!important;background:radial-gradient(circle at 50% 48%,var(--eggA,#fff8e9),#111b2c 72%)!important;perspective:600px}
.eggShell127{position:relative;z-index:4;text-align:center;animation:eggFloat127 1.7s ease-in-out infinite alternate}.eggShell127 span{display:block;font-size:76px;filter:drop-shadow(0 12px 15px #0007) drop-shadow(0 0 18px var(--eggB,#ffd78a))}.eggShell127 i{display:inline-block;margin-top:-5px;padding:3px 9px;border-radius:999px;background:#10131a;color:#fff;font-style:normal;font-size:9px;font-weight:1000;box-shadow:0 0 14px var(--eggB,#ffd78a)}
.eggAura127{position:absolute;z-index:1;width:145px;height:145px;border-radius:50%;border:2px solid var(--eggB,#ffd78a);box-shadow:0 0 26px var(--eggB,#ffd78a),inset 0 0 24px var(--eggB,#ffd78a);opacity:.55;animation:aura127 1.15s ease-in-out infinite alternate}.eggStars127{position:absolute;z-index:2;color:var(--eggB,#ffd78a);font-size:20px;letter-spacing:12px;opacity:.5;animation:stars127 2.4s linear infinite}
.shinyEgg127{outline:3px solid #fff19a;box-shadow:0 0 30px #ffe86f77!important}
.hatchPulse127 .eggShell127{animation:heart127 .22s ease-in-out 3}.hatchPulse127 .eggAura127{animation:charge127 .65s ease-out forwards}
.hatchCrack127 .eggShell127:before,.hatchCrack127 .eggShell127:after{content:'';position:absolute;z-index:8;left:50%;top:19px;width:5px;background:#5b4530;border-radius:4px;box-shadow:0 0 3px #fff}.hatchCrack127 .eggShell127:before{height:32px;transform:translateX(-10px) rotate(26deg);animation:crackGrow127 .22s ease-out}.hatchCrack127 .eggShell127:after{height:27px;transform:translateX(9px) translateY(22px) rotate(-31deg);animation:crackGrow127 .25s ease-out}.hatchCrack127 .eggShell127 span{animation:shake127 .09s linear infinite!important}
.hatchBurst127:before{content:'';position:absolute;z-index:9;inset:0;background:radial-gradient(circle,#fff 0 12%,var(--eggB,#7df7ff) 24%,transparent 62%);animation:flash127 .52s ease-out forwards}.hatchBurst127 .eggShell127{animation:open127 .52s cubic-bezier(.2,.85,.2,1) forwards!important}.hatchBurst127 .eggAura127{animation:burst127 .52s ease-out forwards!important}.hatchBurst127 .eggStars127{animation:starBurst127 .52s ease-out forwards!important}
.hatchAfter127{font-size:58px;color:#fff;text-shadow:0 0 18px #7df7ff;animation:after127 .5s ease-out forwards}
.hatchReveal127{position:relative;overflow:hidden;animation:revealIn127 .46s cubic-bezier(.15,.8,.25,1) both}.revealBeam127{position:absolute;left:50%;top:-35%;width:110px;height:170%;transform:translateX(-50%) rotate(14deg);background:linear-gradient(90deg,transparent,#ffffff44,transparent);animation:beam127 1.6s ease-out both;pointer-events:none}.hatchArt127{height:190px;display:grid;place-items:center}.hatchArt127 .avatar{height:190px!important;width:100%!important;border:0!important;background:transparent!important}.hatchStats127{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin:9px 0}.hatchStats127 span{padding:6px;border:1px solid #ffffff24;border-radius:9px;background:#ffffff0d;text-align:center}.hatchStats127 small,.hatchStats127 b{display:block}.hatchStats127 small{font-size:6px;color:#b7cee1}.hatchStats127 b{font-size:11px;color:#fff}
@keyframes eggFloat127{to{transform:translateY(-6px) rotate(2deg)}}@keyframes aura127{to{transform:scale(1.12);opacity:.85}}@keyframes stars127{to{transform:rotate(360deg)}}@keyframes heart127{50%{transform:scale(1.10)}}@keyframes charge127{to{transform:scale(1.45);opacity:1;box-shadow:0 0 55px var(--eggB)}}@keyframes crackGrow127{from{height:0;opacity:0}to{opacity:1}}@keyframes shake127{25%{transform:translateX(-5px) rotate(-4deg)}75%{transform:translateX(5px) rotate(4deg)}}@keyframes flash127{0%{opacity:0}45%{opacity:1}100%{opacity:0}}@keyframes open127{0%{transform:scale(1)}55%{transform:scale(1.15)}100%{transform:scale(1.9);opacity:0;filter:brightness(3)}}@keyframes burst127{to{transform:scale(2.7);opacity:0}}@keyframes starBurst127{to{transform:scale(3) rotate(80deg);opacity:0}}@keyframes after127{from{transform:scale(.3);opacity:0}to{transform:scale(1);opacity:1}}@keyframes revealIn127{from{opacity:0;transform:translateY(20px) scale(.96)}to{opacity:1;transform:none}}@keyframes beam127{from{opacity:0;transform:translateX(-50%) translateY(-25%) rotate(14deg)}35%{opacity:1}to{opacity:0;transform:translateX(-50%) translateY(30%) rotate(14deg)}}
`;document.head.appendChild(css);bind127();setTimeout(()=>{try{render()}catch(e){console.error(e)}},0);
window.STAR_HATCH127={hatch:hatch127,renderResult:result127};
})();