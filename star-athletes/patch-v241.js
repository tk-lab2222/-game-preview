(()=>{
const MEM='star-athletes-training-memory-v239';
const VALID=new Set(['speed','power','tech','stamina','team']);
const SK={power:['💥','豪腕'],speed:['💨','疾風'],stamina:['🔥','鉄肺'],agility:['✨','軽業'],tech:['🎯','精密'],guts:['❤️‍🔥','勝負魂']};
const LAB={power:'ちから',speed:'スピード',stamina:'スタミナ',agility:'すばやさ',tech:'テクニック',guts:'こんじょう'};
function loadMem(){try{const x=JSON.parse(localStorage.getItem(MEM)||'{}');return x&&typeof x==='object'?x:{}}catch(_){return{}}}
function saveMem(x){try{localStorage.setItem(MEM,JSON.stringify(x))}catch(_){}}
function best(m){const s=m?.stats||{},ks=['power','speed','stamina','agility','tech','guts'];let k=ks[0];for(const x of ks)if((+s[x]||0)>(+s[k]||0))k=x;return k==='power'?'power':k==='speed'||k==='agility'?'speed':k==='stamina'?'stamina':k==='tech'?'tech':'team'}
function applyPlans(){S.plans=(S.plans&&typeof S.plans==='object')?S.plans:{};const mem=loadMem();for(const m of(S.nest||[])){if(!m?.id)continue;const r=VALID.has(mem[m.id])?mem[m.id]:null;S.plans[m.id]=r||VALID.has(S.plans[m.id])&&S.plans[m.id]||best(m);if(r)m.lastTrainingPlan237=r}}
function rememberAll(){const mem=loadMem();let ch=false;for(const m of(S.nest||[])){const p=S.plans?.[m?.id];if(m?.id&&VALID.has(p)){if(mem[m.id]!==p){mem[m.id]=p;ch=true}m.lastTrainingPlan237=p}}if(ch)saveMem(mem)}
function skillText(m){const a=(m?.skills233||[]).map(id=>SK[id]?`${SK[id][0]} ${SK[id][1]}`:null).filter(Boolean);return a.length?a.join(' / '):'未取得'}
function put(card,m,host){if(!card||!m||!host)return;card.querySelectorAll('.skillCard235,.skillCard241').forEach(x=>x.remove());const d=document.createElement('div');d.className='skillCard241';const t=skillText(m);d.classList.toggle('has241',t!=='未取得');d.innerHTML=`<span>SKILL</span><b>${t}</b>`;host.appendChild(d)}
function skills(){const all=[...(S.starters||[]),...(S.nest||[]),...(S.lineage||[]),...(S.cands||[])];document.querySelectorAll('#breeders .card[data-id],#cands .card[data-id]').forEach(c=>put(c,all.find(x=>x?.id===c.dataset.id),c.querySelector('.bd')||c));document.querySelectorAll('#lineagePool .card').forEach((c,i)=>put(c,(S.lineage||[])[i],c.querySelector('.bd')||c));document.querySelectorAll('.train210').forEach(c=>{const id=c.querySelector('[data-m210]')?.dataset.m210;put(c,(S.nest||[]).find(x=>x?.id===id),c.querySelector('header>div')||c)})}
function stats(){document.querySelectorAll('.train210').forEach(c=>{const id=c.querySelector('[data-m210]')?.dataset.m210,m=(S.nest||[]).find(x=>x?.id===id);if(!m)return;c.querySelectorAll('.stats210 span').forEach(r=>{const k=Object.keys(LAB).find(x=>LAB[x]===r.querySelector('i')?.textContent?.trim()),b=r.querySelector('b');if(!k||!b)return;const em=b.querySelector('em');b.innerHTML='';b.append(document.createTextNode(String(+m.stats?.[k]||0)));if(em){b.append(' ');b.append(em)}})})}
function sync(){applyPlans();skills();stats()}
function burst(){[0,40,140,400,900].forEach(ms=>setTimeout(sync,ms))}
let last=+S.turn||0;
try{const old=render;render=function(){applyPlans();const out=old();const now=+S.turn||0;if(now>last)rememberAll();last=now;burst();return out}}catch(_){ }
window.addEventListener('click',e=>{const b=e.target?.closest?.('[data-p210]');if(b&&VALID.has(b.dataset.p210)){const mem=loadMem();mem[b.dataset.m210]=b.dataset.p210;saveMem(mem);const m=(S.nest||[]).find(x=>x?.id===b.dataset.m210);if(m)m.lastTrainingPlan237=b.dataset.p210}if(e.target?.closest?.('.tab,[data-mode="p"],[data-mode="c"],#adopt,#breedBtn,#hatch,#next217,#next225'))burst()},true);
const css=document.createElement('style');css.textContent='.skillCard241{display:flex!important;align-items:center;gap:6px;margin-top:6px;padding-top:5px;border-top:1px dotted #cbd5df}.skillCard241 span{font-size:6px;font-weight:1000;color:#77869a}.skillCard241 b{display:inline-block!important;font-size:7px!important;color:#6d7888!important;background:#eef1f5;border:1px solid #c7d0db;border-radius:999px;padding:3px 6px}.skillCard241.has241 b{color:#5b367f!important;background:#f2e8ff;border-color:#b996d9}';document.head.appendChild(css);
applyPlans();rememberAll();burst();
})();