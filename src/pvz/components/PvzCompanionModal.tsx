import React from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../../utils/audio';
import { PvzCompanion } from '../types';
import { Users, Heart, Sparkles, X, Shield, Swords } from 'lucide-react';

interface PvzCompanionModalProps {
  companions: PvzCompanion[];
  onClose: () => void;
}

export const PvzCompanionModal: React.FC<PvzCompanionModalProps> = ({
  companions,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        className="w-full max-w-3xl bg-neutral-950 border-2 border-emerald-500/60 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative rounded-xs"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-950 border border-emerald-500 flex items-center justify-center text-xl rounded-xs">
              👥
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white uppercase flex items-center gap-2">
                <span>THẾ LỰC VĨNH HẰNG GIA VIÊN & ĐỒNG ĐỘI</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Những người sống sót trung thành đi theo Tuyết Mộc trong Ngày Tận Thế
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

        {/* Companions Grid */}
        <div className="overflow-y-auto space-y-3 flex-1 pr-1 max-h-[60vh]">
          {companions.map((comp) => (
            <div
              key={comp.id}
              className={`p-4 border rounded-xs transition-all ${
                comp.isUnlocked
                  ? 'bg-neutral-900 border-emerald-500/40 shadow-sm'
                  : 'bg-neutral-950 border-neutral-800 opacity-60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-2.5 mb-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-neutral-950 border border-emerald-500/60 flex items-center justify-center text-3xl rounded-xs">
                    {comp.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-white">{comp.name}</h4>
                      <span className="text-[10px] px-1.5 py-0.2 bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold">
                        {comp.role}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-bold">{comp.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1 text-rose-400 font-bold bg-neutral-950 px-2 py-1 border border-neutral-800 rounded-xs">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Độ Trung Thành: {comp.loyalty}%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-neutral-950 p-2.5 border border-neutral-800 rounded-xs mb-2">
                <div>
                  <span className="text-emerald-400 font-bold block mb-0.5">Kỹ Năng Đặc Biệt:</span>
                  <div className="text-white font-black">{comp.specialSkill}</div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">{comp.skillDesc}</div>
                </div>
                <div>
                  <span className="text-cyan-400 font-bold block mb-0.5">Lời Thoại & Tâm Trạng:</span>
                  <div className="text-neutral-300 italic text-[11px]">"{comp.dialogue}"</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
