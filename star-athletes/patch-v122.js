(()=>{
// v0.12.2: Nest Shop - turn tournament coins into immediate training value.
const SHOP122=[
  {id:'berry',name:'元気ベリー',icon:'🍓',cost:250,desc:'3体全員のスタミナ・こんじょう +2',apply(){S.nest.forEach(m=>{m.stats.stamina+=2;m.stats.guts+=2});return '全員のスタミナ・こんじょうが +2！'}},
  {id:'speed',name:'スピードフルーツ',icon:'🍋',cost:450,desc:'選んだ1体のスピード・すばやさ +5',target:true,apply(m){m.stats.speed+=5;m.stats.agility+=5;return `${m.name}のスピード・すばやさが +5！`}},
  {id:'power',name:'パワーミート',icon:'🍖',cost:450,desc:'選んだ1体のちから・こんじょう +5',target:true,apply(m){m.stats.power+=5;m.stats.guts+=5;return `${m.name}のちから・こんじょうが +5！`}},
  {id:'tech',name:'スタークッキー',icon:'⭐',cost:600,desc:'選んだ1体のテクニック・すばやさ +6',target:true,apply(m){m.stats.tech+=6;m.stats.agility+=6;return `${m.name}のテクニック・すばやさが +6！`}}
];
function ensureShop122(){
  const train=document.getElementById('train');if(!train)return;
  let box=document.getElementById('shop122');
  if(!box){
    box=document.createElement('div');box.id='shop122';box.className='box shop122';
    const boxes=train.querySelectorAll(':scope>.box');
    if(boxes[1])train.insertBefore(box,boxes[1]);else train.appendChild(box);
  }
  renderShop122();
}
function renderShop122(){
  const box=document.getElementById('shop122');if(!box)return;
  const coins=S.coins||0,hasNest=Array.isArray(S.nest)&&S.nest.length>0;
  box.innerHTML=`<div class="shopHead122"><div><small>NEST SHOP</small><h3>🪙 ネストショップ</h3></div><b>${coins} coin</b></div><div class="shopNote122">大会報酬を育成へ還元。今季の戦力をすぐ底上げできます。</div><div class="shopGrid122">${SHOP122.map(x=>`<div class="shopItem122"><div class="shopIcon122">${x.icon}</div><div class="shopText122"><b>${x.name}</b><small>${x.desc}</small></div>${x.target?`<select data-shop-target="${x.id}" ${!hasNest?'disabled':''}>${hasNest?S.nest.map(m=>`<option value="${m.id}">${m.name}</option>`).join(''):'<option>育成メンバーなし</option>'}</select>`:''}<button type="button" data-buy122="${x.id}" ${coins<x.cost||!hasNest?'disabled':''}>🪙 ${x.cost}</button></div>`).join('')}</div><div id="shopMsg122" class="shopMsg122"></div>`;
  box.querySelectorAll('[data-buy122]').forEach(b=>b.onclick=()=>buy122(b.dataset.buy122));
}
function buy122(id){
  const item=SHOP122.find(x=>x.id===id);if(!item||!S.nest.length)return;
  if((S.coins||0)<item.cost){showMsg122('コインが足りません');return}
  let target=null;
  if(item.target){const sel=document.querySelector(`[data-shop-target="${id}"]`);target=S.nest.find(m=>m.id===sel?.value)||S.nest[0]}
  S.coins-=item.cost;
  const msg=item.apply(target);
  render();
  ensureShop122();
  showMsg122(`✨ ${item.name}を使用！ ${msg}`);
}
function showMsg122(t){const e=document.getElementById('shopMsg122');if(e)e.textContent=t}
const renderPrev122=render;
render=function(){renderPrev122();ensureShop122()};
const css=document.createElement('style');
css.textContent=`
.shop122{background:linear-gradient(180deg,#fffdf5,#fff7d9);border:2px solid #e1b94f!important}
.shopHead122{display:flex;align-items:center;justify-content:space-between;gap:10px}.shopHead122 small{font-size:7px;letter-spacing:.15em;color:#9b6a00;font-weight:1000}.shopHead122 h3{margin:1px 0 0}.shopHead122>b{background:#221a06;color:#ffd966;border-radius:999px;padding:6px 10px;font-size:11px;white-space:nowrap}
.shopNote122{font-size:9px;color:#66552a;margin:5px 0 9px}.shopGrid122{display:grid;grid-template-columns:1fr 1fr;gap:7px}.shopItem122{display:grid;grid-template-columns:34px 1fr;gap:4px 7px;align-items:center;border:1px solid #d6ba69;background:#fff;border-radius:12px;padding:7px;box-shadow:0 2px 0 #0001}.shopIcon122{font-size:26px;text-align:center}.shopText122{min-width:0}.shopText122 b{display:block;font-size:10px}.shopText122 small{display:block;font-size:7px;color:#666;line-height:1.35}.shopItem122 select{grid-column:1/3;width:100%;font-size:9px;padding:5px}.shopItem122 button{grid-column:1/3;border:0;border-radius:8px;background:#222;color:#ffd966;font-weight:1000;padding:7px;font-size:9px}.shopItem122 button:disabled{opacity:.35}.shopMsg122{min-height:16px;font-size:9px;font-weight:1000;color:#a04e00;margin-top:7px}
@media(max-width:430px){.shopGrid122{grid-template-columns:1fr}}
`;
document.head.appendChild(css);
setTimeout(()=>{try{ensureShop122()}catch(e){console.error('shop v122 failed',e)}},0);
})();