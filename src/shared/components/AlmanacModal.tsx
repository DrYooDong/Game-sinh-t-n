import React, { useState } from 'react';
import { ALMANAC_PLANTS, ALMANAC_ZOMBIES, PlantAlmanacEntry, ZombieAlmanacEntry } from '../data/almanacData';
import { sound } from '../../pvz2/utils/audio';

interface AlmanacModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlmanacModal: React.FC<AlmanacModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'plants' | 'zombies'>('plants');
  const [selectedPlantId, setSelectedPlantId] = useState<string>(ALMANAC_PLANTS[0].id);
  const [selectedZombieId, setSelectedZombieId] = useState<string>(ALMANAC_ZOMBIES[0].id);

  if (!isOpen) return null;

  const currentPlant = ALMANAC_PLANTS.find(p => p.id === selectedPlantId) || ALMANAC_PLANTS[0];
  const currentZombie = ALMANAC_ZOMBIES.find(z => z.id === selectedZombieId) || ALMANAC_ZOMBIES[0];

  const handleTabChange = (tab: 'plants' | 'zombies') => {
    sound.playClick();
    setActiveTab(tab);
  };

  const handleSelectPlant = (plant: PlantAlmanacEntry) => {
    sound.playClick();
    setSelectedPlantId(plant.id);
  };

  const handleSelectZombie = (zombie: ZombieAlmanacEntry) => {
    sound.playClick();
    setSelectedZombieId(zombie.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-gradient-to-b from-stone-900 via-amber-950/90 to-stone-950 border-4 border-amber-600 rounded-3xl shadow-[0_0_50px_rgba(217,119,6,0.3)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header with wood/leather banner */}
        <div className="relative px-6 py-4 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 border-b-2 border-amber-600 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📖</span>
            <div>
              <h2 className="text-2xl font-black tracking-wider text-amber-100 uppercase drop-shadow-md">
                Bách Khoa Toàn Thư Vườn Nhà (Suburban Almanac)
              </h2>
              <p className="text-xs font-semibold text-amber-300">
                Tra cứu bí kíp chỉ số & tiểu sử của tất cả Cây Trồng và Binh Đoàn Thây Ma
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-lg border-2 border-red-300 shadow-lg hover:scale-105 active:scale-95 transition-all"
            title="Đóng Bách Khoa"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-stone-950/80 px-6 pt-3 border-b border-amber-900/50 gap-4">
          <button
            onClick={() => handleTabChange('plants')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-t-xl font-black text-sm uppercase tracking-wide transition-all ${
              activeTab === 'plants'
                ? 'bg-emerald-700 text-emerald-100 border-t-2 border-x-2 border-emerald-400 shadow-[0_-4px_12px_rgba(16,185,129,0.3)]'
                : 'bg-stone-900/60 text-stone-400 hover:bg-stone-800/80 hover:text-stone-200'
            }`}
          >
            <span>🌻</span> Cây Trồng ({ALMANAC_PLANTS.length})
          </button>

          <button
            onClick={() => handleTabChange('zombies')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-t-xl font-black text-sm uppercase tracking-wide transition-all ${
              activeTab === 'zombies'
                ? 'bg-purple-800 text-purple-100 border-t-2 border-x-2 border-purple-400 shadow-[0_-4px_12px_rgba(168,85,247,0.3)]'
                : 'bg-stone-900/60 text-stone-400 hover:bg-stone-800/80 hover:text-stone-200'
            }`}
          >
            <span>🧟</span> Binh Đoàn Thây Ma ({ALMANAC_ZOMBIES.length})
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-4 p-6">
          
          {/* Left Column: Grid Selection */}
          <div className="md:col-span-5 bg-stone-950/60 rounded-2xl border border-amber-900/60 p-4 overflow-y-auto max-h-[60vh] custom-scrollbar shadow-inner">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
              <span>📋</span> Danh Sách Thẻ Bài
            </h3>

            {activeTab === 'plants' ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {ALMANAC_PLANTS.map(plant => {
                  const isSelected = plant.id === selectedPlantId;
                  return (
                    <button
                      key={plant.id}
                      onClick={() => handleSelectPlant(plant)}
                      className={`relative flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'bg-emerald-900/80 border-emerald-400 scale-105 shadow-[0_0_15px_rgba(52,211,153,0.5)] z-10'
                          : 'bg-stone-900/80 border-stone-700/60 hover:border-amber-500/60 hover:bg-stone-800'
                      }`}
                    >
                      <img src={plant.image} alt={plant.name} className="w-12 h-12 object-contain drop-shadow" />
                      <span className="text-[10px] font-bold text-center text-amber-200 line-clamp-1 mt-1">
                        {plant.name}
                      </span>
                      <span className="text-[9px] font-bold text-emerald-400 mt-0.5">
                        ☀️ {plant.sunCost}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {ALMANAC_ZOMBIES.map(zombie => {
                  const isSelected = zombie.id === selectedZombieId;
                  return (
                    <button
                      key={zombie.id}
                      onClick={() => handleSelectZombie(zombie)}
                      className={`relative flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'bg-purple-950/90 border-purple-400 scale-105 shadow-[0_0_15px_rgba(192,132,252,0.5)] z-10'
                          : 'bg-stone-900/80 border-stone-700/60 hover:border-purple-500/60 hover:bg-stone-800'
                      }`}
                    >
                      <img src={zombie.image} alt={zombie.name} className="w-12 h-14 object-contain drop-shadow" />
                      <span className="text-[10px] font-bold text-center text-purple-200 line-clamp-1 mt-1">
                        {zombie.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Detailed Card Preview */}
          <div className="md:col-span-7 bg-gradient-to-b from-stone-900/90 to-stone-950/90 rounded-2xl border-2 border-amber-700/70 p-6 flex flex-col justify-between overflow-y-auto max-h-[60vh] custom-scrollbar shadow-2xl">
            
            {activeTab === 'plants' ? (
              <div className="space-y-4">
                {/* Title & Badge */}
                <div className="flex items-start justify-between border-b border-amber-800/60 pb-3">
                  <div>
                    <h3 className="text-2xl font-black text-emerald-300 drop-shadow">
                      {currentPlant.name}
                    </h3>
                    <p className="text-sm font-semibold text-amber-200/80">
                      {currentPlant.vnName}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-amber-950/80 border border-amber-600/80 px-3 py-1 rounded-lg text-amber-300 font-bold text-sm">
                    <span>☀️ Mặt trời:</span>
                    <span className="text-emerald-400 font-black text-base">{currentPlant.sunCost}</span>
                  </div>
                </div>

                {/* Visual Avatar & Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-stone-950/80 border border-emerald-500/40 rounded-2xl shadow-inner">
                    <img 
                      src={currentPlant.image} 
                      alt={currentPlant.name} 
                      className="w-28 h-28 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] animate-bounce"
                      style={{ animationDuration: '3s' }}
                    />
                    <span className="mt-2 text-[11px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-600/40">
                      {currentPlant.category}
                    </span>
                  </div>

                  <div className="sm:col-span-7 space-y-2 text-xs">
                    <div className="p-2 bg-stone-950/60 rounded-lg border border-stone-800 flex justify-between">
                      <span className="text-stone-400">⏱️ Hồi chiêu:</span>
                      <span className="font-bold text-amber-300">{currentPlant.recharge}</span>
                    </div>

                    {currentPlant.damage && (
                      <div className="p-2 bg-stone-950/60 rounded-lg border border-stone-800 flex justify-between">
                        <span className="text-stone-400">⚔️ Sức tấn công:</span>
                        <span className="font-bold text-red-400">{currentPlant.damage}</span>
                      </div>
                    )}

                    {currentPlant.toughness && (
                      <div className="p-2 bg-stone-950/60 rounded-lg border border-stone-800 flex justify-between">
                        <span className="text-stone-400">🛡️ Độ bền máu:</span>
                        <span className="font-bold text-blue-300">{currentPlant.toughness}</span>
                      </div>
                    )}

                    {currentPlant.range && (
                      <div className="p-2 bg-stone-950/60 rounded-lg border border-stone-800 flex justify-between">
                        <span className="text-stone-400">🎯 Tầm bắn:</span>
                        <span className="font-bold text-cyan-300">{currentPlant.range}</span>
                      </div>
                    )}

                    {currentPlant.special && (
                      <div className="p-2 bg-stone-950/60 rounded-lg border border-stone-800 flex justify-between">
                        <span className="text-stone-400">✨ Đặc tính:</span>
                        <span className="font-bold text-yellow-300">{currentPlant.special}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description & Lore */}
                <div className="space-y-2.5 pt-2">
                  <div className="p-3 bg-stone-950/70 border border-emerald-900/50 rounded-xl">
                    <p className="text-xs text-stone-200 leading-relaxed font-medium">
                      {currentPlant.description}
                    </p>
                  </div>

                  <div className="p-3 bg-amber-950/40 border border-amber-800/40 rounded-xl">
                    <p className="text-xs italic text-amber-200/90 leading-relaxed">
                      {currentPlant.lore}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Title & Badge */}
                <div className="flex items-start justify-between border-b border-purple-900/60 pb-3">
                  <div>
                    <h3 className="text-2xl font-black text-purple-300 drop-shadow">
                      {currentZombie.name}
                    </h3>
                    <p className="text-sm font-semibold text-stone-300">
                      {currentZombie.vnName}
                    </p>
                  </div>
                </div>

                {/* Visual Avatar & Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-stone-950/80 border border-purple-500/40 rounded-2xl shadow-inner">
                    <img 
                      src={currentZombie.image} 
                      alt={currentZombie.name} 
                      className="w-28 h-32 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] animate-pulse"
                      style={{ animationDuration: '2.5s' }}
                    />
                  </div>

                  <div className="sm:col-span-7 space-y-2 text-xs">
                    <div className="p-2 bg-stone-950/60 rounded-lg border border-stone-800 flex justify-between">
                      <span className="text-stone-400">🛡️ Độ trâu máu:</span>
                      <span className="font-bold text-red-400">{currentZombie.toughness}</span>
                    </div>

                    <div className="p-2 bg-stone-950/60 rounded-lg border border-stone-800 flex justify-between">
                      <span className="text-stone-400">🏃 Tốc độ di chuyển:</span>
                      <span className="font-bold text-yellow-300">{currentZombie.speed}</span>
                    </div>

                    {currentZombie.weakness && (
                      <div className="p-2 bg-stone-950/60 rounded-lg border border-stone-800 flex justify-between">
                        <span className="text-stone-400">⚡ Điểm yếu:</span>
                        <span className="font-bold text-cyan-300">{currentZombie.weakness}</span>
                      </div>
                    )}

                    {currentZombie.special && (
                      <div className="p-2 bg-stone-950/60 rounded-lg border border-stone-800 flex justify-between">
                        <span className="text-stone-400">💥 Kỹ năng đặc biệt:</span>
                        <span className="font-bold text-purple-300">{currentZombie.special}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description & Lore */}
                <div className="space-y-2.5 pt-2">
                  <div className="p-3 bg-stone-950/70 border border-purple-900/50 rounded-xl">
                    <p className="text-xs text-stone-200 leading-relaxed font-medium">
                      {currentZombie.description}
                    </p>
                  </div>

                  <div className="p-3 bg-purple-950/40 border border-purple-800/40 rounded-xl">
                    <p className="text-xs italic text-purple-200/90 leading-relaxed">
                      {currentZombie.lore}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom footnote */}
            <div className="mt-4 pt-3 border-t border-stone-800 flex justify-between items-center text-[11px] text-stone-500 font-semibold">
              <span>Được trích xuất từ Bách khoa toàn thư Suburban Almanac PopCap</span>
              <span className="text-amber-400">PvZ Survival Edition</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
