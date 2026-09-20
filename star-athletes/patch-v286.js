(()=>{
// v0.30.4 / information density pass.
// Progressive disclosure only: keep the important action visible, tuck detailed/secondary lists away.
const pref286={research:false,weekly:false};
function syncResearch286(){
 const host=document.getElementById('research276');if(!host)return;
 const list=host.querySelector('.list276'),note=host.querySelector('.note276');if(!list)return;
 let btn=host.querySelector('[data-research286]');
 if(!btn){
  btn=document.createElement('button');btn.type='button';btn.dataset.research286='1';btn.className='disclosure286';
  const summary=host.querySelector('.summary276');summary?.after(btn);if(!btn.parentNode)host.prepend(btn);
 }
 host.classList.toggle('expanded286',!!pref286.research);
 btn.textContent=pref286.research?'研究内容を閉じる':'研究内容を見る';
 list.style.display=pref286.research?'grid':'none';
 if(note)note.style.display=pref286.research?'block':'none';
}
function syncMission286(){
 const host=document.getElementById('continuity281');if(!host)return;
 const heads=[...host.querySelectorAll('.scopeHead281')],tasks=[...host.querySelectorAll('.tasks281')];
 if(heads.length<2||tasks.length<2)return;
 let box=host.querySelector('.weeklyWrap286');
 if(!box){
  box=document.createElement('details');box.className='weeklyWrap286';
  const sum=document.createElement('summary');sum.textContent='今週の目標を見る';
  box.appendChild(sum);
  heads[1].before(box);box.appendChild(heads[1]);box.appendChild(tasks[1]);
 }
 box.open=!!pref286.weekly;
 const sum=box.querySelector(':scope>summary');if(sum)sum.textContent=box.open?'今週の目標を閉じる':'今週の目標を見る';
 const policy=host.querySelector('.policy281'),note=host.querySelector('.note281');
 if(policy)policy.classList.add('secondary286');
 if(note)note.classList.add('secondary286');
}
function syncRepresentative286(){
 const host=document.getElementById('rep280');if(!host)return;
 const details=host.querySelector('.poolDetails280');if(!details)return;
 const hasBest=!!S.rep280?.best;
 const selected=(S.rep280?.selected||[]).length;
 // First setup should expose candidates. Once a team exists, keep the long candidate list tucked away.
 if(!details.dataset.density286){
  details.open=!hasBest&&selected<3;
  details.dataset.density286='1';
 }
 const summary=details.querySelector('summary');
 if(summary&&!summary.dataset.label286){
  summary.dataset.label286='1';
  const original=summary.textContent.trim();
  summary.textContent=hasBest?'代表候補を変更する — '+original:original;
 }
}
function sync286(){syncResearch286();syncMission286();syncRepresentative286()}
function late286(){sync286();[80,220,500].forEach(ms=>setTimeout(sync286,ms))}
window.addEventListener('click',e=>{
 const research=e.target?.closest?.('[data-research286]');
 if(research){e.preventDefault();pref286.research=!pref286.research;syncResearch286();return}
 const weekly=e.target?.closest?.('.weeklyWrap286>summary');
 if(weekly){setTimeout(()=>{pref286.weekly=!!weekly.parentElement?.open;syncMission286()},0);return}
 if(e.target?.closest?.('.tab,#batchGo260,#hatch,#adopt,#doTrain263,#limitGo279,#register280,#run,#next225,#annualNext233'))setTimeout(late286,0);
},true);
try{const prev286=render;render=function(){const out=prev286();setTimeout(late286,0);return out}}catch(e){console.warn('render286',e)}
const css=document.createElement('style');css.textContent=`
.disclosure286{width:100%;min-height:38px;margin:6px 0 0;border:1px solid #9eb0bf;border-radius:9px;background:#fff;color:#31475b;font-size:8px;font-weight:1000}
.weeklyWrap286{margin-top:9px}.weeklyWrap286>summary{list-style:none;cursor:pointer;padding:8px;border:1px solid #b9c9cf;border-radius:9px;background:#fff;font-size:8px;font-weight:1000;color:#3b5660}.weeklyWrap286>summary::-webkit-details-marker{display:none}.weeklyWrap286[open]>summary{margin-bottom:5px}
.secondary286{opacity:.72}
#rep280 .poolDetails280:not([open]){padding:7px 8px;border:1px solid #c7d2dc;border-radius:9px;background:#fff}#rep280 .poolDetails280>summary{cursor:pointer}
`;document.head.appendChild(css);setTimeout(late286,0);
})();