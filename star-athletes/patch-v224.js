(()=>{
// Rename UI only. Automatic naming belongs to app-v094, not a baby wrapper.
function allMon224(){
 const a=[];
 for(const key of ['starters','nest','lineage','released','cands','foster'])for(const m of (S[key]||[]))if(m&&!a.some(x=>x.id===m.id))a.push(m);
 return a;
}
function save224(){
 try{localStorage.setItem('star-athletes-active-roster-v210',JSON.stringify(S.nest||[]))}catch(_){}
 // render() is wrapped by v200 and persists S; call only after the name mutation.
 try{render()}catch(e){console.error('rename render 224',e)}
}
function rename224(id){
 const m=allMon224().find(x=>x.id===id);if(!m)return;
 const raw=prompt('この子の名前を変える',m.name||'');if(raw===null)return;
 const name=Array.from(raw.trim().normalize('NFC')).slice(0,12).join('');if(!name)return;
 m.name=name;save224();
}
function addRename224(){
 document.querySelectorAll('.card[data-id]').forEach(c=>{
   if(c.querySelector('.rename224'))return;
   const id=c.dataset.id,bd=c.querySelector('.bd');if(!id||!bd)return;
   const b=document.createElement('button');b.type='button';b.className='rename224';b.dataset.rename224=id;b.textContent='✏️ 名前';bd.appendChild(b);
 });
 // The training owner supplies the stable athlete ID; option markup can change.
 document.querySelectorAll('.train210').forEach(c=>{
   if(c.querySelector('.rename224'))return;
   const id=c.dataset.athlete210;if(!id)return;
   const head=c.querySelector(':scope > header > div:not(.avatar):not(.art)');if(!head)return;
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
window.STAR_RENAME_UI={sync:addRename224};
const css=document.createElement('style');css.textContent=`
.rename224{margin-top:6px;border:1px solid #a9bad0;border-radius:999px;background:#fff;color:#33465d;padding:4px 8px;font-size:8px;font-weight:1000;line-height:1.2;touch-action:manipulation}.rename224:active{transform:scale(.96)}.renameTrain224{display:inline-block;margin-top:5px;background:#eef7ff;border-color:#8ebada}
`;document.head.appendChild(css);setTimeout(addRename224,0);
})();
