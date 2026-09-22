(()=>{
'use strict';
// v0.31.99: show effective ability-growth inheritance rate in breeding UI.
if(window.STAR_INHERIT_UI339)return;

function pool339(){
  const out=[],seen=new Set();
  for(const key of ['starters','lineage','nest','released','foster']){
    for(const m of (S?.[key]||[])){
      if(m?.id&&!seen.has(m.id)){seen.add(m.id);out.push(m)}
    }
  }
  return out;
}
function parent339(id){return pool339().find(m=>m.id===id)}
function rank339(v){
  const n=Math.max(0,Math.min(7,Number(v)||0));
  return ['G','F','E','D','C','B','A','S'][n]||'D';
}
function sync339(){
  const pa=parent339(S?.parents?.[0]),pb=parent339(S?.parents?.[1]);
  let host=document.getElementById('abilityInheritance339');
  const anchor=document.getElementById('pb')?.parentElement||document.getElementById('pa')?.parentElement||document.getElementById('breeders');
  if(!anchor)return;
  if(!host){
    host=document.createElement('div');
    host.id='abilityInheritance339';
    host.className='abilityInheritance339';
    anchor.appendChild(host);
  }
  if(!pa||!pb){
    host.innerHTML='<small>能力継承</small><b>能力継承率 —</b><span>親2体を選ぶと表示</span>';
    return;
  }
  try{window.STAR_ANNUAL233?.ensureHidden?.(pa);window.STAR_ANNUAL233?.ensureHidden?.(pb)}catch(_){}
  const rate=Number(window.STAR_GROWTH226?.heritageRate?.(pa,pb)||.35);
  const h1=Number(pa?.hidden233?.heredity)||0,h2=Number(pb?.hidden233?.heredity)||0;
  const strong=[...(pa?.skills233||[]),...(pb?.skills233||[])].includes('heredity');
  const goldCount=[pa,pb].filter(p=>p?.rareVisual243==='gold'||p?.visual?.color==='金').length;
  host.innerHTML=`
    <div><small>能力継承</small><b>🧬 能力継承率 <strong>${Math.round(rate*100)}%</strong></b></div>
    <span>遺伝力 ${rank339(h1)} × ${rank339(h2)}${strong?' ／ 強遺伝 +3%':''}${goldCount?` ／ 黄金 +${goldCount}%`:''}</span>
    <em>基準35% ／ 遺伝力で最大42% ／ 各種補正込み最大45%</em>
  `;
}
try{
  const prev=window.render;
  if(typeof prev==='function'){
    window.render=function(){
      const out=prev.apply(this,arguments);
      setTimeout(sync339,0);
      return out;
    };
  }
}catch(e){console.warn('inherit ui339 render wrap',e)}
document.addEventListener('click',e=>{
  if(e.target?.closest?.('[data-mode="p"],#breedBtn,#hatch,.tab[data-v="breed"]'))setTimeout(sync339,20);
},true);

const css=document.createElement('style');
css.textContent=`
.abilityInheritance339{
  margin:8px 0;padding:9px 10px;border:1px solid #b9c9d8;border-radius:11px;
  background:linear-gradient(145deg,#f8fbff,#eef5fb);color:#26384a;
}
.abilityInheritance339>div{display:flex;align-items:end;justify-content:space-between;gap:8px}
.abilityInheritance339 small{display:block;font-size:6px;letter-spacing:.12em;color:#6e8193;font-weight:1000}
.abilityInheritance339 b{font-size:10px}.abilityInheritance339 strong{font-size:15px;color:#3f6d9b}
.abilityInheritance339 span{display:block;margin-top:4px;font-size:8px;font-weight:900}
.abilityInheritance339 em{display:block;margin-top:3px;font-size:6px;font-style:normal;color:#748596}
`;
document.head.appendChild(css);
window.STAR_INHERIT_UI339={sync:sync339};
[0,100,300,700].forEach(ms=>setTimeout(sync339,ms));
})();