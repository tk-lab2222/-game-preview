(()=>{
// v0.23.9: persist each athlete's last training menu independently of season/generation state.
const MEM239='star-athletes-training-memory-v239';
const SAVE239='star-athletes-save-v200';
const ROSTER239='star-athletes-active-roster-v210';
const VALID239=new Set(['speed','power','tech','stamina','team']);
function load239(){try{const x=JSON.parse(localStorage.getItem(MEM239)||'{}');return x&&typeof x==='object'?x:{}}catch(_){return{}}}
function saveMem239(mem){try{localStorage.setItem(MEM239,JSON.stringify(mem))}catch(_){}}
function persist239(){
 try{localStorage.setItem(SAVE239,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}
 try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem(ROSTER239,JSON.stringify(S.nest))}catch(_){}
}
function n239(v){return Number(v)||0}
function best239(m){
 const s=m?.stats||{};const vals={power:n239(s.power),speed:n239(s.speed),stamina:n239(s.stamina),agility:n239(s.agility),tech:n239(s.tech),guts:n239(s.guts)};
 let best='power';for(const k of Object.keys(vals))if(vals[k]>vals[best])best=k;
 return best==='power'?'power':best==='speed'?'speed':best==='stamina'?'stamina':best==='tech'?'tech':best==='agility'?'speed':'team';
}
function apply239(){
 S.plans=(S.plans&&typeof S.plans==='object')?S.plans:{};const mem=load239();
 for(const m of (S.nest||[])){
   if(!m?.id)continue;
   if(VALID239.has(S.plans[m.id]))continue;
   const remembered=VALID239.has(mem[m.id])?mem[m.id]:(VALID239.has(m.lastTrainingPlan237)?m.lastTrainingPlan237:null);
   S.plans[m.id]=remembered||best239(m);
   if(remembered)m.lastTrainingPlan237=remembered;
 }
}
function remember239(id,plan){
 if(!id||!VALID239.has(plan))return;
 const mem=load239();mem[id]=plan;saveMem239(mem);
 const m=(S.nest||[]).find(x=>x?.id===id);if(m)m.lastTrainingPlan237=plan;
 S.plans=S.plans||{};S.plans[id]=plan;persist239();
}
window.addEventListener('click',e=>{const b=e.target?.closest?.('[data-p210]');if(b)remember239(b.dataset.m210,b.dataset.p210)},true);
try{const before239=render;render=function(){apply239();return before239()}}catch(e){console.warn('render239',e)}
setTimeout(()=>{apply239();persist239();try{render()}catch(_){}},0);
})();