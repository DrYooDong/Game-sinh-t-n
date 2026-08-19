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
  PvzTactic
} from './types';
import {
  PVZ_PLANTS,
  PVZ_ZOMBIES,
  PVZ_WAVES,
  COMMENTATORS_FEED,
  PVZ_COMPANIONS,
  PVZ_DAVE_UPGRADES,
  PVZ_TACTICS
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
import { Trophy, RotateCcw, Play, CheckCircle2, Skull } from 'lucide-react';

interface PvzAppProps {
  onReturnToWorldSelect: () => void;
}

const STORAGE_KEY = 'pvz_survival_save_v1';

export const PvzApp: React.FC<PvzAppProps> = ({ onReturnToWorldSelect }) => {
  // Game state
  const [showPrologue, setShowPrologue] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return !saved;
  });

  const [sunlight, setSunlight] = useState<number>(150);
  const [energy, setEnergy] = useState<number>(10);
  const [playerLevel, setPlayerLevel] = useState<number>(1);
  const [currentWaveIndex, setCurrentWaveIndex] = useState<number>(0);
  const [plants, setPlants] = useState<PlacedPlant[]>([]);
  const [zombies, setZombies] = useState<ActiveZombie[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [sunDrops, setSunDrops] = useState<SunDrop[]>([]);
  const [cooldowns, setCooldowns] = useState<Record<PlantId, number>>({
    plant_sunflower: 0,
    plant_peashooter: 0,
    plant_pumpkin: 0,
    plant_cherry_bomb: 0,
    plant_zombie_wall: 0,
    plant_tallnut: 0
  });
  const [lawnMowers, setLawnMowers] = useState<boolean[]>([true, true, true]);
  const [selectedPlantId, setSelectedPlantId] = useState<PlantId | null>(null);
  const [isShovelActive, setIsShovelActive] = useState<boolean>(false);

  // Modals state
  const [showBroadcastModal, setShowBroadcastModal] = useState<boolean>(false);
  const [showDaveShopModal, setShowDaveShopModal] = useState<boolean>(false);
  const [showCompanionModal, setShowCompanionModal] = useState<boolean>(false);
  const [showTacticsModal, setShowTacticsModal] = useState<boolean>(false);
  const [showCodexModal, setShowCodexModal] = useState<boolean>(false);
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
    worldRank: 1
  });

  const waveData = PVZ_WAVES[currentWaveIndex] || PVZ_WAVES[0];
  const waveStartTimeRef = useRef<number>(Date.now());
  const spawnedIndicesRef = useRef<Set<number>>(new Set());

  // References to avoid interval teardown on every 100ms state update
  const plantsRef = useRef<PlacedPlant[]>([]);
  const zombiesRef = useRef<ActiveZombie[]>([]);
  plantsRef.current = plants;
  zombiesRef.current = zombies;

  // Load Saved Game
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSunlight(parsed.sunlight ?? 150);
        setEnergy(parsed.energy ?? 10);
        setPlayerLevel(parsed.playerLevel ?? 1);
        setCurrentWaveIndex(parsed.currentWaveIndex ?? 0);
        setNationalStats(parsed.nationalStats ?? nationalStats);
        if (parsed.daveUpgrades) setDaveUpgrades(parsed.daveUpgrades);
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
        playerLevel,
        currentWaveIndex,
        nationalStats,
        daveUpgrades,
        tactics
      })
    );
  }, [sunlight, energy, playerLevel, currentWaveIndex, nationalStats, daveUpgrades, tactics]);

  // Commentator Rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCommentIndex((prev) => (prev + 1) % COMMENTATORS_FEED.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Cooldown Decrement Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCooldowns((prev) => {
        const updated: Record<PlantId, number> = { ...prev };
        (Object.keys(updated) as PlantId[]).forEach((k) => {
          if (updated[k] > 0) updated[k] = Math.max(0, updated[k] - 0.2);
        });
        return updated;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Natural Sky Sun Spawner
  useEffect(() => {
    if (showPrologue || isGameOver || waveClearedModal) return;
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
    }, 9000);
    return () => clearInterval(interval);
  }, [showPrologue, isGameOver, waveClearedModal]);

  // Reset Wave Spawns when wave changes
  useEffect(() => {
    waveStartTimeRef.current = Date.now();
    spawnedIndicesRef.current.clear();
    setZombies([]);
    setProjectiles([]);
    setSunDrops([]);
  }, [currentWaveIndex]);

  // Main Real-Time Combat Game Loop (100ms tick)
  useEffect(() => {
    if (showPrologue || isGameOver || waveClearedModal) return;

    // Check Upgrade Multipliers
    const sunBonusUpgrade = daveUpgrades.find((u) => u.id === 'up_sun_efficiency')?.level || 0;
    const extraSunValue = sunBonusUpgrade * 10;
    const peashooterDmgUpgrade = daveUpgrades.find((u) => u.id === 'up_gatling_pea')?.level || 0;
    const peashooterDmgMultiplier = 1 + peashooterDmgUpgrade * 0.15;
    const recycleUpgrade = daveUpgrades.find((u) => u.id === 'up_zombie_recycle')?.level || 0;
    const extraRecycleEnergy = recycleUpgrade * 5;

    const gameLoop = setInterval(() => {
      const now = Date.now();
      const elapsedSec = (now - waveStartTimeRef.current) / 1000;

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
              targetPlantId: null
            }
          ]);
        }
      });

      // 2. Sunflower Sunlight Production & Peashooter Attack
      setPlants((currentPlants) => {
        let updatedPlants = [...currentPlants];

        updatedPlants.forEach((p) => {
          const pDef = PVZ_PLANTS.find((pi) => pi.id === p.plantId);
          if (!pDef) return;

          // Sunflower Produce Sun
          if (p.plantId === 'plant_sunflower') {
            const lastSun = p.lastSunTime || p.lastAttackTime;
            if (now - lastSun >= pDef.attackIntervalSec * 1000) {
              p.lastSunTime = now;
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

          // Peashooter Shoot
          if (p.plantId === 'plant_peashooter') {
            if (now - p.lastAttackTime >= pDef.attackIntervalSec * 1000) {
              const zombieInRow = zombiesRef.current.some((z) => z.row === p.row && z.colPosition > p.col);
              if (zombieInRow) {
                p.lastAttackTime = now;
                setProjectiles((prev) => [
                  ...prev,
                  {
                    id: `proj_${Date.now()}_${Math.random()}`,
                    row: p.row,
                    colPosition: p.col + 0.4,
                    damage: Math.round(pDef.attackDmg * peashooterDmgMultiplier),
                    speed: 2.2
                  }
                ]);
              }
            }
          }

          // Cherry Bomb Explosion
          if (p.plantId === 'plant_cherry_bomb') {
            if (now - p.lastAttackTime >= 1200) {
              soundManager.play('danger');
              confetti({ particleCount: 60, spread: 70 });
              setZombies((currentZombies) =>
                currentZombies.map((z) => {
                  if (Math.abs(z.row - p.row) <= 1 && Math.abs(z.colPosition - p.col) <= 2) {
                    return { ...z, hp: z.hp - pDef.attackDmg };
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
        let updated = currentProjectiles.map((proj) => ({
          ...proj,
          colPosition: proj.colPosition + proj.speed * 0.1
        }));

        updated = updated.filter((proj) => {
          let hit = false;
          setZombies((currentZombies) =>
            currentZombies.map((z) => {
              if (z.row === proj.row && Math.abs(z.colPosition - proj.colPosition) < 0.28) {
                hit = true;
                soundManager.play('attack');
                return { ...z, hp: z.hp - proj.damage };
              }
              return z;
            })
          );
          return !hit && proj.colPosition < 6.2;
        });

        return updated;
      });

      // 4. Move Zombies & Attack Plants
      setZombies((currentZombies) => {
        let updatedZombies = currentZombies.map((z) => {
          const zDef = PVZ_ZOMBIES[z.zombieId] || PVZ_ZOMBIES.zombie_normal;

          const blockingPlant = plantsRef.current.find(
            (p) => p.row === z.row && Math.abs(z.colPosition - p.col) < 0.35 && z.colPosition >= p.col
          );

          if (blockingPlant) {
            if (now - z.lastAttackTime >= zDef.attackIntervalSec * 1000) {
              setPlants((prevPlants) =>
                prevPlants.map((p) =>
                  p.id === blockingPlant.id ? { ...p, hp: p.hp - zDef.attackDmg } : p
                )
              );
              return {
                ...z,
                isAttacking: true,
                targetPlantId: blockingPlant.id,
                lastAttackTime: now
              };
            }
            return { ...z, isAttacking: true, targetPlantId: blockingPlant.id };
          } else {
            const newPos = z.colPosition - z.speed * 0.1;
            return { ...z, colPosition: newPos, isAttacking: false, targetPlantId: null };
          }
        });

        // 5. Check Zombie Death
        updatedZombies = updatedZombies.filter((z) => {
          if (z.hp <= 0) {
            const zDef = PVZ_ZOMBIES[z.zombieId] || PVZ_ZOMBIES.zombie_normal;
            setSunlight((s) => s + zDef.rewardSun);
            setEnergy((e) => e + zDef.rewardEnergy + extraRecycleEnergy);
            soundManager.play('victory');
            return false;
          }
          return true;
        });

        // 6. Check House Infiltration
        updatedZombies.forEach((z) => {
          if (z.colPosition <= 0) {
            if (lawnMowers[z.row]) {
              soundManager.play('danger');
              confetti({ particleCount: 80, spread: 80 });
              setLawnMowers((lm) => {
                const nextLm = [...lm];
                nextLm[z.row] = false;
                return nextLm;
              });
              updatedZombies = updatedZombies.filter((otherZ) => otherZ.row !== z.row);
            } else {
              soundManager.play('danger');
              setIsGameOver(true);
            }
          }
        });

        return updatedZombies;
      });

      // 7. Check Wave Cleared Condition
      const allSpawned = spawnedIndicesRef.current.size >= waveData.zombieSpawns.length;
      if (allSpawned && zombiesRef.current.length === 0 && elapsedSec > 8 && !waveClearedModal) {
        soundManager.play('level_up');
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.4 } });
        setWaveClearedModal(true);
        setPlayerLevel((lvl) => lvl + 1);
        setNationalStats((ns) => ({
          ...ns,
          territoryKm2: ns.territoryKm2 + waveData.nationalReward.territoryBonusKm2,
          populationLifeBonusMonths: ns.populationLifeBonusMonths + 1,
          nationalStrengthBonusPct: ns.nationalStrengthBonusPct + waveData.nationalReward.statBonusPct
        }));

        // Unlock Đường Long after wave 3
        if (currentWaveIndex >= 2) {
          setCompanions((prev) =>
            prev.map((c) => (c.id === 'comp_duong_long' ? { ...c, isUnlocked: true } : c))
          );
        }
      }
    }, 100);

    return () => clearInterval(gameLoop);
  }, [
    showPrologue,
    isGameOver,
    waveClearedModal,
    currentWaveIndex,
    lawnMowers,
    daveUpgrades
  ]);

  // Handle Cell Click (Plant or Shovel)
  const handleCellClick = (row: number, col: number) => {
    const existingPlant = plants.find((p) => p.row === row && p.col === col);

    if (isShovelActive) {
      if (existingPlant) {
        soundManager.play('click');
        setPlants((prev) => prev.filter((p) => p.id !== existingPlant.id));
      }
      setIsShovelActive(false);
      return;
    }

    if (selectedPlantId && !existingPlant) {
      const pDef = PVZ_PLANTS.find((p) => p.id === selectedPlantId);
      if (!pDef || sunlight < pDef.sunCost) return;

      soundManager.play('item_get');
      setSunlight((s) => s - pDef.sunCost);
      setCooldowns((cd) => ({ ...cd, [selectedPlantId]: pDef.cooldownSec }));

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
    const cost = item.costEnergy * (item.level + 1);
    if (energy < cost) return;

    setEnergy((e) => e - cost);
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
      setLawnMowers([true, true, true]);
    }
  };

  // Restart Wave / Game
  const handleRestart = () => {
    setIsGameOver(false);
    setWaveClearedModal(false);
    setPlants([]);
    setZombies([]);
    setProjectiles([]);
    setSunDrops([]);
    setLawnMowers([true, true, true]);
    setSunlight(150);
    waveStartTimeRef.current = Date.now();
    spawnedIndicesRef.current.clear();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between font-mono select-none">
      {/* HUD Bar */}
      <PvzHUD
        sunlight={sunlight}
        energy={energy}
        playerLevel={playerLevel}
        currentWave={currentWaveIndex + 1}
        totalWaves={PVZ_WAVES.length}
        stageName={waveData.stageName}
        isShovelActive={isShovelActive}
        onToggleShovel={() => {
          setSelectedPlantId(null);
          setIsShovelActive((prev) => !prev);
        }}
        onOpenBroadcast={() => setShowBroadcastModal(true)}
        onOpenDaveShop={() => setShowDaveShopModal(true)}
        onOpenCompanions={() => setShowCompanionModal(true)}
        onOpenTactics={() => setShowTacticsModal(true)}
        onOpenCodex={() => setShowCodexModal(true)}
        onReturnToWorldSelect={onReturnToWorldSelect}
        currentComment={COMMENTATORS_FEED[currentCommentIndex]}
      />

      {/* Main Battle Lawn Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 gap-4">
        {/* Stage Title Banner */}
        <div className="w-full max-w-5xl flex items-center justify-between px-3 py-1.5 bg-neutral-900/80 border border-emerald-500/30 rounded-xs text-xs">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-black uppercase">{waveData.name}</span>
            <span className="text-neutral-500 hidden sm:inline">•</span>
            <span className="text-neutral-400 hidden sm:inline">{waveData.stageName}</span>
          </div>
          <div className="text-amber-400 font-bold">
            Zombie Còn Lại: {zombies.length + Math.max(0, waveData.zombieSpawns.length - spawnedIndicesRef.current.size)}
          </div>
        </div>

        {/* Real-time Battlefield Grid */}
        <PvzGameBoard
          plants={plants}
          zombies={zombies}
          projectiles={projectiles}
          sunDrops={sunDrops}
          selectedPlantId={selectedPlantId}
          isShovelActive={isShovelActive}
          onCellClick={handleCellClick}
          onCollectSun={handleCollectSun}
          lawnMowers={lawnMowers}
        />

        {/* Plant Cards Selector */}
        <div className="w-full max-w-5xl">
          <PvzPlantSelector
            selectedPlantId={selectedPlantId}
            onSelectPlant={(pId) => {
              setIsShovelActive(false);
              setSelectedPlantId(pId);
            }}
            sunlight={sunlight}
            cooldowns={cooldowns}
          />
        </div>
      </main>

      {/* Footer Info */}
      <footer className="w-full bg-neutral-950/80 border-t border-neutral-900 p-2 text-center text-[10px] text-neutral-500">
        Vận Mệnh Quốc Gia: Vườn Sinh Tồn • Nhấp chuột để gieo trồng và thu hoạch Nắng
      </footer>

      {/* Prologue Intro Modal */}
      {showPrologue && (
        <PvzPrologueIntro
          onComplete={() => {
            setShowPrologue(false);
          }}
        />
      )}

      {/* National Live Broadcast Modal */}
      {showBroadcastModal && (
        <PvzNationalBroadcastModal
          nationalStats={nationalStats}
          onClose={() => setShowBroadcastModal(false)}
        />
      )}

      {/* Crazy Dave's Shop Modal */}
      {showDaveShopModal && (
        <PvzDaveShopModal
          energy={energy}
          upgrades={daveUpgrades}
          onUpgrade={handleUpgradeDaveItem}
          onClose={() => setShowDaveShopModal(false)}
        />
      )}

      {/* Companions Modal */}
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

      {/* Codex & Lore Modal */}
      {showCodexModal && (
        <PvzCodexModal
          currentWave={currentWaveIndex + 1}
          onClose={() => setShowCodexModal(false)}
        />
      )}

      {/* Wave Victory & National Reward Modal */}
      {waveClearedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm font-mono">
          <div className="w-full max-w-lg bg-neutral-950 border-2 border-emerald-500 p-6 shadow-2xl text-center rounded-xs space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              🏆
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider">
              CHIẾN THẮNG {waveData.name.toUpperCase()}!
            </h3>

            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xs text-left space-y-2">
              <div className="text-xs font-black text-amber-400 uppercase">
                {waveData.nationalReward.title}
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {waveData.nationalReward.description}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs font-bold text-emerald-400 border-t border-neutral-800">
                <span>Lãnh Thổ: +{waveData.nationalReward.territoryBonusKm2} km²</span>
                <span>Sức Mạnh: +{waveData.nationalReward.statBonusPct}%</span>
              </div>
            </div>

            <button
              onClick={handleNextWave}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xs cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.4)]"
            >
              {currentWaveIndex < PVZ_WAVES.length - 1
                ? 'TIẾN VÀO GIAI ĐOẠN TIẾP THEO'
                : 'HOÀN THÀNH TOÀN BỘ CHIẾN DỊCH QUỐC VẬN!'}
            </button>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md font-mono">
          <div className="w-full max-w-md bg-neutral-950 border-2 border-rose-600 p-6 shadow-2xl text-center rounded-xs space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-rose-950 border border-rose-500 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(225,29,72,0.6)]">
              <Skull className="w-8 h-8 text-rose-500" />
            </div>

            <h3 className="text-lg font-black text-rose-400 uppercase tracking-wider">
              ZOMBIE ĐÃ ĐỘT NHẬP CĂN CỨ!
            </h3>

            <p className="text-xs text-neutral-300">
              Phòng tuyến thực vật đã bị chọc thủng. Hãy bố trí lại đội hình Đậu Pháo và Hoa Hướng Dương hợp lý hơn!
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleRestart}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase rounded-xs cursor-pointer"
              >
                THỬ LẠI VÒNG NÀY
              </button>
              <button
                onClick={onReturnToWorldSelect}
                className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs uppercase rounded-xs cursor-pointer"
              >
                ĐỔI THẾ GIỚI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
