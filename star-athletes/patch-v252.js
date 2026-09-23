(()=>{
// v0.32.44: compatibility shim after retiring newborn C/U/R/SR/SSR/UR/EX rarity.
if(window.STAR_RARITY253)return;
function all253(){const out=[],seen=new Set();for(const key of ['starters','nest','lineage','released','cands','foster'])for(const m of(S?.[key]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);out.push(m)}if(S?.egg&&!seen.has(S.egg.id))out.push(S.egg);return out}
function persist253(){try{localStorage.setItem('star-athletes-save-v200',JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function clean253(){let changed=false;for(const m of all253()){if(!m)continue;if(m.rarityPotential253){delete m.rarityPotential253;changed=true}if(m.rarityStat252){delete m.rarityStat252;changed=true}if(!m.abilityRankFinal340&&Object.prototype.hasOwnProperty.call(m,'rarity')){delete m.rarity;changed=true}}if(changed)persist253()}
window.STAR_RARITY253={sync:clean253};clean253();
})();