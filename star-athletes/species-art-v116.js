(()=>{
// Current high-resolution species art. Preserve the live canvas and aspect ratio.
const VER='3403';
const FILES={
  unil:'../star-athletes/assets/creatures/unil.png?v='+VER,
  grimo:'../star-athletes/assets/creatures/grimo.png?v='+VER,
  puru:'../star-athletes/assets/creatures/puru.png?v='+VER
};
const FIT={
  unil:{scale:.96,dx:0,dy:0},
  grimo:{scale:.96,dx:0,dy:0},
  puru:{scale:.96,dx:0,dy:0}
};
const imageCache={};
async function loadImage(sp){
  if(imageCache[sp]) return imageCache[sp];
  imageCache[sp]=(async()=>{
    const src=FILES[sp];
    return await new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=()=>no(new Error('image decode '+sp));i.src=src;});
  })();
  return imageCache[sp];
}
async function paintOne(c){
  if(c.dataset.painting==='1') return;
  const sp=c.dataset.species;if(!FILES[sp]) return;
  const rect=c.getBoundingClientRect();
  if(rect.width<2||rect.height<2) return;
  c.dataset.painting='1';
  try{
    const im=await loadImage(sp);
    const dpr=Math.min(2,window.devicePixelRatio||1);
    const W=Math.max(2,Math.round(rect.width*dpr)),H=Math.max(2,Math.round(rect.height*dpr));
    if(c.width!==W||c.height!==H){c.width=W;c.height=H}
    const x=c.getContext('2d');x.clearRect(0,0,W,H);
    const f=FIT[sp]||{scale:.84,dx:0,dy:0};
    const base=Math.min(W/im.naturalWidth,H/im.naturalHeight)*f.scale;
    const w=im.naturalWidth*base,h=im.naturalHeight*base;
    const dx=(W-w)/2+W*f.dx,dy=H-h-H*.035+H*f.dy;
    x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';
    x.drawImage(im,dx,dy,w,h);
    c.dataset.error='0';
  }catch(e){
    c.dataset.error='1';console.error('species art v117 failed',sp,e);
  }finally{c.dataset.painting='0'}
}
function paintAll(){document.querySelectorAll('canvas.speciesCanvas').forEach(paintOne)}
const previousAvatar=avatar;
avatar=function(m,big=false){
  if(!m||m.species==='draco'||!FILES[m.species]) return previousAvatar(m,big);
  const label=(typeof SP!=='undefined'&&SP[m.species])?SP[m.species][0]:m.species;
  return `<div class="avatar art species-live species-${m.species} ${m.shiny?'shinyArt':''} ${big?'bigArt':''}"><canvas class="speciesCanvas" data-species="${m.species}" aria-label="${label}"></canvas></div>`;
};
const style=document.createElement('style');
style.textContent=`.avatar.species-live{position:relative;overflow:hidden;background:linear-gradient(#fff9eb,#f4ead6);padding:0}.speciesCanvas{position:absolute;inset:0;width:100%;height:100%;display:block;background:transparent}.avatar.species-live .pattern,.avatar.species-live .accessory{display:none}`;
document.head.appendChild(style);
const ro=new ResizeObserver(()=>requestAnimationFrame(paintAll));
function bindSpeciesArt(){document.querySelectorAll('.avatar.species-live').forEach(e=>ro.observe(e));requestAnimationFrame(paintAll)}
// Observe only the game application root instead of the whole body. This keeps
// dynamic cards paintable without waking the renderer for unrelated DOM work.
const gameRoot=document.querySelector('.a');
if(gameRoot)new MutationObserver(bindSpeciesArt).observe(gameRoot,{childList:true,subtree:true});
window.paintSpecies=paintAll;
setTimeout(()=>{try{render();bindSpeciesArt();paintAll()}catch(e){console.error('species renderer v117 boot failed',e)}},0);
})();
