(()=>{
// v0.20.3: make extended tabs real sections and keep training focused.
const SECTION_IDS203=['breed','train','meet','nest201','mission203','dex'];
function show203(id){
  SECTION_IDS203.forEach(x=>{const e=document.getElementById(x);if(e)e.classList.toggle('hide',x!==id)});
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.v===id));
  if(id==='nest201'||id==='mission203') requestAnimationFrame(()=>{try{window.paintSpecies&&window.paintSpecies()}catch(_){}});
}
window.show=show203;
function bindTabs203(){
  document.querySelectorAll('.tab').forEach(t=>{t.onclick=e=>{e.preventDefault();show203(t.dataset.v)}});
}
function relocate203(){
  const shop=document.getElementById('shop122');
  const shopHost=document.getElementById('nestShopHost201');
  if(shop&&shopHost&&shop.parentElement!==shopHost)shopHost.appendChild(shop);
  const mission=document.getElementById('mission200');
  const missionHost=document.getElementById('missionHost203');
  if(mission&&missionHost&&mission.parentElement!==missionHost)missionHost.appendChild(mission);
  // Safety: remove any accidental duplicate placement remnants in training.
  const train=document.getElementById('train');
  if(train){
    train.querySelectorAll('#shop122,#mission200').forEach(el=>{
      if(el.id==='shop122'&&shopHost)shopHost.appendChild(el);
      if(el.id==='mission200'&&missionHost)missionHost.appendChild(el);
    });
  }
}
function decorateSections203(){
  const nest=document.getElementById('nest201');
  if(nest){
    let h=nest.querySelector('.sectionTitle203');
    if(!h){h=document.createElement('div');h.className='sectionTitle203';h.innerHTML='<small>NEST BASE</small><h2>🏠 ネストショップ</h2><p>大会で稼いだコインを育成・配合へ還元</p>';nest.insertBefore(h,nest.firstChild)}
  }
  const missionSec=document.getElementById('mission203');
  if(missionSec){
    let h=missionSec.querySelector('.sectionTitle203');
    if(!h){h=document.createElement('div');h.className='sectionTitle203';h.innerHTML='<small>STAR MISSIONS</small><h2>🎯 ミッション</h2><p>配合・大会・ネスト成長の目標と報酬</p>';missionSec.insertBefore(h,missionSec.firstChild)}
  }
}
const prevRender203=render;
render=function(){
  const out=prevRender203();
  relocate203();bindTabs203();decorateSections203();
  setTimeout(()=>{relocate203();bindTabs203();decorateSections203()},0);
  return out;
};
const css=document.createElement('style');css.textContent=`
.sectionTitle203{margin:8px 0 10px;padding:13px 14px;border-radius:16px;background:linear-gradient(145deg,#121d31,#263f65);color:#fff;box-shadow:0 5px 0 #0002}.sectionTitle203 small{font-size:7px;letter-spacing:.16em;font-weight:1000;color:#75dcff}.sectionTitle203 h2{font-size:17px;margin:2px 0 3px}.sectionTitle203 p{margin:0;font-size:8px;opacity:.72;font-weight:800}
#mission203{padding-bottom:90px}.tabs{grid-template-columns:repeat(6,minmax(64px,1fr))!important;overflow-x:auto!important}.tabs .tab{min-width:64px!important}
#train>#shop122,#train>#mission200{display:none!important}
`;
document.head.appendChild(css);
bindTabs203();relocate203();decorateSections203();
setTimeout(()=>{try{render()}catch(e){console.error('v0.20.3 init',e)}},0);
})();