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
function st267(){if(!S.training263||typeof S.training263!=='object')S.training263={};if(!S.training263.event267)S.training263.event267={count:0,pending:null,resolved:[],lastResult:'',rareCount:0,lastRareGeneration:0};if(!Array.isArray(S.training263.event267.resolved))S.training263.event267.resolved=[];return S.training263.event267}
function save267(){try{localStorage.setItem(SAVE267,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function fatigue267(id,d){if(!S.training263.fatigue)S.training263.fatigue={};S.training263.fatigue[id]=Math.max(0,Math.min(2,(Number(S.training263.fatigue[id])||0)+d))}
function pick267(){const a=S.nest||[];return a[Math.floor(Math.random()*a.length)]}
function cap267(){try{return Math.max(999,Number(window.STAR_LIMIT278?.cap?.())||999)}catch(_){return 999}}
function add267(m,k,v){if(!m?.stats)return 0;const before=Number(m.stats[k])||0;m.stats[k]=Math.max(0,Math.min(cap267(),before+v));return m.stats[k]-before}
function addAll267(m,v){for(const k of ['power','speed','stamina','agility','tech','guts'])add267(m,k,v)}
function best267(m){return ['power','speed','stamina','agility','tech','guts'].sort((a,b)=>(Number(m.stats[b])||0)-(Number(m.stats[a])||0))[0]}
function worst267(m){return ['power','speed','stamina','agility','tech','guts'].sort((a,b)=>(Number(m.stats[a])||0)-(Number(m.stats[b])||0))[0]}
function grantSkill267(m,id){if(!m)return false;m.skills233=Array.isArray(m.skills233)?m.skills233:[];if(m.skills233.includes(id))return true;if(m.skills233.length>=6)return false;m.skills233.push(id);return true}
function title267(m,id,name,icon){if(!m)return;m.rareTitles323=Array.isArray(m.rareTitles323)?m.rareTitles323:[];if(!m.rareTitles323.some(x=>x.id===id))m.rareTitles323.push({id,name,icon,at:Date.now(),generation:Number(S.generation233)||Number(m.gen)||1})}
function gen267(){return Math.max(1,Number(S.generation233)||Math.max(1,...(S.nest||[]).map(m=>Number(m.gen)||1)))}

function maybe267(){
  const st=st267();if(st.pending||st.count>=3||Number(S.turn)>=3||!Array.isArray(S.nest)||S.nest.length!==3)return;
  const g=gen267(),rareEligible=g-(Number(st.lastRareGeneration)||0)>=4;
  const rareRoll=rareEligible&&Math.random()<.035;
  const chance=st.count===0?(Number(S.turn)>=1?.68:.38):st.count===1?.34:.18;
  if(!rareRoll&&Math.random()>chance)return;
  let keys=Object.keys(EV267).filter(k=>rareRoll?EV267[k].tier==='rare':EV267[k].tier!=='rare');
  if(!rareRoll&&Math.random()<.24)keys=keys.filter(k=>EV267[k].tier==='special');
  if(!keys.length)return;
  const type=keys[Math.floor(Math.random()*keys.length)],m=pick267();if(!m)return;
  st.pending={type,id:m.id,name:m.name,tier:EV267[type].tier};st.lastResult='';st.count++;
  if(EV267[type].tier==='rare'){st.rareCount=(Number(st.rareCount)||0)+1;st.lastRareGeneration=g}
  save267();render267();
}
function resolve267(choice){
  const st=st267(),p=st.pending;if(!p)return;const m=(S.nest||[]).find(x=>x.id===p.id);if(!m){st.pending=null;save267();render267();return}
  let msg='',success=false;
  const safe=()=>{const k=worst267(m),g=add267(m,k,8);msg=`堅実に整えた。 ${SL?.[k]||k}+${g}`};
  switch(p.type){
    case 'awaken': if(choice==='a'){success=Math.random()<.62;if(success){const k=best267(m),g=add267(m,k,18);msg=`覚醒成功！ ${SL?.[k]||k}+${g}`}else{fatigue267(m.id,1);msg='空回り。疲労+1'}}else safe();break;
    case 'rival': if(choice==='a'){add267(m,'guts',12);add267(m,'tech',10);fatigue267(m.id,1);msg='ライバルから刺激！ こんじょう+12 / テクニック+10 / 疲労+1'}else safe();break;
    case 'condition': if(choice==='a'){fatigue267(m.id,-2);msg='完全休養で疲労を回復'}else{success=Math.random()<.48;if(success){add267(m,'guts',18);msg='強行成功！ こんじょう+18'}else{add267(m,'stamina',-12);fatigue267(m.id,1);msg='無理が響いた。スタミナ-12 / 疲労+1'}}break;
    case 'coach': if(choice==='a'){success=Math.random()<.7;if(success){add267(m,'tech',16);add267(m,'agility',10);msg='フォーム改造成功！ テクニック+16 / すばやさ+10'}else{add267(m,'tech',-8);msg='フォームを崩した。テクニック-8'}}else safe();break;
    case 'weather': if(choice==='a'){add267(m,'stamina',14);add267(m,'guts',14);fatigue267(m.id,1);msg='悪条件を完走。スタミナ+14 / こんじょう+14 / 疲労+1'}else safe();break;
    case 'fan': add267(m,'guts',choice==='a'?14:8);msg=choice==='a'?'声援を力に変えた。こんじょう+14':'平常心を保った。こんじょう+8';break;
    case 'study': if(choice==='a'){add267(m,'tech',18);msg='分析が実った。テクニック+18'}else{add267(m,best267(m),12);msg='実戦感覚を磨いた。得意能力+12'}break;
    case 'duel': if(choice==='a'){success=Math.random()<.55;if(success){add267(m,'guts',16);grantSkill267(m,'comeback');msg='勝負に勝った！ こんじょう+16 / 逆境魂の才能'}else{add267(m,'guts',-6);msg='敗北。こんじょう-6'}}else safe();break;
    case 'focus': if(choice==='a'){add267(m,'tech',12);grantSkill267(m,'calm');msg='集中を深めた。テクニック+12 / 冷静沈着の才能'}else{add267(m,best267(m),14);fatigue267(m.id,1);msg='負荷を上げた。得意能力+14 / 疲労+1'}break;
    case 'restless': if(choice==='a'){fatigue267(m.id,-1);msg='休養を優先。疲労回復'}else{add267(m,'agility',9);msg='軽く動いて落ち着いた。すばやさ+9'}break;

    case 'secret': if(choice==='a'){add267(m,best267(m),38);add267(m,worst267(m),22);fatigue267(m.id,1);msg='秘密施設を使い切った！ 得意+38 / 弱点+22'}else{addAll267(m,8);msg='短時間でも質の高い練習。全能力+8'}break;
    case 'mutation': if(choice==='a'){success=Math.random()<.52;if(success){add267(m,worst267(m),55);grantSkill267(m,'mutation');msg='変異成功！ 弱点能力+55 / 覚醒因子'}else{add267(m,best267(m),-25);msg='変異失敗。得意能力-25'}}else{addAll267(m,6);msg='安定成長。全能力+6'}break;
    case 'tradeoff': if(choice==='a'){const hi=best267(m),lo=worst267(m);add267(m,hi,-40);add267(m,lo,85);msg=`才能転換！ ${SL?.[hi]||hi}-40 / ${SL?.[lo]||lo}+85`}else safe();break;
    case 'overdrive': if(choice==='a'){success=Math.random()<.46;if(success){addAll267(m,22);msg='オーバードライブ成功！ 全能力+22'}else{addAll267(m,-12);fatigue267(m.id,2);msg='限界を超えすぎた。全能力-12 / 疲労増'}}else{addAll267(m,10);msg='八分で止めて全能力+10'}break;
    case 'legendcoach': if(choice==='a'){add267(m,best267(m),45);grantSkill267(m,['prodigy','clutch','champion'][Math.floor(Math.random()*3)]);msg='伝説の指導！ 得意能力+45 / 特別スキル候補'}else{add267(m,'tech',25);msg='得意分野を吸収。テクニック+25'}break;

    case 'forbidden': if(choice==='a'){success=Math.random()<.40;if(success){add267(m,best267(m),110);grantSkill267(m,'champion');title267(m,'beyond_limit','限界を越えし者','⛓️');msg='禁断の特訓を完遂！ 得意能力+110 / 《限界を越えし者》'}else{add267(m,best267(m),-55);add267(m,worst267(m),-35);msg='禁断の代償。得意-55 / 弱点-35'}}else{msg='危険を見切って撤退した'}break;
    case 'miracle': if(choice==='a'){success=Math.random()<.30;if(success){addAll267(m,35);grantSkill267(m,'miracle');title267(m,'chosen_star','星に選ばれし者','🌠');msg='奇跡の覚醒！ 全能力+35 / 《星に選ばれし者》'}else{addAll267(m,-18);msg='覚醒は不発。全能力-18'}}else{addAll267(m,5);msg='兆候を温存。全能力+5'}break;
    case 'abyss': if(choice==='a'){success=Math.random()<.48;if(success){add267(m,'guts',95);grantSkill267(m,'comeback');title267(m,'abyss_returner','奈落から還りし者','🌑');msg='スランプを完全克服！ こんじょう+95 / 《奈落から還りし者》'}else{add267(m,'guts',-45);msg='まだ抜けられない。こんじょう-45'}}else{msg='時間を置いて立て直すことにした'}break;
    case 'comebackLegend': if(choice==='a'){success=Math.random()<.36;if(success){add267(m,'stamina',80);add267(m,'guts',80);grantSkill267(m,'endless');title267(m,'record_breaker','不可能を破る者','🔥');msg='不可能な記録を更新！ スタミナ+80 / こんじょう+80 / 《不可能を破る者》'}else{add267(m,'stamina',-45);fatigue267(m.id,2);msg='記録挑戦失敗。スタミナ-45 / 疲労増'}}else safe();break;
    case 'starGate': if(choice==='a'){success=Math.random()<.25;if(success){addAll267(m,45);grantSkill267(m,'starborn');title267(m,'star_gate','星門踏破者','🌌');msg='星門を踏破！ 全能力+45 / 《星門踏破者》'}else{addAll267(m,-22);msg='星門に拒まれた。全能力-22'}}else{msg='星門を見送り、次の機会を待つ'}break;
    default:safe();
  }
  st.resolved.push({type:p.type,tier:p.tier,id:p.id,choice,result:msg,success});if(st.resolved.length>12)st.resolved=st.resolved.slice(-12);st.pending=null;st.lastResult=msg;save267();
  try{render();window.renderRoster210Live&&window.renderRoster210Live();window.STAR_SKILL254?.sync?.();window.STAR_MY_STAR323?.sync?.()}catch(_){}render267();
}
function render267(result=''){
  const plans=document.getElementById('plans');if(!plans)return;
  let host=document.getElementById('event267');if(!host){host=document.createElement('div');host.id='event267'}if(plans.nextElementSibling!==host)plans.insertAdjacentElement('afterend',host)
  const st=st267(),p=st.pending,last=result||st.lastResult||'';
  if(!p){host.innerHTML=last?`<div class="eventResult267"><b>イベント結果</b><span>${last}</span></div>`:'';return}
  const e=EV267[p.type];host.innerHTML=`<div class="eventCutin267 ${e.tier==='rare'?'rare267':e.tier==='special'?'special267':''}">${e.tier==='rare'?'超レアイベント':e.tier==='special'?'特別イベント':'育成イベント'}</div><div class="eventCard267 ${e.tier==='rare'?'rare267':e.tier==='special'?'special267':''}"><div class="eventTitle267"><b>${e.icon} ${e.name}</b><span>${p.name}</span></div><p>${e.text}</p><div class="eventActions267"><button type="button" data-event267="a">${e.a}</button><button type="button" data-event267="b">${e.b}</button></div><small>${e.tier==='rare'?'成功すれば永久称号を獲得することがあります。失敗時の損失も大きい。':e.tier==='special'?'低頻度の特別イベント。選択で成長幅が大きく変わります。':'イベントの発生は運。結果は選択で変わります。'}</small></div>`;
  const go=document.getElementById('doTrain263');if(go){go.disabled=true;go.title='先にイベントの選択を決めてください'}
}
window.addEventListener('click',e=>{
  const b=e.target?.closest?.('[data-event267]');if(b){e.preventDefault();e.stopPropagation();resolve267(b.dataset.event267);return}
  if(e.target?.closest?.('#doTrain263'))setTimeout(()=>{maybe267();render267()},70);
  if(e.target?.closest?.('.tab[data-v="train"]'))setTimeout(render267,0);
  if(e.target?.closest?.('#adopt'))setTimeout(()=>{if(Number(S.turn)===0){S.training263.event267={count:0,pending:null,resolved:[],lastResult:'',rareCount:0,lastRareGeneration:Number(S.training263?.event267?.lastRareGeneration)||0};save267();render267()}},260);
},true);
function late267(){render267();[80,220].forEach(ms=>setTimeout(render267,ms))}
try{const prev267=render;render=function(){const out=prev267();late267();return out}}catch(e){console.warn('render267',e)}
const css=document.createElement('style');css.textContent=`.eventCutin267{margin:8px 0 0;padding:7px;text-align:center;border-radius:10px 10px 0 0;background:#342b4c;color:#fff;font-size:8px;font-weight:1000;letter-spacing:.14em;animation:eventCut267 .35s ease}.eventCard267{margin:0 0 8px;padding:9px;border:2px solid #7c63b7;border-radius:11px;background:#f8f5ff}.eventTitle267{display:flex;justify-content:space-between;align-items:center;gap:8px}.eventTitle267 b{font-size:10px}.eventTitle267 span{font-size:7px;font-weight:1000;border:1px solid #a99aca;border-radius:999px;padding:2px 6px;background:#fff}.eventCard267 p{font-size:8px;margin:6px 0}.eventCard267 small{display:block;font-size:6px;color:#6d6382;margin-top:5px}.eventActions267{display:grid;grid-template-columns:1fr 1fr;gap:6px}.eventActions267 button{min-height:36px;border:1px solid #7c63b7;border-radius:8px;background:#fff;font-size:8px;font-weight:1000;color:#342b4c}.eventActions267 button:first-child{background:#eee7ff}.eventResult267{margin:7px 0;padding:7px;border:1px solid #88b99a;border-radius:9px;background:#f1fff5;font-size:8px;font-weight:900}.eventCutin267.special267{background:#745313}.eventCard267.special267{border-color:#d2a642;background:#fff9e7}.eventCutin267.rare267{background:linear-gradient(90deg,#281243,#5b2475,#281243);box-shadow:0 0 16px #a34dff88}.eventCard267.rare267{border-color:#8c52c7;background:radial-gradient(circle at top,#f8edff,#fff);box-shadow:0 0 0 2px #ead5ff inset}.eventCard267.rare267 .eventActions267 button:first-child{background:#eadcff;border-color:#8c52c7}@keyframes eventCut267{0%{transform:translateX(-18px);opacity:0}100%{transform:none;opacity:1}}`;document.head.appendChild(css);late267();
})();