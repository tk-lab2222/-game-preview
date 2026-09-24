(()=>{
// v0.32.04: formal Star Color layer.
// Japanese labels, breeding effects, legacy-shiny repair, and visible character-color rendering.
if(window.STAR_COLOR341)return;

const SAVE341='star-athletes-save-v200';
const META341={
 normal:{name:'星色なし',stars:'★',grade:1},
 gold:{name:'黄金',stars:'★★★',grade:3},
 prism:{name:'虹色',stars:'★★★★',grade:4},
 mutation:{name:'異変色',stars:'★★★★',grade:4},
 divine:{name:'神彩',stars:'★★★★★',grade:5}
};
const SHINY_NAME341={draco:'エメラルド',unil:'ミント',grimo:'パープル',puru:'ピンク'};

function all341(){
 const out=[],seen=new Set();
 for(const key of ['starters','nest','lineage','released','cands','foster']){
  for(const m of(S?.[key]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);out.push(m)}
 }
 if(S?.egg&&!seen.has(S.egg.id))out.push(S.egg);
 return out;
}
function tier341(m){
 if(m?.rareVisual243==='divine'||m?.visual?.color==='神彩')return'divine';
 if(m?.rareVisual243==='prism'||m?.visual?.color==='プリズム')return'prism';
 if(m?.rareVisual243==='gold'||m?.visual?.color==='金')return'gold';
 if(m?.rareVisual243==='mutation')return'mutation';
 return'normal';
}
function label341(m){
 const t=tier341(m),meta=META341[t]||META341.normal;
 return `${meta.stars} ${meta.name}`;
}
function effects341(m){
 const t=tier341(m);
 if(t==='gold')return['親使用時 能力継承率 +1pt'];
 if(t==='prism')return['特殊血統レシピ ×1.25','特殊誕生抽選 ×1.25'];
 if(t==='mutation')return['特殊変異を示す希少外見'];
 if(t==='divine')return['全能力 +5%','特殊血統レシピ ×1.50','特殊誕生抽選 ×1.50','親使用時 能力継承率 +2pt'];
 return[];
}
function persist341(){
 try{localStorage.setItem(SAVE341,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}
}
function migrate341(){
 let changed=false;
 for(const m of all341()){
  if(!m)continue;
  // 色違い(shiny)は星色とは独立。旧データで星色に混入した shiny マーカーだけ除去する。\n  if(m.rareVisual243==='shiny'){delete m.rareVisual243;changed=true}\n }
 if(changed)persist341();
 return changed;
}

function class341(m){
 const t=tier341(m),sp=m?.species||'unknown';
 return `starColor341 starColor-${t}341 starSpecies-${sp}341`;
}
function wrapAvatar341(){
 if(window.STAR_COLOR341_AVATAR_WRAPPED)return;
 window.STAR_COLOR341_AVATAR_WRAPPED=true;
 try{
  const prev=avatar;
  avatar=function(m,big=false){
   const html=prev(m,big);
   if(typeof html!=='string'||!html.includes('class="avatar'))return html;
   return html.replace('class="avatar ','class="avatar '+class341(m)+' ');
  };
 }catch(e){console.warn('color341 avatar wrap',e)}
}

function parentPool341(){
 const out=[],seen=new Set();
 for(const key of ['starters','lineage','nest','released','foster']){
  for(const m of(S?.[key]||[]))if(m?.id&&!seen.has(m.id)){seen.add(m.id);out.push(m)}
 }
 return out;
}
function parent341(id){return parentPool341().find(m=>m.id===id)||null}
function syncBreed341(){
 const panel=document.getElementById('abilityInheritance339');
 if(!panel)return;
 let row=panel.querySelector('.starColorBreed341');
 const a=parent341(S?.parents?.[0]),b=parent341(S?.parents?.[1]);
 if(!a||!b){row?.remove();return}
 const interesting=[a,b].filter(m=>tier341(m)!=='normal');
 if(!interesting.length){row?.remove();return}
 if(!row){row=document.createElement('div');row.className='starColorBreed341';panel.appendChild(row)}
 const chips=interesting.map(m=>{
  const fx=effects341(m).join('・');
  return `<span class="colorChip341 color-${tier341(m)}341"><b>${label341(m)}</b><em>${m.name||'親'}：${fx}</em></span>`;
 }).join('');
 row.innerHTML=`<small>星色ボーナス</small><div>${chips}</div>`;
}

function syncBirth341(){
 const birth=document.querySelector('#birth .hatchReveal');
 if(!birth)return;
 const newest=(S?.cands||[])[(S?.cands||[]).length-1];
 birth.querySelector('.birthColor341')?.remove();
 if(!newest||tier341(newest)==='normal')return;
 const tag=document.createElement('div');
 tag.className='birthColor341 color-'+tier341(newest)+'341';
 tag.innerHTML=`<b>${label341(newest)}</b><small>${effects341(newest).join(' ／ ')||'希少な星色'}</small>`;
 const name=birth.querySelector('.hatchName');
 if(name)name.after(tag);else birth.prepend(tag);
}

function syncDOM341(){
 migrate341();
 syncBreed341();
 syncBirth341();
 try{window.STAR_GRADE340?.sync?.()}catch(_){}
}

wrapAvatar341();
try{
 const prevRender341=render;
 render=function(){
  const out=prevRender341();
  setTimeout(syncDOM341,0);
  return out;
 };
}catch(e){console.warn('color341 render wrap',e)}

document.addEventListener('click',e=>{
 if(e.target?.closest?.('[data-mode="p"],#breedBtn,#hatch,#adopt,.tab'))setTimeout(syncDOM341,20);
},true);

const css=document.createElement('style');
css.id='starColor341css';
css.textContent=`
/* Apply color to the actual art, not only its text tag. */
.starColor341 .dracoCanvas,
.starColor341 .speciesCanvas,
.starColor341 .artimg{
 transition:filter .25s ease;
}
.starColor-shiny341.starSpecies-draco341 .dracoCanvas,
.starColor-shiny341.starSpecies-draco341 .speciesCanvas,
.starColor-shiny341.starSpecies-draco341 .artimg{
 filter:hue-rotate(92deg) saturate(1.55) brightness(1.04) drop-shadow(0 0 5px #65e0b866);
}
.starColor-shiny341.starSpecies-unil341 .speciesCanvas,
.starColor-shiny341.starSpecies-unil341 .artimg{
 filter:hue-rotate(70deg) saturate(1.15) brightness(1.08) drop-shadow(0 0 5px #8be5c966);
}
.starColor-shiny341.starSpecies-grimo341 .speciesCanvas,
.starColor-shiny341.starSpecies-grimo341 .artimg{
 filter:hue-rotate(245deg) saturate(1.45) brightness(1.02) drop-shadow(0 0 5px #b889e866);
}
.starColor-shiny341.starSpecies-puru341 .speciesCanvas,
.starColor-shiny341.starSpecies-puru341 .artimg{
 filter:hue-rotate(315deg) saturate(1.35) brightness(1.06) drop-shadow(0 0 5px #f39bc766);
}
.starColor-gold341 .dracoCanvas,
.starColor-gold341 .speciesCanvas,
.starColor-gold341 .artimg{
 filter:sepia(1) saturate(2.35) hue-rotate(350deg) brightness(1.10) contrast(1.05) drop-shadow(0 0 7px #e9bd4688);
}
.starColor-prism341 .dracoCanvas,
.starColor-prism341 .speciesCanvas,
.starColor-prism341 .artimg{
 animation:prismHue341 4.8s linear infinite;
 filter:saturate(1.45) contrast(1.04) drop-shadow(0 0 7px #a784ff88);
}
@keyframes prismHue341{
 0%{filter:hue-rotate(0deg) saturate(1.45) brightness(1.03) drop-shadow(0 0 7px #69ddff88)}
 33%{filter:hue-rotate(120deg) saturate(1.55) brightness(1.06) drop-shadow(0 0 7px #ff92c988)}
 66%{filter:hue-rotate(240deg) saturate(1.55) brightness(1.05) drop-shadow(0 0 7px #ffe36f88)}
 100%{filter:hue-rotate(360deg) saturate(1.45) brightness(1.03) drop-shadow(0 0 7px #69ddff88)}
}
.starColor-mutation341 .dracoCanvas,
.starColor-mutation341 .speciesCanvas,
.starColor-mutation341 .artimg{
 filter:hue-rotate(255deg) saturate(1.7) contrast(1.12) brightness(.94) drop-shadow(0 0 8px #bd6cff99);
}
.starColor-gold341{background:radial-gradient(circle at 50% 30%,#fff9cf,#f4ead6)!important}
.starColor-prism341{background:linear-gradient(135deg,#ebfbff,#f6eaff,#fff8d8)!important}
.starColor-mutation341{background:radial-gradient(circle at 50% 30%,#f4eaff,#e8e0f4)!important}

.starColorBreed341{margin-top:7px;padding-top:6px;border-top:1px dashed #bcc9d5}
.starColorBreed341>small{display:block;margin-bottom:5px;font-size:6px;font-weight:1000;color:#65798e}
.starColorBreed341>div{display:grid;gap:4px}
.colorChip341{display:grid;grid-template-columns:auto 1fr;gap:6px;align-items:center;padding:5px 6px;border-radius:8px;border:1px solid #d4dce4;background:#fff}
.colorChip341 b{font-size:7px;white-space:nowrap}.colorChip341 em{font-size:6px;font-style:normal;color:#667789}
.color-gold341{background:linear-gradient(90deg,#fff7cf,#fff)!important;border-color:#d7bd5b!important}
.color-prism341{background:linear-gradient(90deg,#e8faff,#f4e8ff,#fff7d7)!important;border-color:#ac91d0!important}
.color-mutation341{background:#f4ebff!important;border-color:#ad83d7!important}

.birthColor341{width:min(300px,90%);margin:7px auto;padding:7px 9px;border:1px solid #d7dfe7;border-radius:10px;text-align:center;background:#fff}
.birthColor341 b,.birthColor341 small{display:block}.birthColor341 b{font-size:10px}.birthColor341 small{margin-top:2px;font-size:6px;color:#65758a}
`;
document.head.appendChild(css);

migrate341();
setTimeout(()=>{try{render();syncDOM341()}catch(e){console.warn('color341 boot',e)}},0);
window.STAR_COLOR341={meta:META341,tier:tier341,label:label341,effects:effects341,sync:syncDOM341};
})();