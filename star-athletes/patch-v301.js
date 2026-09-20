(()=>{
// v0.31.14: move lineage achievements out of Nest summary and explain each title.
const DEF301=[
 {id:'gale',icon:'💨',name:'疾風一族',desc:'スピード500以上、または「疾風」系スキルを持つ血統'},
 {id:'power',icon:'💪',name:'豪腕血統',desc:'ちから500以上、または「豪腕」系スキルを持つ血統'},
 {id:'gold',icon:'👑',name:'黄金血統',desc:'隠れ素質の「遺伝力」と「変異因子」が両方A以上'},
 {id:'ten',icon:'🔗',name:'10代継承',desc:'同じ血統を10世代以上つないで育成'}
];
function render301(){
 try{
   document.querySelectorAll('#nestSummary201 .lineageSummary271').forEach(x=>x.remove());
   const mission=document.getElementById('mission200');
   const host=document.getElementById('nestMissionHost201')||mission?.parentElement;
   if(!host)return;
   let box=document.getElementById('lineageAchievements301');
   if(!box){
     box=document.createElement('div');
     box.id='lineageAchievements301';
     box.className='box lineageAchievements301';
     if(mission&&mission.parentElement===host)mission.after(box);else host.appendChild(box);
   }
   const book=S?.lineageTitleBook271||{};
   const unlocked=DEF301.filter(x=>book[x.id]?.unlocked).length;
   const completed=Number(S?.completedLineageCount271)||0;
   box.innerHTML=`
    <div class="head301">
      <div><small>LINEAGE ACHIEVEMENTS</small><h3>🧬 血統実績</h3></div>
      <b>${unlocked}/${DEF301.length}</b>
    </div>
    <p class="lead301">配合を重ねて条件を満たすと、血統に称号が付きます。称号は血統育成の実績で、現在は直接の能力ボーナスはありません。</p>
    <div class="achList301">${DEF301.map(x=>{
      const on=!!book[x.id]?.unlocked;
      return `<div class="ach301 ${on?'done301':''}">
        <span class="achIcon301">${x.icon}</span>
        <div><b>${x.name}</b><small>${x.desc}</small></div>
        <em>${on?'獲得済':'未達成'}</em>
      </div>`;
    }).join('')}</div>
    <div class="completeInfo301"><b>✨ 完成血統</b><span>10代継承・遺伝力A以上・変異因子A以上・SKILL 2個以上・能力500以上をすべて達成</span><em>${completed?'達成済':'未達成'}</em></div>
   `;
 }catch(e){console.warn('lineageAchievements301',e)}
}
try{
 const prev=render;
 render=function(){const out=prev();[0,40,120,300].forEach(ms=>setTimeout(render301,ms));return out};
}catch(e){console.warn('render301 wrap',e)}
document.addEventListener('click',e=>{
 if(e.target?.closest?.('.tab,#doTrain263,#batchGo260,#hatch,#adopt'))[0,60,180].forEach(ms=>setTimeout(render301,ms));
},true);
const css=document.createElement('style');
css.id='lineageAchievements301Style';
css.textContent=`
.lineageAchievements301{background:linear-gradient(180deg,#fffdf6,#fff8df)!important;border:1px solid #dbc781!important}
.head301{display:flex;justify-content:space-between;align-items:center;gap:10px}
.head301 small{display:block;font-size:7px;font-weight:1000;letter-spacing:.12em;color:#8c7524}
.head301 h3{margin:1px 0}
.head301>b{border-radius:999px;background:#40351b;color:#ffe887;padding:6px 10px;font-size:10px}
.lead301{font-size:8px;line-height:1.55;color:#675d43;margin:8px 0}
.achList301{display:grid;gap:6px}
.ach301{display:grid;grid-template-columns:28px 1fr auto;gap:7px;align-items:center;padding:8px;border:1px solid #ddd3ad;border-radius:10px;background:#fff}
.ach301.done301{background:#fff8cf;border-color:#c8a936}
.achIcon301{font-size:18px;text-align:center}
.ach301 b{display:block;font-size:9px}
.ach301 small{display:block;font-size:7px;line-height:1.45;color:#6d6757;margin-top:2px}
.ach301 em{font-style:normal;font-size:7px;font-weight:1000;color:#8a8170;white-space:nowrap}
.ach301.done301 em{color:#8a6800}
.completeInfo301{display:grid;grid-template-columns:auto 1fr auto;gap:6px;align-items:center;margin-top:8px;padding:8px;border-radius:10px;background:#2f291c;color:#fff}
.completeInfo301 b{font-size:9px;color:#ffe477}
.completeInfo301 span{font-size:7px;line-height:1.45;color:#eee4c9}
.completeInfo301 em{font-style:normal;font-size:7px;font-weight:1000;white-space:nowrap}
`;
document.head.appendChild(css);
[0,80,250].forEach(ms=>setTimeout(render301,ms));
})();