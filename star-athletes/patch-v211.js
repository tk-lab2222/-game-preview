(()=>{
// v0.21.1: generation lock. After adopting three athletes, breeding is disabled
// until S6 is completed and the player advances to the next generation.
function initLock211(){
  if(typeof S.generationActive!=='boolean') S.generationActive=Array.isArray(S.nest)&&S.nest.length===3;
}
function saveLock211(){try{typeof save200==='function'&&save200()}catch(_){}}
function locked211(){initLock211();return !!S.generationActive;}
function showTrain211(){try{typeof window.show==='function'&&window.show('train')}catch(_){}}
function syncLock211(){
  initLock211();
  const lock=locked211();
  const tab=document.querySelector('.tab[data-v="breed"]');
  const btn=document.getElementById('breedBtn');
  const breed=document.getElementById('breed');
  if(tab){
    tab.classList.toggle('locked211',lock);
    tab.setAttribute('aria-disabled',lock?'true':'false');
    tab.innerHTML=lock?'🔒<br>配合':'🥚<br>配合';
  }
  if(btn&&lock){btn.disabled=true;btn.textContent='育成完了まで配合不可';}
  if(breed){
    let note=document.getElementById('breedLock211');
    if(lock){
      if(!note){note=document.createElement('div');note.id='breedLock211';note.className='breedLock211';breed.prepend(note)}
      note.innerHTML=`<b>🔒 この世代は育成中です</b><span>S${S.season||1}/6 の大会を終えて「次世代へ」進むと配合が解禁されます。</span>`;
    }else if(note) note.remove();
  }
}
// Never allow opening the breeding tab or using the breed button while active.
document.addEventListener('click',e=>{
  const tab=e.target.closest?.('.tab[data-v="breed"]');
  if(tab&&locked211()){
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();showTrain211();syncLock211();return;
  }
  const btn=e.target.closest?.('#breedBtn');
  if(btn&&locked211()){
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();btn.disabled=true;btn.textContent='育成完了まで配合不可';return;
  }
},true);
// patch-v210 handles adoption. After its click finishes, lock this generation.
document.addEventListener('click',e=>{
  if(!e.target.closest?.('#adopt'))return;
  setTimeout(()=>{
    if(Array.isArray(S.nest)&&S.nest.length===3){S.generationActive=true;saveLock211();syncLock211();showTrain211();}
  },0);
},false);
const renderBefore211=render;
render=function(){
  const out=renderBefore211();syncLock211();
  if(locked211()&&document.querySelector('.tab[data-v="breed"]')?.classList.contains('active'))setTimeout(showTrain211,0);
  return out;
};
const css=document.createElement('style');css.textContent=`
.tab.locked211{opacity:.42!important;filter:grayscale(.35);cursor:not-allowed!important}.breedLock211{margin:8px 0 10px;padding:11px 13px;border:2px solid #b5a56a;border-radius:14px;background:#fff5cb;color:#3c3320;display:flex;flex-direction:column;gap:3px}.breedLock211 b{font-size:11px}.breedLock211 span{font-size:8px;line-height:1.45}
`;
document.head.appendChild(css);
setTimeout(()=>{initLock211();syncLock211();if(locked211())showTrain211();},0);
})();