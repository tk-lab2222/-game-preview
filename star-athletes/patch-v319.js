(()=>{
'use strict';
if(document.getElementById('starUx319')) return;
const css=document.createElement('style');
css.id='starUx319';
css.textContent=`
/* UI-only polish: six destinations stay on one readable mobile navigation row. */
.tabs{grid-template-columns:repeat(6,minmax(0,1fr));gap:2px}
.tabs .tab{min-width:0;overflow-wrap:anywhere;font-size:10px;padding-inline:2px}
@media (max-width:390px){
 .tabs{gap:0;padding-left:3px;padding-right:3px}
 .tabs .tab{font-size:9px;padding-left:1px;padding-right:1px}
}
@media (max-width:340px){
 .tabs .tab{font-size:8px;letter-spacing:-.02em}
}
`;
document.head.appendChild(css);
window.STAR_UX319={scope:'six-tab-mobile-navigation',logicChanges:false};
})();
