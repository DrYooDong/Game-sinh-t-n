import { PlantData, ZombieData, PvzWave, LiveComment, PvzCompanion, PvzDaveUpgrade, PvzTactic, PvzLoreChapter, PathologyEntry, StoryEvent } from '../types';

export const PVZ_PLANTS: PlantData[] = [
  {
    id: 'plant_sunflower',
    name: 'Hoa Hướng Dương',
    sunCost: 50,
    cooldownSec: 4,
    maxHp: 300,
    attackDmg: 0,
    attackIntervalSec: 5.5,
    icon: '🌻',
    description: 'Sản xuất +25 Ánh Nắng mỗi 5.5 giây để duy trì hỏa lực toàn đội.',
    color: 'border-amber-400 bg-amber-950/40 text-amber-300',
    specialTrait: 'Sản xuất Ánh Nắng',
    unlockedAtWave: 1
  },
  {
    id: 'plant_peashooter',
    name: 'Đậu Pháo Liên Thanh',
    sunCost: 100,
    cooldownSec: 4.5,
    maxHp: 300,
    attackDmg: 25,
    attackIntervalSec: 1.4,
    icon: '🟢',
    description: 'Bắn viên đậu nén cao áp liên tục về phía trước khi có zombie.',
    color: 'border-emerald-400 bg-emerald-950/40 text-emerald-300',
    projectileType: 'pea',
    specialTrait: 'Hỏa lực căn bản',
    unlockedAtWave: 1
  },
  {
    id: 'plant_snow_pea',
    name: 'Xạ Thủ Băng Giá',
    sunCost: 175,
    cooldownSec: 6,
    maxHp: 320,
    attackDmg: 30,
    attackIntervalSec: 1.5,
    icon: '❄️',
    description: 'Bắn hạt đậu băng giá làm chậm 50% tốc độ di chuyển và tấn công của quái.',
    color: 'border-cyan-400 bg-cyan-950/40 text-cyan-300',
    projectileType: 'ice_pea',
    specialTrait: 'Làm chậm tốc độ 50%',
    unlockedAtWave: 3
  },
  {
    id: 'plant_fume_shroom',
    name: 'Nấm Phun Lớn (Bào Tử)',
    sunCost: 150,
    cooldownSec: 6.5,
    maxHp: 350,
    attackDmg: 35,
    attackIntervalSec: 1.8,
    icon: '🍄',
    description: 'Phun luồng sóng bào tử tím xuyên thấu tất cả zombie và phá hủy vảy sừng kháng đạn.',
    color: 'border-fuchsia-400 bg-fuchsia-950/40 text-fuchsia-300',
    projectileType: 'fume_wave',
    specialTrait: 'Bắn xuyên thấu & Phá giáp',
    unlockedAtWave: 4
  },
  {
    id: 'plant_hypno_shroom',
    name: 'Nấm Mê Hoặc',
    sunCost: 125,
    cooldownSec: 12,
    maxHp: 200,
    attackDmg: 0,
    attackIntervalSec: 0,
    icon: '🌀',
    description: 'Khi bị zombie ăn phải, zombie sẽ bị thôi miên quay đầu cắn xé đồng loại!',
    color: 'border-pink-400 bg-pink-950/40 text-pink-300',
    specialTrait: 'Thôi miên zombie địch',
    unlockedAtWave: 5
  },
  {
    id: 'plant_gatling_pea',
    name: 'Xạ Thủ Súng Máy',
    sunCost: 250,
    cooldownSec: 10,
    maxHp: 450,
    attackDmg: 28,
    attackIntervalSec: 0.6,
    icon: '🔫',
    description: '4 nòng xả đạn cực hạn, tạo cơn mưa đậu áp chế mọi quái vật cơ bắp và Boss.',
    color: 'border-lime-400 bg-lime-950/40 text-lime-300',
    projectileType: 'gatling',
    specialTrait: 'Tốc độ xả đạn siêu cấp',
    unlockedAtWave: 5
  },
  {
    id: 'plant_pumpkin',
    name: 'Khiên Bí Ngô',
    sunCost: 125,
    cooldownSec: 7,
    maxHp: 800,
    attackDmg: 0,
    attackIntervalSec: 0,
    icon: '🎃',
    description: 'Vỏ bí ngô kim cương che chở hàng thủ, chịu đòn cực trâu bò.',
    color: 'border-orange-400 bg-orange-950/40 text-orange-300',
    specialTrait: 'Hàng phòng thủ cao cấp',
    unlockedAtWave: 2
  },
  {
    id: 'plant_cherry_bomb',
    name: 'Bom Anh Đào Cảm Ứng',
    sunCost: 150,
    cooldownSec: 11,
    maxHp: 100,
    attackDmg: 450,
    attackIntervalSec: 1,
    icon: '🍒',
    description: 'Nổ tung sau 1 giây trồng, tiêu diệt toàn bộ zombie trên hàng và ô lân cận.',
    color: 'border-rose-400 bg-rose-950/40 text-rose-300',
    specialTrait: 'Sát thương nổ diện rộng 3x3',
    unlockedAtWave: 2
  },
  {
    id: 'plant_zombie_wall',
    name: 'Thây Ma Chướng Ngại',
    sunCost: 100,
    cooldownSec: 6,
    maxHp: 650,
    attackDmg: 18,
    attackIntervalSec: 1.8,
    icon: '🧟‍♂️',
    description: 'Thây ma cầm xẻng thu phục bởi Tuyết Mộc, dùng thân mình chặn và cào zombie địch.',
    color: 'border-purple-400 bg-purple-950/40 text-purple-300',
    specialTrait: 'Đỡ đòn và phản công cận chiến',
    unlockedAtWave: 2
  },
  {
    id: 'plant_tallnut',
    name: 'Tượng Đá Bất Hoại',
    sunCost: 175,
    cooldownSec: 14,
    maxHp: 1800,
    attackDmg: 0,
    attackIntervalSec: 0,
    icon: '🗿',
    description: 'Tượng đá linh hồn khổng lồ, chặn đứng mọi đợt xung kích điên cuồng của Boss.',
    color: 'border-yellow-400 bg-yellow-950/40 text-yellow-300',
    specialTrait: 'Máu tối đa cực lớn',
    unlockedAtWave: 4
  },
  {
    id: 'plant_doom_shroom',
    name: 'Nấm Hủy Diệt (Hạt Nhân)',
    sunCost: 275,
    cooldownSec: 25,
    maxHp: 100,
    attackDmg: 1200,
    attackIntervalSec: 1.2,
    icon: '☢️',
    description: 'Vũ khí hủy diệt tối thượng! Nổ hạt nhân quét sạch toàn bộ Zombie trên toàn bản đồ!',
    color: 'border-violet-500 bg-violet-950/60 text-violet-300',
    specialTrait: 'Xóa sổ toàn bộ bản đồ',
    unlockedAtWave: 6
  },
  {
    id: 'plant_plantern',
    name: 'Hoa Đèn Đường',
    sunCost: 75,
    cooldownSec: 8,
    maxHp: 400,
    attackDmg: 0,
    attackIntervalSec: 0,
    icon: '🏮',
    description: 'Chiếu rọi sương mù độc bào tử, tăng 25% tốc độ tấn công cho tất cả thực vật cùng hàng.',
    color: 'border-amber-300 bg-amber-950/30 text-amber-200',
    specialTrait: 'Xua tan bào tử & Buff hỏa lực',
    unlockedAtWave: 6
  }
];

