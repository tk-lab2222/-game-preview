(()=>{
// v0.20.4: take full ownership of breeder parent selection so selected athletes
// always appear in the pair slots, regardless of older layered render handlers.
function pool204(){
  try{return breederPool()}catch(_){return [...(S.starters||[]),...(S.lineage||[]),...(S.nest||[])]}
}
function mon204(id){return pool204().find(m=>m&&m.id===id)}
function slot204(m,label){
  if(!m)return `<div class="slotEmpty204"><b>${label}</b><span>アスリートを選択</span></div>`;
  return `<div class="slotFilled204">${avatar(m)}<div class="slotMeta204"><small>${label}</small><b>${m.name||'NO NAME'}</b><span>${SP[m.species]?.[0]||m.species||''} ・ ${m.rarity||'C'}</span><em>${m.personality||''}</em></div></div>`;
}
function drawPair204(){
  S.parents=Array.isArray(S.parents)?S.parents.filter(Boolean).slice(0,2):[];
  const a=mon204(S.parents[0]),b=mon204(S.parents[1]);
  const pa=document.getElementById('pa'),pb=document.getElementById('pb');
  if(pa){pa.innerHTML=slot204(a,'親①');pa.classList.toggle('filled204',!!a)}
  if(pb){pb.innerHTML=slot204(b,'親②');pb.classList.toggle('filled204',!!b)}
  document.querySelectorAll('#breeders [data-mode="p"]').forEach(card=>{
    const idx=S.parents.indexOf(card.dataset.id);
    card.classList.toggle('sel',idx>=0);
    let tag=card.querySelector('.pairTag204');
    if(idx>=0){
      if(!tag){tag=document.createElement('div');tag.className='pairTag204';card.appendChild(tag)}
      tag.textContent=idx===0?'親①':'親②';
    }else if(tag)tag.remove();
  });
  const btn=document.getElementById('breedBtn');
  if(btn){
    btn.disabled=S.parents.length!==2||!!S.egg||(S.cands?.length||0)>=cap();
    btn.textContent=S.parents.length===2?'✦ スター配合を開始':'親を2体選ぶ';
  }
  requestAnimationFrame(()=>{try{window.paintSpecies&&window.paintSpecies()}catch(_){}});
}
function select204(id){
  if(!id)return;
  S.parents=Array.isArray(S.parents)?S.parents:[];
  if(S.parents.includes(id))S.parents=S.parents.filter(x=>x!==id);
  else if(S.parents.length<2)S.parents=[...S.parents,id];
  else S.parents=[S.parents[1],id];
  drawPair204();
  try{typeof save200==='function'&&save200()}catch(_){}
}
// Capture the tap before legacy onclick handlers can toggle the same id again.
document.addEventListener('click',e=>{
  const card=e.target.closest?.('#breeders [data-mode="p"]');
  if(!card)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  select204(card.dataset.id);
},true);

function bindAfterRender204(){
  drawPair204();
}
const before204=render;
render=function(){
  const out=before204();
  bindAfterRender204();
  requestAnimationFrame(bindAfterRender204);
  return out;
};
const css=document.createElement('style');css.textContent=`
#pa,#pb{position:relative!important;min-height:168px!important;display:block!important;padding:0!important;overflow:hidden!important;background:#f7fbff!important;color:#142033!important}
.slotFilled204{height:100%;min-height:168px;display:grid;grid-template-rows:112px auto;background:linear-gradient(180deg,#f7fbff,#eef5ff)}
.slotFilled204 .avatar{height:112px!important;width:100%!important;border:0!important;border-bottom:1px solid #c7d9ea!important;background:linear-gradient(#fff8ea,#eef8ff)!important}
.slotMeta204{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px;color:#142033!important;background:#fff}.slotMeta204 small{font-size:7px;font-weight:1000;color:#1688b8}.slotMeta204 b{font-size:12px;line-height:1.1}.slotMeta204 span,.slotMeta204 em{font-size:7px;font-style:normal;color:#5d6d7e}
.slotEmpty204{min-height:168px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;color:#6c7d8e}.slotEmpty204 b{font-size:12px}.slotEmpty204 span{font-size:8px}
.pairTag204{position:absolute;left:6px;top:6px;z-index:12;background:#0aa9d8;color:white;border:2px solid white;border-radius:999px;padding:3px 8px;font-size:8px;font-weight:1000;box-shadow:0 2px 8px #0004}
#breeders .card.sel{outline:4px solid #5bd8ff!important;box-shadow:0 0 0 3px #dff8ff!important}
`;
document.head.appendChild(css);
setTimeout(()=>{try{drawPair204()}catch(e){console.error('v0.20.4 pair draw',e)}},0);
})();