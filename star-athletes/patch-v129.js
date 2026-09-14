(()=>{
function ensureBreedCounters129(){
  const pair=[...document.querySelectorAll('#breed>.box')].find(x=>x.querySelector('#breedBtn'));
  if(!pair)return;
  let h=pair.querySelector('h3');
  if(!h)return;
  let cnt=document.getElementById('cnt'),mx=document.getElementById('mx');
  if(!cnt||!mx){
    const meta=document.createElement('span');
    meta.className='sm breedCount129';
    meta.innerHTML='<span id="cnt">0</span>/<span id="mx">3</span>体';
    h.appendChild(document.createTextNode(' '));
    h.appendChild(meta);
    cnt=document.getElementById('cnt');mx=document.getElementById('mx');
  }
  if(cnt)cnt.textContent=S.cands?.length||0;
  if(mx)mx.textContent=cap();
}
ensureBreedCounters129();
const prevRender129=render;
render=function(){
  ensureBreedCounters129();
  const out=prevRender129();
  ensureBreedCounters129();
  return out;
};
setTimeout(()=>{try{ensureBreedCounters129();render()}catch(e){console.error('breed hotfix 129',e)}},0);
})();