export const PVZ_ZOMBIES: Record<string, ZombieData> = {
  zombie_normal: {
    id: 'zombie_normal',
    name: 'Zombie Phố Đi Bộ',
    title: 'Thây Ma Cơ Bản',
    maxHp: 100,
    speed: 0.18,
    attackDmg: 20,
    attackIntervalSec: 1.2,
    icon: '🧟',
    rewardSun: 15,
    rewardEnergy: 2,
    description: 'Zombie chậm chạp lang thang trên các con phố đô thị.'
  },
  zombie_fast: {
    id: 'zombie_fast',
    name: 'Zombie Tốc Độ Cấp 1',
    title: 'Thích Khách Quần Thể',
    maxHp: 80,
    speed: 0.35,
    attackDmg: 25,
    attackIntervalSec: 1.0,
    icon: '🏃',
    rewardSun: 20,
    rewardEnergy: 4,
    description: 'Chạy nhanh lao thẳng vào phòng tuyến thực vật.'
  },
  zombie_strong_1: {
    id: 'zombie_strong_1',
    name: 'Zombie Sức Mạnh Cấp 1',
    title: 'Đao Phủ Cơ Bắp',
    maxHp: 280,
    speed: 0.15,
    attackDmg: 40,
    attackIntervalSec: 1.5,
    icon: '💪',
    rewardSun: 35,
    rewardEnergy: 8,
    description: 'Cơ bắp cuồn cuộn chịu được nhiều đợt bắn đậu.'
  },
  zombie_fast_2: {
    id: 'zombie_fast_2',
    name: 'Zombie Tốc Độ Cấp 2',
    title: 'Vuốt Quỷ Hầm Ga',
    maxHp: 170,
    speed: 0.45,
    attackDmg: 50,
    attackIntervalSec: 0.8,
    icon: '⚡',
    rewardSun: 45,
    rewardEnergy: 12,
    description: 'Móng vuốt sắt bén né đòn và chém nát thực vật trong hầm tàu.'
  },
  zombie_strong_2: {
    id: 'zombie_strong_2',
    name: 'Zombie Sức Mạnh Cấp 2',
    title: 'Thống Lĩnh Đập Phá',
    maxHp: 580,
    speed: 0.16,
    attackDmg: 75,
    attackIntervalSec: 1.4,
    icon: '👹',
    rewardSun: 80,
    rewardEnergy: 25,
    description: 'Dùng thi thể zombie khác làm vũ khí đập bẹp thực vật.',
    isBoss: true
  },
  zombie_flag: {
    id: 'zombie_flag',
    name: 'Zombie Cầm Cờ',
    title: 'Chỉ Huy Quân Đoàn',
    maxHp: 150,
    speed: 0.22,
    attackDmg: 30,
    attackIntervalSec: 1.0,
    icon: '🚩',
    rewardSun: 30,
    rewardEnergy: 6,
    description: 'Dẫn đầu làn sóng zombie ồ ạt tràn vào.'
  },
  zombie_armored_spore: {
    id: 'zombie_armored_spore',
    name: 'Zombie Vảy Sừng Bào Tử',
    title: 'Biến Dị Đột Biến Cấp 2',
    maxHp: 420,
    speed: 0.2,
    attackDmg: 45,
    attackIntervalSec: 1.2,
    icon: '🦏',
    rewardSun: 50,
    rewardEnergy: 15,
    description: 'Lớp sừng cứng kháng đạn thường 50%. Chỉ Nấm Phun Lớn và Băng Giá mới xuyên thủng!',
    armorType: 'spore_scale'
  },
  zombie_mutant_cat: {
    id: 'zombie_mutant_cat',
    name: 'Mèo Cam Biến Dị Khổng Lồ',
    title: 'Hung Thú Đột Biến Nông Nghiệp',
    maxHp: 750,
    speed: 0.38,
    attackDmg: 80,
    attackIntervalSec: 0.9,
    icon: '🐯',
    rewardSun: 100,
    rewardEnergy: 40,
    rewardBeastCore: 1,
    description: 'Mèo hoang hấp thụ virus đột biến to lớn như cọp, rơi Tinh Hạch Ma Thú khi bị hạ.',
    isBoss: true
  },
  zombie_disco: {
    id: 'zombie_disco',
    name: 'Võ Vương Thây Ma (Disco)',
    title: 'Vua Khiêu Vũ Chiến Trường',
    maxHp: 600,
    speed: 0.24,
    attackDmg: 55,
    attackIntervalSec: 1.1,
    icon: '🕺',
    rewardSun: 90,
    rewardEnergy: 30,
    description: 'Nhảy múa điệu nghệ và dẫn đầu bầy quái vật tràn vào sân vận động.'
  },
  zombie_rival_yamamoto: {
    id: 'zombie_rival_yamamoto',
    name: 'Yamamoto & Đao Phủ Sakura',
    title: 'Đại Diện Phản Diện Quốc Vận',
    maxHp: 900,
    speed: 0.3,
    attackDmg: 95,
    attackIntervalSec: 1.0,
    icon: '🥷',
    rewardSun: 120,
    rewardEnergy: 50,
    description: 'Đại diện Sakura Quốc mang kiếm Katana và đàn tay sai ép bức sinh viên.',
    isBoss: true
  },
  zombie_boss_lion_king: {
    id: 'zombie_boss_lion_king',
    name: 'Vua Sư Tử & Gargantuar Cấp 3',
    title: 'Bá Chủ Sân Vận Động Đại Học',
    maxHp: 2200,
    speed: 0.13,
    attackDmg: 140,
    attackIntervalSec: 1.8,
    icon: '🦁',
    rewardSun: 250,
    rewardEnergy: 150,
    rewardBeastCore: 3,
    description: 'Vua Sư Tử cưỡi trên vai quái vật khổng lồ ném cột điện đập nát toàn bộ phòng tuyến.',
    isBoss: true,
    armorType: 'boss_armor'
  },
  zombie_boss_gargantuar: {
    id: 'zombie_boss_gargantuar',
    name: 'Chúa Tể Đa Vũ Trụ Cấp EX',
    title: 'Trùm Cuối Vận Mệnh Quốc Gia',
    maxHp: 3200,
    speed: 0.12,
    attackDmg: 180,
    attackIntervalSec: 2.0,
    icon: '👑',
    rewardSun: 400,
    rewardEnergy: 300,
    rewardBeastCore: 5,
    description: 'Thực thể Ma Thần tối thượng đe dọa trực tiếp sự tồn vong của 10 tỷ người.',
    isBoss: true,
    armorType: 'boss_armor'
  }
};

