(()=>{
S.breedCount??=0;
function decorateBreed128(){
 const hero=document.querySelector('.breedHero126');if(hero){
   let strip=hero.querySelector('.breedStrip128');
   if(!strip){strip=document.createElement('div');strip.className='breedStrip128';hero.insertBefore(strip,hero.children[1]||null)}
   const af=S.parents?.length===2?'PAIR READY':'SELECT PARENTS';
   strip.innerHTML=`<span>${af}</span><b>配合 ${S.breedCount} 回</b><em>高レア・色違い・理想個体を狙おう</em>`;
 }
 const birth=document.getElementById('birth');
 if(birth?.querySelector('.hatchReveal')){
   birth.classList.add('birthStage128');
   const rarity=birth.querySelector('.hatchName span')?.textContent||'';
   birth.dataset.rarity=rarity;
   let badge=birth.querySelector('.resultBadge128');
   if(!badge){badge=document.createElement('div');badge.className='resultBadge128';badge.textContent=(rarity==='EX'||rarity==='UR'||rarity==='SSR')?'★ SPECIAL BIRTH ★':'NEW ATHLETE';birth.querySelector('.hatchReveal')?.prepend(badge)}
 }
}
const prevRender128=render;render=function(){prevRender128();requestAnimationFrame(decorateBreed128)};
const hatch128=document.getElementById('hatch');if(hatch128){const old=hatch128.onclick;hatch128.onclick=()=>{if(S.egg)S.breedCount++;old?.()}}
const css=document.createElement('style');css.textContent=`
.breedStrip128{display:grid;grid-template-columns:auto auto 1fr;gap:6px;align-items:center;margin:0 0 9px;padding:7px 9px;border-radius:10px;background:#ffffff0d;border:1px solid #ffffff1c}.breedStrip128 span{font-size:7px;font-weight:1000;letter-spacing:.12em;color:#7ee8ff}.breedStrip128 b{font-size:10px;color:#ffe17a}.breedStrip128 em{font-style:normal;text-align:right;font-size:7px;opacity:.65}.birthStage128{margin-top:10px}.birthStage128 .hatchReveal{position:relative;overflow:hidden;border-radius:18px!important;background:radial-gradient(circle at 50% 25%,#29496d,#101a2c 52%,#080c16)!important;color:#fff!important;border:1px solid #75dfff55!important;box-shadow:0 12px 35px #0005,0 0 24px #52cfff33!important;padding:14px!important}.birthStage128 .hatchReveal:before{content:'';position:absolute;inset:-40%;background:conic-gradient(transparent,#6fe9ff18,transparent,#ff74cc18,transparent);animation:spin128 9s linear infinite;pointer-events:none}@keyframes spin128{to{transform:rotate(360deg)}}.birthStage128 .hatchReveal>*{position:relative;z-index:1}.birthStage128 .bigArt{height:180px!important;background:transparent!important;border:0!important}.birthStage128 .hatchName{display:flex!important;justify-content:center!important;align-items:center!important;gap:8px!important}.birthStage128 .hatchName b{font-size:20px!important}.birthStage128 .hatchName span{background:#ffd96b;color:#211600;border-radius:999px;padding:4px 8px;font-weight:1000}.resultBadge128{text-align:center;font-size:8px;letter-spacing:.16em;font-weight:1000;color:#8eeaff;margin-bottom:5px}.birthStage128[data-rarity='SSR'] .hatchReveal,.birthStage128[data-rarity='UR'] .hatchReveal,.birthStage128[data-rarity='EX'] .hatchReveal{box-shadow:0 12px 35px #0005,0 0 36px #ffd65c66!important}.birthStage128[data-rarity='EX'] .resultBadge128{color:#fff;text-shadow:0 0 10px #7df7ff,0 0 18px #ff7de8}
`;document.head.appendChild(css);setTimeout(()=>{try{render()}catch(e){console.error(e)}},0);
})();