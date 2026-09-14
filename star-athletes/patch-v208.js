(()=>{
// v0.20.8: self-contained training/prep UI + shiny display labels.
const TRAIN208={
 speed:{name:'星駆けダッシュ',icon:'💨',gain:{speed:12,agility:7}},
 power:{name:'メテオクラッシュ',icon:'💥',gain:{power:12,guts:7}},
 tech:{name:'スタートリック',icon:'✨',gain:{tech:12,agility:6}},
 stamina:{name:'エンドレスロード',icon:'🔥',gain:{stamina:12,guts:6}},
 team:{name:'スターリンク',icon:'🤝',gain:{guts:7,tech:7}}
};
const STRAT208=['先行','バランス','温存','追込'];
const SHINY_COLOR208={draco:'エメラルド系',unil:'ミント系',grimo:'パープル系',puru:'ピンク系'};
function shinyLabel208(m){
  if(!m)return '';
  return m.shiny?`✨色違い（${SHINY_COLOR208[m.species]||'特殊色'}）`:(m.visual?.color||'');
}
function ensureState208(){
 S.plans=(S.plans&&typeof S.plans==='object')?S.plans:{};
 S.assign=(S.assign&&typeof S.assign==='object')?S.assign:{};
 S.strat=(S.strat&&typeof S.strat==='object')?S.strat:{};
}
function statGrid208(m,gain){
 return Object.keys(SL).map(k=>`<span class="${gain[k]?'up208':''}"><i>${SL[k]}</i><b>${m.stats?.[k]??0}${gain[k]?` <em>+${gain[k]}</em>`:''}</b></span>`).join('');
}
function key208(e){
 return e==='50m走'?['speed','agility','tech']:e==='障害物競走'?['tech','agility','speed']:e==='大玉ころがし'?['power','stamina','guts']:e==='坂道かけあがり'?['power','stamina','guts']:e==='10000m走'?['stamina','guts','speed']:e==='的当て'?['tech','power','agility']:e==='リレー'?['speed','tech','agility']:['power','stamina','guts'];
}
function renderTraining208(){
 ensureState208();
 const plans=document.getElementById('plans'),prep=document.getElementById('prep');
 if(!plans||!prep||!S.nest?.length||!S.schedule?.length)return;
 const firstDefault=(INF[S.schedule[0]]?.[1]||'speed');
 plans.innerHTML=S.nest.map(m=>{
   const cur=TRAIN208[S.plans[m.id]]?S.plans[m.id]:firstDefault;S.plans[m.id]=cur;
   const g=TRAIN208[cur]?.gain||{};
   return `<article class="athTrain208" data-trainmon208="${m.id}"><header>${avatar(m)}<div><b>${m.name}</b><small>${SP[m.species]?.[0]||''} / ${m.rarity}</small><em>${shinyLabel208(m)}</em></div></header><div class="stats208">${statGrid208(m,g)}</div><div class="menu208">${Object.entries(TRAIN208).map(([id,t])=>`<button type="button" data-plan208="${id}" data-mon208="${m.id}" class="${cur===id?'selected208':''}"><strong>${t.icon}</strong><span>${t.name}</span></button>`).join('')}</div></article>`;
 }).join('');
 prep.innerHTML=S.schedule.map((e,i)=>{
   const rec=best(e);if(!S.assign[i]||!S.nest.some(m=>m.id===S.assign[i]))S.assign[i]=rec.id;if(!STRAT208.includes(S.strat[i]))S.strat[i]='バランス';
   return `<article class="event208"><header><div><b>${e}</b><small>重要：${INF[e]?.[0]||''}</small></div><em>おすすめ ${rec.name}</em></header><div class="entries208">${S.nest.map(m=>`<button type="button" data-entry208="${i}" data-mon208="${m.id}" class="${S.assign[i]===m.id?'selected208':''}">${avatar(m)}<b>${m.name}</b><small>適性 ${Math.round(score(m,e))}</small><div>${key208(e).map(k=>`<span>${SL[k]} <b>${m.stats?.[k]??0}</b></span>`).join('')}</div></button>`).join('')}</div><div class="strategy208"><span>作戦</span>${STRAT208.map(s=>`<button type="button" data-strat208="${i}" data-value208="${s}" class="${S.strat[i]===s?'selected208':''}">${s}</button>`).join('')}</div></article>`;
 }).join('');
 requestAnimationFrame(()=>{try{window.paintSpecies&&window.paintSpecies()}catch(_){}});
}
function save208(){try{typeof save200==='function'&&save200()}catch(_){}}
function handle208(e){
 const p=e.target.closest?.('[data-plan208]');
 if(p){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();S.plans[p.dataset.mon208]=p.dataset.plan208;renderTraining208();save208();return true;}
 const en=e.target.closest?.('[data-entry208]');
 if(en){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();S.assign[en.dataset.entry208]=en.dataset.mon208;renderTraining208();save208();return true;}
 const st=e.target.closest?.('[data-strat208]');
 if(st){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();S.strat[st.dataset.strat208]=st.dataset.value208;renderTraining208();save208();return true;}
 return false;
}
document.addEventListener('click',handle208,true);
// Do not also process touchend; iOS will dispatch click for these native buttons and double-firing caused prior instability.
function patchShinyText208(){
 const m=S.cands?.[S.cands.length-1];const birth=document.getElementById('birth');
 if(m?.shiny&&birth?.querySelector('.hatchReveal')){
   let tag=birth.querySelector('.shinyResult208');
   if(!tag){tag=document.createElement('div');tag.className='shinyResult208';birth.querySelector('.hatchName')?.after(tag)}
   tag.textContent=shinyLabel208(m);
   const inh=birth.querySelector('.inheritBox');if(inh){const base=m.visual?.color||'';inh.innerHTML=inh.innerHTML.replace(/見た目：[^<]*/,`見た目：${shinyLabel208(m)}${base?`（通常色:${base}）`:''} / ${m.visual?.pattern||''} / ${m.visual?.part||''}${m.visual?.acc&&m.visual.acc!=='なし'?` / ${m.visual.acc}`:''}`)}
 }
 document.querySelectorAll('.card').forEach(c=>{
   const id=c.dataset.id;if(!id)return;let pool=[];try{pool=breederPool()}catch(_){}const mm=pool.find(x=>x.id===id);if(mm?.shiny){let t=c.querySelector('.shinyColor208');if(!t){t=document.createElement('div');t.className='shinyColor208';c.querySelector('.bd')?.appendChild(t)}if(t)t.textContent=shinyLabel208(mm)}
 });
}
const before208=render;
render=function(){const out=before208();renderTraining208();patchShinyText208();return out};
const css=document.createElement('style');css.textContent=`
#plans{display:grid!important;gap:10px!important}.athTrain208{border:2px solid #25344a;border-radius:16px;background:linear-gradient(145deg,#fff,#f2f7ff);padding:9px;box-shadow:0 5px 0 #0001}.athTrain208>header{display:grid;grid-template-columns:96px 1fr;gap:9px;align-items:center}.athTrain208>header .avatar{height:94px!important;border:0!important;border-radius:12px!important}.athTrain208>header b{display:block;font-size:14px}.athTrain208>header small{display:block;font-size:8px;color:#647080}.athTrain208>header em{display:block;font-style:normal;font-size:7px;color:#d7548f;font-weight:1000;margin-top:3px}.stats208{display:grid;grid-template-columns:1fr 1fr;gap:3px 7px;margin:7px 0}.stats208 span{display:flex;justify-content:space-between;padding:3px 5px;border-bottom:1px dotted #ccd5df;font-size:8px}.stats208 i,.stats208 em{font-style:normal}.stats208 .up208{background:#fff2aa;border-radius:6px}.stats208 em{color:#e45b00}.menu208{display:grid;grid-template-columns:1fr 1fr;gap:6px}.menu208 button{min-height:44px;border:2px solid #a9b9ca;border-radius:10px;background:#fff;display:flex;align-items:center;gap:7px;padding:7px;text-align:left;font-weight:900;color:#172033}.menu208 button:last-child{grid-column:1/3}.menu208 button strong{font-size:17px}.menu208 button span{font-size:9px}.menu208 button.selected208{background:#ccefff!important;border-color:#089fd2!important;box-shadow:0 0 0 3px #8ee4ff!important}
#prep{display:grid!important;gap:11px!important}.event208{border:2px solid #25344a;border-radius:16px;background:#f8fbff;padding:9px;box-shadow:0 5px 0 #0001}.event208>header{display:flex;justify-content:space-between;gap:8px;margin-bottom:7px}.event208>header b{display:block;font-size:13px}.event208>header small{display:block;font-size:8px;color:#657080}.event208>header em{font-style:normal;font-size:7px;background:#fff0b5;border-radius:999px;padding:4px 6px;font-weight:1000}.entries208{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.entries208>button{border:2px solid #aebdce;border-radius:12px;background:#fff;padding:0;overflow:hidden;text-align:left;color:#172033}.entries208>button.selected208{background:#e3f8ff!important;border-color:#089fd2!important;box-shadow:0 0 0 3px #9eeaff!important}.entries208 .avatar{height:86px!important;border:0!important;border-bottom:1px solid #d6e0eb!important}.entries208>button>b,.entries208>button>small{display:block;padding:3px 5px 0;font-size:9px}.entries208>button>small{font-size:7px;color:#657080}.entries208>button>div{padding:4px 5px 6px}.entries208>button>div span{display:flex;justify-content:space-between;font-size:6px;border-top:1px dotted #ccd5df}.strategy208{display:grid;grid-template-columns:auto repeat(4,1fr);gap:4px;align-items:center;margin-top:8px}.strategy208>span{font-size:8px;font-weight:1000}.strategy208 button{border:1px solid #aebdce;border-radius:8px;background:#fff;padding:7px 2px;font-size:8px;font-weight:900;color:#172033}.strategy208 button.selected208{background:#172b48!important;color:#fff!important;border-color:#172b48!important;box-shadow:0 0 0 2px #9fdfff!important}.shinyResult208{text-align:center;margin:4px 0 7px;color:#ff8cc4;font-size:9px;font-weight:1000;text-shadow:0 0 10px #ff8cc477}.shinyColor208{margin-top:4px;color:#d7548f;font-size:8px;font-weight:1000}
`;
document.head.appendChild(css);
setTimeout(()=>{try{renderTraining208();patchShinyText208()}catch(e){console.error('v0.20.8',e)}},0);
})();