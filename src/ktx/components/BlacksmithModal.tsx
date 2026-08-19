import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Equipment, Item } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Hammer,
  Sparkles,
  Shield,
  Swords,
  X,
  Zap,
  TrendingUp,
  Flame,
  AlertCircle
} from 'lucide-react';

interface BlacksmithModalProps {
  equipment: Equipment;
  inventory: Item[];
  onEnhanceItem: (slot: keyof Equipment) => void;
  onSocketGem: (slot: keyof Equipment, gemItem: Item) => void;
  onClose: () => void;
}

export const BlacksmithModal: React.FC<BlacksmithModalProps> = ({
  equipment,
  inventory,
  onEnhanceItem,
  onSocketGem,
  onClose
}) => {
  const [selectedSlot, setSelectedSlot] = useState<keyof Equipment>('weapon');
  const [enhanceSuccessRate, setEnhanceSuccessRate] = useState<number>(85);
  const [lastResult, setLastResult] = useState<'success' | 'fail' | null>(null);

  const currentItem = equipment[selectedSlot];
  const scrapMaterials = inventory.find((i) => i.id === 'mat_scrap');
  const scrapCount = scrapMaterials?.quantity || 0;
  const currentEnhanceLevel = currentItem?.enhanceLevel || 0;
  const requiredScraps = (currentEnhanceLevel + 1) * 3;

  const canEnhance = currentItem !== null && scrapCount >= requiredScraps && currentEnhanceLevel < 15;

  const handleEnhance = () => {
    if (!canEnhance) return;
    const rate = Math.max(25, 95 - currentEnhanceLevel * 6);
    const isSuccess = Math.random() * 100 <= rate;

    if (isSuccess) {
      soundManager.play('level_up');
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      setLastResult('success');
      onEnhanceItem(selectedSlot);
    } else {
      soundManager.play('danger');
      setLastResult('fail');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-3xl bg-neutral-950 border-2 border-amber-500/50 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative"
      >
        {/* Badge */}
        <div className="absolute -top-3.5 left-6 bg-amber-500 text-neutral-950 px-3 py-0.5 text-[11px] font-black uppercase tracking-tighter">
          Lò Rèn Kỹ Thuật Dã Chiến
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 mb-3 mt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-neutral-800 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Hammer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                Cường Hóa & Tinh Luyện Trang Bị (+15)
              </h3>
              <p className="text-[10px] text-neutral-400">
                Sử dụng Mảnh Kim Loại để nâng cấp cấp độ trang bị và tăng mạnh chỉ số tấn công / phòng thủ
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

        {/* Slot Selector */}
        <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
          {(['weapon', 'armor', 'accessory'] as (keyof Equipment)[]).map((slot) => {
            const item = equipment[slot];
            const isSelected = selectedSlot === slot;
            return (
              <button
                key={slot}
                onClick={() => {
                  soundManager.play('click');
                  setSelectedSlot(slot);
                  setLastResult(null);
                }}
                className={`p-2.5 border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-950/80 border-amber-500 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <div className="w-7 h-7 bg-neutral-800 border border-neutral-700 flex items-center justify-center text-sm">
                  {item ? item.icon : '🈳'}
                </div>
                <div className="truncate">
                  <div className="text-[9px] uppercase font-bold text-neutral-400">{slot === 'weapon' ? 'VŨ KHÍ' : slot === 'armor' ? 'GIÁP' : 'PHỤ KIỆN'}</div>
                  <div className="text-xs font-bold text-white truncate">
                    {item ? `${item.name} ${item.enhanceLevel ? `+${item.enhanceLevel}` : ''}` : 'Trống'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Enhancement Chamber */}
        {currentItem ? (
          <div className="flex-1 flex flex-col space-y-3">
            <div className="p-4 bg-neutral-900 border border-amber-500/40 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase">Trang Bị Đang Chọn:</span>
                <span className="text-xs px-2 py-0.5 bg-amber-950 text-amber-400 border border-amber-500 font-bold font-mono">
                  CẤP ĐỘ: +{currentEnhanceLevel} / 15
                </span>
              </div>

              <div className="flex items-center gap-3 my-2.5">
                <span className="text-4xl">{currentItem.icon}</span>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {currentItem.name} <span className="text-amber-400 font-bold">+{currentEnhanceLevel}</span>
                  </h4>
                  <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                    {currentItem.stats?.atk && `Sát thương ATK: ${currentItem.stats.atk + currentEnhanceLevel * 4} (+${currentEnhanceLevel * 4})`}
                    {currentItem.stats?.def && `Phòng thủ DEF: ${currentItem.stats.def + currentEnhanceLevel * 3} (+${currentEnhanceLevel * 3})`}
                  </div>
                </div>
              </div>

              {/* Requirement Box */}
              <div className="grid grid-cols-2 gap-2 bg-neutral-950 p-2.5 border border-neutral-800 text-[11px]">
                <div>
                  <span className="text-neutral-400 block mb-0.5">Mảnh Kim Loại Cần:</span>
                  <span className={scrapCount >= requiredScraps ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                    {scrapCount} / {requiredScraps} Mảnh
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">Tỉ Lệ Thành Công:</span>
                  <span className="text-cyan-400 font-bold">{Math.max(25, 95 - currentEnhanceLevel * 6)}%</span>
                </div>
              </div>
            </div>

            {/* Result Alert */}
            {lastResult === 'success' && (
              <div className="p-2.5 bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-bold text-center">
                ✨ CƯỜNG HÓA THÀNH CÔNG LÊN +{currentEnhanceLevel}!
              </div>
            )}
            {lastResult === 'fail' && (
              <div className="p-2.5 bg-red-950/80 border border-red-500 text-red-300 text-xs font-bold text-center">
                💥 CƯỜNG HÓA THẤT BẠI! Hãy thử lại!
              </div>
            )}

            {/* Action button */}
            <button
              disabled={!canEnhance}
              onClick={handleEnhance}
              className={`w-full py-3 text-xs font-bold uppercase tracking-widest border transition-all ${
                canEnhance
                  ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-800 cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                  : 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
              }`}
            >
              {currentEnhanceLevel >= 15
                ? 'ĐÃ ĐẠT CẤP TỐI ĐA (+15)'
                : `TIẾN HÀNH CƯỜNG HÓA (+${currentEnhanceLevel + 1})`}
            </button>
          </div>
        ) : (
          <div className="p-8 text-center text-neutral-500 italic text-xs">
            Chưa có trang bị ở ô này. Hãy trang bị vũ khí hoặc giáp trong Túi Đồ trước!
          </div>
        )}
      </motion.div>
    </div>
  );
};
