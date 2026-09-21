(()=>{
// v0.20.1: stabilize breeding/hatch data and move shop+missions to their own Nest tab.
const DEFAULT_STATS201={power:90,speed:90,stamina:90,agility:90,tech:90,guts:90};
function normalizeMonster201(m,index=0){
  if(!m||typeof m!=='object')return m;
  const species=(m.species&&SP[m.species])?m.species:'draco';
  m.species=species;
  m.name=(typeof m.name==='string'&&m.name.trim())?m.name:`${SP[species][0].slice(0,2)}${100+index}`;
  m.rarity=R.includes(m.rarity)?m.rarity:'C';
  m.gen=Number.isFinite(+m.gen)?+m.gen:0;
  m.personality=(typeof m.personality==='string'&&m.personality)?m.personality:'マイペース';
  m.origin=(typeof m.origin==='string'&&m.origin)?m.origin:'ネスト';
  m.stats=(m.stats&&typeof m.stats==='object')?m.stats:{};
  Object.keys(DEFAULT_STATS201).forEach(k=>{const n=Number(m.stats[k]);m.stats[k]=Number.isFinite(n)?n:DEFAULT_STATS201[k]+(SP[species][2][k]||0)});
  m.visual=(m.visual&&typeof m.visual==='object')?m.visual:visual(species);
  m.visual.color??='白';m.visual.pattern??='なし';m.visual.acc??='なし';m.visual.part??=PART[species][0];
  m.id=m.id||(`repair-${Date.now()}-${index}-${Math.random().toString(36).slice(2)}`);
  return m;
}
function normalizeState201(){
  ['starters','nest','lineage','released','cands','foster'].forEach(key=>{
    if(!Array.isArray(S[key]))S[key]=[];
    S[key]=S[key].filter(Boolean).map((m,i)=>normalizeMonster201(m,i));
  });
  if(S.egg)S.egg=normalizeMonster201(S.egg,999);
  if(!Array.isArray(S.parents))S.parents=[];
  S.parents=S.parents.filter(id=>breederPool().some(m=>m.id===id)).slice(0,2);
}
function repairBirth201(){
  normalizeState201();
  const birth=document.getElementById('birth');if(!birth)return;
  const reveal=birth.querySelector('.hatchReveal');
  if(!reveal)return;
  let m=S.cands?.[S.cands.length-1];
  if(!m)return;
  m=normalizeMonster201(m,777);
  const statHtml=Object.entries(m.stats).map(([k,v])=>`<div><span>${SL[k]||k}</span><b>${v}</b></div>`).join('');
  reveal.innerHTML=`<div class="resultBadge128">${['SSR','UR','EX'].includes(m.rarity)?'★ SPECIAL BIRTH ★':'NEW ATHLETE'}</div><div class="newbornLabel">NEW ATHLETE!</div>${avatar(m,true)}<div class="hatchName"><b>${m.name}</b><span>${m.rarity}</span></div><div class="hatchMeta">${SP[m.species][0]} ・ G${m.gen} ・ ${m.personality}</div><div class="traitRow hatchTraits"><span>${m.visual.pattern}</span><span>${m.visual.part}</span></div><div class="hatchStats">${statHtml}</div><div class="inheritBox"><b>継承</b><br>親：${m.origin}<br>見た目：${m.visual.color} / ${m.visual.pattern} / ${m.visual.part}${m.visual.acc!=='なし'?' / '+m.visual.acc:''}</div>`;
  birth.classList.add('birthStage128');birth.dataset.rarity=m.rarity;
  try{window.paintSpecies&&window.paintSpecies()}catch(_){}
}
function ensureNestTab201(){
  const section=document.getElementById('nest201');if(!section)return;
  const shop=document.getElementById('shop122'),mission=document.getElementById('mission200');
  const shopHost=document.getElementById('nestShopHost201'),missionHost=document.getElementById('nestMissionHost201');
  if(shop&&shopHost&&shop.parentElement!==shopHost)shopHost.appendChild(shop);
  if(mission&&missionHost&&mission.parentElement!==missionHost)missionHost.appendChild(mission);
  const cur=typeof currentRank200==='function'?currentRank200():null;
  const summary=document.getElementById('nestSummary201');
  if(summary)summary.innerHTML=`<div><small>NEST BASE</small><b>${cur?.name||'ビギナーネスト'}</b></div><div class="nestWallet201"><span>🪙 ${S.coins||0}</span><span>⭐ ${S.fame||0}</span><span>🏅 ${S.emblems?.length||0}</span></div>`;
}
const renderBefore201=render;
render=function(){
  normalizeState201();
  let out;
  try{out=renderBefore201()}catch(e){console.error('render before v201',e)}
  ensureBreedCounters129?.();
  ensureNestTab201();
  setTimeout(()=>{repairBirth201();ensureNestTab201()},0);
  return out;
};
// Normalize before hatch handlers run, then repair result after the existing animation chain.
const hatch201=document.getElementById('hatch');
if(hatch201)hatch201.addEventListener('click',()=>{normalizeState201();if(S.egg)normalizeMonster201(S.egg,999);setTimeout(()=>{normalizeState201();repairBirth201();try{save200&&save200()}catch(_){}},1100)},true);
const css=document.createElement('style');css.textContent=`
#nest201{padding-bottom:90px}.nestSummary201{display:flex;justify-content:space-between;align-items:center;gap:10px;background:linear-gradient(145deg,#111c31,#243d61);color:#fff;border-radius:16px;padding:12px;margin-bottom:10px;box-shadow:0 6px 0 #0002}.nestSummary201 small{display:block;font-size:7px;letter-spacing:.14em;color:#8bdcff}.nestSummary201 b{font-size:15px}.nestWallet201{display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end}.nestWallet201 span{font-size:8px;font-weight:1000;background:#ffffff14;border:1px solid #ffffff25;border-radius:999px;padding:5px 7px}.nestHost201>.box{margin:0 0 10px!important}.tabs{overflow-x:auto;justify-content:flex-start}.tabs .tab{min-width:64px;flex:1 0 64px}
`;document.head.appendChild(css);
setTimeout(()=>{try{render()}catch(e){console.error('v0.20.1 init',e)}},0);
})();