/* Game Preview Standard v1 */
window.GamePreviewStandard={
  install({version,messageId='message'}={}){
    const showError=(msg)=>{
      console.error(msg);
      const el=document.getElementById(messageId);
      if(el) el.textContent='内部エラーを検出しました：'+msg;
    };
    window.addEventListener('error',e=>showError(e.message||'runtime error'));
    window.addEventListener('unhandledrejection',e=>showError(e.reason?.message||String(e.reason||'promise error')));
    document.querySelectorAll('[data-game-refresh]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const u=new URL(location.href);
        u.searchParams.set('v',version||Date.now());
        u.searchParams.set('_',Date.now());
        location.replace(u.toString());
      });
    });
  }
};
