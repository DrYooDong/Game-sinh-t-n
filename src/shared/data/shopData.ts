// Crazy Dave's Twiddydinkies Shop Data & Upgrades

export interface ShopItem {
  id: string;
  name: string;
  vnName: string;
  price: number;
  category: 'slots' | 'plants' | 'items';
  image: string;
  description: string;
  unlockedByDefault?: boolean;
  requiredSlot?: number;
}

export const CRAZY_DAVE_SHOP_ITEMS: ShopItem[] = [
  // Seed Slots
  {
    id: 'seed_slot_7',
    name: '7th Seed Slot',
    vnName: 'Ô Hạt Giống Thứ 7',
    price: 750,
    category: 'slots',
    image: '/pvz_assets/ui/SeedBank.png',
    description: 'Mở rộng khay mang thêm 1 loại cây trồng vào trận chiến (Tối đa 7 cây).',
    requiredSlot: 6
  },
  {
    id: 'seed_slot_8',
    name: '8th Seed Slot',
    vnName: 'Ô Hạt Giống Thứ 8',
    price: 1500,
    category: 'slots',
    image: '/pvz_assets/ui/SeedBank.png',
    description: 'Mở rộng khay mang thêm 1 loại cây trồng vào trận chiến (Tối đa 8 cây).',
    requiredSlot: 7
  },
  {
    id: 'seed_slot_9',
    name: '9th Seed Slot',
    vnName: 'Ô Hạt Giống Thứ 9',
    price: 3000,
    category: 'slots',
    image: '/pvz_assets/ui/SeedBank.png',
    description: 'Mở rộng khay mang thêm 1 loại cây trồng vào trận chiến (Tối đa 9 cây).',
    requiredSlot: 8
  },
  {
    id: 'seed_slot_10',
    name: '10th Seed Slot',
    vnName: 'Ô Hạt Giống Thứ 10 (Cực Đại)',
    price: 5000,
    category: 'slots',
    image: '/pvz_assets/ui/SeedBank.png',
    description: 'Mở rộng tối đa khay hạt giống lên đến 10 cây cùng lúc!',
    requiredSlot: 9
  },

  // Upgrade Plants
  {
    id: 'upgrade_gatling_pea',
    name: 'Gatling Pea',
    vnName: 'Đậu Súng Máy Gatling (4 Nòng)',
    price: 5000,
    category: 'plants',
    image: '/pvz_assets/plants/plant_gatling_pea.png',
    description: 'Trồng đè lên Repeater. Bắn liên tiếp 4 viên đậu cùng lúc tàn phá quái vật.'
  },
  {
    id: 'upgrade_twin_sunflower',
    name: 'Twin Sunflower',
    vnName: 'Hoa Hướng Dương Kép',
    price: 5000,
    category: 'plants',
    image: '/pvz_assets/plants/plant_twin_sunflower.png',
    description: 'Trồng đè lên Sunflower. Cho 50 Mặt trời mỗi lần sản xuất (Gấp đôi thông thường).'
  },
  {
    id: 'upgrade_winter_melon',
    name: 'Winter Melon',
    vnName: 'Dưa Hấu Băng Tuyết',
    price: 10000,
    category: 'plants',
    image: '/pvz_assets/plants/plant_winter_melon.png',
    description: 'Trồng đè lên Melon-pult. Ném dưa hấu đông cứng làm chậm cả vùng sân.'
  },
  {
    id: 'upgrade_spikerock',
    name: 'Spikerock',
    vnName: 'Gai Đá Chông Sắt',
    price: 7500,
    category: 'plants',
    image: '/pvz_assets/plants/plant_spikeweed.png',
    description: 'Trồng đè lên Spikeweed. Chịu được nhiều lần cán của xe Zomboni & Gargantuar.'
  },

  // Special Items
  {
    id: 'golden_shovel',
    name: 'Golden Shovel',
    vnName: 'Xẻng Vàng Hoàn Tiền',
    price: 2500,
    category: 'items',
    image: '/pvz_assets/ui/shovel.png',
    description: 'Xẻng mạ vàng sang trọng: Khi đào cây đi sẽ hoàn trả lại 50% Mặt trời ban đầu!'
  },
  {
    id: 'plant_food_expansion',
    name: 'Plant Food Expansion',
    vnName: 'Bình Chứa Năng Lượng +1',
    price: 3000,
    category: 'items',
    image: '/pvz_assets/ui/plant_food.png',
    description: 'Tăng thêm 1 ô trữ Phân bón tăng trưởng (Plant Food) trong trận đấu.'
  },
  {
    id: 'roof_cleaner',
    name: 'Roof Cleaner',
    vnName: 'Máy Quét Mái Nhà Khẩn Cấp',
    price: 3000,
    category: 'items',
    image: '/pvz_assets/ui/lawn_mower.png',
    description: 'Trang bị xe quét dọn phòng thủ tầng mái, tự động kích hoạt khi có zombie xâm nhập.'
  }
];

export const CRAZY_DAVE_QUOTES = [
  "Chào mừng đến với tiệm tạp hóa của Dave Điên! Wabby wabbo!",
  "Tại sao tôi lại đội nồi trên đầu à? BỞI VÌ TÔI ĐIÊN ĐẤY! Ha ha ha!",
  "Những món đồ này sẽ giúp cây của bạn bắn nát lũ xác sống ăn não ngoài kia!",
  "Bạn có muốn mua một ô hạt giống mới không? Rất đáng tiền đấy bạn tôi ơi!",
  "Cẩn thận với lũ Gargantuar nhé, chúng to con nhưng không thông minh bằng tôi đâu!"
];
