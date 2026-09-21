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
function visualShell321(){
  const breed=document.getElementById('breed');if(!breed)return;
  const pair=[...breed.querySelectorAll(':scope>.box')].find(x=>x.querySelector('#breedBtn'));if(!pair)return;
  pair.classList.add('breedHero126');
  const title=pair.querySelector('h3');if(title)title.innerHTML='✨ スター配合 <span class="sm">2体の個性を次世代へ</span>';
  const parents=pair.querySelector('.parents');
  if(parents){
    parents.classList.add('parentsHero126');
    if(!pair.querySelector('.core126')){
      const core=document.createElement('div');core.className='core126';core.innerHTML='<i>✦</i><b>NEST CORE</b>';
      parents.insertBefore(core,parents.children[1]||null);
    }
  }
  pair.querySelector('.x')?.style.setProperty('display','none');
  const btn=pair.querySelector('#breedBtn');
  if(btn){
    btn.textContent=S.parents?.length===2?'✦ スター配合を開始':'親を2体選ぶ';
    btn.classList.add('breedMain126');
  }
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
function slot321(m,label){
  if(!m)return `<div class="slotEmpty321"><b>${label}</b><span>アスリートを選択</span></div>`;
  const sp=(typeof SP!=='undefined'&&SP[m.species])?SP[m.species][0]:(m.species||'');
  return `<div class="slotFilled321">${typeof avatar==='function'?avatar(m):''}<div class="slotMeta321"><small>${label}</small><b>${m.name||'NO NAME'}</b><span>${sp} ・ ${m.rarity||'C'}</span><em>${m.personality||''}</em></div></div>`;
}
function bindParent321(card,id){
  card.onclick=e=>{
    if(e?.target?.closest?.('button,select,a'))return;
    e?.preventDefault?.();
    try{
      if(typeof pickParent==='function'){pickParent(id);try{typeof save200==='function'&&save200()}catch(_){};return}
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
    box.innerHTML='<div class="compatEmpty321"><b>配合相性</b><span>親を2体選ぶと相性と継承期待を表示します</span></div>';
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
    const desc=box.querySelector('.sm:last-child');
    if(desc&&!box.dataset.archiveDesc){
      desc.textContent='過去世代の採用個体を保管する場所です。必要な個体だけ残し、親候補としていつでも呼び戻せます。';
      box.dataset.archiveDesc='1';
    }
    box.classList.add('lineageArchive118');
    if(breed&&cand&&cand.nextElementSibling!==box)breed.insertBefore(box,cand.nextSibling);
  }
  const list=Array.isArray(S.lineage)?S.lineage:[];
  const buttons=[...host.querySelectorAll('[data-release]')];
  buttons.forEach(btn=>{
    const id=btn.dataset.release;
    const card=btn.closest('.card');
    if(card&&id)card.dataset.id=id;
    btn.onclick=e=>{
      e?.preventDefault?.();
      e?.stopPropagation?.();
      if(!id)return;
      const m=list.find(x=>x?.id===id);
      if(!m)return;
      S.lineage=S.lineage.filter(x=>x?.id!==id);
      S.released=Array.isArray(S.released)?S.released:[];
      if(!S.released.some(x=>x?.id===id))S.released.push(m);
      S.dex=S.dex||{};S.dex.rel=(Number(S.dex.rel)||0)+1;
      try{typeof save200==='function'&&save200()}catch(_){}
      try{render()}catch(_){late321()}
    };
  });
}
function cleanupCompatHelp321(){
  const breed=document.getElementById('breed');if(!breed)return;
  const obsolete='親を2体選ぶと相性が表示されます';
  breed.querySelectorAll('*').forEach(el=>{
    if(el.children.length===0&&(el.textContent||'').replace(/\s+/g,' ').trim()===obsolete)el.remove();
  });
}
function sync321(){
  if(syncing321)return;
  syncing321=true;
  try{
    visualShell321();
    copy321();
    cleanupCompatHelp321();
    breeders321();
    compatibility321();
    archive321();
    try{window.STAR_LINEAGE271?.sync?.()}catch(_){}
    try{window.STAR_RARE273?.sync?.()}catch(_){}
    try{window.STAR_ULTRA274?.sync?.()}catch(_){}
    try{window.STAR_SKILL254?.sync?.()}catch(_){}
  }finally{syncing321=false}
}
function late321(){[30,90,220,500,900].forEach(ms=>setTimeout(sync321,ms))}

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
const breed321=document.getElementById('breed');
if(breed321){
  new MutationObserver(()=>cleanupCompatHelp321()).observe(breed321,{childList:true,subtree:true});
}
window.addEventListener('pageshow',late321);

const css=document.createElement('style');
css.id='breedingOwner321';
css.textContent=`
.breedHero126{position:relative;overflow:hidden;background:radial-gradient(circle at 50% 40%,#203c66 0,#111c32 48%,#080d17 100%)!important;color:#fff!important;border:0!important;box-shadow:0 15px 35px #0004!important}.breedHero126:before{content:'';position:absolute;inset:-30%;background:conic-gradient(from 0deg,transparent,#56d7ff19,transparent,#ff74c819,transparent);animation:spin126 14s linear infinite;pointer-events:none}@keyframes spin126{to{transform:rotate(360deg)}}.breedHero126>h3,.breedHero126>*{position:relative;z-index:1}.breedHero126 h3{color:#fff}.breedHero126 h3 .sm{color:#9bdfff!important}.parentsHero126{display:grid!important;grid-template-columns:1fr 74px 1fr!important;align-items:center!important;gap:8px!important}.parentsHero126 .par{min-height:150px!important;border:1px solid #ffffff38!important;border-radius:16px!important;background:#ffffff0c!important;color:#fff!important;overflow:hidden!important}.parentsHero126 .par .avatar{height:112px!important;background:transparent!important;border:0!important}.core126{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}.core126 i{display:grid;place-items:center;width:58px;height:58px;border-radius:50%;font-style:normal;font-size:28px;color:#fff7bc;background:radial-gradient(circle,#fff 0 6%,#65e5ff 7% 20%,#4c6cff 45%,#17244a 70%);box-shadow:0 0 16px #63ddff,0 0 35px #596bff88;animation:pulse126 1.5s ease-in-out infinite alternate}.core126 b{font-size:7px;letter-spacing:.12em;color:#a9dfff}@keyframes pulse126{to{transform:scale(1.08);filter:brightness(1.25)}}.breedMain126{width:100%;padding:13px!important;border-radius:12px!important;font-size:14px!important;background:linear-gradient(180deg,#68efff,#7869ff)!important;color:#07101b!important;border:1px solid #c6f8ff!important;box-shadow:0 0 20px #59dfff66,0 4px 0 #26358b!important}
.compat321{margin:9px 0 11px;padding:11px 12px;border:2px solid #263e5c;border-radius:13px;background:linear-gradient(135deg,#eef7ff,#fff);color:#172033}
.compatEmpty321{display:flex;flex-direction:column;gap:2px}.compatEmpty321 b{font-size:11px}.compatEmpty321 span{font-size:8px;color:#607287}
.compatHead321{display:flex;justify-content:space-between;gap:10px;align-items:center}.compatHead321 small{display:block;font-size:6px;letter-spacing:.12em;color:#5e7c8f;font-weight:1000}
.compatHead321 b{font-size:20px;line-height:1;color:#0877ad}.compatHead321 b em{font-size:9px;font-style:normal;color:#667789}.compatHead321 strong{font-size:9px;background:#fff0b5;border:1px solid #d5b84b;border-radius:999px;padding:5px 8px;white-space:nowrap}
.compatBar321{height:7px;margin:8px 0 7px;border-radius:99px;background:#dce7ee;overflow:hidden}.compatBar321 i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#56b8da,#5ec48c)}
.compatBreak321{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px}.compatBreak321 span{display:flex;justify-content:space-between;gap:4px;padding:4px 5px;border:1px solid #d8e2ea;border-radius:7px;background:#fff;font-size:6px}.compatBreak321 b{font-size:7px}
.lineageArchive118{margin-top:12px;background:#fbfaf6}.lineageArchive118>h3{display:flex;align-items:center;justify-content:space-between;gap:8px}.lineageArchive118:before{content:'SUB';display:inline-block;font-size:8px;font-weight:1000;letter-spacing:.12em;background:#222;color:#fff;border-radius:999px;padding:2px 6px;margin-bottom:6px}
#pa,#pb{position:relative!important;min-height:168px!important;display:block!important;padding:0!important;overflow:hidden!important;background:#f7fbff!important;color:#142033!important}
.slotFilled321{height:100%;min-height:168px;display:grid;grid-template-rows:112px auto;background:linear-gradient(180deg,#f7fbff,#eef5ff)}
.slotFilled321 .avatar{height:112px!important;width:100%!important;border:0!important;border-bottom:1px solid #c7d9ea!important;background:linear-gradient(#fff8ea,#eef8ff)!important}
.slotMeta321{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px;color:#142033!important;background:#fff}
.slotMeta321 small{font-size:7px;font-weight:1000;color:#1688b8}.slotMeta321 b{font-size:12px;line-height:1.1}.slotMeta321 span,.slotMeta321 em{font-size:7px;font-style:normal;color:#5d6d7e}
.slotEmpty321{min-height:168px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;color:#6c7d8e}.slotEmpty321 b{font-size:12px}.slotEmpty321 span{font-size:8px}
.pairTag321{position:absolute;left:6px;top:6px;z-index:12;background:#0aa9d8;color:white;border:2px solid white;border-radius:999px;padding:3px 8px;font-size:8px;font-weight:1000;box-shadow:0 2px 8px #0004}
#breeders .card.sel{outline:4px solid #5bd8ff!important;box-shadow:0 0 0 3px #dff8ff!important}
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
window.STAR_BREEDING321={sync:sync321,pool:pool321,pristine:pristine321,compatibility:compatibility321,archive:archive321};
})();