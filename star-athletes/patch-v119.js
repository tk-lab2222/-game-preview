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
    el.innerHTML='<div class="seasonHead119"><small class="seasonMeta119">GENERATION SEASON</small><div class="seasonTitleRow119"><b class="seasonTitle119"></b><div class="seasonDots119"></div></div><span class="seasonSub119"></span></div><div class="wallet119"></div><div class="meetChoice119"></div>';
  }
  const s=SEASONS119[S.season]||SEASONS119[6];
  const title=el.querySelector('.seasonTitle119'),sub=el.querySelector('.seasonSub119'),dots=el.querySelector('.seasonDots119');
  if(title)title.textContent=`S${S.season}/6　${s.name}`;
  if(sub)sub.textContent=s.sub;
  if(dots)dots.innerHTML=[1,2,3,4,5,6].map(n=>`<i class="${n<S.season?'done':''} ${n===S.season?'now':''}">${n}</i>`).join('');
  const wallet=el.querySelector('.wallet119');
  if(wallet)wallet.innerHTML=`<span class="walletChip119">🪙 ${S.coins}</span><span class="walletChip119">⭐ 名声 ${S.fame}</span>`;
}
try{const prev119=render;render=function(){const out=prev119();shell119();return out}}catch(e){console.warn('render119',e)}
const css=document.createElement('style');css.textContent=`
#season119{margin:-2px -2px 10px;padding:11px;border:2px solid #222;border-radius:14px;background:linear-gradient(135deg,#10192d,#273a67);color:#fff;display:grid;gap:9px}
.seasonHead119{display:grid;gap:5px;min-width:0}
.seasonMeta119{display:block;font-size:7px;line-height:1.2;letter-spacing:.12em;opacity:.7;font-weight:1000}
.seasonTitleRow119{display:flex;align-items:center;justify-content:space-between;gap:10px;min-width:0}
.seasonTitle119{display:block;min-width:0;font-size:15px;line-height:1.25;font-weight:1000;overflow-wrap:anywhere}
.seasonSub119{display:block;font-size:8px;line-height:1.4;opacity:.82}
.seasonDots119{display:flex;gap:4px;align-items:center;flex:0 0 auto}
.seasonDots119 i{width:20px;height:20px;display:grid;place-items:center;border:1px solid #ffffff73;border-radius:50%;font-size:8px;font-style:normal;font-weight:1000;color:#fff;background:#ffffff0d;box-sizing:border-box}
.seasonDots119 i.done{background:#65d99a;color:#102;border-color:#65d99a}
.seasonDots119 i.now{background:#ffd65a;color:#222;border-color:#ffd65a;box-shadow:0 0 0 2px #ffd65a38}
.wallet119{display:flex;gap:7px;flex-wrap:wrap}
.walletChip119{display:inline-flex;align-items:center;min-height:27px;padding:4px 8px;border:1px solid #ffffff38;border-radius:999px;background:#ffffff12;color:#fff;font-size:9px;font-weight:1000;box-sizing:border-box}
.meetChoice119{display:grid;gap:8px}
@media(max-width:430px){
 #season119{padding:10px}
 .seasonTitleRow119{align-items:flex-start;flex-direction:column;gap:7px}
 .seasonTitle119{font-size:14px}
 .seasonDots119{width:100%;justify-content:flex-start}
 .seasonDots119 i{width:22px;height:22px;font-size:8px}
}
`;document.head.appendChild(css);
setTimeout(shell119,0);
window.STAR_SEASON119={shell:shell119};
})();