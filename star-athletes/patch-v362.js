(()=>{'use strict';
// v0.32.48: canonical star-grade engine. Athlete grade is distinct from component grades.
if(window.STAR_GRADE_ENGINE362)return;
const SAVE='star-athletes-save-v200';
const META={1:{name:'通常',stars:'★'},2:{name:'希少',stars:'★★'},3:{name:'輝星',stars:'★★★'},4:{name:'幻星',stars:'★★★★'},5:{name:'神星',stars:'★★★★★'}};
const STAR_COLOR={normal:1,gold:3,prism:4,mutation:4,divine:5};
const clamp=n=>Math.max(1,Math.min(5,Math.round(Number(n)||1)));
function all(){const out=[],seen=new Set();for(const k of ['starters','nest','lineage','released','cands','foster'])for(const m of(S?.[k]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);out.push(m)}if(S?.egg&&!seen.has(S.egg.id))out.push(S.egg);return out}
function colorTier(m){if(m?.rareVisual243==='divine'||m?.visual?.color==='神彩')return'divine';if(m?.rareVisual243==='prism'||m?.visual?.color==='プリズム')return'prism';if(m?.rareVisual243==='gold'||m?.visual?.color==='金')return'gold';if(m?.rareVisual243==='mutation')return'mutation';return'normal'}
function colorGrade(m){return STAR_COLOR[colorTier(m)]||1}
function shinyGrade(m){return m?.shiny?2:1}
function specialGrade(m){const id=m?.ultraRare274?.id;if(id==='mythic')return 5;if(id==='miracle')return 4;if(id==='mutation')return 3;if(id==='ex')return 2;if(m?.specialLineage273)return 3;return 1}
function resonanceGrade(m){try{return clamp(window.STAR_RESONANCE344?.grade?.(m)||0)}catch(_){return 1}}
function patternGrade(m){try{return clamp(window.STAR_PATTERN342?.grade?.(m)||1)}catch(_){return 1}}
function bodyGrade(m){try{return clamp(window.STAR_BODY343?.grade?.(m)||1)}catch(_){return 1}}
function accessoryGrade(m){const a=m?.starAccessory345||m?.accessory345||m?.accessoryStar345;return clamp(a?.grade||1)}
// Canonical athlete grade: identity/birth systems only. Component rarity stays independent.
function athleteGrade(m){return Math.max(shinyGrade(m),colorGrade(m),specialGrade(m),resonanceGrade(m))}
function breakdown(m){return{athlete:athleteGrade(m),shiny:shinyGrade(m),starColor:colorGrade(m),special:specialGrade(m),resonance:resonanceGrade(m),pattern:patternGrade(m),body:bodyGrade(m),accessory:accessoryGrade(m)}}
function label(g){const z=META[clamp(g)];return z.stars+' '+z.name}
function migrate(){let changed=false;for(const m of all()){if(m?.rareVisual243==='shiny'){delete m.rareVisual243;changed=true}const t=colorTier(m);if(['prism','gold','divine'].includes(t)&&m.rareVisual243!==t){m.rareVisual243=t;changed=true}const g=athleteGrade(m);if(Number(m.athleteStarGrade362)!==g){m.athleteStarGrade362=g;changed=true}if('birthStarGrade361'in m){delete m.birthStarGrade361;changed=true}}if(changed)try{localStorage.setItem(SAVE,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function syncCards(){const map=new Map(all().filter(x=>x?.id).map(x=>[x.id,x]));document.querySelectorAll('.card[data-id],.train210[data-athlete210]').forEach(c=>{const m=map.get(c.dataset.id||c.dataset.athlete210);if(!m)return;const g=athleteGrade(m),tag=c.querySelector('.athleteGrade340');if(tag){tag.className='athleteGrade340 grade340-'+g;tag.textContent=label(g)}c.dataset.athleteStarGrade=g})}
function sync(){migrate();syncCards()}
window.STAR_GRADE_ENGINE362={meta:META,colorTier,colorGrade,shinyGrade,specialGrade,resonanceGrade,patternGrade,bodyGrade,accessoryGrade,athleteGrade,breakdown,label,sync};
try{if(window.STAR_GRADE340){STAR_GRADE340.athleteGrade=athleteGrade;STAR_GRADE340.visualGrade=colorGrade;STAR_GRADE340.specialGrade=specialGrade}}catch(_){}
try{if(window.STAR_GRADE_FIX361){STAR_GRADE_FIX361.expected=athleteGrade;STAR_GRADE_FIX361.sync=sync}}catch(_){}
try{const prev=render;render=function(){const x=prev.apply(this,arguments);setTimeout(sync,0);return x}}catch(_){}
addEventListener('load',()=>setTimeout(sync,100));document.addEventListener('click',()=>setTimeout(sync,40),true);setTimeout(sync,0);
})();