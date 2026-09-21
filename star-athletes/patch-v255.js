(()=>{
// M0 regression diagnostics only. Runtime repair is owned by current feature modules.
function n255(v){return Number(v)||0}
function season255(){return Math.max(1,Math.min(6,n255(S.season)||1))}
function check255(){
  const problems=[];
  if(season255()<6&&S.promotionPending)problems.push('promotionPending before S6');
  if(season255()<6&&S.promotion233)problems.push('promotion233 before S6');
  if(!Array.isArray(S.nest))problems.push('nest is not array');
  if(!Array.isArray(S.cands))problems.push('cands is not array');
  if(!Array.isArray(S.parents))problems.push('parents is not array');
  if((S.nest||[]).length===3){
    for(const m of S.nest){
      if(!m?.id)problems.push('nest athlete missing id');
      if(!m?.stats)problems.push('nest athlete missing stats');
      if(!Array.isArray(m?.skills233))problems.push('nest athlete skills233 missing');
      if(!m?.hidden233)problems.push('nest athlete hidden233 missing');
    }
  }
  return {ok:problems.length===0,season:season255(),problems};
}
window.STAR_M0_255={check:check255};
})();