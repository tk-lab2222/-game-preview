(()=>{
// v0.25.4: make skill inheritance and compatibility scouting explicit on the breeding screen.
const SK254={
 power:{icon:'💥',name:'豪腕',cls:'power254'},speed:{icon:'💨',name:'疾風',cls:'speed254'},stamina:{icon:'🔥',name:'鉄肺',cls:'stamina254'},
 agility:{icon:'✨',name:'軽業',cls:'agility254'},tech:{icon:'🎯',name:'精密',cls:'tech254'},guts:{icon:'❤️‍🔥',name:'勝負魂',cls:'guts254'}
};
const RK254=['G','F','E','D','C','B','A','S'];
function n254(v){return Number(v)||0}
function all254(){const out=[],seen=new Set();for(const k of ['starters','nest','lineage','released','cands','foster'])for(const m of(S[k]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);out.push(m)}if(S.egg&&!seen.has(S.egg.id))out.push(S.egg);return out}
function byId254(id){return id?all254().find(m=>m?.id===id)||null:null}
function rank254(v){return RK254[Math.max(0,Math.min(7,Math.round(n254(v))))]}
function skillBadges254(m){const ids=Array.isArray(m?.skills233)?m.skills233.filter(x=>SK254[x]):[];return ids.length?ids.map(id=>{const s=SK254[id];return `<span class="breedSkillBadge254 ${s.cls}">${s.icon} ${s.name}</span>`}).join(''):'<span class="breedSkillBadge254 none254">未修得</span>'}
function putSkill254(card,m,host){
 if(!card||!m||!host)return;
 card.querySelectorAll('.skillUnified254').forEach(x=>x.remove());
 const row=document.createElement('div');row.className='skillUnified254';
 row.innerHTML=`<span class="skillLabelUnified254">SKILL</span><div>${skillBadges254(m)}</div>`;
 host.appendChild(row);
}
function cardSkills254(){
 document.querySelectorAll('#breeders .card[data-id],#cands .card[data-id]').forEach(card=>{
   const m=byId254(card.dataset.id);if(!m)return;putSkill254(card,m,card.querySelector('.bd')||card);
 });
 document.querySelectorAll('#lineagePool .card').forEach((card,i)=>{
   const m=card.dataset.id?byId254(card.dataset.id):(S.lineage||[])[i];if(!m)return;putSkill254(card,m,card.querySelector('.bd')||card);
 });
 document.querySelectorAll('.train210').forEach(card=>{
   const id=card.dataset.athlete210||card.querySelector('[data-m210]')?.dataset.m210;
   const m=byId254(id);if(!m)return;putSkill254(card,m,card.querySelector('header>div')||card);
 });
 document.querySelectorAll('.entries210>[data-m210]').forEach(card=>{
   const m=byId254(card.dataset.m210);if(!m)return;putSkill254(card,m,card);
 });
}
function selected254(){const ids=Array.isArray(S.parents)?S.parents:[];return [byId254(ids[0]),byId254(ids[1])]}
function score254(a,b){try{return window.STAR_ANNUAL233?.compatibility?.(a,b)?.total??null}catch(_){return null}}
function skillChance254(id,a,b){const aa=(a?.skills233||[]).includes(id),bb=(b?.skills233||[]).includes(id);if(!aa&&!bb)return 0;let p=aa&&bb?35:18;const hr=Math.max(n254(a?.hidden233?.heredity),n254(b?.hidden233?.heredity));if(hr>=6)p+=hr===7?8:5;return p}
function scoutRows254(a,b,score){
 const h1=a?.hidden233||{},h2=b?.hidden233||{},avg=k=>rank254((n254(h1[k])+n254(h2[k]))/2),rows=[];
 if(score>=40)rows.push(['成長力',avg('growth')]);
 if(score>=60){rows.push(['遺伝力',avg('heredity')]);rows.push(['安定性',avg('stability')])}
 if(score>=75){rows.push(['勝負強さ',avg('clutch')]);if(h1.temperament||h2.temperament)rows.push(['気性',`${h1.temperament||'-'} × ${h2.temperament||'-'}`])}
 if(score>=90){rows.push(['変異因子',avg('mutation')]);rows.push(['LUCK',avg('luck')])}
 return rows;
}
function compat254(){
 const box=document.getElementById('compat321');if(!box)return;
 const [a,b]=selected254();if(!a||!b){box.querySelector('.breedIntel254')?.remove();return}
 const score=score254(a,b);if(score==null)return;
 let panel=box.querySelector('.breedIntel254');if(!panel){panel=document.createElement('div');panel.className='breedIntel254';box.appendChild(panel)}
 const rows=scoutRows254(a,b,score);
 const candidates=[...new Set([...(a.skills233||[]),...(b.skills233||[])])].filter(x=>SK254[x]);
 const skills=candidates.length?candidates.map(id=>{const s=SK254[id],p=skillChance254(id,a,b);return `<span class="inheritSkill254 ${s.cls}">${s.icon} ${s.name}<b>${p}%</b></span>`}).join(''):'<span class="inheritNone254">親に継承可能スキルなし</span>';
 let hint=score<40?'相性40以上で成長力が見える':score<60?'相性60以上で遺伝力・安定性が見える':score<75?'相性75以上で勝負強さ・気性が見える':score<90?'相性90以上で変異因子・LUCKが見える':'隠れ素質をすべて読み取り済み';
 panel.innerHTML=`<div class="intelHead254"><b>🧬 配合スカウト</b><span>相性 ${score}/100</span></div>${rows.length?`<div class="hiddenRows254">${rows.map(([k,v])=>`<span><small>${k}</small><b>${v}</b></span>`).join('')}</div>`:''}<div class="intelHint254">${hint}</div><div class="inheritBlock254"><small>スキル継承候補</small><div>${skills}</div><em>※表示％はこの配合で子に継承する確率。両親が同じスキルを持つと上昇。</em></div>`;
}
function hatchSkill254(){
 const box=document.querySelector('#birth .hatchReveal');if(!box)return;const newest=(S.cands||[])[(S.cands||[]).length-1];if(!newest)return;
 let row=box.querySelector('.hatchSkill254');if(!row){row=document.createElement('div');row.className='hatchSkill254';const meta=box.querySelector('.hatchMeta');(meta||box).after?.(row)}
 row.innerHTML=`<small>SKILL</small><div>${skillBadges254(newest)}</div>`;
}
function sync254(){try{cardSkills254();compat254();hatchSkill254()}catch(e){console.warn('sync254',e)}}
function late254(){sync254();[40,120,300,700].forEach(ms=>setTimeout(sync254,ms))}
try{const prev254=render;render=function(){const out=prev254();late254();return out}}catch(e){console.warn('render254',e)}
window.addEventListener('click',e=>{if(e.target?.closest?.('.tab[data-v="breed"],#breedBtn,#hatch,#adopt,[data-mode="p"],[data-mode="c"]'))late254()},true);
window.STAR_SKILL254={sync:sync254,renderCards:cardSkills254,renderHatch:hatchSkill254};
const css=document.createElement('style');css.textContent=`
.hiddenBy254{display:none!important}.skillUnified254{display:flex!important;align-items:center;gap:5px;flex-wrap:wrap;margin-top:6px;padding-top:5px;border-top:1px dotted #ccd5df}.skillLabelUnified254{font-size:6px;font-weight:1000;color:#77869a;letter-spacing:.08em}.skillUnified254>div,.hatchSkill254>div,.inheritBlock254>div{display:flex;gap:4px;flex-wrap:wrap}.breedSkillBadge254,.inheritSkill254{display:inline-flex;align-items:center;gap:3px;border:1px solid;border-radius:999px;padding:3px 7px;font-size:7px;font-weight:1000;white-space:nowrap}.inheritSkill254 b{font-size:7px;margin-left:2px;padding-left:4px;border-left:1px solid currentColor}.none254,.inheritNone254{color:#7c8794;background:#f1f3f5;border-color:#c9d0d7}.power254{color:#8b2019;background:#ffe2df;border-color:#ee8e84}.speed254{color:#086d94;background:#dff6ff;border-color:#78cce9}.stamina254{color:#9a4d00;background:#fff0d7;border-color:#efb56e}.agility254{color:#6b3d91;background:#f1e4ff;border-color:#c39ae8}.tech254{color:#17674d;background:#dff7ed;border-color:#7bc9ab}.guts254{color:#9a2557;background:#ffe2ef;border-color:#e68ab1}.breedIntel254{margin-top:9px;padding:10px;border:1px solid #bfd0df;border-radius:12px;background:#f8fbfe}.intelHead254{display:flex;align-items:center;justify-content:space-between;gap:8px}.intelHead254 b{font-size:10px}.intelHead254 span{font-size:8px;font-weight:1000;color:#31637e}.hiddenRows254{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px;margin-top:8px}.hiddenRows254>span{display:flex;align-items:center;justify-content:space-between;gap:6px;padding:6px 7px;border-radius:8px;background:#fff;border:1px solid #d8e2ea}.hiddenRows254 small{font-size:7px;color:#718093;font-weight:900}.hiddenRows254 b{font-size:9px;color:#26384b}.intelHint254{margin-top:6px;font-size:7px;color:#607287}.inheritBlock254{margin-top:8px;padding-top:7px;border-top:1px dashed #c7d4de}.inheritBlock254>small,.hatchSkill254>small{display:block;margin-bottom:5px;font-size:7px;color:#667789;font-weight:1000}.inheritBlock254 em{display:block;margin-top:5px;font-size:6px;color:#7d8894;font-style:normal}.hatchSkill254{margin:7px auto;padding:8px 10px;border-radius:10px;background:#ffffffcc;border:1px solid #d9e2ea;max-width:280px}.hatch-ex249 .hatchSkill254{background:#111a3dcc;border-color:#6ee8ff88;color:#fff}.hatch-ex249 .hatchSkill254>small{color:#d9f8ff}
`;document.head.appendChild(css);late254();
})();