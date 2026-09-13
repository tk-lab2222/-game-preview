(()=>{
const style=document.createElement('style');
style.textContent=`
/* v0.10.4: hatch safe area */
.hatchReveal .bigArt .dracoCanvas{transform:scale(.90);transform-origin:center center}
/* parent slot: art above, name below */
.par{flex-direction:column!important;gap:3px;padding:4px;overflow:hidden!important}
.par .avatar{height:76px!important;min-height:76px;width:100%!important;flex:0 0 76px!important;border-radius:9px!important}
.par>b{display:block;width:100%;font-size:10px;line-height:1.2;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:1px 3px}
/* icon based training choice */
.trainChoices{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;margin-top:6px}
.trainChoice{border:2px solid #222;border-radius:10px;background:#fffdf7;padding:5px 2px;font-size:8px;font-weight:900;line-height:1.15;text-align:center;box-shadow:none}
.trainChoice .ico{display:block;font-size:17px;line-height:1.05;margin-bottom:2px}
.trainChoice.on{background:#ffd65a;box-shadow:0 2px 0 #222}
`;
document.head.appendChild(style);

const TRAIN=[
 ['speed','🏃','走り込み'],
 ['power','💪','パワー'],
 ['tech','🎯','技術'],
 ['stamina','🫁','持久'],
 ['team','🤝','連携']
];

const oldRenderTrain=renderTrain;
renderTrain=function(){
 if(!S.nest.length||!S.schedule.length)return;
 $('sched').innerHTML=S.schedule.map(e=>`<span class="chip"><b>${e}</b><br>${INF[e][0]}</span>`).join('');
 $('plans').innerHTML=S.nest.map(m=>{
   let cur=S.plans[m.id]||INF[S.schedule[0]][1];
   S.plans[m.id]=cur;
   return `<div class="trainCard">${avatar(m)}<div><b>${m.name}</b><div class="statGrid">${stats(m)}</div><div class="trainChoices" data-train-mon="${m.id}">${TRAIN.map(([v,ic,n])=>`<button type="button" class="trainChoice ${cur===v?'on':''}" data-train="${v}"><span class="ico">${ic}</span>${n}</button>`).join('')}</div></div></div>`;
 }).join('');
 document.querySelectorAll('[data-train-mon]').forEach(box=>{
   box.querySelectorAll('[data-train]').forEach(btn=>btn.onclick=()=>{
     S.plans[box.dataset.trainMon]=btn.dataset.train;
     box.querySelectorAll('[data-train]').forEach(x=>x.classList.toggle('on',x===btn));
   });
 });
 $('prep').innerHTML=S.schedule.map((e,i)=>{
   let b=best(e);S.assign[i]??=b.id;S.strat[i]??='バランス';
   return `<div class="evt"><b>${e}</b><div class="sm">重要：${INF[e][0]} / おすすめ：${b.name}</div><select data-a="${i}">${S.nest.map(m=>`<option value="${m.id}" ${m.id===S.assign[i]?'selected':''}>${m.name}</option>`).join('')}</select><select data-s="${i}">${['先行','バランス','温存','追込'].map(z=>`<option ${z===S.strat[i]?'selected':''}>${z}</option>`).join('')}</select></div>`;
 }).join('');
 document.querySelectorAll('[data-a]').forEach(x=>x.onchange=()=>S.assign[x.dataset.a]=x.value);
 document.querySelectorAll('[data-s]').forEach(x=>x.onchange=()=>S.strat[x.dataset.s]=x.value);
 if(window.paintDracos) requestAnimationFrame(window.paintDracos);
};

const oldRender=render;
render=function(){
 oldRender();
 // oldRender calls the original renderTrain binding in some browsers; force our icon UI after it.
 if(S.nest.length&&S.schedule.length) renderTrain();
 let bp=breederPool();
 [$('pa'),$('pb')].forEach((e,i)=>{
   let m=bp.find(x=>x.id===S.parents[i]);
   if(m)e.innerHTML=`${avatar(m)}<b>${m.name} / ${m.rarity}</b>`;
 });
 if(window.paintDracos) requestAnimationFrame(window.paintDracos);
};

setTimeout(()=>render(),0);
})();
