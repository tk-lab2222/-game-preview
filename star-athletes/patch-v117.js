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
  const m=monster(sp,SCOUT_NAMES[sp],0);m.origin='大会スカウト';m.shiny=Math.random()<SHINY_BASE;
  S.lineage.push(m);
  return m;
}

// --- Tournament post-processing utilities. Tournament execution is owned by v225/v233.
function afterMeet117(overall,points){
  const scout=scoutReward117();
  saveRank117({ts:Date.now(),wins:Number(S.wins)||0,points:Number(points)||0,overall:Number(overall)||0,gen:currentGen117()});
  renderRanking117();
  return scout;
}
function shareMeet117(overall,points){
  return share117(`STAR ATHLETES｜大会 総合${overall}位 ${points}pt｜優勝${Number(S.wins)||0}回｜G${currentGen117()}`);
}
window.STAR_META117={afterMeet:afterMeet117,shareMeet:shareMeet117,renderRanking:renderRanking117,share:share117};

// Wrap render so secondary UI stays in sync without changing the base game state logic.
const renderBefore117=render;
render=function(){renderBefore117();updateOpening117();renderRanking117()};

const css=document.createElement('style');css.textContent=`
.avatar.shinyArt canvas,.avatar.shinyArt img{filter:hue-rotate(145deg) saturate(1.35) brightness(1.08)}
.avatar.shinyArt:after{content:'✨';position:absolute;right:4px;top:4px;font-size:14px;filter:none;z-index:3;text-shadow:0 1px 2px #fff}
}
to{transform:scale(1);opacity:1}}
.scout117{margin-top:8px;padding:8px;border:2px solid #222;border-radius:12px;background:#fff6bf}
.rankRow117{display:grid;grid-template-columns:42px 52px 1fr 50px 32px;gap:4px;align-items:center;border-top:1px dashed #bbb;padding:5px 0;font-size:9px}.rankRow117:first-of-type{border-top:0}
`;
document.head.appendChild(css);
setTimeout(()=>{updateOpening117();renderRanking117();try{render()}catch(e){console.error('v0.11.7 patch boot failed',e)}},0);
})();
