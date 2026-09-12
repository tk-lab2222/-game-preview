(()=>{
const TEAM_EVENTS=new Set(['リレー','綱引き']);
const TRAIN={
 speed:{name:'走り込み',desc:'スピード・すばやさ',gains:[['speed',12],['agility',7]]},
 power:{name:'パワー',desc:'ちから・こんじょう',gains:[['power',12],['guts',7]]},
 tech:{name:'技術',desc:'テクニック・すばやさ',gains:[['tech',12],['agility',6]]},
 stamina:{name:'持久',desc:'スタミナ・こんじょう',gains:[['stamina',12],['guts',6]]},
 team:{name:'連携',desc:'こんじょう・テクニック',gains:[['guts',7],['tech',7]]}
};
S.lastTrain=S.lastTrain||{};

function trainStats(m){
 const r=S.lastTrain[m.id];
 return Object.entries(m.stats).map(([k,v])=>{
   const g=r?.gains?.[k]||0;
   return `<span class="${g?'statUp':''}"><span>${SL[k]}</span><b>${v}${g?` <i>（＋${g}）</i>`:''}</b></span>`;
 }).join('');
}
function teamScore(e){
 if(!S.nest.length)return 0;
 const vals=S.nest.map(m=>score(m,e));
 return vals.reduce((a,b)=>a+b,0)/vals.length;
}
renderTrain=function(){
 if(!S.nest.length||!S.schedule.length)return;
 $('sched').innerHTML=S.schedule.map(e=>`<span class="chip"><b>${e}${TEAM_EVENTS.has(e)?'［チーム］':''}</b><br>${INF[e][0]}</span>`).join('');
 $('plans').innerHTML=S.nest.map(m=>{
   const cur=S.plans[m.id]||INF[S.schedule[0]][1];
   const r=S.lastTrain[m.id];
   return `<div class="trainCard">${avatar(m)}<div><div class="trainHead"><b>${m.name}</b>${r?`<span class="trainGrade ${r.grade==='超成功'?'super':r.grade==='大成功'?'great':''}">${r.grade}</span>`:''}</div><div class="statGrid trainStatGrid">${trainStats(m)}</div><select data-plan="${m.id}">${Object.entries(TRAIN).map(([v,t])=>`<option value="${v}" ${cur===v?'selected':''}>${t.name}｜${t.desc}</option>`).join('')}</select><div class="trainEffect">選択中：${TRAIN[cur]?.desc||''} が伸びる</div></div></div>`;
 }).join('');
 document.querySelectorAll('[data-plan]').forEach(x=>x.onchange=()=>{S.plans[x.dataset.plan]=x.value;renderTrain()});
 $('prep').innerHTML=S.schedule.map((e,i)=>{
   S.strat[i]??='バランス';
   if(TEAM_EVENTS.has(e)){
     return `<div class="evt teamEvt"><b>${e} <span>チーム競技</span></b><div class="sm">3体全員で出場 / 重要：${INF[e][0]}</div><select data-s="${i}">${['先行','バランス','温存','追込'].map(z=>`<option ${z===S.strat[i]?'selected':''}>${z}</option>`).join('')}</select></div>`;
   }
   const b=best(e);S.assign[i]??=b.id;
   return `<div class="evt"><b>${e}</b><div class="sm">重要：${INF[e][0]} / おすすめ：${b.name}</div><select data-a="${i}">${S.nest.map(m=>`<option value="${m.id}" ${m.id===S.assign[i]?'selected':''}>${m.name}</option>`).join('')}</select><select data-s="${i}">${['先行','バランス','温存','追込'].map(z=>`<option ${z===S.strat[i]?'selected':''}>${z}</option>`).join('')}</select></div>`;
 }).join('');
 document.querySelectorAll('[data-a]').forEach(x=>x.onchange=()=>S.assign[x.dataset.a]=x.value);
 document.querySelectorAll('[data-s]').forEach(x=>x.onchange=()=>S.strat[x.dataset.s]=x.value);
};

$('doTrain').onclick=()=>{
 if(S.turn>=3)return;
 const out=[];S.lastTrain={};
 S.nest.forEach(m=>{
   const t=S.plans[m.id]||'speed',r=Math.random(),grade=r<.02?'超成功':r<.15?'大成功':'成功',mul=grade==='超成功'?2:grade==='大成功'?1.5:1,gains={};
   (TRAIN[t]?.gains||TRAIN.speed.gains).forEach(([k,v])=>{const n=Math.round(v*mul+rnd(-1,3));m.stats[k]+=n;gains[k]=n});
   S.lastTrain[m.id]={grade,gains};
   out.push(`<b>${m.name}：${grade}</b> ${Object.entries(gains).map(([k,n])=>`${SL[k]}＋${n}`).join(' / ')}`);
 });
 S.turn++;
 $('gain').innerHTML='<div class="notice">'+out.join('<br>')+'</div>';
 render();
};

$('toMeet').onclick=()=>{
 if(S.turn<3)return;
 $('events').innerHTML=S.schedule.map((e,i)=>TEAM_EVENTS.has(e)?`<div class="evt teamEvt"><b>${e} <span>チーム競技</span></b><div>3体全員 / ${S.strat[i]}</div></div>`:`<div class="evt"><b>${e}</b><div>${S.nest.find(m=>m.id===S.assign[i])?.name||best(e).name} / ${S.strat[i]}</div></div>`).join('');
 show('meet');
};

$('run').onclick=()=>{
 let pts=0,lines=[];
 S.schedule.forEach((e,i)=>{
   const ps=(TEAM_EVENTS.has(e)?teamScore(e):score(S.nest.find(x=>x.id===S.assign[i])||best(e),e))*(.94+Math.random()*.12);
   const op=Array.from({length:7},()=>95+S.wins*5+Math.random()*70),rank=1+op.filter(x=>x>ps).length;
   pts+=[0,8,6,5,4,3,2,1,0][rank];
   lines.push(`${e}${TEAM_EVENTS.has(e)?'［チーム］':''}：${rank}位`);
 });
 const o=pts>=25?1:pts>=20?2:pts>=16?3:4;if(o===1)S.wins++;
 $('result').innerHTML=`<div class="notice">${lines.join('<br>')}<br><b>総合${o}位</b>${o===1?'<br>★次世代候補枠+1':''}</div>`;
 $('run').classList.add('hide');$('next').classList.remove('hide');render();
};

$('reloadBtn').onclick=()=>location.replace('../star-athletes/?v=097-'+Date.now());
render();
})();