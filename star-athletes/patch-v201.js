(()=>{
// v0.20.1: stabilize breeding/hatch data and move shop+missions to their own Nest tab.
S.breedCount??=0;
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
function decorateBreed201(){
  const hero=document.querySelector('.breedHero126');if(hero){
    let strip=hero.querySelector('.breedStrip128');
    if(!strip){strip=document.createElement('div');strip.className='breedStrip128';hero.insertBefore(strip,hero.children[1]||null)}
    const af=S.parents?.length===2?'PAIR READY':'SELECT PARENTS';
    strip.innerHTML=`<span>${af}</span><b>配合 ${S.breedCount||0} 回</b><em>高レア・色違い・理想個体を狙おう</em>`;
  }
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
  birth.classList.add('birthStage128');reveal.classList.add('contrast202');birth.dataset.rarity=m.rarity;
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
  if(summary)summary.innerHTML=`<div class="nestIdentity201"><small>NEST BASE</small><b>${cur?.name||'ビギナーネスト'}</b></div><div class="nestWallet201"><span><small>COIN</small><b>🪙 ${S.coins||0}</b></span><span><small>FAME</small><b>⭐ ${S.fame||0}</b></span><span><small>BADGE</small><b>🏅 ${S.emblems?.length||0}</b></span></div>`;
}
const renderBefore201=render;
render=function(){
  normalizeState201();
  let out;
  try{out=renderBefore201()}catch(e){console.error('render before v201',e)}
  ensureNestTab201();
  decorateBreed201();
  setTimeout(()=>{repairBirth201();ensureNestTab201();decorateBreed201()},0);
  return out;
};
// Hatch execution is owned exclusively by v127.
const css=document.createElement('style');css.textContent=`
.nestSummary201{display:grid!important;gap:8px!important;padding:12px!important;border-radius:14px!important;background:linear-gradient(145deg,#122038,#21395d)!important;color:#fff!important;box-shadow:0 5px 0 #0002!important}
.nestIdentity201{display:flex;justify-content:space-between;align-items:end;gap:8px}.nestIdentity201 small{font-size:7px;letter-spacing:.15em;color:#7fe0ff;font-weight:1000}.nestIdentity201 b{font-size:15px}
.nestWallet201{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:6px!important}.nestWallet201 span{display:block!important;padding:7px!important;border:1px solid #ffffff24!important;border-radius:9px!important;background:#ffffff0c!important}.nestWallet201 small{display:block;font-size:6px;color:#9eb5cc}.nestWallet201 b{display:block;margin-top:2px;font-size:10px;color:#fff}

.birthStage128 .hatchReveal.contrast202 .newbornLabel{color:#241900!important;background:#ffd65a!important}
.birthStage128 .hatchReveal.contrast202 .hatchStats div{color:#171717!important;background:#fffdf7!important}
.birthStage128 .hatchReveal.contrast202 .hatchStats span,.birthStage128 .hatchReveal.contrast202 .hatchStats b{color:#171717!important}
.birthStage128 .hatchReveal.contrast202 .inheritBox{color:#171717!important;background:#fff4c8!important}
.birthStage128 .hatchReveal.contrast202 .inheritBox b{color:#171717!important}
.birthStage128 .hatchReveal.contrast202 .hatchTraits span{color:#171717!important;background:#fff3bf!important}
.birthStage128 .hatchReveal.contrast202 .hatchName b{color:#fff!important}
.birthStage128 .hatchReveal.contrast202 .hatchMeta{color:#dceaff!important;opacity:.9!important}
.breedStrip128{display:grid;grid-template-columns:auto auto 1fr;gap:6px;align-items:center;margin:0 0 9px;padding:7px 9px;border-radius:10px;background:#ffffff0d;border:1px solid #ffffff1c}.breedStrip128 span{font-size:7px;font-weight:1000;letter-spacing:.12em;color:#7ee8ff}.breedStrip128 b{font-size:10px;color:#ffe17a}.breedStrip128 em{font-style:normal;text-align:right;font-size:7px;opacity:.65}
.birthStage128{margin-top:10px}.birthStage128 .hatchReveal{position:relative;overflow:hidden;border-radius:18px!important;background:radial-gradient(circle at 50% 25%,#29496d,#101a2c 52%,#080c16)!important;color:#fff!important;border:1px solid #75dfff55!important;box-shadow:0 12px 35px #0005,0 0 24px #52cfff33!important;padding:14px!important}.birthStage128 .hatchReveal:before{content:'';position:absolute;inset:-40%;background:conic-gradient(transparent,#6fe9ff18,transparent,#ff74cc18,transparent);animation:spin128 9s linear infinite;pointer-events:none}@keyframes spin128{to{transform:rotate(360deg)}}.birthStage128 .hatchReveal>*{position:relative;z-index:1}.birthStage128 .bigArt{height:180px!important;background:transparent!important;border:0!important}.birthStage128 .hatchName{display:flex!important;justify-content:center!important;align-items:center!important;gap:8px!important}.birthStage128 .hatchName b{font-size:20px!important}.birthStage128 .hatchName span{background:#ffd96b;color:#211600;border-radius:999px;padding:4px 8px;font-weight:1000}.resultBadge128{text-align:center;font-size:8px;letter-spacing:.16em;font-weight:1000;color:#8eeaff;margin-bottom:5px}.birthStage128[data-rarity='SSR'] .hatchReveal,.birthStage128[data-rarity='UR'] .hatchReveal,.birthStage128[data-rarity='EX'] .hatchReveal{box-shadow:0 12px 35px #0005,0 0 36px #ffd65c66!important}.birthStage128[data-rarity='EX'] .resultBadge128{color:#fff;text-shadow:0 0 10px #7df7ff,0 0 18px #ff7de8}
#nest201{padding-bottom:90px}.nestSummary201{display:flex;justify-content:space-between;align-items:center;gap:10px;background:linear-gradient(145deg,#111c31,#243d61);color:#fff;border-radius:16px;padding:12px;margin-bottom:10px;box-shadow:0 6px 0 #0002}.nestSummary201 small{display:block;font-size:7px;letter-spacing:.14em;color:#8bdcff}.nestSummary201 b{font-size:15px}.nestWallet201{display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end}.nestWallet201 span{font-size:8px;font-weight:1000;background:#ffffff14;border:1px solid #ffffff25;border-radius:999px;padding:5px 7px}.nestHost201>.box{margin:0 0 10px!important}.tabs{overflow-x:auto;justify-content:flex-start}.tabs .tab{min-width:64px;flex:1 0 64px}
`;document.head.appendChild(css);
setTimeout(()=>{try{render()}catch(e){console.error('v0.20.1 init',e)}},0);
})();