(()=>{
// v0.31.15: visual nemesis UX + first-defeat rewards + Rival Bloodline collection.
const SAVE302='star-athletes-save-v200';
const KEYS302=['power','speed','stamina','agility','tech','guts'];
const LAB302={power:'ちから',speed:'スピード',stamina:'スタミナ',agility:'すばやさ',tech:'テクニック',guts:'こんじょう'};
const NEM302=[
 {name:'疾風のルーチェ',blood:'シルフィード血統',strong:'speed',weak:'power',skill:'風切り',icon:'💨'},
 {name:'鉄壁のガルド',blood:'タイタン血統',strong:'power',weak:'agility',skill:'不動',icon:'🛡️'},
 {name:'慧眼のノクス',blood:'アストラ血統',strong:'tech',weak:'stamina',skill:'先読み',icon:'👁️'},
 {name:'烈火のミーティア',blood:'フェニクス血統',strong:'guts',weak:'tech',skill:'逆境',icon:'🔥'},
 {name:'蒼穹のセナ',blood:'アルタイル血統',strong:'agility',weak:'stamina',skill:'瞬転',icon:'🪽'},
 {name:'星海のクロウ',blood:'オリオン血統',strong:'stamina',weak:'agility',skill:'星巡り',icon:'🌌'}
];
const REW302=[
 {coin:500,fame:60},{coin:700,fame:80},{coin:900,fame:110},
 {coin:1200,fame:150},{coin:1600,fame:200},{coin:2200,fame:300}
];
function save302(){try{localStorage.setItem(SAVE302,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.warn('save302',e)}}
function st302(){
 S.nemesis268=S.nemesis268&&typeof S.nemesis268==='object'?S.nemesis268:{defeated:{},seen:{}};
 S.nemesis268.defeated=S.nemesis268.defeated||{};
 S.nemesis268.seen=S.nemesis268.seen||{};
 S.nemesisRewards302=S.nemesisRewards302||{};
 return S.nemesis268;
}
function gen302(){return Math.max(1,Number(S?.generation233||S?.generation||1))}
function rewardNew302(){
 const st=st302();let gained=[];
 for(let rank=0;rank<NEM302.length;rank++){
   if(!st.defeated[rank]||S.nemesisRewards302[rank])continue;
   const rw=REW302[rank];
   S.coins=(Number(S.coins)||0)+rw.coin;
   S.fame=(Number(S.fame)||0)+rw.fame;
   S.nemesisRewards302[rank]={at:Date.now(),coin:rw.coin,fame:rw.fame};
   const d=st.defeated[rank];
   if(d&&typeof d==='object'){d.generation=d.generation||gen302();d.reward302={...rw}}
   gained.push({rank,...rw});
 }
 if(gained.length){save302();showReward302(gained)}
 return gained;
}
function showReward302(list){
 const r=document.getElementById('result');if(!r)return;
 list.forEach(x=>{
   const n=NEM302[x.rank],d=document.createElement('div');
   d.className='nemReward302';
   d.innerHTML=`<span>🏅 RIVAL DEFEATED</span><b>${n.icon} ${n.name}</b><em>🪙 +${x.coin}　⭐ +${x.fame}</em>`;
   r.appendChild(d);
 });
}
function battleCard302(){
 const host=document.getElementById('rival');if(!host)return;
 let old=document.getElementById('nemesisCard268');
 if(!old){old=document.createElement('div');old.id='nemesisCard268';host.prepend(old)}
 const rank=Math.max(0,Math.min(5,Number(S.leagueRank)||0)),n=NEM302[rank],st=st302(),def=!!st.defeated[rank],rw=REW302[rank];
 old.innerHTML=`<div class="nem302 ${def?'def302':''}">
   <header>
    <div class="nemAvatar302 ${def?'defAvatar302':''}"><span>${n.icon}</span></div>
    <div><small>RIVAL BLOODLINE</small><b>${n.name}</b><em>${n.blood}</em></div>
    <strong>${def?'✓ 撃破済':'⚔️ 宿敵'}</strong>
   </header>
   <div class="nemVs302">
    <div class="up302"><small>得意 ↑</small><b>${LAB302[n.strong]}</b></div>
    <div class="skill302"><small>SKILL</small><b>${n.skill}</b></div>
    <div class="down302"><small>弱点 ↓</small><b>${LAB302[n.weak]}</b></div>
   </div>
   <div class="nemBottom302"><span>${def?'図鑑登録済':'総合1位で撃破'}</span><b>🏅 🪙${rw.coin} + ⭐${rw.fame}</b></div>
  </div>`;
}
function collection302(){
 const dex=document.getElementById('dex');if(!dex)return;
 let box=document.getElementById('nemesisDex302');
 if(!box){box=document.createElement('div');box.id='nemesisDex302';box.className='box nemesisDex302';dex.appendChild(box)}
 const st=st302(),count=Object.keys(st.defeated).filter(k=>st.defeated[k]).length;
 box.innerHTML=`<div class="dexHead302"><div><small>RIVAL BLOODLINE</small><h3>⚔️ 宿敵図鑑</h3></div><b>${count}/6</b></div>
 <div class="nemDexGrid302">${NEM302.map((n,i)=>{
   const d=st.defeated[i],seen=st.seen[i]||d,rw=REW302[i];
   if(!seen)return `<article class="locked302"><div>？</div><b>未遭遇</b><small>リーグを進めよう</small></article>`;
   return `<article class="${d?'done302':''}"><div class="dexIcon302">${n.icon}</div><b>${n.name}</b><small>${n.blood}</small><p><span>↑ ${LAB302[n.strong]}</span><span>↓ ${LAB302[n.weak]}</span></p><em>${d?`✓ 撃破 G${d.generation||'?'} / S${d.season||'?'}`:`⚔️ 未撃破`}</em><strong>${d?'🏅 記録済':`報酬 🪙${rw.coin}`}</strong></article>`;
 }).join('')}</div>`;
}
function sync302(){rewardNew302();battleCard302();collection302()}
const result=document.getElementById('result');
if(result){new MutationObserver(()=>[0,80,250].forEach(ms=>setTimeout(sync302,ms))).observe(result,{childList:true,subtree:true,characterData:true})}
try{const prev=render;render=function(){const out=prev();[0,50,160].forEach(ms=>setTimeout(sync302,ms));return out}}catch(e){console.warn('render302',e)}
document.addEventListener('click',e=>{if(e.target?.closest?.('.tab,#run,#toMeet'))[0,80,250].forEach(ms=>setTimeout(sync302,ms))},true);
const css=document.createElement('style');css.id='nemesis302Style';css.textContent=`
.nem302{margin:0 0 9px;padding:10px;border:2px solid #8f3946;border-radius:14px;background:linear-gradient(145deg,#fff7f8,#fff);box-shadow:0 4px 0 #0001}
.nem302.def302{border-color:#5c9a70;background:linear-gradient(145deg,#f2fff6,#fff)}
.nem302 header{display:grid;grid-template-columns:46px 1fr auto;gap:8px;align-items:center}
.nemAvatar302{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:#351821;border:2px solid #a85461;box-shadow:inset 0 0 0 4px #ffffff13}
.nemAvatar302 span{font-size:22px}.defAvatar302{background:#173722;border-color:#65ad7a}
.nem302 header small{display:block;font-size:6px;font-weight:1000;letter-spacing:.12em;color:#9a5260}.nem302 header b{display:block;font-size:12px}.nem302 header em{display:block;font-size:7px;font-style:normal;color:#775d63}.nem302 header strong{font-size:7px;border:1px solid currentColor;border-radius:999px;padding:4px 7px;white-space:nowrap;color:#983848}.def302 header strong{color:#337348}
.nemVs302{display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;margin:8px 0}.nemVs302>div{border-radius:9px;padding:7px;text-align:center;background:#fff;border:1px solid #ddd}.nemVs302 small{display:block;font-size:6px}.nemVs302 b{font-size:9px}.up302{color:#a53c32}.down302{color:#276b9b}.skill302{color:#6d4c8f}
.nemBottom302{display:flex;justify-content:space-between;align-items:center;gap:8px;padding-top:6px;border-top:1px dashed #d9c8cc}.nemBottom302 span{font-size:7px;font-weight:900;color:#6b6264}.nemBottom302 b{font-size:8px;color:#8b6815}
.nemReward302{margin-top:8px;padding:10px;border:2px solid #d8b644;border-radius:12px;background:#fff6bf;text-align:center}.nemReward302 span,.nemReward302 b,.nemReward302 em{display:block}.nemReward302 span{font-size:6px;font-weight:1000;letter-spacing:.12em}.nemReward302 b{font-size:12px;margin:2px 0}.nemReward302 em{font-size:9px;font-style:normal;font-weight:1000}
.nemesisDex302{background:linear-gradient(180deg,#f9f7ff,#fff)!important}.dexHead302{display:flex;justify-content:space-between;align-items:center}.dexHead302 small{display:block;font-size:7px;font-weight:1000;letter-spacing:.12em;color:#705b8d}.dexHead302 h3{margin:1px 0}.dexHead302>b{background:#262034;color:#e9dcff;border-radius:999px;padding:6px 10px;font-size:10px}
.nemDexGrid302{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:8px}.nemDexGrid302 article{min-width:0;padding:9px;border:1px solid #cabfd7;border-radius:11px;background:#fff;text-align:center}.nemDexGrid302 article.done302{background:#f2fff5;border-color:#7ab78a}.nemDexGrid302 article.locked302{opacity:.48;filter:grayscale(1)}.nemDexGrid302 article>div:first-child{font-size:24px}.nemDexGrid302 article>b{display:block;font-size:9px}.nemDexGrid302 article>small{display:block;font-size:6px;color:#746b7c}.nemDexGrid302 article p{display:flex;justify-content:center;gap:4px;margin:5px 0}.nemDexGrid302 article p span{font-size:6px;border:1px solid #ddd;border-radius:999px;padding:2px 4px}.nemDexGrid302 article em,.nemDexGrid302 article strong{display:block;font-size:6px;font-style:normal}.nemDexGrid302 article strong{margin-top:3px;color:#8a6c19}
@media(max-width:360px){.nemDexGrid302{grid-template-columns:1fr}.nem302 header{grid-template-columns:42px 1fr}.nem302 header>strong{grid-column:1/-1;justify-self:start}}
`;document.head.appendChild(css);
[0,100,300].forEach(ms=>setTimeout(sync302,ms));
window.STAR_NEMESIS302={sync:sync302};
})();