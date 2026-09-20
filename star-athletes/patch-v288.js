(()=>{
// v0.30.9: archive release + minimum two-parent safety.
const SAVE288='star-athletes-save-v200';
function uniqPool288(){
 const out=[],seen=new Set();
 for(const key of ['starters','lineage','nest'])for(const m of(S[key]||[]))if(m?.id&&!seen.has(m.id)){seen.add(m.id);out.push(m)}
 return out;
}
function persist288(){try{localStorage.setItem(SAVE288,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.warn('save288',e)}}
function find288(id){return uniqPool288().find(m=>m.id===id)||null}
function canRelease288(id){
 const m=find288(id);if(!m)return false;
 const ids=new Set(uniqPool288().map(x=>x.id));
 ids.delete(id);
 return ids.size>=2;
}
function prune288(){
 const valid=new Set((S.lineage||[]).map(m=>m?.id).filter(Boolean));
 document.querySelectorAll('#lineagePool [data-release]').forEach(b=>{
   const card=b.closest('.card'),id=b.dataset.release;
   if(!valid.has(id))card?.remove();
   else{b.disabled=!canRelease288(id);b.title=b.disabled?'配合候補を2体未満にはできません':'血統アーカイブからリリース'}
 });
 const count=document.getElementById('poolCount');if(count)count.textContent=(S.lineage||[]).length;
 const host=document.getElementById('lineagePool');if(host&&!host.querySelector('.card')&&!(S.lineage||[]).length)host.innerHTML='<div class="sm">まだ過去世代はいません。</div>';
}
function release288(id,card){
 if(!id||!canRelease288(id))return;
 const m=find288(id);if(!m)return;
 S.lineage=(S.lineage||[]).filter(x=>x?.id!==id);
 S.starters=(S.starters||[]).filter(x=>x?.id!==id);
 if(!Array.isArray(S.released))S.released=[];
 if(!S.released.some(x=>x?.id===id))S.released.push(m);
 S.dex=S.dex||{};S.dex.rel=(Number(S.dex.rel)||0)+1;
 if(Array.isArray(S.parents))S.parents=S.parents.filter(x=>x!==id);
 card?.remove();
 persist288();
 try{render()}catch(e){console.warn('render release288',e)}
 [0,60,180,400].forEach(ms=>setTimeout(prune288,ms));
 const poolBox=document.getElementById('lineagePool')?.closest('.box');
 if(poolBox){
  let notice=document.getElementById('releaseNotice288');if(!notice){notice=document.createElement('div');notice.id='releaseNotice288';notice.className='releaseNotice288';poolBox.appendChild(notice)}
  notice.textContent=`${m.name||'個体'}をリリースしました`;setTimeout(()=>notice.remove(),1400);
 }
}
function decorateFounderRelease288(){
 // 初代も、現役ではなくアーカイブ側に存在する場合は通常個体と同じルールでリリース可能。
 const all=new Map(uniqPool288().map(m=>[m.id,m]));
 document.querySelectorAll('#lineagePool .card').forEach((card,i)=>{
   let b=card.querySelector('[data-release]');
   if(!b){
    const m=(S.lineage||[])[i];if(!m)return;
    b=document.createElement('button');b.type='button';b.className='btn tiny';b.dataset.release=m.id;b.textContent='リリース';(card.querySelector('.bd')||card).appendChild(b)
   }
   b.disabled=!canRelease288(b.dataset.release);
 });
}
function sync288(){decorateFounderRelease288();prune288()}
window.addEventListener('click',e=>{
 const b=e.target?.closest?.('#lineagePool [data-release]');if(!b)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 if(b.disabled)return;
 release288(b.dataset.release,b.closest('.card'));
},true);
try{const prev288=render;render=function(){const out=prev288();setTimeout(sync288,0);return out}}catch(e){console.warn('render288',e)}
const css=document.createElement('style');css.textContent=`
#lineagePool [data-release]{position:relative;z-index:3;min-height:36px;touch-action:manipulation}
#lineagePool [data-release]:disabled{opacity:.42}
.releaseNotice288{margin-top:7px;padding:7px 9px;border-radius:9px;background:#163b2e;color:#fff;font-size:7px;font-weight:900}
`;document.head.appendChild(css);setTimeout(sync288,0);
})();