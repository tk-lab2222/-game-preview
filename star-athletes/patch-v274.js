(()=>{
// v0.28.6 / M4.2: ultra-low-probability collection tiers.
// These outcomes are rare bloodline traits. They grant bounded breeding benefits but never gate story progression.
// No broad MutationObserver.
const TIERS274=[
 {id:'ex',name:'EX級',base:.0015},
 {id:'mutation',name:'特殊突然変異',base:.0002},
 {id:'miracle',name:'奇跡個体',base:.00001},
 {id:'mythic',name:'神話級',base:.000001}
];
const RK274=['G','F','E','D','C','B','A','S'];
function n274(v){return Number(v)||0}
function rank274(v){return RK274[Math.max(0,Math.min(7,Math.round(n274(v))))]}
function hidden274(m,k){return rank274(m?.hidden233?.[k])}
function multiplier274(m){
 let mult=1,reasons=[];
 const rr=Array.isArray(m?.rareRecipeCandidates273)?m.rareRecipeCandidates273:[];
 const recipeMult=rr.reduce((a,x)=>Math.max(a,n274(x?.mult)||1),1);
 if(rr.length){mult*=3;reasons.push('特殊レシピ成立×3')}
 if(recipeMult>1){const x=Math.min(20,recipeMult);mult*=x;reasons.push(`血統レシピ倍率×${x}`)}
 const mut=hidden274(m,'mutation');if(mut==='A'){mult*=3;reasons.push('変異因子A×3')}else if(mut==='S'){mult*=10;reasons.push('変異因子S×10')}
 const luck=hidden274(m,'luck');if(luck==='A'){mult*=2;reasons.push('LUCK A×2')}else if(luck==='S'){mult*=5;reasons.push('LUCK S×5')}
 const heredity=hidden274(m,'heredity');if(heredity==='A'){mult*=1.5;reasons.push('遺伝力A×1.5')}else if(heredity==='S'){mult*=2.5;reasons.push('遺伝力S×2.5')}
 const gen=Math.max(1,n274(m?.gen)||n274(S?.generation233)||1);if(gen>=10){mult*=2;reasons.push('10代継承×2')}else if(gen>=5){mult*=1.5;reasons.push('5代継承×1.5')}
 return {mult:Math.min(1000,mult),reasons};
}
function evaluate274(m,roll=true){
 const boost=multiplier274(m),u=roll?Math.random():null;
 const rows=TIERS274.map(t=>({...t,mult:boost.mult,chance:Math.min(.02,t.base*boost.mult),reasons:boost.reasons}));
 if(!roll)return rows;
 // One roll, rarest qualifying tier wins. This prevents stacked independent jackpots.
 const won=[...rows].reverse().find(x=>u<x.chance)||null;
 return {rows,won,roll:u};
}
function apply274(m){
 if(!m||m.ultraRareRolled274)return m;
 const r=evaluate274(m,true);m.ultraRareRolled274=true;
 m.ultraRareOdds274=r.rows.map(x=>({id:x.id,base:x.base,mult:x.mult,chance:x.chance}));
 if(r.won){
  const benefit={
    ex:'子の隠れ素質 上振れ判定UP',
    mutation:'特殊血統レシピ成立率UP',
    miracle:'奇跡因子を低確率で子へ継承',
    mythic:'上振れ・特殊血統・奇跡因子継承を強化'
  }[r.won.id]||'特殊血統ボーナス';
  m.ultraRare274={id:r.won.id,name:r.won.name,base:r.won.base,mult:r.won.mult,chance:r.won.chance,reasons:r.won.reasons,benefit,at:Date.now()};
}
 return m;
}
try{const prevBaby274=baby;baby=function(a,b){return apply274(prevBaby274(a,b))}}catch(e){console.warn('baby274',e)}
function all274(){return [...(S.cands||[]),...(S.nest||[]),...(S.lineage||[]),...(S.starters||[])]}
function badge274(){
 document.querySelectorAll('#cands .card[data-id],#breeders .card[data-id],#lineagePool .card[data-id]').forEach(card=>{
  const m=all274().find(x=>x?.id===card.dataset.id);if(!m?.ultraRare274)return;
  let b=card.querySelector('.ultra274');if(!b){b=document.createElement('div');b.className='ultra274';(card.querySelector('.bd')||card).appendChild(b)}
  const u=m.ultraRare274,c=u.chance,p=c<.00001?(c*100).toFixed(5):c<.001?(c*100).toFixed(3):(c*100).toFixed(2);
  const bp=(Number(u.base)||0)*100,bpTxt=bp<.001?bp.toFixed(4):bp<.1?bp.toFixed(3):bp.toFixed(2);
  const mult=Number(u.mult)||1;
  b.innerHTML=`<b>✧ 特殊誕生 ${u.name}</b><small>基礎 ${bpTxt}% × 補正 ${mult.toFixed(mult%1?2:1)} = ${p}%</small>`;
 });
}
function late274(){try{badge274()}catch(e){console.warn('badge274',e)}}
try{const prevRender274=render;render=function(){const out=prevRender274();setTimeout(late274,0);return out}}catch(e){console.warn('render274',e)}
window.STAR_ULTRA274={tiers:TIERS274,evaluate:(m)=>evaluate274(m,false),multiplier:multiplier274,sync:late274};
const css=document.createElement('style');css.textContent='.ultra274{margin-top:6px;padding:6px 8px;border:2px solid #7c4dff;border-radius:9px;background:linear-gradient(135deg,#f7f0ff,#fff7d6);letter-spacing:.03em}.ultra274 b{display:block;font-size:8px}.ultra274 small{display:block;margin-top:2px;font-size:6px;color:#66537a;font-weight:900}';document.head.appendChild(css);late274();
})();