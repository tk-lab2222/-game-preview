(()=>{
// v0.21.3: fix tournament result-list contrast and make each event row visually meaningful.
function polishMeetRows213(){
  const meet=document.getElementById('meet'),events=document.getElementById('events');
  if(!meet||!events)return;
  const rows=[...events.querySelectorAll(':scope > .evt')];
  if(!rows.length)return;
  rows.forEach((row,i)=>{
    row.classList.add('resultRow213');
    const b=row.querySelector('b');
    const d=row.querySelector('div');
    if(!b||!d)return;
    const text=d.textContent||'';
    const rank=(text.match(/([1-8])位/)||[])[1]||'';
    const phase=(text.match(/(\d+)\s*phase\s*pt/i)||[])[1]||'';
    if(!row.querySelector('.resultMeta213')){
      const meta=document.createElement('div');meta.className='resultMeta213';
      meta.innerHTML=`${rank?`<span class="rank213">${rank}位</span>`:''}${phase?`<span class="phasePt213">${phase} phase pt</span>`:''}`;
      row.appendChild(meta);
    }
  });
}
const mo213=new MutationObserver(()=>requestAnimationFrame(polishMeetRows213));
mo213.observe(document.body,{subtree:true,childList:true,characterData:true});
const css=document.createElement('style');css.textContent=`
#meet #events>.evt.resultRow213{position:relative!important;display:grid!important;grid-template-columns:1fr auto!important;gap:6px 10px!important;align-items:center!important;background:linear-gradient(145deg,#14233a,#0d1727)!important;color:#f6fbff!important;border:1px solid #ffffff22!important;border-radius:14px!important;padding:12px 14px!important;margin:0 0 9px!important;box-shadow:0 6px 18px #0004,inset 0 1px 0 #ffffff12!important;min-height:72px!important}
#meet #events>.evt.resultRow213>b{display:block!important;color:#fff!important;font-size:16px!important;line-height:1.2!important;letter-spacing:.01em!important}
#meet #events>.evt.resultRow213>div:not(.resultMeta213){grid-column:1/3!important;color:#a9c3dd!important;font-size:10px!important;line-height:1.35!important;opacity:.95!important}
#meet #events>.evt.resultRow213 .resultMeta213{grid-column:2!important;grid-row:1!important;display:flex!important;flex-direction:column!important;align-items:flex-end!important;gap:4px!important;padding:0!important}
.rank213{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:48px!important;padding:5px 8px!important;border-radius:999px!important;background:linear-gradient(180deg,#ffe274,#d7a31f)!important;color:#201600!important;font-size:14px!important;font-weight:1000!important;box-shadow:0 0 14px #ffcf5060!important}
.phasePt213{display:inline-block!important;padding:3px 6px!important;border:1px solid #60dfff55!important;border-radius:999px!important;background:#0a2533!important;color:#79e8ff!important;font-size:8px!important;font-weight:1000!important;white-space:nowrap!important}
#meet #events>.evt.resultRow213:nth-child(1){border-color:#6adfff66!important}#meet #events>.evt.resultRow213:nth-child(2){border-color:#8f85ff55!important}#meet #events>.evt.resultRow213:nth-child(3){border-color:#ffcf6a55!important}#meet #events>.evt.resultRow213:nth-child(4){border-color:#ff6f9c55!important}
`;
document.head.appendChild(css);
setTimeout(polishMeetRows213,0);
})();