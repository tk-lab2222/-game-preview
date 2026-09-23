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
// v342 migration originally deduped every collection by m.id. Multiple legacy athletes without
// an id therefore collapsed onto the same undefined key and only the first received starPattern342.
// Repair only those missing records; newborns already receive starPattern342 in v342's baby wrapper.
function repairIdlessPattern359(){
 try{
  if(typeof S==='undefined'||!S||!window.STAR_PATTERN342?.info)return;
  const seen=new WeakSet();let changed=false;
  const visit=m=>{
   if(!m||typeof m!=='object'||seen.has(m))return;seen.add(m);
   if(m.id!=null||m.starPattern342||!m.visual)return;
   const x=window.STAR_PATTERN342.info(m);
   if(!x?.name)return;
   m.starPattern342={...x};changed=true;
  };
  for(const key of ['starters','nest','lineage','released','cands','foster'])for(const m of(S[key]||[]))visit(m);
  visit(S.egg);
  if(changed){
   localStorage.setItem('star-athletes-save-v200',JSON.stringify({savedAt:Date.now(),S}));
   setTimeout(()=>window.STAR_PATTERN342?.sync?.(),0);
  }
 }catch(e){console.warn('pattern359 legacy repair',e)}
}
// v343 has the same legacy-id dedupe shape in all343(): multiple athletes with no id collapse
// onto undefined and only the first is migrated to starBody343. Repair only missing idless records
// through v343's public info() so the original archetype/body rules remain the single source of truth.
function repairIdlessBody359(){
 try{
  if(typeof S==='undefined'||!S||!window.STAR_BODY343?.info)return;
  const seen=new WeakSet();let changed=false;
  const visit=m=>{
   if(!m||typeof m!=='object'||seen.has(m))return;seen.add(m);
   if(m.id!=null||m.starBody343)return;
   const x=window.STAR_BODY343.info(m);
   if(!x?.name)return;
   m.starBody343={...x};changed=true;
  };
  for(const key of ['starters','nest','lineage','released','cands','foster'])for(const m of(S[key]||[]))visit(m);
  visit(S.egg);
  if(changed){
   localStorage.setItem('star-athletes-save-v200',JSON.stringify({savedAt:Date.now(),S}));
   setTimeout(()=>window.STAR_BODY343?.sync?.(),0);
  }
 }catch(e){console.warn('body359 legacy repair',e)}
}
try{const prev=window.render;if(typeof prev==='function')window.render=function(){const out=prev.apply(this,arguments);setTimeout(clean359,0);return out}}catch(_){}
document.addEventListener('click',()=>setTimeout(clean359,0),true);
const css=document.createElement('style');css.textContent=`
.nm>.legacyRarity340,.nm>.rarityBadge249{display:none!important}
`;document.head.appendChild(css);
window.STAR_NAME_CLEAN359={sync:clean359,repairIdlessPattern:repairIdlessPattern359,repairIdlessBody:repairIdlessBody359};
repairIdlessPattern359();repairIdlessBody359();
setTimeout(repairIdlessPattern359,100);setTimeout(repairIdlessBody359,100);
setTimeout(clean359,100);setTimeout(clean359,500);
})();