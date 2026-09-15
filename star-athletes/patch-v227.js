(()=>{
// v0.22.7: robust mission claims + true full local reset.
const SAVE227='star-athletes-save-v200';
const MISSION_REWARD227={breed3:500,breed10:1500,season1:500,season6:2500,win1:1200,fame1500:1800,emblem3:2200};
function missionOk227(id){
 const hist=Array.isArray(S.seasonHistory)?S.seasonHistory:[],breeds=Number(S.breedCount)||0,emblems=Array.isArray(S.emblems)?S.emblems:[];
 return id==='breed3'?breeds>=3:
 id==='breed10'?breeds>=10:
 id==='season1'?hist.length>=1:
 id==='season6'?hist.some(x=>Number(x.season)===6):
 id==='win1'?(Number(S.wins)||0)>=1:
 id==='fame1500'?(Number(S.fame)||0)>=1500:
 id==='emblem3'?emblems.length>=3:false;
}
function persist227(){
 try{localStorage.setItem(SAVE227,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.warn('save227',e)}
 try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem('star-athletes-active-roster-v210',JSON.stringify(S.nest))}catch(_){}
}
function claim227(id){
 S.missionClaimed=(S.missionClaimed&&typeof S.missionClaimed==='object')?S.missionClaimed:{};
 if(!MISSION_REWARD227[id]||!missionOk227(id)||S.missionClaimed[id])return;
 S.missionClaimed[id]=true;S.coins=(Number(S.coins)||0)+MISSION_REWARD227[id];persist227();
 try{render()}catch(e){console.error('mission render227',e)}
 setTimeout(()=>{
   const b=document.querySelector(`[data-mission200="${id}"]`);if(b){b.disabled=true;b.textContent='受取済'}
 },0);
}
// Capture before legacy relocated mission handlers so tapping always works.
window.addEventListener('click',e=>{
 const b=e.target&&e.target.closest?e.target.closest('[data-mission200]'):null;if(!b)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();claim227(b.dataset.mission200);
},true);
function resetAll227(){
 const ok=confirm('STAR ATHLETESのセーブ・育成メンバー・進行状況をすべて削除して最初から始めます。よろしいですか？');if(!ok)return;
 const keys=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.indexOf('star-athletes')===0)keys.push(k)}
 keys.forEach(k=>localStorage.removeItem(k));
 location.replace(location.pathname+'?v=227&reset='+Date.now());
}
function installReset227(){
 const dex=document.getElementById('dex');if(!dex)return;
 let box=document.getElementById('fullReset227');if(!box){box=document.createElement('div');box.id='fullReset227';box.className='box fullReset227';dex.appendChild(box)}
 box.innerHTML='<h3>🗑️ データ管理</h3><p>現在のセーブ、育成メンバー、リーグ進行、ミッション受取状況など、このゲームのローカルデータを全て消去します。</p><button id="resetAll227" type="button">全データを初期化</button>';
 const b=document.getElementById('resetAll227');if(b)b.onclick=resetAll227;
 const old=document.getElementById('resetSave200');if(old){old.textContent='全データ初期化はこちら↓';old.disabled=true}
}
const before227=render;render=function(){const out=before227();setTimeout(installReset227,0);return out};
const css=document.createElement('style');css.textContent=`.fullReset227{border:2px solid #d86969!important;background:#fff5f5!important}.fullReset227 p{font-size:8px;color:#755;line-height:1.6}.fullReset227 button{width:100%;border:0;border-radius:10px;background:#a62f2f;color:#fff;padding:10px;font-weight:1000}`;document.head.appendChild(css);
setTimeout(installReset227,0);
})();