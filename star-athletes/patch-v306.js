(()=>{
// v0.31.22: legacy mobile shop interception retired.
// Purchase handling is owned by patch-v309; keep only touch affordance CSS.
const css=document.createElement('style');css.id='shopMobile306';css.textContent=`
#shop122 [data-buy122],#shop122 [data-special200]{pointer-events:auto!important;touch-action:manipulation!important}
#shop122 select{pointer-events:auto!important;touch-action:auto!important;position:relative;z-index:3;min-height:38px}
#shop122 button{min-height:42px}
`;document.head.appendChild(css);
})();