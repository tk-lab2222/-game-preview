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
function placePair321(){
  const breed=document.getElementById('breed');if(!breed)return;
  const parentBox=[...breed.querySelectorAll(':scope>.box')].find(x=>x.querySelector('#breeders'));
  const pair=[...breed.querySelectorAll(':scope>.box')].find(x=>x.querySelector('#breedBtn'));
  if(parentBox&&pair&&parentBox.nextElementSibling!==pair)parentBox.insertAdjacentElement('afterend',pair);
}
function visualShell321(){
  const breed=document.getElementById('breed');if(!breed)return;
  const pair=[...breed.querySelectorAll(':scope>.box')].find(x=>x.querySelector('#breedBtn'));if(!pair)return;
  placePair321();
  pair.dataset.state=S.egg?'incubating':S.parents?.length===2?'ready':'choosing';
  pair.classList.add('breedHero126');
  const title=pair.querySelector('h3');if(title)title.innerHTML='星をつなぐ配合 <span class="sm">'+(S.egg?'新しい命を待っています':'親から子へ、個性をつなぐ')+'</span>';
  const parents=pair.querySelector('.parents');
  if(parents){
    parents.classList.add('parentsHero126');
    if(!pair.querySelector('.core126')){
      const core=document.createElement('div');core.className='core126';core.innerHTML='<i>✦</i><b>NEST CORE</b>';
      parents.insertBefore(core,parents.children[1]||null);
    }
  }
  const btn=pair.querySelector('#breedBtn');
  if(btn){
    btn.textContent=S.parents?.length===2?'この2体から、スターを誕生させる':'まずは、親を2体選ぼう';
    btn.classList.add('breedMain126');
    const p=btn.closest('p');if(p)p.classList.add('singleBreed321');
  }
}
function copy321(){
  const section=document.getElementById('breed');
  const first=section?.querySelector(':scope > .box');
  const h=first?.querySelector('h3');
  const sm=h?.nextElementSibling;
  if(!h||!sm)return;
  first.classList.toggle('incubatingLab321',!!S.egg);
  if(pristine321()){
    h.textContent='この出会いから、はじまる。';
    sm.textContent='最初の2体をタップして、新しい血統を育てよう。';
  }else{
    h.textContent='個性をつなぐ、次の世代。';
    sm.textContent='どの個性を受け継ごう？ 親にする2体を選ぼう。';
  }
}
function slot321(m,label){
  if(!m)return `<div class="slotEmpty321"><b>${label}</b><span>アスリートを選択</span></div>`;
  const sp=(typeof SP!=='undefined'&&SP[m.species])?SP[m.species][0]:(m.species||'');
  return `<div class="slotFilled321">${typeof avatar==='function'?avatar(m):''}<div class="slotMeta321"><small>${label}</small><b>${m.name||'NO NAME'}</b><span>${sp} ・ ${m.rarity||'C'}</span><em>${m.personality||''}</em></div></div>`;
}
function bindParent321(card,id){
  card.setAttribute('role','button');card.tabIndex=0;
  card.setAttribute('aria-pressed',S.parents.includes(id)?'true':'false');
  card.onkeydown=e=>{if(e.target===card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();card.click()}};
  card.onclick=e=>{
    if(e?.target?.closest?.('button,select,a,details'))return;
    e?.preventDefault?.();
    e?.stopPropagation?.();
    S.parents=Array.isArray(S.parents)?S.parents.filter(Boolean):[];
    if(S.parents.includes(id))S.parents=S.parents.filter(x=>x!==id);
    else if(S.parents.length<2)S.parents.push(id);
    else S.parents=[S.parents[1],id];
    try{typeof save200==='function'&&save200()}catch(_){}
    sync321();
    if(S.parents.length===2){
      const pair=document.getElementById('breedBtn')?.closest('.breedHero126');
      pair?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
    }
  };
}
function singleBreed321(){
  if(S.egg||!Array.isArray(S.parents)||S.parents.length!==2)return;
  const pool=pool321(),a=pool.find(x=>x?.id===S.parents[0]),b=pool.find(x=>x?.id===S.parents[1]);
  if(!a||!b||typeof baby!=='function')return;
  S.egg=baby(a,b);
  const egg=document.getElementById('egg'),birth=document.getElementById('birth'),hatch=document.getElementById('hatch');
  if(egg)egg.innerHTML='<div class="eggPulse">🥚</div><div class="sparkRing">✦　✦　✦</div>';
  if(birth)birth.innerHTML='<div class="sm hatchHint">卵が動いている…！</div>';
  if(hatch)hatch.disabled=false;
  try{typeof save200==='function'&&save200()}catch(_){}
  try{render()}catch(_){sync321()}
  requestAnimationFrame(()=>{const h=document.getElementById('hatch');if(h&&S.egg)h.disabled=false});
}
function bindSingleBreed321(){
  const btn=document.getElementById('breedBtn');if(!btn)return;
  if(btn.dataset.singleBreed321==='1')return;
  btn.dataset.singleBreed321='1';
  btn.addEventListener('click',e=>{
    if(btn.disabled)return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    singleBreed321();
  },true);
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
    let details=el.querySelector('.parentInfo321');
    if(!details){
      details=document.createElement('details');details.className='parentInfo321';
      details.innerHTML='<summary>能力と血統を見る</summary>';
      bd.appendChild(details);
    }
    details.insertAdjacentHTML('beforeend',genetics321(m));
    bindParent321(el,m.id);
  });

  const bp=pool;
  const pa=document.getElementById('pa'),pb=document.getElementById('pb');
  const a=bp.find(x=>x.id===S.parents[0]),b=bp.find(x=>x.id===S.parents[1]);
  if(pa){pa.innerHTML=slot321(a,'親①');pa.classList.toggle('filled321',!!a)}
  if(pb){pb.innerHTML=slot321(b,'親②');pb.classList.toggle('filled321',!!b)}
  host.querySelectorAll(':scope > .card[data-id]').forEach(el=>{
    const idx=S.parents.indexOf(el.dataset.id);
    let tag=el.querySelector('.pairTag321');
    if(idx>=0){
      if(!tag){tag=document.createElement('div');tag.className='pairTag321';el.appendChild(tag)}
      tag.textContent=idx===0?'親①':'親②';
    }else tag?.remove();
  });

  const btn=document.getElementById('breedBtn');
  if(btn){
    let mx=3;try{mx=typeof cap==='function'?cap():3}catch(_){}
    btn.disabled=S.parents.length!==2||!!S.egg||(S.cands||[]).length>=mx;
  }
}
function compatibility321(){
  const section=document.getElementById('breed');if(!section)return;
  let box=document.getElementById('compat321');
  if(!box){
    box=document.createElement('div');box.id='compat321';box.className='compat321';
    const parents=section.querySelector('.parents');
    (parents||section.querySelector(':scope>.box'))?.after(box);
  }
  if(!box)return;
  const pool=pool321(),a=pool.find(x=>x.id===S.parents?.[0]),b=pool.find(x=>x.id===S.parents?.[1]);
  if(!a||!b){
    box.innerHTML='<div class="compatEmpty321"><b>どんなスターに、出会えるだろう。</b><span>親を2体選ぶと、相性が分かります。</span></div>';
    return;
  }
  let info=null;
  try{info=window.STAR_ANNUAL233?.compatibility?.(a,b)||null}catch(_){}
  if(!info)return;
  let label='';try{label=window.STAR_ANNUAL233?.compatLabel?.(info.total)||''}catch(_){}
  box.innerHTML=`<div class="compatHead321"><div><small>BREEDING CHEMISTRY</small><b>配合相性 ${info.total}<em>/100</em></b></div><strong>${label}</strong></div>
    <div class="compatBar321"><i style="width:${info.total}%"></i></div>
    <div class="compatBreak321">
      <span>種族 <b>${info.species}</b></span><span>性格 <b>${info.personality}</b></span><span>能力補完 <b>${info.ability}</b></span>
      <span>血統 <b>${info.blood}</b></span><span>特徴 <b>${info.visual}</b></span><span>遺伝相性 <b>${info.chemistry}</b></span>
    </div>`;
}
function archive321(){
  const host=document.getElementById('lineagePool');if(!host)return;
  const box=host.closest('.box'),cand=document.getElementById('candBox'),breed=document.getElementById('breed');
  if(box){
    const h=box.querySelector('h3');
    if(h&&!box.dataset.archiveNamed){
      const count=h.querySelector('.sm');
      h.innerHTML='📚 血統アーカイブ ';
      if(count)h.appendChild(count);
      box.dataset.archiveNamed='1';
    }
    const desc=box.querySelector(':scope > .sm:last-child');
    if(desc&&!box.dataset.archiveDesc){
      desc.textContent='過去世代の採用個体を保管する場所です。必要な個体だけ残し、親候補としていつでも呼び戻せます。';
      box.dataset.archiveDesc='1';
    }
    box.classList.add('lineageArchive118');
    if(breed&&cand&&cand.nextElementSibling!==box)breed.insertBefore(box,cand.nextSibling);
  }
  host.querySelectorAll('[data-release]').forEach(btn=>{
    const id=btn.dataset.release,card=btn.closest('.card');
    if(card&&id)card.dataset.id=id;
  });
}
function sync321(){
  if(syncing321)return;
  syncing321=true;
  try{
    visualShell321();
    copy321();
    breeders321();
    bindSingleBreed321();
    compatibility321();
    archive321();
    try{window.STAR_LINEAGE271?.sync?.()}catch(_){}
    try{window.STAR_RARE273?.sync?.()}catch(_){}
    try{window.STAR_ULTRA274?.sync?.()}catch(_){}
    try{window.STAR_SKILL254?.sync?.()}catch(_){}
    try{window.STAR_UI369?.sync?.()}catch(_){}
    placePair321();
  }finally{syncing321=false}
}
function late321(){[60,180,500].forEach(ms=>setTimeout(sync321,ms))}

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

