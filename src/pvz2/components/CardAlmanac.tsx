import React, { useState } from 'react';
import { CardDefinition, PlayerProfile } from '../types/game';
import { ALL_CARDS } from '../data/cardsData';
import { CardVisual, PvZIcon } from './CardVisual';
import { sound } from '../utils/audio';

interface CardAlmanacProps {
  player: PlayerProfile;
  onUpgradeCard: (cardId: string, costSouls: number) => void;
}

export const CardAlmanac: React.FC<CardAlmanacProps> = ({
  player,
  onUpgradeCard
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string>(ALL_CARDS[0].id);
  const [filterCategory, setFilterCategory] = useState<'all' | 'plant' | 'zombie' | 'pi' | 'fusion'>('all');

  const selectedCard = ALL_CARDS.find((c) => c.id === selectedCardId) || ALL_CARDS[0];
  const cardLevel = player.cardLevels[selectedCard.id] || 1;
  const upgradeCost = cardLevel * 100;
  const isUnlocked = player.unlockedCards.includes(selectedCard.id);

  const filteredCards = ALL_CARDS.filter((c) => {
    if (filterCategory === 'all') return true;
    return c.category === filterCategory;
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-emerald-50 animate-fadeIn select-none">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-emerald-900/30 border border-emerald-700/50 p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-950/80 text-emerald-400 font-mono font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-800/60">
                📖 BÁCH KHOA TOÀN THƯ
              </span>
              <span className="text-xs text-emerald-400 font-mono">
                HỆ THỐNG SÂN VƯỜN BÁC SĨ
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-emerald-100 mt-2">
              Cẩm Nang Thẻ Linh & Nhân Cách Hóa
            </h2>
            <p className="text-emerald-300/80 text-sm mt-1">
              Khám phá tính cách, lời thoại và bí quyết dung hợp của từng thẻ bài thực vật & zombie.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-emerald-800/50">
            {(['all', 'plant', 'zombie', 'pi', 'fusion'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setFilterCategory(cat);
                }}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition capitalize ${
                  filterCategory === cat
                    ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                    : 'text-emerald-400/80 hover:text-white hover:bg-emerald-900/30'
                }`}
              >
                {cat === 'all' ? 'Tất cả' : cat === 'plant' ? 'Thực Vật' : cat === 'zombie' ? 'Zombie' : cat === 'pi' ? 'Thẻ Pi' : 'Nhập Thể'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Card List Left, Detailed Card Sheet Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Card Selection Deck Scroll */}
        <div className="lg:col-span-5 bg-emerald-950/40 border border-emerald-800/50 rounded-3xl p-4 shadow-xl max-h-[600px] overflow-y-auto scrollbar-thin">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {filteredCards.map((card) => {
              const unlocked = player.unlockedCards.includes(card.id);
              const isSelected = card.id === selectedCardId;
              const lvl = player.cardLevels[card.id] || 1;

              return (
                <div
                  key={card.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCardId(card.id);
                  }}
                  className={`relative cursor-pointer transition-all transform hover:scale-105 ${
                    !unlocked ? 'opacity-40 grayscale' : ''
                  }`}
                >
                  <CardVisual
                    card={card}
                    compact
                    isSelected={isSelected}
                    level={lvl}
                  />
                  {!unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
                      <span className="text-base">🔒</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Card Inspection Sheet */}
        <div className="lg:col-span-7 bg-emerald-950/40 border border-emerald-800/50 rounded-3xl p-6 shadow-2xl space-y-5">
          {/* Card Title & Icon Header */}
          <div className="flex items-start gap-4 pb-4 border-b border-emerald-800/50">
            <div className="p-3.5 bg-black/40 rounded-2xl border border-emerald-700/50 shadow-inner">
              <PvZIcon type={selectedCard.iconType} className="w-16 h-16" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-emerald-200">
                  {selectedCard.vietnameseTitle}
                </h3>
                <span className="text-xs bg-red-600/80 text-white font-extrabold px-2.5 py-0.5 rounded-full">
                  Hạng {selectedCard.rarity}
                </span>
                <span className="text-xs bg-emerald-900/60 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-600/50">
                  Cấp {cardLevel}
                </span>
              </div>
              {selectedCard.nickname && (
                <p className="text-sm text-yellow-400 font-semibold italic mt-0.5">
                  Biệt danh: “{selectedCard.nickname}”
                </p>
              )}
              <p className="text-xs text-emerald-400 font-mono mt-1">
                Tên gốc: {selectedCard.name}
              </p>
            </div>
          </div>

          {/* Voice Line / Personality Quote */}
          <div className="bg-black/40 border border-emerald-700/30 rounded-2xl p-4 shadow-inner">
            <p className="text-xs font-bold text-yellow-400 mb-1">
              💬 Lời Thoại Nhân Cách Hóa (Thẻ Linh):
            </p>
            <p className="text-sm text-emerald-100 italic leading-relaxed">
              {selectedCard.voiceQuote}
            </p>
          </div>

          {/* Lore & Story Background */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              📜 Bối Cảnh Trong Cốt Truyện:
            </h4>
            <p className="text-xs md:text-sm text-emerald-200/90 leading-relaxed bg-black/30 p-3.5 rounded-2xl border border-emerald-900/40">
              {selectedCard.lore}
            </p>
          </div>

          {/* Plant Food Ultimate Description */}
          <div className="space-y-1 bg-emerald-900/30 border border-emerald-600/40 p-3.5 rounded-2xl">
            <h4 className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
              <span>🍃</span>
              <span>Chiêu Cuối Hạt Năng Lượng (Plant Food Overdrive):</span>
            </h4>
            <p className="text-xs text-emerald-100/90">
              {selectedCard.plantFoodEffect}
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 bg-black/40 p-3 rounded-2xl border border-emerald-800/40 text-center">
            <div>
              <span className="text-[10px] text-emerald-500 uppercase tracking-wider font-bold block">Nắng Triệu Hồi</span>
              <span className="text-sm font-black text-yellow-400">☀️ {selectedCard.sunCost}</span>
            </div>
            <div>
              <span className="text-[10px] text-emerald-500 uppercase tracking-wider font-bold block">Máu Tối Đa</span>
              <span className="text-sm font-black text-emerald-300">❤️ {selectedCard.health + (cardLevel - 1) * 150}</span>
            </div>
            <div>
              <span className="text-[10px] text-emerald-500 uppercase tracking-wider font-bold block">Sát Thương Cơ Bản</span>
              <span className="text-sm font-black text-red-400">⚔️ {selectedCard.damage + (cardLevel - 1) * 20}</span>
            </div>
          </div>

          {/* Upgrade Action Button */}
          {isUnlocked ? (
            <button
              disabled={player.spiritSouls < upgradeCost}
              onClick={() => {
                sound.playPlantFood();
                onUpgradeCard(selectedCard.id, upgradeCost);
              }}
              className={`w-full py-3 rounded-2xl font-black text-sm transition border flex items-center justify-center gap-2 ${
                player.spiritSouls >= upgradeCost
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 shadow-[0_4px_0_rgb(5,150,105)]'
                  : 'bg-black/40 text-emerald-600/40 border-emerald-900/30 opacity-60'
              }`}
            >
              <span>Nâng Cấp Thẻ Linh (Lên Cấp {cardLevel + 1}) ⚡</span>
              <span>(Phí: {upgradeCost} 🔮 Tinh Hồn)</span>
            </button>
          ) : (
            <div className="text-center py-3 bg-black/40 rounded-2xl border border-red-500/40 text-red-400 text-xs font-bold">
              🔒 Thẻ bài chưa được mở khóa. Hãy hoàn thành các giai đoạn cốt truyện để thu nạp!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
