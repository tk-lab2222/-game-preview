(()=>{
// v0.31.18: make Nest Shop controls reliably tappable on mobile.
function buy306(id){
 try{
   const fn=typeof buy122==='function'?buy122:null;
   if(fn){fn(id);return}
 }catch(e){console.warn('buy306 buy122',e)}
 try{
   const fn=typeof buySpecial200==='function'?buySpecial200:null;
   if(fn){fn(id)}
 }catch(e){console.warn('buy306 special',e)}
}
document.addEventListener('click',e=>{
 const normal=e.target?.closest?.('#shop122 [data-buy122]');
 if(normal){
   e.preventDefault();e.stopPropagation();
   if(!normal.disabled)buy306(normal.dataset.buy122);
   return;
 }
 const special=e.target?.closest?.('#shop122 [data-special200]');
 if(special){
   e.preventDefault();e.stopPropagation();
   if(!special.disabled&&typeof buySpecial200==='function')buySpecial200(special.dataset.special200);
 }
},true);
const css=document.createElement('style');
css.id='shopMobile306';
css.textContent=`
#shop122{position:relative;z-index:2}
#shop122 .shopItem122,
#shop122 .specialGrid200 button,
#shop122 [data-buy122],
#shop122 [data-special200],
#shop122 select{
 pointer-events:auto!important;
 touch-action:manipulation!important;
 position:relative;
 z-index:3;
}
#shop122 [data-buy122],
#shop122 [data-special200]{min-height:42px}
#shop122 select{min-height:38px}
`;
document.head.appendChild(css);
})();