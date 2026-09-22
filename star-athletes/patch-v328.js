(()=>{
'use strict';
// v0.31.84: allow explicit, confirmed MY STAR unregistration without touching the athlete itself.
if(window.STAR_MY_STAR_UNREGISTER328)return;
const SAVE328='star-athletes-save-v200';
function slots328(){try{return window.STAR_MY_STAR323?.slots?.()||[]}catch(_){return []}}
function save328(){try{localStorage.setItem(SAVE328,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function sync328(){
  try{window.STAR_MY_STAR323?.sync?.()}catch(_){}
  try{window.STAR_MY_STAR_PICKER327?.sync?.()}catch(_){}
  setTimeout(decorate328,30);
}
function toast328(name){
  let t=document.getElementById('myStarUnregisterToast328');
  if(!t){t=document.createElement('div');t.id='myStarUnregisterToast328';document.body.appendChild(t)}
  t.innerHTML='<b>☆ MY STAR 登録解除</b><span>'+(name||'登録個体')+' を殿堂から外しました</span>';
  t.classList.add('show328');clearTimeout(window.__starUnregisterToast328);
  window.__starUnregisterToast328=setTimeout(()=>t.classList.remove('show328'),1800);
}
function unregister328(slot){
  const arr=slots328(),idx=Number(slot);
  if(!Number.isInteger(idx)||idx<0||idx>=arr.length)return false;
  const entry=arr[idx],name=entry?.athlete?.name||'登録個体';
  if(!window.confirm('「'+name+'」を MY STAR から登録解除しますか？\n個体データ自体は削除されません。'))return false;
  arr.splice(idx,1);
  S.myStars323=arr.slice(0,3);
  delete S.myStar323;
  save328();sync328();toast328(name);
  return true;
}
function decorate328(){
  const hall=document.getElementById('hall323');if(!hall)return;
  hall.querySelectorAll('.myStarHero323[data-slot323]').forEach(card=>{
    const footer=card.querySelector('footer');if(!footer)return;
    let btn=footer.querySelector('.myStarUnregister328');
    if(!btn){
      btn=document.createElement('button');
      btn.type='button';btn.className='myStarUnregister328';
      btn.innerHTML='☆ 登録解除';
      footer.appendChild(btn);
    }
    btn.dataset.unregisterSlot328=card.dataset.slot323;
  });
}
document.addEventListener('click',e=>{
  const b=e.target?.closest?.('[data-unregister-slot328]');if(!b)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  unregister328(Number(b.dataset.unregisterSlot328));
},true);
try{
  const prev=window.STAR_MY_STAR323?.sync;
  if(typeof prev==='function'&&!prev.__wrapped328){
    const wrapped=function(){const out=prev.apply(this,arguments);setTimeout(decorate328,20);return out};
    wrapped.__wrapped328=true;window.STAR_MY_STAR323.sync=wrapped;
  }
}catch(e){console.warn('my star unregister 328 sync',e)}
const css=document.createElement('style');css.textContent=`
.myStarHero323 footer{flex-wrap:wrap}.myStarHero323 footer .myStarUnregister328{border-color:#ffb0b066;background:#5b223022;color:#ffd7dc}.myStarHero323 footer .myStarUnregister328:active{transform:scale(.98)}
#myStarUnregisterToast328{position:fixed;left:50%;bottom:86px;z-index:100006;width:min(330px,calc(100vw - 28px));transform:translate(-50%,16px);opacity:0;pointer-events:none;background:#201728;color:#fff;border:1px solid #cf9faf;border-radius:13px;padding:10px 14px;box-shadow:0 10px 28px #0005;text-align:center;transition:.18s}#myStarUnregisterToast328.show328{opacity:1;transform:translate(-50%,0)}#myStarUnregisterToast328 b,#myStarUnregisterToast328 span{display:block}#myStarUnregisterToast328 b{color:#ffd5df;font-size:11px}#myStarUnregisterToast328 span{font-size:8px;margin-top:3px;color:#ece3ea}
`;document.head.appendChild(css);
window.STAR_MY_STAR_UNREGISTER328={unregister:unregister328,sync:decorate328,slots:slots328};
[60,180,500].forEach(ms=>setTimeout(decorate328,ms));
})();