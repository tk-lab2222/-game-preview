(async()=>{try{
const CURRENT='0.7';
try{const r=await fetch('latest.json?ts='+Date.now(),{cache:'no-store'});if(r.ok){const m=await r.json();const latest=String(m&&m.version||'');if(latest&&latest!==CURRENT){const u=new URL(location.href);if(u.searchParams.get('v')!==latest){u.searchParams.set('v',latest);location.replace(u.toString());return}}}}catch(_e){}
const b=window.__SF07||'';const u=Uint8Array.from(atob(b),c=>c.charCodeAt(0));const ds=new DecompressionStream('gzip');const txt=await new Response(new Blob([u]).stream().pipeThrough(ds)).text();document.open();document.write(txt);document.close();
}catch(e){document.body.innerHTML='<div style="padding:24px;color:white;background:#0d1230;font-family:system-ui"><b>起動に失敗しました</b><br>'+String(e)+'</div>';console.error(e)}})();
