import React, { useState } from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../../utils/audio';
import { PVZ_PATHOLOGY_DATA } from '../data/pvzData';
import { PathologyEntry } from '../types';
import { Activity, Dna, ShieldAlert, Sparkles, X, CheckCircle2, Zap } from 'lucide-react';

interface PvzPathologyModalProps {
  playerLevel: number;
  beastCores: number;
  onClose: () => void;
}

export const PvzPathologyModal: React.FC<PvzPathologyModalProps> = ({
  playerLevel,
  beastCores,
  onClose
}) => {
  const [selectedEntryId, setSelectedEntryId] = useState<string>(PVZ_PATHOLOGY_DATA[0].id);

  const selectedEntry =
    PVZ_PATHOLOGY_DATA.find((p) => p.id === selectedEntryId) || PVZ_PATHOLOGY_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        className="w-full max-w-3xl bg-neutral-950 border-2 border-cyan-500/60 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative rounded-xs"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-950 border border-cyan-500 flex items-center justify-center text-xl rounded-xs">
              🔬
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white uppercase flex items-center gap-2">
                <span>PHÂN TÍCH BỆNH LÝ & GIẢI MÃ GEN VIRUS</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Hệ thống Sân Vườn Bác Sĩ Dave soi quét điểm yếu sinh lý của các chủng Zombie đột biến
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

        {/* Resources banner */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-neutral-900 border border-cyan-900/50 rounded-xs mb-4 text-xs">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-neutral-400">Cấp Độ Nghiên Cứu:</span>
            <span className="text-cyan-300 font-black">Cấp {playerLevel}</span>
          </div>
          <div className="flex items-center gap-2">
            <Dna className="w-4 h-4 text-fuchsia-400" />
            <span className="text-neutral-400">Tinh Hạch Ma Thú:</span>
            <span className="text-fuchsia-300 font-black">{beastCores} 🔮</span>
          </div>
        </div>

        {/* Pathology Selector & Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 overflow-hidden">
          {/* Left: Mutation list */}
          <div className="space-y-2 overflow-y-auto max-h-[50vh] pr-1">
            {PVZ_PATHOLOGY_DATA.map((entry) => {
              const isSelected = selectedEntryId === entry.id;

              return (
                <button
                  key={entry.id}
                  onClick={() => {
                    soundManager.play('click');
                    setSelectedEntryId(entry.id);
                  }}
                  className={`w-full p-2.5 text-left border rounded-xs transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-950/70 border-cyan-400 text-cyan-300 shadow-md'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-xs font-bold truncate">{entry.name}</div>
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Analysis */}
          <div className="md:col-span-2 bg-neutral-900 border border-neutral-800 p-4 rounded-xs overflow-y-auto max-h-[50vh] space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <h4 className="text-sm font-black text-cyan-400 uppercase">
                {selectedEntry.name}
              </h4>
              <span className="text-[10px] px-2 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                ĐÃ GIẢI MÃ
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-xs">
                <div className="text-neutral-400 font-bold flex items-center gap-1 mb-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>Đặc Tính Đột Biến:</span>
                </div>
                <div className="text-neutral-200">{selectedEntry.mutationTrait}</div>
              </div>

              <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-xs">
                <div className="text-rose-400 font-bold flex items-center gap-1 mb-1">
                  <Zap className="w-3.5 h-3.5 text-rose-400" />
                  <span>Điểm Yếu Sinh Lý:</span>
                </div>
                <div className="text-neutral-200">{selectedEntry.weakness}</div>
              </div>

              <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-xs">
                <div className="text-emerald-400 font-bold flex items-center gap-1 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Chiến Thuật Khắc Chế Khuyên Dùng:</span>
                </div>
                <div className="text-neutral-200">{selectedEntry.counterStrategy}</div>
              </div>

              <div className="p-2.5 bg-cyan-950/40 border border-cyan-700/60 rounded-xs">
                <div className="text-cyan-300 font-bold mb-1">
                  🧬 Hiệu Ứng Chiết Xuất Cho Toàn Dân:
                </div>
                <div className="text-cyan-100 font-black text-xs">
                  {selectedEntry.extractedFormula}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
