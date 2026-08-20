export type PlantId =
  | 'plant_sunflower'
  | 'plant_peashooter'
  | 'plant_snow_pea'
  | 'plant_chomper'
  | 'plant_squash'
  | 'plant_fume_shroom'
  | 'plant_hypno_shroom'
  | 'plant_gatling_pea'
  | 'plant_pumpkin'
  | 'plant_cherry_bomb'
  | 'plant_jalapeno'
  | 'plant_spikeweed'
  | 'plant_magnet_shroom'
  | 'plant_zombie_wall'
  | 'plant_newspaper_zombie'
  | 'plant_tallnut'
  | 'plant_doom_shroom'
  | 'plant_plantern'
  | 'plant_winter_melon'
  | 'plant_twin_sunflower'
  | 'plant_repeater'
  | 'plant_torchwood'
  | 'plant_lightning_reed'
  | 'plant_bonk_choy'
  | 'plant_blover';

export type ZombieId =
  | 'zombie_normal'
  | 'zombie_fast'
  | 'zombie_strong_1'
  | 'zombie_fast_2'
  | 'zombie_strong_2'
  | 'zombie_flag'
  | 'zombie_newspaper'
  | 'zombie_bucket_cone'
  | 'zombie_armored_spore'
  | 'zombie_mutant_cat'
  | 'zombie_disco'
  | 'zombie_polevaulter'
  | 'zombie_balloon'
  | 'zombie_pogo'
  | 'zombie_digger'
  | 'zombie_imp'
  | 'zombie_rival_yamamoto'
  | 'zombie_boss_lion_king'
  | 'zombie_boss_gargantuar'
  | 'zombie_pyramid'
  | 'zombie_seagull'
  | 'zombie_knight'
  | 'zombie_pirate'
  | 'zombie_mermaid_imp'
  | 'zombie_surfer';

export interface PlantFoodUlt {
  name: string;
  description: string;
  icon: string;
}

export interface PlantData {
  id: PlantId;
  name: string;
  sunCost: number;
  cooldownSec: number;
  maxHp: number;
  attackDmg: number;
  attackIntervalSec: number;
  icon: string;
  imageUrl?: string;
  description: string;
  color: string;
  projectileType?: 'pea' | 'ice_pea' | 'fume_wave' | 'gatling' | 'melon_ice' | 'fireball' | 'butter' | 'lightning' | 'laser' | 'bonk_punch' | 'none';
  specialTrait?: string;
  unlockedAtWave?: number;
  category?: 'normal' | 'instant_pi' | 'summon_zombie';
  plantFoodUlt?: PlantFoodUlt;
}

export type HelmType = 'none' | 'cone' | 'bucket' | 'football' | 'spore_scale';
export type ShieldType = 'none' | 'newspaper' | 'screen_door' | 'ladder';

export interface ZombieData {
  id: ZombieId;
  name: string;
  title: string;
  bodyHp: number;
  helmHp?: number;
  helmType?: HelmType;
  shieldHp?: number;
  shieldType?: ShieldType;
  maxHp: number;
  speed: number; // units per second (0.1 to 1.0)
  attackDmg: number;
  attackIntervalSec: number;
  icon: string;
  imageUrl?: string;
  rewardSun: number;
  rewardEnergy: number;
  rewardBeastCore?: number;
  description: string;
  isBoss?: boolean;
  hasMetalArmor?: boolean;
  armorType?: 'none' | 'spore_scale' | 'heavy_plate' | 'boss_armor';
}

export type PlantState =
  | 'idle'
  | 'attacking'
  | 'chomper_biting'
  | 'chomper_digesting'
  | 'squash_look'
  | 'squash_jump'
  | 'squash_fall'
  | 'magnet_sucking'
  | 'magnet_recharging';

export interface PlacedPlant {
  id: string;
  plantId: PlantId;
  row: number;
  col: number;
  hp: number;
  maxHp: number;
  lastAttackTime: number;
  lastSunTime?: number;
  createdTime?: number;
  state?: PlantState;
  stateTimer?: number;
  digestExpire?: number;
  targetZombieId?: string;
  targetCol?: number;
  hasPumpkinShell?: boolean;
  pumpkinHp?: number;
  pumpkinMaxHp?: number;
  isOvercharged?: boolean; // Boosted by Golden Watering Can or Plant Food
  overchargeExpire?: number;
  isUltActive?: boolean;
  ultExpire?: number;
  level?: number;
}

