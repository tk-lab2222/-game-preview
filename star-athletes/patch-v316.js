(()=>{
// Mobile touch CSS only. Tournament selection is owned exclusively by patch-v290.
const css=document.createElement('style');css.id='meetGuard316';css.textContent=`
#season119 .meetChoice119 .meetChoiceCard125,
#season119 .meetChoice119 .meetCard290{pointer-events:auto!important;touch-action:manipulation!important}
/* Keep training-card artwork inside its 96px column. */
.train210>header{
  grid-template-columns:96px minmax(0,1fr)!important;
  align-items:start!important;
  overflow:hidden!important;
}
.train210>header>.avatar{
  width:96px!important;
  max-width:96px!important;
  min-width:96px!important;
  height:94px!important;
  overflow:hidden!important;
  contain:paint!important;
  position:relative!important;
  z-index:1!important;
}
.train210>header>.avatar .artimg{
  width:100%!important;
  max-width:100%!important;
  height:100%!important;
  object-fit:contain!important;
}
.train210>header>div:not(.avatar){
  min-width:0!important;
  position:relative!important;
  z-index:2!important;
}
.train210 .skillCore210,
.train210 .skills233{
  max-width:100%!important;
  min-width:0!important;
  overflow:hidden!important;
}
.train210 .skillHost246{
  max-width:100%!important;
}
`;document.head.appendChild(css);
})();