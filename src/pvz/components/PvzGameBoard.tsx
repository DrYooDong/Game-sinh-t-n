import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlacedPlant, ActiveZombie, Projectile, SunDrop, PlantId, DamagePopup, LawnMowerState } from '../types';
import { PVZ_PLANTS, PVZ_ZOMBIES } from '../data/pvzData';
import { soundManager } from '../../utils/audio';

interface PvzGameBoardProps {
  plants: PlacedPlant[];
  zombies: ActiveZombie[];
  projectiles: Projectile[];
  sunDrops: SunDrop[];
  damagePopups: DamagePopup[];
  lawnMowerStates: LawnMowerState[];
  selectedPlantId: PlantId | null;
  isShovelActive: boolean;
  onCellClick: (row: number, col: number) => void;
  onCollectSun: (sunId: string, value: number) => void;
  currentWaveIndex: number;
  nuclearExplosionEffect?: boolean;
}

const ROWS = 3;
const COLS = 6;

// Stage visual themes
const STAGE_THEMES = [
  {
    name: 'Đường Phố Tân Thủ & Công Viên',
    bgClass: 'bg-gradient-to-r from-emerald-950/70 via-neutral-950/80 to-emerald-950/70 border-emerald-500/50',
    laneA: 'bg-emerald-950/30',
    laneB: 'bg-emerald-900/15',
    accentColor: 'border-emerald-800/40',
    particles: '🌿',
    title: '🏙️ ĐÔ THỊ TÂN THỦ'
  },
  {
    name: 'Khu Siêu Thị Tiện Lợi & Nắp Cống',
    bgClass: 'bg-gradient-to-r from-amber-950/60 via-neutral-950/90 to-neutral-900 border-amber-500/50',
    laneA: 'bg-amber-950/20',
    laneB: 'bg-neutral-900/30',
    accentColor: 'border-amber-800/40',
    particles: '🛒',
    title: '🏪 BÃI ĐỖ SIÊU THỊ'
  },
  {
    name: 'Đường Ray Ngầm & Trạm Ga Thứ 5',
    bgClass: 'bg-gradient-to-r from-cyan-950/70 via-neutral-950/90 to-blue-950/70 border-cyan-500/50',
    laneA: 'bg-cyan-950/25',
    laneB: 'bg-neutral-950/40',
    accentColor: 'border-cyan-800/40',
    particles: '⚡',
    title: '🚇 HẦM TÀU ĐIỆN NGẦM'
  },
  {
    name: 'Đại Học Nông Nghiệp Lương Tử Hồ',
    bgClass: 'bg-gradient-to-r from-green-950/70 via-neutral-950/85 to-teal-950/70 border-green-500/50',
    laneA: 'bg-green-950/30',
    laneB: 'bg-teal-950/20',
    accentColor: 'border-green-800/40',
    particles: '🌾',
    title: '🧪 NHÀ KÍNH CÔNG NGHỆ CAO'
  },
  {
    name: 'Vườn Thực Nghiệm Bào Tử Biến Dị',
    bgClass: 'bg-gradient-to-r from-purple-950/80 via-neutral-950/90 to-fuchsia-950/80 border-purple-500/60',
    laneA: 'bg-purple-950/35',
    laneB: 'bg-fuchsia-950/20',
    accentColor: 'border-purple-800/50',
    particles: '🟣',
    title: '☣️ VÙNG DỊCH BÀO TỬ'
  },
  {
    name: 'Sân Vận Động Trung Tâm',
    bgClass: 'bg-gradient-to-r from-rose-950/80 via-neutral-950/90 to-red-950/80 border-rose-500/60',
    laneA: 'bg-rose-950/30',
    laneB: 'bg-neutral-900/40',
    accentColor: 'border-rose-800/50',
    particles: '🔥',
    title: '🏟️ ĐẠI CHIẾN SÂN VẬN ĐỘNG'
  },
  {
    name: 'Căn Cứ Đảo Giữa Hồ',
    bgClass: 'bg-gradient-to-r from-indigo-950/80 via-neutral-950/90 to-amber-950/80 border-yellow-400/60',
    laneA: 'bg-indigo-950/30',
    laneB: 'bg-amber-950/20',
    accentColor: 'border-yellow-700/50',
    particles: '✨',
    title: '🏰 PHÁO ĐÀI QUỐC VẬN BẤT DIỆT'
  }
];

