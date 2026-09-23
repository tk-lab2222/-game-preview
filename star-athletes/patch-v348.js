(()=>{
// v0.32.15: God-star presentation + safe device preview.
// ?godpreview=1 opens a zero-save visual preview. It never changes odds or S.
if(window.STAR_GOD_PRESENT348)return;

const SAVE348='star-athletes-save-v200';
function all348(){
 const out=[],seen=new Set();
 for(const key of ['starters','nest','lineage','released','cands','foster']){
  for(const m of(S?.[key]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);out.push(m)}
 }
 if(S?.egg&&!seen.has(S.egg.id))out.push(S.egg);
 return out;
}
function grade348(m){
 try{return Number(window.STAR_GRADE340?.athleteGrade?.(m)||1)}catch(_){return 1}
}
function godTraits348(m){
 const out=[];
 try{
  const t=window.STAR_COLOR341?.tier?.(m);
  if(t==='divine')out.push({icon:'✦',name:'神彩',type:'星色'});
 }catch(_){}
 try{
  const p=window.STAR_PATTERN342?.info?.(m);
  if(Number(p?.grade)>=5)out.push({icon:'✧',name:p.name,type:'星紋'});
 }catch(_){}
 try{
  const b=window.STAR_BODY343?.info?.(m);
  if(Number(b?.grade)>=5)out.push({icon:'◆',name:b.name,type:'星体'});
 }catch(_){}
 try{
  if(Number(window.STAR_RESONANCE344?.grade?.(m)||0)>=5)out.push({icon:'✺',name:window.STAR_RESONANCE344?.title?.(m)||'神星共鳴',type:'星相'});
 }catch(_){}
 if(m?.ultraRare274?.id==='mythic')out.push({icon:'☄',name:'神話級',type:'特殊誕生'});
 if((m?.skills233||[]).includes('miracle'))out.push({icon:'🌠',name:'奇跡の軌跡',type:'神技'});
 return out;
}
function persist348(){try{localStorage.setItem(SAVE348,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function seen348(){
 if(!S.godBirthSeen348||typeof S.godBirthSeen348!=='object')S.godBirthSeen348={};
 return S.godBirthSeen348;
}
function flashHtml348(m,preview=false){
 const traits=godTraits348(m);
 return `<div class="godFlash348 ${preview?'previewFlash348':''}">
  <div class="godSky348"></div>
  <div class="godCore348">
   <small>★★★★★</small><b>神星降臨</b><strong>${m.name||'UNKNOWN'}</strong>
   <div>${traits.map(x=>`<span><i>${x.icon}</i><em>${x.type}</em><b>${x.name}</b></span>`).join('')}</div>
  </div>
 </div>`;
}
function flash348(m,preview=false){
 if(!m?.id||(!preview&&grade348(m)<5))return;
 if(!preview){
  if(seen348()[m.id])return;
  seen348()[m.id]=Date.now();persist348();
 }
 const wrap=document.createElement('div');wrap.innerHTML=flashHtml348(m,preview);
 const el=wrap.firstElementChild;document.body.appendChild(el);
 requestAnimationFrame(()=>el.classList.add('show348'));
 setTimeout(()=>el.classList.add('leave348'),preview?1900:2400);
 setTimeout(()=>el.remove(),preview?2500:3100);
}
function decorateBirth348(){
 const birth=document.querySelector('#birth .hatchReveal');
 const latest=(S?.cands||[])[(S?.cands||[]).length-1];
 if(!birth||!latest)return;
 const god=grade348(latest)>=5;
 birth.classList.toggle('godBirth348',god);
 birth.querySelector('.godBanner348')?.remove();
 if(!god)return;
 const traits=godTraits348(latest);
 const banner=document.createElement('div');banner.className='godBanner348';
 banner.innerHTML=`<small>★★★★★ GOD STAR BIRTH</small><b>神星降臨</b><strong>${traits.map(x=>`${x.icon} ${x.name}`).join('　')}</strong>`;
 birth.prepend(banner);
 const av=birth.querySelector('.avatar,.bigArt');if(av)av.classList.add('godAvatar348');
 setTimeout(()=>flash348(latest,false),150);
}
function decorateCards348(){
 const byId=new Map(all348().map(m=>[m.id,m]));
 document.querySelectorAll('#cands .card[data-id],#breeders .card[data-id],#lineagePool .card[data-id]').forEach(card=>{
  const m=byId.get(card.dataset.id);if(!m)return;
  const god=grade348(m)>=5;card.classList.toggle('godCard348',god);
  card.querySelector('.godMark348')?.remove();
  if(god){
   const mk=document.createElement('div');mk.className='godMark348';mk.textContent='★★★★★ 神星';
   (card.querySelector('.nm')||card.querySelector('.bd')||card).appendChild(mk);
  }
 });
}
function decorateMyStar348(){
 const arr=Array.isArray(S?.myStars323)?S.myStars323:[];
 document.querySelectorAll('.myStarHero323').forEach((card,idx)=>{
  const m=arr[idx]?.athlete;if(!m)return;
  const god=grade348(m)>=5;card.classList.toggle('godMyStar348',god);
  card.querySelector('.godMyStarBanner348')?.remove();
  if(god){
   const traits=godTraits348(m),b=document.createElement('div');b.className='godMyStarBanner348';
   b.innerHTML=`<small>★★★★★ GOD STAR</small><b>${traits.map(x=>x.name).join(' × ')||'神星個体'}</b>`;
   card.prepend(b);
  }
 });
}
function sync348(){decorateBirth348();decorateCards348();decorateMyStar348()}

// ---------- safe preview ----------
function clone348(x){try{return JSON.parse(JSON.stringify(x))}catch(_){return {...x}}}
function previewBase348(){
 const src=all348()[0];
 if(src)return clone348(src);
 return {id:'preview348',name:'プレビュー個体',species:'draco',rarity:'C',gen:1,stats:{power:300,speed:300,stamina:300,agility:300,tech:300,guts:300},skills233:[],visual:{color:'赤',pattern:'なし'},parts243:{}};
}
function clearGod348(m){
 m.id='preview348';m.name='神星プレビュー';m.skills233=(m.skills233||[]).filter(x=>x!=='miracle');
 delete m.ultraRare274;delete m.starResonance344;
 if(m.rareVisual243==='divine')delete m.rareVisual243;
 if(m.visual?.color==='神彩')m.visual.color='赤';
 if(m.starPattern342?.grade>=5)m.starPattern342={id:'star',base:'star',grade:2,name:'星紋',effect:'スキル習得率 +2pt',tier:'base'};
 if(m.starBody343?.grade>=5)m.starBody343={id:'wing',role:'speed',stats:['speed','agility'],grade:1,name:'翼竜体',effect:'スピード・すばやさ型',tier:'base'};
 return m;
}
function scenario348(type){
 const m=clearGod348(previewBase348());
 const godPattern={id:'godthunder',base:'thunder',grade:5,name:'神雷紋',effect:'50m走・リレー適性 +10%',tier:'god'};
 const godBody={id:'wing',role:'speed',stats:['speed','agility'],grade:5,name:'神翼体',effect:'スピード・すばやさ型',tier:'god'};
 if(['divine','full'].includes(type)){m.visual=m.visual||{};m.visual.color='神彩';m.rareVisual243='divine'}
 if(['pattern','resonance','full'].includes(type))m.starPattern342=godPattern;
 if(['body','resonance','full'].includes(type))m.starBody343=godBody;
 if(['resonance','full'].includes(type))m.starResonance344={grade:5,name:type==='full'?'神彩雷皇':'神雷天駆',effect:'得意能力 +8%／得意育成 +10%／得意競技 +8%'};
 if(['mythic','full'].includes(type))m.ultraRare274={id:'mythic',name:'神話級',chance:.000001,strength274:120};
 if(['skill','full'].includes(type))m.skills233=[...(m.skills233||[]),'miracle'];
 return m;
}
function previewCard348(m){
 const traits=godTraits348(m);
 return `<div class="godPreviewCard348">
  <div class="godPreviewArt348">${typeof avatar==='function'?avatar(m,true):''}</div>
  <div class="godPreviewName348"><small>★★★★★ GOD STAR PREVIEW</small><b>${m.name}</b></div>
  <div class="godPreviewTraits348">${traits.map(x=>`<span><em>${x.type}</em><b>${x.icon} ${x.name}</b></span>`).join('')||'<span><b>通常個体</b></span>'}</div>
 </div>`;
}
function openPreview348(){
 if(document.getElementById('godPreview348'))return;
 const ov=document.createElement('div');ov.id='godPreview348';ov.className='godPreview348';
 ov.innerHTML=`<section>
  <header><div><small>DEVICE VISUAL TEST</small><h2>★★★★★ 神星演出プレビュー</h2><p>この画面はセーブ・確率・図鑑・ミッションに一切影響しません。</p></div><button data-close-preview348>×</button></header>
  <div class="godPreviewButtons348">
   <button data-god-scenario348="divine">神彩</button><button data-god-scenario348="pattern">神星紋</button>
   <button data-god-scenario348="body">神星体</button><button data-god-scenario348="resonance">神星共鳴</button>
   <button data-god-scenario348="mythic">神話級</button><button data-god-scenario348="skill">奇跡の軌跡</button>
   <button class="full348" data-god-scenario348="full">全部盛り</button>
  </div>
  <div id="godPreviewStage348"></div>
  <button class="godPreviewPlay348" data-play-preview348>神星降臨演出を再生</button>
 </section>`;
 document.body.appendChild(ov);
 window.__godScenario348='full';
 const stage=ov.querySelector('#godPreviewStage348');stage.innerHTML=previewCard348(scenario348('full'));
 try{window.paintSpecies&&window.paintSpecies()}catch(_){}
}
document.addEventListener('click',e=>{
 const sc=e.target?.closest?.('[data-god-scenario348]');
 if(sc){
  window.__godScenario348=sc.dataset.godScenario348;
  const stage=document.getElementById('godPreviewStage348');
  if(stage)stage.innerHTML=previewCard348(scenario348(window.__godScenario348));
  try{window.paintSpecies&&window.paintSpecies()}catch(_){}
  return;
 }
 if(e.target?.closest?.('[data-play-preview348]')){flash348(scenario348(window.__godScenario348||'full'),true);return}
 if(e.target?.closest?.('[data-close-preview348]')){document.getElementById('godPreview348')?.remove();return}
 if(e.target?.closest?.('#hatch,#breedBtn,#adopt,.tab,[data-my-star323]'))setTimeout(sync348,50);
},true);

try{const prev=render;render=function(){const out=prev();setTimeout(sync348,0);return out}}catch(e){console.warn('god present348 render',e)}

const css=document.createElement('style');
css.id='godPresent348css';
css.textContent=`
.godBirth348{position:relative!important;overflow:hidden!important;border:2px solid #d8b14b!important;background:radial-gradient(circle at 50% 18%,#fff9c7 0,#dff7ff 18%,#eadfff 38%,#151b33 70%,#080b15 100%)!important;box-shadow:0 0 0 2px #fff8 inset,0 0 24px #ffe46f88,0 0 56px #a87cff66,0 20px 45px #0007!important}
.godBirth348:after{content:'';position:absolute;inset:-35%;pointer-events:none;background:radial-gradient(circle,#fff 0 1px,transparent 2px) 0 0/38px 38px,radial-gradient(circle,#ffe682 0 1px,transparent 2px) 12px 20px/52px 52px,conic-gradient(from 0deg,transparent,#fff3 12%,transparent 24%,#9ef4ff22 42%,transparent 55%,#edb0ff22 72%,transparent);animation:godOrbit348 12s linear infinite}
@keyframes godOrbit348{to{transform:rotate(360deg) scale(1.05)}}.godBirth348>*{position:relative;z-index:2}
.godBanner348{text-align:center;margin:-4px -4px 10px;padding:10px;border-bottom:1px solid #fff8}.godBanner348 small,.godBanner348 b,.godBanner348 strong{display:block}.godBanner348 small{font-size:7px;letter-spacing:.22em;color:#fff1a0;font-weight:1000}.godBanner348 b{font-size:22px;line-height:1.1;margin:3px 0;color:#fff;text-shadow:0 0 8px #fff,0 0 18px #ffe467,0 0 28px #a36dff}.godBanner348 strong{font-size:7px;color:#eaf8ff}
.godAvatar348{filter:drop-shadow(0 0 7px #fff) drop-shadow(0 0 14px #ffe26b) drop-shadow(0 0 22px #a978ff)!important;animation:godFloat348 2.8s ease-in-out infinite!important}@keyframes godFloat348{50%{transform:translateY(-4px) scale(1.015)}}
.godFlash348{position:fixed;inset:0;z-index:100050;pointer-events:none;opacity:0;display:grid;place-items:center;background:#040712f2;transition:.28s}.godFlash348.show348{opacity:1}.godFlash348.leave348{opacity:0;transform:scale(1.025)}
.godSky348{position:absolute;inset:-30%;background:radial-gradient(circle at 50% 50%,#fff 0 2%,#ffe58a 4%,#bc8cff55 17%,transparent 38%),conic-gradient(from 0deg,transparent,#6eefff33,transparent,#ffd96833,transparent,#d98fff33,transparent);animation:godSky348 5s linear infinite}@keyframes godSky348{to{transform:rotate(360deg)}}
.godCore348{position:relative;width:min(360px,88vw);text-align:center;color:#fff;filter:drop-shadow(0 8px 24px #0008)}.godCore348>small{display:block;font-size:16px;letter-spacing:.18em;color:#ffe36e;text-shadow:0 0 14px #fff}.godCore348>b{display:block;font-size:34px;line-height:1;margin:6px 0;text-shadow:0 0 10px #fff,0 0 24px #ffdc66,0 0 42px #a66fff}.godCore348>strong{display:block;font-size:18px;margin-top:8px}.godCore348>div{display:flex;justify-content:center;flex-wrap:wrap;gap:6px;margin-top:16px}.godCore348 span{min-width:88px;padding:7px 9px;border:1px solid #ffffff66;border-radius:12px;background:#ffffff12}.godCore348 span i,.godCore348 span em,.godCore348 span b{display:block}.godCore348 span i{font-style:normal;font-size:15px}.godCore348 span em{font-style:normal;font-size:5px;color:#aeeeff}.godCore348 span b{font-size:9px;margin-top:2px}
.godCard348{position:relative!important;border:2px solid #cda84d!important;box-shadow:0 0 0 1px #fff inset,0 0 11px #a986ff55!important;background-image:linear-gradient(120deg,#fffdf2,#f2fbff,#f7efff)!important}.godMark348{display:inline-flex;margin:4px 0 0 5px;padding:3px 6px;border-radius:999px;background:linear-gradient(90deg,#fff0a5,#e9ddff,#dbf8ff);border:1px solid #b79547;color:#4d356c;font-size:6px;font-weight:1000;box-shadow:0 0 8px #a57fff44}
.godMyStar348{border-color:#d8b04a!important;box-shadow:0 12px 34px #0005,0 0 24px #ffe16d44,0 0 42px #a77cff44!important;background:radial-gradient(circle at 50% 5%,#59432b,#2a2348 32%,#11182b 62%,#070b13)!important}.godMyStar348 .myStarAura323{background:conic-gradient(transparent,#ffe36b44,transparent,#73eaff33,transparent,#d98cff44,transparent)!important;animation-duration:9s!important}.godMyStarBanner348{position:relative;z-index:3!important;text-align:center;margin:-3px -3px 9px;padding:7px;border:1px solid #ffffff30;border-radius:10px;background:linear-gradient(90deg,#ffe87322,#9beeff18,#ca92ff22)}.godMyStarBanner348 small,.godMyStarBanner348 b{display:block}.godMyStarBanner348 small{font-size:6px;letter-spacing:.18em;color:#ffe983}.godMyStarBanner348 b{font-size:10px;color:#fff;margin-top:2px}
.godPreview348{position:fixed;inset:0;z-index:100040;background:#070b14ed;overflow:auto;padding:14px;color:#fff}.godPreview348>section{width:min(520px,100%);margin:0 auto;border:1px solid #ffffff28;border-radius:20px;background:linear-gradient(160deg,#12192b,#241d3e);padding:13px;box-shadow:0 20px 60px #0008}.godPreview348 header{display:flex;justify-content:space-between;gap:8px}.godPreview348 header small{font-size:6px;letter-spacing:.16em;color:#8eeaff}.godPreview348 header h2{font-size:18px;margin:2px 0}.godPreview348 header p{font-size:7px;color:#bac5d8;margin:3px 0}.godPreview348 header button{width:34px;height:34px;border-radius:50%;border:1px solid #ffffff33;background:#ffffff10;color:#fff;font-size:18px}.godPreviewButtons348{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin:10px 0}.godPreviewButtons348 button,.godPreviewPlay348{border:1px solid #ffffff30;border-radius:9px;background:#ffffff0d;color:#fff;padding:7px 4px;font-size:7px;font-weight:1000}.godPreviewButtons348 .full348,.godPreviewPlay348{background:linear-gradient(90deg,#6d5324,#49346f,#244e67);color:#fff4a8}.godPreviewPlay348{width:100%;margin-top:8px;padding:9px}
.godPreviewCard348{overflow:hidden;border:2px solid #d1ad4d;border-radius:16px;background:radial-gradient(circle at 50% 20%,#fff8c0,#e8f8ff 25%,#efe2ff 48%,#11182b 76%);padding:10px;box-shadow:0 0 24px #a87fff55}.godPreviewArt348{height:190px}.godPreviewArt348 .avatar,.godPreviewArt348 .bigArt{height:190px!important;border:0!important;background:transparent!important}.godPreviewName348{text-align:center}.godPreviewName348 small,.godPreviewName348 b{display:block}.godPreviewName348 small{font-size:6px;letter-spacing:.15em;color:#6a4c00}.godPreviewName348 b{font-size:21px;color:#171b29}.godPreviewTraits348{display:flex;flex-wrap:wrap;justify-content:center;gap:5px;margin-top:7px}.godPreviewTraits348 span{padding:5px 7px;border-radius:8px;background:#ffffffdd;color:#281f39;border:1px solid #b99c55}.godPreviewTraits348 em,.godPreviewTraits348 b{display:block}.godPreviewTraits348 em{font-size:5px;font-style:normal;color:#756783}.godPreviewTraits348 b{font-size:7px}
`;
document.head.appendChild(css);

window.STAR_GOD_PRESENT348={sync:sync348,flash:flash348,traits:godTraits348,preview:openPreview348};
setTimeout(sync348,0);
if(new URLSearchParams(location.search).get('godpreview')==='1')setTimeout(openPreview348,180);
})();