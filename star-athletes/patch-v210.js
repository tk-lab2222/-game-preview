(()=>{
// v0.21.0 hotfix: self-contained adoption + roster rendering. No dependency on prior private IIFE helpers.
const ROSTER_KEY210='star-athletes-active-roster-v210';
const TRAIN210={
 speed:{name:'星駆けダッシュ',icon:'💨',gain:{speed:12,agility:7}},
 power:{name:'メテオクラッシュ',icon:'💥',gain:{power:12,guts:7}},
 tech:{name:'スタートリック',icon:'✨',gain:{tech:12,agility:6}},
 stamina:{name:'エンドレスロード',icon:'🔥',gain:{stamina:12,guts:6}},
 team:{name:'スターリンク',icon:'🤝',gain:{guts:7,tech:7}}
};
const STRAT210=['先行','バランス','温存','追込'];
function saveRoster210(){
 try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem(ROSTER_KEY210,JSON.stringify(S.nest))}catch(_){}
 try{typeof save200==='function'&&save200()}catch(_){}
}
function restoreRoster210(){
 if(Array.isArray(S.nest)&&S.nest.length===3)return true;
 try{const raw=localStorage.getItem(ROSTER_KEY210);if(raw){const r=JSON.parse(raw);if(Array.isArray(r)&&r.length===3){S.nest=r;return true}}}catch(_){}
 return false;
}
function eventKeys210(e){return e==='50m走'?['speed','agility','tech']:e==='障害物競走'?['tech','agility','speed']:e==='大玉ころがし'?['power','stamina','guts']:e==='坂道かけあがり'?['power','stamina','guts']:e==='10000m走'?['stamina','guts','speed']:e==='的当て'?['tech','power','agility']:e==='リレー'?['speed','tech','agility']:['power','stamina','guts']}
function gainRows210(m,g){return Object.keys(SL).map(k=>`<span class="${g[k]?'up210':''}"><i>${SL[k]}</i><b>${m.stats?.[k]??0}${g[k]?` <em>+${g[k]}</em>`:''}</b></span>`).join('')}
function renderRoster210(){
 const plans=document.getElementById('plans'),prep=document.getElementById('prep');if(!plans||!prep)return;
 if(!restoreRoster210()){
   plans.innerHTML='<div class="empty210"><b>育成メンバー未登録</b><span>配合画面で3体を選び「この3体をネストへ」を押してください。</span></div>';
   prep.innerHTML='<div class="empty210"><b>出場メンバー未登録</b><span>ネスト登録後にここへ3体表示されます。</span></div>';
   return;
 }
 S.plans=(S.plans&&typeof S.plans==='object')?S.plans:{};S.assign=(S.assign&&typeof S.assign==='object')?S.assign:{};S.strat=(S.strat&&typeof S.strat==='object')?S.strat:{};
 if(!Array.isArray(S.schedule)||!S.schedule.length){try{makeSchedule()}catch(_){}}
 const def=(INF[S.schedule?.[0]]?.[1]||'speed');
 plans.innerHTML=S.nest.map(m=>{const cur=TRAIN210[S.plans[m.id]]?S.plans[m.id]:def;S.plans[m.id]=cur;const g=TRAIN210[cur].gain;return `<article class="train210"><header>${avatar(m)}<div><b>${m.name}</b><small>${SP[m.species]?.[0]||''} / ${m.rarity}</small></div></header><div class="stats210">${gainRows210(m,g)}</div><div class="opts210">${Object.entries(TRAIN210).map(([id,t])=>`<button type="button" data-p210="${id}" data-m210="${m.id}" class="${id===cur?'on210':''}"><strong>${t.icon}</strong><span>${t.name}</span></button>`).join('')}</div></article>`}).join('');
 prep.innerHTML=(S.schedule||[]).map((e,i)=>{const rec=best(e);if(!S.assign[i]||!S.nest.some(m=>m.id===S.assign[i]))S.assign[i]=rec.id;if(!STRAT210.includes(S.strat[i]))S.strat[i]='バランス';return `<article class="evt210"><header><div><b>${e}</b><small>重要：${INF[e]?.[0]||''}</small></div><em>おすすめ ${rec.name}</em></header><div class="entries210">${S.nest.map(m=>`<button type="button" data-e210="${i}" data-m210="${m.id}" class="${S.assign[i]===m.id?'on210':''}">${avatar(m)}<b>${m.name}</b><small>適性 ${Math.round(score(m,e))}</small><div>${eventKeys210(e).map(k=>`<span>${SL[k]} <b>${m.stats?.[k]??0}</b></span>`).join('')}</div></button>`).join('')}</div><div class="strat210"><span>作戦</span>${STRAT210.map(s=>`<button type="button" data-s210="${i}" data-v210="${s}" class="${S.strat[i]===s?'on210':''}">${s}</button>`).join('')}</div></article>`}).join('');
 const t=document.getElementById('turn');if(t)t.textContent=S.turn||0;const meet=document.getElementById('toMeet');if(meet)meet.disabled=(S.turn||0)<3;
 requestAnimationFrame(()=>{try{window.paintSpecies&&window.paintSpecies()}catch(_){}});
}
function adopt210(){
 const selected=(S.cands||[]).filter(m=>m&&Array.isArray(S.sel)&&S.sel.includes(m.id));if(selected.length!==3)return;
 const old=Array.isArray(S.nest)?S.nest:[];S.lineage=Array.isArray(S.lineage)?S.lineage:[];old.forEach(m=>{if(m&&!S.lineage.some(x=>x.id===m.id))S.lineage.push(m)});
 const left=(S.cands||[]).filter(m=>!S.sel.includes(m.id));S.foster=Array.isArray(S.foster)?S.foster:[];left.forEach(m=>S.foster.push(m));
 S.dex=S.dex||{b:0,a:0,f:0,r:0,rel:0};S.dex.a=(S.dex.a||0)+3;S.dex.f=(S.dex.f||0)+left.length;
 S.nest=selected.map(m=>m);S.cands=[];S.sel=[];S.parents=[];S.egg=null;S.turn=0;S.plans={};S.assign={};S.strat={};try{makeSchedule()}catch(_){S.schedule=[]}
 saveRoster210();try{render()}catch(e){console.error('render adopt210',e)}try{typeof window.show==='function'&&window.show('train')}catch(_){}
 setTimeout(()=>{renderRoster210();saveRoster210()},0);
}
function syncAdopt210(){const b=document.getElementById('adopt');if(!b)return;const n=(S.cands||[]).filter(m=>m&&Array.isArray(S.sel)&&S.sel.includes(m.id)).length;b.disabled=n!==3;b.textContent=n===3?'この3体をネストへ':`3体選ぶ（${n}/3）`;}
document.addEventListener('click',e=>{
 const a=e.target.closest?.('#adopt');if(a){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();adopt210();return}
 const p=e.target.closest?.('[data-p210]');if(p){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();S.plans[p.dataset.m210]=p.dataset.p210;renderRoster210();saveRoster210();return}
 const en=e.target.closest?.('[data-e210]');if(en){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();S.assign[en.dataset.e210]=en.dataset.m210;renderRoster210();saveRoster210();return}
 const st=e.target.closest?.('[data-s210]');if(st){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();S.strat[st.dataset.s210]=st.dataset.v210;renderRoster210();saveRoster210();return}
 if(e.target.closest?.('#cands [data-mode="c"]'))setTimeout(syncAdopt210,0);if(e.target.closest?.('.tab[data-v="train"]'))setTimeout(renderRoster210,0);
},true);
const prev210=render;render=function(){const out=prev210();syncAdopt210();setTimeout(renderRoster210,0);return out};
const css=document.createElement('style');css.textContent=`#plans{display:grid!important;gap:10px!important}.train210{border:2px solid #25344a;border-radius:16px;background:linear-gradient(145deg,#fff,#f2f7ff);padding:9px;box-shadow:0 5px 0 #0001}.train210>header{display:grid;grid-template-columns:96px 1fr;gap:9px;align-items:center}.train210>header .avatar{height:94px!important;border:0!important;border-radius:12px!important}.train210>header b{display:block;font-size:14px}.train210>header small{font-size:8px;color:#647080}.stats210{display:grid;grid-template-columns:1fr 1fr;gap:3px 7px;margin:7px 0}.stats210 span{display:flex;justify-content:space-between;padding:3px 5px;border-bottom:1px dotted #ccd5df;font-size:8px}.stats210 i,.stats210 em{font-style:normal}.stats210 .up210{background:#fff2aa;border-radius:6px}.stats210 em{color:#e45b00}.opts210{display:grid;grid-template-columns:1fr 1fr;gap:6px}.opts210 button{min-height:44px;border:2px solid #a9b9ca;border-radius:10px;background:#fff;display:flex;align-items:center;gap:7px;padding:7px;text-align:left;font-weight:900;color:#172033}.opts210 button:last-child{grid-column:1/3}.opts210 button strong{font-size:17px}.opts210 button span{font-size:9px}.opts210 .on210{background:#ccefff!important;border-color:#089fd2!important;box-shadow:0 0 0 3px #8ee4ff!important}#prep{display:grid!important;gap:11px!important}.evt210{border:2px solid #25344a;border-radius:16px;background:#f8fbff;padding:9px;box-shadow:0 5px 0 #0001}.evt210>header{display:flex;justify-content:space-between;gap:8px;margin-bottom:7px}.evt210>header b{display:block;font-size:13px}.evt210>header small{font-size:8px;color:#657080}.evt210>header em{font-style:normal;font-size:7px;background:#fff0b5;border-radius:999px;padding:4px 6px;font-weight:1000}.entries210{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.entries210>button{border:2px solid #aebdce;border-radius:12px;background:#fff;padding:0;overflow:hidden;text-align:left;color:#172033}.entries210>button.on210{background:#e3f8ff!important;border-color:#089fd2!important;box-shadow:0 0 0 3px #9eeaff!important}.entries210 .avatar{height:86px!important;border:0!important;border-bottom:1px solid #d6e0eb!important}.entries210>button>b,.entries210>button>small{display:block;padding:3px 5px 0;font-size:9px}.entries210>button>small{font-size:7px;color:#657080}.entries210>button>div{padding:4px 5px 6px}.entries210>button>div span{display:flex;justify-content:space-between;font-size:6px;border-top:1px dotted #ccd5df}.strat210{display:grid;grid-template-columns:auto repeat(4,1fr);gap:4px;align-items:center;margin-top:8px}.strat210>span{font-size:8px;font-weight:1000}.strat210 button{border:1px solid #aebdce;border-radius:8px;background:#fff;padding:7px 2px;font-size:8px;font-weight:900;color:#172033}.strat210 button.on210{background:#172b48!important;color:#fff!important;border-color:#172b48!important;box-shadow:0 0 0 2px #9fdfff!important}.empty210{border:2px dashed #9aa9b8;border-radius:14px;background:#f7fbff;padding:14px;text-align:center}.empty210 b{display:block;font-size:13px;margin-bottom:4px}.empty210 span{font-size:9px;color:#667789}`;document.head.appendChild(css);setTimeout(()=>{restoreRoster210();renderRoster210();syncAdopt210()},0);
})();