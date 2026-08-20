import React from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../../utils/audio';
import { PvzCompanion, SurvivalStats } from '../types';
import {
  Tent,
  X,
  Heart,
  Shield,
  Utensils,
  Compass,
  Sprout,
  Dna,
  CheckCircle2,
  Droplets,
  Activity,
  Flame,
  Award
} from 'lucide-react';

interface PvzSurvivalCampModalProps {
  companions: PvzCompanion[];
  survivalStats: SurvivalStats;
  onAssignCompanion: (companionId: string, task: string) => void;
  onClose: () => void;
}

const AVAILABLE_TASKS = [
  {
    id: 'scout',
    title: 'Trinh Sát Ngoại Ô',
    icon: '🏃‍♂️',
    desc: 'Thu thập hạt giống, ánh sáng mặt trời dã chiến và cảnh báo sớm đợt zombie.',
    buff: '+25 Nắng khởi đầu màn & Giảm tốc độ chạy của Zombie'
  },
  {
    id: 'defense',
    title: 'Tuần Tra Cương Hóa',
    icon: '🛡️',
    desc: 'Củng cố công sự phòng thủ, gia cố giáp và độ bền cho Hạt Dẻ và Bí Ngô.',
    buff: '+20% Máu tối đa của tất cả thực vật phòng thủ'
  },
  {
    id: 'cooking',
    title: 'Hậu Cần & Nấu Súp Năng Lượng',
    icon: '🍲',
    desc: 'Chế biến khẩu phần ăn dã chiến, duy trì thể lực và tăng năng lượng tái chế.',
    buff: '+5 Năng lượng mỗi khi diệt quái & Hồi phục thể lực'
  },
  {
    id: 'gardening',
    title: 'Ươm Mầm Lai Tạo Gen',
    icon: '🔬',
    desc: 'Nuôi cấy mô tế bào thực vật, tăng tốc độ quang hợp và giảm thời gian hồi chiêu.',
    buff: 'Giảm 20% thời gian hồi chiêu của thẻ cây cao cấp'
  },
  {
    id: 'combat',
    title: 'Luyện Kiếm Trảm Quái',
    icon: '⚔️',
    desc: 'Rèn luyện đao pháp diệt quái vật tinh anh và bảo vệ các khu vực trọng yếu.',
    buff: '+15% Sát thương đòn đánh của toàn bộ thực vật'
  }
];

export const PvzSurvivalCampModal: React.FC<PvzSurvivalCampModalProps> = ({
  companions,
  survivalStats,
  onAssignCompanion,
  onClose
}) => {
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
              ⛺
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white uppercase flex items-center gap-2">
                <span>TRẠI SINH TỒN VĨNH HẰNG GIA VIÊN & HẬU CẦN</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Phân công đồng đội quản lý căn cứ, nấu ăn, trinh sát và lai tạo giống gen sinh tồn
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

        {/* Survival Dashboard Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-neutral-900 border border-neutral-800 rounded-xs mb-4 text-xs">
          <div className="p-2 bg-neutral-950 border border-amber-500/30 rounded-xs">
            <div className="flex items-center justify-between text-neutral-400 font-bold mb-1">
              <span className="flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-amber-400" />
                Lương Thực
              </span>
              <span className="text-amber-300 font-black">{survivalStats.foodSupply}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400"
                style={{ width: `${survivalStats.foodSupply}%` }}
              />
            </div>
          </div>

          <div className="p-2 bg-neutral-950 border border-cyan-500/30 rounded-xs">
            <div className="flex items-center justify-between text-neutral-400 font-bold mb-1">
              <span className="flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                Nước Sạch
              </span>
              <span className="text-cyan-300 font-black">{survivalStats.pureWaterSupply}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-400"
                style={{ width: `${survivalStats.pureWaterSupply}%` }}
              />
            </div>
          </div>

          <div className="p-2 bg-neutral-950 border border-emerald-500/30 rounded-xs">
            <div className="flex items-center justify-between text-neutral-400 font-bold mb-1">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Kháng Virus
              </span>
              <span className="text-emerald-300 font-black">{survivalStats.viralResistancePct}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-green-400"
                style={{ width: `${survivalStats.viralResistancePct}%` }}
              />
            </div>
          </div>

          <div className="p-2 bg-neutral-950 border border-fuchsia-500/30 rounded-xs">
            <div className="flex items-center justify-between text-neutral-400 font-bold mb-1">
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-fuchsia-400" />
                Quy Mô Đất
              </span>
              <span className="text-fuchsia-300 font-black">{survivalStats.landAreaM2} m²</span>
            </div>
            <div className="text-[10px] text-fuchsia-300/80 font-bold mt-0.5 truncate">
              {survivalStats.landAreaM2 >= 100 ? '🏯 Đại Pháo Đài' : '🏡 Khu Vườn Dã Chiến'}
            </div>
          </div>
        </div>

        {/* Companions Base Roster & Task Assignment */}
        <div className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span>👥</span>
          <span>Phân Công Nhiệm Vụ Đồng Đội ({companions.filter((c) => c.isUnlocked).length} Sẵn Sàng)</span>
        </div>

        <div className="overflow-y-auto space-y-3 flex-1 pr-1 max-h-[50vh]">
          {companions.map((comp) => {
            if (!comp.isUnlocked) {
              return (
                <div
                  key={comp.id}
                  className="p-3 bg-neutral-950 border border-neutral-800 opacity-50 rounded-xs flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl filter grayscale">{comp.avatar}</span>
                    <div>
                      <div className="font-bold text-neutral-500">{comp.name}</div>
                      <div className="text-[10px] text-neutral-600">Chưa mở khóa trong cốt truyện</div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-500 rounded-xs">
                    KHÓA
                  </span>
                </div>
              );
            }

            return (
              <div
                key={comp.id}
                className="p-3.5 bg-neutral-900 border border-emerald-500/40 rounded-xs flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm hover:border-emerald-400 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 bg-neutral-950 border border-emerald-500 flex items-center justify-center text-3xl rounded-xs shrink-0">
                    {comp.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-black text-white">{comp.name}</h4>
                      <span className="text-[9px] px-1.5 py-0.2 bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold rounded-xs">
                        {comp.role}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-300 italic mt-0.5">"{comp.dialogue}"</div>
                    <div className="text-[11px] text-amber-400 font-bold mt-1">
                      Kỹ năng: {comp.specialSkill} - {comp.skillDesc}
                    </div>
                  </div>
                </div>

                {/* Assignment Dropdown / Selector */}
                <div className="shrink-0 flex flex-col items-end gap-1.5">
                  <div className="text-[10px] text-neutral-400 font-bold">Nhiệm Vụ Đảm Nhận:</div>
                  <select
                    value={comp.assignedTask || 'scout'}
                    onChange={(e) => {
                      soundManager.play('click');
                      onAssignCompanion(comp.id, e.target.value);
                    }}
                    className="px-2.5 py-1 bg-neutral-950 border border-emerald-500/60 text-emerald-300 text-xs font-bold rounded-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  >
                    {AVAILABLE_TASKS.map((t) => (
                      <option key={t.id} value={t.id} className="bg-neutral-900 text-white">
                        {t.icon} {t.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
