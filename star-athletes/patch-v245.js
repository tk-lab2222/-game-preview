(()=>{
// v0.24.5: promotion battles are decided only after S6 annual ranking.
const SAVE245='star-athletes-save-v200';
function persist245(){
  try{localStorage.setItem(SAVE245,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}
  try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem('star-athletes-active-roster-v210',JSON.stringify(S.nest))}catch(_){}
}
function clearPrematurePromotion245(){
  const season=Math.max(1,Math.min(6,Number(S.season)||1));
  if(season>=6)return false;
  let changed=false;
  if(S.promotionPending){S.promotionPending=false;changed=true}
  if(Number(S.promotionFromSeason)){S.promotionFromSeason=0;changed=true}
  const result=document.getElementById('result');
  if(result){
    result.querySelectorAll('em').forEach(el=>{if((el.textContent||'').includes('昇格戦が発生'))el.remove()});
  }
  if(changed){persist245();try{render()}catch(_){} }
  return changed;
}
function settle245(){
  clearPrematurePromotion245();
  const season=Math.max(1,Math.min(6,Number(S.season)||1));
  if(season>=6)return;
  const b=document.getElementById('next225');
  if(b&&(b.textContent||'').includes('昇格戦')){
    S.promotionPending=false;S.promotionFromSeason=0;persist245();
    try{render()}catch(_){}
  }
}
// v225's normal tournament is async (~1.3s for four events), so normalize after completion.
window.addEventListener('click',e=>{
  if(!e.target?.closest?.('#run'))return;
  const season=Math.max(1,Math.min(6,Number(S.season)||1));
  if(season>=6)return;
  setTimeout(settle245,1500);setTimeout(settle245,2100);setTimeout(settle245,3000);
},false);
// Also repair saves that already carry a premature pending flag.
setTimeout(settle245,0);setTimeout(settle245,250);
})();