(()=>{
'use strict';
// v0.31.91: normalize skill layout so card height does not shift portrait alignment.
if(window.STAR_SKILL_LAYOUT334)return;

function normalize334(){
  // Entry cards: skill block must have a stable two-column layout.
  document.querySelectorAll('.entries210 .entrySkillHost254 .skillUnified254').forEach(row=>{
    const list=row.querySelector(':scope > div');
    if(!list)return;
    list.classList.add('skillGrid334');
    row.classList.add('skillRow334');
  });

  // Training roster skill blocks use the same visual rules.
  document.querySelectorAll('.train210 .skillUnified254').forEach(row=>{
    const list=row.querySelector(':scope > div');
    if(!list)return;
    list.classList.add('skillGrid334');
    row.classList.add('skillRow334');
  });
}

function sync334(){requestAnimationFrame(normalize334)}

try{
  const prev=window.render;
  if(typeof prev==='function'){
    window.render=function(){
      const out=prev.apply(this,arguments);
      sync334();
      return out;
    };
  }
}catch(e){console.warn('skill layout334 render wrap',e)}

document.addEventListener('click',e=>{
  if(e.target?.closest?.('.tab[data-v="train"],[data-e210],[data-s210],[data-p210],#doTrain,#toMeet,#adopt')){
    setTimeout(normalize334,30);
  }
},true);

const css=document.createElement('style');
css.id='skillLayout334css';
css.textContent=`
/* Keep the skill section structurally identical across all entry cards. */
.entries210 .entrySkillHost254{
  box-sizing:border-box!important;
  min-height:58px!important;
  padding:5px 5px 7px!important;
  background:#fff!important;
  display:block!important;
}

.entries210 .entrySkillHost254 .skillUnified254{
  display:grid!important;
  grid-template-columns:34px minmax(0,1fr)!important;
  gap:5px!important;
  align-items:start!important;
  margin:0!important;
  padding-top:5px!important;
  min-height:46px!important;
  box-sizing:border-box!important;
}

.entries210 .entrySkillHost254 .skillLabelUnified254{
  display:block!important;
  width:auto!important;
  margin-top:3px!important;
  white-space:nowrap!important;
}

.entries210 .entrySkillHost254 .skillGrid334{
  display:grid!important;
  grid-template-columns:repeat(2,minmax(0,1fr))!important;
  gap:4px!important;
  align-content:start!important;
  width:100%!important;
  min-width:0!important;
}

/* 1 skill still occupies one half-cell. 2 skills always sit side by side. */
.entries210 .entrySkillHost254 .breedSkillBadge254{
  width:100%!important;
  min-width:0!important;
  box-sizing:border-box!important;
  justify-content:center!important;
  padding:3px 4px!important;
  font-size:6.5px!important;
  overflow:hidden!important;
  text-overflow:ellipsis!important;
  white-space:nowrap!important;
}

/* Training roster uses the same wrapping rule, but can be a little wider. */
.train210 .skillUnified254{
  display:grid!important;
  grid-template-columns:38px minmax(0,1fr)!important;
  gap:6px!important;
  align-items:start!important;
}
.train210 .skillUnified254>div{
  display:grid!important;
  grid-template-columns:repeat(2,minmax(0,1fr))!important;
  gap:4px!important;
}
.train210 .skillUnified254 .breedSkillBadge254{
  width:100%!important;
  box-sizing:border-box!important;
  justify-content:center!important;
}

/* Stabilize entry card content height so portrait baselines remain visually aligned. */
.entries210>button{
  display:flex!important;
  flex-direction:column!important;
  min-height:322px!important;
}
.entries210>button>.avatar{
  flex:0 0 86px!important;
}
.entries210>button>b{
  flex:0 0 auto!important;
}
.entries210>button>small{
  flex:0 0 auto!important;
}
.entries210>button>div:not(.avatar):not(.entrySkillHost254){
  flex:0 0 auto!important;
}
.entries210>button>.entrySkillHost254{
  margin-top:auto!important;
  flex:0 0 58px!important;
}

/* Never allow old flex wrapping rules to override the normalized grid. */
.entries210 .skillUnified254>div.skillGrid334{
  display:grid!important;
}
`;
document.head.appendChild(css);

window.STAR_SKILL_LAYOUT334={sync:normalize334};
[0,80,250,700].forEach(ms=>setTimeout(normalize334,ms));
})();