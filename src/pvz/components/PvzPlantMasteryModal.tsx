import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';
import { PVZ_PLANTS } from '../data/pvzData';
import { PlantId, PlantData } from '../types';
import {
  Dna,
  Zap,
  Sparkles,
  Shield,
  Sun,
  Clock,
  ArrowRight,
  CheckCircle2,
  X,
  Star,
  Flame,
  Award
} from 'lucide-react';

interface PvzPlantMasteryModalProps {
  plantLevels: Record<PlantId, number>;
  energy: number;
  beastCores: number;
  currentWave: number;
  onUpgradePlant: (plantId: PlantId) => boolean;
  onClose: () => void;
}

export function getPlantUpgradeCost(level: number): { costEnergy: number; costBeastCore: number } {
  if (level >= 10) return { costEnergy: 0, costBeastCore: 0 };
  const costs = [
    { costEnergy: 10, costBeastCore: 1 }, // 1 -> 2
    { costEnergy: 20, costBeastCore: 1 }, // 2 -> 3
    { costEnergy: 35, costBeastCore: 2 }, // 3 -> 4
    { costEnergy: 50, costBeastCore: 2 }, // 4 -> 5
    { costEnergy: 75, costBeastCore: 3 }, // 5 -> 6
    { costEnergy: 100, costBeastCore: 3 }, // 6 -> 7
    { costEnergy: 150, costBeastCore: 4 }, // 7 -> 8
    { costEnergy: 200, costBeastCore: 4 }, // 8 -> 9
    { costEnergy: 300, costBeastCore: 5 }  // 9 -> 10 (MAX)
  ];
  return costs[level - 1] || { costEnergy: 100, costBeastCore: 2 };
}

export function getPlantEffectiveStats(plant: PlantData, level: number = 1) {
  const lvl = Math.max(1, Math.min(10, level));
  const dmgMultiplier = 1 + (lvl - 1) * 0.15; // +15% per level, up to +135%
  const hpMultiplier = 1 + (lvl - 1) * 0.15;
  const cooldownMultiplier = Math.max(0.65, 1 - (lvl - 1) * 0.04); // up to -36%

  let sunDiscount = 0;
  if (lvl >= 8) sunDiscount = 50;
  else if (lvl >= 4) sunDiscount = 25;

  const effectiveSunCost = Math.max(25, plant.sunCost - sunDiscount);
  const effectiveDamage = Math.round(plant.attackDmg * dmgMultiplier);
  const effectiveHp = Math.round(plant.maxHp * hpMultiplier);
  const effectiveCooldown = +(plant.cooldownSec * cooldownMultiplier).toFixed(1);

  return {
    level: lvl,
    effectiveSunCost,
    effectiveDamage,
    effectiveHp,
    effectiveCooldown,
    sunDiscount
  };
}

