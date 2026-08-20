import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Enemy, CharacterStats, Companion, Skill, Item, Equipment, CombatLog } from '../types';
import { soundManager } from '../utils/audio';
import { Language, t } from '../utils/i18n';
import confetti from 'canvas-confetti';
import { Swords, Zap, Shield, Sparkles } from 'lucide-react';

interface CombatModalProps {
  enemy: Enemy;
  playerStats: CharacterStats;
  companion: Companion;
  playerSkill: Skill;
  equipment: Equipment;
  inventory: Item[];
  onVictory: (enemy: Enemy, extractedStats?: { str?: number; vit?: number; int?: number }) => void;
  onDefeat: () => void;
  onEscape: () => void;
  onUseCombatItem: (item: Item) => void;
  lang?: Language;
}

export const CombatModal: React.FC<CombatModalProps> = ({
  enemy,
  playerStats,
  companion,
  playerSkill,
  equipment,
  inventory,
  onVictory,
  onDefeat,
  onEscape,
  onUseCombatItem,
  lang = 'vi'
}) => {
  // Local combat state
  const [enemyHp, setEnemyHp] = useState(enemy.hp);
  const [playerHp, setPlayerHp] = useState(playerStats.hp);
  const [playerMp, setPlayerMp] = useState(playerStats.mp);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [skillCooldown, setSkillCooldown] = useState(0);
  const [isDefending, setIsDefending] = useState(false);
  const [combatFinished, setCombatFinished] = useState<'victory' | 'defeat' | null>(null);
  const [logs, setLogs] = useState<CombatLog[]>([
    {
      id: 'log_start',
      text: `[HỆ THỐNG] Chạm trán ${enemy.name}! Chuẩn bị chiến đấu sinh tồn!`,
      type: 'system',
      timestamp: '00:01'
    }
  ]);
  const [showItemMenu, setShowItemMenu] = useState(false);

  const addLog = (text: string, type: CombatLog['type']) => {
    setLogs((prev) => [
      {
        id: `log_${Date.now()}_${Math.random()}`,
        text,
        type,
        timestamp: new Date().toLocaleTimeString().slice(3, 8)
      },
      ...prev.slice(0, 15)
    ]);
  };

  const hasFolkBook = inventory.some((item) => item.id === 'item_co_thu_di_van');
  const enemyWeakness = enemy.weakness;

  // 1. Basic Attack
  const handleBasicAttack = () => {
    if (!isPlayerTurn || combatFinished) return;
    soundManager.play('attack');

    const baseAtk = playerStats.str * 3 + (equipment.weapon?.stats?.atk || 0);
    const variance = Math.floor(Math.random() * 5) - 2;
    const isCrit = Math.random() < playerStats.lck * 0.02;
    let damage = Math.max(5, baseAtk - (enemy.defense || 0) + variance);
    if (isCrit) {
      damage = Math.floor(damage * 1.5);
    }

    const newEnemyHp = Math.max(0, enemyHp - damage);
    setEnemyHp(newEnemyHp);

    addLog(
      `[TẤN CÔNG] Bạn vung vũ khí đánh trúng ${enemy.name}, gây ${damage} sát thương! ${isCrit ? '💥 CHÍ MẠNG!' : ''}`,
      'player'
    );

    if (newEnemyHp <= 0) {
      handleCombatEnd(true);
    } else {
      triggerCompanionSupport(newEnemyHp);
    }
  };

  // 2. Cast Skill
  const handleUseSkill = () => {
    if (!isPlayerTurn || combatFinished || playerMp < playerSkill.mpCost || skillCooldown > 0) return;
    soundManager.play('skill');

    setPlayerMp((prev) => Math.max(0, prev - playerSkill.mpCost));
    setSkillCooldown(playerSkill.cooldownTurns);

    let damage = playerSkill.power + playerStats.int * 2;
    let extracted: { str?: number; vit?: number; int?: number } | undefined = undefined;

    if (playerSkill.id === 'skill_sss_extract' || playerSkill.effectType === 'extract') {
      extracted = { str: 1, vit: 1 };
      damage += 15;
    }

    const newEnemyHp = Math.max(0, enemyHp - damage);
    setEnemyHp(newEnemyHp);

    addLog(
      `[KỸ NĂNG] ${playerSkill.icon} Bạn kích hoạt [${playerSkill.name}], giáng đòn uy lực ${damage} sát thương lên ${enemy.name}!`,
      'skill'
    );

    if (newEnemyHp <= 0) {
      handleCombatEnd(true, extracted);
    } else {
      triggerCompanionSupport(newEnemyHp);
    }
  };

  // 3. Companion Support Action
  const triggerCompanionSupport = (currentEnemyHp: number) => {
    setIsPlayerTurn(false);

    setTimeout(() => {
      if (currentEnemyHp <= 0) return;

      const compDamage = 8 + companion.level * 3;
      const updatedEnemyHp = Math.max(0, currentEnemyHp - compDamage);
      setEnemyHp(updatedEnemyHp);
      soundManager.play('attack');

      addLog(
        `[ĐỒNG ĐỘI] ${companion.name} kích hoạt [${companion.skill.name}], hỗ trợ bọc lót gây ${compDamage} sát thương!`,
        'companion'
      );

      if (updatedEnemyHp <= 0) {
        handleCombatEnd(true);
      } else {
        setTimeout(() => {
          handleEnemyTurn(updatedEnemyHp);
        }, 600);
      }
    }, 500);
  };

  // 4. Defend Action
  const handleDefend = () => {
    if (!isPlayerTurn || combatFinished) return;
    soundManager.play('click');
    setIsDefending(true);
    addLog(`[PHÒNG THỦ] Bạn vào tư thế thủ vững chắc, giảm 50% sát thương đòn tiếp theo!`, 'player');
    triggerCompanionSupport(enemyHp);
  };

  // 5. Use Consumable & Weakness Counter Item
  const handleUseItemInCombat = (item: Item) => {
    if (!isPlayerTurn || combatFinished) return;

    // Check if item matches enemy weakness counter
    if (enemyWeakness && (item.id === enemyWeakness.counterItemId || item.name.includes(enemyWeakness.counterItemName || '___'))) {
      soundManager.play('skill');
      const counterMultiplier = enemyWeakness.damageMultiplier || 2.0;
      const weaknessDmg = Math.floor(100 * counterMultiplier);
      const newEnemyHp = Math.max(0, enemyHp - weaknessDmg);
      setEnemyHp(newEnemyHp);
      onUseCombatItem(item);
      addLog(`[KHẮC CHẾ ĐIỂM YẾU DÂN GIAN] 🎯 Sử dụng [${item.name}] chuẩn xác! ${enemyWeakness.description} -> GÂY ${weaknessDmg} SÁT THƯƠNG ĐẶC BIỆT!`, 'crit');
      setShowItemMenu(false);

      if (newEnemyHp <= 0) {
        handleCombatEnd(true);
      } else {
        triggerCompanionSupport(newEnemyHp);
      }
      return;
    }

    if (item.id === 'item_molotov' || item.id === 'craft_molotov_pack' || item.id.includes('molotov')) {
      soundManager.play('skill');
      const molotovDmg = 45;
      const newEnemyHp = Math.max(0, enemyHp - molotovDmg);
      setEnemyHp(newEnemyHp);
      onUseCombatItem(item);
      addLog(`[VẬT PHẨM] Bạn ném Chai Xăng Molotov 🔥! Phát nổ gây ${molotovDmg} sát thương diện rộng!`, 'item');
      setShowItemMenu(false);

      if (newEnemyHp <= 0) {
        handleCombatEnd(true);
      } else {
        triggerCompanionSupport(newEnemyHp);
      }
    } else if (item.stats?.hp) {
      soundManager.play('item_get');
      const heal = item.stats.hp;
      setPlayerHp((prev) => Math.min(playerStats.maxHp, prev + heal));
      onUseCombatItem(item);
      addLog(`[HỒI PHỤC] Bạn dùng ${item.name}, hồi phục +${heal} HP!`, 'item');
      setShowItemMenu(false);
      triggerCompanionSupport(enemyHp);
    }
  };

  // 6. Enemy Turn
  const handleEnemyTurn = (currentEnemyHp: number) => {
    if (currentEnemyHp <= 0 || combatFinished) return;
    soundManager.play('danger');

    const totalDef = playerStats.vit * 2 + (equipment.armor?.stats?.def || 0);
    let rawDamage = enemy.attack || 10;
    let finalDamage = Math.max(3, rawDamage - Math.floor(totalDef * 0.4));

    if (isDefending) {
      finalDamage = Math.max(2, Math.floor(finalDamage * 0.5));
      setIsDefending(false);
    }

    const newPlayerHp = Math.max(0, playerHp - finalDamage);
    setPlayerHp(newPlayerHp);

    addLog(`[QUÁI VẬT] ${enemy.name} gầm rú lao tới tấn công, bạn nhận ${finalDamage} sát thương!`, 'enemy');

    if (skillCooldown > 0) {
      setSkillCooldown((prev) => prev - 1);
    }

    if (newPlayerHp <= 0) {
      handleCombatEnd(false);
    } else {
      setIsPlayerTurn(true);
    }
  };

  // Combat End
  const handleCombatEnd = (victory: boolean, extractedStats?: { str?: number; vit?: number; int?: number }) => {
    if (victory) {
      setCombatFinished('victory');
      soundManager.play('victory');
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
      addLog(`[CHIẾN THẮNG] Đã tiêu diệt ${enemy.name}! Nhận ${enemy.expReward} EXP và chiến lợi phẩm!`, 'system');
      setTimeout(() => {
        onVictory(enemy, extractedStats);
      }, 1500);
    } else {
      setCombatFinished('defeat');
      soundManager.play('danger');
      addLog(`[THẤT BẠI] Bạn đã bị thương nặng và kiệt sức!`, 'enemy');
      setTimeout(() => {
        onDefeat();
      }, 1800);
    }
  };

  const combatUsableItems = inventory.filter(
    (item) =>
      item.quantity > 0 &&
      (item.category === 'consumable' ||
        item.id === 'item_mau_cho_muc' ||
        item.id === 'item_guong_dong_bat_quai' ||
        item.id === 'item_huong_me_than' ||
        item.id === 'item_bay_thu_an_nac' ||
        item.id === 'item_moc_tam_phien' ||
        item.id === 'item_molotov' ||
        item.id === 'craft_molotov_pack' ||
        item.id.includes('molotov') ||
        !!item.stats?.hp ||
        (enemyWeakness && item.id === enemyWeakness.counterItemId))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-neutral-950 border-2 border-red-500/50 p-5 shadow-2xl relative text-neutral-100 flex flex-col max-h-[95vh] overflow-hidden"
      >
        {/* Top Badge */}
        <div className="absolute -top-3.5 left-6 bg-red-600 text-white px-3 py-0.5 text-[11px] font-black uppercase tracking-tighter">
          Chiến Trường Sinh Tồn Dã Chiến
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 mb-2 mt-1">
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
            <Swords className="w-4 h-4 animate-pulse" />
            <span>CHẠM TRÁN THỰC THỂ DỊ BIẾN</span>
          </div>
          <div className="text-[10px] text-neutral-400">
            Lượt: <span className={isPlayerTurn ? 'text-cyan-400 font-bold' : 'text-red-400 font-bold'}>{isPlayerTurn ? 'LƯỢT CỦA BẠN' : 'LƯỢT CỦA KẺ ĐỊCH...'}</span>
          </div>
        </div>

        {/* Boss Weakness Folklore Banner */}
        {enemyWeakness && (
          <div className="mb-2 p-2 bg-amber-950/50 border border-amber-500/50 text-[10px] text-amber-200 flex items-start gap-2">
            <span className="text-sm">📖</span>
            <div className="flex-1">
              <div className="font-bold text-amber-400 uppercase flex items-center gap-1">
                <span>Điểm Yếu Dân Gian: {enemyWeakness.counterItemName || 'Vật phẩm khắc chế'}</span>
                {hasFolkBook && <span className="bg-amber-400 text-black text-[8px] font-black px-1 rounded-xs">ĐÃ GIẢI MÃ TỪ CỔ THƯ</span>}
              </div>
              <p className="text-neutral-300 mt-0.5">{enemyWeakness.folkLoreHint}</p>
            </div>
          </div>
        )}

        {/* Top Arena: Enemy & Player Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
          {/* Enemy Card */}
          <div className="p-3 bg-neutral-900 border border-red-500/40 relative overflow-hidden">
            {enemy.isBoss && (
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-red-600/20 rounded-full blur-xl pointer-events-none animate-pulse" />
            )}
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-14 h-14 bg-neutral-950 border border-red-600/60 p-1 flex items-center justify-center rounded-xs shrink-0 relative shadow-inner">
                {enemy.imageUrl ? (
                  <img
                    src={enemy.imageUrl}
                    alt={enemy.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(220,38,38,0.8)] animate-pulse"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'inline';
                    }}
                  />
                ) : null}
                <span
                  className="text-3xl"
                  style={{ display: enemy.imageUrl ? 'none' : 'inline' }}
                >
                  {enemy.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-white text-xs truncate">{enemy.name}</h4>
                  {enemy.isBoss && <span className="text-[8px] bg-red-600 text-white font-bold px-1 uppercase">BOSS</span>}
                </div>
                <div className="text-[9px] text-red-400 truncate">{enemy.title}</div>
                {enemy.floor && (
                  <div className="text-[8px] text-neutral-400">Vị trí: <span className="text-amber-300 font-bold">{enemy.floor}</span></div>
                )}
              </div>
            </div>

            {/* Enemy HP Bar */}
            <div className="mt-2">
              <div className="flex justify-between text-[10px] text-red-400 mb-0.5">
                <span>HP QUÁI VẬT</span>
                <span>{enemyHp} / {enemy.maxHp}</span>
              </div>
              <div className="h-2 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
                <div
                  className="h-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)] transition-all duration-300"
                  style={{ width: `${Math.max(0, (enemyHp / enemy.maxHp) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Player & Companion Combat Status */}
          <div className="p-3 bg-neutral-900 border border-cyan-500/40">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-white text-xs">Bạn & {companion.name}</span>
              <span className="text-emerald-400 font-bold text-xs">{playerHp} / {playerStats.maxHp} HP</span>
            </div>

            {/* Player HP */}
            <div className="h-2 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800 mb-1.5">
              <div
                className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-300"
                style={{ width: `${Math.max(0, (playerHp / playerStats.maxHp) * 100)}%` }}
              />
            </div>

            {/* Player MP */}
            <div className="flex items-center justify-between text-[10px] text-cyan-400 mb-0.5">
              <span>MANA (MP)</span>
              <span>{playerMp} / {playerStats.maxMp}</span>
            </div>
            <div className="h-1.5 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
              <div
                className="h-full bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.5)] transition-all duration-300"
                style={{ width: `${Math.max(0, (playerMp / playerStats.maxMp) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Combat Battle Logs */}
        <div className="flex-1 bg-neutral-950 border border-neutral-800 p-2.5 min-h-[110px] max-h-[140px] overflow-y-auto space-y-1 text-[10px] mb-3">
          {logs.map((log) => {
            let logColor = 'text-neutral-400';
            if (log.type === 'player') logColor = 'text-cyan-300';
            if (log.type === 'skill') logColor = 'text-purple-300 font-bold';
            if (log.type === 'companion') logColor = 'text-emerald-300';
            if (log.type === 'enemy') logColor = 'text-red-400';
            if (log.type === 'system') logColor = 'text-amber-300 font-bold';

            return (
              <div key={log.id} className={`${logColor} leading-relaxed`}>
                <span className="text-neutral-600 mr-1.5">[{log.timestamp}]</span>
                {log.text}
              </div>
            );
          })}
        </div>

        {/* Action Controls Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {/* Attack */}
          <button
            disabled={!isPlayerTurn || combatFinished !== null}
            onClick={handleBasicAttack}
            className={`py-2 px-2 text-xs font-bold uppercase tracking-widest border-b-2 flex items-center justify-center gap-1 transition-all ${
              isPlayerTurn && !combatFinished
                ? 'bg-red-700 hover:bg-red-600 text-white border-red-900 cursor-pointer shadow-[0_0_8px_rgba(225,29,72,0.3)]'
                : 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>{t('action.attack', lang)}</span>
          </button>

          {/* Skill */}
          <button
            disabled={!isPlayerTurn || combatFinished !== null || playerMp < playerSkill.mpCost || skillCooldown > 0}
            onClick={handleUseSkill}
            className={`py-2 px-2 text-xs font-bold uppercase tracking-widest border-b-2 flex items-center justify-center gap-1 transition-all ${
              isPlayerTurn && !combatFinished && playerMp >= playerSkill.mpCost && skillCooldown === 0
                ? 'bg-purple-700 hover:bg-purple-600 text-white border-purple-900 cursor-pointer shadow-[0_0_8px_rgba(147,51,234,0.3)]'
                : 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{playerSkill.name.slice(0, 10)} ({playerSkill.mpCost}MP)</span>
          </button>

          {/* Defend */}
          <button
            disabled={!isPlayerTurn || combatFinished !== null}
            onClick={handleDefend}
            className={`py-2 px-2 text-xs font-bold uppercase tracking-widest border-b-2 flex items-center justify-center gap-1 transition-all ${
              isPlayerTurn && !combatFinished
                ? 'bg-cyan-700 hover:bg-cyan-600 text-white border-cyan-900 cursor-pointer shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                : 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{lang === 'vi' ? 'Phòng Thủ' : 'Defend'}</span>
          </button>

          {/* Items / Escape */}
          <button
            disabled={!isPlayerTurn || combatFinished !== null}
            onClick={() => setShowItemMenu(!showItemMenu)}
            className="py-2 px-2 bg-neutral-800 hover:bg-neutral-700 border-b-2 border-neutral-700 text-amber-300 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('action.item', lang)} ({combatUsableItems.length})</span>
          </button>
        </div>

        {/* Item Popout Menu */}
        {showItemMenu && (
          <div className="mt-2 p-2 bg-neutral-900 border border-neutral-800 flex flex-wrap gap-1.5">
            {combatUsableItems.length === 0 ? (
              <span className="text-[10px] text-neutral-500">Không có vật phẩm chiến đấu sẵn có.</span>
            ) : (
              combatUsableItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleUseItemInCombat(item)}
                  className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-[10px] flex items-center gap-1 cursor-pointer"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                  <span className="text-amber-400">x{item.quantity}</span>
                </button>
              ))
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
