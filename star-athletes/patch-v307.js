(()=>{
// v0.31.19: restore annual champion promotion action after tab changes / rerenders.
function annualState307(){
  const result=document.getElementById('result');
  const txt=result?.textContent||'';
  const isAnnual=/年間ランキング確定/.test(txt);
  const isChampion=/あなた：年間1位/.test(txt);
  const rank=Math.max(0,Math.min(5,Number(S?.leagueRank)||0));
  const eligible=isAnnual&&isChampion&&rank<5&&!S?.promotion233;
  return {isAnnual,isChampion,rank,eligible};
}
function ensureAnnualPromo307(){
  try{
    const st=annualState307();
    if(!st.isAnnual)return;
    const host=document.getElementById('meetNext303')||document.querySelector('#meet .box p');
    if(!host)return;
    let b=document.getElementById('annualNext233');
    if(st.eligible){
      document.getElementById('next225')?.style.setProperty('display','none','important');
      if(!b){
        b=document.createElement('button');
        b.id='annualNext233';
        b.type='button';
        b.className='btn yl';
        host.appendChild(b);
      }else if(b.parentElement!==host){
        host.appendChild(b);
      }
      b.textContent='🔥 年間王者・昇格戦へ';
      b.style.setProperty('display','inline-block','important');
      b.onclick=()=>{
        try{
          if(typeof showPromotion233==='function'){showPromotion233();return}
        }catch(e){console.warn('showPromotion307',e)}
      };
    }else if(b&&/年間王者・昇格戦/.test(b.textContent||'')){
      b.style.display='none';
    }
  }catch(e){console.warn('ensureAnnualPromo307',e)}
}
function sync307(){[0,40,120,300].forEach(ms=>setTimeout(ensureAnnualPromo307,ms))}
try{
 const prev=render;
 render=function(){const out=prev();sync307();return out};
}catch(e){console.warn('render307',e)}
document.addEventListener('click',e=>{
 if(e.target?.closest?.('.tab,#run,#next225,#annualNext233'))sync307();
},true);
const result=document.getElementById('result');
if(result)new MutationObserver(sync307).observe(result,{childList:true,subtree:true,characterData:true});
sync307();
window.STAR_ANNUAL307={sync:ensureAnnualPromo307};
})();