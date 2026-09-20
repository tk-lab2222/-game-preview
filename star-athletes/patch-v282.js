(()=>{
// v0.29.5 / M10.2: Nest Representative share card.
// Sharing is explicit only. No auto-posting, no broad MutationObserver.
const SAVE282='star-athletes-save-v200';
const LAB282={power:'ちから',speed:'スピード',stamina:'スタミナ',agility:'すばやさ',tech:'テクニック',guts:'こんじょう'};
const ROLE282={ace:'エース',sprint:'スプリンター',power:'パワー',endurance:'持久',technique:'技巧'};
const TACTIC282={balance:'バランス',attack:'攻め',link:'連携'};
function n282(v){return Number(v)||0}
function state282(){return S?.rep280||null}
function best282(){return state282()?.best||null}
function top282(m){const s=m?.stats||{};return Object.keys(LAB282).sort((a,b)=>n282(s[b])-n282(s[a]))[0]||'speed'}
function text282(b){
 if(!b)return'';
 const members=(b.members||[]).map((m,i)=>{const k=top282(m);return `${i+1}. ${m.name||'ATHLETE'} / ${m.rarity||'-'} / ${ROLE282[m.role]||m.role||'-'} / ${LAB282[k]} ${n282(m.stats?.[k]).toLocaleString()}`}).join('\n');
 return `STAR ATHLETES｜MY BEST NEST\nTEAM POWER ${n282(b.score).toLocaleString()}\nSYNERGY ${n282(b.synergy).toLocaleString()} / 戦術 ${TACTIC282[b.tactic]||b.tactic||'-'}\n${members}\n#STARATHLETES`;
}
async function share282(txt,btn){
 const url=location.href.split('?')[0];
 try{
  if(navigator.share){await navigator.share({title:'STAR ATHLETES ネスト代表',text:txt,url});return}
 }catch(e){if(e?.name==='AbortError')return}
 copy282(txt+'\n'+url,btn);
}
function copy282(txt,btn){
 const done=()=>{if(btn){const old=btn.textContent;btn.textContent='✓ コピーしました';setTimeout(()=>btn.textContent=old,1200)}};
 if(navigator.clipboard?.writeText)navigator.clipboard.writeText(txt).then(done).catch(()=>fallback282(txt,done));else fallback282(txt,done);
}
function fallback282(txt,done){const t=document.createElement('textarea');t.value=txt;t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();try{document.execCommand('copy');done()}catch(_){}t.remove()}
function render282(){
 const host=document.getElementById('rep280');if(!host)return;
 let box=document.getElementById('share282');if(!box){box=document.createElement('div');box.id='share282';box.className='share282';host.appendChild(box)}
 const b=best282();
 if(!b){box.innerHTML='<b>📣 ネスト代表を共有</b><small>代表3体を登録して自己ベストを作ると共有カードが解放されます。</small>';return}
 const rows=(b.members||[]).map(m=>{const k=top282(m);return `<span><strong>${m.name||'ATHLETE'}</strong><em>${m.rarity||'-'} / ${ROLE282[m.role]||m.role||'-'}</em><small>得意 ${LAB282[k]} ${n282(m.stats?.[k]).toLocaleString()}</small></span>`}).join('');
 box.innerHTML=`<div class="shareHead282"><div><small>MY BEST NEST</small><b>📣 ネスト代表カード</b></div><strong>${n282(b.score).toLocaleString()}</strong></div><div class="shareTeam282">${rows}</div><div class="shareMeta282"><span>SYNERGY <b>${n282(b.synergy).toLocaleString()}</b></span><span>戦術 <b>${TACTIC282[b.tactic]||b.tactic||'-'}</b></span><span>BEST <b>${new Date(b.at).toLocaleDateString('ja-JP')}</b></span></div><div class="shareActions282"><button type="button" id="shareNative282" class="btn or">共有する</button><button type="button" id="copyShare282" class="btn yl">共有文をコピー</button></div><small class="shareNote282">出生レア度ではなく、代表3体・総合力・得意能力・シナジー・自己ベストを共有する競技用カードです。</small>`;
}
window.addEventListener('click',e=>{const sh=e.target?.closest?.('#shareNative282');if(sh){e.preventDefault();const b=best282();if(b)share282(text282(b),sh);return}const btn=e.target?.closest?.('#copyShare282');if(btn){e.preventDefault();const b=best282();if(b)copy282(text282(b),btn);return}if(e.target?.closest?.('#register280,.tab[data-v="nest201"]'))setTimeout(render282,0)},true);
try{const prev282=render;render=function(){const out=prev282();setTimeout(render282,0);return out}}catch(e){console.warn('render282',e)}
window.STAR_SHARE282={text:()=>text282(best282()),best:best282};
const css=document.createElement('style');css.textContent=`.share282{margin-top:10px;padding:10px;border:2px solid #263b5c;border-radius:13px;background:linear-gradient(145deg,#eef7ff,#fff8dc)}.share282>small{display:block;font-size:6px;line-height:1.5;color:#657386}.shareHead282{display:flex;justify-content:space-between;align-items:end}.shareHead282 small{display:block;font-size:6px;letter-spacing:.12em;color:#637b96;font-weight:1000}.shareHead282 b{font-size:12px}.shareHead282>strong{font-size:23px;color:#152640}.shareTeam282{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin:8px 0}.shareTeam282 span{padding:7px 5px;border:1px solid #b8c5d0;border-radius:9px;background:#fff;text-align:center}.shareTeam282 strong,.shareTeam282 em,.shareTeam282 small{display:block}.shareTeam282 strong{font-size:8px}.shareTeam282 em{font-size:6px;font-style:normal;color:#6d7884}.shareTeam282 small{font-size:6px;margin-top:3px}.shareMeta282{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:7px}.shareMeta282 span{font-size:6px;border:1px solid #c1ccd6;border-radius:999px;background:#fff;padding:4px 7px}.shareActions282{display:grid;grid-template-columns:1fr 1fr;gap:6px}.shareActions282 .btn{width:100%}.shareNote282{margin-top:6px}`;document.head.appendChild(css);render282();
})();