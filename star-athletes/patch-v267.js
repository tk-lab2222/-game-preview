(()=>{
// v0.27.7: M2.5 lightweight random training events. Event is luck; outcome is player choice.
const SAVE267='star-athletes-save-v200';
const EV267={
  awaken:{icon:'✨',name:'覚醒の兆し',text:'いつも以上の集中を見せている。ここで一段攻める？',a:'攻める',b:'安全に行く'},
  rival:{icon:'🤝',name:'ライバル合同練習',text:'ライバルチームから合同練習の誘いが来た。',a:'参加する',b:'見学する'},
  condition:{icon:'🩹',name:'体調不良',text:'少し動きが重い。このまま練習を続ける？',a:'休養する',b:'強行する'}
};
function st267(){if(!S.training263||typeof S.training263!=='object')S.training263={};if(!S.training263.event267)S.training263.event267={count:0,pending:null,resolved:[]};return S.training263.event267}
function save267(){try{localStorage.setItem(SAVE267,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function fatigue267(id,d){if(!S.training263.fatigue)S.training263.fatigue={};S.training263.fatigue[id]=Math.max(0,Math.min(2,(Number(S.training263.fatigue[id])||0)+d))}
function pick267(){const a=S.nest||[];return a[Math.floor(Math.random()*a.length)]}
function maybe267(){
  const st=st267();if(st.pending||st.count>=2||Number(S.turn)>=3||!Array.isArray(S.nest)||S.nest.length!==3)return;
  // One event is likely each generation; a second remains occasional. Never more than one per training round.
  const chance=st.count===0?(Number(S.turn)>=1?.62:.34):.28;
  if(Math.random()>chance)return;
  const keys=Object.keys(EV267),type=keys[Math.floor(Math.random()*keys.length)],m=pick267();if(!m)return;
  st.pending={type,id:m.id,name:m.name};st.count++;save267();render267();
}
function resolve267(choice){
  const st=st267(),p=st.pending;if(!p)return;const m=(S.nest||[]).find(x=>x.id===p.id);if(!m){st.pending=null;save267();render267();return}
  let msg='';
  if(p.type==='awaken'){
    if(choice==='a'){
      const success=Math.random()<.62;
      if(success){const keys=['power','speed','stamina','agility','tech','guts'],k=keys[Math.floor(Math.random()*keys.length)],g=4+Math.floor(Math.random()*4);m.stats[k]=Math.min(999,(Number(m.stats[k])||0)+g);msg=`攻めて成功！ ${SL?.[k]||k}+${g}`}
      else{fatigue267(m.id,1);msg='攻めたが空回り。疲労が増えた'}
    }else{const g=2;m.stats.tech=Math.min(999,(Number(m.stats.tech)||0)+g);msg=`安全策で確実に成長。${SL?.tech||'技術'}+${g}`}
  }else if(p.type==='rival'){
    if(choice==='a'){
      const g=3+Math.floor(Math.random()*3);m.stats.guts=Math.min(999,(Number(m.stats.guts)||0)+g);m.stats.tech=Math.min(999,(Number(m.stats.tech)||0)+g);fatigue267(m.id,1);msg=`刺激を受けた！ ${SL?.guts||'勝負強さ'}+${g} / ${SL?.tech||'技術'}+${g}、疲労+1`;
    }else{const g=2;m.stats.tech=Math.min(999,(Number(m.stats.tech)||0)+g);msg=`見学から学んだ。${SL?.tech||'技術'}+${g}`}
  }else{
    if(choice==='a'){fatigue267(m.id,-2);msg='しっかり休んでコンディション回復'}
    else{const success=Math.random()<.48;if(success){const g=5;m.stats.guts=Math.min(999,(Number(m.stats.guts)||0)+g);msg=`強行が実った！ ${SL?.guts||'勝負強さ'}+${g}`}else{fatigue267(m.id,1);msg='無理が響いた。疲労が増えた'}}
  }
  st.resolved.push({type:p.type,id:p.id,choice,result:msg});if(st.resolved.length>6)st.resolved=st.resolved.slice(-6);st.pending=null;save267();
  try{render();window.renderRoster210Live&&window.renderRoster210Live()}catch(_){}render267(msg);
}
function render267(result=''){
  const plans=document.getElementById('plans');if(!plans)return;
  let host=document.getElementById('event267');if(!host){host=document.createElement('div');host.id='event267'}if(plans.nextElementSibling!==host)plans.insertAdjacentElement('afterend',host)
  const p=st267().pending;if(!p){host.innerHTML=result?`<div class="eventResult267">${result}</div>`:'';return}
  const e=EV267[p.type];host.innerHTML=`<div class="eventCutin267">育成イベント</div><div class="eventCard267"><div class="eventTitle267"><b>${e.icon} ${e.name}</b><span>${p.name}</span></div><p>${e.text}</p><div class="eventActions267"><button type="button" data-event267="a">${e.a}</button><button type="button" data-event267="b">${e.b}</button></div><small>イベントの発生は運。結果は選択で変わります。</small></div>`;
  const go=document.getElementById('doTrain263');if(go){go.disabled=true;go.title='先にイベントの選択を決めてください'}
}
window.addEventListener('click',e=>{
  const b=e.target?.closest?.('[data-event267]');if(b){e.preventDefault();e.stopPropagation();resolve267(b.dataset.event267);return}
  if(e.target?.closest?.('#doTrain263'))setTimeout(()=>{maybe267();render267()},70);
  if(e.target?.closest?.('.tab[data-v="train"]'))setTimeout(render267,0);
  if(e.target?.closest?.('#adopt'))setTimeout(()=>{if(Number(S.turn)===0){S.training263.event267={count:0,pending:null,resolved:[]};save267();render267()}},260);
},true);
function late267(){render267();[80,220].forEach(ms=>setTimeout(render267,ms))}
try{const prev267=render;render=function(){const out=prev267();late267();return out}}catch(e){console.warn('render267',e)}
const css=document.createElement('style');css.textContent=`.eventCutin267{margin:8px 0 0;padding:7px;text-align:center;border-radius:10px 10px 0 0;background:#342b4c;color:#fff;font-size:8px;font-weight:1000;letter-spacing:.14em;animation:eventCut267 .35s ease}.eventCard267{margin:0 0 8px;padding:9px;border:2px solid #7c63b7;border-radius:11px;background:#f8f5ff}.eventTitle267{display:flex;justify-content:space-between;align-items:center;gap:8px}.eventTitle267 b{font-size:10px}.eventTitle267 span{font-size:7px;font-weight:1000;border:1px solid #a99aca;border-radius:999px;padding:2px 6px;background:#fff}.eventCard267 p{font-size:8px;margin:6px 0}.eventCard267 small{display:block;font-size:6px;color:#6d6382;margin-top:5px}.eventActions267{display:grid;grid-template-columns:1fr 1fr;gap:6px}.eventActions267 button{min-height:36px;border:1px solid #7c63b7;border-radius:8px;background:#fff;font-size:8px;font-weight:1000;color:#342b4c}.eventActions267 button:first-child{background:#eee7ff}.eventResult267{margin:7px 0;padding:7px;border:1px solid #88b99a;border-radius:9px;background:#f1fff5;font-size:8px;font-weight:900}@keyframes eventCut267{0%{transform:translateX(-18px);opacity:0}100%{transform:none;opacity:1}}`;document.head.appendChild(css);late267();
})();