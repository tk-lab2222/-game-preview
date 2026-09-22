(()=>{
'use strict';
// v0.31.94: persist core training/meet selections immediately.
// These selects mutate S without calling render(), while v200 normally saves from render().
// A reload immediately after changing a plan/athlete/strategy could therefore restore stale choices.
if(window.STAR_CORE_SAVE337)return;
const SAVE337='star-athletes-save-v200';
function save337(){
  try{
    if(typeof S!=='object'||!S)return false;
    localStorage.setItem(SAVE337,JSON.stringify({savedAt:Date.now(),S}));
    return true;
  }catch(e){console.warn('core save 337',e);return false}
}
function isCoreSelect337(el){
  return !!el?.matches?.('select[data-plan],select[data-a],select[data-s]');
}
document.addEventListener('change',e=>{
  if(!isCoreSelect337(e.target))return;
  // Existing onchange handlers update S at target phase; persist after they finish.
  setTimeout(save337,0);
},false);
window.addEventListener('pagehide',save337,{capture:false});
window.STAR_CORE_SAVE337={save:save337};
})();