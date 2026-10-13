(()=>{
// v0.22.5: league progression independent from S1-S6 + visible rivals + promotion battles.
const SAVE225='star-athletes-save-v200';
const LEAGUES225=[
 {name:'ローカル',icon:'🏘️',base:125,reward:1.0},
 {name:'エリア',icon:'🗺️',base:230,reward:1.25},
 {name:'グランド',icon:'🏟️',base:330,reward:1.55},
 {name:'メジャー',icon:'🌟',base:460,reward:1.9},
 {name:'プラネット',icon:'🪐',base:620,reward:2.35},
 {name:'ギャラクシー',icon:'🌌',base:780,reward:3.0}
];
const PTS225=[8,6,5,4,3,2,1,0];
const TOURS225=[
 {id:'safe',icon:'🛡️',name:'格下大会',sub:'安定して結果を取りに行く',diff:-18,reward:.68,annual:.75},
 {id:'standard',icon:'🏆',name:'標準大会',sub:'現在リーグの基準大会',diff:0,reward:1,annual:1},
 {id:'challenge',icon:'🔥',name:'格上大会',sub:'強敵へ挑み、報酬と年間ptを狙う',diff:20,reward:1.6,annual:1.4}
];
const RIVAL_NAMES225=['ガルド','ミーティア','ルーチェ','ノクス','フィオ','セナ','アルト','ミラ','クロウ','ティア','レイン','ベル'];
const STAT_KEYS225=['power','speed','stamina','agility','tech','guts'];
const STAT_LABEL225={power:'ちから',speed:'スピード',stamina:'スタミナ',agility:'すばやさ',tech:'テクニック',guts:'こんじょう'};
function init225(){
 S.leagueRank=Number.isInteger(S.leagueRank)?Math.max(0,Math.min(LEAGUES225.length-1,S.leagueRank)):0;
 S.promotionPending=!!S.promotionPending;
 S.promotionFromSeason=Number(S.promotionFromSeason)||0;
 if((Number(S.season)||1)<6){
   S.promotionPending=false;
   S.promotionFromSeason=0;
   S.promotion233=false;
 }
 S.leagueWins=S.leagueWins||{};
 S.rivals225=Array.isArray(S.rivals225)?S.rivals225:[];S.meetChoice225=TOURS225.some(x=>x.id===S.meetChoice225)?S.meetChoice225:'standard';
}
function save225(){try{window.STAR_SAVE_CORE?.save?.('v225')||localStorage.setItem(SAVE225,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.warn('save225',e)}}
function league225(){init225();return LEAGUES225[S.leagueRank]||LEAGUES225[0]}
function score225(stats,e){
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
function buildRivals225(tierId='standard',promo=false,random=Math.random){
 init225();
 const target=Math.min(LEAGUES225.length-1,S.leagueRank+(promo?1:0));
 const lg=LEAGUES225[target],seasonBoost=((Number(S.season)||1)-1)*1.5,tour=promo?TOURS225[1]:(TOURS225.find(x=>x.id===tierId)||TOURS225[1]);
 return Array.from({length:7},(_,i)=>{
   const stats={};const bias=lg.base+seasonBoost+tour.diff+(i-3)*1.5;
   STAT_KEYS225.forEach(k=>stats[k]=Math.max(70,Math.round(bias+(random()*18-9))));
   const n=i===0?window.STAR_NEMESIS268?.profile?.(target):null;
   const strong=n?n.strong:STAT_KEYS225[Math.floor(random()*STAT_KEYS225.length)];stats[strong]+=10+Math.floor(random()*10);
   const r={id:'r'+i,name:RIVAL_NAMES225[(S.leagueRank*3+i+((Number(S.season)||1)-1))%RIVAL_NAMES225.length],stats,strong};
   if(i===0&&n){r.name=n.name;r.strong=n.strong;r.nemesis268=true;r.bloodline268=n.blood;r.skill268=n.skill;r.weak268=n.weak;r.stats[n.strong]+=14+target*2;r.stats[n.weak]=Math.max(70,Math.round(bias-20-target*2))}
   return r;
 });
}
function mkRivals225(promo=false){
 const rivals=buildRivals225(S.meetChoice225||'standard',promo);
 S.rivals225=rivals;S.rivalsPromo225=promo;save225();return rivals;
}
function ensureRivals225(promo=false){
 init225();
 if(!S.rivals225.length||S.rivalsPromo225!==promo)return mkRivals225(promo);
 return S.rivals225;
}
function teamPower225(){
 if(!S.nest?.length)return 0;
 return Math.round(S.nest.reduce((a,m)=>a+STAT_KEYS225.reduce((x,k)=>x+(m.stats?.[k]||0),0)/6,0)/S.nest.length);
}
function rivalPower225(r){return Math.round(STAT_KEYS225.reduce((a,k)=>a+(r.stats[k]||0),0)/STAT_KEYS225.length)}
function comparePower225(rivals){
 const ours=teamPower225();
 const theirs=Math.round(rivals.reduce((a,r)=>a+rivalPower225(r),0)/rivals.length);
 return{ours,theirs};
}
function renderLeague225(){
 init225();
 const train=document.getElementById('train');if(!train)return;
 let el=document.getElementById('league225');if(!el){el=document.createElement('div');el.id='league225';el.className='box league225';train.prepend(el)}
 const lg=league225(),max=S.leagueRank===LEAGUES225.length-1;
 const open=el.querySelector('details')?.open||false;
 el.innerHTML=`<details ${open?'open':''}><summary class="leagueHead225"><b>${lg.name}級</b><span>リーグ進行</span></summary><div class="leagueTrack225">${LEAGUES225.map((x,i)=>`<i class="${i<S.leagueRank?'done225':''} ${i===S.leagueRank?'now225':''}">${x.icon}<small>${x.name}</small></i>`).join('')}</div><div class="leagueRule225">${max?'年間1位で惑星代表戦へ。':'6シーズンの年間1位で昇格戦へ。'}</div></details>`;
 // overwrite legacy season labels so S no longer implies league class.
 document.querySelectorAll('#season119 .seasonHead119 b,.seasonHead125 b').forEach(x=>x.textContent=`S${Number(S.season)||1}/6　${lg.name}級シーズン`);
 
}

function renderRivals225(promo=false){
 const host=document.getElementById('rival');if(!host)return;
 const rivals=ensureRivals225(promo),actual=comparePower225(rivals),target=LEAGUES225[Math.min(LEAGUES225.length-1,S.leagueRank+(promo?1:0))],tour=promo?null:(TOURS225.find(x=>x.id===S.meetChoice225)||TOURS225[1]);
 let c={pct:null,label:''};
 if(!promo){
   try{
     const exact=window.STAR_SIM295?.actual?.(tour.id,S.schedule||[],rivals);
     if(exact&&Number.isFinite(Number(exact.pct)))c=exact;
   }catch(_){}
 }
 const rivalsOpen=host.querySelector('.rivalDetails225')?.open||false;
 host.innerHTML=`<div class="rivalPanel225 ${promo?'promo225':''}"><div class="rivalTop225"><div><small>${promo?'PROMOTION BATTLE':'RIVAL SCOUT'}</small><b>${promo?'🔥 昇格戦':`${tour.icon} ${tour.name}`} / ${target.name}級</b></div><div class="chance225"><span>${promo?'対戦比較':'勝利見込み'}</span><strong>${promo?'—':(c.pct==null?'計算中…':c.pct+'%')}</strong><em>${promo?'':c.label}</em></div></div><div class="powerCompare225"><span>自軍平均 <b>${actual.ours}</b></span><i></i><span>相手平均 <b>${actual.theirs}</b></span></div><details class="rivalDetails225" ${rivalsOpen?'open':''}><summary>相手の能力を見る</summary><div class="rivalCards225">${rivals.slice(0,3).map(r=>`<article><header><b>${r.name}</b><em>${STAT_LABEL225[r.strong]}型</em></header><div>${STAT_KEYS225.map(k=>`<span class="${k===r.strong?'hot225':''}">${STAT_LABEL225[k]} <b>${r.stats[k]}</b></span>`).join('')}</div></article>`).join('')}</div><small class="rivalNote225">表示能力をそのまま大会計算に使用します。</small></details></div>`;
}
function stratMul225(s){return s==='先行'?1.015:s==='温存'?1.008:s==='追込'?1.012:1}
function completedNormal225(){if(S.battle225?.done&&S.battle225.generation===(Number(S.generation233)||1)&&S.battle225.season===(Number(S.season)||1)&&S.battle225.kind!=='normal')return true;return(S.seasonHistory||[]).some(h=>h.generation===(Number(S.generation233)||1)&&Number(h.season)===(Number(S.season)||1)&&h.league===league225().name)}
// Competition presentation consumes scored results; it never rolls or changes them.
let arenaRun225={skip:false,finish:null};
function beginArena225(){arenaRun225.finish?.(true);arenaRun225={skip:false,finish:null}}
function skipArena225(){arenaRun225.skip=true;arenaRun225.finish?.(true)}
function battleKey225(kind){return [kind,Number(S.generation233)||1,Number(S.season)||1].join(':')}
function cachedBattle225(kind){
 const b=S.battle225;
 if(!b||b.key!==battleKey225(kind)||!Array.isArray(b.rows)||b.rows.length!==S.schedule?.length||!b.rows.every((r,i)=>r.e===S.schedule[i]&&S.nest?.some(m=>m.id===r.id)&&Array.isArray(r.scores)&&r.scores.length===8&&r.scores.every(v=>Number.isFinite(v)&&v>=0)))return null;
 return b;
}
function storeBattle225(kind,rows){
 S.battle225={...(S.battle225&&typeof S.battle225==='object'?S.battle225:{}),key:battleKey225(kind),kind,generation:Number(S.generation233)||1,season:Number(S.season)||1,leagueBefore:Number(S.leagueRank)||0,done:false,rows:rows.map(r=>({e:r.e,id:r.m.id,scores:r.scores,rank:r.rank}))};save225();return S.battle225;
}
function resolveBattle225(result){
 if(!S.battle225)return;S.battle225.result=result;S.battle225.done=true;S.battle225.leagueAfter=Number(S.leagueRank)||0;save225();
}
function resultFor225(b){
 const host=document.getElementById('result');if(!host||!b?.result)return;
 const r=b.result,section=document.createElement('div');section.className='notice leagueResult225';
 const title=document.createElement('b');title.textContent=r.title;section.appendChild(title);
 const main=document.createElement('strong');main.className='competitionOverall225';main.textContent='総合'+r.overall+'位 / '+r.points+'pt';section.appendChild(main);
 const list=document.createElement('div');list.className='competitionRows225';for(const x of b.rows){const span=document.createElement('span');span.textContent=x.e+'：'+x.rank+'位';list.appendChild(span)}section.appendChild(list);
 const reward=document.createElement('span');reward.className='competitionReward225';reward.textContent=r.coins!=null?'🪙 +'+r.coins+'　⭐ +'+r.fame:r.message||'';section.appendChild(reward);
 if(r.learned?.length){const n=document.createElement('div');n.className='skillLearn233';n.textContent='スキル習得：'+r.learned.join(' / ');section.appendChild(n)}
 if(r.scoutName){const n=document.createElement('div');n.className='scout117';n.textContent='大会スカウト：'+r.scoutName;section.appendChild(n)}
 if(r.kind==='normal'){const share=document.createElement('button');share.className='btn tiny';share.id='shareMeet117';share.textContent='結果を共有';share.onclick=()=>window.STAR_META117?.shareMeet?.(r.overall,r.points);section.appendChild(share)}
 host.replaceChildren(section);
}
function hydrateBattle225(){
 const b=S.battle225;if(S.promotion233||S.planetRepresentative233)return;if(!b?.done||!b.result||b.generation!==(Number(S.generation233)||1)||b.season!==(Number(S.season)||1)||b.leagueAfter!==(Number(S.leagueRank)||0))return;
 if(!document.getElementById('result')?.textContent.trim())resultFor225(b);
 const run=document.getElementById('run');if(run){run.classList.add('hide');run.disabled=true}
 if(b.kind==='normal')installNext225();else window.STAR_ANNUAL233?.nextGeneration?.();
}
window.STAR_ARENA225={begin:beginArena225,present:present225,skip:skipArena225,load:cachedBattle225,store:storeBattle225,resolve:resolveBattle225,result:resultFor225,hydrate:hydrateBattle225,locked:()=>!!S.battle225&&!S.battle225.done&&S.battle225.generation===(Number(S.generation233)||1)&&S.battle225.season===(Number(S.season)||1)};
function sceneKind225(event){return event==='的当て'?'precision':['大玉ころがし','坂道かけあがり','綱引き'].includes(event)?'power':'race'}
function present225({event,athlete,scores,rank,index,total}){
 const host=document.getElementById('events');if(!host)return Promise.resolve();
 const kind=sceneKind225(event),reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 host.innerHTML=`<section class="arena225" data-kind="${kind}"><header><div><b></b><small></small></div><span>${index+1}/${total}</span></header><div class="arenaStage225"><canvas aria-hidden="true"></canvas><div class="arenaHero225">${avatar(athlete)}</div></div><div class="arenaResult225" aria-live="polite"><span></span><strong></strong></div><button type="button" class="arenaSkip225">結果へ</button></section>`;
 const el=host.firstElementChild,canvas=el.querySelector('canvas'),hero=el.querySelector('.arenaHero225'),ctx=canvas.getContext('2d');
 el.querySelector('header b').textContent=event;el.querySelector('header small').textContent=athlete.name;
 el.querySelector('.arenaSkip225').onclick=skipArena225;
 const w=Math.max(240,el.querySelector('.arenaStage225').clientWidth),h=240,dpr=Math.min(2,window.devicePixelRatio||1);
 canvas.width=Math.round(w*dpr);canvas.height=h*dpr;ctx.scale(dpr,dpr);
 window.paintSpecies?.();
 const scenery=new Image();scenery.src='../star-athletes/assets/training-ground.png?v=3408';
 const max=Math.max(1,...scores),relative=scores.map(v=>Math.max(0,Math.min(1,v/max))),rival=relative.slice(1),top=Math.max(...rival);
 function comet(x,y,size,color){ctx.fillStyle=color;ctx.shadowColor=color;ctx.shadowBlur=12;ctx.beginPath();ctx.arc(x,y,size,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0}
 function draw(p){
  ctx.clearRect(0,0,w,h);const bg=ctx.createLinearGradient(0,0,0,h);bg.addColorStop(0,'#93cce9');bg.addColorStop(.54,'#dceadb');bg.addColorStop(1,'#d79464');ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
  if(scenery.complete&&scenery.naturalWidth){const sw=scenery.naturalWidth,sh=scenery.naturalHeight,ratio=Math.max(w/sw,h/sh);ctx.drawImage(scenery,(w-sw*ratio)/2,(h-sh*ratio)/2,sw*ratio,sh*ratio)}
  ctx.fillStyle=kind==='precision'?'#f6ebd1c9':kind==='power'?'#a7c57ea8':'#db8b6699';ctx.beginPath();ctx.ellipse(w*.5,h-30,w*.65,74,0,0,Math.PI*2);ctx.fill();
  const own=relative[0]*p,leader=top*p;
  if(kind==='race'){
   for(let i=0;i<4;i++){ctx.strokeStyle=i===3?'#fff6ddb0':'#fff5de88';ctx.beginPath();ctx.moveTo(0,128+i*25);ctx.lineTo(w,115+i*25);ctx.stroke()}
   const finish=w-18;for(let j=0;j<8;j++){ctx.fillStyle=j%2?'#29485a':'#fff9e4';ctx.fillRect(finish,117+j*11,5,11)}
   rival.forEach((v,i)=>comet(22+(w-70)*v*p,78+i*8,i===rival.indexOf(top)?6:3.5,i===rival.indexOf(top)?'#255fbb':'#4b7f9c'));
   hero.style.left=(8+(w-105)*own)+'px';hero.style.top=(h-123-Math.abs(Math.sin(p*22))*4)+'px';
   ctx.fillStyle='#254b64';ctx.font='10px "Stellar Text"';ctx.fillText('FINISH',w-60,104);
  }else if(kind==='power'){
   ctx.strokeStyle='#546d4499';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,h-36);ctx.lineTo(w,h-55);ctx.stroke();
   const heroX=12+(w-155)*own;
   if(event==='綱引き'){
    const x=45-own*25,y=h-67,knot=w*.52+(leader-own)*45;hero.style.left=x+'px';hero.style.top=(h-129)+'px';ctx.strokeStyle='#d6bd88';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x+57,y);ctx.quadraticCurveTo(knot,y+7,w-12,y);ctx.stroke();comet(knot,y+3,6,'#e1cd96');
   }else if(event==='坂道かけあがり'){
    ctx.strokeStyle='#69583fb0';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,h-18);ctx.lineTo(w,h-77);ctx.stroke();hero.style.left=heroX+'px';hero.style.top=(h-115-59*own)+'px';
   }else{
    const rockX=112+(w-155)*own,rockY=h-77;ctx.save();ctx.translate(rockX,rockY);ctx.rotate(p*2.6);ctx.fillStyle='#b18f70';ctx.strokeStyle='#f1dac0';ctx.lineWidth=2;ctx.beginPath();for(let j=0;j<7;j++){const a=j*Math.PI*2/7,rad=j%2?28:34;const x=Math.cos(a)*rad,y=Math.sin(a)*rad;j?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.closePath();ctx.fill();ctx.stroke();ctx.strokeStyle='#f8e5c299';ctx.beginPath();ctx.moveTo(-20,-18);ctx.lineTo(4,10);ctx.lineTo(22,-15);ctx.moveTo(4,10);ctx.lineTo(-9,29);ctx.stroke();ctx.restore();hero.style.left=heroX+'px';hero.style.top=(h-134+Math.sin(p*24)*2)+'px';
   }
   rival.forEach((v,i)=>comet(20+(w-45)*v*p,72+i*6,3,i===rival.indexOf(top)?'#255fbb':'#4b7f9c'));
   ctx.strokeStyle='#74583e99';ctx.setLineDash([3,5]);ctx.beginPath();ctx.moveTo(w-28,104);ctx.lineTo(w-28,h-42);ctx.stroke();ctx.setLineDash([]);
  }else{
   const x=w*.73,y=89;for(let j=4;j>0;j--){ctx.fillStyle=j%2?'#fff3db':'#c66655';ctx.strokeStyle='#78544b99';ctx.beginPath();ctx.arc(x,y,j*15,0,Math.PI*2);ctx.fill();ctx.stroke()}comet(x,y,4,'#eab540');
   rival.forEach((v,i)=>{if(p>.48){const a=(i+1)*2.399,err=(1-v)*62;comet(x+Math.cos(a)*err,y+Math.sin(a)*err,2.5,'#376cadb0')}});
   const err=(1-relative[0])*62,endX=x-Math.cos(.65)*err,endY=y+Math.sin(.65)*err;
   const shot=Math.min(1,Math.max(0,(p-.12)/.65)),sx=58,sy=h-83,boltX=sx+(endX-sx)*shot,boltY=sy+(endY-sy)*shot-Math.sin(shot*Math.PI)*26;
   if(p>.12){ctx.strokeStyle='#a7622ccc';ctx.setLineDash([3,5]);ctx.beginPath();ctx.moveTo(sx,sy);ctx.quadraticCurveTo(w*.36,35,endX,endY);ctx.stroke();ctx.setLineDash([]);comet(boltX,boltY,4,'#eb952a')}
   hero.style.left='4px';hero.style.top=(h-112)+'px';
  }
  ctx.strokeStyle='#24516b30';ctx.lineWidth=1;ctx.strokeRect(.5,.5,w-1,h-1);el.dataset.progress225=p.toFixed(2);
 }
 draw(0);
 return new Promise(resolve=>{
  let raf=0,done=false,resolved=false,hold=0;const run=arenaRun225,start=performance.now();
  function end(){if(resolved)return;resolved=true;clearTimeout(hold);if(run.finish===finish)run.finish=null;resolve()}
  function finish(immediate=false){if(done){if(immediate)end();return}done=true;cancelAnimationFrame(raf);clearTimeout(timer);draw(1);el.dataset.finished225='true';el.querySelector('.arenaResult225 span').textContent='戦力 '+Math.round(scores[0]);el.querySelector('.arenaResult225 strong').textContent=rank+'位';el.querySelector('.arenaSkip225').hidden=true;if(immediate||run.skip||reduced||document.hidden)end();else hold=setTimeout(end,300)}
  function frame(now){if(done)return;const p=Math.min(1,(now-start)/1350);draw(p);if(p>=1)finish();else raf=requestAnimationFrame(frame)}
  const timer=setTimeout(finish,1550);run.finish=finish;
  if(run.skip||reduced||document.hidden)finish();else raf=requestAnimationFrame(frame);
 });
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)arenaRun225.finish?.(true)});


async function runBattle225(promo=false){
 init225();const run=document.getElementById('run');if(!run||run.disabled||(!promo&&completedNormal225())||!S.nest?.length||Number(S.turn)<3||S.needsBreeding||window.STAR_EVENTS267?.pending?.())return;
 if(promo&&S.leagueRank===0){S.localPromotionEnteredCap=true;save225();}
 const rivals=ensureRivals225(promo);run.disabled=true;run.textContent=promo?'昇格戦中…':'大会進行中…';
 const events=Array.isArray(S.schedule)&&S.schedule.length?S.schedule:['50m走','障害物競走','的当て','リレー'];
 const totalPts=[0,0,0,0,0,0,0,0],rows=[],kind=promo?'legacy-promotion':'normal',cached=cachedBattle225(kind);
 try{
  if(cached){for(const x of cached.rows){const m=S.nest.find(m=>m.id===x.id),order=x.scores.map((v,idx)=>({v,idx})).sort((a,b)=>b.v-a.v);order.forEach((r,rank)=>totalPts[r.idx]+=PTS225[rank]||0);rows.push({...x,m,score:Math.round(x.scores[0]),top:Math.round(order[0].v)})}}
  else{for(let i=0;i<events.length;i++){
   const e=events[i],m=S.nest.find(x=>x.id===S.assign?.[i])||S.nest.slice().sort((a,b)=>score225(b.stats,e)-score225(a.stats,e))[0];
   const scores=[score225(m.stats,e)*stratMul225(S.strat?.[i]||'バランス')*(.96+Math.random()*.08),...rivals.map(r=>score225(r.stats,e)*(.95+Math.random()*.10))];
   const order=scores.map((v,idx)=>({v,idx})).sort((a,b)=>b.v-a.v);order.forEach((x,rank)=>totalPts[x.idx]+=PTS225[rank]||0);
   const rank=order.findIndex(x=>x.idx===0)+1;rows.push({e,m,rank,scores,score:Math.round(scores[0]),top:Math.round(order[0].v)});
  }}
 }finally{window.STAR_ANNUAL233?.finishNormal?.()}
 if(!cached)storeBattle225(kind,rows);
 beginArena225();
 for(let i=0;i<rows.length;i++){const row=rows[i];await present225({event:row.e,athlete:row.m,scores:row.scores,rank:row.rank,index:i,total:rows.length})}
 const final=totalPts.map((v,idx)=>({v,idx})).sort((a,b)=>b.v-a.v),overall=final.findIndex(x=>x.idx===0)+1;
 const lg=league225(),result=document.getElementById('result'),tour=TOURS225.find(x=>x.id===S.meetChoice225)||TOURS225[1];
 if(promo){
   const won=overall===1;
   if(won&&S.leagueRank<LEAGUES225.length-1){S.leagueRank++;S.leagueWins[LEAGUES225[S.leagueRank].name]=S.leagueWins[LEAGUES225[S.leagueRank].name]||0;}
   S.promotionPending=false;S.rivals225=[];S.rivalsPromo225=false;
   if(result)result.innerHTML=`<div class="notice leagueResult225 ${won?'win225':'lose225'}"><b>🔥 ${lg.name}級 → ${LEAGUES225[Math.min(S.leagueRank+(won?0:1),LEAGUES225.length-1)].name}級 昇格戦</b><br>${rows.map(x=>`${x.e}：${x.rank}位`).join('<br>')}<hr><strong>${won?`🎉 昇格成功！ ${league225().name}級へ`:'昇格失敗… 次の優勝で再挑戦'}</strong><br>総合${overall}位 / ${totalPts[0]}pt</div>`;
   window.STAR_VISUAL243?.react?.(won);save225();installNext225();run.classList.add('hide');run.disabled=false;return;
 }
 if(overall===1){S.wins=(S.wins||0)+1;S.leagueWins[lg.name]=(S.leagueWins[lg.name]||0)+1;if(S.leagueRank===0)S.localFirstWinCap=true;}S.promotionPending=false;S.promotionFromSeason=0;
 const coin=Math.round((overall===1?1000:overall===2?700:overall===3?450:250)*lg.reward*tour.reward),fame=Math.round((overall===1?120:overall===2?80:overall===3?50:25)*lg.reward*tour.reward);S.coins=(S.coins||0)+coin;S.fame=(S.fame||0)+fame;
 S.seasonHistory=S.seasonHistory||[];S.seasonHistory.push({generation:Number(S.generation233)||1,season:Number(S.season)||1,league:lg.name,name:tour.name,meetChoice:tour.id,annualMul:tour.annual,overall,points:totalPts[0],coins:coin,fame});
 let scout117=null;try{scout117=window.STAR_META117?.afterMeet?.(overall,totalPts[0])||null}catch(_){}
 resolveBattle225({kind:'normal',title:tour.name+' / '+lg.name+'級・S'+(Number(S.season)||1),overall,points:totalPts[0],coins:coin,fame,scoutName:scout117?.name||''});resultFor225(S.battle225);
 window.STAR_NEMESIS268?.record?.({rank:S.leagueRank,season:Number(S.season)||1,generation:Number(S.generation233)||1,won:overall===1,tier:tour.id,rivals});
 window.STAR_VISUAL243?.react?.(overall===1);save225();run.classList.add('hide');run.disabled=false;installNext225();
}
function nextSeason225(){
 const cur=Math.max(1,Math.min(6,Number(S.season)||1));
 const next=cur<6?cur+1:1;
 S.season=next;S.turn=0;S.plans={};S.assign={};S.strat={};S.schedule=[];S.seasonMeet=null;S.rivals225=[];S.rivalsPromo225=false;S.meetChoice225='standard';S.meetChoiceSeason125=0;S.meetUiVersion290=0;
 try{if(typeof makeSchedule==='function')makeSchedule()}catch(_){}
 save225();location.replace(location.pathname+'?season='+next+'&t='+Date.now());
}
function beginPromo225(){
 S.rivals225=[];S.rivalsPromo225=true;mkRivals225(true);save225();
 const run=document.getElementById('run');if(run){run.classList.remove('hide');run.disabled=false;run.textContent='🔥 昇格戦スタート';run.onclick=()=>runBattle225(true)}
 document.getElementById('result').innerHTML='';document.getElementById('events').innerHTML='';renderRivals225(true);
}
function installNext225(){
 const p=document.getElementById('meetNext303')||document.querySelector('#meet .box p');if(!p)return;
 let b=document.getElementById('next225');if(!b){b=document.createElement('button');b.id='next225';b.type='button';b.className='btn yl';p.appendChild(b)}
 else if(b.parentElement!==p)p.appendChild(b);
 b.style.display='inline-block';
 b.textContent=(Number(S.season)||1)<6?'次シーズンへ':'年間結果へ';b.onclick=nextSeason225
}
function restoreNext225(){
 const result=document.getElementById('result'),season=Math.max(1,Math.min(6,Number(S?.season)||1));
 if(!result?.textContent?.trim()||S?.promotion233||season>=6)return;
 if(/総合\d+位|昇格/.test(result.textContent))installNext225();
}
function wire225(){
 init225();renderLeague225();hydrateBattle225();
 const run=document.getElementById('run');if(run&&!S.promotion233){run.onclick=()=>runBattle225(false)}
 if(!S.promotion233&&!S.planetRepresentative233&&!document.getElementById('meet')?.classList.contains('hide'))renderRivals225(false);
 if(document.getElementById('result')?.textContent.trim())restoreNext225();
}

window.STAR_TOUR225={
 tiers:TOURS225,completed:completedNormal225,renderRivals:renderRivals225,
 generateRivals:(promo=false)=>mkRivals225(!!promo),
 buildRivals:(tier='standard',promo=false,random=Math.random)=>buildRivals225(tier,!!promo,random),
 ensureRivals:(promo=false)=>ensureRivals225(!!promo),
 ensureNext:restoreNext225,
 score:score225,
 comparePower:comparePower225
};
const css=document.createElement('style');css.textContent=`
.league225{background:linear-gradient(145deg,#0e1b31,#142a49)!important;color:#fff;border:1px solid #65d8ff55!important}.leagueHead225{display:flex;justify-content:space-between;align-items:center}.leagueHead225 small{display:block;font-size:7px;color:#72dcff;font-weight:1000;letter-spacing:.14em}.leagueHead225 b{font-size:16px}.leagueHead225>span{background:#ffffff17;border:1px solid #ffffff22;border-radius:999px;padding:5px 8px;font-size:9px;font-weight:1000}.leagueTrack225{display:grid;grid-template-columns:repeat(6,1fr);gap:3px;margin:9px 0}.leagueTrack225 i{font-style:normal;text-align:center;opacity:.35;font-size:15px}.leagueTrack225 i small{display:block;font-size:5px}.leagueTrack225 .done225,.leagueTrack225 .now225{opacity:1}.leagueTrack225 .now225{background:#ffffff15;border-radius:8px;padding:3px}.leagueRule225{font-size:8px;color:#dcecff}.rivalPanel225{margin:8px 0;padding:10px;border:2px solid #273d5d;border-radius:15px;background:linear-gradient(145deg,#f8fbff,#eaf3ff);color:#172033}.rivalPanel225.promo225{border-color:#e5a800;background:linear-gradient(145deg,#fff9df,#fff1b9)}.rivalTop225{display:flex;justify-content:space-between;gap:8px}.rivalTop225 small{display:block;font-size:7px;letter-spacing:.14em;color:#607998}.rivalTop225 b{font-size:13px}.chance225{text-align:right}.chance225 span,.chance225 em{display:block;font-size:6px;font-style:normal}.chance225 strong{font-size:20px}.powerCompare225{display:grid;grid-template-columns:1fr 34px 1fr;align-items:center;gap:6px;margin:8px 0;font-size:8px}.powerCompare225 i{height:4px;background:linear-gradient(90deg,#2ca8ff,#ff774d);border-radius:99px}.powerCompare225 span:last-child{text-align:right}.rivalCards225{display:grid;grid-template-columns:repeat(3,1fr);gap:5px}.rivalCards225 article{border:1px solid #bac9db;border-radius:10px;background:#fff;padding:6px}.rivalCards225 header{display:flex;justify-content:space-between;align-items:center;gap:3px}.rivalCards225 header b{font-size:9px}.rivalCards225 header em{font-size:5px;font-style:normal;background:#fff0b3;border-radius:999px;padding:2px 4px}.rivalCards225 article>div{margin-top:4px}.rivalCards225 article span{display:flex;justify-content:space-between;font-size:5.5px;border-top:1px dotted #d4deea;padding:1px}.rivalCards225 .hot225{background:#fff1dd;color:#a94900;font-weight:1000}.rivalNote225{display:block;margin-top:6px;color:#65758a;font-size:6px}.tourSelect225{border:2px solid #496984!important;background:linear-gradient(145deg,#f8fbff,#edf6ff)!important}.tourHead225{display:flex;justify-content:space-between;align-items:center}.tourHead225 small{display:block;font-size:6px;color:#63798e;font-weight:1000;letter-spacing:.12em}.tourHead225 b{font-size:13px}.tourHead225>span{font-size:7px;border:1px solid #9aabba;border-radius:999px;padding:4px 7px;background:#fff}.tourSelect225>p{margin:7px 0;font-size:7px;color:#607182}.tourChoices225{display:grid;gap:6px}.tourChoices225 button{border:1px solid #b7c6d3;border-radius:10px;background:#fff;padding:8px;text-align:left;color:#23364a}.tourChoices225 button.on225{border:2px solid #2f79ad;background:#eef8ff}.tourChoices225 header{display:flex;justify-content:space-between;align-items:center}.tourChoices225 header b{font-size:9px}.tourChoices225 header strong{font-size:13px}.tourChoices225 small{display:block;font-size:6px;color:#687a8b}.tourChoices225 button>div{display:flex;gap:4px;flex-wrap:wrap;margin-top:5px}.tourChoices225 button>div span{font-size:6px;border-radius:999px;padding:3px 5px;background:#eef2f5}.tourNote225{display:block;margin-top:6px;font-size:6px;color:#697b89}
.battleEvent225{padding:12px;border-radius:12px;background:#13233c;color:#fff;text-align:center}.battleEvent225 b,.battleEvent225 span,.battleEvent225 small{display:block}.battleEvent225 strong{display:block;font-size:26px;color:#ffe36e}.leagueResult225 em{font-style:normal;color:#ffd65a;font-weight:1000}.leagueResult225.win225 strong{color:#69f2a9}.leagueResult225.lose225 strong{color:#ffb184}
`;document.head.appendChild(css);
document.addEventListener('click',e=>{if(e.target?.closest?.('.tab,#run,#next225,#annualNext233'))setTimeout(restoreNext225,0)},true);
setTimeout(wire225,0);
})();
