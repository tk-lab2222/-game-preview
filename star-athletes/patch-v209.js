(()=>{
// v0.20.9: recover active training roster, prevent blank training/prep panels,
// and keep shiny labels consistent across hatch/card/inheritance views.
const ROSTER_KEY209='star-athletes-active-roster-v209';
const SHINY209={draco:'エメラルド系',unil:'ミント系',grimo:'パープル系',puru:'ピンク系'};
function label209(m){return m?.shiny?`✨色違い（${SHINY209[m.species]||'特殊色'}）`:(m?.visual?.color||'');}
function clone209(v){try{return JSON.parse(JSON.stringify(v))}catch(_){return v}}
function saveRoster209(){
  try{if(Array.isArray(S.nest)&&S.nest.length) localStorage.setItem(ROSTER_KEY209,JSON.stringify(S.nest))}catch(_){ }
}
function recoverRoster209(){
  if(Array.isArray(S.nest)&&S.nest.length){saveRoster209();return true}
  // If the player already selected exactly three newborns, use that intended roster.
  if(Array.isArray(S.sel)&&S.sel.length===3&&Array.isArray(S.cands)){
    const chosen=S.cands.filter(m=>S.sel.includes(m.id));
    if(chosen.length===3){S.nest=chosen;saveRoster209();return true}
  }
  // Restore the last confirmed active roster when layered save migrations lost S.nest.
  try{
    const raw=localStorage.getItem(ROSTER_KEY209);if(raw){const r=JSON.parse(raw);if(Array.isArray(r)&&r.length){S.nest=r;return true}}
  }catch(_){ }
  return false;
}
function rosterStatus209(){
  const plans=document.getElementById('plans'),prep=document.getElementById('prep');if(!plans||!prep)return;
  if(recoverRoster209())return;
  plans.innerHTML=`<div class="emptyRoster209"><b>育成メンバー未登録</b><span>配合で3体を選び「この3体をネストへ」を押すと、ここにトレーニングカードが表示されます。</span></div>`;
  prep.innerHTML=`<div class="emptyRoster209"><b>出場メンバー未登録</b><span>ネストに3体登録すると、競技ごとの出場者・作戦カードが表示されます。</span></div>`;
}
function render209(){
  const ok=recoverRoster209();
  if(ok){
    try{typeof renderTraining208==='function'&&renderTraining208()}catch(e){console.error('training v209',e)}
  }else rosterStatus209();
  patchShiny209();
  requestAnimationFrame(()=>{try{window.paintSpecies&&window.paintSpecies()}catch(_){}});
}
function patchShiny209(){
  const pools=[...(S.starters||[]),...(S.nest||[]),...(S.lineage||[]),...(S.cands||[])];
  const byId=new Map(pools.filter(Boolean).map(m=>[m.id,m]));
  document.querySelectorAll('.card[data-id]').forEach(c=>{
    const m=byId.get(c.dataset.id);if(!m?.shiny)return;
    let el=c.querySelector('.shinyColor209');if(!el){el=document.createElement('div');el.className='shinyColor209';c.querySelector('.bd')?.appendChild(el)}
    if(el)el.textContent=label209(m);
  });
  const birth=document.getElementById('birth');
  const latest=S.cands?.[S.cands.length-1];
  if(latest?.shiny&&birth?.querySelector('.hatchReveal')){
    let tag=birth.querySelector('.shinyResult209');if(!tag){tag=document.createElement('div');tag.className='shinyResult209';birth.querySelector('.hatchName')?.after(tag)}
    if(tag)tag.textContent=label209(latest);
    const inh=birth.querySelector('.inheritBox');
    if(inh){const normal=latest.visual?.color||'';const parts=[label209(latest)+(normal?`（通常色:${normal}）`:''),latest.visual?.pattern,latest.visual?.part].filter(Boolean);if(latest.visual?.acc&&latest.visual.acc!=='なし')parts.push(latest.visual.acc);inh.innerHTML=`<b>継承</b><br>親：${latest.origin||''}<br>見た目：${parts.join(' / ')}`;}
  }
}
// Back up roster whenever adoption/training renders leave us with a valid active team.
const before209=render;
render=function(){const out=before209();saveRoster209();setTimeout(render209,0);return out};
// Also refresh when entering training tab; avoids stale empty panels after tab changes.
document.addEventListener('click',e=>{const t=e.target.closest?.('.tab[data-v="train"]');if(t)setTimeout(render209,0)},true);
const css=document.createElement('style');css.textContent=`
.emptyRoster209{border:2px dashed #9aa9b8;border-radius:14px;background:#f7fbff;padding:14px;text-align:center;color:#243244}.emptyRoster209 b{display:block;font-size:13px;margin-bottom:5px}.emptyRoster209 span{display:block;font-size:9px;line-height:1.55;color:#667789}.shinyColor209,.shinyResult209{color:#d7548f;font-weight:1000}.shinyColor209{font-size:8px;margin-top:4px}.shinyResult209{text-align:center;font-size:9px;margin:4px 0 7px;text-shadow:0 0 10px #ff8cc477}
`;
document.head.appendChild(css);
setTimeout(render209,0);
})();