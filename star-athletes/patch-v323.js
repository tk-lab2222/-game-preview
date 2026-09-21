(()=>{
'use strict';
// v0.31.78: MY STAR hall of fame — preserve and showcase one unforgettable athlete.
if(window.STAR_MY_STAR323)return;
const SAVE323='star-athletes-save-v200';
const SECTION_IDS323=['breed','train','meet','nest201','mission203','rep285','dex','hall323'];
const SK323={
 power:['💥','豪腕'],speed:['💨','疾風'],stamina:['🔥','鉄肺'],agility:['✨','軽業'],tech:['🎯','精密'],guts:['❤️‍🔥','勝負魂'],
 sprinter:['⚡','電光石火'],hurdler:['🪽','空中感覚'],titan:['🦬','怪力'],climber:['⛰️','登坂王'],endless:['♾️','不屈'],marksman:['🏹','神射'],relay:['🤝','阿吽の呼吸'],
 champion:['👑','王者の風格'],comeback:['🔥','逆境魂'],calm:['🧊','冷静沈着'],fortune:['🍀','強運'],clutch:['🌟','大舞台'],
 prodigy:['🌱','英才教育'],heredity:['🧬','強遺伝'],mutation:['✨','覚醒因子'],late:['📈','晩成'],starborn:['🌌','星を継ぐ者'],miracle:['🌠','奇跡の軌跡']
};
const LINEAGE323={gale:['💨','疾風一族'],power:['💪','豪腕血統'],gold:['👑','黄金血統'],ten:['🔗','10代継承']};
const STAT323={power:'ちから',speed:'スピード',stamina:'スタミナ',agility:'すばやさ',tech:'テクニック',guts:'こんじょう'};
const RK323=['G','F','E','D','C','B','A','S'];
function n323(v){return Number(v)||0}
function save323(){try{localStorage.setItem(SAVE323,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function all323(){const out=[],seen=new Set();for(const k of ['starters','nest','lineage','released','cands','foster'])for(const m of(S[k]||[]))if(m?.id&&!seen.has(m.id)){seen.add(m.id);out.push(m)}if(S.egg?.id&&!seen.has(S.egg.id))out.push(S.egg);return out}
function find323(id){return all323().find(m=>m.id===id)||null}
function clone323(m){try{return JSON.parse(JSON.stringify(m))}catch(_){return {...m,stats:{...(m.stats||{})},skills233:[...(m.skills233||[])],rareTitles323:[...(m.rareTitles323||[])]}}}
function slots323(){
 const old=S.myStar323;
 if(!Array.isArray(S.myStars323))S.myStars323=[];
 if(old?.athlete&&!S.myStars323.length)S.myStars323.push(old);
 S.myStars323=S.myStars323.filter(x=>x?.athlete).slice(0,3);
 return S.myStars323;
}
function register323(m,slot=null){
 if(!m)return;
 const arr=slots323(),entry={athlete:clone323(m),registeredAt:Date.now(),sourceId:m.id};
 let idx=Number.isInteger(slot)?slot:arr.findIndex(x=>x?.sourceId===m.id);
 if(idx<0)idx=arr.length<3?arr.length:2;
 arr[idx]=entry;S.myStars323=arr.slice(0,3);delete S.myStar323;
 save323();render323();syncButtons323();
 let t=document.getElementById('myStarToast323');if(!t){t=document.createElement('div');t.id='myStarToast323';document.body.appendChild(t)}
 t.innerHTML='<b>★ MY STAR 登録</b><span>'+m.name+' を殿堂入りさせました</span>';t.classList.add('show323');clearTimeout(window.__starToast323);window.__starToast323=setTimeout(()=>t.classList.remove('show323'),1600);
}
function current323(){return slots323()}
function ensureSection323(){
 const app=document.querySelector('.a');if(!app)return null;
 let sec=document.getElementById('hall323');
 if(!sec){sec=document.createElement('section');sec.id='hall323';sec.className='hide';const dex=document.getElementById('dex');dex?.after(sec);if(!sec.parentNode)app.appendChild(sec)}
 const tabs=document.querySelector('.tabs');
 if(tabs&&!tabs.querySelector('.tab[data-v="hall323"]')){const b=document.createElement('button');b.className='tab';b.dataset.v='hall323';b.innerHTML='⭐<br>MY STAR';tabs.appendChild(b)}
 return sec;
}
function titleBadges323(m){
 const rare=(m.rareTitles323||[]).map(x=>'<span class="rareTitle323">'+(x.icon||'🏅')+' '+x.name+'</span>');
 const lineage=(m.lineageTitles271||[]).map(id=>LINEAGE323[id]?'<span class="lineageTitle323">'+LINEAGE323[id][0]+' '+LINEAGE323[id][1]+'</span>':'');
 if(m.completedLineage271)lineage.push('<span class="lineageTitle323">✨ 完成血統</span>');
 return [...rare,...lineage].filter(Boolean).join('');
}
function skills323(m){
 const ids=Array.isArray(m.skills233)?m.skills233:[];
 return ids.length?ids.map(id=>{const s=SK323[id]||['✦',id];return '<span title="'+s[1]+'">'+s[0]+' '+s[1]+'</span>'}).join(''):'<em>スキル未修得</em>';
}
function hidden323(m){
 const h=m.hidden233||{},r=v=>RK323[Math.max(0,Math.min(7,Math.round(n323(v))))];
 return '<div class="myHidden323">'+[['成長',h.growth],['遺伝',h.heredity],['勝負',h.clutch],['安定',h.stability],['変異',h.mutation],['LUCK',h.luck]].map(([k,v])=>'<span>'+k+' <b>'+r(v)+'</b></span>').join('')+'</div>';
}
function starCard323(entry,slot){
 const m=entry.athlete,max=Math.max(...Object.values(m.stats||{}).map(n323),0),titles=titleBadges323(m);
 return '<article class="myStarHero323" data-slot323="'+slot+'">'+
 '<div class="myStarAura323"></div><header><div class="myStarAvatar323">'+(typeof avatar==='function'?avatar(m):'')+'</div><div class="myStarIdentity323"><small>MY STAR '+(slot+1)+' / G'+(n323(m.gen)||n323(m.generation)||0)+'</small><h3>'+m.name+'</h3><b>'+(typeof SP!=='undefined'&&SP[m.species]?SP[m.species][0]:m.species||'')+' ・ '+(m.rarity||'C')+'</b><em>'+(m.personality||'')+'</em><strong>最高能力 '+max+'</strong></div></header>'+
 (titles?'<div class="myTitles323"><small>LEGEND / TITLE</small><div>'+titles+'</div></div>':'')+
 '<div class="myStats323">'+Object.entries(STAT323).map(([k,n])=>'<span><small>'+n+'</small><b>'+n323(m.stats?.[k])+'</b></span>').join('')+'</div>'+
 '<div class="mySkills323"><small>SKILL '+(m.skills233?.length||0)+'/6</small><div>'+skills323(m)+'</div></div>'+
 '<div class="myBlood323"><small>GENETICS</small>'+hidden323(m)+'<em>出自：'+(m.origin||'-')+'</em></div>'+
 '<footer>登録：'+new Date(entry.registeredAt||Date.now()).toLocaleDateString('ja-JP')+'<button type="button" data-open-source323="'+(entry.sourceId||'')+'" data-slot323="'+slot+'">現在の個体データで更新</button></footer>'+
 '</article>';
}
function render323(){
 const sec=ensureSection323();if(!sec)return;const entries=current323();
 if(!entries.length){sec.innerHTML='<div class="myStarTitle323"><small>HALL OF FAME</small><h2>⭐ MY STAR</h2><p>自分史上最高の3体を、能力・スキル・称号ごと永久保存する殿堂。</p></div><div class="myStarEmpty323"><b>まだMY STARは登録されていません</b><span>個体カードの「☆ MY STAR」から、渾身の1体を最大3体まで登録できます。</span></div>';return}
 sec.innerHTML='<div class="myStarTitle323"><small>HALL OF FAME</small><h2>⭐ MY STAR</h2><p>代表でも親候補でもない、あなたが選んだ「渾身の3体」。</p><strong>'+entries.length+'/3</strong></div><div class="myStarGrid323">'+entries.map(starCard323).join('')+'</div>';
 try{window.paintSpecies&&window.paintSpecies()}catch(_){}
}
function addButton323(card,m){
 if(!card||!m||card.querySelector('.myStarBtn323'))return;
 const b=document.createElement('button');b.type='button';b.className='myStarBtn323';b.dataset.myStar323=m.id;const idx=slots323().findIndex(x=>x.sourceId===m.id);b.textContent=idx>=0?'★ MY STAR '+(idx+1):'☆ MY STAR';
 (card.querySelector('.bd')||card).appendChild(b);
}
function syncButtons323(){
 document.querySelectorAll('.train210[data-athlete210]').forEach(x=>addButton323(x,find323(x.dataset.athlete210)));
 document.querySelectorAll('#breeders .card[data-id],#cands .card[data-id],#lineagePool .card[data-id]').forEach(x=>addButton323(x,find323(x.dataset.id)));
 document.querySelectorAll('.myStarBtn323').forEach(b=>b.classList.toggle('on323',slots323().some(x=>x.sourceId===b.dataset.myStar323)));
}
function syncTitles323(){
 for(const m of all323()){
   const titles=m.rareTitles323||[];if(!titles.length)continue;
   document.querySelectorAll('[data-athlete210="'+m.id+'"],#breeders .card[data-id="'+m.id+'"],#cands .card[data-id="'+m.id+'"],#lineagePool .card[data-id="'+m.id+'"]').forEach(card=>{
     let h=card.querySelector('.rareTitleHost323');if(!h){h=document.createElement('div');h.className='rareTitleHost323';(card.querySelector('.bd')||card).appendChild(h)}
     h.innerHTML=titles.map(x=>'<span>'+(x.icon||'🏅')+' '+x.name+'</span>').join('');
   });
 }
}
function showHall323(){
 ensureSection323();SECTION_IDS323.forEach(id=>document.getElementById(id)?.classList.toggle('hide',id!=='hall323'));
 document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.v==='hall323'));render323();
}
function sync323(){ensureSection323();render323();syncButtons323();syncTitles323()}
document.addEventListener('click',e=>{
 const reg=e.target?.closest?.('[data-my-star323]');if(reg){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();register323(find323(reg.dataset.myStar323));return}
 const tab=e.target?.closest?.('.tab');if(tab){if(tab.dataset.v==='hall323'){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();showHall323();return}else document.getElementById('hall323')?.classList.add('hide')}
 const upd=e.target?.closest?.('[data-open-source323]');if(upd){const m=find323(upd.dataset.openSource323);if(m)register323(m,Number(upd.dataset.slot323))}
},true);
try{const prev=render;render=function(){const out=prev();setTimeout(sync323,0);return out}}catch(e){console.warn('my star 323',e)}
window.STAR_MY_STAR323={sync:sync323,register:register323,current:current323,show:showHall323,slots:slots323};
const css=document.createElement('style');css.textContent=`
#hall323{padding-bottom:90px}.myStarTitle323{position:relative;margin:8px 0 10px}.myStarTitle323>strong{position:absolute;right:0;top:2px;font-size:10px;color:#6f55a0}.myStarGrid323{display:grid;gap:12px}.myStarTitle323 small{font-size:7px;letter-spacing:.16em;color:#7960a3;font-weight:1000}.myStarTitle323 h2{margin:2px 0}.myStarTitle323 p{font-size:8px;color:#687589}.myStarEmpty323{padding:28px 14px;border:2px dashed #b8a8cc;border-radius:16px;background:#faf7ff;text-align:center}.myStarEmpty323 b,.myStarEmpty323 span{display:block}.myStarEmpty323 span{font-size:8px;color:#758091;margin-top:5px}
.myStarHero323{position:relative;overflow:hidden;border:2px solid #5b407d;border-radius:20px;background:radial-gradient(circle at 50% 8%,#30224c,#131b31 48%,#080d18);color:#fff;padding:12px;box-shadow:0 12px 28px #0004}.myStarAura323{position:absolute;inset:-40%;background:conic-gradient(transparent,#5ee7ff22,transparent,#d976ff22,transparent);animation:spin323 18s linear infinite}.myStarHero323>*:not(.myStarAura323){position:relative;z-index:1}@keyframes spin323{to{transform:rotate(360deg)}}.myStarHero323>header{display:grid;grid-template-columns:128px 1fr;gap:12px;align-items:center}.myStarAvatar323 .avatar{height:126px!important;border:1px solid #ffffff33!important;border-radius:16px!important;background:#ffffff0b!important}.myStarIdentity323 small{font-size:7px;color:#8fe8ff;font-weight:1000;letter-spacing:.1em}.myStarIdentity323 h3{font-size:23px;margin:2px 0}.myStarIdentity323 b,.myStarIdentity323 em,.myStarIdentity323 strong{display:block}.myStarIdentity323 b{font-size:9px}.myStarIdentity323 em{font-size:8px;color:#b7c6d8;font-style:normal;margin-top:2px}.myStarIdentity323 strong{margin-top:7px;color:#ffe271;font-size:11px}.myTitles323,.mySkills323,.myBlood323{margin-top:10px;padding:9px;border:1px solid #ffffff25;border-radius:12px;background:#ffffff0b}.myTitles323>small,.mySkills323>small,.myBlood323>small{display:block;font-size:6px;letter-spacing:.12em;color:#9edff3;font-weight:1000;margin-bottom:5px}.myTitles323>div,.mySkills323>div{display:flex;flex-wrap:wrap;gap:4px}.myTitles323 span,.mySkills323 span{display:inline-flex;padding:4px 7px;border-radius:999px;font-size:7px;font-weight:1000}.rareTitle323{background:linear-gradient(90deg,#ffe694,#d9a9ff);color:#25152e}.lineageTitle323{background:#ffffff18;border:1px solid #ffffff35;color:#fff}.mySkills323 span{background:#f5f7ff;color:#25304a;border:1px solid #aab8cf}.mySkills323 em{font-size:8px;color:#aebbd0}.myStats323{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-top:10px}.myStats323 span{display:flex;justify-content:space-between;align-items:center;padding:6px 7px;border-radius:8px;background:#ffffff0d;border:1px solid #ffffff1f}.myStats323 small{font-size:7px;color:#aebdd0}.myStats323 b{font-size:11px}.myHidden323{display:grid;grid-template-columns:repeat(3,1fr);gap:4px}.myHidden323 span{display:flex;justify-content:space-between;font-size:7px;padding:4px 6px;border-radius:6px;background:#ffffff0d}.myBlood323>em{display:block;margin-top:5px;font-size:7px;color:#aebdd0;font-style:normal}.myStarHero323 footer{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:10px;font-size:6px;color:#95a5b9}.myStarHero323 footer button{border:1px solid #ffffff40;border-radius:8px;background:#ffffff10;color:#fff;padding:5px 7px;font-size:7px;font-weight:900}
.myStarBtn323{width:100%;margin-top:6px;border:1px solid #8d7ca5;border-radius:8px;background:#f8f3ff;color:#5c4775;padding:6px;font-size:7px;font-weight:1000}.myStarBtn323.on323{background:#392653;color:#ffe986}.rareTitleHost323{display:flex;flex-wrap:wrap;gap:3px;margin-top:5px}.rareTitleHost323 span{font-size:6px;font-weight:1000;padding:3px 5px;border-radius:999px;background:linear-gradient(90deg,#fff0a9,#e8d1ff);color:#442d54}
#myStarToast323{position:fixed;left:50%;bottom:86px;z-index:100002;transform:translate(-50%,16px);opacity:0;pointer-events:none;background:#21162e;color:#fff;border:1px solid #b998df;border-radius:13px;padding:10px 14px;box-shadow:0 10px 28px #0005;text-align:center;transition:.18s}#myStarToast323.show323{opacity:1;transform:translate(-50%,0)}#myStarToast323 b,#myStarToast323 span{display:block}#myStarToast323 b{color:#ffe477;font-size:11px}#myStarToast323 span{font-size:8px;margin-top:2px}
@media(max-width:430px){.myStarHero323>header{grid-template-columns:110px 1fr}.myStarAvatar323 .avatar{height:110px!important}.myStarIdentity323 h3{font-size:19px}.myStats323{grid-template-columns:repeat(2,1fr)}}
`;document.head.appendChild(css);[0,100,350,800].forEach(ms=>setTimeout(sync323,ms));
})();