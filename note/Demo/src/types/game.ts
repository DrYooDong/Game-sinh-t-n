export type CardRarity = 'C' | 'B' | 'A' | 'S' | 'SS' | 'Pi';

export type CardCategory = 'plant' | 'zombie' | 'pi' | 'fusion';

export interface CardDefinition {
  id: string;
  name: string;
  vietnameseTitle: string;
  nickname?: string;
  rarity: CardRarity;
  category: CardCategory;
  sunCost: number;
  cooldownSec: number; // in seconds
  health: number;
  damage: number;
  attackSpeedSec: number;
  description: string;
  lore: string;
  voiceQuote: string;
  plantFoodEffect: string;
  avatarColor: string;
  iconType: string;
  tags: string[];
}

export interface PlacedEntity {
  id: string;
  cardId: string;
  row: number;
  col: number;
  health: number;
  maxHealth: number;
  lastAttackTime: number;
  isPlantFoodActive: boolean;
  plantFoodEndTime?: number;
  isArmorIntact?: boolean; // For Newspaper zombie or Pumpkin
  isConfused?: boolean;
  buffs?: {
    fireBoost?: boolean;
    speedBoost?: boolean;
    shield?: number;
  };
}

export interface Enemy {
  id: string;
  enemyTypeId: string;
  name: string;
  row: number;
  x: number; // 0 to 100% on the lane
  health: number;
  maxHealth: number;
  speed: number; // % per second
  damage: number;
  attackSpeedSec: number;
  lastAttackTime: number;
  isFlying?: boolean;
  isWater?: boolean;
  hasMetalWeapon?: boolean;
  weaponType?: string;
  isBoss?: boolean;
  isHypnotized?: boolean;
  statusEffects?: {
    slowUntil?: number;
    stunUntil?: number;
    burnUntil?: number;
    entangledUntil?: number;
  };
  rewardSun: number;
  rewardSouls: number;
}

export interface Projectile {
  id: string;
  type: 'pea' | 'fire_pea' | 'melon' | 'lightning' | 'kelp_tentacle' | 'bullet' | 'rpg_rocket';
  row: number;
  x: number; // % across lane
  speed: number; // % per sec
  damage: number;
  targetId?: string;
  isSplash?: boolean;
  fromPlayer: boolean;
}

export interface SunDrop {
  id: string;
  x: number; // %
  y: number; // %
  value: number;
  createdAt: number;
  isNatural?: boolean;
}

export interface StoryChoice {
  text: string;
  outcomeText: string;
  rewardSun?: number;
  rewardSouls?: number;
  grantPlantFood?: number;
  grantCardId?: string;
}

export interface StoryDialogStep {
  id: string;
  speakerName: string;
  speakerRole: string;
  speakerAvatar: string; // e.g. 'tuyet_moc', 'tieu_thon', 'nhi_gia', 'la_quan', 'yosuke', 'eiker', 'ta_giao', 'vo_nang', 'tuyet_tinh'
  expression?: 'normal' | 'angry' | 'smug' | 'shocked' | 'determined' | 'funny';
  dialogue: string;
  backgroundTheme: 'rooftop' | 'fissure' | 'lake_abyss' | 'prison_fortress' | 'dark_forest' | 'camp';
  choices?: StoryChoice[];
  sfxCue?: string;
}

export interface StoryArc {
  id: number;
  key: string;
  title: string;
  subtitle: string;
  description: string;
  arcSummary: string;
  backgroundTheme: 'rooftop' | 'fissure' | 'lake_abyss' | 'prison_fortress' | 'dark_forest';
  storyDialogs: StoryDialogStep[];
  battleConfig: {
    lanes: number;
    cols: number;
    durationSec: number;
    startingSun: number;
    startingPlantFood: number;
    isWaterStage?: boolean;
    bossEnemyId?: string;
    ambientSound: string;
    waves: {
      timestampSec: number;
      enemies: {
        enemyTypeId: string;
        count: number;
        lane?: number;
      }[];
      waveAlert?: string;
    }[];
  };
  unlockCardIds: string[];
  rewardSouls: number;
  rewardSun: number;
}

export interface BattlePassTier {
  level: number;
  requiredExp: number;
  freeReward: {
    type: 'sun' | 'souls' | 'diamonds' | 'card' | 'water';
    amount: number;
    cardId?: string;
    label: string;
  };
  premiumReward: {
    type: 'sun' | 'souls' | 'diamonds' | 'card' | 'water' | 'title' | 'skin';
    amount: number;
    cardId?: string;
    label: string;
  };
}

export interface PlayerProfile {
  name: string;
  level: number;
  exp: number;
  maxExp: number;
  sunlight: number;
  spiritSouls: number;
  diamonds: number; // 💎 Premium Currency for VIP & Gacha
  plantFood: number;
  goldenWateringCharges: number;
  currentArcId: number;
  completedArcs: number[];
  unlockedCards: string[];
  activeDeck: string[]; // max 7-8 cards
  equippedFusion?: string; // e.g. 'balloon_zombie', 'asparagus_jet'
  
  // VIP & Battle Pass
  hasVipMonthly: boolean;
  vipMonthlyDaysLeft: number;
  lastDailyClaimTimestamp?: number;
  hasPremiumPass: boolean;
  passLevel: number;
  passExp: number;
  claimedFreePassTiers: number[];
  claimedPremiumPassTiers: number[];
  
  // Gacha Pity Counter
  gachaPityCount: number;
  totalSummons: number;
  
  // Endless Rank & Highscore
  endlessWaveRecord: number;
  endlessScore: number;

  campUpgrades: {
    laQuanHeadquarters: number;
    tuyetTinhScouts: number;
    yosukeDojo: number;
    goldenGarden: number;
  };
  cardLevels: Record<string, number>;
  stats: {
    zombiesKilled: number;
    bossesDefeated: number;
    sunlightHarvested: number;
    cherryExplosions: number;
    watermelonsEaten: number;
  };
}

export interface SurvivalPerk {
  id: string;
  name: string;
  icon: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'offense' | 'defense' | 'utility';
  applyEffect: (state: any) => void;
}

export type GameView = 
  | 'stage_map' 
  | 'battle' 
  | 'story' 
  | 'gacha' 
  | 'pass' 
  | 'shop' 
  | 'endless' 
  | 'camp' 
  | 'almanac' 
  | 'deck' 
  | 'fusion' 
  | 'victory_summary';


