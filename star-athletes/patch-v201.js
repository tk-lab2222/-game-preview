(()=>{
// v0.20.1: stabilize breeding/hatch data and move shop+missions to their own Nest tab.
S.breedCount??=0;
const DEFAULT_STATS201={power:90,speed:90,stamina:90,agility:90,tech:90,guts:90};
function normalizeMonster201(m,index=0){
  if(!m||typeof m!=='object')return m;
  const species=(m.species&&SP[m.species])?m.species:'draco';
  m.species=species;
  m.name=(typeof m.name==='string'&&m.name.trim())?m.name:defaultAthleteName(species);
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
    strip.innerHTML=`<span>${af}</span><b>配合 ${S.breedCount||0} 回</b><em>高星格・色違い・理想個体を狙おう</em>`;
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
  reveal.innerHTML=`<div class="resultBadge128">誕生</div>${avatar(m,true)}<div class="hatchName"><b>${m.name}</b></div><div class="hatchMeta">${SP[m.species][0]} ・ G${m.gen} ・ ${m.personality}</div><div class="traitRow hatchTraits"><span>${m.visual.pattern}</span><span>${m.visual.part}</span></div><details class="birthDetails201"><summary aria-label="受け継いだ能力と血統">能力と血統</summary><div class="hatchStats">${statHtml}</div><div class="inheritBox"><b>継承</b><br>親：${m.origin}<br>見た目：${m.visual.color} / ${m.visual.pattern} / ${m.visual.part}${m.visual.acc!=='なし'?' / '+m.visual.acc:''}</div></details>`;
  birth.classList.add('birthStage128');reveal.classList.add('contrast202');birth.removeAttribute('data-rarity');
  try{window.paintSpecies&&window.paintSpecies()}catch(_){}
}
// Nest presentation reads canonical collections; view selection stays in memory only.
let nestGroup201='team',nestPicked201=null;
const nestStarView201={mode:'earned',key:'speed'};
function collections201(){
 const unique=list=>{const seen=new Set();return(list||[]).filter(m=>m?.id&&!seen.has(m.id)&&seen.add(m.id))};
 return {team:unique(S.nest),lineage:unique(S.lineage),stars:unique((S.myStars323||[]).map(x=>x?.athlete))};
}
function gallery201(section){
 let host=document.getElementById('nestGallery201');
 if(!host){host=document.createElement('div');host.id='nestGallery201';host.className='nestGallery201';section.prepend(host)}
 const title=section.querySelector(':scope>.sectionTitle203');if(title&&title.nextElementSibling!==host)title.after(host);
 const lists=collections201(),list=lists[nestGroup201]||lists.team;
 if(!list.some(m=>m.id===nestPicked201))nestPicked201=list[0]?.id||null;
 const m=list.find(x=>x.id===nestPicked201);
 const open=host.querySelector('.nestProfile201')?.open||false;
 host.replaceChildren();
 const make=(tag,cls,text)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(text!=null)x.textContent=text;return x};
 const groups=make('div','nestGroups201');groups.setAttribute('role','group');groups.setAttribute('aria-label','ネストのコレクション');
 for(const [key,label] of [['team','チーム'],['lineage','血統'],['stars','MY STAR']]){
  const b=make('button',key===nestGroup201?'on201':'',label+' '+lists[key].length);b.type='button';b.dataset.nestGroup201=key;b.setAttribute('aria-pressed',String(key===nestGroup201));
  b.onclick=()=>{nestGroup201=key;nestPicked201=null;gallery201(section)};groups.appendChild(b);
 }
 host.appendChild(groups);
 const stage=make('div','nestStage201');stage.setAttribute('aria-label',m?(m.name||'アスリート')+'の姿':'個体を迎える場所');
 if(m){const art=make('div','nestPortrait201');art.innerHTML=avatar(m);stage.appendChild(art)}
 else stage.appendChild(make('span','nestEmpty201',nestGroup201==='team'?'3体を迎えよう':nestGroup201==='stars'?'お気に入りを残そう':'次の世代へつなごう'));
 host.appendChild(stage);
 if(m){
  const identity=make('div','nestName201');identity.appendChild(make('h2','',m.name||'アスリート'));identity.appendChild(make('span','',`${SP[m.species]?.[0]||m.species||''} · G${m.gen??0} · ${window.STAR_GROWTH226?.appearance?.(m)?.label||'成体'}`));host.appendChild(identity);
  const strip=make('div','nestChoices201');strip.setAttribute('role','group');strip.setAttribute('aria-label','見る個体を選ぶ');
  for(const x of list){const b=make('button',x.id===m.id?'on201':'');b.type='button';b.dataset.nestPick201=x.id;b.setAttribute('aria-pressed',String(x.id===m.id));b.setAttribute('aria-label',x.name||'アスリート');const art=make('div','nestThumb201');art.innerHTML=avatar(x);b.append(art,make('span','',x.name||'アスリート'));b.onclick=()=>{nestPicked201=x.id;gallery201(section)};strip.appendChild(b)}
  host.appendChild(strip);
  const star=window.STAR_GROWTH226?.starMap?.(m,nestStarView201);if(star)host.appendChild(star);
  const profile=make('details','nestProfile201');profile.open=open;profile.appendChild(make('summary','','能力'));
  const stats=make('div','nestStats201');for(const [k,label] of Object.entries(SL)){const row=make('span','');row.append(make('small','',label),make('b','',String(m.stats?.[k]??0)));stats.appendChild(row)}profile.appendChild(stats);host.appendChild(profile);
 }
 const actions=make('div','nestActions201'),primary=make('button','btn',m&&nestGroup201==='team'&&!S.needsBreeding?'育成へ':nestGroup201==='stars'?'殿堂へ':'ラボへ');primary.type='button';primary.dataset.nestGo201=m&&nestGroup201==='team'&&!S.needsBreeding?'train':nestGroup201==='stars'?'hall323':'breed';
 primary.onclick=()=>{if(primary.dataset.nestGo201==='hall323')window.STAR_MY_STAR323?.show?.();else window.show?.(primary.dataset.nestGo201);if(primary.dataset.nestGo201==='train'){window.renderRoster210Live?.();window.STAR_ROSTER210?.focus?.(m.id)}scrollTo({top:0,behavior:'auto'})};actions.appendChild(primary);
 if(m&&nestGroup201!=='stars'){const star=make('button','nestKeep201',(S.myStars323||[]).some(x=>x?.sourceId===m.id)?'★ MY STAR':'☆ MY STAR');star.type='button';star.dataset.myStar323=m.id;star.setAttribute('aria-label',(m.name||'この個体')+'をMY STARに登録');actions.appendChild(star)}
 host.appendChild(actions);requestAnimationFrame(()=>window.paintSpecies?.());
}
function facilities201(section){
 let panel=document.getElementById('nestFacilities201');if(!panel){panel=document.createElement('details');panel.id='nestFacilities201';panel.className='nestFacilities201';const sum=document.createElement('summary');sum.textContent='設備・ショップ';panel.appendChild(sum);section.appendChild(panel)}
 for(const id of ['nestSummary201','nestShopHost201','support283']){const node=document.getElementById(id);if(node&&node.closest('#nest201')&&node.parentElement!==panel)panel.appendChild(node)}
 let records=document.getElementById('nestRecords201');if(!records){records=document.createElement('details');records.id='nestRecords201';records.className='nestFacilities201';const sum=document.createElement('summary');sum.textContent='記録・保存';records.appendChild(sum);section.appendChild(records)}
 for(const id of ['saveTools352','legendHistory353']){const node=document.getElementById(id);if(node&&node.closest('#nest201')&&node.parentElement!==records)records.appendChild(node)}

}

function ensureNestTab201(){
  const section=document.getElementById('nest201');if(!section)return;
  gallery201(section);facilities201(section);
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
window.STAR_NEST201={sync:ensureNestTab201};
window.addEventListener('click',e=>{if(e.target?.closest?.('.tab[data-v="nest201"],#adopt,#doTrain263,[data-my-star323]'))setTimeout(ensureNestTab201,0)},true);
// Hatch execution is owned exclusively by v127.
const css=document.createElement('style');css.textContent=`
.birthDetails201{margin-top:16px;border-top:1px solid #bfcbac30}.birthDetails201>summary{font-size:12px;padding:15px 0;min-height:44px;color:#d2dec2;cursor:pointer}.birthStage128 .hatchReveal.contrast202 .newbornLabel{font-size:11px;padding:9px;border-radius:8px}.birthStage128 .bigArt .artimg{object-fit:contain!important}





.birthStage128 .hatchReveal.contrast202 .newbornLabel{color:#241900!important;background:#ffd65a!important}
.birthStage128 .hatchReveal.contrast202 .hatchStats div{color:#171717!important;background:#fffdf7!important}
.birthStage128 .hatchReveal.contrast202 .hatchStats span,.birthStage128 .hatchReveal.contrast202 .hatchStats b{color:#171717!important}
.birthStage128 .hatchReveal.contrast202 .inheritBox{color:#171717!important;background:#fff4c8!important}
.birthStage128 .hatchReveal.contrast202 .inheritBox b{color:#171717!important}
.birthStage128 .hatchReveal.contrast202 .hatchTraits span{color:#171717!important;background:#fff3bf!important}
.birthStage128 .hatchReveal.contrast202 .hatchName b{color:#fff!important}
.birthStage128 .hatchReveal.contrast202 .hatchMeta{color:#dceaff!important;opacity:.9!important}
.breedStrip128{display:grid;grid-template-columns:auto auto 1fr;gap:6px;align-items:center;margin:0 0 9px;padding:7px 9px;border-radius:10px;background:#ffffff0d;border:1px solid #ffffff1c}.breedStrip128 span{font-size:7px;font-weight:1000;letter-spacing:.12em;color:#7ee8ff}.breedStrip128 b{font-size:10px;color:#ffe17a}.breedStrip128 em{font-style:normal;text-align:right;font-size:7px;opacity:.65}
.birthStage128{margin-top:10px}.birthStage128 .hatchReveal{position:relative;overflow:hidden;border-radius:18px!important;background:radial-gradient(circle at 50% 25%,#345340,#12281d 52%,#091810)!important;color:#fff!important;border:1px solid #75dfff55!important;box-shadow:0 12px 35px #0005,0 0 24px #52cfff33!important;padding:14px!important}.birthStage128 .hatchReveal:before{content:'';position:absolute;inset:-40%;background:conic-gradient(transparent,#6fe9ff18,transparent,#ff74cc18,transparent);animation:spin128 9s linear infinite;pointer-events:none}@keyframes spin128{to{transform:rotate(360deg)}}.birthStage128 .hatchReveal>*{position:relative;z-index:1}.birthStage128 .bigArt{height:250px!important;background:transparent!important;border:0!important}.birthStage128 .hatchName{display:flex!important;justify-content:center!important;align-items:center!important;gap:8px!important}.birthStage128 .hatchName b{font-size:20px!important}.birthStage128 .hatchName span{background:#ffd96b;color:#211600;border-radius:999px;padding:4px 8px;font-weight:1000}.resultBadge128{text-align:center;font-size:8px;letter-spacing:.16em;font-weight:1000;color:#8eeaff;margin-bottom:5px}
#nest201{padding-bottom:90px}.nestHost201>.box{margin:0 0 10px!important}
`;document.head.appendChild(css);
setTimeout(()=>{try{render()}catch(e){console.error('v0.20.1 init',e)}},0);
})();
