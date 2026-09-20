(()=>{
// v0.28.4: restore tournament usability after leaving/returning from auxiliary tabs.
let runHandler272=null;
function captureRun272(){
  const run=document.getElementById('run');
  if(run?.onclick)runHandler272=run.onclick;
}
function prepareMeet272(){
  if((Number(S.turn)||0)<3||!Array.isArray(S.nest)||S.nest.length!==3)return;
  if(!Array.isArray(S.schedule)||!S.schedule.length){
    try{typeof makeSchedule==='function'&&makeSchedule()}catch(_){}
  }
  S.assign=(S.assign&&typeof S.assign==='object')?S.assign:{};
  S.strat=(S.strat&&typeof S.strat==='object')?S.strat:{};
  const events=document.getElementById('events');
  if(events&&!(document.getElementById('result')?.textContent||'').trim()){
    events.innerHTML=(S.schedule||[]).map((e,i)=>{
      let m=(S.nest||[]).find(x=>x.id===S.assign[i]);
      if(!m){try{m=best(e);S.assign[i]=m?.id}catch(_){}}
      if(!S.strat[i])S.strat[i]='バランス';
      return `<div class="evt"><b>${e}</b><div>${m?.name||'-'} / ${S.strat[i]}</div></div>`;
    }).join('');
  }
  const result=(document.getElementById('result')?.textContent||'').trim();
  const run=document.getElementById('run');
  if(run&&!result){
    run.classList.remove('hide');
    run.disabled=false;
    if(runHandler272&&!run.onclick)run.onclick=runHandler272;
    if(!/昇格戦/.test(run.textContent||''))run.textContent='大会スタート';
  }
}
window.addEventListener('click',e=>{
  const meet=e.target?.closest?.('.tab[data-v="meet"],#toMeet');
  if(meet){captureRun272();[0,80,220,500].forEach(ms=>setTimeout(prepareMeet272,ms))}
  if(e.target?.closest?.('.tab[data-v="mission203"],.tab[data-v="nest201"],.tab[data-v="dex"]'))captureRun272();
},true);
function late272(){captureRun272();if(!document.getElementById('meet')?.classList.contains('hide'))prepareMeet272()}
try{const prev272=render;render=function(){const out=prev272();setTimeout(late272,0);return out}}catch(e){console.warn('render272',e)}
setTimeout(()=>{captureRun272();late272()},0);
})();