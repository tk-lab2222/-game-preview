(()=>{
// v0.23.5 UI hardening: render compatibility score after late re-renders and show skill state on monster cards.
const SK235={
 power:{name:'豪腕',icon:'💥'},speed:{name:'疾風',icon:'💨'},stamina:{name:'鉄肺',icon:'🔥'},
 agility:{name:'軽業',icon:'✨'},tech:{name:'精密',icon:'🎯'},guts:{name:'勝負魂',icon:'❤️‍🔥'}
};
function scoreFromBox235(box){
 const head=box?.querySelector('.compatHead233 b')?.textContent||'';
 let m=head.match(/相性\s*(\d+)/);if(m)return Math.max(0,Math.min(100,Number(m[1])));
 const txt=box?.textContent||'';m=txt.match(/相性\s*(\d+)/);if(m)return Math.max(0,Math.min(100,Number(m[1])));
 const br=box?.querySelector('.compatBreak233')?.textContent||'';
 const nums=[...br.matchAll(/(\d+)\s*\/\s*(?:25|20|15|10)/g)].map(x=>Number(x[1]));
 return nums.length>=6?Math.max(0,Math.min(100,nums.reduce((a,b)=>a+b,0))):null;
}
function label235(s){return s>=90?'✨ 運命的':s>=75?'★ とても良い':s>=60?'◎ 好相性':s>=40?'○ まずまず':'△ かみ合いにくい'}
function compat235(){
 const box=document.getElementById('compat233');if(!box||box.classList.contains('hide'))return;
 const score=scoreFromBox235(box);if(score==null)return;
 let row=box.querySelector('.compatScore235');if(!row){row=document.createElement('div');row.className='compatScore235';box.prepend(row)}
 row.innerHTML=`<span>相性</span><strong>${score}<small>/100</small></strong><em>${label235(score)}</em>`;
 const old=box.querySelector('.compatScore234');if(old)old.remove();
 const h=box.querySelector('.compatHead233');if(h)h.style.display='none';
}
function monByCard235(card){
 const id=card?.dataset?.id;if(id){for(const key of ['starters','nest','lineage','released','cands','foster']){const m=(S[key]||[]).find(x=>x?.id===id);if(m)return m}if(S.egg?.id===id)return S.egg}
 const bid=card?.querySelector?.('[data-m210]')?.dataset?.m210;if(bid)return (S.nest||[]).find(x=>x.id===bid)||null;
 return null;
}
function skillText235(m){
 const ids=Array.isArray(m?.skills233)?m.skills233:[];
 const names=ids.map(id=>SK235[id]?`${SK235[id].icon} ${SK235[id].name}`:null).filter(Boolean);
 return names.length?names.join(' / '):'未取得';
}
function addSkill235(card,m,host){
 if(!card||!m||!host)return;
 let row=card.querySelector('.skillCard235');if(!row){row=document.createElement('div');row.className='skillCard235';host.appendChild(row)}
 const text=skillText235(m),has=text!=='未取得';row.classList.toggle('has235',has);row.innerHTML=`<span>SKILL</span><b>${text}</b>`;
}
function skills235(){
 // Standard monster cards: breeding pool and candidates.
 document.querySelectorAll('#breeders .card[data-id],#cands .card[data-id]').forEach(card=>{
   const m=monByCard235(card),host=card.querySelector('.bd')||card;addSkill235(card,m,host);
 });
 // Training monster cards.
 document.querySelectorAll('.train210').forEach(card=>{
   const m=monByCard235(card),host=card.querySelector('header>div')||card;addSkill235(card,m,host);
 });
 // Event selection cards are also monster cards; keep this compact.
 document.querySelectorAll('.entries210>[data-m210]').forEach(card=>{
   const m=(S.nest||[]).find(x=>x.id===card.dataset.m210);if(!m)return;
   let row=card.querySelector('.skillMini235');if(!row){row=document.createElement('div');row.className='skillMini235';const name=card.querySelector(':scope>b');name?.after(row)}
   const text=skillText235(m);row.textContent=`SKILL ${text}`;row.classList.toggle('has235',text!=='未取得');
 });
}
function sync235(){compat235();skills235()}
function late235(){sync235();setTimeout(sync235,30);setTimeout(sync235,120)}
try{const before=render;render=function(){const out=before();late235();return out}}catch(e){console.warn('render235',e)}
document.addEventListener('click',e=>{
 if(e.target.closest?.('[data-mode="p"],.tab[data-v="breed"],.tab[data-v="train"],[data-p210],[data-e210],#adopt'))late235();
},false);
const css=document.createElement('style');css.textContent=`
.compatScore235{display:grid!important;grid-template-columns:auto auto 1fr;align-items:center;gap:8px;margin:8px 0 10px;padding:11px 12px;border:2px solid #263e5c;border-radius:13px;background:linear-gradient(135deg,#eef7ff,#fff);color:#172033}.compatScore235>span{font-size:9px;font-weight:1000;letter-spacing:.08em}.compatScore235 strong{font-size:26px;line-height:1;font-weight:1000;color:#0877ad}.compatScore235 strong small{font-size:10px;color:#667789;margin-left:2px}.compatScore235 em{justify-self:end;font-style:normal;font-size:10px;font-weight:1000;background:#fff0b5;border:1px solid #d5b84b;border-radius:999px;padding:5px 8px;white-space:nowrap}
.skillCard235{display:flex;align-items:center;gap:6px;margin-top:6px;padding-top:5px;border-top:1px dotted #cbd5df}.skillCard235 span{font-size:6px;font-weight:1000;letter-spacing:.08em;color:#77869a}.skillCard235 b{display:inline-block!important;font-size:7px!important;font-weight:1000!important;color:#6d7888!important;background:#eef1f5;border:1px solid #c7d0db;border-radius:999px;padding:3px 6px}.skillCard235.has235 b{color:#5b367f!important;background:#f2e8ff;border-color:#b996d9}.skillMini235{margin:2px 5px 0;font-size:6px;font-weight:900;color:#77869a}.skillMini235.has235{color:#6a3e8d}.skillState234{display:none!important}
`;document.head.appendChild(css);late235();
})();