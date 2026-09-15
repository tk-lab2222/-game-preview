(()=>{
// v0.22.4: cute default names + safe rename UI.
const NAMES224={
 draco:['ルル','ココ','ノア','モカ','ラテ','リオ','レオ','ティノ','ニコ','ロロ','ミント','ソル'],
 unil:['ルナ','ミルク','リリィ','ソラ','ミミ','シエル','リラ','ネネ','フルル','マロ','ピノ','エル'],
 grimo:['ピピ','キキ','フウ','ノノ','クルミ','チロ','ポポ','スイ','トワ','コハク','ミオ','ラム'],
 puru:['ぷるる','もち','ぽよ','しずく','みる','まる','ふわ','ここあ','あめ','ラムネ','きなこ','もも']
};
function allMon224(){
 const a=[];
 for(const key of ['starters','nest','lineage','released','cands','foster'])for(const m of (S[key]||[]))if(m&&!a.some(x=>x.id===m.id))a.push(m);
 return a;
}
function cuteName224(sp){
 const pool=NAMES224[sp]||NAMES224.puru,used=new Set(allMon224().map(m=>m.name));
 const open=pool.filter(n=>!used.has(n));if(open.length)return open[Math.floor(Math.random()*open.length)];
 const base=pool[Math.floor(Math.random()*pool.length)];let i=2;while(used.has(base+i))i++;return base+i;
}
// Keep all existing genetics/shiny/rarity wrappers; only replace the generated name.
try{
 const babyBefore224=baby;
 baby=function(a,b){const c=babyBefore224(a,b);c.name=cuteName224(c.species);return c};
}catch(e){console.warn('cute name wrapper 224',e)}
function save224(){
 try{localStorage.setItem('star-athletes-active-roster-v210',JSON.stringify(S.nest||[]))}catch(_){}
 // render() is wrapped by v200 and persists S; call only after the name mutation.
 try{render()}catch(e){console.error('rename render 224',e)}
}
function rename224(id){
 const m=allMon224().find(x=>x.id===id);if(!m)return;
 const raw=prompt('この子の名前を変える',m.name||'');if(raw===null)return;
 const name=raw.trim().slice(0,12);if(!name)return;
 m.name=name;save224();
}
function addRename224(){
 document.querySelectorAll('.card[data-id]').forEach(c=>{
   if(c.querySelector('.rename224'))return;
   const id=c.dataset.id,bd=c.querySelector('.bd');if(!id||!bd)return;
   const b=document.createElement('button');b.type='button';b.className='rename224';b.dataset.rename224=id;b.textContent='✏️ 名前';bd.appendChild(b);
 });
 // Current training roster (v210) has no card id; recover it from its option buttons.
 document.querySelectorAll('.train210').forEach(c=>{
   if(c.querySelector('.rename224'))return;
   const id=c.querySelector('[data-m210]')?.dataset.m210;if(!id)return;
   const head=c.querySelector('header>div');if(!head)return;
   const b=document.createElement('button');b.type='button';b.className='rename224 renameTrain224';b.dataset.rename224=id;b.textContent='✏️ 名前';head.appendChild(b);
 });
 document.querySelectorAll('.athTrain208').forEach(c=>{
   if(c.querySelector('.rename224'))return;
   const id=c.querySelector('[data-mon208]')?.dataset.mon208;if(!id)return;
   const head=c.querySelector('header>div');if(!head)return;
   const b=document.createElement('button');b.type='button';b.className='rename224 renameTrain224';b.dataset.rename224=id;b.textContent='✏️ 名前';head.appendChild(b);
 });
}
// Capture before parent card tap handlers so rename never selects a breeder/candidate by accident.
document.addEventListener('click',e=>{
 const b=e.target.closest?.('[data-rename224]');if(!b)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();rename224(b.dataset.rename224);
},true);
const before224=render;
render=function(){const out=before224();setTimeout(addRename224,0);return out};
const css=document.createElement('style');css.textContent=`
.rename224{margin-top:6px;border:1px solid #a9bad0;border-radius:999px;background:#fff;color:#33465d;padding:4px 8px;font-size:8px;font-weight:1000;line-height:1.2;touch-action:manipulation}.rename224:active{transform:scale(.96)}.renameTrain224{display:inline-block;margin-top:5px;background:#eef7ff;border-color:#8ebada}
`;document.head.appendChild(css);setTimeout(addRename224,0);
})();