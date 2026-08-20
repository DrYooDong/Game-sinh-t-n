import React, { useState } from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../../utils/audio';
import { PvzDaveUpgrade } from '../types';
import { ShoppingBag, Zap, X, Check, ArrowUpRight, Sparkles, Dna, Sprout, ShieldCheck } from 'lucide-react';

interface PvzDaveShopModalProps {
  energy: number;
  beastCores: number;
  upgrades: PvzDaveUpgrade[];
  onUpgrade: (upgradeId: string) => void;
  onClose: () => void;
}

export const PvzDaveShopModal: React.FC<PvzDaveShopModalProps> = ({
  energy,
  beastCores,
  upgrades,
  onUpgrade,
  onClose
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'garden' | 'genetics' | 'purification'>('all');

  const filteredUpgrades = upgrades.filter(
    (u) => activeCategory === 'all' || u.category === activeCategory
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        className="w-full max-w-3xl bg-neutral-950 border-2 border-amber-500/60 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative rounded-xs"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-950 border border-amber-500 flex items-center justify-center text-xl rounded-xs">
              👨‍🌾
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white uppercase flex items-center gap-2">
                <span>CỬA HÀNG SÂN VƯỜN & VIỆN Y SINH BÁC SĨ DAVE</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Tiêu hao Năng Lượng ⚡ và Tinh Hạch Ma Thú 🔮 để nâng cấp vũ khí sinh học
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.play('click');
              onClose();
            }}
            className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resources Bars */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-neutral-900 border border-neutral-800 rounded-xs mb-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400 font-bold">Năng Lượng ⚡:</span>
            <span className="text-cyan-400 font-black text-sm">{energy} ⚡</span>
          </div>
          <div className="flex items-center justify-between border-l border-neutral-800 pl-3">
            <span className="text-neutral-400 font-bold">Tinh Hạch Ma Thú 🔮:</span>
            <span className="text-fuchsia-400 font-black text-sm">{beastCores} 🔮</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-neutral-800">
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveCategory('all');
            }}
            className={`px-3 py-1 text-xs font-bold rounded-xs cursor-pointer transition-all ${
              activeCategory === 'all'
                ? 'bg-amber-500 text-neutral-950 font-black'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            Tất Cả
          </button>
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveCategory('garden');
            }}
            className={`px-3 py-1 text-xs font-bold rounded-xs cursor-pointer transition-all flex items-center gap-1 ${
              activeCategory === 'garden'
                ? 'bg-emerald-500 text-neutral-950 font-black'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>Sân Vườn</span>
          </button>
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveCategory('genetics');
            }}
            className={`px-3 py-1 text-xs font-bold rounded-xs cursor-pointer transition-all flex items-center gap-1 ${
              activeCategory === 'genetics'
                ? 'bg-fuchsia-500 text-neutral-950 font-black'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Dna className="w-3.5 h-3.5" />
            <span>Gen & Tinh Hạch</span>
          </button>
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveCategory('purification');
            }}
            className={`px-3 py-1 text-xs font-bold rounded-xs cursor-pointer transition-all flex items-center gap-1 ${
              activeCategory === 'purification'
                ? 'bg-cyan-500 text-neutral-950 font-black'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Huyết Thanh</span>
          </button>
        </div>

        {/* Upgrade List */}
        <div className="overflow-y-auto space-y-2.5 flex-1 pr-1 max-h-[50vh]">
          {filteredUpgrades.map((item) => {
            const isMax = item.level >= item.maxLevel;
            const costEnergy = item.costEnergy * (item.level + 1);
            const costCores = item.costBeastCore ? item.costBeastCore * (item.level + 1) : 0;
            const canAfford = energy >= costEnergy && beastCores >= costCores && !isMax;

            return (
              <div
                key={item.id}
                className={`p-3.5 border rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                  isMax
                    ? 'bg-neutral-900/60 border-neutral-800 opacity-60'
                    : canAfford
                    ? 'bg-neutral-900 border-amber-500/40 hover:border-amber-400'
                    : 'bg-neutral-950 border-neutral-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 bg-neutral-950 border border-neutral-700 flex items-center justify-center text-2xl rounded-xs shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-black text-white">{item.name}</h4>
                      <span className="text-[10px] px-1.5 py-0.2 bg-neutral-800 text-amber-300 border border-neutral-700 font-bold">
                        Cấp {item.level}/{item.maxLevel}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 mt-1">{item.description}</p>
                    <div className="text-[11px] text-emerald-400 font-bold mt-1">
                      Hiệu quả: {item.effect}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end">
                  {isMax ? (
                    <span className="px-3 py-1.5 bg-neutral-800 text-neutral-400 text-xs font-bold rounded-xs flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>TỐI ĐA</span>
                    </span>
                  ) : (
                    <button
                      disabled={!canAfford}
                      onClick={() => {
                        soundManager.play('level_up');
                        onUpgrade(item.id);
                      }}
                      className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                        canAfford
                          ? 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-neutral-950 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                          : 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed'
                      }`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>
                        {costEnergy} ⚡ {costCores > 0 ? `+ ${costCores} 🔮` : ''} NÂNG CẤP
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
