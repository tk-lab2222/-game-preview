(()=>{
// v0.20.0 milestone: missions, long-term nest progression, emblems,
// expanded coin loop, history/dex polish, and local save/recovery.
const SAVE200='star-athletes-save-v200';
const RANKS200=[
  {name:'ビギナーネスト',fame:0,emblems:0},
  {name:'ローカルネスト',fame:500,emblems:0},
  {name:'ライジングネスト',fame:1500,emblems:1},
  {name:'メジャーネスト',fame:4000,emblems:2},
  {name:'プラネットネスト',fame:8000,emblems:3},
  {name:'ギャラクシーネスト',fame:12000,emblems:5,champ:true}
];
const REWARD200={
  1:{coin:'200〜1,000',fame:'20〜80'},2:{coin:'300〜1,500',fame:'40〜130'},
  3:{coin:'500〜2,300',fame:'70〜200'},4:{coin:'700〜3,500',fame:'120〜300'},
  5:{coin:'1,000〜5,000',fame:'180〜450'},6:{coin:'1,500〜10,000',fame:'300〜800'}
};
function init200(){
  S.emblems??=[];S.planetChamp??=false;S.missionClaimed??={};S.specialShop??={};
  S.totalSpent??=0;S.saveVersion='0.20.0';
}
function processAwards200(){
  init200();
  (S.seasonHistory||[]).forEach(h=>{
    if(h.overall<=3){
      const key=`S${h.season}:${h.name}`;
      if(!S.emblems.includes(key))S.emblems.push(key);
    }
    if(h.season===6&&h.overall===1)S.planetChamp=true;
  });
}
function currentRank200(){
  processAwards200();
  let cur=RANKS200[0];
  for(const r of RANKS200){
    if((S.fame||0)>=r.fame&&S.emblems.length>=r.emblems&&(!r.champ||S.planetChamp))cur=r;
  }
  return cur;
}
function nextRank200(){const cur=currentRank200(),i=RANKS200.indexOf(cur);return RANKS200[Math.min(i+1,RANKS200.length-1)]}
function save200(){
  try{init200();localStorage.setItem(SAVE200,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.warn('save200',e)}
}
function load200(){
  try{const raw=localStorage.getItem(SAVE200);if(!raw)return false;const d=JSON.parse(raw);if(!d?.S)return false;S=d.S;init200();return true}catch(e){console.warn('load200',e);return false}
}
function missionDefs200(){
  const hist=S.seasonHistory||[],breeds=S.breedCount||0;
  return [
    {id:'breed3',name:'配合研究Ⅰ',desc:'配合を3回行う',ok:breeds>=3,reward:500},
    {id:'breed10',name:'配合研究Ⅱ',desc:'配合を10回行う',ok:breeds>=10,reward:1500},
    {id:'season1',name:'大会デビュー',desc:'大会を1回完走する',ok:hist.length>=1,reward:500},
    {id:'season6',name:'六つの舞台',desc:'1世代で6大会を経験する',ok:hist.some(x=>x.season===6),reward:2500},
    {id:'win1',name:'初優勝',desc:'大会で総合1位になる',ok:(S.wins||0)>=1,reward:1200},
    {id:'fame1500',name:'注目のスターネスト',desc:'名声1,500に到達',ok:(S.fame||0)>=1500,reward:1800},
    {id:'emblem3',name:'エンブレムコレクター',desc:'スターエンブレムを3個獲得',ok:(S.emblems||[]).length>=3,reward:2200}
  ];
}
function claim200(id){
  const m=missionDefs200().find(x=>x.id===id);if(!m||!m.ok||S.missionClaimed[id])return;
  S.missionClaimed[id]=true;S.coins=(S.coins||0)+m.reward;save200();render();
}
function ensureMission200(){
  const train=document.getElementById('train');if(!train)return;
  let box=document.getElementById('mission200');
  if(!box){box=document.createElement('div');box.id='mission200';box.className='box mission200';const shop=document.getElementById('shop122');shop?shop.after(box):train.appendChild(box)}
  const ms=missionDefs200();
  box.innerHTML=`<div class="head200"><div><small>NEST MISSIONS</small><h3>🎯 ミッション</h3></div><b>${ms.filter(x=>x.ok).length}/${ms.length}</b></div><div class="missionGrid200">${ms.map(m=>{const claimed=!!S.missionClaimed[m.id];return `<div class="missionCard200 ${m.ok?'done':''}"><div><b>${m.name}</b><small>${m.desc}</small></div><button data-mission200="${m.id}" ${!m.ok||claimed?'disabled':''}>${claimed?'受取済':m.ok?`🪙 ${m.reward} 受取`:'未達成'}</button></div>`}).join('')}</div>`;
}
function installMissionClaim200(){
  if(document.documentElement.dataset.missionClaim200)return;
  document.documentElement.dataset.missionClaim200='1';
  document.addEventListener('click',e=>{
    const b=e.target?.closest?.('[data-mission200]');if(!b)return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    claim200(b.dataset.mission200);
  },true);
}
function ensureSpecialShop200(){
  const shop=document.getElementById('shop122');if(!shop)return;
  let sp=document.getElementById('specialShop200');
  if(!sp){sp=document.createElement('div');sp.id='specialShop200';sp.className='specialShop200';shop.appendChild(sp)}
  const target=S.nest?.[0];
  sp.innerHTML=`<div class="specialTitle200"><b>✨ SPECIAL</b><span>大会後のもう一手</span></div><div class="specialGrid200"><button data-special200="lucky" ${(S.coins||0)<900?'disabled':''}><b>🍀 ラッキーチャーム</b><small>次の子の星格抽選を強化</small><em>🪙 900</em></button><button data-special200="condition" ${(S.coins||0)<500||!target?'disabled':''}><b>🥤 コンディションドリンク</b><small>${target?target.name:'育成メンバー'} 全能力+3</small><em>🪙 500</em></button><button data-special200="scout" ${(S.coins||0)<700?'disabled':''}><b>🔭 スカウトパス</b><small>血統候補を1体スカウト</small><em>🪙 700</em></button></div><div class="specialStock200">所持効果：🍀 ${S.specialShop.lucky||0}</div>`;
  sp.querySelectorAll('[data-special200]').forEach(b=>b.onclick=()=>buySpecial200(b.dataset.special200));
}
function spend200(n){if((S.coins||0)<n)return false;S.coins-=n;S.totalSpent+=n;return true}
function buySpecial200(id){
  init200();
  if(id==='lucky'&&spend200(900)){S.specialShop.lucky=(S.specialShop.lucky||0)+1}
  if(id==='condition'&&S.nest?.length&&spend200(500)){Object.keys(S.nest[0].stats).forEach(k=>S.nest[0].stats[k]+=3)}
  if(id==='scout'&&spend200(700)){
    const all=['draco','unil','grimo','puru'],owned=new Set(breederPool().map(x=>x.species));
    const cand=all.filter(x=>!owned.has(x)),sp=(cand.length?cand:all)[Math.floor(Math.random()*(cand.length||all.length))];
    const m=monster(sp,SP[sp][0].slice(0,2)+rnd(100,999),Math.max(0,...breederPool().map(x=>x.gen||0)));m.origin='スカウト';S.lineage.push(m);
  }
  save200();render();
}
// Rare-breed consumable: applied after all existing baby/shiny logic.
try{
  const babyBefore200=baby;
  baby=function(a,b){
    const c=babyBefore200(a,b);init200();
    if((S.specialShop.lucky||0)>0){c.starLuck200=(Number(c.starLuck200)||0)+1;S.specialShop.lucky--;}
    return c;
  };
}catch(e){console.warn('baby wrapper 200',e)}
function decorateMeetChoices200(){
  document.querySelectorAll('.meetChoiceCard125').forEach((b,i)=>{
    if(b.querySelector('.meta200'))return;
    const rw=REWARD200[S.season||1]||REWARD200[6],m=document.createElement('div');m.className='meta200';m.innerHTML=`<span>🪙 ${rw.coin}</span><span>⭐ ${rw.fame}</span><span class="open200">出場可能</span>`;b.appendChild(m);
  });
}
function ensureProgress200(){
  const dex=document.getElementById('dex');if(!dex)return;
  let box=document.getElementById('progress200');if(!box){box=document.createElement('div');box.id='progress200';box.className='box progress200';dex.prepend(box)}
  const cur=currentRank200(),next=nextRank200(),same=cur===next;
  const fame=S.fame||0,pct=same?100:Math.max(0,Math.min(100,Math.round((fame-cur.fame)/(next.fame-cur.fame)*100)));
  box.innerHTML=`<div class="head200"><div><small>STAR NEST</small><h3>🌠 ${cur.name}</h3></div><b>⭐ ${fame}</b></div><div class="rankBar200"><i style="width:${pct}%"></i></div><div class="rankMeta200"><span>🏅 エンブレム ${S.emblems.length}</span><span>${same?'最高ランク到達':`次：${next.name} / 名声${next.fame} / 🏅${next.emblems}`}</span></div>`;
}
function ensureHistory200(){
  const dex=document.getElementById('dex');if(!dex)return;
  let box=document.getElementById('history200');if(!box){box=document.createElement('div');box.id='history200';box.className='box history200';dex.appendChild(box)}
  const hist=(S.seasonHistory||[]).slice(-8).reverse();
  const pool=breederPool(),species=[...new Set(pool.map(x=>x.species))].length,shiny=pool.filter(x=>x.shiny).length,bestR=pool.reduce((a,m)=>Math.max(a,Number(window.STAR_GRADE340?.athleteGrade?.(m)||1)),1),bestG=window.STAR_GRADE340?.grades?.[bestR];
  box.innerHTML=`<h3>📚 ネスト記録</h3><div class="dexSummary200"><span>種族 <b>${species}/4</b></span><span>色違い <b>${shiny}</b></span><span>最高星格 <b>${bestG?.stars||'★'} ${bestG?.name||'通常'}</b></span><span>配合 <b>${S.breedCount||0}</b></span></div><div class="historyList200">${hist.length?hist.map(h=>`<div><b>S${h.season} ${h.name}</b><span>総合${h.overall}位 / ${h.points}pt</span><em>🪙+${h.coins} ⭐+${h.fame}</em></div>`).join(''):'<small>大会記録はまだありません。</small>'}</div><div class="saveRow200"><button id="saveNow200">💾 セーブ</button></div>`;
  box.querySelector('#saveNow200').onclick=()=>{save200();box.querySelector('#saveNow200').textContent='✅ 保存しました'};
}
function decorateBreed200(){
  const hero=document.querySelector('.breedHero126');if(!hero)return;
  let meter=hero.querySelector('.breedGoal200');if(!meter){meter=document.createElement('div');meter.className='breedGoal200';hero.appendChild(meter)}
  const n=S.breedCount||0,next=n<3?3:n<10?10:n<25?25:50,pct=Math.min(100,Math.round(n/next*100));
  meter.innerHTML=`<div><b>BREED LAB</b><span>配合を重ねて理想個体へ</span><em>${n}/${next}</em></div><div><i style="width:${pct}%"></i></div>`;
}
function decorate200(){
  try{init200();processAwards200();ensureMission200();decorateMeetChoices200();ensureProgress200();ensureHistory200();decorateBreed200()}catch(e){console.error('v200 decorate',e)}
}
const renderBefore200=render;
render=function(){const out=renderBefore200();decorate200();save200();return out};
// Restore only saves created by this milestone, then redraw once.
if(load200()){try{render()}catch(e){console.error('v200 restore',e)}}
installMissionClaim200();
setTimeout(()=>{try{decorate200();save200()}catch(e){}},0);
const css=document.createElement('style');css.textContent=`
.head200{display:flex;justify-content:space-between;align-items:center;gap:10px}.head200 small{display:block;font-size:7px;font-weight:1000;letter-spacing:.14em;color:#667}.head200 h3{margin:1px 0}.head200>b{border-radius:999px;background:#182033;color:#ffe071;padding:6px 10px;font-size:10px}.mission200{background:linear-gradient(180deg,#f8fbff,#edf5ff)!important}.missionGrid200{display:grid;gap:6px}.missionCard200{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;border:1px solid #cbd8e8;border-radius:10px;background:#fff;padding:8px}.missionCard200.done{background:#effff7;border-color:#74dba5}.missionCard200 b{display:block;font-size:10px}.missionCard200 small{font-size:8px;color:#667}.missionCard200 button{border:0;border-radius:8px;padding:7px 8px;background:#172033;color:#ffe174;font-weight:1000;font-size:8px}.missionCard200 button:disabled{opacity:.4}.specialShop200{margin-top:10px;padding-top:9px;border-top:1px dashed #cda94d}.specialTitle200{display:flex;justify-content:space-between;font-size:9px;margin-bottom:6px}.specialTitle200 b{color:#9b6a00}.specialGrid200{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.specialGrid200 button{display:flex;flex-direction:column;text-align:left;gap:3px;border:1px solid #d7bd74;border-radius:10px;background:#fff;padding:7px}.specialGrid200 button b{font-size:8px}.specialGrid200 button small{font-size:7px;color:#666;min-height:28px}.specialGrid200 button em{font-style:normal;font-size:8px;font-weight:1000;color:#875c00}.specialGrid200 button:disabled{opacity:.38}.specialStock200{font-size:8px;font-weight:900;margin-top:6px}.meta200{display:flex;gap:5px;flex-wrap:wrap;margin-top:4px}.meta200 span{font-size:7px;background:#eaf1f8;border-radius:999px;padding:3px 5px}.meta200 .open200{background:#ddf9e8;color:#08703a;font-weight:1000}.progress200{background:linear-gradient(145deg,#f4f7ff,#fff8dc)!important}.rankBar200{height:9px;background:#dbe2ee;border-radius:999px;overflow:hidden;margin:10px 0 5px}.rankBar200 i{display:block;height:100%;background:linear-gradient(90deg,#53d4ff,#8a72ff,#ffca55);border-radius:999px}.rankMeta200{display:flex;justify-content:space-between;gap:8px;font-size:8px;color:#556}.dexSummary200{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:9px}.dexSummary200 span{text-align:center;background:#f3f6fa;border-radius:9px;padding:7px 2px;font-size:7px}.dexSummary200 b{display:block;font-size:12px}.historyList200{display:grid;gap:5px}.historyList200>div{display:grid;grid-template-columns:1fr auto;gap:2px 8px;border-bottom:1px solid #eee;padding:5px 0}.historyList200 b{font-size:9px}.historyList200 span{font-size:8px}.historyList200 em{grid-column:1/3;font-style:normal;font-size:7px;color:#8b6a18}.saveRow200{display:flex;gap:6px;margin-top:10px}.saveRow200 button{flex:1;border:1px solid #bbb;border-radius:8px;background:#fff;padding:7px;font-size:8px;font-weight:900}.breedGoal200{margin-top:10px;padding:8px;border:1px solid #ffffff22;border-radius:10px;background:#06101c88}.breedGoal200>div:first-child{display:grid;grid-template-columns:auto 1fr auto;gap:6px;align-items:center}.breedGoal200 b{font-size:7px;color:#80e7ff;letter-spacing:.1em}.breedGoal200 span{font-size:7px;opacity:.7}.breedGoal200 em{font-style:normal;font-size:8px;color:#ffe174;font-weight:1000}.breedGoal200>div:last-child{height:5px;background:#ffffff18;border-radius:999px;margin-top:5px;overflow:hidden}.breedGoal200 i{display:block;height:100%;background:linear-gradient(90deg,#5ce5ff,#8d73ff,#ff6fb8);border-radius:999px}
@media(max-width:430px){.specialGrid200{grid-template-columns:1fr}.dexSummary200{grid-template-columns:1fr 1fr}}
`;document.head.appendChild(css);
})();