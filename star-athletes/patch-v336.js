(()=>{
'use strict';
// v0.31.94: authoritative "load latest" handler + immediate persistence for core selects.
// Older patch-v097 rewrites the button to the legacy entry path; override it last.
if(window.STAR_RELOAD336)return;
const SAVE336='star-athletes-save-v200';
function save336(){
  try{
    if(typeof S!=='object'||!S)return false;
    localStorage.setItem(SAVE336,JSON.stringify({savedAt:Date.now(),S}));
    return true;
  }catch(e){console.warn('core save 336',e);return false}
}
function install336(){
  const b=document.getElementById('reloadBtn');
  if(!b)return;
  b.onclick=e=>{
    e?.preventDefault?.();
    e?.stopPropagation?.();
    save336();
    const stamp=Date.now();
    location.replace('../star-athletes-v112/?v=3194-'+stamp);
  };
  b.dataset.latest336='1';
}
// data-plan/data-a/data-s mutate S without render(), so v200 would otherwise save stale choices.
document.addEventListener('change',e=>{
  if(!e.target?.matches?.('select[data-plan],select[data-a],select[data-s]'))return;
  // Existing target onchange handlers update S first; persist immediately afterwards.
  setTimeout(save336,0);
},false);
window.addEventListener('pagehide',save336,{capture:false});
window.STAR_RELOAD336={install:install336,save:save336};
install336();
setTimeout(install336,80);
setTimeout(install336,300);
})();