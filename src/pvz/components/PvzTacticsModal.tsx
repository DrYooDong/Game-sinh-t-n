import React from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../../utils/audio';
import { PvzTactic } from '../types';
import { Swords, Check, X, Shield, Sparkles } from 'lucide-react';

interface PvzTacticsModalProps {
  tactics: PvzTactic[];
  onToggleTactic: (tacticId: string) => void;
  onClose: () => void;
}

export const PvzTacticsModal: React.FC<PvzTacticsModalProps> = ({
  tactics,
  onToggleTactic,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        className="w-full max-w-2xl bg-neutral-950 border-2 border-purple-500/60 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative rounded-xs"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-950 border border-purple-500 flex items-center justify-center text-xl rounded-xs">
              🎯
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white uppercase flex items-center gap-2">
                <span>CHIẾN THUẬT QUÂN ĐOÀN THỰC VẬT & THÂY MA</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Lựa chọn phương án tác chiến do Tuyết Mộc và Thầy Lý Băng phân tích
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

        {/* Tactics List */}
        <div className="overflow-y-auto space-y-3 flex-1 pr-1 max-h-[60vh]">
          {tactics.map((tactic) => (
            <div
              key={tactic.id}
              onClick={() => {
                soundManager.play('click');
                onToggleTactic(tactic.id);
              }}
              className={`p-4 border rounded-xs transition-all cursor-pointer flex items-start justify-between gap-3 ${
                tactic.isActive
                  ? 'bg-neutral-900 border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                  : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 bg-neutral-950 border border-neutral-700 flex items-center justify-center text-2xl rounded-xs shrink-0">
                  {tactic.icon}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white">{tactic.name}</h4>
                  <p className="text-xs text-neutral-300 mt-1 leading-relaxed">{tactic.description}</p>
                  <div className="text-[11px] text-amber-300 font-bold mt-1.5">
                    Hiệu quả: {tactic.bonus}
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                {tactic.isActive ? (
                  <span className="px-3 py-1.5 bg-purple-600 text-white text-xs font-black rounded-xs flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>ĐANG DÙNG</span>
                  </span>
                ) : (
                  <span className="px-3 py-1.5 bg-neutral-800 text-neutral-400 text-xs font-bold rounded-xs">
                    KÍCH HOẠT
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
