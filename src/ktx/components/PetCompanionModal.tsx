import React from 'react';
import { motion } from 'motion/react';
import { PetCompanion, Item } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Heart,
  Zap,
  X,
  TrendingUp,
  Award,
  CheckCircle2,
  Check
} from 'lucide-react';

interface PetCompanionModalProps {
  pets: PetCompanion[];
  inventory: Item[];
  onSelectPet: (petId: string) => void;
  onFeedPet: (petId: string) => void;
  onClose: () => void;
}

export const PetCompanionModal: React.FC<PetCompanionModalProps> = ({
  pets,
  inventory,
  onSelectPet,
  onFeedPet,
  onClose
}) => {
  const foodItem = inventory.find((i) => i.id === 'food_bread' || i.id === 'food_noodle');
  const foodCount = foodItem?.quantity || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-3xl bg-neutral-950 border-2 border-emerald-500/50 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative"
      >
        {/* Badge */}
        <div className="absolute -top-3.5 left-6 bg-emerald-600 text-neutral-950 px-3 py-0.5 text-[11px] font-black uppercase tracking-tighter">
          Thực Thể Dị Biến & Thú Cưng Đồng Hành
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 mb-3 mt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-neutral-800 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                Trại Nuôi Dưỡng & Đồng Hành Chiến Đấu
              </h3>
              <p className="text-[10px] text-neutral-400">
                Thuần hóa các sinh vật đột biến, cho ăn để tăng cấp và xuất trận trợ chiến
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

        {/* Pet List */}
        <div className="space-y-2.5 overflow-y-auto flex-1 pr-1 max-h-[60vh]">
          {pets.map((pet) => {
            const isSelected = pet.isActive;

            return (
              <div
                key={pet.id}
                className={`p-3.5 border transition-all ${
                  isSelected
                    ? 'bg-neutral-900/90 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                    : 'bg-neutral-950/80 border-neutral-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-neutral-800 border border-neutral-700 rounded-sm flex items-center justify-center text-2xl shrink-0">
                      {pet.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white uppercase text-xs">{pet.name}</span>
                        <span className="text-[9px] px-1.5 py-0.2 bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold uppercase">
                          CẤP {pet.level} (HẠNG {pet.tier})
                        </span>
                        {isSelected && (
                          <span className="text-[9px] px-1.5 py-0.2 bg-emerald-600 text-white font-bold uppercase">
                            ĐANG XUẤT TRẬN
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">
                        Chủng loài: {pet.species}
                      </div>

                      {/* Pet Skill */}
                      <div className="mt-1.5 bg-neutral-950 p-2 border border-neutral-800 text-[10px]">
                        <span className="text-emerald-400 font-bold">✨ Kỹ Năng: {pet.skillName}</span>
                        <p className="text-neutral-300 mt-0.5">{pet.skillDesc}</p>
                      </div>

                      {/* Stat Buffs */}
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-amber-300 font-mono">
                        {pet.bonusStats.atk && <span>+ {pet.bonusStats.atk} Sát Thương (ATK)</span>}
                        {pet.bonusStats.def && <span>+ {pet.bonusStats.def} Phòng Thủ (DEF)</span>}
                        {pet.bonusStats.lootChance && <span>+ {pet.bonusStats.lootChance}% Tỉ lệ nhặt đồ hiếm</span>}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <button
                      disabled={isSelected}
                      onClick={() => {
                        soundManager.play('click');
                        onSelectPet(pet.id);
                      }}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-800 text-emerald-200 border-emerald-700 cursor-default'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-700'
                      }`}
                    >
                      {isSelected ? 'Đang Đi Cùng' : 'Chọn Đồng Hành'}
                    </button>

                    <button
                      disabled={foodCount <= 0}
                      onClick={() => {
                        soundManager.play('item_get');
                        onFeedPet(pet.id);
                      }}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase border transition-all cursor-pointer ${
                        foodCount > 0
                          ? 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border-neutral-700'
                          : 'bg-neutral-900 text-neutral-600 border-neutral-800 cursor-not-allowed'
                      }`}
                    >
                      Cho Ăn (Lương Thực: {foodCount})
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
