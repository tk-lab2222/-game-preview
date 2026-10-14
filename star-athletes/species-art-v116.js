(()=>{
// Canonical species renderer. Atlas frames show younger forms; legacy/adult sprites remain intact.
const FILES=Object.fromEntries(['draco','unil','grimo','puru'].map(sp=>[sp,'../star-athletes/assets/creatures/'+sp+'.png?v=3403']));
const ATLASES=Object.fromEntries(Object.keys(FILES).map(sp=>[sp,'../star-athletes/assets/creatures/'+sp+'-growth.png?v=3409']));
const imageCache={};
async function loadImage(sp,stage){
 const src=stage<2?ATLASES[sp]:FILES[sp];
 if(!imageCache[src])imageCache[src]=new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=()=>no(new Error('image decode '+sp+' stage'+stage));i.src=src});
 return imageCache[src];
}
async function paintOne(c){
 if(c.dataset.painting==='1')return;
 const sp=c.dataset.species;if(!FILES[sp])return;
 const stage=Math.max(0,Math.min(2,Number(c.dataset.artStage226)||0)),rect=c.getBoundingClientRect();
 if(rect.width<2||rect.height<2)return;
 c.dataset.painting='1';
 try{
  const im=await loadImage(sp,stage),dpr=Math.min(2,window.devicePixelRatio||1);
  const W=Math.max(2,Math.round(rect.width*dpr)),H=Math.max(2,Math.round(rect.height*dpr));
  if(c.width!==W||c.height!==H){c.width=W;c.height=H}
  const x=c.getContext('2d');x.clearRect(0,0,W,H);
  const sw=stage<2?im.naturalWidth/2:im.naturalWidth,sh=im.naturalHeight,sx=stage<2?stage*sw:0;
  const base=Math.min(W/sw,H/sh)*.96,w=sw*base,h=sh*base;
  x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(im,sx,0,sw,sh,(W-w)/2,H-h-H*.035,w,h);
  c.dataset.error='0';c.dataset.artFrame226=sp+':'+stage;
 }catch(e){c.dataset.error='1';console.error('species art failed',sp,e)}finally{c.dataset.painting='0'}
}
function paintAll(){document.querySelectorAll('canvas.speciesCanvas').forEach(paintOne)}
function artStage(m){return window.STAR_GROWTH226?.appearance?.(m)?.stage??2}
function markup(m,big=false){
 const sp=m.species,stage=artStage(m),label=SP[sp]?.[0]||sp;
 return `<div class="avatar art species-live species-${sp} ${m.shiny?'shinyArt':''} ${big?'bigArt':''}" data-art-stage226="${stage}"><canvas class="speciesCanvas" data-species="${sp}" data-art-stage226="${stage}" aria-label="${label}"></canvas></div>`;
}
const previousAvatar=avatar;
avatar=function(m,big=false){if(!m||m.species==='draco'||!FILES[m.species])return previousAvatar(m,big);return markup(m,big)};
const style=document.createElement('style');style.textContent=`.avatar.species-live{position:relative;overflow:hidden;background:linear-gradient(#fff9eb,#f4ead6);padding:0}.speciesCanvas{position:absolute;inset:0;width:100%;height:100%;display:block;background:transparent}.avatar.species-live .pattern,.avatar.species-live .accessory{display:none}`;document.head.appendChild(style);
const ro=new ResizeObserver(()=>requestAnimationFrame(paintAll));
function bindSpeciesArt(){document.querySelectorAll('.avatar.species-live').forEach(e=>ro.observe(e));requestAnimationFrame(paintAll)}
const gameRoot=document.querySelector('.a');if(gameRoot)new MutationObserver(bindSpeciesArt).observe(gameRoot,{childList:true,subtree:true});
window.paintSpecies=paintAll;window.STAR_ART116={avatar:markup,stage:artStage,paint:paintAll};
setTimeout(()=>{try{render();bindSpeciesArt();paintAll()}catch(e){console.error('species renderer boot failed',e)}},0);
})();
