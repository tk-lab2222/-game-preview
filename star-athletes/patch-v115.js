(()=>{
// v0.11.8: explicit training gains + themed training names + card-based meet selection.
const TRAIN_GAIN={
  speed:{speed:12,agility:7},
  power:{power:12,guts:7},
  tech:{tech:12,agility:6},
  stamina:{stamina:12,guts:6},
  team:{guts:7,tech:7}
};
const PLAN_OPTS=[
  ['speed','星駆けダッシュ'],
  ['power','メテオクラッシュ'],
  ['tech','スタートリック'],
  ['stamina','エンドレスロード'],
  ['team','スターリンク']
];

function trainStats(m,plan){
  const gain=TRAIN_GAIN[plan]||{};
  return Object.entries(m.stats).map(([k,v])=>{
    const g=gain[k];
    return `<span>${SL[k]} <b>${v}</b>${g?`<i class="gainHint">（+${g}）</i>`:''}</span>`;
  }).join('');
}
function keyStatsForEvent(m,e){
  const keys=e==='50m走'?['speed','agility','tech']:
    e==='障害物競走'?['tech','agility','speed']:
    e==='大玉ころがし'?['power','stamina','guts']:
    e==='坂道かけあがり'?['power','stamina','guts']:
    e==='10000m走'?['stamina','guts','speed']:
    e==='的当て'?['tech','power','agility']:
    e==='リレー'?['speed','tech','agility']:['power','stamina','guts'];
  return keys.map(k=>`<span>${SL[k]} <b>${m.stats[k]}</b></span>`).join('');
}

renderTrain=function(){
  if(!S.nest.length||!S.schedule.length)return;
  $('sched').innerHTML=S.schedule.map(e=>`<span class="chip"><b>${e}</b><br>${INF[e][0]}</span>`).join('');

  $('plans').innerHTML=S.nest.map(m=>{
    const cur=S.plans[m.id]||INF[S.schedule[0]][1];
    return `<div class="trainCard trainCard115">${avatar(m)}<div class="trainBody115"><div class="trainHead"><b>${m.name}</b><span class="trainGrade">成功時</span></div><div class="statGrid trainStatGrid">${trainStats(m,cur)}</div><select data-plan="${m.id}">${PLAN_OPTS.map(([v,n])=>`<option value="${v}" ${cur===v?'selected':''}>${n}</option>`).join('')}</select></div></div>`;
  }).join('');
  document.querySelectorAll('[data-plan]').forEach(x=>x.onchange=()=>{S.plans[x.dataset.plan]=x.value;renderTrain();});

  $('prep').innerHTML=S.schedule.map((e,i)=>{
    const b=best(e);
    S.assign[i]??=b.id;
    S.strat[i]??='バランス';
    return `<div class="evt meetEvt115"><div class="meetEvtHead"><b>${e}</b><div class="sm">重要：${INF[e][0]} / おすすめ：${b.name}</div></div><div class="meetPickGrid">${S.nest.map(m=>{
      const selected=m.id===S.assign[i];
      return `<button type="button" class="meetPickCard ${selected?'sel':''}" data-meet-pick="${i}" data-mon="${m.id}">${avatar(m)}<div class="meetPickName">${m.name}</div><div class="meetPickScore">適性 ${Math.round(score(m,e))}</div><div class="meetKeyStats">${keyStatsForEvent(m,e)}</div></button>`;
    }).join('')}</div><div class="meetStrategy"><span>作戦</span><select data-s="${i}">${['先行','バランス','温存','追込'].map(z=>`<option ${z===S.strat[i]?'selected':''}>${z}</option>`).join('')}</select></div></div>`;
  }).join('');
  document.querySelectorAll('[data-meet-pick]').forEach(x=>x.onclick=()=>{S.assign[x.dataset.meetPick]=x.dataset.mon;renderTrain();});
  document.querySelectorAll('[data-s]').forEach(x=>x.onchange=()=>S.strat[x.dataset.s]=x.value);
};

const st=document.createElement('style');
st.textContent=`
.trainCard115{align-items:stretch}
.trainCard115 .avatar{flex:0 0 92px;min-height:92px}
.trainBody115{min-width:0;flex:1}
.gainHint{font-style:normal;font-size:9px;font-weight:1000;color:#e45600;margin-left:2px;white-space:nowrap}
.trainStatGrid span:has(.gainHint){background:#fff2a8;border-radius:6px;padding:1px 3px}
.meetEvt115{padding:9px 8px!important;margin-bottom:10px}
.meetEvtHead{margin-bottom:7px}
.meetPickGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
.meetPickCard{appearance:none;border:2px solid #222;border-radius:12px;background:#fff;padding:0;overflow:hidden;text-align:left;box-shadow:0 2px 0 #0002;min-width:0}
.meetPickCard.sel{outline:4px solid #ffd65a;background:#fff9dc}
.meetPickCard .avatar{height:76px!important;border:0!important;border-bottom:2px solid #222!important;border-radius:0!important}
.meetPickName{font-size:11px;font-weight:1000;padding:5px 5px 1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.meetPickScore{font-size:8px;font-weight:1000;padding:0 5px 4px;color:#555}
.meetKeyStats{display:grid;grid-template-columns:1fr;gap:1px;padding:0 5px 5px;font-size:7px}
.meetKeyStats span{display:flex;justify-content:space-between;border-top:1px dotted #bbb;padding-top:1px}
.meetStrategy{display:flex;align-items:center;gap:8px;margin-top:7px;font-size:10px;font-weight:1000}
.meetStrategy select{flex:1}
`;
document.head.appendChild(st);
setTimeout(()=>{try{render()}catch(e){console.error('v0.11.8 UI patch failed',e)}},0);
})();