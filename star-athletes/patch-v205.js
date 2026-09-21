(()=>{
// v0.20.5: restore card-based training/prep controls and make breeding affinity explicit.
const TRAIN205={
 speed:{name:'星駆けダッシュ',icon:'💨',gain:{speed:12,agility:7}},
 power:{name:'メテオクラッシュ',icon:'💥',gain:{power:12,guts:7}},
 tech:{name:'スタートリック',icon:'✨',gain:{tech:12,agility:6}},
 stamina:{name:'エンドレスロード',icon:'🔥',gain:{stamina:12,guts:6}},
 team:{name:'スターリンク',icon:'🤝',gain:{guts:7,tech:7}}
};
const STRATS205=['先行','バランス','温存','追込'];
function statRows205(m,gain={}){
  return Object.keys(SL).map(k=>`<span class="${gain[k]?'up205':''}">${SL[k]} <b>${m.stats[k]}</b>${gain[k]?`<i>+${gain[k]}</i>`:''}</span>`).join('');
}
function keyStats205(m,e){
  const keys=e==='50m走'?['speed','agility','tech']:e==='障害物競走'?['tech','agility','speed']:e==='大玉ころがし'?['power','stamina','guts']:e==='坂道かけあがり'?['power','stamina','guts']:e==='10000m走'?['stamina','guts','speed']:e==='的当て'?['tech','power','agility']:e==='リレー'?['speed','tech','agility']:['power','stamina','guts'];
  return keys.map(k=>`<span>${SL[k]} <b>${m.stats[k]}</b></span>`).join('');
}
function drawTraining205(){
  if(!S.nest?.length||!S.schedule?.length)return;
  const plans=document.getElementById('plans'),prep=document.getElementById('prep'),sched=document.getElementById('sched');if(!plans||!prep)return;
  if(sched)sched.innerHTML=S.schedule.map(e=>`<span class="chip"><b>${e}</b><br>${INF[e]?.[0]||''}</span>`).join('');
  plans.innerHTML=S.nest.map(m=>{
    const cur=S.plans?.[m.id]||'speed';S.plans[m.id]=cur;const g=TRAIN205[cur]?.gain||{};
    return `<div class="train205"><div class="trainHero205">${avatar(m)}<div><b>${m.name}</b><small>${SP[m.species]?.[0]||''} / ${m.rarity}</small></div></div><div class="stats205">${statRows205(m,g)}</div><div class="trainOpts205">${Object.entries(TRAIN205).map(([id,t])=>`<button type="button" data-plan205="${id}" data-mon205="${m.id}" class="${cur===id?'sel205':''}"><i>${t.icon}</i><span>${t.name}</span></button>`).join('')}</div></div>`;
  }).join('');
  plans.querySelectorAll('[data-plan205]').forEach(b=>b.onclick=()=>{S.plans[b.dataset.mon205]=b.dataset.plan205;drawTraining205();try{save200&&save200()}catch(_){}});
  prep.innerHTML=S.schedule.map((e,i)=>{
    const rec=best(e);S.assign[i]??=rec.id;S.strat[i]??='バランス';
    return `<div class="event205"><div class="eventHead205"><div><b>${e}</b><small>重要：${INF[e]?.[0]||''}</small></div><em>おすすめ ${rec.name}</em></div><div class="entrants205">${S.nest.map(m=>`<button type="button" data-entry205="${i}" data-mon205="${m.id}" class="${S.assign[i]===m.id?'sel205':''}">${avatar(m)}<b>${m.name}</b><small>適性 ${Math.round(score(m,e))}</small><div>${keyStats205(m,e)}</div></button>`).join('')}</div><div class="strats205"><span>作戦</span>${STRATS205.map(s=>`<button type="button" data-strat205="${i}" data-value205="${s}" class="${S.strat[i]===s?'sel205':''}">${s}</button>`).join('')}</div></div>`;
  }).join('');
  prep.querySelectorAll('[data-entry205]').forEach(b=>b.onclick=()=>{S.assign[b.dataset.entry205]=b.dataset.mon205;drawTraining205();try{save200&&save200()}catch(_){}});
  prep.querySelectorAll('[data-strat205]').forEach(b=>b.onclick=()=>{S.strat[b.dataset.strat205]=b.dataset.value205;drawTraining205();try{save200&&save200()}catch(_){}});
  requestAnimationFrame(()=>{try{window.paintSpecies&&window.paintSpecies()}catch(_){}});
}
function refresh205(){drawTraining205()}
const renderBefore205=render;
render=function(){const out=renderBefore205();refresh205();requestAnimationFrame(refresh205);return out};
const css=document.createElement('style');css.textContent=`
.affinity205{margin:10px 0;padding:10px;border-radius:13px;background:#081424cc;border:1px solid #74dfff55;color:#fff}.affHead205{display:grid;grid-template-columns:1fr auto auto;gap:7px;align-items:center}.affHead205 span{font-size:7px;letter-spacing:.14em;color:#75dfff;font-weight:1000}.affHead205 b{font-size:14px}.affHead205 em{font-style:normal;color:#ffd86a;font-weight:1000}.affNames205{font-size:10px;font-weight:1000;margin:4px 0}.affReasons205{display:flex;gap:4px;flex-wrap:wrap}.affReasons205 span{font-size:7px;border:1px solid #ffffff2b;background:#ffffff10;border-radius:999px;padding:3px 6px}.affinity205 small{display:block;margin-top:5px;color:#dcecff;font-size:8px}.affEmpty205{display:flex;flex-direction:column;gap:2px}.affEmpty205 b{font-size:11px}.affEmpty205 span{font-size:8px;color:#bcd0e7}
#plans{display:grid;gap:10px}.train205{border:2px solid #26364c;border-radius:16px;background:linear-gradient(145deg,#fff,#f2f7ff);padding:9px;box-shadow:0 5px 0 #0001}.trainHero205{display:grid;grid-template-columns:92px 1fr;gap:9px;align-items:center}.trainHero205 .avatar{height:88px!important;border:0!important;border-radius:12px!important}.trainHero205 b{display:block;font-size:14px}.trainHero205 small{font-size:8px;color:#667}.stats205{display:grid;grid-template-columns:1fr 1fr;gap:3px 7px;margin:7px 0}.stats205 span{display:flex;justify-content:space-between;font-size:8px;border-bottom:1px dotted #ccd5df;padding:2px 4px}.stats205 .up205{background:#fff2aa;border-radius:6px}.stats205 i{font-style:normal;color:#e45b00;font-weight:1000;margin-left:3px}.trainOpts205{display:grid;grid-template-columns:1fr 1fr;gap:5px}.trainOpts205 button{display:flex;align-items:center;gap:5px;border:1.5px solid #9db0c6;border-radius:9px;background:#fff;padding:7px;text-align:left;font-weight:900;font-size:8px}.trainOpts205 button:last-child{grid-column:1/3}.trainOpts205 button i{font-style:normal;font-size:14px}.trainOpts205 .sel205{background:#dff5ff;border-color:#1aa9da;box-shadow:0 0 0 2px #9be6ff}
#prep{display:grid;gap:11px}.event205{border:2px solid #26364c;border-radius:16px;background:#f8fbff;padding:9px;box-shadow:0 5px 0 #0001}.eventHead205{display:flex;justify-content:space-between;gap:6px;align-items:flex-start;margin-bottom:7px}.eventHead205 b{display:block;font-size:13px}.eventHead205 small{display:block;font-size:8px;color:#667}.eventHead205 em{font-style:normal;font-size:7px;background:#fff2b8;border-radius:999px;padding:4px 6px;font-weight:1000}.entrants205{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.entrants205>button{border:2px solid #aebdce;border-radius:12px;background:#fff;padding:0;overflow:hidden;text-align:left}.entrants205>button.sel205{border-color:#18a9d8;box-shadow:0 0 0 3px #b9efff;background:#effbff}.entrants205 .avatar{height:84px!important;border:0!important;border-bottom:1px solid #d5dfeb!important}.entrants205>button>b,.entrants205>button>small{display:block;padding:3px 5px 0;font-size:9px}.entrants205>button>small{font-size:7px;color:#667}.entrants205>button>div{padding:4px 5px 6px}.entrants205>button>div span{display:flex;justify-content:space-between;font-size:6px;border-top:1px dotted #ccd5df}.strats205{display:grid;grid-template-columns:auto repeat(4,1fr);gap:4px;align-items:center;margin-top:7px}.strats205>span{font-size:8px;font-weight:1000}.strats205 button{border:1px solid #abb9ca;border-radius:8px;background:#fff;padding:6px 2px;font-size:8px;font-weight:900}.strats205 button.sel205{background:#202c43;color:#fff;border-color:#202c43}
`;
document.head.appendChild(css);
setTimeout(()=>{try{refresh205()}catch(e){console.error('v0.20.5',e)}},0);
})();