(()=>{
// v0.21.0: own the "この3体をネストへ" transition end-to-end.
const ROSTER_KEY210='star-athletes-active-roster-v209';
function save210(){
  try{if(Array.isArray(S.nest)&&S.nest.length)localStorage.setItem(ROSTER_KEY210,JSON.stringify(S.nest))}catch(_){}
  try{typeof save200==='function'&&save200()}catch(_){}
}
function adopt210(){
  S.sel=Array.isArray(S.sel)?S.sel:[];
  S.cands=Array.isArray(S.cands)?S.cands:[];
  const chosen=S.cands.filter(m=>m&&S.sel.includes(m.id));
  if(chosen.length!==3){
    const b=document.getElementById('adopt');
    if(b){b.disabled=true;b.textContent=`3体選んでください（${chosen.length}/3）`}
    return;
  }
  const left=S.cands.filter(m=>m&&!S.sel.includes(m.id));
  S.foster=Array.isArray(S.foster)?S.foster:[];
  left.forEach(m=>S.foster.push(m));
  S.dex=S.dex||{b:0,a:0,f:0,r:0,rel:0};
  S.dex.f=(S.dex.f||0)+left.length;
  S.dex.a=(S.dex.a||0)+3;
  S.lineage=Array.isArray(S.lineage)?S.lineage:[];
  (S.nest||[]).forEach(m=>{if(m&&!S.lineage.some(x=>x.id===m.id))S.lineage.push(m)});
  S.nest=chosen;
  S.cands=[];
  S.sel=[];
  S.parents=[];
  S.egg=null;
  S.turn=0;
  S.plans={};
  S.assign={};
  S.strat={};
  try{makeSchedule()}catch(e){console.error('makeSchedule v210',e);S.schedule=S.schedule||[]}
  save210();
  try{render()}catch(e){console.error('render v210',e)}
  try{
    if(typeof show203==='function')show203('train');
    else if(typeof show==='function')show('train');
  }catch(e){console.error('show train v210',e)}
  setTimeout(()=>{
    try{typeof renderTraining208==='function'&&renderTraining208()}catch(_){}
    try{typeof render209==='function'&&render209()}catch(_){}
    try{window.paintSpecies&&window.paintSpecies()}catch(_){}
  },0);
}
function syncAdopt210(){
  const b=document.getElementById('adopt');if(!b)return;
  const n=(S.cands||[]).filter(m=>m&&Array.isArray(S.sel)&&S.sel.includes(m.id)).length;
  b.disabled=n!==3;
  b.textContent=n===3?'この3体をネストへ':`3体選ぶ（${n}/3）`;
}
// Capture before the legacy onclick, so state cannot be overwritten by an older handler.
document.addEventListener('click',e=>{
  const b=e.target.closest?.('#adopt');if(!b)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  adopt210();
},true);
// Keep button state correct when candidate cards are tapped.
document.addEventListener('click',e=>{if(e.target.closest?.('#cands [data-mode="c"]'))setTimeout(syncAdopt210,0)},true);
const before210=render;
render=function(){const out=before210();syncAdopt210();return out};
setTimeout(syncAdopt210,0);
})();