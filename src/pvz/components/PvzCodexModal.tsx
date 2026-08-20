import React, { useState } from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../../utils/audio';
import { PVZ_PLANTS, PVZ_ZOMBIES, PVZ_LORE_CHAPTERS } from '../data/pvzData';
import { PvzLoreChapter } from '../types';
import { BookOpen, Sprout, Skull, X, CheckCircle2, Lock } from 'lucide-react';

interface PvzCodexModalProps {
  currentWave: number;
  onClose: () => void;
}

export const PvzCodexModal: React.FC<PvzCodexModalProps> = ({ currentWave, onClose }) => {
  const [activeTab, setActiveTab] = useState<'plants' | 'zombies' | 'lore'>('plants');
  const [selectedLoreId, setSelectedLoreId] = useState<string>(PVZ_LORE_CHAPTERS[0].id);

  const selectedLore = PVZ_LORE_CHAPTERS.find((l) => l.id === selectedLoreId) || PVZ_LORE_CHAPTERS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        className="w-full max-w-4xl bg-neutral-950 border-2 border-emerald-500/60 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative rounded-xs"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-950 border border-emerald-500 flex items-center justify-center text-xl rounded-xs">
              📖
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white uppercase flex items-center gap-2">
                <span>BÁCH KHOA TOÀN THƯ THỰC VẬT & CỐT TRUYỆN QUỐC VẬN</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Tra cứu dữ liệu thực vật, đặc tính zombie và diễn biến cốt truyện của Tuyết Mộc
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

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 mb-4">
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveTab('plants');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase flex items-center gap-1.5 rounded-xs transition-all cursor-pointer ${
              activeTab === 'plants'
                ? 'bg-emerald-600 text-neutral-950 font-black shadow-md'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>Thực Vật ({PVZ_PLANTS.length})</span>
          </button>

          <button
            onClick={() => {
              soundManager.play('click');
              setActiveTab('zombies');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase flex items-center gap-1.5 rounded-xs transition-all cursor-pointer ${
              activeTab === 'zombies'
                ? 'bg-rose-600 text-white font-black shadow-md'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Skull className="w-4 h-4" />
            <span>Quái Vật Zombie ({Object.keys(PVZ_ZOMBIES).length})</span>
          </button>

          <button
            onClick={() => {
              soundManager.play('click');
              setActiveTab('lore');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase flex items-center gap-1.5 rounded-xs transition-all cursor-pointer ${
              activeTab === 'lore'
                ? 'bg-amber-500 text-neutral-950 font-black shadow-md'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>7 Chương Cốt Truyện</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto space-y-3 flex-1 pr-1 max-h-[58vh]">
          {/* TAB 1: PLANTS */}
          {activeTab === 'plants' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PVZ_PLANTS.map((plant) => (
                <div
                  key={plant.id}
                  className="p-3.5 bg-neutral-900 border border-emerald-500/40 rounded-xs flex gap-3 items-start"
                >
                  <div className="w-12 h-12 bg-neutral-950 border border-emerald-600 flex items-center justify-center p-1 rounded-xs shrink-0 relative">
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
                      className="text-3xl"
                      style={{ display: plant.imageUrl ? 'none' : 'inline' }}
                    >
                      {plant.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-black text-white">{plant.name}</h4>
                      <span className="text-xs text-amber-300 font-bold">☀️ {plant.sunCost}</span>
                    </div>
                    <p className="text-xs text-neutral-300 mt-1">{plant.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-emerald-400 font-bold mt-2 pt-2 border-t border-neutral-800">
                      <span>HP: {plant.maxHp}</span>
                      <span>Hồi chiêu: {plant.cooldownSec}s</span>
                      {plant.attackDmg > 0 && <span>Sát thương: {plant.attackDmg}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: ZOMBIES */}
          {activeTab === 'zombies' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(PVZ_ZOMBIES).map((zombie) => (
                <div
                  key={zombie.id}
                  className="p-3.5 bg-neutral-900 border border-rose-500/40 rounded-xs flex gap-3 items-start"
                >
                  <div className="w-12 h-12 bg-neutral-950 border border-rose-600 flex items-center justify-center text-3xl rounded-xs shrink-0">
                    {zombie.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-black text-white">{zombie.name}</h4>
                      <span className="text-[10px] px-1.5 py-0.2 bg-rose-950 text-rose-300 border border-rose-800">
                        {zombie.title}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 mt-1">{zombie.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-rose-400 font-bold mt-2 pt-2 border-t border-neutral-800">
                      <span>Máu: {zombie.maxHp} HP</span>
                      <span>Sát thương: {zombie.attackDmg}</span>
                      <span>Thưởng: +{zombie.rewardSun} ☀️</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: STORY LORE */}
          {activeTab === 'lore' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Chapter Selector */}
              <div className="space-y-2">
                {PVZ_LORE_CHAPTERS.map((ch) => {
                  const isUnlocked = ch.stageNumber <= currentWave;
                  const isSelected = selectedLoreId === ch.id;

                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        soundManager.play('click');
                        setSelectedLoreId(ch.id);
                      }}
                      className={`w-full p-2.5 text-left border rounded-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'bg-amber-950/70 border-amber-400 text-amber-300 shadow-md'
                          : isUnlocked
                          ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-600 opacity-60'
                      }`}
                    >
                      <div className="truncate text-xs font-bold">
                        {ch.title.split(':')[0]}
                      </div>
                      {isUnlocked ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Chapter Full Reader */}
              <div className="md:col-span-2 bg-neutral-900 border border-neutral-800 p-4 rounded-xs">
                <h4 className="text-sm font-black text-amber-400 uppercase mb-2 pb-2 border-b border-neutral-800">
                  {selectedLore.title}
                </h4>
                {selectedLore.stageNumber <= currentWave ? (
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line font-mono">
                    {selectedLore.content}
                  </p>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-neutral-500 gap-2">
                    <Lock className="w-8 h-8 text-neutral-600" />
                    <span className="text-xs">Vượt qua Vòng 0{selectedLore.stageNumber} để mở khóa chương này</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
