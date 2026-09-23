(()=>{
// v0.32.16: god-athlete visual upgrade.
// Improves the athlete presentation in god preview / god birth / god MY STAR.
if(window.STAR_GOD_STYLE349)return;
window.STAR_GOD_STYLE349=true;

function qs(root,sel){return root?root.querySelector(sel):null}
function qsa(root,sel){return root?[...root.querySelectorAll(sel)]:[]}
function ensureLayer(host,cls){
 if(!host)return null;
 let el=host.querySelector('.'+cls);
 if(!el){el=document.createElement('div');el.className=cls;host.appendChild(el)}
 return el;
}
function enhanceArtStage(stage){
 if(!stage||stage.dataset.godStage349==='1')return;
 stage.dataset.godStage349='1';
 stage.classList.add('godStageHost349');
 ensureLayer(stage,'godBackHalo349');
 ensureLayer(stage,'godOrbitRing349');
 ensureLayer(stage,'godConstellation349');
 ensureLayer(stage,'godPedestal349');
 ensureLayer(stage,'godSparkField349');
 const avatar=qs(stage,'.avatar')||qs(stage,'.bigArt')||qs(stage,'.myStarAvatar323')||qs(stage,'.artimg');
 if(avatar)avatar.classList.add('godFigure349');
}
function parseTraitChips(text){
 if(!text)return[];
 return text.split(/[　•·|]/).map(s=>s.trim()).filter(Boolean).slice(0,6);
}
function buildTraitRail(host,labels){
 if(!host)return;
 let rail=host.querySelector('.godTraitRail349');
 if(!rail){rail=document.createElement('div');rail.className='godTraitRail349';host.appendChild(rail)}
 rail.innerHTML=labels.map(x=>`<span class="godTraitChip349">${x}</span>`).join('');
}
function enhancePreview(){
 qsa(document,'.godPreviewCard348').forEach(card=>{
  card.classList.add('godHeroCard349');
  const art=qs(card,'.godPreviewArt348');enhanceArtStage(art);
  const traitBox=qs(card,'.godPreviewTraits348');
  const labels=qsa(traitBox,'span b').map(el=>el.textContent.trim()).filter(Boolean);
  buildTraitRail(card,labels);
  const nameBox=qs(card,'.godPreviewName348');if(nameBox)nameBox.classList.add('godCenterName349');
 });
}
function enhanceBirth(){
 qsa(document,'.godBirth348').forEach(box=>{
  box.classList.add('godBirthUpgraded349');
  const art=qs(box,'.avatar')?.parentElement||qs(box,'.bigArt')?.parentElement||qs(box,'.artimg')?.parentElement;
  if(art)enhanceArtStage(art);
  const strong=qs(box,'.godBanner348 strong');
  buildTraitRail(box,parseTraitChips(strong?.textContent||''));
 });
}
function enhanceMyStar(){
 qsa(document,'.godMyStar348').forEach(card=>{
  card.classList.add('godMyStarUpgraded349');
  const art=qs(card,'.myStarAvatar323')?.parentElement||qs(card,'.avatar')?.parentElement||qs(card,'.bigArt')?.parentElement;
  if(art)enhanceArtStage(art);
  const banner=qs(card,'.godMyStarBanner348 b');
  buildTraitRail(card,parseTraitChips(banner?.textContent||''));
 });
}
function enhanceGodCards(){
 qsa(document,'.godCard348').forEach(card=>{
  const art=qs(card,'.avatar')?.parentElement||qs(card,'.bigArt')?.parentElement||qs(card,'.artimg')?.parentElement;
  if(art){art.classList.add('godMiniStage349');enhanceArtStage(art)}
 });
}
function sync349(){enhancePreview();enhanceBirth();enhanceMyStar();enhanceGodCards()}

const css=document.createElement('style');
css.id='starGodStyle349css';
css.textContent=`
.godStageHost349{position:relative;overflow:visible;min-height:210px;display:flex;align-items:flex-end;justify-content:center;isolation:isolate}
.godFigure349{position:relative!important;z-index:6!important;transform:scale(1.12);transform-origin:center bottom;filter:drop-shadow(0 0 8px rgba(255,255,255,.95)) drop-shadow(0 0 18px rgba(255,226,107,.75)) drop-shadow(0 0 30px rgba(169,120,255,.65));animation:godFigureFloat349 3.2s ease-in-out infinite}
.godBackHalo349,.godOrbitRing349,.godConstellation349,.godPedestal349,.godSparkField349{position:absolute;inset:auto;pointer-events:none}
.godBackHalo349{z-index:1;width:220px;height:220px;top:8px;left:50%;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,rgba(255,253,200,.95) 0%,rgba(233,249,255,.72) 26%,rgba(240,226,255,.38) 48%,rgba(255,255,255,0) 72%);filter:blur(4px)}
.godOrbitRing349{z-index:2;width:240px;height:240px;top:0;left:50%;transform:translateX(-50%);border-radius:50%;border:2px solid rgba(255,227,110,.55);box-shadow:0 0 18px rgba(255,227,110,.45),inset 0 0 18px rgba(255,255,255,.28);animation:godRotate349 16s linear infinite}
.godOrbitRing349:before,.godOrbitRing349:after{content:'';position:absolute;inset:14px;border-radius:50%;border:1px solid rgba(115,234,255,.40)}
.godOrbitRing349:after{inset:30px;border-color:rgba(222,164,255,.38)}
.godConstellation349{z-index:2;width:250px;height:250px;top:-4px;left:50%;transform:translateX(-50%);background:radial-gradient(circle,rgba(255,255,255,.95) 0 1.2px,transparent 1.8px) 14px 18px/56px 56px,radial-gradient(circle,rgba(255,230,120,.95) 0 1.2px,transparent 1.8px) 0 0/74px 74px,radial-gradient(circle,rgba(145,239,255,.90) 0 1px,transparent 1.7px) 28px 36px/82px 82px;opacity:.70;animation:godPulse349 4.5s ease-in-out infinite}
.godPedestal349{z-index:3;bottom:12px;left:50%;transform:translateX(-50%);width:180px;height:44px;border-radius:50%;background:radial-gradient(ellipse at center,rgba(255,249,194,.96) 0%,rgba(233,249,255,.82) 36%,rgba(197,152,255,.50) 62%,rgba(255,255,255,0) 78%);filter:blur(1px);box-shadow:0 0 18px rgba(255,231,116,.65),0 0 34px rgba(166,118,255,.38)}
.godPedestal349:before{content:'';position:absolute;inset:6px 18px;border-radius:50%;border:1px solid rgba(255,255,255,.55)}
.godSparkField349{z-index:1;inset:0;background:radial-gradient(circle,rgba(255,255,255,.95) 0 1px,transparent 1.6px) 0 0/40px 40px,radial-gradient(circle,rgba(255,231,116,.95) 0 1px,transparent 1.8px) 20px 22px/56px 56px,radial-gradient(circle,rgba(175,132,255,.85) 0 1px,transparent 1.7px) 10px 8px/72px 72px;opacity:.58;animation:godSpark349 10s linear infinite}
.godHeroCard349{position:relative;overflow:hidden;border:2px solid #d6af4a!important;border-radius:18px;background:radial-gradient(circle at 50% 12%,#fff8ca 0%,#e4f9ff 18%,#f0e2ff 36%,#10182d 78%)!important;box-shadow:0 0 0 1px rgba(255,255,255,.35) inset,0 14px 36px rgba(0,0,0,.36),0 0 30px rgba(169,120,255,.35)!important;padding:12px 12px 14px!important}
.godHeroCard349 .godPreviewArt348{height:250px!important;min-height:250px!important;margin-bottom:8px}
.godCenterName349{text-align:center;margin-top:2px}.godCenterName349 small{letter-spacing:.22em;font-size:6px;color:#a8f4ff}.godCenterName349 b{display:block;margin-top:3px;font-size:20px;color:#fff;text-shadow:0 0 8px rgba(255,255,255,.9),0 0 18px rgba(255,227,110,.6),0 0 30px rgba(168,120,255,.5)}
.godHeroCard349 .godPreviewTraits348{display:none!important}
.godTraitRail349{position:relative;z-index:10;display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-top:10px}
.godTraitChip349{display:inline-flex;align-items:center;justify-content:center;min-height:24px;padding:5px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.28);background:linear-gradient(90deg,rgba(255,240,165,.25),rgba(226,216,255,.22),rgba(219,248,255,.20));color:#fff;font-size:7px;font-weight:900;letter-spacing:.04em;box-shadow:0 0 8px rgba(169,120,255,.18),inset 0 0 10px rgba(255,255,255,.08)}
.godBirthUpgraded349{position:relative}.godBirthUpgraded349 .avatar,.godBirthUpgraded349 .bigArt,.godMyStarUpgraded349 .myStarAvatar323,.godMyStarUpgraded349 .avatar,.godMyStarUpgraded349 .bigArt{transform:scale(1.12)}
.godMyStarUpgraded349{overflow:hidden}.godMyStarUpgraded349 .godTraitRail349{margin-top:8px}
.godMiniStage349{min-height:110px}.godMiniStage349 .godBackHalo349{width:110px;height:110px;top:6px}.godMiniStage349 .godOrbitRing349{width:122px;height:122px;top:2px}.godMiniStage349 .godConstellation349{width:126px;height:126px}.godMiniStage349 .godPedestal349{width:90px;height:24px;bottom:6px}.godMiniStage349 .godFigure349{animation:godMiniFloat349 3.2s ease-in-out infinite}@keyframes godMiniFloat349{0%,100%{transform:translateY(0) scale(1.05)}50%{transform:translateY(-3px) scale(1.05)}}
@keyframes godRotate349{from{transform:translateX(-50%) rotate(0)}to{transform:translateX(-50%) rotate(360deg)}}
@keyframes godFigureFloat349{0%,100%{transform:translateY(0) scale(1.12)}50%{transform:translateY(-6px) scale(1.12)}}
@keyframes godPulse349{0%,100%{opacity:.55;transform:translateX(-50%) scale(1)}50%{opacity:.85;transform:translateX(-50%) scale(1.03)}}
@keyframes godSpark349{from{transform:translateY(0);opacity:.45}50%{opacity:.75}to{transform:translateY(-8px);opacity:.45}}
@media(max-width:480px){.godHeroCard349 .godPreviewArt348{height:220px!important;min-height:220px!important}.godBackHalo349{width:190px;height:190px}.godOrbitRing349{width:208px;height:208px}.godConstellation349{width:214px;height:214px}.godPedestal349{width:156px}.godCenterName349 b{font-size:18px}}
`;
document.head.appendChild(css);

document.addEventListener('click',e=>{
 if(e.target.closest?.('[data-god-scenario348],[data-play-preview348],#hatch,#breedBtn,#adopt,.tab,[data-my-star323]'))setTimeout(sync349,50);
},true);
try{const prev=render;render=function(){const out=prev();setTimeout(sync349,0);return out}}catch(_){}
setTimeout(sync349,0);
})();