(()=>{
// v0.32.11: Divine Star Color.
// Adds ★★★★★ 神彩 as the top Star Color with bloodline-targetable odds and broad value.
if(window.STAR_DIVINE_COLOR346)return;

const SAVE346='star-athletes-save-v200';
const BASE346=.00002;

function all346(){
 const out=[],seen=new Set();
 for(const key of ['starters','nest','lineage','released','cands','foster']){
  for(const m of(S?.[key]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);out.push(m)}
 }
 if(S?.egg&&!seen.has(S.egg.id))out.push(S.egg);
 return out;
}
function hidden346(m,k){
 const n=Number(m?.hidden233?.[k]);
 return Number.isFinite(n)?Math.max(0,Math.min(7,n)):0;
}
function isDivine346(m){return m?.rareVisual243==='divine'||m?.visual?.color==='神彩'}
function parentMult346(a,b){
 let mult=1,reasons=[];
 const ps=[a,b].filter(Boolean);
 const divine=ps.filter(isDivine346).length;
 const prism=ps.filter(p=>p?.rareVisual243==='prism'||p?.visual?.color==='プリズム').length;
 const mutation=ps.filter(p=>p?.rareVisual243==='mutation').length;
 if(divine){const x=divine===2?20:8;mult*=x;reasons.push(`神彩親${divine}体×${x}`)}
 else if(prism){const x=prism===2?8:3;mult*=x;reasons.push(`虹色親${prism}体×${x}`)}
 if(mutation){const x=mutation===2?3:1.5;mult*=x;reasons.push(`異変色親×${x}`)}
 const mut=Math.max(hidden346(a,'mutation'),hidden346(b,'mutation'));
 const luck=Math.max(hidden346(a,'luck'),hidden346(b,'luck'));
 const hered=Math.max(hidden346(a,'heredity'),hidden346(b,'heredity'));
 if(mut>=6){const x=mut>=7?4:2;mult*=x;reasons.push(`変異因子${mut>=7?'S':'A'}×${x}`)}
 if(luck>=6){const x=luck>=7?2.5:1.5;mult*=x;reasons.push(`LUCK ${luck>=7?'S':'A'}×${x}`)}
 if(hered>=6){const x=hered>=7?1.8:1.3;mult*=x;reasons.push(`遺伝力${hered>=7?'S':'A'}×${x}`)}
 return{mult:Math.min(500,mult),reasons};
}
function chance346(a,b){
 const x=parentMult346(a,b);
 return{base:BASE346,mult:x.mult,chance:Math.min(.01,BASE346*x.mult),reasons:x.reasons};
}
function cap346(){try{return Math.max(999,Number(window.STAR_LIMIT278?.cap?.())||999)}catch(_){return 999}}
function applyStats346(m){
 if(!m||!isDivine346(m)||m.divineColorStatApplied346)return false;
 m.stats=m.stats||{};
 for(const k of ['power','speed','stamina','agility','tech','guts']){
  const cur=Number(m.stats[k])||0;
  if(cur>0)m.stats[k]=Math.min(cap346(),Math.max(cur+1,Math.round(cur*1.05)));
  if(m.geneticBase226&&Number.isFinite(Number(m.geneticBase226[k]))){
   const b=Number(m.geneticBase226[k])||0;
   m.geneticBase226[k]=Math.min(cap346(),Math.max(b+1,Math.round(b*1.05)));
  }
 }
 m.divineColorStatApplied346={pct:.05,at:Date.now()};
 return true;
}
function save346(){try{localStorage.setItem(SAVE346,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}

try{
 const prevBaby346=baby;
 baby=function(a,b){
  const c=prevBaby346(a,b);
  if(!c)return c;
  const odds=chance346(a,b);
  c.divineColorOdds346=odds;
  if(Math.random()<odds.chance){
   c.visual=c.visual||{};
   c.visual.color='神彩';
   c.rareVisual243='divine';
  }
  applyStats346(c);
  return c;
 };
}catch(e){console.warn('divine346 baby',e)}

function migrate346(){
 let changed=false;
 for(const m of all346())changed=applyStats346(m)||changed;
 if(changed)save346();
}
function sync346(){
 migrate346();
 try{window.STAR_COLOR341?.sync?.()}catch(_){}
 try{window.STAR_GRADE340?.sync?.()}catch(_){}
 try{window.STAR_RESONANCE344?.sync?.()}catch(_){}
}

const css=document.createElement('style');
css.id='starDivineColor346css';
css.textContent=`
.starColor-divine341 .dracoCanvas,
.starColor-divine341 .speciesCanvas,
.starColor-divine341 .artimg{
 animation:divineHue346 3.6s ease-in-out infinite;
 filter:saturate(1.45) brightness(1.12) contrast(1.06) drop-shadow(0 0 10px #fff0aacc);
}
.starColor-divine341{background:radial-gradient(circle at 50% 28%,#fffbd8,#e9f7ff 42%,#f4e8ff 72%,#fff1c6)!important;box-shadow:inset 0 0 14px #fff,0 0 12px #d8bcff88}
@keyframes divineHue346{
 0%,100%{filter:hue-rotate(0deg) saturate(1.45) brightness(1.12) drop-shadow(0 0 10px #fff0aacc)}
 33%{filter:hue-rotate(80deg) saturate(1.55) brightness(1.16) drop-shadow(0 0 12px #9feaffcc)}
 66%{filter:hue-rotate(230deg) saturate(1.55) brightness(1.14) drop-shadow(0 0 12px #e9aaffcc)}
}
.color-divine341{background:linear-gradient(90deg,#fff3a8,#e5f9ff,#f0e5ff,#fff3a8)!important;border:2px solid #c59b45!important;box-shadow:0 0 10px #ae8cff66!important}
`;
document.head.appendChild(css);

window.STAR_DIVINE_COLOR346={base:BASE346,isDivine:isDivine346,chance:chance346,parentMult:parentMult346,applyStats:applyStats346,sync:sync346};
setTimeout(sync346,0);
})();