(()=>{
'use strict';
// v0.31.64: authoritative breeding-screen owner.
// One place owns breeder candidates, parent selection, hidden genetics, first-generation copy,
// and post-release hydration so older async patches cannot strip breeding information.
if(window.STAR_BREEDING321)return;

const RK321=['G','F','E','D','C','B','A','S'];
let syncing321=false;

function n321(v){return Number(v)||0}
function rank321(v){
  const n=Number(v);
  return Number.isFinite(n)?RK321[Math.max(0,Math.min(7,Math.round(n)))]:'?';
}
function pool321(){
  const out=[],seen=new Set();
  for(const key of ['starters','lineage','nest']){
    for(const m of(S?.[key]||[])){
      if(m?.id&&!seen.has(m.id)){seen.add(m.id);out.push(m)}
    }
  }
  return out;
}
function ensureHidden321(m){
  try{window.STAR_ANNUAL233?.ensureHidden?.(m)}catch(_){}
  return m?.hidden233||{};
}
function genetics321(m){
  const h=ensureHidden321(m);
  return `<div class="parentGenetics321">
    <div class="pgHead321"><b>🧬 遺伝情報</b><small>親選びで重要</small></div>
    <div class="pgGrid321">
      <span>成長力 <b>${rank321(h.growth)}</b></span>
      <span>遺伝力 <b>${rank321(h.heredity)}</b></span>
      <span>勝負強さ <b>${rank321(h.clutch)}</b></span>
      <span>安定性 <b>${rank321(h.stability)}</b></span>
      <span>変異因子 <b>${rank321(h.mutation)}</b></span>
      <span>LUCK <b>${rank321(h.luck)}</b></span>
    </div>
    <em>気性 ${h.temperament||'?'}</em>
  </div>`;
}
function pristine321(){
  const generation=Math.max(1,n321(S?.generation233)||n321(S?.generation232)||1);
  return generation===1
    && n321(S?.dex?.b)===0
    && !(S?.nest||[]).length
    && !(S?.lineage||[]).length
    && !(S?.cands||[]).length
    && (S?.starters||[]).length===2;
}
function copy321(){
  const section=document.getElementById('breed');
  const first=section?.querySelector(':scope > .box');
  const h=first?.querySelector('h3');
  const sm=h?.nextElementSibling;
  if(!h||!sm)return;
  if(pristine321()){
    h.textContent='🎁 最初の2体を受け取りました';
    sm.textContent='この2体が最初の祖先です。2体をタップして最初の子を誕生させよう。';
  }else{
    h.textContent='🧬 配合する親を選ぶ';
    sm.textContent='親候補から2体を選択。能力だけでなく、遺伝力・変異因子・LUCKなどの遺伝情報も確認しよう。';
  }
}
function bindParent321(card,id){
  card.onclick=e=>{
    if(e?.target?.closest?.('button,select,a'))return;
    e?.preventDefault?.();
    try{
      if(typeof pickParent==='function'){pickParent(id);return}
    }catch(_){}
    S.parents=Array.isArray(S.parents)?S.parents:[];
    if(S.parents.includes(id))S.parents=S.parents.filter(x=>x!==id);
    else if(S.parents.length<2)S.parents.push(id);
    else S.parents=[S.parents[1],id];
    try{render()}catch(_){sync321()}
  };
}
function breeders321(){
  const host=document.getElementById('breeders');
  if(!host)return;
  const pool=pool321(),byId=new Map(pool.map(m=>[m.id,m]));
  S.parents=Array.isArray(S.parents)?S.parents.filter(id=>byId.has(id)).slice(0,2):[];

  const cards=[...host.querySelectorAll(':scope > .card[data-id]')];
  const ids=cards.map(x=>x.dataset.id);
  const want=pool.map(x=>x.id);
  const mismatch=ids.length!==want.length||want.some((id,i)=>ids[i]!==id);
  if(mismatch&&typeof card==='function'){
    host.innerHTML=pool.map(m=>card(m,'p')).join('');
  }

  host.querySelectorAll(':scope > .card[data-id]').forEach(el=>{
    const m=byId.get(el.dataset.id);if(!m)return;
    ensureHidden321(m);
    el.classList.toggle('sel',S.parents.includes(m.id));
    el.querySelectorAll('.parentGenetics320,.parentGenetics321').forEach(x=>x.remove());
    const bd=el.querySelector('.bd')||el;
    bd.insertAdjacentHTML('beforeend',genetics321(m));
    bindParent321(el,m.id);
  });

  const bp=pool;
  for(const [i,id] of (S.parents||[]).entries()){
    const slot=document.getElementById(i?'pb':'pa'),m=bp.find(x=>x.id===id);
    if(slot&&m&&typeof avatar==='function')slot.innerHTML=`${avatar(m)}<b>${m.name}/${m.rarity}</b>`;
  }
  const pa=document.getElementById('pa'),pb=document.getElementById('pb');
  if(pa&&!S.parents[0])pa.textContent='①親';
  if(pb&&!S.parents[1])pb.textContent='②親';

  const btn=document.getElementById('breedBtn');
  if(btn){
    let mx=3;try{mx=typeof cap==='function'?cap():3}catch(_){}
    btn.disabled=S.parents.length!==2||!!S.egg||(S.cands||[]).length>=mx;
  }

  // v271's duplicate hidden block is legacy. Keep titles, but one genetics block only.
  host.querySelectorAll('.parentLineage271>.hidden271').forEach(x=>x.style.setProperty('display','none','important'));
}
function sync321(){
  if(syncing321)return;
  syncing321=true;
  try{
    copy321();
    breeders321();
    try{window.STAR_LINEAGE271?.sync?.()}catch(_){}
    try{window.STAR_RARE273?.sync?.()}catch(_){}
    try{window.STAR_ULTRA274?.sync?.()}catch(_){}
    // v271 may recreate its legacy hidden block after sync; keep it suppressed.
    document.querySelectorAll('#breeders .parentLineage271>.hidden271').forEach(x=>x.style.setProperty('display','none','important'));
  }finally{syncing321=false}
}
function late321(){[0,30,90,220,500,900].forEach(ms=>setTimeout(sync321,ms))}

try{
  const prev=render;
  render=function(){
    const out=prev();
    sync321();
    late321();
    return out;
  };
}catch(e){console.warn('render321',e)}

document.addEventListener('click',e=>{
  if(e.target?.closest?.('#lineagePool [data-release],#breeders .card,.tab[data-v="breed"],#adopt,#batchGo260,#hatch,#annualNext233,#next225')){
    late321();
  }
},true);

const breedersHost=document.getElementById('breeders');
if(breedersHost){
  new MutationObserver(()=>{if(!syncing321)setTimeout(sync321,0)})
    .observe(breedersHost,{childList:true});
}
window.addEventListener('pageshow',late321);

const css=document.createElement('style');
css.id='breedingOwner321';
css.textContent=`
#breeders .parentLineage271>.hidden271{display:none!important}
.parentGenetics321{margin-top:7px;padding-top:7px;border-top:1px dashed #b8c5d0}
.pgHead321{display:flex;justify-content:space-between;align-items:center;gap:6px}
.pgHead321 b{font-size:8px;color:#30485f}.pgHead321 small{font-size:6px;color:#7a8793}
.pgGrid321{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;margin-top:5px}
.pgGrid321 span{display:flex;justify-content:space-between;gap:3px;padding:4px 5px;border:1px solid #ccd6df;border-radius:7px;background:#f8fafc;font-size:7px;white-space:nowrap}
.pgGrid321 span b{font-size:8px;color:#1f3041}
.parentGenetics321>em{display:block;margin-top:4px;font-size:7px;font-style:normal;color:#657787}
.card.ex312 .parentGenetics321,.card.ex312 .parentGenetics321 *{color:#f6f1e6!important}
.card.ex312 .pgGrid321 span{background:rgba(255,255,255,.10)!important;border-color:rgba(255,255,255,.28)!important}
`;
document.head.appendChild(css);

late321();
window.STAR_BREEDING321={sync:sync321,pool:pool321,pristine:pristine321};
})();