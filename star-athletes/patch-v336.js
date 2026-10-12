(()=>{
'use strict';
// Core controls/pagehide use the canonical save owner. Refresh belongs to GamePreviewStandard.
if(window.STAR_CORE_SAVE336)return;
function save336(){
  try{return window.STAR_SAVE_CORE?.save?.('core-controls336')||false}catch(e){console.warn('core save336',e);return false}
}
// data-plan/data-a/data-s mutate S without render(), so v200 would otherwise save stale choices.
document.addEventListener('change',e=>{
  if(!e.target?.matches?.('select[data-plan],select[data-a],select[data-s]'))return;
  // Existing target onchange handlers update S first; persist immediately afterwards.
  setTimeout(save336,0);
},false);
window.addEventListener('pagehide',save336,{capture:false});
window.STAR_CORE_SAVE336={save:save336};
})();
