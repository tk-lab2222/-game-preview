(async()=>{try{
  const b=window.__SF||'';
  const u=Uint8Array.from(atob(b),c=>c.charCodeAt(0));
  const ds=new DecompressionStream('gzip');
  let txt=await new Response(new Blob([u]).stream().pipeThrough(ds)).text();
  const patch=`
<style id="v061-board-layout-fix">
  .machine{min-height:220px!important;overflow:visible!important}
  .table-wrap{display:block!important;position:relative!important;flex:none!important;min-width:150px;min-height:230px;margin:auto!important;background:#0b1230!important;border-radius:15px;overflow:hidden!important}
  .table-wrap canvas:not([hidden]){display:block!important;visibility:visible!important;opacity:1!important}
  @media(max-height:610px){.hud{display:none!important}.top{min-height:28px}.mission-panel,.boss-panel{margin-bottom:2px!important}.controls{margin-top:3px!important}}
</style>
<script id="v061-board-layout-script">
(()=>{
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  function outerHeight(el){
    if(!el)return 0;
    const cs=getComputedStyle(el);
    if(cs.display==='none'||cs.position==='fixed'||cs.position==='absolute')return 0;
    const r=el.getBoundingClientRect();
    return r.height+(parseFloat(cs.marginTop)||0)+(parseFloat(cs.marginBottom)||0);
  }
  function syncBoardLayout(){
    const app=document.querySelector('.app');
    const machine=document.querySelector('.machine');
    const wrap=document.querySelector('.table-wrap');
    if(!app||!machine||!wrap)return;
    const vh=Math.max(480,Math.round(window.visualViewport?.height||window.innerHeight||667));
    const cs=getComputedStyle(app);
    const pad=(parseFloat(cs.paddingTop)||0)+(parseFloat(cs.paddingBottom)||0);
    let used=pad;
    for(const el of app.children){if(el!==machine)used+=outerHeight(el)}
    let avail=vh-used-4;
    const minBoardH=vh<=590?245:vh<=700?285:320;
    avail=clamp(avail,minBoardH,Math.floor(vh*.64));
    machine.style.flex='0 0 auto';
    machine.style.height=avail+'px';
    machine.style.minHeight=minBoardH+'px';
    const mcs=getComputedStyle(machine);
    const innerW=Math.max(160,machine.clientWidth-(parseFloat(mcs.paddingLeft)||0)-(parseFloat(mcs.paddingRight)||0));
    const innerH=Math.max(minBoardH-8,machine.clientHeight-(parseFloat(mcs.paddingTop)||0)-(parseFloat(mcs.paddingBottom)||0));
    let boardH=innerH;
    let boardW=boardH*9/14;
    if(boardW>innerW){boardW=innerW;boardH=boardW*14/9}
    wrap.style.width=Math.floor(boardW)+'px';
    wrap.style.height=Math.floor(boardH)+'px';
    wrap.style.minHeight='0';
    wrap.style.aspectRatio='auto';
    const canvas=wrap.querySelector('canvas');
    if(canvas&&!canvas.hidden){canvas.style.width='100%';canvas.style.height='100%'}
  }
  const run=()=>{syncBoardLayout();requestAnimationFrame(syncBoardLayout);setTimeout(syncBoardLayout,120);setTimeout(syncBoardLayout,500)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
  addEventListener('resize',run,{passive:true});
  addEventListener('orientationchange',()=>setTimeout(run,120),{passive:true});
  addEventListener('pageshow',run,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)run()});
  window.visualViewport?.addEventListener('resize',run,{passive:true});
})();
<\/script>`;
  txt=txt.replace(/<title>[^<]*<\/title>/,'<title>星火ピンボール v0.6.1 決戦</title>');
  txt=txt.replace('</body>',patch+'</body>');
  document.open();document.write(txt);document.close();
}catch(e){
  const boot=document.getElementById('boot');
  if(boot)boot.innerHTML='<b>起動に失敗しました</b><br><small>'+String(e)+'</small>';
  console.error(e)
}})();
