(()=>{
// v0.31.10: keep lineage archive helper text inside the card on narrow screens.
const css=document.createElement('style');
css.id='lineageArchiveText297';
css.textContent=`
#lineagePool + .sm,
#lineagePool ~ .sm,
#lineagePool .sm{
  display:block!important;
  width:100%!important;
  max-width:100%!important;
  min-width:0!important;
  box-sizing:border-box!important;
  white-space:normal!important;
  overflow-wrap:anywhere!important;
  word-break:break-word!important;
  line-height:1.55!important;
}
#lineagePool{min-width:0!important;max-width:100%!important}
#lineagePool .card{min-width:0!important;max-width:100%!important;box-sizing:border-box!important}
@media(max-width:430px){
 #lineagePool + .sm,
 #lineagePool ~ .sm,
 #lineagePool .sm{font-size:8px!important}
}
`;
document.head.appendChild(css);
})();