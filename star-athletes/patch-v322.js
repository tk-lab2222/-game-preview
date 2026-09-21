(()=> {
'use strict';
// v0.31.67: league-unlocked mission expansion + permanent Nest Base stat support.
if(window.STAR_MISSIONS322)return;

const SAVE322='star-athletes-save-v200';
const LEAGUES322=['ローカル','エリア','グランド','メジャー','プラネット','ギャラクシー'];
const ICONS322=['🏘️','🗺️','🏟️','🌟','🪐','🌌'];
const K322=['power','speed','stamina','agility','tech','guts'];
const L322={power:'ちから',speed:'スピード',stamina:'スタミナ',agility:'すばやさ',tech:'テクニック',guts:'こんじょう'};
const R322=['C','U','R','SR','SSR','UR','EX'];

function n322(v){return Number(v)||0}
function save322(){try{localStorage.setItem(SAVE322,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.warn('mission322 save',e)}}
function init322(){
  S.missionClaimed=S.missionClaimed||{};
  S.missionClaimed322=S.missionClaimed322||{};
  S.missionBoost322=S.missionBoost322||Object.fromEntries(K322.map(k=>[k,0]));
}
function leagueRank322(){return Math.max(0,Math.min(5,n322(S.leagueRank)))}
function breeds322(){return n322(S.breedCount)}
function gen322(){return Math.max(1,n322(S.generation233)||n322(S.generation232)||1)}
function hist322(){return Array.isArray(S.seasonHistory)?S.seasonHistory:[]}
function wins322(name){return n322(S.leagueWins?.[name])}
function team322(){return Array.isArray(S.nest)?S.nest.filter(Boolean):[]}
function teamAvg322(){
  const a=team322();if(!a.length)return 0;
  return Math.round(a.reduce((sum,m)=>sum+K322.reduce((x,k)=>x+n322(m.stats?.[k]),0)/K322.length,0)/a.length);
}
function maxStat322(){return Math.max(0,...team322().flatMap(m=>K322.map(k=>n322(m.stats?.[k]))))}
function rare322(){return Math.max(-1,...[...(S.nest||[]),...(S.lineage||[]),...(S.starters||[])].filter(Boolean).map(m=>R322.indexOf(m.rarity)))}
function hiddenS322(){
  return [...(S.nest||[]),...(S.lineage||[])].some(m=>{
    let h=m?.hidden233||{};try{h=window.STAR_ANNUAL233?.ensureHidden?.(m)||h}catch(_){}
    return ['growth','heredity','clutch','stability','mutation','luck'].some(k=>n322(h[k])>=7);
  });
}
function meets322(){return hist322().length}
function top3s322(){return hist322().filter(h=>n322(h.overall)<=3).length}

const LEGACY322=[
 {id:'breed3',name:'配合研究Ⅰ',desc:'配合を3回行う',ok:()=>breeds322()>=3,coin:500},
 {id:'breed10',name:'配合研究Ⅱ',desc:'配合を10回行う',ok:()=>breeds322()>=10,coin:1500},
 {id:'season1',name:'大会デビュー',desc:'大会を1回完走する',ok:()=>meets322()>=1,coin:500},
 {id:'season6',name:'六つの舞台',desc:'1世代で6大会を経験する',ok:()=>hist322().some(x=>n322(x.season)===6),coin:2500},
 {id:'win1',name:'初優勝',desc:'大会で総合1位になる',ok:()=>n322(S.wins)>=1,coin:1200},
 {id:'fame1500',name:'注目のスターネスト',desc:'名声1,500に到達',ok:()=>n322(S.fame)>=1500,coin:1800},
 {id:'emblem3',name:'エンブレムコレクター',desc:'スターエンブレムを3個獲得',ok:()=>n322(S.emblems?.length)>=3,coin:2200}
];

const M322=[
 // LOCAL: early floor support
 {id:'l_breed1',tier:0,name:'はじめての研究',desc:'配合を1回行う',ok:()=>breeds322()>=1,coin:200,boost:{power:1,speed:1,stamina:1,agility:1,tech:1,guts:1}},
 {id:'l_meet1',tier:0,name:'初めての舞台',desc:'大会を1回完走する',ok:()=>meets322()>=1,coin:250,boost:{speed:2,agility:2}},
 {id:'l_breed5',tier:0,name:'血統の手応え',desc:'配合を5回行う',ok:()=>breeds322()>=5,coin:350,boost:{power:2,guts:2}},
 {id:'l_top3',tier:0,name:'表彰台へ',desc:'大会で3位以内に1回入る',ok:()=>top3s322()>=1,coin:400,boost:{stamina:2,tech:2}},
 {id:'l_win',tier:0,name:'ローカルの星',desc:'ローカル級で1勝する',ok:()=>wins322('ローカル')>=1,coin:600,boost:{power:1,speed:1,stamina:1,agility:1,tech:1,guts:1}},
 {id:'l_avg150',tier:0,name:'基礎体力完成',desc:'育成3体の平均能力150以上',ok:()=>teamAvg322()>=150,coin:500,boost:{stamina:2,guts:2}},

 // AREA
 {id:'a_entry',tier:1,name:'エリア進出',desc:'エリア級へ昇格する',ok:()=>leagueRank322()>=1,coin:700,boost:{power:1,speed:1,stamina:1,agility:1,tech:1,guts:1}},
 {id:'a_breed12',tier:1,name:'血統研究・エリア',desc:'配合を12回行う',ok:()=>breeds322()>=12,coin:700,boost:{tech:3,agility:3}},
 {id:'a_meet12',tier:1,name:'遠征慣れ',desc:'大会を12回完走する',ok:()=>meets322()>=12,coin:800,boost:{stamina:3,guts:3}},
 {id:'a_stat240',tier:1,name:'一芸240',desc:'いずれかの能力240以上',ok:()=>maxStat322()>=240,coin:900,boost:{speed:2,power:2}},
 {id:'a_win',tier:1,name:'エリア制覇への一歩',desc:'エリア級で1勝する',ok:()=>wins322('エリア')>=1,coin:1100,boost:{power:1,speed:1,stamina:1,agility:1,tech:1,guts:1}},
 {id:'a_avg210',tier:1,name:'エリア基準突破',desc:'育成3体の平均能力210以上',ok:()=>teamAvg322()>=210,coin:1000,boost:{speed:2,agility:2,tech:2}},

 // GRAND
 {id:'g_entry',tier:2,name:'グランド進出',desc:'グランド級へ昇格する',ok:()=>leagueRank322()>=2,coin:1300,boost:{power:2,speed:2,stamina:2,agility:2,tech:2,guts:2}},
 {id:'g_breed20',tier:2,name:'二十配合',desc:'配合を20回行う',ok:()=>breeds322()>=20,coin:1200,boost:{power:3,guts:3}},
 {id:'g_gen5',tier:2,name:'五世代の系譜',desc:'5世代目に到達する',ok:()=>gen322()>=5,coin:1200,boost:{tech:3,stamina:3}},
 {id:'g_top3x5',tier:2,name:'安定の表彰台',desc:'3位以内を通算5回',ok:()=>top3s322()>=5,coin:1400,boost:{speed:3,agility:3}},
 {id:'g_win',tier:2,name:'グランド勝者',desc:'グランド級で1勝する',ok:()=>wins322('グランド')>=1,coin:1700,boost:{power:2,speed:2,stamina:2,agility:2,tech:2,guts:2}},
 {id:'g_avg300',tier:2,name:'300の壁',desc:'育成3体の平均能力300以上',ok:()=>teamAvg322()>=300,coin:1600,boost:{power:3,stamina:3,tech:3}},

 // MAJOR
 {id:'m_entry',tier:3,name:'メジャー進出',desc:'メジャー級へ昇格する',ok:()=>leagueRank322()>=3,coin:2200,boost:{power:2,speed:2,stamina:2,agility:2,tech:2,guts:2}},
 {id:'m_breed35',tier:3,name:'配合職人',desc:'配合を35回行う',ok:()=>breeds322()>=35,coin:1900,boost:{tech:4,agility:4}},
 {id:'m_gen10',tier:3,name:'十世代のネスト',desc:'10世代目に到達する',ok:()=>gen322()>=10,coin:2100,boost:{stamina:4,guts:4}},
 {id:'m_ssr',tier:3,name:'スターの輝き',desc:'SSR以上を1体保有する',ok:()=>rare322()>=R322.indexOf('SSR'),coin:2300,boost:{power:4,speed:4}},
 {id:'m_win',tier:3,name:'メジャー勝者',desc:'メジャー級で1勝する',ok:()=>wins322('メジャー')>=1,coin:2800,boost:{power:2,speed:2,stamina:2,agility:2,tech:2,guts:2}},
 {id:'m_avg420',tier:3,name:'メジャー基準突破',desc:'育成3体の平均能力420以上',ok:()=>teamAvg322()>=420,coin:2600,boost:{speed:4,agility:4,tech:4}},

 // PLANET
 {id:'p_entry',tier:4,name:'プラネット進出',desc:'プラネット級へ昇格する',ok:()=>leagueRank322()>=4,coin:3500,boost:{power:3,speed:3,stamina:3,agility:3,tech:3,guts:3}},
 {id:'p_breed55',tier:4,name:'五十五の配合記録',desc:'配合を55回行う',ok:()=>breeds322()>=55,coin:3000,boost:{power:5,guts:5}},
 {id:'p_gen15',tier:4,name:'十五世代の系譜',desc:'15世代目に到達する',ok:()=>gen322()>=15,coin:3200,boost:{stamina:5,tech:5}},
 {id:'p_hiddenS',tier:4,name:'S因子の発見',desc:'隠し能力Sを1つ発見する',ok:hiddenS322,coin:3500,boost:{speed:5,agility:5}},
 {id:'p_win',tier:4,name:'惑星級の勝者',desc:'プラネット級で1勝する',ok:()=>wins322('プラネット')>=1,coin:4200,boost:{power:3,speed:3,stamina:3,agility:3,tech:3,guts:3}},
 {id:'p_avg560',tier:4,name:'プラネット基準突破',desc:'育成3体の平均能力560以上',ok:()=>teamAvg322()>=560,coin:4000,boost:{power:5,stamina:5,tech:5}},

 // GALAXY
 {id:'x_entry',tier:5,name:'ギャラクシー到達',desc:'ギャラクシー級へ昇格する',ok:()=>leagueRank322()>=5,coin:5500,boost:{power:4,speed:4,stamina:4,agility:4,tech:4,guts:4}},
 {id:'x_breed80',tier:5,name:'血統の巨匠',desc:'配合を80回行う',ok:()=>breeds322()>=80,coin:4500,boost:{tech:6,agility:6}},
 {id:'x_gen20',tier:5,name:'二十世代の伝説',desc:'20世代目に到達する',ok:()=>gen322()>=20,coin:4800,boost:{stamina:6,guts:6}},
 {id:'x_wins15',tier:5,name:'勝者の系譜',desc:'通算15勝する',ok:()=>n322(S.wins)>=15,coin:5200,boost:{power:6,speed:6}},
 {id:'x_win',tier:5,name:'銀河の覇者',desc:'ギャラクシー級で1勝する',ok:()=>wins322('ギャラクシー')>=1,coin:7000,boost:{power:4,speed:4,stamina:4,agility:4,tech:4,guts:4}},
 {id:'x_avg720',tier:5,name:'スターアスリート',desc:'育成3体の平均能力720以上',ok:()=>teamAvg322()>=720,coin:6500,boost:{power:6,speed:6,stamina:6,agility:6,tech:6,guts:6}}
];

function boostText322(b){
  if(!b)return '';
  const vals=K322.map(k=>n322(b[k]));
  if(vals.every(v=>v===vals[0])&&vals[0]>0)return '全能力 +'+vals[0];
  return K322.filter(k=>n322(b[k])>0).map(k=>L322[k]+' +'+n322(b[k])).join(' / ');
}
function rewardText322(m){
  const a=[];if(m.coin)a.push('🪙 '+m.coin);if(m.boost)a.push('🏠 '+boostText322(m.boost));return a.join('　');
}
function applyBoostToRoster322(){
  init322();
  for(const m of team322()){
    if(!m.stats)continue;
    m.missionApplied322=m.missionApplied322||Object.fromEntries(K322.map(k=>[k,0]));
    for(const k of K322){
      const target=n322(S.missionBoost322[k]),done=n322(m.missionApplied322[k]),delta=target-done;
      if(delta){m.stats[k]=n322(m.stats[k])+delta;m.missionApplied322[k]=target}
    }
  }
}
function addBoost322(boost){
  init322();for(const k of K322)S.missionBoost322[k]=n322(S.missionBoost322[k])+n322(boost?.[k]);
  applyBoostToRoster322();
}
function claimLegacy322(id){
  init322();const m=LEGACY322.find(x=>x.id===id);if(!m||!m.ok()||S.missionClaimed[id])return;
  S.missionClaimed[id]=true;S.coins=n322(S.coins)+n322(m.coin);save322();sync322();
}
function claim322(id){
  init322();const m=M322.find(x=>x.id===id);if(!m||leagueRank322()<m.tier||!m.ok()||S.missionClaimed322[id])return;
  if(m.boost&&!team322().length)return;
  S.missionClaimed322[id]=true;S.coins=n322(S.coins)+n322(m.coin);if(m.boost)addBoost322(m.boost);save322();
  try{render()}catch(_){sync322()}
}
function boostSummary322(){
  init322();const b=S.missionBoost322;
  return K322.map(k=>'<span>'+L322[k]+' <b>+'+n322(b[k])+'</b></span>').join('');
}
function renderCard322(m,legacy=false){
  const unlocked=legacy||leagueRank322()>=m.tier,done=legacy?!!S.missionClaimed[m.id]:!!S.missionClaimed322[m.id],ok=unlocked&&m.ok();
  const needRoster=!legacy&&m.boost&&!team322().length;
  const label=done?'受取済':!unlocked?'未開放':!ok?'未達成':needRoster?'3体選出後に受取':'受け取る';
  return '<article class="missionCard322 '+(done?'claimed322 ':'')+(ok?'done322 ':'')+(!unlocked?'locked322':'')+'">'+
    '<div class="missionMain322"><b>'+m.name+'</b><small>'+m.desc+'</small><em>'+rewardText322(m)+'</em></div>'+
    '<button type="button" '+(legacy?'data-legacy322':'data-mission322')+'="'+m.id+'" '+(done||!ok||needRoster?'disabled':'')+'>'+label+'</button></article>';
}
function render322(){
  init322();applyBoostToRoster322();
  const host=document.getElementById('missionHost203');if(!host)return;
  let box=document.getElementById('mission200');if(!box){box=document.createElement('div');box.id='mission200';host.appendChild(box)}
  if(box.parentElement!==host)host.appendChild(box);
  const rank=leagueRank322(),done=M322.filter(m=>S.missionClaimed322[m.id]).length;
  box.className='box mission200 mission322';
  box.innerHTML='<div class="missionHero322"><div><small>NEST MISSION LAB</small><h3>🎯 階級ミッション</h3><p>階級が上がるほど新しい目標が開放。能力報酬は「ネスト基礎値」として今後の育成3体にも引き継がれます。</p></div><strong>'+done+'/'+M322.length+'</strong></div>'+
    '<div class="missionBoost322"><div><b>🏠 現在のネスト基礎ボーナス</b><small>新しく選出した育成3体にも自動適用</small></div><div>'+boostSummary322()+'</div></div>'+
    '<details class="missionLegacy322"><summary>これまでの基礎ミッション <b>'+LEGACY322.filter(m=>S.missionClaimed[m.id]).length+'/'+LEGACY322.length+'</b></summary><div class="missionGrid322">'+LEGACY322.map(m=>renderCard322(m,true)).join('')+'</div></details>'+
    LEAGUES322.map((name,tier)=>{
      const unlocked=rank>=tier,missions=M322.filter(m=>m.tier===tier),cleared=missions.filter(m=>S.missionClaimed322[m.id]),active=missions.filter(m=>!S.missionClaimed322[m.id]);
      return '<section class="missionTier322 '+(!unlocked?'tierLocked322':'')+'"><header><div><small>'+ICONS322[tier]+' CLASS '+(tier+1)+'</small><b>'+name+'級ミッション</b></div><span>'+(unlocked?(cleared.length+'/'+missions.length):'🔒 '+name+'級で開放')+'</span></header>'+
        (active.length?'<div class="missionGrid322">'+active.map(m=>renderCard322(m,false)).join('')+'</div>':'<div class="missionAllClear322">✅ この階級のミッションはすべてクリア</div>')+
        (cleared.length?'<details class="missionCleared322"><summary>✅ クリア済み '+cleared.length+'件</summary><div class="missionGrid322">'+cleared.map(m=>renderCard322(m,false)).join('')+'</div></details>':'')+
      '</section>';
    }).join('');
}
function sync322(){render322();save322()}

document.addEventListener('click',e=>{
  const a=e.target?.closest?.('[data-mission322]');if(a){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();if(!a.disabled)claim322(a.dataset.mission322);return}
  const b=e.target?.closest?.('[data-legacy322]');if(b){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();if(!b.disabled)claimLegacy322(b.dataset.legacy322)}
},true);

try{
  const prev=render;
  render=function(){const out=prev();applyBoostToRoster322();setTimeout(render322,0);return out};
}catch(e){console.warn('mission322 render wrap',e)}

document.addEventListener('click',e=>{
  if(e.target?.closest?.('.tab[data-v="mission203"],#adopt,#annualNext233,#next225,#run,#hatch'))setTimeout(sync322,50);
},true);

const css=document.createElement('style');css.id='mission322css';css.textContent=`
.mission322{background:linear-gradient(180deg,#f6fbff,#edf4ff)!important}
.missionHero322{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;padding:10px;border-radius:13px;background:linear-gradient(135deg,#152742,#244b74);color:#fff;margin-bottom:9px}
.missionHero322 small{font-size:7px;letter-spacing:.13em;color:#76ddff;font-weight:1000}.missionHero322 h3{margin:2px 0 3px}.missionHero322 p{margin:0;font-size:7px;line-height:1.5;color:#d7e8f7}.missionHero322 strong{font-size:16px;color:#ffe06a;white-space:nowrap}
.missionBoost322{border:2px solid #74a8c9;border-radius:12px;background:#fff;padding:9px;margin-bottom:10px}.missionBoost322>div:first-child{display:flex;justify-content:space-between;gap:8px}.missionBoost322 b{font-size:10px}.missionBoost322 small{font-size:7px;color:#64778a}.missionBoost322>div:last-child{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-top:7px}.missionBoost322 span{display:flex;justify-content:space-between;background:#eef6fb;border-radius:7px;padding:5px;font-size:7px}.missionBoost322 span b{font-size:9px;color:#1672a3}
.missionLegacy322{margin:7px 0 12px;border:1px solid #ced9e4;border-radius:10px;background:#fff;padding:7px}.missionLegacy322 summary{font-size:9px;font-weight:1000;cursor:pointer}.missionLegacy322 summary b{float:right}
.missionTier322{margin:10px 0;padding:9px;border:1px solid #c9d7e6;border-radius:12px;background:#fff}.missionTier322>header{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:7px}.missionTier322>header small{display:block;font-size:6px;color:#668099;font-weight:1000;letter-spacing:.12em}.missionTier322>header b{font-size:12px}.missionTier322>header span{font-size:7px;border-radius:999px;background:#eef4f8;padding:4px 7px;font-weight:900}
.missionCleared322{margin-top:8px;border-top:1px dashed #cfd9e3;padding-top:7px}.missionCleared322 summary{font-size:8px;font-weight:1000;color:#4c6577;cursor:pointer;padding:4px 2px}.missionCleared322 .missionGrid322{margin-top:6px}.missionAllClear322{padding:10px;border-radius:9px;background:#eefaf3;color:#2d6c47;font-size:8px;font-weight:1000;text-align:center}.tierLocked322{opacity:.62;background:#f3f5f7}
.missionGrid322{display:grid;gap:6px}.missionCard322{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:center;border:1px solid #d6e0e9;border-radius:10px;background:#fff;padding:8px}.missionCard322.done322{border-color:#6ecf9b;background:#f2fff8}.missionCard322.claimed322{opacity:.66}.missionCard322.locked322{filter:grayscale(.5)}
.missionMain322 b{display:block;font-size:9px}.missionMain322 small{display:block;font-size:7px;color:#657484;margin-top:1px}.missionMain322 em{display:block;font-style:normal;font-size:7px;color:#8a6b16;font-weight:900;margin-top:4px}
.missionCard322 button{min-width:76px;border:0;border-radius:8px;background:#17243a;color:#ffe16a;padding:7px 8px;font-size:7px;font-weight:1000}.missionCard322 button:disabled{opacity:.35}
@media(max-width:430px){.missionBoost322>div:first-child{display:block}.missionBoost322>div:first-child small{display:block;margin-top:2px}.missionBoost322>div:last-child{grid-template-columns:1fr 1fr}.missionCard322{grid-template-columns:1fr}.missionCard322 button{width:100%}}
`;document.head.appendChild(css);

init322();applyBoostToRoster322();setTimeout(sync322,0);
window.STAR_MISSIONS322={sync:sync322,defs:()=>M322.map(x=>({...x})),boost:()=>({...S.missionBoost322}),claim:claim322};
})();