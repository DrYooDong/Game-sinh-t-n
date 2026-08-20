import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../pvz2/utils/audio';

interface PvzMinigamesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardCoins: (amount: number) => void;
}

type MinigameMode = 'menu' | 'vasebreaker' | 'bowling' | 'izombie';

interface VaseTile {
  id: string;
  row: number;
  col: number;
  isBroken: boolean;
  type: 'plant' | 'zombie';
  contentId: string;
  name: string;
  image: string;
  hp?: number;
}

interface ActiveMinigameZombie {
  id: string;
  row: number;
  x: number; // 0 to 100%
  type: string;
  hp: number;
  maxHp: number;
  speed: number;
  image: string;
  isEating?: boolean;
}

interface ActiveMinigamePlant {
  id: string;
  row: number;
  col: number;
  type: string;
  hp: number;
  maxHp: number;
  image: string;
  lastShotTime: number;
}

interface BowlingBall {
  id: string;
  row: number;
  col: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'wallnut' | 'explode';
}

export const PvzMinigamesModal: React.FC<PvzMinigamesModalProps> = ({
  isOpen,
  onClose,
  onRewardCoins
}) => {
  const [currentMode, setCurrentMode] = useState<MinigameMode>('menu');
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameLost, setGameLost] = useState<boolean>(false);

  // --- 1. VASEBREAKER STATE ---
  const [vases, setVases] = useState<VaseTile[]>([]);
  const [heldPlant, setHeldPlant] = useState<{ type: string; name: string; image: string } | null>(null);
  const [vasePlants, setVasePlants] = useState<ActiveMinigamePlant[]>([]);
  const [vaseZombies, setVaseZombies] = useState<ActiveMinigameZombie[]>([]);

  // --- 2. BOWLING STATE ---
  const [conveyorQueue, setConveyorQueue] = useState<('wallnut' | 'explode')[]>([]);
  const [selectedBall, setSelectedBall] = useState<'wallnut' | 'explode' | null>(null);
  const [activeBalls, setActiveBalls] = useState<BowlingBall[]>([]);
  const [bowlingZombies, setBowlingZombies] = useState<ActiveMinigameZombie[]>([]);
  const [bowlingScore, setBowlingScore] = useState<number>(0);

  // --- 3. I, ZOMBIE STATE ---
  const [brainEnergy, setBrainEnergy] = useState<number>(200);
  const [iZombieDefenders, setIZombieDefenders] = useState<ActiveMinigamePlant[]>([]);
  const [iZombieAttackers, setIZombieAttackers] = useState<ActiveMinigameZombie[]>([]);
  const [brainsRemaining, setBrainsRemaining] = useState<number[]>([1, 1, 1, 1, 1]); // 5 rows

  const gameLoopRef = useRef<number | null>(null);

  // Initialize selected game mode
  useEffect(() => {
    if (!isOpen) {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      return;
    }

    if (currentMode === 'vasebreaker') {
      initVasebreaker();
    } else if (currentMode === 'bowling') {
      initBowling();
    } else if (currentMode === 'izombie') {
      initIZombie();
    }
  }, [currentMode, isOpen]);

  // Clean up loop on close
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, []);

  // ==========================================
  //  1. VASEBREAKER LOGIC
  // ==========================================
  const initVasebreaker = () => {
    setGameWon(false);
    setGameLost(false);
    setHeldPlant(null);
    setVasePlants([]);
    setVaseZombies([]);

    const newVases: VaseTile[] = [];
    const contents: { type: 'plant' | 'zombie'; contentId: string; name: string; image: string }[] = [
      // Plants
      { type: 'plant', contentId: 'peashooter', name: 'Đậu Xanh', image: '/pvz_assets/plants/plant_peashooter.png' },
      { type: 'plant', contentId: 'peashooter', name: 'Đậu Xanh', image: '/pvz_assets/plants/plant_peashooter.png' },
      { type: 'plant', contentId: 'peashooter', name: 'Đậu Xanh', image: '/pvz_assets/plants/plant_peashooter.png' },
      { type: 'plant', contentId: 'snow_pea', name: 'Đậu Băng', image: '/pvz_assets/plants/plant_snow_pea.png' },
      { type: 'plant', contentId: 'snow_pea', name: 'Đậu Băng', image: '/pvz_assets/plants/plant_snow_pea.png' },
      { type: 'plant', contentId: 'repeater', name: 'Đậu Kép', image: '/pvz_assets/plants/plant_repeater.png' },
      { type: 'plant', contentId: 'squash', name: 'Bí Ngô', image: '/pvz_assets/plants/plant_squash.png' },
      { type: 'plant', contentId: 'squash', name: 'Bí Ngô', image: '/pvz_assets/plants/plant_squash.png' },
      { type: 'plant', contentId: 'wallnut', name: 'Hạt Dẻ', image: '/pvz_assets/plants/giant_walnut.png' },
      // Zombies
      { type: 'zombie', contentId: 'normal', name: 'Zombie', image: '/pvz_assets/zombies/zombie_normal.png' },
      { type: 'zombie', contentId: 'normal', name: 'Zombie', image: '/pvz_assets/zombies/zombie_normal.png' },
      { type: 'zombie', contentId: 'normal', name: 'Zombie', image: '/pvz_assets/zombies/zombie_normal.png' },
      { type: 'zombie', contentId: 'conehead', name: 'Nón Giao Thông', image: '/pvz_assets/zombies/zombie_conehead.png' },
      { type: 'zombie', contentId: 'conehead', name: 'Nón Giao Thông', image: '/pvz_assets/zombies/zombie_conehead.png' },
      { type: 'zombie', contentId: 'buckethead', name: 'Xô Sắt', image: '/pvz_assets/zombies/zombie_buckethead.png' },
      { type: 'zombie', contentId: 'gargantuar', name: 'Gargantuar', image: '/pvz_assets/zombies/zombie_gargantuar.png' }
    ];

    // Shuffle contents
    for (let i = contents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [contents[i], contents[j]] = [contents[j], contents[i]];
    }

    let cIdx = 0;
    // Fill right 4 columns of 5 rows (20 vases)
    for (let r = 0; r < 5; r++) {
      for (let c = 5; c < 9; c++) {
        const item = contents[cIdx % contents.length];
        cIdx++;
        newVases.push({
          id: `vase_${r}_${c}`,
          row: r,
          col: c,
          isBroken: false,
          type: item.type,
          contentId: item.contentId,
          name: item.name,
          image: item.image
        });
      }
    }

    setVases(newVases);
  };

  const handleBreakVase = (vase: VaseTile) => {
    if (vase.isBroken || gameWon || gameLost) return;
    sound.playOriginalSfx('hit_splat');

    setVases(prev => prev.map(v => v.id === vase.id ? { ...v, isBroken: true } : v));

    if (vase.type === 'plant') {
      sound.playSunPickup();
      setHeldPlant({ type: vase.contentId, name: vase.name, image: vase.image });
    } else {
      sound.playZombieGroan();
      const hpMap: Record<string, number> = { normal: 200, conehead: 400, buckethead: 700, gargantuar: 1500 };
      const newZombie: ActiveMinigameZombie = {
        id: `vz_${Date.now()}_${Math.random()}`,
        row: vase.row,
        x: vase.col * 11 + 5,
        type: vase.contentId,
        hp: hpMap[vase.contentId] || 200,
        maxHp: hpMap[vase.contentId] || 200,
        speed: vase.contentId === 'gargantuar' ? 0.04 : 0.08,
        image: vase.image
      };
      setVaseZombies(prev => [...prev, newZombie]);
    }
  };

  const handlePlantOnTile = (row: number, col: number) => {
    if (!heldPlant || gameWon || gameLost) return;
    const hasVase = vases.some(v => v.row === row && v.col === col && !v.isBroken);
    const hasPlant = vasePlants.some(p => p.row === row && p.col === col);
    if (hasVase || hasPlant) return;

    sound.playPlant();
    const newPlant: ActiveMinigamePlant = {
      id: `vp_${Date.now()}`,
      row,
      col,
      type: heldPlant.type,
      hp: heldPlant.type === 'wallnut' ? 3000 : 300,
      maxHp: heldPlant.type === 'wallnut' ? 3000 : 300,
      image: heldPlant.image,
      lastShotTime: Date.now()
    };
    setVasePlants(prev => [...prev, newPlant]);
    setHeldPlant(null);
  };

  // Vasebreaker loop: zombies walk left, plants shoot
  useEffect(() => {
    if (currentMode !== 'vasebreaker' || gameWon || gameLost) return;

    const interval = setInterval(() => {
      // 1. Move zombies
      setVaseZombies(prevZombies => {
        let reachedHome = false;
        const updated = prevZombies.map(z => {
          // Check if eating a plant
          const targetPlant = vasePlants.find(p => p.row === z.row && Math.abs(p.col * 11 - z.x) < 4);
          if (targetPlant) {
            sound.playChomp();
            setVasePlants(pl => pl.map(p => p.id === targetPlant.id ? { ...p, hp: p.hp - 15 } : p).filter(p => p.hp > 0));
            return { ...z, isEating: true };
          }

          const newX = z.x - z.speed;
          if (newX <= 0) reachedHome = true;
          return { ...z, x: newX, isEating: false };
        });

        if (reachedHome) {
          sound.playGameOver();
          setGameLost(true);
        }
        return updated;
      });

      // 2. Plants shoot
      vasePlants.forEach(p => {
        const rowZombies = vaseZombies.filter(z => z.row === p.row && z.x > p.col * 11);
        if (rowZombies.length > 0) {
          sound.playPeaShoot();
          sound.playHitSplat();
          const target = rowZombies[0];
          setVaseZombies(prev => prev.map(z => {
            if (z.id === target.id) {
              const dmg = p.type === 'repeater' ? 40 : p.type === 'squash' ? 500 : 20;
              const newHp = z.hp - dmg;
              if (newHp <= 0) sound.playZombieDie();
              return { ...z, hp: newHp };
            }
            return z;
          }).filter(z => z.hp > 0));
        }
      });

      // 3. Check victory: all vases broken & all zombies eliminated
      const allVasesBroken = vases.length > 0 && vases.every(v => v.isBroken);
      if (allVasesBroken && vaseZombies.length === 0) {
        sound.playVictory();
        setGameWon(true);
        onRewardCoins(500);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [currentMode, vases, vasePlants, vaseZombies, gameWon, gameLost]);

  // ==========================================
  //  2. WALL-NUT BOWLING LOGIC
  // ==========================================
  const initBowling = () => {
    setGameWon(false);
    setGameLost(false);
    setSelectedBall(null);
    setActiveBalls([]);
    setBowlingScore(0);
    setConveyorQueue(['wallnut', 'wallnut', 'explode', 'wallnut', 'wallnut']);

    // Spawn 10 bowling zombies on right side
    const bz: ActiveMinigameZombie[] = [];
    for (let i = 0; i < 12; i++) {
      const types = ['normal', 'conehead', 'buckethead', 'newspaper'];
      const t = types[Math.floor(Math.random() * types.length)];
      const imgMap: Record<string, string> = {
        normal: '/pvz_assets/zombies/zombie_normal.png',
        conehead: '/pvz_assets/zombies/zombie_conehead.png',
        buckethead: '/pvz_assets/zombies/zombie_buckethead.png',
        newspaper: '/pvz_assets/zombies/zombie_newspaper.png'
      };
      bz.push({
        id: `bz_${i}`,
        row: Math.floor(Math.random() * 5),
        x: 80 + i * 8,
        type: t,
        hp: t === 'buckethead' ? 500 : t === 'conehead' ? 300 : 150,
        maxHp: 500,
        speed: 0.06 + Math.random() * 0.04,
        image: imgMap[t]
      });
    }
    setBowlingZombies(bz);
  };

  const handleRollBall = (row: number) => {
    if (!selectedBall || gameWon || gameLost) return;
    sound.playOriginalSfx('melon_throw');

    const newBall: BowlingBall = {
      id: `ball_${Date.now()}`,
      row,
      col: 0,
      x: 5,
      y: row,
      vx: 1.2,
      vy: 0,
      type: selectedBall
    };

    setActiveBalls(prev => [...prev, newBall]);
    // Pop from conveyor and add random new ball
    setConveyorQueue(prev => {
      const next = prev.slice(1);
      next.push(Math.random() > 0.3 ? 'wallnut' : 'explode');
      return next;
    });
    setSelectedBall(null);
  };

  // Bowling physics loop
  useEffect(() => {
    if (currentMode !== 'bowling' || gameWon || gameLost) return;

    const interval = setInterval(() => {
      // 1. Move zombies
      setBowlingZombies(prev => {
        let reachedHome = false;
        const updated = prev.map(z => {
          const newX = z.x - z.speed;
          if (newX <= 0) reachedHome = true;
          return { ...z, x: newX };
        });
        if (reachedHome) {
          sound.playGameOver();
          setGameLost(true);
        }
        return updated;
      });

      // 2. Move balls and calculate ricochet
      setActiveBalls(prevBalls => {
        const remainingBalls: BowlingBall[] = [];

        prevBalls.forEach(ball => {
          let curX = ball.x + ball.vx;
          let curRow = ball.row + ball.vy;

          // Check collision with zombies
          const hitZombie = bowlingZombies.find(z => Math.abs(z.row - curRow) < 0.6 && Math.abs(z.x - curX) < 4);

          if (hitZombie) {
            if (ball.type === 'explode') {
              sound.playExplosion();
              // Explode 3x3
              setBowlingZombies(zm => zm.filter(z => !(Math.abs(z.row - curRow) <= 1 && Math.abs(z.x - curX) <= 15)));
              setBowlingScore(s => s + 300);
              return; // Ball disappears
            } else {
              sound.playOriginalSfx('hit_splat');
              setBowlingZombies(zm => zm.map(z => z.id === hitZombie.id ? { ...z, hp: z.hp - 150 } : z).filter(z => z.hp > 0));
              setBowlingScore(s => s + 100);

              // Ricochet bounce: change vertical direction
              let nextVy = ball.vy === 0 ? (Math.random() > 0.5 ? 0.3 : -0.3) : -ball.vy;
              if (curRow + nextVy < 0 || curRow + nextVy > 4) nextVy = -nextVy;

              remainingBalls.push({
                ...ball,
                x: curX,
                row: Math.min(4, Math.max(0, curRow + nextVy)),
                vy: nextVy
              });
              return;
            }
          }

          if (curX < 100) {
            remainingBalls.push({ ...ball, x: curX, row: Math.min(4, Math.max(0, curRow)) });
          }
        });

        return remainingBalls;
      });

      // Check victory
      if (bowlingZombies.length === 0) {
        sound.playVictory();
        setGameWon(true);
        onRewardCoins(750);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentMode, bowlingZombies, gameWon, gameLost]);

  // ==========================================
  //  3. I, ZOMBIE LOGIC
  // ==========================================
  const initIZombie = () => {
    setGameWon(false);
    setGameLost(false);
    setBrainEnergy(250);
    setBrainsRemaining([1, 1, 1, 1, 1]);
    setIZombieAttackers([]);

    // Pre-plant defensive garden for AI
    const defenders: ActiveMinigamePlant[] = [];
    for (let r = 0; r < 5; r++) {
      // 1 Sunflower at col 1
      defenders.push({
        id: `izp_sun_${r}`,
        row: r,
        col: 1,
        type: 'sunflower',
        hp: 300,
        maxHp: 300,
        image: '/pvz_assets/plants/plant_sunflower.png',
        lastShotTime: 0
      });
      // 1 or 2 Peashooters / Snowpea at col 2-4
      const pTypes = ['peashooter', 'snow_pea', 'repeater', 'wallnut'];
      const p1 = pTypes[Math.floor(Math.random() * pTypes.length)];
      const imgMap: Record<string, string> = {
        peashooter: '/pvz_assets/plants/plant_peashooter.png',
        snow_pea: '/pvz_assets/plants/plant_snow_pea.png',
        repeater: '/pvz_assets/plants/plant_repeater.png',
        wallnut: '/pvz_assets/plants/giant_walnut.png'
      };
      defenders.push({
        id: `izp_atk_${r}_2`,
        row: r,
        col: 3,
        type: p1,
        hp: p1 === 'wallnut' ? 2500 : 300,
        maxHp: p1 === 'wallnut' ? 2500 : 300,
        image: imgMap[p1],
        lastShotTime: 0
      });
    }
    setIZombieDefenders(defenders);
  };

  const handleSpawnZombieAttacker = (type: string, cost: number, row: number) => {
    if (brainEnergy < cost || gameWon || gameLost) return;
    sound.playZombieGroan();

    setBrainEnergy(b => b - cost);
    const imgMap: Record<string, string> = {
      normal: '/pvz_assets/zombies/zombie_normal.png',
      conehead: '/pvz_assets/zombies/zombie_conehead.png',
      buckethead: '/pvz_assets/zombies/zombie_buckethead.png',
      imp: '/pvz_assets/zombies/zombie_imp.png',
      gargantuar: '/pvz_assets/zombies/zombie_gargantuar.png'
    };

    const hpMap: Record<string, number> = {
      normal: 200,
      conehead: 450,
      buckethead: 900,
      imp: 120,
      gargantuar: 2000
    };

    const newZ: ActiveMinigameZombie = {
      id: `iz_atk_${Date.now()}`,
      row,
      x: 95,
      type,
      hp: hpMap[type] || 200,
      maxHp: hpMap[type] || 200,
      speed: type === 'imp' ? 0.16 : type === 'gargantuar' ? 0.05 : 0.09,
      image: imgMap[type]
    };

    setIZombieAttackers(prev => [...prev, newZ]);
  };

  // I, Zombie Game Loop
  useEffect(() => {
    if (currentMode !== 'izombie' || gameWon || gameLost) return;

    const interval = setInterval(() => {
      // 1. Move zombies & eat plants / brains
      setIZombieAttackers(prevZombies => {
        return prevZombies.map(z => {
          // Check plant eating
          const plantTarget = iZombieDefenders.find(p => p.row === z.row && Math.abs(p.col * 11 - z.x) < 4);
          if (plantTarget) {
            sound.playChomp();
            if (plantTarget.type === 'sunflower' && plantTarget.hp <= 20) {
              // Sunflower harvested gives +200 brains!
              sound.playSunPickup();
              setBrainEnergy(b => b + 200);
            }
            setIZombieDefenders(pl => pl.map(p => p.id === plantTarget.id ? { ...p, hp: p.hp - 25 } : p).filter(p => p.hp > 0));
            return { ...z, isEating: true };
          }

          // Check brain eat at end of row
          if (z.x <= 5 && brainsRemaining[z.row] === 1) {
            sound.playOriginalSfx('victory');
            setBrainsRemaining(br => {
              const next = [...br];
              next[z.row] = 0;
              return next;
            });
          }

          return { ...z, x: z.x - z.speed, isEating: false };
        }).filter(z => z.x > 0);
      });

      // 2. Plants shoot at attackers
      iZombieDefenders.forEach(p => {
        if (p.type === 'sunflower' || p.type === 'wallnut') return;
        const target = iZombieAttackers.find(z => z.row === p.row && z.x > p.col * 11);
        if (target) {
          sound.playPeaShoot();
          sound.playHitSplat();
          setIZombieAttackers(zm => zm.map(z => z.id === target.id ? { ...z, hp: z.hp - 20 } : z).filter(z => z.hp > 0));
        }
      });

      // 3. Check victory / defeat
      const allBrainsEaten = brainsRemaining.every(b => b === 0);
      if (allBrainsEaten) {
        sound.playVictory();
        setGameWon(true);
        onRewardCoins(1000);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [currentMode, iZombieDefenders, iZombieAttackers, brainsRemaining, gameWon, gameLost]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 animate-fade-in font-sans select-none">
      <div className="relative w-full max-w-5xl bg-gradient-to-b from-stone-900 via-stone-950 to-neutral-950 border-4 border-amber-500 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.35)] overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="px-6 py-3.5 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 border-b-2 border-amber-500 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎮</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-wider text-amber-100 uppercase drop-shadow">
                {currentMode === 'menu' && 'Phòng Chơi Mini-Games Kinh Điển PopCap'}
                {currentMode === 'vasebreaker' && '🏺 Vasebreaker: Đập Bình Giải Đố'}
                {currentMode === 'bowling' && '🎳 Wall-nut Bowling: Bowling Hạt Dẻ'}
                {currentMode === 'izombie' && '🧠 I, Zombie: Tôi Là Thây Ma Ăn Não'}
              </h2>
              <p className="text-xs text-amber-300 font-semibold">
                Thử thách giải đố, càn quét bowling và đảo vai độc đáo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentMode !== 'menu' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentMode('menu');
                }}
                className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-600/50 font-bold text-xs shadow transition"
              >
                ◀ Menu Trò Chơi
              </button>
            )}

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-base border border-red-300 shadow hover:scale-105 active:scale-95 transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar flex flex-col justify-center">

          {/* ==========================================
              MENU SCREEN
             ========================================== */}
          {currentMode === 'menu' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
              
              {/* Card 1: Vasebreaker */}
              <div 
                onClick={() => {
                  sound.playClick();
                  setCurrentMode('vasebreaker');
                }}
                className="group relative bg-gradient-to-b from-stone-800/90 to-stone-950 p-6 rounded-3xl border-2 border-amber-600/60 hover:border-amber-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all cursor-pointer flex flex-col items-center text-center justify-between"
              >
                <div className="w-24 h-24 rounded-2xl bg-amber-950/60 border border-amber-500/50 flex items-center justify-center text-5xl mb-4 group-hover:animate-bounce shadow-inner">
                  🏺
                </div>
                <h3 className="text-xl font-black text-amber-200 mb-2 uppercase">
                  Vasebreaker (Đập Bình)
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  Đập vỡ các bình gốm thần bí, thu thập cây trồng vào tay và tính toán đặt vị trí chặn đứng đàn zombie!
                </p>
                <div className="w-full py-2 bg-amber-600 group-hover:bg-amber-500 text-stone-950 font-black rounded-xl text-xs uppercase tracking-wider shadow">
                  Chơi Ngay (Thưởng 500 🪙)
                </div>
              </div>

              {/* Card 2: Bowling */}
              <div 
                onClick={() => {
                  sound.playClick();
                  setCurrentMode('bowling');
                }}
                className="group relative bg-gradient-to-b from-stone-800/90 to-stone-950 p-6 rounded-3xl border-2 border-red-600/60 hover:border-red-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all cursor-pointer flex flex-col items-center text-center justify-between"
              >
                <div className="w-24 h-24 rounded-2xl bg-red-950/60 border border-red-500/50 flex items-center justify-center text-5xl mb-4 group-hover:animate-bounce shadow-inner">
                  🎳
                </div>
                <h3 className="text-xl font-black text-red-300 mb-2 uppercase">
                  Wall-nut Bowling
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  Thả các quả hạt dẻ Wall-nut và hạt dẻ bom nổ đỏ càn quét bầy xác sống theo quỹ đạo nảy góc ricochet!
                </p>
                <div className="w-full py-2 bg-red-600 group-hover:bg-red-500 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow">
                  Chơi Ngay (Thưởng 750 🪙)
                </div>
              </div>

              {/* Card 3: I, Zombie */}
              <div 
                onClick={() => {
                  sound.playClick();
                  setCurrentMode('izombie');
                }}
                className="group relative bg-gradient-to-b from-stone-800/90 to-stone-950 p-6 rounded-3xl border-2 border-purple-600/60 hover:border-purple-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all cursor-pointer flex flex-col items-center text-center justify-between"
              >
                <div className="w-24 h-24 rounded-2xl bg-purple-950/60 border border-purple-500/50 flex items-center justify-center text-5xl mb-4 group-hover:animate-bounce shadow-inner">
                  🧠
                </div>
                <h3 className="text-xl font-black text-purple-300 mb-2 uppercase">
                  I, Zombie (Đổi Vai)
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  Cầm trong tay đội quân Zombie, chi tiêu điểm Não để thả quái vượt qua hỏa lực của cây và ăn hết 5 bộ não!
                </p>
                <div className="w-full py-2 bg-purple-600 group-hover:bg-purple-500 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow">
                  Chơi Ngay (Thưởng 1000 🪙)
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              1. VASEBREAKER GAMEPLAY SCREEN
             ========================================== */}
          {currentMode === 'vasebreaker' && (
            <div className="flex flex-col items-center gap-3">
              {/* Top Banner with Held Plant indicator */}
              <div className="w-full bg-stone-950/80 border border-amber-600/60 p-3 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-amber-300">Cây Đang Cầm Trong Tay:</span>
                  {heldPlant ? (
                    <div className="flex items-center gap-2 bg-emerald-950 border border-emerald-400 px-3 py-1 rounded-xl animate-pulse">
                      <img src={heldPlant.image} alt={heldPlant.name} className="w-8 h-8 object-contain" />
                      <span className="font-black text-xs text-emerald-300">{heldPlant.name} (Nhấp ô trống để trồng)</span>
                    </div>
                  ) : (
                    <span className="text-xs text-stone-500 italic">Hãy đập bình để tìm cây!</span>
                  )}
                </div>

                <button
                  onClick={initVasebreaker}
                  className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold rounded-lg border border-stone-600"
                >
                  🔄 Chơi Lại
                </button>
              </div>

              {/* 5x9 Lawn Arena */}
              <div className="relative w-full aspect-[9/5] max-h-[50vh] bg-[#1a472a] rounded-2xl border-4 border-amber-700 overflow-hidden shadow-2xl grid grid-rows-5 grid-cols-9 p-1.5 gap-1">
                {Array.from({ length: 5 }).map((_, r) => (
                  Array.from({ length: 9 }).map((_, c) => {
                    const vase = vases.find(v => v.row === r && v.col === c);
                    const plant = vasePlants.find(p => p.row === r && p.col === c);

                    return (
                      <div
                        key={`tile_${r}_${c}`}
                        onClick={() => {
                          if (vase && !vase.isBroken) {
                            handleBreakVase(vase);
                          } else if (!vase || vase.isBroken) {
                            handlePlantOnTile(r, c);
                          }
                        }}
                        className={`relative rounded-lg border border-emerald-800/40 flex items-center justify-center transition-all cursor-pointer ${
                          (r + c) % 2 === 0 ? 'bg-emerald-900/40' : 'bg-emerald-800/40'
                        } hover:bg-emerald-700/60`}
                      >
                        {/* Vase Sprite */}
                        {vase && !vase.isBroken && (
                          <div className="text-3xl sm:text-4xl filter drop-shadow hover:scale-110 active:scale-95 transition animate-bounce" style={{ animationDuration: '4s' }}>
                            🏺
                          </div>
                        )}

                        {/* Plant Sprite */}
                        {plant && (
                          <div className="flex flex-col items-center">
                            <img src={plant.image} alt="plant" className="w-10 h-10 object-contain drop-shadow" />
                            <div className="w-8 h-1 bg-stone-900 rounded-full mt-0.5 overflow-hidden">
                              <div className="h-full bg-emerald-400" style={{ width: `${(plant.hp / plant.maxHp) * 100}%` }} />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                ))}

                {/* Roaming Zombies in Vasebreaker */}
                {vaseZombies.map(z => (
                  <div
                    key={z.id}
                    className="absolute pointer-events-none transition-all flex flex-col items-center"
                    style={{
                      top: `${z.row * 20 + 2}%`,
                      left: `${z.x}%`,
                      width: '10%',
                      height: '18%'
                    }}
                  >
                    <img src={z.image} alt="zombie" className="w-full h-full object-contain drop-shadow animate-pulse" />
                    <div className="w-10 h-1.5 bg-black/80 rounded-full overflow-hidden border border-stone-800">
                      <div className="h-full bg-red-500 transition-all" style={{ width: `${(z.hp / z.maxHp) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==========================================
              2. WALL-NUT BOWLING GAMEPLAY SCREEN
             ========================================== */}
          {currentMode === 'bowling' && (
            <div className="flex flex-col items-center gap-3">
              {/* Conveyor Belt Bar */}
              <div className="w-full bg-stone-950/90 border-2 border-red-700/70 p-3 rounded-2xl flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-red-300 uppercase">Băng Chuyền Cấp Bóng:</span>
                  <div className="flex items-center gap-2 bg-stone-900 p-1.5 rounded-xl border border-stone-700">
                    {conveyorQueue.map((ballType, idx) => (
                      <button
                        key={`bqueue_${idx}`}
                        onClick={() => {
                          sound.playClick();
                          setSelectedBall(ballType);
                        }}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border-2 transition-all cursor-pointer ${
                          selectedBall === ballType && idx === 0
                            ? 'bg-amber-600 border-yellow-300 scale-110 shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-pulse'
                            : 'bg-stone-800 border-stone-600 hover:border-amber-400'
                        }`}
                      >
                        {ballType === 'wallnut' ? '🌰' : '💣'}
                      </button>
                    ))}
                  </div>
                  {selectedBall && (
                    <span className="text-xs font-bold text-yellow-400 animate-bounce">
                      Đã chọn: {selectedBall === 'wallnut' ? 'Hạt Dẻ Thường' : 'Hạt Dẻ Nổ Đỏ'}! Nhấp vào hàng để ném!
                    </span>
                  )}
                </div>

                <div className="text-sm font-black text-amber-300 bg-stone-900 px-4 py-1.5 rounded-xl border border-amber-600/40">
                  Điểm: {bowlingScore}
                </div>
              </div>

              {/* Bowling Lawn Arena */}
              <div className="relative w-full aspect-[9/5] max-h-[50vh] bg-[#1a472a] rounded-2xl border-4 border-red-700 overflow-hidden shadow-2xl grid grid-rows-5 grid-cols-9 p-1.5 gap-1">
                {/* Red Line Divider (Col 2) */}
                <div className="absolute top-0 bottom-0 left-[22.2%] w-1 bg-red-600/80 shadow-[0_0_10px_rgba(239,68,68,0.8)] z-10" />

                {Array.from({ length: 5 }).map((_, r) => (
                  Array.from({ length: 9 }).map((_, c) => (
                    <div
                      key={`b_tile_${r}_${c}`}
                      onClick={() => c <= 1 && handleRollBall(r)}
                      className={`relative rounded-lg border border-emerald-800/40 flex items-center justify-center transition-all ${
                        c <= 1 ? 'cursor-pointer hover:bg-red-900/30' : ''
                      } ${
                        (r + c) % 2 === 0 ? 'bg-emerald-900/40' : 'bg-emerald-800/40'
                      }`}
                    >
                      {c <= 1 && <span className="text-xs font-black text-red-400/30">NÉM</span>}
                    </div>
                  ))
                ))}

                {/* Rolling Bowling Balls */}
                {activeBalls.map(ball => (
                  <div
                    key={ball.id}
                    className="absolute text-3xl filter drop-shadow z-20 pointer-events-none"
                    style={{
                      top: `${ball.row * 20 + 2}%`,
                      left: `${ball.x}%`
                    }}
                  >
                    {ball.type === 'wallnut' ? '🌰' : '💣'}
                  </div>
                ))}

                {/* Bowling Zombies */}
                {bowlingZombies.map(z => (
                  <div
                    key={z.id}
                    className="absolute pointer-events-none transition-all flex flex-col items-center"
                    style={{
                      top: `${z.row * 20 + 2}%`,
                      left: `${z.x}%`,
                      width: '10%',
                      height: '18%'
                    }}
                  >
                    <img src={z.image} alt="zombie" className="w-full h-full object-contain drop-shadow animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==========================================
              3. I, ZOMBIE GAMEPLAY SCREEN
             ========================================== */}
          {currentMode === 'izombie' && (
            <div className="flex flex-col items-center gap-3">
              {/* Top Summon Bar */}
              <div className="w-full bg-stone-950/90 border-2 border-purple-700/70 p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-2 bg-purple-950/80 px-4 py-1.5 rounded-xl border border-purple-500">
                  <span className="text-xl">🧠</span>
                  <span className="font-black text-purple-200 text-base">{brainEnergy} Não</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-purple-300">Thả Zombie:</span>
                  {[
                    { type: 'normal', name: 'Thường', cost: 50, icon: '🧟' },
                    { type: 'conehead', name: 'Nón', cost: 75, icon: '🪖' },
                    { type: 'buckethead', name: 'Xô Sắt', cost: 125, icon: '🪣' },
                    { type: 'imp', name: 'Quỷ Lùn', cost: 50, icon: '👺' },
                    { type: 'gargantuar', name: 'Khổng Lồ', cost: 300, icon: '👹' }
                  ].map(zCard => (
                    <button
                      key={zCard.type}
                      disabled={brainEnergy < zCard.cost}
                      onClick={() => {
                        const randomRow = Math.floor(Math.random() * 5);
                        handleSpawnZombieAttacker(zCard.type, zCard.cost, randomRow);
                      }}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                        brainEnergy >= zCard.cost
                          ? 'bg-purple-800 hover:bg-purple-700 text-white border-purple-400 shadow-md cursor-pointer'
                          : 'bg-stone-900 border-stone-800 text-stone-600 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <span>{zCard.icon}</span>
                      <span>{zCard.name} ({zCard.cost}🧠)</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* I, Zombie Lawn Arena */}
              <div className="relative w-full aspect-[9/5] max-h-[50vh] bg-[#1a472a] rounded-2xl border-4 border-purple-700 overflow-hidden shadow-2xl grid grid-rows-5 grid-cols-9 p-1.5 gap-1">
                {Array.from({ length: 5 }).map((_, r) => (
                  Array.from({ length: 9 }).map((_, c) => {
                    const plant = iZombieDefenders.find(p => p.row === r && p.col === c);

                    return (
                      <div
                        key={`iz_tile_${r}_${c}`}
                        className={`relative rounded-lg border border-emerald-800/40 flex items-center justify-center ${
                          (r + c) % 2 === 0 ? 'bg-emerald-900/40' : 'bg-emerald-800/40'
                        }`}
                      >
                        {/* Brain on col 0 */}
                        {c === 0 && brainsRemaining[r] === 1 && (
                          <span className="text-3xl filter drop-shadow animate-pulse">🧠</span>
                        )}

                        {/* Defending Plant */}
                        {plant && (
                          <div className="flex flex-col items-center">
                            <img src={plant.image} alt="plant" className="w-10 h-10 object-contain drop-shadow" />
                            <div className="w-8 h-1 bg-stone-900 rounded-full mt-0.5 overflow-hidden">
                              <div className="h-full bg-emerald-400" style={{ width: `${(plant.hp / plant.maxHp) * 100}%` }} />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                ))}

                {/* Attacking Player Zombies */}
                {iZombieAttackers.map(z => (
                  <div
                    key={z.id}
                    className="absolute pointer-events-none transition-all flex flex-col items-center z-20"
                    style={{
                      top: `${z.row * 20 + 2}%`,
                      left: `${z.x}%`,
                      width: '10%',
                      height: '18%'
                    }}
                  >
                    <img src={z.image} alt="zombie" className="w-full h-full object-contain drop-shadow animate-pulse" />
                    <div className="w-10 h-1.5 bg-black/80 rounded-full overflow-hidden border border-stone-800">
                      <div className="h-full bg-purple-400 transition-all" style={{ width: `${(z.hp / z.maxHp) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Victory / Defeat Overlays */}
          {gameWon && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-50 animate-bounce">
              <span className="text-6xl">🏆🌟</span>
              <h3 className="text-3xl font-black text-amber-300 uppercase tracking-widest">
                CHIẾN THẮNG MINIGAME!
              </h3>
              <p className="text-sm font-bold text-amber-100">
                Bạn đã xuất sắc vượt qua màn chơi và nhận thưởng tiền xu!
              </p>
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentMode('menu');
                }}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-sm uppercase shadow-lg cursor-pointer"
              >
                Về Menu Mini-Games
              </button>
            </div>
          )}

          {gameLost && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-50">
              <span className="text-6xl">💀⚠️</span>
              <h3 className="text-3xl font-black text-rose-500 uppercase tracking-widest">
                THẤT BẠI RỒI!
              </h3>
              <button
                onClick={() => {
                  sound.playClick();
                  if (currentMode === 'vasebreaker') initVasebreaker();
                  else if (currentMode === 'bowling') initBowling();
                  else if (currentMode === 'izombie') initIZombie();
                }}
                className="px-6 py-2 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-sm uppercase shadow-lg cursor-pointer"
              >
                Thử Lại Màn Này
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
