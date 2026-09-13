(()=>{
  const ART='../star-athletes-draco-lab/generated/body_stage.png?v=411';
  const style=document.createElement('style');
  style.textContent=`
    .avatar.draco-live{background:linear-gradient(#fff9eb,#f4ead6);padding:2px}
    .avatar.draco-live .dracoArt{width:100%;height:100%;object-fit:contain;object-position:center;display:block;filter:none}
    .avatar.draco-live .pattern,.avatar.draco-live .accessory{display:none}
    .trainCard .avatar.draco-live .dracoArt{object-fit:contain}
  `;
  document.head.appendChild(style);

  const oldAvatar=avatar;
  avatar=function(m){
    if(m?.species!=='draco') return oldAvatar(m);
    return `<div class="avatar draco-live"><img class="dracoArt" src="${ART}" alt="${m.name||'ドラコ'}"></div>`;
  };

  const oldRender=render;
  render=function(){ oldRender(); };
  render();
})();
