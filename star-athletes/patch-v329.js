(()=>{
'use strict';
// v0.31.85: Draco stable renderer.
// Keep horn/wing/tail genetics as data, but stop destructive alpha compositing and part replacement in normal UI.
if(window.STAR_DRACO_STABLE329)return;

const SRC329='../star-athletes/assets/creatures/draco.png?v=3403';
const JP329=window.DRACO_JP||{
 normal:'ノーマル',curl:'カール角',crystal:'クリスタル',feather:'フェザー',star:'スター尾',leaf:'リーフ尾'
};

function ensure329(m){
  try{window.ensureDracoVisual?.(m)}catch(_){}
  return m;
}
function gene329(m){
  const v=ensure329(m)?.visual||{};
  return [v.horn,v.wing,v.tail].map(x=>JP329[x]||x||'ノーマル').join(' / ');
}
// Avatar construction is owned by330;116 supplies the younger atlas frames.

function cleanup329(root=document){
  root.querySelectorAll?.('.avatar.draco-live').forEach(el=>{
    const card=el.closest('[data-id],[data-athlete210],.card,.train210');
    let id=card?.dataset?.id||card?.dataset?.athlete210||null;
    let m=null;
    if(id){
      const pools=['starters','nest','lineage','released','cands','foster'];
      for(const k of pools){m=(S?.[k]||[]).find(x=>x?.id===id);if(m)break}
      if(!m&&S?.egg?.id===id)m=S.egg;
    }
    if(!m||m.species!=='draco')return;
    const wrap=document.createElement('div');
    wrap.innerHTML=window.avatar(m,el.classList.contains('bigArt'));
    const fresh=wrap.firstElementChild;
    if(fresh)el.replaceWith(fresh);
  });
}
function sync329(){
  try{cleanup329(document)}catch(e){console.warn('draco stable cleanup329',e)}
}

const css=document.createElement('style');
css.id='dracoStable329css';
css.textContent=`
.avatar.draco-stable329{position:relative;overflow:hidden!important;padding:0!important;background:linear-gradient(#fff9eb,#f4ead6)!important}
.dracoStableImg329{position:absolute;left:50%;top:auto;bottom:3%;width:96%;height:96%;object-fit:contain;object-position:center bottom;transform:translateX(-50%);display:block;max-width:none!important;max-height:none!important;filter:none!important}
.train210>header .avatar.draco-stable329 .dracoStableImg329,.entries210 .avatar.draco-stable329 .dracoStableImg329{width:84%;height:84%}
.avatar.draco-stable329 .pattern,.avatar.draco-stable329 .accessory{display:none!important}
.avatar.draco-stable329 .dracoGene329{z-index:3;max-width:calc(100% - 8px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;background:#fffdf2ee}
.myStarAvatar323 .avatar.draco-stable329 .dracoStableImg329{width:90%;height:90%}
.pickerAvatar327 .avatar.draco-stable329 .dracoStableImg329{width:88%;height:88%}
`;
document.head.appendChild(css);

// Do not observe document.body. Stable Draco rendering is synchronized only at
// known render boundaries plus a few finite startup passes.
try{
  const prevRender329=window.render;
  if(typeof prevRender329==='function'){
    window.render=function(){
      const out=prevRender329.apply(this,arguments);
      requestAnimationFrame(sync329);
      return out;
    };
  }
}catch(e){console.warn('draco stable render wrap329',e)}

window.paintDracos=function(){sync329()};
window.STAR_DRACO_STABLE329={sync:sync329,source:SRC329,gene:gene329};

[0,80,250,700].forEach(ms=>setTimeout(sync329,ms));
})();
