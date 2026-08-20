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
  StoryEvent,
  SurvivalStats,
  WavePhase
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
import { PvzSurvivalCampModal } from './components/PvzSurvivalCampModal';
import { PvzPlantMasteryModal, getPlantEffectiveStats, getPlantUpgradeCost } from './components/PvzPlantMasteryModal';
import { Trophy, RotateCcw, Play, CheckCircle2, Skull, Sparkles, MapPin, AlertTriangle } from 'lucide-react';

interface PvzAppProps {
  onReturnToWorldSelect: () => void;
}

const STORAGE_KEY = 'pvz_survival_save_v4';

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
  const [lawnMowerStates, setLawnMowerStates] = useState<LawnMowerState[]>([]);

  // Plant Food & Tools
  const [plantFoodCount, setPlantFoodCount] = useState<number>(1);
  const [isPlantFoodPrimed, setIsPlantFoodPrimed] = useState<boolean>(false);
  const [isWateringCanActive, setIsWateringCanActive] = useState<boolean>(false);
  const [isPossessionMode, setIsPossessionMode] = useState<boolean>(false);
  const [activeJalapenoRows, setActiveJalapenoRows] = useState<number[]>([]);
  const [hugeWaveBanner, setHugeWaveBanner] = useState<string | null>(null);

  // Survival Stats & Camp
  const [survivalStats, setSurvivalStats] = useState<SurvivalStats>({
    foodSupply: 90,
    pureWaterSupply: 85,
    viralResistancePct: 20,
    campMorale: 95,
    landAreaM2: 10
  });

  const [cooldowns, setCooldowns] = useState<Record<PlantId, number>>({
    plant_sunflower: 0,
    plant_peashooter: 0,
    plant_snow_pea: 0,
    plant_chomper: 0,
    plant_squash: 0,
    plant_spikeweed: 0,
    plant_fume_shroom: 0,
    plant_hypno_shroom: 0,
    plant_magnet_shroom: 0,
    plant_gatling_pea: 0,
    plant_pumpkin: 0,
    plant_cherry_bomb: 0,
    plant_jalapeno: 0,
    plant_zombie_wall: 0,
    plant_newspaper_zombie: 0,
    plant_tallnut: 0,
    plant_winter_melon: 0,
    plant_plantern: 0,
    plant_doom_shroom: 0,
    plant_twin_sunflower: 0,
    plant_repeater: 0,
    plant_torchwood: 0,
    plant_lightning_reed: 0,
    plant_bonk_choy: 0,
    plant_blover: 0
  });

  const [selectedPlantId, setSelectedPlantId] = useState<PlantId | null>(null);
  const [isShovelActive, setIsShovelActive] = useState<boolean>(false);
  const [nuclearExplosionEffect, setNuclearExplosionEffect] = useState<boolean>(false);

  // Modals state
  const [showBroadcastModal, setShowBroadcastModal] = useState<boolean>(false);
  const [showDaveShopModal, setShowDaveShopModal] = useState<boolean>(false);
  const [showCompanionModal, setShowCompanionModal] = useState<boolean>(false);
  const [showSurvivalCampModal, setShowSurvivalCampModal] = useState<boolean>(false);
  const [showTacticsModal, setShowTacticsModal] = useState<boolean>(false);
  const [showCodexModal, setShowCodexModal] = useState<boolean>(false);
  const [showStageSelectModal, setShowStageSelectModal] = useState<boolean>(false);
  const [showMasteryModal, setShowMasteryModal] = useState<boolean>(false);
  const [showPathologyModal, setShowPathologyModal] = useState<boolean>(false);
  const [waveClearedModal, setWaveClearedModal] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Plant Leveling & Mastery state
  const [plantLevels, setPlantLevels] = useState<Record<PlantId, number>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.plantLevels) return parsed.plantLevels;
      } catch {}
    }
    return {} as Record<PlantId, number>;
  });

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

  // Calculate Dynamic Grid Dimensions & Land Area
  const landUp1 = daveUpgrades.find((u) => u.id === 'up_land_expansion_1')?.level || 0;
  const landUp2 = daveUpgrades.find((u) => u.id === 'up_land_expansion_2')?.level || 0;
  const landUp3 = daveUpgrades.find((u) => u.id === 'up_land_expansion_3')?.level || 0;
  const landUp4 = daveUpgrades.find((u) => u.id === 'up_land_expansion_4')?.level || 0;

  let gridRows = 3;
  let gridCols = 6;
  let currentAreaM2 = 10;

  if (landUp4 > 0 || playerLevel >= 6) {
    gridRows = 5;
    gridCols = 9;
    currentAreaM2 = 500;
  } else if (landUp3 > 0 || playerLevel >= 4) {
    gridRows = 5;
    gridCols = 8;
    currentAreaM2 = 100;
  } else if (landUp2 > 0 || playerLevel >= 3) {
    gridRows = 4;
    gridCols = 7;
    currentAreaM2 = 50;
  } else if (landUp1 > 0 || playerLevel >= 2) {
    gridRows = 4;
    gridCols = 6;
    currentAreaM2 = 25;
  }

  const plantFoodCapLevel = daveUpgrades.find((u) => u.id === 'up_plant_food_capacity')?.level || 0;
  const maxPlantFood = 3 + plantFoodCapLevel;
  const hasGoldenWateringCan = (daveUpgrades.find((u) => u.id === 'up_golden_watering_can')?.level || 0) > 0;

  const waveData = PVZ_WAVES[currentWaveIndex] || PVZ_WAVES[0];
  const waveStartTimeRef = useRef<number>(Date.now());
  const spawnedIndicesRef = useRef<Set<number>>(new Set());
  const triggeredPhasesRef = useRef<Set<number>>(new Set());

  // References for loop sync
  const plantsRef = useRef<PlacedPlant[]>([]);
  const zombiesRef = useRef<ActiveZombie[]>([]);
  plantsRef.current = plants;
  zombiesRef.current = zombies;

  // Sync Lawnmowers with active rows
  useEffect(() => {
    setLawnMowerStates((prev) => {
      const newMowers: LawnMowerState[] = [];
      for (let r = 0; r < gridRows; r++) {
        const existing = prev.find((m) => m.row === r);
        if (existing) {
          newMowers.push(existing);
        } else {
          newMowers.push({ row: r, active: true, colPosition: 0, isTriggered: false });
        }
      }
      return newMowers;
    });
  }, [gridRows]);

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
    setDamagePopups((prev) => [...prev.slice(-20), newPopup]);
  };

  // Helper function for 3-layer HP damage
  const applyDamageToZombie = (
    z: ActiveZombie,
    rawDmg: number,
    bypassesShield: boolean = false
  ): ActiveZombie => {
    let remainingDmg = rawDmg;
    let curShield = z.shieldHp || 0;
    let curHelm = z.helmHp || 0;
    let curBody = z.bodyHp || 0;
    let isEnraged = z.isEnraged || false;
    let curSpeed = z.speed;
    let isFlying = z.isFlying || false;
    let balloonHp = z.balloonHp || 0;

    // Balloon pop check
    if (isFlying && balloonHp > 0) {
      balloonHp -= remainingDmg;
      if (balloonHp <= 0) {
        isFlying = false;
        balloonHp = 0;
        addDamagePopup(z.row, z.colPosition, '🎈💥 BỂ BÓNG BAY! RƠI XUỐNG ĐẤT!', 'text-amber-400 font-black', true);
        soundManager.play('level_up');
      }
    }

    // 1. Shield Layer (e.g. Newspaper, Screen Door)
    if (!bypassesShield && curShield > 0) {
      const shieldDmg = Math.min(curShield, remainingDmg);
      curShield -= shieldDmg;
      remainingDmg -= shieldDmg;

      // Newspaper breaks -> Enrage!
      if (curShield <= 0 && z.shieldType === 'newspaper' && !isEnraged) {
        isEnraged = true;
        curSpeed = z.baseSpeed * 2.0; // 2x speed when newspaper is broken!
        addDamagePopup(z.row, z.colPosition, '📰💥 RÁCH BÁO! CUỒNG NỘ x2 TỐC ĐỘ!', 'text-pink-400 font-black', true);
        soundManager.play('danger');
      }
    }

    // 2. Helm Layer (e.g. Cone, Bucket, Football, Spore Scale)
    if (remainingDmg > 0 && curHelm > 0) {
      const helmDmg = Math.min(curHelm, remainingDmg);
      curHelm -= helmDmg;
      remainingDmg -= helmDmg;
    }

    // 3. Body Layer
    if (remainingDmg > 0) {
      curBody = Math.max(0, curBody - remainingDmg);
    }

    const totalHp = curBody + curHelm + curShield;
    return {
      ...z,
      shieldHp: curShield,
      helmHp: curHelm,
      bodyHp: curBody,
      hp: totalHp,
      isEnraged,
      isFlying,
      balloonHp,
      speed: curSpeed
    };
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
        if (parsed.plantFoodCount !== undefined) setPlantFoodCount(parsed.plantFoodCount);
        if (parsed.plantLevels) setPlantLevels(parsed.plantLevels);
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
        tactics,
        plantFoodCount,
        plantLevels
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
    tactics,
    plantFoodCount,
    plantLevels
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
      const randRow = Math.floor(Math.random() * gridRows);
      const randCol = Math.floor(Math.random() * gridCols);
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
    }, waveData.weatherCondition === 'night' ? 14000 : 7500);
    return () => clearInterval(interval);
  }, [showPrologue, isGameOver, waveClearedModal, activeStoryEvent, gridRows, gridCols, waveData]);

  // Reset Wave Spawns when wave changes
  useEffect(() => {
    waveStartTimeRef.current = Date.now();
    spawnedIndicesRef.current.clear();
    triggeredPhasesRef.current.clear();
    setZombies([]);
    setProjectiles([]);
    setSunDrops([]);
    setDamagePopups([]);
    setActiveJalapenoRows([]);
    setHugeWaveBanner(null);
    setIsPlantFoodPrimed(false);
    setIsWateringCanActive(false);

    // Initialise Lawnmowers for all active rows
    const initialMowers: LawnMowerState[] = [];
    for (let r = 0; r < gridRows; r++) {
      initialMowers.push({ row: r, active: true, colPosition: 0, isTriggered: false });
    }
    setLawnMowerStates(initialMowers);
  }, [currentWaveIndex, gridRows]);

  // Progress and Phase calculations
  const [waveProgressPct, setWaveProgressPct] = useState<number>(0);
  const [currentPhaseTitle, setCurrentPhaseTitle] = useState<string>('');

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

      // Update Wave Progress
      const rawProgress = Math.min(
        100,
        (elapsedSec / (waveData.totalDurationSec || 120)) * 90 +
          (spawnedIndicesRef.current.size / Math.max(1, waveData.zombieSpawns.length)) * 10
      );
      setWaveProgressPct(rawProgress);

      // Check Phase Transitions & Huge Wave Alarms
      if (waveData.phases) {
        waveData.phases.forEach((phase) => {
          if (!triggeredPhasesRef.current.has(phase.phaseNumber) && elapsedSec >= phase.startDelaySec) {
            triggeredPhasesRef.current.add(phase.phaseNumber);
            setCurrentPhaseTitle(phase.title);

            if (phase.isHugeWave) {
              soundManager.play('danger');
              setHugeWaveBanner(phase.title);
              confetti({ particleCount: 100, spread: 90 });
              setTimeout(() => setHugeWaveBanner(null), 3500);
            }
          }
        });
      }

      // 0. Update Moving Lawnmowers
      setLawnMowerStates((currentMowers) => {
        let updatedMowers = currentMowers.map((m) => {
          if (m.isTriggered && m.active) {
            const nextCol = m.colPosition + 0.45;
            if (nextCol > gridCols + 0.5) {
              return { ...m, active: false, colPosition: gridCols + 0.5 };
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
          const row = spawn.row !== undefined ? spawn.row : Math.floor(Math.random() * gridRows);
          const zDef = PVZ_ZOMBIES[spawn.zombieId] || PVZ_ZOMBIES.zombie_normal;
          const bodyHp = zDef.bodyHp || zDef.maxHp;
          const helmHp = zDef.helmHp || 0;
          const shieldHp = zDef.shieldHp || 0;

          setZombies((prev) => [
            ...prev,
            {
              id: `z_${Date.now()}_${Math.random()}`,
              zombieId: spawn.zombieId,
              row,
              colPosition: gridCols - 0.2,
              bodyHp,
              bodyMaxHp: bodyHp,
              helmHp,
              helmMaxHp: helmHp,
              helmType: zDef.helmType || 'none',
              shieldHp,
              shieldMaxHp: shieldHp,
              shieldType: zDef.shieldType || 'none',
              hp: bodyHp + helmHp + shieldHp,
              maxHp: zDef.maxHp,
              speed: zDef.speed,
              baseSpeed: zDef.speed,
              lastAttackTime: 0,
              isAttacking: false,
              targetPlantId: null,
              slowTimerSec: 0,
              freezeTimerSec: 0,
              stunTimerSec: 0,
              isCharmed: false,
              isEnraged: false,
              isFlying: spawn.zombieId === 'zombie_balloon',
              balloonHp: spawn.zombieId === 'zombie_balloon' ? 20 : 0,
              hasPole: spawn.zombieId === 'zombie_polevaulter',
              hasPogo: spawn.zombieId === 'zombie_pogo',
              isDigging: spawn.zombieId === 'zombie_digger',
              isWalkingBackwards: false,
              hasThrownImp: false,
              armorType: zDef.armorType || 'none',
              hasDisarmedMetal: false
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

          // Plantern 30% speed buff
          const laneHasPlantern = currentPlants.some(
            (other) => other.row === p.row && other.plantId === 'plant_plantern'
          );
          const isOvercharged = p.isOvercharged && (p.overchargeExpire || 0) > now;
          const speedMultiplier = (laneHasPlantern ? 0.7 : 1.0) * (isOvercharged ? 0.5 : 1.0);
          const plantLvl = p.level || plantLevels[p.plantId] || 1;
          const lvlDmgMultiplier = 1 + (plantLvl - 1) * 0.15;

          // Sunflower Produce Sun
          if (p.plantId === 'plant_sunflower') {
            const lastSun = p.lastSunTime || p.lastAttackTime;
            if (now - lastSun >= pDef.attackIntervalSec * 1000 * speedMultiplier) {
              p.lastSunTime = now;
              const bonusLvlSun = plantLvl >= 10 ? 25 : 0;
              addDamagePopup(p.row, p.col, `+${25 + extraSunValue + bonusLvlSun} ☀️`, 'text-amber-300 font-bold');
              setSunDrops((prev) => [
                ...prev,
                {
                  id: `sun_flower_${Date.now()}_${Math.random()}`,
                  row: p.row,
                  col: p.col,
                  value: 25 + extraSunValue + bonusLvlSun,
                  spawnTime: now
                }
              ]);
            }
          }

          // Peashooter (Standard 20 DMG pea)
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
                    damage: Math.round(pDef.attackDmg * peashooterDmgMultiplier * lvlDmgMultiplier),
                    speed: 2.3,
                    type: 'pea'
                  }
                ]);
              }
            }
          }

          // Snow Pea (20 DMG + 0.4x Chill)
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
                    damage: Math.round(pDef.attackDmg * peashooterDmgMultiplier * lvlDmgMultiplier),
                    speed: 2.2,
                    type: 'ice_pea'
                  }
                ]);
              }
            }
          }

          // Winter Melon (80 Heavy DMG + 3x3 Splash + 0.4x Chill)
          if (p.plantId === 'plant_winter_melon') {
            if (now - p.lastAttackTime >= pDef.attackIntervalSec * 1000 * speedMultiplier) {
              const enemyInRow = zombiesRef.current.some(
                (z) => z.row === p.row && z.colPosition > p.col && !z.isCharmed
              );
              if (enemyInRow) {
                p.lastAttackTime = now;
                setProjectiles((prev) => [
                  ...prev,
                  {
                    id: `proj_melon_${Date.now()}_${Math.random()}`,
                    row: p.row,
                    colPosition: p.col + 0.4,
                    damage: pDef.attackDmg,
                    speed: 1.9,
                    type: 'melon_ice',
                    splashRadius: 1.2
                  }
                ]);
              }
            }
          }

          // Spikeweed Continuous Underfoot Damage (also damages diggers underground!)
          if (p.plantId === 'plant_spikeweed') {
            if (now - p.lastAttackTime >= pDef.attackIntervalSec * 1000) {
              const steppingZombie = zombiesRef.current.find(
                (z) => z.row === p.row && Math.abs(z.colPosition - p.col) < 0.45 && !z.isCharmed && !z.isFlying
              );
              if (steppingZombie) {
                p.lastAttackTime = now;
                addDamagePopup(steppingZombie.row, steppingZombie.colPosition, `-${pDef.attackDmg} 🌵`, 'text-lime-300 font-bold');
                setZombies((currentZombies) =>
                  currentZombies.map((z) => {
                    if (z.id === steppingZombie.id) {
                      const damaged = applyDamageToZombie(z, pDef.attackDmg, true);
                      // Spikeweed forces digger above ground
                      if (damaged.isDigging) {
                        damaged.isDigging = false;
                        damaged.isWalkingBackwards = true;
                        addDamagePopup(z.row, z.colPosition, '⛏️ GAI ĐẤT ÉP NGOI LÊN!', 'text-lime-400 font-black', true);
                      }
                      return damaged;
                    }
                    return z;
                  })
                );
              }
            }
          }

          // Chomper (Hoa Ăn Thịt) State Machine (Biting -> Digesting 20s -> Ready)
          if (p.plantId === 'plant_chomper') {
            if (p.state === 'chomper_digesting') {
              if (now >= (p.digestExpire || 0)) {
                p.state = 'idle';
                addDamagePopup(p.row, p.col, '🐊 TIÊU HÓA XONG! SẴN SÀNG!', 'text-purple-300 font-bold');
              }
            } else {
              const targetZombie = zombiesRef.current.find(
                (z) =>
                  z.row === p.row &&
                  z.colPosition >= p.col &&
                  z.colPosition - p.col <= 1.4 &&
                  !z.isCharmed &&
                  !z.isFlying &&
                  !z.isDigging
              );
              if (targetZombie) {
                const zDef = PVZ_ZOMBIES[targetZombie.zombieId];
                p.lastAttackTime = now;
                if (zDef?.isBoss) {
                  // Bite boss for 400 heavy damage
                  setZombies((cur) =>
                    cur.map((z) =>
                      z.id === targetZombie.id ? applyDamageToZombie(z, 400, true) : z
                    )
                  );
                  p.state = 'chomper_digesting';
                  p.digestExpire = now + 12000;
                  addDamagePopup(targetZombie.row, targetZombie.colPosition, '-400 🐊 CẮN XÉ BOSS!', 'text-purple-300 font-black', true);
                  soundManager.play('attack');
                } else {
                  // Instantly devour normal zombie!
                  setZombies((cur) =>
                    cur.map((z) => (z.id === targetZombie.id ? { ...z, hp: 0 } : z))
                  );
                  p.state = 'chomper_digesting';
                  p.digestExpire = now + 20000;
                  addDamagePopup(p.row, p.col, '🐊👅 NUỐT CHỬNG THÂY MA!', 'text-purple-300 font-black', true);
                  soundManager.play('level_up');
                }
              }
            }
          }

          // Squash (Bí Ngô Nghiền Nát) State Machine (Idle -> Look -> Jump -> Fall -> 1800 DMG)
          if (p.plantId === 'plant_squash') {
            if (!p.state || p.state === 'idle') {
              const targetZombie = zombiesRef.current.find(
                (z) =>
                  z.row === p.row &&
                  Math.abs(z.colPosition - p.col) <= 1.2 &&
                  !z.isCharmed &&
                  !z.isFlying &&
                  !z.isDigging
              );
              if (targetZombie) {
                p.state = 'squash_look';
                p.targetCol = targetZombie.colPosition;
                p.stateTimer = now + 400; // 400ms lock-on
                addDamagePopup(p.row, p.col, '👀 BÍ NGÔ NHẮM BẮN!', 'text-yellow-400 font-black');
                soundManager.play('danger');
              }
            } else if (p.state === 'squash_look' && now >= (p.stateTimer || 0)) {
              p.state = 'squash_jump';
              p.stateTimer = now + 350; // 350ms leap in the air
              addDamagePopup(p.row, p.targetCol ?? p.col, '💥 NHẢY VỌT LÊN CAO!', 'text-amber-300 font-black');
            } else if (p.state === 'squash_jump' && now >= (p.stateTimer || 0)) {
              p.state = 'squash_fall';
              const crushCol = p.targetCol ?? p.col;
              setZombies((cur) =>
                cur.map((z) => {
                  if (z.row === p.row && Math.abs(z.colPosition - crushCol) <= 0.6) {
                    addDamagePopup(z.row, z.colPosition, '-1800 💥 ĐÈ BẸP!', 'text-amber-400 font-black', true);
                    return applyDamageToZombie(z, 1800, true);
                  }
                  return z;
                })
              );
              soundManager.play('victory');
              p.hp = 0; // Squash crushed target and sacrificed
            }
          }

          // Magnet-shroom State Machine (Disarm Metal -> Recharging 12s -> Ready)
          if (p.plantId === 'plant_magnet_shroom') {
            if (p.state === 'magnet_recharging') {
              if (now >= (p.stateTimer || 0)) {
                p.state = 'idle';
                addDamagePopup(p.row, p.col, '🧲 TỪ TRƯỜNG HỒI PHỤC!', 'text-sky-300 font-bold');
              }
            } else {
              const metalZombie = zombiesRef.current.find(
                (z) =>
                  Math.abs(z.row - p.row) <= 1 &&
                  Math.abs(z.colPosition - p.col) <= 2.5 &&
                  !z.isCharmed &&
                  !z.hasDisarmedMetal &&
                  (PVZ_ZOMBIES[z.zombieId]?.hasMetalArmor ||
                    z.helmType === 'bucket' ||
                    z.helmType === 'cone' ||
                    z.hasPogo ||
                    z.isDigging ||
                    z.zombieId === 'zombie_digger')
              );
              if (metalZombie) {
                p.lastAttackTime = now;
                p.state = 'magnet_recharging';
                p.stateTimer = now + 12000; // 12s recharge
                soundManager.play('item_get');
                const disarmNotice = metalZombie.hasPogo
                  ? '🧲 HÚT LÒ CÒ KIM LOẠI!'
                  : metalZombie.isDigging
                  ? '🧲 HÚT CUỐC CHIM ĐÀO HẦM!'
                  : '🧲 TƯỚC ĐOẠT MŨ SẮT!';
                addDamagePopup(metalZombie.row, metalZombie.colPosition, disarmNotice, 'text-sky-300 font-black', true);
                setZombies((currentZombies) =>
                  currentZombies.map((z) => {
                    if (z.id === metalZombie.id) {
                      const newHp = (z.bodyHp || 0) + (z.shieldHp || 0);
                      return {
                        ...z,
                        hasDisarmedMetal: true,
                        hasPogo: false,
                        isDigging: false,
                        helmHp: 0,
                        hp: newHp
                      };
                    }
                    return z;
                  })
                );
              }
            }
          }

          // Fume-shroom (Penetrating Spore Wave, bypasses shield)
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
                    bypassesShield: true,
                    hitZombieIds: []
                  }
                ]);
              }
            }
          }

          // Gatling Pea (Rapid Fire 20 DMG)
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

          // Jalapeno Instant Fire Column (800 DMG)
          if (p.plantId === 'plant_jalapeno') {
            if (now - (p.createdTime || p.lastAttackTime) >= 1000) {
              soundManager.play('danger');
              confetti({ particleCount: 120, spread: 100 });
              setActiveJalapenoRows((prev) => [...prev, p.row]);
              setTimeout(() => {
                setActiveJalapenoRows((prev) => prev.filter((r) => r !== p.row));
              }, 1200);

              addDamagePopup(p.row, p.col, '🔥 800 THIÊU RỤI!', 'text-red-400 font-black', true);
              setZombies((currentZombies) =>
                currentZombies.map((z) => {
                  if (z.row === p.row) {
                    addDamagePopup(z.row, z.colPosition, '-800 🔥', 'text-red-400 font-black');
                    return applyDamageToZombie(z, pDef.attackDmg, true);
                  }
                  return z;
                })
              );
              p.hp = 0;
            }
          }

          // Cherry Bomb (500 DMG 3x3)
          if (p.plantId === 'plant_cherry_bomb') {
            if (now - (p.createdTime || p.lastAttackTime) >= 1100) {
              soundManager.play('danger');
              confetti({ particleCount: 80, spread: 85 });
              addDamagePopup(p.row, p.col, '💥 500 BOOM!', 'text-rose-400 font-black', true);
              setZombies((currentZombies) =>
                currentZombies.map((z) => {
                  if (Math.abs(z.row - p.row) <= 1 && Math.abs(z.colPosition - p.col) <= 2) {
                    addDamagePopup(z.row, z.colPosition, '-500', 'text-rose-300 font-bold');
                    return applyDamageToZombie(z, pDef.attackDmg, true);
                  }
                  return z;
                })
              );
              p.hp = 0;
            }
          }

          // Doom-shroom Nuclear Blast (1500 DMG Full Map)
          if (p.plantId === 'plant_doom_shroom') {
            if (now - (p.createdTime || p.lastAttackTime) >= 1200) {
              soundManager.play('danger');
              setNuclearExplosionEffect(true);
              setTimeout(() => setNuclearExplosionEffect(false), 1500);
              confetti({ particleCount: 160, spread: 130 });
              addDamagePopup(1, 3, '☢️ 1500 NỔ HẠT NHÂN!', 'text-purple-300 font-black', true);

              setZombies((currentZombies) =>
                currentZombies.map((z) => {
                  addDamagePopup(z.row, z.colPosition, '-1500', 'text-purple-400 font-black');
                  return applyDamageToZombie(z, pDef.attackDmg, true);
                })
              );
              p.hp = 0;
            }
          }

          // Newspaper Zombie / Zombie Wall Melee
          if (p.plantId === 'plant_zombie_wall' || p.plantId === 'plant_newspaper_zombie') {
            if (now - p.lastAttackTime >= pDef.attackIntervalSec * 1000) {
              const adjacentZombie = zombiesRef.current.find(
                (z) => z.row === p.row && Math.abs(z.colPosition - p.col) < 0.5 && !z.isCharmed
              );
              if (adjacentZombie) {
                p.lastAttackTime = now;
                addDamagePopup(adjacentZombie.row, adjacentZombie.colPosition, `-${pDef.attackDmg} 📰⚔️`, 'text-pink-300');
                setZombies((currentZombies) =>
                  currentZombies.map((z) =>
                    z.id === adjacentZombie.id ? applyDamageToZombie(z, pDef.attackDmg, false) : z
                  )
                );
              }
            }
          }

          // Twin Sunflower (50 Sun per wave)
          if (p.plantId === 'plant_twin_sunflower') {
            const lastSun = p.lastSunTime || p.lastAttackTime;
            if (now - lastSun >= pDef.attackIntervalSec * 1000 * speedMultiplier) {
              p.lastSunTime = now;
              addDamagePopup(p.row, p.col, `+${50 + extraSunValue * 2} ☀️☀️`, 'text-amber-300 font-bold');
              setSunDrops((prev) => [
                ...prev,
                {
                  id: `sun_twin1_${Date.now()}_${Math.random()}`,
                  row: p.row,
                  col: Math.max(0, p.col - 0.2),
                  value: 25 + extraSunValue,
                  spawnTime: now
                },
                {
                  id: `sun_twin2_${Date.now()}_${Math.random()}`,
                  row: p.row,
                  col: Math.min(gridCols - 1, p.col + 0.2),
                  value: 25 + extraSunValue,
                  spawnTime: now
                }
              ]);
            }
          }

          // Repeater (Bắn 2 viên đậu liên hoàn 20x2 DMG)
          if (p.plantId === 'plant_repeater') {
            if (now - p.lastAttackTime >= pDef.attackIntervalSec * 1000 * speedMultiplier) {
              const enemyInRow = zombiesRef.current.some(
                (z) => z.row === p.row && z.colPosition > p.col && !z.isCharmed
              );
              if (enemyInRow) {
                p.lastAttackTime = now;
                setProjectiles((prev) => [
                  ...prev,
                  {
                    id: `proj_rep1_${Date.now()}_${Math.random()}`,
                    row: p.row,
                    colPosition: p.col + 0.4,
                    damage: Math.round(pDef.attackDmg * peashooterDmgMultiplier),
                    speed: 2.3,
                    type: 'pea'
                  },
                  {
                    id: `proj_rep2_${Date.now()}_${Math.random()}`,
                    row: p.row,
                    colPosition: p.col + 0.1,
                    damage: Math.round(pDef.attackDmg * peashooterDmgMultiplier),
                    speed: 2.3,
                    type: 'pea'
                  }
                ]);
              }
            }
          }

          // Lightning Reed (Tia sét lan 3 mục tiêu)
          if (p.plantId === 'plant_lightning_reed') {
            if (now - p.lastAttackTime >= pDef.attackIntervalSec * 1000 * speedMultiplier) {
              const targets = zombiesRef.current
                .filter((z) => !z.isCharmed && z.colPosition >= p.col - 0.5)
                .slice(0, 3);
              if (targets.length > 0) {
                p.lastAttackTime = now;
                targets.forEach((tz) => {
                  addDamagePopup(tz.row, tz.colPosition, `-${pDef.attackDmg} ⚡`, 'text-cyan-300 font-bold');
                  setZombies((currentZombies) =>
                    currentZombies.map((z) =>
                      z.id === tz.id ? applyDamageToZombie(z, pDef.attackDmg, true) : z
                    )
                  );
                });
                setProjectiles((prev) => [
                  ...prev,
                  {
                    id: `proj_light_${Date.now()}_${Math.random()}`,
                    row: p.row,
                    colPosition: p.col + 0.5,
                    damage: pDef.attackDmg,
                    speed: 3.5,
                    type: 'lightning'
                  }
                ]);
              }
            }
          }

          // Bonk Choy (Đấm liên hoàn cận chiến 30 DMG / 0.35s cả trước & sau)
          if (p.plantId === 'plant_bonk_choy') {
            if (now - p.lastAttackTime >= pDef.attackIntervalSec * 1000 * speedMultiplier) {
              const meleeZombie = zombiesRef.current.find(
                (z) => z.row === p.row && Math.abs(z.colPosition - p.col) <= 1.2 && !z.isCharmed && !z.isFlying
              );
              if (meleeZombie) {
                p.lastAttackTime = now;
                addDamagePopup(meleeZombie.row, meleeZombie.colPosition, `-${pDef.attackDmg} 🥊`, 'text-lime-300 font-black');
                soundManager.play('attack');
                setZombies((currentZombies) =>
                  currentZombies.map((z) =>
                    z.id === meleeZombie.id ? applyDamageToZombie(z, pDef.attackDmg, false) : z
                  )
                );
              }
            }
          }

          // Blover (Thổi bay tất cả zombie bay và sương mù)
          if (p.plantId === 'plant_blover') {
            if (now - (p.createdTime || p.lastAttackTime) >= 800) {
              soundManager.play('victory');
              confetti({ particleCount: 70, spread: 80 });
              addDamagePopup(p.row, p.col, '🌪️🍀 THỔI BAY BẦU TRỜI!', 'text-teal-300 font-black', true);
              setZombies((currentZombies) =>
                currentZombies.map((z) => {
                  if (z.isFlying || z.zombieId === 'zombie_balloon' || z.zombieId === 'zombie_seagull') {
                    addDamagePopup(z.row, z.colPosition, '💨 THỔI BAY KHỎI SÂN!', 'text-teal-400 font-black', true);
                    return { ...z, hp: 0 };
                  }
                  return z;
                })
              );
              p.hp = 0;
            }
          }
        });

        return updatedPlants.filter((p) => p.hp > 0);
      });

      // 3. Move Projectiles & Check Collisions
      setProjectiles((currentProjectiles) => {
        let updated = currentProjectiles.map((proj) => {
          const nextCol = proj.colPosition + proj.speed * 0.1;
          // Check Torchwood passing
          if (proj.type === 'pea') {
            const hasTorchwood = plantsRef.current.some(
              (p) => p.row === proj.row && p.plantId === 'plant_torchwood' && Math.abs(p.col - nextCol) < 0.6
            );
            if (hasTorchwood) {
              return {
                ...proj,
                colPosition: nextCol,
                type: 'fireball',
                damage: Math.round(proj.damage * 2)
              };
            }
          }
          return {
            ...proj,
            colPosition: nextCol
          };
        });

        updated = updated.filter((proj) => {
          let hitAny = false;

          setZombies((currentZombies) =>
            currentZombies.map((z) => {
              if (z.isCharmed) return z;
              // Digger underground avoids normal bullets unless fume_wave or splash
              if (z.isDigging && proj.type !== 'fume_wave' && !proj.splashRadius) return z;

              // Direct hit check
              const isDirectHit = z.row === proj.row && Math.abs(z.colPosition - proj.colPosition) < 0.35;

              // Splash hit check for Winter Melon
              const isSplashHit =
                proj.splashRadius &&
                Math.abs(z.row - proj.row) <= 1 &&
                Math.abs(z.colPosition - proj.colPosition) <= (proj.splashRadius || 1.2);

              if (!isDirectHit && !isSplashHit) return z;

              if (isDirectHit) {
                if (proj.penetrating) {
                  if (proj.hitZombieIds && proj.hitZombieIds.includes(z.id)) return z;
                  if (!proj.hitZombieIds) proj.hitZombieIds = [];
                  proj.hitZombieIds.push(z.id);
                } else {
                  hitAny = true;
                }
              }

              soundManager.play('attack');

              let finalDmg = proj.damage;
              if (z.armorType === 'spore_scale' && proj.type === 'pea') {
                finalDmg = Math.round(finalDmg * 0.5); // Spore scale 50% resistance against normal pea
              }

              let nextSlow = z.slowTimerSec || 0;
              if (proj.type === 'ice_pea' || proj.type === 'melon_ice') {
                nextSlow = 4.5;
                addDamagePopup(z.row, z.colPosition, '❄️ CHILLED (0.4x)!', 'text-cyan-300 font-black');
              }

              if (isSporeSlowActive && proj.type === 'fume_wave' && nextSlow > 0) {
                finalDmg = Math.round(finalDmg * 1.35);
                addDamagePopup(z.row, z.colPosition, `-${finalDmg} XUYÊN GIÁP!`, 'text-fuchsia-300 font-black', true);
              } else {
                addDamagePopup(
                  z.row,
                  z.colPosition,
                  `-${finalDmg}`,
                  proj.type === 'ice_pea' || proj.type === 'melon_ice' ? 'text-cyan-300' : 'text-emerald-300'
                );
              }

              if (isVolleyActive && proj.colPosition > gridCols - 2) {
                finalDmg = Math.round(finalDmg * 1.2);
              }

              // Apply 3-layer HP damage
              const damagedZombie = applyDamageToZombie(z, finalDmg, !!proj.bypassesShield);

              return {
                ...damagedZombie,
                slowTimerSec: nextSlow
              };
            })
          );

          if (proj.penetrating) {
            return proj.colPosition < gridCols + 0.5;
          }
          return !hitAny && proj.colPosition < gridCols + 0.5;
        });

        return updated;
      });

      // 4. Move Zombies & Attack
      setZombies((currentZombies) => {
        let spawnedImps: ActiveZombie[] = [];

        let updatedZombies: ActiveZombie[] = currentZombies.map((z): ActiveZombie => {
          const zDef = PVZ_ZOMBIES[z.zombieId] || PVZ_ZOMBIES.zombie_normal;
          const currentSlow = Math.max(0, (z.slowTimerSec || 0) - 0.1);
          const currentFreeze = Math.max(0, (z.freezeTimerSec || 0) - 0.1);
          const currentStun = Math.max(0, (z.stunTimerSec || 0) - 0.1);

          // Gargantuar 50% HP Imp Throw
          let hasThrownImp = z.hasThrownImp;
          if (
            (z.zombieId === 'zombie_boss_gargantuar' || z.zombieId === 'zombie_boss_lion_king') &&
            !hasThrownImp &&
            z.hp <= z.maxHp * 0.5
          ) {
            hasThrownImp = true;
            const impDef = PVZ_ZOMBIES.zombie_imp;
            const targetImpCol = Math.max(1.5, z.colPosition - 2.5);
            spawnedImps.push({
              id: `imp_${Date.now()}_${Math.random()}`,
              zombieId: 'zombie_imp',
              row: z.row,
              colPosition: targetImpCol,
              bodyHp: impDef.bodyHp,
              bodyMaxHp: impDef.bodyHp,
              helmHp: 0,
              helmMaxHp: 0,
              helmType: 'none',
              shieldHp: 0,
              shieldMaxHp: 0,
              shieldType: 'none',
              hp: impDef.maxHp,
              maxHp: impDef.maxHp,
              speed: impDef.speed,
              baseSpeed: impDef.speed,
              lastAttackTime: 0,
              isAttacking: false,
              targetPlantId: null,
              slowTimerSec: 0,
              freezeTimerSec: 0,
              stunTimerSec: 0,
              isCharmed: false,
              isEnraged: false,
              armorType: 'none',
              hasDisarmedMetal: false
            });
            addDamagePopup(z.row, z.colPosition, '👶💥 NÉM QUỶ NHỎ IMP!', 'text-yellow-400 font-black', true);
            soundManager.play('danger');
          }

          // If frozen solid or stunned, cannot move or attack
          if (currentFreeze > 0 || currentStun > 0) {
            return {
              ...z,
              freezeTimerSec: currentFreeze,
              stunTimerSec: currentStun,
              slowTimerSec: currentSlow,
              hasThrownImp,
              isAttacking: false
            };
          }

          // Exact GOTY chilled speed factor (0.4x speed)
          const baseMovingSpeed = z.isEnraged ? z.baseSpeed * 2.0 : z.baseSpeed || z.speed;
          const effectiveSpeed = currentSlow > 0 ? baseMovingSpeed * 0.4 : baseMovingSpeed;

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
                  hasThrownImp,
                  isAttacking: true,
                  lastAttackTime: now
                };
              }
              return { ...z, slowTimerSec: currentSlow, hasThrownImp, isAttacking: true };
            } else {
              const newPos = z.colPosition + effectiveSpeed * 0.1;
              return {
                ...z,
                colPosition: newPos,
                slowTimerSec: currentSlow,
                hasThrownImp,
                isAttacking: false
              };
            }
          }

          // Digger Zombie Digging Underground to house then popping up
          if (z.isDigging) {
            const newPos = z.colPosition - (effectiveSpeed * 1.3) * 0.1;
            if (newPos <= 0.6) {
              addDamagePopup(z.row, 0.6, '⛏️ NGOI LÊN TỪ LÒNG ĐẤT!', 'text-amber-400 font-black', true);
              soundManager.play('danger');
              return {
                ...z,
                colPosition: 0.6,
                isDigging: false,
                isWalkingBackwards: true,
                speed: 0.22,
                baseSpeed: 0.22,
                slowTimerSec: currentSlow,
                hasThrownImp,
                isAttacking: false
              };
            }
            return {
              ...z,
              colPosition: newPos,
              slowTimerSec: currentSlow,
              hasThrownImp,
              isAttacking: false
            };
          }

          // Balloon Zombie Flies Over All Plants
          if (z.isFlying) {
            const newPos = z.colPosition - effectiveSpeed * 0.1;
            return {
              ...z,
              colPosition: newPos,
              slowTimerSec: currentSlow,
              hasThrownImp,
              isAttacking: false
            };
          }

          // Digger Walking Backwards (bites plants from behind)
          if (z.isWalkingBackwards) {
            const blockingPlantBehind = plantsRef.current.find(
              (p) =>
                p.row === z.row &&
                p.plantId !== 'plant_spikeweed' &&
                Math.abs(z.colPosition - p.col) < 0.35 &&
                z.colPosition <= p.col
            );

            if (blockingPlantBehind) {
              if (now - z.lastAttackTime >= zDef.attackIntervalSec * 1000) {
                setPlants((prevPlants) =>
                  prevPlants.map((p) =>
                    p.id === blockingPlantBehind.id ? { ...p, hp: p.hp - zDef.attackDmg } : p
                  )
                );
                addDamagePopup(z.row, blockingPlantBehind.col, `-${zDef.attackDmg} ⛏️🦷`, 'text-rose-400 font-bold');
                return {
                  ...z,
                  slowTimerSec: currentSlow,
                  hasThrownImp,
                  isAttacking: true,
                  targetPlantId: blockingPlantBehind.id,
                  lastAttackTime: now
                };
              }
              return {
                ...z,
                slowTimerSec: currentSlow,
                hasThrownImp,
                isAttacking: true,
                targetPlantId: blockingPlantBehind.id
              };
            } else {
              const newPos = z.colPosition + effectiveSpeed * 0.1;
              return {
                ...z,
                colPosition: newPos,
                slowTimerSec: currentSlow,
                hasThrownImp,
                isAttacking: false,
                targetPlantId: null
              };
            }
          }

          // Standard Zombie Check Blocking Plant
          const blockingPlant = plantsRef.current.find(
            (p) =>
              p.row === z.row &&
              p.plantId !== 'plant_spikeweed' &&
              Math.abs(z.colPosition - p.col) < 0.35 &&
              z.colPosition >= p.col
          );

          if (blockingPlant) {
            // Polevaulter Vault Mechanic
            if (z.hasPole) {
              if (blockingPlant.plantId === 'plant_tallnut') {
                addDamagePopup(z.row, z.colPosition, '🗿 TƯỢNG ĐÁ CHẶN ĐỨNG NHẢY SÀO!', 'text-yellow-400 font-black', true);
                soundManager.play('danger');
                return {
                  ...z,
                  hasPole: false,
                  speed: z.baseSpeed * 0.5,
                  baseSpeed: z.baseSpeed * 0.5,
                  slowTimerSec: currentSlow,
                  hasThrownImp,
                  isAttacking: true,
                  targetPlantId: blockingPlant.id
                };
              } else {
                addDamagePopup(z.row, z.colPosition, '🏃‍♂️💨 NHẢY VỤT QUA CÂY!', 'text-cyan-300 font-black', true);
                soundManager.play('level_up');
                return {
                  ...z,
                  hasPole: false,
                  colPosition: Math.max(0.2, z.colPosition - 1.1),
                  speed: z.baseSpeed * 0.45,
                  baseSpeed: z.baseSpeed * 0.45,
                  slowTimerSec: currentSlow,
                  hasThrownImp,
                  isAttacking: false
                };
              }
            }

            // Pogo Zombie Jump Mechanic
            if (z.hasPogo) {
              if (blockingPlant.plantId === 'plant_tallnut') {
                addDamagePopup(z.row, z.colPosition, '🗿 TƯỢNG ĐÁ LÀM GÃY LÒ CÒ!', 'text-yellow-400 font-black', true);
                soundManager.play('danger');
                return {
                  ...z,
                  hasPogo: false,
                  slowTimerSec: currentSlow,
                  hasThrownImp,
                  isAttacking: true,
                  targetPlantId: blockingPlant.id
                };
              } else {
                addDamagePopup(z.row, z.colPosition, '🦘 NHẢY LÒ CÒ QUA!', 'text-lime-300 font-bold');
                return {
                  ...z,
                  colPosition: Math.max(0.2, z.colPosition - 0.75),
                  slowTimerSec: currentSlow,
                  hasThrownImp,
                  isAttacking: false
                };
              }
            }

            // Hypno-shroom check
            if (blockingPlant.plantId === 'plant_hypno_shroom') {
              soundManager.play('level_up');
              setPlants((prev) => prev.filter((p) => p.id !== blockingPlant.id));
              addDamagePopup(z.row, z.colPosition, '💖 THÔI MIÊN!', 'text-pink-400 font-black', true);
              return {
                ...z,
                isCharmed: true,
                slowTimerSec: currentSlow,
                hasThrownImp,
                isAttacking: false
              };
            }

            if (now - z.lastAttackTime >= zDef.attackIntervalSec * 1000) {
              setPlants((prevPlants) =>
                prevPlants.map((p) => {
                  if (p.id === blockingPlant.id) {
                    if (p.hasPumpkinShell && (p.pumpkinHp || 0) > 0) {
                      const newPumpkinHp = Math.max(0, (p.pumpkinHp || 0) - zDef.attackDmg);
                      if (newPumpkinHp <= 0) {
                        addDamagePopup(p.row, p.col, '🎃 KHIÊN BÍ NGÔ ĐÃ VỠ!', 'text-orange-400 font-black', true);
                        return { ...p, hasPumpkinShell: false, pumpkinHp: 0 };
                      }
                      return { ...p, pumpkinHp: newPumpkinHp };
                    }
                    return { ...p, hp: p.hp - zDef.attackDmg };
                  }
                  return p;
                })
              );
              addDamagePopup(z.row, blockingPlant.col, `-${zDef.attackDmg} 🦷`, 'text-rose-400');
              return {
                ...z,
                slowTimerSec: currentSlow,
                hasThrownImp,
                isAttacking: true,
                targetPlantId: blockingPlant.id,
                lastAttackTime: now
              };
            }
            return {
              ...z,
              slowTimerSec: currentSlow,
              hasThrownImp,
              isAttacking: true,
              targetPlantId: blockingPlant.id
            };
          } else {
            const newPos = z.colPosition - effectiveSpeed * 0.1;
            return {
              ...z,
              colPosition: newPos,
              slowTimerSec: currentSlow,
              hasThrownImp,
              isAttacking: false,
              targetPlantId: null
            };
          }
        });

        if (spawnedImps.length > 0) {
          updatedZombies = [...updatedZombies, ...spawnedImps];
        }

        // 5. Check Zombie Death & Drop Rewards / Plant Food
        updatedZombies = updatedZombies.filter((z) => {
          if (z.hp <= 0 || (z.isCharmed && z.colPosition > gridCols + 0.5)) {
            const zDef = PVZ_ZOMBIES[z.zombieId] || PVZ_ZOMBIES.zombie_normal;
            setSunlight((s) => s + zDef.rewardSun);
            setEnergy((e) => e + zDef.rewardEnergy + extraRecycleEnergy);

            // Chance to drop Plant Food from bosses / elites
            if (zDef.isBoss || Math.random() < 0.12) {
              setPlantFoodCount((c) => Math.min(maxPlantFood, c + 1));
              addDamagePopup(z.row, z.colPosition, '+1 ⚡ HẠT NĂNG LƯỢNG!', 'text-emerald-300 font-black', true);
            }

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
              const targetMower = mowers.find((m) => m.row === z.row);
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

      if (allSpawned && nonCharmedZombies.length === 0 && elapsedSec > 15 && !waveClearedModal) {
        soundManager.play('level_up');
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.4 } });

        const clearEvent = PVZ_STORY_EVENTS.find(
          (e) => e.waveIndex === currentWaveIndex && e.trigger === 'wave_clear' && !seenStoryEvents.includes(e.id)
        );
        if (clearEvent) {
          setActiveStoryEvent(clearEvent);
          setSeenStoryEvents((prev) => (prev.includes(clearEvent.id) ? prev : [...prev, clearEvent.id]));
        }

        setWaveClearedModal(true);
        if (currentWaveIndex + 1 > maxUnlockedWave) {
          setMaxUnlockedWave(currentWaveIndex + 1);
        }

        setPlayerLevel((lvl) => lvl + 1);

        setNationalStats((ns) => ({
          ...ns,
          territoryKm2: ns.territoryKm2 + waveData.nationalReward.territoryBonusKm2,
          populationLifeBonusMonths:
            ns.populationLifeBonusMonths + (waveData.nationalReward.populationBonusMonths || 1),
          nationalStrengthBonusPct:
            ns.nationalStrengthBonusPct + waveData.nationalReward.statBonusPct
        }));

        setSurvivalStats((ss) => ({
          ...ss,
          foodSupply: Math.min(100, ss.foodSupply + 15),
          pureWaterSupply: Math.min(100, ss.pureWaterSupply + 10),
          viralResistancePct: Math.min(100, ss.viralResistancePct + 8),
          landAreaM2: currentAreaM2
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
            if (c.id === 'comp_yosuke' && currentWaveIndex >= 4) {
              return { ...c, isUnlocked: true };
            }
            if (c.id === 'comp_duong_tuong_quan' && currentWaveIndex >= 5) {
              return { ...c, isUnlocked: true };
            }
            return c;
          })
        );
      }
    }, 100);

    return () => clearInterval(gameLoop);
  }, [
    showPrologue,
    isGameOver,
    waveClearedModal,
    activeStoryEvent,
    waveData,
    gridRows,
    gridCols,
    daveUpgrades,
    tactics,
    currentWaveIndex,
    seenStoryEvents,
    maxPlantFood,
    currentAreaM2
  ]);

  // Handle Plant Upgrade in Mastery Modal
  const handleUpgradePlant = (plantId: PlantId): boolean => {
    const curLvl = plantLevels[plantId] || 1;
    if (curLvl >= 10) return false;
    const cost = getPlantUpgradeCost(curLvl);
    if (energy < cost.costEnergy || beastCores < cost.costBeastCore) return false;

    setEnergy((e) => e - cost.costEnergy);
    setBeastCores((b) => b - cost.costBeastCore);
    setPlantLevels((prev) => ({
      ...prev,
      [plantId]: curLvl + 1
    }));
    return true;
  };

  // Handle Plant Placement
  const handleCellClick = (row: number, col: number) => {
    if (isShovelActive) {
      setPlants((prev) => prev.filter((p) => !(p.row === row && p.col === col)));
      setIsShovelActive(false);
      soundManager.play('click');
      return;
    }

    if (!selectedPlantId) return;

    const plantDef = PVZ_PLANTS.find((p) => p.id === selectedPlantId);
    if (!plantDef) return;

    const plantLvl = plantLevels[selectedPlantId] || 1;
    const stats = getPlantEffectiveStats(plantDef, plantLvl);

    if (sunlight < stats.effectiveSunCost) return;

    const existingPlant = plants.find((p) => p.row === row && p.col === col);
    if (existingPlant) {
      // 1. Upgrade Peashooter -> Gatling Pea
      if (selectedPlantId === 'plant_gatling_pea' && existingPlant.plantId === 'plant_peashooter') {
        soundManager.play('level_up');
        setSunlight((s) => s - stats.effectiveSunCost);
        setCooldowns((prev) => ({ ...prev, [selectedPlantId]: stats.effectiveCooldown }));
        setPlants((prev) =>
          prev.map((p) =>
            p.id === existingPlant.id
              ? { ...p, plantId: 'plant_gatling_pea', hp: stats.effectiveHp, maxHp: stats.effectiveHp, level: plantLvl }
              : p
          )
        );
        addDamagePopup(row, col, '🔫 NÂNG CẤP GATLING PEA 4 NÒNG!', 'text-lime-400 font-black', true);
        setSelectedPlantId(null);
        return;
      }

      // 2. Wrap existing plant in Pumpkin Shell Armor
      if (selectedPlantId === 'plant_pumpkin' && !existingPlant.hasPumpkinShell) {
        soundManager.play('item_get');
        setSunlight((s) => s - stats.effectiveSunCost);
        setCooldowns((prev) => ({ ...prev, [selectedPlantId]: stats.effectiveCooldown }));
        setPlants((prev) =>
          prev.map((p) =>
            p.id === existingPlant.id
              ? { ...p, hasPumpkinShell: true, pumpkinHp: stats.effectiveHp, pumpkinMaxHp: stats.effectiveHp }
              : p
          )
        );
        addDamagePopup(row, col, `🎃 TRÙM KHIÊN BÍ NGÔ (+${stats.effectiveHp} GIÁP)!`, 'text-orange-400 font-black', true);
        setSelectedPlantId(null);
        return;
      }

      return;
    }

    soundManager.play('item_get');
    setSunlight((s) => s - stats.effectiveSunCost);
    setCooldowns((prev) => ({ ...prev, [selectedPlantId]: stats.effectiveCooldown }));

    setPlants((prev) => [
      ...prev,
      {
        id: `p_${Date.now()}_${Math.random()}`,
        plantId: selectedPlantId,
        row,
        col,
        hp: stats.effectiveHp,
        maxHp: stats.effectiveHp,
        level: plantLvl,
        lastAttackTime: Date.now(),
        createdTime: Date.now(),
        state: 'idle'
      }
    ]);

    setSelectedPlantId(null);
  };

  // Handle Applying Plant Food or Golden Watering Can on Plant Click
  const handlePlantClick = (plant: PlacedPlant) => {
    // 1. Plant Food Ultimate Activation
    if (isPlantFoodPrimed && plantFoodCount > 0) {
      soundManager.play('level_up');
      confetti({ particleCount: 100, spread: 80 });
      setPlantFoodCount((c) => Math.max(0, c - 1));
      setIsPlantFoodPrimed(false);

      const plantDef = PVZ_PLANTS.find((p) => p.id === plant.plantId);
      addDamagePopup(plant.row, plant.col, `⚡ CHIÊU CUỐI: ${plantDef?.plantFoodUlt?.name || 'BÙNG NỔ'}!`, 'text-emerald-300 font-black', true);

      // Sunflower Ult: Drop 150 sun
      if (plant.plantId === 'plant_sunflower') {
        setSunlight((s) => s + 150);
        addDamagePopup(plant.row, plant.col, '+150 ☀️ BÙNG NỔ MẶT TRỜI!', 'text-amber-300 font-black', true);
      }

      // Chomper Ult: Devour 3 closest zombies on the row
      if (plant.plantId === 'plant_chomper') {
        setZombies((currentZombies) => {
          let count = 0;
          return currentZombies.map((z) => {
            if (z.row === plant.row && z.colPosition >= plant.col && count < 3 && !z.isCharmed) {
              count++;
              addDamagePopup(z.row, z.colPosition, '🐊🌪️ ĐẠI HẤP THU NUỐT CHỬNG!', 'text-purple-300 font-black', true);
              return { ...z, hp: 0 };
            }
            return z;
          });
        });
        soundManager.play('victory');
      }

      // Squash Ult: Mega crush entire lane
      if (plant.plantId === 'plant_squash') {
        setZombies((currentZombies) =>
          currentZombies.map((z) => {
            if (z.row === plant.row && !z.isCharmed) {
              addDamagePopup(z.row, z.colPosition, '-2500 💥 ĐẠI BÍ NGÔ ĐÈ BẸP!', 'text-amber-400 font-black', true);
              return applyDamageToZombie(z, 2500, true);
            }
            return z;
          })
        );
        soundManager.play('victory');
        setPlants((prev) => prev.filter((p) => p.id !== plant.id));
      }

      // Peashooter / Gatling Ult: 80 pea barrage
      if (plant.plantId === 'plant_peashooter' || plant.plantId === 'plant_gatling_pea') {
        for (let i = 0; i < 15; i++) {
          setTimeout(() => {
            setProjectiles((prev) => [
              ...prev,
              {
                id: `proj_ult_${Date.now()}_${Math.random()}`,
                row: plant.row,
                colPosition: plant.col + 0.3 + i * 0.15,
                damage: 35,
                speed: 3.5,
                type: 'gatling'
              }
            ]);
          }, i * 60);
        }
      }

      // Snow Pea / Winter Melon Ult: Freeze all zombies
      if (plant.plantId === 'plant_snow_pea' || plant.plantId === 'plant_winter_melon') {
        setZombies((currentZombies) =>
          currentZombies.map((z) => {
            addDamagePopup(z.row, z.colPosition, '🧊 ĐÓNG BĂNG TOÀN SÂN!', 'text-cyan-300 font-black', true);
            return {
              ...z,
              freezeTimerSec: 6.0,
              hp: z.hp - 100
            };
          })
        );
      }

      // Fume-shroom Ult: Gigantic spore wave
      if (plant.plantId === 'plant_fume_shroom') {
        setProjectiles((prev) => [
          ...prev,
          {
            id: `proj_fume_ult_${Date.now()}`,
            row: plant.row,
            colPosition: plant.col + 0.4,
            damage: 250,
            speed: 2.2,
            type: 'fume_wave',
            penetrating: true,
            hitZombieIds: []
          }
        ]);
      }

      // Tallnut / Pumpkin Ult: Diamond Shield
      if (plant.plantId === 'plant_tallnut' || plant.plantId === 'plant_pumpkin') {
        setPlants((prev) =>
          prev.map((p) =>
            p.id === plant.id
              ? { ...p, hp: p.maxHp + 1500, maxHp: p.maxHp + 1500, isOvercharged: true, overchargeExpire: Date.now() + 15000 }
              : p
          )
        );
      }

      // Twin Sunflower Ult: Drop 250 Sun
      if (plant.plantId === 'plant_twin_sunflower') {
        setSunlight((s) => s + 250);
        addDamagePopup(plant.row, plant.col, '+250 ☀️👑 SIÊU NĂNG LƯỢNG HOÀNG KIM!', 'text-amber-300 font-black', true);
      }

      // Repeater Ult: 30 pea barrage + giant pea
      if (plant.plantId === 'plant_repeater') {
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            setProjectiles((prev) => [
              ...prev,
              {
                id: `proj_rep_ult_${Date.now()}_${Math.random()}`,
                row: plant.row,
                colPosition: plant.col + 0.3 + i * 0.1,
                damage: 40,
                speed: 3.5,
                type: 'pea'
              }
            ]);
          }, i * 50);
        }
        setTimeout(() => {
          setProjectiles((prev) => [
            ...prev,
            {
              id: `proj_rep_mega_${Date.now()}`,
              row: plant.row,
              colPosition: plant.col + 0.5,
              damage: 600,
              speed: 2.8,
              type: 'gatling',
              splashRadius: 1.0
            }
          ]);
        }, 1100);
      }

      // Torchwood Ult: Blue Fire
      if (plant.plantId === 'plant_torchwood') {
        setPlants((prev) =>
          prev.map((p) =>
            p.id === plant.id
              ? { ...p, isOvercharged: true, overchargeExpire: Date.now() + 60000, hp: p.maxHp + 500 }
              : p
          )
        );
        addDamagePopup(plant.row, plant.col, '🔥💙 HỎA NGỤC LAM QUANG (x3 DMG)!', 'text-cyan-300 font-black', true);
      }

      // Lightning Reed Ult: Board Thunderstorm
      if (plant.plantId === 'plant_lightning_reed') {
        setZombies((currentZombies) =>
          currentZombies.map((z) => {
            addDamagePopup(z.row, z.colPosition, '-300 🌩️⚡ BÃO SẤM CHỚP!', 'text-cyan-300 font-black', true);
            return applyDamageToZombie(z, 300, true);
          })
        );
      }

      // Bonk Choy Ult: 360-degree Hundred Fist (1200 DMG)
      if (plant.plantId === 'plant_bonk_choy') {
        setZombies((currentZombies) =>
          currentZombies.map((z) => {
            if (Math.abs(z.row - plant.row) <= 1 && Math.abs(z.colPosition - plant.col) <= 1.5) {
              addDamagePopup(z.row, z.colPosition, '-1200 🥊🌪️ BÁCH LIỆT THẦN QUYỀN!', 'text-lime-300 font-black', true);
              return applyDamageToZombie(z, 1200, true);
            }
            return z;
          })
        );
        soundManager.play('victory');
      }

      return;
    }

    // 2. Golden Watering Can
    if (isWateringCanActive) {
      soundManager.play('item_get');
      setIsWateringCanActive(false);
      setPlants((prev) =>
        prev.map((p) =>
          p.id === plant.id
            ? { ...p, hp: p.maxHp, isOvercharged: true, overchargeExpire: Date.now() + 12000 }
            : p
        )
      );
      addDamagePopup(plant.row, plant.col, '🫖 HỒI PHỤC 100% & +50% TỐC ĐÁNH!', 'text-cyan-300 font-black', true);
    }
  };

  // Handle Manual Fire in Possession Mode
  const handleManualFire = (row: number, col: number) => {
    soundManager.play('attack');
    addDamagePopup(row, col, '🎯 LAZE TỰ DO!', 'text-red-400 font-bold');
    setProjectiles((prev) => [
      ...prev,
      {
        id: `proj_laser_${Date.now()}_${Math.random()}`,
        row,
        colPosition: 0.5,
        damage: 65,
        speed: 3.5,
        type: 'laser'
      }
    ]);
  };

  const handleCollectSun = (sunId: string, value: number) => {
    setSunlight((s) => s + value);
    setSunDrops((prev) => prev.filter((sd) => sd.id !== sunId));
  };

  const handleDaveUpgrade = (upgradeId: string) => {
    setDaveUpgrades((prev) =>
      prev.map((u) => {
        if (u.id === upgradeId) {
          const costEnergy = u.costEnergy * (u.level + 1);
          const costCores = u.costBeastCore ? u.costBeastCore * (u.level + 1) : 0;
          if (energy >= costEnergy && beastCores >= costCores) {
            setEnergy((e) => e - costEnergy);
            if (costCores > 0) setBeastCores((bc) => bc - costCores);
            return { ...u, level: u.level + 1 };
          }
        }
        return u;
      })
    );
  };

  const handleAssignCompanion = (companionId: string, task: string) => {
    setCompanions((prev) =>
      prev.map((c) => (c.id === companionId ? { ...c, assignedTask: task } : c))
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Prologue Introduction modal if first time */}
      {showPrologue && (
        <PvzPrologueIntro
          onComplete={() => {
            setShowPrologue(false);
          }}
        />
      )}

      {/* Story Dialogue Events */}
      {activeStoryEvent && (
        <PvzStoryEventModal
          event={activeStoryEvent}
          onClose={() => setActiveStoryEvent(null)}
        />
      )}

      {/* Huge Wave Banner Overlay */}
      {hugeWaveBanner && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center animate-bounce">
          <div className="bg-rose-950/95 border-2 border-rose-500 text-rose-200 px-6 py-2 rounded-xs font-mono font-black text-sm sm:text-base shadow-[0_0_30px_rgba(225,29,72,0.9)] flex items-center gap-2 uppercase tracking-widest">
            <AlertTriangle className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span>{hugeWaveBanner}</span>
          </div>
        </div>
      )}

      {/* Top HUD */}
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
        onToggleShovel={() => setIsShovelActive((prev) => !prev)}
        plantFoodCount={plantFoodCount}
        maxPlantFood={maxPlantFood}
        isPlantFoodPrimed={isPlantFoodPrimed}
        onTogglePlantFood={() => setIsPlantFoodPrimed((prev) => !prev)}
        hasWateringCan={hasGoldenWateringCan}
        isWateringCanActive={isWateringCanActive}
        onToggleWateringCan={() => setIsWateringCanActive((prev) => !prev)}
        isPossessionMode={isPossessionMode}
        onTogglePossession={() => setIsPossessionMode((prev) => !prev)}
        onOpenStageSelect={() => setShowStageSelectModal(true)}
        onOpenMastery={() => setShowMasteryModal(true)}
        onOpenPathology={() => setShowPathologyModal(true)}
        onOpenBroadcast={() => setShowBroadcastModal(true)}
        onOpenDaveShop={() => setShowDaveShopModal(true)}
        onOpenCompanions={() => setShowCompanionModal(true)}
        onOpenSurvivalCamp={() => setShowSurvivalCampModal(true)}
        onOpenTactics={() => setShowTacticsModal(true)}
        onOpenCodex={() => setShowCodexModal(true)}
        onReturnToWorldSelect={onReturnToWorldSelect}
        currentComment={COMMENTATORS_FEED[currentCommentIndex] || COMMENTATORS_FEED[0]}
        waveProgressPct={waveProgressPct}
        currentPhaseTitle={currentPhaseTitle}
        phases={waveData.phases}
        survivalStats={survivalStats}
      />

      {/* Main Game Arena */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 max-w-6xl w-full mx-auto gap-3">
        {/* Game Board */}
        <PvzGameBoard
          plants={plants}
          zombies={zombies}
          projectiles={projectiles}
          sunDrops={sunDrops}
          damagePopups={damagePopups}
          lawnMowerStates={lawnMowerStates}
          selectedPlantId={selectedPlantId}
          isShovelActive={isShovelActive}
          isPlantFoodPrimed={isPlantFoodPrimed}
          isWateringCanActive={isWateringCanActive}
          isPossessionMode={isPossessionMode}
          onCellClick={handleCellClick}
          onPlantClick={handlePlantClick}
          onCollectSun={handleCollectSun}
          onManualFire={handleManualFire}
          currentWaveIndex={currentWaveIndex}
          nuclearExplosionEffect={nuclearExplosionEffect}
          weatherCondition={waveData.weatherCondition}
          rows={gridRows}
          cols={gridCols}
          activeJalapenoRows={activeJalapenoRows}
        />

        {/* Bottom Plant Selector Bar */}
        <PvzPlantSelector
          selectedPlantId={selectedPlantId}
          onSelectPlant={setSelectedPlantId}
          sunlight={sunlight}
          cooldowns={cooldowns}
          currentWave={currentWaveIndex}
          isPlantFoodPrimed={isPlantFoodPrimed}
          plantLevels={plantLevels}
        />
      </main>

      {/* Wave Cleared Victory Modal */}
      {waveClearedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-mono select-none">
          <div className="w-full max-w-lg bg-neutral-950 border-2 border-amber-400 p-6 rounded-xs shadow-2xl text-center flex flex-col items-center">
            <div className="text-5xl mb-2 animate-bounce">🏆🌟</div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-300 uppercase tracking-wider mb-1">
              CHIẾN THẮNG {waveData.name.split(':')[0]}!
            </h2>
            <div className="text-xs text-neutral-300 mb-4">{waveData.chapterTitle}</div>

            <div className="w-full bg-neutral-900 border border-amber-500/40 p-4 rounded-xs text-left text-xs mb-4">
              <div className="text-amber-400 font-black mb-1 flex items-center gap-1.5">
                <span>🌍 PHẦN THƯỞNG VẬN MỆNH QUỐC GIA:</span>
              </div>
              <div className="text-white font-bold text-sm mb-1">{waveData.nationalReward.title}</div>
              <p className="text-neutral-300 mb-2">{waveData.nationalReward.description}</p>
              <div className="grid grid-cols-2 gap-2 text-emerald-400 font-bold border-t border-neutral-800 pt-2 text-[11px]">
                <div>• Mở rộng lãnh thổ: +{waveData.nationalReward.territoryBonusKm2} km²</div>
                <div>• Chỉ số toàn dân: +{waveData.nationalReward.statBonusPct}%</div>
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => {
                  soundManager.play('click');
                  setWaveClearedModal(false);
                  if (currentWaveIndex < PVZ_WAVES.length - 1) {
                    setCurrentWaveIndex((w) => w + 1);
                  }
                }}
                className="flex-1 py-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xs cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <span>TIẾP TỤC VÒNG TIẾP THEO</span>
                <span>👉</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md font-mono select-none">
          <div className="w-full max-w-md bg-neutral-950 border-2 border-rose-600 p-6 rounded-xs shadow-2xl text-center flex flex-col items-center">
            <div className="text-5xl mb-2 animate-pulse">💀⚠️</div>
            <h2 className="text-xl font-black text-rose-500 uppercase tracking-wider mb-2">
              PHÒNG TUYẾN THẤT THỦ!
            </h2>
            <p className="text-xs text-neutral-400 mb-4">
              Zombie đã vượt qua máy cắt cỏ và xâm nhập vào khu đất vườn của Tuyết Mộc.
            </p>

            <button
              onClick={() => {
                soundManager.play('click');
                setIsGameOver(false);
                setSunlight(150);
                setZombies([]);
                setProjectiles([]);
                setPlants([]);
                waveStartTimeRef.current = Date.now();
                spawnedIndicesRef.current.clear();
              }}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider rounded-xs cursor-pointer shadow-lg"
            >
              THỬ LẠI VÒNG NÀY
            </button>
          </div>
        </div>
      )}

      {/* Other Modals */}
      {showBroadcastModal && (
        <PvzNationalBroadcastModal
          nationalStats={nationalStats}
          currentWave={currentWaveIndex}
          onClose={() => setShowBroadcastModal(false)}
        />
      )}

      {showDaveShopModal && (
        <PvzDaveShopModal
          energy={energy}
          beastCores={beastCores}
          upgrades={daveUpgrades}
          onUpgrade={handleDaveUpgrade}
          onClose={() => setShowDaveShopModal(false)}
        />
      )}

      {showCompanionModal && (
        <PvzCompanionModal
          companions={companions}
          onClose={() => setShowCompanionModal(false)}
        />
      )}

      {showSurvivalCampModal && (
        <PvzSurvivalCampModal
          companions={companions}
          survivalStats={survivalStats}
          onAssignCompanion={handleAssignCompanion}
          onClose={() => setShowSurvivalCampModal(false)}
        />
      )}

      {showTacticsModal && (
        <PvzTacticsModal
          tactics={tactics}
          onToggleTactic={(id) => {
            setTactics((prev) =>
              prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t))
            );
          }}
          onClose={() => setShowTacticsModal(false)}
        />
      )}

      {showCodexModal && (
        <PvzCodexModal
          currentWave={currentWaveIndex}
          onClose={() => setShowCodexModal(false)}
        />
      )}

      {showStageSelectModal && (
        <PvzStageSelectModal
          currentWaveIndex={currentWaveIndex}
          maxUnlockedWave={maxUnlockedWave}
          onSelectWave={(stageIdx) => {
            setCurrentWaveIndex(stageIdx);
            setShowStageSelectModal(false);
          }}
          onClose={() => setShowStageSelectModal(false)}
        />
      )}

      {showMasteryModal && (
        <PvzPlantMasteryModal
          plantLevels={plantLevels}
          energy={energy}
          beastCores={beastCores}
          currentWave={currentWaveIndex}
          onUpgradePlant={handleUpgradePlant}
          onClose={() => setShowMasteryModal(false)}
        />
      )}

      {showPathologyModal && (
        <PvzPathologyModal
          playerLevel={playerLevel}
          beastCores={beastCores}
          onClose={() => setShowPathologyModal(false)}
        />
      )}
    </div>
  );
};
