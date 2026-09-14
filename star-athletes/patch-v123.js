(()=>{
function polishTraining123(){
 const plans=document.getElementById('plans'); if(!plans)return;
 plans.classList.add('trainingCards123');
 plans.querySelectorAll('.trainCard').forEach(card=>card.classList.add('athleteTrain123'));
}
const prevRender123=render;
render=function(){prevRender123();requestAnimationFrame(polishTraining123)};
const css=document.createElement('style');
css.textContent='.trainingCards123{display:grid;gap:10px}.athleteTrain123{display:grid!important;grid-template-columns:104px 1fr!important;gap:10px!important;align-items:stretch!important;border:2px solid #202a3b!important;border-radius:16px!important;background:linear-gradient(145deg,#fff,#f3f7ff)!important;overflow:hidden!important;box-shadow:0 5px 0 #0001!important;padding:8px!important}.athleteTrain123 .avatar{width:104px!important;height:116px!important;min-height:116px!important;border-radius:12px!important;overflow:hidden!important}.athleteTrain123 select{width:100%;margin-top:6px;padding:8px;border-radius:9px;font-weight:900}';
document.head.appendChild(css);
setTimeout(()=>{try{render()}catch(e){console.error(e)}},0);
})();