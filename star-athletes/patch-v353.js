(()=>{
'use strict';
// v0.32.36: ultra-rare story events. Optional, very low-frequency, and never required for progression.
if(window.STAR_LEGEND353)return;
const SAVE='star-athletes-save-v200';
const EVENTS=[
 {id:'comet',name:'星降る夜',icon:'☄️',base:.0012,minGen:3,title:'星降りを越えし者',desc:'ネストの空を巨大な彗星が横切った。星の奔流の中でも、その個体だけは一歩も退かなかった。',fx:m=>boost353(m,['speed','agility'],3)},
 {id:'storm',name:'天雷の試練',icon:'⚡',base:.00075,minGen:5,title:'天雷を従えし者',desc:'大会前夜、ネストを異常な雷嵐が襲う。恐怖を越えて走り切った個体に雷の記憶が刻まれた。',fx:m=>boost353(m,['guts','power'],4)},
 {id:'eclipse',name:'星蝕',icon:'🌑',base:.00035,minGen:8,title:'星蝕の生還者',desc:'一瞬だけ星々の光が消えた夜。静寂の中で目を開き続けた個体は、血統に残る特別な証を得た。',fx:m=>boost353(m,['stamina','tech'],5)},
 {id:'gate',name:'銀河門の夢',icon:'🌌',base:.00012,minGen:12,title:'銀河門を見た者',desc:'眠りの中で、まだ誰も到達していない銀河の門を見る。目覚めた個体の全能力に微かな星力が宿った。',fx:m=>boost353(m,Object.keys(m.stats||{}),2)},
 {id:'origin',name:'始祖星の記憶',icon:'👑',base:.000035,minGen:18,title:'始祖星の継承者',desc:'遥かな始祖の記憶が一夜だけ蘇る。ネスト史に残る、極めて稀な血統覚醒。',fx:m=>{boost353(m,Object.keys(m.stats||{}),3);if(m.geneticBase226)for(const k of Object.keys(m.geneticBase226))m.geneticBase226[k]=Number(m.geneticBase226[k]||0)+1}}
];
function n353(v){return Number(v)||0}
function grade353(m){try{return Number(window.STAR_GRADE340?.athleteGrade?.(m)||1)}catch(_){return 1}}
function boost353(m,keys,n){for(const k of keys){if(!(k in (m.stats||{})))continue;m.stats[k]=n353(m.stats[k])+n;if(m.trainingGain226)m.trainingGain226[k]=n353(m.trainingGain226[k])+n}}
function mult353(m){
 let x=1,reasons=[],g=grade353(m);
 if(g>=3){const q=g===5?2.2:g===4?1.6:1.25;x*=q;reasons.push('星格×'+q)}
 const luck=n353(m?.hidden233?.luck);if(luck>=6){const q=luck>=7?1.8:1.35;x*=q;reasons.push('LUCK×'+q)}
 if(m?.ultraRare274?.id==='mythic'){x*=2;reasons.push('神話級×2')}
 else if(m?.ultraRare274?.id==='miracle'){x*=1.5;reasons.push('奇跡個体×1.5')}
 const rg=Number(window.STAR_RESONANCE344?.grade?.(m)||1);if(rg>=4){const q=rg>=5?1.8:1.35;x*=q;reasons.push('共鳴×'+q)}
 return{mult:Math.min(5,x),reasons};
}
function chance353(ev,m){
 const b=mult353(m),gen=n353(m?.gen)||n353(S?.generation233)||1;
 const age=gen>=20?1.35:gen>=10?1.15:1;
 return{chance:Math.min(.01,ev.base*b.mult*age),mult:b.mult*age,reasons:b.reasons};
}
function title353(m,ev,ch){
 m.rareTitles323??=[];
 if(!m.rareTitles323.some(x=>x.id==='legend353:'+ev.id))m.rareTitles323.push({id:'legend353:'+ev.id,icon:ev.icon,name:ev.title,story:ev.name,chance:ch,at:Date.now()});
}
function candidates353(){return (S?.nest||[]).filter(Boolean)}
function roll353(){
 const gen=n353(S?.generation233)||1;if(S?.legendEventRoll353===gen)return null;
 S.legendEventRoll353=gen;
 const pool=candidates353();if(!pool.length){persist353();return null}
 // One event maximum per generation. Rarest event is checked first.
 for(const ev of [...EVENTS].reverse()){
  if(gen<ev.minGen)continue;
  const ranked=[...pool].sort((a,b)=>grade353(b)-grade353(a));
  for(const m of ranked){
   const c=chance353(ev,m);
   if(Math.random()<c.chance){
    ev.fx(m);title353(m,ev,c.chance);
    S.legendHistory353??=[];S.legendHistory353.push({id:ev.id,name:ev.name,title:ev.title,athleteId:m.id,athlete:m.name,gen,chance:c.chance,at:Date.now()});
    persist353();setTimeout(()=>show353(ev,m,c),120);return{ev,m,c};
   }
  }
 }
 persist353();return null;
}
function persist353(){try{localStorage.setItem(SAVE,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function show353(ev,m,c){
 document.getElementById('legend353')?.remove();
 const el=document.createElement('div');el.id='legend353';el.className='legendBackdrop353';
 el.innerHTML='<section class="legendCard353"><small>ULTRA RARE EVENT</small><div class="legendIcon353">'+ev.icon+'</div><h2>'+ev.name+'</h2><p>'+ev.desc+'</p><div class="legendAthlete353"><b>'+String(m.name||'ATHLETE')+'</b><strong>「'+ev.title+'」</strong></div><em>発生時推定 '+(c.chance*100).toFixed(c.chance<.001?4:3)+'%</em><button>記録する</button></section>';
 document.body.appendChild(el);requestAnimationFrame(()=>el.classList.add('show353'));el.querySelector('button').onclick=()=>el.remove();
}
function history353(){
 const host=document.getElementById('nest201');if(!host)return;
 let box=document.getElementById('legendHistory353');if(!box){box=document.createElement('div');box.id='legendHistory353';box.className='box legendHistory353';host.appendChild(box)}
 const h=S?.legendHistory353||[];
 box.innerHTML='<div class="legendHead353"><div><small>LEGEND ARCHIVE</small><h3>🌌 超レアイベント</h3></div><b>'+h.length+'件</b></div>'+(h.length?h.slice(-6).reverse().map(x=>'<div class="legendLog353"><span>G'+x.gen+' '+x.athlete+'</span><strong>'+x.name+'</strong><em>'+x.title+'</em></div>').join(''):'<p>まだ記録はありません。血統を重ねるほど、ごく稀に特別な物語が起こります。</p>');
}
try{
 const api=window.STAR_ANNUAL233;
 if(api&&typeof api.finishGeneration==='function'&&!api.finishGeneration.__legend353){
  const before=api.finishGeneration;
  const wrapped=function(){try{roll353()}catch(e){console.warn('legend roll353',e)}return before.apply(this,arguments)};wrapped.__legend353=true;api.finishGeneration=wrapped;
 }
}catch(e){console.warn('legend hook353',e)}
// finishGen233 is also closed over by its own button handler, so catch the actual next-generation click before it runs.
document.addEventListener('click',e=>{if(e.target?.closest?.('#annualNext233'))try{roll353()}catch(err){console.warn('legend click353',err)}},true);
function sync353(){history353()}
try{const prev=window.render;if(typeof prev==='function')window.render=function(){const out=prev.apply(this,arguments);setTimeout(sync353,0);return out}}catch(_){}
const css=document.createElement('style');css.textContent=`
.legendBackdrop353{position:fixed;inset:0;z-index:100030;display:flex;align-items:center;justify-content:center;padding:18px;background:radial-gradient(circle at 50% 30%,#17234aee,#03060cef);opacity:0;transition:.25s}.legendBackdrop353.show353{opacity:1}.legendCard353{width:min(390px,100%);padding:24px 18px;border:2px solid #d9c27b;border-radius:24px;text-align:center;color:#fff;background:radial-gradient(circle at 50% 0,#4a3b73,#17203a 48%,#090d18);box-shadow:0 0 50px #a783ff55;transform:scale(.78);animation:legendPop353 .6s cubic-bezier(.2,1.3,.35,1) forwards}.legendCard353>small,.legendHead353 small{font-size:7px;font-weight:1000;letter-spacing:.18em;color:#e8d18c}.legendIcon353{font-size:45px;filter:drop-shadow(0 0 15px #bfa1ff);animation:legendFloat353 2s ease-in-out infinite}.legendCard353 h2{margin:4px 0 10px;font-size:24px}.legendCard353 p{font-size:9px;line-height:1.65;color:#c9d4e5}.legendAthlete353{margin:13px 0;padding:10px;border:1px solid #ffffff30;border-radius:12px;background:#ffffff0d}.legendAthlete353 b,.legendAthlete353 strong{display:block}.legendAthlete353 b{font-size:12px}.legendAthlete353 strong{margin-top:4px;color:#ffe58d;font-size:15px}.legendCard353>em{display:block;font-size:7px;color:#8ea1bb;font-style:normal}.legendCard353 button{width:100%;margin-top:12px;padding:10px;border:0;border-radius:10px;background:linear-gradient(90deg,#f5dd8a,#d9b4ff);color:#251d35;font-weight:1000}.legendHistory353{margin-top:10px}.legendHead353{display:flex;justify-content:space-between;align-items:center}.legendHead353 h3{margin:2px 0}.legendHead353>b{font-size:9px}.legendHistory353>p{font-size:8px;color:#738092}.legendLog353{display:grid;grid-template-columns:1fr auto;gap:2px 8px;padding:7px 2px;border-top:1px solid #e1d9e8}.legendLog353 span{font-size:7px;color:#718095}.legendLog353 strong{font-size:8px}.legendLog353 em{grid-column:1/3;font-size:8px;font-style:normal;color:#77548e;font-weight:1000}@keyframes legendPop353{to{transform:scale(1)}}@keyframes legendFloat353{50%{transform:translateY(-5px) scale(1.06)}}
`;document.head.appendChild(css);
window.STAR_LEGEND353={events:EVENTS,roll:roll353,chance:chance353,sync:sync353};
setTimeout(sync353,200);
})();