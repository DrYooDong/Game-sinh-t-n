import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';
import {
  PlantId,
  PlacedPlant,
  ActiveZombie,
  Projectile,
  SunDrop,
  NationalStats,
  LiveComment,
  PvzDaveUpgrade,
  PvzCompanion,
  PvzTactic,
  DamagePopup,
  LawnMowerState,
  StoryEvent
} from './types';
import {
  PVZ_PLANTS,
  PVZ_ZOMBIES,
  PVZ_WAVES,
  COMMENTATORS_FEED,
  PVZ_COMPANIONS,
  PVZ_DAVE_UPGRADES,
  PVZ_TACTICS,
  PVZ_STORY_EVENTS
} from './data/pvzData';
import { PvzHUD } from './components/PvzHUD';
import { PvzGameBoard } from './components/PvzGameBoard';
import { PvzPlantSelector } from './components/PvzPlantSelector';
import { PvzPrologueIntro } from './components/PvzPrologueIntro';
import { PvzNationalBroadcastModal } from './components/PvzNationalBroadcastModal';
import { PvzDaveShopModal } from './components/PvzDaveShopModal';
import { PvzCompanionModal } from './components/PvzCompanionModal';
import { PvzTacticsModal } from './components/PvzTacticsModal';
import { PvzCodexModal } from './components/PvzCodexModal';
import { PvzStageSelectModal } from './components/PvzStageSelectModal';
import { PvzPathologyModal } from './components/PvzPathologyModal';
import { PvzStoryEventModal } from './components/PvzStoryEventModal';
import { Trophy, RotateCcw, Play, CheckCircle2, Skull, Sparkles, MapPin } from 'lucide-react';

interface PvzAppProps {
  onReturnToWorldSelect: () => void;
}

const STORAGE_KEY = 'pvz_survival_save_v3';

