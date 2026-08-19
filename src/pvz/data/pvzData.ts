import { PlantData, ZombieData, PvzWave, LiveComment } from '../types';

export const PVZ_PLANTS: PlantData[] = [
  {
    id: 'plant_sunflower',
    name: 'Hoa Hướng Dương',
    sunCost: 50,
    cooldownSec: 4,
    maxHp: 300,
    attackDmg: 0,
    attackIntervalSec: 6,
    icon: '🌻',
    description: 'Sản xuất +25 Ánh Nắng mỗi 6 giây để duy trì hỏa lực toàn đội.',
    color: 'border-amber-400 bg-amber-950/40 text-amber-300'
  },
  {
    id: 'plant_peashooter',
    name: 'Đậu Pháo Liên Thanh',
    sunCost: 100,
    cooldownSec: 5,
    maxHp: 300,
    attackDmg: 25,
    attackIntervalSec: 1.5,
    icon: '🟢',
    description: 'Bắn viên đậu nén cao áp liên tục về phía trước khi có zombie.',
    color: 'border-emerald-400 bg-emerald-950/40 text-emerald-300'
  },
  {
    id: 'plant_pumpkin',
    name: 'Khiên Bí Ngô',
    sunCost: 125,
    cooldownSec: 8,
    maxHp: 800,
    attackDmg: 0,
    attackIntervalSec: 0,
    icon: '🎃',
    description: 'Vỏ bí ngô kim cương che chở thực vật, chịu đòn cực trâu bò.',
    color: 'border-orange-400 bg-orange-950/40 text-orange-300'
  },
  {
    id: 'plant_cherry_bomb',
    name: 'Bom Anh Đào Cảm Ứng',
    sunCost: 150,
    cooldownSec: 12,
    maxHp: 100,
    attackDmg: 350,
    attackIntervalSec: 1,
    icon: '🍒',
    description: 'Nổ tung sau 1 giây trồng, tiêu diệt toàn bộ zombie trên hàng và xung quanh.',
    color: 'border-rose-400 bg-rose-950/40 text-rose-300'
  },
  {
    id: 'plant_zombie_wall',
    name: 'Thây Ma Chướng Ngại',
    sunCost: 100,
    cooldownSec: 6,
    maxHp: 650,
    attackDmg: 15,
    attackIntervalSec: 2,
    icon: '🧟‍♂️',
    description: 'Thây ma cầm xẻng thu phục bởi Tuyết Mộc, dùng thân mình chặn và cào zombie địch.',
    color: 'border-purple-400 bg-purple-950/40 text-purple-300'
  },
  {
    id: 'plant_tallnut',
    name: 'Gà Gan Chua Bất Hoại',
    sunCost: 175,
    cooldownSec: 15,
    maxHp: 1600,
    attackDmg: 0,
    attackIntervalSec: 0,
    icon: '🗿',
    description: 'Tượng đá linh hồn khổng lồ, chặn đứng mọi đợt xung kích điên cuồng của Boss.',
    color: 'border-yellow-400 bg-yellow-950/40 text-yellow-300'
  }
];

