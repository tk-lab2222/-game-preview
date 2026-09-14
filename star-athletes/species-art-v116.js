(()=>{
// v0.11.6: body-only transparent WebP art for Unil / Grimo / Purumon.
// Draco keeps its existing layered canvas renderer.
const VER='116';
const FILES={
  unil:['../star-athletes/embedded/unil-v116.webp.b64?v='+VER],
  grimo:[1,2,3,4,5].map(n=>`../star-athletes/embedded/grimo-v116-${n}.b64?v=${VER}`),
  puru:[1,2,3].map(n=>`../star-athletes/embedded/puru-v116-${n}.b64?v=${VER}`)
};
const FIT={
  unil:{boxW:.82,boxH:.82,scale:.98,dx:0,dy:6},
  grimo:{boxW:.86,boxH:.84,scale:.98,dx:0,dy:5},
  puru:{boxW:.78,boxH:.78,scale:.96,dx:0,dy:9}
};
const sourceCache={},imageCache={};
async function sourceFor(sp){
  if(sourceCache[sp]) return sourceCache[sp];
  sourceCache[sp]=(async()=>{
    const parts=await Promise.all(FILES[sp].map(async url=>{
      const r=await fetch(url,{cache:'no-store'});
      if(!r.ok) throw new Error(`art fetch ${sp} ${r.status}`);
      return (await r.text()).trim();
    }));
    const b64=parts.join('');
    if(!b64.startsWith('UklG')) throw new Error(`invalid webp base64 ${sp}`);
    return 'data:image/webp;base64,'+b64;
  })();
  return sourceCache[sp];
}
async function loadImage(sp){
  if(imageCache[sp]) return imageCache[sp];
  imageCache[sp]=(async()=>{
    const src=await sourceFor(sp);
    return await new Promise((ok,no)=>{
      const i=new Image();
      i.onload=()=>ok(i);
      i.onerror=()=>no(new Error('image decode '+sp));
      i.src=src;
    });
  })();
  return imageCache[sp];
}
async function paintOne(c){
  if(c.dataset.painting==='1'||c.dataset.painted==='1') return;
  const sp=c.dataset.species;
  if(!FILES[sp]) return;
  c.dataset.painting='1';
  try{
    const im=await loadImage(sp);
    c.width=420;c.height=320;
    const x=c.getContext('2d');
    x.clearRect(0,0,c.width,c.height); // keep canvas transparent
    const f=FIT[sp]||{boxW:.82,boxH:.82,scale:1,dx:0,dy:0};
    const base=Math.min((c.width*f.boxW)/im.naturalWidth,(c.height*f.boxH)/im.naturalHeight)*f.scale;
    const w=im.naturalWidth*base,h=im.naturalHeight*base;
    const dx=(c.width-w)/2+f.dx;
    const dy=(c.height-h)/2+f.dy;
    x.drawImage(im,dx,dy,w,h);
    c.dataset.painted='1';
    c.dataset.error='0';
  }catch(e){
    c.dataset.error='1';
    const x=c.getContext('2d');c.width=420;c.height=320;x.clearRect(0,0,c.width,c.height);
    x.fillStyle='#b33';x.font='bold 18px system-ui';x.textAlign='center';x.fillText('ART LOAD ERROR',210,155);
    console.error('species art v116 failed',sp,e);
  }finally{c.dataset.painting='0'}
}
function paintAll(){document.querySelectorAll('canvas.speciesCanvas').forEach(paintOne)}
const previousAvatar=avatar;
avatar=function(m,big=false){
  if(!m||m.species==='draco'||!FILES[m.species]) return previousAvatar(m,big);
  const label=(typeof SP!=='undefined'&&SP[m.species])?SP[m.species][0]:m.species;
  return `<div class="avatar art species-live species-${m.species} ${big?'bigArt':''}"><canvas class="speciesCanvas" data-species="${m.species}" aria-label="${label}"></canvas></div>`;
};
const style=document.createElement('style');
style.textContent=`
.avatar.species-live{position:relative;overflow:hidden;background:linear-gradient(#fff9eb,#f4ead6);padding:0}
.speciesCanvas{width:100%;height:100%;display:block;background:transparent}
.avatar.species-live .pattern,.avatar.species-live .accessory{display:none}
`;
document.head.appendChild(style);
new MutationObserver(()=>requestAnimationFrame(paintAll)).observe(document.body,{childList:true,subtree:true});
window.paintSpecies=paintAll;
setTimeout(()=>{try{render();paintAll()}catch(e){console.error('species renderer v116 boot failed',e)}},0);
})();
