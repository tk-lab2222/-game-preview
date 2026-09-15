(()=>{
// v0.22.3: own the actual training execution so displayed gains always become real stats.
const SAVE223='star-athletes-save-v200';
const ROSTER223='star-athletes-active-roster-v210';
const TRAIN223={
 speed:{name:'星駆けダッシュ',gain:{speed:12,agility:7}},
 power:{name:'メテオクラッシュ',gain:{power:12,guts:7}},
 tech:{name:'スタートリック',gain:{tech:12,agility:6}},
 stamina:{name:'エンドレスロード',gain:{stamina:12,guts:6}},
 team:{name:'スターリンク',gain:{guts:7,tech:7}}
};
function persist223(){
  try{localStorage.setItem(SAVE223,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.warn('save223',e)}
  try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem(ROSTER223,JSON.stringify(S.nest))}catch(e){console.warn('roster223',e)}
}
function grade223(){const r=Math.random();return r<.02?['超成功',2]:r<.15?['大成功',1.5]:['成功',1]}
function doTrain223(){
  if((Number(S.turn)||0)>=3||!Array.isArray(S.nest)||!S.nest.length)return;
  S.plans=(S.plans&&typeof S.plans==='object')?S.plans:{};
  const out=[];
  S.nest.forEach(m=>{
    if(!m||!m.stats)return;
    const id=TRAIN223[S.plans[m.id]]?S.plans[m.id]:'speed';
    const [grade,mul]=grade223(),ups=[];
    Object.entries(TRAIN223[id].gain).forEach(([k,base])=>{
      const n=Math.max(1,Math.round(base*mul+(Math.floor(Math.random()*5)-1)));
      m.stats[k]=(Number(m.stats[k])||0)+n;
      ups.push(`${SL[k]} +${n}`);
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
// Capture at window level and fully own #doTrain so the legacy onclick cannot double-run or fail silently.
window.addEventListener('click',e=>{
  const b=e.target?.closest?.('#doTrain');if(!b)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  doTrain223();
},true);

const css=document.createElement('style');css.textContent=`.trainGain223{border:2px solid #79c99a!important;background:#effff5!important;color:#173d29!important}.trainGain223 b{color:#0b5d34!important}`;document.head.appendChild(css);
})();