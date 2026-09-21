(()=>{
'use strict';
// v0.31.83: read-only self-check for B-004 critical save/reload state.
if(window.STAR_SAVE_CHECK327)return;
const KEY327='star-athletes-save-v200';
const CRITICAL327=['active','season','league','nextGenLocked','wins','fame','coins','emblems','planetChamp'];
function stable327(v){
  if(v===undefined)return '__undefined__';
  try{return JSON.stringify(v,Object.keys(v&&typeof v==='object'&&!Array.isArray(v)?v:{}).sort())}catch(_){return String(v)}
}
function athlete327(a){
  if(!a||typeof a!=='object')return a;
  return {id:a.id,name:a.name,rarity:a.rarity,stats:a.stats,skill:a.skill,skills:a.skills,hidden:a.hidden,traits:a.traits,training:a.training};
}
function snapshot327(s){
  const out={};
  CRITICAL327.forEach(k=>out[k]=s?.[k]);
  out.activeRoster=(s?.active||s?.roster||[]).map?.(athlete327)||[];
  return out;
}
function check327(){
  let raw,d;
  try{raw=localStorage.getItem(KEY327);d=raw?JSON.parse(raw):null}catch(e){return {ok:false,reason:'SAVE_JSON_INVALID',error:String(e)}}
  if(!d?.S)return {ok:false,reason:'SAVE_MISSING'};
  const live=snapshot327(window.S||{}),saved=snapshot327(d.S),mismatches=[];
  const keys=new Set([...Object.keys(live),...Object.keys(saved)]);
  keys.forEach(k=>{if(stable327(live[k])!==stable327(saved[k]))mismatches.push(k)});
  return {ok:mismatches.length===0,reason:mismatches.length?'STATE_MISMATCH':'OK',mismatches,savedAt:d.savedAt||null,live,saved};
}
window.STAR_SAVE_CHECK327={check:check327,snapshot:()=>snapshot327(window.S||{})};
})();