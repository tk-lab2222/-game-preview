(()=>{
'use strict';
// v0.31.95: replace rigid skill grid with natural-width wrapping badges.
// Prevent clipping while keeping two skills side-by-side when space allows.
if(window.STAR_SKILL_WRAP338)return;

function sync338(){
  document.querySelectorAll('.entries210 .entrySkillHost254 .skillUnified254').forEach(row=>{
    row.classList.add('skillWrap338');
    const list=row.querySelector(':scope > div');
    if(list)list.classList.add('skillList338');
  });
}

try{
  const prev=window.render;
  if(typeof prev==='function'){
    window.render=function(){
      const out=prev.apply(this,arguments);
      requestAnimationFrame(sync338);
      return out;
    };
  }
}catch(e){console.warn('skill wrap338 render wrap',e)}

document.addEventListener('click',e=>{
  if(e.target?.closest?.('.tab[data-v="train"],[data-e210],[data-s210],[data-p210],#doTrain,#toMeet,#adopt')){
    setTimeout(sync338,30);
  }
},true);

const css=document.createElement('style');
css.id='skillWrap338css';
css.textContent=`
.entries210 .entrySkillHost254{
  margin-top:5px!important;
  padding:5px 6px 7px!important;
  min-height:0!important;
  overflow:visible!important;
}

.entries210 .entrySkillHost254 .skillUnified254.skillWrap338{
  display:block!important;
  min-height:0!important;
  margin:0!important;
  padding-top:4px!important;
  overflow:visible!important;
}

.entries210 .entrySkillHost254 .skillWrap338>.skillLabelUnified254{
  display:block!important;
  margin:0 0 5px!important;
  width:auto!important;
  font-size:6px!important;
  line-height:1!important;
  letter-spacing:.12em!important;
}

.entries210 .entrySkillHost254 .skillWrap338>.skillList338{
  display:flex!important;
  flex-wrap:wrap!important;
  gap:4px!important;
  align-items:center!important;
  justify-content:center!important;
  width:100%!important;
  min-width:0!important;
  overflow:visible!important;
}

.entries210 .entrySkillHost254 .skillList338 .breedSkillBadge254{
  display:inline-flex!important;
  width:auto!important;
  min-width:0!important;
  max-width:100%!important;
  flex:0 1 auto!important;
  box-sizing:border-box!important;
  justify-content:center!important;
  align-items:center!important;
  gap:2px!important;
  padding:3px 5px!important;
  font-size:6px!important;
  line-height:1.15!important;
  white-space:nowrap!important;
  overflow:visible!important;
  text-overflow:clip!important;
}

/* Ensure two ordinary skills fit side-by-side on current mobile card width. */
.entries210 .entrySkillHost254 .skillList338 .breedSkillBadge254{
  max-width:calc(50% - 2px)!important;
}

/* If three or more exist, wrapping happens naturally to the next line. */
.entries210 .entrySkillHost254 .skillList338 .breedSkillBadge254:nth-child(n+3){
  margin-top:0!important;
}

/* Very narrow screens: tighten only slightly, never clip. */
@media(max-width:390px){
  .entries210 .entrySkillHost254{padding-left:4px!important;padding-right:4px!important}
  .entries210 .entrySkillHost254 .skillList338{gap:3px!important}
  .entries210 .entrySkillHost254 .skillList338 .breedSkillBadge254{
    font-size:5.5px!important;
    padding-left:4px!important;
    padding-right:4px!important;
  }
}
`;
document.head.appendChild(css);

window.STAR_SKILL_WRAP338={sync:sync338};
[0,80,250,700].forEach(ms=>setTimeout(sync338,ms));
})();