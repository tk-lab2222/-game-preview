(()=>{
// v0.22.6: long-term training balance for 999 cap.
const SAVE223='star-athletes-save-v200';
const ROSTER223='star-athletes-active-roster-v210';
const KEYS223=['power','speed','stamina','agility','tech','guts'];
const TRAIN223={
 speed:{name:'星駆けダッシュ',gain:{speed:3,agility:1}},
 power:{name:'メテオクラッシュ',gain:{power:3,guts:1}},
 tech:{name:'スタートリック',gain:{tech:3,agility:1}},
 stamina:{name:'エンドレスロード',gain:{stamina:3,guts:1}},
 team:{name:'スターリンク',gain:{guts:2,tech:2}}
};
function growthMeta223(m){
 if(!m||!m.stats)return;
 if(!m.geneticBase226){m.geneticBase226={};KEYS223.forEach(k=>m.geneticBase226[k]=Number(m.stats[k])||0)}
 if(!m.trainingGain226){m.trainingGain226={};KEYS223.forEach(k=>m.trainingGain226[k]=0)}
 if(!m.matchGain226){m.matchGain226={};KEYS223.forEach(k=>m.matchGain226[k]=0)}
}
function persist223(){
  try{localStorage.setItem(SAVE223,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.warn('save223',e)}
  try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem(ROSTER223,JSON.stringify(S.nest))}catch(e){console.warn('roster223',e)}
}
function grade223(){const r=Math.random();return r<.10?['不調',.25]:r<.75?['成功',1]:r<.95?['大成功',1.65]:['超成功',2.5]}
function highStatMul223(v){return v>=950?.4:v>=850?.65:v>=700?.85:1}
function doTrain223(){
  if((Number(S.turn)||0)>=3||!Array.isArray(S.nest)||!S.nest.length)return;
  S.plans=(S.plans&&typeof S.plans==='object')?S.plans:{};
  const out=[];
  S.nest.forEach(m=>{
    if(!m||!m.stats)return;growthMeta223(m);
    const id=TRAIN223[S.plans[m.id]]?S.plans[m.id]:'speed';
    const [grade,mul]=grade223(),ups=[];
    Object.entries(TRAIN223[id].gain).forEach(([k,base])=>{
      const cur=Number(m.stats[k])||0,soft=highStatMul223(cur);
      const jitter=grade==='不調'?0:(Math.random()<.35?1:0);
      const n=Math.max(0,Math.round((base*mul+jitter)*soft));
      m.stats[k]=Math.min(999,cur+n);
      const actual=m.stats[k]-cur;
      m.trainingGain226[k]=(Number(m.trainingGain226[k])||0)+actual;
      ups.push(`${SL[k]} +${actual}`);
    });
    out.push(`<b>${m.name}：${grade}</b> ${ups.join(' / ')}`);
  });
  S.turn=(Number(S.turn)||0)+1;
  persist223();
  try{render()}catch(e){console.error('render223',e)}
  const gain=document.getElementById('gain');if(gain)gain.innerHTML=`<div class="notice trainGain223">${out.join('<br>')}</div>`;
  const turn=document.getElementById('turn');if(turn)turn.textContent=S.turn;
  persist223();
}
window.addEventListener('click',e=>{
  const b=e.target?.closest?.('#doTrain');if(!b)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  doTrain223();
},true);
const css=document.createElement('style');css.textContent=`.trainGain223{border:2px solid #79c99a!important;background:#effff5!important;color:#173d29!important}.trainGain223 b{color:#0b5d34!important}`;document.head.appendChild(css);
})();