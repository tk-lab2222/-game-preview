(()=>{
'use strict';
// v0.32.40: ability C/U/R... is a post-development result, never a hatch rarity.
if(window.STAR_HATCH_CLEAN357)return;
const LEGACY_RANK357=/^(C|U|R|SR|SSR|UR|EX)$/;
function clean357(){
 const box=document.querySelector('#birth .hatchReveal');if(!box)return;
 // v127/v201 legacy badge beside newborn name. Remove only exact legacy ability-rank tokens.
 // Do not hide every span: newer special-birth / star-grade systems may legitimately render labels there.
 const name=box.querySelector('.hatchName');if(name){
  [...name.querySelectorAll('span')].forEach(el=>{if(LEGACY_RANK357.test((el.textContent||'').trim()))el.remove()});
 }
 // v249 legacy hatch rarity badge/aura/classes.
 box.querySelector('.hatchRarityLabel249')?.remove();box.querySelector('.hatchAura249')?.remove();box.querySelector('.burst250')?.remove();
 [...box.classList].forEach(x=>{if(/^hatch-(c|u|r|sr|ssr|ur|ex)249$/i.test(x)||x==='hatchRarity249'||x==='hatchMega250')box.classList.remove(x)});
 box.removeAttribute('data-rarity249');
 // Old SPECIAL BIRTH was also based on ability-rank rarity. Keep true special-birth systems responsible for their own labels.
 const rb=box.querySelector('.resultBadge128');if(rb&&/SPECIAL BIRTH/.test(rb.textContent||''))rb.textContent='NEW ATHLETE';
}
function sync357(){clean357()}
try{const prev=window.render;if(typeof prev==='function')window.render=function(){const out=prev.apply(this,arguments);setTimeout(sync357,0);return out}}catch(_){}
document.addEventListener('click',e=>{if(e.target?.closest?.('#hatch')){setTimeout(sync357,850);setTimeout(sync357,1250)}},true);
const css=document.createElement('style');css.textContent=`
#birth .hatchRarityLabel249,#birth .hatchAura249,#birth .burst250{display:none!important}
#birth .hatchReveal.hatchRarity249{box-shadow:0 12px 35px #0005,0 0 24px #52cfff33!important}
`;document.head.appendChild(css);
window.STAR_HATCH_CLEAN357={sync:sync357};setTimeout(sync357,200);
})();