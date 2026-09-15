(()=>{
// v0.23.7: smarter training presets, remember last choice per athlete, keep displayed stats fresh.
const SAVE237='star-athletes-save-v200',ROSTER237='star-athletes-active-roster-v210';
const VALID237=new Set(['speed','power','tech','stamina','team']);
function n237(v){return Number(v)||0}
function bestPlan237(m){
  const s=m?.stats||{};
  const vals={power:n237(s.power),speed:n237(s.speed),stamina:n237(s.stamina),agility:n237(s.agility),tech:n237(s.tech),guts:n237(s.guts)};
  let best='power';for(const k of Object.keys(vals))if(vals[k]>vals[best])best=k;
  return best==='power'?'power':best==='speed'?'speed':best==='stamina'?'stamina':best==='tech'?'tech':best==='agility'?'speed':'team';
}
function ensurePlans237(){
  S.plans=(S.plans&&typeof S.plans==='object')?S.plans:{};
  for(const m of (S.nest||[])){
    if(!m?.id)continue;
    const current=S.plans[m.id];
    if(VALID237.has(current))continue;
    const remembered=VALID237.has(m.lastTrainingPlan237)?m.lastTrainingPlan237:null;
    S.plans[m.id]=remembered||bestPlan237(m);
  }
}
function persist237(){
  try{localStorage.setItem(SAVE237,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}
  try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem(ROSTER237,JSON.stringify(S.nest))}catch(_){}
}
function remember237(id,plan){
  if(!VALID237.has(plan))return;
  const m=(S.nest||[]).find(x=>x?.id===id);if(!m)return;
  m.lastTrainingPlan237=plan;
  S.plans=S.plans||{};S.plans[id]=plan;
  persist237();
}
function markFresh237(){
  document.querySelectorAll('.train210').forEach(card=>{
    let tag=card.querySelector('.fresh237');
    if(!tag){tag=document.createElement('small');tag.className='fresh237';const stats=card.querySelector('.stats210');stats?.before(tag)}
    if(tag)tag.textContent='能力値は現在値を表示';
  });
}
try{
  const before237=render;
  render=function(){
    ensurePlans237();
    const out=before237();
    setTimeout(markFresh237,0);
    return out;
  };
}catch(e){console.warn('render237',e)}
// Capture before v210's document handler consumes the click.
window.addEventListener('click',e=>{
  const b=e.target?.closest?.('[data-p210]');
  if(b)remember237(b.dataset.m210,b.dataset.p210);
},true);
const css=document.createElement('style');
css.textContent=`.fresh237{display:block;margin:3px 0 1px;font-size:6px;color:#77869a;text-align:right}`;
document.head.appendChild(css);
setTimeout(()=>{ensurePlans237();persist237();try{render()}catch(_){markFresh237()}},0);
})();