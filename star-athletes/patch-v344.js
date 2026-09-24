(()=>{
// v0.32.07: Star Resonance.
// Combines Star Color x Star Pattern x Star Body into a shareable title with real gameplay value.
if(window.STAR_RESONANCE344)return;

const SAVE344='star-athletes-save-v200';
const GRADE344={3:{name:'輝星共鳴',stars:'★★★'},4:{name:'幻星共鳴',stars:'★★★★'},5:{name:'神星共鳴',stars:'★★★★★'}};

function cap344(){try{return Math.max(999,Number(window.STAR_LIMIT278?.cap?.())||999)}catch(_){return 999}}
function all344(){
 const out=[],seen=new Set();
 for(const key of ['starters','nest','lineage','released','cands','foster']){
  for(const m of(S?.[key]||[]))if(m&&(m.id==null||!seen.has(m.id))){if(m.id!=null)seen.add(m.id);out.push(m)}
 }
 if(S?.egg&&(S.egg.id==null||!seen.has(S.egg.id)))out.push(S.egg);
 return out;
}
function colorTier344(m){try{return window.STAR_COLOR341?.tier?.(m)||'normal'}catch(_){return'normal'}}
function colorGrade344(m){
 const t=colorTier344(m),meta=window.STAR_COLOR341?.meta?.[t];
 return Math.max(1,Math.min(5,Number(meta?.grade)||1));
}
function pattern344(m){try{return window.STAR_PATTERN342?.info?.(m)||{base:'plain',grade:1,name:'無紋'}}catch(_){return{base:'plain',grade:1,name:'無紋'}}}
function body344(m){try{return window.STAR_BODY343?.info?.(m)||{role:'',grade:1,name:''}}catch(_){return{role:'',grade:1,name:''}}}
function grades344(m){
 const p=pattern344(m),b=body344(m);
 return{color:colorGrade344(m),pattern:Number(p.grade)||1,body:Number(b.grade)||1};
}
function resonanceGrade344(m){
 const g=Object.values(grades344(m)).sort((a,b)=>b-a);
 if(g.filter(x=>x>=5).length>=2)return 5;
 if((g[0]>=5&&g[1]>=4)||g.every(x=>x>=4))return 4;
 if(g.filter(x=>x>=3).length>=2)return 3;
 return 0;
}
function title344(m){
 const c=colorTier344(m),p=pattern344(m),b=body344(m),g=resonanceGrade344(m);
 if(!g)return'';
 if(c==='gold'&&p.base==='thunder'&&b.role==='power')return'黄金雷帝';
 if(c==='gold'&&p.base==='flame'&&b.role==='power')return'黄金烈王';
 if(c==='prism'&&p.base==='stream'&&b.role==='speed')return'星虹の天駆';
 if(c==='prism'&&p.base==='star'&&b.role==='tech')return'星虹天星';
 if(c==='mutation'&&p.base==='speck'&&(b.role==='tech'||b.role==='stamina'))return'幻月異相';
 if(g===5&&c==='divine'&&p.base==='star')return'神彩星帝';
 if(g===5&&c==='divine'&&p.base==='thunder')return'神彩雷皇';
 if(g===5&&c==='divine')return'神彩天王';
 if(g===5&&c==='prism')return'神虹星皇';
 if(g===5&&c==='gold')return'黄金神王';
 if(g===5&&c==='mutation')return'幻異神星';
 const cp={normal:'星',gold:'黄金',prism:'星虹',mutation:'幻異',divine:'神彩'}[c]||'星';
 const pp={plain:'無極',stream:'疾風',speck:'月影',flame:'烈火',thunder:'雷光',star:'天星'}[p.base]||'星';
 const bp={speed:'迅',power:'剛',tech:'慧',stamina:'堅'}[b.role]||'王';
 return cp+pp+bp;
}
function effect344(m){
 const g=resonanceGrade344(m),b=body344(m);
 if(g===5)return `得意能力 +8%／得意育成 +10%／得意競技 +8%`;
 if(g===4)return `得意能力 +4%／得意育成 +5%／得意競技 +4%`;
 if(g===3)return `得意育成 +3%／得意競技 +2%`;
 return'';
}
function persist344(){try{localStorage.setItem(SAVE344,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function ensureTitle344(m){
 const g=resonanceGrade344(m),title=title344(m);
 if(!g||!title)return false;
 const prev=m.starResonance344;
 const next={grade:g,name:title,effect:effect344(m),at:prev?.at||Date.now(),parts:{color:colorTier344(m),pattern:pattern344(m).name,body:body344(m).name}};
 m.starResonance344=next;
 if(!S.starResonanceDiscoveries344||typeof S.starResonanceDiscoveries344!=='object')S.starResonanceDiscoveries344={};
 const seen=S.starResonanceDiscoveries344[title];
 if(!seen||g>Number(seen.grade||0))S.starResonanceDiscoveries344[title]={grade:g,firstAt:seen?.firstAt||Date.now(),latestAt:Date.now(),athleteId:m.id};
 m.rareTitles323=Array.isArray(m.rareTitles323)?m.rareTitles323:[];
 const idx=m.rareTitles323.findIndex(x=>x?.id==='star-resonance344');
 const badge={id:'star-resonance344',icon:g>=5?'✦':g===4?'🌌':'✨',name:title,grade:g,source:'starResonance344'};
 if(idx>=0)m.rareTitles323[idx]=badge;else m.rareTitles323.push(badge);
 return !prev||prev.grade!==g||prev.name!==title;
}
function directStats344(m){
 if(!m||m.starResonanceStatApplied344)return false;
 const g=resonanceGrade344(m);if(g<4)return false;
 const b=body344(m),keys=Array.isArray(b.stats)?b.stats:[];
 if(!keys.length)return false;
 const pct=g>=5?.08:.04;
 m.stats=m.stats||{};
 for(const k of keys){
  const cur=Number(m.stats[k])||0;
  if(cur>0){const safeCap=Math.max(cap344(),cur);m.stats[k]=Math.min(safeCap,Math.max(cur+1,Math.round(cur*(1+pct))));}
  if(m.geneticBase226&&Number.isFinite(Number(m.geneticBase226[k]))){
   const v=Number(m.geneticBase226[k])||0;
   const safeCap=Math.max(cap344(),v);
   m.geneticBase226[k]=Math.min(safeCap,Math.max(v+1,Math.round(v*(1+pct))));
  }
 }
 m.starResonanceStatApplied344={grade:g,pct,keys:[...keys],at:Date.now()};
 return true;
}
function trainingMul344(m,plan,mode,k){
 const g=resonanceGrade344(m),b=body344(m);
 if(g<3||!b.stats?.includes(k))return 1;
 return g>=5?1.10:g===4?1.05:1.03;
}
function competitionMul344(m,e){
 const g=resonanceGrade344(m),b=body344(m);
 if(g<3)return 1;
 const roleEvents={
  speed:['50m走','リレー','障害物競走'],
  power:['大玉ころがし','坂道かけあがり','的当て'],
  tech:['的当て','障害物競走','リレー'],
  stamina:['10000m走','坂道かけあがり','大玉ころがし']
 };
 if(!(roleEvents[b.role]||[]).includes(e))return 1;
 return g>=5?1.08:g===4?1.04:1.02;
}
function label344(m){
 const g=resonanceGrade344(m);if(!g)return'';
 const meta=GRADE344[g];
 return `${meta.stars} ${meta.name}・${title344(m)}`;
}
function decorate344(){
 const byId=new Map(all344().map(m=>[m.id,m]));
 document.querySelectorAll('#cands .card[data-id],#breeders .card[data-id],#lineagePool .card[data-id]').forEach(card=>{
  const m=byId.get(card.dataset.id);if(!m)return;
  card.querySelector('.resonance344')?.remove();
  const g=resonanceGrade344(m);if(!g)return;
  const tag=document.createElement('div');
  tag.className='resonance344 resonanceGrade344-'+g;
  tag.innerHTML=`<small>星相共鳴</small><b>${label344(m)}</b><em>${effect344(m)}</em>`;
  (card.querySelector('.bodyBadge343')||card.querySelector('.patternBadge342')||card.querySelector('.bd')||card).appendChild(tag);
 });
 const birth=document.querySelector('#birth .hatchReveal'),latest=(S?.cands||[])[(S?.cands||[]).length-1];
 if(birth){
  birth.querySelector('.birthResonance344')?.remove();
  const g=latest?resonanceGrade344(latest):0;
  if(g){
   const tag=document.createElement('div');tag.className='birthResonance344 resonanceGrade344-'+g;
   tag.innerHTML=`<small>✦ 星相共鳴 ✦</small><b>${title344(latest)}</b><strong>${GRADE344[g].stars} ${GRADE344[g].name}</strong><em>${effect344(latest)}</em>`;
   (birth.querySelector('.birthBody343')||birth.querySelector('.birthPattern342')||birth.querySelector('.birthColor341')||birth.querySelector('.hatchName'))?.after(tag);
  }
 }
}
function sync344(){
 let changed=false;
 for(const m of all344()){changed=ensureTitle344(m)||changed;changed=directStats344(m)||changed}
 if(changed)persist344();
 decorate344();
 try{window.STAR_MY_STAR323?.sync?.()}catch(_){}
 try{window.STAR_GRADE340?.sync?.()}catch(_){}
}
try{const prev=render;render=function(){const out=prev();setTimeout(sync344,0);return out}}catch(e){console.warn('resonance344 render',e)}
document.addEventListener('click',e=>{if(e.target?.closest?.('#hatch,#breedBtn,#adopt,.tab,[data-my-star323]'))setTimeout(sync344,30)},true);

window.STAR_RESONANCE344={
 grade:resonanceGrade344,title:title344,label:label344,effect:effect344,
 trainingMul:trainingMul344,competitionMul:competitionMul344,directStats:directStats344,sync:sync344
};

const css=document.createElement('style');
css.id='starResonance344css';
css.textContent=`
.resonance344{margin-top:6px;padding:7px 8px;border-radius:10px;border:1px solid #d0c5df;background:#faf7ff}
.resonance344 small,.resonance344 b,.resonance344 em{display:block}.resonance344 small{font-size:5px;letter-spacing:.12em;color:#7b6790;font-weight:1000}.resonance344 b{font-size:8px;margin-top:2px}.resonance344 em{font-size:6px;font-style:normal;color:#665f72;margin-top:2px}
.resonanceGrade344-3{background:#fff7d8;border-color:#d7b955}
.resonanceGrade344-4{background:linear-gradient(100deg,#e9fbff,#f3e8ff,#fff7dc);border-color:#9e86c8;box-shadow:0 0 10px #a17ee344}
.resonanceGrade344-5{background:linear-gradient(100deg,#fff0a9,#eadfff,#d9faff,#fff0a9);border:2px solid #b58a3c;box-shadow:0 0 15px #9672ee66;animation:resGlow344 2.2s ease-in-out infinite}
@keyframes resGlow344{50%{filter:brightness(1.08);transform:translateY(-1px)}}
.birthResonance344{width:min(310px,92%);margin:8px auto;padding:11px 12px;border-radius:14px;text-align:center}
.birthResonance344 small,.birthResonance344 b,.birthResonance344 strong,.birthResonance344 em{display:block}
.birthResonance344 small{font-size:7px;letter-spacing:.13em}.birthResonance344 b{font-size:17px;margin:3px 0}.birthResonance344 strong{font-size:8px}.birthResonance344 em{font-size:7px;font-style:normal;margin-top:4px}
.birthResonance344.resonanceGrade344-5 b{text-shadow:0 0 12px #a872ff88}
`;
document.head.appendChild(css);
setTimeout(sync344,0);
})();