(()=>{
// v0.25.5: M0 stability guard. Normalize pre-S6 promotion state and expose a lightweight regression checker.
const SAVE255='star-athletes-save-v200';
function n255(v){return Number(v)||0}
function season255(){return Math.max(1,Math.min(6,n255(S.season)||1))}
function persist255(){try{localStorage.setItem(SAVE255,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem('star-athletes-active-roster-v210',JSON.stringify(S.nest))}catch(_){}}
function promotion255(){
  if(season255()>=6)return;
  let changed=false;
  if(S.promotionPending){S.promotionPending=false;changed=true}
  if(n255(S.promotionFromSeason)){S.promotionFromSeason=0;changed=true}
  if(S.promotion233){S.promotion233=false;changed=true}
  const r=document.getElementById('result');
  if(r){
    r.querySelectorAll('em,strong,b,span,div').forEach(el=>{
      const t=(el.textContent||'').trim();
      if(t==='🔥 昇格戦が発生！'||t==='昇格戦が発生！')el.remove();
    });
  }
  const b=document.getElementById('next225');
  if(b&&(b.textContent||'').includes('昇格戦')) b.textContent='次シーズンへ';
  if(changed)persist255();
}
function lineageIds255(){
  const cards=[...document.querySelectorAll('#lineagePool .card')];
  cards.forEach((card,i)=>{
    const rel=card.querySelector('[data-release]')?.dataset.release;
    const m=(S.lineage||[]).find(x=>x.id===rel)||(S.lineage||[])[i];
    if(m&&!card.dataset.id)card.dataset.id=m.id;
  });
}
function check255(){
  const problems=[];
  if(season255()<6&&S.promotionPending)problems.push('promotionPending before S6');
  if(!Array.isArray(S.nest))problems.push('nest is not array');
  if(!Array.isArray(S.cands))problems.push('cands is not array');
  if(!Array.isArray(S.parents))problems.push('parents is not array');
  if((S.nest||[]).length===3){
    for(const m of S.nest){
      if(!m?.id)problems.push('nest athlete missing id');
      if(!m?.stats)problems.push('nest athlete missing stats');
      if(!Array.isArray(m?.skills233))problems.push('nest athlete skills233 missing');
      if(!m?.hidden233)problems.push('nest athlete hidden233 missing');
    }
  }
  return {ok:problems.length===0,season:season255(),problems};
}
window.STAR_M0_255={check:check255};
function sync255(){try{promotion255();lineageIds255()}catch(e){console.warn('sync255',e)}}
function late255(){sync255();[60,180,420].forEach(ms=>setTimeout(sync255,ms))}
try{const prev255=render;render=function(){const out=prev255();late255();return out}}catch(e){console.warn('render255',e)}
window.addEventListener('click',e=>{if(e.target?.closest?.('#run,#next225,#annualNext233,#adopt,#hatch,.tab'))late255()},true);
late255();
})();