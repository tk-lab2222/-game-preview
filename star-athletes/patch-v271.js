(()=>{
// v0.28.3: M3.4 lineage titles / completed-lineage progress.
const SAVE271='star-athletes-save-v200';
const ST271=['power','speed','stamina','agility','tech','guts'];
function n271(v){return Number(v)||0}
function h271(m,k,d=2){const v=Number(m?.hidden233?.[k]);return Number.isFinite(v)?Math.max(0,Math.min(7,v)):d}
function skills271(m){return Array.isArray(m?.skills233)?m.skills233:[]}
function generation271(m){return Math.max(1,n271(m?.generation||m?.gen||S.generation||1))}
function hasSkill271(m,key){return skills271(m).some(s=>String(s?.key||s?.id||s?.name||s).includes(key))}
function titles271(m){
 const out=[];
 if(n271(m?.stats?.speed)>=500||hasSkill271(m,'speed')||hasSkill271(m,'疾風'))out.push({id:'gale',name:'疾風一族',icon:'💨'});
 if(n271(m?.stats?.power)>=500||hasSkill271(m,'power')||hasSkill271(m,'豪腕'))out.push({id:'power',name:'豪腕血統',icon:'💪'});
 if(h271(m,'heredity')>=6&&h271(m,'mutation')>=6)out.push({id:'gold',name:'黄金血統',icon:'👑'});
 if(generation271(m)>=10)out.push({id:'ten',name:'10代継承',icon:'🔗'});
 return out;
}
function complete271(m){
 const checks=[
  {label:'10代継承',ok:generation271(m)>=10},
  {label:'遺伝力A以上',ok:h271(m,'heredity')>=6},
  {label:'変異因子A以上',ok:h271(m,'mutation')>=6},
  {label:'SKILL 2個以上',ok:skills271(m).length>=2},
  {label:'能力500以上',ok:Math.max(...ST271.map(k=>n271(m?.stats?.[k])))>=500}
 ];
 return {checks,count:checks.filter(x=>x.ok).length,done:checks.every(x=>x.ok)};
}
function persist271(){try{localStorage.setItem(SAVE271,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function award271(m){
 if(!m)return;const ts=titles271(m),cp=complete271(m);m.lineageTitles271=ts.map(x=>x.id);m.completedLineage271=cp.done;
 if(!S.lineageTitleBook271||typeof S.lineageTitleBook271!=='object')S.lineageTitleBook271={};
 ts.forEach(x=>S.lineageTitleBook271[x.id]={name:x.name,icon:x.icon,unlocked:true});
 if(cp.done)S.completedLineageCount271=Math.max(1,n271(S.completedLineageCount271));
}
function badge271(m){
 const ts=titles271(m),cp=complete271(m);if(!ts.length&&!cp.count)return '';
 return `<div class="lineage271">${ts.length?`<div class="titles271">${ts.map(x=>`<span>${x.icon} ${x.name}</span>`).join('')}</div>`:''}<div class="complete271 ${cp.done?'done271':''}"><b>${cp.done?'✨ 完成血統':'完成血統'}</b><small>${cp.done?'達成':`${cp.count}/5`}</small></div></div>`;
}
function cards271(sel,list){document.querySelectorAll(sel).forEach((card,i)=>{const id=card.dataset.id||card.getAttribute('data-m210'),m=(id&&list.find(x=>x.id===id))||list[i];if(!m)return;award271(m);let box=card.querySelector('.lineageHost271');if(!box){box=document.createElement('div');box.className='lineageHost271';(card.querySelector('.bd')||card).appendChild(box)}box.innerHTML=badge271(m)+rareReveal271(m)})}
function summary271(){
 const host=document.getElementById('nestSummary201');if(!host)return;let box=host.querySelector('.lineageSummary271');if(!box){box=document.createElement('div');box.className='lineageSummary271';host.appendChild(box)}
 const book=Object.values(S.lineageTitleBook271||{});box.innerHTML=`<b>🧬 血統称号</b><span>${book.length}/4</span>${book.length?`<small>${book.map(x=>`${x.icon}${x.name}`).join(' ・ ')}</small>`:'<small>条件を満たす血統を育てると称号を獲得</small>'}`;
}
function hiddenBlock271(m){
 const h=m?.hidden233||{},rk=v=>['G','F','E','D','C','B','A','S'][Math.max(0,Math.min(7,Math.round(Number(v)||0)))];
 return `<div class="hidden271"><small>隠れステータス</small><div><span>成長 <b>${rk(h.growth)}</b></span><span>遺伝 <b>${rk(h.heredity)}</b></span><span>勝負 <b>${rk(h.clutch)}</b></span><span>安定 <b>${rk(h.stability)}</b></span><span>変異 <b>${rk(h.mutation)}</b></span><span>LUCK <b>${rk(h.luck)}</b></span></div><em>気性 ${h.temperament||'-'}</em></div>`;
}
function rareReveal271(m){
 if(!m?.ultraRare274&&!m?.miracleFactor274)return '';
 return `<div class="rareHiddenBonus271"><small>✧ 特殊誕生ボーナス / 隠れステータス公開</small>${hiddenBlock271(m)}</div>`;
}
function parentExtras271(){
 const pool=[];const seen=new Set();for(const key of ['starters','lineage','nest'])for(const m of(S[key]||[]))if(m?.id&&!seen.has(m.id)){seen.add(m.id);pool.push(m)}
 document.querySelectorAll('#breeders .card[data-id]').forEach(card=>{
   const m=pool.find(x=>x.id===card.dataset.id);if(!m)return;award271(m);
   const host=card.querySelector('.bd')||card;
   let box=host.querySelector('.parentLineage271');if(!box){box=document.createElement('div');box.className='parentLineage271';host.appendChild(box)}
   box.innerHTML=badge271(m);
 });
}
function render271(){
 try{const c=S.cands||[],l=S.lineage||[],n=S.nest||[];cards271('#cands .card[data-id]',c);cards271('#lineagePool .card',l);cards271('.train210[data-athlete210]',n);parentExtras271();summary271();persist271()}catch(e){console.warn('lineage271',e)}
}
function late271(){render271();[80,220,500,900].forEach(ms=>setTimeout(render271,ms))}
try{const prev271=render;render=function(){const out=prev271();setTimeout(late271,0);return out}}catch(e){console.warn('render271 wrap',e)}
window.addEventListener('click',e=>{if(e.target?.closest?.('#batchGo260,#hatch,#adopt,#doTrain263,.tab[data-v="breed"],.tab[data-v="train"],.tab[data-v="nest201"]'))setTimeout(late271,0)},true);
const css=document.createElement('style');css.textContent=`.lineage271{margin-top:5px;padding-top:5px;border-top:1px dashed #d0d7dd}.titles271{display:flex;gap:3px;flex-wrap:wrap}.titles271 span{font-size:6px;font-weight:900;padding:2px 5px;border:1px solid #c7b66a;border-radius:999px;background:#fffbea}.complete271{margin-top:4px;display:flex;justify-content:space-between;align-items:center;font-size:6px;color:#73808c}.complete271.done271{color:#775d00;font-weight:1000}.parentLineage271>.lineage271{margin-top:6px}.hidden271{margin-top:6px;padding-top:5px;border-top:1px dashed #d0d7dd}.hidden271>small{display:block;font-size:6px;color:#6d7c89;font-weight:1000}.hidden271>div{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin-top:4px}.hidden271 span{display:flex;justify-content:space-between;padding:3px 4px;border:1px solid #d1d9e0;border-radius:6px;background:#f8fafc;font-size:6px}.hidden271 em{display:block;margin-top:4px;font-size:6px;font-style:normal;color:#697887}
.rareHiddenBonus271{margin-top:6px;padding:6px;border:1px solid #a98be8;border-radius:8px;background:#f8f3ff}.rareHiddenBonus271>small{display:block;font-size:6px;font-weight:1000;color:#674a9c}.rareHiddenBonus271 .hidden271{margin-top:4px}.lineageSummary271{margin-top:7px;padding:7px;border:1px solid #cbd5dd;border-radius:9px;background:#f8fbfd;display:grid;grid-template-columns:1fr auto;gap:3px;font-size:7px}.lineageSummary271 small{grid-column:1/-1;color:#697a89}`;document.head.appendChild(css);setTimeout(late271,0);
window.STAR_LINEAGE271={sync:late271};
})();