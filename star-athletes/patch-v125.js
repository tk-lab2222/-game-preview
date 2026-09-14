(()=>{
const MEETS125={
1:[['スタータウン杯','スタータウン','晴れ',['50m走','障害物競走','的当て','リレー']],['リバーフィールド杯','リバー地区','くもり',['50m走','大玉ころがし','坂道かけあがり','綱引き']],['ルーキースター杯','ネスト広場','晴れ',['障害物競走','的当て','大玉ころがし','リレー']]],
2:[['ノースエリア杯','ノースドーム','向かい風',['50m走','10000m走','障害物競走','リレー']],['クリスタル地区杯','クリスタル平原','晴れ',['的当て','坂道かけあがり','大玉ころがし','綱引き']],['スカイエリア杯','高原競技場','強めの風',['50m走','障害物競走','坂道かけあがり','リレー']]],
3:[['グランドスター杯','中央大競技場','晴れ',['10000m走','障害物競走','的当て','リレー']],['メテオグラウンド杯','クレーター会場','砂ぼこり',['大玉ころがし','坂道かけあがり','50m走','綱引き']],['オーロラグランド杯','北極光スタジアム','低温',['10000m走','50m走','的当て','リレー']]],
4:[['メジャースターカップ','プライムアリーナ','晴れ',['50m走','障害物競走','10000m走','リレー']],['チャンピオンズ運動会','王都スタジアム','くもり',['大玉ころがし','的当て','坂道かけあがり','綱引き']],['コズミックメジャー杯','軌道競技場','変わりやすい',['50m走','的当て','10000m走','リレー']]],
5:[['プラネット第1予選','代表選考アリーナ','晴れ',['障害物競走','10000m走','大玉ころがし','リレー']],['プラネット最終予選','代表選考アリーナ','くもり',['50m走','的当て','坂道かけあがり','綱引き']]],
6:[['プラネット代表決定戦','プラネット・コロシアム','決戦日和',['50m走','障害物競走','10000m走','リレー']]]};
function renderMeetChoices125(){
 const season=S.season||1,root=document.getElementById('season119');if(!root)return;
 let old=root.querySelector('.meetChoice119');if(!old)return;
 const list=MEETS125[season]||MEETS125[6];
 old.innerHTML=list.map((m,i)=>`<button type="button" class="meetChoiceCard125 ${S.seasonMeet?.name===m[0]?'sel':''}" data-pick125="${i}"><b>${m[0]}</b><span>📍 ${m[1]}　☁️ ${m[2]}</span><small>${m[3].join(' / ')}</small><em>${S.seasonMeet?.name===m[0]?'選択中':'この大会を選ぶ'}</em></button>`).join('');
 old.querySelectorAll('[data-pick125]').forEach(b=>b.onclick=()=>{const m=list[+b.dataset.pick125];S.seasonMeet={name:m[0],place:m[1],weather:m[2],events:[...m[3]]};S.schedule=[...m[3]];S.assign={};S.strat={};render();});
}
const prevRender125=render;render=function(){prevRender125();requestAnimationFrame(renderMeetChoices125)};
const css=document.createElement('style');css.textContent=`
.meetChoice119{display:grid!important;gap:8px!important}.meetChoiceCard125{display:grid!important;gap:4px!important;text-align:left!important;border:2px solid #26364e!important;border-radius:14px!important;background:linear-gradient(145deg,#fff,#edf5ff)!important;padding:10px!important;box-shadow:0 4px 0 #0001!important}.meetChoiceCard125 b{font-size:12px}.meetChoiceCard125 span{font-size:9px;color:#445}.meetChoiceCard125 small{font-size:8px;color:#667}.meetChoiceCard125 em{font-style:normal;font-size:8px;font-weight:1000;color:#0870a8}.meetChoiceCard125.sel{background:linear-gradient(145deg,#e6f8ff,#fff7d4)!important;outline:3px solid #58cfff!important}
`;document.head.appendChild(css);setTimeout(()=>{try{render()}catch(e){console.error(e)}},0);
})();