(()=>{
// v0.11.0: lock Unil / Grimo / Purumon to the exact approved reference crops.
// The image bytes are stored as small base64 text files so GitHub Pages serves
// the exact artwork without the previous WebP extraction / cache path.
const LOCKED_V110={
  unil:'../star-athletes/embedded/unil-v110-small.b64?v=110',
  grimo:'../star-athletes/embedded/grimo-v110-small.b64?v=110',
  puru:'../star-athletes/embedded/puru-v110-small.b64?v=110'
};
const lockedArtV110={};
const avatarBeforeV110=avatar;

async function loadLockedV110(){
  await Promise.all(Object.entries(LOCKED_V110).map(async([species,url])=>{
    const r=await fetch(url,{cache:'no-store'});
    if(!r.ok) throw new Error(`${species} art HTTP ${r.status}`);
    const b64=(await r.text()).replace(/\s+/g,'');
    if(!b64.startsWith('/9j/')) throw new Error(`${species} art payload invalid`);
    lockedArtV110[species]=`data:image/jpeg;base64,${b64}`;
  }));

  avatar=function(m,big=false){
    const src=m&&lockedArtV110[m.species];
    if(!src || m.species==='draco') return avatarBeforeV110(m,big);
    const label=(typeof SP!=='undefined'&&SP[m.species])?SP[m.species][0]:m.species;
    return `<div class="avatar art locked-v110 species-${m.species} ${big?'bigArt':''}"><img class="artimg lockedArtV110" src="${src}" alt="${label}"></div>`;
  };

  const style=document.createElement('style');
  style.textContent=`
  .avatar.locked-v110{overflow:hidden!important;background:#fff!important;position:relative}
  .avatar.locked-v110 .lockedArtV110{width:100%!important;height:100%!important;display:block!important;object-fit:cover!important;object-position:center!important;padding:0!important;margin:0!important;filter:none!important;transform:none!important;background:#fff!important}
  .avatar.locked-v110.bigArt .lockedArtV110{object-fit:contain!important;background:#fff!important}
  `;
  document.head.appendChild(style);
  try{render()}catch(e){console.error('v0.11.0 rerender failed',e)}
}

loadLockedV110().catch(e=>{
  console.error('STAR ATHLETES v0.11.0 art lock failed',e);
});
})();
