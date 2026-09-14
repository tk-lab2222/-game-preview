(()=>{
// v0.10.9: hard-lock the three approved non-Draco species at the final render layer.
// Draco keeps the existing layered renderer. If an approved WebP cannot decode,
// fall back to the original adopted-art crop rather than the placeholder SVG.
const APPROVED_V109={
  unil:{approved:'../star-athletes/approved/unil-transparent.webp?v=109',fallback:'../star-athletes/assets/unil.jpg?v=109'},
  grimo:{approved:'../star-athletes/approved/grimo-transparent.webp?v=109',fallback:'../star-athletes/assets/grimo.jpg?v=109'},
  puru:{approved:'../star-athletes/approved/puru-transparent.webp?v=109',fallback:'../star-athletes/assets/puru.jpg?v=109'}
};
const previousAvatarV109=avatar;
avatar=function(m,big=false){
  if(!m || m.species==='draco' || !APPROVED_V109[m.species]) return previousAvatarV109(m,big);
  const a=APPROVED_V109[m.species];
  const alt=(typeof SP!=='undefined'&&SP[m.species])?SP[m.species][0]:m.species;
  return `<div class="avatar art approved-v109 species-${m.species} ${big?'bigArt':''}"><img class="artimg approvedArtV109" src="${a.approved}" data-fallback="${a.fallback}" alt="${alt}" onerror="if(!this.dataset.didFallback){this.dataset.didFallback='1';this.src=this.dataset.fallback}"></div>`;
};
const style=document.createElement('style');
style.textContent=`
.avatar.approved-v109{background:linear-gradient(180deg,#fff9ed,#fff);overflow:hidden;position:relative}
.avatar.approved-v109 .approvedArtV109{width:100%!important;height:100%!important;display:block!important;object-fit:contain!important;object-position:center!important;background:transparent!important;padding:4px!important;box-sizing:border-box!important;filter:none!important}
.avatar.approved-v109.bigArt .approvedArtV109{padding:10px!important}
.trainCard .avatar.approved-v109 .approvedArtV109,.par .avatar.approved-v109 .approvedArtV109{padding:3px!important}
/* The jpeg fallback is only an emergency path. Keep guide text outside the visible crop as much as possible. */
.avatar.approved-v109 img[data-did-fallback='1']{object-fit:cover!important;transform:scale(1.16);transform-origin:center 58%}
`;
document.head.appendChild(style);
setTimeout(()=>{ try{render()}catch(e){console.warn('v0.10.9 rerender',e)} },0);
})();
