(()=>{
// v0.32.13: upper-rarity skill birth routes.
// ★★★★ 星を継ぐ者 appears from upper resonance; ★★★★★ 奇跡の軌跡 only from 神星共鳴 / 神話級.
if(window.STAR_RARE_SKILL347)return;
const SAVE347='star-athletes-save-v200';
function save347(){try{localStorage.setItem(SAVE347,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function resonanceGrade347(m){try{return Number(window.STAR_RESONANCE344?.grade?.(m)||0)}catch(_){return 0}}
function ensure347(m){
 if(!m)return m;
 if(!Array.isArray(m.skills233))m.skills233=[];
 if(m.rareSkillRolled347)return m;
 const rg=resonanceGrade347(m),u=m?.ultraRare274?.id;
 let starbornChance=0,miracleChance=0;
 if(rg>=4)starbornChance+=rg>=5?.18:.08;
 if(u==='miracle')starbornChance+=.04;
 if(u==='mythic')starbornChance+=.10;
 if(rg>=5)miracleChance+=.12;
 if(u==='mythic')miracleChance+=.20;
 if(rg>=5&&u==='mythic')miracleChance+=.03;
 starbornChance=Math.min(.30,starbornChance);
 miracleChance=Math.min(.35,miracleChance);
 m.rareSkillOdds347={starborn:starbornChance,miracle:miracleChance};
 if(!m.skills233.includes('starborn')&&Math.random()<starbornChance&&m.skills233.length<6)m.skills233.push('starborn');
 if(!m.skills233.includes('miracle')&&Math.random()<miracleChance&&m.skills233.length<6)m.skills233.push('miracle');
 m.rareSkillRolled347=true;
 return m;
}
function all347(){
 const out=[],seen=new Set();
 for(const key of ['starters','nest','lineage','released','cands','foster']){
  for(const m of(S?.[key]||[]))if(m&&(m.id==null||!seen.has(m.id))){if(m.id!=null)seen.add(m.id);out.push(m)}
 }
 if(S?.egg&&(S.egg.id==null||!seen.has(S.egg.id)))out.push(S.egg);
 return out;
}
function migrate347(){
 let changed=false;
 for(const m of all347()){
  if((resonanceGrade347(m)>=4||['miracle','mythic'].includes(m?.ultraRare274?.id))&&!m.rareSkillRolled347){
   ensure347(m);changed=true;
  }
 }
 if(changed)save347();
}
window.STAR_RARE_SKILL347={birth:(c)=>ensure347(c),ensure:ensure347,sync:migrate347};
setTimeout(migrate347,0);
})();