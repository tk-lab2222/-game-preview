(()=>{
// Future LIMIT trait architecture.
// Normal ranks are finalized as G..S (0..7).
// Beyond S, store numeric transcendence tiers first; display labels stay configurable.
const NORMAL314=['G','F','E','D','C','B','A','S'];
const FUTURE314=[
 {index:8, unlockLimit:1, label:null, code:'T1'},
 {index:9, unlockLimit:2, label:null, code:'T2'},
 {index:10,unlockLimit:3, label:null, code:'T3'},
 {index:11,unlockLimit:4, label:null, code:'T4'},
 {index:12,unlockLimit:5, label:null, code:'T5'}
];
function n314(v){return Number(v)||0}
function limitStage314(){return Math.max(0,n314(S?.limit278?.stage),n314(S?.limitStage))}
function unlockedMax314(stage=limitStage314()){
 let max=7;
 for(const t of FUTURE314)if(stage>=t.unlockLimit)max=t.index;
 return max;
}
function display314(value){
 const i=Math.max(0,Math.round(n314(value)));
 if(i<NORMAL314.length)return NORMAL314[i];
 const t=FUTURE314.find(x=>x.index===i);
 return t?.label||t?.code||('T'+(i-7));
}
function canRoll314(value,stage=limitStage314()){return n314(value)<=unlockedMax314(stage)}
function profile314(stage=limitStage314()){
 const unlocked=FUTURE314.filter(x=>stage>=x.unlockLimit);
 return{
   stage,
   normalMax:7,
   normalLabel:'S',
   unlockedMax:unlockedMax314(stage),
   unlocked:unlocked.map(x=>({...x})),
   // Important: unlock means "eligible to roll", never automatic promotion.
   unlockMode:'eligibility-only'
 };
}
window.STAR_TRAIT_ARCH314={
 normal:[...NORMAL314],
 future:FUTURE314.map(x=>({...x})),
 stage:limitStage314,
 max:unlockedMax314,
 display:display314,
 canRoll:canRoll314,
 profile:profile314
};
})();