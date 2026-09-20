(()=>{
'use strict';
// v0.31.62: authoritative breeder genetics visibility + generation-aware breeding copy.
const RK320=['G','F','E','D','C','B','A','S'];
function n320(v){return Number(v)||0}
function rank320(v){
 const n=Number(v);
 return Number.isFinite(n)?RK320[Math.max(0,Math.min(7,Math.round(n)))]:'?';
}
function parentPool320(){
 try{
   if(typeof breederPool==='function')return breederPool();
 }catch(_){}
 const out=[],seen=new Set();
 for(const key of ['starters','lineage','nest']){
   for(const m of(S?.[key]||[])){
     if(m?.id&&!seen.has(m.id)){seen.add(m.id);out.push(m)}
   }
 }
 return out;
}
function hiddenHtml320(m){
 const h=m?.hidden233||{};
 return `<div class="parentGenetics320">
   <div class="pgHead320"><b>🧬 遺伝情報</b><small>親選びで重要</small></div>
   <div class="pgGrid320">
    <span>成長力 <b>${rank320(h.growth)}</b></span>
    <span>遺伝力 <b>${rank320(h.heredity)}</b></span>
    <span>勝負強さ <b>${rank320(h.clutch)}</b></span>
    <span>安定性 <b>${rank320(h.stability)}</b></span>
    <span>変異因子 <b>${rank320(h.mutation)}</b></span>
    <span>LUCK <b>${rank320(h.luck)}</b></span>
   </div>
   <em>気性 ${h.temperament||'?'}</em>
  </div>`;
}
function syncParents320(){
 const pool=parentPool320(),valid=new Set(pool.map(m=>m.id));
 if(Array.isArray(S?.parents)){
   const next=S.parents.filter(id=>valid.has(id));
   if(next.length!==S.parents.length)S.parents=next;
 }
 document.querySelectorAll('#breeders .card[data-id]').forEach(card=>{
   const m=pool.find(x=>x.id===card.dataset.id);if(!m)return;
   const host=card.querySelector('.bd')||card;
   let box=host.querySelector('.parentGenetics320');
   if(!box){
     host.insertAdjacentHTML('beforeend',hiddenHtml320(m));
     box=host.querySelector('.parentGenetics320');
   }else{
     const wrap=document.createElement('div');
     wrap.innerHTML=hiddenHtml320(m);
     box.replaceWith(wrap.firstElementChild);
   }
 });
 const breedBtn=document.getElementById('breedBtn');
 if(breedBtn)breedBtn.disabled=(S?.parents||[]).length!==2||!!S?.egg||(S?.cands||[]).length>=(typeof cap==='function'?cap():3);
 // Keep the older lineage/special-birth decorations alive too.
 try{window.STAR_LINEAGE271?.sync?.()}catch(_){}
 try{window.STAR_ULTRA274?.sync?.()}catch(_){}
 try{window.STAR_RARE273?.sync?.()}catch(_){}
}
function pristine320(){
 const gen=Math.max(1,n320(S?.generation233)||n320(S?.generation232)||1);
 return gen===1
   && !(S?.lineage||[]).length
   && !(S?.lineage||[]).length
   && !(S?.cands||[]).length
   && n320(S?.wins)===0
   && ((S?.starters||[]).length===2||(S?.nest||[]).length===2);
}
function syncCopy320(){
 const section=document.getElementById('breed');if(!section)return;
 const firstBox=section.querySelector(':scope > .box');if(!firstBox)return;
 const h=firstBox.querySelector('h3');
 const sm=h?.nextElementSibling;
 if(!h||!sm)return;
 if(pristine320()){
   h.textContent='🎁 最初の2体を受け取りました';
   sm.textContent='この2体が最初の祖先です。2体をタップして最初の子を誕生させよう。';
 }else{
   h.textContent='🧬 配合する親を選ぶ';
   sm.textContent='親候補から2体を選択。能力だけでなく、遺伝力・変異因子・LUCKなどの遺伝情報も確認しよう。';
 }
}
function sync320(){
 syncCopy320();
 syncParents320();
}
function late320(){[0,40,120,300,700].forEach(ms=>setTimeout(sync320,ms))}
try{
 const prev=render;
 render=function(){const out=prev();late320();return out};
}catch(e){console.warn('render320',e)}
document.addEventListener('click',e=>{
 if(e.target?.closest?.('#lineagePool [data-release],#breeders .card,.tab[data-v="breed"],#adopt,#batchGo260,#hatch')){
   late320();
 }
},true);
window.addEventListener('pageshow',late320);
const css=document.createElement('style');
css.id='breederGenetics320';
css.textContent=`
#breeders .parentLineage271>.hidden271{display:none!important}
.parentGenetics320{margin-top:7px;padding-top:7px;border-top:1px dashed #b8c5d0}
.pgHead320{display:flex;justify-content:space-between;align-items:center;gap:6px}
.pgHead320 b{font-size:7px;color:#30485f}
.pgHead320 small{font-size:6px;color:#7a8793}
.pgGrid320{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;margin-top:5px}
.pgGrid320 span{display:flex;justify-content:space-between;gap:3px;padding:4px 5px;border:1px solid #ccd6df;border-radius:7px;background:#f8fafc;font-size:6px;white-space:nowrap}
.pgGrid320 span b{font-size:7px;color:#1f3041}
.parentGenetics320>em{display:block;margin-top:4px;font-size:6px;font-style:normal;color:#657787}
`;
document.head.appendChild(css);
late320();
window.STAR_BREEDER320={sync:late320};
})();