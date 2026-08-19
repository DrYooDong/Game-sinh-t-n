import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlacedPlant, ActiveZombie, Projectile, SunDrop, PlantId } from '../types';
import { PVZ_PLANTS, PVZ_ZOMBIES } from '../data/pvzData';
import { soundManager } from '../../utils/audio';

interface PvzGameBoardProps {
  plants: PlacedPlant[];
  zombies: ActiveZombie[];
  projectiles: Projectile[];
  sunDrops: SunDrop[];
  selectedPlantId: PlantId | null;
  isShovelActive: boolean;
  onCellClick: (row: number, col: number) => void;
  onCollectSun: (sunId: string, value: number) => void;
  lawnMowers: boolean[]; // 3 rows
}

const ROWS = 3;
const COLS = 6;

export const PvzGameBoard: React.FC<PvzGameBoardProps> = ({
  plants,
  zombies,
  projectiles,
  sunDrops,
  selectedPlantId,
  isShovelActive,
  onCellClick,
  onCollectSun,
  lawnMowers
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-neutral-950/90 border-2 border-emerald-500/40 p-3 sm:p-5 rounded-xs font-mono relative overflow-hidden select-none shadow-2xl">
      {/* Lawn Grid Area */}
      <div className="relative bg-emerald-950/30 border border-emerald-800/40 rounded-xs overflow-hidden">
        {/* Render 3 Lane Rows */}
        {Array.from({ length: ROWS }).map((_, r) => (
          <div
            key={r}
            className={`relative flex items-center h-28 sm:h-32 border-b last:border-b-0 border-emerald-900/40 ${
              r % 2 === 0 ? 'bg-emerald-950/20' : 'bg-emerald-900/10'
            }`}
          >
            {/* Leftmost: Lawn Mower / House Safety Barrier */}
            <div className="w-12 sm:w-14 h-full border-r border-emerald-800/50 flex flex-col items-center justify-center bg-neutral-950/80 z-10 shrink-0">
              {lawnMowers[r] ? (
                <div className="text-xl sm:text-2xl animate-pulse" title="Máy cắt cỏ bảo vệ cuối cùng">
                  🚜
                </div>
              ) : (
                <div className="text-xs text-rose-500 font-black">XÂM NHẬP</div>
              )}
            </div>

            {/* 6 Garden Cells for Planting */}
            <div className="grid grid-cols-6 flex-1 h-full relative">
              {Array.from({ length: COLS }).map((_, c) => {
                const existingPlant = plants.find((p) => p.row === r && p.col === c);
                const plantInfo = existingPlant ? PVZ_PLANTS.find((pi) => pi.id === existingPlant.plantId) : null;

                return (
                  <div
                    key={c}
                    onClick={() => onCellClick(r, c)}
                    className={`relative h-full border-r last:border-r-0 border-emerald-800/30 flex items-center justify-center cursor-pointer transition-all ${
                      selectedPlantId && !existingPlant
                        ? 'hover:bg-emerald-500/20'
                        : isShovelActive && existingPlant
                        ? 'hover:bg-rose-500/30'
                        : 'hover:bg-emerald-900/20'
                    }`}
                  >
                    {/* Render Placed Plant */}
                    {existingPlant && plantInfo && (
                      <motion.div
                        initial={{ scale: 0.2, y: 15 }}
                        animate={{ scale: 1, y: 0 }}
                        className="relative flex flex-col items-center justify-center z-10"
                      >
                        {/* HP Bar */}
                        <div className="w-10 sm:w-12 h-1.5 bg-neutral-900 border border-neutral-700 rounded-full overflow-hidden mb-1">
                          <div
                            className="h-full bg-emerald-400 transition-all"
                            style={{
                              width: `${Math.max(0, (existingPlant.hp / existingPlant.maxHp) * 100)}%`
                            }}
                          />
                        </div>

                        {/* Plant Visual */}
                        <div className="text-3xl sm:text-4xl filter drop-shadow-[0_2px_8px_rgba(16,185,129,0.5)]">
                          {plantInfo.icon}
                        </div>

                        <div className="text-[9px] text-emerald-300 font-bold mt-0.5 truncate max-w-[55px]">
                          {plantInfo.name.split(' ')[0]}
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Flying Projectiles on this Row */}
            {projectiles
              .filter((p) => p.row === r)
              .map((proj) => {
                // Calculate percentage left based on colPosition (0 to 6)
                const leftPercent = Math.min(100, Math.max(0, (proj.colPosition / COLS) * 100));

                return (
                  <div
                    key={proj.id}
                    className="absolute z-20 w-3.5 h-3.5 bg-emerald-400 border border-emerald-200 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.9)] pointer-events-none transform -translate-y-1/2 top-1/2"
                    style={{ left: `calc(48px + ${leftPercent * 0.85}%)` }}
                  />
                );
              })}

            {/* Marching Zombies on this Row */}
            {zombies
              .filter((z) => z.row === r)
              .map((zombie) => {
                const zombieInfo = PVZ_ZOMBIES[zombie.zombieId] || PVZ_ZOMBIES.zombie_normal;
                const leftPercent = Math.min(100, Math.max(0, (zombie.colPosition / COLS) * 100));

                return (
                  <div
                    key={zombie.id}
                    className="absolute z-20 flex flex-col items-center justify-center pointer-events-none transition-all"
                    style={{
                      left: `calc(48px + ${leftPercent * 0.85}%)`,
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {/* Zombie HP Bar */}
                    <div className="w-10 sm:w-12 h-1.5 bg-neutral-900 border border-neutral-700 rounded-full overflow-hidden mb-1">
                      <div
                        className={`h-full transition-all ${
                          zombieInfo.isBoss ? 'bg-rose-500' : 'bg-red-400'
                        }`}
                        style={{
                          width: `${Math.max(0, (zombie.hp / zombie.maxHp) * 100)}%`
                        }}
                      />
                    </div>

                    {/* Zombie Visual with biting animation if attacking */}
                    <motion.div
                      animate={zombie.isAttacking ? { x: [-2, 2, -2] } : {}}
                      transition={{ repeat: Infinity, duration: 0.3 }}
                      className={`text-3xl sm:text-4xl filter drop-shadow-[0_2px_8px_rgba(225,29,72,0.6)] ${
                        zombieInfo.isBoss ? 'scale-125' : ''
                      }`}
                    >
                      {zombieInfo.icon}
                    </motion.div>

                    <div className="text-[9px] text-rose-300 font-bold bg-black/60 px-1 rounded-xs truncate max-w-[60px]">
                      {zombieInfo.name.split(' ')[0]}
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      {/* Interactive Floating Sun Drops */}
      <AnimatePresence>
        {sunDrops.map((sun) => {
          const topPercent = (sun.row / ROWS) * 100 + 10;
          const leftPercent = (sun.col / COLS) * 80 + 10;

          return (
            <motion.button
              key={sun.id}
              initial={{ scale: 0, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: -20 }}
              whileHover={{ scale: 1.25 }}
              onClick={(e) => {
                e.stopPropagation();
                soundManager.play('item_get');
                onCollectSun(sun.id, sun.value);
              }}
              className="absolute z-40 w-9 h-9 bg-amber-400 border-2 border-yellow-100 rounded-full flex items-center justify-center text-lg shadow-[0_0_15px_rgba(251,191,36,0.9)] cursor-pointer animate-bounce"
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
