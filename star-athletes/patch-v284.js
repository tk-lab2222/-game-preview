(()=>{
'use strict';
if(document.getElementById('starUx284')) return;
const css=document.createElement('style');
css.id='starUx284';
css.textContent=`
/* v0.30.2 UI polish: mobile tap comfort only; no game-state changes. */
button,.btn,.tab{-webkit-tap-highlight-color:transparent;touch-action:manipulation}
.btn{min-height:40px}
.tabs{padding-bottom:max(4px,env(safe-area-inset-bottom));height:auto;min-height:58px}
.tabs .tab{min-height:52px;line-height:1.25;padding:6px 4px}
@media (max-width:430px){
  .a{padding-bottom:calc(72px + env(safe-area-inset-bottom))}
  .box{scroll-margin-bottom:78px}
  .opts button,.chips button{min-height:36px}
  input[type="checkbox"],input[type="radio"]{min-width:18px;min-height:18px}
}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
}
`;
document.head.appendChild(css);
window.STAR_UX284={version:'0.30.2',scope:'mobile-tap-safe-area'};
})();
