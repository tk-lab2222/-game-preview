(()=>{
'use strict';
// v0.32.41: hatch information hierarchy/readability.
if(window.STAR_HATCH_UI358)return;
function athlete358(){
 const all=[...(S?.nest||[]),...(S?.cands||[]),...(S?.lineage||[]),...(S?.starters||[])];
 const birth=document.querySelector('#birth .hatchReveal');if(!birth)return null;
 const name=(birth.querySelector('.hatchName b')?.textContent||'').trim();
 return [...all].reverse().find(m=>m&&(!name||m.name===name))||all.at(-1)||null;
}
function cleanText358(t){return String(t||'').replace(/★{1,5}\s*(通常|希少|輝星|幻星|神星)/g,'').replace(/\s{2,}/g,' ').trim()}
function sync358(){
 const box=document.querySelector('#birth .hatchReveal');if(!box)return;
 const m=athlete358();
 // Put newborn identity first; star color/grade are secondary facts below it.
 const color=box.querySelector('.birthColor341');
 if(color){
  color.classList.add('birthColor358');
  const b=color.querySelector('b'),s=color.querySelector('small');
  if(b)b.textContent=cleanText358(b.textContent);
  if(s&&/特殊血統レシピ/.test(s.textContent||''))s.textContent=(s.textContent||'').replace('特殊血統レシピ','特殊血統');
 }
 // Overall grade gets its own dark high-contrast chip; never white-on-pale.
 const grade=box.querySelector('.athleteGrade340');
 if(grade){grade.classList.add('hatchGrade358');}
 // Rare recipe is visually separated from star color instead of stacking pale boxes.
 const rare=box.querySelector('.rare273');if(rare)rare.classList.add('hatchRare358');
 // Remove duplicate/legacy explanatory fragments left around the name.
 box.querySelectorAll('.hatchName>span').forEach(x=>x.remove());
 // Label the actual star-color row to make taxonomy clear.
 if(color&&!color.querySelector('.kind358')){const k=document.createElement('em');k.className='kind358';k.textContent='星色';color.prepend(k)}
 if(grade&&!grade.querySelector('.kind358')){const k=document.createElement('em');k.className='kind358';k.textContent='星格';grade.prepend(k)}
}
try{const prev=window.render;if(typeof prev==='function')window.render=function(){const out=prev.apply(this,arguments);setTimeout(sync358,0);return out}}catch(_){}
document.addEventListener('click',e=>{if(e.target?.closest?.('#hatch,#adopt')){setTimeout(sync358,850);setTimeout(sync358,1250)}},true);
const css=document.createElement('style');css.textContent=`
#birth .hatchReveal{color:#f5f8ff!important}
#birth .hatchName{margin-top:7px!important;gap:0!important}#birth .hatchName b{font-size:22px!important;line-height:1.2!important;text-shadow:0 2px 10px #0008}
#birth .birthColor341.birthColor358{width:min(320px,94%)!important;margin:8px auto 5px!important;padding:8px 10px!important;background:#101b2bd9!important;border:1px solid #77d9c8!important;box-shadow:0 5px 16px #0003!important;color:#fff!important}
#birth .birthColor358 .kind358{display:block!important;margin-bottom:2px!important;color:#8ee5d4!important;font-size:6px!important;font-style:normal!important;font-weight:1000!important;letter-spacing:.16em!important}
#birth .birthColor358 b{color:#fff!important;font-size:9px!important;text-shadow:none!important}
#birth .birthColor358 small{color:#c8d8e8!important;font-size:7px!important;line-height:1.45!important}
#birth .athleteGrade340.hatchGrade358{display:flex!important;width:max-content!important;max-width:94%!important;margin:5px auto!important;padding:6px 10px!important;background:#111c2dcc!important;border:1px solid #6d83a4!important;color:#fff!important;box-shadow:0 4px 14px #0003!important;font-size:8px!important;gap:5px!important}
#birth .hatchGrade358 .kind358{color:#91a8c8!important;font-size:6px!important;font-style:normal!important;letter-spacing:.12em!important}
#birth .hatchGrade358 .starIcons354{color:#ffe277!important;font-size:9px!important;letter-spacing:-1px!important}
#birth .hatchGrade358 span{color:#fff!important;font-size:8px!important}
#birth .rare273.hatchRare358{width:min(320px,94%)!important;margin:6px auto!important;padding:7px 9px!important;background:#2b2413e8!important;border:1px solid #d5ae4d!important;color:#ffe7a2!important;box-shadow:0 4px 14px #0003!important;font-size:7px!important;line-height:1.45!important}
#birth .hatchMeta{margin:8px 0!important;color:#dceaff!important;font-size:9px!important;font-weight:800!important}
#birth .hatchTraits span{background:#f6e7ad!important;color:#332714!important;border-color:#e0c66d!important}
#birth .hatchSkill254,#birth .hatchSkills254{background:#182337cc!important;color:#fff!important;border:1px solid #ffffff22!important}
#birth .hatchSkill254 small,#birth .hatchSkills254 small{color:#aebed2!important}
`;document.head.appendChild(css);
window.STAR_HATCH_UI358={sync:sync358};setTimeout(sync358,200);
})();