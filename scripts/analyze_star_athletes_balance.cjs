/* Numerical checks execute the current domain owners in an isolated VM.
   Story model excludes cosmetic rare boosts, match rewards and missions; it is a
   conservative strategy model, not a substitute for full-game player playtests. */
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const ROOT=path.resolve(__dirname,'..'),OUT=(process.argv[2]==='--output'?process.argv[3]:process.argv[2])||'/tmp/star-balance-numerical.json';
function runtime(seed){
 let x=seed>>>0,serial=0;const random=()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296};
 const math=Object.create(Math);math.random=random;
 const ctx={console,Math:math,Date,JSON,Number,Set,Map,URL,structuredClone,crypto:{randomUUID:()=>`sim-${seed}-${++serial}`},localStorage:{getItem:()=>null,setItem:()=>{}},setTimeout:()=>0,setInterval:()=>0,requestAnimationFrame:()=>0,addEventListener:()=>{},location:{pathname:'/game',href:'https://games.local/game'},document:{getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>({style:{},classList:{add:()=>{}},appendChild:()=>{}}),head:{appendChild:()=>{}},addEventListener:()=>{}}};ctx.window=ctx;vm.createContext(ctx);
 const source=n=>fs.readFileSync(path.join(ROOT,'star-athletes',n),'utf8');
 vm.runInContext(source('app-v094.js').split("$('breedBtn').onclick")[0]+'\nrender=function(){};',ctx);
 const exposed={225:'battleScore:score225,rivals:buildRivals225',233:'normal:applyNormalMods233,restore:restoreNormalMods233,skill:skillEffect233,acquire:acquireSkills233',263:'train:train263',267:'resolve:resolve267',273:'apply:apply273',280:'calc:calc280'};
 for(const n of [225,226,233,263,267,268,273,274,278,280]){let s=source(`patch-v${n}.js`);if(exposed[n]){const at=s.lastIndexOf('})();');s=s.slice(0,at)+`window.SIM${n}={${exposed[n]}};\n`+s.slice(at)}vm.runInContext(s,ctx,{filename:`patch-v${n}.js`});}
 return ctx;
}
function evalIn(c,code){return vm.runInContext(code,c)}
const c=runtime(321),risk={};
for(const fatigue of [0,1,2])for(const mode of ['safe','normal','high']){
 const r=evalIn(c,`(()=>{const m=monster('draco','試験');m.hidden233={growth:3,stability:3,luck:3};S.training263={intensity:{},fatigue:{[m.id]:${fatigue}}};let injured=0,sum=0;for(let i=0;i<20000;i++){const o=STAR_TRAIN263.outcome(m,'${mode}');if(o.injury)injured++;sum+=o.mul;}return{meanMultiplier:sum/20000,injuryRate:injured/20000,displayed:STAR_TRAIN263.injuryRate(m,'${mode}')};})()`);
 assert(Math.abs(r.injuryRate-r.displayed)<.012);risk[`${mode}-fatigue${fatigue}`]=r;
}
assert(risk['safe-fatigue0'].injuryRate===0);assert(risk['high-fatigue0'].meanMultiplier>risk['normal-fatigue0'].meanMultiplier);assert(risk['high-fatigue2'].meanMultiplier<risk['normal-fatigue2'].meanMultiplier);
const eventCounts=[];for(let i=0;i<500;i++){
 const q=runtime(i+800);const count=evalIn(q,`(()=>{S.generation233=1;S.nest=['draco','unil','grimo'].map((sp,i)=>monster(sp,'試験'+i));S.training263={};for(let s=1;s<=6;s++){S.season=s;for(let t=1;t<=3;t++){S.turn=t;STAR_EVENTS267.afterTraining();if(STAR_EVENTS267.pending())SIM267.resolve('b');}}return S.training263.event267.count;})()`);assert(count<=2);eventCounts.push(count);
}
const eventMean=eventCounts.reduce((a,b)=>a+b,0)/eventCounts.length;assert(eventMean>=1&&eventMean<=1.8);
const odds=evalIn(c,`(()=>{const p=monster('draco','親');p.hidden233={mutation:7,luck:7,heredity:7};p.pureLineage273=5;p.gen=9;const m={species:'draco',gen:10,skills233:['speed','agility','power','stamina'],hidden233:{mutation:7,luck:7,heredity:7}};const rows=STAR_RARE273.evaluate(m,p,p);const counts={};for(let i=0;i<50000;i++){const child=structuredClone(m);SIM273.apply(child,p,p);if(child.specialLineage273)counts[child.specialLineage273.id]=(counts[child.specialLineage273.id]||0)+1;}return{rows,counts,n:50000};})()`);
assert(odds.rows.reduce((a,x)=>a+x.chance,0)<=1);for(const row of odds.rows)assert(Math.abs((odds.counts[row.id]||0)/odds.n-row.chance)<.005);
const rep=evalIn(c,`(()=>{S.nest=['draco','unil','grimo'].map((sp,i)=>monster(sp,'代表'+i));for(const m of S.nest){for(const k in m.stats)m.stats[k]=1000;m.skills233=[];}S.rep280={selected:S.nest.map(m=>m.id),roles:Object.fromEntries(S.nest.map(m=>[m.id,'ace'])),tactic:'balance'};const plain=STAR_REP280.score().score;for(const m of S.nest)m.rarity='EX';const rare=STAR_REP280.score().score;S.nest.forEach((m,i)=>{m.skills233=[['speed','agility'],['power','stamina'],['tech','guts']][i];S.rep280.roles[m.id]=['sprint','power','technique'][i]});S.rep280.tactic='link';const skilled=STAR_REP280.score().score;return{plain,rare,skilled};})()`);
assert(rep.plain===rep.rare);assert(rep.skilled>rep.plain);
const model=[];
for(let seed=1;seed<=40;seed++){
 const q=runtime(seed),r=evalIn(q,`(()=>{S.starters=[monster('draco','始祖A'),monster('unil','始祖B')];let parents=S.starters;S.leagueRank=0;S.generation233=0;const points=[8,6,5,4,3,2,1,0],annualPoints=[10,7,5,3,2,1,0,0],events=['50m走','大玉ころがし','的当て','リレー'],leagues=[];
 for(let g=1;g<=45;g++){
  S.generation233=g;S.nest=Array.from({length:3},()=>baby(...parents));S.training263={};const totals=[0,0,0,0,0,0,0,0];let wins=0;
  for(let season=1;season<=6;season++){S.season=season;S.turn=0;S.plans=Object.fromEntries(S.nest.map((m,i)=>[m.id,['speed','power','tech'][i]]));S.schedule=events;S.assign={};
   for(let turn=0;turn<3;turn++){SIM263.train();if(STAR_EVENTS267.pending())SIM267.resolve('b');}
   const rivals=SIM225.rivals('standard',false);SIM233.normal();const pts=[0,0,0,0,0,0,0,0];
   for(const e of events){const m=[...S.nest].sort((a,b)=>SIM225.battleScore(b.stats,e)-SIM225.battleScore(a.stats,e))[0];const scores=[SIM225.battleScore(m.stats,e)*(.96+Math.random()*.08),...rivals.map(r=>SIM225.battleScore(r.stats,e)*(.95+Math.random()*.10))];scores.map((v,i)=>({v,i})).sort((a,b)=>b.v-a.v).forEach((r,pos)=>pts[r.i]+=points[pos]);}
   SIM233.restore();const rank=pts.map((v,i)=>({v,i})).sort((a,b)=>b.v-a.v).findIndex(x=>x.i===0);if(rank===0)wins++;totals[0]+=annualPoints[rank];const rest=annualPoints.filter((_,i)=>i!==rank).sort(()=>Math.random()-.5);for(let i=1;i<8;i++)totals[i]+=rest[i-1];
  }
  const annualWinner=totals[0]>=Math.max(...totals.slice(1));
  if(annualWinner){const rivals=SIM225.rivals('standard',true);const own=events.map(e=>Math.max(...S.nest.map(m=>SIM225.battleScore(SIM233.skill(m,m.stats),e))));const opp=events.map(e=>Math.max(...rivals.map(r=>SIM225.battleScore(r.stats,e))));const won=own.filter((v,i)=>v>opp[i]).length>=3;SIM233.acquire(won);if(won&&S.leagueRank<5){S.leagueRank++;leagues.push({league:S.leagueRank,generation:g})}}
  parents=[...S.nest].sort((a,b)=>Object.values(b.stats).reduce((x,y)=>x+y,0)-Object.values(a.stats).reduce((x,y)=>x+y,0)).slice(0,2);
  if(S.leagueRank===5)return{seed:${seed},galaxyGeneration:g,leagues};
 }return{seed:${seed},galaxyGeneration:null,leagues};})()`);model.push(r);
}
const reached=model.filter(x=>x.galaxyGeneration!==null),gens=reached.map(x=>x.galaxyGeneration).sort((a,b)=>a-b);
const report={runtime:fs.readFileSync(path.join(ROOT,'star-athletes-v112/index.html'),'utf8').match(/<title>STAR ATHLETES (v[0-9.]+)/)[1],risk,eventMean,eventDistribution:Object.fromEntries([0,1,2].map(n=>[n,eventCounts.filter(x=>x===n).length])),specialLineageOdds:odds,representativeRarityIndependence:rep,storyModel:{seeds:40,maxGenerations:45,galaxyReached:reached.length,medianGeneration:gens[Math.floor(gens.length/2)]||null,minGeneration:gens[0]||null,maxGeneration:gens.at(-1)||null,runs:model,limits:'Fixed four-event schedule and specialist plans; ordinary domain birth/training, no cosmetic rare stat boosts, missions or match rewards; promotion approximation uses 3 of 4 event advantages. Not observed full-game pacing.'}};
fs.writeFileSync(OUT,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({risk,eventMean,rep,storyModel:{reached:reached.length,median:report.storyModel.medianGeneration,min:report.storyModel.minGeneration,max:report.storyModel.maxGeneration}}));
