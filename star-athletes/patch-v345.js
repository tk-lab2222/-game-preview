(()=>{
// v0.32.09: true secret Star Resonance missions.
// Undiscovered targets, names, counts and recipes stay hidden until first discovery.
if(window.STAR_RESONANCE_MISSION345)return;

const SAVE345='star-athletes-save-v200';
const MISSIONS345=[
 {id:'res_first',name:'星相共鳴を発見する',reward:1500,test:d=>Object.keys(d).length>0},
 {id:'res_phantom',name:'幻星共鳴を発見する',reward:5000,test:d=>Object.values(d).some(x=>Number(x?.grade)>=4)},
 {id:'res_god',name:'神星共鳴を発見する',reward:15000,test:d=>Object.values(d).some(x=>Number(x?.grade)>=5)},
 {id:'gold_thunder',name:'「黄金雷帝」を発見する',reward:6000,test:d=>!!d['黄金雷帝']},
 {id:'gold_flame',name:'「黄金烈王」を発見する',reward:6000,test:d=>!!d['黄金烈王']},
 {id:'prism_dash',name:'「星虹の天駆」を発見する',reward:9000,test:d=>!!d['星虹の天駆']},
 {id:'prism_star',name:'「星虹天星」を発見する',reward:9000,test:d=>!!d['星虹天星']},
 {id:'mutation_moon',name:'「幻月異相」を発見する',reward:9000,test:d=>!!d['幻月異相']}
];

function all345(){
 const out=[],seen=new Set();
 for(const key of ['starters','nest','lineage','released','cands','foster']){
  for(const m of(S?.[key]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);out.push(m)}
 }
 return out;
}
function discoveries345(){
 if(!S.starResonanceDiscoveries344||typeof S.starResonanceDiscoveries344!=='object')S.starResonanceDiscoveries344={};
 for(const m of all345()){
  const r=m?.starResonance344;
  if(!r?.name)continue;
  const old=S.starResonanceDiscoveries344[r.name];
  if(!old||Number(r.grade)>Number(old.grade||0)){
   S.starResonanceDiscoveries344[r.name]={grade:Number(r.grade)||0,firstAt:old?.firstAt||r.at||Date.now(),latestAt:Date.now(),athleteId:m.id};
  }
 }
 return S.starResonanceDiscoveries344;
}
function claimed345(){
 if(!S.starResonanceMissionClaimed345||typeof S.starResonanceMissionClaimed345!=='object')S.starResonanceMissionClaimed345={};
 return S.starResonanceMissionClaimed345;
}
function save345(){
 try{localStorage.setItem(SAVE345,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}
}
function defs345(){
 const d=discoveries345(),c=claimed345();
 return MISSIONS345.map(m=>({...m,ok:!!m.test(d),claimed:!!c[m.id]}));
}
function card345(m){
 return `<div class="resMissionCard345 ${m.ok?'done345':''}">
   <div><b>${m.name}</b><small>${m.ok?'発見済み':'未発見'}</small></div>
   <button type="button" data-res-mission345="${m.id}" ${!m.ok||m.claimed?'disabled':''}>${m.claimed?'受取済':m.ok?`🪙 ${m.reward} 受取`:'？？？'}</button>
 </div>`;
}
function render345(){
 const host=document.getElementById('missionHost203')||document.getElementById('mission203');
 if(!host)return;
 let box=document.getElementById('resonanceMissions345');
 if(!box){
  box=document.createElement('div');box.id='resonanceMissions345';box.className='box resonanceMissions345';
  const main=document.getElementById('mission200');
  main?.after?main.after(box):host.appendChild(box);
 }
 const ds=defs345(),revealed=ds.filter(x=>x.ok&&!x.claimed),done=ds.filter(x=>x.ok&&x.claimed);
 box.innerHTML=`
  <div class="resMissionHead345">
   <div><small>SECRET MISSION</small><h3>✦ シークレットミッション</h3></div>
   ${revealed.length?'<b>NEW '+revealed.length+'</b>':''}
  </div>
  <p class="resMissionHint345">条件・種類・総数は非公開。未知の星相を発見すると、その時初めてミッションが開示されます。</p>
  ${revealed.length?`<div class="resMissionReveal345"><small>新たなミッションを発見！</small><div class="resMissionGrid345">${revealed.map(card345).join('')}</div></div>`:'<div class="resMissionSecret345"><b>？？？</b><span>まだ見ぬ星相がどこかに眠っている……</span></div>'}
  ${done.length?`<details class="resMissionDone345"><summary>発見・達成済み ${done.length}件</summary><div class="resMissionGrid345">${done.map(card345).join('')}</div></details>`:''}
 `;
}
function claim345(id){
 const m=defs345().find(x=>x.id===id);
 if(!m||!m.ok||m.claimed)return;
 claimed345()[id]=true;
 S.coins=(Number(S.coins)||0)+Number(m.reward||0);
 save345();
 try{render()}catch(_){}
 setTimeout(render345,0);
}
document.addEventListener('click',e=>{
 const b=e.target?.closest?.('[data-res-mission345]');
 if(b){e.preventDefault();e.stopPropagation();claim345(b.dataset.resMission345);return}
 if(e.target?.closest?.('.tab[data-v="mission203"],#hatch,#adopt,#breedBtn'))setTimeout(render345,30);
},true);

const css=document.createElement('style');
css.id='resonanceMission345css';
css.textContent=`
.resonanceMissions345{margin-top:10px;background:linear-gradient(145deg,#101a2e,#25204a)!important;color:#fff!important;border:1px solid #665a95!important}
.resMissionHead345{display:flex;justify-content:space-between;align-items:center;gap:10px}
.resMissionHead345 small{display:block;font-size:6px;letter-spacing:.16em;color:#9feaff;font-weight:1000}
.resMissionHead345 h3{margin:2px 0;font-size:15px}.resMissionHead345>b{border-radius:999px;background:#ffffff14;border:1px solid #ffffff22;color:#ffe875;padding:5px 9px;font-size:9px}
.resMissionHint345{margin:6px 0 8px;font-size:7px;color:#bfc7dc}
.resMissionGrid345{display:grid;gap:6px}
.resMissionCard345{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;padding:8px;border:1px solid #ffffff1f;border-radius:10px;background:#ffffff0b}
.resMissionCard345.done345{border-color:#b894ff66;background:linear-gradient(90deg,#6e58aa22,#d5b85e18)}
.resMissionCard345 b,.resMissionCard345 small{display:block}.resMissionCard345 b{font-size:9px}.resMissionCard345 small{margin-top:2px;font-size:7px;color:#9ba9c3}
.resMissionCard345.done345 small{color:#ffe383}
.resMissionCard345 button{border:1px solid #ffffff28;border-radius:8px;background:#ffffff10;color:#ffe476;padding:6px 7px;font-size:7px;font-weight:1000}
.resMissionCard345 button:disabled{opacity:.45;color:#c1c7d4}
.resMissionDone345{margin-top:9px;border-top:1px dashed #ffffff25;padding-top:7px}.resMissionDone345 summary{cursor:pointer;font-size:8px;font-weight:1000;color:#aebbd2;margin-bottom:6px}
.resMissionAll345{padding:12px;text-align:center;font-size:8px;color:#aef0cf}
.resMissionReveal345{margin-top:7px;padding:8px;border:1px solid #b894ff55;border-radius:11px;background:#ffffff08}.resMissionReveal345>small{display:block;margin-bottom:5px;font-size:7px;color:#ffe67c;font-weight:1000}
.resMissionSecret345{margin-top:7px;padding:14px 10px;border:1px dashed #ffffff24;border-radius:11px;text-align:center;background:#05081433}.resMissionSecret345 b,.resMissionSecret345 span{display:block}.resMissionSecret345 b{font-size:17px;letter-spacing:.2em;color:#ffffff55}.resMissionSecret345 span{margin-top:4px;font-size:7px;color:#9ca8bf}
`;
document.head.appendChild(css);
setTimeout(()=>{discoveries345();save345();render345()},0);
window.STAR_RESONANCE_MISSION345={sync:render345,defs:defs345};
})();