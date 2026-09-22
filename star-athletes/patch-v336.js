(()=>{
'use strict';
// v0.31.93: authoritative "load latest" handler.
// Older patch-v097 rewrites the button to the legacy entry path; override it last.
if(window.STAR_RELOAD336)return;

function install336(){
  const b=document.getElementById('reloadBtn');
  if(!b)return;
  b.onclick=e=>{
    e?.preventDefault?.();
    e?.stopPropagation?.();
    const stamp=Date.now();
    location.replace('../star-athletes-v112/?v=3193-'+stamp);
  };
  b.dataset.latest336='1';
}

window.STAR_RELOAD336={install:install336};
install336();
setTimeout(install336,80);
setTimeout(install336,300);
})();