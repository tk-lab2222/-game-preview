(()=>{
'use strict';
// v0.31.79: MY STAR safety guard — never silently overwrite a saved hall entry.
if(window.STAR_MY_STAR_GUARD324)return;
function slots324(){try{return window.STAR_MY_STAR323?.slots?.()||[]}catch(_){return []}}
function warn324(){
 let t=document.getElementById('myStarGuardToast324');
 if(!t){t=document.createElement('div');t.id='myStarGuardToast324';document.body.appendChild(t)}
 t.innerHTML='<b>⭐ MY STAR は3体登録済み</b><span>大切な登録を守るため、自動では入れ替えません。</span>';
 t.classList.add('show324');clearTimeout(window.__starGuardToast324);window.__starGuardToast324=setTimeout(()=>t.classList.remove('show324'),2200);
}
function shouldBlock324(target){
 const b=target?.closest?.('[data-my-star323]');if(!b)return false;
 const arr=slots324(),id=b.dataset.myStar323;
 return arr.length>=3&&!arr.some(x=>x?.sourceId===id);
}
// window capture runs before the existing document capture handler in patch-v323.
// This narrowly guards only a fourth, new MY STAR registration.
window.addEventListener('click',e=>{
 if(!shouldBlock324(e.target))return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();warn324();
},true);
const css=document.createElement('style');css.textContent=`
#myStarGuardToast324{position:fixed;left:50%;bottom:86px;z-index:100003;width:min(330px,calc(100vw - 28px));transform:translate(-50%,16px);opacity:0;pointer-events:none;background:#21162e;color:#fff;border:1px solid #d9bd69;border-radius:13px;padding:10px 14px;box-shadow:0 10px 28px #0005;text-align:center;transition:.18s}#myStarGuardToast324.show324{opacity:1;transform:translate(-50%,0)}#myStarGuardToast324 b,#myStarGuardToast324 span{display:block}#myStarGuardToast324 b{color:#ffe477;font-size:11px}#myStarGuardToast324 span{font-size:8px;margin-top:3px;color:#e8e0f0}
`;document.head.appendChild(css);
window.STAR_MY_STAR_GUARD324={slots:slots324,shouldBlock:shouldBlock324};
})();