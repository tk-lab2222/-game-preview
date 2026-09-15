(()=>{
// v0.21.4 progression core: one owner for #next, lightweight result decoration.
function polishMeetRows214(){
  const events=document.getElementById('events');if(!events)return;
  [...events.querySelectorAll(':scope > .evt')].forEach(row=>{
    row.classList.add('resultRow213');
    const b=row.querySelector('b'),d=row.querySelector('div');if(!b||!d)return;
    const text=d.textContent||'',rank=(text.match(/([1-8])位/)||[])[1]||'',phase=(text.match(/(\d+)\s*phase\s*pt/i)||[])[1]||'';
    let meta=row.querySelector('.resultMeta213');if(!meta){meta=document.createElement('div');meta.className='resultMeta213';row.appendChild(meta)}
    meta.innerHTML=`${rank?`<span class="rank213">${rank}位</span>`:''}${phase?`<span class="phasePt213">${phase} phase pt</span>`:''}`;
  });
}
function clearMeet214(){
  const run=document.getElementById('run'),next=document.getElementById('next'),result=document.getElementById('result'),events=document.getElementById('events'),gain=document.getElementById('gain');
  if(run){run.classList.remove('hide');run.disabled=false;run.textContent='大会スタート'}
  if(next){next.classList.add('hide');next.disabled=false}
  if(result)result.innerHTML='';if(events)events.innerHTML='';if(gain)gain.innerHTML='';
}
function show214(id){
  try{if(typeof show==='function')show(id)}catch(e){console.error('show214',e)}
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.v===id));
}
function advance214(){
  const next=document.getElementById('next');if(next)next.disabled=true;
  const season=Math.max(1,Math.min(6,Number(S.season)||1));
  if(season<6){
    S.season=season+1;S.turn=0;S.plans={};S.assign={};S.strat={};S.schedule=[];S.seasonMeet=null;S.generationActive=true;
    clearMeet214();
    try{render()}catch(e){console.error('advance214 render',e)}
    show214('train');
    requestAnimationFrame(()=>{try{render()}catch(_){}});
    return;
  }
  S.parents=[];S.cands=[];S.sel=[];S.egg=null;S.turn=0;S.schedule=[];S.plans={};S.assign={};S.strat={};S.season=1;S.seasonMeet=null;S.generationActive=false;
  clearMeet214();
  try{render()}catch(e){console.error('generation214 render',e)}
  show214('breed');
}
// Window capture runs before every document-level legacy handler.
window.addEventListener('click',e=>{
  const next=e.target?.closest?.('#next');if(!next)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  advance214();
},true);
// Observe only the result container instead of the whole document.
const events214=document.getElementById('events');if(events214){new MutationObserver(()=>requestAnimationFrame(polishMeetRows214)).observe(events214,{childList:true,subtree:true,characterData:true});}
const css=document.createElement('style');css.textContent=`
#meet #events>.evt.resultRow213{position:relative!important;display:grid!important;grid-template-columns:1fr auto!important;gap:6px 10px!important;align-items:center!important;background:linear-gradient(145deg,#14233a,#0d1727)!important;color:#f6fbff!important;border:1px solid #ffffff22!important;border-radius:14px!important;padding:12px 14px!important;margin:0 0 9px!important;box-shadow:0 6px 18px #0004,inset 0 1px 0 #ffffff12!important;min-height:72px!important}#meet #events>.evt.resultRow213>b{color:#fff!important;font-size:16px!important}.resultRow213>div:not(.resultMeta213){grid-column:1/3!important;color:#a9c3dd!important;font-size:10px!important}.resultMeta213{grid-column:2!important;grid-row:1!important;display:flex!important;flex-direction:column!important;align-items:flex-end!important;gap:4px!important}.rank213{padding:5px 8px!important;border-radius:999px!important;background:linear-gradient(180deg,#ffe274,#d7a31f)!important;color:#201600!important;font-size:14px!important;font-weight:1000!important}.phasePt213{padding:3px 6px!important;border:1px solid #60dfff55!important;border-radius:999px!important;background:#0a2533!important;color:#79e8ff!important;font-size:8px!important;font-weight:1000!important}
`;
document.head.appendChild(css);setTimeout(polishMeetRows214,0);
})();