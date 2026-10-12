(()=>{
// v0.22.2: minimal tournament gate on top of stable v0.21.9.
// No MutationObserver and no render wrapper: keep page startup stable.
function turn222(){return Number(S?.turn)||0}
function ready222(){return turn222()>=3&&!window.STAR_EVENTS267?.pending?.()}
function sync222(){
  const t=turn222(),done=ready222();
  const b=document.getElementById('toMeet');
  if(b){
    b.disabled=!done;
    b.setAttribute('aria-disabled',done?'false':'true');
    try{window.STAR_MEET290?.sync?.()}catch(_){}
    if(!window.STAR_MEET290)b.textContent=done?'大会へ':`大会へ（育成 ${t}/3）`;
  }
  const tab=document.querySelector('.tab[data-v="meet"]');
  if(tab){
    tab.classList.toggle('locked222',!done);
    tab.setAttribute('aria-disabled',done?'false':'true');
  }
  document.getElementById('trainGate222')?.remove();
}
function enterMeet222(){
  if(!ready222())return false;
  try{
    const events=document.getElementById('events');
    if(events&&Array.isArray(S.schedule)){
      events.innerHTML=S.schedule.map((ev,i)=>{
        const m=(S.nest||[]).find(x=>x.id===S.assign?.[i]);
        return `<div class="evt"><b>${ev}</b><div>${m?.name||'-'} / ${S.strat?.[i]||'バランス'}</div></div>`;
      }).join('');
    }
    if(typeof show==='function')show('meet');
    else{
      ['breed','train','meet','dex','nest201','mission203'].forEach(id=>document.getElementById(id)?.classList.toggle('hide',id!=='meet'));
      document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.v==='meet'));
    }
    try{window.STAR_MEET290?.sync?.()}catch(_){}
    if(!S.promotion233&&!S.planetRepresentative233){window.STAR_TOUR225?.renderRivals?.(false);window.STAR_NEMESIS302?.sync?.()}
    return true;
  }catch(e){console.warn('enterMeet222',e);return false}
}
function block222(e){
  const toMeet=e.target?.closest?.('#toMeet');
  const meetTab=e.target?.closest?.('.tab[data-v="meet"]');
  if(!toMeet&&!meetTab)return;
  if(!ready222()){
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    sync222();
    const n=document.getElementById('toMeet');
    if(n){n.classList.add('flash222');setTimeout(()=>n.classList.remove('flash222'),500)}
    return;
  }
  if(toMeet||meetTab){
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    enterMeet222();
  }
}
window.addEventListener('click',block222,true);
document.addEventListener('click',e=>{
  if(e.target?.closest?.('#doTrain,#doTrain263'))setTimeout(sync222,0);
},false);
window.STAR_GATE222={sync:sync222,enterMeet:enterMeet222,ready:ready222};
const css=document.createElement('style');css.textContent=`
.tab[data-v="meet"].locked222{opacity:.42!important;filter:grayscale(.5)!important}#toMeet.flash222{animation:flash222 .5s ease}@keyframes flash222{0%,100%{transform:none}30%{transform:translateX(-3px)}60%{transform:translateX(3px)}}`;
document.head.appendChild(css);
setTimeout(sync222,0);
})();
