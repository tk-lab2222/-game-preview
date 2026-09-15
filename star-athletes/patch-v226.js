(()=>{
// v0.22.6: 999-cap growth loop.
// - Existing saves migrate safely: current stats become genetic base.
// - Training gains are temporary-to-the-athlete; 25% is inherited by children.
// - Match performance can add small real-stat growth.
// - Rival strength now uses the full 100-900 long-term range.
const SAVE226='star-athletes-save-v200';
const ROSTER226='star-athletes-active-roster-v210';
const K226=['power','speed','stamina','agility','tech','guts'];
const L226={power:'ちから',speed:'スピード',stamina:'スタミナ',agility:'すばやさ',tech:'テクニック',guts:'こんじょう'};
const LEAGUE226=[
 {name:'ローカル',base:135,strong:[20,35]},
 {name:'エリア',base:225,strong:[28,45]},
 {name:'グランド',base:335,strong:[35,55]},
 {name:'メジャー',base:455,strong:[42,65]},
 {name:'プラネット',base:590,strong:[50,78]},
 {name:'ギャラクシー',base:740,strong:[60,95]}
];
const RIVAL226=['ガルド','ミーティア','ルーチェ','ノクス','フィオ','セナ','アルト','ミラ','クロウ','ティア','レイン','ベル'];
function n226(v){return Number(v)||0}
function clamp226(v,a,b){return Math.max(a,Math.min(b,v))}
function rnd226(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function save226(){
 try{localStorage.setItem(SAVE226,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.warn('save226',e)}
 try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem(ROSTER226,JSON.stringify(S.nest))}catch(e){console.warn('roster226',e)}
}
function meta226(m){
 if(!m||!m.stats)return;
 if(!m.geneticBase226){m.geneticBase226={};K226.forEach(k=>m.geneticBase226[k]=n226(m.stats[k]))}
 if(!m.trainingGain226){m.trainingGain226={};K226.forEach(k=>m.trainingGain226[k]=0)}
 if(!m.matchGain226){m.matchGain226={};K226.forEach(k=>m.matchGain226[k]=0)}
}
function migrate226(){
 const seen=new Set();
 ['starters','nest','lineage','released','cands','foster'].forEach(key=>(S[key]||[]).forEach(m=>{if(m&&!seen.has(m.id)){seen.add(m.id);meta226(m)}}));
 if(S.egg)meta226(S.egg);
 save226();
}
function acquired226(m,k){meta226(m);return n226(m.trainingGain226[k])+n226(m.matchGain226[k])}
function inherited226(m,k){meta226(m);return n226(m.geneticBase226[k])+acquired226(m,k)*.25}

// Children inherit the stable bloodline plus 25% of the parents' earned growth.
// The old baby() still owns species, rarity, looks and cute-name wrappers.
try{
 const beforeBaby226=baby;
 baby=function(a,b){
   meta226(a);meta226(b);
   const c=beforeBaby226(a,b);meta226(c);
   const ri=Math.max(0,typeof R!=='undefined'?R.indexOf(c.rarity):0);
   const bias=(typeof SP!=='undefined'&&SP[c.species]&&SP[c.species][2])?SP[c.species][2]:{};
   K226.forEach(k=>{
     const av=(inherited226(a,k)+inherited226(b,k))/2;
     const hi=Math.max(inherited226(a,k),inherited226(b,k));
     const val=Math.round(av*.75+hi*.25+rnd226(-3,5)+n226(bias[k])*.08+ri*1.5);
     c.stats[k]=clamp226(val,40,999);
   });
   c.geneticBase226={};c.trainingGain226={};c.matchGain226={};
   K226.forEach(k=>{c.geneticBase226[k]=c.stats[k];c.trainingGain226[k]=0;c.matchGain226[k]=0});
   return c;
 };
}catch(e){console.warn('inherit226',e)}

function leagueIndex226(promo){return clamp226((Number.isInteger(S.leagueRank)?S.leagueRank:0)+(promo?1:0),0,LEAGUE226.length-1)}
function rivalSeedKey226(promo){return `${leagueIndex226(promo)}:${n226(S.season)||1}:${promo?1:0}`}
function seedRivals226(promo=false,force=false){
 const key=rivalSeedKey226(promo);
 if(!force&&S.rivalsScale226===key&&Array.isArray(S.rivals225)&&S.rivals225.length===7)return S.rivals225;
 const li=leagueIndex226(promo),lg=LEAGUE226[li],season=clamp226(n226(S.season)||1,1,6);
 const seasonBoost=(season-1)*4,promoBoost=promo?18:0;
 S.rivals225=Array.from({length:7},(_,i)=>{
   const stats={},bias=lg.base+seasonBoost+promoBoost+(i-3)*4;
   K226.forEach(k=>stats[k]=clamp226(Math.round(bias+rnd226(-18,18)),70,970));
   const strong=K226[rnd226(0,K226.length-1)],sr=lg.strong;
   stats[strong]=clamp226(stats[strong]+rnd226(sr[0],sr[1]),70,999);
   return{id:'r'+i,name:RIVAL226[(li*3+i+season-1)%RIVAL226.length],stats,strong};
 });
 S.rivalsPromo225=promo;S.rivalsScale226=key;save226();return S.rivals225;
}
function avg226(stats){return Math.round(K226.reduce((a,k)=>a+n226(stats[k]),0)/K226.length)}
function teamAvg226(){return S.nest&&S.nest.length?Math.round(S.nest.reduce((a,m)=>a+avg226(m.stats||{}),0)/S.nest.length):0}
function chance226(rs){
 const ours=teamAvg226(),theirs=Math.round(rs.reduce((a,r)=>a+avg226(r.stats),0)/rs.length),d=ours-theirs;
 const pct=clamp226(Math.round(50+d*.32),8,92);
 return{ours,theirs,pct,label:pct>=72?'かなり有利':pct>=58?'やや有利':pct>=42?'互角':pct>=28?'やや不利':'強敵注意'};
}
function drawRivals226(promo=false){
 const host=document.getElementById('rival');if(!host)return;
 const rs=seedRivals226(promo),c=chance226(rs),lg=LEAGUE226[leagueIndex226(promo)];
 host.innerHTML=`<div class="rivalPanel225 ${promo?'promo225':''}"><div class="rivalTop225"><div><small>${promo?'PROMOTION BATTLE':'RIVAL SCOUT'}</small><b>${promo?'🔥 昇格戦':'👀 注目ライバル'} / ${lg.name}級</b></div><div class="chance225"><span>勝利見込み</span><strong>${c.pct}%</strong><em>${c.label}</em></div></div><div class="powerCompare225"><span>自軍平均 <b>${c.ours}</b></span><i></i><span>相手平均 <b>${c.theirs}</b></span></div><div class="rivalCards225">${rs.slice(0,3).map(r=>`<article><header><b>${r.name}</b><em>${L226[r.strong]}型</em></header><div>${K226.map(k=>`<span class="${k===r.strong?'hot225':''}">${L226[k]} <b>${r.stats[k]}</b></span>`).join('')}</div></article>`).join('')}</div><small class="rivalNote225">※表示値を実際の大会計算に使用。上位リーグほど能力帯が大きく上昇します。</small></div>`;
}

function eventKeys226(e){return e==='50m走'?['speed','agility','tech']:e==='障害物競走'?['tech','agility','speed']:e==='大玉ころがし'?['power','stamina','guts']:e==='坂道かけあがり'?['power','stamina','guts']:e==='10000m走'?['stamina','guts','speed']:e==='的当て'?['tech','power','agility']:e==='リレー'?['speed','tech','agility']:['power','stamina','guts']}
function highMul226(v){return v>=990?.2:v>=950?.4:v>=850?.65:v>=700?.85:1}
function addMatch226(m,k,raw){
 meta226(m);const cur=n226(m.stats[k]),gain=Math.max(0,Math.round(raw*highMul226(cur))),next=Math.min(999,cur+gain),actual=next-cur;
 m.stats[k]=next;m.matchGain226[k]=n226(m.matchGain226[k])+actual;return actual;
}
function applyMatchGrowth226(text,promo){
 const logs=[];
 (S.schedule||[]).forEach((e,i)=>{
   const match=text.match(new RegExp(e.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'：([1-8])位'));
   if(!match)return;
   const rank=Number(match[1]),m=(S.nest||[]).find(x=>x.id===S.assign?.[i])||S.nest?.[0];if(!m)return;
   let chance=rank===1?.40:rank<=3?.20:.05;if(Math.random()>=chance)return;
   const k=eventKeys226(e)[0],raw=rank===1?rnd226(1,3):rnd226(1,2),g=addMatch226(m,k,raw);
   if(g>0)logs.push(`${m.name} ${L226[k]}+${g}`);
 });
 if(promo&&/昇格成功/.test(text)){
   const used=new Set();
   (S.schedule||[]).forEach((e,i)=>{
     const m=(S.nest||[]).find(x=>x.id===S.assign?.[i]);if(!m||used.has(m.id))return;used.add(m.id);
     const k=eventKeys226(e)[0],g=addMatch226(m,k,2);if(g>0)logs.push(`🔥${m.name} ${L226[k]}+${g}`);
   });
 }
 if(logs.length){
   const r=document.getElementById('result');if(r)r.insertAdjacentHTML('beforeend',`<div class="matchGrowth226"><b>⭐ 実戦成長！</b><br>${logs.join('<br>')}</div>`);
   save226();
 }
}
function watchBattle226(promo){
 const result=document.getElementById('result'),before=result?result.textContent:'';let tries=0;
 const tick=()=>{
   tries++;const r=document.getElementById('result'),txt=r?r.textContent:'';
   if(txt&&txt!==before&&/総合\d+位/.test(txt)){applyMatchGrowth226(txt,promo);return}
   if(tries<120)setTimeout(tick,120);
 };
 setTimeout(tick,120);
}

// Seed full-range rivals before v225 renders/uses them.
document.addEventListener('click',e=>{
 const to=e.target.closest?.('#toMeet'),meet=e.target.closest?.('.tab[data-v="meet"]');
 if((to||meet)&&(n226(S.turn)>=3)){seedRivals226(false)}
 const next=e.target.closest?.('#next225');
 if(next&&S.promotionPending){setTimeout(()=>{seedRivals226(true,true);drawRivals226(true)},0)}
 const run=e.target.closest?.('#run');
 if(run&&!run.disabled){const promo=!!S.rivalsPromo225;watchBattle226(promo)}
},true);

// Small visible checkpoint so growth inheritance is understandable while testing.
function badges226(){
 document.querySelectorAll('.train210').forEach(c=>{
   if(c.querySelector('.growth226'))return;const id=c.querySelector('[data-m210]')?.dataset.m210,m=(S.nest||[]).find(x=>x.id===id);if(!m)return;meta226(m);
   const tg=Math.round(K226.reduce((a,k)=>a+n226(m.trainingGain226[k]),0)),mg=Math.round(K226.reduce((a,k)=>a+n226(m.matchGain226[k]),0));
   const d=document.createElement('div');d.className='growth226';d.textContent=`血統基礎 + 現役育成　練習+${tg} / 実戦+${mg}`;c.appendChild(d);
 });
}
const oldRender226=render;
render=function(){const out=oldRender226();setTimeout(badges226,0);return out};
const css=document.createElement('style');css.textContent=`.growth226{margin-top:7px;padding:5px 7px;border-radius:8px;background:#edf7ff;border:1px solid #acd5ef;color:#35546c;font-size:7px;font-weight:900}.matchGrowth226{margin-top:9px;padding:9px;border:2px solid #e7c454;border-radius:11px;background:#fff8d8;color:#594915;font-size:9px;line-height:1.6}.matchGrowth226 b{font-size:11px}`;document.head.appendChild(css);
setTimeout(()=>{migrate226();badges226()},0);
})();