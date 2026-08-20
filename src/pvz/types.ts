export type PlantId =
  | 'plant_sunflower'
  | 'plant_peashooter'
  | 'plant_snow_pea'
  | 'plant_fume_shroom'
  | 'plant_hypno_shroom'
  | 'plant_gatling_pea'
  | 'plant_pumpkin'
  | 'plant_cherry_bomb'
  | 'plant_zombie_wall'
  | 'plant_tallnut'
  | 'plant_doom_shroom'
  | 'plant_plantern';

export type ZombieId =
  | 'zombie_normal'
  | 'zombie_fast'
  | 'zombie_strong_1'
  | 'zombie_fast_2'
  | 'zombie_strong_2'
  | 'zombie_flag'
  | 'zombie_armored_spore'
  | 'zombie_mutant_cat'
  | 'zombie_disco'
  | 'zombie_rival_yamamoto'
  | 'zombie_boss_lion_king'
  | 'zombie_boss_gargantuar';

export interface PlantData {
  id: PlantId;
  name: string;
  sunCost: number;
  cooldownSec: number;
  maxHp: number;
  attackDmg: number;
  attackIntervalSec: number;
  icon: string;
  description: string;
  color: string;
  projectileType?: 'pea' | 'ice_pea' | 'fume_wave' | 'gatling';
  specialTrait?: string;
  unlockedAtWave?: number;
}

export interface ZombieData {
  id: ZombieId;
  name: string;
  title: string;
  maxHp: number;
  speed: number; // units per second (0.1 to 1.0)
  attackDmg: number;
  attackIntervalSec: number;
  icon: string;
  rewardSun: number;
  rewardEnergy: number;
  rewardBeastCore?: number;
  description: string;
  isBoss?: boolean;
  armorType?: 'none' | 'spore_scale' | 'heavy_plate' | 'boss_armor';
}

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
}

export interface ActiveZombie {
  id: string;
  zombieId: ZombieId;
  row: number;
  colPosition: number; // 0 (house end) to 6 (spawn end)
  hp: number;
  maxHp: number;
  speed: number;
  lastAttackTime: number;
  isAttacking: boolean;
  targetPlantId: string | null;
  slowTimerSec?: number; // slowed by ice
  isCharmed?: boolean; // hypnotized to fight for player
  armorType?: 'none' | 'spore_scale' | 'heavy_plate' | 'boss_armor';
}

export interface Projectile {
  id: string;
  row: number;
  colPosition: number;
  damage: number;
  speed: number;
  type?: 'pea' | 'ice_pea' | 'fume_wave' | 'gatling';
  penetrating?: boolean;
  hitZombieIds?: string[];
}

export interface SunDrop {
  id: string;
  row: number;
  col: number;
  value: number;
  spawnTime: number;
}

export interface PvzWave {
  waveNumber: number;
  chapterTitle: string;
  name: string;
  stageName: string;
  description: string;
  locationBg?: string;
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
  cooldownRemaining?: number;
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
  category?: 'garden' | 'genetics' | 'purification';
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

