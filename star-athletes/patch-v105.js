(()=>{
// v0.10.6: use the adopted character-guide art, cut out with transparent backgrounds.
ART.unil='../star-athletes/approved/unil-transparent.webp?v=106';
ART.grimo='../star-athletes/approved/grimo-transparent.webp?v=106';
ART.puru='../star-athletes/approved/puru-transparent.webp?v=106';

const STARTER_NAMES={draco:'ラゴ',unil:'ミラ',grimo:'グリ',puru:'ぷる'};
const SPECIES=['draco','unil','grimo','puru'];

// Keep the two-founder rule while allowing all four species to enter normal play.
// Only touch a completely untouched new run.
if(S.starters.length===2 && S.dex.b===0 && S.nest.length===0 && S.lineage.length===0 && S.cands.length===0){
  const shuffled=[...SPECIES].sort(()=>Math.random()-.5);
  S.starters=shuffled.slice(0,2).map(sp=>monster(sp,STARTER_NAMES[sp]));
}

const style=document.createElement('style');
style.textContent=`
/* Adopted transparent character art */
.avatar:not(.draco-live){background:linear-gradient(180deg,#fff7ea,#fff)}
.avatar:not(.draco-live) .artimg{object-fit:contain!important;background:transparent!important;padding:5px!important}
.bigArt:not(.draco-live) .artimg{object-fit:contain!important;padding:14px!important}
.trainCard .avatar:not(.draco-live) .artimg,.par .avatar:not(.draco-live) .artimg{padding:3px!important}
`;
document.head.appendChild(style);

setTimeout(()=>render(),0);
})();
