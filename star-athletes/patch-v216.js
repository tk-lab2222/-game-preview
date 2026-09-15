(()=>{
// v0.21.6: hard bypass every legacy #next handler by using a brand-new button id.
const PROGRESS_KEY216='star-athletes-season-v216';
const MEETS216={
1:[['スタータウン杯','スタータウン','晴れ',['50m走','障害物競走','的当て','リレー']],['リバーフィールド杯','リバー地区','くもり',['50m走','大玉ころがし','坂道かけあがり','綱引き']],['ルーキースター杯','ネスト広場','晴れ',['障害物競走','的当て','大玉ころがし','リレー']]],
2:[['ノースエリア杯','ノースドーム','向かい風',['50m走','10000m走','障害物競走','リレー']],['クリスタル地区杯','クリスタル平原','晴れ',['的当て','坂道かけあがり','大玉ころがし','綱引き']],['スカイエリア杯','高原競技場','強めの風',['50m走','障害物競走','坂道かけあがり','リレー']]],
3:[['グランドスター杯','中央大競技場','晴れ',['10000m走','障害物競走','的当て','リレー']],['メテオグラウンド杯','クレーター会場','砂ぼこり',['大玉ころがし','坂道かけあがり','50m走','綱引き']],['オーロラグランド杯','北極光スタジアム','低温',['10000m走','50m走','的当て','リレー']]],
4:[['メジャースターカップ','プライムアリーナ','晴れ',['50m走','障害物競走','10000m走','リレー']],['チャンピオンズ運動会','王都スタジアム','くもり',['大玉ころがし','的当て','坂道かけあがり','綱引き']],['コズミックメジャー杯','軌道競技場','変わりやすい',['50m走','的当て','10000m走','リレー']]],
5:[['プラネット第1予選','代表選考アリーナ','晴れ',['障害物競走','10000m走','大玉ころがし','リレー']],['プラネット最終予選','代表選考アリーナ','くもり',['50m走','的当て','坂道かけあがり','綱引き']]],
6:[['プラネット代表決定戦','プラネット・コロシアム','決戦日和',['50m走','障害物競走','10000m走','リレー']]]};
function persist216(){try{localStorage.setItem(PROGRESS_KEY216,String(S.season||1))}catch(_){}}
function resetMeet216(){
 const run=document.getElementById('run'),result=document.getElementById('result'),events=document.getElementById('events'),gain=document.getElementById('gain');
 if(run){run.classList.remove('hide');run.disabled=false;run.textContent='大会スタート'}
 if(result)result.innerHTML='';if(events)events.innerHTML='';if(gain)gain.innerHTML='';
}
function showTrain216(){try{if(typeof show==='function')show('train')}catch(_){}document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.v==='train'))}
function showBreed216(){try{if(typeof show==='function')show('breed')}catch(_){}document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.v==='breed'))}
function seedSeason216(n){
 const list=MEETS216[n]||MEETS216[6],m=list[0];
 S.seasonMeet={name:m[0],place:m[1],weather:m[2],events:[...m[3]]};S.schedule=[...m[3]];
}
function advance216(){
 const current=Math.max(1,Math.min(6,Number(S.season)||1));
 if(current<6){
   S.season=current+1;S.turn=0;S.plans={};S.assign={};S.strat={};S.schedule=[];S.seasonMeet=null;S.generationActive=true;
   seedSeason216(S.season);persist216();resetMeet216();
   try{render()}catch(e){console.error('v216 next-season render',e)}
   showTrain216();
   requestAnimationFrame(()=>{try{render()}catch(_){};sync216()});
   return;
 }
 S.parents=[];S.cands=[];S.sel=[];S.egg=null;S.turn=0;S.schedule=[];S.plans={};S.assign={};S.strat={};S.season=1;S.seasonMeet=null;S.generationActive=false;
 try{localStorage.removeItem(PROGRESS_KEY216)}catch(_){}
 resetMeet216();try{render()}catch(e){console.error('v216 next-generation render',e)}showBreed216();sync216();
}
function sync216(){
 const old=document.getElementById('next');if(old)old.style.display='none';
 const p=old?.parentElement||document.querySelector('#meet .box p');if(!p)return;
 let b=document.getElementById('next216');
 if(!b){b=document.createElement('button');b.id='next216';b.type='button';b.className='btn yl';b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();advance216()},false);p.appendChild(b)}
 const result=document.getElementById('result');const hasResult=!!(result&&result.textContent.trim());
 b.classList.toggle('hide',!hasResult);
 b.textContent=(Number(S.season)||1)<6?'次シーズンへ':'次世代へ';
}
// Recover only a newer season, never downgrade the in-memory state.
try{const n=Number(localStorage.getItem(PROGRESS_KEY216));if(Number.isInteger(n)&&n>=1&&n<=6&&(Number(S.season)||1)<n){S.season=n;S.seasonMeet=null;S.schedule=[];seedSeason216(n)}}catch(_){}
const result216=document.getElementById('result');if(result216)new MutationObserver(sync216).observe(result216,{childList:true,subtree:true,characterData:true});
setTimeout(()=>{sync216();try{render()}catch(_){}},0);
})();