export const PvzPlantMasteryModal: React.FC<PvzPlantMasteryModalProps> = ({
  plantLevels,
  energy,
  beastCores,
  currentWave,
  onUpgradePlant,
  onClose
}) => {
  const [selectedPlantId, setSelectedPlantId] = useState<PlantId>(PVZ_PLANTS[0].id);

  const selectedPlant = PVZ_PLANTS.find((p) => p.id === selectedPlantId) || PVZ_PLANTS[0];
  const currentLevel = plantLevels[selectedPlantId] || 1;
  const isMaxLevel = currentLevel >= 10;
  const upgradeCost = getPlantUpgradeCost(currentLevel);

  const currentStats = getPlantEffectiveStats(selectedPlant, currentLevel);
  const nextStats = getPlantEffectiveStats(selectedPlant, currentLevel + 1);

  const canAfford =
    !isMaxLevel &&
    energy >= upgradeCost.costEnergy &&
    beastCores >= upgradeCost.costBeastCore;

  const handleUpgrade = () => {
    if (!canAfford) return;
    const success = onUpgradePlant(selectedPlantId);
    if (success) {
      soundManager.play('level_up');
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="w-full max-w-5xl bg-neutral-950 border-2 border-emerald-500/70 p-3 sm:p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[92vh] relative rounded-xs bg-gradient-to-b from-neutral-950 via-emerald-950/20 to-neutral-950"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-950 border border-emerald-400 flex items-center justify-center text-2xl rounded-xs shadow-[0_0_12px_rgba(16,185,129,0.5)]">
              🧬
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white uppercase flex items-center gap-2 tracking-wider">
                <span>VIỆN NGHIÊN CỨU DI TRUYỀN & TIẾN HÓA THỰC VẬT (PLANT MASTERY)</span>
              </h3>
              <p className="text-[10px] sm:text-xs text-neutral-400">
                Tinh luyện gen Ma Thú để cường hóa sinh lực, sát thương và giảm tiêu hao Nắng
              </p>
            </div>
          </div>

          {/* Resources & Close */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-xs text-xs">
              <div className="flex items-center gap-1 text-cyan-300 font-black">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>{energy}</span>
              </div>
              <div className="w-px h-3.5 bg-neutral-700" />
              <div className="flex items-center gap-1 text-fuchsia-300 font-black">
                <span>🔮</span>
                <span>{beastCores} Tinh Hạch</span>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.play('click');
                onClose();
              }}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer rounded-xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-1 overflow-hidden">
          {/* Left Col (5/12): Unlocked Plants Grid */}
          <div className="md:col-span-5 bg-neutral-950/80 border border-neutral-800 p-2.5 rounded-xs flex flex-col overflow-hidden">
            <div className="text-xs font-black text-amber-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Danh Sách Cây Trồng ({PVZ_PLANTS.length})</span>
              <span className="text-[10px] text-neutral-400">Chọn để nâng cấp</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 overflow-y-auto pr-1 flex-1">
              {PVZ_PLANTS.map((plant) => {
                const isUnlocked = (plant.unlockedAtWave || 1) <= currentWave + 1;
                const lvl = plantLevels[plant.id] || 1;
                const isSelected = plant.id === selectedPlantId;

                return (
                  <button
                    key={plant.id}
                    disabled={!isUnlocked}
                    onClick={() => {
                      soundManager.play('click');
                      setSelectedPlantId(plant.id);
                    }}
                    className={`relative flex flex-col items-center justify-between p-1.5 rounded-xs border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950 border-emerald-400 ring-2 ring-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.6)] scale-105'
                        : isUnlocked
                        ? 'bg-neutral-900 border-neutral-700 hover:border-neutral-500 hover:bg-neutral-850'
                        : 'bg-neutral-950 border-neutral-800 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    {/* Level Badge */}
                    <span
                      className={`absolute top-0.5 right-0.5 text-[8px] font-black px-1 rounded-xs ${
                        lvl >= 10
                          ? 'bg-amber-500 text-black border border-yellow-200 animate-pulse'
                          : lvl >= 5
                          ? 'bg-cyan-600 text-white'
                          : 'bg-neutral-800 text-emerald-300'
                      }`}
                    >
                      Lv.{lvl >= 10 ? 'MAX' : lvl}
                    </span>

                    {/* Plant Icon / Image */}
                    <div className="w-8 h-8 flex items-center justify-center my-1 relative">
                      {plant.imageUrl ? (
                        <img
                          src={plant.imageUrl}
                          alt={plant.name}
                          className="w-full h-full object-contain filter drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'inline';
                          }}
                        />
                      ) : null}
                      <span
                        className="text-2xl"
                        style={{ display: plant.imageUrl ? 'none' : 'inline' }}
                      >
                        {plant.icon}
                      </span>
                    </div>

                    <div className="text-[9px] font-black text-white text-center truncate w-full">
                      {plant.name.split(' ')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Col (7/12): Genetic Mutation & Evolution Chamber */}
          <div className="md:col-span-7 bg-neutral-950/90 border border-neutral-800 p-3 sm:p-4 rounded-xs flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Plant Title & Banner */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-4xl p-2 bg-neutral-900 border border-emerald-500/50 rounded-xs shadow-inner">
                    {selectedPlant.icon}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                      <span>{selectedPlant.name}</span>
                      <span className="text-xs px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-600 rounded-xs font-black">
                        CẤP ĐỘ {currentLevel} {isMaxLevel && '★ MAX'}
                      </span>
                    </h4>
                    <p className="text-xs text-neutral-400 mt-0.5">{selectedPlant.description}</p>
                  </div>
                </div>
              </div>

              {/* Level Progress Stars */}
              <div className="bg-neutral-900/90 border border-neutral-800 p-2.5 rounded-xs mb-3">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-400 mb-1.5">
                  <span className="text-amber-300 uppercase tracking-wider font-black">Tiến Trình Đột Biến Gen:</span>
                  <span>Cấp {currentLevel} / 10</span>
                </div>
                <div className="flex items-center gap-1 justify-between">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const isPassed = i + 1 <= currentLevel;
                    return (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full transition-all ${
                          isPassed
                            ? 'bg-gradient-to-r from-emerald-400 to-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.6)]'
                            : 'bg-neutral-800'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Stat Comparison: Current vs Next Level */}
              <div className="space-y-2 mb-3">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block">
                  So Sánh Chỉ Số Thực Chiến:
                </span>

                {/* Damage Stat */}
                {selectedPlant.attackDmg > 0 && (
                  <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-2 rounded-xs text-xs">
                    <span className="text-neutral-400 flex items-center gap-1.5 font-bold">
                      <Flame className="w-3.5 h-3.5 text-rose-400" />
                      <span>Sát Thương (DMG):</span>
                    </span>
                    <div className="flex items-center gap-2 font-black">
                      <span className="text-white">{currentStats.effectiveDamage} DMG</span>
                      {!isMaxLevel && (
                        <>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                          <span className="text-emerald-400 font-black">+{nextStats.effectiveDamage - currentStats.effectiveDamage} ({nextStats.effectiveDamage})</span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* HP Stat */}
                <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-2 rounded-xs text-xs">
                  <span className="text-neutral-400 flex items-center gap-1.5 font-bold">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Sinh Lực (HP):</span>
                  </span>
                  <div className="flex items-center gap-2 font-black">
                    <span className="text-white">{currentStats.effectiveHp} HP</span>
                    {!isMaxLevel && (
                      <>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                        <span className="text-emerald-400 font-black">+{nextStats.effectiveHp - currentStats.effectiveHp} ({nextStats.effectiveHp})</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Sun Cost Stat */}
                <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-2 rounded-xs text-xs">
                  <span className="text-neutral-400 flex items-center gap-1.5 font-bold">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tiêu Hao Nắng (Sun Cost):</span>
                  </span>
                  <div className="flex items-center gap-2 font-black">
                    <span className="text-amber-300">{currentStats.effectiveSunCost} ☀️</span>
                    {!isMaxLevel && currentStats.effectiveSunCost > nextStats.effectiveSunCost && (
                      <>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                        <span className="text-amber-400 font-black">-25 ☀️ ({nextStats.effectiveSunCost})</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Cooldown Stat */}
                <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-2 rounded-xs text-xs">
                  <span className="text-neutral-400 flex items-center gap-1.5 font-bold">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Hồi Chiêu Thẻ Bài:</span>
                  </span>
                  <div className="flex items-center gap-2 font-black">
                    <span className="text-white">{currentStats.effectiveCooldown}s</span>
                    {!isMaxLevel && (
                      <>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                        <span className="text-cyan-300 font-black">{(nextStats.effectiveCooldown - currentStats.effectiveCooldown).toFixed(1)}s ({nextStats.effectiveCooldown}s)</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Special Mastery Perk info */}
              <div className="bg-emerald-950/30 border border-emerald-600/40 p-2.5 rounded-xs text-xs mb-3">
                <span className="font-black text-amber-300 flex items-center gap-1 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Đặc Quyền Cấp MAX (Lv.10):</span>
                </span>
                <p className="text-neutral-300 text-[11px] leading-relaxed">
                  Đột biến hoàn thiện cấu trúc gen, tối đa hóa sát thương toàn diện và nhận ưu đãi giảm tiêu hao Nắng cực đại!
                </p>
              </div>
            </div>

            {/* Upgrade Action Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
              {isMaxLevel ? (
                <div className="flex items-center gap-2 text-amber-400 font-black text-xs px-4 py-2 bg-amber-950/60 border border-amber-500/60 rounded-xs w-full justify-center">
                  <Award className="w-4 h-4" />
                  <span>ĐÃ TIẾN HÓA CẤP ĐỘ TỐI ĐA (MASTERY MAX)</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-neutral-400 font-bold">Chi Phí:</span>
                    <span className={`font-black ${energy >= upgradeCost.costEnergy ? 'text-cyan-300' : 'text-rose-400'}`}>
                      ⚡ {upgradeCost.costEnergy} Energy
                    </span>
                    <span className={`font-black ${beastCores >= upgradeCost.costBeastCore ? 'text-fuchsia-300' : 'text-rose-400'}`}>
                      🔮 {upgradeCost.costBeastCore} Tinh Hạch
                    </span>
                  </div>

                  <button
                    disabled={!canAfford}
                    onClick={handleUpgrade}
                    className={`px-5 py-2.5 rounded-xs font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                      canAfford
                        ? 'bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-400 hover:to-green-300 text-neutral-950 shadow-[0_0_15px_rgba(16,185,129,0.7)]'
                        : 'bg-neutral-900 border border-neutral-700 text-neutral-500 cursor-not-allowed'
                    }`}
                  >
                    <Dna className="w-4 h-4" />
                    <span>ĐỘT BIẾN GEN (LÊN CẤP {currentLevel + 1})</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
