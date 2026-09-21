(()=>{
// Integrated compatibility shell: parent selection/rendering moved to STAR_BREEDING321.
// Keep only hatch-result contrast behavior from v0.20.2.
function fixBirthContrast202(){
  const birth=document.getElementById('birth');if(!birth)return;
  const reveal=birth.querySelector('.hatchReveal');if(!reveal)return;
  reveal.classList.add('contrast202');
}
const prevRender202=render;
render=function(){
  const out=prevRender202();
  fixBirthContrast202();
  setTimeout(fixBirthContrast202,0);
  return out;
};
const hatch202=document.getElementById('hatch');
if(hatch202)hatch202.addEventListener('click',()=>setTimeout(fixBirthContrast202,1200));
const css=document.createElement('style');css.textContent=`
.birthStage128 .hatchReveal.contrast202 .newbornLabel{color:#241900!important;background:#ffd65a!important}
.birthStage128 .hatchReveal.contrast202 .hatchStats div{color:#171717!important;background:#fffdf7!important}
.birthStage128 .hatchReveal.contrast202 .hatchStats span,.birthStage128 .hatchReveal.contrast202 .hatchStats b{color:#171717!important}
.birthStage128 .hatchReveal.contrast202 .inheritBox{color:#171717!important;background:#fff4c8!important}
.birthStage128 .hatchReveal.contrast202 .inheritBox b{color:#171717!important}
.birthStage128 .hatchReveal.contrast202 .hatchTraits span{color:#171717!important;background:#fff3bf!important}
.birthStage128 .hatchReveal.contrast202 .hatchName b{color:#fff!important}
.birthStage128 .hatchReveal.contrast202 .hatchMeta{color:#dceaff!important;opacity:.9!important}
`;document.head.appendChild(css);
setTimeout(fixBirthContrast202,0);
})();