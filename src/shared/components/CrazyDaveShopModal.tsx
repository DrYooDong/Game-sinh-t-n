import React, { useState, useEffect } from 'react';
import { CRAZY_DAVE_SHOP_ITEMS, CRAZY_DAVE_QUOTES, ShopItem } from '../data/shopData';
import { sound } from '../../pvz2/utils/audio';

interface CrazyDaveShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  onUpdateCoins: (newCoins: number) => void;
  purchasedItemIds: string[];
  onPurchaseItem: (itemId: string) => void;
}

export const CrazyDaveShopModal: React.FC<CrazyDaveShopModalProps> = ({
  isOpen,
  onClose,
  coins,
  onUpdateCoins,
  purchasedItemIds,
  onPurchaseItem
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'slots' | 'plants' | 'items'>('all');
  const [currentQuote, setCurrentQuote] = useState<string>(CRAZY_DAVE_QUOTES[0]);
  const [purchaseFeedback, setPurchaseFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const randomIdx = Math.floor(Math.random() * CRAZY_DAVE_QUOTES.length);
      setCurrentQuote(CRAZY_DAVE_QUOTES[randomIdx]);
      sound.playOriginalSfx('click', 0.6);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredItems = CRAZY_DAVE_SHOP_ITEMS.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleBuy = (item: ShopItem) => {
    if (purchasedItemIds.includes(item.id)) return;

    if (coins < item.price) {
      sound.playOriginalSfx('newspaper_rage', 0.5);
      setPurchaseFeedback(`Bạn không đủ tiền xu! Cần ${item.price.toLocaleString()} 🪙`);
      setTimeout(() => setPurchaseFeedback(null), 2500);
      return;
    }

    // Process purchase
    const newCoins = coins - item.price;
    onUpdateCoins(newCoins);
    onPurchaseItem(item.id);
    sound.playSunPickup();
    setPurchaseFeedback(`Đã mua thành công: ${item.vnName}! ✨`);
    setTimeout(() => setPurchaseFeedback(null), 2500);
  };

  const handleDaveClick = () => {
    sound.playOriginalSfx('huge_wave', 0.4);
    const randomIdx = Math.floor(Math.random() * CRAZY_DAVE_QUOTES.length);
    setCurrentQuote(CRAZY_DAVE_QUOTES[randomIdx]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-gradient-to-b from-stone-900 via-yellow-950/80 to-stone-950 border-4 border-yellow-500 rounded-3xl shadow-[0_0_60px_rgba(234,179,8,0.35)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header with Trunk/Store look */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-800 via-yellow-700 to-amber-800 border-b-2 border-yellow-400 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-bounce" style={{ animationDuration: '2s' }}>🛒</span>
            <div>
              <h2 className="text-2xl font-black tracking-wider text-yellow-100 uppercase drop-shadow-md">
                Tiệm Tạp Hóa Cốp Xe Của Crazy Dave (Twiddydinkies)
              </h2>
              <p className="text-xs font-bold text-yellow-200">
                Nâng cấp Ô Hạt Giống, Cây Trồng Thượng Hạng và Bảo Hiểm Sân Vườn
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Coins Balance Indicator */}
            <div className="flex items-center gap-2 bg-stone-950/90 border-2 border-yellow-400 px-4 py-1.5 rounded-full shadow-inner">
              <span className="text-xl">🪙</span>
              <span className="font-black text-yellow-300 text-lg">
                {coins.toLocaleString()}
              </span>
              <span className="text-[10px] uppercase font-bold text-yellow-500">Xu</span>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-lg border-2 border-red-300 shadow-lg hover:scale-105 active:scale-95 transition-all"
              title="Rời khỏi cửa hàng"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Crazy Dave Dialogue Banner */}
        <div 
          onClick={handleDaveClick}
          className="bg-stone-950/90 border-b border-yellow-600/50 px-6 py-3 flex items-center gap-4 cursor-pointer hover:bg-stone-900/90 transition-colors"
          title="Nhấp vào Crazy Dave để nghe chuyện!"
        >
          <div className="w-12 h-12 rounded-full bg-amber-900/80 border-2 border-yellow-400 flex items-center justify-center text-2xl shadow-inner shrink-0">
            🧔‍♂️
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest block">
              Crazy Dave phát biểu:
            </span>
            <p className="text-sm font-semibold italic text-yellow-100 drop-shadow">
              "{currentQuote}"
            </p>
          </div>
          <span className="text-xs text-yellow-500/80 font-bold bg-yellow-950/80 border border-yellow-600/40 px-2.5 py-1 rounded-lg">
            🔊 Bấm để nói chuyện
          </span>
        </div>

        {/* Purchase Notification Banner */}
        {purchaseFeedback && (
          <div className="bg-emerald-900/90 text-emerald-100 px-6 py-2 border-b border-emerald-500 text-center font-bold text-xs animate-bounce shadow-md">
            {purchaseFeedback}
          </div>
        )}

        {/* Filter Navigation */}
        <div className="flex bg-stone-950/70 px-6 pt-3 border-b border-stone-800 gap-2 overflow-x-auto">
          {[
            { id: 'all', label: 'Tất Cả Hàng Hóa', icon: '📦' },
            { id: 'slots', label: 'Ô Hạt Giống (Slots)', icon: '🎒' },
            { id: 'plants', label: 'Cây Tím Nâng Cấp', icon: '⚡' },
            { id: 'items', label: 'Vật Phẩm Hỗ Trợ', icon: '🛠️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveCategory(tab.id as any);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl font-bold text-xs uppercase tracking-wider transition-all ${
                activeCategory === tab.id
                  ? 'bg-yellow-600 text-stone-950 font-black border-t-2 border-x-2 border-yellow-300 shadow-md'
                  : 'bg-stone-900/60 text-stone-400 hover:bg-stone-800 hover:text-stone-200'
              }`}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Goods Showcase Grid */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => {
              const isPurchased = purchasedItemIds.includes(item.id);
              const canAfford = coins >= item.price;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col justify-between p-4 rounded-2xl border-2 transition-all ${
                    isPurchased
                      ? 'bg-stone-950/40 border-stone-800 opacity-80'
                      : 'bg-stone-900/90 border-yellow-700/60 hover:border-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]'
                  }`}
                >
                  {/* Top product info */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="w-16 h-16 rounded-xl bg-stone-950 border border-yellow-600/40 p-2 flex items-center justify-center shrink-0 shadow-inner">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain drop-shadow" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-sm text-yellow-200 leading-tight">
                          {item.vnName}
                        </h4>
                        <span className="text-[10px] text-stone-400 font-semibold block mt-0.5">
                          {item.name}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-300 font-medium leading-relaxed mb-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Action / Price */}
                  <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">🪙</span>
                      <span className={`font-black text-sm ${canAfford ? 'text-yellow-400' : 'text-red-400'}`}>
                        {item.price.toLocaleString()}
                      </span>
                    </div>

                    {isPurchased ? (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 font-black text-xs">
                        ✓ ĐÃ SỞ HỮU
                      </span>
                    ) : (
                      <button
                        onClick={() => handleBuy(item)}
                        className={`px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wide border-2 transition-all ${
                          canAfford
                            ? 'bg-yellow-500 hover:bg-yellow-400 text-stone-950 border-yellow-200 shadow-md hover:scale-105 active:scale-95'
                            : 'bg-stone-800 text-stone-500 border-stone-700 cursor-not-allowed'
                        }`}
                      >
                        MUA NGAY
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
