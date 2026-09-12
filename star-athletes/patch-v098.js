(()=>{
const TEAM_EVENTS=new Set(['リレー','綱引き']);
const phaseText={
 '50m走':['好スタート！','加速して前へ！','ラストスパート！'],
 '障害物競走':['慎重に入る','リズムよく突破','最後の障害へ！'],
 '大玉ころがし':['大玉を押し出した！','力強く前進！','最後まで押し切れ！'],
 '坂道かけあがり':['坂へ突入！','脚が重くなる','根性のラスト！'],
 '10000m走':['落ち着いて追走','スタミナ勝負','残りわずか！'],
 '的当て':['狙いを定める','命中を重ねる','最後の一投！'],
 'リレー':['第1走スタート！','バトンをつなぐ！','アンカー勝負！'],
 '綱引き':['綱を握る！','互いに譲らない','一気に引き切れ！']
};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function compAvatar(m){return `<div class="raceMon">${avatar(m)}<div><b>${m.name}</b><small>${SP[m.species][0]}</small></div></div>`}
function eventPower(e){
 if(TEAM_EVENTS.has(e))return S.nest.reduce((a,m)=>a+score(m,e),0)/S.nest.length;
 const i=S.schedule.indexOf(e),m=S.nest.find(x=>x.id===S.assign[i])||best(e);return score(m,e);
}
function eventMembers(e){
 if(TEAM_EVENTS.has(e))return S.nest;
 const i=S.schedule.indexOf(e),m=S.nest.find(x=>x.id===S.assign[i])||best(e);return [m];
}
function rankFor(power,phase){
 const noise=(Math.random()-.5)*(phase===0?28:18), rivals=Array.from({length:7},()=>95+S.wins*5+Math.random()*70);
 const ps=power*(phase===0?.92:phase===1:.98:1.03)+noise;return 1+rivals.filter(x=>x>ps).length;
}
function phaseCard(e,phase,rank){
 const members=eventMembers(e),label=['序盤','中盤','終盤'][phase];
 return `<div class="phasePanel"><div class="phaseTop"><b>${e}</b><span>${label}</span></div><div class="raceLine">${members.map(compAvatar).join('')}</div><div class="phaseMsg">${phaseText[e]?.[phase]||''}</div><div class="phaseRank">現在 <b>${rank}位</b></div></div>`;
}
async function runCompetition(){
 if($('run').disabled)return;$('run').disabled=true;$('result').innerHTML='';
 let pts=0,finalLines=[];
 for(let ei=0;ei<S.schedule.length;ei++){
   const e=S.schedule[ei],power=eventPower(e);$('events').innerHTML='';
   let rank=8;
   for(let p=0;p<3;p++){
     rank=rankFor(power,p);$('events').innerHTML=phaseCard(e,p,rank);
     await wait(900);
   }
   pts+=[0,8,6,5,4,3,2,1,0][rank];finalLines.push(`${e}${TEAM_EVENTS.has(e)?'［チーム］':''}：${rank}位`);
   $('events').innerHTML=`${phaseCard(e,2,rank)}<div class="eventFinish">${e} 結果：<b>${rank}位</b></div>`;
   await wait(700);
 }
 const overall=pts>=25?1:pts>=20?2:pts>=16?3:4;if(overall===1)S.wins++;
 $('events').innerHTML='<div class="meetDone">全競技終了！</div>';
 $('result').innerHTML=`<div class="notice">${finalLines.join('<br>')}<br><b>総合${overall}位</b>${overall===1?'<br>★次世代候補枠+1':''}</div>`;
 $('run').classList.add('hide');$('next').classList.remove('hide');$('run').disabled=false;render();
}
$('run').onclick=runCompetition;
})();