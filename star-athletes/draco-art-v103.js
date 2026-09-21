(()=>{
const G='../star-athletes-draco-lab/generated/';
const AV='414';
const W=545,H=515;
const SLOTS={horn_left:[46.3303,16.5049,26.6055,31.0680],horn_right:[67.8899,19.9029,20.1835,26.2136],wing_left:[28.8991,47.5728,41.2844,42.7184],wing_right:[73.8532,50,26.6055,35.9223],tail:[25.6881,67.4757,31.1927,41.7476]};
const P={
 horn_left:{curl:[-1,-1.2,.94,-4,0],crystal:[-.8,-1.4,.96,-2,0]},
 horn_right:{curl:[.6,-1,.90,5,0],crystal:[.6,-1.2,.93,3,0]},
 wing_left:{normal:[-.6,.4,1,-8,1],feather:[-.6,.4,1,-8,1],crystal:[1.2,.2,.94,-7,1]},
 wing_right:{normal:[.4,0,.98,7,0],feather:[.4,0,.98,7,0],crystal:[-1.0,-.2,.94,6,0]},
 tail:{star:[-.8,.6,1,-6,1],leaf:[-.6,1,.97,-4,1]}
};
const cache={};
function img(src){if(cache[src])return cache[src];cache[src]=new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=src});return cache[src]}
function tf(slot,v){const q=SLOTS[slot],p=P[slot][v];return {cx:(q[0]+p[0])/100*W,cy:(q[1]+p[1])/100*H,bw:q[2]/100*W,bh:q[3]/100*H,s:p[2],r:p[3],fx:p[4]}}
function drawPart(ctx,im,slot,v,extra=1){const t=tf(slot,v),fit=Math.min(t.bw/im.naturalWidth,t.bh/im.naturalHeight)*t.s*extra,w=im.naturalWidth*fit,h=im.naturalHeight*fit;ctx.save();ctx.translate(t.cx,t.cy);ctx.rotate(t.r*Math.PI/180);ctx.scale(t.fx?-1:1,1);ctx.drawImage(im,-w/2,-h/2,w,h);ctx.restore()}
let winglessPromise=null;
async function wingless(){if(winglessPromise)return winglessPromise;winglessPromise=(async()=>{const [body,wing]=await Promise.all([img(G+'body_stage.png?v='+AV),img(G+'wing_normal_clean.png?v='+AV)]);const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(body,0,0,W,H);x.globalCompositeOperation='destination-out';drawPart(x,wing,'wing_left','normal',1.045);drawPart(x,wing,'wing_right','normal',1.045);x.globalCompositeOperation='source-over';return c})();return winglessPromise}
async function paintOne(c){if(c.dataset.painting==='1')return;c.dataset.painting='1';try{const horn=c.dataset.horn||'normal',wing=c.dataset.wing||'normal',tail=c.dataset.tail||'normal';c.width=W;c.height=H;const ctx=c.getContext('2d');ctx.clearRect(0,0,W,H);const [base,wL,wR]=await Promise.all([wingless(),img(G+`wing_${wing}_clean.png?v=${AV}`),img(G+`wing_${wing}_clean.png?v=${AV}`)]);drawPart(ctx,wL,'wing_left',wing);drawPart(ctx,wR,'wing_right',wing);ctx.drawImage(base,0,0,W,H);if(tail!=='normal'){const t=await img(G+`tail_${tail}_clean.png?v=${AV}`);drawPart(ctx,t,'tail',tail)}if(horn!=='normal'){const [hl,hr]=await Promise.all([img(G+`horn_${horn}_left.png?v=413`),img(G+`horn_${horn}_right.png?v=413`)]);drawPart(ctx,hl,'horn_left',horn);drawPart(ctx,hr,'horn_right',horn)}c.dataset.painting='0';c.dataset.painted='1'}catch(e){c.dataset.painting='0'}}
function paintAll(){document.querySelectorAll('canvas.dracoCanvas').forEach(paintOne)}
const style=document.createElement('style');style.textContent='.avatar.draco-live{position:relative;overflow:hidden;background:linear-gradient(#fff9eb,#f4ead6);padding:0}.dracoCanvas{position:absolute;left:50%;top:50%;height:92%;width:auto;max-width:92%;aspect-ratio:545/515;transform:translate(-50%,-50%);display:block}.train210>header .avatar.draco-live .dracoCanvas,.entries210 .avatar.draco-live .dracoCanvas{height:86%;width:auto;max-width:86%}.geneMini{position:absolute;left:4px;bottom:3px;z-index:8;background:#fffdf2dd;border:1px solid #222;border-radius:999px;padding:1px 4px;font-size:6px;font-weight:900}.avatar.draco-live .pattern,.avatar.draco-live .accessory{display:none}';document.head.appendChild(style);
const oldAvatar=avatar;
avatar=function(m,big=false){if(m?.species!=='draco')return oldAvatar(m,big);ensureDracoVisual(m);const v=m.visual,j=window.DRACO_JP||{};return `<div class="avatar art draco-live ${big?'bigArt':''}"><canvas class="dracoCanvas" data-horn="${v.horn}" data-wing="${v.wing}" data-tail="${v.tail}"></canvas><div class="geneMini">${j[v.horn]||v.horn} / ${j[v.wing]||v.wing} / ${j[v.tail]||v.tail}</div></div>`};
new MutationObserver(()=>requestAnimationFrame(paintAll)).observe(document.body,{childList:true,subtree:true});
window.paintDracos=paintAll;
setTimeout(()=>{render();paintAll()},0);
})();
