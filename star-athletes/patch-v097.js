(()=>{
// Training rendering/execution are owned by patch-v210/patch-v223.
$('toMeet').onclick=()=>{
 if(S.turn<3)return;
 $('events').innerHTML=S.schedule.map((e,i)=>TEAM_EVENTS.has(e)?`<div class="evt teamEvt"><b>${e} <span>チーム競技</span></b><div>3体全員 / ${S.strat[i]}</div></div>`:`<div class="evt"><b>${e}</b><div>${S.nest.find(m=>m.id===S.assign[i])?.name||best(e).name} / ${S.strat[i]}</div></div>`).join('');
 show('meet');
};

// Tournament execution is owned by patch-v225/patch-v233.

$('reloadBtn').onclick=()=>location.replace('../star-athletes/?v=097-'+Date.now());
render();
})();