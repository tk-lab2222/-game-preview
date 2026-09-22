(()=>{
'use strict';
// v0.31.86: remove Draco overlay gene text and surface traits clearly in text UI.
if(window.STAR_DRACO_TRAITS330)return;

const SRC330=(window.STAR_DRACO_STABLE329&&window.STAR_DRACO_STABLE329.source)
  ? window.STAR_DRACO_STABLE329.source
  : '../star-athletes-draco-lab/generated/body_base_clean.png?v=414';

const JP330=window.DRACO_JP||{
  normal:'ノーマル',
  curl:'カール角',
  crystal:'クリスタル',
  feather:'フェザー',
  star:'スター尾',
  leaf:'リーフ尾'
};

function esc330(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function ensure330(m){try{window.ensureDracoVisual?.(m)}catch(_){}return m}

function find330(id){
  if(!id)return null;
  const pools=['starters','nest','lineage','released','cands','foster'];
  for(const k of pools){
    const hit=(S?.[k]||[]).find(x=>x?.id===id);
    if(hit)return ensure330(hit);
  }
  if(S?.egg?.id===id)return ensure330(S.egg);
  return null;
}

function traitObj330(m){
  ensure330(m);
  const v=m?.visual||{};
  return {
    horn:JP330[v.horn]||v.horn||'ノーマル',
    wing:JP330[v.wing]||v.wing||'ノーマル',
    tail:JP330[v.tail]||v.tail||'ノーマル'
  };
}

function traitHtml330(m,compact=false){
  const t=traitObj330(m);
  return '<div class="dracoTraits330 '+(compact?'compact330':'')+'">'+
    '<span><small>角</small><b>'+esc330(t.horn)+'</b></span>'+
    '<span><small>羽</small><b>'+esc330(t.wing)+'</b></span>'+
    '<span><small>尾</small><b>'+esc330(t.tail)+'</b></span>'+
  '</div>';
}

function upsert330(host,m,compact=false){
  if(!host||!m||m.species!=='draco')return;
  host.querySelectorAll(':scope > .dracoTraits330').forEach(x=>x.remove());
  host.insertAdjacentHTML('beforeend',traitHtml330(m,compact));
}

function clearOverlay330(root=document){
  root.querySelectorAll?.('.avatar.draco-stable329 .geneMini,.avatar.draco-live .geneMini,.dracoGene329').forEach(x=>x.remove());
}

function syncCards330(){
  clearOverlay330(document);

  document.querySelectorAll('#breeders .card[data-id],#lineagePool .card[data-id],#cands .card[data-id]').forEach(card=>{
    const m=find330(card.dataset.id);
    if(m?.species==='draco')upsert330(card.querySelector('.bd')||card,m,false);
  });

  document.querySelectorAll('.train210[data-athlete210]').forEach(card=>{
    const m=find330(card.dataset.athlete210);
    if(m?.species==='draco')upsert330(card.querySelector('.bd')||card,m,false);
  });

  const parentIds=Array.isArray(S?.parents)?S.parents:[];
  const pa=find330(parentIds[0]),pb=find330(parentIds[1]);
  const paRoot=document.getElementById('pa'),pbRoot=document.getElementById('pb');
  paRoot?.querySelectorAll('.dracoTraits330').forEach(x=>x.remove());
  pbRoot?.querySelectorAll('.dracoTraits330').forEach(x=>x.remove());
  if(pa?.species==='draco')upsert330(paRoot.querySelector('.slotMeta321')||paRoot,pa,true);
  if(pb?.species==='draco')upsert330(pbRoot.querySelector('.slotMeta321')||pbRoot,pb,true);

  document.querySelectorAll('#myStarPicker327 .pickerCard327').forEach(card=>{
    const id=card.querySelector('[data-my-star323]')?.dataset.myStar323;
    const m=find330(id);
    if(m?.species==='draco')upsert330(card.querySelector('.pickerMeta327')||card,m,true);
  });

  const slots=window.STAR_MY_STAR323?.slots?.()||[];
  document.querySelectorAll('#hall323 .myStarHero323[data-slot323]').forEach(card=>{
    const entry=slots[Number(card.dataset.slot323)],m=entry?.athlete;
    card.querySelectorAll('.dracoTraits330').forEach(x=>x.remove());
    if(m?.species==='draco')upsert330(card.querySelector('.myBlood323')||card,m,false);
  });
}

const previousAvatar330=window.avatar;
window.avatar=function(m,big=false){
  if(!m||m.species!=='draco')return previousAvatar330(m,big);
  ensure330(m);
  const sp=(typeof SP!=='undefined'&&SP.draco)?SP.draco[0]:'ドラコ';
  const alt=esc330((m?.name?m.name+' / ':'')+sp);
  return '<div class="avatar art draco-stable329 '+(big?'bigArt':'')+'">'+
    '<img class="dracoStableImg329" src="'+SRC330+'" alt="'+alt+'" draggable="false">'+
  '</div>';
};

const css=document.createElement('style');
css.id='dracoTraits330css';
css.textContent=`
.avatar.draco-stable329 .geneMini,
.avatar.draco-live .geneMini,
.avatar.draco-stable329 .dracoGene329{display:none!important}
.dracoTraits330{display:flex;flex-wrap:wrap;gap:4px;margin-top:6px}
.dracoTraits330 span{display:inline-flex;align-items:center;gap:4px;border:1px solid #cfd8e3;border-radius:999px;padding:3px 6px;background:#f7fbff;color:#425466}
.dracoTraits330 small{font-size:6px;color:#718096;font-weight:1000}
.dracoTraits330 b{font-size:7px;color:#1f2f44}
.dracoTraits330.compact330{gap:3px;margin-top:4px}
.dracoTraits330.compact330 span{padding:2px 5px}
.myBlood323>.dracoTraits330{margin-top:7px}
.pickerMeta327>.dracoTraits330,.slotMeta321>.dracoTraits330{margin-top:4px}
@media(max-width:430px){.dracoTraits330{gap:3px}.dracoTraits330 span{padding:2px 5px}}
`;
document.head.appendChild(css);

function sync330(){try{syncCards330()}catch(e){console.warn('draco traits 330',e)}}

try{
  const prevRender330=window.render;
  if(typeof prevRender330==='function'){
    window.render=function(){
      const out=prevRender330.apply(this,arguments);
      requestAnimationFrame(sync330);
      return out;
    };
  }
}catch(e){console.warn('draco traits render wrap330',e)}

new MutationObserver(()=>requestAnimationFrame(sync330)).observe(document.body,{childList:true,subtree:true});
window.STAR_DRACO_TRAITS330={sync:sync330,traits:traitObj330};
[0,80,250,700].forEach(ms=>setTimeout(sync330,ms));
})();