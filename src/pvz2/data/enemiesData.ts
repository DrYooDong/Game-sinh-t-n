export interface EnemyType {
  id: string;
  name: string;
  vietnameseTitle: string;
  description: string;
  health: number;
  speed: number; // % lane traversal per second
  damage: number;
  attackSpeedSec: number;
  isFlying?: boolean;
  isWater?: boolean;
  hasMetalWeapon?: boolean;
  weaponType?: string;
  isBoss?: boolean;
  avatarColor: string;
  iconType: string;
  rewardSun: number;
  rewardSouls: number;
}

export const ALL_ENEMY_TYPES: Record<string, EnemyType> = {
  basic_zombie: {
    id: 'basic_zombie',
    name: 'Infected Zombie',
    vietnameseTitle: 'Zombie Nhiễm Virus',
    description: 'Người bị virus biến đổi, di chuyển chậm nhưng số lượng đông đảo.',
    health: 200,
    speed: 3.5,
    damage: 25,
    attackSpeedSec: 1.0,
    avatarColor: '#10B981',
    iconType: 'basic_zombie',
    rewardSun: 25,
    rewardSouls: 10
  },
  rooftop_runner: {
    id: 'rooftop_runner',
    name: 'Rooftop Runner Zombie',
    vietnameseTitle: 'Zombie Leo Trèo Sân Thượng',
    description: 'Nhanh nhẹn, phá cửa xông lên sân thượng dồn ép nhóm La Quân.',
    health: 160,
    speed: 6.0,
    damage: 30,
    attackSpeedSec: 0.8,
    avatarColor: '#EF4444',
    iconType: 'runner_zombie',
    rewardSun: 30,
    rewardSouls: 15
  },
  conehead_mutant: {
    id: 'conehead_mutant',
    name: 'Conehead Mutant',
    vietnameseTitle: 'Zombie Đội Nón Bảo Hộ',
    description: 'Đội nón bảo hộ công trình gia tăng lớp giáp chịu đòn.',
    health: 450,
    speed: 3.2,
    damage: 30,
    attackSpeedSec: 1.0,
    avatarColor: '#F97316',
    iconType: 'conehead_zombie',
    rewardSun: 40,
    rewardSouls: 20
  },
  savage_archer: {
    id: 'savage_archer',
    name: 'Fissure Savage Archer',
    vietnameseTitle: 'Dã Nhân Bắn Cung Khe Nứt',
    description: 'Sống trong khe nứt vực sâu, bắn tên tầm xa làm rách bóng bay của Tuyết Mộc!',
    health: 300,
    speed: 2.8,
    damage: 40,
    attackSpeedSec: 1.5,
    hasMetalWeapon: true,
    weaponType: 'Cung Sắt',
    avatarColor: '#84CC16',
    iconType: 'archer_savage',
    rewardSun: 50,
    rewardSouls: 35
  },
  werewolf_beast_lv40: {
    id: 'werewolf_beast_lv40',
    name: 'Werewolf Beast Lv40',
    vietnameseTitle: 'Ma Thú Sói Người (Cấp 40)',
    description: 'Ma thú đột biến hung hãn ở Bí Cảnh Khe Nứt, lao tới cắn xé với tốc độ chóng mặt.',
    health: 1800,
    speed: 4.5,
    damage: 90,
    attackSpeedSec: 0.9,
    isBoss: true,
    avatarColor: '#6B7280',
    iconType: 'werewolf_boss',
    rewardSun: 200,
    rewardSouls: 150
  },
  kraken_boss_lv61: {
    id: 'kraken_boss_lv61',
    name: 'Giant Kraken Lake Beast Lv61',
    vietnameseTitle: 'Ma Thú Bạch Tuộc (Cấp 61)',
    description: 'Ẩn mình dưới hồ nước Bí Cảnh, phun sương độc xanh và quăng xúc tu dìm ngập mọi phòng tuyến.',
    health: 4500,
    speed: 1.8,
    damage: 140,
    attackSpeedSec: 1.8,
    isBoss: true,
    isWater: true,
    avatarColor: '#06B6D4',
    iconType: 'kraken_boss',
    rewardSun: 400,
    rewardSouls: 350
  },
  lake_mutant_eel: {
    id: 'lake_mutant_eel',
    name: 'Lake Mutant Eel',
    vietnameseTitle: 'Thủy Quái Lươn Đột Biến',
    description: 'Bơi ngầm dưới nước hỗ trợ Bạch Tuộc tấn công chớp nhoáng.',
    health: 350,
    speed: 5.0,
    damage: 45,
    attackSpeedSec: 1.0,
    isWater: true,
    avatarColor: '#0EA5E9',
    iconType: 'water_eel',
    rewardSun: 50,
    rewardSouls: 30
  },
  prison_guard_armed: {
    id: 'prison_guard_armed',
    name: 'Tyrant Armed Guard',
    vietnameseTitle: 'Lính Vũ Trang Trại Giam',
    description: 'Thuộc hạ của Vô Năng mang súng trường và giáp kim loại đàn áp người sống sót.',
    health: 550,
    speed: 2.8,
    damage: 60,
    attackSpeedSec: 1.4,
    hasMetalWeapon: true,
    weaponType: 'Súng Trường Kim Loại',
    avatarColor: '#475569',
    iconType: 'armed_guard',
    rewardSun: 60,
    rewardSouls: 40
  },
  tyrant_vo_nang: {
    id: 'tyrant_vo_nang',
    name: 'Tyrant Vo Nang (RPG + Bear Form)',
    vietnameseTitle: 'Bạo Chúa Vô Năng (RPG & Gấu Khổng Lồ)',
    description: 'Kẻ độc tài trại giam, cầm súng phóng lựu RPG và thẻ hóa hình Gấu Đột Biến khát máu.',
    health: 5000,
    speed: 2.2,
    damage: 180,
    attackSpeedSec: 2.0,
    isBoss: true,
    hasMetalWeapon: true,
    weaponType: 'Súng Chống Tăng RPG',
    avatarColor: '#DC2626',
    iconType: 'vo_nang_boss',
    rewardSun: 500,
    rewardSouls: 450
  },
  mountain_ape_lv38: {
    id: 'mountain_ape_lv38',
    name: 'Giant Mountain Ape Lv38',
    vietnameseTitle: 'Khỉ Đen Sơn Thị (Cấp 38)',
    description: 'Chúa tể rừng sâu với tiếng gầm chấn động xé toạc màng nhĩ, da dầy như đá tảng.',
    health: 3200,
    speed: 3.0,
    damage: 120,
    attackSpeedSec: 1.3,
    isBoss: true,
    avatarColor: '#1E293B',
    iconType: 'mountain_ape',
    rewardSun: 300,
    rewardSouls: 250
  },
  forest_mutated_beast: {
    id: 'forest_mutated_beast',
    name: 'Forest Mutated Beast',
    vietnameseTitle: 'Ma Thú Rừng Đột Biến',
    description: 'Thú rừng bị virus biến dị thành quái vật nhiều mắt hung bạo trong đêm Bách Quỷ Dạ Hành.',
    health: 400,
    speed: 4.8,
    damage: 50,
    attackSpeedSec: 0.9,
    avatarColor: '#78350F',
    iconType: 'forest_beast',
    rewardSun: 45,
    rewardSouls: 35
  }
};
