(()=>{
'use strict';
// v0.32.38: harden every visible "full reset" control.
// The previous fix added a new safe button but did not intercept the legacy reset button the user was actually pressing.
if(window.STAR_HARD_RESET355)return;
const KEEP='star-athletes-save-v200-prebalance-03234';
function hard355(){
 if(!confirm('STAR ATHLETESの現在の進行をすべて初期化し、G1から開始します。\n保護してある旧プレイデータだけは残します。よろしいですか？'))return;
 try{
  const keep=localStorage.getItem(KEEP);
  // Clear all STAR ATHLETES live keys. This prevents any older patch/backup key from repopulating S.
  const dels=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i)||'';if(k.startsWith('star-athletes-')&&k!==KEEP)dels.push(k)}
  dels.forEach(k=>localStorage.removeItem(k));
  if(keep)localStorage.setItem(KEEP,keep);
  sessionStorage.clear();
  // Replace the current runtime too, so no late save handler can write the old roster back before navigation.
  try{window.S={}}catch(_){}
  location.replace(location.pathname+'?fresh355='+Date.now());
 }catch(e){console.error('hard reset355',e);alert('初期化処理でエラーが発生しました。')}
}
function looksReset355(el){
 if(!el)return false;const t=(el.textContent||el.value||el.getAttribute?.('aria-label')||'').replace(/\s+/g,'');
 return /全データ.*初期化|データ.*初期化|最初から|G1からプレイテスト開始/.test(t);
}
// Capture phase: stop legacy handlers before they can save/restore stale S.
document.addEventListener('click',e=>{
 const el=e.target?.closest?.('button,a,[role="button"],input[type="button"],input[type="submit"]');
 if(!looksReset355(el))return;
 e.preventDefault();e.stopImmediatePropagation();hard355();
},true);
function mark355(){
 document.querySelectorAll('button,a,[role="button"],input[type="button"],input[type="submit"]').forEach(el=>{if(looksReset355(el)){el.dataset.hardReset355='1';if(/全データ.*初期化/.test((el.textContent||'').replace(/\s+/g,'')))el.title='現在の進行を完全初期化（保護データは保持）'}});
}
try{const prev=window.render;if(typeof prev==='function')window.render=function(){const out=prev.apply(this,arguments);setTimeout(mark355,0);return out}}catch(_){}
window.STAR_HARD_RESET355={reset:hard355,sync:mark355};
setTimeout(mark355,100);setTimeout(mark355,600);
})();