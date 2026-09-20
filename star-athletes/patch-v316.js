(()=>{
// v0.31.34: final tournament selector guard.
// Re-sync Generation Season cards after later renders and make every visible tournament card tappable.
function sync316(){
 try{window.STAR_MEET290?.sync?.()}catch(_){}
 const wrap=document.querySelector('#season119 .meetChoice119');
 if(!wrap)return;
 const cards=[...wrap.querySelectorAll('.meetChoiceCard125,.meetCard290')];
 cards.forEach((card,i)=>{
   card.dataset.starMeet290=String(i);
   card.style.pointerEvents='auto';
   card.style.touchAction='manipulation';
   card.style.position='relative';
   card.style.zIndex='5';
 });
}
document.addEventListener('click',e=>{
 const card=e.target?.closest?.('#season119 .meetChoice119 .meetChoiceCard125,#season119 .meetChoice119 .meetCard290');
 if(!card)return;
 const wrap=card.parentElement;
 const cards=[...wrap.querySelectorAll('.meetChoiceCard125,.meetCard290')];
 const i=Math.max(0,cards.indexOf(card));
 e.preventDefault();
 e.stopPropagation();
 e.stopImmediatePropagation();
 try{
   if(window.STAR_MEET290?.apply)window.STAR_MEET290.apply(i);
   else card.dataset.starMeet290=String(i);
 }catch(err){console.warn('meet316',err)}
 [0,40,120,280].forEach(ms=>setTimeout(sync316,ms));
},true);
try{
 const prev=render;
 render=function(){const out=prev();[0,40,120,300].forEach(ms=>setTimeout(sync316,ms));return out};
}catch(e){console.warn('render316',e)}
document.addEventListener('click',e=>{
 if(e.target?.closest?.('.tab[data-v="train"],#doTrain263,#next225,#annualNext233'))[0,60,180].forEach(ms=>setTimeout(sync316,ms));
},true);
const css=document.createElement('style');css.id='meetGuard316';css.textContent=`
#season119 .meetChoice119{position:relative;z-index:3}
#season119 .meetChoice119 .meetChoiceCard125,
#season119 .meetChoice119 .meetCard290{pointer-events:auto!important;touch-action:manipulation!important;position:relative!important;z-index:5!important}
`;document.head.appendChild(css);
[0,100,300].forEach(ms=>setTimeout(sync316,ms));
window.STAR_MEET316={sync:sync316};
})();