const breedRoot321=document.getElementById('breed');
if(breedRoot321){
  new MutationObserver(()=>{if(!syncing321)requestAnimationFrame(placePair321)})
    .observe(breedRoot321,{childList:true});
}
const breedersHost=document.getElementById('breeders');
if(breedersHost){
  new MutationObserver(()=>{if(!syncing321)setTimeout(sync321,0)})
    .observe(breedersHost,{childList:true});
}
window.addEventListener('pageshow',late321);

const css=document.createElement('style');
css.id='breedingOwner321';
css.textContent=`
.parentInfo321{margin-top:10px;border-top:1px solid #a3c2aa33}.parentInfo321>summary{min-height:44px;padding:13px 2px;color:#bed5c1;font-size:11px;cursor:pointer;list-style-position:inside}.parentInfo321>summary:focus-visible{outline:2px solid #d3d9a6;outline-offset:2px}.parentInfo321[open]{padding-bottom:8px}.parentInfo321 .starDetails360,.parentInfo321 .parentGenetics321{font-size:11px}
body .a .breedHero126{background:linear-gradient(150deg,#203b2a,#10271d)!important;border:1px solid #abc5a83a!important;color:#e5eee0!important;box-shadow:none!important;padding:20px!important}.breedHero126 h3{font-size:17px}.breedHero126 h3 .sm{display:block;font-size:11px;margin-top:6px;color:#a8ba9f}.parentsHero126{display:grid;grid-template-columns:1fr 38px 1fr;gap:8px;align-items:center}.breedHero126[data-state=choosing] .parentsHero126,.breedHero126[data-state=choosing] .compat321{display:none}.breedHero126 .breedStrip128{display:none}.breedHero126[data-state=incubating]{background:linear-gradient(180deg,#112519bb,#092016ed),url('../star-athletes/assets/stellar-lab.png') center/cover!important}.breedHero126[data-state=incubating] .parentsHero126,.breedHero126[data-state=incubating] .compat321,.breedHero126[data-state=incubating] .singleBreed321,.breedHero126[data-state=incubating] .batchBreed260{display:none}
.core126{display:grid;place-items:center;color:#e9d1a1}.core126 i{font-style:normal;font-size:26px}.core126 b{display:none}.singleBreed321{margin:15px 0 0}.singleBreed321:before{display:none}body .a .breedMain126{font-size:13px!important;padding:16px 10px!important;border-radius:14px!important;background:linear-gradient(125deg,#f0ddad,#d6ba7f)!important;color:#253a29!important;box-shadow:0 3px 20px #e8cf8318!important;border:1px solid #f0e2b6!important}.breedHero126:not([data-state=incubating]) #egg,.breedHero126:not([data-state=incubating]) #hatch{display:none!important}body .a #hatch{margin-top:12px;background:#eddbb0!important;color:#1a3022!important}
.compat321{margin-top:14px;padding:13px;background:#e3e8c707;border:1px solid #b6ceac24;border-radius:14px;color:#e0e6cd}.compatHead321{display:flex;justify-content:space-between;gap:6px;align-items:center}.compatHead321 small{display:block;font-size:8px;letter-spacing:.12em;color:#9fb999;margin-bottom:7px}.compatHead321 b{font-size:20px;color:#d8dcad}.compatHead321 b em{font-size:10px;font-style:normal;color:#b8c3a4}.compatHead321 strong{font-size:10px;color:#e6dcaf;background:#c8c68d14;padding:6px 8px;border-radius:8px}.compatBar321{height:5px;background:#7d98622b;border-radius:5px;overflow:hidden;margin:12px 0}.compatBar321 i{display:block;height:100%;background:linear-gradient(90deg,#9fbf8e,#e9d997)}.compatBreak321{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.compatBreak321 span{font-size:10px;color:#b9c9ad;display:flex;justify-content:space-between;padding:4px 0}.compatEmpty321 b{font-size:13px}.compatEmpty321 span{display:block;font-size:11px;color:#aebc9f;margin-top:6px}
#pa,#pb{min-height:115px!important;display:block!important;background:#a7c49d08!important;color:#dce7cb!important;border:1px solid #b6cba526!important;border-radius:14px}.slotFilled321{display:flex;flex-direction:column;align-items:center;padding:10px 4px}.slotFilled321 .avatar{height:80px!important;width:100%;border:0!important;background:transparent!important}.slotMeta321{display:flex;flex-direction:column;align-items:center;gap:3px;padding:5px}.slotMeta321 small{font-size:9px;color:#b2c7a1}.slotMeta321 b{font-size:13px}.slotMeta321 span{font-size:9px;color:#a5b69a}.slotMeta321 em{display:none}.slotEmpty321{padding:22px 7px;font-size:11px;color:#9eaf95;display:flex;flex-direction:column;gap:8px}.slotEmpty321 span{font-size:10px}.pairTag321{position:absolute;right:8px;top:8px;z-index:12;background:#d9dfac;color:#244333;border:0;border-radius:8px;padding:4px 7px;font-size:9px;font-weight:700}.lineageArchive118>h3{display:flex;justify-content:space-between;align-items:center}.lineageArchive118:before{display:none}
#breeders .parentLineage271>.hidden271{display:none}.parentGenetics321{margin-top:12px;padding-top:12px;border-top:1px solid #aac9aa26}.pgHead321{display:flex;justify-content:space-between;gap:6px}.pgHead321 b{font-size:11px;color:#d5e6c7}.pgHead321 small{display:none}.pgGrid321{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin-top:9px}.pgGrid321 span{display:flex;justify-content:space-between;gap:4px;font-size:10px;padding:5px;background:#99b0900d;border-radius:5px;color:#a8c19e}.pgGrid321 b{font-size:11px;color:#dbebc9}.parentGenetics321>em{display:block;margin-top:8px;font-size:10px;color:#b5c5a6;font-style:normal}
`;
document.head.appendChild(css);

late321();
window.STAR_BREEDING321={sync:sync321,pool:pool321,pristine:pristine321,compatibility:compatibility321,archive:archive321,singleBreed:singleBreed321};
})();
