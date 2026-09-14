(()=>{
// v0.11.4: render Unil / Grimo / Purumon through the same avatar override + canvas path used by Draco.
// Use approved reference crops stored as base64 text and fill the card art frame consistently.
const VER='114';
const B64={
  unil:'../star-athletes/embedded/unil-v110-small.b64?v='+VER,
  grimo:'../star-athletes/embedded/grimo-v110-small.b64?v='+VER,
  puru:'../star-athletes/embedded/puru-v110-small.b64?v='+VER
};
const POS={
  unil:{zoom:1.00,oy:-0.02},
  grimo:{zoom:1.00,oy:-0.01},
  puru:{zoom:1.00,oy:0.00}
};
const cache={};
async function sourceFor(sp){
  if(cache[sp]) return cache[sp];
  cache[sp]=(async()=>{
    const r=await fetch(B64[sp],{cache:'no-store'});
    if(!r.ok) throw new Error('art fetch '+sp+' '+r.status);
    const b64=(await r.text()).trim();
    if(!b64.startsWith('/9j/')) throw new Error('invalid jpeg base64 '+sp);
    return 'data:image/jpeg;base64,'+b64;
  })();
  return cache[sp];
}
async function loadImage(sp){
  const src=await sourceFor(sp);
  return await new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=()=>no(new Error('image decode '+sp));i.src=src});
}
async function paintOne(c){
  if(c.dataset.painting==='1'||c.dataset.painted==='1') return;
  const sp=c.dataset.species;
  if(!B64[sp]) return;
  c.dataset.painting='1';
  try{
    const im=await loadImage(sp);
    c.width=420;c.height=320;
    const x=c.getContext('2d');
    x.clearRect(0,0,c.width,c.height);
    x.fillStyle='#fffaf0';x.fillRect(0,0,c.width,c.height);
    const p=POS[sp]||{zoom:1,oy:0};
    // cover: fill the same visual frame as Draco; crop only the excess edge area.
    const scale=Math.max(c.width/im.naturalWidth,c.height/im.naturalHeight)*p.zoom;
    const w=im.naturalWidth*scale,h=im.naturalHeight*scale;
    const dx=(c.width-w)/2;
    const dy=(c.height-h)/2 + c.height*p.oy;
    x.drawImage(im,dx,dy,w,h);
    c.dataset.painted='1';
    c.dataset.error='0';
  }catch(e){
    c.dataset.error='1';
    const x=c.getContext('2d');c.width=420;c.height=320;
    x.fillStyle='#fffaf0';x.fillRect(0,0,c.width,c.height);
    x.fillStyle='#b33';x.font='bold 20px system-ui';x.textAlign='center';x.fillText('ART LOAD ERROR',210,150);
    x.font='14px system-ui';x.fillText(sp,210,178);
    console.error('species art failed',sp,e);
  }finally{c.dataset.painting='0'}
}
function paintAll(){document.querySelectorAll('canvas.speciesCanvas').forEach(paintOne)}
const previousAvatar=avatar;
avatar=function(m,big=false){
  if(!m||m.species==='draco'||!B64[m.species]) return previousAvatar(m,big);
  const label=(typeof SP!=='undefined'&&SP[m.species])?SP[m.species][0]:m.species;
  return `<div class="avatar art species-live species-${m.species} ${big?'bigArt':''}"><canvas class="speciesCanvas" data-species="${m.species}" aria-label="${label}"></canvas></div>`;
};
const style=document.createElement('style');
style.textContent='.avatar.species-live{position:relative;overflow:hidden;background:linear-gradient(#fff9eb,#f4ead6);padding:0}.speciesCanvas{width:100%;height:100%;display:block}.avatar.species-live .pattern,.avatar.species-live .accessory{display:none}';
document.head.appendChild(style);
new MutationObserver(()=>requestAnimationFrame(paintAll)).observe(document.body,{childList:true,subtree:true});
window.paintSpecies=paintAll;
setTimeout(()=>{try{render();paintAll()}catch(e){console.error('species renderer boot failed',e)}},0);
})();
