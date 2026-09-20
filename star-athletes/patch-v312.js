(()=>{
// v0.31.26: EX card contrast pass.
function tag312(){
 document.querySelectorAll('.card').forEach(card=>{
   const rarity=[...card.querySelectorAll('em,.rarity277,.nm em,strong,span')].map(x=>x.textContent?.trim()).find(t=>t==='EX');
   card.classList.toggle('ex312',rarity==='EX');
 });
}
try{
 const prev=render;
 render=function(){const out=prev();[0,40,120,300].forEach(ms=>setTimeout(tag312,ms));return out};
}catch(e){console.warn('render312',e)}
document.addEventListener('click',e=>{
 if(e.target?.closest?.('.tab,#batchGo260,#hatch,#adopt,#lineagePool [data-release]'))[0,60,180].forEach(ms=>setTimeout(tag312,ms));
},true);
const css=document.createElement('style');
css.id='exContrast312';
css.textContent=`
.card.ex312{
  color:#f8f4ea!important;
}
.card.ex312 .bd,
.card.ex312 .nm,
.card.ex312 .sm,
.card.ex312 .speciesLine,
.card.ex312 .tags,
.card.ex312 .traitRow,
.card.ex312 .miniStats,
.card.ex312 .shortBadge262,
.card.ex312 .skillStable247,
.card.ex312 .skillStable247 *,
.card.ex312 .rare273,
.card.ex312 .ultra274,
.card.ex312 .lineageTitle271,
.card.ex312 .lineageMeta,
.card.ex312 small,
.card.ex312 label,
.card.ex312 p,
.card.ex312 span{
  color:#e8e1d5;
}
.card.ex312 .nm b,
.card.ex312 .miniStats b,
.card.ex312 .skillStable247 b,
.card.ex312 strong{
  color:#ffffff!important;
}
.card.ex312 .miniStats span{
  border-color:rgba(255,255,255,.24)!important;
}
.card.ex312 .traitRow span,
.card.ex312 .shortBadge262 span,
.card.ex312 .skillStable247 span,
.card.ex312 .lineageTitle271,
.card.ex312 .rare273,
.card.ex312 .ultra274{
  background:rgba(255,255,255,.10)!important;
  border-color:rgba(255,255,255,.28)!important;
  color:#fff4cf!important;
}
.card.ex312 .shortBadge262 .rec262{
  background:#f0cf68!important;
  color:#3b2b00!important;
  border-color:#d5ac2f!important;
}
.card.ex312 .skillStable247{
  border-color:rgba(255,255,255,.26)!important;
}
.card.ex312 hr,
.card.ex312 .divider,
.card.ex312 .meta277,
.card.ex312 .skillStable247{
  border-color:rgba(255,255,255,.20)!important;
}
.card.ex312 [class*="gold"],
.card.ex312 [class*="lineage"]{
  text-shadow:none;
}
.card.ex312 .lineageTitle271,
.card.ex312 .gold271,
.card.ex312 .goldLineage{
  background:#f1d36b!important;
  color:#342600!important;
  border-color:#c6a13a!important;
}
.card.ex312 button,
.card.ex312 select{
  color:#172033;
}
`;
document.head.appendChild(css);
[0,100,300].forEach(ms=>setTimeout(tag312,ms));
window.STAR_EX312={sync:tag312};
})();