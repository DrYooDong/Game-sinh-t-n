import React from 'react';
import { soundManager } from '../../utils/audio';
import { PlantData, PlantId } from '../types';
import { PVZ_PLANTS } from '../data/pvzData';
import { Sun, Lock } from 'lucide-react';

interface PvzPlantSelectorProps {
  selectedPlantId: PlantId | null;
  onSelectPlant: (plantId: PlantId | null) => void;
  sunlight: number;
  cooldowns: Record<PlantId, number>; // remaining seconds
  currentWave: number;
}

export const PvzPlantSelector: React.FC<PvzPlantSelectorProps> = ({
  selectedPlantId,
  onSelectPlant,
  sunlight,
  cooldowns,
  currentWave
}) => {
  return (
    <div className="w-full flex items-center gap-2 p-2 bg-neutral-950/90 border border-neutral-800 rounded-xs select-none font-mono overflow-x-auto scrollbar-thin scrollbar-thumb-emerald-700">
      {PVZ_PLANTS.map((plant) => {
        const isUnlocked = (plant.unlockedAtWave || 1) <= currentWave + 1;
        const isSelected = selectedPlantId === plant.id;
        const cooldown = cooldowns[plant.id] || 0;
        const canAfford = isUnlocked && sunlight >= plant.sunCost && cooldown <= 0;

        if (!isUnlocked) {
          return (
            <div
              key={plant.id}
              className="relative flex flex-col items-center justify-center p-2 min-w-[80px] sm:min-w-[90px] h-[95px] border border-neutral-800/60 bg-neutral-950/40 rounded-xs opacity-40 shrink-0"
              title={`Mở khóa sau Vòng 0${(plant.unlockedAtWave || 1) - 1}`}
            >
              <Lock className="w-5 h-5 text-neutral-500 mb-1" />
              <div className="text-[9px] text-neutral-500 font-bold text-center truncate w-full">
                Vòng 0{plant.unlockedAtWave}
              </div>
            </div>
          );
        }

        return (
          <button
            key={plant.id}
            disabled={!canAfford && !isSelected}
            onClick={() => {
              if (isSelected) {
                onSelectPlant(null);
              } else if (canAfford) {
                soundManager.play('click');
                onSelectPlant(plant.id);
              }
            }}
            className={`relative flex flex-col items-center justify-between p-2 min-w-[80px] sm:min-w-[92px] h-[95px] border-2 rounded-xs transition-all cursor-pointer shrink-0 ${
              isSelected
                ? 'bg-emerald-900/60 border-emerald-400 scale-105 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                : canAfford
                ? 'bg-neutral-900/90 border-neutral-700 hover:border-emerald-500/70 hover:bg-neutral-800'
                : 'bg-neutral-950/60 border-neutral-800 opacity-45 cursor-not-allowed'
            }`}
          >
            {/* Cooldown Overlay */}
            {cooldown > 0 && (
              <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-xs font-black text-amber-400 rounded-xs z-10">
                {cooldown.toFixed(0)}s
              </div>
            )}

            {/* Plant Icon & Name */}
            <div className="text-2xl sm:text-3xl my-0.5">{plant.icon}</div>
            <div className="text-[10px] sm:text-[11px] font-black text-white text-center truncate w-full">
              {plant.name.split(' ')[0]}
            </div>

            {/* Sun Cost Badge */}
            <div className="flex items-center gap-1 text-[10px] font-black text-amber-300 bg-black/60 px-1.5 py-0.2 rounded-full border border-amber-500/40">
              <Sun className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{plant.sunCost}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
