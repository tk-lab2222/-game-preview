(()=>{
// v0.20.2: make selected parents unambiguously visible and fix hatch-result text contrast.
function parentMini202(m,label){
  if(!m)return `<div class="parentEmpty202"><span>${label}</span><small>上の候補から選択</small></div>`;
  return `<div class="parentChosen202">${avatar(m)}<div class="parentChosenMeta202"><small>${label}</small><b>${m.name}</b><span>${SP[m.species]?.[0]||m.species} / ${m.rarity}</span><em>${m.personality||''}</em></div></div>`;
}
function syncParents202(){
  try{
    if(typeof normalizeState201==='function')normalizeState201();
    const pool=breederPool();
    const a=pool.find(m=>m.id===S.parents?.[0]);
    const b=pool.find(m=>m.id===S.parents?.[1]);
    const pa=document.getElementById('pa'),pb=document.getElementById('pb');
    if(pa){pa.innerHTML=parentMini202(a,'親①');pa.classList.toggle('filled202',!!a)}
    if(pb){pb.innerHTML=parentMini202(b,'親②');pb.classList.toggle('filled202',!!b)}
    document.querySelectorAll('#breeders [data-mode="p"]').forEach(card=>{
      const on=S.parents?.includes(card.dataset.id);
      card.classList.toggle('sel',!!on);
      card.classList.toggle('parentSelected202',!!on);
      let badge=card.querySelector('.parentBadge202');
      if(on&&!badge){badge=document.createElement('div');badge.className='parentBadge202';badge.textContent=(S.parents[0]===card.dataset.id)?'親①':'親②';card.appendChild(badge)}
      if(!on&&badge)badge.remove();
    });
    const btn=document.getElementById('breedBtn');
    if(btn){
      btn.disabled=(S.parents?.length||0)!==2||!!S.egg||(S.cands?.length||0)>=cap();
      btn.textContent=(S.parents?.length||0)===2?'✦ スター配合を開始':'親を2体選ぶ';
    }
    requestAnimationFrame(()=>{try{window.paintSpecies&&window.paintSpecies()}catch(_){}});
  }catch(e){console.error('sync parents v202',e)}
}
function bindParents202(){
  document.querySelectorAll('#breeders [data-mode="p"]').forEach(card=>{
    card.onclick=e=>{
      e.preventDefault();e.stopPropagation();
      const id=card.dataset.id;
      S.parents=Array.isArray(S.parents)?S.parents:[];
      if(S.parents.includes(id))S.parents=S.parents.filter(x=>x!==id);
      else if(S.parents.length<2)S.parents.push(id);
      else S.parents=[S.parents[1],id];
      syncParents202();
      try{save200&&save200()}catch(_){}
    };
  });
}
function fixBirthContrast202(){
  const birth=document.getElementById('birth');if(!birth)return;
  const reveal=birth.querySelector('.hatchReveal');if(!reveal)return;
  reveal.classList.add('contrast202');
}
const prevRender202=render;
render=function(){
  const out=prevRender202();
  bindParents202();syncParents202();fixBirthContrast202();
  setTimeout(()=>{bindParents202();syncParents202();fixBirthContrast202()},0);
  return out;
};
const hatch=document.getElementById('hatch');
if(hatch)hatch.addEventListener('click',()=>setTimeout(()=>{fixBirthContrast202();syncParents202()},1200));
const css=document.createElement('style');css.textContent=`
.parentsHero126 .par{background:linear-gradient(180deg,#f8fbff,#eaf4ff)!important;border:2px solid #6fdfff!important;color:#162033!important;box-shadow:inset 0 0 18px #62dfff22!important;padding:0!important}
.parentsHero126 .par.filled202{border-color:#ffd86a!important;box-shadow:0 0 18px #ffd86a44,inset 0 0 18px #62dfff22!important}
.parentChosen202{width:100%;height:100%;display:grid;grid-template-rows:108px auto;align-items:stretch}.parentChosen202 .avatar{height:108px!important;width:100%!important;border:0!important;border-bottom:1px solid #bfd6ea!important;background:linear-gradient(#fffaf0,#edf7ff)!important}.parentChosenMeta202{display:flex;flex-direction:column;align-items:center;gap:1px;padding:5px;color:#152033!important;background:#ffffffdd}.parentChosenMeta202 small{font-size:7px;font-weight:1000;color:#1686b8}.parentChosenMeta202 b{font-size:11px;line-height:1.1}.parentChosenMeta202 span,.parentChosenMeta202 em{font-size:7px;font-style:normal;color:#526273}.parentEmpty202{display:flex;min-height:150px;flex-direction:column;align-items:center;justify-content:center;color:#6b7c8d!important}.parentEmpty202 span{font-size:12px;font-weight:1000}.parentEmpty202 small{font-size:7px}.parentBadge202{position:absolute;left:5px;top:5px;z-index:9;background:#13a9d8;color:#fff;border:2px solid #fff;border-radius:999px;padding:3px 7px;font-size:8px;font-weight:1000;box-shadow:0 2px 8px #0004}.parentSelected202{box-shadow:0 0 0 3px #65dcff,0 5px 0 #0001!important}
.birthStage128 .hatchReveal.contrast202 .newbornLabel{color:#241900!important;background:#ffd65a!important}.birthStage128 .hatchReveal.contrast202 .hatchStats div{color:#171717!important;background:#fffdf7!important}.birthStage128 .hatchReveal.contrast202 .hatchStats span,.birthStage128 .hatchReveal.contrast202 .hatchStats b{color:#171717!important}.birthStage128 .hatchReveal.contrast202 .inheritBox{color:#171717!important;background:#fff4c8!important}.birthStage128 .hatchReveal.contrast202 .inheritBox b{color:#171717!important}.birthStage128 .hatchReveal.contrast202 .hatchTraits span{color:#171717!important;background:#fff3bf!important}.birthStage128 .hatchReveal.contrast202 .hatchName b{color:#fff!important}.birthStage128 .hatchReveal.contrast202 .hatchMeta{color:#dceaff!important;opacity:.9!important}
`;
document.head.appendChild(css);
setTimeout(()=>{try{render()}catch(e){console.error('v0.20.2 init',e)}},0);
})();