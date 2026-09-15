(()=>{
// v0.22.1: gate tournament entry until training 3/3, without MutationObserver loops.
function gateMsg220(){
  const host=document.getElementById('prep');if(!host)return;
  let n=document.getElementById('trainGate220');
  if(!n){n=document.createElement('div');n.id='trainGate220';n.className='trainGate220';host.after(n)}
  const left=Math.max(0,3-(Number(S.turn)||0));
  const txt=left>0?`🔒 大会へ進むには育成をあと${left}回完了してください。`:'✅ 育成完了。大会へ進めます。';
  if(n.textContent!==txt)n.textContent=txt;
  n.classList.toggle('ready220',left===0);
}
function syncGate220(){
  const b=document.getElementById('toMeet');if(!b)return;
  const turn=Number(S.turn)||0,done=turn>=3;
  if(b.disabled===done)b.disabled=!done;
  b.setAttribute('aria-disabled',done?'false':'true');
  const txt=done?`S${Number(S.season)||1} 大会へ`:`大会へ（育成 ${turn}/3）`;
  if(b.textContent!==txt)b.textContent=txt;
  gateMsg220();
}
// Hard block legacy tournament navigation before training is complete.
window.addEventListener('click',e=>{
  const b=e.target?.closest?.('#toMeet');if(!b)return;
  if((Number(S.turn)||0)>=3)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  syncGate220();
  const n=document.getElementById('trainGate220');if(n){n.classList.add('flash220');setTimeout(()=>n.classList.remove('flash220'),700)}
},true);

// render is already called after each training action, so this is enough to stay in sync.
const before220=render;
render=function(){const out=before220();syncGate220();return out};

// One lightweight post-click sync for any legacy training handler that mutates after the event.
document.addEventListener('click',e=>{
  if(e.target?.closest?.('#doTrain'))setTimeout(syncGate220,0);
},false);

const css=document.createElement('style');css.textContent=`
#toMeet:disabled{opacity:.42!important;filter:grayscale(.35)!important;cursor:not-allowed!important;box-shadow:none!important}.trainGate220{margin-top:8px;padding:9px 10px;border:1px solid #d2b86a;border-radius:10px;background:#fff5cf;color:#584718;font-size:9px;font-weight:900;text-align:center}.trainGate220.ready220{border-color:#75c99a;background:#eafff2;color:#17633b}.trainGate220.flash220{animation:gateFlash220 .7s ease}@keyframes gateFlash220{0%,100%{transform:none}25%{transform:translateX(-4px)}50%{transform:translateX(4px)}75%{transform:translateX(-2px)}}
`;document.head.appendChild(css);
setTimeout(syncGate220,0);
})();