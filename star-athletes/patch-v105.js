(()=>{
// Fresh-run founder species selection only. Character art is owned by draco-art-v103/species-art-v116.
const STARTER_NAMES={draco:'ラゴ',unil:'ミラ',grimo:'グリ',puru:'ぷる'};
const SPECIES=['draco','unil','grimo','puru'];
if(S.starters.length===2 && S.dex.b===0 && S.nest.length===0 && S.lineage.length===0 && S.cands.length===0){
  const shuffled=[...SPECIES].sort(()=>Math.random()-.5);
  S.starters=shuffled.slice(0,2).map(sp=>monster(sp,STARTER_NAMES[sp]));
}
})();