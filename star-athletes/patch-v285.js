(()=>{
// v0.30.3 / information architecture polish.
// Missions = goals, Breed = breeding research, Training = LIMIT growth, Representative = competitive team.
const SECTIONS285=['breed','train','meet','nest201','mission203','rep285','dex'];
function ensureSection285(){
 const app=document.querySelector('.a');if(!app)return;
 let sec=document.getElementById('rep285');
 if(!sec){
  sec=document.createElement('section');sec.id='rep285';sec.className='hide';
  const dex=document.getElementById('dex');dex?.before(sec);if(!sec.parentNode)app.appendChild(sec);
 }
 if(!sec.querySelector('.sectionTitle285')){
  const h=document.createElement('div');h.className='sectionTitle203 sectionTitle285';
  h.innerHTML='<small>NEST REPRESENTATIVE</small><h2>🏁 ネスト代表</h2><p>自分史上最高の3体を選び、役割・戦術・シナジーを磨く</p>';
  sec.prepend(h);
 }
 const tabs=document.querySelector('.tabs');
 if(tabs&&!tabs.querySelector('.tab[data-v="rep285"]')){
  const b=document.createElement('button');b.className='tab';b.dataset.v='rep285';b.innerHTML='🏁<br>代表';
  const dexTab=tabs.querySelector('.tab[data-v="dex"]');dexTab?.before(b);if(!b.parentNode)tabs.appendChild(b);
 }
}
function show285(id){
 ensureSection285();
 SECTIONS285.forEach(x=>{const e=document.getElementById(x);if(e)e.classList.toggle('hide',x!==id)});
 document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.v===id));
 if(['nest201','mission203','rep285','breed'].includes(id))requestAnimationFrame(()=>{try{window.paintSpecies&&window.paintSpecies()}catch(_){}});
}
function bind285(){
 ensureSection285();window.show=show285;
 document.querySelectorAll('.tab').forEach(t=>{t.onclick=e=>{e.preventDefault();show285(t.dataset.v)}});
}
function host285(id,parent,after){
 let h=document.getElementById(id);
 if(!h){h=document.createElement('div');h.id=id;h.className='iaHost285';if(after?.parentNode)after.after(h);else parent?.appendChild(h)}
 return h;
}
function relocate285(){
 ensureSection285();
 // 配合研究ノート -> 配合
 const breed=document.getElementById('breed'),lineage=document.getElementById('lineagePool')?.closest('.box'),research=document.getElementById('research276');
 if(breed&&research){const h=host285('breedResearchHost285',breed,lineage);if(research.parentElement!==h)h.appendChild(research)}
 // LIMIT解放/限界育成 -> 育成
 const train=document.getElementById('train'),prep=document.getElementById('prep')?.closest('.box');
 const lp=document.getElementById('limitPanel278'),lt=document.getElementById('limitTrain279');
 if(train&&(lp||lt)){
  const h=host285('limitHost285',train,prep);
  if(!h.querySelector('.iaTitle285'))h.insertAdjacentHTML('afterbegin','<div class="iaTitle285"><small>END GAME TRAINING</small><b>⚡ LIMIT</b><span>シナリオ後の成長</span></div>');
  if(lp&&lp.parentElement!==h)h.appendChild(lp);if(lt&&lt.parentElement!==h)h.appendChild(lt);
 }
 // ネスト代表 / 代表共有 -> 独立タブ
 const repSec=document.getElementById('rep285'),rep=document.getElementById('rep280');
 if(repSec&&rep&&rep.parentElement!==repSec)repSec.appendChild(rep);
 // 継続チャレンジ -> ミッション（血統ミッション直下）
 const mission=document.getElementById('missionHost203'),cont=document.getElementById('continuity281'),board=mission?.querySelector('.missionBoard269');
 if(mission&&cont){if(cont.parentElement!==mission)mission.appendChild(cont);if(board&&cont.previousElementSibling!==board)board.after(cont)}
}
function sync285(){bind285();relocate285()}
function late285(){sync285();[80,220,500,900].forEach(ms=>setTimeout(sync285,ms))}
try{const prev285=render;render=function(){const out=prev285();setTimeout(late285,0);return out}}catch(e){console.warn('render285',e)}
window.addEventListener('click',e=>{if(e.target?.closest?.('.tab,#batchGo260,#hatch,#adopt,#doTrain263,#limitGo279,#register280,#run,#next225,#annualNext233'))setTimeout(late285,0)},true);
const css=document.createElement('style');css.textContent=`
#rep285{padding-bottom:90px}.sectionTitle285{margin-top:8px}.iaHost285{margin:0 0 10px}.iaHost285>.box{margin:0 0 10px!important}
.iaTitle285{display:flex;align-items:center;gap:7px;margin:10px 0 8px;padding:9px 10px;border-radius:12px;background:#17243a;color:#fff}.iaTitle285 small{font-size:6px;letter-spacing:.12em;color:#8fdfff;font-weight:1000}.iaTitle285 b{font-size:12px}.iaTitle285 span{margin-left:auto;font-size:6px;color:#becdde}
#rep285>.rep280{margin-top:0!important}.tabs{grid-template-columns:none!important;display:flex!important;overflow-x:auto!important}.tabs .tab{flex:1 0 64px!important;min-width:64px!important}
`;document.head.appendChild(css);setTimeout(late285,0);
})();