(()=>{
// Tournament mobile tap compatibility only.
// Selection ownership lives in patch-v290.
function sync316(){
 const wrap=document.querySelector('#season119 .meetChoice119');if(!wrap)return;
 wrap.querySelectorAll('.meetChoiceCard125,.meetCard290').forEach(card=>{
   card.style.pointerEvents='auto';card.style.touchAction='manipulation';
 });
}
try{const prev=render;render=function(){const out=prev();setTimeout(sync316,0);return out}}catch(_){}
const css=document.createElement('style');css.id='meetGuard316';css.textContent=`
#season119 .meetChoice119 .meetChoiceCard125,
#season119 .meetChoice119 .meetCard290{pointer-events:auto!important;touch-action:manipulation!important}
`;document.head.appendChild(css);
setTimeout(sync316,0);
window.STAR_MEET316={sync:sync316};
})();