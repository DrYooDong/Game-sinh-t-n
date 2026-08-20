import React, { useState } from 'react';
import { PlayerProfile } from '../types/game';
import { VIP_SHOP_ITEMS, ShopItem } from '../data/monetizationData';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface VipShopProps {
  player: PlayerProfile;
  onPurchaseItem: (item: ShopItem) => void;
  onClaimDailyVip: () => void;
}

export const VipShop: React.FC<VipShopProps> = ({
  player,
  onPurchaseItem,
  onClaimDailyVip
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isProcessingPurchase, setIsProcessingPurchase] = useState<string | null>(null);

  const handleBuy = (item: ShopItem) => {
    sound.playPowerup();
    setIsProcessingPurchase(item.id);

    setTimeout(() => {
      setIsProcessingPurchase(null);
      onPurchaseItem(item);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const filteredItems = activeCategory === 'all'
    ? VIP_SHOP_ITEMS
    : VIP_SHOP_ITEMS.filter(i => i.category === activeCategory);

  const canClaimDailyVip = player.hasVipMonthly && (
    !player.lastDailyClaimTimestamp || (Date.now() - player.lastDailyClaimTimestamp > 24 * 60 * 60 * 1000)
  );

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn select-none">
      {/* Top VIP Banner & Daily Privilege */}
      <div className="bg-gradient-to-r from-amber-950/80 via-yellow-950/60 to-black p-6 rounded-3xl border-2 border-amber-500/60 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-neutral-950 font-black text-xs px-3 py-1 rounded-full uppercase shadow">
              CỬA HÀNG THƯƠNG MẠI QUỐC TẾ
            </span>
            {player.hasVipMonthly && (
              <span className="bg-purple-600 text-white font-bold text-xs px-2.5 py-0.5 rounded-full shadow animate-pulse">
                VIP ĐANG HOẠT ĐỘNG ({player.vipMonthlyDaysLeft} NGÀY)
              </span>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-2 flex items-center gap-2">
            <span>👑</span> Cửa Hàng Thần Khí & Đặc Quyền VIP
          </h2>
          <p className="text-xs text-amber-200/80 mt-1 max-w-xl">
            Tận hưởng các gói hỗ trợ thần tốc, Kim Cương quay Gacha thần cấp và Thẻ Tháng siêu hời để vượt qua mọi đợt quái tử thần!
          </p>
        </div>

        {/* Daily VIP Claim Button */}
        {player.hasVipMonthly && (
          <div className="bg-black/60 p-4 rounded-2xl border border-amber-500/40 flex flex-col items-center min-w-[200px]">
            <p className="text-xs font-bold text-amber-300">Đặc Quyền Hằng Ngày</p>
            <p className="text-[11px] text-neutral-300 mt-0.5">☀️ +100 Nắng | 💎 +60 KC</p>
            <button
              disabled={!canClaimDailyVip}
              onClick={() => {
                sound.playPlant();
                onClaimDailyVip();
              }}
              className="mt-3 w-full py-2 px-4 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 font-black text-xs rounded-xl shadow transition"
            >
              {canClaimDailyVip ? '🎁 Nhận Ngay' : '✅ Đã Nhận Hôm Nay'}
            </button>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'Tất Cả Gói' },
          { id: 'subscription', label: '👑 Thẻ Tháng & Pass' },
          { id: 'starter_pack', label: '🎁 Gói Tân Thủ' },
          { id: 'currency', label: '💎 Kim Cương' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition border whitespace-nowrap ${
              activeCategory === tab.id
                ? 'bg-amber-500 text-neutral-950 border-amber-300 shadow-md'
                : 'bg-black/40 text-neutral-300 border-neutral-800 hover:bg-neutral-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`relative rounded-3xl p-6 border-2 bg-gradient-to-b ${item.colorScheme} shadow-xl flex flex-col justify-between transition transform hover:-translate-y-1`}
          >
            {/* Top Badge */}
            {item.badge && (
              <span className="absolute top-4 right-4 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-red-600 text-white shadow animate-pulse">
                {item.badge}
              </span>
            )}

            <div>
              {/* Icon & Title */}
              <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center text-3xl shadow-inner mb-4">
                {item.icon}
              </div>

              <h3 className="text-lg font-black text-white leading-snug">
                {item.name}
              </h3>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Price & Buy Button */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] text-neutral-400 uppercase font-bold">Giá Gốc / Giá Bán</p>
                <p className="text-xl font-black text-amber-300">
                  ${item.priceUsd}
                </p>
              </div>

              <button
                disabled={isProcessingPurchase === item.id}
                onClick={() => handleBuy(item)}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-neutral-950 font-black text-xs rounded-xl shadow-lg transition active:scale-95 disabled:opacity-50"
              >
                {isProcessingPurchase === item.id ? 'Đang Nạp...' : '⚡ Mua Ngay'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
