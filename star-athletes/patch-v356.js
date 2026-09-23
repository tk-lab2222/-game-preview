(()=>{
'use strict';
// v0.32.39: reset handshake must run BEFORE patch-v200 loads the old save.
// v355 ran at the end of the patch chain, so patch-v200 restored the old roster and later render wrappers saved it again.
const FLAG='star-athletes-reset-pending-v356',KEEP='star-athletes-save-v200-prebalance-03234';
function clear356(){
 const keep=localStorage.getItem(KEEP);
 const keys=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i)||'';if(k.startsWith('star-athletes-')&&k!==KEEP&&k!==FLAG)keys.push(k)}
 keys.forEach(k=>localStorage.removeItem(k));if(keep)localStorage.setItem(KEEP,keep);
 sessionStorage.clear();
}
try{
 if(localStorage.getItem(FLAG)==='1'||new URL(location.href).searchParams.has('fresh356')){
  clear356();localStorage.removeItem(FLAG);
  // app-v094 has already created the genuine empty base S. Do not replace it with {}.
  window.__STAR_FRESH_RESET356=true;
 }
}catch(e){console.error('early reset356',e)}
window.STAR_EARLY_RESET356={clear:clear356,flag:FLAG};
})();