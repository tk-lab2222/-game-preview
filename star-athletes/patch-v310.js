(()=>{
// v0.31.23: keep 10-candidate shortlist visible after "recommended 3" selection.
function refresh310(){
 const box=document.getElementById('candBox');
 const grid=document.getElementById('cands');
 if(!box||!grid)return;
 const cands=Array.isArray(S?.cands)?S.cands:[];
 if(cands.length){
   box.classList.remove('hide');
   box.style.removeProperty('display');
 }
 grid.querySelectorAll('.card[data-id]').forEach(card=>{
   const on=(S.sel||[]).includes(card.dataset.id);
   card.classList.toggle('sel',on);
 });
 document.querySelectorAll('#candidateCompare262 [data-cmp262]').forEach(row=>{
   row.classList.toggle('selected262',(S.sel||[]).includes(row.dataset.cmp262));
 });
 const adopt=document.getElementById('adopt');
 if(adopt)adopt.disabled=(S.sel||[]).length!==3;
}
document.addEventListener('click',e=>{
 const b=e.target?.closest?.('#pickTop262');
 if(!b)return;
 e.preventDefault();
 e.stopPropagation();
 e.stopImmediatePropagation();
 const rows=[...document.querySelectorAll('#candidateCompare262 [data-cmp262]')];
 const ids=rows.slice(0,3).map(x=>x.dataset.cmp262).filter(Boolean);
 if(ids.length<3){
   const cards=[...(S.cands||[])].slice(0,3).map(x=>x.id);
   S.sel=cards;
 }else S.sel=ids;
 refresh310();
 [30,100,250].forEach(ms=>setTimeout(refresh310,ms));
},true);
try{
 const prev=render;
 render=function(){const out=prev();[0,40,120,300].forEach(ms=>setTimeout(refresh310,ms));return out};
}catch(e){console.warn('render310',e)}
document.addEventListener('click',e=>{
 if(e.target?.closest?.('#cands .card,.tab[data-v="breed"],#batchGo260,#hatch'))[0,50,150].forEach(ms=>setTimeout(refresh310,ms));
},true);
[0,100,300].forEach(ms=>setTimeout(refresh310,ms));
window.STAR_CANDIDATE310={sync:refresh310};
})();