(()=>{
// v0.31.13: restore post-tournament navigation after visiting other tabs.
function hasResult300(){
 const r=document.getElementById('result');
 return !!(r&&r.textContent.trim()&&/総合\d+位|年間ランキング確定|昇格/.test(r.textContent));
}
function ensureNext300(){
 if(!hasResult300())return;
 try{
   if(S?.promotion233){
     // Promotion battle itself owns the action button.
     return;
   }
   const season=Math.max(1,Math.min(6,Number(S?.season)||1));
   const next225=document.getElementById('next225');
   const annual=document.getElementById('annualNext233');
   // S1-S5: standard next-season button should always be restored.
   if(season<6){
     if(annual)annual.style.display='none';
     if(next225){
       next225.style.setProperty('display','inline-block','important');
       next225.textContent='次シーズンへ';
       return;
     }
     const p=document.querySelector('#meet .box p');
     if(p){
       const b=document.createElement('button');
       b.id='next225';b.type='button';b.className='btn yl';b.textContent='次シーズンへ';
       p.appendChild(b);
     }
     return;
   }
   // S6: if annual result / generation-next already exists, keep it visible.
   if(annual)annual.style.setProperty('display','inline-block','important');
   else if(next225)next225.style.setProperty('display','inline-block','important');
 }catch(e){console.warn('ensureNext300',e)}
}
function sync300(){[0,40,120,300].forEach(ms=>setTimeout(ensureNext300,ms))}
document.addEventListener('click',e=>{
 if(e.target?.closest?.('.tab,#run,#next225,#annualNext233'))sync300();
},true);
try{
 const prev=render;
 render=function(){const out=prev();sync300();return out};
}catch(e){console.warn('render300',e)}
sync300();
window.STAR_NEXT300={sync:ensureNext300};
})();