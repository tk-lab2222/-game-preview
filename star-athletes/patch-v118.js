(()=>{
// v0.11.8: keep parent selection -> breeding uninterrupted; move lineage pool to a secondary archive area.
function moveLineageArchive118(){
  const breed=document.getElementById('breed');
  const pool=document.getElementById('lineagePool');
  const cand=document.getElementById('candBox');
  if(!breed||!pool||!cand)return;
  const box=pool.closest('.box');
  if(!box)return;
  const h=box.querySelector('h3');
  if(h){
    const count=h.querySelector('.sm');
    h.innerHTML='📚 血統アーカイブ ';
    if(count)h.appendChild(count);
  }
  const desc=box.querySelector('.sm:last-child');
  if(desc)desc.textContent='過去世代の採用個体を保管する場所です。必要な個体だけ残し、親候補としていつでも呼び戻せます。';
  box.classList.add('lineageArchive118');
  breed.insertBefore(box,cand.nextSibling);
}
const style=document.createElement('style');
style.textContent=`
.lineageArchive118{margin-top:12px;background:#fbfaf6}
.lineageArchive118>h3{display:flex;align-items:center;justify-content:space-between;gap:8px}
.lineageArchive118:before{content:'SUB';display:inline-block;font-size:8px;font-weight:1000;letter-spacing:.12em;background:#222;color:#fff;border-radius:999px;padding:2px 6px;margin-bottom:6px}
`;
document.head.appendChild(style);
setTimeout(moveLineageArchive118,0);
new MutationObserver(()=>moveLineageArchive118()).observe(document.body,{childList:true,subtree:true});
})();