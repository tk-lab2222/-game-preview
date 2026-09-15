(()=>{
// v0.22.0: hard gate tournament entry until all 3 training turns are complete.
function gateMsg220(){
  const host=document.getElementById('prep');if(!host)return;
  let n=document.getElementById('trainGate220');
  if(!n){n=document.createElement('div');n.id='trainGate220';n.className='trainGate220';host.after(n)}
  const left=Math.max(0,3-(Number(S.turn)||0));
  n.textContent=left>0?`🔒 大会へ進むには育成をあと${left}回完了してください。`:'✅ 育成完了。大会へ進めます。';
  n.classList.toggle('ready220',left===0);
}
function syncGate220(){
  const b=document.getElementById('toMeet');if(!b)return;
  const done=(Number(S.turn)||0)>=3;
  b.disabled=!done;
  b.setAttribute('aria-disabled',done?'false':'true');
  b.textContent=done?`S${Number(S.season)||1} 大会へ`:`大会へ（育成 ${Number(S.turn)||0}/3）`;
  gateMsg220();
}
// Capture at window level so every legacy #toMeet handler is blocked until training is complete.
window.addEventListener('click',e=>{
  const b=e.target?.closest?.('#toMeet');if(!b)return;
  if((Number(S.turn)||0)>=3)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  syncGate220();
  const n=document.getElementById('trainGate220');if(n){n.classList.add('flash220');setTimeout(()=>n.classList.remove('flash220'),700)}
},true);

const before220=render;
render=function(){const out=before220();syncGate220();return out};

const train220=document.getElementById('train');
if(train220)new MutationObserver(()=>syncGate220()).observe(train220,{childList:true,subtree:true,characterData:true});

const css=document.createElement('style');css.textContent=`
#toMeet:disabled{opacity:.42!important;filter:grayscale(.35)!important;cursor:not-allowed!important;box-shadow:none!important}.trainGate220{margin-top:8px;padding:9px 10px;border:1px solid #d2b86a;border-radius:10px;background:#fff5cf;color:#584718;font-size:9px;font-weight:900;text-align:center}.trainGate220.ready220{border-color:#75c99a;background:#eafff2;color:#17633b}.trainGate220.flash220{animation:gateFlash220 .7s ease}@keyframes gateFlash220{0%,100%{transform:none}25%{transform:translateX(-4px)}50%{transform:translateX(4px)}75%{transform:translateX(-2px)}}
`;document.head.appendChild(css);
setTimeout(syncGate220,0);
})();