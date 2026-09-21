(()=>{
// v0.26.2: M1.2 candidate shortlist + comparison. Uses only visible candidate information.
const R262=['C','U','R','SR','SSR','UR','EX'];
let mode262='battle';
function setSelection262(ids){
 const valid=new Set((S.cands||[]).map(m=>m?.id).filter(Boolean));
 S.sel=[...new Set((Array.isArray(ids)?ids:[]).filter(id=>valid.has(id)))].slice(0,3);
 refreshSelection262();
}
function select262(id){
 const valid=(S.cands||[]).some(m=>m?.id===id);if(!valid)return;
 const sel=Array.isArray(S.sel)?S.sel.filter(x=>(S.cands||[]).some(m=>m?.id===x)):[];
 if(sel.includes(id))S.sel=sel.filter(x=>x!==id);
 else if(sel.length<3)S.sel=[...sel,id];
 else return;
 try{typeof save200==='function'&&save200()}catch(_){}
 refreshSelection262();
 try{window.syncAdopt210?.()}catch(_){}
}
function restoreFlow262(){
 const cands=Array.isArray(S?.cands)?S.cands:[];
 const box=document.getElementById('candBox'),grid=document.getElementById('cands');
 if(!box||!grid||!cands.length)return;
 box.classList.remove('hide');
 box.style.setProperty('display','block','important');
 const lineageBox=document.getElementById('lineagePool')?.closest('.box');
 if(lineageBox&&box.parentElement===lineageBox.parentElement&&box.nextElementSibling!==lineageBox){
   lineageBox.parentElement.insertBefore(box,lineageBox);
 }
 if(grid.children.length!==cands.length&&typeof card==='function'){
   grid.innerHTML=cands.map(m=>card(m,'c')).join('');
 }
}
function refreshSelection262(){
 const box=document.getElementById('candBox'),grid=document.getElementById('cands');
 if(box&&(S.cands||[]).length){box.classList.remove('hide');box.style.setProperty('display','block','important')}
 grid?.querySelectorAll('.card[data-id]').forEach(card=>card.classList.toggle('sel',(S.sel||[]).includes(card.dataset.id)));
 document.querySelectorAll('#candidateCompare262 [data-cmp262]').forEach(row=>row.classList.toggle('selected262',(S.sel||[]).includes(row.dataset.cmp262)));
 const adopt=document.getElementById('adopt');if(adopt){adopt.disabled=(S.sel||[]).length!==3;adopt.style.removeProperty('display')}
 try{window.STAR_SKILL254?.sync?.()}catch(_){}
}
function n262(v){return Number(v)||0}
function avg262(m){const vals=Object.values(m?.stats||{}).map(n262);return vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:0}
function max262(m){const e=Object.entries(m?.stats||{}).sort((a,b)=>n262(b[1])-n262(a[1]));return e[0]||['-',0]}
function skills262(m){return Array.isArray(m?.skills233)?m.skills233:[]}
function battleScore262(m){const [,mx]=max262(m);return avg262(m)*.55+n262(mx)*.30+skills262(m).length*12+Math.max(0,R262.indexOf(m?.rarity))*4}
function rarityScore262(m){return Math.max(0,R262.indexOf(m?.rarity))*100+avg262(m)}
function skillScore262(m){return skills262(m).length*100+avg262(m)}
function score262(m){
 if(mode262==='rarity')return rarityScore262(m);
 if(mode262==='skill')return skillScore262(m);
 if(mode262==='avg')return avg262(m);
 return battleScore262(m);
}
function top262(){return [...(S.cands||[])].sort((a,b)=>score262(b)-score262(a))}
function skillLabel262(m){
 const map={power:'豪腕',speed:'疾風',stamina:'鉄肺',agility:'軽業',tech:'精密',guts:'勝負魂'};
 const a=skills262(m);return a.length?a.map(x=>map[x]||x).join(' / '):'—';
}
function ensurePanel262(){
 const box=document.getElementById('candBox'),grid=document.getElementById('cands');if(!box||!grid)return null;
 let host=document.getElementById('candidateCompare262');
 if(!host){host=document.createElement('div');host.id='candidateCompare262';host.className='candidateCompare262';grid.before(host)}
 return host;
}
function decorateCards262(sorted){
 const top3=new Set(sorted.slice(0,3).map(m=>m.id));
 document.querySelectorAll('#cands .card[data-id]').forEach(card=>{
   const m=(S.cands||[]).find(x=>x.id===card.dataset.id);if(!m)return;
   card.classList.toggle('recommended262',top3.has(m.id));
   let row=card.querySelector('.shortBadge262');if(!row){row=document.createElement('div');row.className='shortBadge262';(card.querySelector('.bd')||card).prepend(row)}
   const tags=[];
   if(top3.has(m.id))tags.push('<span class="rec262">🏆 おすすめ</span>');
   if(R262.indexOf(m.rarity)>=3)tags.push('<span>🌟 高レア</span>');
   if(skills262(m).length)tags.push('<span>✨ スキル</span>');
   row.innerHTML=tags.join('');
 });
}
function render262(){
 restoreFlow262();
 const host=ensurePanel262();if(!host)return;
 const cands=S.cands||[];
 if(!cands.length){host.innerHTML='';host.classList.add('hide');return}
 host.classList.remove('hide');
 const sorted=top262();
 const modes=[['battle','大会向け'],['rarity','レア度'],['skill','スキル'],['avg','平均能力']];
 const rows=sorted.map((m,i)=>{
   const [mk,mv]=max262(m),selected=(S.sel||[]).includes(m.id);
   return `<button type="button" class="cmpRow262 ${selected?'selected262':''}" data-cmp262="${m.id}">
     <i>${i+1}</i><b>${m.name}</b><em>${m.rarity}</em><span>平均 ${Math.round(avg262(m))}</span><span>最高 ${typeof SL!=='undefined'?(SL[mk]||mk):mk} ${Math.round(n262(mv))}</span><small>${skillLabel262(m)}</small>
   </button>`;
 }).join('');
 host.innerHTML=`<div class="cmpHead262"><div><small>CANDIDATE SCOUT</small><b>候補比較</b></div><strong>${cands.length}体</strong></div>
 <div class="cmpModes262">${modes.map(([k,l])=>`<button type="button" data-mode262="${k}" class="${mode262===k?'on262':''}">${l}</button>`).join('')}</div>
 <div class="cmpHint262">上位3体は自動で注目表示。最終決定は自由に変更できます。</div>
 <button type="button" id="pickTop262" class="btn tiny pickTop262" ${cands.length<3?'disabled':''}>おすすめ3体を仮選択</button>
 <div class="cmpList262">${rows}</div>`;
 host.querySelectorAll('[data-mode262]').forEach(b=>b.onclick=()=>{mode262=b.dataset.mode262;render262()});
 host.querySelectorAll('[data-cmp262]').forEach(b=>b.onclick=()=>select262(b.dataset.cmp262));
 const pick=host.querySelector('#pickTop262');if(pick)pick.onclick=()=>{
  const ids=sorted.slice(0,3).map(m=>m.id);
  setSelection262(ids);
  decorateCards262(sorted);
  host.querySelectorAll('[data-cmp262]').forEach(row=>row.classList.toggle('selected262',(S.sel||[]).includes(row.dataset.cmp262)));
  const adopt=document.getElementById('adopt');if(adopt)adopt.disabled=(S.sel||[]).length!==3;
  const box=document.getElementById('candBox');if(box){box.classList.remove('hide');box.style.setProperty('display','block','important')}
};
 decorateCards262(sorted);
 refreshSelection262();
}
function late262(){render262();[60,180,420].forEach(ms=>setTimeout(render262,ms))}
try{const prev262=render;render=function(){const out=prev262();late262();return out}}catch(e){console.warn('render262',e)}
window.addEventListener('click',e=>{
 const card=e.target?.closest?.('#cands [data-mode="c"][data-id]');
 if(card){
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
   select262(card.dataset.id);
   return;
 }
 if(e.target?.closest?.('#batchGo260,#hatch,#adopt,#lineagePool [data-release],.tab[data-v="breed"]'))late262();
},true);
window.STAR_CANDIDATE262={sync:render262,select:select262,setSelection:setSelection262,restore:restoreFlow262};
const css=document.createElement('style');css.textContent=`
.candidateCompare262{margin:0 0 10px;padding:10px;border:2px solid #667b91;border-radius:13px;background:linear-gradient(145deg,#f8fbff,#eef4f8)}.candidateCompare262.hide{display:none}
.cmpHead262{display:flex;align-items:center;justify-content:space-between}.cmpHead262 small{display:block;font-size:6px;font-weight:1000;color:#7a8999;letter-spacing:.09em}.cmpHead262 b{font-size:12px}.cmpHead262 strong{font-size:9px;background:#283c50;color:#fff;padding:4px 7px;border-radius:999px}
.cmpModes262{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-top:8px}.cmpModes262 button{border:1px solid #aab8c5;background:#fff;border-radius:8px;padding:6px 2px;font-size:7px;font-weight:900}.cmpModes262 button.on262{background:#273e54;color:#fff;border-color:#273e54}
.cmpHint262{font-size:7px;color:#687888;margin:6px 0}.pickTop262{width:100%;margin-bottom:7px}
.cmpList262{display:grid;gap:4px;max-height:260px;overflow:auto}.cmpRow262{display:grid;grid-template-columns:20px minmax(72px,1.2fr) 34px 60px 86px minmax(72px,1fr);align-items:center;gap:4px;text-align:left;border:1px solid #ced8e0;background:#fff;border-radius:8px;padding:6px;font-size:7px}.cmpRow262 i{font-style:normal;font-weight:1000;color:#586a7a}.cmpRow262 b{font-size:8px}.cmpRow262 em{font-style:normal;font-weight:1000}.cmpRow262 small{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#657789}.cmpRow262.selected262{outline:2px solid #e2aa35;background:#fff9de}
.shortBadge262{display:flex;gap:3px;flex-wrap:wrap;margin-bottom:4px}.shortBadge262 span{display:inline-flex;border:1px solid #bdc9d3;background:#f4f7f9;border-radius:999px;padding:2px 5px;font-size:6px;font-weight:1000}.shortBadge262 .rec262{background:#fff2b9;border-color:#dfba45;color:#725516}.recommended262{box-shadow:0 0 0 2px #e6bd47 inset!important}
`;document.head.appendChild(css);late262();
})();