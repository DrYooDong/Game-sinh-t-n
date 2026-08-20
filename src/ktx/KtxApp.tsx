import React, { useState, useEffect } from 'react';
import { PrologueIntro } from './components/PrologueIntro';
import { StageProgressBar } from './components/StageProgressBar';
import { CharacterCard } from './components/CharacterCard';
import { ExplorationView } from './components/ExplorationView';
import { CombatModal } from './components/CombatModal';
import { CraftingModal } from './components/CraftingModal';
import { InventoryModal } from './components/InventoryModal';
import { SurvivorsHubModal } from './components/SurvivorsHubModal';
import { AIOracleModal } from './components/AIOracleModal';
import { StageDetailsModal } from './components/StageDetailsModal';
import { QuestsModal } from './components/QuestsModal';
import { SystemNotificationModal } from './components/SystemNotificationModal';
import { DormitoryDefenseModal } from './components/DormitoryDefenseModal';
import { SkillEvolutionModal } from './components/SkillEvolutionModal';
import { BlacksmithModal } from './components/BlacksmithModal';
import { PetCompanionModal } from './components/PetCompanionModal';
import { CodexModal } from './components/CodexModal';
import { LordRoomModal } from './components/LordRoomModal';
import { RadioTransceiverModal } from './components/RadioTransceiverModal';

import {
  CharacterStats,
  Companion,
  Equipment,
  Item,
  Skill,
  StagePhase,
  LocationArea,
  Enemy,
  Survivor,
  Quest,
  MarketOffer,
  SystemNotification,
  BaseFacility,
  PetCompanion,
  TalentNode,
  BestiaryEntry,
  WorldLoreChapter,
  WeatherType,
  RoomTenant,
  LordRoomData,
  RadioTransmission
} from './types';

import {
  SKILL_POOL,
  INITIAL_ITEMS,
  STAGES,
  LOCATIONS,
  ENEMIES,
  INITIAL_QUESTS,
  INITIAL_MARKET_OFFERS,
  BASE_FACILITIES,
  INITIAL_PETS,
  INITIAL_TALENTS,
  INITIAL_BESTIARY,
  WORLD_LORE_CHAPTERS,
  INITIAL_ROOM_TENANTS,
  INITIAL_LORD_ROOM_DATA,
  RADIO_TRANSMISSIONS,
  generateInitialSurvivors
} from './data/initialData';

import { soundManager } from './utils/audio';
import { Language, t, formatNumberWithComma } from './utils/i18n';
import confetti from 'canvas-confetti';
import {
  ShieldAlert,
  Backpack,
  Hammer,
  Users,
  Bot,
  Scroll,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Zap,
  Radio,
  Swords,
  Bell,
  Heart,
  Activity,
  Cpu,
  CloudRain,
  Sun,
  Flame,
  BookOpen,
  GitMerge,
  Crown,
  Languages,
  Globe
} from 'lucide-react';

const STORAGE_KEY = 'isekai_survival_rpg_save_v2';
const LANGUAGE_STORAGE_KEY = 'ktx_rpg_language_v1';

interface AppProps {
  onReturnToWorldSelect?: () => void;
}

