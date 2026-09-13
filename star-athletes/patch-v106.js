(()=>{
// v0.10.7: force approved art at final avatar render stage.
const APPROVED={
  unil:'../star-athletes/approved/unil-transparent.webp?v=107',
  grimo:'../star-athletes/approved/grimo-transparent.webp?v=107',
  puru:'../star-athletes/approved/puru-transparent.webp?v=107'
};
const prevAvatar=avatar;
avatar=function(m,big=false){
  if(m?.species==='draco') return prevAvatar(m,big);
  const src=APPROVED[m?.species];
  if(!src) return prevAvatar(m,big);
  return `<div class="avatar art approved-live ${big?'bigArt':''}"><img class="artimg approvedArt" src="${src}" alt="${SP[m.species][0]}"></div>`;
};
const s=document.createElement('style');
s.textContent=`
.avatar.approved-live{background:linear-gradient(180deg,#fff9ed,#fff);overflow:hidden}
.avatar.approved-live .approvedArt{width:100%!important;height:100%!important;object-fit:contain!important;background:transparent!important;padding:4px!important;box-sizing:border-box}
.avatar.approved-live.bigArt .approvedArt{padding:12px!important}
.trainCard .avatar.approved-live .approvedArt,.par .avatar.approved-live .approvedArt{padding:3px!important}
`;
document.head.appendChild(s);
setTimeout(()=>render(),0);
})();
