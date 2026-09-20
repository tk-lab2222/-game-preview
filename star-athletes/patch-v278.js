(()=>{
// v0.29.1 / M5: scenario clear -> LIMIT RELEASE.
// Trigger only after the first overall victory in Galaxy league.
const SAVE278='star-athletes-save-v200';
const ROSTER278='star-athletes-active-roster-v210';
function n278(v){return Number(v)||0}
function cleared278(){
  return n278(S.leagueRank)>=5 && n278(S.leagueWins?.['ギャラクシー'])>=1;
}
function state278(){
  if(!S.limit278||typeof S.limit278!=='object')S.limit278={released:false,stage:0,shown:false,releasedAt:0};
  return S.limit278;
}
function persist278(){
  try{localStorage.setItem(SAVE278,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}
  try{if(Array.isArray(S.nest)&&S.nest.length===3)localStorage.setItem(ROSTER278,JSON.stringify(S.nest))}catch(_){}
}
function release278(){
  const st=state278();if(st.released||!cleared278())return false;
  st.released=true;st.stage=Math.max(1,n278(st.stage));st.releasedAt=Date.now();st.shown=false;
  S.limitReleased=true;S.limitStage=Math.max(1,n278(S.limitStage));
  persist278();return true;
}
function close278(){
  document.getElementById('limitRelease278')?.remove();
  const st=state278();st.shown=true;persist278();render278();
}
function overlay278(){
  const st=state278();
  if(!st.released||st.shown||document.getElementById('limitRelease278'))return;
  document.body.insertAdjacentHTML('beforeend',`<div id="limitRelease278" class="limitBackdrop278">
    <section class="limitModal278">
      <small>SCENARIO COMPLETE</small>
      <div class="limitBurst278">LIMIT<br>RELEASE</div>
      <h2>ギャラクシー級 制覇</h2>
      <p>ここまでがプロローグ。<br><b>STAR ATHLETESへようこそ。</b></p>
      <div class="unlock278"><span>解禁</span><strong>LIMIT 1</strong><em>能力成長の次段階へ</em></div>
      <div class="cap278"><span>シナリオ基準</span><b>999</b><i>→</i><span>LIMIT 1 目標上限</span><b>3,000</b></div>
      <button type="button" class="btn or" data-close278>LIMIT 1へ</button>
      <small class="note278">LIMIT専用育成・突破条件は次段階で解禁されます。</small>
    </section></div>`);
}
function render278(){
  release278();
  const nest=document.getElementById('nest201');if(!nest)return;
  const st=state278();
  let host=document.getElementById('limitPanel278');
  // Before unlock, LIMIT must not exist in the visible UI at all.
  // No lock panel, progress hint, name, or end-game teaser is shown.
  if(!st.released){
    host?.remove();
    document.getElementById('limitHost285')?.remove();
    return;
  }
  if(!host){host=document.createElement('div');host.id='limitPanel278';host.className='box limitPanel278';nest.prepend(host)}
  host.innerHTML=`<div class="limitHead278 released278"><div><small>END GAME</small><b>⚡ LIMIT 1</b></div><span>RELEASED</span></div>
    <div class="limitInfo278"><strong>シナリオクリア</strong><span>能力成長の次段階が解禁されました。</span></div>
    <div class="capLine278"><span>基準上限 999</span><i>→</i><b>LIMIT 1 目標 3,000</b></div>
    <small>次：LIMIT専用育成 / 突破条件 / 追加育成リソース</small>`;
  overlay278();
}
function late278(){render278();[350,900,1600,2600].forEach(ms=>setTimeout(render278,ms))}
window.addEventListener('click',e=>{
  if(e.target?.closest?.('[data-close278]')){e.preventDefault();close278();return}
  if(e.target?.closest?.('#run,#next225,#annualNext233,.tab[data-v="nest201"],.tab[data-v="meet"]'))late278();
},true);
try{const prev278=render;render=function(){const out=prev278();setTimeout(late278,0);return out}}catch(e){console.warn('render278',e)}
window.STAR_LIMIT278={
  isReleased:()=>!!state278().released,
  stage:()=>n278(state278().stage),
  cap:()=>state278().released?3000:999,
  check:()=>({released:!!state278().released,cleared:cleared278(),leagueRank:n278(S.leagueRank),galaxyWins:n278(S.leagueWins?.['ギャラクシー'])})
};
const css=document.createElement('style');css.textContent=`
.limitBackdrop278{position:fixed;inset:0;z-index:100000;background:#030610ed;display:flex;align-items:center;justify-content:center;padding:18px}
.limitModal278{width:min(430px,100%);border:1px solid #70eaff66;border-radius:24px;padding:20px;background:radial-gradient(circle at 50% 10%,#213b69,#0c1427 48%,#060b16);color:#fff;text-align:center;box-shadow:0 0 60px #4adfff55}
.limitModal278>small:first-child{font-size:7px;letter-spacing:.22em;color:#83e8ff;font-weight:1000}.limitBurst278{margin:10px auto 6px;font-size:35px;line-height:.92;font-weight:1000;letter-spacing:.08em;color:#fff;text-shadow:0 0 12px #56e5ff,0 0 28px #9d72ff}.limitModal278 h2{margin:8px 0 4px;font-size:20px}.limitModal278 p{font-size:10px;line-height:1.6;color:#d9e7f7}.limitModal278 p b{font-size:13px;color:#ffe677}
.unlock278{display:grid;grid-template-columns:auto 1fr;gap:2px 8px;align-items:center;margin:12px 0;padding:10px;border:1px solid #75dfff55;border-radius:12px;background:#ffffff0b;text-align:left}.unlock278 span{grid-row:1/3;font-size:7px;border-radius:999px;padding:4px 6px;background:#6de3ff;color:#07121c;font-weight:1000}.unlock278 strong{font-size:18px}.unlock278 em{font-size:7px;font-style:normal;color:#bcd0e4}
.cap278{display:grid;grid-template-columns:1fr auto auto 1fr auto;gap:5px;align-items:center;margin:8px 0 12px;font-size:7px}.cap278 b{font-size:13px;color:#ffe477}.cap278 i{font-style:normal;color:#79e5ff}.limitModal278 .btn{width:100%}.note278{display:block;margin-top:7px;font-size:6px;color:#9aabc0}
.limitPanel278{border:2px solid #405875!important;background:linear-gradient(145deg,#f7fbff,#edf4ff)!important}.limitHead278{display:flex;justify-content:space-between;align-items:center}.limitHead278 small{display:block;font-size:6px;letter-spacing:.12em;color:#708197;font-weight:1000}.limitHead278 b{font-size:13px}.limitHead278>span{font-size:7px;border:1px solid #9eacba;border-radius:999px;padding:3px 7px}.limitHead278.released278>span{background:#162d49;color:#89ebff;border-color:#63dfff}.limitPanel278 p{font-size:8px;margin:7px 0}.progress278{height:7px;border-radius:99px;background:#dfe6ed;overflow:hidden}.progress278 i{display:block;height:100%;background:linear-gradient(90deg,#5fcfff,#9a72ff);border-radius:99px}.limitPanel278>small{font-size:6px;color:#6b7b8b}.limitInfo278{margin:8px 0;padding:8px;border-radius:9px;background:#172b47;color:#fff}.limitInfo278 strong,.limitInfo278 span{display:block}.limitInfo278 strong{font-size:10px}.limitInfo278 span{font-size:7px;color:#b9cde0}.capLine278{display:flex;align-items:center;justify-content:center;gap:8px;margin:7px 0;font-size:7px}.capLine278 b{font-size:10px;color:#6d4fb0}
`;document.head.appendChild(css);setTimeout(late278,0);
})();