export const PVZ_ZOMBIES: Record<string, ZombieData> = {
  zombie_normal: {
    id: 'zombie_normal',
    name: 'Zombie Phố Đi Bộ',
    title: 'Thây Ma Cơ Bản',
    maxHp: 100,
    speed: 0.18, // units per sec
    attackDmg: 20,
    attackIntervalSec: 1.2,
    icon: '🧟',
    rewardSun: 15,
    rewardEnergy: 2,
    description: 'Zombie chậm chạp lang thang trên đường phố.'
  },
  zombie_fast: {
    id: 'zombie_fast',
    name: 'Zombie Tốc Độ Cấp 1',
    title: 'Thích Khách Quần Thể',
    maxHp: 75,
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
    maxHp: 160,
    speed: 0.45,
    attackDmg: 45,
    attackIntervalSec: 0.8,
    icon: '⚡',
    rewardSun: 45,
    rewardEnergy: 12,
    description: 'Móng vuốt sắt bén né đòn và chém nát thực vật.'
  },
  zombie_strong_2: {
    id: 'zombie_strong_2',
    name: 'Zombie Sức Mạnh Cấp 2',
    title: 'Thống Lĩnh Đập Phá',
    maxHp: 550,
    speed: 0.16,
    attackDmg: 75,
    attackIntervalSec: 1.5,
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
    maxHp: 140,
    speed: 0.22,
    attackDmg: 30,
    attackIntervalSec: 1.0,
    icon: '🚩',
    rewardSun: 30,
    rewardEnergy: 6,
    description: 'Dẫn đầu làn sóng zombie ồ ạt tràn vào.'
  },
  zombie_boss_gargantuar: {
    id: 'zombie_boss_gargantuar',
    name: 'Gargantuar Chúa Tể Đa Vũ Trụ',
    title: 'Trùm Cuối Vận Mệnh Quốc Gia',
    maxHp: 1500,
    speed: 0.12,
    attackDmg: 120,
    attackIntervalSec: 2.0,
    icon: '👑',
    rewardSun: 200,
    rewardEnergy: 100,
    description: 'Thực thể khổng lồ mang cột điện đập nát mọi chướng ngại vật.',
    isBoss: true
  }
};

export const PVZ_WAVES: PvzWave[] = [
  {
    waveNumber: 1,
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
      statBonusPct: 3
    }
  },
  {
    waveNumber: 2,
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
      title: 'TĂNG LÃNH THỔ 10 KM²',
      description: 'Thành lập thế lực Vĩnh Hằng Gia Viên! Lãnh thổ Cửu Châu tăng 10 km² từ hư không!',
      territoryBonusKm2: 25,
      statBonusPct: 5
    }
  },
  {
    waveNumber: 3,
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
      title: 'TOÀN DÂN TĂNG 5% SỨC MẠNH',
      description: 'Hạ gục Zombie Sức Mạnh Cấp 2! Nhận kỹ năng khích lệ tinh thần và tăng 5% sức mạnh toàn dân!',
      territoryBonusKm2: 50,
      statBonusPct: 8
    }
  },
  {
    waveNumber: 4,
    name: 'Vòng 4: Đại Đột Kích Ga Khu Đại Học Lương Tử Hồ',
    stageName: 'Trường Đại Học & Đảo Giữa Hồ',
    description: 'Đại quân zombie hơn trăm con ùn ùn kéo đến theo tiếng hát dẫn dụ. Triệu hồi Thây Ma và Bom Anh Đào!',
    zombieSpawns: [
      { zombieId: 'zombie_flag', delaySec: 2 },
      { zombieId: 'zombie_fast_2', delaySec: 5 },
      { zombieId: 'zombie_strong_1', delaySec: 8 },
      { zombieId: 'zombie_fast_2', delaySec: 12 },
      { zombieId: 'zombie_strong_2', delaySec: 16 },
      { zombieId: 'zombie_normal', delaySec: 19 },
      { zombieId: 'zombie_strong_2', delaySec: 23 },
      { zombieId: 'zombie_fast_2', delaySec: 27 }
    ],
    nationalReward: {
      title: 'VŨ KHÍ SINH HỌC BIÊN GIỚI',
      description: 'Mọc lên 10 cây Đậu Pháo Cỡ Đại trấn giữ biên giới quốc gia, đẩy lùi mọi thế lực ngoại bang!',
      territoryBonusKm2: 100,
      statBonusPct: 12
    }
  },
  {
    waveNumber: 5,
    name: 'Vòng 5: Chung Kết Quốc Vận & Trảm Sát Gargantuar',
    stageName: 'Đấu Trường Đa Vũ Trụ Chi Vương',
    description: 'Trùm Cuối Gargantuar Cấp EX giáng thế với cây cột điện khổng lồ. Vận mệnh 10 tỷ người phụ thuộc vào bạn!',
    zombieSpawns: [
      { zombieId: 'zombie_flag', delaySec: 2 },
      { zombieId: 'zombie_strong_2', delaySec: 6 },
      { zombieId: 'zombie_fast_2', delaySec: 10 },
      { zombieId: 'zombie_boss_gargantuar', delaySec: 14 },
      { zombieId: 'zombie_strong_2', delaySec: 20 },
      { zombieId: 'zombie_fast_2', delaySec: 25 }
    ],
    nationalReward: {
      title: 'ĐĂNG QUANG BÁ CHỦ VẬN MỆNH QUỐC GIA',
      description: 'Tuyết Mộc hoàn thành chiến dịch quốc vận! Cửu Châu xưng bá toàn cầu, toàn dân bất tử miễn dịch zombie!',
      territoryBonusKm2: 500,
      statBonusPct: 25
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
    text: 'Chiến thuật bắn đồng loạt của Đậu Pháo quá chuẩn xác! Tập trung hỏa lực tối đa tránh lãng phí đạn!'
  },
  {
    id: 'c3',
    author: 'MC Tiểu Thuyết',
    role: 'caster',
    avatar: '🎤',
    badge: 'MC Quốc Gia',
    text: 'Không thể tin được! Cây thực vật này có thể hạ gục Zombie chỉ sau 3 viên đậu nén!'
  },
  {
    id: 'c4',
    author: 'Khán Giả Hoa Quốc #882',
    role: 'viewer',
    avatar: '🔥',
    text: 'Nông dân đúng là nghề bá đạo nhất quả đất! Mấy đứa nước ngoài ban đầu chê cười giờ câm nín hết rồi haha!'
  },
  {
    id: 'c5',
    author: 'Cư Dân Mạng Quốc Tế',
    role: 'viewer',
    avatar: '🌐',
    text: 'Tại sao tuyển thủ nước chúng tôi không chọn nghề Nông Dân chứ? Cây Đậu Pháo kia bắn uy lực hơn cả súng ngắn!'
  },
  {
    id: 'c6',
    author: 'Thầy Lý Băng',
    role: 'caster',
    avatar: '👨‍💼',
    badge: 'Chuyên Gia Quân Sự',
    text: 'Đội hình 3 Thây Ma đi trước tank sát thương, Đậu Pháo ở sau xả đạn - Đây chính là đội hình tam giác bất bại!'
  }
];

