(()=>{
// v0.26.1: M1.1 breeding UX. Respect the current per-generation breeding cap while batching.
const MAX260=10;
function limit260(){
  const current=(typeof cap==='function'?Number(cap()):3)||3;
  return Math.max(3,Math.min(MAX260,current));
}
function all260(){const out=[],seen=new Set();for(const k of ['starters','nest','lineage'])for(const m of(S[k]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);out.push(m)}return out}
function parent260(id){return all260().find(m=>m.id===id)||null}
function nextTarget260(n){return n<3?3:n<6?6:10}
function nextCount260(){
  const n=(S.cands||[]).length,limit=limit260();
  if(n>=limit)return 0;
  const target=Math.min(nextTarget260(n),limit);
  return Math.max(0,target-n);
}
function batch260(){
  if(S.egg||!Array.isArray(S.parents)||S.parents.length!==2)return;
  const a=parent260(S.parents[0]),b=parent260(S.parents[1]);if(!a||!b)return;
  const limit=limit260(),count=Math.min(nextCount260(),limit-(S.cands||[]).length);if(count<=0)return;
  const born=[];
  for(let i=0;i<count;i++){const c=baby(a,b);S.cands.push(c);born.push(c);S.dex.b=(Number(S.dex.b)||0)+1}
  const birth=document.getElementById('birth');
  if(birth){
    const order=['C','U','R','SR','SSR','UR','EX'];
    const best=[...born].sort((x,y)=>order.indexOf(y.rarity)-order.indexOf(x.rarity))[0];
    birth.innerHTML=`<div class="batchBirth260"><b>🥚 ${count}体誕生！</b><span>最高レア ${best?.rarity||'-'} / ${best?.name||''}</span><small>候補一覧から残したい3体を選ぼう。</small></div>`;
  }
  try{render()}catch(e){console.warn('batch260 render',e)}
}
function panel260(){
  const breed=document.getElementById('breedBtn');if(!breed)return;
  let box=document.getElementById('batchBreed260');
  if(!box){box=document.createElement('div');box.id='batchBreed260';box.className='batchBreed260';breed.parentElement?.after(box)}
  const n=(S.cands||[]).length,limit=limit260(),need=nextCount260(),ready=Array.isArray(S.parents)&&S.parents.length===2&&!S.egg&&n<limit;
  const phase=n<3?'最初の候補':n<6?'追加候補':'最終候補';
  box.innerHTML=`<div class="batchTop260"><div><small>BREEDING BATCH</small><b>候補 ${Math.min(n,limit)}/${limit}</b></div><span>${phase}</span></div><div class="batchBar260"><i style="width:${Math.min(100,n/limit*100)}%"></i></div><button id="batchGo260" class="btn or" ${ready?'':'disabled'}>${n===0?`🥚 ${Math.min(3,limit)}体まとめて誕生`:n>=limit?`今回の候補上限 ${limit}体`:`🥚 あと${need}体まとめて誕生`}</button><div class="batchHint260">${n<3?`まず${Math.min(3,limit)}体。現在の配合上限は${limit}体です。`:n<limit?`もっと比較したい時だけ追加生成。現在の上限は${limit}体。`:`${limit}体からベスト3を選べます。`}</div>`;
  box.querySelector('#batchGo260')?.addEventListener('click',batch260);
  const cnt=document.getElementById('cnt'),mx=document.getElementById('mx'),capEl=document.getElementById('cap');if(cnt)cnt.textContent=n;if(mx)mx.textContent=limit;if(capEl)capEl.textContent=limit;
  const cand=document.getElementById('candBox');if(cand&&n>=1)cand.classList.remove('hide');
  const adopt=document.getElementById('adopt');if(adopt)adopt.disabled=(S.sel||[]).length!==3;
}
function sync260(){try{panel260()}catch(e){console.warn('sync260',e)}}
function late260(){sync260();[50,150,360,700].forEach(ms=>setTimeout(sync260,ms))}
try{const prev260=render;render=function(){const out=prev260();late260();return out}}catch(e){console.warn('render260',e)}
window.addEventListener('click',e=>{if(e.target?.closest?.('[data-mode="p"],[data-mode="c"],#hatch,#adopt,.tab[data-v="breed"]'))late260()},true);
const css=document.createElement('style');css.textContent=`
.batchBreed260{margin:8px 0 10px;padding:10px;border:2px solid #e5a636;border-radius:13px;background:linear-gradient(145deg,#fff8df,#fff)}
.batchTop260{display:flex;justify-content:space-between;align-items:center;gap:8px}.batchTop260 small{display:block;font-size:6px;color:#9b7324;font-weight:1000;letter-spacing:.08em}.batchTop260 b{font-size:12px}.batchTop260 span{font-size:7px;font-weight:1000;color:#8b681f;background:#fff1b9;border:1px solid #e3c56b;border-radius:999px;padding:3px 7px}
.batchBar260{height:7px;background:#f1e4be;border-radius:999px;overflow:hidden;margin:7px 0 8px}.batchBar260 i{display:block;height:100%;background:linear-gradient(90deg,#e9ad36,#f4d45b);border-radius:999px;transition:width .25s ease}.batchBreed260 .btn{width:100%}.batchHint260{font-size:7px;color:#786d58;margin-top:6px;line-height:1.5}
.batchBirth260{margin:8px 0;padding:10px;border:2px solid #e5b64b;border-radius:12px;background:#fff7cf;text-align:center}.batchBirth260 b{display:block;font-size:13px}.batchBirth260 span{display:block;font-size:9px;font-weight:1000;margin-top:4px}.batchBirth260 small{display:block;font-size:7px;color:#756847;margin-top:4px}
`;document.head.appendChild(css);late260();
})();