import React, { useState } from 'react';
import { soundManager } from '../../utils/audio';
import { PlantId } from '../types';
import { PVZ_PLANTS } from '../data/pvzData';
import { getPlantEffectiveStats } from './PvzPlantMasteryModal';
import { Sun, Lock, Sparkles, Filter, Zap } from 'lucide-react';

interface PvzPlantSelectorProps {
  selectedPlantId: PlantId | null;
  onSelectPlant: (plantId: PlantId | null) => void;
  sunlight: number;
  cooldowns: Record<PlantId, number>; // remaining seconds
  currentWave: number;
  isPlantFoodPrimed?: boolean;
  plantLevels?: Record<PlantId, number>;
}

type FilterCategory = 'all' | 'attack' | 'sun' | 'defense' | 'instant';

export const PvzPlantSelector: React.FC<PvzPlantSelectorProps> = ({
  selectedPlantId,
  onSelectPlant,
  sunlight,
  cooldowns,
  currentWave,
  isPlantFoodPrimed = false,
  plantLevels = {}
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [hoveredPlantId, setHoveredPlantId] = useState<PlantId | null>(null);

  const filteredPlants = PVZ_PLANTS.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'attack') return p.attackDmg > 0 && p.category !== 'instant_pi';
    if (activeFilter === 'sun') return p.id.includes('sunflower');
    if (activeFilter === 'defense') return p.id.includes('wall') || p.id.includes('pumpkin') || p.id.includes('tallnut');
    if (activeFilter === 'instant') return p.category === 'instant_pi' || p.id.includes('cherry') || p.id.includes('jalapeno') || p.id.includes('squash');
    return true;
  });

  const hoveredPlant = PVZ_PLANTS.find((p) => p.id === hoveredPlantId);

  return (
    <div className="w-full flex flex-col gap-1.5 p-2 sm:p-2.5 bg-neutral-950/95 border-2 border-emerald-500/40 rounded-xs select-none font-mono shadow-2xl backdrop-blur-md">
      {/* Top Deck Header & Filters */}
      <div className="flex items-center justify-between gap-2 px-1 text-xs">
        <div className="flex items-center gap-1.5 font-black text-amber-300 uppercase tracking-wider">
          <span className="text-base">🌱</span>
          <span className="hidden sm:inline">KHAY THẺ CÂY TRỒNG (SEED PACKETS)</span>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1 overflow-x-auto text-[10px] font-bold">
          {(
            [
              { id: 'all', label: 'Tất Cả' },
              { id: 'attack', label: '⚔️ Tấn Công' },
              { id: 'sun', label: '☀️ Năng Lượng' },
              { id: 'defense', label: '🛡️ Phòng Ngự' },
              { id: 'instant', label: '💥 Tức Thì' }
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundManager.play('click');
                setActiveFilter(cat.id);
              }}
              className={`px-2 py-0.5 rounded-xs transition-all cursor-pointer border ${
                activeFilter === cat.id
                  ? 'bg-emerald-600 text-white border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.6)] font-black'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Seed Packets Carousel */}
      <div className="w-full flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-emerald-700">
        {filteredPlants.map((plant) => {
          const isUnlocked = (plant.unlockedAtWave || 1) <= currentWave + 1;
          const isSelected = selectedPlantId === plant.id;
          const lvl = plantLevels[plant.id] || 1;
          const stats = getPlantEffectiveStats(plant, lvl);
          const effectiveSun = stats.effectiveSunCost;
          const cooldown = cooldowns[plant.id] || 0;
          const maxCooldown = stats.effectiveCooldown || 5;
          const cooldownPct = cooldown > 0 ? (cooldown / maxCooldown) * 100 : 0;
          const canAfford = isUnlocked && sunlight >= effectiveSun && cooldown <= 0;

          if (!isUnlocked) {
            return (
              <div
                key={plant.id}
                className="relative flex flex-col items-center justify-center p-2 min-w-[76px] sm:min-w-[86px] h-[100px] border border-neutral-800/60 bg-neutral-950/60 rounded-xs opacity-40 shrink-0"
                title={`Mở khóa sau Vòng 0${(plant.unlockedAtWave || 1) - 1}`}
              >
                <Lock className="w-4 h-4 text-neutral-500 mb-1" />
                <div className="text-[8px] text-neutral-500 font-bold text-center truncate w-full">
                  Khóa (V{plant.unlockedAtWave})
                </div>
              </div>
            );
          }

          return (
            <button
              key={plant.id}
              disabled={!canAfford && !isSelected}
              onMouseEnter={() => setHoveredPlantId(plant.id)}
              onMouseLeave={() => setHoveredPlantId(null)}
              onClick={() => {
                if (isSelected) {
                  onSelectPlant(null);
                } else if (canAfford) {
                  soundManager.play('click');
                  onSelectPlant(plant.id);
                }
              }}
              className={`relative flex flex-col items-center justify-between p-1 min-w-[76px] sm:min-w-[86px] h-[100px] border-2 rounded-xs transition-all cursor-pointer shrink-0 overflow-hidden shadow-md ${
                isSelected
                  ? 'bg-gradient-to-b from-emerald-800 to-emerald-950 border-emerald-300 scale-105 shadow-[0_0_15px_rgba(16,185,129,0.7)] ring-2 ring-emerald-400'
                  : isPlantFoodPrimed && plant.plantFoodUlt
                  ? 'bg-emerald-950/90 border-emerald-400 ring-1 ring-emerald-300 animate-pulse'
                  : canAfford
                  ? 'bg-neutral-900 border-neutral-700 hover:border-emerald-500 hover:bg-neutral-800/90'
                  : 'bg-neutral-950/80 border-neutral-800 opacity-50 cursor-not-allowed'
              }`}
            >
              {/* Level Badge */}
              <span
                className={`absolute top-0.5 right-0.5 text-[8px] font-black px-1 rounded-xs z-10 ${
                  lvl >= 10
                    ? 'bg-amber-500 text-black border border-yellow-200 animate-pulse'
                    : lvl > 1
                    ? 'bg-emerald-700 text-emerald-100 border border-emerald-500'
                    : 'bg-black/60 text-neutral-400'
                }`}
              >
                Lv.{lvl >= 10 ? 'MAX' : lvl}
              </span>

              {/* Radial / Top-down Cooldown Shade Overlay */}
              {cooldown > 0 && (
                <div
                  className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-15 pointer-events-none transition-all"
                  style={{
                    clipPath: `inset(0 0 ${100 - cooldownPct}% 0)`
                  }}
                >
                  <span className="text-xs font-black text-amber-300 drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                    {cooldown.toFixed(1)}s
                  </span>
                </div>
              )}

              {/* Plant Card Header Category */}
              <div className="w-full flex items-center justify-between px-1">
                <span className="text-[7px] text-neutral-400 font-bold uppercase truncate max-w-[45px]">
                  {plant.specialTrait ? plant.specialTrait.split(' ')[0] : 'Thực Vật'}
                </span>
                {plant.plantFoodUlt && (
                  <span className="text-[8px] text-emerald-400 mr-8" title="Có Chiêu Cuối Hạt Năng Lượng">⚡</span>
                )}
              </div>

              {/* Plant Icon / Image */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center my-0.5 relative">
                {plant.imageUrl ? (
                  <img
                    src={plant.imageUrl}
                    alt={plant.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'inline';
                    }}
                  />
                ) : null}
                <span
                  className="text-2xl sm:text-3xl"
                  style={{ display: plant.imageUrl ? 'none' : 'inline' }}
                >
                  {plant.icon}
                </span>
              </div>

              {/* Plant Short Name */}
              <div className="text-[9px] sm:text-[10px] font-black text-white text-center truncate w-full px-0.5">
                {plant.name.split(' ')[0]}
              </div>

              {/* Sun Cost Badge */}
              <div className="w-full flex items-center justify-center gap-1 text-[10px] font-black text-amber-300 bg-black/80 py-0.5 rounded-xs border border-amber-500/50 shadow-inner">
                <Sun className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                <span>{effectiveSun}</span>
                {stats.sunDiscount > 0 && <span className="text-[8px] text-emerald-400 font-black">(-{stats.sunDiscount})</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Hovered Plant Card Tooltip Preview */}
      {hoveredPlant && (
        <div className="bg-neutral-900/95 border border-emerald-500/50 p-2 rounded-xs text-xs flex items-center justify-between gap-3 text-neutral-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{hoveredPlant.icon}</span>
            <div>
              <div className="font-black text-white flex items-center gap-1.5">
                <span>{hoveredPlant.name}</span>
                <span className="text-[10px] text-amber-300 font-bold">
                  (Lv.{plantLevels[hoveredPlant.id] || 1} • {getPlantEffectiveStats(hoveredPlant, plantLevels[hoveredPlant.id] || 1).effectiveSunCost} ☀️)
                </span>
              </div>
              <div className="text-[11px] text-neutral-300">{hoveredPlant.description}</div>
            </div>
          </div>

          {hoveredPlant.plantFoodUlt && (
            <div className="hidden md:flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/60 px-2 py-1 rounded-xs text-[10px] shrink-0">
              <span className="text-sm">{hoveredPlant.plantFoodUlt.icon}</span>
              <div>
                <span className="font-black text-emerald-300">Chiêu Cuối: </span>
                <span className="text-neutral-300">{hoveredPlant.plantFoodUlt.description}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
