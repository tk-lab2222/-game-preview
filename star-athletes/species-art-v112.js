(()=>{
// v0.11.2: render Unil / Grimo / Purumon through the same avatar override + canvas path used by Draco.
const BASE='../star-athletes/assets/';
const VER='112';
const SRC={unil:BASE+'unil.jpg?v='+VER,grimo:BASE+'grimo.jpg?v='+VER,puru:BASE+'puru.jpg?v='+VER};
const cache={};
function load(src){if(cache[src])return cache[src];cache[src]=new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=src});return cache[src]}
async function paintOne(c){if(c.dataset.painting==='1'||c.dataset.painted==='1')return;const sp=c.dataset.species,src=SRC[sp];if(!src)return;c.dataset.painting='1';try{const im=await load(src);c.width=420;c.height=320;const x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);const scale=Math.min(c.width/im.naturalWidth,c.height/im.naturalHeight);const w=im.naturalWidth*scale,h=im.naturalHeight*scale;x.fillStyle='#fffaf0';x.fillRect(0,0,c.width,c.height);x.drawImage(im,(c.width-w)/2,(c.height-h)/2,w,h);c.dataset.painted='1'}catch(e){console.error('species art failed',sp,e)}finally{c.dataset.painting='0'}}
function paintAll(){document.querySelectorAll('canvas.speciesCanvas').forEach(paintOne)}
const previousAvatar=avatar;
avatar=function(m,big=false){if(!m||m.species==='draco'||!SRC[m.species])return previousAvatar(m,big);const label=(typeof SP!=='undefined'&&SP[m.species])?SP[m.species][0]:m.species;return `<div class="avatar art species-live species-${m.species} ${big?'bigArt':''}"><canvas class="speciesCanvas" data-species="${m.species}" aria-label="${label}"></canvas></div>`};
const style=document.createElement('style');style.textContent='.avatar.species-live{position:relative;overflow:hidden;background:linear-gradient(#fff9eb,#f4ead6);padding:0}.speciesCanvas{width:100%;height:100%;display:block;object-fit:contain}.avatar.species-live .pattern,.avatar.species-live .accessory{display:none}';document.head.appendChild(style);
new MutationObserver(()=>requestAnimationFrame(paintAll)).observe(document.body,{childList:true,subtree:true});
window.paintSpecies=paintAll;
setTimeout(()=>{try{render();paintAll()}catch(e){console.error('species renderer boot failed',e)}},0);
})();