export const PvzGameBoard: React.FC<PvzGameBoardProps> = ({
  plants,
  zombies,
  projectiles,
  sunDrops,
  damagePopups,
  lawnMowerStates,
  selectedPlantId,
  isShovelActive,
  onCellClick,
  onCollectSun,
  currentWaveIndex,
  nuclearExplosionEffect = false
}) => {
  const theme = STAGE_THEMES[currentWaveIndex % STAGE_THEMES.length] || STAGE_THEMES[0];

  return (
    <div
      className={`w-full max-w-5xl mx-auto ${theme.bgClass} border-2 p-3 sm:p-5 rounded-xs font-mono relative overflow-hidden select-none shadow-2xl backdrop-blur-md transition-all duration-700 ${
        nuclearExplosionEffect ? 'animate-screen-shake-lg ring-8 ring-purple-500/90' : ''
      }`}
    >
      {/* Nuclear Flash Overlay */}
      {nuclearExplosionEffect && (
        <div className="absolute inset-0 bg-purple-600/40 z-40 pointer-events-none flex flex-col items-center justify-center animate-pulse">
          <div className="text-7xl sm:text-9xl filter drop-shadow-[0_0_40px_rgba(217,70,239,1)] animate-bounce">
            ☢️💥
          </div>
          <div className="text-xl sm:text-2xl font-black text-purple-200 tracking-widest uppercase bg-black/80 px-4 py-1 rounded-xs border border-purple-400 mt-2 shadow-[0_0_20px_rgba(168,85,247,0.8)]">
            NỔ HẠT NHÂN NẤM HỦY DIỆT!
          </div>
        </div>
      )}

      {/* Battlefield Environment Watermark & Lighting */}
      <div className="flex items-center justify-between px-2 mb-2 text-xs font-bold text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-neutral-900/90 border border-neutral-700 text-neutral-200 rounded-xs text-[10px] tracking-wider uppercase">
            {theme.title}
          </span>
          <span className="text-neutral-500 hidden sm:inline">• Trận địa phòng thủ Vĩnh Hằng Gia Viên</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-amber-400">
          <span>{theme.particles}</span>
          <span className="hidden md:inline">Chiến trường: {theme.name}</span>
        </div>
      </div>

      {/* Lawn Grid Area */}
      <div className="relative bg-neutral-950/80 border border-neutral-800 rounded-xs overflow-hidden shadow-inner">
        {/* Render 3 Lane Rows */}
        {Array.from({ length: ROWS }).map((_, r) => {
          const hasPlantern = plants.some((p) => p.row === r && p.plantId === 'plant_plantern');
          const mowerState = lawnMowerStates[r] || { row: r, active: true, colPosition: 0, isTriggered: false };

          return (
            <div
              key={r}
              className={`relative flex items-center h-28 sm:h-32 border-b last:border-b-0 ${theme.accentColor} transition-colors ${
                hasPlantern
                  ? 'bg-amber-950/40 shadow-[inset_0_0_35px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/30'
                  : r % 2 === 0
                  ? theme.laneA
                  : theme.laneB
              }`}
            >
              {/* Leftmost: Lawn Mower / House Safety Barrier */}
              <div className="w-12 sm:w-14 h-full border-r border-neutral-800/80 flex flex-col items-center justify-center bg-neutral-950/90 z-10 shrink-0 relative">
                {mowerState.active && !mowerState.isTriggered ? (
                  <div
                    className="text-xl sm:text-2xl animate-pulse filter drop-shadow-[0_0_8px_rgba(34,197,94,0.7)]"
                    title="Máy cắt cỏ phòng thủ dự phòng"
                  >
                    🚜
                  </div>
                ) : mowerState.isTriggered ? (
                  <div className="text-xs text-amber-400 font-black animate-spin">💨</div>
                ) : (
                  <div className="text-[9px] text-rose-500 font-black text-center leading-tight">
                    XÂM NHẬP
                  </div>
                )}
              </div>

              {/* Moving Lawnmower when triggered */}
              {mowerState.isTriggered && mowerState.active && (
                <div
                  className="absolute z-30 pointer-events-none text-3xl sm:text-4xl animate-mower-rush filter drop-shadow-[0_0_15px_rgba(239,68,68,0.9)]"
                  style={{
                    left: `calc(48px + ${(mowerState.colPosition / COLS) * 85}%)`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  🚜💨💥
                </div>
              )}

              {/* 6 Garden Cells for Planting */}
              <div className="grid grid-cols-6 flex-1 h-full relative">
                {Array.from({ length: COLS }).map((_, c) => {
                  const existingPlant = plants.find((p) => p.row === r && p.col === c);
                  const plantInfo = existingPlant
                    ? PVZ_PLANTS.find((pi) => pi.id === existingPlant.plantId)
                    : null;

                  return (
                    <div
                      key={c}
                      onClick={() => onCellClick(r, c)}
                      className={`relative h-full border-r last:border-r-0 border-neutral-800/40 flex items-center justify-center cursor-pointer transition-all ${
                        selectedPlantId && !existingPlant
                          ? 'hover:bg-emerald-500/25 ring-1 ring-emerald-400/50'
                          : isShovelActive && existingPlant
                          ? 'hover:bg-rose-500/35 ring-1 ring-rose-400/60'
                          : 'hover:bg-neutral-800/30'
                      }`}
                    >
                      {/* Grid Cell Texture Details */}
                      <div className="absolute top-1 left-1 text-[8px] text-neutral-600/40 select-none pointer-events-none">
                        R{r + 1}C{c + 1}
                      </div>

                      {/* Render Placed Plant with Rich Animations */}
                      {existingPlant && plantInfo && (
                        <motion.div
                          initial={{ scale: 0.2, y: 15 }}
                          animate={{ scale: 1, y: 0 }}
                          className="relative flex flex-col items-center justify-center z-10 animate-plant-sway"
                        >
                          {/* HP Bar */}
                          <div className="w-10 sm:w-12 h-1.5 bg-neutral-950 border border-neutral-700 rounded-full overflow-hidden mb-1 shadow-sm">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-200"
                              style={{
                                width: `${Math.max(
                                  0,
                                  (existingPlant.hp / existingPlant.maxHp) * 100
                                )}%`
                              }}
                            />
                          </div>

                          {/* Plant Visual with Aura & Glow */}
                          <div className="relative text-3xl sm:text-4xl filter drop-shadow-[0_2px_10px_rgba(16,185,129,0.6)]">
                            {/* Special visual traits */}
                            {existingPlant.plantId === 'plant_sunflower' && (
                              <div className="absolute -inset-1 rounded-full animate-sun-halo pointer-events-none opacity-40" />
                            )}

                            {existingPlant.plantId === 'plant_snow_pea' && (
                              <span className="absolute -top-1 -right-1 text-xs animate-ping">❄️</span>
                            )}

                            {existingPlant.plantId === 'plant_gatling_pea' && (
                              <span className="absolute -bottom-1 -left-1 text-[10px] animate-pulse">🔥</span>
                            )}

                            {existingPlant.plantId === 'plant_plantern' && (
                              <span className="absolute -top-2 -right-1 text-xs animate-bounce">✨</span>
                            )}

                            {existingPlant.plantId === 'plant_doom_shroom' && (
                              <span className="absolute -top-1 -right-1 text-xs animate-ping">☢️</span>
                            )}

                            <span>{plantInfo.icon}</span>
                          </div>

                          <div className="text-[9px] text-emerald-300 font-bold mt-0.5 truncate max-w-[55px] bg-black/60 px-1 rounded-xs">
                            {plantInfo.name.split(' ')[0]}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Flying Projectiles on this Row with Vivid Particle Trails */}
              {projectiles
                .filter((p) => p.row === r)
                .map((proj) => {
                  const leftPercent = Math.min(100, Math.max(0, (proj.colPosition / COLS) * 100));

                  if (proj.type === 'ice_pea') {
                    return (
                      <div
                        key={proj.id}
                        className="absolute z-20 w-5 h-5 bg-cyan-300 border-2 border-white rounded-full shadow-[0_0_15px_rgba(6,182,212,1)] pointer-events-none transform -translate-y-1/2 top-1/2 flex items-center justify-center text-xs animate-spin"
                        style={{ left: `calc(48px + ${leftPercent * 0.85}%)` }}
                      >
                        ❄️
                      </div>
                    );
                  }

                  if (proj.type === 'fume_wave') {
                    return (
                      <div
                        key={proj.id}
                        className="absolute z-20 w-10 h-10 bg-fuchsia-600/70 border-2 border-fuchsia-300 rounded-full shadow-[0_0_20px_rgba(217,70,239,0.9)] pointer-events-none transform -translate-y-1/2 top-1/2 flex items-center justify-center text-sm animate-pulse"
                        style={{ left: `calc(48px + ${leftPercent * 0.85}%)` }}
                      >
                        🟣💨
                      </div>
                    );
                  }

                  if (proj.type === 'gatling') {
                    return (
                      <div
                        key={proj.id}
                        className="absolute z-20 w-5 h-4 bg-lime-400 border border-yellow-200 rounded-full shadow-[0_0_12px_rgba(132,204,22,1)] pointer-events-none transform -translate-y-1/2 top-1/2 flex items-center justify-center text-[8px]"
                        style={{ left: `calc(48px + ${leftPercent * 0.85}%)` }}
                      >
                        💥
                      </div>
                    );
                  }

                  // Default Pea Bullet
                  return (
                    <div
                      key={proj.id}
                      className="absolute z-20 w-4 h-4 bg-emerald-400 border-2 border-emerald-200 rounded-full shadow-[0_0_10px_rgba(52,211,153,1)] pointer-events-none transform -translate-y-1/2 top-1/2"
                      style={{ left: `calc(48px + ${leftPercent * 0.85}%)` }}
                    />
                  );
                })}

              {/* Marching & Attacking Zombies on this Row */}
              {zombies
                .filter((z) => z.row === r)
                .map((zombie) => {
                  const zombieInfo = PVZ_ZOMBIES[zombie.zombieId] || PVZ_ZOMBIES.zombie_normal;
                  const leftPercent = Math.min(100, Math.max(0, (zombie.colPosition / COLS) * 100));
                  const isSlowed = (zombie.slowTimerSec || 0) > 0;
                  const isCharmed = !!zombie.isCharmed;

                  return (
                    <div
                      key={zombie.id}
                      className={`absolute z-20 flex flex-col items-center justify-center pointer-events-none transition-all ${
                        isSlowed ? 'filter hue-rotate-180 brightness-125' : ''
                      } ${isCharmed ? 'scale-x-[-1]' : ''}`}
                      style={{
                        left: `calc(48px + ${leftPercent * 0.85}%)`,
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      {/* Zombie HP Bar */}
                      <div className="w-10 sm:w-14 h-1.5 bg-neutral-950 border border-neutral-700 rounded-full overflow-hidden mb-1 shadow-sm">
                        <div
                          className={`h-full transition-all duration-150 ${
                            isCharmed
                              ? 'bg-pink-400'
                              : zombieInfo.isBoss
                              ? 'bg-gradient-to-r from-rose-600 to-red-500'
                              : 'bg-red-500'
                          }`}
                          style={{
                            width: `${Math.max(0, (zombie.hp / zombie.maxHp) * 100)}%`
                          }}
                        />
                      </div>

                      {/* Status Badges */}
                      <div className="flex items-center gap-1 text-[10px] mb-0.5">
                        {isSlowed && <span className="animate-bounce">❄️</span>}
                        {isCharmed && <span className="animate-pulse">💖</span>}
                        {zombie.armorType === 'spore_scale' && <span>🛡️</span>}
                        {zombieInfo.isBoss && <span className="text-yellow-400">👑</span>}
                      </div>

                      {/* Zombie Visual with Biting Animation */}
                      <motion.div
                        animate={
                          zombie.isAttacking
                            ? { x: [-3, 3, -3], scale: [1, 1.1, 1] }
                            : { y: [-2, 0, -2] }
                        }
                        transition={{ repeat: Infinity, duration: zombie.isAttacking ? 0.25 : 1.2 }}
                        className={`text-3xl sm:text-4xl filter drop-shadow-[0_2px_10px_rgba(225,29,72,0.7)] ${
                          zombieInfo.isBoss ? 'scale-135' : ''
                        }`}
                      >
                        {zombieInfo.icon}
                      </motion.div>

                      <div
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded-xs truncate max-w-[70px] shadow-sm ${
                          isCharmed
                            ? 'bg-pink-900/90 text-pink-200 border border-pink-500/50'
                            : zombieInfo.isBoss
                            ? 'bg-rose-950/90 text-rose-200 border border-rose-600'
                            : 'bg-black/75 text-rose-300'
                        }`}
                      >
                        {zombieInfo.name.split(' ')[0]}
                      </div>
                    </div>
                  );
                })}

              {/* Damage Popup Texts on this Row */}
              {damagePopups
                .filter((pop) => pop.row === r)
                .map((pop) => {
                  const leftPercent = Math.min(100, Math.max(0, (pop.colPosition / COLS) * 100));

                  return (
                    <div
                      key={pop.id}
                      className={`absolute z-30 font-black pointer-events-none animate-damage-float select-none text-xs sm:text-sm ${pop.color} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]`}
                      style={{
                        left: `calc(48px + ${leftPercent * 0.85}%)`,
                        top: '30%'
                      }}
                    >
                      {pop.text}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>

      {/* Interactive Floating Sun Drops with Rich Sunlight Halos */}
      <AnimatePresence>
        {sunDrops.map((sun) => {
          const topPercent = (sun.row / ROWS) * 100 + 10;
          const leftPercent = (sun.col / COLS) * 80 + 10;

          return (
            <motion.button
              key={sun.id}
              initial={{ scale: 0, opacity: 0, y: -25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: -25 }}
              whileHover={{ scale: 1.35 }}
              onClick={(e) => {
                e.stopPropagation();
                soundManager.play('item_get');
                onCollectSun(sun.id, sun.value);
              }}
              className="absolute z-40 w-10 h-10 bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-yellow-100 rounded-full flex items-center justify-center text-xl shadow-[0_0_20px_rgba(251,191,36,1)] cursor-pointer animate-sun-halo"
              style={{
                top: `${topPercent}%`,
                left: `${leftPercent}%`
              }}
              title="Nhấn để thu thập +25 Nắng"
            >
              ☀️
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
