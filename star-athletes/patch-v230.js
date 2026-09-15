(()=>{
// v0.23.8: next-generation breeding lock/unlock.
const SAVE230='star-athletes-save-v200';
const FORCE230='star-athletes-force-season-v217';
function persist230(){try{localStorage.setItem(SAVE230,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.error('save230',e)}}
function cleanupTrain230(){document.querySelectorAll('.train210 .rename224,.athTrain208 .rename224').forEach(b=>b.remove())}
function breedOnly230(){return !!S.needsBreeding}
function showBreed230(){try{if(typeof show==='function')show('breed')}catch(_){}}
function sync230(){
  cleanupTrain230();
  const lock=breedOnly230();
  const breed=document.querySelector('.tab[data-v="breed"]');
  const train=document.querySelector('.tab[data-v="train"]');
  const meet=document.querySelector('.tab[data-v="meet"]');
  if(breed){breed.innerHTML=lock?'🥚<br>次世代配合':'🥚<br>配合';breed.classList.toggle('nextGen230',lock);breed.setAttribute('aria-disabled','false')}
  [train,meet].forEach(t=>{if(t){t.classList.toggle('locked230',lock);t.setAttribute('aria-disabled',lock?'true':'false')}});
}
function finishGeneration230(){
  S.needsBreeding=true;S.generationActive=false;S.parents=[];S.cands=[];S.sel=[];S.egg=null;
  S.turn=0;S.schedule=[];S.plans={};S.assign={};S.strat={};S.season=1;S.seasonMeet=null;
  try{localStorage.removeItem(FORCE230)}catch(_){}
  persist230();
  const u=new URL(location.href);u.search='';u.searchParams.set('breed','1');u.searchParams.set('t',Date.now());location.replace(u.toString());
}
window.addEventListener('click',e=>{
  const b=e.target?.closest?.('#next217');
  if(!b||(Number(S.season)||1)<6)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();finishGeneration230();
},true);
window.addEventListener('click',e=>{
  if(!breedOnly230())return;
  const blocked=e.target?.closest?.('.tab[data-v="train"],.tab[data-v="meet"],#toMeet,#doTrain,#run');
  if(!blocked)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();showBreed230();sync230();
},true);
function unlockAfterAdopt230(){
  if(!breedOnly230())return;
  if(Array.isArray(S.nest)&&S.nest.length===3&&(!S.cands||S.cands.length===0)){
    S.needsBreeding=false;S.generationActive=true;S.season=1;S.turn=0;S.promotionPending=false;S.rivalsPromo225=false;
    if(!Array.isArray(S.schedule)||!S.schedule.length){try{makeSchedule()}catch(_){}}
    persist230();sync230();
    const toMeet=document.getElementById('toMeet');if(toMeet)toMeet.disabled=true;
  }
}
// Important: v210 handles #adopt on document capture and stops propagation.
// Window capture runs earlier, then the deferred check sees the newly adopted roster.
window.addEventListener('click',e=>{
  if(!e.target?.closest?.('#adopt')||!breedOnly230())return;
  setTimeout(unlockAfterAdopt230,0);setTimeout(unlockAfterAdopt230,60);setTimeout(unlockAfterAdopt230,180);
},true);
const before230=render;
render=function(){const out=before230();setTimeout(sync230,0);return out};
const css=document.createElement('style');css.textContent=`.train210 .rename224,.athTrain208 .rename224{display:none!important}.train210>header{overflow:hidden!important}.train210>header .avatar{position:relative!important;z-index:1!important;overflow:hidden!important}.tab.locked230{opacity:.32!important;filter:grayscale(.75)!important}.tab.nextGen230{background:#fff0b2!important;color:#172033!important}`;document.head.appendChild(css);
setTimeout(()=>{unlockAfterAdopt230();sync230();if(breedOnly230())showBreed230()},0);
})();