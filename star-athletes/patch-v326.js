(()=>{
'use strict';
// v0.31.81: keep one valid previous save so malformed primary JSON does not erase progress.
if(window.STAR_SAVE_RECOVERY326)return;
const PRIMARY326='star-athletes-save-v200',BACKUP326='star-athletes-save-v200-backup';
function parse326(raw){
  if(!raw)return null;
  try{const d=JSON.parse(raw);return d&&d.S&&typeof d.S==='object'&&!Array.isArray(d.S)?d:null}catch(_){return null}
}
function backup326(){
  try{
    const raw=localStorage.getItem(PRIMARY326),d=parse326(raw);
    if(d)localStorage.setItem(BACKUP326,raw);
    return !!d;
  }catch(_){return false}
}
function recover326(){
  try{
    const raw=localStorage.getItem(PRIMARY326);
    if(raw===null||parse326(raw))return false;
    const back=localStorage.getItem(BACKUP326),d=parse326(back);
    if(!d)return false;
    localStorage.setItem(PRIMARY326,back);
    window.S=d.S;
    return true;
  }catch(_){return false}
}
const recovered326=recover326();
try{
  const prev326=window.render;
  if(typeof prev326==='function')window.render=function(){backup326();return prev326.apply(this,arguments)};
}catch(e){console.warn('save recovery 326',e)}
if(recovered326){
  try{window.render?.()}catch(e){console.warn('save recovery render 326',e)}
  setTimeout(()=>{
    let t=document.getElementById('saveRecovery326');
    if(!t){t=document.createElement('div');t.id='saveRecovery326';document.body.appendChild(t)}
    t.textContent='💾 セーブデータを直前の正常状態から復元しました';t.classList.add('show326');
    setTimeout(()=>t.classList.remove('show326'),2600);
  },0);
}else backup326();
const css=document.createElement('style');css.textContent=`#saveRecovery326{position:fixed;left:50%;bottom:86px;z-index:100005;max-width:calc(100vw - 28px);transform:translate(-50%,14px);opacity:0;pointer-events:none;padding:9px 13px;border:1px solid #7fd3a8;border-radius:12px;background:#10261d;color:#eafff2;font-size:9px;font-weight:900;box-shadow:0 10px 28px #0005;transition:.18s;white-space:nowrap}#saveRecovery326.show326{opacity:1;transform:translate(-50%,0)}`;document.head.appendChild(css);
window.STAR_SAVE_RECOVERY326={backup:backup326,recover:recover326,backupKey:BACKUP326};
})();