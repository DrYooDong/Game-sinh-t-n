import React, { useState, useEffect, useRef } from 'react';
import {
  CardDefinition,
  PlacedEntity,
  Enemy,
  Projectile,
  SunDrop,
  StoryArc,
  SurvivalPerk
} from '../types/game';
import { ALL_CARDS } from '../data/cardsData';
import { ALL_ENEMY_TYPES } from '../data/enemiesData';
import { PvZIcon, CardVisual } from './CardVisual';
import { ZombieVisual, ProjectileVisual } from './BattleEntities';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface BattlefieldProps {
  arc: StoryArc;
  deck: string[];
  sunlight: number;
  plantFoodCount: number;
  goldenWateringCharges: number;
  onBattleVictory: (gainedSun: number, gainedSouls: number) => void;
  onBattleDefeat: () => void;
  onReturnToStory: () => void;
}

const AVAILABLE_PERKS: SurvivalPerk[] = [
  {
    id: 'perk_rapid_fire',
    name: 'Bão Đạn Siêu Tốc',
    icon: '⚡',
    description: '+35% Tốc độ bắn đạn đậu cho toàn bộ thực vật trên sân vườn.',
    rarity: 'rare',
    category: 'offense',
    applyEffect: () => {}
  },
  {
    id: 'perk_thorny_wall',
    name: 'Vỏ Gai Thiết Giáp',
    icon: '🛡️',
    description: 'Tăng 800 Máu cho Hạt Dẻ và phản lại 40 sát thương khi quái vật cắn.',
    rarity: 'epic',
    category: 'defense',
    applyEffect: () => {}
  },
  {
    id: 'perk_fire_infusion',
    name: 'Hỏa Ngục Bộc Phá',
    icon: '🔥',
    description: 'Đạn đậu tự động được đốt nóng, tăng +35 sát thương và tạo chấn động lan.',
    rarity: 'legendary',
    category: 'offense',
    applyEffect: () => {}
  },
  {
    id: 'perk_auto_harvest',
    name: 'Gió Hút Tự Động',
    icon: '🌪️',
    description: 'Tự động thu thập tất cả Mặt Trời rơi xuống mà không cần chạm tay.',
    rarity: 'common',
    category: 'utility',
    applyEffect: () => {}
  },
  {
    id: 'perk_restoration_dew',
    name: 'Sương Mai Phục Sinh',
    icon: '💧',
    description: 'Hồi phục ngay lập tức 35% Máu cho toàn bộ phòng tuyến và sửa chữa căn cứ.',
    rarity: 'rare',
    category: 'defense',
    applyEffect: () => {}
  },
  {
    id: 'perk_sun_storm',
    name: 'Cơn Mưa Ánh Sáng',
    icon: '☀️',
    description: 'Nhận ngay +180 Mặt Trời và tăng gấp đôi tần suất rơi Nắng tự nhiên.',
    rarity: 'rare',
    category: 'utility',
    applyEffect: () => {}
  }
];