export default function App({ onReturnToWorldSelect }: AppProps = {}) {
  // Language state
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
    return saved === 'vi' || saved === 'en' ? saved : 'vi';
  });

  const handleToggleLanguage = () => {
    const nextLang: Language = language === 'vi' ? 'en' : 'vi';
    setLanguage(nextLang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLang);
    soundManager.play('click');
  };

  // Game state
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Core character state
  const [playerName, setPlayerName] = useState<string>('Tiết Mộc');
  const [playerSkill, setPlayerSkill] = useState<Skill>(SKILL_POOL[0]);
  const [companion, setCompanion] = useState<Companion>({
    name: 'Tinh Thần',
    gender: 'female',
    relationship: 'Hoa Khôi Cùng Lớp',
    level: 1,
    hp: 100,
    maxHp: 100,
    skill: SKILL_POOL[6],
    status: 'idle',
    bond: 95
  });

  const [stats, setStats] = useState<CharacterStats>({
    hp: 100,
    maxHp: 100,
    mp: 50,
    maxMp: 50,
    stamina: 85,
    maxStamina: 100,
    hunger: 90,
    thirst: 90,
    sanity: 95,
    level: 1,
    exp: 0,
    maxExp: 50,
    str: 12,
    agi: 10,
    vit: 12,
    int: 14,
    lck: 12,
    unspentStatPoints: 0,
    mutationPoints: 6,
    lordCoins: 180,
    aggroScore: 350,
    pioneerRankPoints: 1250
  });

  const [equipment, setEquipment] = useState<Equipment>({
    weapon: INITIAL_ITEMS[1],
    armor: INITIAL_ITEMS[3],
    accessory: null
  });

  const [inventory, setInventory] = useState<Item[]>(INITIAL_ITEMS);
  const [currentDay, setCurrentDay] = useState<number>(2);
  const [currentStageId, setCurrentStageId] = useState<number>(1);
  const [locations, setLocations] = useState<LocationArea[]>(LOCATIONS);
  const [currentLocationId, setCurrentLocationId] = useState<string>('loc_room_200');
  const [survivors, setSurvivors] = useState<Survivor[]>(generateInitialSurvivors());
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [marketOffers, setMarketOffers] = useState<MarketOffer[]>(INITIAL_MARKET_OFFERS);

  // New Systems state
  const [facilities, setFacilities] = useState<BaseFacility[]>(BASE_FACILITIES);
  const [pets, setPets] = useState<PetCompanion[]>(INITIAL_PETS);
  const [talents, setTalents] = useState<TalentNode[]>(INITIAL_TALENTS);
  const [bestiary, setBestiary] = useState<BestiaryEntry[]>(INITIAL_BESTIARY);
  const [loreChapters, setLoreChapters] = useState<WorldLoreChapter[]>(WORLD_LORE_CHAPTERS);
  const [currentWeather, setCurrentWeather] = useState<WeatherType>('clear');

  // Lord Room & Radio Systems
  const [roomTenants, setRoomTenants] = useState<RoomTenant[]>(INITIAL_ROOM_TENANTS);
  const [lordRoomData, setLordRoomData] = useState<LordRoomData>(INITIAL_LORD_ROOM_DATA);
  const [radioTransmissions, setRadioTransmissions] = useState<RadioTransmission[]>(RADIO_TRANSMISSIONS);

  // Active Modals & Combat
  const [activeEnemy, setActiveEnemy] = useState<Enemy | null>(null);
  const [showCrafting, setShowCrafting] = useState<boolean>(false);
  const [showInventory, setShowInventory] = useState<boolean>(false);
  const [showSurvivorsHub, setShowSurvivorsHub] = useState<boolean>(false);
  const [showAIOracle, setShowAIOracle] = useState<boolean>(false);
  const [showStageDetails, setShowStageDetails] = useState<boolean>(false);
  const [showQuests, setShowQuests] = useState<boolean>(false);
  const [showDefense, setShowDefense] = useState<boolean>(false);
  const [showSkillEvolution, setShowSkillEvolution] = useState<boolean>(false);
  const [showBlacksmith, setShowBlacksmith] = useState<boolean>(false);
  const [showPets, setShowPets] = useState<boolean>(false);
  const [showCodex, setShowCodex] = useState<boolean>(false);
  const [showLordRoom, setShowLordRoom] = useState<boolean>(false);
  const [showRadioTransceiver, setShowRadioTransceiver] = useState<boolean>(false);

  // System Notifications
  const [currentNotification, setCurrentNotification] = useState<SystemNotification | null>(null);
  const [notificationHistory, setNotificationHistory] = useState<SystemNotification[]>([]);

  // Load Saved Game with Schema Migration
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.gameStarted) {
          setGameStarted(true);
          setPlayerName(data.playerName || 'Tuyết Mộc');
          setPlayerSkill(data.playerSkill || SKILL_POOL[0]);
          setCompanion(data.companion || companion);
          
          const loadedStats = data.stats || stats;
          setStats({
            ...loadedStats,
            lordCoins: loadedStats.lordCoins ?? 180,
            aggroScore: loadedStats.aggroScore ?? 350,
            mutationPoints: loadedStats.mutationPoints ?? 6
          });

          setEquipment(data.equipment || equipment);
          setInventory(data.inventory || INITIAL_ITEMS);
          setCurrentDay(data.currentDay || 2);
          setCurrentStageId(data.currentStageId || 1);
          setLocations(data.locations || LOCATIONS);
          setSurvivors(data.survivors || generateInitialSurvivors());
          setQuests(data.quests || INITIAL_QUESTS);
          setMarketOffers(data.marketOffers || INITIAL_MARKET_OFFERS);
          setFacilities(data.facilities || BASE_FACILITIES);
          setPets(data.pets || INITIAL_PETS);
          setTalents(data.talents || INITIAL_TALENTS);
          setBestiary(data.bestiary || INITIAL_BESTIARY);

          // Merge lore chapters to ensure all 7 chapters are present
          if (data.loreChapters && Array.isArray(data.loreChapters)) {
            const mergedChapters = WORLD_LORE_CHAPTERS.map((initCh) => {
              const found = data.loreChapters.find((c: any) => c.id === initCh.id);
              return found ? { ...initCh, isUnlocked: found.isUnlocked } : initCh;
            });
            setLoreChapters(mergedChapters);
          } else {
            setLoreChapters(WORLD_LORE_CHAPTERS);
          }

          // Merge room tenants to ensure all 6 tenants are present
          if (data.roomTenants && Array.isArray(data.roomTenants)) {
            const mergedTenants = INITIAL_ROOM_TENANTS.map((initT) => {
              const found = data.roomTenants.find((t: any) => t.id === initT.id);
              return found ? { ...initT, comfortScore: found.comfortScore || initT.comfortScore, isRecruited: found.isRecruited ?? true } : initT;
            });
            setRoomTenants(mergedTenants);
          } else {
            setRoomTenants(INITIAL_ROOM_TENANTS);
          }

          if (data.lordRoomData) setLordRoomData({ ...INITIAL_LORD_ROOM_DATA, ...data.lordRoomData });
          
          // Merge radio transmissions
          if (data.radioTransmissions && Array.isArray(data.radioTransmissions)) {
            const mergedRadio = RADIO_TRANSMISSIONS.map((initR) => {
              const found = data.radioTransmissions.find((r: any) => r.id === initR.id);
              return found ? { ...initR, isUnlocked: found.isUnlocked ?? initR.isUnlocked } : initR;
            });
            setRadioTransmissions(mergedRadio);
          } else {
            setRadioTransmissions(RADIO_TRANSMISSIONS);
          }

          setNotificationHistory(data.notificationHistory || []);
        }
      }
    } catch (e) {
      console.error('Failed to load saved state:', e);
    }
  }, []);

  // Save Game on Key State Changes
  useEffect(() => {
    if (!gameStarted) return;
    try {
      const saveData = {
        gameStarted,
        playerName,
        playerSkill,
        companion,
        stats,
        equipment,
        inventory,
        currentDay,
        currentStageId,
        locations,
        survivors,
        quests,
        marketOffers,
        facilities,
        pets,
        talents,
        bestiary,
        loreChapters,
        roomTenants,
        lordRoomData,
        radioTransmissions,
        notificationHistory
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }, [
    gameStarted,
    playerName,
    playerSkill,
    companion,
    stats,
    equipment,
    inventory,
    currentDay,
    currentStageId,
    locations,
    survivors,
    quests,
    marketOffers,
    facilities,
    pets,
    talents,
    bestiary,
    loreChapters,
    roomTenants,
    lordRoomData,
    radioTransmissions,
    notificationHistory
  ]);

  // Push System Notification
  const triggerNotification = (
    title: string,
    message: string,
    type: SystemNotification['type'] = 'event',
    actionLabel?: string
  ) => {
    soundManager.play('system_alert');
    const newNotif: SystemNotification = {
      id: `notif_${Date.now()}_${Math.random()}`,
      title,
      message,
      type,
      timestamp: `Ngày ${currentDay} - ${new Date().toLocaleTimeString().slice(3, 8)}`,
      read: false,
      actionLabel
    };
    setCurrentNotification(newNotif);
    setNotificationHistory((prev) => [newNotif, ...prev]);
  };

  // Start New Game from Prologue
  const handlePrologueComplete = (data: {
    playerName: string;
    companionName: string;
    companionGender: 'male' | 'female';
    playerSkill: Skill;
    companionSkill: Skill;
  }) => {
    setPlayerName(data.playerName);
    setPlayerSkill(data.playerSkill);
    setCompanion({
      name: data.companionName,
      gender: data.companionGender,
      relationship: data.companionGender === 'male' ? 'Chiến hữu chí cốt' : 'Bạn cùng phòng',
      level: 1,
      hp: 90,
      maxHp: 90,
      skill: data.companionSkill,
      status: 'idle',
      bond: 90
    });
    setGameStarted(true);

    triggerNotification(
      'CHÀO MỪNG TỚI KÝ TÚC XÁ SINH TỒN',
      `01. Bạn và 99 người khác đã bị dịch chuyển ngẫu nhiên tới khu vực này.\n02. Nhiệm vụ: Sinh tồn qua các giai đoạn, phát triển công trình phòng thủ, đột phá kỹ năng và đối đầu đợt sóng Zombie.\n03. Nhận kỹ năng độc nhất: [${data.playerSkill.name}].\n\nLUẬT CHƠI:\n- Nâng cấp Tháp UV & Hàng rào để bảo vệ 100 cư dân.\n- Sử dụng Lò Rèn & Dung Hợp Kỹ Năng để gia tăng thực lực.`,
      'rule',
      'BẮT ĐẦU SINH TỒN'
    );
  };

  // Toggle Mute Audio
  const handleToggleMute = () => {
    const isM = soundManager.toggleMute();
    setIsMuted(isM);
  };

  // Reset Game
  const handleResetGame = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dữ liệu và bắt đầu lại từ đầu không?')) {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  // Helper items count
  const crystalsCount = inventory.find((i) => i.id === 'special_crystal')?.quantity || 0;
  const foodCount = inventory.find((i) => i.id === 'food_bread' || i.id === 'food_noodle')?.quantity || 0;
  const waterCount = inventory.find((i) => i.id === 'drink_water')?.quantity || 0;

  // Level Up Check
  const checkLevelUp = (currentExp: number, currentLvl: number) => {
    let exp = currentExp;
    let lvl = currentLvl;
    let maxE = lvl * 50;
    let gainedPoints = 0;

    while (exp >= maxE) {
      exp -= maxE;
      lvl += 1;
      maxE = lvl * 50;
      gainedPoints += 2;
    }

    if (lvl > currentLvl) {
      soundManager.play('level_up');
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      setStats((prev) => ({
        ...prev,
        level: lvl,
        exp,
        maxExp: maxE,
        hp: prev.maxHp + 15,
        maxHp: prev.maxHp + 15,
        mp: prev.maxMp + 10,
        maxMp: prev.maxMp + 10,
        unspentStatPoints: prev.unspentStatPoints + gainedPoints,
        mutationPoints: prev.mutationPoints + 2
      }));

      triggerNotification(
        `THĂNG CẤP NHÂN VẬT: ĐẠT CẤP ${lvl}!`,
        `Chúc mừng bạn đã đột phá lên Cấp ${lvl}!\n• Máu tối đa +15, Mana tối đa +10\n• Nhận +${gainedPoints} Điểm Tiềm Năng Thuộc Tính\n• Nhận +2 Tinh Thể Dị Biến 💎`,
        'levelup',
        'NHẬN THUỘC TÍNH'
      );
    } else {
      setStats((prev) => ({ ...prev, exp }));
    }
  };

  // Allocate Stat Point
  const handleAllocateStat = (stat: 'str' | 'agi' | 'vit' | 'int' | 'lck') => {
    if (stats.unspentStatPoints <= 0) return;
    soundManager.play('click');
    setStats((prev) => ({
      ...prev,
      [stat]: prev[stat] + 1,
      unspentStatPoints: prev.unspentStatPoints - 1,
      maxHp: stat === 'vit' ? prev.maxHp + 10 : prev.maxHp,
      maxMp: stat === 'int' ? prev.maxMp + 8 : prev.maxMp
    }));
  };

  // Upgrade Skill with Crystals
  const handleUpgradeSkill = () => {
    const cost = playerSkill.level * 2;
    if (crystalsCount < cost) return;

    soundManager.play('level_up');
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.5 } });

    setInventory((prev) =>
      prev
        .map((item) => (item.id === 'special_crystal' ? { ...item, quantity: item.quantity - cost } : item))
        .filter((i) => i.quantity > 0)
    );

    setPlayerSkill((prev) => ({
      ...prev,
      level: prev.level + 1,
      power: Math.floor(prev.power * 1.3)
    }));

    triggerNotification(
      `NÂNG CẤP KỸ NĂNG: [${playerSkill.name}] CẤP ${playerSkill.level + 1}!`,
      `Kỹ năng [${playerSkill.name}] đã được cường hóa uy lực lên +30% sát thương và hiệu ứng đặc biệt!`,
      'levelup'
    );
  };

  // Upgrade Base Facility
  const handleUpgradeFacility = (facilityId: string) => {
    const facility = facilities.find((f) => f.id === facilityId);
    if (!facility) return;

    setInventory((prev) => {
      let updated = [...prev];
      facility.upgradeCost.forEach((cost) => {
        const item = updated.find((i) => i.id === cost.itemId);
        if (item) {
          item.quantity -= cost.count;
        }
      });
      return updated.filter((i) => i.quantity > 0);
    });

    setFacilities((prev) =>
      prev.map((f) => (f.id === facilityId ? { ...f, level: f.level + 1 } : f))
    );

    setQuests((prev) =>
      prev.map((q) => (q.type === 'upgrade_base' ? { ...q, progress: Math.min(q.targetProgress, q.progress + 1) } : q))
    );

    triggerNotification(
      `NÂNG CẤP CÔNG TRÌNH: ${facility.name.toUpperCase()}`,
      `Đã nâng cấp lên Cấp ${facility.level + 1}! Tăng thêm +${facility.defensePower} Điểm Phòng Thủ KTX.`,
      'evolution'
    );
  };

  // Trigger Siege Defense
  const handleTriggerSiegeDefense = (res: {
    survived: boolean;
    repelledZombies: number;
    rewards: { crystals: number; exp: number };
    damageTaken: number;
  }) => {
    checkLevelUp(stats.exp + res.rewards.exp, stats.level);
    setStats((prev) => ({
      ...prev,
      mutationPoints: prev.mutationPoints + res.rewards.crystals,
      hp: Math.max(20, prev.hp - res.damageTaken)
    }));

    triggerNotification(
      `🏆 THẮNG LỢI TRẬN PHÒNG THỦ ĐÊM HUYẾT NGUYỆT`,
      `Ký túc xá đứng vững trước đợt công kích!\n• Tiêu diệt: ${res.repelledZombies} xác sống\n• Phần thưởng: +${res.rewards.exp} EXP, +${res.rewards.crystals} Tinh Thể Dị Biến 💎`,
      'siege'
    );
  };

  // Breakthrough Skill Tier
  const handleUpgradeSkillTier = () => {
    const nextTierMap: Record<string, any> = {
      C: 'B',
      B: 'A',
      A: 'S',
      S: 'SS',
      SS: 'SSS',
      SSS: 'EX'
    };
    const nextT = nextTierMap[playerSkill.tier] || 'S';

    setPlayerSkill((prev) => ({
      ...prev,
      tier: nextT,
      power: Math.floor(prev.power * 1.4),
      mpCost: Math.max(3, prev.mpCost - 1)
    }));

    setStats((prev) => ({
      ...prev,
      mutationPoints: Math.max(0, prev.mutationPoints - 5)
    }));

    triggerNotification(
      `ĐỘT PHÁ CẤP BẬC: KỸ NĂNG ĐẠT RANK [${nextT}]!`,
      `Kỹ năng [${playerSkill.name}] đã tiến hóa lên Rank [${nextT}]. Uy lực tăng +40%, giảm tiêu hao MP!`,
      'evolution'
    );
  };

  // Fuse Skills
  const handleFuseSkills = (newFusedSkill: Skill) => {
    setPlayerSkill(newFusedSkill);
    setStats((prev) => ({
      ...prev,
      mutationPoints: Math.max(0, prev.mutationPoints - 10)
    }));

    triggerNotification(
      `✨ KHAI SINH SIÊU KỸ NĂNG DUNG HỢP EX!`,
      `Chúc mừng bạn đã dung hợp thành công [${newFusedSkill.name}]! Một kỹ năng cấp Thần độc nhất vô nhị mang sức mạnh tuyệt đối.`,
      'evolution'
    );
  };

  // Allocate Talent Node
  const handleAllocateTalent = (talentId: string) => {
    const talent = talents.find((t) => t.id === talentId);
    if (!talent || stats.mutationPoints < talent.costPoints) return;

    setTalents((prev) =>
      prev.map((t) => (t.id === talentId ? { ...t, level: t.level + 1 } : t))
    );

    setStats((prev) => ({
      ...prev,
      mutationPoints: prev.mutationPoints - talent.costPoints,
      str: prev.str + (talent.effect.str || 0),
      agi: prev.agi + (talent.effect.agi || 0),
      vit: prev.vit + (talent.effect.vit || 0),
      int: prev.int + (talent.effect.int || 0),
      lck: prev.lck + (talent.effect.lck || 0)
    }));

    triggerNotification(
      `MỞ KHÓA THIÊN PHÚ: ${talent.name.toUpperCase()}`,
      `Đã học thành công Cấp ${talent.level + 1}! Nhận chỉ số và buff chiến thuật vĩnh viễn.`,
      'levelup'
    );
  };

  // Enhance Item
  const handleEnhanceItem = (slot: keyof Equipment) => {
    const item = equipment[slot];
    if (!item) return;

    const currentLvl = item.enhanceLevel || 0;
    const nextLvl = currentLvl + 1;
    const reqScraps = nextLvl * 3;

    setInventory((prev) =>
      prev
        .map((i) => (i.id === 'mat_scrap' ? { ...i, quantity: i.quantity - reqScraps } : i))
        .filter((i) => i.quantity > 0)
    );

    const updatedItem = {
      ...item,
      enhanceLevel: nextLvl
    };

    setEquipment((prev) => ({ ...prev, [slot]: updatedItem }));

    triggerNotification(
      `CƯỜNG HÓA THÀNH CÔNG: +${nextLvl}`,
      `Trang bị [${item.name}] đã được cường hóa lên +${nextLvl}!\nTăng mạnh chỉ số chiến đấu và sức chịu đựng.`,
      'item'
    );
  };

  // Select Pet
  const handleSelectPet = (petId: string) => {
    setPets((prev) => prev.map((p) => ({ ...p, isActive: p.id === petId })));
    const chosen = pets.find((p) => p.id === petId);
    if (chosen) {
      triggerNotification(
        `ĐỒNG HÀNH MỚI: ${chosen.name}`,
        `${chosen.name} đã được chọn xuất trận cùng bạn và ${companion.name}!`,
        'event'
      );
    }
  };

  // Feed Pet
  const handleFeedPet = (petId: string) => {
    setInventory((prev) => {
      let deducted = false;
      return prev
        .map((i) => {
          if (!deducted && (i.id === 'food_bread' || i.id === 'food_noodle')) {
            deducted = true;
            return { ...i, quantity: i.quantity - 1 };
          }
          return i;
        })
        .filter((i) => i.quantity > 0);
    });

    setPets((prev) =>
      prev.map((p) => {
        if (p.id !== petId) return p;
        const newLvl = p.level + 1;
        return {
          ...p,
          level: newLvl,
          bonusStats: {
            atk: (p.bonusStats.atk || 0) + 2,
            def: (p.bonusStats.def || 0) + 2,
            lootChance: (p.bonusStats.lootChance || 0) + 5
          }
        };
      })
    );

    triggerNotification(
      'THÚ CƯNG ĐÃ TĂNG CẤP',
      'Thú cưng dị biến đã no bụng và thăng cấp! Gia tăng thuộc tính hỗ trợ cho đội.',
      'levelup'
    );
  };

  // Scavenge Action
  const handleScavenge = (loc: LocationArea) => {
    if (stats.stamina < 15) return;
    soundManager.play('item_get');

    setStats((prev) => ({
      ...prev,
      stamina: Math.max(0, prev.stamina - 15),
      hunger: Math.max(0, prev.hunger - 2),
      thirst: Math.max(0, prev.thirst - 3)
    }));

    setLocations((prev) =>
      prev.map((l) => (l.id === loc.id ? { ...l, exploredPercentage: Math.min(100, l.exploredPercentage + 15) } : l))
    );

    const roll = Math.random();
    if (roll < 0.35) {
      const stageEnemies = ENEMIES.filter((e) => e.stageId <= currentStageId && !e.isBoss);
      const randomEnemy = stageEnemies[Math.floor(Math.random() * stageEnemies.length)] || ENEMIES[0];
      setActiveEnemy(randomEnemy);
      soundManager.play('danger');
      return;
    }

    const possibleLootItems: Item[] = [
      { ...INITIAL_ITEMS[2], quantity: 1 },
      { ...INITIAL_ITEMS[3], quantity: 1 },
      { ...INITIAL_ITEMS[4], quantity: 1 },
      { ...INITIAL_ITEMS[5], quantity: 2 },
      { ...INITIAL_ITEMS[6], quantity: 3 },
      { ...INITIAL_ITEMS[7], quantity: 1 }
    ];
    const foundItem = possibleLootItems[Math.floor(Math.random() * possibleLootItems.length)];

    setInventory((prev) => {
      const existing = prev.find((i) => i.id === foundItem.id);
      if (existing) {
        return prev.map((i) => (i.id === foundItem.id ? { ...i, quantity: i.quantity + foundItem.quantity } : i));
      }
      return [...prev, foundItem];
    });

    const expGain = 15;
    checkLevelUp(stats.exp + expGain, stats.level);

    setQuests((prev) =>
      prev.map((q) => (q.type === 'scavenge' ? { ...q, progress: Math.min(q.targetProgress, q.progress + 1) } : q))
    );

    triggerNotification(
      `THU HOẠCH TẠI ${loc.name.toUpperCase()}`,
      `Bạn và ${companion.name} lục soát kỹ lưỡng và tìm thấy:\n• ${foundItem.icon} ${foundItem.name} x${foundItem.quantity}\n• +${expGain} EXP Thám hiểm`,
      'item'
    );
  };

  // Fight Zombie Action
  const handleFightZombie = (loc: LocationArea) => {
    if (stats.stamina < 10) return;
    soundManager.play('danger');
    setStats((prev) => ({ ...prev, stamina: Math.max(0, prev.stamina - 10) }));

    const stageEnemies = ENEMIES.filter((e) => e.stageId <= currentStageId);
    const chosenEnemy = stageEnemies[Math.floor(Math.random() * stageEnemies.length)] || ENEMIES[0];
    setActiveEnemy(chosenEnemy);
  };

  // Challenge Stage Boss Action
  const handleChallengeStageBoss = (stageId: number) => {
    soundManager.play('danger');
    let bossId = 'enemy_boss_giant_zombie';
    if (stageId === 2) bossId = 'enemy_boss_ac_linh_hoang_dung';
    else if (stageId === 3) bossId = 'enemy_boss_song_quy_vuong';
    else if (stageId === 4) bossId = 'enemy_boss_thi_khoi';
    else if (stageId === 5) bossId = 'enemy_boss_minh_vuong';

    const boss = ENEMIES.find((e) => e.id === bossId) || ENEMIES[0];
    setActiveEnemy(boss);

    triggerNotification(
      `TRIỆU HỒI TRÙM GIAI ĐOẠN 0${stageId}`,
      `[CẢNH BÁO TỐI CAO] ${boss.name.toUpperCase()} (${boss.title}) đã xuất hiện và bao vây pháo đài! Hãy dùng toàn lực để tiêu diệt và mở khóa cốt truyện tiếp theo!`,
      'warning'
    );
  };

  // Victory in Combat
  const handleCombatVictory = (enemy: Enemy, extractedStats?: { str?: number; vit?: number; int?: number }) => {
    setActiveEnemy(null);

    const expGain = enemy.expReward;
    checkLevelUp(stats.exp + expGain, stats.level);

    const awardedItems: Item[] = [];
    enemy.drops.forEach((drop) => {
      if (Math.random() <= drop.chance) {
        const itemTemplate = INITIAL_ITEMS.find((i) => i.id === drop.itemId) || INITIAL_ITEMS[7];
        awardedItems.push({ ...itemTemplate, quantity: drop.count });
      }
    });

    setInventory((prev) => {
      let updated = [...prev];
      awardedItems.forEach((drop) => {
        const existing = updated.find((i) => i.id === drop.id);
        if (existing) {
          updated = updated.map((i) => (i.id === drop.id ? { ...i, quantity: i.quantity + drop.quantity } : i));
        } else {
          updated.push(drop);
        }
      });
      return updated;
    });

    let extractText = '';
    if (extractedStats) {
      setStats((prev) => ({
        ...prev,
        str: prev.str + (extractedStats.str || 0),
        vit: prev.vit + (extractedStats.vit || 0),
        int: prev.int + (extractedStats.int || 0)
      }));
      extractText = `\n✨ [VÔ HẠN TRÍCH XUẤT THÀNH CÔNG]: Tăng vĩnh viễn +1 STR, +1 VIT!`;
    }

    setQuests((prev) =>
      prev.map((q) => (q.type === 'kill' ? { ...q, progress: Math.min(q.targetProgress, q.progress + 1) } : q))
    );

    // Check if defeated boss unlocks the next stage and story lore
    if (enemy.isBoss) {
      soundManager.play('level_up');
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.35 } });
      
      const nextStageId = enemy.stageId + 1;
      if (nextStageId <= 5 && currentStageId < nextStageId) {
        setCurrentStageId(nextStageId);
        const nextStageObj = STAGES.find((s) => s.id === nextStageId);
        
        // Unlock corresponding World Lore Chapter
        setLoreChapters((prev) =>
          prev.map((ch, idx) => (idx <= nextStageId - 1 ? { ...ch, isUnlocked: true } : ch))
        );

        // Award extra Lord Coins and Crystals for stage breakthrough
        setStats((prev) => ({
          ...prev,
          lordCoins: (prev.lordCoins || 0) + 150,
          mutationPoints: (prev.mutationPoints || 0) + 5
        }));

        triggerNotification(
          `ĐỘT PHÁ CỐT TRUYỆN: TIẾN VÀO GIAI ĐOẠN 0${nextStageId}!`,
          `[CHIẾN TÍCH PHONG VƯƠNG ĐẠI THẮNG]\nBạn đã chém hạ ${enemy.name.toUpperCase()}!\n\n• Mở khóa Giai đoạn mới: ${nextStageObj?.name}\n• Mở khóa Chương cốt truyện mới trong Bách Khoa\n• Thưởng đột phá: +150 Tiền Chúa Tể 🪙 + 5 Tinh Thể Não Quái 💎`,
          'evolution'
        );
      } else if (enemy.stageId === 5) {
        triggerNotification(
          'ĐẠT DANH HIỆU PHONG VƯƠNG TỐI THƯỢNG!',
          `[PHÁ ĐẢO THẾ GIỚI MINH PHỦ]\nTiết Mộc cùng các bạn cùng phòng đã chém hạ Minh Vương Thần Khảm, thống nhất toàn bộ hệ thống Ký Túc Xá Đa Vũ Trụ!\n• Mở khóa trang bị Thần Khảm Minh Vương Kiếm (Tier EX)\n• Chiến Giáp Thập Nhật Linh Tinh Vân`,
          'evolution'
        );
      }
    } else {
      triggerNotification(
        `CHIẾN THẮNG: DIỆT ${enemy.name.toUpperCase()}!`,
        `Bạn đã tiêu diệt quái vật thành công!\n• Nhận +${expGain} EXP\n• Chiến lợi phẩm: ${awardedItems.map((i) => `${i.name} x${i.quantity}`).join(', ') || 'Không có'}${extractText}`,
        'item'
      );
    }
  };

  // Defeat in Combat
  const handleCombatDefeat = () => {
    setActiveEnemy(null);
    setStats((prev) => ({
      ...prev,
      hp: 20,
      stamina: 10,
      sanity: Math.max(10, prev.sanity - 20)
    }));
    triggerNotification(
      'CẢNH BÁO: BỊ THƯƠNG NẶNG!',
      `Bạn đã bị quái vật đánh gục. Rất may ${companion.name} đã liều mình kéo bạn về Phòng 200 an toàn!\n• HP tụt xuống 20\n• Tinh thần giảm -20%\nHãy dùng Băng Gạc hoặc nghỉ ngơi để hồi phục ngay.`,
      'warning'
    );
  };

  // Rest in Safe Room
  const handleRestInRoom = () => {
    soundManager.play('rest');

    let hasFood = foodCount > 0;
    let hasWater = waterCount > 0;

    if (hasFood) {
      setInventory((prev) => {
        let deducted = false;
        return prev
          .map((i) => {
            if (!deducted && (i.id === 'food_bread' || i.id === 'food_noodle')) {
              deducted = true;
              return { ...i, quantity: i.quantity - 1 };
            }
            return i;
          })
          .filter((i) => i.quantity > 0);
      });
    }
    if (hasWater) {
      setInventory((prev) =>
        prev
          .map((i) => (i.id === 'drink_water' ? { ...i, quantity: i.quantity - 1 } : i))
          .filter((i) => i.quantity > 0)
      );
    }

    const nextDay = currentDay + 1;
    setCurrentDay(nextDay);

    // Weather randomizer
    const weathers: WeatherType[] = ['clear', 'acid_rain', 'blood_moon', 'toxic_fog'];
    const newWeather = weathers[Math.floor(Math.random() * weathers.length)];
    setCurrentWeather(newWeather);

    setStats((prev) => ({
      ...prev,
      hp: Math.min(prev.maxHp, prev.hp + 40),
      mp: prev.maxMp,
      stamina: prev.maxStamina,
      hunger: hasFood ? Math.min(100, prev.hunger + 25) : Math.max(0, prev.hunger - 15),
      thirst: hasWater ? Math.min(100, prev.thirst + 30) : Math.max(0, prev.thirst - 20),
      sanity: Math.min(100, prev.sanity + 15)
    }));

    // Daily production from facilities
    facilities.forEach((f) => {
      if (f.level > 0 && f.dailyProduction) {
        const prod = f.dailyProduction;
        setInventory((prev) => {
          let updated = [...prev];
          const exist = updated.find((i) => i.id === prod.itemId);
          if (exist) {
            exist.quantity += prod.count;
          } else {
            const template = INITIAL_ITEMS.find((i) => i.id === prod.itemId) || INITIAL_ITEMS[2];
            updated.push({ ...template, quantity: prod.count });
          }
          return updated;
        });
      }
    });

    const scavengers = survivors.filter((s) => s.role === 'scavenger').length;
    if (scavengers > 0) {
      const bonusWood = Math.floor(scavengers * 0.8) + 1;
      const bonusScrap = Math.floor(scavengers * 0.7) + 1;
      setInventory((prev) => {
        let updated = [...prev];
        const woodItem = updated.find((i) => i.id === 'mat_wood');
        const scrapItem = updated.find((i) => i.id === 'mat_scrap');
        if (woodItem) woodItem.quantity += bonusWood;
        if (scrapItem) scrapItem.quantity += bonusScrap;
        return updated;
      });
    }

    // Story Stage Thresholds
    let targetStageId = 1;
    if (nextDay >= 46) targetStageId = 5;
    else if (nextDay >= 29) targetStageId = 4;
    else if (nextDay >= 15) targetStageId = 3;
    else if (nextDay >= 8) targetStageId = 2;

    // Auto-unlock Lore Chapters when day is reached
    setLoreChapters((prev) =>
      prev.map((ch) => (ch.unlockedDay <= nextDay ? { ...ch, isUnlocked: true } : ch))
    );

    if (targetStageId > currentStageId) {
      setCurrentStageId(targetStageId);
      const stageObj = STAGES.find((s) => s.id === targetStageId)!;
      soundManager.play('danger');
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.4 } });
      triggerNotification(
        `TIẾN HÓA THẾ GIỚI: ${stageObj.name.toUpperCase()}!`,
        `[CẢNH BÁO KHÔNG GIAN BÙNG PHÁT]\nKý túc xá đã bước sang ${stageObj.timeFrame}!\n\n• Mức độ nguy hiểm tăng lên Cấp ${stageObj.dangerLevel}/5.\n• Đột biến xuất hiện: ${stageObj.zombieMutations.join(', ')}.\n• Tỉ lệ rơi đồ quý tăng: +${(stageObj.bonusLootMultiplier * 100 - 100).toFixed(0)}%.\n• Biến cố thế giới: ${stageObj.worldEvent}`,
        'phase',
        'CHUẨN BỊ ỨNG CHIẾN'
      );
    } else {
      triggerNotification(
        `BƯỚC SANG NGÀY THỨ ${nextDay}`,
        `Bạn và ${companion.name} đã trải qua một đêm an toàn tại Phòng 200.\n• Hồi đầy Thể Lực và Mana, hồi +40 HP.\n• Cơ sở vật chất KTX tự động cung cấp nước và lương thực sạch.\n• Thời tiết hôm nay: ${newWeather === 'clear' ? 'Trời trong' : newWeather === 'acid_rain' ? 'Mưa Axit' : newWeather === 'blood_moon' ? 'Huyết Nguyệt' : 'Sương Độc'}.`,
        'event'
      );
    }
  };

  // Crafting Handler
  const handleCraftItem = (recipe: Item) => {
    if (!recipe.craftRecipe) return;

    setInventory((prev) => {
      let updated = [...prev];
      recipe.craftRecipe?.materials.forEach((mat) => {
        const item = updated.find((i) => i.id === mat.itemId);
        if (item) {
          item.quantity -= mat.count;
        }
      });
      const existing = updated.find((i) => i.id === recipe.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        updated.push({ ...recipe, quantity: 1 });
      }
      return updated.filter((i) => i.quantity > 0);
    });

    setQuests((prev) =>
      prev.map((q) => (q.type === 'craft' ? { ...q, progress: Math.min(q.targetProgress, q.progress + 1) } : q))
    );

    triggerNotification(
      `CHẾ TẠO THÀNH CÔNG: ${recipe.name.toUpperCase()}`,
      `Bạn đã chế tạo thành công ${recipe.icon} ${recipe.name} tại Bàn Chế Tạo! Đã đưa vào Túi Đồ.`,
      'item'
    );
  };

  // Use Item
  const handleUseItem = (item: Item) => {
    if (item.quantity <= 0) return;

    setStats((prev) => ({
      ...prev,
      hp: Math.min(prev.maxHp, prev.hp + (item.stats?.hp || 0)),
      mp: Math.min(prev.maxMp, prev.mp + (item.stats?.mp || 0)),
      hunger: Math.min(100, prev.hunger + (item.stats?.hunger || 0)),
      thirst: Math.min(100, prev.thirst + (item.stats?.thirst || 0)),
      sanity: Math.min(100, prev.sanity + (item.stats?.sanity || 0))
    }));

    setInventory((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i)).filter((i) => i.quantity > 0)
    );
  };

  // Equip Item
  const handleEquipItem = (item: Item) => {
    if (item.category === 'weapon') {
      setEquipment((prev) => ({ ...prev, weapon: item }));
    } else if (item.category === 'armor') {
      setEquipment((prev) => ({ ...prev, armor: item }));
    } else if (item.category === 'accessory') {
      setEquipment((prev) => ({ ...prev, accessory: item }));
    }
  };

  // Unequip Item
  const handleUnequipItem = (slot: 'weapon' | 'armor' | 'accessory') => {
    setEquipment((prev) => ({ ...prev, [slot]: null }));
  };

  // Assign Role
  const handleAssignRole = (survivorId: string, role: Survivor['role']) => {
    setSurvivors((prev) => prev.map((s) => (s.id === survivorId ? { ...s, role } : s)));
  };

  // Trade Market
  const handleTradeMarketOffer = (offerId: string) => {
    const offer = marketOffers.find((o) => o.id === offerId);
    if (!offer || offer.completed) return;

    const askingKeyword = offer.asking.name.split(' ')[0].toLowerCase();
    const askingItem = inventory.find(
      (i) =>
        i.name.toLowerCase().includes(askingKeyword) ||
        i.id.toLowerCase().includes(askingKeyword) ||
        (askingKeyword.includes('băng') && i.id.includes('item_porcelain_bowl'))
    );

    if (!askingItem || askingItem.quantity < offer.asking.count) {
      triggerNotification(
        'GIAO DỊCH THẤT BẠI',
        `Bạn không có đủ ${offer.asking.icon} ${offer.asking.name} (Cần: x${offer.asking.count}) để thực hiện giao dịch này!`,
        'warning'
      );
      return;
    }

    setInventory((prev) => {
      let updated = [...prev];
      const targetItem = updated.find(
        (i) =>
          i.name.toLowerCase().includes(askingKeyword) ||
          i.id.toLowerCase().includes(askingKeyword) ||
          (askingKeyword.includes('băng') && i.id.includes('item_porcelain_bowl'))
      );
      if (targetItem) {
        targetItem.quantity -= offer.asking.count;
      }
      const offeringKeyword = offer.offering.name.split(' ')[0].toLowerCase();
      const offeringItem = updated.find(
        (i) => i.name.toLowerCase().includes(offeringKeyword) || i.id.toLowerCase().includes(offeringKeyword)
      );
      if (offeringItem) {
        offeringItem.quantity += offer.offering.count;
      } else {
        const template =
          INITIAL_ITEMS.find((i) => i.name.toLowerCase().includes(offeringKeyword)) || INITIAL_ITEMS[5];
        updated.push({
          ...template,
          name: offer.offering.name,
          icon: offer.offering.icon,
          quantity: offer.offering.count
        });
      }
      return updated.filter((i) => i.quantity > 0);
    });

    setMarketOffers((prev) => prev.map((o) => (o.id === offerId ? { ...o, completed: true } : o)));

    triggerNotification(
      'GIAO DỊCH THÀNH CÔNG',
      `Bạn đã hoàn tất trao đổi với ${offer.sellerName} (${offer.room})!\nNhận: ${offer.offering.icon} ${offer.offering.name} x${offer.offering.count}.`,
      'item'
    );
  };

  // Claim Quest
  const handleClaimQuest = (questId: string) => {
    const quest = quests.find((q) => q.id === questId);
    if (!quest || quest.claimed) return;

    checkLevelUp(stats.exp + quest.rewardExp, stats.level);

    setInventory((prev) => {
      let updated = [...prev];
      const crystalItem = updated.find((i) => i.id === 'special_crystal');
      if (crystalItem) {
        crystalItem.quantity += quest.rewardPoints;
      } else {
        const crystalTemplate = INITIAL_ITEMS.find((i) => i.id === 'special_crystal') || {
          id: 'special_crystal',
          name: 'Tinh Thể Dị Biến Não Quái',
          description: 'Tinh thể năng lượng phát sáng rơi ra từ xác sống dị biến.',
          rarity: 'rare' as const,
          tier: 'A',
          category: 'special' as const,
          icon: '💎',
          quantity: quest.rewardPoints,
          stackable: true,
          value: 50
        };
        updated.push({ ...crystalTemplate, quantity: quest.rewardPoints });
      }
      return updated;
    });

    setQuests((prev) => prev.map((q) => (q.id === questId ? { ...q, claimed: true } : q)));

    triggerNotification(
      `HOÀN THÀNH NHIỆM VỤ: ${quest.title.toUpperCase()}`,
      `Nhận phần thưởng:\n• +${quest.rewardExp} EXP\n• +${quest.rewardPoints} Tinh Thể Dị Biến 💎`,
      'levelup'
    );
  };

  // ==========================================
  // LORD ROOM & NOVEL HANDLERS
  // ==========================================
  const handleSleepAndProduce = () => {
    const totalTenantBonus = roomTenants
      .filter((t) => t.isRecruited)
      .reduce((sum, t) => sum + t.conversionBonusPct, 0);
    const totalConversionRate = 100 + totalTenantBonus + lordRoomData.bedComfort;
    const hourlyOutput = Math.floor((40 * totalConversionRate) / 100);
    const earnedCoins = hourlyOutput * 8;

    setStats((prev) => ({
      ...prev,
      lordCoins: (prev.lordCoins || 0) + earnedCoins,
      hp: prev.maxHp,
      mp: prev.maxMp,
      stamina: prev.maxStamina,
      hunger: Math.max(20, prev.hunger - 15),
      thirst: Math.max(20, prev.thirst - 15),
      sanity: Math.min(100, prev.sanity + 20)
    }));

    setCurrentDay((d) => d + 1);

    triggerNotification(
      'GIẤC NGỦ CHÚA TỂ HOÀN TẤT',
      `Ngủ 8 tiếng trên ${lordRoomData.bedName}.\n• Tỉ lệ chuyển đổi: +${totalConversionRate}%\n• Nhận được: +${earnedCoins} Xu Chúa Tể 🪙\n• Hồi phục toàn bộ Sinh Lực & Tinh Thần!`,
      'evolution'
    );
  };

  const handleUpgradeBed = () => {
    if ((stats.lordCoins || 0) < 300) return;
    setStats((prev) => ({ ...prev, lordCoins: prev.lordCoins - 300 }));
    setLordRoomData((prev) => ({
      ...prev,
      bedLevel: prev.bedLevel + 1,
      bedName: `Giường Chúa Tể Hoàng Gia Cấp ${prev.bedLevel + 1}`,
      bedComfort: prev.bedComfort + 30
    }));
    triggerNotification(
      'NÂNG CẤP GIƯỜNG CHÚA TỂ THÀNH CÔNG',
      'Độ thoải mái tăng thêm +30%, tốc độ sinh Tiền Chúa Tể tăng vọt!',
      'evolution'
    );
  };

  const handleUpgradeDoor = () => {
    if ((stats.lordCoins || 0) < 250) return;
    setStats((prev) => ({ ...prev, lordCoins: prev.lordCoins - 250 }));
    setLordRoomData((prev) => ({
      ...prev,
      doorLevel: prev.doorLevel + 1,
      doorName: `Cửa Hợp Kim Siêu Cường Cấp ${prev.doorLevel + 1}`,
      doorDef: prev.doorDef + 35,
      doorMaxHp: prev.doorMaxHp + 60,
      doorHp: prev.doorMaxHp + 60
    }));
    triggerNotification(
      'CƯỜNG HÓA ĐẠI MÔN PHÒNG 200',
      'Cửa phòng đã được gia cố bằng Tiền Chúa Tể, tăng mạnh phòng thủ và độ bền!',
      'evolution'
    );
  };

  const handleUpgradeTurret = (side: 'left' | 'right') => {
    if ((stats.lordCoins || 0) < 200) return;
    setStats((prev) => ({ ...prev, lordCoins: prev.lordCoins - 200 }));
    setLordRoomData((prev) => {
      const target = side === 'left' ? prev.turretLeft : prev.turretRight;
      const updatedTurret = {
        ...target,
        level: target.level + 1,
        damage: target.damage + 45
      };
      return {
        ...prev,
        [side === 'left' ? 'turretLeft' : 'turretRight']: updatedTurret
      };
    });
    triggerNotification(
      `NÂNG CẤP Ụ PHÁO ${side === 'left' ? 'TRÁI' : 'PHẢI'}`,
      'Hỏa lực pháo đài đã được tăng cường mạnh mẽ!',
      'evolution'
    );
  };

  const handleFeedGuardian = () => {
    if ((stats.lordCoins || 0) < 150) return;
    setStats((prev) => ({ ...prev, lordCoins: prev.lordCoins - 150 }));
    setLordRoomData((prev) => ({
      ...prev,
      guardianSpirit: {
        ...prev.guardianSpirit,
        level: prev.guardianSpirit.level + 1
      }
    }));
    triggerNotification(
      'THẦN KHẢM QUỶ ĐỒNG THĂNG CẤP',
      'Quỷ Đồng đã hấp thụ Hồn Nguyệt, uy lực định thân và hút U Linh gia tăng!',
      'evolution'
    );
  };

  const handleToggleAggro = () => {
    setStats((prev) => ({
      ...prev,
      aggroScore: (prev.aggroScore || 350) + 150
    }));
    soundManager.play('danger');
    triggerNotification(
      'PHÁT LOA KHIÊU KHÍCH TOÀN TÒA NHÀ',
      'Đại quân quái vật đang ùn ùn kéo về phòng 200! Ụ pháo đài đã vào vị trí sẵn sàng khai hỏa!',
      'warning'
    );
    // Trigger elite wave combat
    const boss = ENEMIES.find((e) => e.id === 'enemy_boss_thi_khoi') || ENEMIES[0];
    setActiveEnemy(boss);
  };

  const handleGiftTenant = (tenantId: string) => {
    setRoomTenants((prev) =>
      prev.map((t) =>
        t.id === tenantId
          ? { ...t, comfortScore: t.comfortScore + 10, conversionBonusPct: t.conversionBonusPct + 5 }
          : t
      )
    );
    triggerNotification(
      'TẶNG QUÀ BẠN CÙNG PHÒNG THÀNH CÔNG',
      'Độ thoải mái tăng +10, buff sản xuất Tiền Chúa Tể tăng thêm +5%!',
      'item'
    );
  };

  const [scanAttempts, setScanAttempts] = useState<number>(0);

  const handleScanFrequency = () => {
    const nextAttempts = scanAttempts + 1;
    setScanAttempts(nextAttempts);

    if (nextAttempts >= 47) {
      setRadioTransmissions((prev) =>
        prev.map((tx) => (tx.id === 'radio_1' ? { ...tx, isUnlocked: true } : tx))
      );
      triggerNotification(
        '🎯 GIẢI MÃ THÀNH CÔNG SÓNG 107.5MHz (LẦN DÒ 47/47)',
        'Bạn đã giải mã thành công tần số tuyệt mật của [HỘI TƯƠNG TRỢ HUYẾT VỤ] từ Đao Khách Dạ Vũ (Top 97 Toàn Cầu)!\n\n• Bí mật: 1000 Tế Đàn KTX trong Thế Giới Sương Mù\n• Cảnh báo: Xả kho Da Sói trước khi hạ gục Song Quỷ Chi Vương Asith!',
        'lore',
        'ĐỌC TÌNH BÁO TỐI MẬT'
      );
    } else {
      triggerNotification(
        `ĐANG DÒ TẦN SỐ HUYẾT VỤ (LẦN ${nextAttempts}/47)`,
        `Tiêu hao 50 kim tệ lọc nhiễu sóng vô tuyến... Tín hiệu tần số 107.5MHz đang dần được định vị (${((nextAttempts / 47) * 100).toFixed(0)}%).`,
        'event'
      );
    }
  };

  const currentStageObj = STAGES.find((s) => s.id === currentStageId) || STAGES[0];
  const aliveSurvivorsCount = survivors.filter((s) => s.status === 'alive').length;
  const deceasedSurvivorsCount = 100 - aliveSurvivorsCount;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-cyan-500 selection:text-neutral-950 flex flex-col relative overflow-x-hidden">
      
      {/* Prologue Modal (First Launch) */}
      {!gameStarted && <PrologueIntro onComplete={handlePrologueComplete} />}

      {/* Main Game Interface */}
      {gameStarted && (
        <div className="w-full flex-1 flex flex-col pb-16">
          
          {/* Top Atmospheric Survival Header */}
          <header className="sticky top-0 z-30 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            {/* Left: Player Identity & Level */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-900 to-neutral-900 border-2 border-cyan-500 rounded-sm flex items-center justify-center font-bold text-sm text-cyan-300 font-mono shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                Lv.{stats.level}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest font-bold">
                    [{language === 'vi' ? 'CHỈ HUY SINH TỒN' : 'SURVIVAL COMMANDER'}]
                  </span>
                  <span className="text-neutral-600 text-xs">•</span>
                  <span className="text-xs text-amber-400 font-mono font-bold flex items-center gap-1">
                    🪙 {stats.lordCoins || 0} {t('app.coins', language)}
                  </span>
                </div>
                <h1 className="text-base font-black uppercase text-white tracking-wide leading-tight">
                  {playerName}
                </h1>
              </div>
            </div>

            {/* Center: Stage & Day Timeline */}
            <div className="hidden md:flex items-center gap-4 bg-neutral-900/80 px-4 py-1.5 border border-neutral-800 rounded-sm">
              <div className="text-center">
                <span className="text-[9px] text-neutral-400 font-mono uppercase block">{t('app.stage', language)}</span>
                <span className="text-xs font-bold text-cyan-300 uppercase font-mono">
                  {currentStageObj.name.split(':')[0]}
                </span>
              </div>
              <div className="h-6 w-[1px] bg-neutral-800"></div>
              <div className="text-center">
                <span className="text-[9px] text-neutral-400 font-mono uppercase block">{language === 'vi' ? 'Thời Gian' : 'Timeline'}</span>
                <span className="text-sm font-black text-amber-400 font-mono">
                  {t('app.day', language)} 0{currentDay} • 14:24
                </span>
              </div>
              <div className="h-6 w-[1px] bg-neutral-800"></div>
              {/* Weather Status */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                {currentWeather === 'clear' && <Sun className="w-4 h-4 text-amber-400" />}
                {currentWeather === 'acid_rain' && <CloudRain className="w-4 h-4 text-emerald-400 animate-bounce" />}
                {currentWeather === 'blood_moon' && <Flame className="w-4 h-4 text-rose-500 animate-pulse" />}
                {currentWeather === 'toxic_fog' && <Activity className="w-4 h-4 text-purple-400" />}
                <span className="text-neutral-300 uppercase font-bold text-[11px]">
                  {t(`weather.${currentWeather}`, language)}
                </span>
              </div>
            </div>

            {/* Right: Language Switcher, Notifications, Sound & Utilities */}
            <div className="flex items-center gap-2">
              {/* Language Switcher Toggle */}
              <button
                id="btn_language_toggle"
                onClick={handleToggleLanguage}
                className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-cyan-500/60 hover:border-cyan-400 text-cyan-300 font-bold flex items-center gap-1.5 text-xs font-mono cursor-pointer transition-all rounded-xs shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                <span>{language === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}</span>
              </button>

              {onReturnToWorldSelect && (
                <button
                  onClick={() => {
                    soundManager.play('click');
                    onReturnToWorldSelect();
                  }}
                  className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-cyan-500 text-neutral-300 hover:text-white flex items-center gap-1.5 text-xs font-mono cursor-pointer transition-all rounded-xs shadow-sm"
                  title={t('app.back_world', language)}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('app.back_world', language)}</span>
                </button>
              )}

              <button
                onClick={() => {
                  soundManager.play('click');
                  setCurrentNotification({
                    id: 'history_open',
                    title: language === 'vi' ? 'LỊCH SỬ THÔNG BÁO HỆ THỐNG' : 'SYSTEM LOGS & NOTIFICATIONS',
                    message: '',
                    type: 'rule',
                    timestamp: '',
                    read: true
                  });
                }}
                className="relative px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-cyan-500 text-neutral-300 hover:text-white flex items-center gap-1.5 text-xs font-mono cursor-pointer transition-all rounded-xs"
                title={language === 'vi' ? 'Lịch sử thông báo' : 'Notifications History'}
              >
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">{language === 'vi' ? 'Tin tức' : 'Logs'}</span>
                {notificationHistory.length > 0 && (
                  <span className="px-1.5 py-0.2 bg-red-600 text-white text-[10px] font-black rounded-full animate-pulse">
                    {notificationHistory.length}
                  </span>
                )}
              </button>

              <button
                onClick={handleToggleMute}
                className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-600 text-neutral-300 hover:text-white cursor-pointer rounded-xs transition-all"
                title={isMuted ? t('app.unmute', language) : t('app.mute', language)}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              </button>

              <button
                onClick={handleResetGame}
                className="p-2 bg-neutral-900 hover:bg-rose-950/80 border border-neutral-800 hover:border-rose-700 text-neutral-500 hover:text-rose-400 cursor-pointer rounded-xs transition-all"
                title={t('app.reset', language)}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Main Content Layout with Left Sidebar */}
          <div className="flex-1 flex max-w-[1600px] mx-auto w-full">
            
            {/* Left Icon-Only Navigation Sidebar */}
            <aside className="w-16 sm:w-20 bg-neutral-950/90 border-r border-neutral-800/80 flex flex-col items-center py-3 gap-2 shrink-0 select-none z-20">
              
              {/* Lord Room 200 */}
              <button
                id="btn_open_lord_room"
                onClick={() => {
                  soundManager.play('click');
                  setShowLordRoom(true);
                }}
                className="relative group w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-neutral-950 rounded-sm flex items-center justify-center cursor-pointer transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-105 border border-amber-400"
                title={t('menu.lord_room', language)}
              >
                <Crown className="w-6 h-6 stroke-[2.5]" />
                <span className="absolute left-14 ml-2 px-2.5 py-1 bg-neutral-900 border border-amber-500 text-amber-300 text-xs font-bold font-mono rounded shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                  {t('menu.lord_room', language)} (🪙 {stats.lordCoins || 0})
                </span>
              </button>

              <div className="w-8 h-[1px] bg-neutral-800 my-1"></div>

              {/* Radio 107.5MHz */}
              <button
                id="btn_open_radio_tx"
                onClick={() => {
                  soundManager.play('click');
                  setShowRadioTransceiver(true);
                }}
                className="relative group w-11 h-11 bg-neutral-900 hover:bg-neutral-800 border border-cyan-500/50 hover:border-cyan-400 text-cyan-400 rounded-sm flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                title={t('menu.radio', language)}
              >
                <Radio className="w-5 h-5 animate-pulse" />
                <span className="absolute left-14 ml-2 px-2.5 py-1 bg-neutral-900 border border-cyan-500 text-cyan-300 text-xs font-bold font-mono rounded shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                  {t('menu.radio', language)}
                </span>
              </button>

              {/* 100 Survivors Hub */}
              <button
                id="btn_open_survivors_hub"
                onClick={() => {
                  soundManager.play('click');
                  setShowSurvivorsHub(true);
                }}
                className="relative group w-11 h-11 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-emerald-500 text-emerald-400 rounded-sm flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                title={t('menu.survivors', language)}
              >
                <Users className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 px-1 bg-emerald-600 text-[9px] font-bold text-white rounded-full">
                  {aliveSurvivorsCount}
                </span>
                <span className="absolute left-14 ml-2 px-2.5 py-1 bg-neutral-900 border border-emerald-500 text-emerald-300 text-xs font-bold font-mono rounded shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                  {aliveSurvivorsCount}/100 {language === 'vi' ? 'Cư Dân Sinh Tồn' : 'Survivors'}
                </span>
              </button>

              {/* Base Defense */}
              <button
                id="btn_open_defense"
                onClick={() => {
                  soundManager.play('click');
                  setShowDefense(true);
                }}
                className="relative group w-11 h-11 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-rose-500 text-rose-400 rounded-sm flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                title={t('menu.defense', language)}
              >
                <ShieldAlert className="w-5 h-5" />
                <span className="absolute left-14 ml-2 px-2.5 py-1 bg-neutral-900 border border-rose-500 text-rose-300 text-xs font-bold font-mono rounded shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                  {t('menu.defense', language)}
                </span>
              </button>

              {/* Skill Evolution */}
              <button
                id="btn_open_skill_evolution"
                onClick={() => {
                  soundManager.play('click');
                  setShowSkillEvolution(true);
                }}
                className="relative group w-11 h-11 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-purple-500 text-purple-400 rounded-sm flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                title={t('menu.skill_tree', language)}
              >
                <GitMerge className="w-5 h-5" />
                <span className="absolute left-14 ml-2 px-2.5 py-1 bg-neutral-900 border border-purple-500 text-purple-300 text-xs font-bold font-mono rounded shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                  {t('menu.skill_tree', language)}
                </span>
              </button>

              {/* Blacksmith */}
              <button
                id="btn_open_blacksmith"
                onClick={() => {
                  soundManager.play('click');
                  setShowBlacksmith(true);
                }}
                className="relative group w-11 h-11 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500 text-amber-400 rounded-sm flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                title={t('menu.blacksmith', language)}
              >
                <Hammer className="w-5 h-5" />
                <span className="absolute left-14 ml-2 px-2.5 py-1 bg-neutral-900 border border-amber-500 text-amber-300 text-xs font-bold font-mono rounded shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                  {t('menu.blacksmith', language)} (+15)
                </span>
              </button>

              {/* Pets */}
              <button
                id="btn_open_pets"
                onClick={() => {
                  soundManager.play('click');
                  setShowPets(true);
                }}
                className="relative group w-11 h-11 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-emerald-500 text-emerald-300 rounded-sm flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                title={t('menu.pets', language)}
              >
                <Sparkles className="w-5 h-5" />
                <span className="absolute left-14 ml-2 px-2.5 py-1 bg-neutral-900 border border-emerald-500 text-emerald-300 text-xs font-bold font-mono rounded shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                  {t('menu.pets', language)}
                </span>
              </button>

              {/* Inventory */}
              <button
                id="btn_open_inventory"
                onClick={() => {
                  soundManager.play('click');
                  setShowInventory(true);
                }}
                className="relative group w-11 h-11 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-cyan-500 text-cyan-400 rounded-sm flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                title={t('menu.inventory', language)}
              >
                <Backpack className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 px-1 bg-cyan-600 text-[9px] font-bold text-white rounded-full">
                  {inventory.reduce((a, b) => a + b.quantity, 0)}
                </span>
                <span className="absolute left-14 ml-2 px-2.5 py-1 bg-neutral-900 border border-cyan-500 text-cyan-300 text-xs font-bold font-mono rounded shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                  {t('menu.inventory', language)} ({inventory.reduce((a, b) => a + b.quantity, 0)})
                </span>
              </button>

              {/* Crafting */}
              <button
                id="btn_open_crafting"
                onClick={() => {
                  soundManager.play('click');
                  setShowCrafting(true);
                }}
                className="relative group w-11 h-11 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-400 text-amber-400 rounded-sm flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                title={t('menu.crafting', language)}
              >
                <Hammer className="w-5 h-5" />
                <span className="absolute left-14 ml-2 px-2.5 py-1 bg-neutral-900 border border-amber-400 text-amber-300 text-xs font-bold font-mono rounded shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                  {t('menu.crafting', language)}
                </span>
              </button>

              {/* Quests */}
              <button
                id="btn_open_quests"
                onClick={() => {
                  soundManager.play('click');
                  setShowQuests(true);
                }}
                className="relative group w-11 h-11 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-purple-400 text-purple-400 rounded-sm flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                title={t('menu.quests', language)}
              >
                <Scroll className="w-5 h-5" />
                <span className="absolute left-14 ml-2 px-2.5 py-1 bg-neutral-900 border border-purple-400 text-purple-300 text-xs font-bold font-mono rounded shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                  {t('menu.quests', language)}
                </span>
              </button>

              {/* Codex */}
              <button
                id="btn_open_codex"
                onClick={() => {
                  soundManager.play('click');
                  setShowCodex(true);
                }}
                className="relative group w-11 h-11 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-indigo-400 text-indigo-400 rounded-sm flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                title={t('menu.codex', language)}
              >
                <BookOpen className="w-5 h-5" />
                <span className="absolute left-14 ml-2 px-2.5 py-1 bg-neutral-900 border border-indigo-400 text-indigo-300 text-xs font-bold font-mono rounded shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                  {t('menu.codex', language)}
                </span>
              </button>

              {/* AI Oracle */}
              <button
                id="btn_open_ai_oracle"
                onClick={() => {
                  soundManager.play('click');
                  setShowAIOracle(true);
                }}
                className="relative group w-11 h-11 bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 rounded-sm flex items-center justify-center cursor-pointer transition-all hover:scale-105 mt-auto"
                title={t('menu.oracle', language)}
              >
                <Bot className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span className="absolute left-14 ml-2 px-2.5 py-1 bg-neutral-900 border border-cyan-500 text-cyan-300 text-xs font-bold font-mono rounded shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                  {t('menu.oracle', language)}
                </span>
              </button>
            </aside>

            {/* Main Stage & Gameplay Views */}
            <main className="flex-1 p-3 sm:p-5 space-y-4 overflow-y-auto">
              
              {/* Stage Progress & Threat Bar */}
              <StageProgressBar
                currentStage={currentStageObj}
                currentDay={currentDay}
                lang={language}
                onOpenStageDetails={() => {
                  soundManager.play('click');
                  setShowStageDetails(true);
                }}
              />

              {/* Split-Screen: Operator HUD (Left 5 cols) & Exploration Hub (Right 7 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* Left Column: Character Stats & Attributes & Awakened Skill */}
                <div className="lg:col-span-5">
                  <CharacterCard
                    stats={stats}
                    companion={companion}
                    playerSkill={playerSkill}
                    equipment={equipment}
                    lang={language}
                    onAllocateStat={handleAllocateStat}
                    onUpgradeSkill={handleUpgradeSkill}
                    onOpenSkillEvolution={() => setShowSkillEvolution(true)}
                    onOpenBlacksmith={() => setShowBlacksmith(true)}
                    onOpenPets={() => setShowPets(true)}
                    crystalsCount={crystalsCount}
                  />
                </div>

                {/* Right Column: Floor Exploration & Scavenge Actions */}
                <div className="lg:col-span-7">
                  <ExplorationView
                    locations={locations}
                    currentLocationId={currentLocationId}
                    onSelectLocation={setCurrentLocationId}
                    onScavenge={handleScavenge}
                    onFightZombie={handleFightZombie}
                    onRestInRoom={handleRestInRoom}
                    onOpenDefense={() => setShowDefense(true)}
                    onOpenCodex={() => setShowCodex(true)}
                    currentStage={currentStageObj}
                    stamina={stats.stamina}
                    foodCount={foodCount}
                    waterCount={waterCount}
                    lang={language}
                  />
                </div>
              </div>
            </main>
          </div>

          {/* Fixed Bottom Survival HUD Bar (HP, SP, MP & Vitals) */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t-2 border-neutral-800 px-4 py-2.5 shadow-[0_-5px_25px_rgba(0,0,0,0.8)]">
            <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              
              {/* Gauges (HP / SP / MP) */}
              <div className="flex-1 flex flex-wrap items-center gap-4 sm:gap-8 min-w-[280px]">
                {/* HP */}
                <div className="flex-1 min-w-[140px] max-w-[260px]">
                  <div className="flex justify-between items-center mb-1 text-[11px]">
                    <span className="text-red-400 font-bold flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" /> {t('gauge.hp', language)}
                    </span>
                    <span className="font-bold text-white font-mono">{stats.hp}/{stats.maxHp}</span>
                  </div>
                  <div className="h-3 bg-neutral-900 rounded-sm border border-neutral-700 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-700 to-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-300"
                      style={{ width: `${Math.max(0, (stats.hp / stats.maxHp) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* SP */}
                <div className="flex-1 min-w-[140px] max-w-[260px]">
                  <div className="flex justify-between items-center mb-1 text-[11px]">
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {t('gauge.sp', language)}
                    </span>
                    <span className="font-bold text-white font-mono">{stats.stamina}/{stats.maxStamina}</span>
                  </div>
                  <div className="h-3 bg-neutral-900 rounded-sm border border-neutral-700 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-300"
                      style={{ width: `${Math.max(0, (stats.stamina / stats.maxStamina) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* MP */}
                <div className="flex-1 min-w-[140px] max-w-[260px]">
                  <div className="flex justify-between items-center mb-1 text-[11px]">
                    <span className="text-cyan-400 font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> {t('gauge.mp', language)}
                    </span>
                    <span className="font-bold text-white font-mono">{stats.mp}/{stats.maxMp}</span>
                  </div>
                  <div className="h-3 bg-neutral-900 rounded-sm border border-neutral-700 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-600 to-blue-400 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-300"
                      style={{ width: `${Math.max(0, (stats.mp / stats.maxMp) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Survival Quick Indicators (No Đói / Cơn Khát / Tinh Thần) */}
              <div className="hidden md:flex items-center gap-4 border-l border-neutral-800 pl-4">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 text-[11px]">{t('gauge.hunger', language)}:</span>
                  <span className={`text-xs font-bold ${stats.hunger < 30 ? 'text-red-400 animate-pulse' : 'text-amber-300'}`}>
                    {stats.hunger}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 text-[11px]">{t('gauge.thirst', language)}:</span>
                  <span className={`text-xs font-bold ${stats.thirst < 30 ? 'text-red-400 animate-pulse' : 'text-blue-300'}`}>
                    {stats.thirst}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 text-[11px]">{t('gauge.sanity', language)}:</span>
                  <span className={`text-xs font-bold ${stats.sanity < 30 ? 'text-red-400 animate-pulse' : 'text-purple-300'}`}>
                    {stats.sanity}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Modals */}
          
          {/* Tactical Turn-based Combat Modal */}
          {activeEnemy && (
            <CombatModal
              enemy={activeEnemy}
              playerStats={stats}
              companion={companion}
              playerSkill={playerSkill}
              equipment={equipment}
              inventory={inventory}
              lang={language}
              onVictory={handleCombatVictory}
              onDefeat={handleCombatDefeat}
              onEscape={() => setActiveEnemy(null)}
              onUseCombatItem={handleUseItem}
            />
          )}

          {/* Base Defense & Siege Modal */}
          {showDefense && (
            <DormitoryDefenseModal
              facilities={facilities}
              inventory={inventory}
              survivors={survivors}
              currentDay={currentDay}
              onUpgradeFacility={handleUpgradeFacility}
              onTriggerSiegeDefense={handleTriggerSiegeDefense}
              onClose={() => setShowDefense(false)}
            />
          )}

          {/* Skill Evolution & Talent Tree Modal */}
          {showSkillEvolution && (
            <SkillEvolutionModal
              playerSkill={playerSkill}
              companion={companion}
              talents={talents}
              mutationPoints={stats.mutationPoints}
              onUpgradeSkillTier={handleUpgradeSkillTier}
              onFuseSkills={handleFuseSkills}
              onAllocateTalent={handleAllocateTalent}
              onClose={() => setShowSkillEvolution(false)}
            />
          )}

          {/* Blacksmith Modal */}
          {showBlacksmith && (
            <BlacksmithModal
              equipment={equipment}
              inventory={inventory}
              onEnhanceItem={handleEnhanceItem}
              onSocketGem={() => {}}
              onClose={() => setShowBlacksmith(false)}
            />
          )}

          {/* Pet Companion Modal */}
          {showPets && (
            <PetCompanionModal
              pets={pets}
              inventory={inventory}
              onSelectPet={handleSelectPet}
              onFeedPet={handleFeedPet}
              onClose={() => setShowPets(false)}
            />
          )}

          {/* Codex & Bestiary Modal */}
          {showCodex && (
            <CodexModal
              bestiary={bestiary}
              loreChapters={loreChapters}
              currentDay={currentDay}
              onClose={() => setShowCodex(false)}
            />
          )}

          {/* Crafting Workbench Modal */}
          {showCrafting && (
            <CraftingModal
              inventory={inventory}
              onCraftItem={handleCraftItem}
              onClose={() => setShowCrafting(false)}
            />
          )}

          {/* Inventory Modal */}
          {showInventory && (
            <InventoryModal
              inventory={inventory}
              equipment={equipment}
              onUseItem={handleUseItem}
              onEquipItem={handleEquipItem}
              onUnequipItem={handleUnequipItem}
              onClose={() => setShowInventory(false)}
            />
          )}

          {/* 100 Survivors Hub Modal */}
          {showSurvivorsHub && (
            <SurvivorsHubModal
              survivors={survivors}
              marketOffers={marketOffers}
              inventory={inventory}
              onAssignRole={handleAssignRole}
              onTradeMarketOffer={handleTradeMarketOffer}
              onClose={() => setShowSurvivorsHub(false)}
            />
          )}

          {/* AI Oracle Modal */}
          {showAIOracle && (
            <AIOracleModal
              companion={companion}
              playerSkill={playerSkill}
              currentStage={currentStageObj}
              currentDay={currentDay}
              sanity={stats.sanity}
              onBoostSanity={(amount) => {
                setStats((prev) => ({ ...prev, sanity: Math.min(100, prev.sanity + amount) }));
              }}
              onClose={() => setShowAIOracle(false)}
            />
          )}

          {/* Stage Details Modal */}
          {showStageDetails && (
            <StageDetailsModal
              currentStageId={currentStageId}
              currentDay={currentDay}
              onClose={() => setShowStageDetails(false)}
              onChallengeStageBoss={handleChallengeStageBoss}
            />
          )}

          {/* Quests & Rules Modal */}
          {showQuests && (
            <QuestsModal
              quests={quests}
              onClaimQuest={handleClaimQuest}
              onClose={() => setShowQuests(false)}
            />
          )}

          {/* Lord Room 200 Modal */}
          {showLordRoom && (
            <LordRoomModal
              isOpen={showLordRoom}
              onClose={() => setShowLordRoom(false)}
              stats={stats}
              lordRoomData={lordRoomData}
              roomTenants={roomTenants}
              lang={language}
              onUpgradeBed={handleUpgradeBed}
              onUpgradeDoor={handleUpgradeDoor}
              onUpgradeTurret={handleUpgradeTurret}
              onFeedGuardian={handleFeedGuardian}
              onSleepAndProduce={handleSleepAndProduce}
              onToggleAggro={handleToggleAggro}
              onOpenRadio={() => {
                setShowLordRoom(false);
                setShowRadioTransceiver(true);
              }}
              onGiftTenant={handleGiftTenant}
            />
          )}

          {/* Radio Transceiver 107.5MHz Modal */}
          {showRadioTransceiver && (
            <RadioTransceiverModal
              isOpen={showRadioTransceiver}
              onClose={() => setShowRadioTransceiver(false)}
              transmissions={radioTransmissions}
              onScanFrequency={handleScanFrequency}
              lang={language}
            />
          )}

          {/* System Notification Hologram Modal */}
          {currentNotification && (
            <SystemNotificationModal
              notification={currentNotification}
              history={notificationHistory}
              onClose={() => setCurrentNotification(null)}
            />
          )}

        </div>
      )}
    </div>
  );
}