export const PvzApp: React.FC<PvzAppProps> = ({ onReturnToWorldSelect }) => {
  // Game state
  const [showPrologue, setShowPrologue] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return !saved;
  });

  const [activeStoryEvent, setActiveStoryEvent] = useState<StoryEvent | null>(null);
  const [seenStoryEvents, setSeenStoryEvents] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.seenStoryEvents || [];
      } catch {}
    }
    return [];
  });

  const [sunlight, setSunlight] = useState<number>(150);
  const [energy, setEnergy] = useState<number>(10);
  const [beastCores, setBeastCores] = useState<number>(0);
  const [playerLevel, setPlayerLevel] = useState<number>(1);
  const [currentWaveIndex, setCurrentWaveIndex] = useState<number>(0);
  const [maxUnlockedWave, setMaxUnlockedWave] = useState<number>(0);
  const [plants, setPlants] = useState<PlacedPlant[]>([]);
  const [zombies, setZombies] = useState<ActiveZombie[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [sunDrops, setSunDrops] = useState<SunDrop[]>([]);
  const [damagePopups, setDamagePopups] = useState<DamagePopup[]>([]);
  const [lawnMowerStates, setLawnMowerStates] = useState<LawnMowerState[]>([
    { row: 0, active: true, colPosition: 0, isTriggered: false },
    { row: 1, active: true, colPosition: 0, isTriggered: false },
    { row: 2, active: true, colPosition: 0, isTriggered: false }
  ]);

  const [cooldowns, setCooldowns] = useState<Record<PlantId, number>>({
    plant_sunflower: 0,
    plant_peashooter: 0,
    plant_snow_pea: 0,
    plant_fume_shroom: 0,
    plant_hypno_shroom: 0,
    plant_gatling_pea: 0,
    plant_pumpkin: 0,
    plant_cherry_bomb: 0,
    plant_zombie_wall: 0,
    plant_tallnut: 0,
    plant_doom_shroom: 0,
    plant_plantern: 0
  });

  const [selectedPlantId, setSelectedPlantId] = useState<PlantId | null>(null);
  const [isShovelActive, setIsShovelActive] = useState<boolean>(false);
  const [nuclearExplosionEffect, setNuclearExplosionEffect] = useState<boolean>(false);

  // Modals state
  const [showBroadcastModal, setShowBroadcastModal] = useState<boolean>(false);
  const [showDaveShopModal, setShowDaveShopModal] = useState<boolean>(false);
  const [showCompanionModal, setShowCompanionModal] = useState<boolean>(false);
  const [showTacticsModal, setShowTacticsModal] = useState<boolean>(false);
  const [showCodexModal, setShowCodexModal] = useState<boolean>(false);
  const [showStageSelectModal, setShowStageSelectModal] = useState<boolean>(false);
  const [showPathologyModal, setShowPathologyModal] = useState<boolean>(false);
  const [waveClearedModal, setWaveClearedModal] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Dynamic Content state
  const [currentCommentIndex, setCurrentCommentIndex] = useState<number>(0);
  const [daveUpgrades, setDaveUpgrades] = useState<PvzDaveUpgrade[]>(PVZ_DAVE_UPGRADES);
  const [companions, setCompanions] = useState<PvzCompanion[]>(PVZ_COMPANIONS);
  const [tactics, setTactics] = useState<PvzTactic[]>(PVZ_TACTICS);

  const [nationalStats, setNationalStats] = useState<NationalStats>({
    countryName: 'Cửu Châu (Hoa Quốc)',
    playerRepresentative: 'Tuyết Mộc',
    territoryKm2: 10,
    populationLifeBonusMonths: 1,
    nationalStrengthBonusPct: 5,
    worldRank: 1,
    beastCores: 0,
    purificationSerumLevel: 0
  });

  const waveData = PVZ_WAVES[currentWaveIndex] || PVZ_WAVES[0];
  const waveStartTimeRef = useRef<number>(Date.now());
  const spawnedIndicesRef = useRef<Set<number>>(new Set());

  // References for loop sync
  const plantsRef = useRef<PlacedPlant[]>([]);
  const zombiesRef = useRef<ActiveZombie[]>([]);
  plantsRef.current = plants;
  zombiesRef.current = zombies;

  // Add Damage Popup helper
  const addDamagePopup = (row: number, colPosition: number, text: string, color: string, isCrit = false) => {
    const newPopup: DamagePopup = {
      id: `pop_${Date.now()}_${Math.random()}`,
      row,
      colPosition,
      text,
      color,
      isCrit,
      createdAt: Date.now()
    };
    setDamagePopups((prev) => [...prev.slice(-15), newPopup]);
  };

  // Load Saved Game
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSunlight(parsed.sunlight ?? 150);
        setEnergy(parsed.energy ?? 10);
        setBeastCores(parsed.beastCores ?? 0);
        setPlayerLevel(parsed.playerLevel ?? 1);
        setCurrentWaveIndex(parsed.currentWaveIndex ?? 0);
        setMaxUnlockedWave(parsed.maxUnlockedWave ?? 0);
        if (parsed.seenStoryEvents) setSeenStoryEvents(parsed.seenStoryEvents);
        if (parsed.nationalStats) setNationalStats(parsed.nationalStats);
        if (parsed.daveUpgrades) setDaveUpgrades(parsed.daveUpgrades);
        if (parsed.companions) setCompanions(parsed.companions);
        if (parsed.tactics) setTactics(parsed.tactics);
      } catch (e) {
        console.error('Error loading PvZ save', e);
      }
    }
  }, []);

  // Save Game State
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        sunlight,
        energy,
        beastCores,
        playerLevel,
        currentWaveIndex,
        maxUnlockedWave,
        seenStoryEvents,
        nationalStats,
        daveUpgrades,
        companions,
        tactics
      })
    );
  }, [
    sunlight,
    energy,
    beastCores,
    playerLevel,
    currentWaveIndex,
    maxUnlockedWave,
    seenStoryEvents,
    nationalStats,
    daveUpgrades,
    companions,
    tactics
  ]);

  // Story Event Trigger on Wave Start
  useEffect(() => {
    if (showPrologue) return;
    const startEvent = PVZ_STORY_EVENTS.find(
      (e) => e.waveIndex === currentWaveIndex && e.trigger === 'wave_start' && !seenStoryEvents.includes(e.id)
    );
    if (startEvent) {
      setActiveStoryEvent(startEvent);
      setSeenStoryEvents((prev) => (prev.includes(startEvent.id) ? prev : [...prev, startEvent.id]));
    }
  }, [currentWaveIndex, showPrologue]);

  // Commentator Rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCommentIndex((prev) => (prev + 1) % COMMENTATORS_FEED.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Cooldown Decrement Timer & Damage Popup cleaner
  useEffect(() => {
    if (showPrologue || isGameOver || waveClearedModal || activeStoryEvent !== null) return;
    const interval = setInterval(() => {
      const now = Date.now();
      setCooldowns((prev) => {
        const updated = { ...prev };
        (Object.keys(updated) as PlantId[]).forEach((k) => {
          if (updated[k] > 0) updated[k] = Math.max(0, updated[k] - 0.2);
        });
        return updated;
      });

      setDamagePopups((prev) => prev.filter((p) => now - p.createdAt < 900));
    }, 200);
    return () => clearInterval(interval);
  }, [showPrologue, isGameOver, waveClearedModal, activeStoryEvent]);

  // Natural Sky Sun Spawner
  useEffect(() => {
    if (showPrologue || isGameOver || waveClearedModal || activeStoryEvent !== null) return;
    const interval = setInterval(() => {
      const randRow = Math.floor(Math.random() * 3);
      const randCol = Math.floor(Math.random() * 5);
      setSunDrops((prev) => [
        ...prev,
        {
          id: `sun_sky_${Date.now()}_${Math.random()}`,
          row: randRow,
          col: randCol,
          value: 25,
          spawnTime: Date.now()
        }
      ]);
    }, 8500);
    return () => clearInterval(interval);
  }, [showPrologue, isGameOver, waveClearedModal, activeStoryEvent]);

  // Reset Wave Spawns when wave changes
  useEffect(() => {
    waveStartTimeRef.current = Date.now();
    spawnedIndicesRef.current.clear();
    setZombies([]);
    setProjectiles([]);
    setSunDrops([]);
    setDamagePopups([]);
    setLawnMowerStates([
      { row: 0, active: true, colPosition: 0, isTriggered: false },
      { row: 1, active: true, colPosition: 0, isTriggered: false },
      { row: 2, active: true, colPosition: 0, isTriggered: false }
    ]);
  }, [currentWaveIndex]);

  // Main Real-Time Combat Game Loop (100ms tick)
  useEffect(() => {
    if (showPrologue || isGameOver || waveClearedModal || activeStoryEvent !== null) return;

    // Upgrades & Tactics
    const sunBonusUpgrade = daveUpgrades.find((u) => u.id === 'up_sun_efficiency')?.level || 0;
    const extraSunValue = sunBonusUpgrade * 10;
    const peashooterDmgUpgrade = daveUpgrades.find((u) => u.id === 'up_gatling_pea')?.level || 0;
    const peashooterDmgMultiplier = 1 + peashooterDmgUpgrade * 0.15;
    const recycleUpgrade = daveUpgrades.find((u) => u.id === 'up_zombie_recycle')?.level || 0;
    const extraRecycleEnergy = recycleUpgrade * 5;

    const isVolleyActive = tactics.find((t) => t.id === 'tactic_volley')?.isActive ?? false;
    const isSporeSlowActive = tactics.find((t) => t.id === 'tactic_spore_slow')?.isActive ?? false;

    const gameLoop = setInterval(() => {
      const now = Date.now();
      const elapsedSec = (now - waveStartTimeRef.current) / 1000;

      // 0. Update Moving Lawnmowers
      setLawnMowerStates((currentMowers) => {
        let updatedMowers = currentMowers.map((m) => {
          if (m.isTriggered && m.active) {
            const nextCol = m.colPosition + 0.45;
            if (nextCol > 6.2) {
              return { ...m, active: false, colPosition: 6.2 };
            }
            return { ...m, colPosition: nextCol };
          }
          return m;
        });

        // Kill all zombies in contact with triggered lawnmowers
        updatedMowers.forEach((m) => {
          if (m.isTriggered && m.active) {
            setZombies((currentZombies) =>
              currentZombies.map((z) => {
                if (z.row === m.row && Math.abs(z.colPosition - m.colPosition) < 0.8) {
                  addDamagePopup(m.row, z.colPosition, '🚜 MÁY CẮT 9999!', 'text-rose-400 font-black', true);
                  return { ...z, hp: 0 };
                }
                return z;
              })
            );
          }
        });

        return updatedMowers;
      });

      // 1. Spawn Wave Zombies
      waveData.zombieSpawns.forEach((spawn, idx) => {
        if (!spawnedIndicesRef.current.has(idx) && elapsedSec >= spawn.delaySec) {
          spawnedIndicesRef.current.add(idx);
          const row = spawn.row !== undefined ? spawn.row : Math.floor(Math.random() * 3);
          const zDef = PVZ_ZOMBIES[spawn.zombieId] || PVZ_ZOMBIES.zombie_normal;

          setZombies((prev) => [
            ...prev,
            {
              id: `z_${Date.now()}_${Math.random()}`,
              zombieId: spawn.zombieId,
              row,
              colPosition: 5.8,
              hp: zDef.maxHp,
              maxHp: zDef.maxHp,
              speed: zDef.speed,
              lastAttackTime: 0,
              isAttacking: false,
              targetPlantId: null,
              slowTimerSec: 0,
              isCharmed: false,
              armorType: zDef.armorType || 'none'
            }
          ]);
        }
      });

      // 2. Plants Attacks & Production
      setPlants((currentPlants) => {
        let updatedPlants = [...currentPlants];

        updatedPlants.forEach((p) => {
          const pDef = PVZ_PLANTS.find((pi) => pi.id === p.plantId);
          if (!pDef) return;

          // Plantern 25% speed buff
          const laneHasPlantern = currentPlants.some(
            (other) => other.row === p.row && other.plantId === 'plant_plantern'
          );
          const speedMultiplier = laneHasPlantern ? 0.75 : 1.0;

          // Sunflower Produce Sun
          if (p.plantId === 'plant_sunflower') {
            const lastSun = p.lastSunTime || p.lastAttackTime;
            if (now - lastSun >= pDef.attackIntervalSec * 1000 * speedMultiplier) {
              p.lastSunTime = now;
              addDamagePopup(p.row, p.col, `+${25 + extraSunValue} ☀️`, 'text-amber-300 font-bold');
              setSunDrops((prev) => [
                ...prev,
                {
                  id: `sun_flower_${Date.now()}_${Math.random()}`,
                  row: p.row,
                  col: p.col,
                  value: 25 + extraSunValue,
                  spawnTime: now
                }
              ]);
            }
          }

          // Peashooter
          if (p.plantId === 'plant_peashooter') {
            if (now - p.lastAttackTime >= pDef.attackIntervalSec * 1000 * speedMultiplier) {
              const enemyInRow = zombiesRef.current.some(
                (z) => z.row === p.row && z.colPosition > p.col && !z.isCharmed
              );
              if (enemyInRow) {
                p.lastAttackTime = now;
                setProjectiles((prev) => [
                  ...prev,
                  {
                    id: `proj_${Date.now()}_${Math.random()}`,
                    row: p.row,
                    colPosition: p.col + 0.4,
                    damage: Math.round(pDef.attackDmg * peashooterDmgMultiplier),
                    speed: 2.3,
                    type: 'pea'
                  }
                ]);
              }
            }
          }

          // Snow Pea (Ice Slow)
          if (p.plantId === 'plant_snow_pea') {
            if (now - p.lastAttackTime >= pDef.attackIntervalSec * 1000 * speedMultiplier) {
              const enemyInRow = zombiesRef.current.some(
                (z) => z.row === p.row && z.colPosition > p.col && !z.isCharmed
              );
              if (enemyInRow) {
                p.lastAttackTime = now;
                setProjectiles((prev) => [
                  ...prev,
                  {
                    id: `proj_ice_${Date.now()}_${Math.random()}`,
                    row: p.row,
                    colPosition: p.col + 0.4,
                    damage: Math.round(pDef.attackDmg * peashooterDmgMultiplier),
                    speed: 2.2,
                    type: 'ice_pea'
                  }
                ]);
              }
            }
          }

          // Fume-shroom (Penetrating Spore Wave)
          if (p.plantId === 'plant_fume_shroom') {
            if (now - p.lastAttackTime >= pDef.attackIntervalSec * 1000 * speedMultiplier) {
              const enemyInRow = zombiesRef.current.some(
                (z) => z.row === p.row && z.colPosition > p.col && !z.isCharmed
              );
              if (enemyInRow) {
                p.lastAttackTime = now;
                setProjectiles((prev) => [
                  ...prev,
                  {
                    id: `proj_fume_${Date.now()}_${Math.random()}`,
                    row: p.row,
                    colPosition: p.col + 0.4,
                    damage: pDef.attackDmg,
                    speed: 1.8,
                    type: 'fume_wave',
                    penetrating: true,
                    hitZombieIds: []
                  }
                ]);
              }
            }
          }

          // Gatling Pea (Rapid Fire)
          if (p.plantId === 'plant_gatling_pea') {
            if (now - p.lastAttackTime >= pDef.attackIntervalSec * 1000 * speedMultiplier) {
              const enemyInRow = zombiesRef.current.some(
                (z) => z.row === p.row && z.colPosition > p.col && !z.isCharmed
              );
              if (enemyInRow) {
                p.lastAttackTime = now;
                setProjectiles((prev) => [
                  ...prev,
                  {
                    id: `proj_gat_${Date.now()}_${Math.random()}`,
                    row: p.row,
                    colPosition: p.col + 0.4,
                    damage: Math.round(pDef.attackDmg * peashooterDmgMultiplier),
                    speed: 2.8,
                    type: 'gatling'
                  }
                ]);
              }
            }
          }

          // Cherry Bomb
          if (p.plantId === 'plant_cherry_bomb') {
            if (now - p.lastAttackTime >= 1200) {
              soundManager.play('danger');
              confetti({ particleCount: 80, spread: 85 });
              addDamagePopup(p.row, p.col, '💥 450 BOOM!', 'text-rose-400 font-black', true);
              setZombies((currentZombies) =>
                currentZombies.map((z) => {
                  if (Math.abs(z.row - p.row) <= 1 && Math.abs(z.colPosition - p.col) <= 2) {
                    addDamagePopup(z.row, z.colPosition, '-450', 'text-rose-300 font-bold');
                    return { ...z, hp: z.hp - pDef.attackDmg };
                  }
                  return z;
                })
              );
              p.hp = 0;
            }
          }

          // Doom-shroom Nuclear Blast
          if (p.plantId === 'plant_doom_shroom') {
            if (now - p.lastAttackTime >= 1200) {
              soundManager.play('danger');
              setNuclearExplosionEffect(true);
              setTimeout(() => setNuclearExplosionEffect(false), 1500);
              confetti({ particleCount: 160, spread: 130 });
              addDamagePopup(1, 3, '☢️ 1200 NỔ HẠT NHÂN!', 'text-purple-300 font-black', true);

              setZombies((currentZombies) =>
                currentZombies.map((z) => {
                  addDamagePopup(z.row, z.colPosition, '-1200', 'text-purple-400 font-black');
                  return {
                    ...z,
                    hp: z.hp - pDef.attackDmg
                  };
                })
              );
              p.hp = 0;
            }
          }

          // Zombie Wall Melee
          if (p.plantId === 'plant_zombie_wall') {
            if (now - p.lastAttackTime >= pDef.attackIntervalSec * 1000) {
              const adjacentZombie = zombiesRef.current.find(
                (z) => z.row === p.row && Math.abs(z.colPosition - p.col) < 0.5 && !z.isCharmed
              );
              if (adjacentZombie) {
                p.lastAttackTime = now;
                addDamagePopup(adjacentZombie.row, adjacentZombie.colPosition, `-${pDef.attackDmg} ⛏️`, 'text-purple-300');
                setZombies((currentZombies) =>
                  currentZombies.map((z) =>
                    z.id === adjacentZombie.id ? { ...z, hp: z.hp - pDef.attackDmg } : z
                  )
                );
              }
            }
          }
        });

        return updatedPlants.filter((p) => p.hp > 0);
      });

      // 3. Move Projectiles & Check Collisions
      setProjectiles((currentProjectiles) => {
        let updated = currentProjectiles.map((proj) => ({
          ...proj,
          colPosition: proj.colPosition + proj.speed * 0.1
        }));

        updated = updated.filter((proj) => {
          let hitAny = false;

          setZombies((currentZombies) =>
            currentZombies.map((z) => {
              if (z.isCharmed) return z;
              if (z.row !== proj.row) return z;
              if (Math.abs(z.colPosition - proj.colPosition) >= 0.32) return z;

              if (proj.penetrating) {
                if (proj.hitZombieIds && proj.hitZombieIds.includes(z.id)) return z;
                if (!proj.hitZombieIds) proj.hitZombieIds = [];
                proj.hitZombieIds.push(z.id);
              } else {
                hitAny = true;
              }

              soundManager.play('attack');

              let finalDmg = proj.damage;
              if (z.armorType === 'spore_scale' && proj.type === 'pea') {
                finalDmg = Math.round(finalDmg * 0.5);
              }

              let nextSlow = z.slowTimerSec || 0;
              if (proj.type === 'ice_pea') {
                nextSlow = 4.0;
                addDamagePopup(z.row, z.colPosition, '❄️ SLOW!', 'text-cyan-300 font-black');
              }

              if (isSporeSlowActive && proj.type === 'fume_wave' && nextSlow > 0) {
                finalDmg = Math.round(finalDmg * 1.35);
                addDamagePopup(z.row, z.colPosition, `-${finalDmg} XUYÊN GIÁP!`, 'text-fuchsia-300 font-black', true);
              } else {
                addDamagePopup(z.row, z.colPosition, `-${finalDmg}`, proj.type === 'ice_pea' ? 'text-cyan-300' : 'text-emerald-300');
              }

              if (isVolleyActive && proj.colPosition > 4.0) {
                finalDmg = Math.round(finalDmg * 1.2);
              }

              return {
                ...z,
                hp: z.hp - finalDmg,
                slowTimerSec: nextSlow
              };
            })
          );

          if (proj.penetrating) {
            return proj.colPosition < 6.2;
          }
          return !hitAny && proj.colPosition < 6.2;
        });

        return updated;
      });

      // 4. Move Zombies & Attack
      setZombies((currentZombies) => {
        let updatedZombies = currentZombies.map((z) => {
          const zDef = PVZ_ZOMBIES[z.zombieId] || PVZ_ZOMBIES.zombie_normal;
          const currentSlow = Math.max(0, (z.slowTimerSec || 0) - 0.1);
          const effectiveSpeed = currentSlow > 0 ? z.speed * 0.5 : z.speed;

          // Charmed Zombie
          if (z.isCharmed) {
            const enemyInFront = currentZombies.find(
              (other) =>
                !other.isCharmed &&
                other.row === z.row &&
                other.colPosition >= z.colPosition &&
                other.colPosition - z.colPosition < 0.4
            );

            if (enemyInFront) {
              if (now - z.lastAttackTime >= zDef.attackIntervalSec * 1000) {
                enemyInFront.hp -= zDef.attackDmg;
                addDamagePopup(z.row, enemyInFront.colPosition, `-${zDef.attackDmg} 💖`, 'text-pink-300 font-bold');
                return {
                  ...z,
                  slowTimerSec: currentSlow,
                  isAttacking: true,
                  lastAttackTime: now
                };
              }
              return { ...z, slowTimerSec: currentSlow, isAttacking: true };
            } else {
              const newPos = z.colPosition + effectiveSpeed * 0.1;
              return {
                ...z,
                colPosition: newPos,
                slowTimerSec: currentSlow,
                isAttacking: false
              };
            }
          }

          // Enemy Zombie
          const blockingPlant = plantsRef.current.find(
            (p) => p.row === z.row && Math.abs(z.colPosition - p.col) < 0.35 && z.colPosition >= p.col
          );

          if (blockingPlant) {
            // Hypno-shroom check
            if (blockingPlant.plantId === 'plant_hypno_shroom') {
              soundManager.play('level_up');
              setPlants((prev) => prev.filter((p) => p.id !== blockingPlant.id));
              addDamagePopup(z.row, z.colPosition, '💖 THÔI MIÊN!', 'text-pink-400 font-black', true);
              return {
                ...z,
                isCharmed: true,
                slowTimerSec: currentSlow,
                isAttacking: false
              };
            }

            if (now - z.lastAttackTime >= zDef.attackIntervalSec * 1000) {
              setPlants((prevPlants) =>
                prevPlants.map((p) =>
                  p.id === blockingPlant.id ? { ...p, hp: p.hp - zDef.attackDmg } : p
                )
              );
              addDamagePopup(z.row, blockingPlant.col, `-${zDef.attackDmg} 🦷`, 'text-rose-400');
              return {
                ...z,
                slowTimerSec: currentSlow,
                isAttacking: true,
                targetPlantId: blockingPlant.id,
                lastAttackTime: now
              };
            }
            return {
              ...z,
              slowTimerSec: currentSlow,
              isAttacking: true,
              targetPlantId: blockingPlant.id
            };
          } else {
            const newPos = z.colPosition - effectiveSpeed * 0.1;
            return {
              ...z,
              colPosition: newPos,
              slowTimerSec: currentSlow,
              isAttacking: false,
              targetPlantId: null
            };
          }
        });

        // 5. Check Zombie Death & Drop Rewards
        updatedZombies = updatedZombies.filter((z) => {
          if (z.hp <= 0 || (z.isCharmed && z.colPosition > 6.2)) {
            const zDef = PVZ_ZOMBIES[z.zombieId] || PVZ_ZOMBIES.zombie_normal;
            setSunlight((s) => s + zDef.rewardSun);
            setEnergy((e) => e + zDef.rewardEnergy + extraRecycleEnergy);
            if (zDef.rewardBeastCore) {
              setBeastCores((bc) => bc + (zDef.rewardBeastCore || 1));
              addDamagePopup(z.row, z.colPosition, `+${zDef.rewardBeastCore} 🔮 TINH HẠCH!`, 'text-fuchsia-300 font-black', true);
              soundManager.play('item_get');
            }
            soundManager.play('victory');
            return false;
          }
          return true;
        });

        // 6. Check House Infiltration & Trigger Lawnmowers
        updatedZombies.forEach((z) => {
          if (!z.isCharmed && z.colPosition <= 0) {
            setLawnMowerStates((mowers) => {
              const targetMower = mowers[z.row];
              if (targetMower && targetMower.active && !targetMower.isTriggered) {
                soundManager.play('danger');
                confetti({ particleCount: 90, spread: 85 });
                return mowers.map((m) =>
                  m.row === z.row ? { ...m, isTriggered: true, colPosition: 0 } : m
                );
              } else if (!targetMower || !targetMower.active) {
                soundManager.play('danger');
                setIsGameOver(true);
              }
              return mowers;
            });
          }
        });

        return updatedZombies;
      });

      // 7. Check Wave Cleared Condition
      const allSpawned = spawnedIndicesRef.current.size >= waveData.zombieSpawns.length;
      const nonCharmedZombies = zombiesRef.current.filter((z) => !z.isCharmed);

      if (allSpawned && nonCharmedZombies.length === 0 && elapsedSec > 8 && !waveClearedModal) {
        soundManager.play('level_up');
        confetti({ particleCount: 140, spread: 95, origin: { y: 0.4 } });

        const clearEvent = PVZ_STORY_EVENTS.find(
          (e) => e.waveIndex === currentWaveIndex && e.trigger === 'wave_clear' && !seenStoryEvents.includes(e.id)
        );
        if (clearEvent) {
          setActiveStoryEvent(clearEvent);
          setSeenStoryEvents((prev) => (prev.includes(clearEvent.id) ? prev : [...prev, clearEvent.id]));
        }

        setWaveClearedModal(true);
        setPlayerLevel((lvl) => lvl + 1);
        setMaxUnlockedWave((prevMax) => Math.max(prevMax, currentWaveIndex + 1));

        setNationalStats((ns) => ({
          ...ns,
          territoryKm2: ns.territoryKm2 + waveData.nationalReward.territoryBonusKm2,
          populationLifeBonusMonths:
            ns.populationLifeBonusMonths + (waveData.nationalReward.populationBonusMonths || 1),
          nationalStrengthBonusPct:
            ns.nationalStrengthBonusPct + waveData.nationalReward.statBonusPct
        }));

        // Dynamic Companion Unlocks
        setCompanions((prev) =>
          prev.map((c) => {
            if (c.id === 'comp_duong_long' && currentWaveIndex >= 2) {
              return { ...c, isUnlocked: true };
            }
            if (c.id === 'comp_sinh_vien_nong_nghiep' && currentWaveIndex >= 3) {
              return { ...c, isUnlocked: true };
            }
            if (c.id === 'comp_duong_tuong_quan' && currentWaveIndex >= 5) {
              return { ...c, isUnlocked: true };
            }
            return c;
          })
        );

        // Dave Shop Lab unlocks
        if (currentWaveIndex >= 4) {
          setDaveUpgrades((prev) =>
            prev.map((u) =>
              u.id === 'up_beast_core_synthesis' ? { ...u, isUnlocked: true } : u
            )
          );
        }
        if (currentWaveIndex >= 5) {
          setDaveUpgrades((prev) =>
            prev.map((u) =>
              u.id === 'up_purification_serum' ? { ...u, isUnlocked: true } : u
            )
          );
        }
      }
    }, 100);

    return () => clearInterval(gameLoop);
  }, [
    showPrologue,
    isGameOver,
    waveClearedModal,
    activeStoryEvent,
    seenStoryEvents,
    currentWaveIndex,
    daveUpgrades,
    tactics
  ]);

  // Handle Cell Click (Plant or Shovel)
  const handleCellClick = (row: number, col: number) => {
    const existingPlant = plants.find((p) => p.row === row && p.col === col);

    if (isShovelActive) {
      if (existingPlant) {
        soundManager.play('click');
        setPlants((prev) => prev.filter((p) => p.id !== existingPlant.id));
        addDamagePopup(row, col, '🛠️ ĐÃ ĐÀO BỎ', 'text-neutral-400');
      }
      setIsShovelActive(false);
      return;
    }

    if (selectedPlantId && !existingPlant) {
      const pDef = PVZ_PLANTS.find((p) => p.id === selectedPlantId);
      if (!pDef || sunlight < pDef.sunCost) return;

      const isMobileActive = tactics.find((t) => t.id === 'tactic_mobile_garden')?.isActive;
      const cooldownMod = isMobileActive ? 0.75 : 1.0;

      soundManager.play('item_get');
      setSunlight((s) => s - pDef.sunCost);
      setCooldowns((cd) => ({ ...cd, [selectedPlantId]: pDef.cooldownSec * cooldownMod }));

      addDamagePopup(row, col, `🌱 TRỒNG!`, 'text-emerald-300 font-bold');

      setPlants((prev) => [
        ...prev,
        {
          id: `plant_${Date.now()}_${Math.random()}`,
          plantId: selectedPlantId,
          row,
          col,
          hp: pDef.maxHp,
          maxHp: pDef.maxHp,
          lastAttackTime: Date.now()
        }
      ]);

      setSelectedPlantId(null);
    }
  };

  // Collect Sun Drops
  const handleCollectSun = (sunId: string, value: number) => {
    setSunDrops((prev) => prev.filter((s) => s.id !== sunId));
    setSunlight((s) => s + value);
  };

  // Upgrade Dave Shop Item
  const handleUpgradeDaveItem = (upgradeId: string) => {
    const item = daveUpgrades.find((u) => u.id === upgradeId);
    if (!item) return;
    const costEnergy = item.costEnergy * (item.level + 1);
    const costCores = item.costBeastCore ? item.costBeastCore * (item.level + 1) : 0;
    if (energy < costEnergy || beastCores < costCores) return;

    setEnergy((e) => e - costEnergy);
    if (costCores > 0) setBeastCores((bc) => bc - costCores);

    setDaveUpgrades((prev) =>
      prev.map((u) => (u.id === upgradeId ? { ...u, level: u.level + 1 } : u))
    );
  };

  // Toggle Tactic
  const handleToggleTactic = (tacticId: string) => {
    setTactics((prev) =>
      prev.map((t) => (t.id === tacticId ? { ...t, isActive: !t.isActive } : t))
    );
  };

  // Next Wave Handler
  const handleNextWave = () => {
    setWaveClearedModal(false);
    if (currentWaveIndex < PVZ_WAVES.length - 1) {
      setCurrentWaveIndex((w) => w + 1);
      setLawnMowerStates([
        { row: 0, active: true, colPosition: 0, isTriggered: false },
        { row: 1, active: true, colPosition: 0, isTriggered: false },
        { row: 2, active: true, colPosition: 0, isTriggered: false }
      ]);
    }
  };

  // Select Specific Wave from Campaign Map
  const handleSelectWave = (waveIdx: number) => {
    setCurrentWaveIndex(waveIdx);
    setWaveClearedModal(false);
    setIsGameOver(false);
    setPlants([]);
    setZombies([]);
    setProjectiles([]);
    setSunDrops([]);
    setDamagePopups([]);
    setLawnMowerStates([
      { row: 0, active: true, colPosition: 0, isTriggered: false },
      { row: 1, active: true, colPosition: 0, isTriggered: false },
      { row: 2, active: true, colPosition: 0, isTriggered: false }
    ]);
  };

  // Restart Wave / Game
  const handleRestart = () => {
    setIsGameOver(false);
    setWaveClearedModal(false);
    setPlants([]);
    setZombies([]);
    setProjectiles([]);
    setSunDrops([]);
    setDamagePopups([]);
    setLawnMowerStates([
      { row: 0, active: true, colPosition: 0, isTriggered: false },
      { row: 1, active: true, colPosition: 0, isTriggered: false },
      { row: 2, active: true, colPosition: 0, isTriggered: false }
    ]);
    waveStartTimeRef.current = Date.now();
    spawnedIndicesRef.current.clear();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-mono selection:bg-emerald-500 selection:text-neutral-950">
      {/* Story Event Dialogue Modal */}
      {activeStoryEvent && (
        <PvzStoryEventModal
          event={activeStoryEvent}
          onClose={() => {
            soundManager.play('click');
            setActiveStoryEvent(null);
          }}
        />
      )}

      {/* Prologue Introduction Modal */}
      {showPrologue && (
        <PvzPrologueIntro
          onClose={() => {
            setShowPrologue(false);
            soundManager.play('level_up');
          }}
        />
      )}

      {/* Campaign Map Stage Selector Modal */}
      {showStageSelectModal && (
        <PvzStageSelectModal
          currentWaveIndex={currentWaveIndex}
          maxUnlockedWave={maxUnlockedWave}
          onSelectWave={handleSelectWave}
          onClose={() => setShowStageSelectModal(false)}
        />
      )}

      {/* Pathology Virus Analysis Modal */}
      {showPathologyModal && (
        <PvzPathologyModal
          playerLevel={playerLevel}
          beastCores={beastCores}
          onClose={() => setShowPathologyModal(false)}
        />
      )}

      {/* Broadcast TV Modal */}
      {showBroadcastModal && (
        <PvzNationalBroadcastModal
          nationalStats={nationalStats}
          currentWave={currentWaveIndex + 1}
          totalWaves={PVZ_WAVES.length}
          onClose={() => setShowBroadcastModal(false)}
        />
      )}

      {/* Dave Shop Modal */}
      {showDaveShopModal && (
        <PvzDaveShopModal
          energy={energy}
          beastCores={beastCores}
          upgrades={daveUpgrades}
          onUpgrade={handleUpgradeDaveItem}
          onClose={() => setShowDaveShopModal(false)}
        />
      )}

      {/* Companions & Eternal Garden Faction Modal */}
      {showCompanionModal && (
        <PvzCompanionModal
          companions={companions}
          onClose={() => setShowCompanionModal(false)}
        />
      )}

      {/* Tactics Modal */}
      {showTacticsModal && (
        <PvzTacticsModal
          tactics={tactics}
          onToggleTactic={handleToggleTactic}
          onClose={() => setShowTacticsModal(false)}
        />
      )}

      {/* Codex Modal */}
      {showCodexModal && (
        <PvzCodexModal
          currentWave={currentWaveIndex + 1}
          onClose={() => setShowCodexModal(false)}
        />
      )}

      {/* Wave Cleared Victory Modal */}
      {waveClearedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg bg-neutral-950 border-2 border-emerald-400 p-6 rounded-xs shadow-[0_0_30px_rgba(16,185,129,0.4)] text-center">
            <div className="w-16 h-16 bg-emerald-950 border-2 border-emerald-400 mx-auto flex items-center justify-center text-3xl rounded-xs mb-3 animate-bounce">
              🏆
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-wider">
              {waveData.nationalReward.title}
            </h2>
            <p className="text-xs text-emerald-400 font-bold mt-1 uppercase">
              VƯỢT QUA VÒNG 0{currentWaveIndex + 1}: {waveData.name}
            </p>

            <div className="p-3 bg-neutral-900 border border-emerald-500/40 rounded-xs my-4 text-xs text-neutral-300 leading-relaxed">
              {waveData.nationalReward.description}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
              <div className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xs">
                <span className="text-neutral-400 block mb-0.5">Lãnh Thổ Mở Rộng:</span>
                <span className="text-emerald-400 font-black text-sm">
                  +{waveData.nationalReward.territoryBonusKm2} km²
                </span>
              </div>
              <div className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xs">
                <span className="text-neutral-400 block mb-0.5">Sức Mạnh Toàn Dân:</span>
                <span className="text-cyan-400 font-black text-sm">
                  +{waveData.nationalReward.statBonusPct}%
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  soundManager.play('click');
                  setShowStageSelectModal(true);
                  setWaveClearedModal(false);
                }}
                className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-black uppercase rounded-xs border border-neutral-600 cursor-pointer"
              >
                🗺️ Bản Đồ
              </button>

              {currentWaveIndex < PVZ_WAVES.length - 1 ? (
                <button
                  onClick={() => {
                    soundManager.play('level_up');
                    handleNextWave();
                  }}
                  className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-black uppercase rounded-xs shadow-[0_0_15px_rgba(16,185,129,0.5)] cursor-pointer"
                >
                  TIẾN VÀO VÒNG TIẾP THEO 👉
                </button>
              ) : (
                <button
                  onClick={() => {
                    soundManager.play('victory');
                    setShowBroadcastModal(true);
                    setWaveClearedModal(false);
                  }}
                  className="flex-1 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-neutral-950 text-xs font-black uppercase rounded-xs shadow-lg cursor-pointer"
                >
                  👑 ĐĂNG QUANG BÁ CHỦ QUỐC VẬN
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-md bg-neutral-950 border-2 border-rose-600 p-6 rounded-xs shadow-[0_0_30px_rgba(225,29,72,0.5)] text-center">
            <div className="w-16 h-16 bg-rose-950 border-2 border-rose-500 mx-auto flex items-center justify-center text-3xl rounded-xs mb-3">
              💀
            </div>
            <h2 className="text-xl font-black text-rose-400 uppercase tracking-wider">
              ZOMBIE ĐÃ XÂM NHẬP CĂN CỨ
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Phòng tuyến đã thất thủ! Hãy bố trí lại thực vật và nâng cấp công nghệ Bác Sĩ Dave!
            </p>

            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                onClick={() => {
                  soundManager.play('click');
                  handleRestart();
                }}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase rounded-xs shadow-lg cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>THỬ LẠI VÒNG NÀY</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PvZ Top Navigation HUD */}
      <PvzHUD
        sunlight={sunlight}
        energy={energy}
        beastCores={beastCores}
        playerLevel={playerLevel}
        currentWave={currentWaveIndex}
        totalWaves={PVZ_WAVES.length}
        stageName={waveData.stageName}
        chapterTitle={waveData.chapterTitle}
        isShovelActive={isShovelActive}
        onToggleShovel={() => setIsShovelActive((s) => !s)}
        onOpenStageSelect={() => setShowStageSelectModal(true)}
        onOpenPathology={() => setShowPathologyModal(true)}
        onOpenBroadcast={() => setShowBroadcastModal(true)}
        onOpenDaveShop={() => setShowDaveShopModal(true)}
        onOpenCompanions={() => setShowCompanionModal(true)}
        onOpenTactics={() => setShowTacticsModal(true)}
        onOpenCodex={() => setShowCodexModal(true)}
        onReturnToWorldSelect={onReturnToWorldSelect}
        currentComment={COMMENTATORS_FEED[currentCommentIndex] || COMMENTATORS_FEED[0]}
      />

      {/* Main Game Stage Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-4 flex flex-col gap-3 justify-center">
        {/* Stage Header Info Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-neutral-900/80 border border-emerald-500/30 rounded-xs shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
              {waveData.chapterTitle.split(':')[0]}
            </span>
            <span className="text-xs sm:text-sm font-black text-white">{waveData.name}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400 font-bold">
            <span className="text-amber-400">
              Quái Vật Xuất Hiện: {waveData.zombieSpawns.length}
            </span>
            <span>•</span>
            <button
              onClick={() => {
                soundManager.play('click');
                setShowStageSelectModal(true);
              }}
              className="text-cyan-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{waveData.stageName}</span>
            </button>
          </div>
        </div>

        {/* 3x6 Garden Combat Board */}
        <PvzGameBoard
          plants={plants}
          zombies={zombies}
          projectiles={projectiles}
          sunDrops={sunDrops}
          damagePopups={damagePopups}
          lawnMowerStates={lawnMowerStates}
          selectedPlantId={selectedPlantId}
          isShovelActive={isShovelActive}
          onCellClick={handleCellClick}
          onCollectSun={handleCollectSun}
          currentWaveIndex={currentWaveIndex}
          nuclearExplosionEffect={nuclearExplosionEffect}
        />

        {/* Plant Seed Selector Tray */}
        <PvzPlantSelector
          selectedPlantId={selectedPlantId}
          onSelectPlant={setSelectedPlantId}
          sunlight={sunlight}
          cooldowns={cooldowns}
          currentWave={maxUnlockedWave}
        />
      </main>
    </div>
  );
};
