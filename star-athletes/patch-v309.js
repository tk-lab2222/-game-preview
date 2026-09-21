(()=>{
// v0.31.21: authoritative Nest Shop purchase handler.
// Handles purchases directly because legacy shop functions are closure-local.
const SAVE309='star-athletes-save-v200',ROSTER309='star-athletes-active-roster-v210',ROSTER209='star-athletes-active-roster-v209';
const NORMAL309={
 berry:{cost:250,msg:'🍓 元気ベリー',apply(){(S.nest||[]).forEach(m=>{m.stats.stamina=(Number(m.stats.stamina)||0)+2;m.stats.guts=(Number(m.stats.guts)||0)+2})}},
 speed:{cost:450,msg:'🍋 スピードフルーツ',target:true,apply(m){m.stats.speed=(Number(m.stats.speed)||0)+5;m.stats.agility=(Number(m.stats.agility)||0)+5}},
 power:{cost:450,msg:'🍖 パワーミート',target:true,apply(m){m.stats.power=(Number(m.stats.power)||0)+5;m.stats.guts=(Number(m.stats.guts)||0)+5}},
 tech:{cost:600,msg:'⭐ スタークッキー',target:true,apply(m){m.stats.tech=(Number(m.stats.tech)||0)+6;m.stats.agility=(Number(m.stats.agility)||0)+6}}
};
function save309(){
 try{localStorage.setItem(SAVE309,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}
 try{
   if(Array.isArray(S.nest)&&S.nest.length){
     const raw=JSON.stringify(S.nest);
     localStorage.setItem(ROSTER309,raw);
     localStorage.setItem(ROSTER209,raw);
   }
 }catch(_){}
}
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
 const e=document.getElementById('shopMsg122');
 if(e){e.textContent='✓ '+t;e.classList.remove('flash309');void e.offsetWidth;e.classList.add('flash309')}
 const shop=document.getElementById('shop122');
 if(shop){shop.classList.remove('bought309');void shop.offsetWidth;shop.classList.add('bought309')}
 let toast=document.getElementById('shopToast309');
 if(!toast){toast=document.createElement('div');toast.id='shopToast309';toast.className='shopToast309';document.body.appendChild(toast)}
 toast.innerHTML='<b>✓ 購入完了</b><span>'+t+'</span>';
 toast.classList.remove('show309');void toast.offsetWidth;toast.classList.add('show309');
 clearTimeout(window.__shopToast309);window.__shopToast309=setTimeout(()=>toast.classList.remove('show309'),1600);
}
function refreshNestWallet309(){
 const wallet=document.querySelector('#nestSummary201 .nestWallet201');
 if(!wallet)return;
 const cells=[...wallet.querySelectorAll('span')];
 for(const cell of cells){
   const label=(cell.querySelector('small')?.textContent||'').trim();
   const b=cell.querySelector('b');if(!b)continue;
   if(label==='COIN')b.textContent='🪙 '+(Number(S.coins)||0);
   if(label==='FAME')b.textContent='⭐ '+(Number(S.fame)||0);
   if(label==='BADGE')b.textContent='🏅 '+(S.emblems?.length||0);
 }
}
function rerender309(){
 // Purchase feedback must not redraw the whole app. A full render() rebuilds
 // multiple hidden sections and causes Safari scroll anchoring / visible jank.
 save309();
 renderShop309();
 refreshNestWallet309();
}
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
 <div class="specialShop200 shopSpecial309"><div class="specialTitle200"><b>✨ SPECIAL</b><span>大会後のもう一手</span></div><div class="specialStock200">所持効果：🍀 ${S.specialShop?.lucky||0}</div><div class="shopGrid122 specialGrid309">
 <div class="shopItem122 specialItem309"><div class="shopIcon122">🍀</div><div class="shopText122"><b>ラッキーチャーム</b><small>次の子のレア度を1段階UP</small></div><button type="button" data-special200="lucky" ${coins<900?'disabled':''}>🪙 900</button></div>
 <div class="shopItem122 specialItem309"><div class="shopIcon122">🥤</div><div class="shopText122"><b>コンディションドリンク</b><small>${has?S.nest[0].name:'育成メンバー'} 全能力+3</small></div><button type="button" data-special200="condition" ${coins<500||!has?'disabled':''}>🪙 500</button></div>
 <div class="shopItem122 specialItem309"><div class="shopIcon122">🔭</div><div class="shopText122"><b>スカウトパス</b><small>血統候補を1体スカウト</small></div><button type="button" data-special200="scout" ${coins<700?'disabled':''}>🪙 700</button></div>
 </div></div><div id="shopMsg122" class="shopMsg122"></div>`;
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
function commitTarget309(e){
 const sel=e.target?.closest?.('#shop122 [data-shop-target]');
 if(!sel)return;
 targets309()[sel.dataset.shopTarget]=sel.value;
 save309();
}
document.addEventListener('input',commitTarget309,true);
document.addEventListener('change',commitTarget309,true);
try{
 const prev=render;
 render=function(){const out=prev();setTimeout(renderShop309,0);return out}
}catch(e){console.warn('render309',e)}
window.STAR_SHOP309={sync:sync309,target:(id)=>targetId309(id)};
setTimeout(sync309,0);

const css309=document.createElement('style');css309.id='shopVisual309';css309.textContent=`
#shop122 .shopSpecial309{margin-top:12px;padding-top:10px;border-top:1px dashed #cda94d}
#shop122 .shopSpecial309 .specialTitle200{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}
#shop122 .shopSpecial309 .specialTitle200 b{font-size:9px;color:#9b6a00}
#shop122 .shopSpecial309 .specialTitle200 span{font-size:8px;color:#7b6a3a}
#shop122 .shopSpecial309 .specialStock200{font-size:8px;font-weight:900;color:#715a1c;margin:0 0 8px}
#shop122 .specialGrid309{display:grid;grid-template-columns:1fr 1fr;gap:7px}
#shop122 .specialItem309 button{grid-column:1/3;border:0;border-radius:8px;background:#222;color:#ffd966;font-weight:1000;padding:7px;font-size:9px}
#shop122 .specialItem309 button:disabled{opacity:.35}
@media(max-width:430px){#shop122 .specialGrid309{grid-template-columns:1fr}}
#shop122.bought309{animation:shopBought309 .34s ease-out}
#shop122 .shopMsg122.flash309{animation:shopMsg309 .9s ease-out;color:#176b43;background:#eefbf3;border:1px solid #8bd0aa;border-radius:8px;padding:6px 8px}
#shopToast309{position:fixed;left:50%;bottom:86px;z-index:100001;transform:translate(-50%,18px) scale(.96);opacity:0;pointer-events:none;min-width:210px;max-width:86vw;padding:10px 14px;border-radius:13px;background:#10261d;color:#fff;box-shadow:0 10px 30px #0005;text-align:center;transition:.18s ease}
#shopToast309 b,#shopToast309 span{display:block}#shopToast309 b{font-size:12px;color:#8ff0b9}#shopToast309 span{font-size:9px;margin-top:2px;color:#e6fff0}
#shopToast309.show309{opacity:1;transform:translate(-50%,0) scale(1)}
@keyframes shopBought309{0%{box-shadow:0 0 0 0 #6bd69a00}35%{box-shadow:0 0 0 4px #6bd69a66}100%{box-shadow:0 0 0 0 #6bd69a00}}
@keyframes shopMsg309{0%{transform:scale(.97);opacity:.4}35%{transform:scale(1.02);opacity:1}100%{transform:scale(1)}}
`;document.head.appendChild(css309);

})();