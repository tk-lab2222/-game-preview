(()=>{
// v0.27.5: M2.3 fatigue. Three readable states; high-load cannot be spammed for free.
const SAVE265='star-athletes-save-v200',ROSTER265='star-athletes-active-roster-v210';
function n265(v){return Number(v)||0}
function clamp265(v,a,b){return Math.max(a,Math.min(b,v))}
function st265(){if(!S.training263||typeof S.training263!=='object')S.training263={};if(!S.training263.fatigue||typeof S.training263.fatigue!=='object')S.training263.fatigue={};return S.training263}
function fatigue265(m){return clamp265(n265(st265().fatigue[m.id]),0,2)}
function label265(v){return v<=0?'好調':v===1?'普通':'疲労'}
function persist265(){try{localStorage.setItem(SAVE265,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem(ROSTER265,JSON.stringify(S.nest))}catch(_){}}
function sync265(){
  if(!Array.isArray(S.nest))return;
  document.querySelectorAll('.train210[data-athlete210]').forEach(card=>{
    const m=S.nest.find(x=>x.id===card.dataset.athlete210);if(!m)return;
    const v=fatigue265(m);let el=card.querySelector('.fatigue265');
    if(!el){el=document.createElement('div');el.className='fatigue265';const d=card.querySelector('.decision263');d?d.prepend(el):card.appendChild(el)}
    el.innerHTML=`<span>コンディション</span><b class="f${v}">${label265(v)}</b><small>${v===0?'高負荷に挑みやすい':v===1?'高負荷で疲労しやすい':'安全練習で回復を狙おう'}</small>`;
  });
}
function before265(){
  const st=st265();
  S.nest?.forEach(m=>{m._fatigueBefore265=fatigue265(m);m._modeBefore265=st.intensity?.[m.id]||'normal'});
}
function after265(){
  const st=st265();
  S.nest?.forEach(m=>{
    const old=clamp265(n265(m._fatigueBefore265),0,2),mode=m._modeBefore265||'normal';let next=old;
    if(mode==='high')next=Math.min(2,old+1);
    else if(mode==='safe')next=Math.max(0,old-1);
    else if(mode==='normal'&&old===2)next=1;
    st.fatigue[m.id]=next;delete m._fatigueBefore265;delete m._modeBefore265;
  });
  persist265();setTimeout(sync265,0);setTimeout(sync265,100);
}
// M2.3 modifies outcome probabilities without owning the training click.
try{
  if(typeof outcome263==='function'&&!window.outcome263Fatigue265){
    const base265=outcome263;window.outcome263Fatigue265=true;
    outcome263=function(m,mode){
      const f=fatigue265(m),o=base265(m,mode);
      if(f===0)return o;
      // Fatigue mainly punishes risky training; safe remains a recovery option.
      if(mode==='high'){
        const r=Math.random();
        if(f===2&&r<.34)return{grade:'失敗',mul:0,risk:'high'};
        if(f===1&&r<.16)return{grade:'失敗',mul:0,risk:'high'};
        o.mul*=f===2?.72:.88;
      }else if(mode==='normal')o.mul*=f===2?.86:.95;
      return o;
    };
  }
}catch(e){console.warn('fatigue outcome265',e)}
window.addEventListener('click',e=>{
  if(e.target?.closest?.('#doTrain263')){before265();setTimeout(after265,0)}
  if(e.target?.closest?.('.tab[data-v="train"],#adopt'))setTimeout(sync265,0);
},true);
function late265(){sync265();[60,180,420].forEach(ms=>setTimeout(sync265,ms))}
try{const prev265=render;render=function(){const out=prev265();late265();return out}}catch(e){console.warn('render265',e)}
const css=document.createElement('style');css.textContent=`.fatigue265{display:grid;grid-template-columns:auto auto 1fr;gap:5px;align-items:center;margin-bottom:7px;padding:5px 6px;border-radius:8px;background:#f3f6f8;font-size:7px}.fatigue265 span{font-weight:1000}.fatigue265 b{border:1px solid #8798a7;border-radius:999px;padding:2px 6px;background:#fff}.fatigue265 b.f0{background:#eaf8ef}.fatigue265 b.f2{background:#fff0e8}.fatigue265 small{color:#71808e;text-align:right;font-size:6px}`;document.head.appendChild(css);late265();
})();