(()=>{
// v0.23.4 UI clarity: always show numeric compatibility and explicit skill state.
function syncCompat234(){
  const box=document.getElementById('compat233');
  if(!box||box.classList.contains('hide'))return;
  const txt=box.textContent||'';
  const m=txt.match(/相性\s*(\d+)/);
  const score=m?Math.max(0,Math.min(100,Number(m[1]))):null;
  if(score===null)return;
  let badge=box.querySelector('.compatScore234');
  if(!badge){badge=document.createElement('div');badge.className='compatScore234';box.prepend(badge)}
  const label=score>=90?'✨ 運命的':score>=75?'★ とても良い':score>=60?'◎ 好相性':score>=40?'○ まずまず':'△ かみ合いにくい';
  badge.innerHTML=`<span>相性</span><strong>${score}<small>/100</small></strong><em>${label}</em>`;
  // The new score strip is the primary summary; avoid duplicate numeric text below it.
  const old=box.querySelector('.compatHead233');if(old)old.classList.add('compatHead234Secondary');
}
function syncSkills234(){
  document.querySelectorAll('.train210').forEach(card=>{
    const id=card.querySelector('[data-m210]')?.dataset.m210;
    const mon=(S.nest||[]).find(x=>x.id===id);if(!mon)return;
    const host=card.querySelector('header>div')||card;
    let row=host.querySelector('.skillState234');
    if(!row){row=document.createElement('div');row.className='skillState234';host.appendChild(row)}
    const pills=card.querySelectorAll('.skills233 span');
    if(pills.length){
      row.classList.add('has234');
      row.innerHTML=`<span>SKILL</span><b>${Array.from(pills).map(x=>x.textContent.trim()).join(' / ')}</b>`;
    }else{
      row.classList.remove('has234');
      row.innerHTML='<span>SKILL</span><b>未取得</b>';
    }
  });
}
function sync234(){syncCompat234();syncSkills234()}
try{
 const before234=render;
 render=function(){const out=before234();setTimeout(sync234,0);return out};
}catch(e){console.warn('render234',e)}
document.addEventListener('click',e=>{
 if(e.target.closest?.('[data-mode="p"],.tab[data-v="breed"],.tab[data-v="train"]'))setTimeout(sync234,0);
},false);
const css=document.createElement('style');css.textContent=`
.compatScore234{display:grid;grid-template-columns:auto auto 1fr;align-items:center;gap:8px;margin:8px 0 10px;padding:10px 12px;border:2px solid #334b68;border-radius:13px;background:linear-gradient(135deg,#eef7ff,#fff);color:#172033}.compatScore234>span{font-size:9px;font-weight:1000;letter-spacing:.08em}.compatScore234 strong{font-size:24px;line-height:1;font-weight:1000;color:#0c6d9f}.compatScore234 strong small{font-size:10px;color:#667789;margin-left:2px}.compatScore234 em{justify-self:end;font-style:normal;font-size:10px;font-weight:1000;background:#fff0b5;border:1px solid #d5b84b;border-radius:999px;padding:5px 8px;white-space:nowrap}.compatHead234Secondary{opacity:.72}.compatHead234Secondary b{font-size:9px!important}.compatHead234Secondary strong{font-size:8px!important}.skillState234{display:flex;align-items:center;gap:6px;margin-top:5px;font-size:7px;line-height:1.2}.skillState234 span{font-size:6px;font-weight:1000;letter-spacing:.08em;color:#77869a}.skillState234 b{display:inline-block!important;font-size:7px!important;font-weight:1000!important;color:#6d7888!important;background:#eef1f5;border:1px solid #c7d0db;border-radius:999px;padding:3px 6px}.skillState234.has234 b{color:#5b367f!important;background:#f2e8ff;border-color:#b996d9}.train210 .skills233{display:none!important}
`;document.head.appendChild(css);
setTimeout(sync234,0);
})();