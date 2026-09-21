(()=>{
'use strict';
// v0.31.80: MY STAR replacement flow — full hall can be changed only by an explicit slot choice.
if(window.STAR_MY_STAR_REPLACE325)return;
let pending325=null;
function slots325(){try{return window.STAR_MY_STAR323?.slots?.()||[]}catch(_){return []}}
function esc325(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function ensure325(){
 let m=document.getElementById('myStarReplace325');if(m)return m;
 m=document.createElement('div');m.id='myStarReplace325';m.hidden=true;
 m.innerHTML='<div class="myStarReplaceCard325" role="dialog" aria-modal="true" aria-labelledby="myStarReplaceTitle325"><small>HALL OF FAME</small><h3 id="myStarReplaceTitle325">MY STARを入れ替える</h3><p id="myStarReplaceText325"></p><div id="myStarReplaceSlots325"></div><button type="button" class="cancel325" data-cancel325>キャンセル</button></div>';
 document.body.appendChild(m);return m;
}
function close325(){pending325=null;const m=document.getElementById('myStarReplace325');if(m)m.hidden=true}
function open325(id){
 const api=window.STAR_MY_STAR323;if(!api?.register)return;
 const athlete=(typeof api.current==='function'&&typeof window.S!=='undefined')?null:null;
 pending325=id;const m=ensure325(),arr=slots325();
 m.querySelector('#myStarReplaceText325').textContent='3体すべて登録済みです。残したい記録を勝手に消さないため、入れ替える枠を選んでください。';
 m.querySelector('#myStarReplaceSlots325').innerHTML=arr.map((x,i)=>{const a=x?.athlete||{};return '<button type="button" class="slot325" data-replace-slot325="'+i+'"><b>MY STAR '+(i+1)+'</b><span>'+esc325(a.name||'登録個体')+'</span><em>'+(esc325(a.rarity||'-'))+' / G'+(Number(a.gen||a.generation)||0)+'</em></button>'}).join('');
 m.hidden=false;
}
// Run before patch-v324's window capture guard. Only intercept a fourth NEW registration.
window.addEventListener('click',e=>{
 const b=e.target?.closest?.('[data-my-star323]');if(!b)return;
 const arr=slots325(),id=b.dataset.myStar323;
 if(arr.length<3||arr.some(x=>x?.sourceId===id))return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();open325(id);
},true);
document.addEventListener('click',e=>{
 if(e.target?.closest?.('[data-cancel325]')){close325();return}
 const b=e.target?.closest?.('[data-replace-slot325]');if(!b||!pending325)return;
 const id=pending325,slot=Number(b.dataset.replaceSlot325);
 let athlete=null;
 try{
   const pools=['starters','nest','lineage','released','cands','foster'];
   for(const k of pools){athlete=(window.S?.[k]||[]).find(x=>x?.id===id);if(athlete)break}
   if(!athlete&&window.S?.egg?.id===id)athlete=window.S.egg;
 }catch(_){}
 if(athlete&&Number.isInteger(slot)){window.STAR_MY_STAR323?.register?.(athlete,slot);close325()}
},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape')close325()});
const css=document.createElement('style');css.textContent=`
#myStarReplace325[hidden]{display:none!important}#myStarReplace325{position:fixed;inset:0;z-index:100004;display:grid;place-items:center;padding:18px;background:#080b16b8;backdrop-filter:blur(4px)}.myStarReplaceCard325{width:min(390px,100%);padding:16px;border:1px solid #d8c47a;border-radius:18px;background:linear-gradient(160deg,#251936,#101728);color:#fff;box-shadow:0 20px 60px #0008}.myStarReplaceCard325>small{font-size:7px;letter-spacing:.16em;color:#ffe477;font-weight:1000}.myStarReplaceCard325 h3{margin:3px 0 5px;font-size:18px}.myStarReplaceCard325 p{margin:0 0 11px;font-size:9px;line-height:1.7;color:#d9d6e5}.myStarReplaceCard325 #myStarReplaceSlots325{display:grid;gap:7px}.slot325{width:100%;display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;text-align:left;padding:10px;border:1px solid #ffffff2c;border-radius:12px;background:#ffffff0d;color:#fff}.slot325:active{transform:scale(.985)}.slot325 b{font-size:8px;color:#ffe477}.slot325 span{font-size:11px;font-weight:900}.slot325 em{font-size:7px;color:#bfc8da;font-style:normal}.cancel325{width:100%;margin-top:10px;padding:9px;border:0;border-radius:10px;background:#ffffff16;color:#e7e9f2;font-weight:900}
`;document.head.appendChild(css);
window.STAR_MY_STAR_REPLACE325={open:open325,close:close325,slots:slots325};
})();