export const PVZ_WAVES: PvzWave[] = [
  {
    waveNumber: 1,
    chapterTitle: 'Chương 1: Kỷ Nguyên Vận Mệnh Quốc Gia',
    name: 'Vòng 1: Bình Minh Tàn Thế & Khởi Đầu Nông Dân',
    stageName: 'Đường Phố Tân Thủ & Công Viên',
    description: 'Hàng chục Zombie đơn lẻ bắt đầu tiến tới khu đất 10m² của Tuyết Mộc. Hãy trồng Hoa Hướng Dương và Đậu Pháo!',
    zombieSpawns: [
      { zombieId: 'zombie_normal', delaySec: 2 },
      { zombieId: 'zombie_normal', delaySec: 6 },
      { zombieId: 'zombie_normal', delaySec: 10 },
      { zombieId: 'zombie_fast', delaySec: 14 },
      { zombieId: 'zombie_normal', delaySec: 18 },
      { zombieId: 'zombie_strong_1', delaySec: 22 }
    ],
    nationalReward: {
      title: 'QUỐC DÂN TĂNG TUỔI THỌ',
      description: 'Cửu Châu Quốc dẫn đầu cấp 2! Tuổi thọ trung bình toàn dân tăng +1 tháng, kháng virus +1%!',
      territoryBonusKm2: 10,
      statBonusPct: 3,
      populationBonusMonths: 1
    }
  },
  {
    waveNumber: 2,
    chapterTitle: 'Chương 2: Cuộc Chiến Sinh Tồn',
    name: 'Vòng 2: Càn Quét Siêu Thị & Thu Phục Anh Em Dương Siêu',
    stageName: 'Khu Siêu Thị Tiện Lợi & Nắp Cống Ngầm',
    description: 'Bầy zombie đông đúc vây kín cửa siêu thị. Đậu Pháo cần bắn đồng loạt để hạ gục Zombie Sức Mạnh!',
    zombieSpawns: [
      { zombieId: 'zombie_normal', delaySec: 2 },
      { zombieId: 'zombie_fast', delaySec: 5 },
      { zombieId: 'zombie_normal', delaySec: 8 },
      { zombieId: 'zombie_fast', delaySec: 12 },
      { zombieId: 'zombie_strong_1', delaySec: 15 },
      { zombieId: 'zombie_normal', delaySec: 18 },
      { zombieId: 'zombie_strong_1', delaySec: 22 },
      { zombieId: 'zombie_flag', delaySec: 26 }
    ],
    nationalReward: {
      title: 'TĂNG LÃNH THỔ 25 KM²',
      description: 'Thành lập thế lực Vĩnh Hằng Gia Viên! Lãnh thổ Cửu Châu tăng 25 km² tự sinh ra!',
      territoryBonusKm2: 25,
      statBonusPct: 5,
      populationBonusMonths: 2
    }
  },
  {
    waveNumber: 3,
    chapterTitle: 'Chương 3: Đồng Minh & Thế Lực',
    name: 'Vòng 3: Đường Hầm Tàu Điện Ngầm & Gặp Gỡ Đường Long',
    stageName: 'Đường Ray Ngầm & Trạm Ga Thứ 5',
    description: 'Zombie Tốc Độ Cấp 2 móng vuốt kim loại ẩn hiện trong bóng tối đường hầm!',
    zombieSpawns: [
      { zombieId: 'zombie_fast', delaySec: 2 },
      { zombieId: 'zombie_fast_2', delaySec: 5 },
      { zombieId: 'zombie_strong_1', delaySec: 9 },
      { zombieId: 'zombie_fast_2', delaySec: 13 },
      { zombieId: 'zombie_normal', delaySec: 16 },
      { zombieId: 'zombie_strong_2', delaySec: 20 },
      { zombieId: 'zombie_flag', delaySec: 25 }
    ],
    nationalReward: {
      title: 'TOÀN DÂN TĂNG 8% SỨC MẠNH',
      description: 'Hạ gục Zombie Sức Mạnh Cấp 2! Nhận kỹ năng khích lệ tinh thần và tăng 8% sức mạnh toàn dân!',
      territoryBonusKm2: 50,
      statBonusPct: 8,
      populationBonusMonths: 3
    }
  },
  {
    waveNumber: 4,
    chapterTitle: 'Chương 4: Đụng Độ Quái Vật & Phe Phái',
    name: 'Vòng 4: Đột Kích Đại Học Nông Nghiệp & Đối Đầu Yamamoto',
    stageName: 'Đại Học Nông Nghiệp Lương Tử Hồ',
    description: 'Yamamoto ép sinh viên làm tay sai. Hãy dùng bầy thực vật áp đảo và đánh lui Yamamoto!',
    zombieSpawns: [
      { zombieId: 'zombie_flag', delaySec: 2 },
      { zombieId: 'zombie_fast_2', delaySec: 5 },
      { zombieId: 'zombie_strong_1', delaySec: 8 },
      { zombieId: 'zombie_fast_2', delaySec: 12 },
      { zombieId: 'zombie_strong_2', delaySec: 16 },
      { zombieId: 'zombie_rival_yamamoto', delaySec: 20 },
      { zombieId: 'zombie_fast_2', delaySec: 25 }
    ],
    nationalReward: {
      title: 'TIẾP NHẬN NGUỒN GEN NÔNG NGHIỆP',
      description: 'Giải cứu toàn bộ sinh viên nông nghiệp! Lãnh thổ nông nghiệp công nghệ cao tăng 100 km²!',
      territoryBonusKm2: 100,
      statBonusPct: 12,
      populationBonusMonths: 4
    }
  },
  {
    waveNumber: 5,
    chapterTitle: 'Chương 5: Thảm Họa Biến Dị & Tiến Hóa',
    name: 'Vòng 5: Bào Tử Độc & Mèo Cam Biến Dị Khổng Lồ',
    stageName: 'Vườn Thực Nghiệm Bào Tử Biến Dị',
    description: 'Zombie sinh ra lớp vảy sừng kháng đạn! Dùng Nấm Phun Lớn và Đậu Băng, săn Mèo Cam lấy Tinh Hạch!',
    zombieSpawns: [
      { zombieId: 'zombie_armored_spore', delaySec: 2 },
      { zombieId: 'zombie_fast_2', delaySec: 6 },
      { zombieId: 'zombie_armored_spore', delaySec: 10 },
      { zombieId: 'zombie_mutant_cat', delaySec: 15 },
      { zombieId: 'zombie_armored_spore', delaySec: 20 },
      { zombieId: 'zombie_disco', delaySec: 24 }
    ],
    nationalReward: {
      title: 'MỞ KHÓA TINH HẠCH MA THÚ & BỆNH LÝ',
      description: 'Phân tích chuỗi gen đột biến! Mở khóa Viện Nghiên Cứu Y Sinh Dave và tăng 15% thể lực quốc gia!',
      territoryBonusKm2: 150,
      statBonusPct: 15,
      populationBonusMonths: 6
    }
  },
  {
    waveNumber: 6,
    chapterTitle: 'Chương 6: Vua Sư Tử & Đại Chiến Sân Vận Động',
    name: 'Vòng 6: Huyết Chiến Vua Sư Tử & Đường Tướng Quân Thức Tỉnh',
    stageName: 'Sân Vận Động Trung Tâm Hàng Vạn Zombie',
    description: 'Vua Sư Tử cưỡi Gargantuar Cấp 3! Triển khai Đường Tướng Quân giáp xương và Nấm Hủy Diệt Nổ Hạt Nhân!',
    zombieSpawns: [
      { zombieId: 'zombie_flag', delaySec: 2 },
      { zombieId: 'zombie_armored_spore', delaySec: 5 },
      { zombieId: 'zombie_disco', delaySec: 9 },
      { zombieId: 'zombie_boss_lion_king', delaySec: 14 },
      { zombieId: 'zombie_mutant_cat', delaySec: 20 },
      { zombieId: 'zombie_armored_spore', delaySec: 25 }
    ],
    nationalReward: {
      title: 'CHIẾT XUẤT HUYẾT THANH THANH TẨY',
      description: 'Chặt đầu Vua Sư Tử! Chế tạo thành công Huyết Thanh Thanh Tẩy cứu chữa bệnh nan y cho toàn quốc!',
      territoryBonusKm2: 300,
      statBonusPct: 20,
      populationBonusMonths: 12
    }
  },
  {
    waveNumber: 7,
    chapterTitle: 'Chương 7: Cứu Rỗi Quốc Gia & Chiến Trường Quốc Vận',
    name: 'Vòng 7: Chung Kết Bá Chủ & Đại Chiến Đa Vũ Trụ',
    stageName: 'Căn Cứ Đảo Giữa Hồ & Đấu Trường Quốc Vận',
    description: 'Thắp sáng Hoa Đèn Đường, dẫn dắt Đường Tướng Quân và quân đoàn tối thượng diệt Chúa Tể EX!',
    zombieSpawns: [
      { zombieId: 'zombie_flag', delaySec: 2 },
      { zombieId: 'zombie_rival_yamamoto', delaySec: 6 },
      { zombieId: 'zombie_armored_spore', delaySec: 10 },
      { zombieId: 'zombie_boss_gargantuar', delaySec: 15 },
      { zombieId: 'zombie_boss_lion_king', delaySec: 22 },
      { zombieId: 'zombie_disco', delaySec: 27 }
    ],
    nationalReward: {
      title: 'ĐĂNG QUANG BÁ CHỦ VẬN MỆNH TOÀN CẦU',
      description: 'Tuyết Mộc hoàn tất chiến dịch! Cửu Châu Quốc dẫn đầu thế giới, mở ra Kỷ Nguyên Bất Tử!',
      territoryBonusKm2: 1000,
      statBonusPct: 35,
      populationBonusMonths: 60
    }
  }
];

export const COMMENTATORS_FEED: LiveComment[] = [
  {
    id: 'c1',
    author: 'MC Hồ Ca',
    role: 'caster',
    avatar: '🎙️',
    badge: 'Bình Luận Viên',
    text: 'Chào mọi người, tôi là diễn viên Hồ Ca! Tuyết Mộc đã mở khu vườn và trồng cây Hoa Hướng Dương đầu tiên!'
  },
  {
    id: 'c2',
    author: 'Thầy Lý Băng',
    role: 'caster',
    avatar: '👨‍💼',
    badge: 'Chuyên Gia Quân Sự',
    text: 'Chiến thuật bắn đồng loạt của Đậu Pháo quá chuẩn xác! Kết hợp Đậu Băng làm chậm tốc độ tiếp cận của quái!'
  },
  {
    id: 'c3',
    author: 'MC Tiểu Thuyết',
    role: 'caster',
    avatar: '🎤',
    badge: 'MC Quốc Gia',
    text: 'Không thể tin được! Nấm Phun Lớn bắn luồng bào tử tím xuyên thủng cả lớp vảy sừng kháng đạn của Zombie Biến Dị!'
  },
  {
    id: 'c4',
    author: 'Khán Giả Hoa Quốc #882',
    role: 'viewer',
    avatar: '🔥',
    text: 'Nông dân đúng là nghề bá đạo nhất quả đất! Mấy đứa Sakura Quốc ban đầu chê cười giờ bị Tuyết Mộc đè bẹp!'
  },
  {
    id: 'c5',
    author: 'Thầy Lý Băng',
    role: 'caster',
    avatar: '👨‍💼',
    badge: 'Chuyên Gia Quân Sự',
    text: 'Đường Tướng Quân giáp xương vung song đao xông pha dũng mãnh! Sự kết hợp hoàn mỹ giữa Virus và Ý Chí!'
  },
  {
    id: 'c6',
    author: 'Cư Dân Mạng Quốc Tế',
    role: 'viewer',
    avatar: '🌐',
    text: 'Nấm Hủy Diệt vừa tạo ra một vụ nổ hạt nhân quét sạch sân vận động! Đại diện Cửu Châu quá áp đảo!'
  },
  {
    id: 'c7',
    author: 'MC Hồ Ca',
    role: 'caster',
    avatar: '🎙️',
    badge: 'Bình Luận Viên',
    text: 'Huyết Thanh Thanh Tẩy đã được chuyển giao về hiện thực! Bệnh viện toàn quốc báo cáo hàng triệu ca bệnh đã hồi phục!'
  }
];

