(()=>{
'use strict';
if(document.getElementById('starUx317')) return;
const css=document.createElement('style');
css.id='starUx317';
css.textContent=`
/* UI-only polish: keep the persistent header readable on narrow phones. */
.top{gap:10px;align-items:flex-start}
.top>div:first-child{min-width:0;flex:1 1 auto}
.top>div:last-child{flex:0 0 auto;display:flex;gap:4px;flex-wrap:wrap;justify-content:flex-end}
.logo{overflow-wrap:anywhere}
#reloadBtn{min-height:36px;line-height:1.2}
@media (max-width:430px){
 .top{gap:7px}
 .top .logo{font-size:clamp(15px,4.6vw,19px);line-height:1.15}
 .top>div:first-child>.sm{line-height:1.35}
 .top .p{display:inline-flex;align-items:center;min-height:28px;padding:4px 7px;white-space:nowrap}
 #reloadBtn{padding:7px 9px!important;font-size:10px!important}
}
@media (max-width:360px){
 .top{flex-wrap:wrap}
 .top>div:last-child{width:100%;justify-content:flex-start}
 #reloadBtn{min-height:38px}
}
`;
document.head.appendChild(css);
window.STAR_UX317={scope:'mobile-header-readability',logicChanges:false};
})();
