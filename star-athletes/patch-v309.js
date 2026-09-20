(()=>{
// v0.31.21: authoritative Nest Shop purchase handler.
// Handles purchases directly because legacy shop functions are closure-local.
const SAVE309='star-athletes-save-v200';
const NORMAL309={
 berry:{cost:250,msg:'🍓 元気ベリー',apply(){(S.nest||[]).forEach(m=>{m.stats.stamina=(Number(m.stats.stamina)||0)+2;m.stats.guts=(Number(m.stats.guts)||0)+2})}},
 speed:{cost:450,msg:'🍋 スピードフルーツ',target:true,apply(m){m.stats.speed=(Number(m.stats.speed)||0)+5;m.stats.agility=(Number(m.stats.agility)||0)+5}},
 power:{cost:450,msg:'🍖 パワーミート',target:true,apply(m){m.stats.power=(Number(m.stats.power)||0)+5;m.stats.guts=(Number(m.stats.guts)||0)+5}},
 tech:{cost:600,msg:'⭐ スタークッキー',target:true,apply(m){m.stats.tech=(Number(m.stats.tech)||0)+6;m.stats.agility=(Number(m.stats.agility)||0)+6}}
};
function save309(){try{localStorage.setItem(SAVE309,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function msg309(t){
 const e=document.getElementById('shopMsg122');if(e)e.textContent=t;
 let toast=document.getElementById('shopToast309');
 if(!toast){toast=document.createElement('div');toast.id='shopToast309';toast.className='shopToast309';document.body.appendChild(toast)}
 toast.textContent=t;toast.classList.add('show309');clearTimeout(window.__shopToast309);window.__shopToast309=setTimeout(()=>toast.classList.remove('show309'),1400);
}
function rerender309(){save309();try{render()}catch(_){};[30,120,300].forEach(ms=>setTimeout(sync309,ms))}
function buyNormal309(id){
 const item=NORMAL309[id];if(!item)return;
 if(!(S.nest||[]).length){msg309('育成メンバーがいません');return}
 if((Number(S.coins)||0)<item.cost){msg309('コインが足りません');return}
 let target=null;
 if(item.target){
   const sel=document.querySelector('#shop122 [data-shop-target="'+id+'"]');
   target=(S.nest||[]).find(m=>m.id===sel?.value)||(S.nest||[])[0];
   if(!target){msg309('対象を選べません');return}
 }
 S.coins=(Number(S.coins)||0)-item.cost;
 S.totalSpent=(Number(S.totalSpent)||0)+item.cost;
 item.apply(target);
 rerender309();
 msg309('✨ '+item.msg+'を使用！');
}
function allSpecies309(){return ['draco','unil','grimo','puru'].filter(x=>typeof SP!=='undefined'&&SP[x])}
function buySpecial309(id){
 S.specialShop=S.specialShop||{};
 const coins=Number(S.coins)||0;
 if(id==='lucky'){
   if(coins<900){msg309('コインが足りません');return}
   S.coins=coins-900;S.totalSpent=(Number(S.totalSpent)||0)+900;S.specialShop.lucky=(Number(S.specialShop.lucky)||0)+1;
   rerender309();msg309('🍀 ラッキーチャームを購入！');return;
 }
 if(id==='condition'){
   const t=(S.nest||[])[0];if(!t){msg309('育成メンバーがいません');return}
   if(coins<500){msg309('コインが足りません');return}
   S.coins=coins-500;S.totalSpent=(Number(S.totalSpent)||0)+500;
   Object.keys(t.stats||{}).forEach(k=>t.stats[k]=(Number(t.stats[k])||0)+3);
   rerender309();msg309('🥤 '+t.name+' 全能力+3');return;
 }
 if(id==='scout'){
   if(coins<700){msg309('コインが足りません');return}
   const all=allSpecies309();if(!all.length)return;
   const pool=typeof breederPool==='function'?breederPool():[...(S.starters||[]),...(S.nest||[]),...(S.lineage||[])];
   const owned=new Set(pool.filter(Boolean).map(x=>x.species));
   const missing=all.filter(x=>!owned.has(x)),list=missing.length?missing:all;
   const sp=list[Math.floor(Math.random()*list.length)];
   const gen=Math.max(0,...pool.map(x=>Number(x?.gen)||0));
   if(typeof monster!=='function'){msg309('スカウトを実行できません');return}
   const m=monster(sp,(SP[sp]?.[0]||'SCOUT').slice(0,2)+Math.floor(100+Math.random()*900),gen);
   m.origin='スカウト';S.lineage=S.lineage||[];S.lineage.push(m);
   S.coins=coins-700;S.totalSpent=(Number(S.totalSpent)||0)+700;
   rerender309();msg309('🔭 '+(SP[sp]?.[0]||'新種族')+'をスカウト！');return;
 }
}
function sync309(){
 const shop=document.getElementById('shop122');if(!shop)return;
 const coins=Number(S.coins)||0,has=Array.isArray(S.nest)&&S.nest.length>0;
 shop.querySelectorAll('[data-buy122]').forEach(b=>{
   const x=NORMAL309[b.dataset.buy122];if(x)b.disabled=!has||coins<x.cost;
 });
 shop.querySelectorAll('[data-special200]').forEach(b=>{
   const id=b.dataset.special200,cost=id==='lucky'?900:id==='condition'?500:700;
   b.disabled=coins<cost||(id==='condition'&&!has);
 });
}
document.addEventListener('click',e=>{
 const normal=e.target?.closest?.('#shop122 [data-buy122]');
 if(normal){
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
   if(!normal.disabled)buyNormal309(normal.dataset.buy122);
   return;
 }
 const special=e.target?.closest?.('#shop122 [data-special200]');
 if(special){
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
   if(!special.disabled)buySpecial309(special.dataset.special200);
 }
},true);
document.addEventListener('change',e=>{
 if(e.target?.matches?.('#shop122 [data-shop-target]'))sync309();
},true);
try{const prev=render;render=function(){const out=prev();[0,40,120].forEach(ms=>setTimeout(sync309,ms));return out}}catch(e){console.warn('render309',e)}
const css=document.createElement('style');css.id='shopFix309';css.textContent=`
#shop122 [data-buy122],#shop122 [data-special200],#shop122 select{pointer-events:auto!important;touch-action:manipulation!important}
.shopToast309{position:fixed;left:50%;bottom:92px;transform:translate(-50%,12px);z-index:100000;background:#172033;color:#ffe273;border:1px solid #ffffff33;border-radius:999px;padding:9px 14px;font-size:10px;font-weight:1000;opacity:0;pointer-events:none;transition:.18s}
.shopToast309.show309{opacity:1;transform:translate(-50%,0)}
`;document.head.appendChild(css);
[0,100,300].forEach(ms=>setTimeout(sync309,ms));
window.STAR_SHOP309={sync:sync309};
})();