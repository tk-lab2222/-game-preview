(()=>{
// v0.31.16: keep post-tournament progression actions in a dedicated result footer.
function host303(){
 const meet=document.querySelector('#meet .box');
 const result=document.getElementById('result');
 if(!meet||!result)return null;
 let h=document.getElementById('meetNext303');
 if(!h){
   h=document.createElement('div');
   h.id='meetNext303';
   h.className='meetNext303';
   result.after(h);
 }
 return h;
}
function move303(){
 const h=host303();if(!h)return;
 ['next225','annualNext233'].forEach(id=>{
   const b=document.getElementById(id);
   if(b&&b.parentElement!==h)h.appendChild(b);
 });
 const legacy=document.getElementById('next');
 if(legacy&&legacy.parentElement!==h)h.appendChild(legacy);
}
function sync303(){move303();[30,100,250].forEach(ms=>setTimeout(move303,ms))}
try{
 const prev=render;
 render=function(){const out=prev();sync303();return out};
}catch(e){console.warn('render303',e)}
document.addEventListener('click',e=>{
 if(e.target?.closest?.('.tab,#run,#next225,#annualNext233'))sync303();
},true);
const css=document.createElement('style');
css.id='meetNext303Style';
css.textContent=`
.meetNext303{display:flex;flex-direction:column;gap:8px;margin-top:10px}
.meetNext303:empty{display:none}
.meetNext303 .btn{width:100%;margin:0!important}
#nemesisCard268 #next225,
#nemesisCard268 #annualNext233,
#nemesisCard268 #next{display:none!important}
`;
document.head.appendChild(css);
[0,80,220].forEach(ms=>setTimeout(move303,ms));
})();