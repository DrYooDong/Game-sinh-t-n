import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CharacterStats, LordRoomData, RoomTenant } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  X,
  Crown,
  Bed,
  DoorClosed,
  Crosshair,
  Radio,
  Sparkles,
  Flame,
  Moon,
  Users,
  ShieldAlert,
  Zap,
  ArrowUpCircle,
  Eye,
  Heart,
  Volume2
} from 'lucide-react';

interface LordRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: CharacterStats;
  lordRoomData: LordRoomData;
  roomTenants: RoomTenant[];
  onUpgradeBed: () => void;
  onUpgradeDoor: () => void;
  onUpgradeTurret: (side: 'left' | 'right') => void;
  onFeedGuardian: () => void;
  onSleepAndProduce: () => void;
  onToggleAggro: () => void;
  onOpenRadio: () => void;
  onGiftTenant: (tenantId: string) => void;
}

export const LordRoomModal: React.FC<LordRoomModalProps> = ({
  isOpen,
  onClose,
  stats,
  lordRoomData,
  roomTenants,
  onUpgradeBed,
  onUpgradeDoor,
  onUpgradeTurret,
  onFeedGuardian,
  onSleepAndProduce,
  onToggleAggro,
  onOpenRadio,
  onGiftTenant
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tenants' | 'defenses' | 'guardian'>('overview');
  const [selectedTenant, setSelectedTenant] = useState<RoomTenant>(roomTenants[0]);

  if (!isOpen) return null;

  // Calculate total conversion bonus
  const totalTenantBonus = roomTenants
    .filter((t) => t.isRecruited)
    .reduce((sum, t) => sum + t.conversionBonusPct, 0);
  const totalConversionRate = 100 + totalTenantBonus + lordRoomData.bedComfort;
  const hourlyOutput = Math.floor((40 * totalConversionRate) / 100);
  const eightHoursOutput = hourlyOutput * 8;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-2 sm:p-4 overflow-y-auto font-mono">
      <div className="relative w-full max-w-5xl bg-neutral-950 border-2 border-amber-500/60 p-4 sm:p-6 shadow-[0_0_60px_rgba(245,158,11,0.2)] text-neutral-100 max-h-[92vh] flex flex-col">
        
        {/* Top Floating Badge */}
        <div className="absolute -top-3.5 left-6 bg-gradient-to-r from-amber-500 to-yellow-400 text-neutral-950 px-3.5 py-0.5 text-[11px] font-black uppercase tracking-tighter shadow-md flex items-center gap-1.5">
          <Crown className="w-3.5 h-3.5" />
          HỆ THỐNG PHÒNG 200: THIÊN PHÚ CHÚA TỂ CƯỜNG HÓA VẠN VẬT
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4 mt-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-950/80 border border-amber-500/60 flex items-center justify-center text-amber-400">
              <Crown className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-amber-300 uppercase tracking-wide">
                  PHÒNG CHÚA TỂ 200 (KTX PHONG VƯƠNG TẦNG 10)
                </h2>
                <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase font-bold">
                  Bất Khả Xâm Phạm
                </span>
              </div>
              <p className="text-xs text-neutral-400 flex items-center gap-2 mt-0.5">
                <span>Tỉ lệ chuyển đổi: <strong className="text-amber-400 font-bold">+{totalConversionRate}%</strong></span>
                <span>•</span>
                <span>Sản lượng: <strong className="text-emerald-400 font-bold">{hourlyOutput} Xu/giờ</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right bg-neutral-900 border border-amber-500/30 px-3 py-1.5 hidden sm:block">
              <div className="text-[10px] text-neutral-400 uppercase">Xu Chúa Tể Hiện Có:</div>
              <div className="text-sm font-black text-amber-400 flex items-center justify-end gap-1">
                <span>🪙</span> {stats.lordCoins} XU
              </div>
            </div>
            <button
              onClick={() => {
                soundManager.play('click');
                onClose();
              }}
              className="p-1.5 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 gap-1 mb-4 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveTab('overview');
            }}
            className={`px-4 py-2 font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-amber-500 text-neutral-950 font-black shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Bed className="w-3.5 h-3.5" /> Giường Ngủ & Sản Xuất
          </button>
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveTab('tenants');
            }}
            className={`px-4 py-2 font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'tenants'
                ? 'bg-amber-500 text-neutral-950 font-black shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Bạn Cùng Phòng ({roomTenants.filter(t => t.isRecruited).length}/6)
          </button>
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveTab('defenses');
            }}
            className={`px-4 py-2 font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'defenses'
                ? 'bg-amber-500 text-neutral-950 font-black shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <DoorClosed className="w-3.5 h-3.5" /> Cửa & Ụ Pháo Đài
          </button>
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveTab('guardian');
            }}
            className={`px-4 py-2 font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'guardian'
                ? 'bg-amber-500 text-neutral-950 font-black shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Thần Khảm Quỷ Đồng
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs">
          
          {/* 1. OVERVIEW & SLEEP ENGINE */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              
              {/* Bed Sleep Action Hero Card */}
              <div className="p-4 bg-gradient-to-br from-neutral-900 to-amber-950/40 border border-amber-500/40 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl p-2 bg-neutral-950 border border-amber-500/40">🛏️</div>
                    <div>
                      <h3 className="text-sm font-bold text-amber-300 uppercase">{lordRoomData.bedName}</h3>
                      <p className="text-[11px] text-neutral-400">
                        Độ thoải mái: <span className="text-amber-300 font-bold">+{lordRoomData.bedComfort}%</span> | Giới hạn: 8 tiếng/ngày
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundManager.play('level_up');
                        onSleepAndProduce();
                        confetti({ particleCount: 50, spread: 70 });
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-neutral-950 font-black uppercase text-xs tracking-wider border-b-4 border-amber-800 flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)] cursor-pointer"
                    >
                      <Moon className="w-4 h-4" />
                      <span>NGỦ 8 TIẾNG (+{eightHoursOutput} XU CHÚA TỂ)</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-neutral-950/80 border border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
                  <div>
                    <span className="text-neutral-400 block">Sản Xuất Cơ Bản:</span>
                    <strong className="text-white font-bold">40 Xu/giờ</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Buff Bạn Cùng Phòng:</span>
                    <strong className="text-amber-400 font-bold">+{totalTenantBonus}%</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Buff Giường Ngủ:</span>
                    <strong className="text-cyan-400 font-bold">+{lordRoomData.bedComfort}%</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Dự Tính Sau 8 Tiếng:</span>
                    <strong className="text-emerald-400 font-bold">+{eightHoursOutput} Xu 🪙</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-neutral-400">
                    Nâng cấp giường tiếp theo: <strong>Giường Chúa Tể Sang Trọng Cấp 3</strong> (+30% sản lượng)
                  </span>
                  <button
                    disabled={stats.lordCoins < 300}
                    onClick={() => {
                      soundManager.play('craft');
                      onUpgradeBed();
                    }}
                    className={`px-3 py-1.5 text-[11px] font-bold uppercase border transition-all cursor-pointer flex items-center gap-1.5 ${
                      stats.lordCoins >= 300
                        ? 'bg-amber-600 hover:bg-amber-500 text-neutral-950 border-amber-400'
                        : 'bg-neutral-900 text-neutral-600 border-neutral-800 cursor-not-allowed'
                    }`}
                  >
                    <ArrowUpCircle className="w-3.5 h-3.5" /> Nâng Cấp Giường (300 Xu)
                  </button>
                </div>
              </div>

              {/* Special Story Artefacts Status (Minh Phủ & Sector 09) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-neutral-900 border border-purple-500/40 space-y-1">
                  <div className="flex items-center gap-2 text-purple-400 font-bold uppercase text-[11px]">
                    <span>📜</span> Thư Mời Minh Phủ (Chương 3)
                  </div>
                  <p className="text-[10px] text-neutral-300">
                    Đã dâng Bát Sứ Thanh Hoa cho Âm Sai tuần tra. Phó bản song song <strong>"Ký Túc Xá Bóng Tối"</strong> đã sẵn sàng.
                  </p>
                </div>
                <div className="p-3 bg-neutral-900 border border-cyan-500/40 space-y-1">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase text-[11px]">
                    <span>🗺️</span> Phân Vùng 09 (Chương 7)
                  </div>
                  <p className="text-[10px] text-neutral-300">
                    Bản đồ chiến lược: 8 Tế Đàn lân cận đang sáp nhập vào <strong>Thành Phố Hoang Tàn</strong>.
                  </p>
                </div>
              </div>

              {/* Aggro / Hatred Index Control Card */}
              <div className="p-4 bg-neutral-900/90 border border-rose-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-rose-400 font-bold uppercase">
                    <ShieldAlert className="w-4 h-4" /> Chỉ Số Thù Hận & Loa Khiêu Khích Toàn KTX
                  </div>
                  <p className="text-[11px] text-neutral-300">
                    Hét lớn qua loa phát thanh hoặc khiêu khích để kéo toàn bộ quái vật từ tầng 1 đến tầng 9 về cửa phòng 200, tạo cơ hội xả đạn pháo cày điểm Top 1!
                  </p>
                  <div className="text-[11px] text-amber-400">
                    Điểm Thù Hận Hiện Tại: <strong>{stats.aggroScore || 350} Điểm (Quái vật ưu tiên tấn công phòng 200)</strong>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundManager.play('danger');
                    onToggleAggro();
                  }}
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold uppercase tracking-wider text-xs border-b-4 border-rose-900 flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                >
                  <Volume2 className="w-4 h-4" /> PHÁT LOA KHIÊU KHÍCH QUÁI VẬT
                </button>
              </div>

              {/* Radio Quick Link */}
              <div className="p-3 bg-neutral-900 border border-cyan-500/40 flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span className="font-bold uppercase">Máy Thu Thanh Kênh Huyết Vụ 107.5MHz</span>
                  <span className="text-[10px] text-neutral-400">(Hội Tương Trợ KTX Tinh Anh)</span>
                </div>
                <button
                  onClick={() => {
                    soundManager.play('click');
                    onOpenRadio();
                  }}
                  className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase text-[11px] border border-cyan-400 cursor-pointer"
                >
                  Mở Đài Thu Thanh
                </button>
              </div>

            </div>
          )}

          {/* 2. TENANTS MANAGEMENT */}
          {activeTab === 'tenants' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              {/* Tenant List */}
              <div className="space-y-2 md:col-span-1">
                <h4 className="text-xs font-bold text-amber-400 uppercase">Danh Sách Người Thuê Phòng</h4>
                <div className="space-y-1.5">
                  {roomTenants.map((tenant) => (
                    <button
                      key={tenant.id}
                      onClick={() => {
                        soundManager.play('click');
                        setSelectedTenant(tenant);
                      }}
                      className={`w-full p-2.5 text-left border flex items-center justify-between transition-all cursor-pointer ${
                        selectedTenant.id === tenant.id
                          ? 'bg-amber-950/60 border-amber-400 text-white shadow-sm'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{tenant.avatar}</span>
                        <div>
                          <div className="font-bold text-xs">{tenant.name}</div>
                          <div className="text-[10px] text-neutral-400">{tenant.title}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold text-xs">+{tenant.conversionBonusPct}%</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Tenant Details */}
              <div className="p-4 bg-neutral-900 border border-neutral-800 md:col-span-2 space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-neutral-950 border border-neutral-800">{selectedTenant.avatar}</span>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase">{selectedTenant.name}</h3>
                      <p className="text-[11px] text-amber-400">{selectedTenant.title}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-500/40 uppercase font-bold">
                    Buff: +{selectedTenant.conversionBonusPct}% Xu
                  </span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="p-2 bg-neutral-950 border border-neutral-800">
                    <span className="text-neutral-400 block mb-0.5">Kỹ Năng / Sở Trường:</span>
                    <strong className="text-cyan-300">{selectedTenant.specialty}</strong>
                  </div>
                  <div className="p-2 bg-neutral-950 border border-neutral-800">
                    <span className="text-neutral-400 block mb-0.5">Trang Bị Đang Dùng:</span>
                    <strong className="text-amber-300">{selectedTenant.assignedGear || 'Chưa trang bị'}</strong>
                  </div>
                  <div className="p-2.5 bg-neutral-950 border-l-2 border-amber-400 italic text-neutral-300">
                    "{selectedTenant.dialogue}"
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                  <span className="text-[11px] text-neutral-400">
                    Tặng quà tăng độ thoải mái (+10% sản lượng):
                  </span>
                  <button
                    onClick={() => {
                      soundManager.play('item_get');
                      onGiftTenant(selectedTenant.id);
                    }}
                    className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-rose-300 border border-neutral-700 font-bold uppercase text-[11px] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> Tặng Trang Phục Cao Cấp
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* 3. DOOR & TURRETS DEFENSES */}
          {activeTab === 'defenses' && (
            <div className="space-y-3">
              
              {/* Door Card */}
              <div className="p-4 bg-neutral-900 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DoorClosed className="w-5 h-5 text-amber-400" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase">{lordRoomData.doorName}</h4>
                      <p className="text-[10px] text-neutral-400">
                        Phòng thủ: <strong className="text-cyan-400">{lordRoomData.doorDef}</strong> | Độ bền: <strong className="text-emerald-400">{lordRoomData.doorHp}/{lordRoomData.doorMaxHp}</strong>
                      </p>
                    </div>
                  </div>
                  <button
                    disabled={stats.lordCoins < 250}
                    onClick={() => {
                      soundManager.play('craft');
                      onUpgradeDoor();
                    }}
                    className={`px-3 py-1.5 text-[11px] font-bold uppercase border transition-all cursor-pointer ${
                      stats.lordCoins >= 250
                        ? 'bg-amber-600 hover:bg-amber-500 text-neutral-950 border-amber-400'
                        : 'bg-neutral-900 text-neutral-600 border-neutral-800 cursor-not-allowed'
                    }`}
                  >
                    Nâng Cấp Cửa (250 Xu)
                  </button>
                </div>
                <p className="text-[11px] p-2 bg-neutral-950 border border-neutral-800 text-neutral-300">
                  {lordRoomData.doorEffect}
                </p>
              </div>

              {/* Turrets Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Left Turret */}
                <div className="p-3 bg-neutral-900 border border-cyan-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                      <Crosshair className="w-4 h-4" /> Ụ Pháo Trái (Cấp {lordRoomData.turretLeft.level})
                    </div>
                    <span className="text-[10px] px-1.5 bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase font-bold">
                      Tự Động Bắn
                    </span>
                  </div>
                  <h5 className="font-bold text-white text-xs">{lordRoomData.turretLeft.name}</h5>
                  <div className="text-[11px] text-neutral-300 space-y-0.5">
                    <div>Sát thương: <strong className="text-cyan-400">{lordRoomData.turretLeft.damage}</strong></div>
                    <div>Tốc độ: <strong className="text-neutral-200">{lordRoomData.turretLeft.speed}</strong></div>
                    <div>Chi phí: <strong className="text-amber-400">{lordRoomData.turretLeft.costPerShot} vàng/phát</strong></div>
                  </div>
                  <button
                    disabled={stats.lordCoins < 200}
                    onClick={() => {
                      soundManager.play('craft');
                      onUpgradeTurret('left');
                    }}
                    className={`w-full py-1.5 text-[11px] font-bold uppercase border transition-all cursor-pointer ${
                      stats.lordCoins >= 200
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-400'
                        : 'bg-neutral-950 text-neutral-600 border-neutral-800 cursor-not-allowed'
                    }`}
                  >
                    Nâng Cấp Pháo Trái (200 Xu)
                  </button>
                </div>

                {/* Right Turret */}
                <div className="p-3 bg-neutral-900 border border-cyan-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                      <Crosshair className="w-4 h-4" /> Ụ Pháo Phải (Cấp {lordRoomData.turretRight.level})
                    </div>
                    <span className="text-[10px] px-1.5 bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase font-bold">
                      Tự Động Bắn
                    </span>
                  </div>
                  <h5 className="font-bold text-white text-xs">{lordRoomData.turretRight.name}</h5>
                  <div className="text-[11px] text-neutral-300 space-y-0.5">
                    <div>Sát thương: <strong className="text-cyan-400">{lordRoomData.turretRight.damage}</strong></div>
                    <div>Tốc độ: <strong className="text-neutral-200">{lordRoomData.turretRight.speed}</strong></div>
                    <div>Chi phí: <strong className="text-amber-400">{lordRoomData.turretRight.costPerShot} vàng/phát</strong></div>
                  </div>
                  <button
                    disabled={stats.lordCoins < 200}
                    onClick={() => {
                      soundManager.play('craft');
                      onUpgradeTurret('right');
                    }}
                    className={`w-full py-1.5 text-[11px] font-bold uppercase border transition-all cursor-pointer ${
                      stats.lordCoins >= 200
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-400'
                        : 'bg-neutral-950 text-neutral-600 border-neutral-800 cursor-not-allowed'
                    }`}
                  >
                    Nâng Cấp Pháo Phải (200 Xu)
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* 4. GUARDIAN SPIRIT ALTAR */}
          {activeTab === 'guardian' && (
            <div className="p-4 bg-neutral-900 border border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⛩️</span>
                  <div>
                    <h4 className="text-xs font-bold text-amber-300 uppercase">{lordRoomData.guardianSpirit.name}</h4>
                    <p className="text-[10px] text-neutral-400">Linh vật hộ mệnh gắn trên đỉnh cửa chính KTX 200</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase font-bold">
                  Cấp Độ: {lordRoomData.guardianSpirit.level}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {lordRoomData.guardianSpirit.skills.map((skill, idx) => (
                  <div key={idx} className="p-2.5 bg-neutral-950 border border-neutral-800 text-center">
                    <span className="text-amber-400 font-bold block text-xs mb-0.5">Kỹ Năng 0{idx + 1}</span>
                    <span className="text-white text-[11px]">{skill}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                <span className="text-[11px] text-neutral-400">
                  Cho Quỷ Đồng ăn Hồn Nguyệt để tăng cường lực hút U Linh và thời gian định thân Boss:
                </span>
                <button
                  disabled={stats.lordCoins < 150}
                  onClick={() => {
                    soundManager.play('level_up');
                    onFeedGuardian();
                  }}
                  className={`px-4 py-2 text-xs font-bold uppercase border transition-all cursor-pointer ${
                    stats.lordCoins >= 150
                      ? 'bg-amber-600 hover:bg-amber-500 text-neutral-950 border-amber-400'
                      : 'bg-neutral-950 text-neutral-600 border-neutral-800 cursor-not-allowed'
                  }`}
                >
                  Cho Ăn Hồn Nguyệt (150 Xu)
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
