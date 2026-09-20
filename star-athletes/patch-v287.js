(()=>{
'use strict';
if(document.getElementById('starUx287')) return;
const css=document.createElement('style');
css.id='starUx287';
css.textContent=`
/* UI polish: control-state clarity and narrow-screen text resilience only. */
button,.btn,.tab,summary{font-family:inherit}
button:disabled,.btn:disabled{opacity:.48;filter:saturate(.65);cursor:not-allowed}
button:focus-visible,.btn:focus-visible,.tab:focus-visible,summary:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid currentColor;outline-offset:2px}
.box,.card,.par,.iaHost285,.nestHost201{overflow-wrap:anywhere}
.btn{white-space:normal;line-height:1.3}
.tabs .tab{white-space:nowrap}
@media (max-width:380px){
  .top{gap:8px}
  .top .p{display:inline-flex;align-items:center;margin:2px 0}
  .parents{gap:6px}
  .par{min-width:0}
}
@media (hover:hover) and (pointer:fine){
  button:not(:disabled),.btn:not(:disabled),.tab,summary{cursor:pointer}
}
`;
document.head.appendChild(css);
window.STAR_UX287={version:'0.30.7',scope:'control-states-text-resilience'};
})();