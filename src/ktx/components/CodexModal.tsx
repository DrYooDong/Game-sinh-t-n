import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BestiaryEntry, WorldLoreChapter } from '../types';
import { soundManager } from '../utils/audio';
import {
  BookOpen,
  Skull,
  Scroll,
  X,
  ShieldAlert,
  ChevronRight,
  Flame,
  Globe,
  Lock
} from 'lucide-react';

interface CodexModalProps {
  bestiary: BestiaryEntry[];
  loreChapters: WorldLoreChapter[];
  currentDay: number;
  onClose: () => void;
}

export const CodexModal: React.FC<CodexModalProps> = ({
  bestiary,
  loreChapters,
  currentDay,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'bestiary' | 'lore'>('bestiary');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-4xl bg-neutral-950 border-2 border-indigo-500/50 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative"
      >
        {/* Badge */}
        <div className="absolute -top-3.5 left-6 bg-indigo-600 text-white px-3 py-0.5 text-[11px] font-black uppercase tracking-tighter">
          Bách Khoa Ký Túc Xá & Nhật Ký Dịch Chuyển
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 mb-3 mt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-neutral-800 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                Bách Khoa Dị Biến & Giải Mã Thế Giới
              </h3>
              <p className="text-[10px] text-neutral-400">
                Ghi chép toàn bộ loài xác sống, điểm yếu chiến thuật và hồ sơ sự kiện dịch chuyển
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

        {/* Tab switchers */}
        <div className="flex gap-1 border-b border-neutral-800 pb-2 mb-3 text-[10px]">
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveTab('bestiary');
            }}
            className={`px-3 py-1 uppercase font-bold border transition-all cursor-pointer ${
              activeTab === 'bestiary'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            BÁCH KHOA QUÁI VẬT ({bestiary.length})
          </button>
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveTab('lore');
            }}
            className={`px-3 py-1 uppercase font-bold border transition-all cursor-pointer ${
              activeTab === 'lore'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            NHẬT KÝ THẾ GIỚI SINH TỒN ({loreChapters.length})
          </button>
        </div>

        {/* Tab 1: Bestiary */}
        {activeTab === 'bestiary' && (
          <div className="overflow-y-auto space-y-2.5 flex-1 pr-1 max-h-[55vh]">
            {bestiary.map((entry) => (
              <div
                key={entry.id}
                className="p-3.5 bg-neutral-900/80 border border-neutral-800 flex items-start gap-3.5 text-xs"
              >
                <div className="w-14 h-14 bg-neutral-950 border border-neutral-700 rounded-sm flex items-center justify-center p-1 shrink-0 relative shadow-inner">
                  {entry.imageUrl ? (
                    <img
                      src={entry.imageUrl}
                      alt={entry.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'inline';
                      }}
                    />
                  ) : null}
                  <span
                    className="text-3xl"
                    style={{ display: entry.imageUrl ? 'none' : 'inline' }}
                  >
                    {entry.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white uppercase text-xs">{entry.name}</span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-indigo-950 border border-indigo-500/40 text-indigo-300 font-bold uppercase">
                      {entry.type}
                    </span>
                    <span className="text-[9px] text-amber-400 font-mono">
                      Mức độ nguy hiểm: {entry.threatLevel}
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-300 mt-1">{entry.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 bg-neutral-950 p-2 border border-neutral-800 text-[10px]">
                    <div>
                      <span className="text-rose-400 font-bold">🎯 Điểm yếu:</span>
                      <span className="text-neutral-300 ml-1">{entry.weakness}</span>
                    </div>
                    <div>
                      <span className="text-indigo-400 font-bold">📖 Hồ sơ:</span>
                      <span className="text-neutral-400 ml-1">{entry.lore}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Lore Chapters */}
        {activeTab === 'lore' && (
          <div className="overflow-y-auto space-y-3 flex-1 pr-1 max-h-[55vh]">
            {loreChapters.map((chapter) => {
              const isUnlocked = currentDay >= chapter.unlockedDay;

              return (
                <div
                  key={chapter.id}
                  className={`p-4 border transition-all ${
                    isUnlocked
                      ? 'bg-neutral-900/90 border-indigo-500/50'
                      : 'bg-neutral-950/80 border-neutral-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {isUnlocked ? (
                        <Globe className="w-4 h-4 text-indigo-400" />
                      ) : (
                        <Lock className="w-4 h-4 text-neutral-500" />
                      )}
                      <h4 className="font-bold text-white text-xs uppercase">{chapter.title}</h4>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.2 bg-neutral-800 text-neutral-400 font-mono">
                      {isUnlocked ? `Đã Mở (Ngày ${chapter.unlockedDay})` : `Mở khóa tại Ngày ${chapter.unlockedDay}`}
                    </span>
                  </div>

                  {isUnlocked ? (
                    <p className="text-[11px] text-neutral-300 leading-relaxed bg-neutral-950 p-3 border border-neutral-800">
                      {chapter.content}
                    </p>
                  ) : (
                    <p className="text-[10px] text-neutral-500 italic">
                      Dữ liệu bị mã hóa bởi dị biến không gian. Hãy sinh tồn tới Ngày {chapter.unlockedDay} để giải mã chương này.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
};