export interface ActiveZombie {
  id: string;
  zombieId: ZombieId;
  row: number;
  colPosition: number; // 0 (house end) to max cols (spawn end)
  bodyHp: number;
  bodyMaxHp: number;
  helmHp: number;
  helmMaxHp: number;
  helmType: HelmType;
  shieldHp: number;
  shieldMaxHp: number;
  shieldType: ShieldType;
  hp: number; // Sum of current bodyHp + helmHp + shieldHp
  maxHp: number; // Sum of max
  speed: number;
  baseSpeed: number;
  lastAttackTime: number;
  isAttacking: boolean;
  targetPlantId: string | null;
  slowTimerSec?: number; // slowed by ice (0.4x factor)
  freezeTimerSec?: number; // frozen solid
  stunTimerSec?: number; // butter / stun
  isCharmed?: boolean; // hypnotized to fight for player
  isEnraged?: boolean; // speed boost after newspaper broke
  isFlying?: boolean; // Balloon zombie floating over plants
  balloonHp?: number; // Balloon HP (20)
  hasPole?: boolean; // Polevaulter has pole to vault over 1st plant
  hasPogo?: boolean; // Pogo zombie jumping over plants
  isDigging?: boolean; // Digger zombie moving underground
  isWalkingBackwards?: boolean; // Digger walking backwards after popping up
  hasThrownImp?: boolean; // Gargantuar threw Imp at 50% HP
  armorType?: 'none' | 'spore_scale' | 'heavy_plate' | 'boss_armor';
  hasDisarmedMetal?: boolean;
}

export interface Projectile {
  id: string;
  row: number;
  colPosition: number;
  damage: number;
  speed: number;
  type?: 'pea' | 'ice_pea' | 'fume_wave' | 'gatling' | 'melon_ice' | 'fireball' | 'butter' | 'laser' | 'lightning' | 'bonk_punch';
  penetrating?: boolean;
  bypassesShield?: boolean;
  hitZombieIds?: string[];
  splashRadius?: number;
  causesStun?: boolean;
}

export interface SunDrop {
  id: string;
  row: number;
  col: number;
  value: number;
  spawnTime: number;
}

export interface WavePhase {
  phaseNumber: number;
  title: string;
  subtitle?: string;
  startDelaySec: number;
  isHugeWave?: boolean;
  isFinalWave?: boolean;
}

export interface PvzWave {
  waveNumber: number;
  chapterTitle: string;
  name: string;
  stageName: string;
  description: string;
  locationBg?: string;
  totalDurationSec: number;
  phases: WavePhase[];
  weatherCondition?: 'clear' | 'fog' | 'night' | 'acid_rain';
  zombieSpawns: { zombieId: ZombieId; delaySec: number; row?: number }[];
  nationalReward: {
    title: string;
    description: string;
    territoryBonusKm2: number;
    statBonusPct: number;
    populationBonusMonths?: number;
    specialBonus?: string;
  };
}

export interface LiveComment {
  id: string;
  author: string;
  role: 'caster' | 'guest' | 'viewer';
  avatar: string;
  text: string;
  badge?: string;
}

export interface NationalStats {
  countryName: string;
  playerRepresentative: string;
  territoryKm2: number;
  populationLifeBonusMonths: number;
  nationalStrengthBonusPct: number;
  worldRank: number;
  beastCores: number;
  purificationSerumLevel: number;
}

export interface SurvivalStats {
  foodSupply: number; // 0 - 100
  pureWaterSupply: number; // 0 - 100
  viralResistancePct: number; // 0 - 100%
  campMorale: number; // 0 - 100
  landAreaM2: number; // 10m² - 500m²
}

export interface CompanionAssignment {
  companionId: string;
  assignedTask: 'scout' | 'defense' | 'cooking' | 'gardening' | 'research';
  taskTitle: string;
  bonusEffect: string;
}

export interface PvzCompanion {
  id: string;
  name: string;
  title: string;
  avatar: string;
  role: string;
  level: number;
  loyalty: number; // 0-100
  specialSkill: string;
  skillDesc: string;
  isUnlocked: boolean;
  dialogue: string;
  heroType?: 'support' | 'combat' | 'zombie_hero';
  assignedTask?: string;
}

export interface PvzDaveUpgrade {
  id: string;
  name: string;
  costEnergy: number;
  costBeastCore?: number;
  costSun?: number;
  icon: string;
  level: number;
  maxLevel: number;
  description: string;
  effect: string;
  isUnlocked: boolean;
  category?: 'garden' | 'genetics' | 'purification' | 'land';
}

export interface PvzTactic {
  id: string;
  name: string;
  icon: string;
  description: string;
  bonus: string;
  isActive: boolean;
}

export interface PvzLoreChapter {
  id: string;
  chapterNumber: number;
  title: string;
  stageNumber: number;
  isUnlocked: boolean;
  summary: string;
  content: string;
}

export interface PathologyEntry {
  id: string;
  zombieId: ZombieId;
  name: string;
  mutationTrait: string;
  weakness: string;
  counterStrategy: string;
  extractedFormula: string;
  isDiscovered: boolean;
}

export interface DamagePopup {
  id: string;
  row: number;
  colPosition: number;
  text: string;
  color: string;
  isCrit?: boolean;
  createdAt: number;
}

export interface LawnMowerState {
  row: number;
  active: boolean;
  colPosition: number;
  isTriggered: boolean;
}

export type StoryEventTrigger = 'wave_start' | 'wave_clear' | 'mid_wave' | 'game_start';

export interface StoryEvent {
  id: string;
  waveIndex: number; // 0 to 6
  trigger: StoryEventTrigger;
  speaker: string;
  speakerRole: string;
  avatar: string;
  title: string;
  subtitle?: string;
  dialogue: string[];
  systemNotice?: string;
  badge?: string;
  soundEffect?: 'dialogue' | 'danger' | 'level_up' | 'victory' | 'item_get';
  portraitBorderColor?: string;
}
