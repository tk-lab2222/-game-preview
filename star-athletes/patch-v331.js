(()=>{
'use strict';
// v0.31.88: Draco image boxes are art-only. Keep skill/rarity/meta UI outside the image.
if(window.STAR_DRACO_CLEAN331)return;

function cleanAvatar331(a){
  if(!a?.classList?.contains('draco-stable329'))return;
  [...a.children].forEach(ch=>{
    if(!ch.classList?.contains('dracoStableImg329'))ch.remove();
  });
}
function clean331(){
  document.querySelectorAll('.train210>header .avatar.draco-stable329,.entries210 .avatar.draco-stable329').forEach(cleanAvatar331);
}
function schedule331(){requestAnimationFrame(clean331)}

try{
  const prev=window.render;
  if(typeof prev==='function'){
    window.render=function(){
      const out=prev.apply(this,arguments);
      schedule331();
      return out;
    };
  }
}catch(e){console.warn('draco clean331 render wrap',e)}

document.addEventListener('click',e=>{
  if(e.target?.closest?.('.tab[data-v="train"],[data-p210],[data-e210],[data-s210],#doTrain,#toMeet')){
    setTimeout(clean331,30);
  }
},true);

const css=document.createElement('style');
css.id='dracoClean331css';
css.textContent=`
.train210>header .avatar.draco-stable329,
.entries210 .avatar.draco-stable329{
  position:relative!important;
  overflow:hidden!important;
}
.train210>header .avatar.draco-stable329>:not(.dracoStableImg329),
.entries210 .avatar.draco-stable329>:not(.dracoStableImg329){
  display:none!important;
}
.train210>header .avatar.draco-stable329 .dracoStableImg329,
.entries210 .avatar.draco-stable329 .dracoStableImg329{
  z-index:1!important;
}
`;
document.head.appendChild(css);

window.STAR_DRACO_CLEAN331={sync:clean331};
[0,80,250].forEach(ms=>setTimeout(clean331,ms));
})();