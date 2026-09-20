(()=>{
// UI polish only: clarify tournament result/progression hierarchy without changing game state.
const css=document.createElement('style');
css.id='uiPolish304';
css.textContent=`
#meet .box{overflow-wrap:anywhere}
#result{margin-top:10px}
#result:empty{margin-top:0}
#result .sm,#rival .sm,#events .sm{line-height:1.55}
.meetNext303{padding-top:10px;border-top:1px solid rgba(34,34,34,.14)}
.meetNext303 .btn{min-height:46px;font-weight:900;line-height:1.25;white-space:normal}
.meetNext303 .btn:disabled{opacity:.5;filter:saturate(.65)}
#meet #run{min-height:46px;width:100%;font-weight:900}
@media(max-width:430px){
 #meet .box{padding-left:12px;padding-right:12px}
 #meet h3{margin-bottom:8px}
 #result{line-height:1.55}
 .meetNext303{gap:9px;margin-top:12px;padding-top:12px}
 .meetNext303 .btn,#meet #run{font-size:max(12px,3.2vw)}
}
@media(prefers-reduced-motion:reduce){
 .meetNext303 .btn,#meet #run{transition:none!important;animation:none!important}
}
`;
document.head.appendChild(css);
})();