(()=>{
// v0.10.5: expose all four starter species and use the finished JPG art for non-Draco species.
ART.unil='../star-athletes/assets/unil.jpg?v=105';
ART.grimo='../star-athletes/assets/grimo.jpg?v=105';
ART.puru='../star-athletes/assets/puru.jpg?v=105';

const STARTER_NAMES={draco:'ラゴ',unil:'ミラ',grimo:'グリ',puru:'ぷる'};
const SPECIES=['draco','unil','grimo','puru'];

// Preserve the "2 founders" rule, but don't hard-lock new runs to Draco + Unil.
// Only replace the untouched initial pair; once breeding has started, never mutate the run.
if(S.starters.length===2 && S.dex.b===0 && S.nest.length===0 && S.lineage.length===0 && S.cands.length===0){
  const shuffled=[...SPECIES].sort(()=>Math.random()-.5);
  S.starters=shuffled.slice(0,2).map(sp=>monster(sp,STARTER_NAMES[sp]));
}

const style=document.createElement('style');
style.textContent=`
/* Finished full-character art for the three non-Draco species */
.avatar:not(.draco-live) .artimg{object-fit:contain!important;background:linear-gradient(180deg,#fff7ea,#fff);padding:2px}
.bigArt:not(.draco-live) .artimg{object-fit:contain!important;padding:8px}
`;
document.head.appendChild(style);

setTimeout(()=>render(),0);
})();
