(()=>{
'use strict';
// v0.31.92: undo over-tall entry cards from v334.
// Keep normalized skill grid, but let cards use natural compact height.
if(window.STAR_ENTRY_COMPACT335)return;

const css=document.createElement('style');
css.id='entryCompact335css';
css.textContent=`
/* Let the three cards stretch only to the tallest natural card in the row. */
.entries210{
  align-items:stretch!important;
}
.entries210>button{
  display:flex!important;
  flex-direction:column!important;
  min-height:0!important;
  height:auto!important;
}

/* Portrait stays fixed; the body beneath it stays compact. */
.entries210>button>.avatar{
  flex:0 0 86px!important;
}
.entries210>button>b,
.entries210>button>small,
.entries210>button>div:not(.avatar):not(.entrySkillHost254){
  flex:0 0 auto!important;
}

/* Remove the forced bottom anchor that created the giant blank space. */
.entries210>button>.entrySkillHost254{
  margin-top:6px!important;
  flex:0 0 auto!important;
  min-height:0!important;
  padding:5px 5px 7px!important;
}

/* Keep the useful part of v334: a stable 2-column skill grid. */
.entries210 .entrySkillHost254 .skillUnified254{
  display:grid!important;
  grid-template-columns:34px minmax(0,1fr)!important;
  gap:5px!important;
  align-items:start!important;
  min-height:0!important;
  margin:0!important;
  padding-top:5px!important;
}
.entries210 .entrySkillHost254 .skillUnified254>div{
  display:grid!important;
  grid-template-columns:repeat(2,minmax(0,1fr))!important;
  gap:4px!important;
  width:100%!important;
}
.entries210 .entrySkillHost254 .breedSkillBadge254{
  width:100%!important;
  min-width:0!important;
  box-sizing:border-box!important;
  justify-content:center!important;
  padding:3px 4px!important;
  font-size:6.5px!important;
  white-space:nowrap!important;
  overflow:hidden!important;
  text-overflow:ellipsis!important;
}

/* One-skill cards should not become taller than two-skill cards. */
.entries210 .entrySkillHost254 .skillUnified254>div:has(.breedSkillBadge254:only-child){
  grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;
}
`;
document.head.appendChild(css);

function sync335(){
  try{window.STAR_SKILL_LAYOUT334?.sync?.()}catch(_){}
  try{window.STAR_ART_ALIGN333?.sync?.()}catch(_){}
}
document.addEventListener('click',e=>{
  if(e.target?.closest?.('.tab[data-v="train"],[data-e210],[data-s210],#toMeet,#doTrain')){
    setTimeout(sync335,30);
  }
},true);

window.STAR_ENTRY_COMPACT335={sync:sync335};
[0,80,250].forEach(ms=>setTimeout(sync335,ms));
})();