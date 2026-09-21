(()=>{
// v0.31.71: lineage achievements grant permanent next-generation bonuses.
const SAVE301='star-athletes-save-v200';
const K301=['power','speed','stamina','agility','tech','guts'];
const DEF301=[
 {id:'gale',icon:'💨',name:'疾風一族',desc:'スピード500以上、または「疾風」系スキルを持つ血統',reward:'次世代：スピード+6 / すばやさ+3'},
 {id:'power',icon:'💪',name:'豪腕血統',desc:'ちから500以上、または「豪腕」系スキルを持つ血統',reward:'次世代：ちから+6 / こんじょう+3'},
 {id:'gold',icon:'👑',name:'黄金血統',desc:'隠れ素質の「遺伝力」と「変異因子」が両方A以上',reward:'次世代：全能力+2 / 遺伝・変異の上振れ率UP'},
 {id:'ten',icon:'🔗',name:'10代継承',desc:'同じ血統を10世代以上つないで育成',reward:'次世代：全能力+4'}
];
function n301(v){return Number(v)||0}
function book301(){return S?.lineageTitleBook271||{}}
function unlocked301(id){return !!book301()[id]?.unlocked}
function completed301(){return n301(S?.completedLineageCount271)>0}
function bonus301(){
 const stat=Object.fromEntries(K301.map(k=>[k,0]));
 if(unlocked301('gale')){stat.speed+=6;stat.agility+=3}
 if(unlocked301('power')){stat.power+=6;stat.guts+=3}
 if(unlocked301('gold'))K301.forEach(k=>stat[k]+=2);
 if(unlocked301('ten'))K301.forEach(k=>stat[k]+=4);
 if(completed301())K301.forEach(k=>stat[k]+=6);
 return {stat,heritageChance:(unlocked301('gold')?.12:0)+(completed301()?.05:0)};
}
function bonusSummary301(){
 const b=bonus301(),parts=[];
 const vals=K301.map(k=>b.stat[k]);
 if(vals.every(v=>v===vals[0])&&vals[0]>0)parts.push('全能力 +'+vals[0]);
 else{
   const lab={power:'ちから',speed:'スピード',stamina:'スタミナ',agility:'すばやさ',tech:'テクニック',guts:'こんじょう'};
   K301.filter(k=>b.stat[k]>0).forEach(k=>parts.push(lab[k]+' +'+b.stat[k]));
 }
 if(b.heritageChance>0)parts.push('遺伝・変異 上振れ +'+Math.round(b.heritageChance*100)+'%');
 return parts.length?parts.join(' / '):'まだボーナスなし';
}
function applyNewborn301(c){
 if(!c||c.lineageAchievementApplied301)return c;
 const b=bonus301();
 c.stats=c.stats||{};
 K301.forEach(k=>c.stats[k]=n301(c.stats[k])+n301(b.stat[k]));
 let h=c.hidden233||null;
 try{h=window.STAR_ANNUAL233?.ensureHidden?.(c)||h}catch(_){}
 if(h&&b.heritageChance>0){
   if(Math.random()<b.heritageChance)h.heredity=Math.min(7,n301(h.heredity)+1);
   if(Math.random()<b.heritageChance)h.mutation=Math.min(7,n301(h.mutation)+1);
 }
 c.lineageAchievementApplied301={at:Date.now(),stat:{...b.stat},heritageChance:b.heritageChance};
 return c;
}
try{
 const beforeBaby301=baby;
 baby=function(a,b){return applyNewborn301(beforeBaby301(a,b))};
}catch(e){console.warn('lineage301 baby wrap',e)}
function save301(){try{localStorage.setItem(SAVE301,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function render301(){
 try{
   document.querySelectorAll('#nestSummary201 .lineageSummary271').forEach(x=>x.remove());
   const mission=document.getElementById('mission200');
   const host=document.getElementById('missionHost203')||document.getElementById('nestMissionHost201')||mission?.parentElement;
   if(!host)return;
   let box=document.getElementById('lineageAchievements301');
   if(!box){
     box=document.createElement('div');
     box.id='lineageAchievements301';
     box.className='box lineageAchievements301';
     if(mission&&mission.parentElement===host)mission.after(box);else host.appendChild(box);
   }
   const book=book301();
   const unlocked=DEF301.filter(x=>book[x.id]?.unlocked).length;
   const completed=completed301();
   box.innerHTML=`
    <div class="head301">
      <div><small>LINEAGE ACHIEVEMENTS</small><h3>🧬 血統実績</h3></div>
      <b>${unlocked}/${DEF301.length}</b>
    </div>
    <p class="lead301">獲得した血統実績は、以後に生まれる子へ恒久ボーナスとして引き継がれます。階級ミッションとは別枠の「血統そのものの成長」です。</p>
    <div class="lineageBonus301"><div><small>NEXT GENERATION BONUS</small><b>次世代ボーナス</b></div><strong>${bonusSummary301()}</strong></div>
    <div class="achList301">${DEF301.map(x=>{
      const on=!!book[x.id]?.unlocked;
      return `<div class="ach301 ${on?'done301':''}">
        <span class="achIcon301">${x.icon}</span>
        <div><b>${x.name}</b><small>${x.desc}</small><i>🎁 ${x.reward}</i></div>
        <em>${on?'獲得済':'未達成'}</em>
      </div>`;
    }).join('')}</div>
    <div class="completeInfo301 ${completed?'doneComplete301':''}"><b>✨ 完成血統</b><span>10代継承・遺伝力A以上・変異因子A以上・SKILL 2個以上・能力500以上をすべて達成<br><strong>報酬：次世代 全能力+6 / 遺伝・変異上振れ+5%</strong></span><em>${completed?'達成済':'未達成'}</em></div>
   `;
   save301();
 }catch(e){console.warn('lineageAchievements301',e)}
}
try{
 const prev=render;
 render=function(){const out=prev();[0,40,120,300].forEach(ms=>setTimeout(render301,ms));return out};
}catch(e){console.warn('render301 wrap',e)}
document.addEventListener('click',e=>{
 if(e.target?.closest?.('.tab,#doTrain263,#batchGo260,#hatch,#adopt,#annualNext233'))[0,60,180].forEach(ms=>setTimeout(render301,ms));
},true);
const css=document.createElement('style');
css.id='lineageAchievements301Style';
css.textContent=`
.lineageAchievements301{background:linear-gradient(180deg,#fffdf6,#fff8df)!important;border:1px solid #dbc781!important}
.head301{display:flex;justify-content:space-between;align-items:center;gap:10px}
.head301 small{display:block;font-size:7px;font-weight:1000;letter-spacing:.12em;color:#8c7524}
.head301 h3{margin:1px 0}.head301>b{border-radius:999px;background:#40351b;color:#ffe887;padding:6px 10px;font-size:10px}
.lead301{font-size:8px;line-height:1.55;color:#675d43;margin:8px 0}
.lineageBonus301{display:grid;grid-template-columns:auto 1fr;gap:8px;align-items:center;margin:8px 0;padding:9px;border:2px solid #c6a536;border-radius:11px;background:#fff8cf}
.lineageBonus301 small{display:block;font-size:6px;letter-spacing:.1em;color:#8a6c09;font-weight:1000}.lineageBonus301 b{font-size:9px}.lineageBonus301 strong{font-size:8px;line-height:1.5;color:#6e5500}
.achList301{display:grid;gap:6px}.ach301{display:grid;grid-template-columns:28px 1fr auto;gap:7px;align-items:center;padding:8px;border:1px solid #ddd3ad;border-radius:10px;background:#fff}.ach301.done301{background:#fff8cf;border-color:#c8a936}
.achIcon301{font-size:18px;text-align:center}.ach301 b{display:block;font-size:9px}.ach301 small{display:block;font-size:7px;line-height:1.45;color:#6d6757;margin-top:2px}.ach301 i{display:block;font-size:7px;font-style:normal;font-weight:900;color:#84650b;margin-top:4px}
.ach301 em{font-style:normal;font-size:7px;font-weight:1000;color:#8a8170;white-space:nowrap}.ach301.done301 em{color:#8a6800}
.completeInfo301{display:grid;grid-template-columns:auto 1fr auto;gap:6px;align-items:center;margin-top:8px;padding:8px;border-radius:10px;background:#2f291c;color:#fff}.completeInfo301.doneComplete301{box-shadow:0 0 0 2px #e1bd42 inset}
.completeInfo301 b{font-size:9px;color:#ffe477}.completeInfo301 span{font-size:7px;line-height:1.45;color:#eee4c9}.completeInfo301 span strong{color:#ffe477}.completeInfo301 em{font-style:normal;font-size:7px;font-weight:1000;white-space:nowrap}
`;
document.head.appendChild(css);
[0,80,250].forEach(ms=>setTimeout(render301,ms));
window.STAR_LINEAGE_ACHIEVEMENTS301={sync:render301,bonus:bonus301,apply:applyNewborn301};
})();