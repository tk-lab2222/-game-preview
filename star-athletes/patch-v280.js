(()=>{
// v0.29.3 / M7: Nest Representative 3 + self-best.
// Registration is a separate competitive layer; it does not replace the active training roster.
const SAVE280='star-athletes-save-v200';
const STATS280=['power','speed','stamina','agility','tech','guts'];
const LAB280={power:'ちから',speed:'スピード',stamina:'スタミナ',agility:'すばやさ',tech:'テクニック',guts:'こんじょう'};
const SK280={power:'豪腕',speed:'疾風',stamina:'鉄肺',agility:'軽業',tech:'精密',guts:'勝負魂'};
const ROLE280={
 ace:{name:'エース',icon:'⭐',hint:'総合力を重視'},
 sprint:{name:'スプリンター',icon:'💨',hint:'スピード・すばやさ'},
 power:{name:'パワー',icon:'💪',hint:'ちから・こんじょう'},
 endurance:{name:'持久',icon:'🫀',hint:'スタミナ・こんじょう'},
 technique:{name:'技巧',icon:'🎯',hint:'テクニック・すばやさ'}
};
const TACTIC280={
 balance:{name:'バランス',desc:'3体の総合力を素直に評価'},
 attack:{name:'攻め',desc:'各個体の最大能力を強く評価'},
 link:{name:'連携',desc:'SKILLの組合せと役割差を強く評価'}
};
function n280(v){return Number(v)||0}
function state280(){
 if(!S.rep280||typeof S.rep280!=='object')S.rep280={selected:[],roles:{},tactic:'balance',best:null,history:[]};
 const st=S.rep280;
 if(!Array.isArray(st.selected))st.selected=[];
 if(!st.roles||typeof st.roles!=='object')st.roles={};
 if(!TACTIC280[st.tactic])st.tactic='balance';
 if(!Array.isArray(st.history))st.history=[];
 return st;
}
function persist280(){try{localStorage.setItem(SAVE280,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function pool280(){
 const out=[],seen=new Set();
 for(const key of ['nest','lineage','starters']){
  for(const m of(S[key]||[])){
   if(m?.id&&!seen.has(m.id)){seen.add(m.id);out.push(m)}
  }
 }
 return out.sort((a,b)=>avg280(b)-avg280(a));
}
function avg280(m){return Math.round(STATS280.reduce((a,k)=>a+n280(m?.stats?.[k]),0)/STATS280.length)}
function maxStat280(m){return Math.max(...STATS280.map(k=>n280(m?.stats?.[k])))}
function skills280(m){return Array.isArray(m?.skills233)?m.skills233:[]}
function bestRole280(m){
 const s=m?.stats||{},avg=avg280(m),mx=maxStat280(m);
 if(mx-avg<Math.max(12,avg*.07))return'ace';
 const pairs={
  sprint:n280(s.speed)+n280(s.agility),
  power:n280(s.power)+n280(s.guts),
  endurance:n280(s.stamina)+n280(s.guts),
  technique:n280(s.tech)+n280(s.agility)
 };
 return Object.keys(pairs).sort((a,b)=>pairs[b]-pairs[a])[0]||'ace';
}
function ensure280(){
 const st=state280(),ids=new Set(pool280().map(m=>m.id));
 st.selected=st.selected.filter(id=>ids.has(id)).slice(0,3);
 for(const id of Object.keys(st.roles))if(!ids.has(id))delete st.roles[id];
 for(const m of pool280())if(!ROLE280[st.roles[m.id]])st.roles[m.id]=bestRole280(m);
}
function roleScore280(m,role){
 const s=m?.stats||{};
 if(role==='sprint')return n280(s.speed)*.56+n280(s.agility)*.32+n280(s.tech)*.12;
 if(role==='power')return n280(s.power)*.54+n280(s.guts)*.30+n280(s.stamina)*.16;
 if(role==='endurance')return n280(s.stamina)*.52+n280(s.guts)*.30+n280(s.speed)*.18;
 if(role==='technique')return n280(s.tech)*.52+n280(s.agility)*.28+n280(s.guts)*.20;
 return avg280(m);
}
function synergy280(team){
 if(team.length!==3)return{score:0,label:'未登録',parts:[]};
 const st=state280(),roles=team.map(m=>st.roles[m.id]||bestRole280(m));
 const roleKinds=new Set(roles).size;
 const skillSet=new Set(team.flatMap(skills280));
 let score=0,parts=[];
 if(roleKinds>=3){score+=7;parts.push('役割分担')}
 if(skillSet.size>=4){score+=6;parts.push('SKILL多様性')}
 const pairCombos=[['speed','agility'],['power','stamina'],['tech','guts']];
 for(const [a,b] of pairCombos)if(skillSet.has(a)&&skillSet.has(b)){score+=4;parts.push((SK280[a]||a)+'×'+(SK280[b]||b))}
 const species=new Set(team.map(m=>m.species).filter(Boolean)).size;
 if(species>=3){score+=3;parts.push('異種チーム')}
 score=Math.min(22,score);
 return{score,label:score>=17?'抜群':score>=11?'良好':score>=6?'普通':'低め',parts};
}
function calc280(team){
 if(team.length!==3)return null;
 const st=state280();
 const base=team.reduce((a,m)=>a+roleScore280(m,st.roles[m.id]||bestRole280(m)),0)/3;
 const maxBonus=team.reduce((a,m)=>a+maxStat280(m),0)/3;
 const syn=synergy280(team);
 let score=base+syn.score;
 if(st.tactic==='attack')score=base*.88+maxBonus*.18+syn.score*.65;
 else if(st.tactic==='link')score=base*.94+syn.score*1.8;
 return{score:Math.round(score),base:Math.round(base),synergy:syn,maxBonus:Math.round(maxBonus)};
}
function team280(){const p=pool280(),st=state280();return st.selected.map(id=>p.find(m=>m.id===id)).filter(Boolean)}
function register280(){
 ensure280();const st=state280(),team=team280(),calc=calc280(team);
 if(team.length!==3||!calc)return;
 const snapshot={
  at:Date.now(),score:calc.score,tactic:st.tactic,
  synergy:calc.synergy.score,
  members:team.map(m=>({id:m.id,name:m.name,rarity:m.rarity,gen:n280(m.gen),role:st.roles[m.id],avg:avg280(m),stats:{...m.stats},skills:[...skills280(m)]}))
 };
 const prev=n280(st.best?.score),isBest=snapshot.score>prev;
 if(isBest)st.best=snapshot;
 st.history.unshift(snapshot);st.history=st.history.slice(0,20);
 persist280();render280(isBest?'BEST UPDATED':'REGISTERED');
}
function memberCard280(m,selected){
 const st=state280(),role=st.roles[m.id]||bestRole280(m);
 const top=STATS280.slice().sort((a,b)=>n280(m.stats?.[b])-n280(m.stats?.[a]))[0];
 return `<article class="repCard280 ${selected?'on280':''}">
   <button type="button" class="pick280" data-pick280="${m.id}">${selected?'✓ 代表':'代表に選ぶ'}</button>
   <header><b>${m.name}</b><span>${m.rarity||'-'} / G${n280(m.gen)}</span></header>
   <div class="power280"><strong>${avg280(m)}</strong><small>平均能力</small><em>得意 ${LAB280[top]} ${n280(m.stats?.[top])}</em></div>
   <label>役割<select data-role280="${m.id}">${Object.entries(ROLE280).map(([k,v])=>`<option value="${k}" ${k===role?'selected':''}>${v.icon} ${v.name}</option>`).join('')}</select></label>
   <small>SKILL：${skills280(m).length?skills280(m).map(k=>SK280[k]||k).join(' / '):'なし'}</small>
 </article>`;
}
function render280(flag=''){
 const nest=document.getElementById('nest201');if(!nest)return;
 ensure280();const st=state280(),pool=pool280(),team=team280(),calc=calc280(team);
 let host=document.getElementById('rep280');
 if(!host){host=document.createElement('div');host.id='rep280';host.className='box rep280';const lim=document.getElementById('limitTrain279')||document.getElementById('limitPanel278');lim?.after(host);if(!host.parentNode)nest.appendChild(host)}
 const best=st.best;
 const bestMembers=Array.isArray(best?.members)?best.members:[];
 const selfBestCards=bestMembers.length?bestMembers.map(m=>{
   const top=STATS280.slice().sort((a,b)=>n280(m.stats?.[b])-n280(m.stats?.[a]))[0];
   const sk=Array.isArray(m.skills)&&m.skills.length?m.skills.map(k=>SK280[k]||k).join(' / '):'なし';
   return `<article><b>${m.name}</b><span>⭐ ${LAB280[top]} ${n280(m.stats?.[top])}</span><small>✨ ${sk}</small></article>`;
 }).join(''):'<small class="bestEmpty280">代表3体を登録するとここに残ります</small>';
 host.innerHTML=`<div class="repHead280"><div><small>NEST REPRESENTATIVE</small><b>🏁 ネスト代表3体</b></div><span>${st.selected.length}/3</span></div>
 <p class="repIntro280">現役・歴代血統から3体を選び、代表チームとして記録します。</p>
 <div class="best280"><div class="bestHead280"><div><small>SELF BEST</small><b>🏅 ベスト代表</b></div><span>${best?new Date(best.at).toLocaleDateString('ja-JP'):'未登録'}</span></div><div class="bestMembers280">${selfBestCards}</div>${best?`<small class="bestScore280">TEAM POWER ${n280(best.score).toLocaleString()}</small>`:''}${flag?`<em>${flag==='BEST UPDATED'?'自己ベスト更新！':'代表を登録しました'}</em>`:''}</div>
 <div class="tactic280"><b>チーム戦術</b><div>${Object.entries(TACTIC280).map(([k,v])=>`<button type="button" data-tactic280="${k}" class="${st.tactic===k?'on280':''}"><strong>${v.name}</strong><small>${v.desc}</small></button>`).join('')}</div></div>
 <div class="score280"><div><small>TEAM POWER</small><b>${calc?calc.score.toLocaleString():'3体選択'}</b></div><div><small>SYNERGY</small><b>${calc?calc.synergy.label:'-'}</b><em>${calc&&calc.synergy.parts.length?calc.synergy.parts.join(' / '):'役割とSKILLで変化'}</em></div></div>
 <div class="selected280">${team.length?team.map((m,i)=>`<span><i>${i+1}</i><b>${m.name}</b><small>${ROLE280[st.roles[m.id]]?.icon||''} ${ROLE280[st.roles[m.id]]?.name||''}</small></span>`).join(''):'<small>下の候補から3体を選択</small>'}</div>
 <button type="button" id="register280" class="btn or" ${team.length===3?'':'disabled'}>🏁 この3体をネスト代表に登録</button>
 <details class="poolDetails280" open><summary>代表候補 ${pool.length}体</summary><div class="pool280">${pool.map(m=>memberCard280(m,st.selected.includes(m.id))).join('')}</div></details>
 <small class="repNote280">代表登録は育成中の現役3体を変更しません。ランキング対戦は後段。まず自己ベスト更新を競う基盤です。</small>`;
}
window.addEventListener('click',e=>{
 const pick=e.target?.closest?.('[data-pick280]');if(pick){e.preventDefault();ensure280();const st=state280(),id=pick.dataset.pick280;if(st.selected.includes(id))st.selected=st.selected.filter(x=>x!==id);else if(st.selected.length<3)st.selected.push(id);else st.selected=[st.selected[1],st.selected[2],id];persist280();render280();return}
 const tac=e.target?.closest?.('[data-tactic280]');if(tac){e.preventDefault();const st=state280();if(TACTIC280[tac.dataset.tactic280])st.tactic=tac.dataset.tactic280;persist280();render280();return}
 if(e.target?.closest?.('#register280')){e.preventDefault();register280();return}
 if(e.target?.closest?.('.tab[data-v="nest201"],#adopt,#limitGo279,#run,#next225,#annualNext233'))setTimeout(render280,0);
},true);
window.addEventListener('change',e=>{
 const sel=e.target?.closest?.('[data-role280]');if(!sel)return;const st=state280();if(ROLE280[sel.value])st.roles[sel.dataset.role280]=sel.value;persist280();render280();
},true);
try{const prev280=render;render=function(){const out=prev280();setTimeout(render280,0);return out}}catch(e){console.warn('render280',e)}
window.STAR_REP280={state:()=>({...state280()}),score:()=>calc280(team280()),pool:pool280};
const css=document.createElement('style');css.textContent=`
.rep280{border:2px solid #263b5c!important;background:linear-gradient(145deg,#f8fbff,#f2f6fb)!important}.repHead280{display:flex;justify-content:space-between;align-items:center}.repHead280 small{display:block;font-size:6px;letter-spacing:.14em;color:#6a7d95;font-weight:1000}.repHead280 b{font-size:14px}.repHead280>span{font-size:8px;font-weight:1000;border:1px solid #8ea0b1;border-radius:999px;padding:4px 8px;background:#fff}.repIntro280{font-size:7px;line-height:1.5;color:#637183}
.best280{margin:8px 0;padding:9px;border-radius:11px;background:#152640;color:#fff}.bestHead280{display:flex;justify-content:space-between;align-items:center;gap:8px}.bestHead280 small{display:block;font-size:6px;color:#86dfff;font-weight:1000}.bestHead280 b{font-size:11px;color:#ffe378}.bestHead280 span{font-size:7px}.bestMembers280{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-top:7px}.bestMembers280 article{padding:7px 5px;border:1px solid #ffffff2b;border-radius:9px;background:#ffffff0d;text-align:center;min-width:0}.bestMembers280 article b,.bestMembers280 article span,.bestMembers280 article small{display:block}.bestMembers280 article b{font-size:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bestMembers280 article span{font-size:7px;color:#ffe378;margin-top:3px}.bestMembers280 article small{font-size:6px;color:#b9e8ff;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bestEmpty280{display:block;text-align:center;padding:8px;font-size:7px;color:#a9bbcf}.bestScore280{display:block;text-align:right;margin-top:5px;font-size:6px!important;color:#91a9c0!important}.best280 em{display:block;margin-top:5px;font-style:normal;font-size:7px;color:#7dffbd;font-weight:1000}
.tactic280>b{font-size:8px}.tactic280>div{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-top:5px}.tactic280 button{min-height:48px;border:1px solid #aebdca;border-radius:9px;background:#fff;padding:5px;color:#253a50}.tactic280 button strong,.tactic280 button small{display:block}.tactic280 button strong{font-size:8px}.tactic280 button small{font-size:5.5px;line-height:1.3;margin-top:3px;color:#728191}.tactic280 button.on280{border-color:#e0a329;background:#fff3c9;box-shadow:0 0 0 1px #f0ca68}
.score280{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}.score280>div{padding:8px;border-radius:10px;background:#fff;border:1px solid #c4cfda}.score280 small{display:block;font-size:6px;color:#708093;font-weight:1000}.score280 b{font-size:17px}.score280 em{display:block;font-size:5.5px;font-style:normal;color:#71808e}
.selected280{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin:7px 0}.selected280>span{position:relative;border:1px solid #b8c5d0;border-radius:9px;padding:6px;background:#fff;text-align:center}.selected280 i{position:absolute;left:4px;top:4px;width:15px;height:15px;border-radius:50%;background:#253d61;color:#fff;font-size:7px;font-style:normal;display:grid;place-items:center}.selected280 b,.selected280 small{display:block}.selected280 b{font-size:8px}.selected280 small{font-size:6px;color:#69798a}.selected280>small{grid-column:1/4;text-align:center;font-size:7px;color:#71808d}.rep280>#register280{width:100%}
.poolDetails280{margin-top:8px}.poolDetails280 summary{font-size:8px;font-weight:1000}.pool280{display:grid;gap:6px;margin-top:6px}.repCard280{position:relative;border:1px solid #c1ccd6;border-radius:10px;background:#fff;padding:7px}.repCard280.on280{border:2px solid #4ba4d8;background:#f0f9ff}.pick280{position:absolute;right:6px;top:6px;border:1px solid #94a6b7;border-radius:999px;background:#fff;padding:3px 6px;font-size:6px;font-weight:1000}.repCard280.on280 .pick280{background:#245880;color:#fff;border-color:#245880}.repCard280 header{padding-right:66px}.repCard280 header b,.repCard280 header span{display:block}.repCard280 header b{font-size:9px}.repCard280 header span{font-size:6px;color:#768494}.power280{display:flex;gap:6px;align-items:baseline;margin:5px 0}.power280 strong{font-size:16px}.power280 small,.power280 em{font-size:6px;font-style:normal;color:#69798a}.repCard280 label{display:grid;grid-template-columns:auto 1fr;gap:6px;align-items:center;font-size:7px}.repCard280 select{padding:5px;border:1px solid #adbcca;border-radius:7px;background:#fff;font-size:7px}.repCard280>small{display:block;margin-top:5px;font-size:6px;color:#68798a}.repNote280{display:block;margin-top:7px;font-size:6px;color:#6d7885;line-height:1.45}
`;document.head.appendChild(css);setTimeout(render280,0);
})();