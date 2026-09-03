/* StudyRPG V10.11.94 - independent item/equipment database and compatibility layer */
(function(){
  'use strict';
  const DB=window.STUDYRPG_ITEM_EQUIPMENT_DB={version:'10.11.94'};
  const DEFAULT_DROP_RATES={
    weekday:{common:25,uncommon:15,rare:5,epic:0,legendary:0},
    friday:{common:20,uncommon:22,rare:15,epic:3,legendary:0},
    apocalypse:{common:0,uncommon:0,rare:100,epic:0,legendary:0},
    demon_general:{common:0,uncommon:0,rare:90,epic:10,legendary:0},
    midterm:{common:0,uncommon:0,rare:90,epic:10,legendary:0},
    final:{common:0,uncommon:0,rare:0,epic:100,legendary:0},
    replay:{common:0,uncommon:0,rare:0,epic:100,legendary:0},
    tower:{common:0,uncommon:0,rare:0,epic:98.5,legendary:1.5}
  };
  function ensureEquipmentRuntimeData(){
    gameData.equipmentRewardPool=Array.isArray(gameData.equipmentRewardPool)?gameData.equipmentRewardPool:[];
    gameData.hero=gameData.hero||{};gameData.hero.enhancementShards=Math.max(0,Number(gameData.hero.enhancementShards)||0);
    const saved=gameData.equipmentDropRates&&typeof gameData.equipmentDropRates==='object'?gameData.equipmentDropRates:{};
    gameData.equipmentDropRates={};
    for(const [source,defaults] of Object.entries(DEFAULT_DROP_RATES))gameData.equipmentDropRates[source]={...defaults,...(saved[source]&&typeof saved[source]==='object'?saved[source]:{})};
    return gameData;
  }
  window.ensureEquipmentRuntimeData=ensureEquipmentRuntimeData;
  ensureEquipmentRuntimeData();

  DB.items={
    small_hp_potion:{id:'small_hp_potion',name:'小型生命藥水',aliases:['初級生命藥水'],category:'consumable',subtype:'battle',icon:'❤️',effectType:'heal_hp',effectValue:60,battleConsumable:true},
    small_energy_potion:{id:'small_energy_potion',name:'小型能量藥水',aliases:[],category:'consumable',subtype:'battle',icon:'⚡',effectType:'heal_energy',effectValue:35,battleConsumable:true},
    beginner_poison:{id:'beginner_poison',name:'初級毒藥',aliases:[],category:'consumable',subtype:'battle',icon:'☠️',effectType:'poison',effectTurns:3,battleConsumable:true}
  };

  DB.rarityRules={
    common:{name:'普通',affixCount:0,random:true,editable:false},
    uncommon:{name:'優良',affixCount:1,random:true,editable:false},
    rare:{name:'稀有',affixCount:2,random:true,editable:true},
    epic:{name:'史詩',affixCount:[3,4],random:true,editable:true,setTemplateOnly:true},
    legendary:{name:'傳說',affixCount:'fixed',random:false,editable:true,uniqueOnly:true}
  };
  DB.iconPools={
    weapon:['t0_sword','t0_staff','t0_bow'],
    head:['t0_helm','t0_circlet'],
    body:['t0_armor','t0_robe'],
    accessory:['t0_ring','t0_charm']
  };
  DB.blueprints={rare:{},epic:{}};
  DB.sets={};
  DB.uniques={};
  DB.orangeDrop={allFloors:true,normalFloorChance:.015,bossFloorChance:.06};

  function itemByName(name){return Object.values(DB.items).find(x=>x.name===name||(x.aliases||[]).includes(name))||null;}
  function itemDef(inv){
    if(!inv)return null;
    return inv.itemData||gameData.shopItems.find(x=>x.id===inv.itemId)||DB.items[inv.definitionId]||itemByName(inv.name)||null;
  }
  window.isBattleConsumableInventory=function(inv){return !!(inv&&inv.status==='unused'&&itemDef(inv)?.battleConsumable);};
  window.battleConsumableCount=function(name){const def=itemByName(name);return gameData.inventory.filter(inv=>inv.status==='unused'&&isBattleConsumableInventory(inv)&&itemDef(inv)?.id===(def?.id||itemDef(inv)?.id)).length;};
  window.consumeBattleConsumableById=function(definitionId){
    const i=gameData.inventory.findIndex(inv=>inv.status==='unused'&&isBattleConsumableInventory(inv)&&itemDef(inv)?.id===definitionId);
    if(i<0)return false;gameData.inventory.splice(i,1);saveGame();return true;
  };

  function migrateInventory(){
    gameData.inventory=(gameData.inventory||[]).map(inv=>{
      const def=itemByName(inv.name);
      if(def&&!inv.definitionId){inv.definitionId=def.id;inv.itemData={...def};if(def.id==='small_hp_potion')inv.name=def.name;}
      return inv;
    });
  }

  function classWeights(){
    const cls=gameData.hero?.heroClass||'初心者';
    return {
      '戰士':{attack:3,maxHp:2.4,defense:2.2,block:2,magicDefense:1,speed:.7},
      '法師':{magicAttack:3,maxEnergy:2.5,crit:1.5,speed:1,magicDefense:1.2},
      '牧師':{magicAttack:2.2,maxEnergy:2.2,maxHp:1.8,magicDefense:1.8,defense:1.2},
      '獵人':{attack:2.7,speed:2.4,crit:2.2,maxEnergy:1.5,evade:1.2},
      '盜賊':{attack:2.7,speed:2.6,crit:2.3,evade:2,maxEnergy:1.2},
      '聖騎士':{attack:1.8,magicAttack:1.5,defense:2.3,magicDefense:2.1,maxHp:2.2,block:1.8},
      '魔劍士':{attack:2.1,magicAttack:2.1,speed:1.7,maxEnergy:1.7,crit:1.3},
      '初心者':{attack:1.5,magicAttack:1.2,defense:1.4,magicDefense:1.3,maxHp:1.3,speed:1.2}
    }[cls]||{};
  }
  function smartScore(item){
    const w=classWeights(),stats=item?.stats||{};
    let score=Number(window.equipmentPowerScore?.(item)||0);
    for(const [k,v] of Object.entries(stats))score+=(w[k]||.45)*Math.abs(Number(v)||0);
    for(const a of (item?.affixes||[])){
      if(a.stat)score+=(w[a.stat]||.45)*2;
      if(a.kind==='trigger'||a.kind==='summon')score+=5;
    }
    const hasAttack=(item?.affixes||[]).some(a=>a.stat==='attack'),hasMagic=(item?.affixes||[]).some(a=>a.stat==='magicAttack');
    if(hasAttack&&hasMagic)score-=4;
    return score;
  }
  function addFourthEpicAffix(item){
    if(item?.rarity!=='epic'||(item.affixes||[]).length!==3||Math.random()>=.35)return item;
    const defs=Object.values(window.EQUIPMENT_AFFIX_DATABASE||{}),used=new Set(item.affixes.map(a=>a.id));
    const pool=defs.filter(a=>(a.slots||[]).includes(item.equipSlot)&&!used.has(a.id));if(!pool.length)return item;
    const a={...pool[Math.floor(Math.random()*pool.length)]};
    if(a.kind==='stat'){
      const step=Number(a.step||1),count=Math.max(0,Math.round((Number(a.max)-Number(a.min))/step));
      a.value=Number(a.min)+Math.floor(Math.random()*(count+1))*step;a.power=a.value*Number(a.powerPerUnit||1);item.stats[a.stat]=(item.stats[a.stat]||0)+a.value;
    }
    item.affixes.push(a);return item;
  }
  function currentSlotScore(slot){
    const invId=gameData.hero?.equipment?.[slot],inv=(gameData.inventory||[]).find(x=>x.id===invId),def=inv?itemDef(inv):null;
    return def?Number(window.equipmentPowerScore?.(def)||0):0;
  }
  const originalGenerator=window.generateRandomEquipment;
  if(typeof originalGenerator==='function')window.generateSmartEquipment=function(opts={}){
    const week=Math.max(1,Number(opts.week)||Number(window.semesterWeekIndex?.())||1),floor=Math.max(0,Number(opts.floor)||0),cycle=Math.max(1,Number(window.currentCampaignCycle?.())||1);
    const tier=Math.max(0,Number(opts.tier)||Math.floor((week-1)/5)+Math.floor(floor/15)+cycle-1);
    const tries=Math.max(6,Number(opts.tries)||14);let best=null,bestScore=-Infinity;
    for(let i=0;i<tries;i++){
      const item=addFourthEpicAffix(originalGenerator({...opts,tier,rarity:opts.rarity==='legendary'?'epic':opts.rarity}));
      if(!item)continue;
      const pool=DB.iconPools[item.equipSlot]||[];
      if(pool.length){item.visualId=pool[Math.floor(Math.random()*pool.length)];item.inventoryIcon=`images/equipment/icons/${item.equipSlot}/${item.visualId}.png`;}
      const score=smartScore(item);if(score>bestScore){best=item;bestScore=score;}
    }
    if(!best)return originalGenerator({...opts,tier});
    best.smartGenerated=true;best.generationContext={week,floor,cycle,heroClass:gameData.hero?.heroClass||'初心者',slotBaseline:currentSlotScore(best.equipSlot)};
    best.description=(best.description||'')+`｜智慧適配：${best.generationContext.heroClass}・第${week}週`;
    return best;
  };

  window.generateEquipmentBatch=function(opts={}){
    ensureEquipmentRuntimeData();
    const count=Math.max(1,Math.min(100,Number(opts.count)||10)),out=[];
    for(let i=0;i<count;i++){
      const item=generateSmartEquipment(opts),row={id:'equipment_pool_'+uid(),name:item.name,rarity:item.rarity||opts.rarity||'common',equipSlot:item.equipSlot,icon:item.icon||'🛡️',iconId:item.visualId||'',templateData:JSON.parse(JSON.stringify(item)),enabled:true,weight:10,sources:['weekday','friday','apocalypse','demon_general','midterm','final','replay','tower'],minWeek:1,maxWeek:999,dropCount:0,createdAt:new Date().toISOString()};
      gameData.equipmentRewardPool.push(row);out.push(row);
    }
    saveGame();renderAll();return out;
  };
  window.saveEquipmentBlueprint=function(item,templateId){
    if(!item||!['rare','epic'].includes(item.rarity))throw new Error('只有藍色與紫色裝備可以保存模板');
    const id=String(templateId||`template_${uid()}`),copy=JSON.parse(JSON.stringify(item));delete copy.id;delete copy.createdAt;
    DB.blueprints[item.rarity][id]={id,rarity:item.rarity,item:copy,locked:true};return id;
  };
  window.generateFromEquipmentBlueprint=function(templateId,count=1){
    const row=[...Object.values(DB.blueprints.rare),...Object.values(DB.blueprints.epic)].find(x=>x.id===templateId);if(!row)throw new Error('找不到裝備模板');
    const out=[];for(let i=0;i<Math.max(1,Math.min(100,Number(count)||1));i++){
      const item=JSON.parse(JSON.stringify(row.item));item.id='template_equipment_'+uid();item.templateId=row.id;item.createdAt=new Date().toISOString();
      const inv={id:uid(),itemId:item.id,itemData:item,name:item.name,status:'unused',boughtDate:today(),source:'template',affixes:item.affixes,tier:item.tier,generated:true,templateId:row.id};gameData.inventory.push(inv);out.push(inv);
    }
    saveGame();renderAll();return out;
  };

  DB.sets=window.EQUIPMENT_SET_DATABASE=window.EQUIPMENT_SET_DATABASE||{};
  DB.uniques=window.EQUIPMENT_UNIQUE_DATABASE=window.EQUIPMENT_UNIQUE_DATABASE||{};
  const originalTowerUnique=window.rollTowerUniqueEquipment;
  window.rollTowerUniqueEquipment=function(floor){
    const ids=Object.keys(DB.uniques).filter(id=>Number(DB.uniques[id]?.minFloor||1)<=Number(floor||1));if(!ids.length)return null;
    const chance=Number(floor)%5===0?DB.orangeDrop.bossFloorChance:DB.orangeDrop.normalFloorChance;if(Math.random()>=chance)return null;
    const weighted=ids.flatMap(id=>Array(Math.max(1,Number(DB.uniques[id]?.weight||1))).fill(id));const id=weighted[Math.floor(Math.random()*weighted.length)];
    return typeof window.createUniqueEquipmentDrop==='function'?window.createUniqueEquipmentDrop(id,'tower'):originalTowerUnique?.(floor)||null;
  };

  window.gmGenerateEquipmentBatchV101194=function(){
    const count=Math.max(1,Math.min(100,Number(document.getElementById('gmEqBatchCount')?.value)||10)),rarity=document.getElementById('gmEqBatchRarity')?.value||'uncommon',slot=document.getElementById('gmEqBatchSlot')?.value||'';
    const made=generateEquipmentBatch({count,rarity,slot:slot||undefined,forceAffix:rarity!=='common'});renderGM();alert(`已生成 ${made.length} 件裝備模板並加入獎勵池。`);
  };

  const RARITY_LABEL={common:'⚪ 白',uncommon:'🟢 綠',rare:'🔵 藍',epic:'🟣 紫',legendary:'🟠 橘'};
  const SOURCE_LABEL={weekday:'週一～週四',friday:'週五',apocalypse:'天啟四騎士',demon_general:'魔將',midterm:'期中',final:'期末',replay:'第21週回顧',tower:'無盡之塔'};
  function rarityOf(item){return item?.rarity||'common';}
  function equippedInventory(inv){return Object.values(gameData.hero.equipment||{}).includes(inv?.id);}
  function poolRowHTML(row){
    const item=row.templateData||{},stats=typeof equipmentStatText==='function'?equipmentStatText(item):'';
    return `<details class="card"><summary><b>${RARITY_LABEL[row.rarity]||row.rarity}｜${row.icon||'🛡️'} ${escapeHtml(row.name)}</b></summary><div class="small">${stats}<br>部位：${row.equipSlot}｜掉落次數：${row.dropCount||0}</div><div class="grid2"><div><label>權重</label><input id="poolWeight_${row.id}" type="number" min="0" value="${Number(row.weight)||0}"></div><div><label>狀態</label><select id="poolEnabled_${row.id}"><option value="1" ${row.enabled!==false?'selected':''}>啟用</option><option value="0" ${row.enabled===false?'selected':''}>停用</option></select></div></div><button class="btn blue" onclick="gmSavePoolRow('${row.id}')">儲存</button> <button class="btn gray" onclick="gmGrantPoolTest('${row.id}')">發測試品</button> <button class="btn red" onclick="gmDeletePoolRow('${row.id}')">刪除模板</button></details>`;
  }
  window.gmSavePoolRow=function(id){const row=gameData.equipmentRewardPool.find(x=>x.id===id);if(!row)return;row.weight=Math.max(0,Number(document.getElementById('poolWeight_'+id)?.value)||0);row.enabled=document.getElementById('poolEnabled_'+id)?.value!=='0';saveGame();renderGM();};
  window.gmDeletePoolRow=function(id){if(!confirm('刪除這個獎勵池模板？玩家已取得的裝備不受影響。'))return;gameData.equipmentRewardPool=gameData.equipmentRewardPool.filter(x=>x.id!==id);saveGame();renderGM();};
  function grantPoolItem(row,source='pool_test'){
    if(!row)return null;const seed=row.templateData||{},fixed=seed.templateLocked===true;
    let item=fixed?JSON.parse(JSON.stringify(seed)):generateSmartEquipment({rarity:row.rarity,slot:row.equipSlot,baseId:seed.baseId,forcedAffixIds:(seed.affixes||[]).map(a=>a.id),forceAffix:row.rarity!=='common'});
    item.id='equipment_instance_'+uid();item.poolTemplateId=row.id;item.enhancementLevel=0;item.unenhancedStats={...(item.stats||{})};item.baseStatsForEnhancement={...(item.stats||{})};item.createdAt=new Date().toISOString();
    const inv={id:uid(),itemId:item.id,itemData:item,name:item.name,status:'unused',boughtDate:today(),source,affixes:item.affixes,tier:item.tier,generated:true,poolTemplateId:row.id,locked:false};gameData.inventory.push(inv);row.dropCount=(Number(row.dropCount)||0)+1;return inv;
  }
  window.gmGrantPoolTest=function(id){const row=gameData.equipmentRewardPool.find(x=>x.id===id),inv=grantPoolItem(row);if(!inv)return;saveGame();renderAll();renderGM();alert(`測試品【${inv.name}】已放入背包。`);};

  window.gmSaveEquipmentDropRates=function(){
    ensureEquipmentRuntimeData();
    for(const source of Object.keys(SOURCE_LABEL))for(const rarity of Object.keys(RARITY_LABEL)){const el=document.getElementById(`drop_${source}_${rarity}`);if(el)gameData.equipmentDropRates[source][rarity]=Math.max(0,Math.min(100,Number(el.value)||0));}
    saveGame();renderGM();alert('裝備掉落機率已儲存。每列超過100%時，抽取時會按比例自動正規化。');
  };
  function dropRatesHTML(){ensureEquipmentRuntimeData();return `<div style="overflow-x:auto"><table><thead><tr><th>來源</th>${Object.values(RARITY_LABEL).map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${Object.entries(SOURCE_LABEL).map(([source,label])=>`<tr><td>${label}</td>${Object.keys(RARITY_LABEL).map(r=>`<td><input id="drop_${source}_${r}" type="number" min="0" max="100" value="${Number(gameData.equipmentDropRates[source]?.[r])||0}" style="width:64px">%</td>`).join('')}</tr>`).join('')}</tbody></table></div><div class="small">每列合計低於100%時，剩餘機率代表沒有裝備；高於100%會自動按比例換算。</div><button class="btn blue" onclick="gmSaveEquipmentDropRates()">儲存掉落機率</button>`;}
  function renderPoolManager(){ensureEquipmentRuntimeData();const rows=gameData.equipmentRewardPool||[];return `<div class="card"><h3>🎁 裝備獎勵池（${rows.length}）</h3><div class="small">模板可停用、調整權重、發測試品或刪除；刪除不影響已掉落裝備。</div>${rows.length?rows.map(poolRowHTML).join(''):'<div class="small">獎勵池目前是空的，請先批量生成。</div>'}</div><div class="card"><h3>🎯 掉落品質機率</h3>${dropRatesHTML()}</div>`;}

  function chooseRarity(source){ensureEquipmentRuntimeData();const rates=gameData.equipmentDropRates[source]||{},entries=Object.keys(RARITY_LABEL).map(id=>[id,Math.max(0,Number(rates[id])||0)]),total=entries.reduce((n,x)=>n+x[1],0);if(total<=0)return null;let r=Math.random()*Math.max(100,total);for(const [id,w] of entries){r-=w;if(r<0)return id;}return null;}
  function dropSource(){const s=window.battleStateV10||{},id=s.monsterId;if(s.towerMode||s.eventType==='tower')return'tower';if(s.celebrationReplay||s.eventType==='replay')return'replay';if(s.eventType==='final')return'final';if(s.eventType==='midterm')return'midterm';if(String(id||'').startsWith('apocalypse_'))return'apocalypse';if(id==='demon_general')return'demon_general';return new Date(today()+'T12:00:00').getDay()===5?'friday':'weekday';}
  function weightedPoolRow(source,rarity){const week=Math.max(1,Number(semesterWeekIndex?.())||1),rows=(gameData.equipmentRewardPool||[]).filter(x=>x.enabled!==false&&x.rarity===rarity&&(x.sources||[]).includes(source)&&week>=Number(x.minWeek||1)&&week<=Number(x.maxWeek||999));const total=rows.reduce((n,x)=>n+Math.max(0,Number(x.weight)||0),0);if(!rows.length||total<=0)return null;let r=Math.random()*total;for(const x of rows){r-=Math.max(0,Number(x.weight)||0);if(r<=0)return x;}return rows.at(-1);}
  window.rollEquipmentPoolDrop=function(source=dropSource(),forcedRarity=null){const rarity=forcedRarity||chooseRarity(source);if(!rarity)return null;if(rarity==='legendary'&&source==='tower'){const unique=rollTowerUniqueEquipment(Number(battleStateV10?.towerFloor)||1);if(unique)return unique;return null;}const row=weightedPoolRow(source,rarity);if(!row)return null;const inv=grantPoolItem(row,source);return {type:'equipment',label:`${RARITY_LABEL[rarity]} ${inv.name}`,value:inv.id,itemData:inv.itemData};};

  const originalDungeonDrop=window.rollDungeonDrop;
  window.rollDungeonDrop=function(rating=1){const source=dropSource(),drop=rollEquipmentPoolDrop(source);if(drop)return drop;const active=[];for(const item of gameData.shopItems){if(item.category==='equipment'&&item.active){active.push(item);item.active=false;}}try{return originalDungeonDrop(rating);}finally{active.forEach(x=>x.active=true);}};
  const originalRandomDrop=window.generateRandomEquipmentDrop;
  window.generateRandomEquipmentDrop=function(opts={}){const source=opts.source==='tower'?'tower':opts.source==='boss_replay'?'replay':opts.source||dropSource(),forced=source==='tower'||source==='replay'?'epic':null,drop=rollEquipmentPoolDrop(source,forced);if(drop)return drop;return originalRandomDrop(opts);};

  function enhancementBase(item){if(item.baseStatsForEnhancement)return item.baseStatsForEnhancement;const raw={...(item.stats||{})};item.baseStatsForEnhancement={...raw};item.unenhancedStats={...raw};return item.baseStatsForEnhancement;}
  const ENHANCE_COST=[0,2,3,4,5,6,8,10,12,15,20],ENHANCE_KEYS=new Set(['attack','magicAttack','defense','magicDefense','maxHp','maxEnergy','speed']);
  window.toggleEquipmentLock=function(id){const inv=gameData.inventory.find(x=>x.id===id);if(!inv)return;inv.locked=!inv.locked;saveGame();renderBag();};
  window.sellEquipment=function(id){const inv=gameData.inventory.find(x=>x.id===id),item=inv&&itemDef(inv);if(!inv||!item||equippedInventory(inv)||inv.locked)return alert('已裝備或已鎖定的裝備不能出售。');const rarity=rarityOf(item),score=Math.max(1,Number(equipmentPowerScore?.(item))||1),mult={common:.6,uncommon:1,rare:1.8,epic:3.5,legendary:8}[rarity]||1,value=Math.max(1,Math.round(score*mult));if(!confirm(`出售【${inv.name}】並獲得 ${value} G？`))return;if(rarity==='legendary'&&!confirm('這是橘色獨特裝備，確定仍要出售？'))return;gameData.hero.gold+=value;gameData.inventory=gameData.inventory.filter(x=>x.id!==id);saveGame();renderAll();};
  window.dismantleEquipment=function(id){const inv=gameData.inventory.find(x=>x.id===id),item=inv&&itemDef(inv);if(!inv||!item||equippedInventory(inv)||inv.locked)return alert('已裝備或已鎖定的裝備不能分解。');const rarity=rarityOf(item);if(rarity==='legendary')return alert('橘色裝備無法分解。');const amount={common:1,uncommon:3,rare:8,epic:20}[rarity]||1;if(['rare','epic'].includes(rarity)&&!confirm(`分解【${inv.name}】取得 ${amount} 強化碎片？`))return;gameData.hero.enhancementShards+=amount;gameData.inventory=gameData.inventory.filter(x=>x.id!==id);saveGame();renderAll();};
  window.enhanceEquipment=function(id){const inv=gameData.inventory.find(x=>x.id===id);let item=inv&&itemDef(inv);if(!inv||!item)return;if(!inv.itemData){inv.itemData=JSON.parse(JSON.stringify(item));item=inv.itemData;}const lv=Math.max(0,Number(item.enhancementLevel)||0);if(lv>=10)return alert('這件裝備已經強化到＋10。');const cost=ENHANCE_COST[lv+1];if(gameData.hero.enhancementShards<cost)return alert(`強化碎片不足，需要 ${cost}。`);if(!confirm(`消耗 ${cost} 碎片，將【${inv.name}】強化至＋${lv+1}？`))return;gameData.hero.enhancementShards-=cost;const original={...(item.unenhancedStats||item.stats||{})},base=enhancementBase(item),next=lv+1;item.unenhancedStats=original;item.stats={...original};for(const [k,v] of Object.entries(base))if(ENHANCE_KEYS.has(k))item.stats[k]=Math.round((Number(original[k])+(Number(v)||0)*.03*next)*100)/100;item.enhancementLevel=next;saveGame();renderAll();};
  window.bulkProcessLowEquipment=function(mode){const targets=gameData.inventory.filter(inv=>{const item=itemDef(inv),r=rarityOf(item);return item?.category==='equipment'&&['common','uncommon'].includes(r)&&!equippedInventory(inv)&&!inv.locked;});if(!targets.length)return alert('沒有可批量處理的白色或綠色裝備。');if(!confirm(`${mode==='sell'?'出售':'分解'} ${targets.length} 件未鎖定白綠裝？`))return;let gain=0;for(const inv of targets){const item=itemDef(inv),r=rarityOf(item);if(mode==='sell'){const score=Math.max(1,Number(equipmentPowerScore?.(item))||1);gain+=Math.max(1,Math.round(score*(r==='common'?.6:1)));}else gain+=r==='common'?1:3;}const ids=new Set(targets.map(x=>x.id));gameData.inventory=gameData.inventory.filter(x=>!ids.has(x.id));if(mode==='sell')gameData.hero.gold+=gain;else gameData.hero.enhancementShards+=gain;saveGame();renderAll();alert(`已處理 ${targets.length} 件，獲得 ${gain} ${mode==='sell'?'G':'強化碎片'}。`);};
  const originalItemDefinition=window.itemDefinition;
  window.itemDefinition=function(inv){return inv?.itemData||originalItemDefinition(inv);};
  const originalRenderBag=window.renderBag;
  window.renderBag=function(){ensureEquipmentRuntimeData();originalRenderBag();const panel=document.getElementById('panel-bag');if(!panel)return;const list=gameData.inventory.filter(inv=>itemDef(inv)?.category==='equipment');const box=document.createElement('div');box.className='card';box.innerHTML=`<h3>🔨 裝備處理</h3><div>強化碎片：<b>${gameData.hero.enhancementShards||0}</b>｜強化上限＋10</div><button class="btn gold" onclick="bulkProcessLowEquipment('sell')">批量出售白綠裝</button> <button class="btn purple" onclick="bulkProcessLowEquipment('dismantle')">批量分解白綠裝</button>${list.map(inv=>{const item=itemDef(inv),r=rarityOf(item),lv=Number(item.enhancementLevel)||0,blocked=equippedInventory(inv);return `<div class="card"><b>${RARITY_LABEL[r]||r} ${escapeHtml(inv.name)} ${lv?'＋'+lv:''}</b><div class="small">${equipmentStatText(item)}${blocked?'｜使用中':''}${inv.locked?'｜🔒已鎖定':''}</div><button class="btn gray" onclick="toggleEquipmentLock('${inv.id}')">${inv.locked?'解鎖':'鎖定'}</button> <button class="btn blue" onclick="enhanceEquipment('${inv.id}')" ${lv>=10?'disabled':''}>強化</button> <button class="btn gold" onclick="sellEquipment('${inv.id}')" ${blocked||inv.locked?'disabled':''}>出售</button> <button class="btn red" onclick="dismantleEquipment('${inv.id}')" ${blocked||inv.locked||r==='legendary'?'disabled':''}>分解</button></div>`;}).join('')}</div>`;panel.insertBefore(box,panel.children[2]||null);};

  function mountEquipmentBatchPanel(){
    ensureEquipmentRuntimeData();
    if(sessionStorage.getItem('parentUnlocked')!=='1')return;
    const panel=document.getElementById('panel-gm');if(!panel||document.getElementById('gmEquipmentBatchV101194'))return;
    const card=document.createElement('div');card.id='gmEquipmentBatchV101194';card.className='card';
    card.innerHTML='<h3>🎲 智慧裝備批量生成</h3><div class="small">依目前職業、裸裝能力、週數與同部位裝備挑選較合適的結果；不改怪物公式。橘裝禁止隨機生成。</div><div class="grid3"><div><label>數量</label><input id="gmEqBatchCount" type="number" min="1" max="100" value="10"></div><div><label>稀有度</label><select id="gmEqBatchRarity"><option value="common">⚪ 白色</option><option value="uncommon" selected>🟢 綠色</option><option value="rare">🔵 藍色</option><option value="epic">🟣 紫色</option></select></div><div><label>部位</label><select id="gmEqBatchSlot"><option value="">全部隨機</option><option value="weapon">武器</option><option value="head">頭部</option><option value="body">身體</option><option value="accessory">飾品</option></select></div></div><button class="btn purple" onclick="gmGenerateEquipmentBatchV101194()">批量生成並放入背包</button>';
    card.querySelector('button').textContent='批量生成並加入獎勵池';card.insertAdjacentHTML('beforeend',renderPoolManager());
    card.classList.add('gm-tab-section');card.dataset.gmTab='rewards';
    const rewardsCards=[...panel.querySelectorAll('.gm-tab-section[data-gm-tab="rewards"]')],anchor=rewardsCards.at(-1);
    if(anchor)anchor.insertAdjacentElement('afterend',card);else panel.appendChild(card);
    const active=sessionStorage.getItem('studyRPG_gmTab')||'semester';card.classList.toggle('gm-tab-hidden',active!=='rewards');
  }
  const oldRenderGM=window.renderGM;
  window.renderGM=function(){
    const result=oldRenderGM.apply(this,arguments);setTimeout(mountEquipmentBatchPanel,0);return result;
  };
  const oldSetGMTab=window.setGMTab;
  if(typeof oldSetGMTab==='function')window.setGMTab=function(tab,scroll=true){const result=oldSetGMTab(tab,scroll);mountEquipmentBatchPanel();const card=document.getElementById('gmEquipmentBatchV101194');if(card)card.classList.toggle('gm-tab-hidden',tab!=='rewards');return result;};
  const gmPanel=document.getElementById('panel-gm');if(gmPanel)new MutationObserver(()=>mountEquipmentBatchPanel()).observe(gmPanel,{childList:true});
  setTimeout(mountEquipmentBatchPanel,0);

  window.showBattleItems=function(){
    if(!battleStateV10||battleStateV10.busy)return;const box=document.getElementById('battleSubmenu');
    const usable=Object.values(DB.items).filter(def=>def.battleConsumable).map(def=>({def,count:gameData.inventory.filter(inv=>inv.status==='unused'&&isBattleConsumableInventory(inv)&&itemDef(inv)?.id===def.id).length}));
    box.innerHTML=usable.map(({def,count})=>`<button class="battle-choice" ${count<1?'disabled':''} onclick="battleUseDatabaseItem('${def.id}')"><strong>${def.icon} ${def.name} <span class="item-count">×${count}</span></strong><span>${def.effectType==='heal_hp'?`恢復 ${def.effectValue} HP`:def.effectType==='heal_energy'?`恢復 ${def.effectValue} 點戰鬥資源`:'使敵人中毒3回合'}</span></button>`).join('');box.style.display='grid';
  };
  window.battleUseDatabaseItem=async function(id){
    if(!battleStateV10||battleStateV10.busy)return;const def=DB.items[id],target=selectedBattleEnemy();if(!def||!target||!consumeBattleConsumableById(id))return;
    battleStateV10.busy=true;setBattleControls(false);hideBattleSubmenu();battleStateV10.round++;const banner=document.getElementById('battleRoundBanner');if(banner)banner.textContent=`ROUND ${battleStateV10.round}`;
    const completed=await runInitiativeRound(async()=>{
      if(def.effectType==='heal_hp')heroHeal(def.effectValue,def.name);
      else if(def.effectType==='heal_energy'){const f=battleStateV10.formal;if(f?.resourceType==='rage')gainFormal('rage',def.effectValue);else if(f?.resourceType==='mp')gainFormal('mp',def.effectValue);else gainFormal('energy',def.effectValue);}
      else if(def.effectType==='poison'){if(Math.random()<statusChance(.75,target,'poison'))addStatus(target,{type:'poison',name:'中毒',turns:def.effectTurns||3,maxHpDot:.03,effectType:'debuff',mods:{}});else addBattleLog(`🧪 ${target.name}抵抗了毒藥！`);}
      addBattleLog(`${def.icon} 使用${def.name}。`);
    });
    if(!completed||battleStateV10.ended)return;battleStateV10.busy=false;setBattleControls(true);renderBattleTargets();updateBattleStatuses();
  };

  window.gmAddShopItem=function(){
    ensureItemSystem();const name=document.getElementById('gmShopName')?.value.trim();if(!name)return alert('請輸入商品名稱');
    const category=document.getElementById('gmShopCategory')?.value||'coupon',item={id:uid(),name,icon:category==='equipment'?'🛡️':category==='consumable'?'🧪':category==='coupon'?'🎟️':'✨',category,description:document.getElementById('gmShopDesc')?.value.trim()||'',price:Number(document.getElementById('gmShopPrice')?.value)||0,dailyLimit:Math.max(1,Number(document.getElementById('gmShopLimit')?.value)||1),active:true,stats:{}};
    if(category==='equipment'){item.equipSlot=document.getElementById('gmEquipSlot')?.value||'weapon';const k=document.getElementById('gmEquipStat')?.value||'attack';let v=Number(document.getElementById('gmEquipValue')?.value)||0;if(['crit','evade','block'].includes(k))v/=100;item.stats[k]=v;}
    if(category==='consumable'){item.subtype='battle';item.battleConsumable=true;item.effectType=document.getElementById('gmEffectType')?.value||'poison';item.effectValue=Number(document.getElementById('gmEffectValue')?.value)||0;item.effectTurns=item.effectType==='poison'?3:0;}
    gameData.shopItems.push(item);saveGame();renderAll();
  };

  migrateInventory();saveGame();if(gameData.hero?.name)renderAll();
})();
