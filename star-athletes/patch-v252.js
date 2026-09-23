(()=>{
// v0.25.3: rarity is derived from the newborn's innate quality, then only a minimum stat floor is guaranteed.
// Existing athletes keep their rarity; high-rarity existing athletes receive only the minimum-floor migration once.
const SAVE253='star-athletes-save-v200';
const ROSTER253='star-athletes-active-roster-v210';
const K253=['power','speed','stamina','agility','tech','guts'];
const ORDER253=['C','U','R','SR','SSR','UR','EX'];
const FLOOR253={C:0,U:95,R:105,SR:118,SSR:132,UR:148,EX:165};
const HOT253={C:0,U:0,R:0,SR:1,SSR:3,UR:5,EX:8};
function n253(v){return Number(v)||0}
function clamp253(v,a,b){return Math.max(a,Math.min(b,v))}
function cap253(){try{return Math.max(999,Number(window.STAR_LIMIT278?.cap?.())||999)}catch(_){return 999}}
function all253(){const out=[],seen=new Set();for(const key of ['starters','nest','lineage','released','cands','foster'])for(const m of(S[key]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);out.push(m)}if(S.egg&&!seen.has(S.egg.id))out.push(S.egg);return out}
function avg253(m){return K253.reduce((a,k)=>a+n253(m?.stats?.[k]),0)/K253.length}
function top2avg253(m){return K253.map(k=>n253(m?.stats?.[k])).sort((a,b)=>b-a).slice(0,2).reduce((a,b)=>a+b,0)/2}
function hiddenScore253(m){
 const h=m?.hidden233;if(!h)return 8;
 const vals=['growth','heredity','clutch','stability','mutation','luck'].map(k=>clamp253(n253(h[k]),0,7));
 // Hidden traits matter, but A/S should not directly manufacture top rarity.
 const mapped=vals.map(v=>[0,.7,1.6,3,4.8,6.8,9,11.5][v]||0);
 return Math.min(18,mapped.reduce((a,b)=>a+b,0)/mapped.length*1.65)
}
function skillScore253(m){return Math.min(8,(Array.isArray(m?.skills233)?m.skills233.length:0)*4)}
function quality253(m){
 const av=avg253(m),top=top2avg253(m);
 const stat=clamp253((av-85)/1.8,0,55);
 const hidden=hiddenScore253(m);
 const spec=clamp253((top-av)/3,0,7);
 const skill=skillScore253(m);
 const score=clamp253(stat+hidden+spec+skill,0,100);
 return{score,av,top,stat,hidden,spec,skill};
}
function thresholds253(gen){
 const g=Math.max(0,n253(gen));
 // Target generations: SR~G5 / SSR~G10 / UR~G15 / EX~G20.
 // Earlier tiers remain possible, but require exceptional quality.
 return{
   SR:45+Math.max(0,5-g)*2.5,
   SSR:57+Math.max(0,10-g)*2.2,
   UR:69+Math.max(0,15-g)*1.8,
   EX:81+Math.max(0,20-g)*1.2
 };
}
function rarityFrom253(score,gen=0){
 const t=thresholds253(gen);
 if(score>=t.EX)return'EX';
 if(score>=t.UR)return'UR';
 if(score>=t.SSR)return'SSR';
 if(score>=t.SR)return'SR';
 return score>=35?'R':score>=25?'U':'C';
}
function specialties253(m){const bias=(typeof SP!=='undefined'&&SP[m?.species]?.[2])||{};return K253.slice().sort((a,b)=>(n253(bias[b])-n253(bias[a]))).slice(0,2)}
function floor253(m){
 if(!m?.stats)return false;
 const floor=FLOOR253[m.rarity]??0,hot=HOT253[m.rarity]??0;if(!floor&&!hot)return false;
 const av=avg253(m),need=Math.max(0,Math.ceil(floor-av));const hs=new Set(specialties253(m));let changed=false;
 K253.forEach(k=>{const add=need+(hs.has(k)?hot:0);if(add>0){m.stats[k]=Math.min(cap253(),Math.round(n253(m.stats[k])+add));if(m.geneticBase226&&Object.prototype.hasOwnProperty.call(m.geneticBase226,k))m.geneticBase226[k]=Math.min(cap253(),Math.round(n253(m.geneticBase226[k])+add));changed=true}});
 return changed;
}
function persist253(){try{localStorage.setItem(SAVE253,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem(ROSTER253,JSON.stringify(S.nest))}catch(_){}}
function finalizeNewborn253(c){
 // Legacy compatibility only: C/U/R/SR/SSR/UR/EX is no longer a birth rarity.
 // Ability rank is finalized after development by STAR_GRADE340.
 if(!c)return c;
 if(!c.abilityRankFinal340)c.rarity='C';
 delete c.rarityPotential253;delete c.rarityStat252;
 return c;
}
try{const beforeBaby253=baby;baby=function(a,b){const c=beforeBaby253(a,b);return finalizeNewborn253(c)}}catch(e){console.warn('baby253',e)}
function migrateExisting253(){
 let changed=false;
 for(const m of all253()){
  if(!m)continue;
  if(m.rarityPotential253){delete m.rarityPotential253;changed=true}
  if(m.rarityStat252){delete m.rarityStat252;changed=true}
  if(!m.abilityRankFinal340&&m.rarity!=='C'){m.rarity='C';changed=true}
 }
 if(changed)persist253();
}
function refresh253(){migrateExisting253();try{render()}catch(_){}try{window.renderRoster210Live&&window.renderRoster210Live()}catch(_){}}
window.STAR_RARITY253={quality:quality253,thresholds:thresholds253,rarity:(score,gen)=>rarityFrom253(score,gen)};
setTimeout(refresh253,0);
})();