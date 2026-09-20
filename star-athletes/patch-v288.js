(()=>{
// v0.30.8: reliable lineage archive release.
// Base renderer re-creates buttons often, so own release via delegated capture instead of per-render onclick.
const SAVE288='star-athletes-save-v200';
function persist288(){
 try{localStorage.setItem(SAVE288,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.warn('save288',e)}
}
function release288(id,btn){
 if(!id||!Array.isArray(S.lineage))return;
 const idx=S.lineage.findIndex(m=>m?.id===id);if(idx<0)return;
 const [m]=S.lineage.splice(idx,1);
 if(!Array.isArray(S.released))S.released=[];
 if(!S.released.some(x=>x?.id===id))S.released.push(m);
 S.dex=S.dex||{};S.dex.rel=(Number(S.dex.rel)||0)+1;
 if(Array.isArray(S.parents))S.parents=S.parents.filter(x=>x!==id);
 persist288();
 try{render()}catch(e){console.warn('render release288',e)}
 const host=document.getElementById('lineagePool');
 if(host&&!S.lineage.length)host.innerHTML='<div class="sm">まだ過去世代はいません。</div>';
 const notice=document.getElementById('releaseNotice288')||document.createElement('div');
 notice.id='releaseNotice288';notice.className='releaseNotice288';
 notice.textContent=`${m?.name||'個体'}を血統アーカイブからリリースしました`;
 const poolBox=document.getElementById('lineagePool')?.closest('.box');
 if(poolBox){poolBox.appendChild(notice);setTimeout(()=>notice.remove(),1500)}
}
window.addEventListener('click',e=>{
 const b=e.target?.closest?.('#lineagePool [data-release]');
 if(!b)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 if(b.disabled)return;
 b.disabled=true;
 release288(b.dataset.release,b);
},true);
const css=document.createElement('style');css.textContent=`
#lineagePool [data-release]{position:relative;z-index:3;min-height:36px;touch-action:manipulation}
.releaseNotice288{margin-top:7px;padding:7px 9px;border-radius:9px;background:#163b2e;color:#fff;font-size:7px;font-weight:900}
`;document.head.appendChild(css);
})();