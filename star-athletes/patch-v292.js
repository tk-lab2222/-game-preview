(()=>{
// v0.31.6: keep tournament win chance display authoritative across Generation Season and Meet screens.
// The selected tier in S.meetChoice225 is the single source of truth; both screens read STAR_TOUR225.chance().
const VALID292=new Set(['safe','standard','challenge']);
function tier292(){return VALID292.has(S?.meetChoice225)?S.meetChoice225:'standard'}
function chance292(){
  try{
    const c=window.STAR_TOUR225?.chance?.(tier292());
    if(c&&Number.isFinite(Number(c.pct)))return c;
  }catch(_){}
  return null;
}
function label292(p){return p>=72?'かなり有利':p>=58?'やや有利':p>=42?'互角':p>=28?'やや不利':'強敵注意'}
function syncMeetChance292(){
  const c=chance292();if(!c)return;
  const panel=document.querySelector('#rival .rivalPanel225');if(!panel)return;
  const strong=panel.querySelector('.chance225 strong');
  const em=panel.querySelector('.chance225 em');
  if(strong)strong.textContent=`${Math.round(Number(c.pct))}%`;
  if(em)em.textContent=c.label||label292(Number(c.pct));
}
function syncSeasonChance292(){
  document.querySelectorAll('[data-star-meet290]').forEach((card,i)=>{
    const buttons=[...card.parentElement?.querySelectorAll?.('[data-star-meet290]')||[]];
    const n=buttons.length;
    const t=n>=3?(i===0?'safe':i===1?'standard':'challenge'):n===2?(i===0?'standard':'challenge'):'standard';
    const eventText=card.querySelector('small')?.textContent||'';
    const events=eventText.split('/').map(x=>x.trim()).filter(Boolean);
    let c=null;try{c=window.STAR_TOUR225?.chance?.(t,events)}catch(_){}
    const el=card.querySelector('.chance290');
    if(el&&c&&Number.isFinite(Number(c.pct)))el.textContent=`勝率 ${Math.round(Number(c.pct))}%`;
  });
}
function sync292(){syncSeasonChance292();syncMeetChance292()}
try{
  const prev=render;
  render=function(){
    const out=prev();
    [0,20,80,180].forEach(ms=>setTimeout(sync292,ms));
    return out;
  };
}catch(e){console.warn('render292',e)}
['toMeet'].forEach(id=>{
  const el=document.getElementById(id);
  if(el&&!el.dataset.chance292){el.dataset.chance292='1';el.addEventListener('click',()=>[0,20,80,180].forEach(ms=>setTimeout(sync292,ms)))}
});
const meetTab=document.querySelector('.tab[data-v="meet"]');
if(meetTab&&!meetTab.dataset.chance292){meetTab.dataset.chance292='1';meetTab.addEventListener('click',()=>[0,20,80,180].forEach(ms=>setTimeout(sync292,ms)))}
[0,40,120,300].forEach(ms=>setTimeout(sync292,ms));
window.STAR_CHANCE292={sync:sync292,current:()=>chance292()};
})();