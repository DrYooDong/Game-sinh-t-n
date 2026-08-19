export type SkillTier = 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS' | 'EX';

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic' | 'divine';

export type ItemCategory = 'weapon' | 'armor' | 'accessory' | 'consumable' | 'material' | 'blueprint' | 'special' | 'gem' | 'pet_food';

export type WeatherType = 'clear' | 'acid_rain' | 'blood_moon' | 'toxic_fog' | 'radiation_storm' | 'blizzard';

export interface Skill {
  id: string;
  name: string;
  tier: SkillTier;
  description: string;
  icon: string;
  mpCost: number;
  cooldownTurns: number;
  effectType: 'damage' | 'heal' | 'buff' | 'control' | 'passive' | 'extract' | 'shield';
  power: number; // Base damage / heal amount / buff %
  level: number;
  maxLevel: number;
  flavor: string;
  isFused?: boolean;
  fusionParents?: string[];
}

export interface TalentNode {
  id: string;
  name: string;
  tree: 'warrior' | 'mage' | 'leader' | 'immortal';
  icon: string;
  description: string;
  level: number;
  maxLevel: number;
  costPoints: number;
  effect: {
    str?: number;
    agi?: number;
    vit?: number;
    int?: number;
    lck?: number;
    atkPct?: number;
    defPct?: number;
    critRate?: number;
    scavengeBonus?: number;
  };
}

export interface Item {
  id: string;
  name: string;
  description: string;
  rarity: ItemRarity;
  tier?: string;
  category: ItemCategory;
  icon: string;
  quantity: number;
  stackable: boolean;
  value?: number;
  enhanceLevel?: number; // +1 to +15
  gemSockets?: (Item | null)[];
  stats?: {
    atk?: number;
    def?: number;
    hp?: number;
    mp?: number;
    stamina?: number;
    hunger?: number;
    thirst?: number;
    sanity?: number;
    critRate?: number;
    lifeSteal?: number;
    elementalDamage?: number;
  };
  craftRecipe?: {
    materials: { itemId: string; name: string; count: number }[];
    requiredTool?: string;
  };
}

export interface Equipment {
  weapon: Item | null;
  armor: Item | null;
  accessory: Item | null;
  specialTool?: Item | null;
}

export interface CharacterStats {
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  stamina: number;
  maxStamina: number;
  hunger: number; // 0 = starving, 100 = full
  thirst: number; // 0 = dehydrated, 100 = full
  sanity: number; // 0 = insane, 100 = clear mind
  level: number;
  exp: number;
  maxExp: number;
  str: number; // Strength (Melee & Carrying)
  agi: number; // Agility (Crit & Dodge)
  vit: number; // Vitality (HP & Defense)
  int: number; // Intelligence (MP & Skill damage)
  lck: number; // Luck (Loot & Drop quality)
  unspentStatPoints: number;
  mutationPoints: number; // Tinh Thể Dị Biến dùng nâng skill & thiên phú
  lordCoins: number; // Tiền Chúa Tể / Xu Chúa Tể dùng cường hóa vạn vật
  aggroScore: number; // Điểm thù hận thu hút quái vật KTX
  pioneerRankPoints: number; // Điểm tích lũy Bảng Xếp Hạng Phong Vương
}

export interface Companion {
  name: string;
  gender: 'male' | 'female';
  relationship: string;
  level: number;
  hp: number;
  maxHp: number;
  skill: Skill;
  status: 'idle' | 'exploring' | 'guarding' | 'resting';
  bond: number; // 0 - 100
  dialogueState?: string;
}

export interface RoomTenant {
  id: string;
  name: string;
  title: string;
  avatar: string;
  gender: 'female' | 'male';
  conversionBonusPct: number; // e.g. 96%
  comfortScore: number; // e.g. 105
  specialty: string;
  specialSkill: string;
  isRecruited: boolean;
  assignedGear?: string;
  dialogue: string;
}

