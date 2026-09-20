(()=>{
// v0.31.11: keep a single authoritative skill row on athlete cards.
// Species acquisition remains an earned route via Nest Shop scouting; no automatic tournament grants.
function hideDuplicateSkills298(){
 document.querySelectorAll('.breedSkill254,.skillCore210,.skillLine246,.skillCard235,.skillCard241,.skillMini241,.skillHost246').forEach(el=>{el.style.display='none'});
 document.querySelectorAll('.coreMeta243>div').forEach(el=>{if((el.textContent||'').includes('SKILL'))el.style.display='none'});
}
try{
 const prev=render;
 render=function(){const out=prev();[0,40,120].forEach(ms=>setTimeout(hideDuplicateSkills298,ms));return out};
}catch(e){console.warn('render298',e)}
const css=document.createElement('style');
css.id='skillScout298';
css.textContent=`
.breedSkill254,.skillCore210,.skillLine246,.skillCard235,.skillCard241,.skillMini241,.skillHost246{display:none!important}
`;
document.head.appendChild(css);
[0,80,250].forEach(ms=>setTimeout(hideDuplicateSkills298,ms));
})();