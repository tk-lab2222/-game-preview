(()=>{
// v0.28.4: training core integration. Fatigue/policy now affect outcomes; show injury risk; allow later training hooks.
// Story: 3 rounds, all 3 athletes train once per round.
// Intensity: safe / standard / high-load. Hidden growth/stability/luck influence outcomes.
const SAVE263='star-athletes-save-v200',ROSTER263='star-athletes-active-roster-v210';
const KEYS263=['power','speed','stamina','agility','tech','guts'];
const TRAIN263={
  speed:{name:'星駆けダッシュ',gain:{speed:3,agility:1}},
  power:{name:'メテオクラッシュ',gain:{power:3,guts:1}},
  tech:{name:'スタートリック',gain:{tech:3,agility:1}},
  stamina:{name:'エンドレスロード',gain:{stamina:3,guts:1}},
  team:{name:'スターリンク',gain:{guts:2,tech:2}}
};
const INT263={
  safe:{label:'安全',icon:'🛡️',desc:'伸び小・失敗ほぼなし'},
  normal:{label:'標準',icon:'⚖️',desc:'基準の成長とブレ'},
  high:{label:'高負荷',icon:'🔥',desc:'上振れ大・失敗あり'}
};
function n263(v){return Number(v)||0}
function clamp263(v,a,b){return Math.max(a,Math.min(b,v))}
function hidden263(m,k,d=3){const v=Number(m?.hidden233?.[k]);return Number.isFinite(v)?clamp263(v,0,7):d}
function avg263(m){const a=KEYS263.map(k=>n263(m?.stats?.[k]));return a.reduce((x,y)=>x+y,0)/(a.length||1)}
function best263(){return [...(S.nest||[])].sort((a,b)=>avg263(b)-avg263(a))[0]?.id}
function state263(){
  if(!S.training263||typeof S.training263!=='object')S.training263={};
  if(!S.training263.alloc||typeof S.training263.alloc!=='object')S.training263.alloc={};
  if(!S.training263.intensity||typeof S.training263.intensity!=='object')S.training263.intensity={};
  return S.training263;
}
function defaultAlloc263(){
  const st=state263(),nest=S.nest||[];
  if(!nest.length)return;
  // Initialize only when this roster has no allocation state yet.
  // Do NOT refill to 4 after the player presses minus; partial totals are an intentional edit state.
  const ids=new Set(nest.map(m=>m.id));
  const hasAny=Object.keys(st.alloc||{}).some(id=>ids.has(id));
  if(hasAny){
    nest.forEach(m=>st.alloc[m.id]=clamp263(n263(st.alloc[m.id]),0,2));
    for(const id of Object.keys(st.alloc))if(!ids.has(id))delete st.alloc[id];
    return;
  }
  const ace=best263();
  st.alloc={};
  nest.forEach(m=>st.alloc[m.id]=m.id===ace?2:1);
  let total=nest.reduce((s,m)=>s+n263(st.alloc[m.id]),0);
  for(const m of nest){
    while(total>4&&st.alloc[m.id]>0){st.alloc[m.id]--;total--}
    while(total<4&&st.alloc[m.id]<2){st.alloc[m.id]++;total++}
  }
}
function total263(){const st=state263();return (S.nest||[]).reduce((s,m)=>s+clamp263(n263(st.alloc[m.id]),0,2),0)}
function persist263(){
  try{localStorage.setItem(SAVE263,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}
  try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem(ROSTER263,JSON.stringify(S.nest))}catch(_){}
}
function fatigue263(m){const st=state263();if(!st.fatigue||typeof st.fatigue!=='object')st.fatigue={};return clamp263(n263(st.fatigue[m.id]),0,2)}
function fatigueLabel263(m){const f=fatigue263(m);return f===0?'好調':f===1?'普通':'疲労'}
function injuryRate263(m,mode){
  const stability=hidden263(m,'stability',2),luck=hidden263(m,'luck',2),f=fatigue263(m);
  if(mode==='safe')return 0;
  if(mode==='normal')return clamp263(.04-(stability*5/7)*.004-(luck*5/7)*.002+f*.015,.01,.08);
  let r=clamp263(.28-(stability*5/7)*.035-(luck*5/7)*.008,.06,.28);
  if(f===1)r=1-(1-r)*.84;
  if(f===2)r=1-(1-r)*.66;
  if(state263().policy266==='lineage')r=Math.max(.03,r-.04);
  return clamp263(r,.03,.48);
}
function riskText263(m,mode){
  const pct=Math.round(injuryRate263(m,mode)*100);
  const f=fatigueLabel263(m);
  if(mode==='safe')return `コンディション ${f} / ケガ率 0%`;
  return `コンディション ${f} / ケガ率 ${pct}%`;
}
function pointMul263(pt){return pt<=0?0:pt===1?.75:1.45}
function outcome263(m,mode){
  const growth=hidden263(m,'growth',2),stability=hidden263(m,'stability',2),luck=hidden263(m,'luck',2),f=fatigue263(m);
  let gmul=[.80,.86,.92,1,1.07,1.16,1.28,1.42][growth]||1;
  const policy=state263().policy266||'';
  if(policy==='compete'&&(mode==='normal'||mode==='high'))gmul*=1.08;
  else if(policy==='growth'&&(mode==='safe'||mode==='normal'))gmul*=1.10;
  else if(policy==='lineage')gmul*=mode==='high'?.96:1.04;
  else if(policy==='skill'){
    const plan=S.plans?.[m.id]||'';
    gmul*=plan==='tech'||plan==='team'?1.14:.98;
  }
  if(mode==='high')gmul*=f===2?.72:f===1?.88:1;
  else if(mode==='normal')gmul*=f===2?.86:f===1?.95:1;

  const injury=injuryRate263(m,mode),r=Math.random();
  if(r<injury)return{grade:'ケガ・中断',mul:0,risk:mode,injury:true};
  const rr=(r-injury)/(1-injury||1);

  if(mode==='safe'){
    const great=.04+(luck*5/7)*.008;
    return {grade:rr<great?'大成功':'成功',mul:gmul*(rr<great?1.12:.88),risk:'safe'};
  }
  if(mode==='high'){
    const ultra=.025+(luck*5/7)*.008+(growth*5/7)*.004;
    const great=.15+(luck*5/7)*.012+(growth*5/7)*.008;
    if(rr<ultra)return{grade:'超成功',mul:gmul*2.0,risk:'high'};
    if(rr<ultra+great)return{grade:'大成功',mul:gmul*1.55,risk:'high'};
    return{grade:'成功',mul:gmul*1.12,risk:'high'};
  }
  const bad=clamp263(.11-(stability*5/7)*.014-(luck*5/7)*.004,.02,.11);
  const ultra=.018+(luck*5/7)*.005;
  const great=.12+(luck*5/7)*.01+(growth*5/7)*.006;
  if(rr<bad)return{grade:'伸び悩み',mul:gmul*.40,risk:'normal'};
  if(rr<bad+ultra)return{grade:'超成功',mul:gmul*1.65,risk:'normal'};
  if(rr<bad+ultra+great)return{grade:'大成功',mul:gmul*1.28,risk:'normal'};
  return{grade:'成功',mul:gmul,risk:'normal'};
}
function gradeLabel263(g){return g==='ケガ・中断'?'🩹 ケガで中断':g==='伸び悩み'?'△ 伸び悩み':g==='超成功'?'💫 超成功':g==='大成功'?'🌟 大成功':'✅ 成功'}
function highStatMul263(v){return v>=950?.4:v>=850?.65:v>=700?.85:1}
function ensureGrowthMeta263(m){
  if(!m.geneticBase226){m.geneticBase226={};KEYS263.forEach(k=>m.geneticBase226[k]=n263(m.stats?.[k]))}
  if(!m.trainingGain226){m.trainingGain226={};KEYS263.forEach(k=>m.trainingGain226[k]=0)}
}
function controls263(){
  if(!Array.isArray(S.nest)||S.nest.length!==3)return;
  const st=state263();
  for(const m of S.nest){
    const mode=INT263[st.intensity[m.id]]?st.intensity[m.id]:'normal';
    st.intensity[m.id]=mode;
  }
}
function panel263(){
  const old=document.getElementById('doTrain');if(!old)return;
  old.style.display='none';
  let host=document.getElementById('trainingDecision263');
  if(!host){host=document.createElement('div');host.id='trainingDecision263';host.className='trainingDecision263';old.after(host)}
  const turn=clamp263(n263(S.turn),0,3),left=Math.max(0,3-turn);
  host.innerHTML=`<div class="budgetHead263"><div><small>TRAINING</small><b>第${Math.min(3,turn+1)}ラウンド</b></div><strong>${turn}/3</strong></div>
   <div class="budgetHint263">3体それぞれの育成種目と強度を決めます。ポイント配分はLIMIT到達後に解禁予定。</div>
   <button type="button" id="doTrain263" class="btn or" ${turn<3?'':'disabled'}>${turn<3?'この内容で練習する':'育成完了'}</button>`;
}
function render263(){try{controls263();panel263()}catch(e){console.warn('render263',e)}}
function train263(){
  if(n263(S.turn)>=3||!Array.isArray(S.nest)||S.nest.length!==3)return;
  const st=state263(),out=[];
  for(const m of S.nest){
    const mode=INT263[st.intensity[m.id]]?st.intensity[m.id]:'normal';
    ensureGrowthMeta263(m);
    const plan=TRAIN263[S.plans?.[m.id]]?S.plans[m.id]:'speed';
    const o=outcome263(m,mode),ups=[];
    for(const [k,base] of Object.entries(TRAIN263[plan].gain)){
      const cur=n263(m.stats[k]),soft=highStatMul263(cur),jitter=o.injury?0:(Math.random()<.35?1:0);
      const raw=(base*o.mul+jitter)*soft;
      const gain=Math.max(0,Math.round(raw));
      m.stats[k]=Math.min(999,cur+gain);
      const actual=m.stats[k]-cur;
      m.trainingGain226[k]=n263(m.trainingGain226[k])+actual;
      ups.push(`${SL[k]}+${actual}`);
    }
    out.push(`<b>${m.name}：${INT263[mode].label} / ${gradeLabel263(o.grade)}</b> ${ups.join(' / ')}`);
  }
  S.turn=n263(S.turn)+1;
  persist263();
  try{render()}catch(e){console.error('render train263',e)}
  try{window.renderRoster210Live&&window.renderRoster210Live()}catch(_){}
  const gain=document.getElementById('gain');if(gain)gain.innerHTML=`<div class="notice trainGain263">${out.join('<br>')}</div>`;
  render263();persist263();
}
window.addEventListener('click',e=>{
  if(e.target?.closest?.('.tab[data-v="train"],#adopt,#doTrain,#toMeet')){
    setTimeout(late263,0);
  }
  const go=e.target?.closest?.('#doTrain263');if(go){e.preventDefault();train263();return}
},true);
function late263(){
  render263();
  [40,100,220,450,800,1300,2100,3200].forEach(ms=>setTimeout(render263,ms));
}
try{const prev263=render;render=function(){const out=prev263();late263();return out}}catch(e){console.warn('wrap263',e)}
try{
  if(typeof window.renderRoster210Live==='function'&&!window.renderRoster210Live263){
    const prevRoster263=window.renderRoster210Live;
    window.renderRoster210Live263=true;
    window.renderRoster210Live=function(){const out=prevRoster263();setTimeout(render263,0);setTimeout(render263,80);return out};
  }
}catch(e){console.warn('roster263',e)}
const css=document.createElement('style');css.textContent=`

.trainingDecision263{margin-top:9px;padding:10px;border:2px solid #344b63;border-radius:13px;background:linear-gradient(145deg,#f7fbff,#edf4fa)}.budgetHead263{display:flex;justify-content:space-between;align-items:center}.budgetHead263 small{display:block;font-size:6px;color:#718293;font-weight:1000}.budgetHead263 b{font-size:12px}.budgetHead263 strong{font-size:11px;background:#25384b;color:#fff;padding:4px 8px;border-radius:999px}.budgetHint263{font-size:7px;color:#657585;margin-bottom:7px}.trainingDecision263 .btn{width:100%}.trainGain263{border:2px solid #79c99a!important;background:#effff5!important;color:#173d29!important}.trainGain263 small{font-size:7px;color:#5f7167}
`;document.head.appendChild(css);late263();
})();