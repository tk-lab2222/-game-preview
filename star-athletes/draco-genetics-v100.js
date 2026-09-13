(()=>{
const H=['normal','curl','crystal'],W=['normal','feather','crystal'],T=['normal','star','leaf'];
const JP={normal:'ノーマル',curl:'カール角',crystal:'クリスタル',feather:'フェザー',star:'スター尾',leaf:'リーフ尾'};
const pick=a=>a[Math.floor(Math.random()*a.length)];
window.DRACO_JP=JP;
window.ensureDracoVisual=function(m){
 if(!m||m.species!=='draco')return m;
 m.visual||={};m.visual.horn||=pick(H);m.visual.wing||=pick(W);m.visual.tail||=pick(T);
 m.visual.part=`${JP[m.visual.horn]}・${JP[m.visual.wing]}・${JP[m.visual.tail]}`;return m;
};
const oldVisual=visual;
visual=function(sp){const v=oldVisual(sp);if(sp==='draco'){v.horn=pick(H);v.wing=pick(W);v.tail=pick(T);v.part=`${JP[v.horn]}・${JP[v.wing]}・${JP[v.tail]}`;}return v;};
const oldBaby=baby;
baby=function(a,b){const c=oldBaby(a,b);if(c.species==='draco'){ensureDracoVisual(a);ensureDracoVisual(b);ensureDracoVisual(c);for(const k of ['horn','wing','tail']){const pool=k==='horn'?H:k==='wing'?W:T;c.visual[k]=Math.random()<.48?(a.visual?.[k]||pick(pool)):Math.random()<.96?(b.visual?.[k]||pick(pool)):pick(pool);}c.visual.part=`${JP[c.visual.horn]}・${JP[c.visual.wing]}・${JP[c.visual.tail]}`;}return c;};
[...(S.starters||[]),...(S.nest||[]),...(S.lineage||[]),...(S.cands||[]),...(S.foster||[]),...(S.released||[])].forEach(ensureDracoVisual);
})();
