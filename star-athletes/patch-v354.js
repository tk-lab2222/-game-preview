(()=>{
'use strict';
// v0.32.37: reliable playtest reset + compact/readable star-grade badges.
if(window.STAR_RESET354)return;
const PRIMARY='star-athletes-save-v200',BACKUP='star-athletes-save-v200-backup',SNAP='star-athletes-save-v200-prebalance-03234';
function toast354(t){let e=document.getElementById('resetToast354');if(!e){e=document.createElement('div');e.id='resetToast354';document.body.appendChild(e)}e.textContent=t;e.classList.add('show354');setTimeout(()=>e.classList.remove('show354'),1800)}
function reset354(){
 if(!confirm('現在の進行を初期化してG1からプレイテストを開始します。\n保護データは削除しません。よろしいですか？'))return;
 try{
  // Keep the explicit pre-balance snapshot, but remove every live/automatic save that can resurrect the old roster.
  localStorage.removeItem(PRIMARY);localStorage.removeItem(BACKUP);
  for(let i=localStorage.length-1;i>=0;i--){const k=localStorage.key(i)||'';if(k.startsWith('star-athletes-')&&k!==SNAP&&k!==PRIMARY&&k!==BACKUP&&/save|backup|session|played/i.test(k))localStorage.removeItem(k)}
  sessionStorage.clear();
  const u=new URL(location.href);u.search='';u.searchParams.set('reset354','1');u.searchParams.set('t',Date.now());location.replace(u.toString());
 }catch(e){console.error('reset354',e);toast354('初期化に失敗しました')}
}
function tools354(){
 const host=document.getElementById('saveTools352');if(!host||document.getElementById('reset354'))return;
 const b=document.createElement('button');b.id='reset354';b.type='button';b.textContent='🗑️ G1からプレイテスト開始';b.onclick=reset354;
 const row=host.querySelector('.saveBtns352');if(row)row.appendChild(b);else host.appendChild(b);
}
function star354(){
 document.querySelectorAll('.athleteGrade340').forEach(el=>{
  const m=(el.textContent||'').match(/(★{1,5})\s*(通常|希少|輝星|幻星|神星)/);if(!m)return;
  el.innerHTML='<b class="starIcons354">'+m[1]+'</b><span>'+m[2]+'</span>';
 });
}
function sync354(){tools354();star354()}
document.addEventListener('click',e=>{if(e.target?.closest?.('.tab,#hatch,#adopt'))setTimeout(sync354,40)},true);
const css=document.createElement('style');css.textContent=`
.saveBtns352{grid-template-columns:1fr 1fr!important}.saveBtns352 #reset354{grid-column:1/3;border-color:#d88b8b!important;background:#fff4f4!important;color:#8d3434!important}
.athleteGrade340{margin-left:4px!important;padding:3px 6px!important;gap:3px!important;align-items:center!important;max-width:92px!important;overflow:hidden!important}.athleteGrade340 .starIcons354{font-size:7px!important;line-height:1!important;letter-spacing:-1.2px!important;white-space:nowrap!important}.athleteGrade340 span{font-size:6px!important;white-space:nowrap!important}.nm{flex-wrap:wrap!important;row-gap:3px!important}.nm>.athleteGrade340{margin-left:auto!important}.abilityRank340{font-size:6px!important;padding:3px 5px!important}
#resetToast354{position:fixed;left:50%;bottom:84px;z-index:100050;transform:translate(-50%,10px);opacity:0;padding:9px 13px;border-radius:10px;background:#241c2e;color:#fff;font-size:9px;font-weight:1000;transition:.18s;pointer-events:none}#resetToast354.show354{opacity:1;transform:translate(-50%,0)}
`;document.head.appendChild(css);
window.STAR_RESET354={reset:reset354,sync:sync354};
setTimeout(sync354,120);setTimeout(sync354,600);
})();