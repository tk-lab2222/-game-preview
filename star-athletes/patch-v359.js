(()=>{
'use strict';
// v0.32.42: remove legacy C/U/R... badges from athlete names everywhere.
// Ability rank belongs only in the explicit "能力 ..." chip after development.
if(window.STAR_NAME_CLEAN359)return;
const R=/^(C|U|R|SR|SSR|UR|EX)$/;
function clean359(){
 document.querySelectorAll('.card .nm,.athleteCard .nm,#nest .nm,#cands .nm,#breeders .nm,#lineagePool .nm').forEach(nm=>{
  [...nm.children].forEach(el=>{
   if(el.classList.contains('abilityRank340')||el.classList.contains('athleteGrade340'))return;
   if(R.test((el.textContent||'').trim()))el.remove();
  });
 });
 // Legacy implementations often put the rank in an <em> immediately after the athlete name.
 document.querySelectorAll('.nm em,.nm i,.nm small,.nm span').forEach(el=>{
  if(el.classList.contains('abilityRank340')||el.classList.contains('athleteGrade340'))return;
  if(R.test((el.textContent||'').trim()))el.remove();
 });
}
try{const prev=window.render;if(typeof prev==='function')window.render=function(){const out=prev.apply(this,arguments);setTimeout(clean359,0);return out}}catch(_){}
document.addEventListener('click',()=>setTimeout(clean359,0),true);
const css=document.createElement('style');css.textContent=`
.nm>.legacyRarity340,.nm>.rarityBadge249{display:none!important}
`;document.head.appendChild(css);
window.STAR_NAME_CLEAN359={sync:clean359};setTimeout(clean359,100);setTimeout(clean359,500);
})();