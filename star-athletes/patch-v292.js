(()=>{
// Meet-screen odds mirror only. No render ownership.
function label292(p){return p>=72?'かなり有利':p>=58?'やや有利':p>=42?'互角':p>=28?'やや不利':'強敵注意'}
function sync292(){
 const panel=document.querySelector('#rival .rivalPanel225');if(!panel)return;
 try{
   const c=window.STAR_TOUR225?.chance?.(S?.meetChoice225||'standard',S?.schedule||[],S?.rivals225||[]);
   if(!c||!Number.isFinite(Number(c.pct)))return;
   const strong=panel.querySelector('.chance225 strong'),em=panel.querySelector('.chance225 em');
   if(strong)strong.textContent=Math.round(Number(c.pct))+'%';
   if(em)em.textContent=c.label||label292(Number(c.pct));
 }catch(_){}
}
document.addEventListener('click',e=>{
 if(e.target?.closest?.('#toMeet,.tab[data-v="meet"]'))setTimeout(sync292,0);
},true);
window.STAR_CHANCE292={sync:sync292};
})();