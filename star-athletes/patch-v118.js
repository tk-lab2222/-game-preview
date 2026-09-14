(()=>{
// v0.12.1 hotfix: move lineage archive only when needed.
// Do NOT observe the whole DOM and reinsert the same node repeatedly; that can
// create a mutation loop that blocks character painting and all button input.
function moveLineageArchive118(){
  const breed=document.getElementById('breed');
  const pool=document.getElementById('lineagePool');
  const cand=document.getElementById('candBox');
  if(!breed||!pool||!cand)return;
  const box=pool.closest('.box');
  if(!box)return;

  const h=box.querySelector('h3');
  if(h&&!box.dataset.archiveNamed){
    const count=h.querySelector('.sm');
    h.innerHTML='📚 血統アーカイブ ';
    if(count)h.appendChild(count);
    box.dataset.archiveNamed='1';
  }
  const desc=box.querySelector('.sm:last-child');
  if(desc&&!box.dataset.archiveDesc){
    desc.textContent='過去世代の採用個体を保管する場所です。必要な個体だけ残し、親候補としていつでも呼び戻せます。';
    box.dataset.archiveDesc='1';
  }
  box.classList.add('lineageArchive118');

  // Only move when the archive is not already immediately after candBox.
  if(cand.nextElementSibling!==box){
    breed.insertBefore(box,cand.nextSibling);
  }
}

const style=document.createElement('style');
style.textContent=`
.lineageArchive118{margin-top:12px;background:#fbfaf6}
.lineageArchive118>h3{display:flex;align-items:center;justify-content:space-between;gap:8px}
.lineageArchive118:before{content:'SUB';display:inline-block;font-size:8px;font-weight:1000;letter-spacing:.12em;background:#222;color:#fff;border-radius:999px;padding:2px 6px;margin-bottom:6px}
`;
document.head.appendChild(style);

// Static layout: one move after boot is sufficient. A delayed retry covers
// browsers where the base render has not completed on the first task.
setTimeout(moveLineageArchive118,0);
setTimeout(moveLineageArchive118,120);
})();