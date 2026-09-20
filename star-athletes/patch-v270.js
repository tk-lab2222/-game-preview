(()=>{
// v0.28.2: M3.3 separate competition value from breeding-parent value.
const RK270=['E','D','C','B','A','S'];
const RAR270=['C','U','R','SR','SSR','UR','EX'];
const STAT270=['power','speed','stamina','agility','tech','guts'];
const SK270={power:'豪腕',speed:'疾風',stamina:'鉄肺',agility:'軽業',tech:'精密',guts:'勝負魂'};
function n270(v){return Number(v)||0}
function clamp270(v,a,b){return Math.max(a,Math.min(b,v))}
function avg270(m){const a=STAT270.map(k=>n270(m?.stats?.[k]));return a.reduce((x,y)=>x+y,0)/(a.length||1)}
function max270(m){return Math.max(...STAT270.map(k=>n270(m?.stats?.[k]))) }
function h270(m,k,d=2){const v=Number(m?.hidden233?.[k]);return Number.isFinite(v)?clamp270(v,0,5):d}
function rank270(v){return RK270[clamp270(Math.round(n270(v)),0,5)]}
function skills270(m){return Array.isArray(m?.skills233)?m.skills233:[]}
function athlete270(m){return avg270(m)*.58+max270(m)*.28+h270(m,'clutch')*12+h270(m,'stability')*8+skills270(m).length*14}
function parent270(m){return h270(m,'heredity')*26+h270(m,'mutation')*21+h270(m,'growth')*12+h270(m,'stability')*8+skills270(m).length*18+Math.max(0,RAR270.indexOf(m?.rarity))*5}
function future270(m){return h270(m,'growth')*22+h270(m,'mutation')*18+h270(m,'heredity')*15+skills270(m).length*12+avg270(m)*.08}
function grade270(score,type){const cuts=type==='athlete'?[380,300,235,175,120]:[250,205,160,115,75];return score>=cuts[0]?'S':score>=cuts[1]?'A':score>=cuts[2]?'B':score>=cuts[3]?'C':score>=cuts[4]?'D':'E'}
function tags270(m){const out=[];if(h270(m,'heredity')>=4)out.push('🧬 遺伝力'+rank270(h270(m,'heredity')));if(h270(m,'mutation')>=4)out.push('✨ 変異因子'+rank270(h270(m,'mutation')));if(h270(m,'growth')>=4)out.push('🌱 成長力'+rank270(h270(m,'growth')));if(skills270(m).length>=2)out.push('📚 多才');return out.slice(0,2)}
function best270(list,fn){return [...list].sort((a,b)=>fn(b)-fn(a))[0]?.id}
function renderCandidate270(){
 const host=document.getElementById('candidateCompare262');if(!host)return;const list=S.cands||[];if(!list.length)return;
 host.querySelector('.roleLegend270')?.remove();const lead=document.createElement('div');lead.className='roleLegend270';lead.innerHTML='<b>ROLE SCOUT</b><span>🏆 大会選手</span><span>🧬 配合親</span><span>🌱 将来性</span><small>※「候補」表示は各評価軸で1位の個体だけ</small>';const hint=host.querySelector('.cmpHint262');(hint||host.firstChild)?.after?.(lead);
 const ba=best270(list,athlete270),bp=best270(list,parent270),bf=best270(list,future270);
 document.querySelectorAll('#cands .card[data-id]').forEach(card=>{const m=list.find(x=>x.id===card.dataset.id);if(!m)return;let box=card.querySelector('.role270');if(!box){box=document.createElement('div');box.className='role270';(card.querySelector('.bd')||card).appendChild(box)}const a=grade270(athlete270(m),'athlete'),p=grade270(parent270(m),'parent'),f=grade270(future270(m),'parent');const rec=[];if(m.id===ba)rec.push('🏆 大会候補');if(m.id===bp)rec.push('🧬 親候補');if(m.id===bf)rec.push('🌱 将来候補');box.innerHTML=`<div class="roleScores270"><span>大会 <b>${a}</b></span><span>親 <b>${p}</b></span><span>将来 <b>${f}</b></span></div>${rec.length?`<div class="roleRec270">${rec.join(' ・ ')}</div>`:''}${tags270(m).length?`<div class="roleTags270">${tags270(m).map(x=>`<i>${x}</i>`).join('')}</div>`:''}`});
}
function renderPool270(){
 const list=S.lineage||[];document.querySelectorAll('#lineagePool .card').forEach((card,i)=>{const id=card.dataset.id||card.getAttribute('data-m210'),m=(id&&list.find(x=>x.id===id))||list[i];if(!m)return;let box=card.querySelector('.role270');if(!box){box=document.createElement('div');box.className='role270';(card.querySelector('.bd')||card).appendChild(box)}box.innerHTML=`<div class="roleScores270"><span>大会 <b>${grade270(athlete270(m),'athlete')}</b></span><span>親 <b>${grade270(parent270(m),'parent')}</b></span></div>${tags270(m).length?`<div class="roleTags270">${tags270(m).map(x=>`<i>${x}</i>`).join('')}</div>`:''}`});
}
function render270(){try{renderCandidate270();renderPool270()}catch(e){console.warn('role270',e)}}
function late270(){render270();[70,180,420,800].forEach(ms=>setTimeout(render270,ms))}
try{const prev270=render;render=function(){const out=prev270();setTimeout(late270,0);return out}}catch(e){console.warn('render270 wrap',e)}
window.addEventListener('click',e=>{if(e.target?.closest?.('#batchGo260,#hatch,#adopt,#cands .card,.tab[data-v="breed"]'))setTimeout(late270,0)},true);
const css=document.createElement('style');css.textContent=`.roleLegend270{display:flex;gap:4px;align-items:center;flex-wrap:wrap;margin:5px 0 7px;font-size:6px}.roleLegend270>b{font-size:6px;color:#687888;margin-right:2px}.roleLegend270 span{border:1px solid #b9c5cf;border-radius:999px;padding:2px 5px;background:#fff}.roleLegend270 small{width:100%;font-size:6px;color:#6f7f8d}.role270{margin-top:6px;padding-top:6px;border-top:1px dashed #c5cfd7}.roleScores270{display:grid;grid-template-columns:repeat(3,1fr);gap:3px}.roleScores270 span{font-size:6px;text-align:center;border:1px solid #c4ced7;border-radius:6px;padding:3px;background:#f8fafb}.roleScores270 b{font-size:9px;margin-left:2px}.roleRec270{font-size:6px;font-weight:1000;margin-top:4px;color:#66521c}.roleTags270{display:flex;gap:3px;flex-wrap:wrap;margin-top:4px}.roleTags270 i{font-style:normal;font-size:6px;border-radius:999px;padding:2px 4px;background:#eef4f8;color:#536676}`;document.head.appendChild(css);setTimeout(late270,0);
})();