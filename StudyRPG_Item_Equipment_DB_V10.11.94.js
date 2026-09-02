/* StudyRPG V10.11.94 - independent item/equipment database and compatibility layer */
(function(){
  'use strict';
  const DB=window.STUDYRPG_ITEM_EQUIPMENT_DB={version:'10.11.94'};

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
    const count=Math.max(1,Math.min(100,Number(opts.count)||10)),out=[];
    for(let i=0;i<count;i++){
      const item=generateSmartEquipment(opts),inv={id:uid(),itemId:item.id,itemData:item,name:item.name,status:'unused',boughtDate:today(),source:opts.source||'gm_batch',affixes:item.affixes,tier:item.tier,generated:true};
      gameData.inventory.push(inv);out.push(inv);
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
    const made=generateEquipmentBatch({count,rarity,slot:slot||undefined,forceAffix:rarity!=='common'});renderGM();alert(`已生成 ${made.length} 件智慧適配裝備並放入背包。`);
  };

  const oldRenderGM=window.renderGM;
  window.renderGM=function(){
    oldRenderGM();if(sessionStorage.getItem('parentUnlocked')!=='1')return;
    const panel=document.getElementById('panel-gm');if(!panel||document.getElementById('gmEquipmentBatchV101194'))return;
    const card=document.createElement('div');card.id='gmEquipmentBatchV101194';card.className='card';
    card.innerHTML='<h3>🎲 智慧裝備批量生成</h3><div class="small">依目前職業、裸裝能力、週數與同部位裝備挑選較合適的結果；不改怪物公式。橘裝禁止隨機生成。</div><div class="grid3"><div><label>數量</label><input id="gmEqBatchCount" type="number" min="1" max="100" value="10"></div><div><label>稀有度</label><select id="gmEqBatchRarity"><option value="common">⚪ 白色</option><option value="uncommon" selected>🟢 綠色</option><option value="rare">🔵 藍色</option><option value="epic">🟣 紫色</option></select></div><div><label>部位</label><select id="gmEqBatchSlot"><option value="">全部隨機</option><option value="weapon">武器</option><option value="head">頭部</option><option value="body">身體</option><option value="accessory">飾品</option></select></div></div><button class="btn purple" onclick="gmGenerateEquipmentBatchV101194()">批量生成並放入背包</button>';
    panel.appendChild(card);
  };

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
