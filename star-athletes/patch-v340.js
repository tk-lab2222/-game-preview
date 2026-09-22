(()=>{
// v0.32.03: shared Japanese star-grade UI + compact competition cards.
// Keeps detailed skill lists on full-detail surfaces, but removes them from competition selection cards.
if(window.STAR_GRADE340)return;

const GRADE340={
  1:{name:'通常',stars:'★'},
  2:{name:'希少',stars:'★★'},
  3:{name:'輝星',stars:'★★★'},
  4:{name:'幻星',stars:'★★★★'},
  5:{name:'神星',stars:'★★★★★'}
};
const SKILL_GRADE340={
  power:1,speed:1,stamina:1,agility:1,tech:1,guts:1,
  sprinter:2,hurdler:2,titan:2,climber:2,endless:2,marksman:2,relay:2,
  champion:3,comeback:3,calm:3,fortune:3,clutch:3,prodigy:3,heredity:3,mutation:3,late:3,
  starborn:4,miracle:5
};
const SKILL_NAME340={
  power:'豪腕',speed:'疾風',stamina:'鉄肺',agility:'軽業',tech:'精密',guts:'勝負魂',
  sprinter:'電光石火',hurdler:'空中感覚',titan:'怪力',climber:'登坂王',endless:'不屈',marksman:'神射',relay:'阿吽の呼吸',
  champion:'王者の風格',comeback:'逆境魂',calm:'冷静沈着',fortune:'強運',clutch:'大舞台',prodigy:'英才教育',
  heredity:'強遺伝',mutation:'覚醒因子',late:'晩成',starborn:'星を継ぐ者',miracle:'奇跡の軌跡'
};
function clamp340(v){return Math.max(1,Math.min(5,Math.round(Number(v)||1)))}
function grade340(n){return GRADE340[clamp340(n)]}
function skillGrade340(id){return clamp340(SKILL_GRADE340[id]||1)}
function skillName340(id){return SKILL_NAME340[id]||id||'スキル'}
function visualGrade340(m){
  if(m?.rareVisual243==='prism')return 4;
  if(m?.rareVisual243==='mutation')return 4;
  if(m?.rareVisual243==='gold')return 3;
  if(m?.shiny)return 2;
  return 1;
}
function specialGrade340(m){
  const id=m?.ultraRare274?.id;
  if(id==='mythic')return 5;
  if(id==='miracle')return 4;
  if(id==='mutation')return 3;
  if(id==='ex')return 2;
  if(m?.specialLineage273)return 3;
  return 1;
}
function athleteGrade340(m){
  let g=Math.max(visualGrade340(m),specialGrade340(m));
  for(const id of(m?.skills233||[]))g=Math.max(g,skillGrade340(id));
  return g;
}
function highestSkill340(m){
  let best=null;
  for(const id of(m?.skills233||[])){
    const g=skillGrade340(id);
    if(!best||g>best.grade)best={id,grade:g,name:skillName340(id)};
  }
  return best;
}
function all340(){return [...(S?.starters||[]),...(S?.nest||[]),...(S?.lineage||[]),...(S?.cands||[]),...(S?.foster||[]),...(S?.released||[])].filter(Boolean)}
function byId340(id){return all340().find(m=>m?.id===id)||null}

function decorateSkillBadges340(){
  document.querySelectorAll('[data-skill254]').forEach(el=>{
    const id=el.dataset.skill254,g=skillGrade340(id),meta=grade340(g);
    el.classList.remove('starSkill340','grade340-1','grade340-2','grade340-3','grade340-4','grade340-5');
    el.classList.add('starSkill340','grade340-'+g);
    el.dataset.grade340=meta.name;
    el.title=`${meta.stars} ${meta.name}・${skillName340(id)}${el.title?'｜'+el.title:''}`;
  });
  document.querySelectorAll('.skillLabelUnified254').forEach(el=>el.textContent='スキル');
  document.querySelectorAll('.hatchSkill254>small').forEach(el=>el.textContent='スキル');
}

function compactCompetition340(){
  document.querySelectorAll('.entries210>[data-m210]').forEach(card=>{
    const m=byId340(card.dataset.m210);
    card.querySelectorAll('.entrySkillHost254,.skillSummary340').forEach(x=>x.remove());
    if(!m)return;
    const ids=Array.isArray(m.skills233)?m.skills233:[];
    if(!ids.length)return;
    const top=highestSkill340(m);
    const row=document.createElement('div');
    row.className='skillSummary340'+(top&&top.grade>=3?' rareSummary340 grade340-'+top.grade:'');
    if(top&&top.grade>=3){
      const meta=grade340(top.grade);
      row.innerHTML=`<b>${meta.stars} ${meta.name}</b><span>${top.name}</span><em>スキル${ids.length}</em>`;
    }else{
      row.innerHTML=`<span>スキル ${ids.length}</span>`;
    }
    const stats=[...card.children].find(x=>x.tagName==='DIV'&&!x.classList.contains('avatar'));
    if(stats)card.insertBefore(row,stats);else card.appendChild(row);
  });
}

function decorateAthleteCards340(){
  document.querySelectorAll('#cands .card[data-id],#breeders .card[data-id],#lineagePool .card[data-id]').forEach(card=>{
    const m=byId340(card.dataset.id);
    card.querySelector('.athleteGrade340')?.remove();
    if(!m)return;
    const g=athleteGrade340(m);
    if(g<3)return;
    const meta=grade340(g),tag=document.createElement('div');
    tag.className='athleteGrade340 grade340-'+g;
    tag.textContent=`${meta.stars} ${meta.name}`;
    (card.querySelector('.nm')||card.querySelector('.bd')||card).appendChild(tag);
  });
}

function sync340(){
  try{decorateSkillBadges340()}catch(e){console.warn('grade340 skill',e)}
  try{compactCompetition340()}catch(e){console.warn('grade340 competition',e)}
  try{decorateAthleteCards340()}catch(e){console.warn('grade340 athlete',e)}
}
try{
  const before340=render;
  render=function(){const out=before340();setTimeout(sync340,0);return out}
}catch(e){console.warn('grade340 render wrap',e)}
document.addEventListener('click',e=>{
  if(e.target.closest?.('.tab,[data-p210],[data-e210],[data-s210],#breedBtn,#hatch,#adopt'))setTimeout(sync340,0);
},true);
setTimeout(sync340,0);

window.STAR_GRADE340={
  grades:GRADE340,
  skillGrade:skillGrade340,
  athleteGrade:athleteGrade340,
  visualGrade:visualGrade340,
  specialGrade:specialGrade340,
  highestSkill:highestSkill340,
  sync:sync340
};

const css=document.createElement('style');
css.id='starGrade340css';
css.textContent=`
/* Full-detail surfaces: keep every skill, but make rank instantly readable. */
.starSkill340{position:relative!important}
.starSkill340:before{margin-right:3px;font-size:6px;letter-spacing:-1px;opacity:.82}
.starSkill340.grade340-1:before{content:'★'}
.starSkill340.grade340-2:before{content:'★★'}
.starSkill340.grade340-3:before{content:'★★★'}
.starSkill340.grade340-4:before{content:'★★★★'}
.starSkill340.grade340-5:before{content:'★★★★★'}
.starSkill340.grade340-3{border-width:2px!important;box-shadow:0 0 0 1px #fff7 inset,0 2px 6px #0001}
.starSkill340.grade340-4{border-width:2px!important;background:linear-gradient(120deg,#eef8ff,#f6eaff,#fff4d7)!important;box-shadow:0 0 10px #8971d744}
.starSkill340.grade340-5{border-width:2px!important;background:linear-gradient(120deg,#fff4b5,#f3e5ff,#dffaff,#fff4b5)!important;box-shadow:0 0 12px #8a68ff66,0 0 0 1px #fff inset;animation:godSkill340 2.4s ease-in-out infinite}
@keyframes godSkill340{50%{transform:translateY(-1px);filter:brightness(1.08)}}

/* Competition cards: no full skill row. Show only count, or one upper-rank skill. */
.entries210 .entrySkillHost254{display:none!important}
.skillSummary340{display:flex!important;align-items:center!important;justify-content:center!important;gap:4px!important;margin:4px 5px 1px!important;padding:3px 5px!important;border:0!important;border-radius:7px!important;background:#f1f4f7!important;color:#667789!important;font-size:6px!important;line-height:1.2!important}
.skillSummary340 b,.skillSummary340 span,.skillSummary340 em{font-size:6px!important;font-style:normal!important;white-space:nowrap!important}
.skillSummary340.rareSummary340{justify-content:flex-start!important;background:#fff!important;border:1px solid #d6c8e7!important;color:#403653!important}
.skillSummary340.rareSummary340 b{letter-spacing:-.5px}
.skillSummary340.rareSummary340 em{margin-left:auto;color:#758094}
.skillSummary340.grade340-4{background:linear-gradient(90deg,#f2f8ff,#f5ecff)!important;border-color:#aa96cf!important}
.skillSummary340.grade340-5{background:linear-gradient(90deg,#fff4bd,#efe4ff,#e2fbff)!important;border-color:#b49a53!important;box-shadow:0 0 8px #b28cff44!important}

/* General cards only show the highest overall star grade; details stay in detail screens. */
.athleteGrade340{display:inline-flex;margin-left:5px;padding:2px 5px;border-radius:999px;font-size:6px;font-weight:1000;vertical-align:middle;white-space:nowrap}
.athleteGrade340.grade340-3{background:#fff2bd;color:#755600;border:1px solid #d5b444}
.athleteGrade340.grade340-4{background:linear-gradient(90deg,#e5f7ff,#f1e5ff);color:#59437c;border:1px solid #a98ac8}
.athleteGrade340.grade340-5{background:linear-gradient(90deg,#fff0a8,#eadfff,#d9faff);color:#422e62;border:1px solid #b38c47;box-shadow:0 0 8px #9b79ff55}
`;
document.head.appendChild(css);
})();