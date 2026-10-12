(()=>{
// v0.28.8: generation policy UI restored; avoid private TRAIN210 reference.
const SAVE266='star-athletes-save-v200';
const MEM266='star-athletes-training-memory-v243';
const POL266={
  compete:{icon:'🏆',name:'大会重視',desc:'得意能力を選択。標準・高負荷の成長 ×1.08'},
  growth:{icon:'🌱',name:'成長重視',desc:'弱点能力を選択。安全・標準の成長 ×1.10'},
  lineage:{icon:'🧬',name:'血統研究',desc:'弱点・安全を選択。安全・標準の成長 ×1.04、高負荷 ×0.96。高負荷のケガ率 −4pt、疲労は普通まで'},
  skill:{icon:'✨',name:'スキル育成',desc:'技巧・連携を選択。両メニューの成長 ×1.14、ほか ×0.98。選ぶだけでスキルを獲得する効果はありません'}
};
function state266(){if(!S.training263||typeof S.training263!=='object')S.training263={};return S.training263}
function policy266(){return state266().policy266||''}
function persist266(){try{window.STAR_SAVE_CORE?.save?.('v266')||localStorage.setItem(SAVE266,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function persistPlans266(){try{const mem=JSON.parse(localStorage.getItem(MEM266)||'{}');(S.nest||[]).forEach(m=>{if(S.plans?.[m.id])mem[m.id]=S.plans[m.id]});localStorage.setItem(MEM266,JSON.stringify(mem))}catch(_){}}
function planForStat266(k){return k==='power'?'power':k==='stamina'?'stamina':k==='tech'?'tech':k==='guts'?'team':'speed'}
function statKey266(m,dir='max'){
  const keys=['power','speed','stamina','agility','tech','guts'];
  return keys.sort((a,b)=>dir==='max'?(Number(m?.stats?.[b])||0)-(Number(m?.stats?.[a])||0):(Number(m?.stats?.[a])||0)-(Number(m?.stats?.[b])||0))[0]||'speed';
}
function applyPolicy266(k){
  S.plans=(S.plans&&typeof S.plans==='object')?S.plans:{};
  const st=state266();if(!st.intensity||typeof st.intensity!=='object')st.intensity={};
  (S.nest||[]).forEach(m=>{
    if(k==='compete'){S.plans[m.id]=planForStat266(statKey266(m,'max'));st.intensity[m.id]='normal'}
    else if(k==='growth'){S.plans[m.id]=planForStat266(statKey266(m,'min'));st.intensity[m.id]='normal'}
    else if(k==='lineage'){S.plans[m.id]=planForStat266(statKey266(m,'min'));st.intensity[m.id]='safe'}
    else if(k==='skill'){S.plans[m.id]=(Number(m?.stats?.tech)||0)<=(Number(m?.stats?.guts)||0)?'tech':'team';st.intensity[m.id]='normal'}
  });
  persistPlans266();
}
function choose266(k){
  if(!POL266[k]||Number(S.turn)>=3||window.STAR_EVENTS267?.pending?.())return;
  state266().policy266=k;applyPolicy266(k);persist266();
  try{window.renderRoster210Live&&window.renderRoster210Live()}catch(_){}
  setTimeout(()=>{try{window.renderRoster210Live&&window.renderRoster210Live()}catch(_){};render266()},80);
  render266();
}
function render266(){
  const plans=document.getElementById('plans');if(!plans||!Array.isArray(S.nest)||S.nest.length!==3)return;
  let host=document.getElementById('policy266');
  if(!host){host=document.createElement('div');host.id='policy266';host.className='policy266';plans.before(host)}
  const cur=policy266(),locked=Number(S.turn)>=3||!!window.STAR_EVENTS267?.pending?.(),open=host.querySelector('details')?.open||false;
  host.innerHTML=`<details ${open?'open':''}><summary>方針 <strong>${POL266[cur]?.name||'手動'}</strong></summary><div class="policyGrid266">${Object.entries(POL266).map(([k,p])=>`<button type="button" data-policy266="${k}" aria-pressed="${cur===k}" class="${cur===k?'on266':''}" ${locked?'disabled':''}><b>${p.name}</b><small>${p.desc}</small></button>`).join('')}</div><p class="policyHint266">選ぶと3体の種目・負荷を設定。以後は個別に変更できます。方針による成長補正は次の練習にも適用されます。</p></details>`;
  const go=document.getElementById('doTrain263');if(go){go.disabled=Number(S.turn)>=3||!!window.STAR_EVENTS267?.pending?.();go.title='' }
}
// Training263 owns policy outcome and fatigue; retire the dead wrapper and delayed duplicate.
window.addEventListener('click',e=>{
  const b=e.target?.closest?.('[data-policy266]');if(b){e.preventDefault();e.stopPropagation();choose266(b.dataset.policy266);return}
  if(e.target?.closest?.('#doTrain263'))setTimeout(render266,20);
  if(e.target?.closest?.('.tab[data-v="train"],#adopt'))setTimeout(render266,0);
},true);
// New adopted roster starts a new generation policy choice.
window.addEventListener('click',e=>{
  if(!e.target?.closest?.('#adopt'))return;
  setTimeout(()=>{if(Number(S.turn)===0){state266().policy266='';persist266();render266()}},220);
},true);
function late266(){render266();[80,220].forEach(ms=>setTimeout(render266,ms))}
try{const prev266=render;render=function(){const out=prev266();late266();return out}}catch(e){console.warn('render266',e)}
const css=document.createElement('style');css.textContent=`.policy266{margin-bottom:10px;padding:9px;border:1px solid #aebdca;border-radius:11px;background:#f7fafc}.policyHead266{display:flex;justify-content:space-between;align-items:center;gap:8px}.policyHead266 small{display:block;font-size:6px;color:#71808e;font-weight:1000}.policyHead266 b{font-size:10px}.policyHead266 strong{font-size:8px;border:1px solid #91a3b3;border-radius:999px;padding:3px 7px;background:#fff}.policyGrid266{display:grid;grid-template-columns:repeat(2,1fr);gap:5px;margin-top:7px}.policyGrid266 button{min-height:48px;border:1px solid #aebdca;border-radius:9px;background:#fff;padding:6px;color:#26394b;text-align:left}.policyGrid266 button b{display:block;font-size:8px}.policyGrid266 button small{display:block;font-size:6px;line-height:1.3;margin-top:2px;color:#71808e}.policyGrid266 button.on266{border-color:#e18c20;background:#fff0cf;box-shadow:0 0 0 1px #ffd58f}.policyGrid266 button:disabled:not(.on266){opacity:.38}.policyApplied266{margin-top:6px;padding:6px;border-radius:7px;background:#eef4f8;font-size:6px;font-weight:900;color:#43576a}.policyHint266{margin-top:6px;font-size:7px;color:#657585}`;document.head.appendChild(css);late266();
})();
