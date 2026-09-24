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
  {id:'scale',base:'水晶の鱗',shine:'輝く鱗',phantom:'幻晶ボディ',god:'神晶ボディ',role:'stamina',stats:['stamina','guts'],effect:'スタミナ・こんじょう型'}
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
  {id:'chest',base:'星の羽',shine:'輝く羽',phantom:'天羽体',god:'神羽体',role:'stamina',stats:['stamina','guts'],effect:'スタミナ・こんじょう型'},
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
function hash343(s){
 let h=2166136261;
 for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}
 return Math.abs(h>>>0);
}
function archetype343(m){
 const set=BODY343[m?.species]||BODY343.draco;
 const parts=m?.parts243||{};
 const raw=(m?.species||'')+'|'+Object.entries(parts).sort().map(([k,v])=>k+':'+v).join('|')+'|'+(m?.visual?.part||'');
 return set[hash343(raw)%set.length];
}
function hidden343(m,k){
 const n=Number(m?.hidden233?.[k]);
 return Number.isFinite(n)?Math.max(0,Math.min(7,n)):0;
}
function base343(m){
 const a=archetype343(m);
 return{id:a.id,role:a.role,stats:a.stats,grade:1,name:a.base,effect:a.effect,tier:'base'};
}
function info343(m){return m?.starBody343?.name?m.starBody343:base343(m)}
function grade343(m){return Math.max(1,Math.min(5,Number(info343(m).grade)||1))}
function label343(m){const x=info343(m),g=GRADE343[grade343(m)];return `${g[0]} ${g[1]}・${x.name}`}
function statPct343(g){return g>=5?.12:g===4?.06:g===3?.03:0}
function fullEffect343(m){
 const x=info343(m),g=grade343(m),pct=Math.round(statPct343(g)*100);
 const role=x.effect||'身体特性';
 if(g>=3)return `${role}／得意能力 +${pct}%${g>=4?'／育成・競技にも補正':''}`;
 return role;
}
function persist343(){try{localStorage.setItem(SAVE343,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}

function lineage343(a,b,target){
 let mult=1,reasons=[];
 const aa=info343(a),bb=info343(b);
 if(aa.id===target.id&&bb.id===target.id){mult*=6;reasons.push('同系星体の両親×6')}
 else if(aa.id===target.id||bb.id===target.id){mult*=2;reasons.push('同系星体の親×2')}
 const upper=Math.max(grade343(a),grade343(b));
 if(upper>=3){const x=1+(upper-2)*.6;mult*=x;reasons.push(`上位星体血統×${x.toFixed(1)}`)}
 const hered=Math.max(hidden343(a,'heredity'),hidden343(b,'heredity'));
 const mut=Math.max(hidden343(a,'mutation'),hidden343(b,'mutation'));
 if(hered>=6){const x=hered>=7?2.2:1.5;mult*=x;reasons.push(`遺伝力${hered>=7?'S':'A'}×${x}`)}
 if(mut>=6){const x=mut>=7?2.5:1.6;mult*=x;reasons.push(`変異因子${mut>=7?'S':'A'}×${x}`)}
 return{mult:Math.min(25,mult),reasons};
}
function roll343(c,a,b){
 const ar=archetype343(c),boost=lineage343(a,b,ar);
 const resonanceGod=Number(window.STAR_PATTERN342?.grade?.(c)||1)>=5;
 const godParents=[a,b].filter(p=>grade343(p)>=5).length;
 const godCarry=godParents===2?5:godParents===1?2:1;
 const rows=[
  {tier:'god',grade:5,base:.00002,name:ar.god},
  {tier:'phantom',grade:4,base:.0005,name:ar.phantom},
  {tier:'shine',grade:3,base:.006,name:ar.shine}
 ].map(r=>{
   let chance=Math.min(.08,r.base*boost.mult*(r.tier==='god'?godCarry:1));
   if(r.tier==='god'&&resonanceGod){chance=Math.min(.025,chance*50)}
   const reasons=[...boost.reasons];
   if(r.tier==='god'&&godParents)reasons.push(`神星体親${godParents}体×${godCarry}`);
   if(r.tier==='god'&&resonanceGod)reasons.push('神星紋共鳴×50');
   return {...r,chance,reasons,godCarry:r.tier==='god'?godCarry:1,resonanceBoost:resonanceGod&&r.tier==='god'?50:1};
 });
 const u=Math.random();let acc=0,won=null;
 for(const r of rows){acc+=r.chance;if(u<acc){won=r;break}}
 c.starBodyOdds343=rows.map(r=>({tier:r.tier,base:r.base,mult:boost.mult,chance:r.chance,reasons:r.reasons,godCarry:r.godCarry,resonanceBoost:r.resonanceBoost}));
 if(!won){c.starBody343={id:ar.id,role:ar.role,stats:ar.stats,grade:1,name:ar.base,effect:ar.effect,tier:'base'};return c}
 c.starBody343={id:ar.id,role:ar.role,stats:ar.stats,grade:won.grade,name:won.name,effect:ar.effect,tier:won.tier,chance:won.chance,mult:boost.mult,reasons:won.reasons,godCarry:won.godCarry,resonanceBoost:won.resonanceBoost,at:Date.now()};
 return c;
}

function migrate343(){
 let changed=false;
 for(const m of all343()){
  if(!m.starBody343){m.starBody343=base343(m);changed=true}
 }
 if(changed)persist343();
}
function applyDirect343(m){
 if(!m||m.starBodyStatApplied343)return false;
 const x=info343(m),g=grade343(m),pct=statPct343(g);
 if(!pct||!Array.isArray(x.stats))return false;
 m.stats=m.stats||{};
 for(const k of x.stats){
  const cur=Number(m.stats[k])||0;
  if(cur>0)m.stats[k]=Math.min(cap343(),Math.max(cur+1,Math.round(cur*(1+pct))));
  if(m.geneticBase226&&Number.isFinite(Number(m.geneticBase226[k]))){
   const b=Number(m.geneticBase226[k])||0;
   m.geneticBase226[k]=Math.min(cap343(),Math.max(b+1,Math.round(b*(1+pct))));
  }
 }
 m.starBodyStatApplied343={grade:g,pct,keys:[...x.stats],at:Date.now()};
 return true;
}
function trainingMul343(m,plan,mode,k){
 const x=info343(m),g=grade343(m);
 if(g<3||!x.stats?.includes(k))return 1;
 return g>=5?1.10:g===4?1.06:1.03;
}
function competitionMul343(m,e){
 const x=info343(m),g=grade343(m);
 if(g<3)return 1;
 const roleEvents={
  speed:['50m走','リレー','障害物競走'],
  power:['大玉ころがし','坂道かけあがり','的当て'],
  tech:['的当て','障害物競走','リレー'],
  stamina:['10000m走','坂道かけあがり','大玉ころがし']
 };
 if(!(roleEvents[x.role]||[]).includes(e))return 1;
 return g>=5?1.08:g===4?1.04:1.02;
}

function decorate343(){
 const byId=new Map(all343().map(m=>[m.id,m]));
 document.querySelectorAll('#cands .card[data-id],#breeders .card[data-id],#lineagePool .card[data-id]').forEach(card=>{
  const m=byId.get(card.dataset.id);if(!m)return;
  card.querySelector('.bodyBadge343')?.remove();
  const g=grade343(m),tag=document.createElement('div');
  tag.className='bodyBadge343 bodyGrade343-'+g;
  tag.innerHTML=`<b>${label343(m)}</b><small>${fullEffect343(m)}</small>`;
  (card.querySelector('.patternBadge342')||card.querySelector('.coreMeta243')||card.querySelector('.bd')||card).appendChild(tag);
 });
 const birth=document.querySelector('#birth .hatchReveal'),latest=(S?.cands||[])[(S?.cands||[]).length-1];
 if(birth){
  birth.querySelector('.birthBody343')?.remove();
  if(latest&&grade343(latest)>=3){
   const tag=document.createElement('div');tag.className='birthBody343 bodyGrade343-'+grade343(latest);
   tag.innerHTML=`<b>${label343(latest)}</b><small>${fullEffect343(latest)}</small>`;
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
 info:info343,grade:grade343,label:label343,effect:fullEffect343,
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