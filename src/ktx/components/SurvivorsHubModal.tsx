import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Survivor, MarketOffer, Item } from '../types';
import { soundManager } from '../utils/audio';
import { Users, Radio, ShoppingBag, X, Shield, Search, HeartPulse, Sparkles, ChefHat, Wrench, CheckCircle } from 'lucide-react';

interface SurvivorsHubModalProps {
  survivors: Survivor[];
  marketOffers: MarketOffer[];
  inventory: Item[];
  onAssignRole: (survivorId: string, role: Survivor['role']) => void;
  onTradeMarketOffer: (offerId: string) => void;
  onClose: () => void;
}

export const SurvivorsHubModal: React.FC<SurvivorsHubModalProps> = ({
  survivors,
  marketOffers,
  inventory,
  onAssignRole,
  onTradeMarketOffer,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'survivors' | 'radio' | 'market'>('survivors');
  const [filterFloor, setFilterFloor] = useState<string>('all');

  const aliveCount = survivors.filter((s) => s.status === 'alive').length;
  const injuredCount = survivors.filter((s) => s.status === 'injured').length;
  const deceasedCount = survivors.filter((s) => s.status === 'deceased').length;

  const guardsCount = survivors.filter((s) => s.role === 'guard').length;
  const scavengersCount = survivors.filter((s) => s.role === 'scavenger').length;
  const medicsCount = survivors.filter((s) => s.role === 'medic').length;
  const cooksCount = survivors.filter((s) => s.role === 'cook').length;
  const engineersCount = survivors.filter((s) => s.role === 'engineer').length;

  const filteredSurvivors = survivors.filter((s) => {
    if (filterFloor === 'all') return true;
    return s.room.includes(`Phòng ${filterFloor}`);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-4xl bg-neutral-950 border-2 border-cyan-500/50 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative"
      >
        {/* Badge */}
        <div className="absolute -top-3.5 left-6 bg-cyan-500 text-neutral-950 px-3 py-0.5 text-[11px] font-black uppercase tracking-tighter">
          Trung Tâm Chỉ Huy 100 Cư Dân KTX
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 mb-3 mt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-neutral-800 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                Hệ Thống Phân Vai Cư Dân & Thị Trường Nội Bộ
              </h3>
              <p className="text-[10px] text-neutral-400">
                100 người bị dịch chuyển ngẫu nhiên • Phân công vai trò để tăng tốc phòng thủ và thu thập
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

        {/* Overview Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-xs">
          <div className="p-2 bg-neutral-900 border border-neutral-800">
            <div className="text-[9px] text-neutral-500 uppercase">SỐNG SÓT</div>
            <div className="text-sm font-bold text-emerald-400">{aliveCount} / 100</div>
          </div>
          <div className="p-2 bg-neutral-900 border border-neutral-800">
            <div className="text-[9px] text-neutral-500 uppercase">BỊ THƯƠNG</div>
            <div className="text-sm font-bold text-amber-400">{injuredCount}</div>
          </div>
          <div className="p-2 bg-neutral-900 border border-neutral-800">
            <div className="text-[9px] text-neutral-500 uppercase">TỬ VONG</div>
            <div className="text-sm font-bold text-rose-500">{deceasedCount}</div>
          </div>
          <div className="p-2 bg-neutral-900 border border-neutral-800">
            <div className="text-[9px] text-neutral-500 uppercase">ĐỘI THU THẬP / CANH GÁC</div>
            <div className="text-sm font-bold text-cyan-400">{scavengersCount} / {guardsCount}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-neutral-800 pb-2 mb-3 text-[10px]">
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveTab('survivors');
            }}
            className={`px-3 py-1 uppercase font-bold border transition-all cursor-pointer ${
              activeTab === 'survivors'
                ? 'bg-cyan-600 text-white border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            DANH SÁCH 100 CƯ DÂN ({aliveCount})
          </button>
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveTab('market');
            }}
            className={`px-3 py-1 uppercase font-bold border transition-all cursor-pointer ${
              activeTab === 'market'
                ? 'bg-cyan-600 text-white border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            CHỢ TRAO ĐỔI VẬT PHẨM ({marketOffers.filter((o) => !o.completed).length})
          </button>
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveTab('radio');
            }}
            className={`px-3 py-1 uppercase font-bold border transition-all cursor-pointer ${
              activeTab === 'radio'
                ? 'bg-cyan-600 text-white border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            KÊNH RADIO NỘI BỘ (107.5 MHz)
          </button>
        </div>

        {/* Tab 1: Survivors List */}
        {activeTab === 'survivors' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Filter Floors */}
            <div className="flex gap-1 mb-2 overflow-x-auto text-[9px]">
              <span className="text-neutral-500 py-0.5">Lọc tầng:</span>
              {['all', '1', '2', '3', '4', '5', '6', '7'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterFloor(f)}
                  className={`px-2 py-0.5 border ${
                    filterFloor === f
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                  }`}
                >
                  {f === 'all' ? 'TẤT CẢ' : `TẦNG ${f}`}
                </button>
              ))}
            </div>

            {/* Grid List */}
            <div className="overflow-y-auto space-y-1.5 flex-1 pr-1 max-h-[50vh]">
              {filteredSurvivors.map((survivor) => (
                <div
                  key={survivor.id}
                  className="p-2.5 bg-neutral-900/80 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-7 h-7 bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-xs text-neutral-300">
                      {survivor.gender === 'male' ? '♂' : '♀'}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white uppercase truncate">{survivor.name}</span>
                        <span className="text-[9px] text-cyan-400">{survivor.room}</span>
                        <span className="text-[9px] px-1 bg-cyan-950 text-cyan-300 border border-cyan-800">
                          {survivor.awakenedSkill.name} [{survivor.awakenedSkill.tier}]
                        </span>
                      </div>
                      <div className="text-[9px] text-neutral-400">
                        Nghề nghiệp: {survivor.originalJob} • HP: {survivor.hp}/{survivor.maxHp}
                      </div>
                    </div>
                  </div>

                  {/* Assign Role Buttons */}
                  <div className="flex items-center gap-1 shrink-0 text-[9px]">
                    <span className="text-neutral-500 uppercase mr-1">Vai trò:</span>
                    {(['guard', 'scavenger', 'medic', 'engineer', 'cook'] as Survivor['role'][]).map((r) => {
                      const isRole = survivor.role === r;
                      return (
                        <button
                          key={r}
                          onClick={() => {
                            soundManager.play('click');
                            onAssignRole(survivor.id, r);
                          }}
                          className={`px-1.5 py-0.5 border uppercase cursor-pointer ${
                            isRole
                              ? 'bg-cyan-600 border-cyan-500 text-white font-bold'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          {r === 'guard' && '🛡️ Thủ'}
                          {r === 'scavenger' && '🔍 Nhặt'}
                          {r === 'medic' && '💉 Y'}
                          {r === 'engineer' && '🔧 Kỹ'}
                          {r === 'cook' && '🍲 Nấu'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Market Offers */}
        {activeTab === 'market' && (
          <div className="overflow-y-auto space-y-2 flex-1 pr-1 max-h-[50vh]">
            {marketOffers.map((offer) => {
              const askingKeyword = offer.asking.name.split(' ')[0].toLowerCase();
              const askingItem = inventory.find(
                (i) =>
                  i.name.toLowerCase().includes(askingKeyword) ||
                  i.id.toLowerCase().includes(askingKeyword) ||
                  (askingKeyword.includes('băng') && i.id.includes('item_porcelain_bowl'))
              );
              const ownedCount = askingItem?.quantity || 0;
              const hasEnough = ownedCount >= offer.asking.count;

              return (
                <div
                  key={offer.id}
                  className={`p-3 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                    offer.completed
                      ? 'bg-neutral-950/60 border-neutral-800 opacity-60'
                      : 'bg-neutral-900/80 border-cyan-500/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{offer.sellerName}</span>
                      <span className="text-[9px] text-cyan-400">({offer.room})</span>
                    </div>
                    <div className="mt-1 text-[11px] text-neutral-300">
                      Cần bán: <strong className="text-amber-300">{offer.offering.icon} {offer.offering.name} x{offer.offering.count}</strong>
                      {' '}➔ Cần đổi: <strong className="text-cyan-300">{offer.asking.icon} {offer.asking.name} x{offer.asking.count}</strong>
                      <span className={`ml-2 text-[10px] ${hasEnough ? 'text-emerald-400' : 'text-red-400'}`}>
                        (Có: {ownedCount}/{offer.asking.count})
                      </span>
                    </div>
                  </div>

                  <button
                    disabled={offer.completed || !hasEnough}
                    onClick={() => {
                      soundManager.play('item_get');
                      onTradeMarketOffer(offer.id);
                    }}
                    className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all ${
                      offer.completed
                        ? 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
                        : hasEnough
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-700 cursor-pointer shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                        : 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
                    }`}
                  >
                    {offer.completed ? 'Đã Giao Dịch' : hasEnough ? 'Trao Đổi' : 'Thiếu Đồ'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Radio */}
        {activeTab === 'radio' && (
          <div className="p-3 bg-neutral-950 border border-neutral-800 space-y-2 text-xs overflow-y-auto max-h-[50vh]">
            <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-neutral-800 pb-2">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>TẦN SỐ NỘI BỘ KÝ TÚC XÁ 107.5 MHz</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="p-2 bg-neutral-900 border border-neutral-800">
                <span className="text-cyan-400 font-bold">[Phòng 104 - Trần Văn Hùng]:</span> Các bạn ơi, tầng trệt có tiếng gầm lớn ở sảnh chính, mọi người đừng xuống cầu thang số 2!
              </div>
              <div className="p-2 bg-neutral-900 border border-neutral-800">
                <span className="text-amber-400 font-bold">[Phòng 502 - Lê Thu Hà]:</span> Cần đổi 2 chai nước khoáng lấy 1 cuộn băng gạc y tế gấp cho bạn cùng phòng!
              </div>
              <div className="p-2 bg-neutral-900 border border-neutral-800">
                <span className="text-emerald-400 font-bold">[Phòng 304 - Quân]:</span> Chúng tôi vừa tìm thấy xưởng chế tạo, có thể hỗ trợ gia cố vũ khí thô sơ cho mọi người.
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
