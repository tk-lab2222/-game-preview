(()=>{
// v0.21.5: hard-isolate season progression from every legacy #next handler.
// Replace the button node so old onclick/addEventListener bindings cannot fire.
const PROGRESS_KEY215='star-athletes-season-v215';
function persist215(){
  try{localStorage.setItem(PROGRESS_KEY215,JSON.stringify({season:S.season||1,at:Date.now()}))}catch(_){}
}
function recover215(){
  try{
    const raw=localStorage.getItem(PROGRESS_KEY215);if(!raw)return;
    const d=JSON.parse(raw),n=Number(d?.season);
    if(Number.isInteger(n)&&n>=1&&n<=6&&(Number(S.season)||1)<n)S.season=n;
  }catch(_){}
}
function resetMeet215(){
  const run=document.getElementById('run'),result=document.getElementById('result'),events=document.getElementById('events'),gain=document.getElementById('gain');
  if(run){run.classList.remove('hide');run.disabled=false;run.textContent='大会スタート'}
  if(result)result.innerHTML='';if(events)events.innerHTML='';if(gain)gain.innerHTML='';
}
function showTrain215(){
  try{if(typeof show==='function')show('train')}catch(e){console.error('show train 215',e)}
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.v==='train'));
}
function showBreed215(){
  try{if(typeof show==='function')show('breed')}catch(e){console.error('show breed 215',e)}
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.v==='breed'));
}
function advance215(){
  const current=Math.max(1,Math.min(6,Number(S.season)||1));
  if(current<6){
    S.season=current+1;
    S.turn=0;S.plans={};S.assign={};S.strat={};S.schedule=[];S.seasonMeet=null;S.generationActive=true;
    persist215();resetMeet215();
    try{render()}catch(e){console.error('render next season 215',e)}
    showTrain215();
    // make the state visible immediately even if a later decorator fails
    setTimeout(()=>{
      try{render()}catch(_){}
      const h=document.querySelector('#season119 .seasonHead119 b');
      if(h&&!String(h.textContent).includes(`S${S.season}/6`))h.textContent=`S${S.season}/6`;
    },0);
    return;
  }
  S.parents=[];S.cands=[];S.sel=[];S.egg=null;S.turn=0;S.schedule=[];S.plans={};S.assign={};S.strat={};
  S.season=1;S.seasonMeet=null;S.generationActive=false;
  try{localStorage.removeItem(PROGRESS_KEY215)}catch(_){}
  resetMeet215();
  try{render()}catch(e){console.error('render next generation 215',e)}
  showBreed215();
}
function installNext215(){
  const old=document.getElementById('next');if(!old||old.dataset.owner215==='1')return;
  const fresh=old.cloneNode(true);
  fresh.dataset.owner215='1';
  // cloneNode intentionally discards all listeners/property handlers attached to the old node.
  fresh.onclick=(e)=>{e.preventDefault();e.stopPropagation();advance215()};
  old.replaceWith(fresh);
}
recover215();
// Install after all previous scripts have registered their handlers.
setTimeout(()=>{installNext215();try{render()}catch(_){}},0);
// runMeet119 can change button text/classes but keeps the same node; reinstall defensively when meet result changes.
const result=document.getElementById('result');
if(result)new MutationObserver(()=>installNext215()).observe(result,{childList:true,subtree:true});
})();