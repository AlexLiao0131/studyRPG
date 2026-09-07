/* StudyRPG Visual Database v1
   Tool only edits this data. Runtime owns rendering. Game/save logic must never write here. */
window.STUDYRPG_VISUAL_DATABASE={
  "schemaVersion": 1,
  "deviceRules": {
    "mobileMax": 600,
    "tabletMax": 1024
  },
  "groundByWeek": {
    "1": {
      "desktop": {
        "dungeon": 85
      },
      "mobile": {
        "dungeon": 84,
        "status": 88.5,
        "dungeonEntry": 95
      },
      "tablet": {
        "status": 87.5,
        "dungeonEntry": 86.5,
        "dungeon": 85
      }
    },
    "2": {
      "tablet": {
        "dungeonEntry": 94,
        "dungeon": 80.5,
        "status": 81
      },
      "mobile": {
        "dungeonEntry": 95,
        "dungeon": 79.5,
        "status": 82.5
      }
    }
  },
  "devices": {
    "desktop": {
      "status": {
        "groundY": 66,
        "hero": {
          "x": 46.6,
          "groundScene": "status",
          "footOffsetY": 0.1
        },
        "heroSize": 160
      },
      "dungeonEntry": {
        "groundY": 63,
        "hero": {
          "x": 50,
          "groundScene": "dungeonEntry",
          "footOffsetY": 0
        },
        "enemy": {
          "x": 50,
          "groundScene": "dungeonEntry",
          "footOffsetY": 0
        },
        "heroSize": 180,
        "enemySize": 180
      },
      "battle": {
        "groundY": 68,
        "hero": {
          "x": 18,
          "groundScene": "battle",
          "footOffsetY": 0
        },
        "enemy": {
          "x": 82,
          "groundScene": "battle",
          "footOffsetY": 0
        },
        "heroSize": 190,
        "enemySize": 190,
        "attackMid": {
          "x": 42,
          "y": 60
        },
        "attackStrike": {
          "x": 68,
          "y": 66
        },
        "duration": 560
      }
    },
    "tablet": {
      "status": {
        "groundY": 87.5,
        "hero": {
          "x": 50,
          "groundScene": "status",
          "footOffsetY": -21.5
        },
        "heroSize": 150
      },
      "dungeonEntry": {
        "groundY": 86.5,
        "hero": {
          "x": 54,
          "groundScene": "dungeonEntry",
          "footOffsetY": -18.7
        },
        "enemy": {
          "x": 28.2,
          "groundScene": "dungeonEntry",
          "footOffsetY": -16.0
        },
        "heroSize": 165,
        "enemySize": 165
      },
      "battle": {
        "groundY": 68,
        "hero": {
          "x": 17,
          "groundScene": "battle",
          "footOffsetY": 0
        },
        "enemy": {
          "x": 83,
          "groundScene": "battle",
          "footOffsetY": 0
        },
        "heroSize": 175,
        "enemySize": 175,
        "attackMid": {
          "x": 42,
          "y": 60
        },
        "attackStrike": {
          "x": 67,
          "y": 66
        },
        "duration": 560
      }
    },
    "mobile": {
      "status": {
        "groundY": 88.5,
        "hero": {
          "x": 50,
          "groundScene": "status",
          "footOffsetY": -26.5
        },
        "heroSize": 135
      },
      "dungeonEntry": {
        "groundY": 95,
        "hero": {
          "x": 47.5,
          "groundScene": "dungeonEntry",
          "footOffsetY": -25
        },
        "enemy": {
          "x": 40.5,
          "groundScene": "dungeonEntry",
          "footOffsetY": -25
        },
        "heroSize": 135,
        "enemySize": 135
      },
      "battle": {
        "groundY": 65,
        "hero": {
          "x": 18,
          "groundScene": "battle",
          "footOffsetY": 0
        },
        "enemy": {
          "x": 70.5,
          "groundScene": "battle",
          "footOffsetY": 0.7
        },
        "heroSize": 145,
        "enemySize": 145,
        "attackMid": {
          "x": 42,
          "y": 57
        },
        "attackStrike": {
          "x": 65,
          "y": 63
        },
        "duration": 520
      }
    }
  },
  "referencePoints": {
    "desktop": {
      "hero_home": {
        "x": 18,
        "y": 68
      },
      "enemy_home": {
        "x": 82,
        "y": 68
      },
      "enemy_front": {
        "x": 68,
        "y": 66
      },
      "air_high": {
        "x": 48,
        "y": 28
      },
      "summon_left": {
        "x": 62,
        "y": 69
      },
      "summon_center": {
        "x": 72,
        "y": 69
      },
      "summon_right": {
        "x": 82,
        "y": 69
      }
    },
    "tablet": {
      "hero_home": {
        "x": 17,
        "y": 68
      },
      "enemy_home": {
        "x": 83,
        "y": 68
      },
      "enemy_front": {
        "x": 67,
        "y": 66
      },
      "air_high": {
        "x": 48,
        "y": 27
      },
      "summon_left": {
        "x": 60,
        "y": 69
      },
      "summon_center": {
        "x": 72,
        "y": 69
      },
      "summon_right": {
        "x": 84,
        "y": 69
      }
    },
    "mobile": {
      "hero_home": {
        "x": 18,
        "y": 65
      },
      "enemy_home": {
        "x": 82,
        "y": 65
      },
      "enemy_front": {
        "x": 66,
        "y": 63
      },
      "air_high": {
        "x": 48,
        "y": 25
      },
      "summon_left": {
        "x": 54,
        "y": 67
      },
      "summon_center": {
        "x": 70,
        "y": 67
      },
      "summon_right": {
        "x": 86,
        "y": 67
      }
    }
  },
  "stage": {
    "desktop": {
      "bg": {
        "x": 50,
        "y": 50,
        "scale": 1,
        "locked": true
      }
    },
    "tablet": {
      "bg": {
        "x": 50,
        "y": 50,
        "scale": 1,
        "locked": true
      }
    },
    "mobile": {
      "bg": {
        "x": 50,
        "y": 50,
        "scale": 1,
        "locked": true
      }
    }
  },
  "monsters": {
    "slime_water": {
      "idleSize": {},
      "battleSize": {}
    },
    "goblin_slave": {
      "idleSize": {
        "tablet": 310,
        "mobile": 265
      },
      "battleSize": {
        "tablet": 275,
        "mobile": 235
      }
    },
    "goblin_soldier": {
      "idleSize": {
        "tablet": 335,
        "mobile": 325
      },
      "battleSize": {
        "tablet": 330,
        "mobile": 270
      }
    },
    "goblin_shaman": {
      "idleSize": {
        "tablet": 325,
        "mobile": 260
      },
      "battleSize": {
        "tablet": 340,
        "mobile": 270
      }
    },
    "goblin_general": {
      "idleSize": {
        "tablet": 360,
        "mobile": 270
      },
      "battleSize": {
        "tablet": 365,
        "mobile": 270
      }
    },
    "goblin_king": {
      "idleSize": {
        "tablet": 485,
        "mobile": 350
      },
      "battleSize": {
        "tablet": 470,
        "mobile": 415
      }
    }
  },
  "heroes": {
    "novice": {
      "motionActions": {},
      "effectAnchor": {
        "width": 100,
        "height": 100,
        "y": 0
      }
    }
  },
  "playerSkills": {
    "power_strike": {
      "enabled": false,
      "actorAction": "melee",
      "selfFX": [],
      "pathFX": null,
      "targetFX": [],
      "summons": []
    }
  },
  "monsterSkills": {},
  "equipmentAffixes": {
    "assault": {
      "enabled": false,
      "buffIcon": "💎",
      "image": "",
      "scale": 1,
      "offsetX": 0,
      "offsetY": 0
    }
  }
};
