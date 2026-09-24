(()=>{
'use strict';
// v0.32.34: pre-test save protection, ability-result presentation, legacy rarity cleanup,
// league-gated missions, and controlled Nest Lab strengthening.
if(window.STAR_PRETEST352)return;
const SAVE='star-athletes-save-v200',SNAP='star-athletes-save-v200-prebalance-03234';
const LEAGUES=['ローカル','エリア','グランド','メジャー','プラネット','ギャラクシー'];
const RANK_LEAGUE={C:'ローカル挑戦前',U:'ローカル級',R:'エリア級',SR:'グランド級',SSR:'メジャー級',UR:'プラネット級',EX:'ギャラクシー級'};
const RANK_ORDER=['C','U','R','SR','SSR','UR','EX'];
function save352(){try{localStorage.setItem(SAVE,JSON.stringify({savedAt:Date.now(),S}));return true}catch(_){return false}}
function valid352(raw){try{const d=JSON.parse(raw);return d&&d.S&&typeof d.S==='object'?d:null}catch(_){return null}}
function protect352(force=false){
 try{
  const raw=localStorage.getItem(SAVE);if(!valid352(raw))return false;
  if(force||!localStorage.getItem(SNAP))localStorage.setItem(SNAP,raw);
  return true;
 }catch(_){return false}
}
function restore352(){\n try{\n  const raw=localStorage.getItem(SNAP),d=valid352(raw);if(!d)return false;\n  // Explicit user recovery only. Mutate the canonical state object instead of replacing window.S,\n  // because every loaded patch closes over the original S reference.\n  if(!confirm('保護データへ戻すと現在の大会・世代・配合進行を置き換えます。続行しますか？'))return false;\n  Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,d.S);save352();render();return true;\n }catch(_){return false}\n}
// Preserve the current pre-test lineage automatically before the user resets it.
protect352(false);

function toast352(t){
 let el=document.getElementById('toast352');if(!el){el=document.createElement('div');el.id='toast352';document.body.appendChild(el)}
 el.textContent=t;el.classList.add('show352');setTimeout(()=>el.classList.remove('show352'),2200);
}
function saveTools352(){
 const host=document.getElementById('nest201');if(!host)return;
 let box=document.getElementById('saveTools352');
 if(!box){box=document.createElement('div');box.id='saveTools352';box.className='box saveTools352';host.appendChild(box)}
 const has=!!valid352(localStorage.getItem(SNAP));
 box.innerHTML='<div><small>PLAYTEST SAVE</small><h3>💾 検証データ保護</h3><p>新バランスを最初から試しても、現在の血統へ戻せます。</p></div><div class="saveBtns352"><button id="protect352">現在データを保護</button><button id="restore352" '+(has?'':'disabled')+'>保護データへ戻す</button></div><em>'+(has?'✓ 保護データあり':'保護データなし')+'</em>';
 box.querySelector('#protect352').onclick=()=>{if(protect352(true)){toast352('💾 現在の血統を保護しました');saveTools352()}};
 box.querySelector('#restore352').onclick=()=>restore352();
}

function abilityResult352(list){
 const rows=(list||[]).filter(Boolean).map(m=>{
  const r=m.abilityRankFinal340||window.STAR_GRADE340?.abilityRank?.(m)||'C';
  return '<div class="abilityRow352"><b>'+String(m.name||'ATHLETE')+'</b><strong>'+r+'</strong><span>'+RANK_LEAGUE[r]+'</span></div>';
 }).join('');
 if(!rows)return;
 document.getElementById('abilityResult352')?.remove();
 const el=document.createElement('div');el.id='abilityResult352';el.className='abilityResultBackdrop352';
 el.innerHTML='<section><small>DEVELOPMENT COMPLETE</small><h2>⭐ 能力測定</h2>'+rows+'<p>能力ランクは「どのリーグ帯で戦えるか」の目安です。</p><button>OK</button></section>';
 document.body.appendChild(el);requestAnimationFrame(()=>el.classList.add('show352'));
 el.querySelector('button').onclick=()=>el.remove();
}
try{
 const api=window.STAR_GRADE340;
 if(api&&typeof api.finalizeAbilityRanks==='function'&&!api.finalizeAbilityRanks.__v352){
  const before=api.finalizeAbilityRanks;
  const wrapped=function(list){
   const fresh=(list||[]).filter(m=>m&&!m.abilityRankFinal340);
   const out=before.apply(this,arguments);
   if(fresh.length)setTimeout(()=>abilityResult352(fresh),320);
   return out;
  };wrapped.__v352=true;api.finalizeAbilityRanks=wrapped;
 }
}catch(e){console.warn('ability result352',e)}

function cleanupLegacy352(){
 // C-EX used to be birth rarity. It is now only the finalized ability rank, so it must not drive rarity-card FX.
 document.querySelectorAll('.rarityFX249').forEach(el=>{
  el.classList.remove('rarityFX249','rar249-c','rar249-u','rar249-r','rar249-sr','rar249-ssr','rar249-ur','rar249-ex');
  delete el.dataset.rarity249;
 });
 document.querySelectorAll('.rarityBadge249').forEach(el=>el.classList.remove('rarityBadge249'));
 document.querySelectorAll('.slotMeta321 span').forEach(el=>{if(/ ・ (C|U|R|SR|SSR|UR|EX)$/.test(el.textContent))el.textContent=el.textContent.replace(/ ・ (C|U|R|SR|SSR|UR|EX)$/,' ・ 能力 $1')});
 document.querySelectorAll('.pickerMeta327 span').forEach(el=>{if(/^(C|U|R|SR|SSR|UR|EX) ・/.test(el.textContent))el.textContent=el.textContent.replace(/^(C|U|R|SR|SSR|UR|EX) ・/,'能力 $1 ・')});
 document.querySelectorAll('.dexSummary200 span').forEach(el=>{if(el.childNodes?.[0]?.textContent?.includes('最高レア'))el.childNodes[0].textContent='最高能力 '});
 const old=document.getElementById('specialShop200');if(old)old.style.display='none';
}
function migrateLegacy352(){
 if(S?.legacyRarityMigrated352)return;
 const stock=Number(S?.specialShop?.lucky)||0;
 if(stock>0){S.coins=(Number(S.coins)||0)+stock*900;S.specialShop.lucky=0}
 S.legacyRarityMigrated352=true;save352();
}
migrateLegacy352();

function gen352(){return Number(S?.generation233||S?.generation232||S?.breedCount||0)}
function bestRank352(){
 let best=0;
 for(const key of ['nest','lineage','starters','foster'])for(const m of(S?.[key]||[])){
  const r=m?.abilityRankFinal340;if(r)best=Math.max(best,RANK_ORDER.indexOf(r));
 }
 return best;
}
function defs352(){
 const l=Math.max(0,Math.min(5,Number(S?.leagueRank)||0)),b=Number(S?.breedCount)||0,w=Number(S?.wins)||0,g=gen352(),br=bestRank352();
 return [
  {id:'l_b3',lv:0,n:'血統の第一歩',d:'配合を3回行う',ok:b>=3,r:500},{id:'l_w1',lv:0,n:'初勝利',d:'大会で1勝する',ok:w>=1,r:600},{id:'l_g5',lv:0,n:'五世代の系譜',d:'5世代まで血統をつなぐ',ok:g>=5,r:800},{id:'l_u',lv:0,n:'ローカルの実力',d:'能力U以上を育てる',ok:br>=1,r:900},
  {id:'a_up',lv:1,n:'エリア進出',d:'エリア級へ昇格する',ok:l>=1,r:1200},{id:'a_b10',lv:1,n:'配合研究10',d:'配合を10回行う',ok:b>=10,r:1400},{id:'a_g10',lv:1,n:'十世代血統',d:'10世代までつなぐ',ok:g>=10,r:1600},{id:'a_r',lv:1,n:'エリア級の才能',d:'能力R以上を育てる',ok:br>=2,r:1800},
  {id:'g_up',lv:2,n:'グランド進出',d:'グランド級へ昇格する',ok:l>=2,r:2200},{id:'g_w10',lv:2,n:'勝利の積み重ね',d:'通算10勝する',ok:w>=10,r:2200},{id:'g_g15',lv:2,n:'十五世代血統',d:'15世代までつなぐ',ok:g>=15,r:2500},{id:'g_sr',lv:2,n:'グランド級の才能',d:'能力SR以上を育てる',ok:br>=3,r:2800},
  {id:'m_up',lv:3,n:'メジャー進出',d:'メジャー級へ昇格する',ok:l>=3,r:3200},{id:'m_b25',lv:3,n:'配合研究25',d:'配合を25回行う',ok:b>=25,r:3400},{id:'m_g20',lv:3,n:'二十世代血統',d:'20世代までつなぐ',ok:g>=20,r:3600},{id:'m_ssr',lv:3,n:'メジャー級の才能',d:'能力SSR以上を育てる',ok:br>=4,r:4000},
  {id:'p_up',lv:4,n:'プラネット進出',d:'プラネット級へ昇格する',ok:l>=4,r:4800},{id:'p_w30',lv:4,n:'ネストの名門化',d:'通算30勝する',ok:w>=30,r:5000},{id:'p_g25',lv:4,n:'二十五世代血統',d:'25世代までつなぐ',ok:g>=25,r:5200},{id:'p_ur',lv:4,n:'プラネット級の才能',d:'能力UR以上を育てる',ok:br>=5,r:6000},
  {id:'x_up',lv:5,n:'ギャラクシー進出',d:'ギャラクシー級へ昇格する',ok:l>=5,r:7000},{id:'x_b50',lv:5,n:'配合研究50',d:'配合を50回行う',ok:b>=50,r:7000},{id:'x_g30',lv:5,n:'三十世代の星史',d:'30世代までつなぐ',ok:g>=30,r:8000},{id:'x_ex',lv:5,n:'銀河級の才能',d:'能力EXを育てる',ok:br>=6,r:10000}
 ];
}
function claim352(id){
 const m=defs352().find(x=>x.id===id);if(!m||!m.ok)return;
 S.missionClaimed352??={};if(S.missionClaimed352[id])return;
 S.missionClaimed352[id]=true;S.coins=(Number(S.coins)||0)+m.r;save352();missions352();toast352('🎯 ミッション達成 +'+m.r+'コイン');
}
function missions352(){
 const host=document.getElementById('missionHost203');if(!host)return;
 const old=document.getElementById('mission200');if(old)old.style.display='none';
 let box=document.getElementById('missions352');if(!box){box=document.createElement('div');box.id='missions352';host.appendChild(box)}
 const l=Math.max(0,Math.min(5,Number(S?.leagueRank)||0)),claimed=S.missionClaimed352||{},all=defs352();
 let html='<div class="missionSummary352"><b>リーグミッション</b><span>'+all.filter(m=>claimed[m.id]).length+'/'+all.length+' COMPLETE</span></div>';
 for(let lv=0;lv<6;lv++){
  const ms=all.filter(m=>m.lv===lv);
  if(lv>l){html+='<div class="missionLocked352">🔒 '+LEAGUES[lv]+'級で新ミッション解放</div>';continue}
  const done=ms.filter(m=>claimed[m.id]),open=ms.filter(m=>!claimed[m.id]);
  html+='<section class="missionLeague352"><h3>'+LEAGUES[lv]+'級 <small>'+done.length+'/'+ms.length+'</small></h3><div class="missionOpen352">'+open.map(m=>'<article class="'+(m.ok?'ready352':'')+'"><div><b>'+m.n+'</b><span>'+m.d+'</span></div><button data-m352="'+m.id+'" '+(m.ok?'':'disabled')+'>'+(m.ok?'🪙 '+m.r+' 受取':'挑戦中')+'</button></article>').join('')+'</div>';
  if(done.length)html+='<details class="missionDone352"><summary>✓ クリア済み '+done.length+'件</summary>'+done.map(m=>'<div><span>'+m.n+'</span><em>受取済み</em></div>').join('')+'</details>';
  html+='</section>';
 }
 box.innerHTML=html;
 box.querySelectorAll('[data-m352]').forEach(b=>b.onclick=()=>claim352(b.dataset.m352));
}

function shopGenKey352(){return String(gen352())+'-'+String(Number(S?.leagueRank)||0)}
function shopState352(){S.shop352??={key:shopGenKey352(),condition:0,weak:0,lineage:0};if(S.shop352.key!==shopGenKey352())S.shop352={key:shopGenKey352(),condition:0,weak:0,lineage:0};return S.shop352}
function target352(){return S?.nest?.[0]||null}
function buy352(id){
 const m=target352(),st=shopState352();if(!m)return toast352('育成中のアスリートがいません');
 const cfg={condition:{cost:700,max:2},weak:{cost:1000,max:2},lineage:{cost:1800,max:1}}[id];if(!cfg||st[id]>=cfg.max)return;
 if((Number(S.coins)||0)<cfg.cost)return toast352('コインが足りません');
 S.coins-=cfg.cost;st[id]++;
 const keys=Object.keys(m.stats||{});
 if(id==='condition')keys.forEach(k=>{m.stats[k]=Number(m.stats[k]||0)+3;m.trainingGain226&&(m.trainingGain226[k]=Number(m.trainingGain226[k]||0)+3)});
 if(id==='weak'){
  keys.sort((a,b)=>Number(m.stats[a]||0)-Number(m.stats[b]||0)).slice(0,2).forEach(k=>{m.stats[k]=Number(m.stats[k]||0)+6;m.trainingGain226&&(m.trainingGain226[k]=Number(m.trainingGain226[k]||0)+6)});
 }
 if(id==='lineage'){
  if(!m.geneticBase226)m.geneticBase226={};
  keys.forEach(k=>{m.geneticBase226[k]=Number(m.geneticBase226[k]??m.stats[k]??0)+2;m.stats[k]=Number(m.stats[k]||0)+2});
 }
 save352();try{render()}catch(_){};toast352('🏠 ネスト強化を適用しました');
}
function shop352(){
 const host=document.getElementById('nestShopHost201');if(!host)return;
 let box=document.getElementById('nestLab352');if(!box){box=document.createElement('div');box.id='nestLab352';box.className='box nestLab352';host.appendChild(box)}
 const st=shopState352(),m=target352(),coin=Number(S?.coins)||0;
 const item=(id,icon,name,desc,cost,max)=>'<button data-shop352="'+id+'" '+(!m||st[id]>=max||coin<cost?'disabled':'')+'><b>'+icon+' '+name+'</b><span>'+desc+'</span><em>🪙 '+cost+'　'+st[id]+'/'+max+'</em></button>';
 box.innerHTML='<div class="labHead352"><div><small>NEST LAB</small><h3>🧪 血統強化</h3></div><strong>'+(m?m.name:'育成個体なし')+'</strong></div><p>強化は世代ごとに回数制限。数世代を短縮できる補助に留め、ショップだけでリーグを飛び越えない設計です。</p><div class="labGrid352">'+
 item('condition','🥤','コンディションドリンク','全能力+3（獲得成長）',700,2)+
 item('weak','🛠️','弱点補強','低い能力2つを+6',1000,2)+
 item('lineage','🧬','血統エッセンス','全能力の遺伝基礎+2',1800,1)+'</div>';
 box.querySelectorAll('[data-shop352]').forEach(b=>b.onclick=()=>buy352(b.dataset.shop352));
}

function sync352(){try{cleanupLegacy352();saveTools352();missions352();shop352()}catch(e){console.warn('sync352',e)}}
try{const prev=window.render;if(typeof prev==='function')window.render=function(){const out=prev.apply(this,arguments);setTimeout(sync352,0);return out}}catch(_){}
document.addEventListener('click',e=>{if(e.target?.closest?.('.tab,#hatch,#adopt,#doTrain,#run,#annualNext233,#next225,[data-release]'))setTimeout(sync352,50)},true);
const css=document.createElement('style');css.textContent=`
.rarityFX249:before,.rarityFX249:after{display:none!important}.rarityBadge249{all:unset!important}
.saveTools352{margin-top:12px}.saveTools352 small,.labHead352 small{font-size:7px;font-weight:1000;letter-spacing:.14em;color:#2788aa}.saveTools352 h3,.labHead352 h3{margin:2px 0}.saveTools352 p,.nestLab352>p{font-size:8px;color:#647485;line-height:1.5}.saveBtns352{display:grid;grid-template-columns:1fr 1fr;gap:6px}.saveBtns352 button{padding:9px;border:1px solid #8ca7bb;border-radius:9px;background:#fff;font-size:8px;font-weight:1000}.saveTools352>em{display:block;margin-top:6px;font-size:7px;font-style:normal;color:#32835c}
#toast352{position:fixed;left:50%;bottom:82px;z-index:100010;transform:translate(-50%,12px);opacity:0;padding:9px 13px;border-radius:12px;background:#132033;color:#fff;font-size:9px;font-weight:1000;transition:.18s;pointer-events:none;white-space:nowrap}#toast352.show352{opacity:1;transform:translate(-50%,0)}
.abilityResultBackdrop352{position:fixed;inset:0;z-index:100020;display:flex;align-items:center;justify-content:center;padding:18px;background:#06101be8;opacity:0;transition:.2s}.abilityResultBackdrop352.show352{opacity:1}.abilityResultBackdrop352 section{width:min(390px,100%);padding:20px;border:2px solid #72dfff;border-radius:22px;background:linear-gradient(160deg,#152b42,#09131f);color:#fff;box-shadow:0 0 40px #4edcff55}.abilityResultBackdrop352 small{font-size:7px;letter-spacing:.16em;color:#7ee8ff;font-weight:1000}.abilityResultBackdrop352 h2{margin:4px 0 12px}.abilityRow352{display:grid;grid-template-columns:1fr auto 92px;gap:8px;align-items:center;padding:8px;border-top:1px solid #ffffff1d}.abilityRow352 b{font-size:10px}.abilityRow352 strong{font-size:20px;color:#fff2a0}.abilityRow352 span{font-size:8px;color:#b9d9ea;text-align:right}.abilityResultBackdrop352 p{font-size:8px;color:#9fb8c8}.abilityResultBackdrop352 button{width:100%;padding:10px;border:0;border-radius:10px;background:#70e6ff;color:#092033;font-weight:1000}
.missionSummary352{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-radius:12px;background:#16263b;color:#fff}.missionSummary352 b{font-size:11px}.missionSummary352 span{font-size:7px;color:#83e9ff}.missionLeague352{margin-top:8px;padding:9px;border:1px solid #cfdae5;border-radius:12px;background:#f9fbfd}.missionLeague352 h3{margin:0 0 6px;font-size:11px}.missionLeague352 h3 small{font-size:7px;color:#728295}.missionOpen352{display:grid;gap:5px}.missionOpen352 article{display:grid;grid-template-columns:1fr auto;gap:7px;align-items:center;padding:7px;border:1px solid #d8e0e8;border-radius:9px;background:#fff}.missionOpen352 article.ready352{border-color:#69d09b;background:#effff6}.missionOpen352 b,.missionOpen352 span{display:block}.missionOpen352 b{font-size:9px}.missionOpen352 span{font-size:7px;color:#66798a}.missionOpen352 button{border:0;border-radius:7px;padding:7px;background:#17243a;color:#ffe278;font-size:7px;font-weight:1000}.missionOpen352 button:disabled{opacity:.35}.missionDone352{margin-top:6px;border-top:1px dashed #ccd5de;padding-top:5px}.missionDone352 summary{font-size:7px;font-weight:1000;color:#617383}.missionDone352 div{display:flex;justify-content:space-between;padding:4px 2px;font-size:7px;color:#7b8792}.missionDone352 em{font-style:normal;color:#3b8a62}.missionLocked352{margin-top:7px;padding:9px;border:1px dashed #c6cdd5;border-radius:10px;background:#f0f2f4;color:#87929c;font-size:8px;font-weight:900}
.nestLab352{margin-top:10px;background:linear-gradient(180deg,#f5fbff,#eef7fb)!important}.labHead352{display:flex;justify-content:space-between;align-items:center}.labHead352 strong{font-size:8px;color:#236d8d}.labGrid352{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.labGrid352 button{display:flex;flex-direction:column;gap:3px;text-align:left;padding:8px;border:1px solid #9dc7d8;border-radius:10px;background:#fff}.labGrid352 b{font-size:8px}.labGrid352 span{min-height:25px;font-size:7px;color:#657787}.labGrid352 em{font-size:7px;font-style:normal;font-weight:1000;color:#1d718e}.labGrid352 button:disabled{opacity:.38}
@media(max-width:430px){.labGrid352{grid-template-columns:1fr}.abilityRow352{grid-template-columns:1fr auto 82px}}
`;document.head.appendChild(css);
window.STAR_PRETEST352={protect:protect352,restore:restore352,sync:sync352,missions:defs352,rankLeague:RANK_LEAGUE};
setTimeout(sync352,100);setTimeout(sync352,500);
})();