export const PVZ_COMPANIONS = [
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
    dialogue: 'Anh Tuyết cứ yên tâm! Việc dẫn dụ zombie này là sở trường của tôi, chạy một vòng là gom đủ cả bầy!'
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
    dialogue: 'Anh Tuyết và anh hai cứ tập trung chiến đấu, việc nấu nướng và dọn dẹp em lo hết ạ!'
  },
  {
    id: 'comp_duong_long',
    name: 'Đường Long',
    title: 'Truyền Nhân Đường Đao Đời Thứ 28',
    avatar: '🗡️',
    role: 'Đao Khách Cận Chiến',
    level: 2,
    loyalty: 95,
    specialSkill: 'Đường Đao Trảm Phong',
    skillDesc: 'Vung Đường Đao chém đứt móng vuốt và đầu Zombie Tốc Độ Cấp 2 chỉ trong 1 chiêu.',
    isUnlocked: false,
    dialogue: 'Tại hạ Đường Long, thề dùng thanh Đường Đao này đi theo Tiên Bối Tuyết Mộc trảm sát vạn quỷ!'
  }
];

export const PVZ_DAVE_UPGRADES = [
  {
    id: 'up_corn_bread',
    name: 'Bánh Ngô Thần Kỳ Bác Sĩ Đép',
    costEnergy: 80,
    icon: '🌽',
    level: 0,
    maxLevel: 1,
    description: 'Vật phẩm tối cao của Bác Sĩ Đép, mở khóa toàn bộ chức năng ẩn và bảng chỉ số trung thành.',
    effect: 'Mở khóa chức năng Bác Sĩ Đép Vô Hạn',
    isUnlocked: false
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
    isUnlocked: true
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
    isUnlocked: true
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
    isUnlocked: true
  }
];

export const PVZ_TACTICS = [
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
  }
];

