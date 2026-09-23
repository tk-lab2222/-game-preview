(()=>{
// v0.32.21: share card preview for MY STAR / God Star.
// No save mutation. Uses Web Share for text when available; image-card screen is always available.
if(window.STAR_SHARE351)return;
window.STAR_SHARE351=true;
const STAT351={power:'パワー',speed:'スピード',stamina:'スタミナ',agility:'すばやさ',tech:'技術',guts:'根性'};
function n(v){return Number(v)||0}
function grade(m){try{return Number(window.STAR_GRADE340?.athleteGrade?.(m)||1)}catch(_){return 1}}
function stars(m){return '★'.repeat(Math.max(1,Math.min(5,grade(m))))}
function titles(m){
 const a=(m?.rareTitles323||[]).map(x=>(x.icon||'✦')+' '+x.name);
 if(m?.starResonance344?.name&&!a.some(x=>x.includes(m.starResonance344.name)))a.unshift('✺ '+m.starResonance344.name);
 if(m?.completedLineage271)a.push('✨ 完成血統');
 return a.slice(0,4);
}
function traits(m){
 const a=[];
 try{if(window.STAR_COLOR341?.tier?.(m)==='divine')a.push('✦ 神彩')}catch(_){}
 if(Number(m?.starPattern342?.grade)>=4)a.push('✧ '+m.starPattern342.name);
 if(Number(m?.starBody343?.grade)>=4)a.push('◆ '+m.starBody343.name);
 if(m?.ultraRare274?.id==='mythic')a.push('☄ 神話級');
 if((m?.skills233||[]).includes('miracle'))a.push('🌠 奇跡の軌跡');
 return a.slice(0,5);
}
function art(m){try{return typeof avatar==='function'?avatar(m,true):''}catch(_){return''}}
function card(m){
 const vals=Object.entries(STAT351).map(([k,label])=>[label,n(m?.stats?.[k])]);
 const top=[...vals].sort((a,b)=>b[1]-a[1]).slice(0,3);
 const ts=titles(m),tr=traits(m),g=grade(m);
 return `<div class="shareCard351 ${g>=5?'godShare351':''}">
  <div class="shareStars351">${stars(m)} <span>${g>=5?'GOD STAR':'MY STAR'}</span></div>
  <div class="shareArt351">${art(m)}</div>
  <div class="shareIdentity351"><small>STAR ATHLETES</small><h2>${m?.name||'MY STAR'}</h2><b>G${n(m?.gen)||n(m?.generation)||0} ・ ${m?.rarity||'C'}</b></div>
  <div class="shareTitles351">${[...ts,...tr].slice(0,5).map(x=>`<span>${x}</span>`).join('')}</div>
  <div class="shareStats351">${top.map(([k,v],i)=>`<div><small>#${i+1} ${k}</small><b>${v}</b></div>`).join('')}</div>
  <div class="shareFooter351"><b>MY STAR</b><span>#STARATHLETES</span></div>
 </div>`;
}
function paint(){
 requestAnimationFrame(()=>{try{window.paintDracos?.();window.paintSpecies?.()}catch(_){}
 setTimeout(()=>{try{window.paintDracos?.();window.paintSpecies?.()}catch(_){}},120)});
}
function textFor(m){
 const ts=[...titles(m),...traits(m)].slice(0,3).join(' / ');
 const max=Math.max(0,...Object.values(m?.stats||{}).map(n));
 return `${stars(m)} ${m?.name||'MY STAR'}\nG${n(m?.gen)||n(m?.generation)||0} / 最高能力 ${max}${ts?'\n'+ts:''}\n#STARATHLETES`;
}
function open(m){
 if(!m)return;
 document.getElementById('shareOverlay351')?.remove();
 const ov=document.createElement('div');ov.id='shareOverlay351';ov.className='shareOverlay351';
 ov.innerHTML=`<section><header><div><small>SHARE MY STAR</small><h2>自慢の1体を共有</h2><p>能力・称号・神星要素を1枚にまとめた共有カード。</p></div><button data-share-close351>×</button></header>
 <div class="shareStage351">${card(m)}</div>
 <div class="shareActions351"><button data-share-native351>共有する</button><button data-share-copy351>テキストをコピー</button></div>
 <p class="shareHint351">カードをスクリーンショットしてXやSNSへ。共有ボタンでは紹介文も送れます。</p></section>`;
 document.body.appendChild(ov);window.__shareAthlete351=m;paint();
}
async function nativeShare(m){
 const t=textFor(m);
 try{
  if(navigator.share){await navigator.share({title:'STAR ATHLETES - MY STAR',text:t});return}
  await navigator.clipboard.writeText(t);toast('共有文をコピーしました');
 }catch(e){if(e?.name!=='AbortError')toast('共有をキャンセルしました')}
}
async function copy(m){try{await navigator.clipboard.writeText(textFor(m));toast('共有文をコピーしました')}catch(_){toast('コピーできませんでした')}}
function toast(msg){let x=document.getElementById('shareToast351');if(!x){x=document.createElement('div');x.id='shareToast351';document.body.appendChild(x)}x.textContent=msg;x.classList.add('show351');setTimeout(()=>x.classList.remove('show351'),1400)}
function install(){
 document.querySelectorAll('.myStarHero323').forEach((x,i)=>{
  if(x.querySelector('[data-share351]'))return;
  const entry=window.STAR_MY_STAR323?.current?.()?.[i];if(!entry?.athlete)return;
  const b=document.createElement('button');b.type='button';b.className='shareBtn351';b.dataset.share351=String(i);b.textContent='↗ このMY STARを共有';
  x.appendChild(b);
 });
}
document.addEventListener('click',e=>{
 const b=e.target?.closest?.('[data-share351]');if(b){const m=window.STAR_MY_STAR323?.current?.()?.[Number(b.dataset.share351)]?.athlete;open(m);return}
 if(e.target?.closest?.('[data-share-close351]')){document.getElementById('shareOverlay351')?.remove();return}
 if(e.target?.closest?.('[data-share-native351]')){nativeShare(window.__shareAthlete351);return}
 if(e.target?.closest?.('[data-share-copy351]')){copy(window.__shareAthlete351);return}
},true);
try{const prev=render;render=function(){const out=prev();setTimeout(install,60);return out}}catch(_){}
setInterval(install,700);

const css=document.createElement('style');css.textContent=`
.shareBtn351{position:relative;z-index:4;width:100%;margin-top:8px;border:1px solid #72dff0;border-radius:10px;padding:8px;background:linear-gradient(90deg,#172b43,#352b57);color:#dffcff;font-size:8px;font-weight:1000}.shareOverlay351{position:fixed;inset:0;z-index:100300;background:#050811f2;overflow:auto;padding:14px;color:#fff}.shareOverlay351>section{width:min(460px,100%);margin:0 auto}.shareOverlay351 header{display:flex;justify-content:space-between;gap:8px;margin-bottom:10px}.shareOverlay351 header small{font-size:6px;letter-spacing:.18em;color:#83eaff}.shareOverlay351 header h2{font-size:18px;margin:2px 0}.shareOverlay351 header p{font-size:7px;color:#aebbd0;margin:2px 0}.shareOverlay351 header button{width:34px;height:34px;border-radius:50%;border:1px solid #ffffff33;background:#ffffff10;color:#fff;font-size:18px}.shareStage351{display:flex;justify-content:center}
.shareCard351{position:relative;width:min(380px,92vw);aspect-ratio:4/5;overflow:hidden;border:2px solid #7560a4;border-radius:22px;padding:16px;background:radial-gradient(circle at 50% 17%,#38405d,#171d31 48%,#080c16 85%);box-shadow:0 18px 55px #000b;color:#fff}.shareCard351:before{content:'';position:absolute;inset:-30%;background:conic-gradient(transparent,#69eaff22,transparent,#d88fff22,transparent);animation:shareSpin351 18s linear infinite}@keyframes shareSpin351{to{transform:rotate(360deg)}}.shareCard351>*{position:relative;z-index:2}.godShare351{border-color:#d7b14d;background:radial-gradient(circle at 50% 17%,#fff4a7 0,#d8f7ff 13%,#d9c7ff 26%,#222442 49%,#080b14 82%);box-shadow:0 0 28px #ffe06f55,0 0 52px #9b73ff44,0 20px 60px #000c}.shareStars351{text-align:center;font-size:17px;color:#ffe36c;text-shadow:0 0 10px #fff,0 0 18px #ffdc66}.shareStars351 span{display:block;margin-top:2px;font-size:6px;letter-spacing:.24em;color:#e9faff}.shareArt351{height:205px;margin-top:4px}.shareArt351 .avatar,.shareArt351 .bigArt{height:205px!important;width:100%!important;border:0!important;background:transparent!important;overflow:visible!important;filter:drop-shadow(0 0 9px #fff) drop-shadow(0 0 18px #9cecff)}.shareIdentity351{text-align:center;margin-top:-2px}.shareIdentity351 small{font-size:5px;letter-spacing:.2em;color:#9eeeff}.shareIdentity351 h2{font-size:24px;margin:1px 0}.shareIdentity351 b{font-size:8px;color:#dce8f5}.shareTitles351{display:flex;flex-wrap:wrap;justify-content:center;gap:4px;margin-top:8px}.shareTitles351 span{padding:4px 7px;border-radius:999px;border:1px solid #ffffff3b;background:#ffffff13;font-size:6px;font-weight:1000}.shareStats351{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:10px}.shareStats351 div{padding:7px 5px;border-radius:10px;text-align:center;background:#ffffff10;border:1px solid #ffffff25}.shareStats351 small,.shareStats351 b{display:block}.shareStats351 small{font-size:5px;color:#a9c2d8}.shareStats351 b{font-size:16px;color:#fff1a3}.shareFooter351{position:absolute;left:16px;right:16px;bottom:12px;display:flex;justify-content:space-between;border-top:1px solid #ffffff24;padding-top:7px;font-size:6px;letter-spacing:.08em}.shareFooter351 b{color:#ffe272}.shareFooter351 span{color:#a8eaff}.shareActions351{display:grid;grid-template-columns:1.3fr 1fr;gap:7px;margin-top:10px}.shareActions351 button{border:1px solid #ffffff38;border-radius:10px;padding:10px;background:#ffffff0d;color:#fff;font-size:8px;font-weight:1000}.shareActions351 button:first-child{background:linear-gradient(90deg,#315a76,#59437c);color:#fff4a6}.shareHint351{text-align:center;font-size:7px;color:#9eacc0;line-height:1.5}.shareOverlay351 .dracoCanvas,.shareOverlay351 .speciesCanvas{display:block!important;opacity:1!important}#shareToast351{position:fixed;left:50%;bottom:85px;z-index:100400;transform:translate(-50%,14px);opacity:0;background:#171c2d;color:#fff;border:1px solid #ffffff35;border-radius:999px;padding:8px 13px;font-size:8px;transition:.18s}#shareToast351.show351{opacity:1;transform:translate(-50%,0)}
`;document.head.appendChild(css);
window.STAR_SHARE351={open,card,text:textFor,install};
})();