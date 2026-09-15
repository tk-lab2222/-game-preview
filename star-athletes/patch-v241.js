(()=>{
// v0.24.1: keep SKILL status visible even when older renderers redraw monster cards later.
const SK241={
 power:{name:'豪腕',icon:'💥'},speed:{name:'疾風',icon:'💨'},stamina:{name:'鉄肺',icon:'🔥'},
 agility:{name:'軽業',icon:'✨'},tech:{name:'精密',icon:'🎯'},guts:{name:'勝負魂',icon:'❤️‍🔥'}
};
function all241(){
 const out=[],seen=new Set();
 for(const key of ['starters','nest','lineage','released','cands','foster'])for(const m of(S[key]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);out.push(m)}
 if(S.egg&&!seen.has(S.egg.id))out.push(S.egg);
 return out;
}
function find241(id){return id?all241().find(x=>x?.id===id)||null:null}
function skillText241(m){
 const ids=Array.isArray(m?.skills233)?m.skills233:[];
 const names=ids.map(id=>SK241[id]?`${SK241[id].icon} ${SK241[id].name}`:null).filter(Boolean);
 return names.length?names.join(' / '):'未取得';
}
function put241(card,m,host){
 if(!card||!m||!host)return;
 card.querySelectorAll('.skillCard235,.skillCard241').forEach((x,i)=>{if(i)x.remove()});
 let row=card.querySelector('.skillCard241')||card.querySelector('.skillCard235');
 if(!row){row=document.createElement('div');host.appendChild(row)}
 row.className='skillCard241';
 const text=skillText241(m);row.classList.toggle('has241',text!=='未取得');
 row.innerHTML=`<span>SKILL</span><b>${text}</b>`;
}
function sync241(){
 document.querySelectorAll('#breeders .card[data-id],#lineagePool .card[data-id],#cands .card[data-id]').forEach(card=>{
   put241(card,find241(card.dataset.id),card.querySelector('.bd')||card);
 });
 document.querySelectorAll('.train210').forEach(card=>{
   const id=card.querySelector('[data-m210]')?.dataset?.m210;
   put241(card,(S.nest||[]).find(x=>x?.id===id),card.querySelector('header>div')||card);
 });
 document.querySelectorAll('.entries210>[data-m210]').forEach(card=>{
   const m=(S.nest||[]).find(x=>x?.id===card.dataset.m210);if(!m)return;
   let row=card.querySelector('.skillMini241');if(!row){row=document.createElement('div');row.className='skillMini241';card.querySelector(':scope>b')?.after(row)}
   const text=skillText241(m);row.textContent=`SKILL ${text}`;row.classList.toggle('has241',text!=='未取得');
 });
}
function late241(){sync241();setTimeout(sync241,30);setTimeout(sync241,120);setTimeout(sync241,350)}
try{const before241=render;render=function(){const out=before241();late241();return out}}catch(e){console.warn('render241',e)}
window.addEventListener('click',e=>{
 if(e.target?.closest?.('.tab,[data-mode="p"],[data-mode="c"],[data-p210],[data-e210],#adopt,#breedBtn,#hatch,#doTrain,#toMeet,#next217,#next225'))late241();
},true);
const css=document.createElement('style');css.textContent=`
.skillCard241{display:flex!important;align-items:center;gap:6px;margin-top:6px;padding-top:5px;border-top:1px dotted #cbd5df}.skillCard241 span{font-size:6px;font-weight:1000;letter-spacing:.08em;color:#77869a}.skillCard241 b{display:inline-block!important;font-size:7px!important;font-weight:1000!important;color:#6d7888!important;background:#eef1f5;border:1px solid #c7d0db;border-radius:999px;padding:3px 6px}.skillCard241.has241 b{color:#5b367f!important;background:#f2e8ff;border-color:#b996d9}.skillMini241{margin:2px 5px 0;font-size:6px;font-weight:900;color:#77869a}.skillMini241.has241{color:#6a3e8d}
`;
document.head.appendChild(css);
late241();
})();