export const PVZ_COMPANIONS: PvzCompanion[] = [
  {
    id: 'comp_duong_sieu',
    name: 'Dương Siêu',
    title: 'Thám Tử Hẻm Nhỏ & Người Dẫn Dụ',
    avatar: '🏃‍♂️',
    role: 'Trinh Sát & Thu Hút Quái',
    level: 1,
    loyalty: 100,
    specialSkill: 'Dám Hỏi Đường Ở Nơi Đâu',
    skillDesc: 'Hát vang bài hát gia truyền, thu hút toàn bộ zombie về phía trước hàng Đậu Pháo.',
    isUnlocked: true,
    dialogue: 'Anh Tuyết cứ yên tâm! Việc dẫn dụ zombie này là sở trường của tôi, chạy một vòng là gom đủ cả bầy!',
    heroType: 'support'
  },
  {
    id: 'comp_dung_me_nhi',
    name: 'Dung Mễ Nhi',
    title: 'Đầu Bếp Hậu Cần Dã Chiến',
    avatar: '👩‍🍳',
    role: 'Hậu Cần & Nấu Nướng',
    level: 1,
    loyalty: 100,
    specialSkill: 'Bữa Ăn Năng Lượng Siêu Thị',
    skillDesc: 'Chế biến đồ ăn vặt càn quét từ siêu thị, tăng 20% lượng Năng Lượng thu được từ Zombie.',
    isUnlocked: true,
    dialogue: 'Anh Tuyết và anh hai cứ tập trung chiến đấu, việc nấu nướng và dọn dẹp em lo hết ạ!',
    heroType: 'support'
  },
  {
    id: 'comp_duong_long',
    name: 'Đường Long (Đường Đao)',
    title: 'Truyền Nhân Đường Đao Đời Thứ 28',
    avatar: '🗡️',
    role: 'Đao Khách Cận Chiến',
    level: 2,
    loyalty: 95,
    specialSkill: 'Đường Đao Trảm Phong',
    skillDesc: 'Vung Đường Đao chém đứt móng vuốt và đầu Zombie Tốc Độ Cấp 2 chỉ trong 1 chiêu.',
    isUnlocked: false,
    dialogue: 'Tại hạ Đường Long, thề dùng thanh Đường Đao này đi theo Tiên Bối Tuyết Mộc trảm sát vạn quỷ!',
    heroType: 'combat'
  },
  {
    id: 'comp_duong_tuong_quan',
    name: 'Đường Tướng Quân (Anh Hùng Thây Ma)',
    title: 'Chiến Tướng Giáp Xương Bất Diệt',
    avatar: '💀⚔️',
    role: 'Anh Hùng Thây Ma Tối Thượng',
    level: 5,
    loyalty: 100,
    specialSkill: 'Vạn Quỷ Quy Tâm & Giáp Xương Trảm',
    skillDesc: 'Dung hợp chuỗi virus sinh học, sở hữu ý thức độc lập, chém sập hàng thủ Boss và triệu hồi bạn chiến đấu.',
    isUnlocked: false,
    dialogue: 'Dù thân xác hóa thành Thây Ma, linh hồn ta vẫn là mũi kiếm bảo vệ Vĩnh Hằng Gia Viên và Cửu Châu!',
    heroType: 'zombie_hero'
  },
  {
    id: 'comp_sinh_vien_nong_nghiep',
    name: 'Nhóm Sinh Viên Nông Nghiệp',
    title: 'Đội Ngũ Lai Tạo Giống Gen',
    avatar: '🔬',
    role: 'Nghiên Cứu & Lai Tạo Giống Cây',
    level: 1,
    loyalty: 90,
    specialSkill: 'Lai Tạo Đột Biến Gen Nhanh',
    skillDesc: 'Giảm 25% thời gian hồi chiêu của các loại hạt giống cao cấp như Xạ Thủ Súng Máy và Nấm Hủy Diệt.',
    isUnlocked: false,
    dialogue: 'Cảm ơn anh Tuyết đã cứu chúng em khỏi tay tên Yamamoto độc ác! Chúng em sẽ dốc hết sức lai tạo giống cây mới!',
    heroType: 'support'
  }
];

export const PVZ_DAVE_UPGRADES: PvzDaveUpgrade[] = [
  {
    id: 'up_corn_bread',
    name: 'Bánh Ngô Thần Kỳ Bác Sĩ Dave',
    costEnergy: 80,
    icon: '🌽',
    level: 0,
    maxLevel: 1,
    description: 'Vật phẩm tối cao của Bác Sĩ Dave, mở khóa toàn bộ chức năng ẩn và bảng chỉ số trung thành.',
    effect: 'Mở khóa chức năng Bác Sĩ Dave Vô Hạn',
    isUnlocked: false,
    category: 'garden'
  },
  {
    id: 'up_sun_efficiency',
    name: 'Phân Bón Quang Hợp Siêu Cấp',
    costEnergy: 30,
    icon: '🧪',
    level: 0,
    maxLevel: 5,
    description: 'Cải tạo đất trồng, giúp Hoa Hướng Dương sản xuất thêm +10 Ánh Nắng mỗi chu kỳ.',
    effect: '+10 Nắng mỗi lần hoa nhả hạt',
    isUnlocked: true,
    category: 'garden'
  },
  {
    id: 'up_gatling_pea',
    name: 'Nòng Pháo Đậu Nén Cao Áp',
    costEnergy: 45,
    icon: '💥',
    level: 0,
    maxLevel: 5,
    description: 'Tăng tốc độ bắn và sát thương xuyên thấu của Đậu Pháo thêm +15%.',
    effect: '+15% Sát thương đạn đậu',
    isUnlocked: true,
    category: 'garden'
  },
  {
    id: 'up_zombie_recycle',
    name: 'Hầm Phân Hủy Xác Tự Động',
    costEnergy: 50,
    icon: '♻️',
    level: 0,
    maxLevel: 3,
    description: 'Tự động thu gom xác Zombie tử trận vào đất vườn, chuyển hóa thành Năng Lượng và Nắng.',
    effect: 'Nhận thêm +5 Năng Lượng mỗi khi diệt quái',
    isUnlocked: true,
    category: 'garden'
  },
  {
    id: 'up_beast_core_synthesis',
    name: 'Lò Luyện Tinh Hạch Ma Thú',
    costEnergy: 100,
    costBeastCore: 1,
    icon: '🔮',
    level: 0,
    maxLevel: 4,
    description: 'Sử dụng Tinh Hạch Ma Thú từ Mèo Cam để tăng 20% lượng máu và giáp cho toàn bộ thực vật.',
    effect: '+20% Máu tối đa của toàn bộ thực vật',
    isUnlocked: false,
    category: 'genetics'
  },
  {
    id: 'up_purification_serum',
    name: 'Viện Y Sinh & Huyết Thanh Thanh Tẩy',
    costEnergy: 150,
    costBeastCore: 2,
    icon: '💉',
    level: 0,
    maxLevel: 5,
    description: 'Chuyển giao công nghệ huyết thanh về thế giới hiện thực, nhân đôi điểm thưởng Quốc Vận!',
    effect: '+50% Lãnh thổ & Điểm Quốc Vận thưởng sau mỗi vòng',
    isUnlocked: false,
    category: 'purification'
  }
];

