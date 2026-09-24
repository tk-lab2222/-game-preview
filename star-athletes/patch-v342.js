(()=>{
// v0.32.05: Star Pattern system.
// Converts legacy visual patterns into Japanese game-facing traits, adds upper pattern tiers,
// breeding discovery odds, gameplay hooks, and compact/detail UI.
if(window.STAR_PATTERN342)return;

const SAVE342='star-athletes-save-v200';
const BASE342={
 'なし':{id:'plain',name:'無紋',grade:1,effect:'安定型・補正なし'},
 '縞':{id:'stream',name:'流線模様',grade:1,effect:'スピード・すばやさ育成 +3%'},
 '斑点':{id:'speck',name:'星の斑点',grade:2,effect:'大成功・超成功率 微増'},
 '炎':{id:'flame',name:'炎模様',grade:2,effect:'高負荷育成 成功時 +5%／ケガ率 +1pt'},
 '雷':{id:'thunder',name:'雷模様',grade:2,effect:'50m走・リレー適性 +2%'},
 '星':{id:'star',name:'星模様',grade:2,effect:'スキル習得率 +2pt'}
};
const UPPER342={
 stream:{shine:{id:'lightstream',name:'光の流線',grade:3,effect:'スピード・すばやさ育成 +5%'},phantom:{id:'comet',name:'彗星の流線',grade:4,effect:'スピード・すばやさ育成 +7%／50m走適性 +2%'},god:{id:'godstream',name:'神速の流線',grade:5,effect:'高速系育成 +15%／瞬発競技 +8%'}},
 speck:{shine:{id:'brightspeck',name:'輝く斑点',grade:3,effect:'大成功・超成功率 上昇'},phantom:{id:'moon',name:'月光の斑点',grade:4,effect:'大成功・超成功率 大幅上昇'},god:{id:'godmoon',name:'神月の斑点',grade:5,effect:'大成功 +8pt／超成功 +5pt'}},
 flame:{shine:{id:'hellflame',name:'獄炎模様',grade:3,effect:'高負荷成功時 +8%／ケガ率 +1pt'},phantom:{id:'sun',name:'太陽の炎',grade:4,effect:'高負荷成功時 +10%／大成功率UP'},god:{id:'godsun',name:'神炎',grade:5,effect:'高負荷育成 +18%／超成功 +4pt'}},
 thunder:{shine:{id:'heaventhunder',name:'稲妻模様',grade:3,effect:'50m走・リレー適性 +3%'},phantom:{id:'storm',name:'天雷模様',grade:4,effect:'瞬発競技適性 +4%'},god:{id:'godthunder',name:'神雷',grade:5,effect:'50m走・リレー適性 +10%'}},
 star:{shine:{id:'heavenstar',name:'輝星模様',grade:3,effect:'スキル習得率 +4pt'},phantom:{id:'galaxy',name:'銀河模様',grade:4,effect:'スキル習得率 +6pt／特殊血統に好影響'},god:{id:'godstar',name:'神星模様',grade:5,effect:'スキル習得率 +15pt／特殊血統 ×1.35'}},
 plain:{shine:{id:'clear',name:'澄み模様',grade:3,effect:'育成失敗・ケガをわずかに抑制'},phantom:{id:'void',name:'幻影模様',grade:4,effect:'安定性特化の希少紋'},god:{id:'godplain',name:'神秘模様',grade:5,effect:'ケガ率 -5pt／育成 +8%'}}
};
const GRADE342={1:['★','通常'],2:['★★','希少'],3:['★★★','輝星'],4:['★★★★','幻星'],5:['★★★★★','神星']};
const LEGACY_BY_NAME342={};
for(const [legacy,b] of Object.entries(BASE342))LEGACY_BY_NAME342[b.name]={legacy,base:b.id,grade:b.grade,name:b.name,effect:b.effect};
for(const [base,tiers] of Object.entries(UPPER342))for(const t of Object.values(tiers))LEGACY_BY_NAME342[t.name]={legacy:null,base,grade:t.grade,name:t.name,effect:t.effect,id:t.id};

function cap342(){try{return Math.max(999,Number(window.STAR_LIMIT278?.cap?.())||999)}catch(_){return 999}}
function all342(){
 const out=[],seen=new Set();
 for(const key of ['starters','nest','lineage','released','cands','foster']){
  for(const m of(S?.[key]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);out.push(m)}
 }
 if(S?.egg&&!seen.has(S.egg.id))out.push(S.egg);
 return out;
}
function hidden342(m,k){const n=Number(m?.hidden233?.[k]);return Number.isFinite(n)?Math.max(0,Math.min(7,n)):0}
function baseInfo342(m){
 const p=m?.visual?.pattern||'なし';
 if(LEGACY_BY_NAME342[p])return LEGACY_BY_NAME342[p];
 const b=BASE342[p]||BASE342['なし'];
 return{legacy:p,base:b.id,grade:b.grade,name:b.name,effect:b.effect};
}
function info342(m){
 if(m?.starPattern342&&m.starPattern342.name)return m.starPattern342;
 const b=baseInfo342(m);
 return{id:b.id||b.base,base:b.base||b.id,grade:b.grade,name:b.name,effect:b.effect,tier:b.grade>=3?'upper':'base'};
}
function persist342(){try{localStorage.setItem(SAVE342,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function rename342(m){
 const names={'流線紋':'流線模様','斑星紋':'星の斑点','炎紋':'炎模様','雷紋':'雷模様','星紋':'星模様','光流紋':'光の流線','彗星紋':'彗星の流線','神駆紋':'神速の流線','煌斑紋':'輝く斑点','月輪紋':'月光の斑点','神月紋':'神月の斑点','獄炎紋':'獄炎模様','日輪紋':'太陽の炎','神陽紋':'神炎','天雷紋':'稲妻模様','天嵐紋':'天雷模様','神雷紋':'神雷','天星紋':'輝星模様','銀河紋':'銀河模様','神紋':'神星模様','澄紋':'澄み模様','空輪紋':'幻影模様','無極紋':'神秘模様'};
 let changed=false;
 if(m?.starPattern342?.name&&names[m.starPattern342.name]){m.starPattern342.name=names[m.starPattern342.name];changed=true}
 if(m?.visual?.pattern&&names[m.visual.pattern]){m.visual.pattern=names[m.visual.pattern];changed=true}
 return changed;
}
function migrate342(){
 let changed=false;
 for(const m of all342()){
  if(!m?.visual)continue;
  if(rename342(m))changed=true;
  if(!m.starPattern342){
   const b=baseInfo342(m);
   m.starPattern342={id:b.id||b.base,base:b.base||b.id,grade:b.grade,name:b.name,effect:b.effect,tier:b.grade>=3?'upper':'base'};
   changed=true;
  }
 }
 if(changed)persist342();
}

function grade342(m){return Math.max(1,Math.min(5,Number(info342(m).grade)||1))}
function label342(m){const x=info342(m),g=GRADE342[grade342(m)];return `${g[0]} ${g[1]}・${x.name}`}
function effect342(m){return info342(m).effect||''}

function lineageMult342(a,b,base){
 let mult=1,reasons=[];
 const ia=info342(a),ib=info342(b);
 if(ia.base===base&&ib.base===base){mult*=6;reasons.push('同系紋の両親×6')}
 else if(ia.base===base||ib.base===base){mult*=2;reasons.push('同系紋の親×2')}
 const upper=Math.max(grade342(a),grade342(b));
 if(upper>=3){mult*=1+(upper-2)*.5;reasons.push(`上位紋血統×${(1+(upper-2)*.5).toFixed(1)}`)}
 const mut=Math.max(hidden342(a,'mutation'),hidden342(b,'mutation'));
 const luck=Math.max(hidden342(a,'luck'),hidden342(b,'luck'));
 if(mut>=6){const x=mut>=7?3:1.8;mult*=x;reasons.push(`変異因子${mut>=7?'S':'A'}×${x}`)}
 if(luck>=6){const x=luck>=7?1.8:1.35;mult*=x;reasons.push(`LUCK ${luck>=7?'S':'A'}×${x}`)}
 return{mult:Math.min(25,mult),reasons};
}
function rollUpper342(c,a,b){
 const base=info342(c).base;
 const set=UPPER342[base]||UPPER342.plain;
 const boost=lineageMult342(a,b,base);
 // Deliberately tiny raw rates. Bloodline design raises them into a realistically targetable range.
 const godParents=[a,b].filter(p=>grade342(p)>=5).length;
 const godCarry=godParents===2?5:godParents===1?2:1;
 const rows=[
  {tier:'god',base:.00002},
  {tier:'phantom',base:.0005},
  {tier:'shine',base:.006}
 ].map(r=>{
   const chance=Math.min(.08,r.base*boost.mult*(r.tier==='god'?godCarry:1));
   const reasons=[...boost.reasons];
   if(r.tier==='god'&&godParents)reasons.push(`神星紋親${godParents}体×${godCarry}`);
   return {...r,chance,reasons,godCarry:r.tier==='god'?godCarry:1};
 });
 const u=Math.random();let acc=0,won=null;
 for(const r of rows){acc+=r.chance;if(u<acc){won=r;break}}
 c.starPatternOdds342=rows.map(r=>({tier:r.tier,base:r.base,mult:boost.mult,chance:r.chance,reasons:r.reasons,godCarry:r.godCarry}));
 if(!won)return c;
 const x=set[won.tier];
 c.starPattern342={id:x.id,base,grade:x.grade,name:x.name,effect:x.effect,tier:won.tier,chance:won.chance,mult:boost.mult,reasons:won.reasons,godCarry:won.godCarry,at:Date.now()};
 c.visual.pattern=x.name;
 return c;
}
function trainingMul342(m,plan,mode,k){
 const x=info342(m),g=grade342(m);
 if(x.base==='stream'&&(plan==='speed'||k==='speed'||k==='agility'))return g>=5?1.15:g===4?1.07:g===3?1.05:1.03;
 if(x.base==='flame'&&mode==='high')return g>=5?1.18:g===4?1.10:g===3?1.08:1.05;
 if(x.base==='plain'&&g>=5)return 1.08;
 return 1;
}
function injuryAdd342(m,mode){
 const x=info342(m),g=grade342(m);
 if(mode==='high'&&x.base==='flame'&&g<=3)return .01;
 if(x.base==='plain'&&g>=3)return g>=5?-.05:g===4?-.015:-.008;
 return 0;
}
function successBonus342(m,mode,kind){
 const x=info342(m),g=grade342(m);
 if(x.base==='speck')return kind==='ultra'?(g>=5?.05:g===4?.012:g===3?.007:.003):(g>=5?.08:g===4?.025:g===3?.015:.007);
 if(x.base==='flame'&&mode==='high'&&g>=4)return kind==='ultra'?(g>=5?.04:.006):(g>=5?.04:.015);
 return 0;
}
function competitionMul342(m,e){
 const x=info342(m),g=grade342(m);
 if(x.base==='thunder'&&(e==='50m走'||e==='リレー'))return g>=5?1.10:g===4?1.04:g===3?1.03:1.02;
 if(x.id==='comet'&&e==='50m走')return 1.02;
 if(x.id==='godstream'&&(e==='50m走'||e==='リレー'))return 1.08;
 return 1;
}
function skillChance342(m){
 const x=info342(m),g=grade342(m);
 if(x.base!=='star')return 0;
 return g>=5?.15:g===4?.06:g===3?.04:.02;
}
function rareRecipeMul342(m){
 const x=info342(m),g=grade342(m);
 if(x.base!=='star'||g<4)return 1;
 return g>=5?1.35:1.10;
}

function directStats342(m){
 const x=info342(m),g=grade342(m);
 if(g<4)return[];
 const map={
  stream:['speed','agility'],speck:['tech','agility'],flame:['power','guts'],
  thunder:['speed','agility'],star:['tech','guts'],plain:['stamina','guts']
 };
 return map[x.base]||[];
}
function applyDirect342(m){
 if(!m||m.starPatternStatApplied342)return false;
 const g=grade342(m);if(g<4)return false;
 const keys=directStats342(m),pct=g>=5?.10:.05;
 if(!keys.length)return false;
 m.stats=m.stats||{};
 for(const k of keys){
  const cur=Number(m.stats[k])||0;
  if(cur>0)m.stats[k]=Math.min(cap342(),Math.max(cur+1,Math.round(cur*(1+pct))));
  if(m.geneticBase226&&Number.isFinite(Number(m.geneticBase226[k]))){
   const b=Number(m.geneticBase226[k])||0;
   m.geneticBase226[k]=Math.min(cap342(),Math.max(b+1,Math.round(b*(1+pct))));
  }
 }
 m.starPatternStatApplied342={grade:g,pct,keys,at:Date.now()};
 return true;
}

function decorate342(){
const birth=document.querySelector('#birth .hatchReveal'),latest=(S?.cands||[])[(S?.cands||[]).length-1];
 if(birth){
  birth.querySelector('.birthPattern342')?.remove();
  if(latest&&grade342(latest)>=3){
   const tag=document.createElement('div');tag.className='birthPattern342 patternGrade342-'+grade342(latest);
   tag.innerHTML=`<b>${label342(latest)}</b><small>${effect342(latest)}</small>`;
   (birth.querySelector('.birthColor341')||birth.querySelector('.hatchName'))?.after(tag);
  }
 }
}

function sync342(){migrate342();let changed=false;for(const m of all342())changed=applyDirect342(m)||changed;if(changed)persist342();decorate342();try{window.STAR_GRADE340?.sync?.()}catch(_){}}

window.STAR_PATTERN342={
 info:info342,grade:grade342,label:label342,effect:effect342,applyDirect:applyDirect342,
 trainingMul:trainingMul342,injuryAdd:injuryAdd342,successBonus:successBonus342,
 competitionMul:competitionMul342,skillChance:skillChance342,rareRecipeMul:rareRecipeMul342,
 birth:(c,a,b)=>{if(!c?.visual)return c;if(!c.starPattern342){const bi=baseInfo342(c);c.starPattern342={id:bi.id||bi.base,base:bi.base||bi.id,grade:bi.grade,name:bi.name,effect:bi.effect,tier:'base'}}return rollUpper342(c,a,b)},
 sync:sync342
};

const css=document.createElement('style');
css.id='starPattern342css';
css.textContent=`
.patternBadge342{margin-top:5px;padding:5px 6px;border-radius:8px;background:#f6f7f8;border:1px solid #d5dce3}
.patternBadge342 b,.patternBadge342 small{display:block}.patternBadge342 b{font-size:7px}.patternBadge342 small{margin-top:2px;font-size:6px;color:#6c7784}
.patternGrade342-2{background:#f4f7ff;border-color:#b9c6da}
.patternGrade342-3{background:#fff6cf;border-color:#d8ba4c}
.patternGrade342-4{background:linear-gradient(90deg,#e9f8ff,#f2e8ff);border-color:#a88bc9;box-shadow:0 0 8px #9d80cc33}
.patternGrade342-5{background:linear-gradient(90deg,#fff0ad,#eee4ff,#dffaff);border-color:#b68d44;box-shadow:0 0 10px #9274d955}
.birthPattern342{width:min(300px,90%);margin:6px auto;padding:7px 9px;border-radius:10px;text-align:center}
.birthPattern342 b,.birthPattern342 small{display:block}.birthPattern342 b{font-size:10px;color:#2d3540;text-shadow:none}.birthPattern342 small{margin-top:2px;font-size:6px;color:#5f6d7b}.birthPattern342.patternGrade342-3 b{color:#594500}.birthPattern342.patternGrade342-4 b{color:#44335f}.birthPattern342.patternGrade342-5 b{color:#503a12}
`;
document.head.appendChild(css);

migrate342();setTimeout(sync342,0);
})();