export interface LordRoomData {
  bedLevel: number;
  bedName: string;
  bedComfort: number;
  bedHourlyCoins: number;
  doorLevel: number;
  doorName: string;
  doorDef: number;
  doorHp: number;
  doorMaxHp: number;
  doorEffect: string;
  turretLeft: {
    name: string;
    level: number;
    damage: number;
    speed: string;
    costPerShot: number;
    autoAttack: boolean;
  };
  turretRight: {
    name: string;
    level: number;
    damage: number;
    speed: string;
    costPerShot: number;
    autoAttack: boolean;
  };
  guardianSpirit: {
    name: string;
    level: number;
    isBound: boolean;
    skills: string[];
  };
  waterFilterLevel: number;
  waterFilterCapacity: number;
}

export interface PetCompanion {
  id: string;
  name: string;
  species: string;
  icon: string;
  level: number;
  exp: number;
  maxExp: number;
  tier: SkillTier;
  skillName: string;
  skillDesc: string;
  bonusStats: {
    atk?: number;
    def?: number;
    critRate?: number;
    lootChance?: number;
  };
  hunger: number;
  isActive: boolean;
}

export interface BaseFacility {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  icon: string;
  description: string;
  currentEffect: string;
  upgradeCost: { itemId: string; name: string; count: number }[];
  defensePower: number;
  dailyProduction?: {
    itemId: string;
    name: string;
    count: number;
  };
}

export interface StagePhase {
  id: number;
  name: string;
  timeFrame: string;
  minDay: number;
  maxDay: number;
  dangerLevel: number;
  zombieMutations: string[];
  bonusLootMultiplier: number;
  description: string;
  worldEvent: string;
  stageBoss: string;
}

export interface Survivor {
  id: string;
  name: string;
  room: string;
  status: 'alive' | 'injured' | 'infected' | 'deceased';
  role: 'idle' | 'guard' | 'scavenger' | 'medic' | 'cook' | 'engineer';
  gender: 'male' | 'female';
  originalJob: string;
  awakenedSkill: Skill;
  hp: number;
  maxHp: number;
  mood: number;
  specialty: string;
}

export interface LocationArea {
  id: string;
  name: string;
  floor: string;
  danger: 1 | 2 | 3 | 4 | 5;
  description: string;
  icon: string;
  isLocked: boolean;
  requiredStage: number;
  exploredPercentage: number;
  possibleLoots: string[];
  zombieTypes: string[];
}

export interface Enemy {
  id: string;
  name: string;
  title?: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  expReward: number;
  stageId: number;
  drops: { itemId: string; name: string; chance: number; count: number }[];
  isBoss?: boolean;
  icon: string;
  description: string;
  skills: { name: string; damageMultiplier: number; description: string }[];
  phases?: number;
  currentPhase?: number;
}

export interface CombatLog {
  id: string;
  text: string;
  type: 'player' | 'enemy' | 'system' | 'companion' | 'crit' | 'skill' | 'item' | 'pet';
  timestamp: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'rule' | 'levelup' | 'item' | 'event' | 'warning' | 'phase' | 'extract' | 'siege' | 'evolution';
  tier?: SkillTier | ItemRarity;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  rewardExp: number;
  rewardItems: Item[];
  rewardPoints: number;
  progress: number;
  targetProgress: number;
  type: 'kill' | 'scavenge' | 'craft' | 'survive_day' | 'rescue' | 'upgrade_base' | 'fuse_skill';
  completed: boolean;
  claimed: boolean;
}

export interface MarketOffer {
  id: string;
  sellerName: string;
  room: string;
  offering: { name: string; icon: string; count: number };
  asking: { name: string; icon: string; count: number };
  completed: boolean;
}

export interface BestiaryEntry {
  id: string;
  name: string;
  icon: string;
  type: string;
  threatLevel: string;
  killCount: number;
  weakness: string;
  description: string;
  lore: string;
}

export interface WorldLoreChapter {
  id: string;
  title: string;
  unlockedDay: number;
  content: string;
  isUnlocked: boolean;
}

export interface RadioTransmission {
  id: string;
  sender: string;
  rank: string;
  frequency: string;
  title: string;
  message: string;
  timestamp: string;
  secretIntel: string;
}
