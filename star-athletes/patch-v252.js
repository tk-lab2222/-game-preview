(()=>{
// v0.25.2: make higher rarity meaningfully stronger at birth without making rarity the only source of value.
const SAVE252='star-athletes-save-v200';
const KEYS252=['power','speed','stamina','agility','tech','guts'];
const BONUS252={C:0,U:2,R:5,SR:9,SSR:14,UR:20,EX:28};
const SPECIAL252={C:0,U:0,R:0,SR:1,SSR:2,UR:4,EX:6};
function clamp252(v){return Math.max(1,Math.min(999,Math.round(Number(v)||0)))}
function all252(){const out=[],seen=new Set();for(const k of ['starters','nest','lineage','released','cands','foster'])for(const m of(S[k]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);out.push(m)}if(S.egg&&!seen.has(S.egg.id))out.push(S.egg);return out}
function specialties252(m){const b=(typeof SP!=='undefined'&&SP[m?.species]?.[2])||{};return KEYS252.slice().sort((a,bk)=>(Number(b[bk])||0)-(Number(b[a])||0)).slice(0,2)}
function apply252(m){
 if(!m?.stats||m.rarityStat252)return false;
 const base=BONUS252[m.rarity]??0,special=SPECIAL252[m.rarity]??0,hot=new Set(specialties252(m));
 KEYS252.forEach(k=>{
   const add=base+(hot.has(k)?special:0);
   if(!add)return;
   m.stats[k]=clamp252((Number(m.stats[k])||0)+add);
   if(m.geneticBase226&&Object.prototype.hasOwnProperty.call(m.geneticBase226,k))m.geneticBase226[k]=clamp252((Number(m.geneticBase226[k])||0)+add);
 });
 m.rarityStat252={base,special};
 return base>0||special>0;
}
function persist252(){try{localStorage.setItem(SAVE252,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem('star-athletes-active-roster-v210',JSON.stringify(S.nest))}catch(_){}}
function migrate252(){let changed=false;all252().forEach(m=>{if(apply252(m))changed=true});if(changed)persist252();return changed}
try{const beforeBaby252=baby;baby=function(a,b){const c=beforeBaby252(a,b);apply252(c);return c}}catch(e){console.warn('baby252',e)}
function refresh252(){const changed=migrate252();if(changed){try{render()}catch(_){}try{window.renderRoster210Live&&window.renderRoster210Live()}catch(_){}}}
setTimeout(refresh252,0);
})();