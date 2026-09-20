(()=>{
// UI polish only: improve Generation Season tournament card readability/touch layout.
// No game state, balance, save, render ownership, or MutationObserver changes.
const css=document.createElement('style');
css.dataset.starUiPolish291='1';
css.textContent=`
.meetCard290{min-height:96px;padding:10px 11px!important;text-align:left;line-height:1.35}
.meetCard290 .tier290{margin-bottom:5px}
.meetCard290 .tier290>b{font-size:10px!important;line-height:1.3}
.meetCard290 .chance290{font-size:11px!important;white-space:nowrap}
.meetCard290 .reward290{font-size:9px!important;line-height:1.35;margin-bottom:5px;color:#596674}
.meetCard290>b{display:block;font-size:13px;line-height:1.35;margin-bottom:3px}
.meetCard290>span,.meetCard290>small{display:block;overflow-wrap:anywhere}
.meetCard290>span{font-size:10px;line-height:1.45}
.meetCard290>small{font-size:9px;line-height:1.45;margin-top:3px}
.meetCard290>em{display:block;margin-top:7px;font-size:9px;font-style:normal;font-weight:900}
.meetCard290.sel>em{font-size:10px}
@media(max-width:430px){
 .meetChoice119{gap:8px!important}
 .meetCard290{width:100%;min-width:0;min-height:104px;padding:11px 12px!important}
 .meetCard290 .tier290{align-items:flex-start;flex-wrap:wrap}
 .meetCard290 .chance290{margin-left:auto}
 .meetCard290>b{font-size:14px}
 .meetCard290>span{font-size:11px}
 .meetCard290>small{font-size:10px}
}
@media(prefers-reduced-motion:reduce){.meetCard290{transition:none!important}}
`;
document.head.appendChild(css);
})();