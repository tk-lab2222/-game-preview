(()=>{
// v0.23.1: patch-v225 owns the visible season button (#next225), so intercept that path at S6.
const SAVE231='star-athletes-save-v200';
const FORCE231='star-athletes-force-season-v217';
function persist231(){try{localStorage.setItem(SAVE231,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.error('save231',e)}}
function finishGen231(){
  S.needsBreeding=true;
  S.generationActive=false;
  S.parents=[];S.cands=[];S.sel=[];S.egg=null;
  S.turn=0;S.schedule=[];S.plans={};S.assign={};S.strat={};
  S.season=1;S.seasonMeet=null;S.rivals225=[];S.rivalsPromo225=false;S.promotionPending=false;
  try{localStorage.removeItem(FORCE231)}catch(_){}
  persist231();
  const u=new URL(location.href);u.search='';u.searchParams.set('v','231');u.searchParams.set('breed','1');u.searchParams.set('t',Date.now());
  location.replace(u.toString());
}
function isFinalNormalNext231(b){
  if(!b||b.id!=='next225')return false;
  if((Number(S.season)||1)<6)return false;
  // If promotion is pending, the first button at S6 must still open the promotion battle.
  if(S.promotionPending||/昇格戦/.test(b.textContent||''))return false;
  return true;
}
window.addEventListener('click',e=>{
  const b=e.target?.closest?.('#next225');
  if(!isFinalNormalNext231(b))return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();finishGen231();
},true);
// Keep breeding as the only playable flow while waiting for next generation.
window.addEventListener('click',e=>{
  if(!S.needsBreeding)return;
  const blocked=e.target?.closest?.('.tab[data-v="train"],.tab[data-v="meet"],#toMeet,#doTrain,#run');
  if(!blocked)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  try{show('breed')}catch(_){}
},true);
setTimeout(()=>{if(S.needsBreeding){try{show('breed')}catch(_){}}},0);
})();