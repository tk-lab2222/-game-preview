(()=>{
// v0.24.7: remove the legacy duplicate affinity grade (e.g. 良い ★★★☆☆) while keeping the useful legacy affinity details.
const GRADE244=/^(?:良い|とても良い|普通|やや悪い|悪い)$/;
const STAR244=/^[★☆]{2,5}$/;
function norm244(x){return (x?.textContent||'').replace(/\s+/g,' ').trim()}
function hideLegacyAffinity244(){
  const breed=document.getElementById('breed');if(!breed)return;
  // Do not touch the authoritative numeric compatibility widgets.
  const safe=e=>!e.closest?.('#compatScore236,#compat233,.compatScore235,.compatScore234');
  // First target: the old BREED AFFINITY panel. Its grade and stars are usually separate children,
  // so the old exact-text matcher could miss it.
  [...breed.querySelectorAll('*')].forEach(panel=>{
    if(!safe(panel))return;
    const txt=norm244(panel);
    if(!txt.includes('BREED AFFINITY'))return;
    const all=[panel,...panel.querySelectorAll('*')];
    for(const el of all){
      if(!safe(el))continue;
      const t=norm244(el);
      // Hide leaf grade/star nodes directly.
      if(!el.children.length&&(GRADE244.test(t)||STAR244.test(t))){el.style.display='none';continue}
      // Hide the smallest row that consists of a grade plus star rating, even when split across spans.
      if(el.children.length>0&&el.children.length<=4){
        const childTxt=[...el.children].map(norm244).filter(Boolean);
        const hasGrade=childTxt.some(x=>GRADE244.test(x));
        const hasStars=childTxt.some(x=>STAR244.test(x));
        if(hasGrade&&hasStars){el.style.display='none'}
      }
    }
  });
  // Fallback for legacy rows outside a panel carrying the English heading.
  [...breed.querySelectorAll('*')].forEach(el=>{
    if(!safe(el)||el.children.length===0||el.children.length>4)return;
    const childTxt=[...el.children].map(norm244).filter(Boolean);
    if(childTxt.some(x=>GRADE244.test(x))&&childTxt.some(x=>STAR244.test(x)))el.style.display='none';
  });
}
function late244(){hideLegacyAffinity244();setTimeout(hideLegacyAffinity244,40);setTimeout(hideLegacyAffinity244,180);setTimeout(hideLegacyAffinity244,420)}
try{const prev244=render;render=function(){const out=prev244();late244();return out}}catch(e){console.warn('render244',e)}
window.addEventListener('click',e=>{if(e.target?.closest?.('#breed,.tab[data-v="breed"],[data-mode="p"],#breedBtn,#hatch'))late244()},true);
late244();
})();