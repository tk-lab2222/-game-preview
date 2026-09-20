(()=>{
// v0.22.5: league progression independent from S1-S6 + visible rivals + promotion battles.
const SAVE225='star-athletes-save-v200';
const LEAGUES225=[
 {name:'ローカル',icon:'🏘️',base:102,reward:1.0},
 {name:'エリア',icon:'🗺️',base:120,reward:1.25},
 {name:'グランド',icon:'🏟️',base:140,reward:1.55},
 {name:'メジャー',icon:'🌟',base:163,reward:1.9},
 {name:'プラネット',icon:'🪐',base:190,reward:2.35},
 {name:'ギャラクシー',icon:'🌌',base:222,reward:3.0}
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
 S.leagueWins=S.leagueWins||{};
 S.rivals225=Array.isArray(S.rivals225)?S.rivals225:[];S.meetChoice225=TOURS225.some(x=>x.id===S.meetChoice225)?S.meetChoice225:'standard';
}
function save225(){try{localStorage.setItem(SAVE225,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.warn('save225',e)}}
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
function buildRivals225(tierId='standard',promo=false){
 init225();
 const target=Math.min(LEAGUES225.length-1,S.leagueRank+(promo?1:0));
 const lg=LEAGUES225[target],seasonBoost=((Number(S.season)||1)-1)*1.5,tour=promo?TOURS225[1]:(TOURS225.find(x=>x.id===tierId)||TOURS225[1]);
 return Array.from({length:7},(_,i)=>{
   const stats={};const bias=lg.base+seasonBoost+tour.diff+(i-3)*1.5;
   STAT_KEYS225.forEach(k=>stats[k]=Math.max(70,Math.round(bias+(Math.random()*18-9))));
   const strong=STAT_KEYS225[Math.floor(Math.random()*STAT_KEYS225.length)];stats[strong]+=10+Math.floor(Math.random()*10);
   return{id:'r'+i,name:RIVAL_NAMES225[(S.leagueRank*3+i+((Number(S.season)||1)-1))%RIVAL_NAMES225.length],stats,strong};
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
 el.innerHTML=`<div class="leagueHead225"><div><small>LEAGUE CLASS</small><b>${lg.icon} ${lg.name}級</b></div><span>S${Number(S.season)||1}/6</span></div><div class="leagueTrack225">${LEAGUES225.map((x,i)=>`<i class="${i<S.leagueRank?'done225':''} ${i===S.leagueRank?'now225':''}">${x.icon}<small>${x.name}</small></i>`).join('')}</div><div class="leagueRule225">${max?'最高ランク。ここからはギャラクシー級で勝利数を伸ばそう。':'S1〜S6の年間ランキング1位 → 昇格戦へ'}</div>`;
 // overwrite legacy season labels so S no longer implies league class.
 document.querySelectorAll('#season119 .seasonHead119 b,.seasonHead125 b').forEach(x=>x.textContent=`S${Number(S.season)||1}/6　${lg.name}級シーズン`);
 const title=train.querySelector('.box h3');
}

function renderTournamentSelect225(){document.getElementById('tourSelect225')?.remove();}
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
 host.innerHTML=`<div class="rivalPanel225 ${promo?'promo225':''}"><div class="rivalTop225"><div><small>${promo?'PROMOTION BATTLE':'RIVAL SCOUT'}</small><b>${promo?'🔥 昇格戦':`${tour.icon} ${tour.name}`} / ${target.name}級</b></div><div class="chance225"><span>${promo?'対戦比較':'勝利見込み'}</span><strong>${promo?'—':(c.pct==null?'計算中…':c.pct+'%')}</strong><em>${promo?'':c.label}</em></div></div><div class="powerCompare225"><span>自軍平均 <b>${actual.ours}</b></span><i></i><span>相手平均 <b>${actual.theirs}</b></span></div><div class="rivalCards225">${rivals.slice(0,3).map(r=>`<article><header><b>${r.name}</b><em>${STAT_LABEL225[r.strong]}型</em></header><div>${STAT_KEYS225.map(k=>`<span class="${k===r.strong?'hot225':''}">${STAT_LABEL225[k]} <b>${r.stats[k]}</b></span>`).join('')}</div></article>`).join('')}</div><small class="rivalNote225">※表示されている能力値をそのまま大会計算に使用します。</small></div>`;
}
function stratMul225(s){return s==='先行'?1.015:s==='温存'?1.008:s==='追込'?1.012:1}
async function runBattle225(promo=false){
 init225();const run=document.getElementById('run');if(!run||run.disabled)return;
 const rivals=ensureRivals225(promo);run.disabled=true;run.textContent=promo?'昇格戦中…':'大会進行中…';
 const events=Array.isArray(S.schedule)&&S.schedule.length?S.schedule:['50m走','障害物競走','的当て','リレー'];
 const totalPts=[0,0,0,0,0,0,0,0],rows=[];
 for(let i=0;i<events.length;i++){
   const e=events[i],m=S.nest.find(x=>x.id===S.assign?.[i])||S.nest.slice().sort((a,b)=>score225(b.stats,e)-score225(a.stats,e))[0];
   const scores=[score225(m.stats,e)*stratMul225(S.strat?.[i]||'バランス')*(.96+Math.random()*.08),...rivals.map(r=>score225(r.stats,e)*(.95+Math.random()*.10))];
   const order=scores.map((v,idx)=>({v,idx})).sort((a,b)=>b.v-a.v);order.forEach((x,rank)=>totalPts[x.idx]+=PTS225[rank]||0);
   const rank=order.findIndex(x=>x.idx===0)+1;rows.push({e,m,rank,score:Math.round(scores[0]),top:Math.round(order[0].v)});
   const ev=document.getElementById('events');if(ev)ev.innerHTML=`<div class="battleEvent225"><b>${e}</b><span>${m.name}</span><strong>${rank}位</strong><small>戦力 ${Math.round(scores[0])} / トップ ${Math.round(order[0].v)}</small></div>`;
   await new Promise(r=>setTimeout(r,320));
 }
 const final=totalPts.map((v,idx)=>({v,idx})).sort((a,b)=>b.v-a.v),overall=final.findIndex(x=>x.idx===0)+1;
 const lg=league225(),result=document.getElementById('result'),tour=TOURS225.find(x=>x.id===S.meetChoice225)||TOURS225[1];
 if(promo){
   const won=overall===1;
   if(won&&S.leagueRank<LEAGUES225.length-1){S.leagueRank++;S.leagueWins[LEAGUES225[S.leagueRank].name]=S.leagueWins[LEAGUES225[S.leagueRank].name]||0;}
   S.promotionPending=false;S.rivals225=[];S.rivalsPromo225=false;
   if(result)result.innerHTML=`<div class="notice leagueResult225 ${won?'win225':'lose225'}"><b>🔥 ${lg.name}級 → ${LEAGUES225[Math.min(S.leagueRank+(won?0:1),LEAGUES225.length-1)].name}級 昇格戦</b><br>${rows.map(x=>`${x.e}：${x.rank}位`).join('<br>')}<hr><strong>${won?`🎉 昇格成功！ ${league225().name}級へ`:'昇格失敗… 次の優勝で再挑戦'}</strong><br>総合${overall}位 / ${totalPts[0]}pt</div>`;
   save225();installNext225();run.classList.add('hide');run.disabled=false;return;
 }
 if(overall===1){S.wins=(S.wins||0)+1;S.leagueWins[lg.name]=(S.leagueWins[lg.name]||0)+1;if(S.leagueRank===0)S.localFirstWinCap=true;}S.promotionPending=false;S.promotionFromSeason=0;
 const coin=Math.round((overall===1?1000:overall===2?700:overall===3?450:250)*lg.reward*tour.reward),fame=Math.round((overall===1?120:overall===2?80:overall===3?50:25)*lg.reward*tour.reward);S.coins=(S.coins||0)+coin;S.fame=(S.fame||0)+fame;
 S.seasonHistory=S.seasonHistory||[];S.seasonHistory.push({season:Number(S.season)||1,league:lg.name,name:tour.name,meetChoice:tour.id,annualMul:tour.annual,overall,points:totalPts[0],coins:coin,fame});
 if(result)result.innerHTML=`<div class="notice leagueResult225"><b>${tour.icon} ${tour.name} / ${lg.icon} ${lg.name}級・S${Number(S.season)||1}</b><br>${rows.map(x=>`${x.e}：${x.rank}位`).join('<br>')}<hr><strong>総合${overall}位 / ${totalPts[0]}pt</strong><br>🪙 +${coin}　⭐名声 +${fame}</div>`;
 save225();run.classList.add('hide');run.disabled=false;installNext225();
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
 document.getElementById('result').innerHTML='';document.getElementById('events').innerHTML='';renderRivals225(true);hideLegacyNext225();
}
function hideLegacyNext225(){['next','next217','next216','next215'].forEach(id=>{const x=document.getElementById(id);if(x)x.style.display='none'})}
function installNext225(){
 hideLegacyNext225();const p=document.querySelector('#meet .box p');if(!p)return;
 let b=document.getElementById('next225');if(!b){b=document.createElement('button');b.id='next225';b.type='button';b.className='btn yl';p.appendChild(b)}
 b.style.display='inline-block';
 b.textContent=(Number(S.season)||1)<6?'次シーズンへ':'年間結果へ';b.onclick=nextSeason225
}
function wire225(){
 init225();renderLeague225();renderTournamentSelect225();
 const run=document.getElementById('run');if(run&&!S.promotion233){run.onclick=()=>runBattle225(false)}
 const meetTab=document.querySelector('.tab[data-v="meet"]');if(meetTab&&!meetTab.dataset.rival225){meetTab.dataset.rival225='1';meetTab.addEventListener('click',()=>setTimeout(()=>renderRivals225(false),0))}
 const to=document.getElementById('toMeet');if(to&&!to.dataset.rival225){to.dataset.rival225='1';to.addEventListener('click',()=>setTimeout(()=>renderRivals225(false),0))}
 if(!document.getElementById('meet')?.classList.contains('hide'))renderRivals225(false);
 if(document.getElementById('result')?.textContent.trim())installNext225();
}

window.STAR_TOUR225={
 tiers:TOURS225,
 generateRivals:(promo=false)=>mkRivals225(!!promo),
 buildRivals:(tier='standard',promo=false)=>buildRivals225(tier,!!promo),
 ensureRivals:(promo=false)=>ensureRivals225(!!promo),
 score:score225,
 comparePower:comparePower225
};
const css=document.createElement('style');css.textContent=`
.league225{background:linear-gradient(145deg,#0e1b31,#142a49)!important;color:#fff;border:1px solid #65d8ff55!important}.leagueHead225{display:flex;justify-content:space-between;align-items:center}.leagueHead225 small{display:block;font-size:7px;color:#72dcff;font-weight:1000;letter-spacing:.14em}.leagueHead225 b{font-size:16px}.leagueHead225>span{background:#ffffff17;border:1px solid #ffffff22;border-radius:999px;padding:5px 8px;font-size:9px;font-weight:1000}.leagueTrack225{display:grid;grid-template-columns:repeat(6,1fr);gap:3px;margin:9px 0}.leagueTrack225 i{font-style:normal;text-align:center;opacity:.35;font-size:15px}.leagueTrack225 i small{display:block;font-size:5px}.leagueTrack225 .done225,.leagueTrack225 .now225{opacity:1}.leagueTrack225 .now225{background:#ffffff15;border-radius:8px;padding:3px}.leagueRule225{font-size:8px;color:#dcecff}.rivalPanel225{margin:8px 0;padding:10px;border:2px solid #273d5d;border-radius:15px;background:linear-gradient(145deg,#f8fbff,#eaf3ff);color:#172033}.rivalPanel225.promo225{border-color:#e5a800;background:linear-gradient(145deg,#fff9df,#fff1b9)}.rivalTop225{display:flex;justify-content:space-between;gap:8px}.rivalTop225 small{display:block;font-size:7px;letter-spacing:.14em;color:#607998}.rivalTop225 b{font-size:13px}.chance225{text-align:right}.chance225 span,.chance225 em{display:block;font-size:6px;font-style:normal}.chance225 strong{font-size:20px}.powerCompare225{display:grid;grid-template-columns:1fr 34px 1fr;align-items:center;gap:6px;margin:8px 0;font-size:8px}.powerCompare225 i{height:4px;background:linear-gradient(90deg,#2ca8ff,#ff774d);border-radius:99px}.powerCompare225 span:last-child{text-align:right}.rivalCards225{display:grid;grid-template-columns:repeat(3,1fr);gap:5px}.rivalCards225 article{border:1px solid #bac9db;border-radius:10px;background:#fff;padding:6px}.rivalCards225 header{display:flex;justify-content:space-between;align-items:center;gap:3px}.rivalCards225 header b{font-size:9px}.rivalCards225 header em{font-size:5px;font-style:normal;background:#fff0b3;border-radius:999px;padding:2px 4px}.rivalCards225 article>div{margin-top:4px}.rivalCards225 article span{display:flex;justify-content:space-between;font-size:5.5px;border-top:1px dotted #d4deea;padding:1px}.rivalCards225 .hot225{background:#fff1dd;color:#a94900;font-weight:1000}.rivalNote225{display:block;margin-top:6px;color:#65758a;font-size:6px}.tourSelect225{border:2px solid #496984!important;background:linear-gradient(145deg,#f8fbff,#edf6ff)!important}.tourHead225{display:flex;justify-content:space-between;align-items:center}.tourHead225 small{display:block;font-size:6px;color:#63798e;font-weight:1000;letter-spacing:.12em}.tourHead225 b{font-size:13px}.tourHead225>span{font-size:7px;border:1px solid #9aabba;border-radius:999px;padding:4px 7px;background:#fff}.tourSelect225>p{margin:7px 0;font-size:7px;color:#607182}.tourChoices225{display:grid;gap:6px}.tourChoices225 button{border:1px solid #b7c6d3;border-radius:10px;background:#fff;padding:8px;text-align:left;color:#23364a}.tourChoices225 button.on225{border:2px solid #2f79ad;background:#eef8ff}.tourChoices225 header{display:flex;justify-content:space-between;align-items:center}.tourChoices225 header b{font-size:9px}.tourChoices225 header strong{font-size:13px}.tourChoices225 small{display:block;font-size:6px;color:#687a8b}.tourChoices225 button>div{display:flex;gap:4px;flex-wrap:wrap;margin-top:5px}.tourChoices225 button>div span{font-size:6px;border-radius:999px;padding:3px 5px;background:#eef2f5}.tourNote225{display:block;margin-top:6px;font-size:6px;color:#697b89}
.battleEvent225{padding:12px;border-radius:12px;background:#13233c;color:#fff;text-align:center}.battleEvent225 b,.battleEvent225 span,.battleEvent225 small{display:block}.battleEvent225 strong{display:block;font-size:26px;color:#ffe36e}.leagueResult225 em{font-style:normal;color:#ffd65a;font-weight:1000}.leagueResult225.win225 strong{color:#69f2a9}.leagueResult225.lose225 strong{color:#ffb184}
`;document.head.appendChild(css);
setTimeout(wire225,0);
})();