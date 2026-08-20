import React from 'react';
import { CharacterStats, Companion, Equipment, Skill } from '../types';
import { soundManager } from '../utils/audio';
import { Language, t } from '../utils/i18n';
import {
  Heart,
  Zap,
  Shield,
  Sparkles,
  User,
  HeartHandshake,
  Plus,
  Award,
  AlertCircle,
  Droplets,
  Utensils,
  Brain,
  Radar,
  Crosshair,
  Swords,
  Hammer,
  Crown,
  GitMerge
} from 'lucide-react';

interface CharacterCardProps {
  stats: CharacterStats;
  companion: Companion;
  playerSkill: Skill;
  equipment: Equipment;
  onAllocateStat: (stat: 'str' | 'agi' | 'vit' | 'int' | 'lck') => void;
  onUpgradeSkill: () => void;
  onOpenSkillEvolution: () => void;
  onOpenBlacksmith: () => void;
  onOpenPets: () => void;
  crystalsCount: number;
  lang?: Language;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  stats,
  companion,
  playerSkill,
  equipment,
  onAllocateStat,
  onUpgradeSkill,
  onOpenSkillEvolution,
  onOpenBlacksmith,
  onOpenPets,
  crystalsCount,
  lang = 'vi'
}) => {
  const getVitalColor = (val: number) => {
    if (val > 60) return 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]';
    if (val > 25) return 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.4)]';
    return 'bg-red-600 shadow-[0_0_6px_rgba(220,38,38,0.5)] animate-pulse';
  };

  const calculateTotalAtk = () => {
    return stats.str * 3 + (equipment.weapon?.stats?.atk || 0) + ((equipment.weapon?.enhanceLevel || 0) * 4);
  };

  const calculateTotalDef = () => {
    return stats.vit * 2 + (equipment.armor?.stats?.def || 0) + ((equipment.armor?.enhanceLevel || 0) * 3);
  };

  return (
    <div className="space-y-3 font-mono">
      {/* 1. Player Status & Attributes Card */}
      <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-sm shadow-md relative overflow-hidden">
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent"></div>

        {/* Header with Level and Exp */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-neutral-950 border-2 border-cyan-500 rounded-sm flex items-center justify-center font-black text-xl text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              {stats.level}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white uppercase tracking-wide">
                  {lang === 'vi' ? 'Chỉ Huy Sinh Tồn' : 'Survival Commander'}
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-bold uppercase rounded-xs">
                  {t('gauge.level', lang)} {stats.level}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                {lang === 'vi' ? 'Kinh nghiệm' : 'Exp'}: <span className="text-cyan-300 font-bold">{stats.exp}/{stats.maxExp}</span> ({((stats.exp / stats.maxExp) * 100).toFixed(0)}%)
              </p>
            </div>
          </div>

          {stats.unspentStatPoints > 0 && (
            <div className="px-2.5 py-1 bg-amber-950/80 border border-amber-500/80 text-amber-300 text-xs font-bold flex items-center gap-1.5 animate-pulse rounded-xs shadow-[0_0_10px_rgba(245,158,11,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> +{stats.unspentStatPoints} {t('stat.unspent_points', lang).toUpperCase()}
            </div>
          )}
        </div>

        {/* 5 Core Attributes Grid */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-400 uppercase font-bold tracking-wider">
              {lang === 'vi' ? 'Chỉ Số Thuộc Tính' : 'Core Attributes'}
            </span>
            <div className="text-xs font-mono">
              {lang === 'vi' ? 'TẤN CÔNG' : 'ATK'}: <span className="text-rose-400 font-black">{calculateTotalAtk()}</span> • {lang === 'vi' ? 'PHÒNG THỦ' : 'DEF'}: <span className="text-cyan-400 font-black">{calculateTotalDef()}</span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 text-center">
            {/* STR */}
            <div className="p-2 bg-neutral-950 border border-neutral-800 rounded-xs">
              <div className="text-[10px] text-neutral-400 uppercase font-bold">STR</div>
              <div className="text-base font-black text-rose-400 my-0.5">{stats.str}</div>
              {stats.unspentStatPoints > 0 && (
                <button
                  onClick={() => onAllocateStat('str')}
                  className="w-full py-1 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black rounded-xs cursor-pointer shadow-sm"
                  title="Cộng 1 điểm STR (+3 ATK)"
                >
                  +
                </button>
              )}
            </div>

            {/* AGI */}
            <div className="p-2 bg-neutral-950 border border-neutral-800 rounded-xs">
              <div className="text-[10px] text-neutral-400 uppercase font-bold">AGI</div>
              <div className="text-base font-black text-emerald-400 my-0.5">{stats.agi}</div>
              {stats.unspentStatPoints > 0 && (
                <button
                  onClick={() => onAllocateStat('agi')}
                  className="w-full py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xs cursor-pointer shadow-sm"
                  title="Cộng 1 điểm AGI (+Né tránh & Tốc độ)"
                >
                  +
                </button>
              )}
            </div>

            {/* VIT */}
            <div className="p-2 bg-neutral-950 border border-neutral-800 rounded-xs">
              <div className="text-[10px] text-neutral-400 uppercase font-bold">VIT</div>
              <div className="text-base font-black text-amber-400 my-0.5">{stats.vit}</div>
              {stats.unspentStatPoints > 0 && (
                <button
                  onClick={() => onAllocateStat('vit')}
                  className="w-full py-1 bg-amber-600 hover:bg-amber-500 text-neutral-950 text-xs font-black rounded-xs cursor-pointer shadow-sm"
                  title="Cộng 1 điểm VIT (+2 DEF, +HP)"
                >
                  +
                </button>
              )}
            </div>

            {/* INT */}
            <div className="p-2 bg-neutral-950 border border-neutral-800 rounded-xs">
              <div className="text-[10px] text-neutral-400 uppercase font-bold">INT</div>
              <div className="text-base font-black text-cyan-400 my-0.5">{stats.int}</div>
              {stats.unspentStatPoints > 0 && (
                <button
                  onClick={() => onAllocateStat('int')}
                  className="w-full py-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-black rounded-xs cursor-pointer shadow-sm"
                  title="Cộng 1 điểm INT (+Uy lực phép, +MP)"
                >
                  +
                </button>
              )}
            </div>

            {/* LCK */}
            <div className="p-2 bg-neutral-950 border border-neutral-800 rounded-xs">
              <div className="text-[10px] text-neutral-400 uppercase font-bold">LCK</div>
              <div className="text-base font-black text-purple-300 my-0.5">{stats.lck}</div>
              {stats.unspentStatPoints > 0 && (
                <button
                  onClick={() => onAllocateStat('lck')}
                  className="w-full py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black rounded-xs cursor-pointer shadow-sm"
                  title="Cộng 1 điểm LCK (+Chí mạng, +Tỉ lệ nhặt đồ)"
                >
                  +
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Kỹ Năng Thức Tỉnh (Awakened Skill) */}
      <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-sm shadow-md">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2.5">
          <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'vi' ? 'Kỹ Năng Thức Tỉnh & Dung Hợp' : 'Awakened & Fusion Skills'}</span>
          </h2>
          <button
            onClick={() => {
              soundManager.play('click');
              onOpenSkillEvolution();
            }}
            className="px-2.5 py-1 bg-purple-950/80 hover:bg-purple-900 border border-purple-500/60 text-purple-300 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-sm rounded-xs"
          >
            <GitMerge className="w-3.5 h-3.5" />
            <span>{lang === 'vi' ? 'Đột Phá & Thiên Phú' : 'Evolution & Talents'}</span>
          </button>
        </div>

        <div className="bg-neutral-950 border border-cyan-800/60 p-3 rounded-sm shadow-inner">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-cyan-400 font-bold uppercase">
              [{lang === 'vi' ? 'HẠNG' : 'TIER'} {playerSkill.tier}] • {t('gauge.level', lang)} {playerSkill.level}/{playerSkill.maxLevel}
            </span>
            <span className="text-xs text-amber-300 font-bold">
              {t('common.power', lang)}: {playerSkill.power}
            </span>
          </div>

          <h3 className="text-base font-black text-white uppercase mt-1 flex items-center gap-2">
            <span className="text-2xl">{playerSkill.icon}</span>
            <span>{playerSkill.name}</span>
          </h3>

          <p className="text-xs text-neutral-300 mt-2 leading-relaxed bg-neutral-900/60 p-2.5 border border-neutral-800 rounded-xs">
            {playerSkill.description}
          </p>

          <div className="mt-3 pt-2 border-t border-neutral-800 flex flex-wrap justify-between items-center gap-2 text-xs">
            <span className="text-neutral-400">
              {t('common.cost', lang)}: <strong className="text-cyan-300">{playerSkill.mpCost} MP</strong> | {t('common.cooldown', lang)}: <strong className="text-amber-300">{playerSkill.cooldownTurns} {t('common.turns', lang)}</strong>
            </span>
            {playerSkill.level < playerSkill.maxLevel && (
              <button
                disabled={crystalsCount < playerSkill.level * 2}
                onClick={onUpgradeSkill}
                className={`px-3 py-1.5 text-xs font-bold uppercase transition-all rounded-xs ${
                  crystalsCount >= playerSkill.level * 2
                    ? 'bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
                }`}
              >
                {t('action.upgrade', lang)} ({playerSkill.level * 2} 💎)
              </button>
            )}
          </div>
        </div>

        {/* Quick Hub buttons: Blacksmith & Pets */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={() => {
              soundManager.play('click');
              onOpenBlacksmith();
            }}
            className="p-2 bg-neutral-950 hover:bg-amber-950/40 border border-neutral-800 hover:border-amber-500/60 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all rounded-xs"
          >
            <Hammer className="w-4 h-4 text-amber-400" />
            <span>{t('menu.blacksmith', lang)}</span>
          </button>

          <button
            onClick={() => {
              soundManager.play('click');
              onOpenPets();
            }}
            className="p-2 bg-neutral-950 hover:bg-emerald-950/40 border border-neutral-800 hover:border-emerald-500/60 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all rounded-xs"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{t('menu.pets', lang)}</span>
          </button>
        </div>
      </div>

      {/* 3. Đồng Đội Cùng Sinh Tồn & Radar GPS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Companion Mini Card */}
        <div className="bg-neutral-900/90 border border-neutral-800 p-3 rounded-sm flex flex-col justify-between shadow-md">
          <div>
            <div className="flex justify-between items-center text-xs text-cyan-400 font-bold uppercase border-b border-neutral-800 pb-1.5 mb-2">
              <span>{t('stat.companion', lang)}</span>
              <span className="text-emerald-400">{t('stat.bond', lang)}: {companion.bond}%</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-neutral-950 border border-neutral-700 rounded-sm flex items-center justify-center font-bold text-base text-rose-400">
                {companion.gender === 'male' ? '♂️' : '♀️'}
              </div>
              <div>
                <div className="text-sm font-bold text-white uppercase">{companion.name}</div>
                <div className="text-xs text-neutral-400">{companion.skill.icon} {companion.skill.name}</div>
              </div>
            </div>
          </div>
          <div className="mt-2.5 text-xs text-neutral-300 bg-neutral-950 p-2 border border-neutral-800 rounded-xs leading-relaxed">
            {companion.skill.description}
          </div>
        </div>

        {/* Mini Radar HUD Overlay */}
        <div className="bg-neutral-900/90 border border-neutral-800 p-3 rounded-sm relative overflow-hidden flex flex-col shadow-md">
          <div className="flex justify-between items-center text-xs font-bold text-neutral-400 uppercase mb-2">
            <span>{lang === 'vi' ? 'Radar Quét Khu Vực' : 'Sector Radar'}</span>
            <span className="text-cyan-400 font-mono text-[10px]">{lang === 'vi' ? 'Bán kính: 50m' : 'Radius: 50m'}</span>
          </div>

          <div className="flex-1 min-h-[90px] border border-neutral-800 relative bg-neutral-950 overflow-hidden rounded-xs">
            {/* Concentric rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 border border-cyan-900/40 rounded-full"></div>
              <div className="w-10 h-10 border border-cyan-900/40 rounded-full"></div>
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-900/30"></div>
              <div className="absolute left-1/2 top-0 h-full w-[1px] bg-cyan-900/30"></div>

              {/* Radar sweep */}
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(6,182,212,0.25)_360deg)] rounded-full animate-radar-sweep pointer-events-none"></div>

              {/* Blips */}
              <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_red] animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_cyan]"></div>
              <div className="absolute top-4 right-6 w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_8px_amber]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
