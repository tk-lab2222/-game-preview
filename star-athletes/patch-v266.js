(()=>{
// v0.28.8: generation policy UI restored; avoid private TRAIN210 reference.
const SAVE266='star-athletes-save-v200';
const MEM266='star-athletes-training-memory-v243';
const PLAN_NAME266={speed:'星駆けダッシュ',power:'メテオクラッシュ',tech:'スタートリック',stamina:'エンドレスロード',team:'スターリンク'};
const POL266={
  compete:{icon:'🏆',name:'大会重視',desc:'得意能力のメニューを自動選択',hint:'今世代の勝利を優先'},
  growth:{icon:'🌱',name:'成長重視',desc:'弱点能力のメニューを自動選択',hint:'安定して能力を伸ばす'},
  lineage:{icon:'🧬',name:'血統研究',desc:'弱点育成＋安全強度を自動選択',hint:'無理をせず素材を守る'},
  skill:{icon:'✨',name:'スキル育成',desc:'技術 / 勝負強さ系を自動選択',hint:'技術 / 勝負強さを重点育成'}
};
function state266(){if(!S.training263||typeof S.training263!=='object')S.training263={};return S.training263}
function policy266(){return state266().policy266||''}
function persist266(){try{localStorage.setItem(SAVE266,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
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
  if(!POL266[k]||Number(S.turn)>0)return;
  state266().policy266=k;applyPolicy266(k);persist266();
  try{window.renderRoster210Live&&window.renderRoster210Live()}catch(_){}
  setTimeout(()=>{try{window.renderRoster210Live&&window.renderRoster210Live()}catch(_){};render266()},80);
  render266();
}
function render266(){
  const plans=document.getElementById('plans');if(!plans||!Array.isArray(S.nest)||S.nest.length!==3)return;
  let host=document.getElementById('policy266');
  if(!host){host=document.createElement('div');host.id='policy266';host.className='policy266';plans.before(host)}
  const cur=policy266(),locked=Number(S.turn)>0;
  host.innerHTML=`<div class="policyHead266"><div><small>GENERATION POLICY</small><b>今世代の育成方針</b></div>${cur?`<strong>${POL266[cur].icon} ${POL266[cur].name}</strong>`:'<strong>未選択</strong>'}</div>
    <div class="policyGrid266">${Object.entries(POL266).map(([k,p])=>`<button type="button" data-policy266="${k}" class="${cur===k?'on266':''}" ${locked?'disabled':''}><b>${p.icon} ${p.name}</b><small>${p.desc}</small></button>`).join('')}</div>
    <div class="policyApplied266">${cur?`自動設定：${(S.nest||[]).map(m=>`${m.name}→${PLAN_NAME266[S.plans?.[m.id]]||S.plans?.[m.id]||'-'} / ${state266().intensity?.[m.id]==='safe'?'安全':state266().intensity?.[m.id]==='high'?'高負荷':'標準'}`).join('　')}`:'方針を選ぶと3体の練習メニューが自動で切り替わります'}</div><div class="policyHint266">${cur?(locked?'この世代は「'+POL266[cur].name+'」で固定中':'育成開始までは変更できます'):'最初の育成前に1つ選択。固定の最強方針ではなく、育て方を変える選択です。'}</div>`;
  const go=document.getElementById('doTrain263');if(go){go.disabled=Number(S.turn)>=3||!cur;go.title=!cur?'先に今世代の育成方針を選んでください':''}
}
// Modify M2.2 outcome multipliers, while leaving click ownership with v263.
try{
  if(typeof outcome263==='function'&&!window.outcome263Policy266){
    const base266=outcome263;window.outcome263Policy266=true;
    outcome263=function(m,mode){
      const o=base266(m,mode),p=policy266();
      if(p==='compete'&&(mode==='normal'||mode==='high'))o.mul*=1.08;
      else if(p==='growth'&&(mode==='safe'||mode==='normal'))o.mul*=1.10;
      else if(p==='lineage')o.mul*=mode==='high'?.96:1.04;
      else if(p==='skill'){
        const plan=S.plans?.[m.id]||'';
        if(plan==='tech'||plan==='team')o.mul*=1.14;else o.mul*=.98;
      }
      return o;
    };
  }
}catch(e){console.warn('policy outcome266',e)}
// Bloodline research softens fatigue gain from high-load once per training result.
function softenFatigue266(){
  if(policy266()!=='lineage'||!S.training263?.fatigue)return;
  S.nest?.forEach(m=>{
    if((S.training263.intensity?.[m.id]||'normal')==='high'&&Number(S.training263.fatigue[m.id])>=2){
      S.training263.fatigue[m.id]=1;
    }
  });persist266();
}
window.addEventListener('click',e=>{
  const b=e.target?.closest?.('[data-policy266]');if(b){e.preventDefault();e.stopPropagation();choose266(b.dataset.policy266);return}
  if(e.target?.closest?.('#doTrain263'))setTimeout(()=>{softenFatigue266();render266()},20);
  if(e.target?.closest?.('.tab[data-v="train"],#adopt'))setTimeout(render266,0);
},true);
// New adopted roster starts a new generation policy choice.
window.addEventListener('click',e=>{
  if(!e.target?.closest?.('#adopt'))return;
  setTimeout(()=>{if(Number(S.turn)===0){state266().policy266='';persist266();render266()}},220);
},true);
function late266(){render266();[60,180,420].forEach(ms=>setTimeout(render266,ms))}
try{const prev266=render;render=function(){const out=prev266();late266();return out}}catch(e){console.warn('render266',e)}
const css=document.createElement('style');css.textContent=`.policy266{margin-bottom:10px;padding:9px;border:1px solid #aebdca;border-radius:11px;background:#f7fafc}.policyHead266{display:flex;justify-content:space-between;align-items:center;gap:8px}.policyHead266 small{display:block;font-size:6px;color:#71808e;font-weight:1000}.policyHead266 b{font-size:10px}.policyHead266 strong{font-size:8px;border:1px solid #91a3b3;border-radius:999px;padding:3px 7px;background:#fff}.policyGrid266{display:grid;grid-template-columns:repeat(2,1fr);gap:5px;margin-top:7px}.policyGrid266 button{min-height:48px;border:1px solid #aebdca;border-radius:9px;background:#fff;padding:6px;color:#26394b;text-align:left}.policyGrid266 button b{display:block;font-size:8px}.policyGrid266 button small{display:block;font-size:6px;line-height:1.3;margin-top:2px;color:#71808e}.policyGrid266 button.on266{border-color:#e18c20;background:#fff0cf;box-shadow:0 0 0 1px #ffd58f}.policyGrid266 button:disabled:not(.on266){opacity:.38}.policyApplied266{margin-top:6px;padding:6px;border-radius:7px;background:#eef4f8;font-size:6px;font-weight:900;color:#43576a}.policyHint266{margin-top:6px;font-size:7px;color:#657585}`;document.head.appendChild(css);late266();
})();