export const PVZ_TACTICS: PvzTactic[] = [
  {
    id: 'tactic_volley',
    name: 'Chiến Thuật Bắn Đồng Loạt (Volley Fire)',
    icon: '🎯',
    description: 'Tất cả Đậu Pháo chờ Zombie bước vào tầm bắn tối ưu rồi đồng loạt xả đạn, tránh lãng phí hỏa lực.',
    bonus: '+20% Sát thương tập trung lên mục tiêu đầu hàng',
    isActive: true
  },
  {
    id: 'tactic_phalanx',
    name: 'Đội Hình Tam Giác 3 Người (3-Man Phalanx)',
    icon: '🔺',
    description: '2 Thây Ma đi trước tank sát thương, 1 Thây Ma nhóm trưởng ở sau chỉ huy hỗ trợ.',
    bonus: '+30% Giáp và HP cho Thây Ma Chướng Ngại',
    isActive: true
  },
  {
    id: 'tactic_mobile_garden',
    name: 'Triển Khai Pháo Đài Di Động',
    icon: '🚜',
    description: 'Vừa di chuyển vừa thu hồi và trải khu vườn để thả diều (kite) bầy zombie 200 con.',
    bonus: 'Giảm 25% thời gian hồi chiêu của thẻ cây',
    isActive: false
  },
  {
    id: 'tactic_spore_slow',
    name: 'Băng Giá & Sóng Bào Tử Liên Hoàn',
    icon: '❄️',
    description: 'Kết hợp Xạ Thủ Băng Giá làm chậm mục tiêu để Nấm Phun Lớn xả tối đa lượng sóng bào tử xuyên giáp.',
    bonus: '+35% Sát thương xuyên giáp của Nấm Phun Lớn lên quái bị làm chậm',
    isActive: false
  }
];

export const PVZ_PATHOLOGY_DATA: PathologyEntry[] = [
  {
    id: 'path_normal',
    zombieId: 'zombie_normal',
    name: 'Zombie Phố Đi Bộ',
    mutationTrait: 'Mô cơ hoại tử giai đoạn đầu, di chuyển chậm chạp.',
    weakness: 'Phần đầu chưa có bảo vệ, dễ bị Đậu Pháo bắn rơi.',
    counterStrategy: 'Trồng 1 Đậu Pháo trên mỗi hàng là đủ tiêu diệt.',
    extractedFormula: 'Kháng virus cơ bản: +1%',
    isDiscovered: true
  },
  {
    id: 'path_fast',
    zombieId: 'zombie_fast_2',
    name: 'Zombie Tốc Độ Cấp 2',
    mutationTrait: 'Móng vuốt sắt hóa, cơ chân co giật phản xạ cực nhanh.',
    weakness: 'Lượng máu mỏng manh, rất sợ hiệu ứng làm chậm Băng Giá.',
    counterStrategy: 'Dùng Xạ Thủ Băng Giá ghìm chân rồi dồn hỏa lực.',
    extractedFormula: 'Gia tăng tốc độ phản xạ: +5%',
    isDiscovered: true
  },
  {
    id: 'path_armored',
    zombieId: 'zombie_armored_spore',
    name: 'Zombie Vảy Sừng Bào Tử',
    mutationTrait: 'Biến dị vỏ sừng sần sùi cản 50% sát thương đạn đậu vật lý.',
    weakness: 'Không có khả năng ngăn cản sóng âm bào tử tím.',
    counterStrategy: 'Bắt buộc sử dụng Nấm Phun Lớn để xuyên thủng giáp.',
    extractedFormula: 'Giải mã lớp sừng: Kháng vật lý toàn quân +10%',
    isDiscovered: false
  },
  {
    id: 'path_cat',
    zombieId: 'zombie_mutant_cat',
    name: 'Mèo Cam Biến Dị Khổng Lồ',
    mutationTrait: 'Động vật đột biến sở hữu Tinh Hạch Ma Thú trong tim.',
    weakness: 'Tập trung hỏa lực tầm gần và Bom Anh Đào khi nó vồ tới.',
    counterStrategy: 'Dùng Khiên Bí Ngô chặn trước và cho Súng Máy xả đạn.',
    extractedFormula: 'Chiết xuất Tinh Hạch: Cường hóa sinh lực +20%',
    isDiscovered: false
  },
  {
    id: 'path_lion_king',
    zombieId: 'zombie_boss_lion_king',
    name: 'Vua Sư Tử & Gargantuar',
    mutationTrait: 'Hệ thần kinh cộng sinh chỉ huy hàng vạn zombie qua sóng não.',
    weakness: 'Đòn nổ hạt nhân Nấm Hủy Diệt và đao pháp Đường Tướng Quân.',
    counterStrategy: 'Bảo vệ Đường Tướng Quân và canh thời điểm kích nổ Doom-shroom.',
    extractedFormula: 'Huyết Thanh Thanh Tẩy: Chữa khỏi 100% bệnh nan y',
    isDiscovered: false
  }
];

