(()=>{
'use strict';
// v0.31.95 safety: validate the persisted state before patch-v200 attempts to hydrate it.
// A syntactically valid JSON payload with a non-object S used to pass load200's truthy check
// and could abort the authoritative save layer before the later recovery patch had a chance to run.
const PRIMARY338='star-athletes-save-v200';
const BACKUP338='star-athletes-save-v200-backup';
function valid338(raw){
  if(!raw)return false;
  try{
    const d=JSON.parse(raw);
    return !!(d&&d.S&&typeof d.S==='object'&&!Array.isArray(d.S));
  }catch(_){return false}
}
try{
  const raw=localStorage.getItem(PRIMARY338);
  if(raw!==null&&!valid338(raw)){
    const backup=localStorage.getItem(BACKUP338);
    if(valid338(backup))localStorage.setItem(PRIMARY338,backup);
    else localStorage.removeItem(PRIMARY338);
  }
}catch(e){console.warn('save preflight 338',e)}
})();
