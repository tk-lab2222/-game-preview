(()=>{
// v0.28.7: reliable visible training intensity controls after every roster re-render.
const SAVE275='star-athletes-save-v200',ROSTER275='star-athletes-active-roster-v210';
const MODES275={
 safe:{icon:'🛡️',name:'安全',desc:'ケガなし / 成長小'},
 normal:{icon:'⚖️',name:'標準',desc:'低リスク / 標準成長'},
 high:{icon:'🔥',name:'高負荷',desc:'高リスク / 上振れ大'}
};
function n275(v){return Number(v)||0}
function clamp275(v,a,b){return Math.max(a,Math.min(b,v))}
function st275(){
 if(!S.training263||typeof S.training263!=='object')S.training263={};
 if(!S.training263.intensity||typeof S.training263.intensity!=='object')S.training263.intensity={};
 if(!S.training263.fatigue||typeof S.training263.fatigue!=='object')S.training263.fatigue={};
 return S.training263;
}
function hidden275(m,k,d=2){const v=Number(m?.hidden233?.[k]);if(!Number.isFinite(v))return d;return [0,0,0,1,2,3,4,5][clamp275(Math.round(v),0,7)]}
function fatigue275(m){return clamp275(n275(st275().fatigue[m.id]),0,2)}
function condition275(m){const f=fatigue275(m);return f===0?'好調':f===1?'普通':'疲労'}
function rate275(m,mode){
 const stability=hidden275(m,'stability',2),luck=hidden275(m,'luck',2),f=fatigue275(m);
 if(mode==='safe')return 0;
 if(mode==='normal')return clamp275(.04-stability*.004-luck*.002+f*.015,.01,.08);
 let r=clamp275(.28-stability*.035-luck*.008,.06,.28);
 if(f===1)r=1-(1-r)*.84;if(f===2)r=1-(1-r)*.66;
 if(st275().policy266==='lineage')r=Math.max(.03,r-.04);
 return clamp275(r,.03,.48);
}
function persist275(){
 try{localStorage.setItem(SAVE275,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}
 try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem(ROSTER275,JSON.stringify(S.nest))}catch(_){}
}
function sync275(){
 const nest=Array.isArray(S.nest)?S.nest:[];if(nest.length!==3)return;
 document.querySelectorAll('.train210[data-athlete210]').forEach(card=>{
  const m=nest.find(x=>x.id===card.dataset.athlete210);if(!m)return;
  let box=card.querySelector('.training275');
  if(!box){box=document.createElement('div');box.className='training275';card.appendChild(box)}
  const st=st275(),mode=MODES275[st.intensity[m.id]]?st.intensity[m.id]:'normal';st.intensity[m.id]=mode;
  const f=fatigue275(m),pct=Math.round(rate275(m,mode)*100);
  box.innerHTML=`<div class="condition275"><span>コンディション</span><b class="f${f}">${condition275(m)}</b><strong>ケガ率 ${pct}%</strong></div>
   <div class="modeTitle275">負荷設定 <small>個体ごとに選択</small></div>
   <div class="modes275">${Object.entries(MODES275).map(([k,v])=>`<button type="button" data-int275="${k}" data-ath275="${m.id}" class="${mode===k?'on275':''}" ${Number(S.turn)>=3?'disabled':''}><b>${v.icon} ${v.name}</b><small>${v.desc}</small></button>`).join('')}</div>`;
 });
}
window.addEventListener('click',e=>{
 const b=e.target?.closest?.('[data-int275]');
 if(b){
  e.preventDefault();e.stopPropagation();
  st275().intensity[b.dataset.ath275]=b.dataset.int275;persist275();sync275();return;
 }
 if(e.target?.closest?.('[data-p210],[data-policy266],#doTrain263,.tab[data-v="train"],#adopt')){
  [0,60,160,360].forEach(ms=>setTimeout(sync275,ms));
 }
},true);
function late275(){sync275();[80,220].forEach(ms=>setTimeout(sync275,ms))}
try{const prev275=render;render=function(){const out=prev275();setTimeout(late275,0);return out}}catch(e){console.warn('render275',e)}
try{
 const prevRoster275=window.renderRoster210Live;
 if(typeof prevRoster275==='function'&&!window.renderRoster210Live275){
  window.renderRoster210Live275=true;
  window.renderRoster210Live=function(){const out=prevRoster275();setTimeout(sync275,0);setTimeout(sync275,100);return out};
 }
}catch(e){console.warn('roster275',e)}
const css=document.createElement('style');css.textContent=`
.training275{margin-top:8px;padding-top:8px;border-top:1px dashed #bdc9d4}.condition275{display:grid;grid-template-columns:1fr auto auto;gap:5px;align-items:center;padding:6px;border-radius:8px;background:#f3f6f8;font-size:7px}.condition275 span{font-weight:1000}.condition275 b{border:1px solid #8798a7;border-radius:999px;padding:2px 6px;background:#fff}.condition275 b.f0{background:#eaf8ef}.condition275 b.f2{background:#fff0e8}.condition275 strong{font-size:7px;color:#9a3e28}.modeTitle275{display:flex;justify-content:space-between;margin:7px 0 4px;font-size:8px;font-weight:1000}.modeTitle275 small{font-size:6px;color:#71808e}.modes275{display:grid;grid-template-columns:repeat(3,1fr);gap:5px}.modes275 button{min-height:43px;border:1px solid #aebdca;border-radius:9px;background:#fff;padding:5px 3px;color:#223344}.modes275 button b{display:block;font-size:8px}.modes275 button small{display:block;font-size:6px;line-height:1.25;margin-top:2px;color:#71808e}.modes275 button.on275{border-color:#e18c20;background:#fff0cf;box-shadow:0 0 0 2px #ffd58f}
`;document.head.appendChild(css);late275();
})();