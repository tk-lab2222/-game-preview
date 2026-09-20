(()=>{
// v0.31.11: single skill row + restore guaranteed species scouting on current tournament flow.
const SAVE298='star-athletes-save-v200';
const SPECIES298=['draco','unil','grimo','puru'];
const NAMES298={draco:'ノヴァ',unil:'ルミ',grimo:'フェル',puru:'しずく'};
function persist298(){try{localStorage.setItem(SAVE298,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.warn('save298',e)}}
function owned298(){
 const set=new Set();
 for(const k of ['starters','nest','lineage','cands','foster','released'])for(const m of(S?.[k]||[]))if(m?.species)set.add(m.species);
 return set;
}
function hideDuplicateSkills298(){
 document.querySelectorAll('.breedSkill254,.skillCore210,.skillLine246,.skillCard235,.skillCard241,.skillMini241,.skillHost246').forEach(el=>{el.style.display='none'});
 document.querySelectorAll('.coreMeta243>div').forEach(el=>{if((el.textContent||'').includes('SKILL'))el.style.display='none'});
}
function eligibleMilestone298(){
 const hist=Array.isArray(S?.seasonHistory)?S.seasonHistory:[];
 S.speciesScout298=S.speciesScout298||{first:false,third:false};
 if(hist.length>=1&&!S.speciesScout298.first)return'first';
 if(hist.length>=3&&!S.speciesScout298.third)return'third';
 return null;
}
function awardScout298(){
 const key=eligibleMilestone298();if(!key)return null;
 const missing=SPECIES298.filter(sp=>!owned298().has(sp));if(!missing.length){S.speciesScout298[key]=true;persist298();return null}
 const sp=missing[Math.floor(Math.random()*missing.length)];
 if(typeof monster!=='function')return null;
 const gen=Math.max(0,...['nest','lineage','starters'].flatMap(k=>(S?.[k]||[]).map(m=>Number(m?.gen)||0)));
 const m=monster(sp,NAMES298[sp],gen);
 m.origin='大会スカウト';
 m.rarity=key==='first'?'U':'R';
 S.lineage=Array.isArray(S.lineage)?S.lineage:[];
 S.lineage.push(m);
 S.speciesScout298[key]=true;
 persist298();
 return m;
}
function appendScoutNotice298(m){
 if(!m)return;
 const result=document.getElementById('result');if(!result)return;
 const name=(typeof SP!=='undefined'&&SP[m.species])?SP[m.species][0]:m.species;
 const box=document.createElement('div');
 box.className='scoutNotice298';
 box.innerHTML=`🎁 <b>大会スカウト！</b><br>${name}「${m.name}」が血統アーカイブに加入！`;
 result.appendChild(box);
}
let lastHist298=Array.isArray(S?.seasonHistory)?S.seasonHistory.length:0;
function checkScout298(){
 const n=Array.isArray(S?.seasonHistory)?S.seasonHistory.length:0;
 if(n<=lastHist298)return;
 lastHist298=n;
 const m=awardScout298();
 if(m){appendScoutNotice298(m);try{render()}catch(_){}}
}
const result=document.getElementById('result');
if(result){
 const mo=new MutationObserver(()=>{setTimeout(checkScout298,0);setTimeout(hideDuplicateSkills298,0)});
 mo.observe(result,{childList:true,subtree:true});
}
try{
 const prev=render;
 render=function(){const out=prev();[0,40,120].forEach(ms=>setTimeout(hideDuplicateSkills298,ms));return out};
}catch(e){console.warn('render298',e)}
const css=document.createElement('style');
css.id='skillScout298';
css.textContent=`
.breedSkill254,.skillCore210,.skillLine246,.skillCard235,.skillCard241,.skillMini241,.skillHost246{display:none!important}
.scoutNotice298{margin-top:9px;padding:10px;border:2px solid #d5a72d;border-radius:12px;background:#fff6bf;color:#3a2a00;font-size:9px;line-height:1.55}
.scoutNotice298 b{font-size:11px}
`;
document.head.appendChild(css);
[0,80,250].forEach(ms=>setTimeout(hideDuplicateSkills298,ms));
})();