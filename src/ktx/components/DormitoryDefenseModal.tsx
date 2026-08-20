import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BaseFacility, Item, Survivor } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  ShieldAlert,
  Hammer,
  Sparkles,
  X,
  Zap,
  Flame,
  Users,
  ChevronRight,
  TrendingUp,
  Skull,
  ShieldCheck,
  Award
} from 'lucide-react';

interface DormitoryDefenseModalProps {
  facilities: BaseFacility[];
  inventory: Item[];
  survivors: Survivor[];
  currentDay: number;
  onUpgradeFacility: (facilityId: string) => void;
  onTriggerSiegeDefense: (results: {
    survived: boolean;
    repelledZombies: number;
    rewards: { crystals: number; exp: number };
    damageTaken: number;
  }) => void;
  onClose: () => void;
}

export const DormitoryDefenseModal: React.FC<DormitoryDefenseModalProps> = ({
  facilities,
  inventory,
  survivors,
  currentDay,
  onUpgradeFacility,
  onTriggerSiegeDefense,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'facilities' | 'siege'>('facilities');
  const [isSimulatingSiege, setIsSimulatingSiege] = useState(false);
  const [siegeLog, setSiegeLog] = useState<string[]>([]);
  const [siegeResult, setSiegeResult] = useState<{
    survived: boolean;
    repelledZombies: number;
    rewards: { crystals: number; exp: number };
    damageTaken: number;
  } | null>(null);

  const totalDefensePower = facilities.reduce((sum, f) => sum + f.defensePower * f.level, 0);
  const guardsCount = survivors.filter((s) => s.role === 'guard').length;
  const aliveSurvivors = survivors.filter((s) => s.status === 'alive').length;

  const canAffordFacility = (facility: BaseFacility) => {
    return facility.upgradeCost.every((cost) => {
      const invItem = inventory.find((i) => i.id === cost.itemId);
      return invItem && invItem.quantity >= cost.count;
    });
  };

  const handleStartSiegeDefense = () => {
    soundManager.play('danger');
    setIsSimulatingSiege(true);
    setSiegeResult(null);
    setSiegeLog([
      `[HỆ THỐNG] ⚠️ BÁO ĐỘNG ĐỎ: Đêm Huyết Nguyệt buông xuống! Bầy xác sống đang bao vây cổng chính KTX!`
    ]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step === 1) {
        soundManager.play('attack');
        setSiegeLog((prev) => [
          ...prev,
          `[PHÒNG THỦ] 🚧 Hàng rào thép gai và ${guardsCount} lính gác chặn đứng đợt tràn vào đầu tiên!`
        ]);
      } else if (step === 2) {
        soundManager.play('skill');
        const uvTurret = facilities.find((f) => f.id === 'fac_uv_turret');
        if (uvTurret && uvTurret.level > 0) {
          setSiegeLog((prev) => [
            ...prev,
            `[ĐÈN UV] 💡 Trụ Đèn Quang Phổ kích hoạt! Thiêu rụi 15 Zombie chạy nhanh (Runners)!`
          ]);
        } else {
          setSiegeLog((prev) => [
            ...prev,
            `[CẢNH BÁO] Chưa có đèn UV bảo hộ, xác sống đang áp sát chân tường!`
          ]);
        }
      } else if (step === 3) {
        soundManager.play('attack');
        const elecGrid = facilities.find((f) => f.id === 'fac_electric_grid');
        if (elecGrid && elecGrid.level > 0) {
          setSiegeLog((prev) => [
            ...prev,
            `[LƯỚI ĐIỆN] ⚡ Phóng luồng điện 5000V từ hầm B1, giật tê liệt toàn bộ đàn Zombie đột biến!`
          ]);
        } else {
          setSiegeLog((prev) => [
            ...prev,
            `[CHIẾN ĐẤU] Đội phòng thủ dũng cảm dùng gậy thép và bình cứu hỏa đẩy lùi quái vật!`
          ]);
        }
      } else if (step === 4) {
        clearInterval(interval);
        setIsSimulatingSiege(false);

        const repelled = 25 + totalDefensePower + guardsCount * 4;
        const rewardCrystals = Math.max(3, Math.floor(totalDefensePower / 15) + 2);
        const rewardExp = 80 + totalDefensePower * 2;

        const res = {
          survived: true,
          repelledZombies: repelled,
          rewards: { crystals: rewardCrystals, exp: rewardExp },
          damageTaken: Math.max(0, 15 - Math.floor(totalDefensePower / 20))
        };

        setSiegeResult(res);
        soundManager.play('victory');
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
        setSiegeLog((prev) => [
          ...prev,
          `[CHIẾN THẮNG] 🏆 Toàn bộ ký túc xá an toàn tuyệt đối! Đã tiêu diệt ${repelled} xác sống!`
        ]);
        onTriggerSiegeDefense(res);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-4xl bg-neutral-950 border-2 border-cyan-500/50 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative"
      >
        {/* Badge */}
        <div className="absolute -top-3.5 left-6 bg-cyan-500 text-neutral-950 px-3 py-0.5 text-[11px] font-black uppercase tracking-tighter">
          Phòng Tuyến Ký Túc Xá & Đêm Sóng Quái
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 mb-3 mt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-neutral-800 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                Hệ Thống Công Trình Phòng Ngự KTX
              </h3>
              <p className="text-[10px] text-neutral-400">
                Nâng cấp cơ sở vật chất để bảo vệ 100 cư dân và kích hoạt cơ chế phòng thủ ban đêm
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

        {/* Overview Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-xs">
          <div className="p-2 bg-neutral-900 border border-neutral-800">
            <div className="text-[9px] text-neutral-500 uppercase">SỨC MẠNH PHÒNG THỦ</div>
            <div className="text-sm font-bold text-cyan-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{totalDefensePower} DEF</span>
            </div>
          </div>
          <div className="p-2 bg-neutral-900 border border-neutral-800">
            <div className="text-[9px] text-neutral-500 uppercase">LỰC LƯỢNG CANH GÁC</div>
            <div className="text-sm font-bold text-emerald-400">{guardsCount} Cư dân</div>
          </div>
          <div className="p-2 bg-neutral-900 border border-neutral-800">
            <div className="text-[9px] text-neutral-500 uppercase">CƯ DÂN ĐƯỢC BẢO HỘ</div>
            <div className="text-sm font-bold text-white">{aliveSurvivors} / 100</div>
          </div>
          <div className="p-2 bg-neutral-900 border border-neutral-800">
            <div className="text-[9px] text-neutral-500 uppercase">NGÀY THẾ GIỚI HIỆN TẠI</div>
            <div className="text-sm font-bold text-amber-300">Ngày {currentDay}</div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 border-b border-neutral-800 pb-2 mb-3 text-[10px]">
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveTab('facilities');
            }}
            className={`px-3 py-1 uppercase font-bold border transition-all cursor-pointer ${
              activeTab === 'facilities'
                ? 'bg-cyan-600 text-white border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            CÔNG TRÌNH PHÒNG THỦ ({facilities.length})
          </button>
          <button
            onClick={() => {
              soundManager.play('click');
              setActiveTab('siege');
            }}
            className={`px-3 py-1 uppercase font-bold border transition-all cursor-pointer ${
              activeTab === 'siege'
                ? 'bg-red-700 text-white border-red-600 shadow-[0_0_8px_rgba(220,38,38,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            ĐÊM HUYẾT NGUYỆT - SÓNG QUÁI TẬP KÍCH ⚔️
          </button>
        </div>

        {/* Tab 1: Facilities Upgrade List */}
        {activeTab === 'facilities' && (
          <div className="overflow-y-auto space-y-2 flex-1 pr-1 max-h-[52vh]">
            {facilities.map((facility) => {
              const affordable = canAffordFacility(facility);
              const isMaxLevel = facility.level >= facility.maxLevel;

              return (
                <div
                  key={facility.id}
                  className="p-3 bg-neutral-900/80 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-neutral-800 border border-neutral-700 rounded-sm flex items-center justify-center text-xl shrink-0">
                      {facility.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white uppercase text-xs">{facility.name}</span>
                        <span className="text-[9px] px-1 bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-bold uppercase">
                          CẤP {facility.level} / {facility.maxLevel}
                        </span>
                        <span className="text-[9px] text-emerald-400 font-mono">
                          +{facility.defensePower * facility.level} DEF
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-0.5">{facility.description}</p>
                      <p className="text-[10px] text-amber-300 mt-1">
                        Hiệu lực: {facility.currentEffect}
                      </p>

                      {/* Upgrade Requirements */}
                      {!isMaxLevel && (
                        <div className="flex flex-wrap gap-2 mt-1.5 text-[9px]">
                          <span className="text-neutral-500">Nguyên liệu nâng cấp:</span>
                          {facility.upgradeCost.map((cost, idx) => {
                            const inv = inventory.find((i) => i.id === cost.itemId);
                            const hasEnough = inv && inv.quantity >= cost.count;
                            return (
                              <span
                                key={idx}
                                className={`px-1.5 py-0.2 border ${
                                  hasEnough
                                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                                    : 'bg-red-950/60 border-red-500/50 text-red-300'
                                }`}
                              >
                                {cost.name} x{cost.count} ({inv?.quantity || 0}/{cost.count})
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    disabled={isMaxLevel || !affordable}
                    onClick={() => {
                      soundManager.play('craft');
                      onUpgradeFacility(facility.id);
                    }}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all shrink-0 ${
                      isMaxLevel
                        ? 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
                        : affordable
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-700 cursor-pointer shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                        : 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
                    }`}
                  >
                    {isMaxLevel ? 'Cấp Tối Đa' : 'Nâng Cấp'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Siege Defense Battle */}
        {activeTab === 'siege' && (
          <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
            <div className="p-3 bg-neutral-900 border border-red-500/40 text-xs relative overflow-hidden">
              <div className="flex items-center gap-2 text-red-400 font-bold mb-1">
                <Skull className="w-4 h-4 animate-pulse" />
                <span>CHỈ HUY PHÒNG THỦ ĐÊM SÓNG QUÁI</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed relative z-10">
                Khi kích hoạt, đàn xác sống từ khuôn viên ngoài sẽ tấn công dồn dập vào cổng ký túc xá. Các công trình phòng thủ, bẫy điện, đèn UV và đội cư dân canh gác sẽ tự động tham chiến hiệp đồng.
              </p>

              {/* Animated PVZ Zombie Swarm Preview */}
              <div className="flex items-center justify-around gap-2 mt-3 pt-2 border-t border-neutral-800 bg-neutral-950/80 p-2 rounded-xs">
                <div className="flex flex-col items-center">
                  <img src="./pvz_assets/zombies/zombie_normal.png" alt="Normal Zombie" className="w-10 h-10 object-contain animate-bounce" style={{ animationDuration: '1.8s' }} />
                  <span className="text-[8px] text-neutral-400 font-bold mt-1">Xác Sống Thường</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src="./pvz_assets/zombies/zombie_conehead.png" alt="Conehead Zombie" className="w-10 h-10 object-contain animate-bounce" style={{ animationDuration: '1.5s' }} />
                  <span className="text-[8px] text-amber-400 font-bold mt-1">Zombie Mũ Nón</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src="./pvz_assets/zombies/zombie_buckethead.png" alt="Buckethead Zombie" className="w-10 h-10 object-contain animate-bounce" style={{ animationDuration: '1.3s' }} />
                  <span className="text-[8px] text-cyan-400 font-bold mt-1">Thiết Giáp Mũ Sắt</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src="./pvz_assets/zombies/zombie_gargantuar.png" alt="Gargantuar" className="w-12 h-12 object-contain animate-pulse" />
                  <span className="text-[8px] text-rose-400 font-black mt-1">Boss Cự Nhân</span>
                </div>
              </div>
            </div>

            {/* Battle Log Box */}
            <div className="flex-1 bg-neutral-950 border border-neutral-800 p-3 min-h-[140px] max-h-[220px] overflow-y-auto space-y-1.5 text-[11px]">
              {siegeLog.length === 0 ? (
                <div className="text-neutral-500 italic text-center py-6">
                  Chưa có trận chiến nào đang diễn ra. Hãy bấm "Kích Hoạt Phòng Thủ Đêm" để thử lửa công trình!
                </div>
              ) : (
                siegeLog.map((log, idx) => (
                  <div key={idx} className="text-neutral-300 leading-relaxed">
                    {log}
                  </div>
                ))
              )}
            </div>

            {/* Results popup banner */}
            {siegeResult && (
              <div className="p-2.5 bg-emerald-950/80 border border-emerald-500/60 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-300">ĐẨY LÙI ĐỢT TẤN CÔNG THÀNH CÔNG!</span>
                  <div className="text-[10px] text-neutral-300 mt-0.5">
                    +{siegeResult.rewards.exp} EXP • +{siegeResult.rewards.crystals} Tinh Thể Dị Biến 💎
                  </div>
                </div>
                <div className="text-emerald-400 font-bold text-sm">+{siegeResult.repelledZombies} Kills</div>
              </div>
            )}

            {/* Start Button */}
            <button
              disabled={isSimulatingSiege}
              onClick={handleStartSiegeDefense}
              className={`w-full py-2.5 text-xs font-bold uppercase tracking-widest border transition-all ${
                isSimulatingSiege
                  ? 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
                  : 'bg-red-700 hover:bg-red-600 text-white border-red-900 cursor-pointer shadow-[0_0_12px_rgba(220,38,38,0.4)]'
              }`}
            >
              {isSimulatingSiege ? 'Đang Đánh Chặn Bầy Xác Sống...' : 'KÍCH HOẠT PHÒNG THỦ ĐÊM (BẮT ĐẦU SÓNG QUÁI)'}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
