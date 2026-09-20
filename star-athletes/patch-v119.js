(()=>{
// Season shell only. Tournament selection/battle/progression are owned by v290/v225/v233.
const SEASONS119={
 1:{name:'ローカル運動会',sub:'初実戦・経験獲得'},
 2:{name:'エリア運動会',sub:'地区上位クラス'},
 3:{name:'グランド運動会',sub:'有力スターネストが集結'},
 4:{name:'メジャー運動会',sub:'代表候補として注目される上位戦'},
 5:{name:'プラネット予選',sub:'代表決定戦への出場権を争う'},
 6:{name:'プラネット代表決定戦',sub:'1世代の最終目標'}
};
function shell119(){
  S.season=Math.max(1,Math.min(6,Number(S.season)||1));
  S.coins=Number(S.coins)||0;S.fame=Number(S.fame)||0;S.seasonHistory=Array.isArray(S.seasonHistory)?S.seasonHistory:[];
  const train=document.getElementById('train'),host=train?.querySelector('.box');if(!host)return;
  let el=document.getElementById('season119');
  if(!el){
    el=document.createElement('div');el.id='season119';host.insertBefore(el,host.firstChild);
    el.innerHTML='<div class="seasonHead119"></div><div class="wallet119"></div><div class="meetChoice119"></div>';
  }
  const s=SEASONS119[S.season]||SEASONS119[6];
  const head=el.querySelector('.seasonHead119');
  if(head)head.innerHTML=`<div><small>GENERATION SEASON</small><b>S${S.season}/6　${s.name}</b><span>${s.sub}</span></div><div class="seasonDots119">${[1,2,3,4,5,6].map(n=>`<i class="${n<S.season?'done':''} ${n===S.season?'now':''}">${n}</i>`).join('')}</div>`;
  const wallet=el.querySelector('.wallet119');
  if(wallet)wallet.innerHTML=`<span>🪙 ${S.coins}</span><span>⭐ 名声 ${S.fame}</span>`;
}
try{const prev119=render;render=function(){const out=prev119();shell119();return out}}catch(e){console.warn('render119',e)}
const css=document.createElement('style');css.textContent=``;document.head.appendChild(css);
setTimeout(shell119,0);
window.STAR_SEASON119={shell:shell119};
})();