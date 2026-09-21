(()=>{
// v0.24.7: stable skill badges across season/generation re-renders + definitive legacy affinity cleanup.
const SK247={
 power:{icon:'💥',name:'豪腕',cls:'power247'},speed:{icon:'💨',name:'疾風',cls:'speed247'},stamina:{icon:'🔥',name:'鉄肺',cls:'stamina247'},
 agility:{icon:'✨',name:'軽業',cls:'agility247'},tech:{icon:'🎯',name:'精密',cls:'tech247'},guts:{icon:'❤️‍🔥',name:'勝負魂',cls:'guts247'}
};
function all247(){const out=[],seen=new Set();for(const k of ['starters','nest','lineage','released','cands','foster'])for(const m of(S[k]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);out.push(m)}if(S.egg&&!seen.has(S.egg.id))out.push(S.egg);return out}
function byId247(id){return id?all247().find(m=>m?.id===id)||null:null}
function badgeHtml247(m){const ids=Array.isArray(m?.skills233)?m.skills233.filter(x=>SK247[x]):[];if(!ids.length)return '<span class="skillBadge247 none247">未取得</span>';return ids.map(id=>{const s=SK247[id];return `<span class="skillBadge247 ${s.cls}">${s.icon} ${s.name}</span>`}).join('')}
function put247(card,m,host){if(!card||!m||!host)return;let row=card.querySelector(':scope .skillStable247');if(!row){row=document.createElement('div');row.className='skillStable247';host.appendChild(row)}row.innerHTML=`<span class="skillLabel247">SKILL</span><div class="skillBadges247">${badgeHtml247(m)}</div>`}
function skills247(){
 // Hide older competing skill renderers; this patch owns the visible skill row.
 document.querySelectorAll('.skillCard235,.skillCard241,.skillMini241,.skillCore210,.skillLine246,.coreMeta243>div>strong.skillHost246').forEach(x=>x.style.display='none');
 document.querySelectorAll('#breeders .card[data-id],#cands .card[data-id]').forEach(card=>put247(card,byId247(card.dataset.id),card.querySelector('.bd')||card));
 document.querySelectorAll('#lineagePool .card').forEach((card,i)=>{const id=card.dataset.id;put247(card,id?byId247(id):(S.lineage||[])[i],card.querySelector('.bd')||card)});
 document.querySelectorAll('.train210').forEach(card=>{const id=card.dataset.athlete210||card.querySelector('[data-m210]')?.dataset.m210;put247(card,byId247(id),card.querySelector('header>div')||card)});
 document.querySelectorAll('.entries210>[data-m210]').forEach(card=>put247(card,byId247(card.dataset.m210),card));
}
function sync247(){try{skills247()}catch(e){console.warn('sync247',e)}}
function late247(){sync247();[30,120,320,700].forEach(ms=>setTimeout(sync247,ms))}
try{const prev247=render;render=function(){const out=prev247();late247();return out}}catch(e){console.warn('render247',e)}
window.addEventListener('click',e=>{if(e.target?.closest?.('.tab,#doTrain,#run,#next225,#adopt,#breedBtn,#hatch,[data-p210],[data-e210],[data-mode="p"],[data-mode="c"]'))late247()},true);
window.addEventListener('load',late247,{once:true});
const css=document.createElement('style');css.textContent=`
.skillStable247{display:flex!important;align-items:center!important;gap:5px!important;flex-wrap:wrap!important;margin-top:5px!important;padding-top:4px!important;border-top:1px dotted #ccd5df!important}.skillLabel247{font-size:6px!important;font-weight:1000!important;color:#77869a!important;letter-spacing:.08em}.skillBadges247{display:flex!important;gap:4px!important;flex-wrap:wrap!important}.skillBadge247{display:inline-block!important;border-radius:999px!important;padding:3px 7px!important;font-size:7px!important;font-weight:1000!important;line-height:1.25!important;border:1px solid!important;white-space:nowrap!important}.none247{color:#7c8794!important;background:#f1f3f5!important;border-color:#c9d0d7!important}.power247{color:#8b2019!important;background:#ffe2df!important;border-color:#ee8e84!important}.speed247{color:#086d94!important;background:#dff6ff!important;border-color:#78cce9!important}.stamina247{color:#9a4d00!important;background:#fff0d7!important;border-color:#efb56e!important}.agility247{color:#6b3d91!important;background:#f1e4ff!important;border-color:#c39ae8!important}.tech247{color:#17674d!important;background:#dff7ed!important;border-color:#7bc9ab!important}.guts247{color:#9a2557!important;background:#ffe2ef!important;border-color:#e68ab1!important}.entries210>.skillStable247{margin:3px 5px!important;padding-top:3px!important}
`;document.head.appendChild(css);late247();
})();