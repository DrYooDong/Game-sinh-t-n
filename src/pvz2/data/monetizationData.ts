import { BattlePassTier } from '../types/game';

export const BATTLE_PASS_TIERS: BattlePassTier[] = [
  {
    level: 1,
    requiredExp: 100,
    freeReward: { type: 'sun', amount: 200, label: '☀️ 200 Nắng' },
    premiumReward: { type: 'diamonds', amount: 50, label: '💎 50 Kim Cương' }
  },
  {
    level: 2,
    requiredExp: 200,
    freeReward: { type: 'souls', amount: 150, label: '🔮 150 Tinh Hồn' },
    premiumReward: { type: 'water', amount: 2, label: '🚰 2 Bình Tưới Vàng' }
  },
  {
    level: 3,
    requiredExp: 350,
    freeReward: { type: 'sun', amount: 350, label: '☀️ 350 Nắng' },
    premiumReward: { type: 'card', amount: 1, cardId: 'torchwood', label: '🔥 Thẻ Cọc Gỗ Hỏa Diệm' }
  },
  {
    level: 4,
    requiredExp: 500,
    freeReward: { type: 'water', amount: 1, label: '🚰 1 Bình Vàng' },
    premiumReward: { type: 'diamonds', amount: 100, label: '💎 100 Kim Cương' }
  },
  {
    level: 5,
    requiredExp: 700,
    freeReward: { type: 'souls', amount: 300, label: '🔮 300 Tinh Hồn' },
    premiumReward: { type: 'card', amount: 1, cardId: 'lightning_shroom', label: '⚡ Thẻ Nấm Dòng Điện S cấp' }
  },
  {
    level: 6,
    requiredExp: 950,
    freeReward: { type: 'sun', amount: 500, label: '☀️ 500 Nắng' },
    premiumReward: { type: 'diamonds', amount: 150, label: '💎 150 Kim Cương' }
  },
  {
    level: 7,
    requiredExp: 1250,
    freeReward: { type: 'water', amount: 2, label: '🚰 2 Bình Tưới Vàng' },
    premiumReward: { type: 'card', amount: 1, cardId: 'hypno_shroom', label: '🌀 Thẻ Nấm Thôi Miên S cấp' }
  },
  {
    level: 8,
    requiredExp: 1600,
    freeReward: { type: 'souls', amount: 600, label: '🔮 600 Tinh Hồn' },
    premiumReward: { type: 'diamonds', amount: 250, label: '💎 250 Kim Cương' }
  },
  {
    level: 9,
    requiredExp: 2000,
    freeReward: { type: 'sun', amount: 800, label: '☀️ 800 Nắng' },
    premiumReward: { type: 'card', amount: 1, cardId: 'melon_pult', label: '🍈 Thẻ Ném Dưa Hấu Thần Tốc' }
  },
  {
    level: 10,
    requiredExp: 2500,
    freeReward: { type: 'diamonds', amount: 100, label: '💎 100 Kim Cương' },
    premiumReward: { type: 'card', amount: 1, cardId: 'giant_walnut', label: '🛡️ THẺ PI CẤP THẦN: Bức Tường Hạt Dẻ Số 0' }
  }
];

export interface ShopItem {
  id: string;
  name: string;
  category: 'subscription' | 'currency' | 'starter_pack' | 'special';
  badge?: string;
  description: string;
  priceUsd: number;
  diamondsCost?: number;
  reward: {
    diamonds?: number;
    sun?: number;
    souls?: number;
    water?: number;
    cards?: string[];
    isMonthlyVip?: boolean;
    isBattlePass?: boolean;
  };
  bonusTag?: string;
  icon: string;
  colorScheme: string;
}

