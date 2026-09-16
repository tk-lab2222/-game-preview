(()=>{
// v0.24.8: hard-stop premature promotion messaging/state before S6.
const SAVE248='star-athletes-save-v200';
function save248(){try{localStorage.setItem(SAVE248,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem('star-athletes-active-roster-v210',JSON.stringify(S.nest))}catch(_){}}
function season248(){return Math.max(1,Math.min(6,Number(S.season)||1))}
function clean248(){
 if(season248()>=6)return;
 let changed=false;
 if(S.promotionPending){S.promotionPending=false;changed=true}
 if(Number(S.promotionFromSeason)){S.promotionFromSeason=0;changed=true}
 const result=document.getElementById('result');
 if(result){
   result.querySelectorAll('em,strong,b,span,div').forEach(el=>{
     const t=(el.textContent||'').trim();
     if(t==='🔥 昇格戦が発生！'||t==='昇格戦が発生！')el.remove();
   });
   // Fallback when the old renderer emitted the message as a raw text fragment inside the notice.
   result.querySelectorAll('.leagueResult225,.notice').forEach(el=>{
     el.childNodes.forEach(n=>{if(n.nodeType===3&&/昇格戦が発生/.test(n.nodeValue||''))n.nodeValue=(n.nodeValue||'').replace(/🔥?\s*昇格戦が発生！?/g,'')});
   });
 }
 const b=document.getElementById('next225');
 if(b&&(b.textContent||'').includes('昇格戦')){
   b.textContent='次シーズンへ';
   b.onclick=null;
   // v233 owns the correct annual flow; dispatch a fresh click after state normalization.
   b.addEventListener('click',()=>{}, {once:true});
 }
 if(changed)save248();
}
function sweep248(){clean248();[80,180,350,650,1100,1700,2400,3300].forEach(ms=>setTimeout(clean248,ms))}
window.addEventListener('click',e=>{if(e.target?.closest?.('#run,#next225,.tab[data-v="meet"],#toMeet'))sweep248()},true);
try{const prev248=render;render=function(){const out=prev248();sweep248();return out}}catch(e){console.warn('render248',e)}
sweep248();
})();