export const PVZ_LORE_CHAPTERS: PvzLoreChapter[] = [
  {
    id: 'pvz_lore_1',
    chapterNumber: 1,
    title: 'Chương 1: Kỷ Nguyên Vận Mệnh Quốc Gia',
    stageNumber: 1,
    isUnlocked: true,
    summary: 'Tuyết Mộc được chọn tham gia Vận Mệnh Quốc Gia, chọn nghề Nông Dân và kích hoạt Hệ Thống Sân Vườn Bác Sĩ Dave.',
    content: `Đại diện được chọn ngẫu nhiên trên toàn cầu để tham gia trò chơi vận mệnh quốc gia. Tuyết Mộc kích hoạt hệ thống sân vườn bác sĩ, triệu hồi quân đoàn thực vật quét sạch tận thế.

Tuyết Mộc vừa thu hoạch một đống hạt dưa và rau củ thì đột nhiên biến mất tại chỗ. Ngay sau đó, thông báo vang lên: Trò chơi vận mệnh quốc gia bắt đầu, liên quan trực tiếp đến số phận của toàn bộ cư dân Lam Tinh.

Tại phòng phát trực tiếp của Hoa Quốc với sự tham gia của 3 bình luận viên nổi tiếng (Hồ Ca, Lý Băng, MC Tiểu Thuyết), Tuyết Mộc bất ngờ chọn nghề Nông Dân trước sự ngỡ ngàng của người xem toàn cầu. Nhờ đó, anh kích hoạt trọn vẹn Hệ Thống "Sân Vườn Bác Sĩ Dave".

Nhận gói quà tân thủ với Hoa Hướng Dương và chiếc xẻng, Tuyết Mộc dùng xẻng tiêu diệt zombie phố đi bộ, thu thập ánh nắng và năng lượng, mở khóa thành công Đậu Pháo Liên Thanh!`
  },
  {
    id: 'pvz_lore_2',
    chapterNumber: 2,
    title: 'Chương 2: Cuộc Chiến Sinh Tồn',
    stageNumber: 2,
    isUnlocked: false,
    summary: 'Chiến thuật du kích đặt vườn 10m² thả diều zombie, tái chế xác và thăng cấp mang lại tuổi thọ cho toàn dân.',
    content: `Trò chơi vận mệnh quốc gia bộc lộ sự tàn khốc khi người chơi nước Anh tử trận khiến 0,001% dân số biến thành Zombie.

Tuyết Mộc bị hơn chục con zombie truy đuổi. Nhờ lời nhắc của Dave, anh thả mảnh đất 10m² ra giữa lòng đường, trồng Hoa Hướng Dương nhả mặt trời nhỏ và bố trí Đậu Pháo xả đạn nén cao áp cực mạnh bắn bay đầu Zombie.

Tuyết Mộc phát hiện tính năng tái chế xác Zombie thành năng lượng. Bằng chiến thuật du kích: thả vườn - xả đạn - thu hồi đất vườn chạy trốn để thả diều bầy zombie 200 con, Tuyết Mộc thăng cấp 2 đầu tiên trên thế giới, đem về phần thưởng tăng 1 tháng tuổi thọ và 1% kháng virus cho toàn bộ người dân Cửu Châu!`
  },
  {
    id: 'pvz_lore_3',
    chapterNumber: 3,
    title: 'Chương 3: Đồng Minh & Thế Lực',
    stageNumber: 3,
    isUnlocked: false,
    summary: 'Càn quét siêu thị, thu phục anh em Dương Siêu - Dung Mễ Nhi, chôn xác zombie mở Bia Mộ lập Vĩnh Hằng Gia Viên.',
    content: `Tiến sâu vào siêu thị tiện lợi, Tuyết Mộc chạm trán nhóm côn đồ cản đường. Trong thời thế tận thế không khoan nhượng, Tuyết Mộc hạ sát những kẻ hung hãn, chôn xác vào khu vườn và bất ngờ mở khóa tính năng Triệu Hồi Thây Ma Thường bằng ánh nắng.

Anh cứu thoát hai anh em Dương Siêu và Dung Mễ Nhi. Dương Siêu giỏi dẫn dụ quái bằng giọng hát, còn em gái Dung Mễ Nhi đảm nhận công việc nấu nướng dã chiến.

Tuyết Mộc thành lập thế lực "Vĩnh Hằng Gia Viên", nhận thưởng mở rộng thêm 25 km² lãnh thổ tự sinh ra cho Cửu Châu Quốc!`
  },
  {
    id: 'pvz_lore_4',
    chapterNumber: 4,
    title: 'Chương 4: Đụng Độ Quái Vật & Phe Phái',
    stageNumber: 4,
    isUnlocked: false,
    summary: 'Hầm tàu điện ngầm, gặp gỡ Đường Long (Đường Đao), đánh lui Yamamoto Sakura Quốc tại Đại học Nông Nghiệp.',
    content: `Đoàn người tiến vào ga tàu điện ngầm. Tuyết Mộc áp dụng đội hình tam giác cho Thây Ma tank sát thương, kết hợp Bom Anh Đào diệt gọn Zombie Sức Mạnh Cấp 2, nhận kỹ năng Khích Lệ Tinh Thần.

Tại đây, anh gặp Đường Long - truyền nhân Đường Đao đời thứ 28. Khi bạn gái Lưu Phi bị Zombie Tốc Độ cào trúng và biến đổi, Tuyết Mộc an táng cô trang trọng trong vườn. Đường Long thề theo Tuyết Mộc để trả thù.

Tiến về Đại học Nông Nghiệp, nhóm đối đầu với Yamamoto (đại diện Sakura Quốc) đang bóc lột sinh viên. Tuyết Mộc dùng biển thực vật áp đảo khiến Yamamoto tháo chạy, thu nạp toàn bộ nhóm sinh viên nông nghiệp vào Vĩnh Hằng Gia Viên.`
  },
  {
    id: 'pvz_lore_5',
    chapterNumber: 5,
    title: 'Chương 5: Thảm Họa Biến Dị & Tiến Hóa',
    stageNumber: 5,
    isUnlocked: false,
    summary: 'Zombie tiến hóa vảy sừng kháng đạn, sương độc bào tử. Hệ thống mở Phân Tích Bệnh Lý, Đậu Băng, Nấm Phun Lớn và Tinh Hạch Ma Thú.',
    content: `Virus Zombie tiến hóa đột biến: những con zombie mới sinh ra lớp vảy sừng cản 50% đạn đậu thường, kèm theo bào tử độc lây lan qua không khí.

Hệ thống Sân Vườn Bác Sĩ Dave mở khóa tính năng "Phân Tích Bệnh Lý", soi ra điểm yếu sinh lý của từng biến thể. 

Tuyết Mộc thay đổi chiến thuật: kết hợp Xạ Thủ Băng Giá (làm chậm), Nấm Phun Lớn (sóng bào tử xuyên giáp), và Nấm Mê Hoặc (thôi miên zombie cắn nhau). Đồng thời, anh săn lùng Mèo Cam Biến Dị Khổng Lồ để thu thập Tinh Hạch Ma Thú cường hóa toàn bộ quân đoàn.`
  },
  {
    id: 'pvz_lore_6',
    chapterNumber: 6,
    title: 'Chương 6: Vua Sư Tử & Đại Chiến Sân Vận Động',
    stageNumber: 6,
    isUnlocked: false,
    summary: 'Đại chiến hàng vạn Zombie tại Sân Vận Động. Đường Long biến đổi thành Đường Tướng Quân giáp xương, Nấm Hủy Diệt trảm sát Vua Sư Tử.',
    content: `Sân vận động Đại học Nông Nghiệp là sào huyệt của hàng vạn Zombie, thống trị bởi Boss Vua Sư Tử cưỡi trên vai Zombie Sức Mạnh Cấp 3 khổng lồ.

Vua Sư Tử phát động tổng tấn công. Tuyết Mộc dốc toàn lực: Hạt Dẻ Tường, Xạ Thủ Súng Máy 4 nòng, Xạ Thủ Băng Giá, Võ Vương Thây Ma Disco và Xe Trượt Tuyết.

Trong trận chiến ác liệt, Đường Long liều mình chắn đòn cho Tuyết Mộc. Trong cơn nguy kịch, Tuyết Mộc dùng Viện Nghiên Cứu Virus dung hợp chuỗi gen, biến Đường Long thành "Đường Tướng Quân" - Anh Hùng Thây Ma có ý thức mặc giáp xương bất hoại!

Cùng với Đường Tướng Quân và đòn nổ hạt nhân của Nấm Hủy Diệt (Doom-shroom), Tuyết Mộc xóa sổ sào huyệt và chặt đầu Vua Sư Tử!`
  },
  {
    id: 'pvz_lore_7',
    chapterNumber: 7,
    title: 'Chương 7: Cứu Rỗi Quốc Gia & Chiến Trường Quốc Vận',
    stageNumber: 7,
    isUnlocked: false,
    summary: 'Chiết xuất Huyết Thanh Thanh Tẩy cứu người dân, thắp sáng Hoa Đèn Đường trên Đảo Giữa Hồ, sẵn sàng cho Chiến Trường Quốc Vận 30 ngày.',
    content: `Chiến thắng rực rỡ mang lại kho năng lượng khổng lồ. Tuyết Mộc giải mã chuỗi virus từ Vua Sư Tử, chiết xuất ra "Huyết Thanh Thanh Tẩy". Công nghệ này được truyền về hiện thực, giúp Hoa Quốc chữa khỏi vô số bệnh nan y và xác lập vị thế thống trị toàn cầu.

Tuyết Mộc đứng trên căn cứ Đảo Giữa Hồ rực sáng bởi Hoa Đèn Đường, bên cạnh là Đường Tướng Quân và những đồng đội trung thành. 

Chiến Trường Quốc Vận Đa Quốc Gia trong 30 ngày tới chính thức mở ra. Với Vĩnh Hằng Gia Viên vững như bàn thạch, Tuyết Mộc đã sẵn sàng dẫn dắt Cửu Châu đăng quang ngôi vị Bá Chủ Vận Mệnh Toàn Cầu!`
  }
];

