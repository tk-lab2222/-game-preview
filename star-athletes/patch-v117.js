(()=>{
// v0.11.7 gameplay polish: rarity eggs, meet cut-ins + cheer tap, species scouting,
// local ranking/share, shiny colors, and first-gift copy cleanup.
const SHINY_BASE=.025;
const SCOUT_NAMES={draco:'ノヴァ',unil:'ルミ',grimo:'フェル',puru:'しずく'};

// --- Shiny variants (lightweight: color treatment, no part-layer dependency) ---
const babyBefore117=baby;
baby=function(a,b){
  const c=babyBefore117(a,b);
  const inherited=(a&&a.shiny)||(b&&b.shiny);
  c.shiny=Math.random()<(inherited?.06:SHINY_BASE);
  return c;
};
const avatarBefore117=avatar;
avatar=function(m,big=false){
  let h=avatarBefore117(m,big);
  if(m&&m.shiny&&!h.includes('shinyArt')) h=h.replace('class="avatar ','class="avatar shinyArt ');
  return h;
};
const cardBefore117=card;
card=function(m,mode){
  let h=cardBefore117(m,mode);
  if(m&&m.shiny) h=h.replace('<div class="nm">','<div class="nm"><span class="shinyBadge">✨色違い</span>');
  return h;
};


// --- First gift copy only belongs to the opening. Keep breeder cards, change framing later. ---
function updateOpening117(){
  const progressed=S.dex.a>0||S.nest.length>0||S.lineage.length>0;
  const banner=document.querySelector('.a>.b');
  if(banner)banner.style.display=progressed?'none':'';
}

// --- Local ranking / share ---
const RANK_KEY='star-athletes-local-ranking-v117';
function getRanks117(){try{return JSON.parse(localStorage.getItem(RANK_KEY)||'[]')}catch(_){return[]}}
function saveRank117(row){
  try{const rows=getRanks117();rows.push(row);rows.sort((a,b)=>b.wins-a.wins||b.points-a.points||a.overall-b.overall);localStorage.setItem(RANK_KEY,JSON.stringify(rows.slice(0,10)))}catch(_){}
}
function currentGen117(){return Math.max(0,...[...S.nest,...S.lineage].map(m=>m.gen||0))}
function ensureRanking117(){
  const dex=$('dex');if(!dex||document.getElementById('ranking117'))return;
  const box=document.createElement('div');box.className='box';box.id='ranking117';dex.appendChild(box);
}
function renderRanking117(){
  ensureRanking117();const box=document.getElementById('ranking117');if(!box)return;
  const rows=getRanks117();
  box.innerHTML=`<h3>ランキング <span class="sm">この端末</span></h3>${rows.length?rows.slice(0,5).map((r,i)=>`<div class="rankRow117"><b>${i+1}位</b><span>🏆${r.wins}</span><span>大会 ${r.overall}位</span><span>${r.points}pt</span><small>G${r.gen}</small></div>`).join(''):'<div class="sm">まだ記録がありません。</div>'}<button class="btn tiny" id="shareRank117">共有する</button>`;
  const b=document.getElementById('shareRank117');if(b)b.onclick=()=>share117(`STAR ATHLETES｜優勝 ${S.wins}回｜最高世代 G${currentGen117()}`);
}
async function share117(text){
  const data={title:'STAR ATHLETES',text};
  try{if(navigator.share){await navigator.share(data)}else if(navigator.clipboard){await navigator.clipboard.writeText(text);alert('共有文をコピーしました')}}catch(_){}
}

// --- Guaranteed path to the two species not received at the start. ---
function ownedSpecies117(){
  return new Set([...S.starters,...S.nest,...S.lineage,...S.cands,...S.foster,...S.released].filter(Boolean).map(m=>m.species));
}
function scoutReward117(){
  S.meetsDone=(S.meetsDone||0)+1;
  const missing=['draco','unil','grimo','puru'].filter(sp=>!ownedSpecies117().has(sp));
  if(!missing.length)return null;
  // First tournament guarantees one missing species; third guarantees the other.
  if(S.meetsDone!==1&&S.meetsDone!==3)return null;
  const sp=missing[Math.floor(Math.random()*missing.length)];
  const m=monster(sp,SCOUT_NAMES[sp],0);m.origin='大会スカウト';m.rarity=S.meetsDone===1?'U':'R';m.shiny=Math.random()<SHINY_BASE;
  S.lineage.push(m);
  return m;
}

// --- Meet cut-in + tiny optional mini-game: tap CHEER during each event for a small bonus. ---
const wait117=ms=>new Promise(r=>setTimeout(r,ms));
function cheerCutin117(e,m,i){
  return new Promise(resolve=>{
    $('events').innerHTML=`<div class="meetCutin117"><div class="cutinNo117">EVENT ${i+1}/4</div><h3>${e}</h3>${avatar(m,true)}<b>${m.name}</b><div class="sm">${INF[e][0]}</div><button class="btn yl cheer117">📣 応援タップ！</button><div class="cheerGauge117"><i></i></div></div>`;
    try{window.paintSpecies&&window.paintSpecies()}catch(_){}
    const btn=document.querySelector('.cheer117'),bar=document.querySelector('.cheerGauge117 i');let done=false;
    requestAnimationFrame(()=>{if(bar)bar.style.width='0%'});
    const finish=(bonus,label)=>{if(done)return;done=true;if(btn){btn.disabled=true;btn.textContent=label}setTimeout(()=>resolve(bonus),180)};
    if(btn)btn.onclick=()=>finish(.035,'✨ ナイス応援！');
    setTimeout(()=>finish(0,'スタート！'),1100);
  });
}
async function runMeet117(){
  const run=$('run');run.disabled=true;run.textContent='大会進行中…';$('result').innerHTML='';
  let pts=0,lines=[];
  for(let i=0;i<S.schedule.length;i++){
    const e=S.schedule[i],m=S.nest.find(x=>x.id===S.assign[i])||best(e);
    const cheer=await cheerCutin117(e,m,i);
    const ps=score(m,e)*(0.94+Math.random()*.12+cheer);
    const op=Array.from({length:7},()=>95+S.wins*5+Math.random()*70);
    const rank=1+op.filter(x=>x>ps).length;
    pts+=[0,8,6,5,4,3,2,1,0][rank];lines.push({e,rank,m});
    $('events').innerHTML=`<div class="meetCutin117 resultCutin117"><h3>${e}</h3>${avatar(m,true)}<div class="phaseRank"><b>${rank}位</b></div></div>`;
    try{window.paintSpecies&&window.paintSpecies()}catch(_){}
    await wait117(480);
  }
  const overall=pts>=25?1:pts>=20?2:pts>=16?3:4;if(overall===1)S.wins++;
  const scout=scoutReward117();
  saveRank117({ts:Date.now(),wins:S.wins,points:pts,overall,gen:currentGen117()});
  $('events').innerHTML=lines.map(x=>`<div class="evt"><b>${x.e}</b><div>${x.m.name}：${x.rank}位</div></div>`).join('');
  $('result').innerHTML=`<div class="notice meetSummary117">${lines.map(x=>`${x.e}：${x.rank}位`).join('<br>')}<br><b>総合${overall}位 / ${pts}pt</b>${overall===1?'<br>★次世代候補枠+1':''}${scout?`<div class="scout117">🎁 大会スカウト！<br><b>${SP[scout.species][0]}「${scout.name}」</b> が血統プールに加入！</div>`:''}<button class="btn tiny" id="shareMeet117">結果を共有</button></div>`;
  const sh=document.getElementById('shareMeet117');if(sh)sh.onclick=()=>share117(`STAR ATHLETES｜大会 総合${overall}位 ${pts}pt｜優勝${S.wins}回｜G${currentGen117()}`);
  run.classList.add('hide');run.disabled=false;run.textContent='大会スタート';$('next').classList.remove('hide');
  render();renderRanking117();
}

// Wrap render so secondary UI stays in sync without changing the base game state logic.
const renderBefore117=render;
render=function(){renderBefore117();updateOpening117();renderRanking117()};

const css=document.createElement('style');css.textContent=`
.avatar.shinyArt canvas,.avatar.shinyArt img{filter:hue-rotate(145deg) saturate(1.35) brightness(1.08)}
.avatar.shinyArt:after{content:'✨';position:absolute;right:4px;top:4px;font-size:14px;filter:none;z-index:3;text-shadow:0 1px 2px #fff}
.shinyBadge{font-size:7px;background:#ffe36b;border:1px solid #222;border-radius:999px;padding:1px 4px;margin-right:3px;white-space:nowrap}
.rarityEgg{width:82px;height:100px;margin:auto;display:grid;place-items:center;border-radius:50% 50% 46% 46%;background:radial-gradient(circle at 38% 28%,#fff,#eee 42%,#d8d1bf 75%);box-shadow:inset -8px -8px 16px #0001,0 5px 14px #0002;animation:eggBob117 .65s ease-in-out infinite alternate}
.rarityEgg span{font-size:58px;filter:saturate(.55)}
.rarityEgg.blue{background:radial-gradient(circle at 38% 28%,#fff,#bde7ff 42%,#5aa6e8 78%);box-shadow:0 0 20px #5fc4ff99}
.rarityEgg.gold{background:radial-gradient(circle at 38% 28%,#fff9cf,#ffd65a 43%,#df8b17 80%);box-shadow:0 0 24px #ffd65aaa}
.rarityEgg.ex{background:conic-gradient(from 20deg,#ff8fb7,#ffd65a,#91f0db,#8cc5ff,#d69cff,#ff8fb7);box-shadow:0 0 28px #d69cffaa}
.rarityEgg.shinyEgg{outline:4px solid #fff6a6;filter:drop-shadow(0 0 9px #fff06a)}
@keyframes eggBob117{to{transform:translateY(-4px) rotate(1deg)}}
.meetCutin117{text-align:center;border:3px solid #222;border-radius:18px;background:linear-gradient(#eef8ff,#fff);padding:10px;overflow:hidden;position:relative}
.meetCutin117 .avatar{height:120px;max-width:220px;margin:4px auto;border:0!important;background:transparent!important}
.cutinNo117{font-size:9px;font-weight:1000;letter-spacing:.12em;opacity:.55}
.cheerGauge117{height:7px;background:#ddd;border:1px solid #222;border-radius:999px;margin-top:8px;overflow:hidden}.cheerGauge117 i{display:block;width:100%;height:100%;background:#ffd65a;transition:width 1.1s linear}
.resultCutin117{animation:cutPop117 .28s ease-out}@keyframes cutPop117{from{transform:scale(.92);opacity:.4}to{transform:scale(1);opacity:1}}
.scout117{margin-top:8px;padding:8px;border:2px solid #222;border-radius:12px;background:#fff6bf}
.rankRow117{display:grid;grid-template-columns:42px 52px 1fr 50px 32px;gap:4px;align-items:center;border-top:1px dashed #bbb;padding:5px 0;font-size:9px}.rankRow117:first-of-type{border-top:0}
`;
document.head.appendChild(css);
setTimeout(()=>{updateOpening117();renderRanking117();try{render()}catch(e){console.error('v0.11.7 patch boot failed',e)}},0);
})();
