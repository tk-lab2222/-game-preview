(()=>{
// v0.28.5 / M4.1: data-driven rare recipe engine (tags + conditions + probability multipliers).
// No broad MutationObserver. Rare recipes are optional collection outcomes, never required for story progression.
const K273=['power','speed','stamina','agility','tech','guts'];
const SK273={power:'豪腕',speed:'疾風',stamina:'鉄肺',agility:'軽業',tech:'精密',guts:'勝負魂'};
const RK273=['G','F','E','D','C','B','A','S'];
const RECIPES273=[
 {id:'godspeed',name:'神速系',base:.006,need:['skill:speed','skill:agility'],hint:'疾風 + 軽業',mult:[['mutation:A',3],['mutation:S',8],['lineage:5',2]]},
 {id:'titan',name:'巨神系',base:.006,need:['skill:power','skill:stamina'],hint:'豪腕 + 鉄肺',mult:[['mutation:A',3],['mutation:S',8],['lineage:5',2]]},
 {id:'aberrant',name:'異形系',base:.0005,need:['parents:mutationS'],hint:'変異S × 変異S',mult:[['mixed',5],['luck:A',2],['luck:S',4]]},
 {id:'pureblood',name:'純血系',base:.004,need:['sameSpecies','lineage:5'],hint:'同種族を5代以上継続',mult:[['heredity:A',2],['heredity:S',4]]},
 {id:'hybrid',name:'混血系',base:.004,need:['mixed','mixedLineage:3'],hint:'異種交配を3代以上継続',mult:[['mutation:A',2],['mutation:S',5]]}
];
function n273(v){return Number(v)||0}
function rank273(v){return RK273[Math.max(0,Math.min(7,Math.round(n273(v))))]}
function hidden273(m,k){return rank273(m?.hidden233?.[k])}
function skillIds273(m){return Array.isArray(m?.skills233)?m.skills233:[]}
function tagLabel273(tag){
 const map={
  'mutation:A':'変異因子A','mutation:S':'変異因子S',
  'luck:A':'LUCK A','luck:S':'LUCK S',
  'heredity:A':'遺伝力A','heredity:S':'遺伝力S',
  'lineage:5':'5代継承','mixed':'異種交配','mixedLineage:3':'異種交配3代',
  'sameSpecies':'同種族継承','parents:mutationS':'変異因子S×S'
 };
 return map[tag]||tag;
}
function tags273(m,a,b){
 const t=new Set();if(m?.species)t.add('species:'+m.species);skillIds273(m).forEach(x=>t.add('skill:'+x));
 if(m?.hidden233){t.add('mutation:'+hidden273(m,'mutation'));t.add('luck:'+hidden273(m,'luck'));t.add('heredity:'+hidden273(m,'heredity'))}
 const line=Math.max(1,n273(m?.gen)||n273(S?.generation233)||1);if(line>=5)t.add('lineage:5');
 if(a&&b){if(a.species===b.species)t.add('sameSpecies');else t.add('mixed');if(hidden273(a,'mutation')==='S'&&hidden273(b,'mutation')==='S')t.add('parents:mutationS');const prev=Math.max(n273(a.mixedLineage273),n273(b.mixedLineage273));m.mixedLineage273=a.species!==b.species?prev+1:0;if(m.mixedLineage273>=3)t.add('mixedLineage:3')}
 return t;
}
function rareRecipeParentMult273(a,b,m){
 let mult=1,reasons=[];
 const apply=p=>{
   const id=p?.ultraRare274?.id,s=Math.max(.70,Math.min(1.30,(Number(p?.ultraRare274?.strength274)||100)/100));
   const extra=id==='mutation'?.35:id==='miracle'?.50:id==='mythic'?.75:0;
   const x=1+extra*s;
   if(x>1){mult*=x;reasons.push(`${p.name||'親'}の特殊誕生血統×${x.toFixed(2)}`)}
 };
 apply(a);apply(b);
 const parents=[a,b].filter(Boolean);
 const hasDivine=parents.some(p=>p?.rareVisual243==='divine'||p?.visual?.color==='神彩');
 const hasPrism=parents.some(p=>p?.rareVisual243==='prism'||p?.visual?.color==='プリズム');
 const hasShiny=parents.some(p=>p?.rareVisual243==='shiny'||p?.shiny);
 if(hasDivine){mult*=1.50;reasons.push('神彩血統×1.50')}
 else if(hasPrism){mult*=1.25;reasons.push('虹色血統×1.25')}
 else if(hasShiny){mult*=1.10;reasons.push('色違い血統×1.10')}
 const patternMult=Math.max(Number(window.STAR_PATTERN342?.rareRecipeMul?.(a)||1),Number(window.STAR_PATTERN342?.rareRecipeMul?.(b)||1));
 if(patternMult>1){mult*=patternMult;reasons.push(`上位星紋×${patternMult.toFixed(2)}`)}
 if(m?.miracleFactor274){const x=1+.15*Math.max(1,Number(m.miracleFactor274.strength)||1);mult*=x;reasons.push(`奇跡因子×${x.toFixed(2)}`)}
 return{mult:Math.min(3,mult),reasons};
}
function evaluate273(m,a,b,roll=true){const tags=tags273(m,a,b),hits=[],rare=rareRecipeParentMult273(a,b,m);for(const r of RECIPES273){if(!r.need.every(x=>tags.has(x)))continue;let mult=1;const reasons=[];for(const [tag,x] of r.mult||[])if(tags.has(tag)){mult*=x;reasons.push(`${tagLabel273(tag)}×${x}`)}mult*=rare.mult;reasons.push(...rare.reasons);const chance=Math.min(.25,r.base*mult),won=roll&&Math.random()<chance;hits.push({id:r.id,name:r.name,hint:r.hint,base:r.base,mult,chance,won,reasons})}return hits}
function apply273(m,a,b){if(!m||m.rareRecipeRolled273)return m;const hits=evaluate273(m,a,b,true);m.rareRecipeRolled273=true;m.rareRecipeCandidates273=hits.map(x=>({id:x.id,name:x.name,hint:x.hint,base:x.base,chance:x.chance,mult:x.mult,reasons:x.reasons}));const won=hits.filter(x=>x.won).sort((x,y)=>x.chance-y.chance)[0];if(won){m.specialLineage273={id:won.id,name:won.name,chance:won.chance,mult:won.mult,at:Date.now()};m.tags273=[...(m.tags273||[]),won.id]}return m}
try{const prevBaby273=baby;baby=function(a,b){const m=prevBaby273(a,b);return apply273(m,a,b)}}catch(e){console.warn('baby273',e)}
function badge273(){document.querySelectorAll('#cands .card[data-id],#breeders .card[data-id],#lineagePool .card[data-id]').forEach(card=>{const id=card.dataset.id,m=[...(S.cands||[]),...(S.nest||[]),...(S.lineage||[]),...(S.starters||[])].find(x=>x?.id===id);if(!m?.specialLineage273)return;let b=card.querySelector('.rare273');if(!b){b=document.createElement('div');b.className='rare273';(card.querySelector('.bd')||card).appendChild(b)}b.textContent=`✦ ${m.specialLineage273.name} / 推定 ${(m.specialLineage273.chance*100).toFixed(m.specialLineage273.chance<.001?3:2)}%`})}
function late273(){try{badge273()}catch(e){console.warn('badge273',e)}}
try{const prevRender273=render;render=function(){const out=prevRender273();setTimeout(late273,0);return out}}catch(e){console.warn('render273',e)}
window.STAR_RARE273={recipes:RECIPES273,evaluate:(m,a,b)=>evaluate273(m,a,b,false),tags:tags273,sync:late273};
const css=document.createElement('style');css.textContent='.rare273{margin-top:6px;padding:5px 7px;border:1px solid #b88a22;border-radius:8px;background:#fff7d6;color:#6f4b00;font-size:7px;font-weight:1000}';document.head.appendChild(css);late273();
})();
// v0.28.6 loader: keep M4.2 isolated while the release shell remains stable.
(()=>{if(window.STAR_ULTRA274||document.querySelector('script[data-star-v274]'))return;const s=document.createElement('script');s.dataset.starV274='1';s.src='../star-athletes/patch-v274.js?v=286';document.head.appendChild(s)})();