(()=>{
// v0.24.3 core roster renderer: persistent training choices, live stats, skills in source HTML.
const ROSTER_KEY210='star-athletes-active-roster-v210';
const MEM210='star-athletes-training-memory-v243';
const LEGACY_MEM210='star-athletes-training-memory-v239';
const TRAIN210={speed:{name:'速度',icon:'💨'},power:{name:'力',icon:'💥'},tech:{name:'技巧',icon:'✨'},stamina:{name:'持久',icon:'🔥'},team:{name:'連携',icon:'🤝'}};
let focused210=null;
const STRAT210=['先行','バランス','温存','追込'];

function mem210(){try{
 const cur=JSON.parse(localStorage.getItem(MEM210)||'null');
 if(cur&&typeof cur==='object')return cur;
 const legacy=JSON.parse(localStorage.getItem(LEGACY_MEM210)||'{}');
 if(legacy&&typeof legacy==='object'){
   try{localStorage.setItem(MEM210,JSON.stringify(legacy))}catch(_){}
   return legacy;
 }
 return{};
}catch(_){return{}}}
function setMem210(id,p){if(!TRAIN210[p])return;const x=mem210();x[id]=p;try{localStorage.setItem(MEM210,JSON.stringify(x))}catch(_){}}
function bestPlan210(m){const s=m?.stats||{},map={power:'power',speed:'speed',stamina:'stamina',tech:'tech',agility:'speed',guts:'team'};let k='power';for(const x of Object.keys(SL))if(Number(s[x]||0)>Number(s[k]||0))k=x;return map[k]||'speed'}
function saveRoster210(){try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem(ROSTER_KEY210,JSON.stringify(S.nest))}catch(_){}try{typeof save200==='function'&&save200()}catch(_){}}
function restoreRoster210(){
 // The roster cache is presentation/recovery metadata, never an authority over generation flow.
 if(Array.isArray(S.nest)&&S.nest.length===3)return true;
 // During breeding or while candidates/egg exist, an empty nest is intentional. Restoring an old roster here
 // would mix generations and can recreate stale state after a transition.
 if(S.needsBreeding||S.generationActive===false||(Array.isArray(S.cands)&&S.cands.length)||S.egg)return false;
 try{const raw=localStorage.getItem(ROSTER_KEY210);if(raw){const r=JSON.parse(raw);if(Array.isArray(r)&&r.length===3){S.nest=r;return true}}}catch(_){}return false
}
function eventKeys210(e){return e==='50m走'?['speed','agility','tech']:e==='障害物競走'?['tech','agility','speed']:e==='大玉ころがし'?['power','stamina','guts']:e==='坂道かけあがり'?['power','stamina','guts']:e==='10000m走'?['stamina','guts','speed']:e==='的当て'?['tech','power','agility']:e==='リレー'?['speed','tech','agility']:['power','stamina','guts']}
function gainRows210(m,plan){
 const mode=S.training263?.intensity?.[m.id]||'normal';
 const gains=window.STAR_TRAIN263?.preview?.(m,plan,mode)||{};
 return Object.keys(SL).map(k=>`<span class="${k in gains?'up210':''}" data-stat210="${k}"><i>${SL[k]}</i><b>${m.stats?.[k]??0}${k in gains?` <em>+${gains[k]}</em>`:''}</b></span>`).join('');
}
function focus210(id){
 if(!S.nest?.some(m=>m.id===id))return;focused210=id;
 document.querySelectorAll('.train210[data-athlete210]').forEach(c=>c.hidden=c.dataset.athlete210!==id);
 document.querySelectorAll('[data-focus210]').forEach(b=>{const on=b.dataset.focus210===id;b.classList.toggle('on210',on);b.setAttribute('aria-pressed',String(on))});
 requestAnimationFrame(()=>window.paintSpecies?.());
}
function renderRoster210(){
 const plans=document.getElementById('plans'),prep=document.getElementById('prep');if(!plans||!prep)return;
 if(!restoreRoster210()){document.getElementById('trainingRoster210')?.remove();plans.innerHTML='<div class="empty210">配合で3体を選ぶ</div>';prep.innerHTML='';return}
 S.plans=(S.plans&&typeof S.plans==='object')?S.plans:{};S.assign=(S.assign&&typeof S.assign==='object')?S.assign:{};S.strat=(S.strat&&typeof S.strat==='object')?S.strat:{};
 if(!Array.isArray(S.schedule)||!S.schedule.length){try{makeSchedule()}catch(_){}}
 const traitOpen=new Set([...plans.querySelectorAll('.train210:has(.athleteTraits210[open])')].map(c=>c.dataset.athlete210));
 const mm=mem210(),locked=Number(S.turn)>=3||!!window.STAR_EVENTS267?.pending?.();
 if(!S.nest.some(m=>m.id===focused210))focused210=S.nest[0].id;
 let nav=document.getElementById('trainingRoster210');if(!nav){nav=document.createElement('div');nav.id='trainingRoster210';nav.setAttribute('role','group');nav.setAttribute('aria-label','育成する個体を表示');plans.before(nav)}
 nav.innerHTML=S.nest.map((m,i)=>`<button type="button" data-focus210="${m.id}" aria-pressed="${m.id===focused210}" class="${m.id===focused210?'on210':''}"><span>${i+1}</span><b>${m.name}</b><small>${TRAIN210[S.plans[m.id]||mm[m.id]||bestPlan210(m)]?.name||'速度'}</small></button>`).join('');
 plans.innerHTML=S.nest.map(m=>{let cur=TRAIN210[mm[m.id]]?mm[m.id]:(TRAIN210[m.lastTrainingPlan237]?m.lastTrainingPlan237:(TRAIN210[S.plans[m.id]]?S.plans[m.id]:bestPlan210(m)));S.plans[m.id]=cur;m.lastTrainingPlan237=cur;setMem210(m.id,cur);return `<article class="train210" data-athlete210="${m.id}" ${m.id===focused210?'':'hidden'}><header>${avatar(m)}<div><b>${m.name}</b><small>${SP[m.species]?.[0]||''} / G${m.gen??0}</small><details class="athleteTraits210" ${traitOpen.has(m.id)?'open':''}><summary>素質・スキル</summary></details></div></header><div class="stats210">${gainRows210(m,cur)}</div><small class="forecast210">＋ 通常成功の目安</small><div class="opts210">${Object.entries(TRAIN210).map(([id,t])=>`<button type="button" data-p210="${id}" data-m210="${m.id}" aria-pressed="${id===cur}" class="${id===cur?'on210':''}" ${locked?'disabled':''}><strong>${t.icon}</strong><span>${t.name}</span></button>`).join('')}</div></article>`}).join('');
 const opened=new Set([...prep.querySelectorAll('details[open][data-event210]')].map(d=>d.dataset.event210));
 prep.innerHTML=(S.schedule||[]).map((e,i)=>{const rec=best(e);if(!S.assign[i]||!S.nest.some(m=>m.id===S.assign[i]))S.assign[i]=rec.id;if(!STRAT210.includes(S.strat[i]))S.strat[i]='バランス';const chosen=S.nest.find(m=>m.id===S.assign[i]);return `<details class="evt210" data-event210="${i}" ${opened.has(String(i))?'open':''}><summary><b>${e}</b><span>${chosen.name} <em>${S.strat[i]}</em></span></summary><div class="eventGuide210">${INF[e]?.[0]||''} · 推奨 ${rec.name}</div><div class="entries210">${S.nest.map(m=>`<button type="button" data-e210="${i}" data-m210="${m.id}" aria-pressed="${S.assign[i]===m.id}" class="${S.assign[i]===m.id?'on210':''}">${avatar(m)}<b>${m.name}</b><small>適性 ${Math.round(score(m,e))}</small><div>${eventKeys210(e).map(k=>`<span>${SL[k]} <b>${m.stats?.[k]??0}</b></span>`).join('')}</div></button>`).join('')}</div><div class="strat210"><span>作戦</span>${STRAT210.map(s=>`<button type="button" data-s210="${i}" data-v210="${s}" aria-pressed="${S.strat[i]===s}" class="${S.strat[i]===s?'on210':''}">${s}</button>`).join('')}</div></details>`}).join('');
 const t=document.getElementById('turn');if(t)t.textContent=S.turn||0;const meet=document.getElementById('toMeet');if(meet)meet.disabled=(S.turn||0)<3;
 requestAnimationFrame(()=>{
  window.STAR_UI369?.sync?.();
  window.STAR_INTENSITY275?.sync?.();
  window.STAR_RENAME_UI?.sync?.();
  try{window.paintSpecies&&window.paintSpecies()}catch(_){}
  try{window.STAR_SKILL254?.sync?.()}catch(_){}
  try{window.STAR_RARITY249?.sync?.()}catch(_){}
  try{window.STAR_VISUAL243?.sync?.()}catch(_){}
 })
}
window.renderRoster210Live=renderRoster210;
renderTrain=renderRoster210;
function adopt210(){const selected=(S.cands||[]).filter(m=>m&&Array.isArray(S.sel)&&S.sel.includes(m.id));if(selected.length!==3)return;const old=Array.isArray(S.nest)?S.nest:[];S.lineage=Array.isArray(S.lineage)?S.lineage:[];old.forEach(m=>{if(m&&!S.lineage.some(x=>x.id===m.id))S.lineage.push(m)});const left=(S.cands||[]).filter(m=>!S.sel.includes(m.id));S.foster=Array.isArray(S.foster)?S.foster:[];left.forEach(m=>S.foster.push(m));S.dex=S.dex||{b:0,a:0,f:0,r:0,rel:0};S.dex.a=(S.dex.a||0)+3;S.dex.f=(S.dex.f||0)+left.length;S.nest=selected.map(m=>m);S.cands=[];S.sel=[];S.parents=[];S.egg=null;S.turn=0;S.plans={};S.assign={};S.strat={};try{makeSchedule()}catch(_){S.schedule=[]}saveRoster210();try{render()}catch(e){console.error('render adopt210',e)}try{typeof window.show==='function'&&window.show('train')}catch(_){}setTimeout(()=>{renderRoster210();try{window.STAR_SKILL254?.sync?.()}catch(_){}saveRoster210()},0)}
function syncAdopt210(){const b=document.getElementById('adopt');if(!b)return;const n=(S.cands||[]).filter(m=>m&&Array.isArray(S.sel)&&S.sel.includes(m.id)).length;b.disabled=n!==3;b.textContent=n===3?'この3体をネストへ':`3体選ぶ（${n}/3）`}
window.syncAdopt210=syncAdopt210;
document.addEventListener('click',e=>{const f=e.target.closest?.('[data-focus210]');if(f){focus210(f.dataset.focus210);return}const a=e.target.closest?.('#adopt');if(a){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();adopt210();return}const p=e.target.closest?.('[data-p210]');if(p){if(Number(S.turn)>=3||window.STAR_EVENTS267?.pending?.())return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();S.plans[p.dataset.m210]=p.dataset.p210;setMem210(p.dataset.m210,p.dataset.p210);renderRoster210();saveRoster210();return}const en=e.target.closest?.('[data-e210]');if(en){if(window.STAR_ARENA225?.locked?.())return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();S.assign[en.dataset.e210]=en.dataset.m210;renderRoster210();saveRoster210();return}const st=e.target.closest?.('[data-s210]');if(st){if(window.STAR_ARENA225?.locked?.())return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();S.strat[st.dataset.s210]=st.dataset.v210;renderRoster210();saveRoster210();return}if(e.target.closest?.('#cands [data-mode="c"]'))setTimeout(syncAdopt210,0);if(e.target.closest?.('.tab[data-v="train"]'))setTimeout(()=>{renderRoster210();try{window.STAR_SKILL254?.sync?.()}catch(_){}},0)},true);
const prev210=render;render=function(){const out=prev210();syncAdopt210();setTimeout(()=>{renderRoster210();try{window.STAR_SKILL254?.sync?.()}catch(_){}},0);return out};
const css=document.createElement('style');css.textContent=`#plans{display:grid!important;gap:10px!important}#prep{display:grid!important;gap:11px!important}.evt210{border:2px solid #25344a;border-radius:16px;background:#f8fbff;padding:9px;box-shadow:0 5px 0 #0001}.evt210>header{display:flex;justify-content:space-between;gap:8px;margin-bottom:7px}.evt210>header b{display:block;font-size:13px}.evt210>header small{font-size:8px;color:#657080}.evt210>header em{font-style:normal;font-size:7px;background:#fff0b5;border-radius:999px;padding:4px 6px;font-weight:1000}.entries210{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.entries210>button{border:2px solid #aebdce;border-radius:12px;background:#fff;padding:0;overflow:hidden;text-align:left;color:#172033}.entries210>button.on210{background:#e3f8ff!important;border-color:#089fd2!important;box-shadow:0 0 0 3px #9eeaff!important}.entries210 .avatar{height:86px!important;border:0!important;border-bottom:1px solid #d6e0eb!important}.entries210>button>b,.entries210>button>small{display:block;padding:3px 5px 0;font-size:9px}.entries210>button>small{font-size:7px;color:#657080}.entries210>button>div{padding:4px 5px 6px}.entries210>button>div span{display:flex;justify-content:space-between;font-size:6px;border-top:1px dotted #ccd5df}.strat210{display:grid;grid-template-columns:auto repeat(4,1fr);gap:4px;align-items:center;margin-top:8px}.strat210>span{font-size:8px;font-weight:1000}.strat210 button{border:1px solid #aebdce;border-radius:8px;background:#fff;padding:7px 2px;font-size:8px;font-weight:900;color:#172033}.strat210 button.on210{background:#172b48!important;color:#fff!important;border-color:#172b48!important;box-shadow:0 0 0 2px #9fdfff!important}.empty210{border:2px dashed #9aa9b8;border-radius:14px;background:#f7fbff;padding:14px;text-align:center}.empty210 b{display:block;font-size:13px;margin-bottom:4px}.empty210 span{font-size:9px;color:#667789}`;document.head.appendChild(css);setTimeout(()=>{restoreRoster210();renderRoster210();syncAdopt210()},0)
})();
