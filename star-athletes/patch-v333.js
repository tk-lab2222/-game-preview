(()=>{
'use strict';
// v0.31.90: normalize portrait size and vertical alignment in training / entry cards.
if(window.STAR_ART_ALIGN333)return;

function sync333(){
  try{window.paintSpecies?.()}catch(_){}
  try{window.STAR_ART_CLEAN332?.sync?.()}catch(_){}
}

const css=document.createElement('style');
css.id='artAlign333css';
css.textContent=`
/* ---------- shared portrait frame ---------- */
.train210>header .avatar,
.entries210 .avatar{
  position:relative!important;
  overflow:hidden!important;
  isolation:isolate!important;
  box-sizing:border-box!important;
  background:linear-gradient(#fff9eb,#f4ead6)!important;
}

/* Keep the visible art area consistent between roster and entry cards. */
.train210>header .avatar{
  height:94px!important;
}
.entries210 .avatar{
  height:86px!important;
}

/* ---------- Draco ---------- */
.train210>header .avatar.draco-stable329 .dracoStableImg329{
  left:50%!important;
  top:auto!important;
  bottom:3px!important;
  width:82%!important;
  height:82%!important;
  transform:translateX(-50%)!important;
  object-fit:contain!important;
  object-position:center bottom!important;
}
.entries210 .avatar.draco-stable329 .dracoStableImg329{
  left:50%!important;
  top:auto!important;
  bottom:2px!important;
  width:80%!important;
  height:80%!important;
  transform:translateX(-50%)!important;
  object-fit:contain!important;
  object-position:center bottom!important;
}

/* ---------- canvas species: Unil / Grimo / Puru ---------- */
.train210>header .avatar.species-live .speciesCanvas,
.entries210 .avatar.species-live .speciesCanvas{
  position:absolute!important;
  inset:0!important;
  width:100%!important;
  height:100%!important;
  transform:none!important;
}

/*
 Canvas art is painted using FIT values in species-art-v116.
 Normalize the apparent center by adjusting the canvas box itself rather than
 changing each individual card's layout.
*/
.train210>header .avatar.species-live{
  padding:3px 2px 0!important;
}
.entries210 .avatar.species-live{
  padding:2px 1px 0!important;
}

/* Puru reads visually shorter; give it a little more portrait presence. */
.train210>header .avatar.species-puru .speciesCanvas{
  transform:scale(1.08) translateY(2px)!important;
  transform-origin:50% 55%!important;
}
.entries210 .avatar.species-puru .speciesCanvas{
  transform:scale(1.07) translateY(2px)!important;
  transform-origin:50% 55%!important;
}

/* Grimo's silhouette is slightly tall; keep it optically centered. */
.train210>header .avatar.species-grimo .speciesCanvas,
.entries210 .avatar.species-grimo .speciesCanvas{
  transform:scale(.98) translateY(1px)!important;
  transform-origin:50% 52%!important;
}

/* Unil stays close to the source proportions. */
.train210>header .avatar.species-unil .speciesCanvas,
.entries210 .avatar.species-unil .speciesCanvas{
  transform:translateY(1px)!important;
}

/* Selection / rarity state must not move the portrait itself. */
.entries210>button,
.entries210>button.on210,
.train210,
.train210.rarityFX249{
  transform:none!important;
}
.entries210>button .avatar,
.entries210>button.on210 .avatar{
  margin:0!important;
}

/* Skill/meta stays below portrait and cannot affect portrait height. */
.entries210 .entrySkillHost254{
  min-height:44px!important;
  box-sizing:border-box!important;
}
`;
document.head.appendChild(css);

document.addEventListener('click',e=>{
  if(e.target?.closest?.('.tab[data-v="train"],[data-p210],[data-e210],[data-s210],#doTrain,#toMeet,#adopt')){
    setTimeout(sync333,30);
    setTimeout(sync333,120);
  }
},true);

try{
  const prev=window.render;
  if(typeof prev==='function'){
    window.render=function(){
      const out=prev.apply(this,arguments);
      requestAnimationFrame(sync333);
      return out;
    };
  }
}catch(e){console.warn('art align333 render wrap',e)}

window.STAR_ART_ALIGN333={sync:sync333};
[0,80,250,700].forEach(ms=>setTimeout(sync333,ms));
})();