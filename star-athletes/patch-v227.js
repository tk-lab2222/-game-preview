(()=>{
// v0.22.7: true full local reset.
const SAVE227='star-athletes-save-v200';
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
}
const before227=render;render=function(){const out=before227();setTimeout(installReset227,0);return out};
const css=document.createElement('style');css.textContent=`.fullReset227{border:2px solid #d86969!important;background:#fff5f5!important}.fullReset227 p{font-size:8px;color:#755;line-height:1.6}.fullReset227 button{width:100%;border:0;border-radius:10px;background:#a62f2f;color:#fff;padding:10px;font-weight:1000}`;document.head.appendChild(css);
setTimeout(installReset227,0);
})();