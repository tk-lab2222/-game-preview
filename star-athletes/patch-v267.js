(()=>{
// v0.27.7: M2.5 lightweight random training events. Event is luck; outcome is player choice.
const SAVE267='star-athletes-save-v200';
const EV267={
  awaken:{tier:'normal',icon:'✨',name:'覚醒の兆し',text:'いつも以上の集中を見せている。ここで一段攻める？',a:'攻める',b:'安全に行く'},
  rival:{tier:'normal',icon:'🤝',name:'ライバル合同練習',text:'ライバルチームから合同練習の誘いが来た。',a:'参加する',b:'見学する'},
  condition:{tier:'normal',icon:'🩹',name:'体調不良',text:'少し動きが重い。このまま練習を続ける？',a:'休養する',b:'強行する'},
  coach:{tier:'normal',icon:'📣',name:'コーチの助言',text:'フォームを大きく変える提案を受けた。',a:'試してみる',b:'今の形を守る'},
  weather:{tier:'normal',icon:'🌧️',name:'悪天候トレーニング',text:'環境は最悪。でも鍛えるには絶好かもしれない。',a:'続行する',b:'室内へ移る'},
  fan:{tier:'normal',icon:'📮',name:'ファンレター',text:'応援の言葉が届いた。本人はかなり嬉しそうだ。',a:'力に変える',b:'落ち着かせる'},
  study:{tier:'normal',icon:'📚',name:'映像研究',text:'強豪の映像を見て新しい動きを研究している。',a:'徹底分析',b:'実戦優先'},
  duel:{tier:'normal',icon:'⚔️',name:'チーム内勝負',text:'仲間から1対1の勝負を挑まれた。',a:'受けて立つ',b:'今日は譲る'},
  focus:{tier:'normal',icon:'🧘',name:'ゾーンの入口',text:'静かな集中状態に入っている。',a:'集中を深める',b:'負荷を上げる'},
  restless:{tier:'normal',icon:'💤',name:'眠れない夜',text:'大会を意識して寝付けないようだ。',a:'休ませる',b:'軽く動く'},

  secret:{tier:'special',icon:'🗝️',name:'秘密の練習場',text:'普段は入れない特別施設を使えることになった。',a:'徹底的に使う',b:'短時間だけ使う'},
  mutation:{tier:'special',icon:'🧬',name:'突然変異の兆候',text:'身体能力に不思議な変化が出ている。踏み込む？',a:'変化を促す',b:'安定を選ぶ'},
  tradeoff:{tier:'special',icon:'⚖️',name:'才能の転換',text:'一つの強みを削れば、弱点を大きく伸ばせそうだ。',a:'転換する',b:'今の才能を守る'},
  overdrive:{tier:'special',icon:'🚀',name:'オーバードライブ',text:'限界を超えた負荷に耐えられそうな雰囲気がある。',a:'限界まで追う',b:'八分で止める'},
  legendcoach:{tier:'special',icon:'🎓',name:'伝説のコーチ',text:'一日だけ指導を受けられる機会が来た。',a:'全て任せる',b:'得意分野だけ習う'},

  forbidden:{tier:'rare',icon:'⛓️',name:'禁断の特訓',text:'成功すれば別人級。失敗すれば能力を大きく失う危険なメニューだ。',a:'挑戦する',b:'撤退する'},
  miracle:{tier:'rare',icon:'🌠',name:'奇跡の覚醒',text:'一生に一度あるかどうかの覚醒反応が出ている。',a:'全てを賭ける',b:'見守る'},
  abyss:{tier:'rare',icon:'🌑',name:'奈落からの帰還',text:'完全なスランプ。ここを越えれば精神的に別格になれる。',a:'正面から向き合う',b:'時間を置く'},
  comebackLegend:{tier:'rare',icon:'🔥',name:'不可能への挑戦',text:'誰も成功したことがない練習記録への挑戦権を得た。',a:'記録を狙う',b:'通常メニューへ'},
  starGate:{tier:'rare',icon:'🌌',name:'星門の試練',text:'ネストに伝わる幻の試練。完遂者は星の名を刻まれる。',a:'星門へ入る',b:'今回は見送る'}
};
const ACTION267={
 awaken:[{p:.62,up:[['best',7]],failFatigue:1},{up:[['worst',3]]}],
 rival:[{up:[['guts',5],['tech',4]],fatigue:1},{up:[['worst',3]]}],
 condition:[{fatigue:-2},{p:.48,up:[['guts',7]],fail:[['stamina',-5]],failFatigue:1}],
 coach:[{p:.70,up:[['tech',6],['agility',4]],fail:[['tech',-3]]},{up:[['worst',3]]}],
 weather:[{up:[['stamina',5],['guts',5]],fatigue:1},{up:[['worst',3]]}],
 fan:[{up:[['guts',5]]},{up:[['guts',3]],fatigue:-1}],
 study:[{up:[['tech',7]]},{up:[['best',5]]}],
 duel:[{p:.55,up:[['guts',6]],skill:['comeback'],fail:[['guts',-2]]},{up:[['worst',3]]}],
 focus:[{up:[['tech',5]],skill:['calm']},{up:[['best',6]],fatigue:1}],
 restless:[{fatigue:-1},{up:[['agility',3]]}],
 secret:[{up:[['best',14],['worst',8]],fatigue:1},{up:[['all',3]]}],
 mutation:[{p:.52,up:[['worst',20]],skill:['mutation'],fail:[['best',-9]]},{up:[['all',2]]}],
 tradeoff:[{up:[['best',-14],['worst',30]]},{up:[['worst',3]]}],
 overdrive:[{p:.62,up:[['all',8]],fail:[['all',-3]],failFatigue:1},{up:[['all',4]]}],
 legendcoach:[{up:[['best',16]],skill:['prodigy','clutch','champion']},{up:[['tech',10]]}],
 forbidden:[{p:.40,up:[['best',40]],skill:['champion'],title:['beyond_limit','限界を越えし者','⛓️'],fail:[['best',-20],['worst',-12]]},{}],
 miracle:[{p:.30,up:[['all',12]],skill:['miracle'],title:['chosen_star','星に選ばれし者','🌠'],fail:[['all',-6]]},{up:[['all',2]]}],
 abyss:[{p:.48,up:[['guts',34]],skill:['comeback'],title:['abyss_returner','奈落から還りし者','🌑'],fail:[['guts',-16]]},{fatigue:-1}],
 comebackLegend:[{p:.36,up:[['stamina',29],['guts',29]],skill:['endless'],title:['record_breaker','不可能を破る者','🔥'],fail:[['stamina',-16]],failFatigue:2},{up:[['worst',3]]}],
 starGate:[{p:.25,up:[['all',16]],skill:['starborn'],title:['star_gate','星門踏破者','🌌'],fail:[['all',-8]]},{}]
};
const KEYS267=['power','speed','stamina','agility','tech','guts'];
function gen267(){return Math.max(1,Number(S.generation233)||Number(S.generation232)||1)}
function st267(){
 S.training263=S.training263||{};const st=S.training263.event267||(S.training263.event267={count:0,pending:null,resolved:[],lastResult:'',rareCount:0,lastRareGeneration:0});
 if(st.generation==null)st.generation=gen267();
 if(st.generation!==gen267())Object.assign(st,{generation:gen267(),count:0,pending:null,resolved:[],lastResult:'',lastTrainingKey:''});
 if(!Array.isArray(st.resolved))st.resolved=[];return st;
}
function save267(){try{window.STAR_SAVE_CORE?.save?.('event267')||localStorage.setItem(SAVE267,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function fatigue267(id,d){S.training263.fatigue=S.training263.fatigue||{};S.training263.fatigue[id]=Math.max(0,Math.min(2,(Number(S.training263.fatigue[id])||0)+d))}
function afterTraining267(){
 const st=st267(),key=[gen267(),Number(S.season)||1,Number(S.turn)||0].join(':');
 if(st.lastTrainingKey===key)return;st.lastTrainingKey=key;
 if(st.pending||st.count>=2||!S.nest?.length)return;
 if(Math.random()>=(st.count===0?.12:.08))return;
 const rare=gen267()-(Number(st.lastRareGeneration)||0)>=4&&Math.random()<.035;
 const tier=rare?'rare':Math.random()<.18?'special':'normal';
 const keys=Object.keys(EV267).filter(k=>EV267[k].tier===tier),type=keys[Math.floor(Math.random()*keys.length)],m=S.nest[Math.floor(Math.random()*S.nest.length)];
 st.pending={type,id:m.id,name:m.name,tier};st.count++;st.lastResult='';
 if(rare){st.rareCount=(Number(st.rareCount)||0)+1;st.lastRareGeneration=gen267()}save267();
}
function resolve267(choice){
 const st=st267(),p=st.pending;if(!p||!['a','b'].includes(choice))return;
 const m=(S.nest||[]).find(x=>x.id===p.id),a=ACTION267[p.type]?.[choice==='a'?0:1];
 if(!m||!a){st.pending=null;save267();render267();return}
 const sorted=KEYS267.slice().sort((x,y)=>(Number(m.stats[y])||0)-(Number(m.stats[x])||0)),best=sorted[0],worst=sorted[sorted.length-1];
 const success=a.p==null||Math.random()<a.p,deltas=[],effects=success?a.up:a.fail;
 for(const [key,value] of effects||[]){for(const k of key==='all'?KEYS267:[key==='best'?best:key==='worst'?worst:key]){
  const actual=window.STAR_GROWTH226.trainingDelta(m,k,value,999);if(actual)deltas.push((SL[k]||k)+(actual>0?'+':'')+actual);
 }}
 const fd=success?a.fatigue:a.failFatigue;if(fd){fatigue267(m.id,fd);deltas.push(fd<0?'疲労回復':'疲労+'+fd)}
 if(success&&a.skill){m.skills233=Array.isArray(m.skills233)?m.skills233:[];const open=a.skill.filter(k=>!m.skills233.includes(k));if(open.length&&m.skills233.length<6){m.skills233.push(open[Math.floor(Math.random()*open.length)]);deltas.push('スキル習得')}}
 if(success&&a.title){m.rareTitles323=Array.isArray(m.rareTitles323)?m.rareTitles323:[];const [id,name,icon]=a.title;if(!m.rareTitles323.some(x=>x.id===id))m.rareTitles323.push({id,name,icon,at:Date.now(),generation:gen267()});deltas.push('称号獲得')}
 const msg=(success?'✓ ':'△ ')+(deltas.join(' / ')||'能力変化なし');
 st.resolved.push({type:p.type,tier:p.tier,id:p.id,choice,result:msg,success});st.resolved=st.resolved.slice(-12);st.pending=null;st.lastResult=msg;save267();
 try{render();window.renderRoster210Live?.();window.STAR_SKILL254?.sync?.();window.STAR_MY_STAR323?.sync?.()}catch(_){}render267();
}
function actionText267(a){
 const labels={all:'全能力',best:'得意',worst:'弱点'};
 const up=(a.up||[]).map(([k,v])=>(labels[k]||SL[k])+ (v>=0?'+':'')+v).join(' / ');
 return [(a.p!=null?'成功 '+Math.round(a.p*100)+'%':null),up,a.skill?'スキル候補':null,a.title?'称号候補':null,a.fatigue<0?'疲労回復':a.fatigue>0?'疲労+'+a.fatigue:null,a.p!=null?'失敗：'+[...(a.fail||[]).map(([k,v])=>(labels[k]||SL[k])+v),...(a.failFatigue?['疲労+'+a.failFatigue]:[])].join(' / '):null].filter(Boolean).join(' · ')||'能力変化なし';
}
function render267(){
 const plans=document.getElementById('plans');if(!plans)return;
 let host=document.getElementById('event267');if(!host){host=document.createElement('div');host.id='event267'}if(plans.nextElementSibling!==host)plans.insertAdjacentElement('afterend',host);
 const st=st267(),p=st.pending;
 if(!p)host.innerHTML=st.lastResult?`<div class="eventResult267"><span>${st.lastResult}</span></div>`:'';
 else{const e=EV267[p.type];if(!e)return;host.innerHTML=`<div class="eventCard267 ${e.tier==='rare'?'rare267':e.tier==='special'?'special267':''}"><div class="eventTitle267"><b>${e.icon} ${e.name}</b><span>${p.name}</span></div><p>${e.text}</p><div class="eventActions267">${['a','b'].map((c,i)=>`<button type="button" data-event267="${c}"><b>${e[c]}</b><small style="display:block">${actionText267(ACTION267[p.type][i])}</small></button>`).join('')}</div></div>`}
 const go=document.getElementById('doTrain263');if(go)go.disabled=!!p||Number(S.turn)>=3;
 const meet=document.getElementById('toMeet');if(meet)meet.disabled=!!p||Number(S.turn)<3;
}
window.STAR_EVENTS267={afterTraining:afterTraining267,pending:()=>!!st267().pending,sync:render267};
window.addEventListener('click',e=>{
 const b=e.target?.closest?.('[data-event267]');if(b){e.preventDefault();e.stopPropagation();resolve267(b.dataset.event267);return}
 if(e.target?.closest?.('#toMeet')&&st267().pending){e.preventDefault();e.stopImmediatePropagation();render267();return}
 if(e.target?.closest?.('.tab[data-v="train"],#adopt'))setTimeout(render267,0);
},true);
function late267(){render267();[80,220].forEach(ms=>setTimeout(render267,ms))}
try{const prev267=render;render=function(){const out=prev267();late267();return out}}catch(e){console.warn('render267',e)}
const css=document.createElement('style');css.textContent=`.eventCard267{margin:0 0 8px;padding:9px;border:2px solid #7c63b7;border-radius:11px;background:#f8f5ff}.eventTitle267{display:flex;justify-content:space-between;align-items:center;gap:8px}.eventTitle267 b{font-size:10px}.eventTitle267 span{font-size:7px;font-weight:1000;border:1px solid #a99aca;border-radius:999px;padding:2px 6px;background:#fff}.eventCard267 p{font-size:8px;margin:6px 0}.eventCard267 small{display:block;font-size:6px;color:#6d6382;margin-top:5px}.eventActions267{display:grid;grid-template-columns:1fr 1fr;gap:6px}.eventActions267 button{min-height:36px;border:1px solid #7c63b7;border-radius:8px;background:#fff;font-size:8px;font-weight:1000;color:#342b4c}.eventActions267 button:first-child{background:#eee7ff}.eventResult267{margin:7px 0;padding:7px;border:1px solid #88b99a;border-radius:9px;background:#f1fff5;font-size:8px;font-weight:900}.eventCard267.special267{border-color:#d2a642;background:#fff9e7}.eventCard267.rare267{border-color:#8c52c7;background:radial-gradient(circle at top,#f8edff,#fff);box-shadow:0 0 0 2px #ead5ff inset}.eventCard267.rare267 .eventActions267 button:first-child{background:#eadcff;border-color:#8c52c7}`;document.head.appendChild(css);late267();
})();
