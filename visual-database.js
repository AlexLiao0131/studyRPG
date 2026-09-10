/* StudyRPG Visual Database v1 */
window.STUDYRPG_VISUAL_DATABASE={
  "schemaVersion": 2,
  "deviceRules": {
    "mobileMax": 600,
    "tabletMax": 1024
  },
  "groundByWeek": {
    "1": {
      "desktop": {
        "dungeon": 85,
        "status": 84
      },
      "mobile": {
        "dungeon": 84,
        "status": 88.5,
        "dungeonEntry": 95
      },
      "tablet": {
        "status": 85,
        "dungeonEntry": 75,
        "dungeon": 85
      }
    },
    "2": {
      "tablet": {
        "dungeonEntry": 88.5,
        "dungeon": 84,
        "status": 79.5
      },
      "mobile": {
        "dungeonEntry": 95,
        "dungeon": 79.5,
        "status": 82.5
      },
      "desktop": {
        "status": 79,
        "dungeonEntry": 81
      }
    },
    "3": {
      "desktop": {
        "dungeon": 93.5,
        "status": 93.5
      },
      "tablet": {
        "status": 95,
        "dungeon": 95
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
          "footOffsetY": -1.9
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
          "x": 49,
          "groundScene": "status",
          "footOffsetY": -5.2
        },
        "heroSize": 150
      },
      "dungeonEntry": {
        "groundY": 86.5,
        "hero": {
          "x": 48.4,
          "groundScene": "dungeonEntry",
          "footOffsetY": -1
        },
        "enemy": {
          "x": 40.7,
          "groundScene": "dungeonEntry",
          "footOffsetY": -2.4
        },
        "heroSize": 165,
        "enemySize": 165
      },
      "battle": {
        "groundY": 68,
        "hero": {
          "x": 17,
          "groundScene": "battle",
          "footOffsetY": -3.5
        },
        "enemy": {
          "x": 71.4,
          "groundScene": "battle",
          "footOffsetY": -5
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
          "x": 49,
          "groundScene": "status",
          "footOffsetY": -3.3
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
          "x": 26.8,
          "groundScene": "dungeonEntry",
          "footOffsetY": -32.6
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
      "idleSize": {
        "tablet": 325
      },
      "battleSize": {
        "mobile": 250,
        "tablet": 320
      }
    },
    "goblin_slave": {
      "idleSize": {
        "tablet": 310,
        "mobile": 265,
        "desktop": 250
      },
      "battleSize": {
        "tablet": 290,
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
        "tablet": 500,
        "mobile": 415
      }
    },
    "slime_fire": {
      "idleSize": {
        "tablet": 320
      },
      "battleSize": {
        "mobile": 250,
        "tablet": 325
      }
    },
    "slime_grass": {
      "idleSize": {
        "tablet": 325
      },
      "battleSize": {
        "mobile": 255,
        "tablet": 325
      }
    },
    "slime_lightning": {
      "idleSize": {
        "tablet": 220
      },
      "battleSize": {
        "mobile": 250,
        "tablet": 330
      }
    },
    "slime_king": {
      "idleSize": {
        "tablet": 290,
        "mobile": 175
      },
      "battleSize": {
        "mobile": 220,
        "tablet": 330
      }
    },
    "forest_spider": {
      "battleSize": {}
    },
    "forest_wolf": {
      "battleSize": {}
    },
    "forest_bear": {
      "battleSize": {}
    },
    "treant": {
      "battleSize": {
        "desktop": 420,
        "tablet": 360
      },
      "idleSize": {}
    },
    "dark_elf": {
      "battleSize": {
        "desktop": 135,
        "tablet": 140
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
  },
  "monsterVisuals": {
    "goblin_slave": {
      "desktop": {
        "dungeonEntry": {
          "x": 50,
          "y": 0,
          "size": 180
        }
      },
      "tablet": {
        "dungeonEntry": {
          "x": 40.7,
          "y": -2.4,
          "size": 165
        },
        "battle": {
          "x": 71.4,
          "y": -5,
          "size": 175
        }
      }
    },
    "goblin_soldier": {
      "tablet": {
        "battle": {
          "x": 71.4,
          "y": -5,
          "size": 175
        }
      }
    },
    "goblin_general": {
      "tablet": {
        "battle": {
          "x": 71.4,
          "y": -5,
          "size": 175
        }
      }
    },
    "goblin_king": {
      "tablet": {
        "battle": {
          "x": 71.4,
          "y": -5,
          "size": 175
        }
      },
      "mobile": {
        "battle": {
          "x": 70.5,
          "y": 0.7,
          "size": 145
        },
        "dungeonEntry": {
          "x": 26.8,
          "y": -32.6,
          "size": 135
        }
      }
    },
    "forest_spider": {
      "desktop": {
        "battle": {
          "x": 82,
          "y": 0,
          "size": 190
        }
      },
      "tablet": {
        "battle": {
          "x": 71.4,
          "y": -5,
          "size": 175
        }
      }
    },
    "forest_wolf": {
      "desktop": {
        "battle": {
          "x": 82,
          "y": 0,
          "size": 190
        }
      },
      "tablet": {
        "battle": {
          "x": 71.4,
          "y": -5,
          "size": 175
        }
      }
    },
    "forest_bear": {
      "desktop": {
        "battle": {
          "x": 82,
          "y": 0,
          "size": 190
        }
      },
      "tablet": {
        "battle": {
          "x": 71.4,
          "y": -5,
          "size": 175
        }
      }
    },
    "treant": {
      "desktop": {
        "battle": {
          "x": 82,
          "y": 0,
          "size": 190
        },
        "dungeonEntry": {
          "x": 50,
          "y": 0,
          "size": 180
        },
        "status": {}
      },
      "tablet": {
        "status": {},
        "dungeonEntry": {
          "x": 40.7,
          "y": -2.4,
          "size": 165
        },
        "battle": {
          "x": 71.4,
          "y": -5,
          "size": 175
        }
      }
    },
    "dark_elf": {
      "desktop": {
        "battle": {
          "x": 82,
          "y": 0,
          "size": 190
        }
      },
      "tablet": {
        "battle": {
          "x": 71.4,
          "y": -5,
          "size": 175
        }
      }
    }
  }
};
