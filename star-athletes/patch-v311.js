(()=>{
// v0.31.25: keep candidate selection flow alive after lineage archive release.
function restore311(){
 const cands=Array.isArray(S?.cands)?S.cands:[];
 const box=document.getElementById('candBox');
 const grid=document.getElementById('cands');
 if(!box||!grid)return;
 if(!cands.length)return;
 box.classList.remove('hide');
 box.style.setProperty('display','block','important');

 // Keep candidate selection immediately above lineage archive.
 const lineageBox=document.getElementById('lineagePool')?.closest('.box');
 if(lineageBox&&box.parentElement===lineageBox.parentElement&&box.nextElementSibling!==lineageBox){
   lineageBox.parentElement.insertBefore(box,lineageBox);
 }

 // Rebuild cards if another redraw emptied them.
 if(grid.children.length!==cands.length&&typeof card==='function'){
   grid.innerHTML=cands.map(m=>card(m,'c')).join('');
 }

 grid.querySelectorAll('[data-mode="c"]').forEach(el=>{
   const id=el.dataset.id;
   el.classList.toggle('sel',(S.sel||[]).includes(id));
   el.onclick=e=>{
     e?.preventDefault?.();
     e?.stopPropagation?.();
     const sel=Array.isArray(S.sel)?S.sel:[];
     if(sel.includes(id)){
       S.sel=sel.filter(x=>x!==id);
       restore311();
       return;
     }
     if(sel.length>=3){
       // Selection is already full. Do not render/toggle/rebuild: this prevents mobile jitter.
       return;
     }
     S.sel=[...sel,id];
     restore311();
   };
 });

 const cmp=document.getElementById('candidateCompare262');
 if(cmp){
   cmp.classList.remove('hide');
   cmp.style.setProperty('display','block','important');
   cmp.querySelectorAll('[data-cmp262]').forEach(row=>{
     row.classList.toggle('selected262',(S.sel||[]).includes(row.dataset.cmp262));
   });
 }

 const adopt=document.getElementById('adopt');
 if(adopt){
   adopt.disabled=(S.sel||[]).length!==3;
   adopt.style.removeProperty('display');
 }
 try{window.STAR_ULTRA274?.sync?.()}catch(_){}
 try{window.STAR_RARE273?.sync?.()}catch(_){}
 try{window.STAR_LINEAGE271?.sync?.()}catch(_){}
 try{window.STAR_SKILL254?.sync?.()}catch(_){}
}
function late311(){[0,40,120,300,650].forEach(ms=>setTimeout(restore311,ms))}
document.addEventListener('click',e=>{
 if(e.target?.closest?.('#lineagePool [data-release],#pickTop262,#cands .card,.tab[data-v="breed"],#batchGo260,#hatch'))late311();
},true);
try{
 const prev=render;
 render=function(){const out=prev();late311();return out};
}catch(e){console.warn('render311',e)}
const css=document.createElement('style');
css.id='candidateFlow311';
css.textContent=`
#candBox:not(.candidateDone311){min-width:0}
#candBox:not(.candidateDone311).hide{display:block!important}
#candidateCompare262.hide{display:block!important}
`;
document.head.appendChild(css);
late311();
window.STAR_CANDIDATE311={sync:restore311};
})();