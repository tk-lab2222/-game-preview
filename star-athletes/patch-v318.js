(()=>{
// v0.31.39: reload guard + post-load tournament hydration.
function hydrate318(){
 try{window.STAR_MEET290?.sync?.()}catch(_){}
 try{window.STAR_CHANCE292?.sync?.()}catch(_){}
 const wrap=document.querySelector('#season119 .meetChoice119');
 if(!wrap)return;
 const cards=[...wrap.querySelectorAll('.meetChoiceCard125,.meetCard290')];
 let broken=false;
 cards.forEach((card,i)=>{
   if(!card.dataset.starMeet290)card.dataset.starMeet290=String(i);
   const chance=card.querySelector('.chance290');
   if(!chance||!/\d+%/.test(chance.textContent||''))broken=true;
 });
 if(broken){
   try{window.STAR_MEET290?.cards?.()}catch(_){}
 }
}
function boot318(){
 hydrate318();
 [60,180,500,1200].forEach(ms=>setTimeout(hydrate318,ms));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot318,{once:true});
else boot318();
window.addEventListener('pageshow',()=>{
 setTimeout(hydrate318,0);
});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(hydrate318,0)});
window.STAR_BOOT318={hydrate:hydrate318};
})();
