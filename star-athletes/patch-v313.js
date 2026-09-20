(()=>{
// v0.31.27: show generation rarity unlock guide compactly.
function guide313(){
 const breed=document.getElementById('breed');if(!breed)return;
 let g=document.getElementById('rarityGuide313');
 if(!g){
   g=document.createElement('div');
   g.id='rarityGuide313';
   g.className='rarityGuide313';
   const target=document.getElementById('candBox')||document.getElementById('birth')?.closest('.box');
   target?.before(g);
   if(!g.parentNode)breed.appendChild(g);
 }
 g.innerHTML='<span>SR <b>目安 G5</b></span><span>SSR <b>目安 G10</b></span><span>UR <b>目安 G15</b></span><span>EX <b>目安 G20</b></span><small>上振れで早期出現あり</small>';
}
try{const prev=render;render=function(){const out=prev();setTimeout(guide313,0);return out}}catch(e){}
const css=document.createElement('style');css.textContent=`
.rarityGuide313{display:flex;gap:5px;flex-wrap:wrap;margin:7px 0 9px}
.rarityGuide313 span{font-size:7px;font-weight:1000;border:1px solid #c8d0d8;border-radius:999px;background:#fff;padding:4px 7px;color:#586575}
.rarityGuide313 b{color:#172033}.rarityGuide313 small{width:100%;font-size:6px;color:#7b8792;margin-left:2px}
`;document.head.appendChild(css);
setTimeout(guide313,0);
})();