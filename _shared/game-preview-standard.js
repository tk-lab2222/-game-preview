/* Game Preview Standard v1 */
window.GamePreviewStandard={
  install({version,messageId='message',errorMessage}={}){
    const showError=(msg)=>{
      console.error(msg);
      const el=document.getElementById(messageId);
      if(el){el.hidden=false;el.textContent=errorMessage||'内部エラーを検出しました：'+msg;}
    };
    window.addEventListener('error',e=>showError(e.message||'runtime error'));
    window.addEventListener('unhandledrejection',e=>showError(e.reason?.message||String(e.reason||'promise error')));
    // Declarative native dialogs, shared by any game that opts into these attributes.
    // Capture closes navigation dialogs even when a game's tab handler stops propagation.
    document.addEventListener('click',e=>{
      const open=e.target.closest?.('[data-dialog-open]');
      if(open){document.getElementById(open.dataset.dialogOpen)?.showModal();return;}
      const close=e.target.closest?.('[data-dialog-close]');
      if(close){close.closest('dialog')?.close();return;}
      if(e.target.tagName==='DIALOG'){
        const r=e.target.getBoundingClientRect();
        if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();
      }
    },true);
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
