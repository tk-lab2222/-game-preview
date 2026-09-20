(()=>{
// v0.31.8: tournament win chance is estimated by deterministic Monte Carlo using the real battle rules.
const KEYS295=['power','speed','stamina','agility','tech','guts'];
const BASES295=[102,120,140,163,190,222];
const DIFF295={safe:-18,standard:0,challenge:20};
const PTS295=[8,6,5,4,3,2,1,0];
const cache295=new Map();
function score295(stats,e){
 const s=stats||{};
 return e==='50m走'?(s.speed||0)*.5+(s.agility||0)*.3+(s.tech||0)*.2:
 e==='障害物競走'?(s.tech||0)*.4+(s.agility||0)*.35+(s.speed||0)*.15+(s.guts||0)*.1:
 e==='大玉ころがし'?(s.power||0)*.48+(s.stamina||0)*.3+(s.guts||0)*.22:
 e==='坂道かけあがり'?(s.power||0)*.35+(s.stamina||0)*.35+(s.guts||0)*.3:
 e==='10000m走'?(s.stamina||0)*.45+(s.guts||0)*.3+(s.speed||0)*.15+(s.tech||0)*.1:
 e==='的当て'?(s.tech||0)*.55+(s.power||0)*.2+(s.agility||0)*.15+(s.guts||0)*.1:
 e==='リレー'?(s.speed||0)*.45+(s.tech||0)*.2+(s.agility||0)*.2+(s.guts||0)*.15:
 (s.power||0)*.45+(s.stamina||0)*.3+(s.guts||0)*.25;
}
function strat295(s){return s==='先行'?1.015:s==='温存'?1.008:s==='追込'?1.012:1}
function hash295(str){let h=2166136261>>>0;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rng295(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function label295(p){return p>=72?'かなり有利':p>=58?'やや有利':p>=42?'互角':p>=28?'やや不利':'強敵注意'}
function signature295(tier){
 const nest=(Array.isArray(S?.nest)?S.nest:[]).map(m=>[m.id,...KEYS295.map(k=>Number(m?.stats?.[k])||0)]);
 return JSON.stringify([tier,Number(S?.leagueRank)||0,Number(S?.season)||1,S?.schedule||[],S?.assign||{},S?.strat||{},nest]);
}
function athlete295(e,i){
 const nest=Array.isArray(S?.nest)?S.nest:[];
 return nest.find(x=>x.id===S?.assign?.[i])||nest.slice().sort((a,b)=>score295(b?.stats,e)-score295(a?.stats,e))[0]||null;
}
function chance295(tier='standard'){
 if(!['safe','standard','challenge'].includes(tier))tier='standard';
 const sig=signature295(tier);
 if(cache295.has(sig))return cache295.get(sig);
 const nest=Array.isArray(S?.nest)?S.nest:[];
 if(!nest.length){const z={ours:0,theirs:0,pct:5,label:'強敵注意',simulations:0};cache295.set(sig,z);return z}
 const rank=Math.max(0,Math.min(5,Number(S?.leagueRank)||0));
 const season=Math.max(1,Number(S?.season)||1);
 const base=(BASES295[rank]||102)+(season-1)*1.5+(DIFF295[tier]||0);
 const events=Array.isArray(S?.schedule)&&S.schedule.length?S.schedule:['50m走','障害物競走','的当て','リレー'];
 const rand=rng295(hash295(sig));
 const RUNS=500;
 let wins=0,rivalAvgTotal=0;
 for(let n=0;n<RUNS;n++){
   const rivals=[];
   for(let r=0;r<7;r++){
     const stats={},bias=base+(r-3)*1.5;
     KEYS295.forEach(k=>stats[k]=Math.max(70,Math.round(bias+(rand()*18-9))));
     const strong=KEYS295[Math.floor(rand()*KEYS295.length)];
     stats[strong]+=10+Math.floor(rand()*10);
     rivals.push(stats);
   }
   rivalAvgTotal+=rivals.reduce((sum,r)=>sum+KEYS295.reduce((a,k)=>a+(r[k]||0),0)/KEYS295.length,0)/rivals.length;
   const total=[0,0,0,0,0,0,0,0];
   for(let i=0;i<events.length;i++){
     const e=events[i],m=athlete295(e,i);if(!m)continue;
     const scores=[score295(m.stats,e)*strat295(S?.strat?.[i]||'バランス')*(.96+rand()*.08)];
     rivals.forEach(r=>scores.push(score295(r,e)*(.95+rand()*.10)));
     const order=scores.map((v,idx)=>({v,idx})).sort((a,b)=>b.v-a.v);
     order.forEach((x,pos)=>total[x.idx]+=PTS295[pos]||0);
   }
   const final=total.map((v,idx)=>({v,idx})).sort((a,b)=>b.v-a.v);
   if(final.findIndex(x=>x.idx===0)===0)wins++;
 }
 const ours=Math.round(nest.reduce((sum,m)=>sum+KEYS295.reduce((a,k)=>a+(Number(m?.stats?.[k])||0),0)/KEYS295.length,0)/nest.length);
 const theirs=Math.round(rivalAvgTotal/RUNS);
 const pct=Math.max(1,Math.min(99,Math.round(wins/RUNS*100)));
 const out={ours,theirs,pct,label:label295(pct),simulations:RUNS};
 cache295.set(sig,out);
 if(cache295.size>30){const first=cache295.keys().next().value;cache295.delete(first)}
 return out;
}
window.STAR_TOUR225=window.STAR_TOUR225||{};
window.STAR_TOUR225.chance=chance295;
function sync295(){
 try{window.STAR_CHANCE292?.sync?.()}catch(_){}
 document.querySelectorAll('.chance290').forEach(el=>{const m=el.textContent.match(/(\d+)%/);if(m)el.textContent='推定勝率 '+m[1]+'%'});
 const meet=document.querySelector('#rival .chance225 span');if(meet)meet.textContent='推定勝率';
}
try{
 const prev=render;
 render=function(){const out=prev();[0,30,100].forEach(ms=>setTimeout(sync295,ms));return out};
}catch(e){console.warn('render295',e)}
[0,80,250].forEach(ms=>setTimeout(sync295,ms));
window.STAR_SIM295={chance:chance295,clear:()=>cache295.clear()};
})();