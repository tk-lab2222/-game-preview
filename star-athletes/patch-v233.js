(()=>{
// v0.23.3: integrated hidden traits + compatibility scouting + earned/inherited skills.
// Replaces v0.23.2 annual/skill patch. Skills are optional; promotion battles are the main acquisition event.
const SAVE233='star-athletes-save-v200',ROSTER233='star-athletes-active-roster-v210',ROSTER209_233='star-athletes-active-roster-v209';
const K233=['power','speed','stamina','agility','tech','guts'];
const L233={power:'ちから',speed:'スピード',stamina:'スタミナ',agility:'すばやさ',tech:'テクニック',guts:'こんじょう'};
const RK233=['G','F','E','D','C','B','A','S'];
const SK233={
 power:{name:'豪腕',icon:'💥',desc:'ちから+6%',key:'power',mul:1.06},
 speed:{name:'疾風',icon:'💨',desc:'スピード+6%',key:'speed',mul:1.06},
 stamina:{name:'鉄肺',icon:'🔥',desc:'スタミナ+6%',key:'stamina',mul:1.06},
 agility:{name:'軽業',icon:'✨',desc:'すばやさ+6%',key:'agility',mul:1.06},
 tech:{name:'精密',icon:'🎯',desc:'テクニック+6%',key:'tech',mul:1.06},
 guts:{name:'勝負魂',icon:'❤️‍🔥',desc:'こんじょう+6%',key:'guts',mul:1.06}
};
const LEAGUE233=[{name:'ローカル',base:135},{name:'エリア',base:225},{name:'グランド',base:335},{name:'メジャー',base:455},{name:'プラネット',base:590},{name:'ギャラクシー',base:740}];
const NPC233=['ガルド','ミーティア','ルーチェ','ノクス','フィオ','セナ','アルト'];
const CHAMP233=[10,7,5,3,2,1,0,0],PTS233=[8,6,5,4,3,2,1,0];
const TEMPER233=['大胆','冷静','粘り強い','慎重'];
function n233(v){return Number(v)||0}function clamp233(v,a,b){return Math.max(a,Math.min(b,v))}function rnd233(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function save233(){
 try{localStorage.setItem(SAVE233,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.error('save233',e)}
 try{
   if(Array.isArray(S.nest)&&S.nest.length===3){
     const raw=JSON.stringify(S.nest);
     localStorage.setItem(ROSTER233,raw);
     localStorage.setItem(ROSTER209_233,raw);
   }
 }catch(_){}
}
function all233(){const a=[],seen=new Set();for(const key of ['starters','nest','lineage','released','cands','foster'])for(const m of(S[key]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);a.push(m)}if(S.egg&&!seen.has(S.egg.id))a.push(S.egg);return a}
function rarityBonus233(m){try{return Math.max(0,R.indexOf(m.rarity))}catch(_){return 0}}
function traitDist233(gen){
 const g=Math.max(0,Math.min(20,n233(gen)));
 const anchors=[
  {g:0, p:[.26,.28,.24,.14,.06,.016,.0035,.0005]},
  {g:5, p:[.15,.24,.26,.20,.105,.035,.009,.001]},
  {g:10,p:[.08,.16,.24,.25,.18,.07,.018,.002]},
  {g:15,p:[.04,.10,.18,.25,.25,.13,.045,.005]},
  {g:20,p:[.02,.06,.13,.22,.29,.20,.07,.01]}
 ];
 let a=anchors[0],b=anchors[anchors.length-1];
 for(let i=0;i<anchors.length-1;i++)if(g>=anchors[i].g&&g<=anchors[i+1].g){a=anchors[i];b=anchors[i+1];break}
 const t=a.g===b.g?0:(g-a.g)/(b.g-a.g);
 const p=a.p.map((v,i)=>v+(b.p[i]-v)*t);
 const sum=p.reduce((x,y)=>x+y,0);
 return p.map(x=>x/sum)
}
function rollRank233(m,bias=0){
 const p=traitDist233(m?.gen||0).slice();
 // Positive bias shifts a small amount of mass upward without skipping the curve.
 const sh=Math.max(0,Math.min(.06,Number(bias)||0));
 if(sh>0){
   const move=Math.min(p[0],sh*.35);p[0]-=move;p[2]+=move*.45;p[3]+=move*.35;p[4]+=move*.17;p[5]+=move*.03;
 }
 const u=Math.random();let acc=0;
 for(let i=0;i<p.length;i++){acc+=p[i];if(u<acc)return i}
 return 0
}
function hidden233(m){if(!m)return null;if(!m.hidden233){m.hidden233={growth:rollRank233(m),heredity:rollRank233(m),clutch:rollRank233(m),stability:rollRank233(m),mutation:rollRank233(m),luck:rollRank233(m),temperament:TEMPER233[rnd233(0,3)]}}if(!Array.isArray(m.skills233))m.skills233=[];return m.hidden233}
function migrate233(){
 // Preserve old E/D/C/B/A/S labels when expanding to G/F/E/D/C/B/A/S.
 if(!S.hiddenRankV314){
   for(const m of all233()){
     if(m?.hidden233){
       for(const k of ['growth','heredity','clutch','stability','mutation','luck']){
         if(Number.isFinite(Number(m.hidden233[k])))m.hidden233[k]=clamp233(n233(m.hidden233[k])+2,2,7);
       }
     }
   }
   S.hiddenRankV314=true;
 }
 for(const m of all233()){hidden233(m);if(!S.skillMigration233){delete m.skill232}}
 if(!S.skillMigration233)S.skillMigration233=true;
 if(!S.annual233&&S.annual232){try{S.annual233=JSON.parse(JSON.stringify(S.annual232))}catch(_){}}
 save233();
}
function repairEarlyHidden233(){
 if(S.hiddenEarlyBalanceV315)return;
 let changed=false;
 for(const m of all233()){
   const gen=Math.max(0,n233(m?.gen));
   if(gen>2||!m?.hidden233)continue;
   const keys=['growth','heredity','clutch','stability','mutation','luck'];
   const high=keys.filter(k=>n233(m.hidden233[k])>=5).length;
   // Four or more B-S traits at G0-G2 is an unmistakable old-balance outlier.
   if(high<4)continue;
   for(const k of keys)m.hidden233[k]=rollRank233(m);
   changed=true;
 }
 S.hiddenEarlyBalanceV315=true;
 if(changed)save233();
}

function rankName233(v){return RK233[clamp233(n233(v),0,7)]}
function topStat233(m){let k=K233[0];for(const x of K233)if(n233(m.stats?.[x])>n233(m.stats?.[k]))k=x;return k}
function skillEffect233(m,stats){const out={...stats};for(const id of(m.skills233||[])){const sk=SK233[id];if(sk)out[sk.key]=Math.min(999,Math.round(n233(out[sk.key])*sk.mul))}return out}
function skillPills233(){
 document.querySelectorAll('.skill232').forEach(x=>x.remove());
 document.querySelectorAll('.train210').forEach(c=>{const id=c.querySelector('[data-m210]')?.dataset.m210,m=(S.nest||[]).find(x=>x.id===id);if(!m)return;hidden233(m);c.querySelector('.skills233')?.remove();if(!m.skills233.length)return;const host=c.querySelector('header>div')||c;const d=document.createElement('div');d.className='skills233';d.innerHTML=m.skills233.slice(0,3).map(id=>SK233[id]?`<span title="${SK233[id].desc}">${SK233[id].icon} ${SK233[id].name}</span>`:'').join('');host.appendChild(d)})
}
// ---------- strict parent compatibility / hidden-info disclosure ----------
const PAIR233={draco:{draco:14,unil:22,grimo:20,puru:18},unil:{draco:22,unil:14,grimo:23,puru:19},grimo:{draco:20,unil:23,grimo:14,puru:22},puru:{draco:18,unil:19,grimo:22,puru:15}};
const PERS233={熱血:{熱血:8,冷静:20,負けず嫌い:14,お調子者:12,臆病:10,マイペース:16},冷静:{熱血:20,冷静:13,負けず嫌い:17,お調子者:15,臆病:18,マイペース:16},負けず嫌い:{熱血:14,冷静:17,負けず嫌い:9,お調子者:12,臆病:15,マイペース:18},お調子者:{熱血:12,冷静:15,負けず嫌い:12,お調子者:10,臆病:17,マイペース:16},臆病:{熱血:10,冷静:18,負けず嫌い:15,お調子者:17,臆病:11,マイペース:19},マイペース:{熱血:16,冷静:16,負けず嫌い:18,お調子者:16,臆病:19,マイペース:12}};
function compatibility233(a,b){
 hidden233(a);hidden233(b);
 const species=PAIR233[a.species]?.[b.species]??17;
 const personality=PERS233[a.personality]?.[b.personality]??14;
 const ta=topStat233(a),tb=topStat233(b);let ability=ta!==tb?16:10;
 const weakA=K233.slice().sort((x,y)=>n233(a.stats[x])-n233(a.stats[y]))[0],weakB=K233.slice().sort((x,y)=>n233(b.stats[x])-n233(b.stats[y]))[0];if(ta===weakB||tb===weakA)ability+=4;
 const blood=Math.max(5,15-Math.max(0,4-Math.abs(n233(a.gen)-n233(b.gen)))*2-(a.origin&&b.origin&&a.origin===b.origin?4:0));
 let visual=4;if(a.visual?.color!==b.visual?.color)visual+=2;if(a.visual?.pattern!==b.visual?.pattern)visual+=2;if(a.visual?.part!==b.visual?.part)visual+=2;
 const h1=a.hidden233,h2=b.hidden233;const chemistry=clamp233(Math.round((h1.heredity+h2.heredity+h1.stability+h2.stability)/2),0,10);
 const total=clamp233(species+personality+ability+blood+visual+chemistry,0,100);
 return{total,species,personality,ability,blood,visual,chemistry}
}
function compatLabel233(s){return s>=90?'✨ 運命的':s>=75?'★ とても良い':s>=60?'◎ 好相性':s>=40?'○ まずまず':'△ かみ合いにくい'}
function reveal233(a,b,score){const h=(k)=>rankName233(Math.round((n233(a.hidden233[k])+n233(b.hidden233[k]))/2)),arr=[];if(score>=40)arr.push(['成長力',h('growth')]);if(score>=60){arr.push(['遺伝力',h('heredity')],['安定性',h('stability')])}if(score>=75){arr.push(['勝負強さ',h('clutch')],['気性',a.hidden233.temperament+' × '+b.hidden233.temperament])}if(score>=90)arr.push(['変異因子',h('mutation')],['LUCK',h('luck')]);return arr}
function renderCompat233(){
 const parents=document.querySelector('#breed .parents');if(!parents)return;let box=document.getElementById('compat233');if(!box){box=document.createElement('div');box.id='compat233';box.className='compat233';parents.after(box)}
 const pool=typeof breederPool==='function'?breederPool():all233(),ids=Array.isArray(S.parents)?S.parents:[],a=pool.find(x=>x.id===ids[0]),b=pool.find(x=>x.id===ids[1]);if(!a||!b){box.classList.add('hide');box.innerHTML='';return}box.classList.remove('hide');const c=compatibility233(a,b),rev=reveal233(a,b,c.total);
 box.innerHTML=`<div class="compatHead233"><div><small>BREEDING CHEMISTRY</small><b>相性 ${c.total}</b></div><strong>${compatLabel233(c.total)}</strong></div><div class="compatBar233"><i style="width:${c.total}%"></i></div><div class="compatBreak233">種族 ${c.species}/25 ・ 性格 ${c.personality}/20 ・ 能力補完 ${c.ability}/20 ・ 血統 ${c.blood}/15 ・ 特徴 ${c.visual}/10 ・ 遺伝相性 ${c.chemistry}/10</div>${rev.length?`<div class="reveal233"><small>この組み合わせで読み取れる素質</small>${rev.map(x=>`<span><b>${x[0]}</b><em>${x[1]}</em></span>`).join('')}</div>`:'<div class="compatHint233">相性が上がると、配合前に読み取れる素質が増えます。</div>'}`
}
// ---------- inheritance ----------
try{
 const beforeBaby233=baby;
 baby=function(a,b){hidden233(a);hidden233(b);const c=beforeBaby233(a,b);hidden233(c);const ha=a.hidden233,hb=b.hidden233,hc=c.hidden233;
   for(const k of ['growth','heredity','clutch','stability','mutation','luck']){
     const base=n233(hc[k]);
     const avg=(n233(ha[k])+n233(hb[k]))/2;
     const hr=(n233(ha.heredity)+n233(hb.heredity))/14;
     const maxParent=Math.max(n233(ha[k]),n233(hb[k]));
     // Generation curve remains the base. Strong heredity increases how much the parents can pull it upward.
     const inheritWeight=.28+hr*.24;
     let v=Math.round(base*(1-inheritWeight)+avg*inheritWeight);
     if(Math.random()<.22)v+=rnd233(-1,1);
     if(avg>base&&Math.random()<(.04+hr*.08))v++;
     v=clamp233(v,0,7);
     // Early generations can still spike, but B/A/S stay exceptional rather than becoming the default.
     const gen=Math.max(0,n233(c.gen));
     if(gen<=2&&v>=5){
       const bChance=.045+hr*.055+Math.max(0,n233(hc.mutation))*.004;
       if(Math.random()>=bChance)v=4;
     }
     if(v>=6){
       const aChance=(maxParent>=6?.055:.012)+hr*.045+gen*.0015;
       if(Math.random()>=aChance)v=5;
     }
     if(v>=7){
       const sChance=(maxParent>=7?.025:.002)+hr*.018+gen*.0005;
       if(Math.random()>=sChance)v=6;
     }
     hc[k]=clamp233(v,0,7)
   }
   hc.temperament=Math.random()<.45?ha.temperament:Math.random()<.82?hb.temperament:TEMPER233[rnd233(0,3)];
   const candidates=new Set([...(a.skills233||[]),...(b.skills233||[])]);c.skills233=[];for(const sk of candidates){const both=(a.skills233||[]).includes(sk)&&(b.skills233||[]).includes(sk);let p=both?.35:.18;const hr=Math.max(n233(ha.heredity),n233(hb.heredity));if(hr>=6)p+=hr===7?.08:.05;if(Math.random()<p)c.skills233.push(sk);if(c.skills233.length>=2)break}
   return c
 };
}catch(e){console.warn('baby233',e)}
// ---------- annual ranking ----------
function ensureAnnual233(){S.generation233=Math.max(1,n233(S.generation233)||n233(S.generation232)||1);if(!S.annual233||S.annual233.generation!==S.generation233||S.annual233.league!==n233(S.leagueRank)){S.annual233={generation:S.generation233,league:n233(S.leagueRank),season:0,recorded:{},table:[{id:'you',name:'あなた',pts:0,wins:0},...NPC233.map((name,i)=>({id:'npc'+i,name,pts:0,wins:0}))]}}return S.annual233}
function latestSeason233(){const arr=Array.isArray(S.seasonHistory)?S.seasonHistory:[];for(let i=arr.length-1;i>=0;i--){const h=arr[i];if(n233(h.season)===n233(S.season)&&(h.league==null||h.league===LEAGUE233[clamp233(n233(S.leagueRank),0,5)].name))return h}return null}
function shuffle233(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=rnd233(0,i);[a[i],a[j]]=[a[j],a[i]]}return a}
function recordSeason233(){const a=ensureAnnual233(),season=clamp233(n233(S.season)||1,1,6),key=String(season);if(a.recorded[key])return;const h=latestSeason233(),rank=clamp233(n233(h?.overall)||8,1,8),mul=Math.max(.5,Math.min(2,Number(h?.annualMul)||1)),p=Math.max(0,Math.round((CHAMP233[rank-1]||0)*mul)),you=a.table.find(x=>x.id==='you');you.pts+=p;if(rank===1)you.wins++;const pool=[...CHAMP233];pool.splice(rank-1,1);const rp=shuffle233(pool);shuffle233(a.table.filter(x=>x.id!=='you')).forEach((x,i)=>{x.pts+=rp[i]||0;if((rp[i]||0)===10)x.wins++});a.recorded[key]={rank,pts:p};a.season=Math.max(a.season,season);S.promotionPending=false;save233()}
function standings233(){return[...ensureAnnual233().table].sort((x,y)=>y.pts-x.pts||y.wins-x.wins||x.name.localeCompare(y.name,'ja'))}function annualRank233(){return standings233().findIndex(x=>x.id==='you')+1}
function renderAnnual233(){const train=document.getElementById('train');if(!train)return;document.getElementById('annual232')?.remove();let h=document.getElementById('annual233');if(!h){h=document.createElement('div');h.id='annual233';h.className='box annual233';document.getElementById('league225')?.after(h);if(!h.parentNode)train.prepend(h)}const st=standings233();h.innerHTML=`<div class="annualHead233"><div><small>ANNUAL RANKING</small><b>🏆 年間ランキング</b></div><span>S${clamp233(n233(S.season)||1,1,6)}/6</span></div><div class="annualList233">${st.slice(0,4).map((x,i)=>`<div class="${x.id==='you'?'you233':''}"><i>${i+1}</i><b>${x.name}</b><strong>${x.pts}pt</strong></div>`).join('')}</div><small>S1〜S6終了時の年間1位だけが昇格戦へ。</small>`}
function advanceSeason233(){recordSeason233();const next=clamp233((n233(S.season)||1)+1,1,6);S.season=next;S.turn=0;S.plans={};S.assign={};S.strat={};S.schedule=[];S.seasonMeet=null;S.rivals225=[];S.rivalsPromo225=false;S.promotionPending=false;S.meetChoice225='standard';S.meetChoiceSeason125=0;S.meetUiVersion290=0;try{makeSchedule()}catch(_){}save233();location.replace(location.pathname+'?season='+next+'&t='+Date.now())}
function finishGen233(){S.needsBreeding=true;S.generationActive=false;S.parents=[];S.cands=[];S.sel=[];S.egg=null;S.turn=0;S.schedule=[];S.plans={};S.assign={};S.strat={};S.season=1;S.seasonMeet=null;S.rivals225=[];S.rivalsPromo225=false;S.promotionPending=false;S.meetChoice225='standard';S.promotion233=false;S.generation233=(n233(S.generation233)||1)+1;S.annual233=null;try{localStorage.removeItem('star-athletes-force-season-v217')}catch(_){}save233();const u=new URL(location.href);u.search='';u.searchParams.delete('v');u.searchParams.set('breed','1');u.searchParams.set('t',Date.now());location.replace(u.toString())}
function nextGen233(label='🥚 次世代配合へ'){const p=document.querySelector('#meet .box p');if(!p)return;document.getElementById('next225')?.style.setProperty('display','none','important');let b=document.getElementById('annualNext233');if(!b){b=document.createElement('button');b.id='annualNext233';b.className='btn yl';b.type='button';p.appendChild(b)}b.textContent=label;b.onclick=finishGen233;b.style.display='inline-block'}
// ---------- battle modifiers / optional skills ----------
let temp233=null;
function applyNormalMods233(){if(temp233)return;temp233=(S.nest||[]).map(m=>({m,stats:{...m.stats},match:{...(m.matchGain226||{})}}));for(const m of(S.nest||[])){const h=hidden233(m),skill=skillEffect233(m,m.stats);for(const k of K233){const stable=[-.010,-.008,-.005,0,.004,.009,.015,.022][clamp233(n233(h.stability),0,7)],luck=Math.random()*[0,.0005,.001,.0018,.003,.005,.008,.012][clamp233(n233(h.luck),0,7)],clutch=(n233(S.season)>=6?[-.008,-.006,-.003,0,.004,.009,.016,.026][clamp233(n233(h.clutch),0,7)]:0);m.stats[k]=Math.min(999,Math.round(n233(skill[k])*(1+stable+luck+clutch)))}}}
function restoreNormalMods233(){if(!temp233)return;for(const x of temp233){for(const k of K233){const mgNow=n233(x.m.matchGain226?.[k]),mgBefore=n233(x.match?.[k]),earned=Math.max(0,mgNow-mgBefore);x.m.stats[k]=Math.min(999,n233(x.stats[k])+earned)}}temp233=null;save233()}
function watchNormal233(before){let tries=0;const tick=()=>{tries++;const txt=document.getElementById('result')?.textContent||'';if(txt&&txt!==before&&/総合\d+位/.test(txt)){setTimeout(restoreNormalMods233,180);return}if(tries<180)setTimeout(tick,80);else restoreNormalMods233()};setTimeout(tick,80)}
function score233(s,e){return e==='50m走'?n233(s.speed)*.5+n233(s.agility)*.3+n233(s.tech)*.2:e==='障害物競走'?n233(s.tech)*.4+n233(s.agility)*.35+n233(s.speed)*.15+n233(s.guts)*.1:e==='大玉ころがし'?n233(s.power)*.48+n233(s.stamina)*.3+n233(s.guts)*.22:e==='坂道かけあがり'?n233(s.power)*.35+n233(s.stamina)*.35+n233(s.guts)*.3:e==='10000m走'?n233(s.stamina)*.45+n233(s.guts)*.3+n233(s.speed)*.15+n233(s.tech)*.1:e==='的当て'?n233(s.tech)*.55+n233(s.power)*.2+n233(s.agility)*.15+n233(s.guts)*.1:e==='リレー'?n233(s.speed)*.45+n233(s.tech)*.2+n233(s.agility)*.2+n233(s.guts)*.15:n233(s.power)*.45+n233(s.stamina)*.3+n233(s.guts)*.25}
function promoRivals233(){const li=clamp233(n233(S.leagueRank)+1,0,LEAGUE233.length-1),lg=LEAGUE233[li];return Array.from({length:7},(_,i)=>{const stats={};for(const k of K233)stats[k]=clamp233(Math.round(lg.base+18+(i-3)*4+rnd233(-18,18)),70,999);const strong=K233[rnd233(0,5)];stats[strong]=clamp233(stats[strong]+rnd233(35,64),70,999);return{id:'pr'+i,name:NPC233[i],stats,strong}})}
function showPromotion233(){if(n233(S.leagueRank)===0)S.localPromotionEnteredCap=true;S.promotion233=true;S.promotionPending=false;S.rivals225=promoRivals233();save233();const lg=LEAGUE233[clamp233(n233(S.leagueRank)+1,0,5)],r=document.getElementById('result'),rh=document.getElementById('rival');if(r)r.innerHTML='<div class="notice annualFinal233"><b>🔥 年間王者・昇格戦</b><br>勝っても負けても、この一戦で世代終了。特別な経験からスキルを得ることがあります。</div>';if(rh)rh.innerHTML=`<div class="rivalPanel225 promo225"><div class="rivalTop225"><div><small>PROMOTION BATTLE</small><b>🔥 ${lg.name}級 昇格戦</b></div></div><div class="rivalCards225">${S.rivals225.slice(0,3).map(x=>`<article><header><b>${x.name}</b><em>${L233[x.strong]}型</em></header><div>${K233.map(k=>`<span class="${k===x.strong?'hot225':''}">${L233[k]} <b>${x.stats[k]}</b></span>`).join('')}</div></article>`).join('')}</div></div>`;const run=document.getElementById('run');if(run){run.classList.remove('hide');run.disabled=false;run.textContent='🔥 昇格戦スタート';run.onclick=null}document.getElementById('annualNext233')?.remove();document.getElementById('next225')?.style.setProperty('display','none','important')}
function variance233(m){return [.15,.135,.12,.105,.09,.07,.05,.03][clamp233(n233(hidden233(m).stability),0,7)]}
function strategyMul233(m,s){const t=hidden233(m).temperament,want=t==='大胆'?'先行':t==='冷静'?'バランス':t==='慎重'?'温存':'追込';return s===want?1.02:1}
function acquireSkills233(won){const logs=[];for(const m of(S.nest||[])){hidden233(m);if(m.skills233.length>=6)continue;const h=m.hidden233;let p=(won?.38:.20)+[0,.003,.007,.012,.020,.032,.050,.080][clamp233(n233(h.luck),0,7)]+[0,.001,.003,.006,.010,.016,.025,.040][clamp233(n233(h.mutation),0,7)]+[0,.001,.002,.004,.007,.012,.020,.032][clamp233(n233(h.clutch),0,7)];p=Math.min(.62,p);if(Math.random()>=p)continue;let id=Math.random()<.72?topStat233(m):K233[rnd233(0,5)];if(m.skills233.includes(id)){const open=K233.filter(x=>!m.skills233.includes(x));if(!open.length)continue;id=open[rnd233(0,open.length-1)]}m.skills233.push(id);logs.push(`${m.name}：${SK233[id].icon}${SK233[id].name}`)}return logs}
async function runPromotion233(){const run=document.getElementById('run');if(!run||run.disabled)return;run.disabled=true;run.textContent='昇格戦中…';const rivals=S.rivals225?.length?S.rivals225:promoRivals233(),events=(S.schedule&&S.schedule.length)?S.schedule:['50m走','障害物競走','的当て','リレー'],tot=[0,0,0,0,0,0,0,0],rows=[];for(let i=0;i<events.length;i++){const e=events[i],m=(S.nest||[]).find(x=>x.id===S.assign?.[i])||[...(S.nest||[])].sort((a,b)=>score233(b.stats,e)-score233(a.stats,e))[0];if(!m)continue;const h=hidden233(m),eff=skillEffect233(m,m.stats),clutch=[.95,.965,.98,1,1.018,1.04,1.07,1.11][clamp233(n233(h.clutch),0,7)],luck=1+[0,.0005,.001,.002,.0035,.006,.009,.014][clamp233(n233(h.luck),0,7)]*Math.random(),sm=strategyMul233(m,S.strat?.[i]||'バランス'),vw=variance233(m),ours=score233(eff,e)*clutch*luck*sm*(1-vw/2+Math.random()*vw),scores=[ours,...rivals.map(x=>score233(x.stats,e)*(.95+Math.random()*.10))],ord=scores.map((v,idx)=>({v,idx})).sort((a,b)=>b.v-a.v);ord.forEach((x,rank)=>tot[x.idx]+=PTS233[rank]||0);const rank=ord.findIndex(x=>x.idx===0)+1;rows.push(`${e}：${rank}位`);const ev=document.getElementById('events');if(ev)ev.innerHTML=`<div class="battleEvent225"><b>${e}</b><span>${m.name}${m.skills233.length?' / '+m.skills233.map(x=>SK233[x]?.icon||'').join(''):''}</span><strong>${rank}位</strong></div>`;await new Promise(r=>setTimeout(r,300))}const ord=tot.map((v,idx)=>({v,idx})).sort((a,b)=>b.v-a.v),overall=ord.findIndex(x=>x.idx===0)+1,won=overall===1;if(won&&n233(S.leagueRank)<5)S.leagueRank++;const learned=acquireSkills233(won);S.promotion233=false;const r=document.getElementById('result');if(r)r.innerHTML=`<div class="notice leagueResult225 ${won?'win225':'lose225'}"><b>🔥 昇格戦</b><br>${rows.join('<br>')}<hr><strong>${won?'🎉 昇格成功！ '+LEAGUE233[n233(S.leagueRank)].name+'級へ':'昇格失敗… 現ランク残留'}</strong><br>総合${overall}位 / ${tot[0]}pt${learned.length?`<div class="skillLearn233"><b>✨ スキル習得！</b><br>${learned.join('<br>')}</div>`:'<div class="skillNo233">今回は新しいスキル習得なし</div>'}<small>勝敗に関係なく、この世代は終了します。</small></div>`;save233();run.classList.add('hide');run.disabled=false;nextGen233()}
function annualFinish233(){recordSeason233();const st=standings233(),rk=annualRank233(),r=document.getElementById('result');if(r)r.insertAdjacentHTML('beforeend',`<div class="annualFinal233"><b>🏆 年間ランキング確定</b><div>${st.slice(0,5).map((x,i)=>`<span class="${x.id==='you'?'you233':''}">${i+1}位 ${x.name}<strong>${x.pts}pt</strong></span>`).join('')}</div><em>あなた：年間${rk}位</em></div>`);S.promotionPending=false;save233();document.getElementById('next225')?.style.setProperty('display','none','important');if(rk===1&&n233(S.leagueRank)<5){const p=document.querySelector('#meet .box p');let b=document.getElementById('annualNext233');if(!b){b=document.createElement('button');b.id='annualNext233';b.className='btn yl';b.type='button';p?.appendChild(b)}b.textContent='🔥 年間王者・昇格戦へ';b.onclick=showPromotion233;b.style.display='inline-block'}else nextGen233(rk===1?'🥚 最高ランク・次世代配合へ':'🥚 次世代配合へ')}
// normal tournament temporary modifiers
window.addEventListener('click',e=>{const run=e.target?.closest?.('#run');if(run&&!run.disabled&&!S.promotion233){const before=document.getElementById('result')?.textContent||'';applyNormalMods233();watchNormal233(before)}},true);
// no mid-year promotion: own #next225 throughout S1-S6
window.addEventListener('click',e=>{const b=e.target?.closest?.('#next225');if(!b)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();if((n233(S.season)||1)<6)advanceSeason233();else annualFinish233()},true);
window.addEventListener('click',e=>{if(e.target?.closest?.('#run')&&S.promotion233){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();runPromotion233()}},true);
const beforeRender233=render;render=function(){const out=beforeRender233();setTimeout(()=>{renderAnnual233();skillPills233();renderCompat233()},0);return out};
const css=document.createElement('style');css.textContent=`
.annual233{border:2px solid #cda631!important;background:linear-gradient(145deg,#fff9dc,#fff)!important}.annualHead233,.compatHead233{display:flex;justify-content:space-between;align-items:center}.annualHead233 small,.compatHead233 small{display:block;font-size:7px;color:#8a6f17}.annualHead233 b,.compatHead233 b{font-size:13px}.annualList233{display:grid;gap:4px;margin:8px 0}.annualList233>div{display:grid;grid-template-columns:22px 1fr auto;gap:5px;padding:5px 7px;border-radius:8px;background:#fff;border:1px solid #eadb9b;font-size:9px}.annualList233 .you233,.annualFinal233 .you233{background:#fff0a6!important}.annualList233 i{font-style:normal;font-weight:1000}.skills233{display:flex;gap:4px;flex-wrap:wrap;margin-top:5px}.skills233 span{border:1px solid #b8a4dd;background:#f5efff;border-radius:999px;padding:3px 6px;font-size:7px;font-weight:1000;color:#56436f}.compat233{margin:8px 0 4px;padding:9px;border:2px solid #8fb5d9;border-radius:13px;background:#f5fbff}.compat233.hide{display:none}.compatHead233 strong{font-size:10px}.compatBar233{height:7px;background:#dbe7ef;border-radius:999px;overflow:hidden;margin:7px 0}.compatBar233 i{display:block;height:100%;background:linear-gradient(90deg,#79b7df,#e5bd4f);border-radius:999px}.compatBreak233{font-size:6px;line-height:1.5;color:#65778a}.reveal233{display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:7px}.reveal233>small{grid-column:1/3;font-size:7px;color:#52677b}.reveal233 span{display:flex;justify-content:space-between;border:1px solid #cbd9e6;border-radius:7px;background:#fff;padding:4px 6px;font-size:7px}.reveal233 em{font-style:normal;font-weight:1000}.compatHint233{font-size:7px;color:#687b8e;margin-top:6px}.annualFinal233{margin-top:10px;padding:10px;border:2px solid #d9b13e;border-radius:12px;background:#fff7cf;color:#42350d}.annualFinal233>div{display:grid;gap:3px;margin:7px 0}.annualFinal233 span{display:flex;justify-content:space-between;padding:4px 6px;border-radius:6px;background:#fff;font-size:8px}.annualFinal233 em{font-style:normal;font-weight:1000}.skillLearn233{margin:8px 0;padding:7px;border-radius:9px;background:#f2eaff!important;border:1px solid #bea6e5;font-size:9px}.skillNo233{margin:7px 0!important;font-size:7px;color:#786b56}
`;document.head.appendChild(css);
setTimeout(()=>{migrate233();repairEarlyHidden233();ensureAnnual233();renderAnnual233();skillPills233();renderCompat233()},0);
window.STAR_ANNUAL233={showPromotion:showPromotion233,runPromotion:runPromotion233,finishGeneration:finishGen233,annualFinish:annualFinish233,ensureHidden:(m)=>hidden233(m)};
})();