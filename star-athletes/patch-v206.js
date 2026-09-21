(()=>{
// v0.20.6: affinity sync, egg crack animation, and harden card-based training/prep controls.
function ensureTrainingState206(){
  if(!S.plans||typeof S.plans!=='object'||Array.isArray(S.plans))S.plans={};
  if(!S.assign||typeof S.assign!=='object'||Array.isArray(S.assign))S.assign={};
  if(!S.strat||typeof S.strat!=='object'||Array.isArray(S.strat))S.strat={};
  if(!Array.isArray(S.schedule))S.schedule=[];
}
function setupCrack206(){
  const hatch=document.getElementById('hatch');if(!hatch||hatch.dataset.crack206)return;
  hatch.dataset.crack206='1';
  hatch.addEventListener('click',()=>{
    if(!S.egg)return;const egg=document.getElementById('egg');if(!egg)return;
    egg.classList.remove('cracking206','split206');void egg.offsetWidth;egg.classList.add('cracking206');
    setTimeout(()=>egg.classList.add('split206'),380);setTimeout(()=>egg.classList.remove('cracking206','split206'),980);
  },true);
}
function bindTrainingCapture206(){
  if(document.documentElement.dataset.trainCapture206)return;
  document.documentElement.dataset.trainCapture206='1';
  document.addEventListener('click',e=>{
    const plan=e.target.closest?.('[data-plan205]');
    if(plan){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();ensureTrainingState206();S.plans[plan.dataset.mon205]=plan.dataset.plan205;try{save200&&save200()}catch(_){};render();return}
    const entry=e.target.closest?.('[data-entry205]');
    if(entry){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();ensureTrainingState206();S.assign[entry.dataset.entry205]=entry.dataset.mon205;try{save200&&save200()}catch(_){};render();return}
    const strat=e.target.closest?.('[data-strat205]');
    if(strat){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();ensureTrainingState206();S.strat[strat.dataset.strat205]=strat.dataset.value205;try{save200&&save200()}catch(_){};render();return}
  },true);
}
const before206=render;
render=function(){ensureTrainingState206();const out=before206();setupCrack206();return out};
const css=document.createElement('style');css.textContent=`
#affinity205 .affHead205 b{color:#fff!important;text-shadow:0 0 10px #66dcff88}#affinity205 .affHead205 em{font-size:15px!important}.affinity205:has(.affHead205){box-shadow:0 0 0 1px #6ee8ff55,0 0 18px #5bdcff22}
.trainOpts205 button,.entrants205>button,.strats205 button{touch-action:manipulation;cursor:pointer}.trainOpts205 button.sel205,.entrants205>button.sel205,.strats205 button.sel205{transform:translateY(-1px)}
.eggStage127{perspective:500px}.eggShell127{position:relative!important}.eggShell127:before,.eggShell127:after{content:'';position:absolute;left:50%;top:16px;width:5px;height:0;background:#5a4633;border-radius:4px;opacity:0;z-index:8;transform-origin:top center;box-shadow:0 0 2px #fff}.cracking206 .eggShell127:before{opacity:1;height:24px;transform:translateX(-7px) rotate(24deg);animation:crackGrow206 .22s ease-out forwards}.cracking206 .eggShell127:after{opacity:1;height:19px;transform:translateX(7px) translateY(17px) rotate(-30deg);animation:crackGrow206 .2s .12s ease-out both}.cracking206 .eggShell127 span{animation:eggShake206 .12s linear infinite!important}.split206 .eggShell127 span{animation:eggOpen206 .44s cubic-bezier(.2,.8,.2,1) forwards!important}.split206 .eggAura127{animation:flash206 .44s ease-out forwards!important}@keyframes crackGrow206{from{height:0;opacity:0}to{opacity:1}}@keyframes eggShake206{25%{transform:translateX(-4px) rotate(-4deg)}75%{transform:translateX(4px) rotate(4deg)}}@keyframes eggOpen206{0%{transform:scale(1)}45%{transform:scale(1.08)}70%{transform:scaleX(1.18) scaleY(.9);opacity:1}100%{transform:scale(1.45);opacity:0;filter:brightness(2)}}@keyframes flash206{0%{opacity:.45;transform:scale(1)}60%{opacity:1;transform:scale(1.55)}100%{opacity:0;transform:scale(2.3)}}
`;
document.head.appendChild(css);
setTimeout(()=>{try{ensureTrainingState206();setupCrack206();bindTrainingCapture206();render()}catch(e){console.error('v0.20.6',e)}},0);
})();