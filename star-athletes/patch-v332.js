(()=>{
'use strict';
// v0.31.89: all training/entry character art boxes are art-only and isolated
// from skills, rarity/meta overlays and sibling UI.
if(window.STAR_ART_CLEAN332)return;

function isArt332(el){
  return el?.classList?.contains('speciesCanvas') ||
         el?.classList?.contains('dracoStableImg329');
}
function cleanAvatar332(a){
  if(!a)return;
  [...a.children].forEach(ch=>{
    if(!isArt332(ch))ch.remove();
  });
}
function clean332(){
  document.querySelectorAll('.train210>header .avatar,.entries210 .avatar').forEach(cleanAvatar332);
}
function schedule332(){requestAnimationFrame(clean332)}

try{
  const prev=window.render;
  if(typeof prev==='function'){
    window.render=function(){
      const out=prev.apply(this,arguments);
      schedule332();
      return out;
    };
  }
}catch(e){console.warn('art clean332 render wrap',e)}

document.addEventListener('click',e=>{
  if(e.target?.closest?.('.tab[data-v="train"],[data-p210],[data-e210],[data-s210],#doTrain,#toMeet,#adopt')){
    setTimeout(clean332,30);
  }
},true);

const css=document.createElement('style');
css.id='artClean332css';
css.textContent=`
/* Character art itself always wins the stacking context in training/entries. */
.train210>header .avatar,
.entries210 .avatar{
  position:relative!important;
  z-index:20!important;
  isolation:isolate!important;
  overflow:hidden!important;
  background:linear-gradient(#fff9eb,#f4ead6)!important;
}

/* Only the actual art primitive may be visible inside these image boxes. */
.train210>header .avatar>:not(.speciesCanvas):not(.dracoStableImg329),
.entries210 .avatar>:not(.speciesCanvas):not(.dracoStableImg329){
  display:none!important;
}

.train210>header .speciesCanvas,
.entries210 .speciesCanvas,
.train210>header .dracoStableImg329,
.entries210 .dracoStableImg329{
  position:absolute!important;
  z-index:1!important;
}

/* Keep all skill/meta UI explicitly outside and below the art layer. */
.train210>header>div:not(.avatar){
  position:relative!important;
  z-index:5!important;
}
.entries210 .entrySkillHost254,
.entries210 .skillUnified254{
  position:relative!important;
  z-index:5!important;
}

/* Parent rarity pseudo-layers must not paint over the character portrait. */
.train210.rarityFX249:before,
.train210.rarityFX249:after,
.entries210>button.rarityFX249:before,
.entries210>button.rarityFX249:after{
  z-index:1!important;
}
`;
document.head.appendChild(css);

window.STAR_ART_CLEAN332={sync:clean332};
[0,80,250,700].forEach(ms=>setTimeout(clean332,ms));
})();