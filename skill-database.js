/* StudyRPG Skill Database v1
   Extracted from the verified V10.20.4 runtime.
   DATA ONLY: no player save data and no battle runtime functions. */
(function(){
  const BEGINNER_SKILLS=[
    {id:'power_strike',name:'奮力一擊',icon:'💥',cost:20,school:'martial',actionType:'melee',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.60}],description:'ATK×1.60－敵DEF×0.5 的強力近戰攻擊。'},
    {id:'ember',name:'魔力彈',icon:'🔮',cost:18,school:'arcane',actionType:'ranged',effects:[{type:'damage',damageType:'arcane',source:'magicAttack',multiplier:1.45}],description:'MATK×1.45－敵MDEF×0.5 的秘法遠程攻擊。'},
    {id:'defense_stance',name:'防禦姿態',icon:'🛡️',cost:0,energyGain:8,school:'martial',actionType:'self',effects:[{type:'status',category:'buff',duration:1,modifiers:[{target:'damageTaken',operation:'add',value:-.50}]}],description:'本回合承受傷害減半，並回復8能量。'},
    {id:'focus',name:'專注',icon:'🎯',cost:10,school:'martial',actionType:'self',effects:[{type:'status',category:'buff',duration:99,modifiers:[{target:'nextAttackMultiplier',operation:'add',value:.40}]}],description:'下一次造成傷害的攻擊×1.40；命中後消耗。'}
  ];

  const JOB_SKILL_LIBRARY={
    heavy_strike:{id:'heavy_strike',name:'重擊',icon:'💢',cost:35,school:'martial',actionType:'melee',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.65}],description:'戰士高威力一擊。'},
    guard_break:{id:'guard_break',name:'破甲斬',icon:'🪓',cost:30,school:'martial',actionType:'melee',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.25}],description:'傷害並削弱敵方防禦。'},
    battle_cry:{id:'battle_cry',name:'戰吼',icon:'📣',cost:20,school:'martial',actionType:'self',effects:[{type:'status',category:'buff',duration:3,modifiers:[{target:'attack',operation:'add',value:8}]}],description:'攻擊提升3回合。'},
    iron_stance:{id:'iron_stance',name:'鋼鐵架勢',icon:'🛡️',cost:20,school:'martial',actionType:'self',effects:[{type:'status',category:'buff',duration:3,modifiers:[{target:'damageTaken',operation:'add',value:-.25},{target:'block',operation:'add',value:.12}]}],description:'承傷降低、格擋提高。'},
    fireball:{id:'fireball',name:'火球術',icon:'🔥',cost:35,school:'elemental',actionType:'ranged',effects:[{type:'damage',damageType:'fire',source:'magicAttack',multiplier:1.60}],description:'強力火元素法術。'},
    ice_lance:{id:'ice_lance',name:'冰槍術',icon:'❄️',cost:35,school:'elemental',actionType:'ranged',effects:[{type:'damage',damageType:'ice',source:'magicAttack',multiplier:1.55}],description:'冰元素法術。'},
    thunderbolt:{id:'thunderbolt',name:'雷擊術',icon:'⚡',cost:40,school:'elemental',actionType:'ranged',effects:[{type:'damage',damageType:'lightning',source:'magicAttack',multiplier:1.70}],description:'高威力雷元素法術。'},
    mana_guard:{id:'mana_guard',name:'魔力護盾',icon:'🔷',cost:20,school:'arcane',actionType:'self',effects:[{type:'status',category:'buff',duration:3,modifiers:[{target:'damageTaken',operation:'add',value:-.25}]}],description:'承傷降低3回合。'},
    holy_light:{id:'holy_light',name:'聖光',icon:'✨',cost:35,school:'holy',actionType:'ranged',effects:[{type:'damage',damageType:'holy',source:'magicAttack',multiplier:1.25}],description:'神聖傷害。'},
    heal_prayer:{id:'heal_prayer',name:'治癒祈禱',icon:'💚',cost:30,school:'holy',actionType:'self',effects:[{type:'status',category:'buff',duration:3,modifiers:[{target:'damageTaken',operation:'add',value:-.20}]}],description:'提高生存能力。'},
    purify:{id:'purify',name:'淨化',icon:'🕊️',cost:20,school:'holy',actionType:'self',effects:[{type:'status',category:'buff',duration:3,modifiers:[{target:'statusRes',operation:'add',value:.20}]}],description:'提高狀態抗性。'},
    sanctuary:{id:'sanctuary',name:'聖域',icon:'⛪',cost:35,school:'holy',actionType:'self',effects:[{type:'status',category:'buff',duration:2,modifiers:[{target:'damageTaken',operation:'add',value:-.35}]}],description:'大幅降低承傷2回合。'},
    aimed_shot:{id:'aimed_shot',name:'瞄準射擊',icon:'🏹',cost:30,school:'martial',actionType:'ranged',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.45}],description:'精準遠程攻擊。'},
    poison_arrow:{id:'poison_arrow',name:'毒箭',icon:'☠️',cost:30,school:'nature',actionType:'ranged',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.15}],description:'獵人的毒系射擊。'},
    trap:{id:'trap',name:'陷阱',icon:'🪤',cost:25,school:'martial',actionType:'ranged',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.10}],description:'戰術型傷害技能。'},
    eagle_eye:{id:'eagle_eye',name:'鷹眼',icon:'👁️',cost:20,school:'martial',actionType:'self',effects:[{type:'status',category:'buff',duration:3,modifiers:[{target:'crit',operation:'add',value:.12}]}],description:'暴擊與命中思路強化。'},
    backstab:{id:'backstab',name:'背刺',icon:'🗡️',cost:30,school:'shadow',actionType:'melee',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.55}],description:'盜賊爆發傷害。'},
    venom_blade:{id:'venom_blade',name:'毒刃',icon:'☠️',cost:30,school:'nature',actionType:'melee',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.20}],description:'毒系近戰技能。'},
    bleed_cut:{id:'bleed_cut',name:'割裂',icon:'🩸',cost:30,school:'martial',actionType:'melee',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.25}],description:'流血系技能。'},
    smoke_step:{id:'smoke_step',name:'煙霧步',icon:'💨',cost:20,school:'shadow',actionType:'self',effects:[{type:'status',category:'buff',duration:3,modifiers:[{target:'evade',operation:'add',value:.15}]}],description:'閃避率提升。'},
    holy_slash:{id:'holy_slash',name:'聖光斬',icon:'✨',cost:35,school:'holy',actionType:'melee',effects:[{type:'damage',damageType:'holy',source:'magicAttack',multiplier:1.30}],description:'神聖近戰。'},
    guardian_stance:{id:'guardian_stance',name:'守護',icon:'🛡️',cost:20,school:'holy',actionType:'self',effects:[{type:'status',category:'buff',duration:3,modifiers:[{target:'damageTaken',operation:'add',value:-.30},{target:'block',operation:'add',value:.12}]}],description:'承傷降低、格擋提高。'},
    lay_on_hands:{id:'lay_on_hands',name:'聖療',icon:'🙏',cost:30,school:'holy',actionType:'self',effects:[{type:'status',category:'buff',duration:3,modifiers:[{target:'damageTaken',operation:'add',value:-.22}]}],description:'提高生存能力。'},
    judgment:{id:'judgment',name:'審判',icon:'⚖️',cost:40,school:'holy',actionType:'ranged',effects:[{type:'damage',damageType:'holy',source:'magicAttack',multiplier:1.50}],description:'高倍率神聖傷害。'},
    magic_slash:{id:'magic_slash',name:'魔力斬',icon:'🌀',cost:35,school:'arcane',actionType:'melee',effects:[{type:'damage',damageType:'wind',source:'magicAttack',multiplier:1.45}],description:'秘法驅動的風屬性劍技。'},
    flame_edge:{id:'flame_edge',name:'炎刃',icon:'🔥',cost:35,school:'arcane',actionType:'melee',effects:[{type:'damage',damageType:'fire',source:'magicAttack',multiplier:1.45}],description:'秘法驅動的火元素劍技。'},
    frost_edge:{id:'frost_edge',name:'冰刃',icon:'❄️',cost:35,school:'arcane',actionType:'melee',effects:[{type:'damage',damageType:'ice',source:'magicAttack',multiplier:1.45}],description:'秘法驅動的冰元素劍技。'},
    arcane_guard:{id:'arcane_guard',name:'奧術防護',icon:'🔮',cost:20,school:'arcane',actionType:'self',effects:[{type:'status',category:'buff',duration:3,modifiers:[{target:'damageTaken',operation:'add',value:-.20},{target:'crit',operation:'add',value:.08}]}],description:'承傷降低、暴擊提高。'}
  };

  const MONSTER_SKILL_DATABASE={
    /* Week 1 史萊姆 */
    slime_tackle:{id:'slime_tackle',name:'史萊姆撞擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0},
    water_bullet:{id:'water_bullet',name:'水彈',school:'elemental',effects:[{type:'damage',damageType:'water',source:'magicAttack',multiplier:1.0}],kind:'magic',element:'water',target:'single',multiplier:1.0,status:{id:'slow',chance:1,duration:2,speedMultiplier:.70}},
    fire_bullet:{id:'fire_bullet',name:'火焰彈',school:'elemental',effects:[{type:'damage',damageType:'fire',source:'magicAttack',multiplier:1.0}],kind:'magic',element:'fire',target:'single',multiplier:1.0,status:{id:'burn',chance:1,duration:3,maxHpDot:.05}},
    nature_heal:{id:'nature_heal',name:'自然治癒',school:'nature',effects:[{type:'recovery',recoveryType:'regeneration'}],kind:'heal',element:'nature',target:'self',healMaxHp:.20},
    thunder_bullet:{id:'thunder_bullet',name:'雷電彈',school:'elemental',effects:[{type:'damage',damageType:'lightning',source:'magicAttack',multiplier:1.0}],kind:'magic',element:'lightning',target:'single',multiplier:1.0,status:{id:'paralysis',chance:.30,duration:1}},
  
    /* Week 2 哥布林 */
    goblin_club:{id:'goblin_club',name:'木棒敲擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0},
    goblin_slash:{id:'goblin_slash',name:'短劍斬擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0},
    goblin_guard:{id:'goblin_guard',name:'舉盾防禦',school:'martial',effects:[{type:'status',category:'buff'}],kind:'buff',target:'self',damageTakenMultiplier:.50,duration:1},
    goblin_magic_bolt:{id:'goblin_magic_bolt',name:'魔力彈',school:'arcane',effects:[{type:'damage',damageType:'arcane',source:'magicAttack',multiplier:1.0}],kind:'magic',target:'single',multiplier:1.0},
    goblin_poison_curse:{id:'goblin_poison_curse',name:'毒咒',school:'arcane',effects:[{type:'damage',damageType:'arcane',source:'magicAttack',multiplier:.35}],kind:'magic',target:'single',multiplier:.35,status:{id:'poison',chance:1,duration:3,maxHpDot:.03}},
    goblin_heal:{id:'goblin_heal',name:'治療術',school:'martial',effects:[{type:'recovery',recoveryType:'heal'}],kind:'heal',target:'ally_lowest_hp',healMaxHp:.15,conditionHpBelow:.40,maxUsesPerBattle:1},
    goblin_heavy_slash:{id:'goblin_heavy_slash',name:'重斬',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.4}],kind:'physical',target:'single',multiplier:1.4},
    goblin_warcry:{id:'goblin_warcry',name:'戰吼',school:'martial',effects:[{type:'status',category:'buff'}],kind:'buff',target:'self',atkMultiplier:1.20,duration:3,maxUsesPerBattle:1},
    goblin_summon:{id:'goblin_summon',name:'召喚哥布林',school:'martial',kind:'summon',target:'none',mpCost:40},
  
    /* Week 3 森林 */
    spider_poison_fang:{id:'spider_poison_fang',name:'毒牙',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0,status:{id:'poison',chance:1,duration:3,maxHpDot:.03}},
    spider_web:{id:'spider_web',name:'蛛網',school:'martial',effects:[{type:'status',category:'debuff'}],kind:'debuff',target:'single',status:{id:'slow',chance:1,duration:2,speedMultiplier:.60}},
    wolf_bite:{id:'wolf_bite',name:'撕咬',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0,status:{id:'bleed',chance:1,duration:3,maxHpDot:.04}},
    bear_slam:{id:'bear_slam',name:'熊掌猛擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.4}],kind:'physical',target:'single',multiplier:1.4},
    bear_claw:{id:'bear_claw',name:'撕裂爪擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.1}],kind:'physical',target:'single',multiplier:1.1},
    vine_whip:{id:'vine_whip',name:'藤蔓鞭打',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0},
    vine_bind:{id:'vine_bind',name:'藤蔓綑綁',school:'martial',effects:[{type:'status',category:'debuff'}],kind:'debuff',target:'single',status:{id:'bind',chance:1,duration:2,speedMultiplier:.50,evasionMultiplier:0}},
    shadow_arrow:{id:'shadow_arrow',name:'暗影箭',school:'shadow',effects:[{type:'damage',damageType:'shadow',source:'magicAttack',multiplier:1.0}],kind:'magic',element:'dark',target:'single',multiplier:1.0,status:{id:'weak',chance:1,duration:2,atkMultiplier:.80,matkMultiplier:.80}},
    double_shot:{id:'double_shot',name:'二連射',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1}],kind:'physical',target:'single',hits:2,multiplierPerHit:.55},
    shadow_step:{id:'shadow_step',name:'暗影步',school:'martial',effects:[{type:'status',category:'buff'}],kind:'buff',target:'self',evasionBonus:.20,duration:2,maxUsesPerBattle:1},
  
    /* Week 4 獸人 */
    orc_swing:{id:'orc_swing',name:'粗暴揮擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0},
    orc_charge:{id:'orc_charge',name:'蓄力',school:'martial',kind:'charge',target:'self',nextSkill:'orc_charged_smash'},
    orc_charged_smash:{id:'orc_charged_smash',name:'蓄力重擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.8}],kind:'physical',target:'single',multiplier:1.8,requiresCharge:true},
    chain_lightning:{id:'chain_lightning',name:'連鎖閃電',school:'elemental',effects:[{type:'damage',damageType:'lightning',source:'magicAttack',multiplier:1}],kind:'magic',element:'lightning',target:'single',hitsMin:2,hitsMax:3,multiplierPerHit:.45},
    staff_hit:{id:'staff_hit',name:'法杖敲擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:.8}],kind:'physical',target:'single',multiplier:.8},
    sword_slash:{id:'sword_slash',name:'劍刃斬擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0},
    whirlwind:{id:'whirlwind',name:'旋風斬',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1}],kind:'physical',target:'all',hits:3,multiplierPerHit:.45},
    general_axe:{id:'general_axe',name:'巨斧斬擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0},
    general_order:{id:'general_order',name:'下令進攻',school:'martial',kind:'support_attack',target:'single',multiplier:.70,maxUsesPerBattle:2,noPersistentSummon:true},
  
    /* Week 5 邪惡巫師塔 */
    skeleton_slash:{id:'skeleton_slash',name:'普通攻擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0},
    throw_bone:{id:'throw_bone',name:'丟骨頭',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.3}],kind:'physical',target:'single',multiplier:1.3,selfDestruct:true,conditionHpBelow:.30},
    zombie_bite:{id:'zombie_bite',name:'腐爛撕咬',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0},
    hook_smash:{id:'hook_smash',name:'肉鉤重擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.2}],kind:'physical',target:'single',multiplier:1.2},
    frenzy_smash:{id:'frenzy_smash',name:'瘋狂猛擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.6}],kind:'physical',target:'single',multiplier:1.6,selfMaxHpDamage:.08},
    evil_eye_beam:{id:'evil_eye_beam',name:'魔眼光束',school:'arcane',effects:[{type:'damage',damageType:'arcane',source:'magicAttack',multiplier:1.0}],kind:'magic',target:'single',multiplier:1.0},
    evil_gaze:{id:'evil_gaze',name:'凝視',school:'martial',effects:[{type:'status',category:'debuff'}],kind:'debuff',target:'single',status:{id:'blind',chance:1,duration:2,accuracyPenalty:.20}},
    necro_shadow_bolt:{id:'necro_shadow_bolt',name:'暗影魔彈',school:'shadow',effects:[{type:'damage',damageType:'shadow',source:'magicAttack',multiplier:.85}],kind:'magic',element:'dark',target:'single',multiplier:.85},
    summon_three_skeletons:{id:'summon_three_skeletons',name:'召喚骷髏',school:'martial',kind:'summon',target:'none',count:2,maxUsesPerBattle:1},
  
    /* Week 6 沙漠 */
    mummy_claw:{id:'mummy_claw',name:'木乃伊爪擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0},
    decaying_breath:{id:'decaying_breath',name:'腐朽氣息',school:'martial',effects:[{type:'status',category:'debuff'}],kind:'debuff',target:'single',status:{id:'curse',chance:1,duration:3,defMultiplier:.80,mdefMultiplier:.80}},
    beetle_charge:{id:'beetle_charge',name:'衝撞',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.1}],kind:'physical',target:'single',multiplier:1.1},
    shell_guard:{id:'shell_guard',name:'甲殼防禦',school:'martial',effects:[{type:'status',category:'buff'}],kind:'buff',target:'self',damageTakenMultiplier:.55,duration:1},
    scorpion_claw:{id:'scorpion_claw',name:'巨鉗攻擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0},
    venom_sting:{id:'venom_sting',name:'毒尾刺',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.1}],kind:'physical',target:'single',multiplier:1.1,status:{id:'poison',chance:1,duration:3,maxHpDot:.05}},
    spear_thrust:{id:'spear_thrust',name:'長矛突刺',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.1}],kind:'physical',target:'single',multiplier:1.1},
    tail_escape:{id:'tail_escape',name:'斷尾求生',school:'martial',kind:'trigger',target:'self',conditionHpBelow:.30,healMaxHp:.15,speedMultiplier:1.20,maxUsesPerBattle:1},
    lion_bite:{id:'lion_bite',name:'獅首猛咬',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.2}],kind:'physical',target:'single',multiplier:1.2},
    goat_flame:{id:'goat_flame',name:'羊首火焰',school:'elemental',effects:[{type:'damage',damageType:'fire',source:'magicAttack',multiplier:1.1}],kind:'magic',element:'fire',target:'single',multiplier:1.1},
    snake_venom:{id:'snake_venom',name:'蛇尾毒刺',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:.9}],kind:'physical',target:'single',multiplier:.9,status:{id:'poison',chance:1,duration:3,maxHpDot:.05}},
  
    /* Week 7 金字塔 */
    lizard_fire_magic:{id:'lizard_fire_magic',name:'火焰魔法',school:'elemental',effects:[{type:'damage',damageType:'fire',source:'magicAttack',multiplier:1.1}],kind:'magic',element:'fire',target:'single',multiplier:1.1},
    sand_spell:{id:'sand_spell',name:'沙塵術',school:'martial',effects:[{type:'status',category:'debuff'}],kind:'debuff',target:'single',status:{id:'blind',chance:1,duration:2,accuracyPenalty:.20}},
    pharaoh_staff:{id:'pharaoh_staff',name:'權杖攻擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0},
    golden_shield:{id:'golden_shield',name:'黃金護盾',school:'martial',kind:'shield',target:'self',maxUsesPerBattle:1},
    death_scythe:{id:'death_scythe',name:'死神鐮斬',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.25}],kind:'physical',target:'single',multiplier:1.25},
    soul_judgment:{id:'soul_judgment',name:'靈魂審判',school:'shadow',effects:[{type:'damage',damageType:'shadow',source:'magicAttack',multiplier:1.15}],kind:'magic',element:'dark',target:'single',multiplier:1.15},
    solar_flame:{id:'solar_flame',name:'太陽火焰',school:'elemental',effects:[{type:'damage',damageType:'fire',source:'magicAttack',multiplier:1.1}],kind:'magic',element:'fire',target:'single',multiplier:1.1},
    solar_charge:{id:'solar_charge',name:'聚集太陽能量',school:'martial',kind:'charge',target:'self',nextSkill:'wrath_of_ra'},
    wrath_of_ra:{id:'wrath_of_ra',name:'太陽神之怒',school:'elemental',effects:[{type:'damage',damageType:'fire',source:'magicAttack',multiplier:1.8}],kind:'magic',element:'fire',target:'single',multiplier:1.8,requiresCharge:true},
  
    /* Week 8 魔王城郊區 */
    rogue_stab:{id:'rogue_stab',name:'短刀攻擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0},
    rogue_stun:{id:'rogue_stun',name:'柄擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:.8}],kind:'physical',target:'single',multiplier:.8,status:{id:'stun',chance:.30,duration:1},cannotUseConsecutively:true},
    cult_curse:{id:'cult_curse',name:'詛咒',school:'martial',effects:[{type:'status',category:'debuff'}],kind:'debuff',target:'single',status:{id:'curse',chance:1,duration:3,defMultiplier:.80,mdefMultiplier:.80}},
    life_drain:{id:'life_drain',name:'生命吸取',school:'shadow',effects:[{type:'damage',damageType:'shadow',source:'magicAttack',multiplier:1.0}],kind:'magic',element:'dark',target:'single',multiplier:1.0,healFromDamage:.50},
    ogre_swing:{id:'ogre_swing',name:'巨棒揮擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.2}],kind:'physical',target:'single',multiplier:1.2},
    frost_arrow:{id:'frost_arrow',name:'冰霜箭',school:'elemental',effects:[{type:'damage',damageType:'ice',source:'magicAttack',multiplier:1.0}],kind:'magic',element:'ice',target:'single',multiplier:1.0,status:{id:'slow',chance:1,duration:2,speedMultiplier:.80}},
    blizzard:{id:'blizzard',name:'暴風雪',school:'elemental',effects:[{type:'damage',damageType:'ice',source:'magicAttack',multiplier:1.3}],kind:'magic',element:'ice',target:'single',multiplier:1.3,cooldown:2},
  
    /* Week 9 天啟四騎士 */
    apocalypse_slash:{id:'apocalypse_slash',name:'重劍斬擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.1}],kind:'physical',target:'single',multiplier:1.1},
    war_rage:{id:'war_rage',name:'戰爭狂暴',school:'martial',effects:[{type:'status',category:'buff'}],kind:'buff',target:'self',atkMultiplier:1.30,duration:3,maxUsesPerBattle:1},
    plague_slash:{id:'plague_slash',name:'腐疫斬擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.1}],kind:'physical',target:'single',multiplier:1.1},
    famine_strike:{id:'famine_strike',name:'虛弱打擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0,resourceDamageMaxPct:.05},
    death_slash:{id:'death_slash',name:'死亡斬擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.1}],kind:'physical',target:'single',multiplier:1.1},
    demon_general_slash:{id:'demon_general_slash',name:'魔將斬擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.1}],kind:'physical',target:'single',multiplier:1.1},
  
    /* Week 10 魔王城內部 */
    gargoyle_claw:{id:'gargoyle_claw',name:'石爪攻擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0},
    petrify_guard:{id:'petrify_guard',name:'石化防禦',school:'martial',effects:[{type:'status',category:'buff'}],kind:'buff',target:'self',damageTakenMultiplier:.40,duration:1},
    blood_blade:{id:'blood_blade',name:'血刃斬擊',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.1}],kind:'physical',target:'single',multiplier:1.1},
    vampire_slash:{id:'vampire_slash',name:'吸血斬',school:'martial',effects:[{type:'damage',damageType:'physical',source:'attack',multiplier:1.0}],kind:'physical',target:'single',multiplier:1.0,healFromDamage:.50},
    demon_dark_bolt:{id:'demon_dark_bolt',name:'暗影魔彈',school:'shadow',effects:[{type:'damage',damageType:'shadow',source:'magicAttack',multiplier:1.0}],kind:'magic',element:'dark',target:'single',multiplier:1.0},
    dark_burst:{id:'dark_burst',name:'黑暗爆發',school:'shadow',effects:[{type:'damage',damageType:'shadow',source:'magicAttack',multiplier:1.35}],kind:'magic',element:'dark',target:'single',multiplier:1.35,cooldown:2},
    mana_shield:{id:'mana_shield',name:'魔力護盾',school:'martial',kind:'shield',target:'self'}
  };

  const MONSTER_AI_DATABASE={
    slime_water:{skills:[{id:'slime_tackle',weight:1},{id:'water_bullet',weight:1}]},
    slime_fire:{skills:[{id:'slime_tackle',weight:1},{id:'fire_bullet',weight:1}]},
    slime_grass:{skills:[{id:'slime_tackle',weight:2},{id:'nature_heal',weight:3,condition:'low_hp',threshold:.55}]},
    slime_lightning:{skills:[{id:'slime_tackle',weight:1},{id:'thunder_bullet',weight:1}]},
    slime_king:{skills:[{id:'slime_tackle',weight:1},{id:'water_bullet',weight:1},{id:'fire_bullet',weight:1},{id:'thunder_bullet',weight:1},{id:'nature_heal',weight:4,condition:'low_hp',threshold:.40}]},
  
    goblin_slave:{skills:[{id:'goblin_club',weight:1}]},
    goblin_soldier:{skills:[{id:'goblin_slash',weight:3},{id:'goblin_guard',weight:1}]},
    goblin_shaman:{skills:[{id:'goblin_magic_bolt',weight:2},{id:'goblin_poison_curse',weight:2},{id:'goblin_heal',weight:4,condition:'low_hp',threshold:.40}],healMaxUses:1},
    goblin_general:{skills:[{id:'goblin_warcry',weight:5,maxUses:1},{id:'goblin_heavy_slash',weight:2},{id:'goblin_slash',weight:2}]},
    goblin_king:{skills:[{id:'goblin_summon',weight:1,maxUses:2}],mp:100,maxMp:100,mpRegen:0,noAttack:true},
  
    forest_spider:{skills:[{id:'spider_poison_fang',weight:1},{id:'spider_web',weight:1}]},
    forest_wolf:{skills:[{id:'wolf_bite',weight:1}]},
    forest_bear:{skills:[{id:'bear_slam',weight:1},{id:'bear_claw',weight:1}],statProfile:{hp:'high',atk:'high',speed:'low'}},
    treant:{skills:[{id:'vine_whip',weight:2},{id:'vine_bind',weight:1}]},
    dark_elf:{skills:[{id:'shadow_arrow',weight:2},{id:'double_shot',weight:2},{id:'shadow_step',weight:1,maxUses:1}]},
  
    orc_slave:{skills:[{id:'orc_swing',weight:1}]},
    orc_warrior:{skills:[{id:'orc_swing',weight:2},{id:'orc_charge',weight:1}],chargeSequence:['orc_charge','orc_charged_smash']},
    orc_shaman:{skills:[{id:'staff_hit',weight:2},{id:'chain_lightning',weight:3}]},
    orc_champion:{skills:[{id:'sword_slash',weight:2},{id:'whirlwind',weight:1}]},
    orc_general:{skills:[{id:'goblin_warcry',weight:1,maxUses:1},{id:'general_axe',weight:2},{id:'general_order',weight:1,maxUses:2},{id:'orc_charge',weight:1}],chargeSequence:['orc_charge','orc_charged_smash']},
  
    skeleton:{skills:[{id:'skeleton_slash',weight:3},{id:'throw_bone',weight:5,condition:'low_hp',threshold:.30}]},
    zombie:{skills:[{id:'zombie_bite',weight:1}],passive:{id:'zombie_revive',maxUses:1,reviveHpPct:.30}},
    abomination:{skills:[{id:'hook_smash',weight:2},{id:'frenzy_smash',weight:1}],statProfile:{hp:'very_high',speed:'very_low'}},
    eyeball_monster:{skills:[{id:'evil_eye_beam',weight:2},{id:'evil_gaze',weight:1}]},
    necromancer:{skills:[{id:'necro_shadow_bolt',weight:1}],ritualTriggerHpPct:.70},
  
    lizard_mummy:{skills:[{id:'mummy_claw',weight:2},{id:'decaying_breath',weight:1}]},
    giant_beetle:{skills:[{id:'beetle_charge',weight:3},{id:'shell_guard',weight:1}],statProfile:{def:'high'}},
    giant_scorpion:{skills:[{id:'scorpion_claw',weight:2},{id:'venom_sting',weight:1}]},
    lizard_warrior:{skills:[{id:'spear_thrust',weight:1}],triggerSkills:['tail_escape']},
    chimera:{rotation:['lion_bite','goat_flame','snake_venom'],singleActionPerTurn:true},
  
    lizard_mage:{skills:[{id:'lizard_fire_magic',weight:2},{id:'sand_spell',weight:1}]},
    lizard_pharaoh:{skills:[{id:'pharaoh_staff',weight:3},{id:'golden_shield',weight:1,maxUses:1}]},
    lizard_anubis:{skills:[{id:'death_scythe',weight:1},{id:'soul_judgment',weight:1}]},
    lizard_ra:{skills:[{id:'solar_flame',weight:3},{id:'solar_charge',weight:1}],chargeSequence:['solar_charge','wrath_of_ra']},
  
    human_bandit_rogue:{skills:[{id:'rogue_stab',weight:3},{id:'rogue_stun',weight:1}],alwaysActsFirstOnBattleStart:true},
    cult_mage:{skills:[{id:'cult_curse',weight:1},{id:'life_drain',weight:3}],doNotReapplyActiveCurse:true},
    ogre:{skills:[{id:'ogre_swing',weight:1}],passive:{id:'troll_regeneration',healMaxHpPerTurn:.05},statProfile:{hp:'very_high',speed:'very_low'}},
    two_headed_ogre_mage:{skills:[{id:'frost_arrow',weight:3},{id:'blizzard',weight:1}],passive:{id:'troll_regeneration',healMaxHpPerTurn:.05},statProfile:{hp:'very_high',speed:'very_low'}},
  
    apocalypse_war:{skills:[{id:'apocalypse_slash',weight:3},{id:'war_rage',weight:3,condition:'low_hp',threshold:.60,maxUses:1}]},
    apocalypse_plague:{skills:[{id:'plague_slash',weight:1}],battleStartMechanic:'plague_field'},
    apocalypse_famine:{skills:[{id:'famine_strike',weight:1}]},
    apocalypse_death:{skills:[{id:'death_slash',weight:1}],battleStartMechanic:'death_mark'},
    demon_general:{skills:[{id:'demon_general_slash',weight:1}],battleStartMechanic:'roll_two_apocalypse_powers'},
  
    gargoyle:{skills:[{id:'gargoyle_claw',weight:3},{id:'petrify_guard',weight:1}]},
    vampire_swordsman:{skills:[{id:'blood_blade',weight:2},{id:'vampire_slash',weight:1}]},
    hero_mirror:{copyHero:true,statScale:.85,copyEquippedSkills:true,copyJob:true,copyAppearance:true,horizontalFlip:true},
    demon_king_phase1:{skills:[{id:'demon_dark_bolt',weight:3},{id:'dark_burst',weight:1},{id:'mana_shield',weight:1}]},
    demon_king_phase2:{phase2ReadsPhase1Damage:true,startsAtFullHp:true,inheritPhase1Hp:false}
  };

  const JOB_PASSIVES={
    warrior_grit:'堅韌：戰士的物理生存能力常駐提升。',
    mana_echo:'魔力共鳴：法術循環更有效率。',
    blessing:'祝福：提高神聖與狀態抗性相關表現。',
    hunter_instinct:'獵殺本能：擅長針對弱點與DOT。',
    shadow_step:'暗影步：提高閃避與爆發特性。',
    holy_guard:'聖護：神聖防禦能力常駐。',
    spellblade:'魔力武裝：物理與元素攻擊協同。'
  };

  const ULTIMATE_SKILLS={
    limit_break:'極限突破',meteor:'隕石術',miracle:'奇蹟',
    arrow_storm:'箭雨',assassinate:'暗殺',divine_verdict:'神聖裁決',elemental_break:'元素破斬'
  };

  window.STUDYRPG_SKILL_DATABASE_V2={
    schemaVersion:1,
    databaseVersion:'skill-db-v1-extracted',
    beginner:BEGINNER_SKILLS,
    jobs:JOB_SKILL_LIBRARY,
    monsterSkills:MONSTER_SKILL_DATABASE,
    monsterAI:MONSTER_AI_DATABASE,
    jobPassives:JOB_PASSIVES,
    ultimates:ULTIMATE_SKILLS
  };
})();
