(()=>{
// v0.24.6: make learned skills visually distinct from 未取得, with per-skill colors.
const SK246={
 power:{icon:'💥',name:'豪腕',cls:'power246'},
 speed:{icon:'💨',name:'疾風',cls:'speed246'},
 stamina:{icon:'🔥',name:'鉄肺',cls:'stamina246'},
 agility:{icon:'✨',name:'軽業',cls:'agility246'},
 tech:{icon:'🎯',name:'精密',cls:'tech246'},
 guts:{icon:'❤️‍🔥',name:'勝負魂',cls:'guts246'}
};
function all246(){const out=[],seen=new Set();for(const k of ['starters','nest','lineage','released','cands','foster'])for(const m of(S[k]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);out.push(m)}if(S.egg&&!seen.has(S.egg.id))out.push(S.egg);return out}
function badges246(m){const ids=Array.isArray(m?.skills233)?m.skills233.filter(id=>SK246[id]):[];if(!ids.length)return '<span class="skillBadge246 none246">未取得</span>';return ids.map(id=>{const s=SK246[id];return `<span class="skillBadge246 ${s.cls}">${s.icon} ${s.name}</span>`}).join('')}
function find246(id){return id?all246().find(m=>m?.id===id)||null:null}
function sync246(){
 document.querySelectorAll('.train210').forEach(card=>{const m=find246(card.dataset.athlete210||card.querySelector('[data-m210]')?.dataset.m210);const host=card.querySelector('.skillCore210 b');if(m&&host){host.classList.add('skillHost246');host.innerHTML=badges246(m)}});
 document.querySelectorAll('.entries210>[data-m210]').forEach(card=>{const m=find246(card.dataset.m210);const s=[...card.querySelectorAll(':scope>small')].find(x=>(x.textContent||'').trim().startsWith('SKILL'));if(m&&s){s.classList.add('skillLine246');s.innerHTML=`<span class="skillLabel246">SKILL</span>${badges246(m)}`}});
 document.querySelectorAll('#breeders .card[data-id],#cands .card[data-id]').forEach(card=>{const m=find246(card.dataset.id),host=card.querySelector('.coreMeta243 strong');if(m&&host){host.classList.add('skillHost246');host.innerHTML=badges246(m)}});
 document.querySelectorAll('#lineagePool .card').forEach((card,i)=>{const m=(S.lineage||[])[i],host=card.querySelector('.coreMeta243 strong');if(m&&host){host.classList.add('skillHost246');host.innerHTML=badges246(m)}});
}
function late246(){sync246();setTimeout(sync246,40);setTimeout(sync246,180)}
try{const before246=render;render=function(){const out=before246();late246();return out}}catch(e){console.warn('render246',e)}
document.addEventListener('click',e=>{if(e.target.closest?.('.tab,#doTrain,#run,#next225,#adopt,#breedBtn,#hatch,[data-p210],[data-mode="p"],[data-mode="c"]'))late246()},false);
const css=document.createElement('style');css.textContent=`
.skillHost246{display:flex!important;gap:4px!important;flex-wrap:wrap!important;background:transparent!important;border:0!important;padding:0!important}.skillBadge246{display:inline-block!important;border-radius:999px!important;padding:3px 7px!important;font-size:7px!important;font-weight:1000!important;line-height:1.25!important;border:1px solid!important;white-space:nowrap}.none246{color:#7c8794!important;background:#f1f3f5!important;border-color:#c9d0d7!important}.power246{color:#8b2019!important;background:#ffe2df!important;border-color:#ee8e84!important}.speed246{color:#086d94!important;background:#dff6ff!important;border-color:#78cce9!important}.stamina246{color:#9a4d00!important;background:#fff0d7!important;border-color:#efb56e!important}.agility246{color:#6b3d91!important;background:#f1e4ff!important;border-color:#c39ae8!important}.tech246{color:#17674d!important;background:#dff7ed!important;border-color:#7bc9ab!important}.guts246{color:#9a2557!important;background:#ffe2ef!important;border-color:#e68ab1!important}.skillLine246{display:flex!important;align-items:center!important;gap:3px!important;flex-wrap:wrap!important;padding:4px 5px 0!important}.skillLabel246{font-size:6px!important;font-weight:1000!important;color:#77869a!important;margin-right:1px}.coreMeta243 .skillHost246{font-size:inherit!important;color:inherit!important}
`;document.head.appendChild(css);late246();
})();