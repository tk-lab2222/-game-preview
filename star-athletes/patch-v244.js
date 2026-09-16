(()=>{
// v0.24.4: remove the legacy duplicate affinity grade (e.g. 良い ★★★☆☆) while keeping the numeric compatibility card.
function hideLegacyAffinity244(){
  const breed=document.getElementById('breed');if(!breed)return;
  // Hide only the smallest legacy grade row. Keep parent names / inheritance hints intact.
  [...breed.querySelectorAll('*')].forEach(el=>{
    if(el.closest?.('#compatScore236,#compat233,.compatScore235,.compatScore234'))return;
    const txt=(el.textContent||'').replace(/\s+/g,' ').trim();
    if(!txt)return;
    const isLegacy=/^(?:良い|とても良い|普通|やや悪い|悪い)\s*[★☆]{2,5}$/.test(txt);
    if(!isLegacy)return;
    const hasMatchingChild=[...el.children].some(ch=>/^(?:良い|とても良い|普通|やや悪い|悪い)\s*[★☆]{2,5}$/.test((ch.textContent||'').replace(/\s+/g,' ').trim()));
    if(!hasMatchingChild)el.style.display='none';
  });
}
function late244(){hideLegacyAffinity244();setTimeout(hideLegacyAffinity244,40);setTimeout(hideLegacyAffinity244,180)}
try{const prev244=render;render=function(){const out=prev244();late244();return out}}catch(e){console.warn('render244',e)}
window.addEventListener('click',e=>{if(e.target?.closest?.('#breed,.tab[data-v="breed"],[data-mode="p"],#breedBtn,#hatch'))late244()},true);
late244();
})();