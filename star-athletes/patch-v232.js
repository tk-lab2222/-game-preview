(()=>{
// v0.23.2: S1-S6 annual championship -> promotion only after S6, plus first passive skills.
const SAVE232='star-athletes-save-v200';
const ROSTER232='star-athletes-active-roster-v210';
const K232=['power','speed','stamina','agility','tech','guts'];
const L232={power:'ちから',speed:'スピード',stamina:'スタミナ',agility:'すばやさ',tech:'テクニック',guts:'こんじょう'};
const SK232={
 power:{name:'豪腕',icon:'💥',desc:'大会中 ちから+6%',mul:1.06},
 speed:{name:'疾風',icon:'💨',desc:'大会中 スピード+6%',mul:1.06},
 stamina:{name:'鉄肺',icon:'🔥',desc:'大会中 スタミナ+6%',mul:1.06},
 agility:{name:'軽業',icon:'✨',desc:'大会中 すばやさ+6%',mul:1.06},
 tech:{name:'精密',icon:'🎯',desc:'大会中 テクニック+6%',mul:1.06},
 guts:{name:'勝負魂',icon:'❤️‍🔥',desc:'大会中 こんじょう+6%',mul:1.06}
};
const LEAGUE232=[
 {name:'ローカル',base:135},{name:'エリア',base:225},{name:'グランド',base:335},
 {name:'メジャー',base:455},{name:'プラネット',base:590},{name:'ギャラクシー',base:740}
];
const NPC232=['ガルド','ミーティア','ルーチェ','ノクス','フィオ','セナ','アルト'];
const CHAMP232=[10,7,5,3,2,1,0,0],PTS232=[8,6,5,4,3,2,1,0];
function n232(v){return Number(v)||0}
function clamp232(v,a,b){return Math.max(a,Math.min(b,v))}
function save232(){
 try{localStorage.setItem(SAVE232,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.error('save232',e)}
 try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem(ROSTER232,JSON.stringify(S.nest))}catch(_){}
}
function ensureAnnual232(){
 S.generation232=Math.max(1,n232(S.generation232)||1);
 if(!S.annual232||S.annual232.generation!==S.generation232||S.annual232.league!==n232(S.leagueRank)){
   S.annual232={generation:S.generation232,league:n232(S.leagueRank),season:0,recorded:{},table:[{id:'you',name:'あなた',pts:0,wins:0},...NPC232.map((name,i)=>({id:'npc'+i,name,pts:0,wins:0}))]};
 }
 return S.annual232;
}
function ensureSkill232(m){
 if(!m||!m.stats)return null;
 if(m.skill232&&SK232[m.skill232])return m.skill232;
 let best=K232[0];for(const k of K232)if(n232(m.stats[k])>n232(m.stats[best]))best=k;
 m.skill232=best;return best;
}
function ensureAllSkills232(){for(const m of (S.nest||[]))ensureSkill232(m)}
function seasonEntry232(){
 const arr=Array.isArray(S.seasonHistory)?S.seasonHistory:[];
 for(let i=arr.length-1;i>=0;i--){const h=arr[i];if(n232(h.season)===n232(S.season))return h}
 return null;
}
function shuffle232(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function recordSeason232(){
 const a=ensureAnnual232(),season=clamp232(n232(S.season)||1,1,6),key=String(season);if(a.recorded[key])return;
 const h=seasonEntry232(),rank=clamp232(n232(h?.overall)||8,1,8),p=CHAMP232[rank-1]||0;
 const you=a.table.find(x=>x.id==='you');you.pts+=p;if(rank===1)you.wins++;
 const pool=[...CHAMP232];pool.splice(rank-1,1);const rivalPts=shuffle232(pool);
 shuffle232(a.table.filter(x=>x.id!=='you')).forEach((x,i)=>{x.pts+=rivalPts[i]||0;if((rivalPts[i]||0)===10)x.wins++});
 a.recorded[key]={rank,pts:p};a.season=Math.max(a.season,season);S.promotionPending=false;save232();
}
function standings232(){const a=ensureAnnual232();return [...a.table].sort((x,y)=>y.pts-x.pts||y.wins-x.wins||x.name.localeCompare(y.name,'ja'))}
function rank232(){return standings232().findIndex(x=>x.id==='you')+1}
function renderAnnual232(){
 const train=document.getElementById('train');if(!train)return;let host=document.getElementById('annual232');
 if(!host){host=document.createElement('div');host.id='annual232';host.className='box annual232';const league=document.getElementById('league225');league?.after(host);if(!league)train.prepend(host)}
 const a=ensureAnnual232(),st=standings232();host.innerHTML=`<div class="annualHead232"><div><small>ANNUAL RANKING</small><b>🏆 年間ランキング</b></div><span>S${clamp232(n232(S.season)||1,1,6)}/6</span></div><div class="annualList232">${st.slice(0,4).map((x,i)=>`<div class="${x.id==='you'?'you232':''}"><i>${i+1}</i><b>${x.name}</b><strong>${x.pts}pt</strong></div>`).join('')}</div><small class="annualRule232">S1〜S6の年間1位だけが、S6終了後の昇格戦へ進めます。</small>`;
}
function skillBadges232(){
 ensureAllSkills232();document.querySelectorAll('.train210').forEach(c=>{const id=c.querySelector('[data-m210]')?.dataset.m210,m=(S.nest||[]).find(x=>x.id===id);if(!m)return;const k=ensureSkill232(m),sk=SK232[k];let d=c.querySelector('.skill232');if(!d){d=document.createElement('div');d.className='skill232';c.appendChild(d)}d.innerHTML=`<b>${sk.icon} スキル：${sk.name}</b><span>${sk.desc}</span>`});
}
function score232(stats,e){const s=stats||{};return e==='50m走'?n232(s.speed)*.5+n232(s.agility)*.3+n232(s.tech)*.2:e==='障害物競走'?n232(s.tech)*.4+n232(s.agility)*.35+n232(s.speed)*.15+n232(s.guts)*.1:e==='大玉ころがし'?n232(s.power)*.48+n232(s.stamina)*.3+n232(s.guts)*.22:e==='坂道かけあがり'?n232(s.power)*.35+n232(s.stamina)*.35+n232(s.guts)*.3:e==='10000m走'?n232(s.stamina)*.45+n232(s.guts)*.3+n232(s.speed)*.15+n232(s.tech)*.1:e==='的当て'?n232(s.tech)*.55+n232(s.power)*.2+n232(s.agility)*.15+n232(s.guts)*.1:e==='リレー'?n232(s.speed)*.45+n232(s.tech)*.2+n232(s.agility)*.2+n232(s.guts)*.15:n232(s.power)*.45+n232(s.stamina)*.3+n232(s.guts)*.25}
let activeSkillBoost232=null;
function applySkillBoost232(){
 if(activeSkillBoost232)return;activeSkillBoost232=[];for(const m of (S.nest||[])){const k=ensureSkill232(m),sk=SK232[k];if(!sk)continue;const before=n232(m.stats[k]),after=Math.min(999,Math.round(before*sk.mul)),delta=after-before;m.stats[k]=after;activeSkillBoost232.push({m,k,delta})}
}
function restoreSkillBoost232(){if(!activeSkillBoost232)return;for(const x of activeSkillBoost232)x.m.stats[x.k]=Math.max(0,n232(x.m.stats[x.k])-x.delta);activeSkillBoost232=null}
function watchRestore232(before){let tries=0;const tick=()=>{tries++;const txt=document.getElementById('result')?.textContent||'';if(txt&&txt!==before){restoreSkillBoost232();save232();return}if(tries<150)setTimeout(tick,100);else restoreSkillBoost232()};setTimeout(tick,100)}
function advanceSeason232(){
 recordSeason232();const next=clamp232((n232(S.season)||1)+1,1,6);S.season=next;S.turn=0;S.plans={};S.assign={};S.strat={};S.schedule=[];S.seasonMeet=null;S.rivals225=[];S.rivalsPromo225=false;S.promotionPending=false;try{makeSchedule()}catch(_){}save232();location.replace(location.pathname+'?v=232&season='+next+'&t='+Date.now())
}
function finishGen232(){
 S.needsBreeding=true;S.generationActive=false;S.parents=[];S.cands=[];S.sel=[];S.egg=null;S.turn=0;S.schedule=[];S.plans={};S.assign={};S.strat={};S.season=1;S.seasonMeet=null;S.rivals225=[];S.rivalsPromo225=false;S.promotionPending=false;S.promotionAnnual232=false;S.generation232=(n232(S.generation232)||1)+1;S.annual232=null;try{localStorage.removeItem('star-athletes-force-season-v217')}catch(_){}save232();const u=new URL(location.href);u.search='';u.searchParams.set('v','232');u.searchParams.set('breed','1');u.searchParams.set('t',Date.now());location.replace(u.toString())
}
function nextGenButton232(label='🥚 次世代配合へ'){const p=document.querySelector('#meet .box p');if(!p)return;document.getElementById('next225')?.style.setProperty('display','none','important');let b=document.getElementById('annualNext232');if(!b){b=document.createElement('button');b.id='annualNext232';b.className='btn yl';b.type='button';p.appendChild(b)}b.textContent=label;b.onclick=finishGen232;b.style.display='inline-block'}
function promotionRivals232(){
 const li=clamp232(n232(S.leagueRank)+1,0,LEAGUE232.length-1),lg=LEAGUE232[li];return Array.from({length:7},(_,i)=>{const stats={};for(const k of K232)stats[k]=clamp232(Math.round(lg.base+18+(i-3)*4+(Math.random()*36-18)),70,999);const strong=K232[Math.floor(Math.random()*K232.length)];stats[strong]=clamp232(stats[strong]+35+Math.floor(Math.random()*30),70,999);return{id:'pr'+i,name:NPC232[i],stats,strong}})
}
function showPromotion232(){
 S.promotionAnnual232=true;S.rivals225=promotionRivals232();save232();const r=document.getElementById('result');if(r)r.innerHTML='<div class="notice annualFinal232"><b>🔥 年間王者・昇格戦</b><br>年間ランキング1位！ 次ランクの強敵に勝てば昇格です。</div>';const host=document.getElementById('rival');if(host){const lg=LEAGUE232[clamp232(n232(S.leagueRank)+1,0,LEAGUE232.length-1)];host.innerHTML=`<div class="rivalPanel225 promo225"><div class="rivalTop225"><div><small>PROMOTION BATTLE</small><b>🔥 ${lg.name}級 昇格戦</b></div></div><div class="rivalCards225">${S.rivals225.slice(0,3).map(x=>`<article><header><b>${x.name}</b><em>${L232[x.strong]}型</em></header><div>${K232.map(k=>`<span class="${k===x.strong?'hot225':''}">${L232[k]} <b>${x.stats[k]}</b></span>`).join('')}</div></article>`).join('')}</div></div>`}
 const run=document.getElementById('run');if(run){run.classList.remove('hide');run.disabled=false;run.textContent='🔥 昇格戦スタート';run.onclick=null}document.getElementById('next225')?.style.setProperty('display','none','important');document.getElementById('annualNext232')?.remove();
}
async function runPromotion232(){
 const run=document.getElementById('run');if(!run||run.disabled)return;run.disabled=true;run.textContent='昇格戦中…';const rivals=S.rivals225?.length?S.rivals225:promotionRivals232(),events=(S.schedule&&S.schedule.length)?S.schedule:['50m走','障害物競走','的当て','リレー'],tot=[0,0,0,0,0,0,0,0],rows=[];
 for(let i=0;i<events.length;i++){const e=events[i],m=S.nest.find(x=>x.id===S.assign?.[i])||S.nest.slice().sort((a,b)=>score232(b.stats,e)-score232(a.stats,e))[0],k=ensureSkill232(m),sk=SK232[k],eff={...m.stats,[k]:Math.min(999,Math.round(n232(m.stats[k])*sk.mul))};const scores=[score232(eff,e)*(.96+Math.random()*.08),...rivals.map(x=>score232(x.stats,e)*(.95+Math.random()*.10))],ord=scores.map((v,idx)=>({v,idx})).sort((a,b)=>b.v-a.v);ord.forEach((x,rank)=>tot[x.idx]+=PTS232[rank]||0);const rank=ord.findIndex(x=>x.idx===0)+1;rows.push(`${e}：${rank}位`);const ev=document.getElementById('events');if(ev)ev.innerHTML=`<div class="battleEvent225"><b>${e}</b><span>${m.name} / ${sk.icon}${sk.name}</span><strong>${rank}位</strong></div>`;await new Promise(res=>setTimeout(res,300))}
 const ord=tot.map((v,idx)=>({v,idx})).sort((a,b)=>b.v-a.v),overall=ord.findIndex(x=>x.idx===0)+1,won=overall===1;if(won&&n232(S.leagueRank)<LEAGUE232.length-1)S.leagueRank++;S.promotionAnnual232=false;const r=document.getElementById('result');if(r)r.innerHTML=`<div class="notice leagueResult225 ${won?'win225':'lose225'}"><b>🔥 昇格戦</b><br>${rows.join('<br>')}<hr><strong>${won?'🎉 昇格成功！ '+LEAGUE232[n232(S.leagueRank)].name+'級へ':'昇格失敗… 現ランク残留'}</strong><br>総合${overall}位 / ${tot[0]}pt<br><small>勝敗に関係なく、この世代は終了します。</small></div>`;save232();run.classList.add('hide');run.disabled=false;nextGenButton232();
}
function annualFinish232(){
 recordSeason232();const st=standings232(),rk=rank232(),r=document.getElementById('result');if(r)r.insertAdjacentHTML('beforeend',`<div class="annualFinal232"><b>🏆 年間ランキング確定</b><div>${st.slice(0,5).map((x,i)=>`<span class="${x.id==='you'?'you232':''}">${i+1}位 ${x.name}<strong>${x.pts}pt</strong></span>`).join('')}</div><em>あなた：年間${rk}位</em></div>`);S.promotionPending=false;save232();
 document.getElementById('next225')?.style.setProperty('display','none','important');if(rk===1&&n232(S.leagueRank)<LEAGUE232.length-1){const p=document.querySelector('#meet .box p');let b=document.getElementById('annualNext232');if(!b){b=document.createElement('button');b.id='annualNext232';b.className='btn yl';b.type='button';p?.appendChild(b)}b.textContent='🔥 年間王者・昇格戦へ';b.onclick=showPromotion232;b.style.display='inline-block'}else nextGenButton232(rk===1?'🥚 最高ランク・次世代配合へ':'🥚 次世代配合へ')
}
// Normal league match: apply the athlete's passive skill before v225 reads stats, then subtract only the temporary bonus afterwards.
window.addEventListener('click',e=>{const run=e.target?.closest?.('#run');if(run&&!run.disabled&&!S.promotionAnnual232){const before=document.getElementById('result')?.textContent||'';applySkillBoost232();watchRestore232(before)}},true);
// Own every visible season-advance button: no mid-year promotions.
window.addEventListener('click',e=>{const b=e.target?.closest?.('#next225');if(!b)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();if((n232(S.season)||1)<6)advanceSeason232();else annualFinish232()},true);
window.addEventListener('click',e=>{if(e.target?.closest?.('#run')&&S.promotionAnnual232){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();runPromotion232()}},true);
const before232=render;render=function(){const out=before232();setTimeout(()=>{renderAnnual232();skillBadges232()},0);return out};
const css=document.createElement('style');css.textContent=`.annual232{border:2px solid #cda631!important;background:linear-gradient(145deg,#fff9dc,#fff)!important}.annualHead232{display:flex;justify-content:space-between;align-items:center}.annualHead232 small{display:block;font-size:7px;color:#8a6f17}.annualHead232 b{font-size:13px}.annualHead232>span{font-size:9px;font-weight:1000}.annualList232{display:grid;gap:4px;margin:8px 0}.annualList232>div{display:grid;grid-template-columns:22px 1fr auto;gap:5px;padding:5px 7px;border-radius:8px;background:#fff;border:1px solid #eadb9b;font-size:9px}.annualList232 .you232,.annualFinal232 .you232{background:#fff0a6!important}.annualList232 i{font-style:normal;font-weight:1000}.annualRule232{font-size:7px;color:#74652e}.skill232{margin-top:7px;padding:6px 8px;border-radius:9px;background:#f4edff;border:1px solid #c8afe9;display:flex;justify-content:space-between;gap:6px;align-items:center}.skill232 b{font-size:8px}.skill232 span{font-size:7px;color:#645276}.annualFinal232{margin-top:10px;padding:10px;border:2px solid #d9b13e;border-radius:12px;background:#fff7cf;color:#42350d}.annualFinal232>b{font-size:12px}.annualFinal232>div{display:grid;gap:3px;margin:7px 0}.annualFinal232 span{display:flex;justify-content:space-between;padding:4px 6px;border-radius:6px;background:#fff;font-size:8px}.annualFinal232 em{font-style:normal;font-weight:1000}`;document.head.appendChild(css);
setTimeout(()=>{ensureAnnual232();ensureAllSkills232();renderAnnual232();skillBadges232();save232()},0);
})();