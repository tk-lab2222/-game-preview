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
function targets309(){
 S.shopTargets309=S.shopTargets309&&typeof S.shopTargets309==='object'?S.shopTargets309:{};
 return S.shopTargets309;
}
function targetId309(id){
 const nest=Array.isArray(S.nest)?S.nest:[];
 const t=targets309(),valid=nest.some(m=>m.id===t[id]);
 if(!valid)t[id]=nest[0]?.id||'';
 return t[id]||'';
}
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
   const targetId=targetId309(id);
   target=(S.nest||[]).find(m=>m.id===targetId)||null;
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
function renderShop309(){
 const host=document.getElementById('nestShopHost201');if(!host)return;
 let shop=document.getElementById('shop122');
 if(!shop){shop=document.createElement('div');shop.id='shop122';shop.className='box shop122';host.appendChild(shop)}
 else if(shop.parentElement!==host)host.appendChild(shop);
 const coins=Number(S.coins)||0,has=Array.isArray(S.nest)&&S.nest.length>0;
 const items=[
  ['berry','🍓','元気ベリー','3体全員のスタミナ・こんじょう +2',250,false],
  ['speed','🍋','スピードフルーツ','選んだ1体のスピード・すばやさ +5',450,true],
  ['power','🍖','パワーミート','選んだ1体のちから・こんじょう +5',450,true],
  ['tech','⭐','スタークッキー','選んだ1体のテクニック・すばやさ +6',600,true]
 ];
 const t=targets309();
 items.forEach(([id,,,,,target])=>{if(target)targetId309(id)});
 const renderKey=JSON.stringify([
   coins,
   (S.nest||[]).map(m=>[m.id,m.name]),
   Number(S.specialShop?.lucky)||0,
   t
 ]);
 if(shop.dataset.renderKey309===renderKey&&shop.querySelector('[data-buy122]'))return;
 shop.dataset.renderKey309=renderKey;
 shop.innerHTML=`<div class="shopHead122"><div><small>NEST SHOP</small><h3>🪙 ネストショップ</h3></div><b>${coins} coin</b></div>
 <div class="shopGrid122">${items.map(([id,ic,n,d,cost,target])=>`<div class="shopItem122"><div class="shopIcon122">${ic}</div><div class="shopText122"><b>${n}</b><small>${d}</small></div>${target?`<select data-shop-target="${id}" ${!has?'disabled':''}>${has?S.nest.map(m=>`<option value="${m.id}" ${targetId309(id)===m.id?'selected':''}>${m.name}</option>`).join(''):'<option>育成メンバーなし</option>'}</select>`:''}<button type="button" data-buy122="${id}" ${!has||coins<cost?'disabled':''}>🪙 ${cost}</button></div>`).join('')}</div>
 <div class="specialShop200"><div class="specialTitle200"><b>✨ SPECIAL</b><span>大会後のもう一手</span></div><div class="specialGrid200">
 <button data-special200="lucky" ${coins<900?'disabled':''}><b>🍀 ラッキーチャーム</b><small>次の子のレア度を1段階UP</small><em>🪙 900</em></button>
 <button data-special200="condition" ${coins<500||!has?'disabled':''}><b>🥤 コンディションドリンク</b><small>${has?S.nest[0].name:'育成メンバー'} 全能力+3</small><em>🪙 500</em></button>
 <button data-special200="scout" ${coins<700?'disabled':''}><b>🔭 スカウトパス</b><small>血統候補を1体スカウト</small><em>🪙 700</em></button></div><div class="specialStock200">所持効果：🍀 ${S.specialShop?.lucky||0}</div></div><div id="shopMsg122" class="shopMsg122"></div>`;
 // Interaction is owned by the delegated handlers below; keep render side-effect free.
}
function sync309(){renderShop309()}
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
 const sel=e.target?.closest?.('#shop122 [data-shop-target]');
 if(!sel)return;
 targets309()[sel.dataset.shopTarget]=sel.value;
 save309();
},true);
try{
 const prev=render;
 render=function(){const out=prev();setTimeout(renderShop309,0);return out}
}catch(e){console.warn('render309',e)}
window.STAR_SHOP309={sync:sync309,target:(id)=>targetId309(id)};
setTimeout(sync309,0);

})();