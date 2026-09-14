(()=>{
// v0.11.9: one generation = six seasons. Each event resolves through
// opening / middle / finish phases; phase points decide the event result.
const SEASONS={
  1:{name:'ローカル運動会',sub:'初実戦・経験獲得',diff:0,reward:[200,1000],fame:[20,80]},
  2:{name:'エリア運動会',sub:'地区上位クラス',diff:7,reward:[300,1500],fame:[40,130]},
  3:{name:'グランド運動会',sub:'有力スターネストが集結',diff:14,reward:[500,2300],fame:[70,200]},
  4:{name:'メジャー運動会',sub:'代表候補として注目される上位戦',diff:21,reward:[700,3500],fame:[120,300]},
  5:{name:'プラネット予選',sub:'代表決定戦への出場権を争う',diff:29,reward:[1000,5000],fame:[180,450]},
  6:{name:'プラネット代表決定戦',sub:'1世代の最終目標',diff:38,reward:[1500,10000],fame:[300,800]}
};
const TOURNAMENTS={
  1:[
    {name:'スタータウン杯',place:'スタータウン',weather:'晴れ',events:['50m走','障害物競走','的当て','リレー']},
    {name:'リバーフィールド杯',place:'リバー地区',weather:'くもり',events:['50m走','大玉ころがし','坂道かけあがり','綱引き']},
    {name:'ルーキースター杯',place:'ネスト広場',weather:'晴れ',events:['障害物競走','的当て','大玉ころがし','リレー']}
  ],
  2:[
    {name:'ノースエリア杯',place:'ノースドーム',weather:'向かい風',events:['50m走','10000m走','障害物競走','リレー']},
    {name:'クリスタル地区杯',place:'クリスタル平原',weather:'晴れ',events:['的当て','坂道かけあがり','大玉ころがし','綱引き']},
    {name:'スカイエリア杯',place:'高原競技場',weather:'強めの風',events:['50m走','障害物競走','坂道かけあがり','リレー']}
  ],
  3:[
    {name:'グランドスター杯',place:'中央大競技場',weather:'晴れ',events:['10000m走','障害物競走','的当て','リレー']},
    {name:'メテオグラウンド杯',place:'クレーター会場',weather:'砂ぼこり',events:['大玉ころがし','坂道かけあがり','50m走','綱引き']},
    {name:'オーロラグランド杯',place:'北極光スタジアム',weather:'低温',events:['10000m走','50m走','的当て','リレー']}
  ],
  4:[
    {name:'メジャースターカップ',place:'プライムアリーナ',weather:'晴れ',events:['50m走','障害物競走','10000m走','リレー']},
    {name:'チャンピオンズ運動会',place:'王都スタジアム',weather:'くもり',events:['大玉ころがし','的当て','坂道かけあがり','綱引き']},
    {name:'コズミックメジャー杯',place:'軌道競技場',weather:'変わりやすい',events:['50m走','的当て','10000m走','リレー']}
  ],
  5:[
    {name:'プラネット第1予選',place:'代表選考アリーナ',weather:'晴れ',events:['障害物競走','10000m走','大玉ころがし','リレー']},
    {name:'プラネット最終予選',place:'代表選考アリーナ',weather:'くもり',events:['50m走','的当て','坂道かけあがり','綱引き']}
  ],
  6:[
    {name:'プラネット代表決定戦',place:'プラネット・コロシアム',weather:'決戦日和',events:['50m走','障害物競走','10000m走','リレー']}
  ]
};
const PHASES=['序盤','中盤','終盤'];
const PHASE_EMOJI=['🚀','🔥','⭐'];
const STRAT={
  '先行':[1.10,1.06,.92],
  'バランス':[1,1,1],
  '温存':[.90,1.00,1.11],
  '追込':[.86,.94,1.18]
};
const PTS=[8,6,5,4,3,2,1,0];

function initSeason119(){
  S.season??=1;S.coins??=0;S.fame??=0;S.seasonHistory??=[];S.seasonMeet??=null;
  if(!S.seasonMeet){
    const list=TOURNAMENTS[S.season]||TOURNAMENTS[6];
    S.seasonMeet=list[0];
    S.schedule=[...S.seasonMeet.events];
  }
}
function chooseMeet119(idx){
  const list=TOURNAMENTS[S.season]||TOURNAMENTS[6],pick=list[idx];if(!pick)return;
  S.seasonMeet=pick;S.schedule=[...pick.events];S.assign={};S.strat={};render();
}
function seasonUi119(){
  initSeason119();
  const host=$('train')?.querySelector('.box');if(!host)return;
  let el=document.getElementById('season119');if(!el){el=document.createElement('div');el.id='season119';host.insertBefore(el,host.firstChild)}
  const s=SEASONS[S.season]||SEASONS[6],list=TOURNAMENTS[S.season]||[];
  el.innerHTML=`<div class="seasonHead119"><div><small>GENERATION SEASON</small><b>S${S.season}/6　${s.name}</b><span>${s.sub}</span></div><div class="seasonDots119">${[1,2,3,4,5,6].map(n=>`<i class="${n<S.season?'done':''} ${n===S.season?'now':''}">${n}</i>`).join('')}</div></div><div class="wallet119"><span>🪙 ${S.coins}</span><span>⭐ 名声 ${S.fame}</span></div><div class="meetChoice119">${list.map((x,i)=>`<button type="button" data-meet119="${i}" class="${S.seasonMeet?.name===x.name?'sel':''}"><b>${x.name}</b><small>📍${x.place}　☁️${x.weather}</small><small>${x.events.join(' / ')}</small></button>`).join('')}</div>`;
  el.querySelectorAll('[data-meet119]').forEach(b=>b.onclick=()=>chooseMeet119(+b.dataset.meet119));
  const title=host.querySelector('h3');if(title)title.textContent=`次の大会：${S.seasonMeet?.name||s.name}`;
}

const renderBefore119=render;
render=function(){
  initSeason119();renderBefore119();seasonUi119();
  const to=$('toMeet');if(to)to.textContent=S.turn<3?`大会へ（育成 ${S.turn}/3）`:`S${S.season} 大会へ`;
};

function strategyForOpp119(){return ['先行','バランス','温存','追込'][Math.floor(Math.random()*4)]}
function phasePanel119(e,m,phaseIndex,phaseRank,phasePts,totalPts,cheered){
  $('events').innerHTML=`<div class="phase119"><div class="phaseTop119"><span>${PHASE_EMOJI[phaseIndex]} ${PHASES[phaseIndex]}</span><b>${e}</b><small>${m.name} / ${S.strat[S.schedule.indexOf(e)]||'バランス'}</small></div>${avatar(m,true)}<div class="phaseResult119"><strong>${phaseRank}位</strong><span>+${phasePts} pt</span><em>累計 ${totalPts} pt</em></div><div class="phaseTrack119"><i style="width:${((phaseIndex+1)/3)*100}%"></i></div>${cheered?'<div class="cheered119">📣 応援成功！</div>':''}</div>`;
  try{window.paintSpecies&&window.paintSpecies()}catch(_){}
}
function phaseCheer119(e,m,phaseIndex){
  return new Promise(resolve=>{
    $('events').innerHTML=`<div class="phase119 ready119"><div class="phaseTop119"><span>${PHASE_EMOJI[phaseIndex]} ${PHASES[phaseIndex]}</span><b>${e}</b><small>${m.name}</small></div>${avatar(m,true)}<div class="phaseMsg119">${phaseIndex===0?'スタート！主導権を取れるか':phaseIndex===1?'中盤戦！展開が動く': 'ラストスパート！ここで決まる'}</div><button class="btn yl phaseCheer119">📣 応援する！</button><div class="phaseTimer119"><i></i></div></div>`;
    try{window.paintSpecies&&window.paintSpecies()}catch(_){}
    const b=document.querySelector('.phaseCheer119'),bar=document.querySelector('.phaseTimer119 i');let done=false;
    requestAnimationFrame(()=>{if(bar)bar.style.width='0%'});
    const finish=v=>{if(done)return;done=true;if(b)b.disabled=true;resolve(v)};
    if(b)b.onclick=()=>{b.textContent='✨ ナイス応援！';finish(.025)};
    setTimeout(()=>finish(0),750);
  });
}
async function runEvent119(e,eventIndex){
  const m=S.nest.find(x=>x.id===S.assign[eventIndex])||best(e),str=S.strat[eventIndex]||'バランス';
  const s=SEASONS[S.season]||SEASONS[6],playerBase=score(m,e),racers=[{id:'you',pts:0,raw:0,str}];
  for(let n=0;n<7;n++)racers.push({id:'o'+n,pts:0,raw:0,str:strategyForOpp119(),base:82+s.diff+Math.random()*35});
  const phaseLog=[];
  for(let p=0;p<3;p++){
    const cheer=await phaseCheer119(e,m,p),prev=racers[0].lastRank||4;
    racers.forEach((r,idx)=>{
      const f=(STRAT[r.str]||STRAT['バランス'])[p];
      const carry=p===0?1:(r.lastRank<=2?1.018:r.lastRank>=6?1.008:1);
      const base=idx===0?playerBase:r.base;
      r.phase=base*f*carry*(.94+Math.random()*.12)+(idx===0?base*cheer:0);
      r.raw+=r.phase;
    });
    const order=[...racers].sort((a,b)=>b.phase-a.phase);
    order.forEach((r,rank)=>{r.lastRank=rank+1;r.pts+=PTS[rank]||0});
    const you=racers[0],phasePts=PTS[you.lastRank-1]||0;
    phaseLog.push({name:PHASES[p],rank:you.lastRank,pts:phasePts,total:you.pts});
    phasePanel119(e,m,p,you.lastRank,phasePts,you.pts,cheer>0);
    await new Promise(r=>setTimeout(r,470));
  }
  const final=[...racers].sort((a,b)=>b.pts-a.pts||b.raw-a.raw),rank=final.findIndex(r=>r.id==='you')+1;
  $('events').innerHTML=`<div class="eventFinal119"><b>${e}</b>${avatar(m,true)}<strong>${rank}位</strong><div class="phaseMini119">${phaseLog.map(x=>`<span>${x.name}<b>${x.rank}位</b><em>+${x.pts}</em></span>`).join('')}</div><div class="eventPts119">3フェーズ合計 <b>${racers[0].pts} pt</b></div></div>`;
  try{window.paintSpecies&&window.paintSpecies()}catch(_){}
  await new Promise(r=>setTimeout(r,600));
  return {e,m,rank,phaseLog,phasePoints:racers[0].pts,eventPoints:PTS[rank-1]||0};
}
function reward119(overall){
  const s=SEASONS[S.season]||SEASONS[6];
  const ratio=overall===1?1:overall===2?.72:overall===3?.5:.25;
  const coins=Math.round(s.reward[0]+(s.reward[1]-s.reward[0])*ratio);
  const fame=Math.round(s.fame[0]+(s.fame[1]-s.fame[0])*ratio);
  S.coins+=coins;S.fame+=fame;return{coins,fame};
}
async function runMeet119(){
  initSeason119();const run=$('run');run.disabled=true;run.textContent='大会進行中…';$('result').innerHTML='';
  const rows=[];let total=0;
  for(let i=0;i<S.schedule.length;i++){const r=await runEvent119(S.schedule[i],i);rows.push(r);total+=r.eventPoints}
  const overall=total>=25?1:total>=20?2:total>=16?3:4;if(overall===1)S.wins++;
  const rw=reward119(overall);S.seasonHistory.push({season:S.season,name:S.seasonMeet?.name||SEASONS[S.season].name,overall,points:total,coins:rw.coins,fame:rw.fame});
  $('events').innerHTML=rows.map(x=>`<div class="evt"><b>${x.e}</b><div>${x.m.name}：${x.rank}位 / ${x.phasePoints} phase pt</div></div>`).join('');
  $('result').innerHTML=`<div class="notice seasonResult119"><b>S${S.season} ${S.seasonMeet?.name||''}</b><br>${rows.map(x=>`${x.e}：${x.rank}位`).join('<br>')}<hr><strong>総合${overall}位 / ${total}pt</strong><br>🪙 +${rw.coins}　⭐名声 +${rw.fame}</div>`;
  run.classList.add('hide');run.disabled=false;run.textContent='大会スタート';const next=$('next');next.classList.remove('hide');next.textContent=S.season<6?'次シーズンへ':'次世代へ';render();
}
$('run').onclick=runMeet119;

$('next').onclick=()=>{
  if((S.season||1)<6){
    S.season++;S.turn=0;S.plans={};S.assign={};S.strat={};S.schedule=[];S.seasonMeet=null;
    $('run').classList.remove('hide');$('next').classList.add('hide');$('result').innerHTML='';$('events').innerHTML='';$('gain').innerHTML='';
    initSeason119();show('train');render();return;
  }
  // S6 ends the generation. Return to breeding only here.
  S.parents=[];S.cands=[];S.sel=[];S.egg=null;S.turn=0;S.schedule=[];S.plans={};S.assign={};S.strat={};S.season=1;S.seasonMeet=null;
  $('run').classList.remove('hide');$('next').classList.add('hide');$('result').innerHTML='';$('events').innerHTML='';
  show('breed');render();
};

const css=document.createElement('style');css.textContent=`
#season119{margin:-2px -2px 10px;padding:9px;border:2px solid #222;border-radius:14px;background:linear-gradient(135deg,#10192d,#273a67);color:#fff}.seasonHead119{display:flex;justify-content:space-between;gap:8px}.seasonHead119 small,.seasonHead119 span{display:block;font-size:8px;opacity:.72}.seasonHead119 b{display:block;font-size:13px}.seasonDots119{display:flex;gap:3px;align-items:flex-start}.seasonDots119 i{width:18px;height:18px;border:1px solid #fff7;border-radius:50%;display:grid;place-items:center;font-size:8px;font-style:normal}.seasonDots119 i.done{background:#65d99a;color:#102}.seasonDots119 i.now{background:#ffd65a;color:#222;border-color:#222}.wallet119{display:flex;gap:8px;margin:7px 0;font-size:9px;font-weight:900}.wallet119 span{background:#fff1;color:#fff;border:1px solid #fff4;border-radius:999px;padding:3px 7px}.meetChoice119{display:grid;gap:5px}.meetChoice119 button{appearance:none;text-align:left;background:#fff;color:#222;border:2px solid transparent;border-radius:9px;padding:6px 7px}.meetChoice119 button.sel{border-color:#ffd65a;box-shadow:0 0 0 2px #ffd65a55}.meetChoice119 b,.meetChoice119 small{display:block}.meetChoice119 small{font-size:7px;opacity:.7;margin-top:2px}.phase119,.eventFinal119{border:3px solid #222;border-radius:18px;padding:10px;text-align:center;background:linear-gradient(#eef7ff,#fff);box-shadow:0 5px 0 #0002}.phaseTop119 span,.phaseTop119 b,.phaseTop119 small{display:block}.phaseTop119 span{font-size:10px;font-weight:1000}.phaseTop119 b{font-size:18px}.phaseTop119 small{font-size:9px;opacity:.65}.phase119 .avatar,.eventFinal119 .avatar{height:118px;max-width:220px;margin:5px auto;border:0!important;background:transparent!important}.phaseMsg119{font-weight:1000;padding:7px}.phaseTimer119{height:7px;border:1px solid #222;background:#ddd;border-radius:999px;overflow:hidden;margin-top:7px}.phaseTimer119 i{display:block;width:100%;height:100%;background:#ffd65a;transition:width .75s linear}.ready119 .phaseTimer119 i{width:0%}.phaseResult119{display:flex;justify-content:center;align-items:baseline;gap:10px}.phaseResult119 strong,.eventFinal119>strong{font-size:28px}.phaseResult119 span{font-size:14px;font-weight:1000;color:#d56600}.phaseResult119 em{font-size:9px;font-style:normal}.phaseTrack119{height:6px;background:#ddd;border-radius:999px;margin-top:7px;overflow:hidden}.phaseTrack119 i{display:block;height:100%;background:#4d9be6}.cheered119{font-size:9px;font-weight:1000;color:#b46d00}.phaseMini119{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-top:7px}.phaseMini119 span{background:#f4f4f4;border:1px solid #bbb;border-radius:8px;padding:4px;font-size:8px}.phaseMini119 span b,.phaseMini119 span em{display:block}.phaseMini119 span em{font-style:normal;color:#d56600}.eventPts119{margin-top:6px;font-size:10px}.seasonResult119 hr{border:0;border-top:1px dashed #999}.seasonResult119 strong{font-size:18px}
`;
document.head.appendChild(css);
setTimeout(()=>{initSeason119();render()},0);
})();