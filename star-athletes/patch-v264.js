(()=>{
// v0.27.3: lock breeding during an active generation.
// Breeding is available only before the first roster or when next-generation breeding is explicitly required.
function active264(){
  const hasRoster=Array.isArray(S.nest)&&S.nest.length===3;
  return hasRoster&&!S.needsBreeding;
}
function target264(){
  return (Number(S.turn)||0)<3?'train':'meet';
}
function sync264(){
  const tab=document.querySelector('.tab[data-v="breed"]');
  const locked=active264();
  if(tab){
    tab.classList.toggle('locked264',locked);
    tab.setAttribute('aria-disabled',locked?'true':'false');
    tab.title=locked?'この世代の育成・大会中は配合できません':'';
  }
  if(locked){
    const breed=document.getElementById('breed');
    if(breed&&!breed.classList.contains('hide')){
      try{typeof show==='function'&&show(target264())}catch(_){}
    }
  }
}
window.addEventListener('click',e=>{
  const b=e.target?.closest?.('.tab[data-v="breed"],#breedBtn');
  if(!b||!active264())return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  try{typeof show==='function'&&show(target264())}catch(_){}
  if(b.id==='breedBtn'){b.disabled=true;b.textContent='育成・大会中は配合不可'}
  sync264();
},true);
function late264(){sync264();[40,120,300,650].forEach(ms=>setTimeout(sync264,ms))}
try{const prev264=render;render=function(){const out=prev264();late264();return out}}catch(e){console.warn('render264',e)}
window.addEventListener('click',e=>{
  if(e.target?.closest?.('#adopt,#next225,#annualNext233,#doTrain263,#toMeet,#run,.tab'))setTimeout(late264,0);
},true);
const css=document.createElement('style');css.textContent=`
.tab.locked264{opacity:.32!important;filter:grayscale(.85)!important}
`;document.head.appendChild(css);late264();
})();