(()=>{
const MEETS125={
1:[['スタータウン杯','スタータウン','晴れ',['50m走','障害物競走','的当て','リレー']],['リバーフィールド杯','リバー地区','くもり',['50m走','大玉ころがし','坂道かけあがり','綱引き']],['ルーキースター杯','ネスト広場','晴れ',['障害物競走','的当て','大玉ころがし','リレー']]],
2:[['ノースエリア杯','ノースドーム','向かい風',['50m走','10000m走','障害物競走','リレー']],['クリスタル地区杯','クリスタル平原','晴れ',['的当て','坂道かけあがり','大玉ころがし','綱引き']],['スカイエリア杯','高原競技場','強めの風',['50m走','障害物競走','坂道かけあがり','リレー']]],
3:[['グランドスター杯','中央大競技場','晴れ',['10000m走','障害物競走','的当て','リレー']],['メテオグラウンド杯','クレーター会場','砂ぼこり',['大玉ころがし','坂道かけあがり','50m走','綱引き']],['オーロラグランド杯','北極光スタジアム','低温',['10000m走','50m走','的当て','リレー']]],
4:[['メジャースターカップ','プライムアリーナ','晴れ',['50m走','障害物競走','10000m走','リレー']],['チャンピオンズ運動会','王都スタジアム','くもり',['大玉ころがし','的当て','坂道かけあがり','綱引き']],['コズミックメジャー杯','軌道競技場','変わりやすい',['50m走','的当て','10000m走','リレー']]],
5:[['プラネット第1予選','代表選考アリーナ','晴れ',['障害物競走','10000m走','大玉ころがし','リレー']],['プラネット最終予選','代表選考アリーナ','くもり',['50m走','的当て','坂道かけあがり','綱引き']]],
6:[['プラネット代表決定戦','プラネット・コロシアム','決戦日和',['50m走','障害物競走','10000m走','リレー']]]};
const TIER125=[
 {id:'safe',icon:'🛡️',label:'格下',reward:'.68',annual:'.75'},
 {id:'standard',icon:'🏆',label:'標準',reward:'1.0',annual:'1.0'},
 {id:'challenge',icon:'🔥',label:'格上',reward:'1.6',annual:'1.4'}
];
function tierFor125(i,len){return len>=3?TIER125[Math.min(i,2)]:len===2?TIER125[i===0?1:2]:TIER125[1]}
function chooseMeet125(i){
 const season=S.season||1,list=MEETS125[season]||MEETS125[6],m=list[i];if(!m)return;
 const t=tierFor125(i,list.length);
 S.seasonMeet={name:m[0],place:m[1],weather:m[2],events:[...m[3]]};
 S.meetChoice225=t.id;S.meetChoiceSeason125=season;S.schedule=[...m[3]];S.assign={};S.strat={};S.rivals225=[];S.rivalsPromo225=false;
 try{render()}catch(e){console.error('chooseMeet125',e)}
 try{localStorage.setItem('star-athletes-save-v200',JSON.stringify({savedAt:Date.now(),S}))}catch(_){}
}
window.addEventListener('click',e=>{
 const b=e.target?.closest?.('#season119 [data-pick125]');if(!b)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 chooseMeet125(Number(b.dataset.pick125));
},true);
function renderMeetChoices125(){
 const season=S.season||1,root=document.getElementById('season119');if(!root)return;
 let old=root.querySelector('.meetChoice119');if(!old)return;
 const list=MEETS125[season]||MEETS125[6];
 // Each new season starts at standard. Old saves that were accidentally pinned to the first/low tier are normalized once.
 if(Number(S.meetChoiceSeason125)!==Number(season)){
   const i=list.length>=3?1:0,m=list[i],t=tierFor125(i,list.length);
   S.seasonMeet={name:m[0],place:m[1],weather:m[2],events:[...m[3]]};
   S.meetChoice225=t.id;S.meetChoiceSeason125=season;S.schedule=[...m[3]];S.assign={};S.strat={};S.rivals225=[];S.rivalsPromo225=false;
   try{localStorage.setItem('star-athletes-save-v200',JSON.stringify({savedAt:Date.now(),S}))}catch(_){}
 }
 old.innerHTML=list.map((m,i)=>{const t=tierFor125(i,list.length),sel=S.seasonMeet?.name===m[0];return `<button type="button" class="meetChoiceCard125 ${sel?'sel':''}" data-pick125="${i}"><div class="tier125"><b>${t.icon} ${t.label}</b><strong>報酬 ×${t.reward} / 年間pt ×${t.annual}</strong></div><b>${m[0]}</b><span>📍 ${m[1]}　☁️ ${m[2]}</span><small>${m[3].join(' / ')}</small><em>${sel?'選択中':'この大会を選ぶ'}</em></button>`}).join('');
 old.querySelectorAll('[data-pick125]').forEach(b=>{
   b.onclick=e=>{e.preventDefault();e.stopPropagation();chooseMeet125(Number(b.dataset.pick125))};
 });
}
window.STAR_MEETS125={choose:chooseMeet125,list:MEETS125};
const prevRender125=render;render=function(){prevRender125();requestAnimationFrame(renderMeetChoices125)};
const css=document.createElement('style');css.textContent=`
.meetChoice119{display:grid!important;gap:8px!important}.tier125{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:3px}.tier125 b{font-size:8px!important}.tier125 strong{font-size:7px;color:#6a7480}.meetChoiceCard125{display:grid!important;gap:4px!important;text-align:left!important;border:2px solid #26364e!important;border-radius:14px!important;background:linear-gradient(145deg,#fff,#edf5ff)!important;padding:10px!important;box-shadow:0 4px 0 #0001!important}.meetChoiceCard125 b{font-size:12px}.meetChoiceCard125 span{font-size:9px;color:#445}.meetChoiceCard125 small{font-size:8px;color:#667}.meetChoiceCard125 em{font-style:normal;font-size:8px;font-weight:1000;color:#0870a8}.meetChoiceCard125.sel{background:linear-gradient(145deg,#e6f8ff,#fff7d4)!important;outline:3px solid #58cfff!important}
`;document.head.appendChild(css);setTimeout(()=>{try{render()}catch(e){console.error(e)}},0);
})();