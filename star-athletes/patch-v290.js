(()=>{
// v0.31.3: authoritative Generation Season tournament selector.
// Final patch owns the visible tournament cards + selected tournament + "next tournament" display.
const SAVE290='star-athletes-save-v200';
const MEETS290={
 1:[['スタータウン杯','スタータウン','晴れ',['50m走','障害物競走','的当て','リレー']],['リバーフィールド杯','リバー地区','くもり',['50m走','大玉ころがし','坂道かけあがり','綱引き']],['ルーキースター杯','ネスト広場','晴れ',['障害物競走','的当て','大玉ころがし','リレー']]],
 2:[['ノースエリア杯','ノースドーム','向かい風',['50m走','10000m走','障害物競走','リレー']],['クリスタル地区杯','クリスタル平原','晴れ',['的当て','坂道かけあがり','大玉ころがし','綱引き']],['スカイエリア杯','高原競技場','強めの風',['50m走','障害物競走','坂道かけあがり','リレー']]],
 3:[['グランドスター杯','中央大競技場','晴れ',['10000m走','障害物競走','的当て','リレー']],['メテオグラウンド杯','クレーター会場','砂ぼこり',['大玉ころがし','坂道かけあがり','50m走','綱引き']],['オーロラグランド杯','北極光スタジアム','低温',['10000m走','50m走','的当て','リレー']]],
 4:[['メジャースターカップ','プライムアリーナ','晴れ',['50m走','障害物競走','10000m走','リレー']],['チャンピオンズ運動会','王都スタジアム','くもり',['大玉ころがし','的当て','坂道かけあがり','綱引き']],['コズミックメジャー杯','軌道競技場','変わりやすい',['50m走','的当て','10000m走','リレー']]],
 5:[['プラネット第1予選','代表選考アリーナ','晴れ',['障害物競走','10000m走','大玉ころがし','リレー']],['プラネット最終予選','代表選考アリーナ','くもり',['50m走','的当て','坂道かけあがり','綱引き']]],
 6:[['プラネット代表決定戦','プラネット・コロシアム','決戦日和',['50m走','障害物競走','10000m走','リレー']]]
};
const TIERS290={
 safe:{icon:'🛡️',label:'格下',reward:.68,annual:.75},
 standard:{icon:'🏆',label:'標準',reward:1,annual:1},
 challenge:{icon:'🔥',label:'格上',reward:1.6,annual:1.4}
};
function season290(){return Math.max(1,Math.min(6,Number(S.season)||1))}
function tierAt290(i,len){return len>=3?(i===0?'safe':i===1?'standard':'challenge'):len===2?(i===0?'standard':'challenge'):'standard'}
function standardIndex290(list){return list.length>=3?1:0}
function chance290(tier){
 const bases=[102,120,140,163,190,222],rank=Math.max(0,Math.min(5,Number(S.leagueRank)||0));
 const diff=tier==='safe'?-18:tier==='challenge'?20:0;
 const theirs=Math.round((bases[rank]||102)+(season290()-1)*1.5+diff);
 const nest=Array.isArray(S.nest)?S.nest:[],keys=['power','speed','stamina','agility','tech','guts'];
 const ours=nest.length?Math.round(nest.reduce((sum,m)=>sum+keys.reduce((a,k)=>a+(Number(m?.stats?.[k])||0),0)/6,0)/nest.length):0;
 const pct=Math.max(8,Math.min(92,Math.round(50+(ours-theirs)*1.8)));
 return pct;
}
function persist290(){try{localStorage.setItem(SAVE290,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function currentIndex290(list){
 const name=S.seasonMeet?.name;
 const i=list.findIndex(m=>m[0]===name);
 return i>=0?i:standardIndex290(list);
}
function apply290(i,{rerender=true}={}){
 const season=season290(),list=MEETS290[season]||MEETS290[6],m=list[i];if(!m)return;
 const tier=tierAt290(i,list.length);
 S.seasonMeet={name:m[0],place:m[1],weather:m[2],events:[...m[3]]};
 S.meetChoice225=tier;S.meetChoiceSeason125=season;S.schedule=[...m[3]];
 S.assign={};S.strat={};S.rivals225=[];S.rivalsPromo225=false;
 S.meetUiVersion290=1;persist290();
 if(rerender){try{render()}catch(e){console.warn('render apply290',e)}}
 sync290();[40,120,280].forEach(ms=>setTimeout(sync290,ms));
}
function normalize290(){
 const season=season290(),list=MEETS290[season]||MEETS290[6];
 if(S.meetUiVersion290!==1||Number(S.meetChoiceSeason125)!==season){
   apply290(standardIndex290(list),{rerender:false});
   return;
 }
 const i=currentIndex290(list),tier=tierAt290(i,list.length);
 if(S.meetChoice225!==tier||!Array.isArray(S.schedule)||S.schedule.join('|')!==list[i][3].join('|'))apply290(i,{rerender:false});
}
function cards290(){
 const root=document.getElementById('season119'),wrap=root?.querySelector('.meetChoice119');if(!wrap)return;
 const season=season290(),list=MEETS290[season]||MEETS290[6],sel=currentIndex290(list);
 wrap.innerHTML=list.map((m,i)=>{
   const id=tierAt290(i,list.length),t=TIERS290[id],on=i===sel;
   return `<button type="button" class="meetChoiceCard125 meetCard290 ${on?'sel':''}" data-star-meet290="${i}">
    <div class="tier290"><b>${t.icon} ${t.label}</b><strong class="chance290">勝率 ${chance290(id)}%</strong></div><div class="reward290">報酬 ×${t.reward} / 年間pt ×${t.annual}</div>
    <b>${m[0]}</b><span>📍 ${m[1]}　☁️ ${m[2]}</span><small>${m[3].join(' / ')}</small><em>${on?'選択中':'この大会を選ぶ'}</em>
   </button>`;
 }).join('');
}
function next290(){
 const season=season290(),list=MEETS290[season]||MEETS290[6],i=currentIndex290(list),m=list[i],tier=TIERS290[tierAt290(i,list.length)];
 const train=document.getElementById('train');if(!train)return;
 const sched=document.getElementById('sched');
 const box=sched?.closest('.box');
 const h=box?.querySelector('h3');if(h)h.textContent=`次の大会：${m[0]}（${tier.label}）`;
 if(sched)sched.innerHTML=m[3].map(e=>`<span class="chip"><b>${e}</b></span>`).join('');
 const to=document.getElementById('toMeet');if(to)to.textContent=(Number(S.turn)||0)<3?`大会へ（育成 ${Number(S.turn)||0}/3）`:`${m[0]}へ`;
}
function sync290(){normalize290();cards290();next290()}
window.addEventListener('click',e=>{
 const b=e.target?.closest?.('[data-star-meet290]');if(!b)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();apply290(Number(b.dataset.starMeet290));
},true);
try{const prev290=render;render=function(){const out=prev290();setTimeout(sync290,0);return out}}catch(e){console.warn('render290',e)}
const css=document.createElement('style');css.textContent=`
.tier290{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:3px}.tier290>b{font-size:8px!important}.tier290>strong{font-size:10px;color:#22384e}.reward290{font-size:6px;color:#6a7480;margin-bottom:2px}.meetCard290{touch-action:manipulation;position:relative;z-index:2}.meetCard290.sel{outline:3px solid #58cfff!important}
`;document.head.appendChild(css);
setTimeout(sync290,0);
})();