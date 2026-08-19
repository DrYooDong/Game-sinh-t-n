export type PlantId =
  | 'plant_sunflower'
  | 'plant_peashooter'
  | 'plant_cherry_bomb'
  | 'plant_pumpkin'
  | 'plant_zombie_wall'
  | 'plant_tallnut';

export type ZombieId =
  | 'zombie_normal'
  | 'zombie_fast'
  | 'zombie_strong_1'
  | 'zombie_fast_2'
  | 'zombie_strong_2'
  | 'zombie_flag'
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
  description: string;
  isBoss?: boolean;
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
}

export interface Projectile {
  id: string;
  row: number;
  colPosition: number;
  damage: number;
  speed: number;
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
  name: string;
  stageName: string;
  description: string;
  zombieSpawns: { zombieId: ZombieId; delaySec: number; row?: number }[];
  nationalReward: {
    title: string;
    description: string;
    territoryBonusKm2: number;
    statBonusPct: number;
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
}

export interface PvzDaveUpgrade {
  id: string;
  name: string;
  costEnergy: number;
  costSun?: number;
  icon: string;
  level: number;
  maxLevel: number;
  description: string;
  effect: string;
  isUnlocked: boolean;
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
  title: string;
  stageNumber: number;
  isUnlocked: boolean;
  content: string;
}

