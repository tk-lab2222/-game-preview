(()=>{
function polishPrep124(){
 const prep=document.getElementById('prep'); if(!prep)return;
 prep.classList.add('prepCards124');
 prep.querySelectorAll('.meetEvt115').forEach(e=>e.classList.add('meetBlock124'));
 prep.querySelectorAll('.meetPickCard').forEach(b=>b.classList.add('entrantCard124'));
}
const prevRender124=render;
render=function(){prevRender124();requestAnimationFrame(polishPrep124)};
const css=document.createElement('style');css.textContent=`
.prepCards124{display:grid;gap:12px}.meetBlock124{border:2px solid #1c2635!important;border-radius:16px!important;background:#f8fbff!important;box-shadow:0 5px 0 #0001!important}.meetBlock124 .meetEvtHead>b{font-size:14px}.meetPickGrid{gap:8px!important}.entrantCard124{transition:.15s transform,.15s box-shadow}.entrantCard124:active{transform:scale(.97)}.entrantCard124.sel{outline:3px solid #57c7ff!important;box-shadow:0 0 0 4px #dff5ff!important}.entrantCard124 .avatar{height:96px!important;background:linear-gradient(#eef8ff,#fff)!important}.meetStrategy select{padding:8px;border-radius:9px;font-weight:900;background:#fff}
`;document.head.appendChild(css);setTimeout(()=>{try{render()}catch(e){console.error(e)}},0);
})();