(()=>{
'use strict';
if(document.getElementById('starUx294')) return;
const css=document.createElement('style');
css.id='starUx294';
css.textContent=`
/* UI polish only: improve scanability without changing game state or layout ownership. */
.box h3{line-height:1.3;text-wrap:balance}
.sm{line-height:1.55}
.p,.trainGrade,.traitRow span{font-variant-numeric:tabular-nums}
#gain,#result,#rival,#sched{overflow-wrap:anywhere}
@media (max-width:390px){
  .box h3{margin-bottom:8px}
  .sm{line-height:1.6}
  .top{gap:8px}
}
`;
document.head.appendChild(css);
window.STAR_UX294={version:'0.31.8-ui',scope:'scanability-text-wrap'};
})();