export const VIP_SHOP_ITEMS: ShopItem[] = [
  {
    id: 'monthly_vip_card',
    name: 'Thẻ Tháng VIP Vận Mệnh',
    category: 'subscription',
    badge: 'SIÊU HỜI X1000%',
    description: 'Nhận ngay 300 💎 và 60 💎 + 100 ☀️ mỗi ngày liên tục 30 ngày. Tăng 20% tốc độ tích năng lượng.',
    priceUsd: 4.99,
    reward: {
      diamonds: 300,
      isMonthlyVip: true
    },
    bonusTag: 'Được đề xuất 99% người chơi',
    icon: '👑',
    colorScheme: 'from-amber-500/20 via-yellow-600/30 to-amber-950/80 border-amber-400'
  },
  {
    id: 'starter_recruit_pack',
    name: 'Gói Khởi Đầu Tân Thủ 0.99$',
    category: 'starter_pack',
    badge: 'DUY NHẤT 1 LẦN',
    description: 'Tặng ngay 100 💎, 500 ☀️, 500 🔮 và Thẻ S cấp Xạ Thủ Nuốt Chửng (Tiểu Thôn).',
    priceUsd: 0.99,
    reward: {
      diamonds: 100,
      sun: 500,
      souls: 500,
      cards: ['peashooter_devourer']
    },
    bonusTag: 'Giá Trị $15.00',
    icon: '🎁',
    colorScheme: 'from-emerald-500/20 via-teal-600/30 to-slate-950/80 border-emerald-400'
  },
  {
    id: 'premium_battle_pass_unlock',
    name: 'Mở Khóa Vé Sinh Tồn Mùa 1',
    category: 'subscription',
    badge: 'SEASON 1 PASS',
    description: 'Mở khóa toàn bộ 10 tầng phần thưởng VIP: Thẻ Pi Hạt Dẻ Khổng Lồ, 650 💎, Skin Hào Quang Độc Quyền.',
    priceUsd: 9.99,
    reward: {
      isBattlePass: true,
      diamonds: 150
    },
    bonusTag: 'Mùa giải còn 28 ngày',
    icon: '🎫',
    colorScheme: 'from-purple-500/20 via-fuchsia-600/30 to-zinc-950/80 border-purple-400'
  },
  {
    id: 'gem_pack_small',
    name: 'Túi Kim Cương Nhỏ',
    category: 'currency',
    description: '60 Kim Cương Tinh Khiết dùng quay Gacha Vận Mệnh.',
    priceUsd: 0.99,
    reward: { diamonds: 60 },
    icon: '💎',
    colorScheme: 'from-cyan-950/60 to-blue-950/80 border-cyan-700/60'
  },
  {
    id: 'gem_pack_medium',
    name: 'Rương Kim Cương Hoàng Gia',
    category: 'currency',
    badge: 'TẶNG +50%',
    description: '330 Kim Cương Tinh Khiết (+30 Kim Cương Thưởng).',
    priceUsd: 4.99,
    reward: { diamonds: 330 },
    icon: '💎',
    colorScheme: 'from-blue-950/60 to-indigo-950/80 border-blue-600/60'
  },
  {
    id: 'gem_pack_large',
    name: 'Kho Báu Thần Linh Tối Thượng',
    category: 'currency',
    badge: 'TẶNG +100% LẦN ĐẦU',
    description: '1,500 Kim Cương Tinh Khiết. Đủ thực hiện 10 lần Quay x10 Tinh Vân Thần Cấp!',
    priceUsd: 19.99,
    reward: { diamonds: 1500 },
    icon: '✨',
    colorScheme: 'from-amber-950/70 via-red-950/80 to-black border-yellow-500'
  }
];

export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  country: string;
  avatar: string;
  waveReached: number;
  score: number;
  favoriteCard: string;
  title: string;
  vipTag?: string;
}

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    playerName: 'Tuyết Mộc • Thần Linh',
    country: '🇻🇳',
    avatar: 'tuyet_moc',
    waveReached: 88,
    score: 984500,
    favoriteCard: 'giant_walnut',
    title: 'Chúa Tể Không Gian',
    vipTag: 'VIP 12'
  },
  {
    rank: 2,
    playerName: 'Yosuke_BladeMaster',
    country: '🇯🇵',
    avatar: 'yosuke',
    waveReached: 79,
    score: 842100,
    favoriteCard: 'melon_pult',
    title: 'Kiếm Thánh Dưa Hấu',
    vipTag: 'VIP 10'
  },
  {
    rank: 3,
    playerName: 'Eiker_SniperX',
    country: '🇩🇪',
    avatar: 'tieu_thon',
    waveReached: 73,
    score: 720300,
    favoriteCard: 'peashooter_devourer',
    title: 'Thần Xạ Gatling',
    vipTag: 'VIP 9'
  },
  {
    rank: 4,
    playerName: 'Shadow_Cultist',
    country: '🇰🇷',
    avatar: 'ta_giao',
    waveReached: 65,
    score: 615000,
    favoriteCard: 'hypno_shroom',
    title: 'Bậc Thầy Thôi Miên',
    vipTag: 'VIP 8'
  },
  {
    rank: 5,
    playerName: 'Lão Quán Trưởng Lão',
    country: '🇻🇳',
    avatar: 'la_quan',
    waveReached: 58,
    score: 540200,
    favoriteCard: 'newspaper_zombie',
    title: 'Thủ Hộ Căn Cứ',
    vipTag: 'VIP 7'
  }
];
