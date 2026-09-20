(()=>{
// v0.31.32: future hidden-trait inflation scaffold for LIMIT progression.
// Normal story remains capped at S. Higher ranks are only exposed through LIMIT stage gates.
const RANKS314=['G','F','E','D','C','B','A','S','SS','SSS','EXG','EXF','EXE'];
const LIMIT_UNLOCK314={
  0:'S',
  1:'SS',
  2:'SSS',
  3:'EXG',
  4:'EXF',
  5:'EXE'
};
function n314(v){return Number(v)||0}
function limitStage314(){
  const a=n314(S?.limit278?.stage);
  const b=n314(S?.limitStage);
  return Math.max(0,a,b);
}
function maxRankIndex314(stage=limitStage314()){
  const s=Math.max(0,Math.min(5,Math.floor(n314(stage))));
  return s===0?7:Math.min(12,7+s);
}
function maxRank314(stage=limitStage314()){return RANKS314[maxRankIndex314(stage)]}
function label314(v){return RANKS314[Math.max(0,Math.min(RANKS314.length-1,Math.round(n314(v))))]||'G'}
function clamp314(v,stage=limitStage314()){
  return Math.max(0,Math.min(maxRankIndex314(stage),Math.round(n314(v))));
}
function unlocked314(rank,stage=limitStage314()){
  const i=RANKS314.indexOf(rank);
  return i>=0&&i<=maxRankIndex314(stage);
}
// Reserved generation bias for future LIMIT breeding.
// It deliberately does not mutate or roll current hidden traits yet.
function limitRollProfile314(stage=limitStage314()){
  const max=maxRankIndex314(stage);
  return {
    stage:Math.max(0,Math.floor(n314(stage))),
    maxIndex:max,
    maxRank:RANKS314[max],
    normalCap:'S',
    next:RANKS314[Math.min(12,max+1)]||null
  };
}
window.STAR_TRAIT_RANK314={
  ranks:[...RANKS314],
  limitUnlock:{...LIMIT_UNLOCK314},
  stage:limitStage314,
  maxIndex:maxRankIndex314,
  maxRank:maxRank314,
  label:label314,
  clamp:clamp314,
  unlocked:unlocked314,
  profile:limitRollProfile314
};
})();