(()=>{
const EGG127={C:['#f7f1df','#d6cab0'],U:['#dff7ff','#77c9ef'],R:['#e5f3ff','#5b8cff'],SR:['#eee5ff','#9a6cff'],SSR:['#fff3c7','#ffbe2e'],UR:['#fff0fa','#ff66c4'],EX:['#fff','#7df7ff']};
function eggTone127(r){return EGG127[r]||EGG127.C}
function setupCrack127(){
 const hatch=document.getElementById('hatch');if(!hatch||hatch.dataset.crack127)return;
 hatch.dataset.crack127='1';
 hatch.addEventListener('click',()=>{
   if(!S.egg)return;const egg=document.getElementById('egg');if(!egg)return;
   egg.classList.remove('cracking127x','split127x');void egg.offsetWidth;egg.classList.add('cracking127x');
   setTimeout(()=>egg.classList.add('split127x'),380);
   setTimeout(()=>egg.classList.remove('cracking127x','split127x'),980);
 },true);
}
function decorateEgg127(){
 const egg=document.getElementById('egg');if(!egg)return;
 egg.classList.add('eggStage127');
 const r=S.egg?.rarity||'C',c=eggTone127(r);egg.style.setProperty('--eggA',c[0]);egg.style.setProperty('--eggB',c[1]);
 egg.dataset.rarity=r;
 egg.classList.toggle('shinyEgg127',!!S.egg?.shiny);
 if(S.egg){egg.innerHTML=`<div class="eggShell127"><span>🥚</span><i>${r}${S.egg.shiny?' ✨':''}</i></div><div class="eggAura127"></div>`}
}
const prevRender127=render;render=function(){prevRender127();setupCrack127();requestAnimationFrame(decorateEgg127)};
const hatch=document.getElementById('hatch');if(hatch){const old=hatch.onclick;hatch.onclick=()=>{if(!S.egg)return;hatch.disabled=true;const egg=document.getElementById('egg');egg?.classList.add('hatching127');setTimeout(()=>{egg?.classList.remove('hatching127');old?.();},850)}}
const css=document.createElement('style');css.textContent=`
.eggStage127{position:relative!important;min-height:130px!important;display:grid!important;place-items:center!important;background:radial-gradient(circle,var(--eggA,#fff8e9),transparent 65%)!important;border-radius:18px!important;overflow:hidden!important}.eggShell127{position:relative;z-index:2;text-align:center;animation:eggFloat127 1.8s ease-in-out infinite alternate}.eggShell127 span{display:block;font-size:70px;filter:drop-shadow(0 10px 14px #0004) drop-shadow(0 0 15px var(--eggB,#ffd78a))}.eggShell127 i{display:inline-block;margin-top:-4px;font-style:normal;font-size:9px;font-weight:1000;background:#151515;color:#fff;border-radius:999px;padding:3px 8px;box-shadow:0 0 12px var(--eggB,#ffd78a)}.eggAura127{position:absolute;width:150px;height:150px;border-radius:50%;border:3px solid var(--eggB,#ffd78a);box-shadow:0 0 22px var(--eggB,#ffd78a),inset 0 0 20px var(--eggB,#ffd78a);opacity:.45;animation:aura127 1.2s ease-in-out infinite alternate}@keyframes eggFloat127{to{transform:translateY(-5px) rotate(2deg)}}@keyframes aura127{to{transform:scale(1.12);opacity:.8}}.eggStage127[data-rarity='SSR'] .eggAura127,.eggStage127[data-rarity='UR'] .eggAura127,.eggStage127[data-rarity='EX'] .eggAura127{animation-duration:.65s}.hatching127 .eggShell127{animation:crack127 .12s linear infinite}.hatching127 .eggAura127{animation:burst127 .85s ease-out forwards}@keyframes crack127{25%{transform:translateX(-5px) rotate(-4deg)}75%{transform:translateX(5px) rotate(4deg)}}@keyframes burst127{to{transform:scale(2.3);opacity:0}}
.shinyEgg127{outline:3px solid #fff19a;box-shadow:0 0 20px #ffe86f88!important}.shinyEgg127 .eggShell127 span{filter:hue-rotate(145deg) saturate(1.35) brightness(1.08) drop-shadow(0 10px 14px #0004) drop-shadow(0 0 18px #fff06a)!important}
.eggStage127{perspective:500px}.eggShell127{position:relative!important}.eggShell127:before,.eggShell127:after{content:'';position:absolute;left:50%;top:16px;width:5px;height:0;background:#5a4633;border-radius:4px;opacity:0;z-index:8;transform-origin:top center;box-shadow:0 0 2px #fff}
.cracking127x .eggShell127:before{opacity:1;height:24px;transform:translateX(-7px) rotate(24deg);animation:crackGrow127x .22s ease-out forwards}
.cracking127x .eggShell127:after{opacity:1;height:19px;transform:translateX(7px) translateY(17px) rotate(-30deg);animation:crackGrow127x .2s .12s ease-out both}
.cracking127x .eggShell127 span{animation:eggShake127x .12s linear infinite!important}.split127x .eggShell127 span{animation:eggOpen127x .44s cubic-bezier(.2,.8,.2,1) forwards!important}.split127x .eggAura127{animation:flash127x .44s ease-out forwards!important}
@keyframes crackGrow127x{from{height:0;opacity:0}to{opacity:1}}@keyframes eggShake127x{25%{transform:translateX(-4px) rotate(-4deg)}75%{transform:translateX(4px) rotate(4deg)}}@keyframes eggOpen127x{0%{transform:scale(1)}45%{transform:scale(1.08)}70%{transform:scaleX(1.18) scaleY(.9);opacity:1}100%{transform:scale(1.45);opacity:0;filter:brightness(2)}}@keyframes flash127x{0%{opacity:.45;transform:scale(1)}60%{opacity:1;transform:scale(1.55)}100%{opacity:0;transform:scale(2.3)}}
`;document.head.appendChild(css);setupCrack127();setTimeout(()=>{try{render()}catch(e){console.error(e)}},0);
})();