export const PVZ_LORE_CHAPTERS = [
  {
    id: 'pvz_lore_1',
    title: 'Chương 1: Khởi Đầu Nông Dân & Hệ Thống Sân Vườn Đép',
    stageNumber: 1,
    isUnlocked: true,
    content: `Tất cả cư dân Lam Tinh chú ý! Trò chơi Vận Mệnh Quốc Gia bắt đầu. 

Tuyết Mộc vừa mua đống hạt dưa ở siêu thị liền bị đưa vào dị giới đầy zombie. Với 70 phút bảo vệ dừng thời gian, anh chọn nghề Nông Dân trước sự ngơ ngác của 3 bình luận viên Hồ Ca, Lý Băng và MC Tiểu Thuyết. 

Dùng xẻng hạ zombie đầu tiên, anh kích hoạt Sân Vườn Bác Sĩ Đép, ném hạt giống trồng Hoa Hướng Dương nhả mặt trời nhỏ và mở khóa Đậu Pháo liên thanh dọn sạch công viên.`
  },
  {
    id: 'pvz_lore_2',
    title: 'Chương 2: Càn Quét Siêu Thị & Thu Phục Anh Em Dương Siêu',
    stageNumber: 2,
    isUnlocked: false,
    content: `Tuyết Mộc dẫn dụ bầy zombie 200 con bằng chiến thuật bắn đồng loạt và thả diều pháo đài di động. 

Tại siêu thị, anh trảm sát tên đầu gấu Cường đang chiếm giữ vật tư, chôn xác vào vườn mọc lên Bia Mộ Thây Ma. Dương Siêu và em gái Dung Mễ Nhi sau bài kiểm tra tư tưởng đã nguyện trung thành theo Tuyết Mộc, lập nên thế lực "Vĩnh Hằng Gia Viên", đem về 10 km² đất thưởng cho quốc gia.`
  },
  {
    id: 'pvz_lore_3',
    title: 'Chương 3: Hầm Tàu Điện Ngầm & Gặp Gỡ Đường Long',
    stageNumber: 3,
    isUnlocked: false,
    content: `Đoàn người ngồi trên ván gỗ do 4 Thây Ma khiêng tiến vào đường hầm tàu điện ngầm. 

Tại đây, Tuyết Mộc chạm trán Đường Long (truyền nhân Đường Đao đời thứ 28) và Lưu Phi. Khi Zombie Tốc Độ Cấp 2 xuất hiện cào trúng Lưu Phi, cô biến dị và được an táng trang trọng trong vườn. Đường Long thề nguyện trung thành dùng đao mở đường tiến về khu đại học Lương Tử Hồ.`
  },
  {
    id: 'pvz_lore_4',
    title: 'Chương 4: Đại Chiến Ga Khu Đại Học Lương Tử Hồ',
    stageNumber: 4,
    isUnlocked: false,
    content: `Dương Siêu cất tiếng hát bài "Dám Hỏi Đường Ở Nơi Đâu" dẫn dụ hàng trăm zombie quanh nhà ga. 

Tuyết Mộc kích hoạt Bom Anh Đào nổ tung cánh tay Zombie Sức Mạnh Cấp 2, đồng thời triển khai đội quân 40 Thây Ma cầm xẻng xếp trận tam giác quét sạch toàn bộ sảnh ga, thăng cấp 4 và tặng toàn dân 5% sức mạnh đoàn kết.`
  },
  {
    id: 'pvz_lore_5',
    title: 'Chương 5: Đảo Giữa Hồ & Chung Kết Vận Mệnh Quốc Gia',
    stageNumber: 5,
    isUnlocked: false,
    content: `Chiếm cứ hòn đảo giữa Lương Tử Hồ làm căn cứ địa vững như bàn thạch, Tuyết Mộc nâng cấp Đậu Pháo Cỡ Đại, mua Bánh Ngô Đép mở khóa toàn bộ kho tàng vũ khí sinh học. 

Trong trận quyết chiến với Trùm Cuối Gargantuar Cấp EX, quân đoàn thực vật kết hợp cùng Đường Long chém hạ Ma Thần, đưa Cửu Châu đăng quang ngôi vị Bá Chủ Vận Mệnh Toàn Cầu!`
  }
];

