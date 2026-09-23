(()=>{
// v0.32.18: safe full hatch preview + robust god athlete render.
// Preview never mutates S/save. Also provides reusable god-hatch cinematic.
if(window.STAR_GOD_HATCH350)return;
window.STAR_GOD_HATCH350=true;

function sample350(type='full'){
 const m={
  id:'preview-god-350',
  name:'アストラ・ドラコ',
  species:'draco',
  rarity:'EX',
  gen:99,
  personality:'静謐',
  stats:{power:888,speed:999,stamina:777,agility:955,tech:860,guts:820},
  skills233:[],
  hidden233:{growth:7,heredity:7,clutch:6,stability:7,mutation:7,luck:7,temperament:'冷静'},
  visual:{
   color:'神彩',pattern:'雷',acc:'なし',
   horn:'crystal',wing:'feather',tail:'star',
   part:'クリスタル・フェザー・スター尾'
  },
  parts243:{horn:'crystal',wing:'feather',tail:'star',muzzle_mark:'star'},
  rareVisual243:'divine'
 };
 const godPattern={id:'godthunder',base:'thunder',grade:5,name:'神雷紋',effect:'50m走・リレー適性 +10%',tier:'god'};
 const godBody={id:'wing',role:'speed',stats:['speed','agility'],grade:5,name:'神翼体',effect:'スピード・すばやさ型',tier:'god'};
 if(type!=='divine'){
  if(['pattern','resonance','full'].includes(type))m.starPattern342=godPattern;
  if(['body','resonance','full'].includes(type))m.starBody343=godBody;
  if(['resonance','full'].includes(type))m.starResonance344={grade:5,name:type==='full'?'神彩雷皇':'神雷天駆',effect:'得意能力 +8%／得意育成 +10%／得意競技 +8%'};
  if(['mythic','full'].includes(type))m.ultraRare274={id:'mythic',name:'神話級',chance:.000001,strength274:120};
  if(['skill','full'].includes(type))m.skills233.push('miracle');
 }
 if(type==='pattern'){delete m.starBody343;delete m.starResonance344;delete m.ultraRare274;m.skills233=[]}
 if(type==='body'){delete m.starPattern342;delete m.starResonance344;delete m.ultraRare274;m.skills233=[]}
 if(type==='mythic'){delete m.starPattern342;delete m.starBody343;delete m.starResonance344;m.skills233=[]}
 if(type==='skill'){delete m.starPattern342;delete m.starBody343;delete m.starResonance344;delete m.ultraRare274;m.skills233=['miracle']}
 if(type!=='divine'&&type!=='full'){m.visual.color='赤';delete m.rareVisual243}
 return m;
}
function paint350(){
 requestAnimationFrame(()=>{
  try{window.paintDracos?.()}catch(_){}
  try{window.paintSpecies?.()}catch(_){}
  setTimeout(()=>{try{window.paintDracos?.();window.paintSpecies?.()}catch(_){}},80);
  setTimeout(()=>{try{window.paintDracos?.();window.paintSpecies?.()}catch(_){}},260);
 });
}
function avatar350(m){
 try{return typeof avatar==='function'?avatar(m,true):''}catch(e){console.warn('avatar350',e);return''}
}
function traitList350(m){
 const out=[];
 try{
  const t=window.STAR_COLOR341?.tier?.(m);
  if(t==='divine')out.push('✦ 神彩');
 }catch(_){}
 const p=m?.starPattern342;if(Number(p?.grade)>=5)out.push('✧ '+p.name);
 const b=m?.starBody343;if(Number(b?.grade)>=5)out.push('◆ '+b.name);
 if(Number(m?.starResonance344?.grade)>=5)out.push('✺ '+(m.starResonance344.name||'神星共鳴'));
 if(m?.ultraRare274?.id==='mythic')out.push('☄ 神話級');
 if((m?.skills233||[]).includes('miracle'))out.push('🌠 奇跡の軌跡');
 return out;
}
function athleteView350(m){
 return `<div class="godAthlete350">
  <div class="godAthleteSky350"></div>
  <div class="godAthleteRing350"></div>
  <div class="godAthleteArt350">${avatar350(m)}</div>
  <div class="godAthleteBase350"></div>
  <div class="godAthleteName350"><small>★★★★★ GOD STAR</small><b>${m.name}</b></div>
  <div class="godAthleteTraits350">${traitList350(m).map(x=>`<span>${x}</span>`).join('')}</div>
 </div>`;
}
function sleep350(ms){return new Promise(r=>setTimeout(r,ms))}
async function hatchCinematic350(m,{preview=false,batch=false}={}){
 document.querySelector('.godHatchCinema350')?.remove();
 const el=document.createElement('div');el.className='godHatchCinema350';
 el.innerHTML=`<div class="cinemaStorm350">
   <div class="cinemaCloud350"></div>
   <svg class="cinemaLightningSvg350" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <path class="boltA350" d="M25 0 L21 22 L28 22 L19 43 L25 42 L17 68 L23 66 L18 100"/>
    <path class="boltB350" d="M73 0 L77 19 L70 22 L81 41 L75 43 L84 68 L78 68 L85 100"/>
   </svg>
   <div class="cinemaDragon350"><div class="dragonGhost350">${avatar350(m)}</div></div>
   <div class="cinemaEgg350"><i></i><b>✦</b></div>
   <div class="cinemaCrack350"></div>
   <div class="cinemaText350"><small>${batch?'MULTI HATCH':'HATCH'}</small><b>星が、応えた。</b></div>
 </div>
 <div class="cinemaGod350"><small>★★★★★</small><b>神星降臨</b><strong>${m.name}</strong></div>
 <div class="cinemaAthleteHost350"></div>`;
 document.body.appendChild(el);
 paint350();
 await sleep350(80);el.classList.add('phaseStorm350');
 await sleep350(700);el.classList.add('phaseDragon350');
 await sleep350(900);el.classList.add('phaseCrack350');
 await sleep350(700);el.classList.add('phaseFlash350');
 await sleep350(380);el.classList.add('phaseGod350');
 await sleep350(1050);
 el.querySelector('.cinemaAthleteHost350').innerHTML=athleteView350(m);
 paint350();
 el.classList.add('phaseAthlete350');
 await sleep350(160);
 if(!preview){
   // In real gameplay leave result visible briefly, then dismiss automatically.
   await sleep350(3200);el.classList.add('phaseLeave350');setTimeout(()=>el.remove(),450);
 }else{
   let close=el.querySelector('.cinemaClose350');
   if(!close){close=document.createElement('button');close.className='cinemaClose350';close.textContent='閉じる';close.onclick=()=>el.remove();el.appendChild(close)}
 }
}
function installPreview350(){
 const ov=document.getElementById('godPreview348');if(!ov)return false;
 if(ov.querySelector('.godHatchTest350'))return true;
 const stage=ov.querySelector('#godPreviewStage348');
 if(stage){
   const m=sample350(window.__godScenario348||'full');
   stage.innerHTML=athleteView350(m);paint350();
 }
 const buttons=ov.querySelector('.godPreviewButtons348');
 const box=document.createElement('div');box.className='godHatchTest350';
 box.innerHTML=`<small>FULL HATCH EXPERIENCE</small><b>孵化から神星降臨まで通し確認</b>
 <div><button data-god-hatch350="single">🥚 孵化する！</button><button data-god-hatch350="batch">🥚🥚 まとめて孵化</button></div>`;
 (buttons||ov.querySelector('section')).after(box);
 const oldPlay=ov.querySelector('[data-play-preview348]');if(oldPlay)oldPlay.style.display='none';
 return true;
}
document.addEventListener('click',e=>{
 const scenario=e.target?.closest?.('[data-god-scenario348]');
 if(scenario){
   window.__godScenario348=scenario.dataset.godScenario348;
   setTimeout(()=>{
    const st=document.getElementById('godPreviewStage348');
    if(st){st.innerHTML=athleteView350(sample350(window.__godScenario348));paint350()}
   },0);
 }
 const h=e.target?.closest?.('[data-god-hatch350]');
 if(h){hatchCinematic350(sample350(window.__godScenario348||'full'),{preview:true,batch:h.dataset.godHatch350==='batch'});return}
},true);

// Replace old preview's initial card once it opens.
let tries=0;const timer=setInterval(()=>{tries++;if(installPreview350()||tries>40)clearInterval(timer)},120);

// Real god birth: after normal hatch/batch flow, detect newest god and play once.
const played=new Set();
function newestGod350(){
 const arr=S?.cands||[];const m=arr[arr.length-1];if(!m)return null;
 let g=1;try{g=Number(window.STAR_GRADE340?.athleteGrade?.(m)||1)}catch(_){}
 return g>=5?m:null;
}
function maybeReal350(batch=false){
 setTimeout(()=>{
  const m=newestGod350();if(!m||played.has(m.id))return;
  played.add(m.id);hatchCinematic350(m,{preview:false,batch});
 },220);
}
document.addEventListener('click',e=>{
 if(e.target?.closest?.('#hatch'))maybeReal350(false);
 if(e.target?.closest?.('#batchGo260'))maybeReal350(true);
},false);

const css=document.createElement('style');css.id='godHatch350css';css.textContent=`
.godHatchTest350{margin:10px 0;padding:10px;border:1px solid #ffffff33;border-radius:12px;background:#ffffff0b;text-align:center}.godHatchTest350 small,.godHatchTest350>b{display:block}.godHatchTest350 small{font-size:6px;letter-spacing:.18em;color:#8eeaff}.godHatchTest350>b{font-size:10px;margin:2px 0 7px}.godHatchTest350>div{display:grid;grid-template-columns:1fr 1fr;gap:6px}.godHatchTest350 button{border:1px solid #d6b25a;border-radius:9px;padding:9px 5px;background:linear-gradient(90deg,#6b4f1d,#49336c);color:#fff4b0;font-size:8px;font-weight:1000}
.godHatchCinema350{position:fixed;inset:0;z-index:100200;background:#02040a;color:#fff;overflow:hidden;opacity:0;transition:opacity .25s}.godHatchCinema350.phaseStorm350{opacity:1}.cinemaStorm350{position:absolute;inset:0;background:radial-gradient(circle at 50% 65%,#1e2444 0,#070b16 42%,#010207 78%);overflow:hidden}.cinemaCloud350{position:absolute;inset:-20%;background:radial-gradient(ellipse at 25% 25%,#67708b33,transparent 30%),radial-gradient(ellipse at 70% 18%,#7770a844,transparent 32%),radial-gradient(ellipse at 55% 60%,#22314d55,transparent 38%);animation:cloud350 7s linear infinite}@keyframes cloud350{50%{transform:translate3d(-5%,3%,0) scale(1.05)}}
.cinemaLightningSvg350{position:absolute;inset:-2% 0 0;width:100%;height:78%;overflow:visible;filter:drop-shadow(0 0 4px #fff) drop-shadow(0 0 12px #7eeaff) drop-shadow(0 0 20px #8f7dff);opacity:.95}.cinemaLightningSvg350 path{fill:none;stroke:#f5fdff;stroke-width:1.65;stroke-linecap:round;stroke-linejoin:round;opacity:0}.phaseStorm350 .boltA350{animation:boltPath350 2.6s .15s infinite}.phaseStorm350 .boltB350{animation:boltPath350 3.1s .75s infinite}@keyframes boltPath350{0%,84%,100%{opacity:0}85%{opacity:.2}87%{opacity:1}89%{opacity:.12}91%{opacity:.95}94%{opacity:0}}
.cinemaDragon350{position:absolute;left:50%;top:8%;width:min(520px,118vw);height:390px;transform:translateX(-50%) scale(1.08);opacity:0;pointer-events:none;overflow:visible}.dragonGhost350{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transform:rotate(-7deg) translateY(-4px);filter:blur(.35px) drop-shadow(0 0 12px #91ecff) drop-shadow(0 0 28px #8e79ff)}.dragonGhost350 .avatar,.dragonGhost350 .bigArt{width:100%!important;height:100%!important;border:0!important;background:transparent!important;overflow:visible!important;filter:grayscale(1) brightness(2.1) contrast(1.15) saturate(.3)!important;opacity:.13}.dragonGhost350 .dracoCanvas,.dragonGhost350 .speciesCanvas{height:100%!important;max-width:100%!important;opacity:1!important}.phaseDragon350 .cinemaDragon350{animation:dragonGhostIn350 1.55s cubic-bezier(.16,.88,.26,1) forwards}@keyframes dragonGhostIn350{0%{opacity:0;transform:translateX(-50%) scale(.92)}35%{opacity:.12}68%{opacity:.34}100%{opacity:.18;transform:translateX(-50%) scale(1.08)}}
.cinemaEgg350{position:absolute;left:50%;bottom:18%;width:108px;height:136px;transform:translateX(-50%);border-radius:52% 52% 46% 46%;background:radial-gradient(circle at 40% 30%,#fffef1,#e9e1c8 55%,#8d8068);box-shadow:0 0 25px #fff4,0 0 50px #8c73ff44;transition:.4s}.cinemaEgg350 i{position:absolute;inset:12px;border:2px solid #b59c68;border-radius:50%;opacity:.45}.cinemaEgg350 b{position:absolute;left:50%;top:42%;transform:translate(-50%,-50%);font-size:28px;color:#9b7c35}.phaseCrack350 .cinemaEgg350{animation:eggShake350 .18s 5}@keyframes eggShake350{25%{transform:translateX(calc(-50% - 5px)) rotate(-2deg)}75%{transform:translateX(calc(-50% + 5px)) rotate(2deg)}}.cinemaCrack350{position:absolute;left:50%;bottom:24%;width:4px;height:88px;background:#fff;box-shadow:0 0 8px #fff,0 0 20px #ffe36b;opacity:0;transform:translateX(-50%) rotate(10deg);clip-path:polygon(0 0,100% 0,40% 38%,100% 38%,25% 100%,48% 55%,0 55%)}.phaseCrack350 .cinemaCrack350{opacity:1}.cinemaText350{position:absolute;top:10%;left:0;right:0;text-align:center;opacity:.85}.cinemaText350 small,.cinemaText350 b{display:block}.cinemaText350 small{font-size:7px;letter-spacing:.24em;color:#8beaff}.cinemaText350 b{font-size:18px;margin-top:4px}
.phaseFlash350:after{content:'';position:absolute;inset:0;background:#fff;animation:flash350 .55s ease-out forwards}@keyframes flash350{from{opacity:1}to{opacity:0}}.phaseFlash350 .cinemaEgg350{opacity:0;transform:translateX(-50%) scale(1.45)}
.cinemaGod350{position:absolute;inset:0;display:grid;place-content:center;text-align:center;opacity:0;transform:scale(.88);pointer-events:none}.cinemaGod350 small,.cinemaGod350 b,.cinemaGod350 strong{display:block}.cinemaGod350 small{font-size:16px;color:#ffe46d;letter-spacing:.2em}.cinemaGod350 b{font-size:40px;line-height:1;margin:8px 0;text-shadow:0 0 10px #fff,0 0 25px #ffe16b,0 0 48px #8d6bff}.cinemaGod350 strong{font-size:17px}.phaseGod350 .cinemaStorm350{opacity:.25;transition:.5s}.phaseGod350 .cinemaGod350{animation:godIn350 .8s cubic-bezier(.16,.9,.25,1) forwards}@keyframes godIn350{to{opacity:1;transform:scale(1)}}.phaseAthlete350 .cinemaGod350{opacity:0;transition:.3s}.cinemaAthleteHost350{position:absolute;inset:0;display:grid;place-items:center;padding:18px;opacity:0;transform:scale(.96)}.phaseAthlete350 .cinemaAthleteHost350{opacity:1;transform:scale(1);transition:.45s ease-out}
.godAthlete350{position:relative;width:min(390px,94vw);min-height:520px;border:2px solid #d7b04b;border-radius:24px;overflow:hidden;background:radial-gradient(circle at 50% 18%,#fff6b6 0,#dff8ff 18%,#edddff 38%,#161d36 70%,#070a12);box-shadow:0 0 0 1px #fff6 inset,0 0 35px #ffe06f55,0 0 70px #9c74ff55,0 24px 70px #000b}.godAthleteSky350{position:absolute;inset:0;background:radial-gradient(circle,#fff 0 1px,transparent 1.8px) 0 0/42px 42px,radial-gradient(circle,#ffe16f 0 1px,transparent 1.8px) 17px 26px/61px 61px;opacity:.65;animation:sky350 10s linear infinite}@keyframes sky350{to{transform:translateY(-12px)}}.godAthleteRing350{position:absolute;left:50%;top:62px;width:260px;height:260px;transform:translateX(-50%);border:2px solid #ffe16f88;border-radius:50%;box-shadow:0 0 25px #ffe16f55,inset 0 0 22px #8befff44;animation:ring350 13s linear infinite}@keyframes ring350{to{transform:translateX(-50%) rotate(360deg)}}.godAthleteRing350:before,.godAthleteRing350:after{content:'';position:absolute;border-radius:50%;border:1px solid #8befff77;inset:20px}.godAthleteRing350:after{inset:42px;border-color:#d8a0ff77}.godAthleteArt350{position:relative;z-index:4;height:330px;margin-top:36px}.godAthleteArt350 .avatar,.godAthleteArt350 .bigArt{height:330px!important;width:100%!important;border:0!important;background:transparent!important;overflow:visible!important}.godAthleteArt350 .dracoCanvas,.godAthleteArt350 .speciesCanvas{z-index:5!important;display:block!important;opacity:1!important}.godAthleteBase350{position:absolute;z-index:3;left:50%;top:330px;width:210px;height:55px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(ellipse,#fffbd1,#c8efff99 42%,#9c74ff55 65%,transparent 78%);filter:blur(1px);box-shadow:0 0 28px #ffe16f66}.godAthleteName350{position:relative;z-index:6;text-align:center;margin-top:4px}.godAthleteName350 small,.godAthleteName350 b{display:block}.godAthleteName350 small{font-size:7px;letter-spacing:.2em;color:#ffe581}.godAthleteName350 b{font-size:25px;margin-top:3px;text-shadow:0 0 10px #fff,0 0 20px #a774ff}.godAthleteTraits350{position:relative;z-index:6;display:flex;flex-wrap:wrap;justify-content:center;gap:6px;padding:10px 14px 15px}.godAthleteTraits350 span{padding:5px 8px;border-radius:999px;border:1px solid #ffffff44;background:#ffffff12;font-size:7px;font-weight:1000}.cinemaClose350{position:fixed;z-index:100210;left:50%;bottom:max(20px,env(safe-area-inset-bottom));transform:translateX(-50%);border:1px solid #ffffff55;border-radius:999px;background:#14182bcc;color:#fff;padding:9px 22px;font-size:9px;font-weight:1000}.phaseLeave350{opacity:0;transition:.45s}
`;document.head.appendChild(css);

window.STAR_GOD_HATCH350={sample:sample350,athlete:athleteView350,play:hatchCinematic350,paint:paint350};
})();