export const PVZ_STORY_EVENTS: StoryEvent[] = [
  {
    id: 'story_wave1_start',
    waveIndex: 0,
    trigger: 'wave_start',
    speaker: 'Bác Sĩ Dave (Mũ Nồi)',
    speakerRole: 'Nhà Hướng Dẫn Hệ Thống',
    avatar: '👨‍🌾🎩',
    title: 'KÍCH HOẠT SÂN VƯỜN BÁC SĨ DAVE & NGHỀ NÔNG DÂN',
    subtitle: 'Hết 70 phút dừng thời gian - Đợt zombie đầu tiên bắt đầu di chuyển!',
    badge: 'CHƯƠNG 1: KHỞI ĐẦU',
    dialogue: [
      'Tuyết Mộc: "70 phút dừng thời gian kết thúc rồi! Đám Zombie xung quanh bắt đầu cử động, đang lao về phía cổng công viên!"',
      'Bác Sĩ Dave: "🎩 Wabby Wabbo! Ngươi đã chọn nghề Nông Dân và kích hoạt hệ thống của ta! Mau mở ba lô lấy Chiếc Xẻng Sắt và thẻ Hạt Giống Hoa Hướng Dương!"',
      'Bác Sĩ Dave: "Hãy dùng Xẻng đập tan đầu 9-10 con Zombie để gom đủ 50 Ánh Nắng và 10 Năng Lượng mở khóa Đậu Pháo Liên Thanh!"',
      'Tuyết Mộc: "Hiểu rồi! Triển khai khu đất 10m² của Sân Vườn, trồng ngay Hoa Hướng Dương nhả mặt trời nhỏ giữ vững phòng tuyến!"'
    ],
    systemNotice: '⚡ MẸO: Trồng Hoa Hướng Dương sản xuất Ánh Nắng, dùng Đậu Pháo bắn nát Zombie!',
    soundEffect: 'dialogue',
    portraitBorderColor: 'border-emerald-400'
  },
  {
    id: 'story_wave1_clear',
    waveIndex: 0,
    trigger: 'wave_clear',
    speaker: 'Thông Báo Toàn Cầu & MC Cửu Châu',
    speakerRole: 'Kênh Trực Tiếp Vận Mệnh',
    avatar: '🌍📡',
    title: 'NGƯỜI CHƠI NƯỚC ANH TỬ TRẬN - TUYẾT MỘC ĐẠT CẤP 2',
    subtitle: 'Thế giới chấn động trước sức mạnh của quân đoàn thực vật',
    badge: 'QUỐC VẬN BÙNG NỔ',
    dialogue: [
      'Thông Báo Toàn Cầu: "⚠️ CẢNH BÁO: Tuyển thủ nước Anh bị Zombie bao vây tử trận! Hình phạt: 0.001% dân số quốc gia biến thành Zombie!"',
      'MC Hồ Ca: "Thật tàn khốc! Nhưng nhìn sang phòng phát sóng Tuyết Mộc: Cậu ấy áp dụng chiến thuật du kích vừa trồng vừa thu hồi đất, tiêu diệt toàn bộ zombie!"',
      'Thông Báo Toàn Cầu: "🌟 Chúc mừng Tuyết Mộc (Cửu Châu) dẫn đầu thế giới đạt CẤP 2! Phần thưởng: Tuổi thọ trung bình toàn dân +1 tháng, kháng virus +1%!"'
    ],
    systemNotice: '🏆 Toàn dân Cửu Châu nhận buff quốc vận! Cửa hàng Dave mở thêm nâng cấp mới!',
    soundEffect: 'level_up',
    portraitBorderColor: 'border-amber-400'
  },
  {
    id: 'story_wave2_start',
    waveIndex: 1,
    trigger: 'wave_start',
    speaker: 'Tên Cầm Đầu Băng Côn Đồ',
    speakerRole: 'Kẻ Cướp Tận Thế',
    avatar: '🦹‍♂️',
    title: 'ĐỘT KÍCH SIÊU THỊ & CẢN ĐƯỜNG BỞI CÔN ĐỒ',
    subtitle: 'Zombie Tiến Hóa xuất hiện cùng hiểm họa lòng người',
    badge: 'CHƯƠNG 2: ĐỒNG MINH',
    dialogue: [
      'Tuyết Mộc: "Trước cửa siêu thị tập trung nhiều Zombie Tiến Hóa có tốc độ chạy cực nhanh và hung hãn hơn hẳn."',
      'Tên Cầm Đầu Côn Đồ: "Thằng ranh! Mau giao toàn bộ đồ ăn, hạt giống và mảnh đất kỳ lạ kia ra đây, nếu không tao cho mày bốc hơi!"',
      'Tuyết Mộc: "Trong thời tận thế, luật pháp vô hiệu nhưng kẻ uy hiếp ta đều chỉ có một kết cục... Đậu Pháo, tập trung hỏa lực BẮN!"'
    ],
    systemNotice: '⚔️ Tiêu diệt đám quái vật và dẹp yên bọn cướp bóc để giải cứu người sống sót bên trong siêu thị!',
    soundEffect: 'danger',
    portraitBorderColor: 'border-rose-500'
  },
  {
    id: 'story_wave2_clear',
    waveIndex: 1,
    trigger: 'wave_clear',
    speaker: 'Anh Em Dương Siêu & Dung Mễ Nhi',
    speakerRole: 'Đồng Đội Vĩnh Hằng Gia Viên',
    avatar: '🏃‍♂️👩‍🍳',
    title: 'THÀNH LẬP THẾ LỰC "VĨNH HẰNG GIA VIÊN"',
    subtitle: 'Giải cứu thành công 2 đồng đội & mở rộng lãnh thổ quốc gia',
    badge: 'GIA NHẬP ĐỒNG MINH',
    dialogue: [
      'Dương Siêu: "Đa tạ anh Tuyết đã cứu mạng! Tôi có kỹ năng chạy nhanh và bài hát gia truyền dẫn dụ quái vật rất cừ, xin được theo anh cống hiến!"',
      'Dung Mễ Nhi: "Em giỏi nấu nướng và kiểm kê đồ ăn vặt siêu thị, sẽ lo toàn bộ khẩu phần năng lượng cho đội!"',
      'Tuyết Mộc: "Hoan nghênh hai người. Từ hôm nay chúng ta thành lập thế lực [Vĩnh Hằng Gia Viên]! Mở rộng thêm 25 km² lãnh thổ quốc gia!"'
    ],
    systemNotice: '🤝 Dương Siêu & Dung Mễ Nhi đã kích hoạt hỗ trợ chiến đấu trong bảng Đồng Đội!',
    soundEffect: 'victory',
    portraitBorderColor: 'border-teal-400'
  },
  {
    id: 'story_wave3_start',
    waveIndex: 2,
    trigger: 'wave_start',
    speaker: 'Đường Long (Đường Đao)',
    speakerRole: 'Truyền Nhân Đời Thứ 28',
    avatar: '🗡️',
    title: 'GA TÀU ĐIỆN NGẦM & CAO THỦ ĐƯỜNG ĐAO',
    subtitle: 'Chạm trán Zombie Sức Mạnh Cấp 2 và bầy quái thể lực cao',
    badge: 'CHƯƠNG 3: HUYẾT CHIẾN',
    dialogue: [
      'Đường Long: "Tại hạ là Đường Long, truyền nhân Đường Đao đời 28! Hầm ga tàu điện ngầm này có con Zombie Sức Mạnh Cấp 2 dùng xác đồng loại làm vũ khí!"',
      'Tuyết Mộc: "Đường huynh cẩn thận! Hãy phối hợp cùng ta: Hàng trước dùng Thây Ma và Hạt Dẻ đỡ đòn, hàng sau dùng Xạ Thủ Băng Giá làm chậm và Bom Anh Đào dội pháo!"',
      'Đường Long: "Hay cho trận hình thực vật biến hóa khôn lường! Thanh đao này xin nguyện chém đứt móng vuốt quân thù!"'
    ],
    systemNotice: '❄️ Sử dụng Xạ Thủ Băng Giá để kìm chân Zombie Cầm Côn và Quái Thể Lực!',
    soundEffect: 'danger',
    portraitBorderColor: 'border-cyan-400'
  },
  {
    id: 'story_wave3_clear',
    waveIndex: 2,
    trigger: 'wave_clear',
    speaker: 'Đường Long',
    speakerRole: 'Đao Khách Thề Ước',
    avatar: '🗡️🥀',
    title: 'NỖI ĐAU MẤT MÁT & LỜI THỀ ĐƯỜNG ĐAO',
    subtitle: 'Lưu Phi biến đổi - Tuyết Mộc an táng trong khu vườn',
    badge: 'LỜI THỀ TỬ CHIẾN',
    dialogue: [
      'Đường Long: "Không... Phi Phi! Nàng bị Zombie Tốc Độ cào trúng rồi... Ta không bảo vệ được nàng..."',
      'Tuyết Mộc: "Đừng đau buồn quá, hãy để cô ấy an nghỉ trong khu vườn của ta, linh hồn sẽ hòa vào đất đai vĩnh hằng."',
      'Đường Long: "Ân tình của Tuyết huynh cao tựa núi! Từ nay Đường Long này đem tính mạng và thanh Đường Đao thề bảo vệ Vĩnh Hằng Gia Viên đến cùng!"'
    ],
    systemNotice: '⚔️ Đường Long (Đường Đao) chính thức mở khóa và gia nhập hàng ngũ Đồng Đội!',
    soundEffect: 'item_get',
    portraitBorderColor: 'border-indigo-400'
  },
  {
    id: 'story_wave4_start',
    waveIndex: 3,
    trigger: 'wave_start',
    speaker: 'Yamamoto (Sakura Quốc)',
    speakerRole: 'Đối Thủ Sakura Quốc',
    avatar: '🥷👺',
    title: 'ĐẠI HỌC NÔNG NGHIỆP: ĐỤNG ĐỘ YAMAMOTO',
    subtitle: 'Đại diện Sakura Quốc bắt bớ sinh viên làm nô lệ',
    badge: 'CHƯƠNG 4: TRANH ĐOẠT',
    dialogue: [
      'Yamamoto: "Ha ha ha! Tuyết Mộc Cửu Châu! Toàn bộ kho giống quý giá và lũ sinh viên Đại học Nông Nghiệp này phải thuộc về Sakura Quốc ta!"',
      'Đại Diện Sinh Viên: "Cứu chúng em với anh Tuyết! Hắn ép chúng em lao vào bầy Zombie nhặt đồ cho hắn!"',
      'Tuyết Mộc: "Tên tiểu nhân đê hèn! Dám ức hiếp sinh viên của Cửu Châu, hôm nay ngươi không có đường lui đâu!"'
    ],
    systemNotice: '💥 Đánh bại Yamamoto và bầy Zombie hộ vệ để giải phóng toàn bộ sinh viên nông nghiệp!',
    soundEffect: 'danger',
    portraitBorderColor: 'border-red-600'
  },
  {
    id: 'story_wave4_clear',
    waveIndex: 3,
    trigger: 'wave_clear',
    speaker: 'Nhóm Sinh Viên & Thầy Lý Băng',
    speakerRole: 'Nghiên Cứu Lai Tạo Gen',
    avatar: '🔬👨‍💼',
    title: 'YAMAMOTO THÁO CHẠY - TIẾP NHẬN PHÒNG THÍ NGHIỆM GEN',
    subtitle: 'Đại diện Sakura Quốc thất bại thảm hại - Mở khóa Nấm Phun Lớn',
    badge: 'THU PHỤC TRÍ THỨC',
    dialogue: [
      'Yamamoto: "Khốn kiếp... Thực vật của hắn quá đông, đạn bắn rụng cả kiếm đạo của ta! Rút quân mau!"',
      'Trưởng Nhóm Sinh Viên: "Cảm ơn anh Tuyết Mộc! Chúng em sẽ phụ trách phòng thí nghiệm di truyền, lai tạo giống cây mới và giải mã độc tính!"',
      'Thầy Lý Băng: "Cửu Châu kiểm soát hoàn toàn Đại học Nông Nghiệp, tiềm lực khoa học kỹ thuật sinh học vươn lên tầm cao mới!"'
    ],
    systemNotice: '🧬 Nhóm Sinh Viên Nông Nghiệp gia nhập! Giảm 25% thời gian hồi giống cây cao cấp!',
    soundEffect: 'level_up',
    portraitBorderColor: 'border-fuchsia-400'
  },
  {
    id: 'story_wave5_start',
    waveIndex: 4,
    trigger: 'wave_start',
    speaker: 'Bác Sĩ Dave & Hệ Thống Sân Vườn',
    speakerRole: 'Cảnh Báo Đột Biến Gen',
    avatar: '⚠️☣️',
    title: 'CẢNH BÁO: VIRUS TIẾN HÓA - VẢY SỪNG KHÁNG ĐẠN',
    subtitle: 'Zombie mọc vảy sừng cản đạn đậu & Mèo Cam Biến Dị khổng lồ',
    badge: 'CHƯƠNG 5: BIẾN DỊ',
    dialogue: [
      'Bác Sĩ Dave: "🎩 Wabby Wabbo! Cực kỳ nguy hiểm! Do ngươi xả đạn Đậu Pháo quá nhiều, chủng virus Zombie đã tiến hóa sinh ra vảy sừng kháng 50% sát thương đạn đậu!"',
      'Hệ Thống Sân Vườn: "Kích hoạt mô-đun [Phân Tích Bệnh Lý]! Khuyên dùng: Nấm Phun Lớn (sóng bào tử tím bắn xuyên thấu phá giáp) và Nấm Mê Hoặc (thôi miên quái vật cắn nhau)!"',
      'Tuyết Mộc: "Cả những con Mèo Cam Biến Dị cũng xuất hiện! Tiêu diệt chúng để đoạt lấy TINH HẠCH MA THÚ nâng cấp viện nghiên cứu!"'
    ],
    systemNotice: '🔮 Mở khóa hệ thống Tinh Hạch Ma Thú & Phân Tích Bệnh Lý Virus trong Menu HUD!',
    soundEffect: 'danger',
    portraitBorderColor: 'border-purple-500'
  },
  {
    id: 'story_wave6_start',
    waveIndex: 5,
    trigger: 'wave_start',
    speaker: 'Boss Vua Sư Tử',
    speakerRole: 'Thống Lĩnh Hàng Vạn Zombie',
    avatar: '🦁👹',
    title: 'HUYẾT CHIẾN SÂN VẬN ĐỘNG: VUA SƯ TỬ XUẤT TRẬN',
    subtitle: 'Vua Sư Tử cưỡi Zombie Sức Mạnh Cấp 3 khổng lồ phát động tổng công kích',
    badge: 'CHƯƠNG 6: TRÙM CUỐI SÂN VẬN ĐỘNG',
    dialogue: [
      'Vua Sư Tử: "ROAAAR! Ta là Thống Lĩnh Vạn Quỷ Sân Vận Động! Toàn bộ lũ người phàm và mảnh đất rau cỏ của ngươi sẽ bị giẫm nát dưới chân ta!"',
      'Đường Long: "Tuyết huynh lùi lại! Nó cưỡi trên vai con Zombie Khổng Lồ Cấp 3! Để tôi cầm đao mở đường!"',
      'Tuyết Mộc: "Đường huynh coi chừng! Toàn bộ Xạ Thủ Súng Máy, Xạ Thủ Băng Giá, Nấm Hủy Diệt... TỔNG LỰC HỎA LỰC BẮN!"'
    ],
    systemNotice: '🔥 Sử dụng Nấm Hủy Diệt (Doom-shroom) để kích hoạt vụ nổ hạt nhân quét sạch bầy zombie!',
    soundEffect: 'danger',
    portraitBorderColor: 'border-amber-600'
  },
  {
    id: 'story_wave6_clear',
    waveIndex: 5,
    trigger: 'wave_clear',
    speaker: 'Đường Tướng Quân (Hồi Sinh Giáp Xương)',
    speakerRole: 'Anh Hùng Thây Ma Bất Diệt',
    avatar: '💀⚔️',
    title: 'ĐƯỜNG LONG HI SINH & ĐƯỜNG TƯỚNG QUÂN THỨC TỈNH',
    subtitle: 'Dung hợp virus thành công - Trảm sát Vua Sư Tử',
    badge: 'ANH HÙNG THÂY MA',
    dialogue: [
      'Tuyết Mộc: "Đường Long! Anh ấy đã liều mình đỡ đòn chí mạng cho ta... Không thể để anh ấy chết! Ta sẽ dùng Viện Nghiên Cứu Y Sinh dung hợp chuỗi gen virus!"',
      'Đường Tướng Quân (Thức Tỉnh): "...Ý thức của ta vẫn còn! Dù thân xác hóa thành Thây Ma Giáp Xương, linh hồn ta vẫn mãi là thanh kiếm bảo vệ Cửu Châu và Vĩnh Hằng Gia Viên!"',
      'MC Hồ Ca: "Kỳ tích không tưởng! Đại diện Cửu Châu đã tạo ra Anh Hùng Thây Ma có ý thức độc lập và chặt đầu Vua Sư Tử, chiết xuất thành công Huyết Thanh Thanh Tẩy!"'
    ],
    systemNotice: '👑 Đường Tướng Quân (Hero Thây Ma Cấp 5) đã thức tỉnh toàn bộ sức mạnh!',
    soundEffect: 'level_up',
    portraitBorderColor: 'border-yellow-400'
  },
  {
    id: 'story_wave7_start',
    waveIndex: 6,
    trigger: 'wave_start',
    speaker: 'Tuyết Mộc & Đường Tướng Quân',
    speakerRole: 'Chỉ Huy Vĩnh Hằng Gia Viên',
    avatar: '👑🌱',
    title: 'CHUNG KẾT VẬN MỆNH QUỐC GIA: ĐẢO GIỮA HỒ',
    subtitle: 'Thắp sáng Hoa Đèn Đường - Quyết chiến bảo vệ ngôi vị Bá Chủ Toàn Cầu',
    badge: 'CHƯƠNG 7: ĐĂNG QUANG',
    dialogue: [
      'Tuyết Mộc: "30 ngày bảo hộ sắp trôi qua, căn cứ Đảo Giữa Hồ rực sáng bởi Hoa Đèn Đường. Làn sóng Zombie tối thượng và chúa tể EX đang ập tới!"',
      'Đường Tướng Quân: "Mạt tướng Đường Long cùng toàn thể quân đoàn Thực Vật thề tử chiến đến giọt năng lượng cuối cùng!"',
      'Thông Báo Toàn Cầu: "Trận chiến chung kết quyết định vận mệnh tồn vong và địa vị số 1 thế giới của Cửu Châu Quốc... CHÍNH THỨC BẮT ĐẦU!"'
    ],
    systemNotice: '🌟 Trận chiến vĩ đại nhất! Dùng toàn bộ kho vũ khí và đồng đội để giành chiến thắng tối thượng!',
    soundEffect: 'victory',
    portraitBorderColor: 'border-emerald-300'
  }
];
