(()=>{
// v0.21.7: season progression via persisted save + reload.
// This deliberately avoids all legacy #next handlers and render-chain races.
const SAVE='star-athletes-save-v200';
const FORCE='star-athletes-force-season-v217';
const MEETS={
1:[['スタータウン杯','スタータウン','晴れ',['50m走','障害物競走','的当て','リレー']]],
2:[['ノースエリア杯','ノースドーム','向かい風',['50m走','10000m走','障害物競走','リレー']]],
3:[['グランドスター杯','中央大競技場','晴れ',['10000m走','障害物競走','的当て','リレー']]],
4:[['メジャースターカップ','プライムアリーナ','晴れ',['50m走','障害物競走','10000m走','リレー']]],
5:[['プラネット第1予選','代表選考アリーナ','晴れ',['障害物競走','10000m走','大玉ころがし','リレー']]],
6:[['プラネット代表決定戦','プラネット・コロシアム','決戦日和',['50m走','障害物競走','10000m走','リレー']]]};
function seed(n,obj){const m=(MEETS[n]||MEETS[6])[0];obj.season=n;obj.turn=0;obj.plans={};obj.assign={};obj.strat={};obj.seasonMeet={name:m[0],place:m[1],weather:m[2],events:[...m[3]]};obj.schedule=[...m[3]];obj.generationActive=n>=1&&n<=6;return obj}
function persistWhole(n){
  try{
    let d={savedAt:Date.now(),S:{}};const raw=localStorage.getItem(SAVE);if(raw){const p=JSON.parse(raw);if(p&&p.S)d=p}
    d.savedAt=Date.now();d.S=seed(n,d.S||{});localStorage.setItem(SAVE,JSON.stringify(d));localStorage.setItem(FORCE,String(n));
  }catch(e){console.error('persist v217',e)}
}
function advance217(){
  const cur=Math.max(1,Math.min(6,Number(S.season)||1));
  if(cur<6){
    const next=cur+1;persistWhole(next);
    const u=new URL(location.href);u.searchParams.set('v','217');u.searchParams.set('season',String(next));location.replace(u.toString());
    return;
  }
  try{
    let d={savedAt:Date.now(),S:{}};const raw=localStorage.getItem(SAVE);if(raw){const p=JSON.parse(raw);if(p&&p.S)d=p}
    const x=d.S||{};x.parents=[];x.cands=[];x.sel=[];x.egg=null;x.turn=0;x.schedule=[];x.plans={};x.assign={};x.strat={};x.season=1;x.seasonMeet=null;x.generationActive=false;d.savedAt=Date.now();d.S=x;localStorage.setItem(SAVE,JSON.stringify(d));localStorage.removeItem(FORCE)
  }catch(e){console.error('generation reset v217',e)}
  location.replace(location.pathname+'?v=217');
}
function applyForced217(){
  let n=Number(new URL(location.href).searchParams.get('season'))||Number(localStorage.getItem(FORCE));
  if(Number.isInteger(n)&&n>=1&&n<=6){seed(n,S);try{render()}catch(e){console.error('apply forced v217',e)};try{if(typeof show==='function')show('train')}catch(_){} }
}
function install217(){
  const old=document.getElementById('next');if(old)old.style.display='none';
  document.getElementById('next215')?.remove();document.getElementById('next216')?.remove();
  const host=document.querySelector('#meet .box p');if(!host)return;
  let b=document.getElementById('next217');if(!b){b=document.createElement('button');b.id='next217';b.type='button';b.className='btn yl hide';b.onclick=e=>{e.preventDefault();e.stopPropagation();advance217()};host.appendChild(b)}
  const has=!!document.getElementById('result')?.textContent.trim();b.classList.toggle('hide',!has);b.textContent=(Number(S.season)||1)<6?'次シーズンへ':'次世代へ';
}
applyForced217();install217();
const result=document.getElementById('result');if(result)new MutationObserver(install217).observe(result,{childList:true,subtree:true,characterData:true});
})();