export const Battlefield: React.FC<BattlefieldProps> = ({
  arc,
  deck,
  sunlight: initialSun,
  plantFoodCount: initialPlantFood,
  goldenWateringCharges,
  onBattleVictory,
  onBattleDefeat,
  onReturnToStory
}) => {
  const [sunlight, setSunlight] = useState<number>(arc.battleConfig.startingSun || 150);
  const [plantFood, setPlantFood] = useState<number>(arc.battleConfig.startingPlantFood || 1);
  const [wateringCharges, setWateringCharges] = useState<number>(goldenWateringCharges);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isShovelActive, setIsShovelActive] = useState<boolean>(false);
  const [isPlantFoodMode, setIsPlantFoodMode] = useState<boolean>(false);
  const [isFusionActive, setIsFusionActive] = useState<boolean>(false);

  // Base Integrity / Health
  const [baseHealth, setBaseHealth] = useState<number>(1000);
  const maxBaseHealth = 1000;

  const [placedEntities, setPlacedEntities] = useState<PlacedEntity[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [sunDrops, setSunDrops] = useState<SunDrop[]>([]);
  const [cardCooldowns, setCardCooldowns] = useState<Record<string, number>>({});

  // Active Survival Roguelike Perks
  const [activePerks, setActivePerks] = useState<SurvivalPerk[]>([]);
  const [perkOffer, setPerkOffer] = useState<SurvivalPerk[] | null>(null);
  const [perksOfferedTimes, setPerksOfferedTimes] = useState<number[]>([]);

  const [battleTime, setBattleTime] = useState<number>(0);
  const [waveAlert, setWaveAlert] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [gainedSouls, setGainedSouls] = useState<number>(0);
  const [totalKills, setTotalKills] = useState<number>(0);

  const rows = arc.battleConfig.lanes || 4;
  const cols = arc.battleConfig.cols || 8;
  const stageDuration = arc.battleConfig.durationSec || 60;

  // Deck cards list
  const activeCards = deck
    .map((id) => ALL_CARDS.find((c) => c.id === id))
    .filter((c): c is CardDefinition => Boolean(c));

  // Audio start BGM
  useEffect(() => {
    sound.startBGM('grasswalk');
    return () => {
      sound.stopBGM();
    };
  }, []);

  // Main Loop (Ticks every 100ms)
  useEffect(() => {
    if (isGameOver || isVictory || perkOffer !== null) return;

    const interval = setInterval(() => {
      setBattleTime((t) => {
        const nextTime = t + 0.1;

        // Check for Mid-Wave Survival Roguelike Perk Offer (At 18s and 38s)
        if (
          (nextTime >= 18 && !perksOfferedTimes.includes(18)) ||
          (nextTime >= 38 && !perksOfferedTimes.includes(38))
        ) {
          const triggerMilestone = nextTime >= 38 ? 38 : 18;
          setPerksOfferedTimes((prev) => [...prev, triggerMilestone]);
          // Pick 3 random perks
          const shuffled = [...AVAILABLE_PERKS].sort(() => 0.5 - Math.random());
          setPerkOffer(shuffled.slice(0, 3));
          sound.playPlantFood();
        }

        // Check wave triggers
        arc.battleConfig.waves.forEach((wave) => {
          if (Math.abs(wave.timestampSec - nextTime) < 0.08) {
            if (wave.waveAlert) {
              setWaveAlert(wave.waveAlert);
              setTimeout(() => setWaveAlert(null), 3500);
            }
            // Spawn enemies
            wave.enemies.forEach((wEnemy) => {
              for (let i = 0; i < wEnemy.count; i++) {
                const enemyType = ALL_ENEMY_TYPES[wEnemy.enemyTypeId] || ALL_ENEMY_TYPES['basic_zombie'];
                const targetLane = wEnemy.lane !== undefined ? wEnemy.lane : Math.floor(Math.random() * rows);
                const newEnemy: Enemy = {
                  id: `enemy_${Math.random().toString(36).substring(2, 9)}`,
                  enemyTypeId: enemyType.id,
                  name: enemyType.name,
                  row: targetLane,
                  x: 100 + i * 8, // staggered entrance
                  health: enemyType.health,
                  maxHealth: enemyType.health,
                  speed: enemyType.speed,
                  damage: enemyType.damage,
                  attackSpeedSec: enemyType.attackSpeedSec,
                  lastAttackTime: 0,
                  isFlying: enemyType.isFlying,
                  isWater: enemyType.isWater,
                  hasMetalWeapon: enemyType.hasMetalWeapon,
                  weaponType: enemyType.weaponType,
                  isBoss: enemyType.isBoss,
                  rewardSun: enemyType.rewardSun,
                  rewardSouls: enemyType.rewardSouls
                };
                setEnemies((prev) => [...prev, newEnemy]);
              }
            });
          }
        });

        // Natural Sun Drop every ~6 seconds
        const sunIntervalTicks = activePerks.some((p) => p.id === 'perk_sun_storm') ? 35 : 60;
        if (Math.floor(nextTime * 10) % sunIntervalTicks === 0) {
          const newSun: SunDrop = {
            id: `sun_${Math.random().toString(36).substring(2, 7)}`,
            x: 15 + Math.random() * 70,
            y: 10 + Math.random() * 50,
            value: activePerks.some((p) => p.id === 'perk_sun_storm') ? 50 : 25,
            createdAt: Date.now(),
            isNatural: true
          };

          // If Auto harvest perk is active, collect instantly
          if (activePerks.some((p) => p.id === 'perk_auto_harvest')) {
            setSunlight((s) => s + newSun.value);
            sound.playSunPickup();
          } else {
            setSunDrops((prev) => [...prev, newSun]);
          }
        }

        // Reduce Cooldowns
        setCardCooldowns((prev) => {
          const updated: Record<string, number> = {};
          Object.keys(prev).forEach((k) => {
            if (prev[k] > 0.1) {
              updated[k] = prev[k] - 0.1;
            }
          });
          return updated;
        });

        return nextTime;
      });

      // Update Entities & Attack Loop
      setPlacedEntities((currentPlants) => {
        return currentPlants.map((plant) => {
          const cardDef = ALL_CARDS.find((c) => c.id === plant.cardId);
          if (!cardDef) return plant;

          // Sunflower generates sun
          if (plant.cardId === 'sunflower' && battleTime - plant.lastAttackTime >= cardDef.attackSpeedSec) {
            const sunDrop: SunDrop = {
              id: `sun_${Math.random().toString(36).substring(2, 7)}`,
              x: (plant.col / cols) * 100 + 4,
              y: (plant.row / rows) * 100 + 10,
              value: 25,
              createdAt: Date.now()
            };
            if (activePerks.some((p) => p.id === 'perk_auto_harvest')) {
              setSunlight((s) => s + 25);
              sound.playSunPickup();
            } else {
              setSunDrops((prev) => [...prev, sunDrop]);
            }
            return { ...plant, lastAttackTime: battleTime };
          }

          // Attack Speed modifier from Perks
          const attackSpeedMultiplier = activePerks.some((p) => p.id === 'perk_rapid_fire') ? 0.65 : 1.0;
          const effectiveAttackSpeed = cardDef.attackSpeedSec * attackSpeedMultiplier;

          // Attack Logic for Plants
          if (cardDef.damage > 0 && effectiveAttackSpeed > 0 && battleTime - plant.lastAttackTime >= effectiveAttackSpeed) {
            setEnemies((currentEnemies) => {
              const plantXPercent = (plant.col / cols) * 100;
              const enemiesInLane = currentEnemies.filter((e) => e.row === plant.row && e.x > plantXPercent && !e.isHypnotized);

              if (enemiesInLane.length > 0) {
                const isFireInfused = activePerks.some((p) => p.id === 'perk_fire_infusion');
                const bonusDmg = isFireInfused ? 35 : 0;

                if (plant.cardId === 'peashooter_devourer') {
                  if (isFireInfused) sound.playFirePeaShoot();
                  else sound.playPeaShoot();

                  setProjectiles((prev) => [
                    ...prev,
                    {
                      id: `proj_${Math.random()}`,
                      type: isFireInfused ? 'fire_pea' : 'pea',
                      row: plant.row,
                      x: plantXPercent + 5,
                      speed: isFireInfused ? 45 : 30,
                      damage: cardDef.damage + bonusDmg,
                      fromPlayer: true
                    }
                  ]);
                } else if (plant.cardId === 'chomper') {
                  // Melee Bite nearest enemy
                  const target = enemiesInLane[0];
                  if (target && target.x - plantXPercent < 15) {
                    sound.playHitSplat();
                    target.health -= (cardDef.damage + bonusDmg);
                  }
                } else if (plant.cardId === 'melon_pult') {
                  sound.playMelonThrow();
                  setProjectiles((prev) => [
                    ...prev,
                    {
                      id: `proj_${Math.random()}`,
                      type: 'melon',
                      row: plant.row,
                      x: plantXPercent + 5,
                      speed: 25,
                      damage: cardDef.damage + bonusDmg,
                      isSplash: true,
                      fromPlayer: true
                    }
                  ]);
                } else if (plant.cardId === 'lightning_shroom') {
                  sound.playMagnetClink();
                  enemiesInLane.slice(0, 3).forEach((target) => {
                    target.health -= (cardDef.damage + bonusDmg);
                  });
                }
              }
              return currentEnemies;
            });
            return { ...plant, lastAttackTime: battleTime };
          }

          return plant;
        });
      });

      // Update Projectiles & Collision Check
      setProjectiles((currentProj) => {
        return currentProj
          .map((proj) => ({ ...proj, x: proj.x + proj.speed * 0.1 }))
          .filter((proj) => {
            if (proj.x > 105) return false;

            let hit = false;
            setEnemies((currentEnemies) => {
              return currentEnemies.map((enemy) => {
                if (enemy.row === proj.row && Math.abs(enemy.x - proj.x) < 4 && !enemy.isHypnotized) {
                  hit = true;
                  sound.playHitSplat();
                  const finalDmg = proj.damage;
                  const nextHp = enemy.health - finalDmg;

                  if (proj.isSplash) {
                    currentEnemies.forEach((other) => {
                      if (other.id !== enemy.id && Math.abs(other.x - enemy.x) < 12) {
                        other.health -= finalDmg * 0.5;
                      }
                    });
                  }
                  return { ...enemy, health: nextHp };
                }
                return enemy;
              });
            });

            return !hit;
          });
      });

      // Update Enemies (Movement & Base Defense Attack)
      setEnemies((currentEnemies) => {
        const remaining: Enemy[] = [];

        currentEnemies.forEach((enemy) => {
          // If dead -> give rewards
          if (enemy.health <= 0) {
            sound.playSunPickup();
            setSunlight((s) => s + enemy.rewardSun);
            setGainedSouls((soul) => soul + enemy.rewardSouls);
            setTotalKills((k) => k + 1);

            // Chance to drop Plant Food from bosses/tough enemies
            if (enemy.isBoss || Math.random() < 0.18) {
              setPlantFood((pf) => Math.min(pf + 1, 5));
              sound.playPlantFood();
            }
            return;
          }

          // Check if hitting a plant on this lane
          const enemyCol = Math.floor((enemy.x / 100) * cols);
          const plantInTile = placedEntities.find((p) => p.row === enemy.row && p.col === enemyCol);

          if (plantInTile && !enemy.isHypnotized) {
            if (battleTime - enemy.lastAttackTime >= enemy.attackSpeedSec) {
              sound.playHitSplat();
              plantInTile.health -= enemy.damage;
              enemy.lastAttackTime = battleTime;

              // Thorns perk reflect damage
              if (activePerks.some((p) => p.id === 'perk_thorny_wall')) {
                enemy.health -= 40;
              }

              // Check Hypno-shroom effect!
              if (plantInTile.cardId === 'hypno_shroom') {
                enemy.isHypnotized = true;
                enemy.speed = -enemy.speed;
                sound.playNewspaperRage();
                setPlacedEntities((prev) => prev.filter((p) => p.id !== plantInTile.id));
              }

              if (plantInTile.health <= 0) {
                setPlacedEntities((prev) => prev.filter((p) => p.id !== plantInTile.id));
              }
            }
            remaining.push(enemy);
          } else {
            // Move forward
            const nextX = enemy.x - enemy.speed * 0.1;

            // Check if breached defense line (x <= 2)
            if (nextX <= 2 && !enemy.isHypnotized) {
              sound.playNewspaperRage();
              // Damage Base Health instead of instant defeat!
              setBaseHealth((prevHp) => {
                const newHp = prevHp - (enemy.isBoss ? 500 : 200);
                if (newHp <= 0) {
                  setIsGameOver(true);
                  return 0;
                }
                return newHp;
              });
              // Enemy self-destructs against base barrier
              return;
            }

            remaining.push({ ...enemy, x: nextX });
          }
        });

        return remaining;
      });

      // Check Victory Condition
      if (battleTime >= stageDuration && enemies.length === 0) {
        setIsVictory(true);
        sound.playVictory();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [battleTime, isGameOver, isVictory, placedEntities, enemies, arc, cols, rows, stageDuration, perkOffer, activePerks, perksOfferedTimes]);

  // Click Sun Drop
  const handleCollectSun = (sunId: string, value: number) => {
    sound.playSunPickup();
    setSunlight((s) => s + value);
    setSunDrops((prev) => prev.filter((s) => s.id !== sunId));
  };

  // Place Card on Grid Tile
  const handleTileClick = (row: number, col: number) => {
    if (isShovelActive) {
      sound.playHitSplat();
      setPlacedEntities((prev) => prev.filter((p) => !(p.row === row && p.col === col)));
      setIsShovelActive(false);
      return;
    }

    if (isPlantFoodMode) {
      const targetPlant = placedEntities.find((p) => p.row === row && p.col === col);
      if (targetPlant && plantFood > 0) {
        sound.playPlantFood();
        setPlantFood((pf) => pf - 1);
        setIsPlantFoodMode(false);
        triggerPlantFoodUltimate(targetPlant);
      }
      return;
    }

    if (!selectedCardId) return;

    const card = ALL_CARDS.find((c) => c.id === selectedCardId);
    if (!card) return;

    if (sunlight < card.sunCost) return;
    if (cardCooldowns[card.id] > 0) return;

    const existing = placedEntities.find((p) => p.row === row && p.col === col);
    if (existing && card.id !== 'pumpkin') return;

    // Pi Cards / Instant effects
    if (card.id === 'giant_walnut') {
      sound.playMelonThrow();
      setSunlight((s) => s - card.sunCost);
      setCardCooldowns((prev) => ({ ...prev, [card.id]: card.cooldownSec }));
      setSelectedCardId(null);
      setEnemies((currentEnemies) => {
        return currentEnemies.map((e) => {
          if (e.row === row) e.health -= card.damage;
          return e;
        });
      });
      return;
    }

    if (card.id === 'cherry_bomb') {
      sound.playExplosion();
      setSunlight((s) => s - card.sunCost);
      setCardCooldowns((prev) => ({ ...prev, [card.id]: card.cooldownSec }));
      setSelectedCardId(null);
      setEnemies((currentEnemies) => {
        return currentEnemies.map((e) => {
          const enemyCol = Math.floor((e.x / 100) * cols);
          if (Math.abs(e.row - row) <= 1 && Math.abs(enemyCol - col) <= 1) {
            e.health -= card.damage;
          }
          return e;
        });
      });
      return;
    }

    if (card.id === 'jalapeno') {
      sound.playExplosion();
      setSunlight((s) => s - card.sunCost);
      setCardCooldowns((prev) => ({ ...prev, [card.id]: card.cooldownSec }));
      setSelectedCardId(null);
      setEnemies((currentEnemies) => {
        return currentEnemies.map((e) => {
          if (e.row === row) e.health -= card.damage;
          return e;
        });
      });
      return;
    }

    // Standard Planting
    sound.playClick();
    setSunlight((s) => s - card.sunCost);
    setCardCooldowns((prev) => ({ ...prev, [card.id]: card.cooldownSec }));
    setSelectedCardId(null);

    const bonusWallHp = (card.id === 'giant_walnut' && activePerks.some((p) => p.id === 'perk_thorny_wall')) ? 800 : 0;

    const newEntity: PlacedEntity = {
      id: `entity_${Math.random().toString(36).substring(2, 9)}`,
      cardId: card.id,
      row,
      col,
      health: card.health + bonusWallHp,
      maxHealth: card.health + bonusWallHp,
      lastAttackTime: battleTime,
      isPlantFoodActive: false
    };

    setPlacedEntities((prev) => [...prev, newEntity]);
  };

  // Plant Food Ultimate
  const triggerPlantFoodUltimate = (plant: PlacedEntity) => {
    if (plant.cardId === 'peashooter_devourer') {
      sound.playPeaShoot();
      for (let i = 0; i < 25; i++) {
        setTimeout(() => {
          setProjectiles((prev) => [
            ...prev,
            {
              id: `pf_pea_${Math.random()}`,
              type: 'fire_pea',
              row: plant.row,
              x: (plant.col / cols) * 100 + 5 + i * 2,
              speed: 60,
              damage: 60,
              fromPlayer: true
            }
          ]);
        }, i * 40);
      }
    } else if (plant.cardId === 'sunflower') {
      sound.playSunPickup();
      for (let i = 0; i < 6; i++) {
        const sunDrop: SunDrop = {
          id: `sun_pf_${Math.random()}`,
          x: (plant.col / cols) * 100 + (Math.random() * 20 - 10),
          y: (plant.row / rows) * 100 + (Math.random() * 20 - 10),
          value: 50,
          createdAt: Date.now()
        };
        setSunDrops((prev) => [...prev, sunDrop]);
      }
    } else if (plant.cardId === 'melon_pult') {
      sound.playMelonThrow();
      setEnemies((prev) => {
        return prev.map((e) => ({
          ...e,
          health: e.health - 500
        }));
      });
    } else {
      plant.health = plant.maxHealth * 2;
    }
  };

  // Golden Watering Can
  const handleUseWateringCan = () => {
    if (wateringCharges <= 0) return;
    sound.playWateringCan();
    setWateringCharges((w) => w - 1);
    setPlacedEntities((prev) =>
      prev.map((p) => ({ ...p, health: p.maxHealth }))
    );
    setBaseHealth((prev) => Math.min(maxBaseHealth, prev + 300));
  };

  // Fusion Mode: Aerial Air Strike
  const handleActivateFusion = () => {
    sound.playPlantFood();
    setIsFusionActive(true);
    setTimeout(() => {
      setEnemies((prev) =>
        prev.map((e) => ({
          ...e,
          health: e.health - 450
        }))
      );
      setIsFusionActive(false);
    }, 1200);
  };

  // Select Roguelike Survival Perk
  const handleSelectPerk = (perk: SurvivalPerk) => {
    sound.playPlantFood();
    setActivePerks((prev) => [...prev, perk]);
    setPerkOffer(null);

    // Apply instant perk effects
    if (perk.id === 'perk_restoration_dew') {
      setPlacedEntities((prev) => prev.map((p) => ({ ...p, health: p.maxHealth })));
      setBaseHealth((prev) => Math.min(maxBaseHealth, prev + 350));
    } else if (perk.id === 'perk_sun_storm') {
      setSunlight((s) => s + 180);
    }
  };

  // Calculate Stars Rating
  const starsEarned = baseHealth >= 800 ? 3 : baseHealth >= 400 ? 2 : 1;

  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden bg-emerald-950/40 border border-emerald-800/50 p-3 md:p-5 shadow-2xl text-emerald-50 select-none">
      {/* Wave Announcement Banner */}
      {waveAlert && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-red-600/95 text-white font-black px-6 py-2 rounded-full border-2 border-yellow-300 shadow-2xl animate-bounce text-xs md:text-sm text-center tracking-wide font-mono">
          ⚠️ {waveAlert}
        </div>
      )}

      {/* Top Apocalyptic Survival Stage Status Bar */}
      <div className="bg-black/60 border border-emerald-700/50 rounded-2xl p-3 md:p-4 mb-3 flex flex-wrap items-center justify-between gap-3 shadow-inner">
        {/* Left: Stage Title & Threat Level & Base HP */}
        <div className="flex items-center gap-3">
          <div className="bg-emerald-900/80 px-3 py-1.5 rounded-xl border border-emerald-600/60 flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-yellow-400">SECTOR-0{arc.id}</span>
            <span className="text-xs font-black text-emerald-100 uppercase">{arc.title}</span>
          </div>

          {/* Base Defense Health Bar */}
          <div className="bg-emerald-950 px-3 py-1 rounded-xl border border-emerald-800/60 flex items-center gap-2">
            <span className="text-xs">🛡️</span>
            <div>
              <div className="flex items-center justify-between gap-2 text-[9px] font-mono text-emerald-400">
                <span>PHÒNG TUYẾN</span>
                <span className="font-bold">{baseHealth}/{maxBaseHealth} HP</span>
              </div>
              <div className="w-20 md:w-28 bg-black/60 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    baseHealth > 500 ? 'bg-emerald-400' : baseHealth > 200 ? 'bg-yellow-400' : 'bg-red-500'
                  }`}
                  style={{ width: `${(baseHealth / maxBaseHealth) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Center: Sunlight & Plant Food & Watering Can */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {/* Sunlight */}
          <div className="flex items-center gap-2 bg-emerald-900/60 text-yellow-400 font-black px-3 py-1 rounded-xl text-sm md:text-base border border-emerald-700/60 shadow">
            <span className="text-lg">☀️</span>
            <span>{sunlight}</span>
          </div>

          {/* Plant Food 🍃 */}
          <button
            onClick={() => {
              if (plantFood > 0) {
                setIsPlantFoodMode(!isPlantFoodMode);
                sound.playClick();
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-bold text-xs md:text-sm border transition shadow ${
              isPlantFoodMode
                ? 'bg-emerald-500 text-black border-yellow-300 ring-2 ring-yellow-400 animate-pulse'
                : plantFood > 0
                ? 'bg-emerald-900/50 text-emerald-200 border-emerald-700/60 hover:bg-emerald-800/60'
                : 'bg-black/40 text-emerald-600/40 border-emerald-900/30 opacity-60'
            }`}
          >
            <span>🍃</span>
            <span>Hạt NL: {plantFood}</span>
          </button>

          {/* Golden Watering Can 🚰 */}
          <button
            onClick={handleUseWateringCan}
            disabled={wateringCharges <= 0}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-bold text-xs md:text-sm border transition shadow ${
              wateringCharges > 0
                ? 'bg-yellow-950/60 hover:bg-yellow-900/60 text-yellow-300 border-yellow-600/50'
                : 'bg-black/40 text-emerald-600/40 border-emerald-900/30 opacity-60'
            }`}
          >
            <span>🚰</span>
            <span>Bình Vàng: {wateringCharges}</span>
          </button>
        </div>

        {/* Right: Fusion, Shovel, Timer */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Fusion / Air strike */}
          <button
            onClick={handleActivateFusion}
            disabled={isFusionActive}
            className={`px-3 py-1 rounded-xl text-xs font-black border transition ${
              isFusionActive
                ? 'bg-indigo-600 text-white animate-spin'
                : 'bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border-purple-600/50 shadow'
            }`}
          >
            🎈 Oanh Tạc
          </button>

          {/* Shovel ⛏️ */}
          <button
            onClick={() => {
              setIsShovelActive(!isShovelActive);
              setSelectedCardId(null);
              sound.playClick();
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition ${
              isShovelActive
                ? 'bg-amber-600 text-white border-yellow-300 ring-2 ring-amber-400'
                : 'bg-black/40 text-emerald-300 border-emerald-800/50 hover:bg-emerald-900/40'
            }`}
            title="Xẻng nhổ cây"
          >
            ⛏️
          </button>

          {/* Stage Progress Survival Timer */}
          <div className="flex items-center gap-2 bg-emerald-950 px-3 py-1 rounded-xl border border-emerald-800/50">
            <span className="text-xs text-yellow-400">⏱️</span>
            <div className="w-16 md:w-24 bg-black/60 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (battleTime / stageDuration) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">
              {Math.max(0, Math.floor(stageDuration - battleTime))}s
            </span>
          </div>
        </div>
      </div>

      {/* Active Survival Roguelike Perks Badges Bar */}
      {activePerks.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-2">
          <span className="text-[9px] font-mono uppercase text-emerald-500 font-bold whitespace-nowrap">
            ĐỘT BIẾN KÍCH HOẠT:
          </span>
          {activePerks.map((perk, idx) => (
            <span
              key={idx}
              className="bg-emerald-900/60 border border-emerald-600/50 text-emerald-200 text-[10px] font-mono px-2.5 py-0.5 rounded-full flex items-center gap-1 whitespace-nowrap shadow"
            >
              <span>{perk.icon}</span>
              <span>{perk.name}</span>
            </span>
          ))}
        </div>
      )}

      {/* Card Selection Deck Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3 scrollbar-thin">
        {activeCards.map((card) => {
          const cdRemaining = cardCooldowns[card.id] || 0;
          const cdPercent = (cdRemaining / card.cooldownSec) * 100;
          const canAfford = sunlight >= card.sunCost;

          return (
            <div key={card.id} className="flex-shrink-0">
              <CardVisual
                card={card}
                compact
                isSelected={selectedCardId === card.id}
                cooldownPercent={cdPercent}
                canAfford={canAfford}
                onClick={() => {
                  if (canAfford && cdRemaining <= 0) {
                    sound.playClick();
                    setSelectedCardId(selectedCardId === card.id ? null : card.id);
                    setIsShovelActive(false);
                    setIsPlantFoodMode(false);
                  }
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Main Tactical Grid Battlefield */}
      <div
        className={`relative w-full rounded-3xl overflow-hidden border-2 border-emerald-500/60 shadow-[0_0_40px_rgba(16,185,129,0.25)] ${
          arc.battleConfig.isWaterStage
            ? 'bg-gradient-to-r from-teal-950 via-cyan-950 to-blue-950'
            : 'bg-gradient-to-r from-[#061c0d] via-[#092913] to-[#041509] lawn-energy-grid'
        }`}
        style={{ minHeight: `${rows * 78}px` }}
      >
        {/* Floating Ambient Atmosphere Particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-emerald-400/40 blur-xs animate-particle-1 pointer-events-none" />
        <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 rounded-full bg-yellow-300/40 blur-xs animate-particle-2 pointer-events-none" />
        <div className="absolute top-1/2 left-4/5 w-2.5 h-2.5 rounded-full bg-cyan-400/30 blur-xs animate-particle-3 pointer-events-none" />

        {/* Ambient Fog Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none z-10" />

        {/* Lawn Mower / House Defense line on the Left */}
        <div className="absolute top-0 bottom-0 left-0 w-9 bg-gradient-to-b from-black/80 via-emerald-950/80 to-black/80 border-r-2 border-emerald-500/50 flex flex-col justify-around items-center z-20 shadow-lg">
          {Array.from({ length: rows }).map((_, r) => (
            <span key={r} className="text-sm filter drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" title="Hàng Rào Năng Lượng Tuyết Mộc">
              🛡️
            </span>
          ))}
        </div>

        {/* Grid Cells */}
        <div
          className="grid h-full"
          style={{
            gridTemplateRows: `repeat(${rows}, minmax(70px, 1fr))`,
            gridTemplateColumns: `repeat(${cols}, 1fr)`
          }}
        >
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => {
              const plant = placedEntities.find((p) => p.row === r && p.col === c);
              const cardDef = plant ? ALL_CARDS.find((card) => card.id === plant.cardId) : null;
              const isEven = (r + c) % 2 === 0;

              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => handleTileClick(r, c)}
                  className={`relative border border-emerald-800/30 transition-all flex items-center justify-center cursor-pointer hover:bg-emerald-500/20 ${
                    isEven ? 'bg-emerald-900/10' : 'bg-emerald-950/20'
                  }`}
                >
                  {/* Plant In Tile */}
                  {plant && cardDef && (
                    <div className="relative flex flex-col items-center justify-center animate-fadeIn animate-plant-breathe">
                      <PvZIcon type={cardDef.iconType} className="w-13 h-13 drop-shadow-[0_4px_8px_rgba(16,185,129,0.5)]" />

                      {/* Health Mini Bar */}
                      <div className="w-9 h-1.5 bg-black/70 rounded-full mt-0.5 overflow-hidden border border-emerald-500/50 shadow">
                        <div
                          className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full"
                          style={{ width: `${(plant.health / plant.maxHealth) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Live Projectiles Layer */}
        {projectiles.map((proj) => (
          <div
            key={proj.id}
            className="absolute -translate-y-1/2 pointer-events-none z-20 transition-transform"
            style={{
              top: `${(proj.row + 0.5) * (100 / rows)}%`,
              left: `${proj.x}%`
            }}
          >
            <ProjectileVisual proj={proj} />
          </div>
        ))}

        {/* Live Enemies Layer */}
        {enemies.map((enemy) => {
          return (
            <div
              key={enemy.id}
              className="absolute -translate-y-1/2 pointer-events-none z-30 transition-all duration-100 flex flex-col items-center"
              style={{
                top: `${(enemy.row + 0.5) * (100 / rows)}%`,
                left: `${enemy.x}%`
              }}
            >
              <div className="relative">
                <ZombieVisual enemy={enemy} />

                {enemy.isHypnotized && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs animate-bounce" title="Đã bị thôi miên">
                    🌀
                  </span>
                )}
              </div>

              {/* Enemy Health Bar */}
              <div className="w-12 h-1.5 bg-black/80 rounded-full mt-1 overflow-hidden border border-emerald-900/60 shadow">
                <div
                  className={`h-full transition-all duration-150 ${
                    enemy.isBoss
                      ? 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400'
                      : enemy.health < enemy.maxHealth * 0.4
                      ? 'bg-red-500'
                      : 'bg-emerald-400'
                  }`}
                  style={{ width: `${Math.max(0, (enemy.health / enemy.maxHealth) * 100)}%` }}
                />
              </div>
            </div>
          );
        })}

        {/* Live Sunlight Drops */}
        {sunDrops.map((sun) => (
          <button
            key={sun.id}
            onClick={() => handleCollectSun(sun.id, sun.value)}
            className="absolute z-40 p-2 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-black rounded-full shadow-2xl border-2 border-amber-200 animate-bounce transition-transform hover:scale-125"
            style={{
              top: `${sun.y}%`,
              left: `${sun.x}%`
            }}
          >
            ☀️
          </button>
        ))}
      </div>

      {/* Mid-Battle Roguelike Perk Choice Modal */}
      {perkOffer && (
        <div className="absolute inset-0 bg-[#0a1a0f]/95 backdrop-blur-md flex flex-col items-center justify-center z-50 p-6 text-center animate-fadeIn">
          <div className="bg-emerald-950 border-2 border-yellow-400/80 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-center gap-2 text-yellow-400 text-sm font-mono font-bold uppercase tracking-widest">
              <span>🧬</span>
              <span>ĐỘT BIẾN SINH TỒN CHIẾN TRƯỜNG</span>
              <span>🧬</span>
            </div>
            <h3 className="text-2xl font-black text-emerald-100">
              Chọn 1 Kỹ Năng Tiếp Sức
            </h3>
            <p className="text-xs text-emerald-300/80">
              Phòng tuyến Tuyết Mộc đã tích lũy đủ năng lượng bí cảnh. Hãy lựa chọn đột biến phù hợp nhất!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {perkOffer.map((perk) => (
                <button
                  key={perk.id}
                  onClick={() => handleSelectPerk(perk)}
                  className="bg-black/50 hover:bg-emerald-900/60 border border-emerald-600/60 hover:border-yellow-400 p-4 rounded-2xl text-left flex flex-col justify-between transition-all transform hover:scale-105 shadow group"
                >
                  <div>
                    <div className="text-3xl mb-2">{perk.icon}</div>
                    <h4 className="text-sm font-black text-yellow-300 group-hover:text-yellow-200 leading-tight">
                      {perk.name}
                    </h4>
                    <p className="text-[11px] text-emerald-200/90 leading-relaxed mt-1">
                      {perk.description}
                    </p>
                  </div>
                  <span className="text-[9px] uppercase font-mono tracking-wider text-emerald-400 mt-3 block font-bold">
                    [ CHỌN NÂNG CẤP ]
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stage Victory / Extraction Modal */}
      {isVictory && (
        <div className="absolute inset-0 bg-[#0a1a0f]/95 backdrop-blur-md flex flex-col items-center justify-center z-50 p-6 text-center animate-fadeIn">
          <div className="bg-emerald-950 border-2 border-emerald-400 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <span className="text-6xl">🏆</span>
            <div className="flex items-center justify-center gap-1 text-2xl text-yellow-400">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className={i < starsEarned ? 'text-yellow-400' : 'text-neutral-600'}>
                  ⭐
                </span>
              ))}
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-yellow-300 uppercase">
              VƯỢT MÀN SINH TỒN THÀNH CÔNG!
            </h3>
            <p className="text-xs md:text-sm text-emerald-200">
              Tuyết Mộc đã hoàn thành xuất sắc chiến dịch {arc.title}, giải cứu các nạn nhân và thu thập tài nguyên quý giá!
            </p>

            <div className="grid grid-cols-3 gap-2 bg-black/50 p-3 rounded-2xl border border-emerald-800/60 text-center">
              <div>
                <span className="text-[10px] text-emerald-500 font-mono block">Tiêu Diệt</span>
                <span className="text-sm font-black text-red-400">🧟 {totalKills} Quái</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-500 font-mono block">Mặt Trời</span>
                <span className="text-sm font-black text-yellow-400">☀️ +{arc.rewardSun}</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-500 font-mono block">Tinh Hồn</span>
                <span className="text-sm font-black text-purple-300">🔮 +{arc.rewardSouls + gainedSouls}</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => onBattleVictory(arc.rewardSun, arc.rewardSouls + gainedSouls)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 rounded-2xl shadow-[0_4px_0_rgb(5,150,105)] transition text-sm flex items-center justify-center gap-2"
              >
                <span>TIẾP NHẬN PHẦN THƯỞNG & TIẾP TỤC</span>
                <span>🎁</span>
              </button>

              <button
                onClick={onReturnToStory}
                className="w-full bg-black/40 hover:bg-emerald-900/40 border border-emerald-700/50 py-2.5 rounded-xl text-xs font-bold text-emerald-300 transition"
              >
                🗺️ Quay Lại Bản Đồ Màn Chơi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Defeat Modal */}
      {isGameOver && (
        <div className="absolute inset-0 bg-[#0a1a0f]/95 backdrop-blur-md flex flex-col items-center justify-center z-50 p-6 text-center animate-fadeIn">
          <div className="bg-red-950/90 border border-red-500 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-4">
            <span className="text-6xl">💀</span>
            <h3 className="text-2xl font-black text-red-300">
              PHÒNG TUYẾN THẤT THỦ!
            </h3>
            <p className="text-xs text-neutral-300">
              Bầy Zombie đã phá hủy tường thành căn cứ. Hãy điều chỉnh bộ bài và bố trí đội hình hợp lý hơn!
            </p>

            <div className="flex gap-3">
              <button
                onClick={onBattleDefeat}
                className="flex-1 bg-red-700 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl transition text-xs"
              >
                Thử Lại Màn Này 🔄
              </button>
              <button
                onClick={onReturnToStory}
                className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold py-2.5 rounded-xl transition text-xs"
              >
                Về Bản Đồ 🗺️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
