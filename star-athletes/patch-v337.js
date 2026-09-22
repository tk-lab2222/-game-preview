(()=>{
'use strict';
// v0.31.94: use full card width for skill badges.
// Put SKILL on its own row, then render badges in a 2-column grid.
if(window.STAR_SKILL_WIDE337)return;

function sync337(){
  document.querySelectorAll('.entries210 .entrySkillHost254 .skillUnified254').forEach(row=>{
    row.classList.add('skillWide337');
    const list=row.querySelector(':scope > div');
    if(list)list.classList.add('skillGrid337');
  });
}

try{
  const prev=window.render;
  if(typeof prev==='function'){
    window.render=function(){
      const out=prev.apply(this,arguments);
      requestAnimationFrame(sync337);
      return out;
    };
  }
}catch(e){console.warn('skill wide337 render wrap',e)}

document.addEventListener('click',e=>{
  if(e.target?.closest?.('.tab[data-v="train"],[data-e210],[data-s210],[data-p210],#doTrain,#toMeet,#adopt')){
    setTimeout(sync337,30);
  }
},true);

const css=document.createElement('style');
css.id='skillWide337css';
css.textContent=`
.entries210 .entrySkillHost254{
  margin-top:5px!important;
  padding:5px 6px 7px!important;
  min-height:0!important;
}

.entries210 .entrySkillHost254 .skillUnified254.skillWide337{
  display:block!important;
  min-height:0!important;
  margin:0!important;
  padding-top:4px!important;
}

.entries210 .entrySkillHost254 .skillWide337>.skillLabelUnified254{
  display:block!important;
  margin:0 0 5px!important;
  width:auto!important;
  font-size:6px!important;
  line-height:1!important;
  letter-spacing:.12em!important;
}

.entries210 .entrySkillHost254 .skillWide337>.skillGrid337{
  display:grid!important;
  grid-template-columns:repeat(2,minmax(0,1fr))!important;
  gap:4px!important;
  width:100%!important;
  min-width:0!important;
}

/* Badges may shrink with the card; text should remain fully visible. */
.entries210 .entrySkillHost254 .skillGrid337 .breedSkillBadge254{
  display:flex!important;
  width:100%!important;
  min-width:0!important;
  max-width:none!important;
  box-sizing:border-box!important;
  justify-content:center!important;
  align-items:center!important;
  gap:2px!important;
  padding:3px 3px!important;
  font-size:6px!important;
  line-height:1.15!important;
  white-space:nowrap!important;
  overflow:visible!important;
  text-overflow:clip!important;
}

/* One skill: keep it compact rather than stretching across the full card. */
.entries210 .entrySkillHost254 .skillGrid337 .breedSkillBadge254:only-child{
  grid-column:1/2!important;
}

/* Very narrow phones: preserve two columns but tighten slightly. */
@media(max-width:390px){
  .entries210 .entrySkillHost254{padding-left:4px!important;padding-right:4px!important}
  .entries210 .entrySkillHost254 .skillGrid337{gap:3px!important}
  .entries210 .entrySkillHost254 .skillGrid337 .breedSkillBadge254{
    font-size:5.6px!important;
    padding-left:2px!important;
    padding-right:2px!important;
  }
}
`;
document.head.appendChild(css);

window.STAR_SKILL_WIDE337={sync:sync337};
[0,80,250,700].forEach(ms=>setTimeout(sync337,ms));
})();