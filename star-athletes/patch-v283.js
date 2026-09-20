(()=>{
// v0.29.6 / M9: non-P2W monetization concept UI only.
// No purchase SDK, no payment endpoint, no paid stats, no unlimited energy.
const SAVE283='star-athletes-save-v200';
const ITEMS283=[
 {id:'skin-neon',cat:'見た目',icon:'🎨',name:'ネオンスキン',desc:'選手カードの外観だけ変更',price:'¥300想定',type:'cosmetic'},
 {id:'hatch-prism',cat:'演出',icon:'🥚',name:'プリズム孵化演出',desc:'孵化時の光・背景演出を変更',price:'¥200想定',type:'cosmetic'},
 {id:'nest-space',cat:'背景',icon:'🌌',name:'ディープスペース背景',desc:'ネスト画面の背景テーマ',price:'¥300想定',type:'cosmetic'},
 {id:'frame-gold',cat:'称号',icon:'🏅',name:'ゴールド称号フレーム',desc:'称号表示の装飾フレーム',price:'¥200想定',type:'cosmetic'},
 {id:'share-holo',cat:'共有',icon:'📣',name:'ホロ共有カード',desc:'共有カードのデザイン変更',price:'¥200想定',type:'cosmetic'},
 {id:'archive-plus',cat:'保存',icon:'🧬',name:'血統アーカイブ拡張',desc:'血統保存枠を増やす候補',price:'¥400想定',type:'utility'},
 {id:'analysis-plus',cat:'分析',icon:'📊',name:'分析パネル+',desc:'血統・育成の詳細分析表示',price:'¥400想定',type:'utility'},
 {id:'season-pass',cat:'シーズン',icon:'🗓️',name:'シーズンパス',desc:'主に装飾・共有素材を追加',price:'¥600想定',type:'season'},
 {id:'energy-lite',cat:'補助',icon:'⚡',name:'ENERGY補助パック',desc:'LIMIT用の限定的な補助候補',price:'¥200想定',type:'energy'}
];
function state283(){
 if(!S.monetization283||typeof S.monetization283!=='object')S.monetization283={preview:{},wishlist:{}};
 if(!S.monetization283.preview)S.monetization283.preview={};
 if(!S.monetization283.wishlist)S.monetization283.wishlist={};
 return S.monetization283;
}
function persist283(){try{localStorage.setItem(SAVE283,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function allowed283(it){
 if(!it)return false;
 if(it.type==='cosmetic'||it.type==='utility'||it.type==='season'||it.type==='energy')return true;
 return false;
}
function principles283(){
 return [
  ['✓','最強個体の直接販売なし'],
  ['✓','有料限定の突破壁なし'],
  ['✓','無制限ENERGYなし'],
  ['✓','レア率アップ販売なし']
 ];
}
function render283(){
 const nest=document.getElementById('nest201');if(!nest)return;
 let host=document.getElementById('support283');
 if(!host){
  host=document.createElement('div');host.id='support283';host.className='box support283';
  const cont=document.getElementById('continuity281')||document.getElementById('rep280');
  cont?.after(host);if(!host.parentNode)nest.appendChild(host);
 }
 const st=state283();
 const cards=ITEMS283.filter(allowed283).map(it=>{
  const fav=!!st.wishlist[it.id];
  return `<article>
    <header><span>${it.icon}</span><div><small>${it.cat}</small><b>${it.name}</b></div><em>${it.price}</em></header>
    <p>${it.desc}</p>
    <div class="actions283"><button type="button" data-preview283="${it.id}">プレビュー</button><button type="button" data-wish283="${it.id}" class="${fav?'on283':''}">${fav?'★ 気になる':'☆ 気になる'}</button></div>
   </article>`;
 }).join('');
 host.innerHTML=`<div class="head283"><div><small>SUPPORT / CUSTOMIZE</small><b>🛍️ 応援・カスタマイズ候補</b></div><span>決済未実装</span></div>
 <p class="intro283">ここは公開前の課金導線テスト用UIです。<b>実際の購入・決済は発生しません。</b></p>
 <div class="guard283">${principles283().map(x=>`<span><b>${x[0]}</b>${x[1]}</span>`).join('')}</div>
 <div class="catalog283">${cards}</div>
 <div class="bottom283"><b>設計方針</b><p>強さそのものを売らず、見た目・共有・保存・分析・限定的な補助を中心にする。価格もすべて仮置き。</p></div>`;
}
function preview283(id){
 const it=ITEMS283.find(x=>x.id===id);if(!it)return;
 document.getElementById('previewModal283')?.remove();
 document.body.insertAdjacentHTML('beforeend',`<div id="previewModal283" class="back283"><section>
   <button type="button" data-close283>×</button>
   <div class="icon283">${it.icon}</div>
   <small>${it.cat} / PREVIEW</small>
   <h3>${it.name}</h3>
   <p>${it.desc}</p>
   <strong>${it.price}</strong>
   <div class="noBuy283">購入機能はまだありません</div>
   <button type="button" class="btn" data-close283>閉じる</button>
  </section></div>`);
}
window.addEventListener('click',e=>{
 const p=e.target?.closest?.('[data-preview283]');if(p){e.preventDefault();preview283(p.dataset.preview283);return}
 const w=e.target?.closest?.('[data-wish283]');if(w){e.preventDefault();const st=state283(),id=w.dataset.wish283;st.wishlist[id]=!st.wishlist[id];persist283();render283();return}
 if(e.target?.closest?.('[data-close283]')){e.preventDefault();document.getElementById('previewModal283')?.remove();return}
 if(e.target?.closest?.('.tab[data-v="nest201"]'))setTimeout(render283,0);
},true);
try{const prev283=render;render=function(){const out=prev283();setTimeout(render283,0);return out}}catch(e){console.warn('render283',e)}
window.STAR_MONETIZATION283={items:()=>ITEMS283.map(x=>({...x})),wishlist:()=>({...state283().wishlist})};
const css=document.createElement('style');css.textContent=`
.support283{border:2px solid #6e5b88!important;background:linear-gradient(145deg,#fcf9ff,#f7f2ff)!important}.head283{display:flex;justify-content:space-between;align-items:center}.head283 small{display:block;font-size:6px;letter-spacing:.12em;color:#77698e;font-weight:1000}.head283 b{font-size:13px}.head283>span{font-size:6px;border:1px solid #a998bb;border-radius:999px;padding:4px 7px;background:#fff}.intro283{font-size:7px;line-height:1.45;color:#675d72}.guard283{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin:8px 0}.guard283 span{padding:6px;border-radius:8px;background:#fff;border:1px solid #d4c9df;font-size:6px}.guard283 b{color:#23845b;margin-right:4px}
.catalog283{display:grid;gap:6px}.catalog283 article{padding:8px;border:1px solid #d0c5dc;border-radius:10px;background:#fff}.catalog283 header{display:grid;grid-template-columns:auto 1fr auto;gap:7px;align-items:center}.catalog283 header>span{font-size:20px}.catalog283 header small,.catalog283 header b{display:block}.catalog283 header small{font-size:5.5px;color:#7b7187}.catalog283 header b{font-size:9px}.catalog283 header em{font-size:7px;font-style:normal;color:#6f5c8d;font-weight:1000}.catalog283 p{margin:5px 0;font-size:6px;color:#68717b}.actions283{display:grid;grid-template-columns:1fr 1fr;gap:5px}.actions283 button{border:1px solid #ad9dbd;border-radius:8px;background:#faf8fc;padding:5px;font-size:6px;font-weight:1000}.actions283 button.on283{background:#fff2bd;border-color:#d3af3d}.bottom283{margin-top:8px;padding:7px;border-radius:9px;background:#2a203a;color:#fff}.bottom283 b{font-size:8px}.bottom283 p{margin:3px 0 0;font-size:6px;color:#d7cbe4;line-height:1.45}
.back283{position:fixed;inset:0;z-index:100002;background:#05070ccc;display:flex;align-items:center;justify-content:center;padding:20px}.back283 section{position:relative;width:min(360px,100%);padding:20px;border-radius:20px;background:linear-gradient(145deg,#fff,#f3ecfb);text-align:center;color:#251e31}.back283 section>button:first-child{position:absolute;right:10px;top:10px;width:30px;height:30px;border:0;border-radius:50%;background:#eee5f5;font-size:18px}.icon283{font-size:44px}.back283 small{font-size:6px;letter-spacing:.12em;color:#7b6b8f}.back283 h3{margin:5px 0;font-size:18px}.back283 p{font-size:8px;color:#635a6c}.back283 strong{display:block;margin:8px 0;font-size:16px}.noBuy283{margin:10px 0;padding:8px;border-radius:9px;background:#eee7f4;font-size:7px;font-weight:1000}.back283 .btn{width:100%}
`;document.head.appendChild(css);setTimeout(render283,0);
})();