(()=>{
// v0.31.12: keep the candidate selection panel visible after batch breeding.
function syncCandidates299(){
 const box=document.getElementById('candBox');
 const host=document.getElementById('cands');
 if(!box||!host)return;
 const cands=Array.isArray(S?.cands)?S.cands:[];
 if(cands.length){
   box.classList.remove('hide');
   // Keep candidate selection immediately above the lineage archive box.
   const lineageBox=document.getElementById('lineagePool')?.closest('.box');
   if(lineageBox&&box.nextElementSibling!==lineageBox&&box.parentElement===lineageBox.parentElement){
     lineageBox.parentElement.insertBefore(box,lineageBox);
   }
   if(!host.children.length&&typeof card==='function'){
     host.innerHTML=cands.map(m=>card(m,'c')).join('');
   }
   // Candidate selection ownership is centralized in patch-v311.
   // v299 only preserves panel visibility/order.
   const adopt=document.getElementById('adopt');
   if(adopt)adopt.disabled=(Array.isArray(S?.sel)?S.sel.length:0)!==3;
 }else{
   box.classList.add('hide');
 }
}
try{
 const prev=render;
 render=function(){const out=prev();[0,30,100,250].forEach(ms=>setTimeout(syncCandidates299,ms));return out};
}catch(e){console.warn('render299',e)}
document.addEventListener('click',e=>{
 if(e.target?.closest?.('#batchGo260,#breedBtn,#hatch,[data-mode="c"],.tab[data-v="breed"]')){
   [0,30,100,250].forEach(ms=>setTimeout(syncCandidates299,ms));
 }
},true);
[0,80,250].forEach(ms=>setTimeout(syncCandidates299,ms));
window.STAR_CANDIDATES299={sync:syncCandidates299};
})();