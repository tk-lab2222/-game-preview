(()=>{
'use strict';
if(document.getElementById('starUx289')) return;
const css=document.createElement('style');
css.id='starUx289';
css.textContent=`
/* UI polish only: improve hierarchy/readability without touching game state or handlers. */
.box>h3{line-height:1.25;margin-bottom:8px}
.box>h3 .sm{font-weight:800;white-space:nowrap}
.card .sm,.par .sm,#prep .sm,#plans .sm{line-height:1.45}
#gain:empty,#result:empty,#birth:empty{display:none}
#gain:not(:empty),#result:not(:empty){margin-top:8px}
#breedBtn,#hatch,#adopt,#doTrain,#toMeet,#run,#next{font-weight:1000;letter-spacing:.01em}
@media (max-width:430px){
  .box{margin-bottom:9px}
  .box>h3{display:flex;align-items:baseline;justify-content:space-between;gap:8px;flex-wrap:wrap}
  .parents{align-items:stretch}
  .par{display:flex;align-items:center;justify-content:center;min-height:48px}
  #breedBtn,#hatch,#adopt,#doTrain,#toMeet,#run,#next{width:100%;min-height:46px}
  #breed p,#candBox p,#meet p{margin-bottom:6px}
  .chips{line-height:1.55}
}
@media (max-width:350px){
  .box>h3{font-size:12px}
  .box>h3 .sm{font-size:8px}
}
`;
document.head.appendChild(css);
window.STAR_UX289={version:'0.31.1-stage',scope:'information-hierarchy-mobile-readability'};
})();
