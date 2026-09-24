(()=>{
// v0.32.06: Star Body system.
// Converts inherited part combinations into species-specific body traits with upper tiers,
// meaningful permanent stats, training/competition identity, and rarity UI.
if(window.STAR_BODY343)return;

const SAVE343='star-athletes-save-v200';
const GRADE343={1:['★','通常'],2:['★★','希少'],3:['★★★','輝星'],4:['★★★★','幻星'],5:['★★★★★','神星']};

const BODY343={
 draco:[
  {id:'horn',base:'竜の角',shine:'王者の角',phantom:'天空の角',god:'神角',role:'power',stats:['power','guts'],effect:'ちから・こんじょう型'},
  {id:'wing',base:'風の翼',shine:'光の翼',phantom:'天空の翼',god:'神翼',role:'speed',stats:['speed','agility'],effect:'スピード・すばやさ型'},
  {id:'tail',base:'星の尾',shine:'彗星の尾',phantom:'天空の尾',god:'神尾',role:'tech',stats:['tech','agility'],effect:'テクニック・すばやさ型'},
  {id:'scale',base:'水晶の鱗',shine:'輝く鱗',phantom:'幻晶の鱗',god:'神晶の鱗',role:'stamina',stats:['stamina','guts'],effect:'スタミナ・こんじょう型'}
 ],
 unil:[
  {id:'horn',base:'俊敏の角',shine:'光の角',phantom:'天空の角',god:'神角',role:'power',stats:['power','tech'],effect:'ちから・テクニック型'},
  {id:'mane',base:'風のたてがみ',shine:'疾風のたてがみ',phantom:'天空のたてがみ',god:'神風のたてがみ',role:'speed',stats:['speed','agility'],effect:'スピード・すばやさ型'},
  {id:'ear',base:'星の耳',shine:'輝く耳',phantom:'天空の耳',god:'神聴の耳',role:'tech',stats:['tech','agility'],effect:'テクニック・すばやさ型'},
  {id:'tail',base:'流れる尾',shine:'光の尾',phantom:'天空の尾',god:'神尾',role:'stamina',stats:['stamina','guts'],effect:'スタミナ・こんじょう型'}
 ],
 grimo:[
  {id:'beak',base:'鋭いくちばし',shine:'王者のくちばし',phantom:'天空のくちばし',god:'神鳥のくちばし',role:'tech',stats:['tech','power'],effect:'テクニック・ちから型'},
  {id:'wing',base:'大きな翼',shine:'光の翼',phantom:'天空の翼',god:'神翼',role:'speed',stats:['speed','agility'],effect:'スピード・すばやさ型'},
  {id:'chest',base:'星の羽',shine:'輝く羽',phantom:'天空の羽',god:'神羽',role:'stamina',stats:['stamina','guts'],effect:'スタミナ・こんじょう型'},
  {id:'crest',base:'冠羽',shine:'王者の冠羽',phantom:'天空の冠羽',god:'神鳥の冠羽',role:'power',stats:['power','guts'],effect:'ちから・こんじょう型'}
 ],
 puru:[
  {id:'ear',base:'長い耳',shine:'光の耳',phantom:'天空の耳',god:'神速の耳',role:'speed',stats:['speed','agility'],effect:'スピード・すばやさ型'},
  {id:'tail',base:'流れる尾',shine:'光の尾',phantom:'天空の尾',god:'神尾',role:'power',stats:['power','guts'],effect:'ちから・こんじょう型'},
  {id:'clear',base:'透明ボディ',shine:'輝くボディ',phantom:'幻晶ボディ',god:'神晶ボディ',role:'stamina',stats:['stamina','tech'],effect:'スタミナ・テクニック型'},
  {id:'core',base:'星のコア',shine:'輝くコア',phantom:'天空のコア',god:'神星のコア',role:'tech',stats:['tech','guts'],effect:'テクニック・こんじょう型'}
 ]
};

function cap343(){try{return Math.max(999,Number(window.STAR_LIMIT278?.cap?.())||999)}catch(_){return 999}}
function all343(){
 const out=[],seen=new Set();
 for(const key of ['starters','nest','lineage','released','cands','foster']){
  for(const m of(S?.[key]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);out.push(m)}
 }
 if(S?.egg&&!seen.has(S.egg.id))out.push(S.egg);
 return out;
}
function bodySet343(m){return BODY343[m?.species]||BODY343.draco}
function hidden343(m,k){const n=Number(m?.hidden233?.[k]);return Number.isFinite(n)?Math.max(0,Math.min(7,n)):0}
function baseTrait343(a){return{id:a.id,role:a.role,stats:[...a.stats],grade:1,name:a.base,effect:a.effect,tier:'base'}}
function traits343(m){
 const set=bodySet343(m);
 if(m?.starBodies343&&typeof m.starBodies343==='object')return set.map(a=>m.starBodies343[a.id]||baseTrait343(a));
 if(m?.starBody343?.name){
  return set.map(a=>a.id===m.starBody343.id?m.starBody343:baseTrait343(a));
 }
 return set.map(baseTrait343);
}
function info343(m){
 const xs=traits343(m);
 return xs.slice().sort((a,b)=>(Number(b.grade)||1)-(Number(a.grade)||1))[0]||baseTrait343(bodySet343(m)[0]);
}
function grade343(m){return Math.max(...traits343(m).map(x=>Math.max(1,Math.min(5,Number(x.grade)||1))),1)}
function traitGrade343(x){return Math.max(1,Math.min(5,Number(x?.grade)||1))}
function traitLabel343(x){const g=traitGrade343(x),z=GRADE343[g];return `${z[0]} ${z[1]}・${x.name}`}
function label343(m){return traitLabel343(info343(m))}
function statPct343(g){return g>=5?.06:g===4?.03:g===3?.015:0}
function godCount343(m){return traits343(m).filter(x=>traitGrade343(x)>=5).length}
function godCompletion343(m){const n=godCount343(m);return n>=4?{count:n,name:'神体完成',allPct:.04}:n>=3?{count:n,name:'三神体',allPct:0}:n>=2?{count:n,name:'双神体',allPct:0}:{count:n,name:'',allPct:0}}
function traitEffect343(x){
 const g=traitGrade343(x),pct=Math.round(statPct343(g)*100),role=x?.effect||'身体特性';
 if(g>=3)return `${role}／得意能力 +${pct}%${g>=4?'／育成・競技にも補正':''}`;
 return role;
}
function fullEffect343(m){return traitEffect343(info343(m))}
function persist343(){try{localStorage.setItem(SAVE343,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function parentTrait343(p,id){return traits343(p).find(x=>x.id===id)||null}
function lineage343(a,b,target){
 let mult=1,reasons=[];
 const aa=parentTrait343(a,target.id),bb=parentTrait343(b,target.id);
 const ga=traitGrade343(aa),gb=traitGrade343(bb);
 if(aa&&bb){mult*=6;reasons.push('同部位の両親×6')}
 else if(aa||bb){mult*=2;reasons.push('同部位の親×2')}
 const upper=Math.max(ga,gb);
 if(upper>=3){const x=1+(upper-2)*.6;mult*=x;reasons.push(`上位部位血統×${x.toFixed(1)}`)}
 const hered=Math.max(hidden343(a,'heredity'),hidden343(b,'heredity'));
 const mut=Math.max(hidden343(a,'mutation'),hidden343(b,'mutation'));
 if(hered>=6){const x=hered>=7?2.2:1.5;mult*=x;reasons.push(`遺伝力${hered>=7?'S':'A'}×${x}`)}
 if(mut>=6){const x=mut>=7?2.5:1.6;mult*=x;reasons.push(`変異因子${mut>=7?'S':'A'}×${x}`)}
 return{mult:Math.min(25,mult),reasons};
}
function rollTrait343(c,a,b,ar){
 const pa=parentTrait343(a,ar.id),pb=parentTrait343(b,ar.id),boost=lineage343(a,b,ar);
 const resonanceGod=Number(window.STAR_PATTERN342?.grade?.(c)||1)>=5;
 const godParents=[pa,pb].filter(p=>traitGrade343(p)>=5).length;
 const godCarry=godParents===2?5:godParents===1?2:1;
 const rows=[{tier:'god',grade:5,base:.00002,name:ar.god},{tier:'phantom',grade:4,base:.0005,name:ar.phantom},{tier:'shine',grade:3,base:.006,name:ar.shine}].map(q=>{
  let chance=Math.min(.08,q.base*boost.mult*(q.tier==='god'?godCarry:1));
  if(q.tier==='god'&&resonanceGod)chance=Math.min(.025,chance*50);
  return{...q,chance,reasons:[...boost.reasons],godCarry:q.tier==='god'?godCarry:1};
 });
 const inherited=[pa,pb].filter(Boolean).sort((x,y)=>traitGrade343(y)-traitGrade343(x))[0];
 // Each slot is inherited independently; upper parent traits have a real carry chance.
 if(inherited&&traitGrade343(inherited)>=3&&Math.random()<(traitGrade343(inherited)>=5?.30:traitGrade343(inherited)===4?.22:.15)){
  return{...inherited,id:ar.id,role:ar.role,stats:[...ar.stats],effect:ar.effect,fromParent:true};
 }
 const u=Math.random();let acc=0,won=null;for(const q of rows){acc+=q.chance;if(u<acc){won=q;break}}
 if(!won)return baseTrait343(ar);
 return{id:ar.id,role:ar.role,stats:[...ar.stats],grade:won.grade,name:won.name,effect:ar.effect,tier:won.tier,chance:won.chance,mult:boost.mult,reasons:won.reasons,at:Date.now()};
}
function roll343(c,a,b){
 c.starBodies343={};c.starBodyOdds343={};
 for(const ar of bodySet343(c)){
  const x=rollTrait343(c,a,b,ar);c.starBodies343[ar.id]=x;
  c.starBodyOdds343[ar.id]={grade:x.grade,tier:x.tier,chance:x.chance||0,reasons:x.reasons||[]};
 }
 // Remove the obsolete single-body source of truth.
 delete c.starBody343;
 return c;
}

function migrate343(){
 let changed=false;
 for(const m of all343()){
  if(!m.starBodies343||typeof m.starBodies343!=='object'){
   const old=m.starBody343,bag={};
   for(const ar of bodySet343(m))bag[ar.id]=(old?.id===ar.id?old:baseTrait343(ar));
   m.starBodies343=bag;delete m.starBody343;changed=true;
  }
 }
 if(changed)persist343();
}
function applyDirect343(m){
 if(!m||m.starBodiesStatApplied343)return false;
 const bonuses={};
 for(const x of traits343(m)){const g=traitGrade343(x),pct=statPct343(g);if(!pct)continue;for(const k of(x.stats||[])){if(g>=5)bonuses[k]=(bonuses[k]||0)+pct;else bonuses[k]=Math.max(bonuses[k]||0,pct)}}
 const completion=godCompletion343(m);if(completion.allPct)for(const k of['speed','power','stamina','tech','agility','guts'])bonuses[k]=(bonuses[k]||0)+completion.allPct
 if(!Object.keys(bonuses).length)return false;
 m.stats=m.stats||{};
 for(const [k,pct] of Object.entries(bonuses)){const cur=Number(m.stats[k])||0;if(cur>0)m.stats[k]=Math.min(cap343(),Math.max(cur+1,Math.round(cur*(1+pct))))}
 m.starBodiesStatApplied343={bonuses,godCount:completion.count,completion:completion.name,at:Date.now()};return true;
}
function trainingMul343(m,plan,mode,k){
 let best=1,god=0;for(const x of traits343(m)){if(!(x.stats||[]).includes(k))continue;const g=traitGrade343(x);if(g>=5)god++;else best=Math.max(best,g===4?1.03:g===3?1.015:1)}return best+(god*.05);
}
function competitionMul343(m,e){
 const roleEvents={speed:['50m走','リレー','障害物競走'],power:['大玉ころがし','坂道かけあがり','的当て'],tech:['的当て','障害物競走','リレー'],stamina:['10000m走','坂道かけあがり','大玉ころがし']};
 let best=1,god=0;for(const x of traits343(m)){if(!(roleEvents[x.role]||[]).includes(e))continue;const g=traitGrade343(x);if(g>=5)god++;else best=Math.max(best,g===4?1.02:g===3?1.01:1)}return best+(god*.04);
}

function decorate343(){
const birth=document.querySelector('#birth .hatchReveal'),latest=(S?.cands||[])[(S?.cands||[]).length-1];
 if(birth){
  birth.querySelector('.birthBody343')?.remove();
  if(latest&&grade343(latest)>=3){
   const tag=document.createElement('div');tag.className='birthBody343 bodyGrade343-'+grade343(latest);
   tag.innerHTML=traits343(latest).filter(x=>traitGrade343(x)>=3).map(x=>`<b>${traitLabel343(x)}</b><small>${traitEffect343(x)}</small>`).join('');
   (birth.querySelector('.birthPattern342')||birth.querySelector('.birthColor341')||birth.querySelector('.hatchName'))?.after(tag);
  }
 }
}
function sync343(){
 migrate343();
 let changed=false;for(const m of all343())changed=applyDirect343(m)||changed;
 if(changed)persist343();
 decorate343();
 try{window.STAR_GRADE340?.sync?.()}catch(_){}
}

window.STAR_BODY343={
 info:info343,grade:grade343,label:label343,effect:fullEffect343,traits:traits343,traitGrade:traitGrade343,traitLabel:traitLabel343,traitEffect:traitEffect343,godCount:godCount343,godCompletion:godCompletion343,
 birth:roll343,trainingMul:trainingMul343,competitionMul:competitionMul343,applyDirect:applyDirect343,sync:sync343
};

const css=document.createElement('style');
css.id='starBody343css';
css.textContent=`
.bodyBadge343{margin-top:5px;padding:5px 6px;border-radius:8px;background:#f7f7f4;border:1px solid #d7d7cf}
.bodyBadge343 b,.bodyBadge343 small{display:block}.bodyBadge343 b{font-size:7px}.bodyBadge343 small{margin-top:2px;font-size:6px;color:#68737d}
.bodyGrade343-3{background:#fff5ca;border-color:#d5b64c}
.bodyGrade343-4{background:linear-gradient(90deg,#eefaff,#f2eaff);border-color:#a68cca;box-shadow:0 0 8px #9c7bd533}
.bodyGrade343-5{background:linear-gradient(90deg,#fff0aa,#eee4ff,#dffaff);border-color:#b48b43;box-shadow:0 0 11px #9275d95c}
.birthBody343{width:min(300px,90%);margin:6px auto;padding:7px 9px;border-radius:10px;text-align:center}
.birthBody343 b,.birthBody343 small{display:block}.birthBody343 b{font-size:10px}.birthBody343 small{margin-top:2px;font-size:6px;color:#5d6875}
`;
document.head.appendChild(css);
migrate343();setTimeout(sync343,0);
})();