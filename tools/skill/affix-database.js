/* StudyRPG Affix Database v1
   Extracted from the verified V10.20.4 runtime.
   DATA ONLY: no inventory/equipment instances and no player save data. */
(function(){
  const AFFIXES={
      assault:{id:'assault',name:'猛攻',slots:['weapon','accessory'],kind:'stat',stat:'attack',min:3,max:6,powerPerUnit:1},
      arcane:{id:'arcane',name:'祕法',slots:['weapon','head','accessory'],kind:'stat',stat:'magicAttack',min:3,max:6,powerPerUnit:1},
      ironwall:{id:'ironwall',name:'鐵壁',slots:['head','body'],kind:'stat',stat:'defense',min:3,max:6,powerPerUnit:.8},
      warding:{id:'warding',name:'護法',slots:['head','body','accessory'],kind:'stat',stat:'magicDefense',min:3,max:6,powerPerUnit:.8},
      vitality:{id:'vitality',name:'生命',slots:['head','body','accessory'],kind:'stat',stat:'maxHp',min:15,max:30,powerPerUnit:.10},
      swiftness:{id:'swiftness',name:'迅捷',slots:['weapon','head','accessory'],kind:'stat',stat:'speed',min:2,max:5,powerPerUnit:1},
      precision:{id:'precision',name:'精準',slots:['weapon','accessory'],kind:'stat',stat:'crit',min:.02,max:.04,step:.01,powerPerUnit:100},
      shadowstep:{id:'shadowstep',name:'幻步',slots:['head','body','accessory'],kind:'stat',stat:'evade',min:.02,max:.04,step:.01,powerPerUnit:110},
      bastion:{id:'bastion',name:'壁壘',slots:['head','body'],kind:'stat',stat:'block',min:.02,max:.04,step:.01,powerPerUnit:100},
      ember_echo:{id:'ember_echo',name:'餘燼回響',slots:['weapon','accessory'],kind:'trigger',trigger:'after_attack',effect:'echo_fire',chance:.10,multiplier:.60,power:4.5,text:'攻擊命中時10%機率追加60%火焰傷害'},
      phantom_echo:{id:'phantom_echo',name:'幻影追擊',slots:['weapon','accessory'],kind:'trigger',trigger:'after_attack',effect:'echo_physical',chance:.08,multiplier:.70,power:4.5,text:'攻擊命中時8%機率追加70%物理傷害'},
      blood_drink:{id:'blood_drink',name:'飲血',slots:['weapon','accessory'],kind:'trigger',trigger:'after_attack',effect:'lifesteal',ratio:.18,power:4,text:'每次行動造成傷害後，恢復該傷害18%的HP'},
      royal_guard:{id:'royal_guard',name:'王者庇護',slots:['head','body','accessory'],kind:'trigger',trigger:'battle_start',effect:'opening_guard',power:4,text:'開戰前3回合受到傷害降低15%'},
      phoenix_oath:{id:'phoenix_oath',name:'不死鳥誓約',slots:['body','accessory'],kind:'trigger',trigger:'lethal',effect:'death_prevent',power:7,text:'每場首次受到致命傷害時，以1HP存活'},
      flame_spirit:{id:'flame_spirit',name:'火靈契約',slots:['weapon','head','accessory'],kind:'summon',trigger:'battle_start',effect:'summon_flame',power:7,text:'開戰召喚火靈；每次勇者攻擊後追加35%魔攻火焰傷害'},
      blade_spirit:{id:'blade_spirit',name:'劍魂契約',slots:['weapon','body','accessory'],kind:'summon',trigger:'battle_start',effect:'summon_blade',power:7,text:'開戰召喚劍魂；每次勇者攻擊後追加35%物攻傷害'}
    };
  window.STUDYRPG_AFFIX_DATABASE={
    schemaVersion:1,
    databaseVersion:'affix-db-v1-extracted',
    affixes:AFFIXES
  };
})();
