(()=>{
// v0.20.7: hard-fix card training / entrant / strategy taps using capture delegation.
function safeSave207(){try{typeof save200==='function'&&save200()}catch(_){}}
function ensureTrainingState207(){
  S.plans=(S.plans&&typeof S.plans==='object')?S.plans:{};
  S.assign=(S.assign&&typeof S.assign==='object')?S.assign:{};
  S.strat=(S.strat&&typeof S.strat==='object')?S.strat:{};
}
function repaintTraining207(){
  ensureTrainingState207();
  try{typeof drawTraining205==='function'&&drawTraining205()}catch(e){console.error('drawTraining205 v207',e)}
  requestAnimationFrame(()=>{try{window.paintSpecies&&window.paintSpecies()}catch(_){}});
}
function handle207(e){
  const plan=e.target.closest?.('[data-plan205]');
  if(plan){
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    ensureTrainingState207();
    const mon=plan.dataset.mon205,id=plan.dataset.plan205;
    if(mon&&id)S.plans[mon]=id;
    repaintTraining207();safeSave207();return;
  }
  const entry=e.target.closest?.('[data-entry205]');
  if(entry){
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    ensureTrainingState207();
    const idx=entry.dataset.entry205,mon=entry.dataset.mon205;
    if(idx!==undefined&&mon)S.assign[idx]=mon;
    repaintTraining207();safeSave207();return;
  }
  const strat=e.target.closest?.('[data-strat205]');
  if(strat){
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    ensureTrainingState207();
    const idx=strat.dataset.strat205,val=strat.dataset.value205;
    if(idx!==undefined&&val)S.strat[idx]=val;
    repaintTraining207();safeSave207();return;
  }
}
document.addEventListener('click',handle207,true);
document.addEventListener('touchend',e=>{
  const hit=e.target.closest?.('[data-plan205],[data-entry205],[data-strat205]');
  if(!hit)return;
  // iOS can occasionally swallow click after DOM repaint; synthesize the same action here.
  e.preventDefault();
  handle207({target:hit,preventDefault(){},stopPropagation(){},stopImmediatePropagation(){}});
},{capture:true,passive:false});

const before207=render;
render=function(){
  ensureTrainingState207();
  const out=before207();
  setTimeout(()=>{try{repaintTraining207()}catch(e){console.error('v207 redraw',e)}},0);
  return out;
};

const css=document.createElement('style');css.textContent=`
/* Make card controls unmistakably interactive on mobile. */
.trainOpts205 button,.entrants205>button,.strats205 button{touch-action:manipulation;cursor:pointer;-webkit-tap-highlight-color:transparent}
.trainOpts205 button:active,.entrants205>button:active,.strats205 button:active{transform:scale(.97)}
.trainOpts205 button.sel205{background:#cfefff!important;border-color:#0799cd!important;box-shadow:0 0 0 3px #8fe4ff!important;color:#10283a!important}
.entrants205>button.sel205{background:#e4f8ff!important;border-color:#0799cd!important;box-shadow:0 0 0 3px #9feaff!important}
.strats205 button.sel205{background:#182a45!important;color:#fff!important;border-color:#182a45!important;box-shadow:0 0 0 2px #9fdfff!important}
`;
document.head.appendChild(css);
setTimeout(()=>{try{repaintTraining207()}catch(e){console.error('v0.20.7 init',e)}},0);
})();