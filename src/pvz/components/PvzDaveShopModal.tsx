import React from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../../utils/audio';
import { PvzDaveUpgrade } from '../types';
import { ShoppingBag, Zap, X, Check, ArrowUpRight, Sparkles } from 'lucide-react';

interface PvzDaveShopModalProps {
  energy: number;
  upgrades: PvzDaveUpgrade[];
  onUpgrade: (upgradeId: string) => void;
  onClose: () => void;
}

export const PvzDaveShopModal: React.FC<PvzDaveShopModalProps> = ({
  energy,
  upgrades,
  onUpgrade,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        className="w-full max-w-2xl bg-neutral-950 border-2 border-amber-500/60 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative rounded-xs"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-950 border border-amber-500 flex items-center justify-center text-xl rounded-xs">
              👨‍🌾
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white uppercase flex items-center gap-2">
                <span>CỬA HÀNG SÂN VƯỜN BÁC SĨ ĐÉP (CRAZY DAVE)</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Tiêu hao Năng Lượng ⚡ thu được từ Zombie để nâng cấp công nghệ sinh học
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

        {/* Current Energy Bar */}
        <div className="flex items-center justify-between p-3 bg-neutral-900 border border-neutral-800 rounded-xs mb-3">
          <span className="text-xs text-neutral-300 font-bold">Năng Lượng Hiện Có:</span>
          <div className="flex items-center gap-1.5 text-cyan-400 font-black text-sm">
            <Zap className="w-4 h-4 fill-current" />
            <span>{energy} ⚡</span>
          </div>
        </div>

        {/* Upgrade List */}
        <div className="overflow-y-auto space-y-2.5 flex-1 pr-1 max-h-[55vh]">
          {upgrades.map((item) => {
            const isMax = item.level >= item.maxLevel;
            const cost = item.costEnergy * (item.level + 1);
            const canAfford = energy >= cost && !isMax;

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
                      <span>{cost} ⚡ NÂNG CẤP</span>
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
