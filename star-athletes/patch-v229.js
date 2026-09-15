(()=>{
// v0.22.9: tidy training rename UI + force breeding between generations.
const SAVE229='star-athletes-save-v200';
const ROSTER229='star-athletes-active-roster-v210';
function persist229(){
  try{localStorage.setItem(SAVE229,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.warn('save229',e)}
  try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem(ROSTER229,JSON.stringify(S.nest))}catch(_){}
}
function needsBreed229(){return !!S.needsBreeding}
function showBreed229(){try{if(typeof show==='function')show('breed')}catch(_){}}
function sync229(){
  const lock=needsBreed229();
  const breedTab=document.querySelector('.tab[data-v="breed"]');
  const trainTab=document.querySelector('.tab[data-v="train"]');
  const meetTab=document.querySelector('.tab[data-v="meet"]');
  if(breedTab){breedTab.classList.toggle('nextGen229',lock);breedTab.setAttribute('aria-disabled','false');breedTab.innerHTML=lock?'🥚<br>次世代配合':'🥚<br>配合'}
  for(const tab of [trainTab,meetTab])if(tab){tab.classList.toggle('locked229',lock);tab.setAttribute('aria-disabled',lock?'true':'false')}
  const train=document.getElementById('train');
  if(lock&&train&&!document.getElementById('nextGenNote229')){
    const note=document.createElement('div');note.id='nextGenNote229';note.className='nextGenNote229';note.innerHTML='<b>🥚 次世代を作ろう</b><span>この世代のS1〜S6が終了しました。新しい3体を配合・選抜するまで、育成と大会には進めません。</span>';
    train.prepend(note);
  }
  if(!lock)document.getElementById('nextGenNote229')?.remove();
}
// Mark S6 completion before patch-v217 persists/reloads the state.
window.addEventListener('click',e=>{
  const next=e.target?.closest?.('#next217');
  if(next&&(Number(S.season)||1)>=6){S.needsBreeding=true;S.generationActive=false;persist229();setTimeout(()=>{sync229();showBreed229()},0)}
  const adopt=e.target?.closest?.('#adopt');
  if(adopt&&needsBreed229()){
    setTimeout(()=>{
      if(Array.isArray(S.nest)&&S.nest.length===3&&(!S.cands||S.cands.length===0)){
        S.needsBreeding=false;S.generationActive=true;persist229();sync229();
      }
    },0);
  }
},true);
// Hard gate: after a generation ends, only breeding-related navigation is allowed.
window.addEventListener('click',e=>{
  if(!needsBreed229())return;
  const tab=e.target?.closest?.('.tab[data-v="train"],.tab[data-v="meet"]');
  const toMeet=e.target?.closest?.('#toMeet');
  if(!tab&&!toMeet)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();showBreed229();sync229();
},true);
const before229=render;
render=function(){const out=before229();setTimeout(sync229,0);return out};
const css=document.createElement('style');css.textContent=`
/* Keep the rename control inside the text column; never let it intrude over the avatar. */
.train210>header>div{min-width:0!important;overflow:hidden!important}.train210 .renameTrain224{position:static!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;width:auto!important;max-width:86px!important;height:auto!important;margin:5px 0 0!important;padding:4px 8px!important;border-radius:8px!important;white-space:nowrap!important;float:none!important;transform:none!important}.train210>header .avatar{overflow:hidden!important}
.tab.locked229{opacity:.35!important;filter:grayscale(.6);pointer-events:auto!important}.tab.nextGen229{background:#fff0b2!important;color:#172033!important}.nextGenNote229{margin:0 0 10px;padding:11px 13px;border:2px solid #e0b133;border-radius:14px;background:#fff4c9;color:#33270d;display:flex;flex-direction:column;gap:3px}.nextGenNote229 b{font-size:12px}.nextGenNote229 span{font-size:8px;line-height:1.5}
`;document.head.appendChild(css);
setTimeout(()=>{sync229();if(needsBreed229())showBreed229()},0);
})();