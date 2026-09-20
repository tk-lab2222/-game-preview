(()=>{
// v0.29.2 / M6 LIMIT1: bounded post-scenario growth loop.
// LIMIT1 alone can grow stats beyond 999 up to 3,000. Normal story training remains unchanged.
const SAVE279='star-athletes-save-v200',ROSTER279='star-athletes-active-roster-v210';
const STATS279=['power','speed','stamina','agility','tech','guts'];
const LAB279={power:'ちから',speed:'スピード',stamina:'スタミナ',agility:'すばやさ',tech:'テクニック',guts:'こんじょう'};
const MAX_EN279=5,REGEN_MS279=30*60*1000,PTS279=4,CAP279=3000;
function n279(v){return Number(v)||0}
function released279(){return !!(S.limit278?.released||S.limitReleased)}
function st279(){
 if(!S.limit279||typeof S.limit279!=='object')S.limit279={energy:MAX_EN279,lastEnergyAt:Date.now(),sessions:0,alloc:{},target:{},cleared:false};
 const st=S.limit279;
 if(!st.alloc||typeof st.alloc!=='object')st.alloc={};
 if(!st.target||typeof st.target!=='object')st.target={};
 if(!Number.isFinite(Number(st.energy)))st.energy=MAX_EN279;
 if(!Number.isFinite(Number(st.lastEnergyAt)))st.lastEnergyAt=Date.now();
 if(!Number.isFinite(Number(st.sessions)))st.sessions=0;
 return st;
}
function regen279(){
 const st=st279(),now=Date.now();
 if(st.energy>=MAX_EN279){st.energy=MAX_EN279;st.lastEnergyAt=now;return}
 const gained=Math.floor((now-st.lastEnergyAt)/REGEN_MS279);
 if(gained>0){st.energy=Math.min(MAX_EN279,st.energy+gained);st.lastEnergyAt+=gained*REGEN_MS279}
}
function persist279(){
 try{localStorage.setItem(SAVE279,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}
 try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem(ROSTER279,JSON.stringify(S.nest))}catch(_){}
}
function ensure279(){
 const st=st279();regen279();
 const ids=new Set((S.nest||[]).map(m=>m.id));
 for(const id of Object.keys(st.alloc))if(!ids.has(id))delete st.alloc[id];
 for(const id of Object.keys(st.target))if(!ids.has(id))delete st.target[id];
 (S.nest||[]).forEach(m=>{
   if(!Number.isFinite(Number(st.alloc[m.id])))st.alloc[m.id]=0;
   if(!STATS279.includes(st.target[m.id]))st.target[m.id]=STATS279.slice().sort((a,b)=>n279(m.stats?.[b])-n279(m.stats?.[a]))[0]||'speed';
 });
 let total=(S.nest||[]).reduce((a,m)=>a+n279(st.alloc[m.id]),0);
 if(total===0&&S.nest?.length===3){st.alloc[S.nest[0].id]=2;st.alloc[S.nest[1].id]=1;st.alloc[S.nest[2].id]=1}
 normalize279();
}
function normalize279(){
 const st=st279(),nest=S.nest||[];
 nest.forEach(m=>st.alloc[m.id]=Math.max(0,Math.min(PTS279,n279(st.alloc[m.id]))));
 let total=nest.reduce((a,m)=>a+n279(st.alloc[m.id]),0);
 while(total>PTS279){
   const m=[...nest].sort((a,b)=>n279(st.alloc[b.id])-n279(st.alloc[a.id]))[0];if(!m||st.alloc[m.id]<=0)break;
   st.alloc[m.id]--;total--;
 }
}
function total279(){return (S.nest||[]).reduce((a,m)=>a+n279(st279().alloc[m.id]),0)}
function gain279(cur,pt){
 const primary=Math.max(18,Math.round(cur*.035))*pt;
 return Math.max(0,Math.min(CAP279-cur,primary));
}
function secondary279(cur,pt){
 const g=Math.max(8,Math.round(cur*.015))*pt;
 return Math.max(0,Math.min(CAP279-cur,g));
}
function secondStat279(k){
 return k==='power'?'guts':k==='speed'?'agility':k==='stamina'?'guts':k==='agility'?'speed':k==='tech'?'agility':'stamina';
}
function bestStat279(){
 let best=0;
 for(const m of(S.nest||[]))for(const k of STATS279)best=Math.max(best,n279(m.stats?.[k]));
 return best;
}
function galaxyWins279(){return n279(S.leagueWins?.['ギャラクシー'])}
function clearCheck279(){
 const st=st279();
 const ability=bestStat279()>=1500,training=n279(st.sessions)>=3,galaxy=galaxyWins279()>=2;
 st.cleared=ability&&training&&galaxy;
 if(st.cleared)S.limit1Cleared=true;
 return{ability,training,galaxy,all:st.cleared};
}
function nextEnergy279(){
 const st=st279();regen279();if(st.energy>=MAX_EN279)return '満タン';
 const left=Math.max(0,REGEN_MS279-(Date.now()-st.lastEnergyAt));
 return `次の回復まで ${Math.ceil(left/60000)}分`;
}
function train279(){
 if(!released279()||!Array.isArray(S.nest)||S.nest.length!==3)return;
 ensure279();const st=st279();
 if(st.energy<1||total279()!==PTS279)return;
 const rows=[];
 for(const m of S.nest){
   const pt=n279(st.alloc[m.id]);if(pt<=0)continue;
   const k=st.target[m.id],sec=secondStat279(k);
   const before=n279(m.stats?.[k]),before2=n279(m.stats?.[sec]);
   const g=gain279(before,pt),g2=secondary279(before2,pt);
   m.stats[k]=Math.min(CAP279,before+g);m.stats[sec]=Math.min(CAP279,before2+g2);
   rows.push(`${m.name}：${LAB279[k]}+${g} / ${LAB279[sec]}+${g2}`);
 }
 st.energy--;st.sessions++;st.lastEnergyAt=Date.now();st.alloc={};
 ensure279();clearCheck279();persist279();
 render279();
 let msg=document.getElementById('limitResult279');if(msg)msg.innerHTML=`<div class="notice limitGain279"><b>⚡ LIMIT TRAINING #${st.sessions}</b><br>${rows.join('<br>')}</div>`;
 try{window.renderRoster210Live&&window.renderRoster210Live()}catch(_){}
}
function render279(){
 const nest=document.getElementById('nest201');if(!nest)return;
 let old=document.getElementById('limitTrain279');
 if(!released279()){old?.remove();return}
 if(!Array.isArray(S.nest)||S.nest.length!==3){
   if(!old){old=document.createElement('div');old.id='limitTrain279';old.className='box limitTrain279';nest.appendChild(old)}
   old.innerHTML='<b>⚡ LIMIT TRAINING</b><p>現役3体を編成するとLIMIT育成できます。</p>';return;
 }
 ensure279();const st=st279(),total=total279(),chk=clearCheck279();
 let host=old;if(!host){host=document.createElement('div');host.id='limitTrain279';host.className='box limitTrain279';const p=document.getElementById('limitPanel278');p?.after(host);if(!host.parentNode)nest.prepend(host)}
 host.innerHTML=`<div class="limitTrainHead279"><div><small>LIMIT 1 TRAINING</small><b>⚡ 限界育成</b></div><div><strong>ENERGY ${st.energy}/${MAX_EN279}</strong><small>${nextEnergy279()}</small></div></div>
 <div class="ptHead279"><span>育成ポイント</span><b>${total}/${PTS279} pt</b><small>LIMIT 1では毎回4ptを3体へ配分</small></div>
 <div class="athletes279">${S.nest.map(m=>{const pt=n279(st.alloc[m.id]),k=st.target[m.id];return `<article data-a279="${m.id}"><header><b>${m.name}</b><strong>${pt}pt</strong></header><div class="alloc279"><button data-minus279="${m.id}" ${pt<=0?'disabled':''}>−</button><span>${pt}</span><button data-plus279="${m.id}" ${total>=PTS279?'disabled':''}>＋</button></div><label>強化先<select data-target279="${m.id}">${STATS279.map(x=>`<option value="${x}" ${x===k?'selected':''}>${LAB279[x]} ${n279(m.stats?.[x])}</option>`).join('')}</select></label><small>予測：${LAB279[k]} +${gain279(n279(m.stats?.[k]),pt)} / ${LAB279[secondStat279(k)]} +${secondary279(n279(m.stats?.[secondStat279(k)]),pt)}</small></article>`}).join('')}</div>
 <button type="button" id="limitGo279" class="btn or" ${st.energy<1||total!==PTS279?'disabled':''}>⚡ LIMIT育成を実行</button>
 <div id="limitResult279"></div>
 <div class="break279"><b>LIMIT 1 突破条件</b><span class="${chk.ability?'ok279':''}">${chk.ability?'✓':'◇'} 1能力 1,500以上 <em>${bestStat279()}/1500</em></span><span class="${chk.training?'ok279':''}">${chk.training?'✓':'◇'} LIMIT育成 3回 <em>${Math.min(3,n279(st.sessions))}/3</em></span><span class="${chk.galaxy?'ok279':''}">${chk.galaxy?'✓':'◇'} ギャラクシー級優勝 2回 <em>${Math.min(2,galaxyWins279())}/2</em></span><strong>${chk.all?'LIMIT 1 COMPLETE — LIMIT 2 準備完了':'3条件を満たすとLIMIT 1 COMPLETE'}</strong></div>
 <small class="limitNote279">通常の配合・大会は止まりません。ENERGYはLIMIT育成だけで消費し、30分で1回復します。数値はLIMIT1検証用の初期設定です。</small>`;
}
window.addEventListener('click',e=>{
 const plus=e.target?.closest?.('[data-plus279]');if(plus){e.preventDefault();ensure279();const st=st279();if(total279()<PTS279){st.alloc[plus.dataset.plus279]=n279(st.alloc[plus.dataset.plus279])+1;persist279();render279()}return}
 const minus=e.target?.closest?.('[data-minus279]');if(minus){e.preventDefault();ensure279();const st=st279();st.alloc[minus.dataset.minus279]=Math.max(0,n279(st.alloc[minus.dataset.minus279])-1);persist279();render279();return}
 if(e.target?.closest?.('#limitGo279')){e.preventDefault();train279();return}
 if(e.target?.closest?.('.tab[data-v="nest201"],#adopt,#run,#next225,#annualNext233'))setTimeout(render279,0);
},true);
window.addEventListener('change',e=>{
 const sel=e.target?.closest?.('[data-target279]');if(!sel)return;
 const st=st279();if(STATS279.includes(sel.value)){st.target[sel.dataset.target279]=sel.value;persist279();render279()}
},true);
try{const prev279=render;render=function(){const out=prev279();setTimeout(render279,0);return out}}catch(e){console.warn('render279',e)}
window.STAR_LIMIT279={state:()=>({...st279()}),check:clearCheck279,cap:()=>CAP279};
const css=document.createElement('style');css.textContent=`
.limitTrain279{border:2px solid #5a43a6!important;background:linear-gradient(145deg,#f8f4ff,#eef7ff)!important}.limitTrainHead279{display:flex;justify-content:space-between;gap:8px;align-items:center}.limitTrainHead279 small{display:block;font-size:6px;color:#695a9b;font-weight:1000;letter-spacing:.12em}.limitTrainHead279 b{font-size:14px}.limitTrainHead279>div:last-child{text-align:right}.limitTrainHead279 strong{display:block;font-size:10px;color:#523b99}
.ptHead279{display:grid;grid-template-columns:1fr auto;gap:2px 7px;margin:9px 0;padding:7px;border-radius:9px;background:#1a2740;color:#fff}.ptHead279 span{font-size:8px;font-weight:1000}.ptHead279 b{font-size:10px;color:#ffe171}.ptHead279 small{grid-column:1/3;font-size:6px;color:#adc0d7}
.athletes279{display:grid;gap:7px}.athletes279 article{border:1px solid #bdc8d3;border-radius:10px;background:#fff;padding:7px}.athletes279 header{display:flex;justify-content:space-between}.athletes279 header b{font-size:9px}.athletes279 header strong{font-size:9px;color:#6847b0}.alloc279{display:grid;grid-template-columns:40px 1fr 40px;gap:5px;align-items:center;margin:6px 0}.alloc279 button{height:31px;border:1px solid #9eafbf;border-radius:8px;background:#f5f8fb;font-size:18px;font-weight:1000}.alloc279 span{text-align:center;font-size:16px;font-weight:1000}.athletes279 label{display:grid;grid-template-columns:auto 1fr;gap:7px;align-items:center;font-size:7px}.athletes279 select{width:100%;padding:6px;border:1px solid #aebdca;border-radius:7px;background:#fff;font-size:8px}.athletes279 article>small{display:block;margin-top:5px;font-size:6px;color:#667786}.limitTrain279>#limitGo279{width:100%;margin-top:8px}.limitGain279{margin-top:7px;font-size:7px}
.break279{display:grid;gap:4px;margin-top:9px;padding:8px;border-radius:10px;background:#fff;border:1px solid #c8d2dc}.break279>b{font-size:9px}.break279 span{display:grid;grid-template-columns:1fr auto;font-size:7px;color:#687887}.break279 span.ok279{color:#16744a;font-weight:1000}.break279 em{font-style:normal}.break279 strong{margin-top:3px;font-size:7px;color:#6548a8}.limitNote279{display:block;margin-top:7px;font-size:6px;color:#6d7885;line-height:1.45}
`;document.head.appendChild(css);setTimeout(render279,0);
})();