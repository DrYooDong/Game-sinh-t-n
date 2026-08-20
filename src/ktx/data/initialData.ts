import {
  Skill,
  Item,
  StagePhase,
  LocationArea,
  Enemy,
  Survivor,
  Quest,
  MarketOffer,
  BaseFacility,
  PetCompanion,
  TalentNode,
  BestiaryEntry,
  WorldLoreChapter,
  RoomTenant,
  LordRoomData,
  RadioTransmission
} from '../types';

// ==========================================
// 1. SKILL POOL (Bao gồm Thiên Phú Chúa Tể & Kỹ Năng Cốt Truyện)
// ==========================================
export const SKILL_POOL: Skill[] = [
  // SSS Tier - Độc Nhất Vô Nhị
  {
    id: 'skill_sss_lord',
    name: 'Thiên Phú Chúa Tể (SSS)',
    tier: 'SSS',
    description: 'Ngủ để sản xuất Tiền Chúa Tể dựa trên tỉ lệ chuyển đổi của bạn cùng phòng chất lượng cao. Dùng Tiền Chúa Tể cường hóa vạn vật, cửa phòng, vũ khí và kỹ năng.',
    icon: '👑',
    mpCost: 0,
    cooldownTurns: 0,
    effectType: 'buff',
    power: 300,
    level: 1,
    maxLevel: 10,
    flavor: 'Thiên phú độc bản của Tiết Mộc, đứng trên đỉnh cao nhất của trò chơi sinh tồn ký túc xá.'
  },
  {
    id: 'skill_sss_extract',
    name: 'Vô Hạn Trích Xuất (SSS)',
    tier: 'SSS',
    description: 'Sau khi tiêu diệt mục tiêu, có 100% tỷ lệ trích xuất vĩnh viễn thuộc tính (STR, AGI, VIT, INT) hoặc kỹ năng độc nhất của đối phương.',
    icon: '✨',
    mpCost: 0,
    cooldownTurns: 0,
    effectType: 'extract',
    power: 200,
    level: 1,
    maxLevel: 10,
    flavor: 'Khả năng tước đoạt quy luật sinh mệnh từ mọi sinh linh ngã xuống.'
  },
  {
    id: 'skill_ss_longtuong',
    name: 'Long Tượng Chiến Pháp (SS)',
    tier: 'SS',
    description: 'Thể phách bùng nổ như rồng voi, tăng vĩnh viễn +13 Thể Chất, phòng thủ cơ chân gấp 3 lần, bộc phát sát thương cận chiến cực đại.',
    icon: '🐉',
    mpCost: 8,
    cooldownTurns: 2,
    effectType: 'buff',
    power: 250,
    level: 1,
    maxLevel: 8,
    flavor: 'Được nâng cấp từ Thú Hình Quyền, dung hợp tinh hoa cận chiến đệ nhất thiên hạ.'
  },
  {
    id: 'skill_s_galax',
    name: 'Song Súng Galax Sấm Sét (S)',
    tier: 'S',
    description: 'Xả liên hoàn bão đạn sấm sét từ hai khẩu Galax, tạo màn mưa đạn quét sạch toàn bộ quái vật trong hành lang.',
    icon: '⚡',
    mpCost: 10,
    cooldownTurns: 2,
    effectType: 'damage',
    power: 210,
    level: 1,
    maxLevel: 6,
    flavor: 'Vũ khí tầm xa bạo kích sấm sét chuyên trị đại quân quái vật đông đảo.'
  },
  {
    id: 'skill_s_quydong',
    name: 'Quỷ Đồng Thần Khảm Định Thân (S)',
    tier: 'S',
    description: 'Kích hoạt mắt thần Quỷ Đồng cưỡng chế định thân mục tiêu trong 3 giây, hấp thụ u linh và phản kích ma quái ngoài cửa.',
    icon: '👁️',
    mpCost: 5,
    cooldownTurns: 2,
    effectType: 'control',
    power: 160,
    level: 1,
    maxLevel: 6,
    flavor: 'Linh hồn hộ mệnh phong ấn trên cửa phòng 200, bảo hộ ký túc xá bất khả xâm phạm.'
  },
  {
    id: 'skill_s_minhhoa',
    name: 'Minh Hỏa Song Tính (S)',
    tier: 'S',
    description: 'Ngưng tụ ngọn lửa màu xanh đen mang đặc tính vừa băng giá vừa thiêu đốt linh hồn, dính vào là cháy vĩnh viễn.',
    icon: '🕯️',
    mpCost: 8,
    cooldownTurns: 2,
    effectType: 'damage',
    power: 190,
    level: 1,
    maxLevel: 6,
    flavor: 'Ngọn lửa cổ xưa được tìm thấy dưới đáy hồ tăm tối.'
  },
  {
    id: 'skill_ss_bach_quy_huyet_khe',
    name: 'Bách Quỷ Huyết Khế (SS)',
    tier: 'SS',
    description: 'Thiên phú thức tỉnh đỉnh cao của Vương Như Huyên (Ngự Quỷ Sư), thu phục 3 tiểu quỷ và 2 Song Quỷ Đại Pháp Sư, tạo trận địa ma pháp bảo hộ phòng 200.',
    icon: '🔮',
    mpCost: 12,
    cooldownTurns: 2,
    effectType: 'control',
    power: 260,
    level: 1,
    maxLevel: 8,
    flavor: 'Huyết khế dung hợp linh hồn, biến vạn u linh thành hộ vệ trung thành tuyệt đối.'
  },
  {
    id: 'skill_s_sinh_ton_truc_giac',
    name: 'Sinh Tồn Siêu Trực Giác (S)',
    tier: 'S',
    description: 'Dị năng của Liễu Như Yên, cảm nhận trước ý đồ tấn công, giải mã điểm thù hận và phát hiện điểm yếu chí mạng của quái vật.',
    icon: '👁️‍🗨️',
    mpCost: 6,
    cooldownTurns: 2,
    effectType: 'buff',
    power: 200,
    level: 1,
    maxLevel: 6,
    flavor: 'Trải qua vô số phó bản tôi luyện thành trực giác siêu phàm nhìn thấu sinh tử.'
  },
  {
    id: 'skill_sss_bat_tu',
    name: 'Bất Tử Thần Khảm (SSS)',
    tier: 'SSS',
    description: 'Hệ thống đặc dị của Kế Thư An, hồi sinh tức thì khi nhận sát thương chí mạng và tăng 50% phòng ngự toàn diện.',
    icon: '🛡️',
    mpCost: 0,
    cooldownTurns: 5,
    effectType: 'passive',
    power: 350,
    level: 1,
    maxLevel: 10,
    flavor: 'Quy luật bất tử bí ẩn vượt qua giới hạn của các tòa tháp sinh tồn.'
  },
  {
    id: 'skill_a_thanhluc',
    name: 'Thanh Linh Kiếm Quyết (A)',
    tier: 'A',
    description: 'Kiếm pháp sắc bén của Hứa Thanh Nhiên, tâm linh chi khí gia trì giúp chuyển động nhẹ nhàng, đâm xuyên tử huyệt thi ma.',
    icon: '🗡️',
    mpCost: 6,
    cooldownTurns: 1,
    effectType: 'damage',
    power: 140,
    level: 1,
    maxLevel: 5,
    flavor: 'Kiếm thuật danh môn kết hợp luyện khí quyết, tàn sát tà ma như chớp giật.'
  },
  {
    id: 'skill_a_nguquy',
    name: 'Ngự Quỷ Linh Hắc Quang (A)',
    tier: 'A',
    description: 'Kỹ năng của Vương Như Huyên, triệu hồi và chỉ huy bầy tiểu quỷ tàn phế tấn công, phong ấn đại pháp sư vào chuông quỷ.',
    icon: '🔔',
    mpCost: 7,
    cooldownTurns: 2,
    effectType: 'control',
    power: 130,
    level: 1,
    maxLevel: 5,
    flavor: 'Chiếc chuông đen nhánh hấp thụ hồn nguyệt, biến u linh thành thuộc hạ.'
  },
  {
    id: 'skill_b_fireball',
    name: 'Hỏa Cầu Thuật Cực Đại (B)',
    tier: 'B',
    description: 'Tập trung hỏa nguyên tố phóng ra quả cầu lửa nổ tung diện rộng, khắc chế mạnh mẽ zombie sợ lửa.',
    icon: '🔥',
    mpCost: 6,
    cooldownTurns: 1,
    effectType: 'damage',
    power: 110,
    level: 1,
    maxLevel: 5,
    flavor: 'Kỹ năng tấn công chủ động mua từ siêu thị dị giới.'
  },
  {
    id: 'skill_b_heal',
    name: 'Thuật Trị Liệu Sơ Cứu (B)',
    tier: 'B',
    description: 'Hồi phục ngay lập tức 45 HP và xóa bỏ hiệu ứng trúng độc, cầm máu vết thương.',
    icon: '🩹',
    mpCost: 6,
    cooldownTurns: 2,
    effectType: 'heal',
    power: 90,
    level: 1,
    maxLevel: 5,
    flavor: 'Kỹ năng y tế dã chiến do Lô Nương và các bác sĩ truyền dạy.'
  }
];

// ==========================================
// 2. PHÒNG CHÚA TỂ & BẠN CÙNG PHÒNG CHẤT LƯỢNG CAO (THEO 7 CHƯƠNG)
// ==========================================
export const INITIAL_ROOM_TENANTS: RoomTenant[] = [
  {
    id: 'tenant_tinh_than',
    name: 'Tinh Thần',
    title: 'Hoa Khôi Cùng Lớp (Bạn Khởi Đầu)',
    avatar: '👩‍🦰',
    gender: 'female',
    conversionBonusPct: 96,
    comfortScore: 105,
    specialty: 'Thu thập thông tin, Xạ thủ Súng Lôi Đình & Song Súng Galax',
    specialSkill: 'Bắn Tỉa Tinh Chuẩn & Khéo Tay',
    isRecruited: true,
    assignedGear: 'Súng G17 Lôi Đình Bạc',
    dialogue: 'Tuyết Mộc, cửa phòng của chúng ta thật kiên cố, em tin tưởng anh sẽ dẫn dắt mọi người sống sót!'
  },
  {
    id: 'tenant_nhu_huyen',
    name: 'Vương Như Huyên',
    title: 'Ngự Quỷ Sư SS (Chương 2)',
    avatar: '👧',
    gender: 'female',
    conversionBonusPct: 90,
    comfortScore: 100,
    specialty: 'Câu hồn, phong ấn và điều khiển linh thể hắc ám, Bách Quỷ Huyết Khế',
    specialSkill: 'Ngự Quỷ Thao Túng & Minh Hỏa Băng Diễm',
    isRecruited: true,
    assignedGear: 'Ngự Quỷ Linh Hắc Quang',
    dialogue: 'Cảm ơn anh Tuyết đã cứu em khỏi đàn zombie. Em đã thu phục được 3 tiểu quỷ và 2 Song Quỷ Đại Pháp Sư bảo hộ phòng!'
  },
  {
    id: 'tenant_thanh_nhien',
    name: 'Hứa Thanh Nhiên',
    title: 'Kiếm Khách Thanh Linh (Chương 3)',
    avatar: '👩‍🦳',
    gender: 'female',
    conversionBonusPct: 93,
    comfortScore: 108,
    specialty: 'Cận chiến kiếm thuật võ học cổ truyền, Luyện Khí Quyết, Độc Thi Trảm',
    specialSkill: 'Thanh Linh Kiếm Pháp Đột Phá',
    isRecruited: true,
    assignedGear: 'Thanh Kiếm Cấp 3 Độc Thi',
    dialogue: 'Tuyết ca, chỉ cần anh vung đao dẫn đầu, thanh kiếm này nguyện cùng anh xông pha vạn dặm tà ma!'
  },
  {
    id: 'tenant_lieu_nhu_yen',
    name: 'Liễu Như Yên',
    title: 'Thích Khách Mặt Nạ & Bậc Thầy Thù Hận (Chương 3)',
    avatar: '🥷',
    gender: 'female',
    conversionBonusPct: 98,
    comfortScore: 115,
    specialty: 'Âm Ảnh Độ Thân, Trực giác điểm thù hận, Bẫy quỷ, Điểm yếu quái vật',
    specialSkill: 'Ám Sát Hư Không & Cảnh Báo Thù Hận',
    isRecruited: true,
    assignedGear: 'Đao Khiêu Ngư Cấp 3 & Cửa Chu Sa',
    dialogue: 'Cẩn thận điểm thù hận. Giết người bừa bãi sẽ biến anh thành mồi nhử số 1 của toàn bộ quái vật!'
  },
  {
    id: 'tenant_lo_nuong',
    name: 'Lô Nương (Sona)',
    title: 'Cựu Giảng Viên Ngoại Ngữ Dị Năng (Chương 5)',
    avatar: '👩‍🏫',
    gender: 'female',
    conversionBonusPct: 97,
    comfortScore: 112,
    specialty: 'Tăng sản lượng Tiền Chúa Tể 500 xu/ngày, Trị liệu dã chiến cao cấp, Ngoại ngữ',
    specialSkill: 'Trị Liệu Dã Chiến Toàn Năng & An Thần',
    isRecruited: true,
    assignedGear: 'Hộp Y Tế Dã Chiến Quân Y',
    dialogue: 'Cùng Tuyết Mộc sinh tồn trong Ký Túc Xá này kích thích và bình yên hơn bất kỳ nơi nào!'
  },
  {
    id: 'tenant_ke_thu_an',
    name: 'Kế Thư An',
    title: 'Kẻ Nắm Giữ Hệ Thống Bất Tử (Chương 7)',
    avatar: '🧙‍♂️',
    gender: 'male',
    conversionBonusPct: 120,
    comfortScore: 120,
    specialty: 'Hệ thống Bất Tử, Tái sinh vô hạn, Trấn thủ cổng Minh Phủ',
    specialSkill: 'Bất Tử Trùng Sinh & Phá Giới Thần Uy',
    isRecruited: true,
    assignedGear: 'Chiến Giáp Thập Nhật Linh',
    dialogue: 'Cậu đã giết được Asith... Trò chơi thực sự bây giờ mới bắt đầu. Hãy cùng tôi bước vào Thành Phố Hoang Tàn!'
  }
];

export const INITIAL_LORD_ROOM_DATA: LordRoomData = {
  bedLevel: 2,
  bedName: 'Giường Chúa Tể Ấm Áp Cấp 2',
  bedComfort: 40,
  bedHourlyCoins: 12,
  doorLevel: 4,
  doorName: 'Cửa Kim Cương Cấp 3 (Thần Khảm Phù Văn)',
  doorDef: 80,
  doorHp: 130,
  doorMaxHp: 130,
  doorEffect: 'Khắc chế sinh vật hắc ám; Hút huyết khí quái vật hồi phục 30 HP (Tối đa 3 lần)',
  turretLeft: {
    name: 'Kẻ Phân Tách Không Gian (Máy Bắn Bi Cấp 5)',
    level: 5,
    damage: 180,
    speed: 'Cực Nhanh (Phân Tách 3 Viên)',
    costPerShot: 40,
    autoAttack: true
  },
  turretRight: {
    name: 'Nỏ Phá Ma Bạch Ngân Cấp 4',
    level: 4,
    damage: 120,
    speed: 'Nhanh (Phá Ma Xuyên Giáp)',
    costPerShot: 30,
    autoAttack: true
  },
  guardianSpirit: {
    name: 'Quỷ Đồng Thần Khảm Linh Hộ Mệnh',
    level: 3,
    isBound: true,
    skills: ['Hút U Linh', 'Định Thân Trói Quái', 'Tịch Tà Đánh Bật Tà Ma']
  },
  waterFilterLevel: 2,
  waterFilterCapacity: 18
};

// ==========================================
// 3. VẬT PHẨM & TRANG BỊ
// ==========================================
export const INITIAL_ITEMS: Item[] = [
  {
    id: 'item_lord_coin',
    name: 'Tiền Chúa Tể (Xu Chúa Tể)',
    description: 'Đơn vị tiền tệ thần thánh do Thiên Phú Chúa Tể sinh ra khi ngủ, dùng để nâng cấp cường hóa vạn vật trong ký túc xá.',
    rarity: 'divine',
    tier: 'SSS',
    category: 'special',
    icon: '🪙',
    quantity: 120,
    stackable: true,
    value: 500
  },
  {
    id: 'weapon_g17_thunder',
    name: 'Súng Lục G17 Lôi Đình Bạc',
    description: 'Súng lục được Tiết Mộc cường hóa bằng 200 Tiền Chúa Tể, tăng chính xác cực đại, bắn hạ Zombie Tàng Hình trong chớp mắt.',
    rarity: 'rare',
    tier: 'A',
    category: 'weapon',
    icon: '🔫',
    quantity: 1,
    stackable: false,
    value: 120,
    enhanceLevel: 3,
    stats: { atk: 38, critRate: 15 }
  },
  {
    id: 'weapon_galax_twin',
    name: 'Song Súng Galax Sấm Sét Cấp 4',
    description: 'Cặp súng tự động cường hóa cao cấp, tạo ra cơn mưa đạn sấm sét thiêu rụi bầy quái vật.',
    rarity: 'epic',
    tier: 'S',
    category: 'weapon',
    icon: '⚡',
    quantity: 1,
    stackable: false,
    value: 300,
    enhanceLevel: 4,
    stats: { atk: 68, critRate: 20 }
  },
  {
    id: 'armor_kim_tieu',
    name: 'Chiến Giáp Kim Tiêu Ngọc Y Cấp 4',
    description: 'Trang phục thần thoại rơi ra từ Thi Khôi Cấp 4, tăng toàn diện thuộc tính thể chất và phòng ngự.',
    rarity: 'legendary',
    tier: 'S',
    category: 'armor',
    icon: '🥋',
    quantity: 1,
    stackable: false,
    value: 450,
    enhanceLevel: 4,
    stats: { def: 48, hp: 80 }
  },
  {
    id: 'item_porcelain_bowl',
    name: 'Bát Sứ Thanh Hoa Mai Tinh Xảo',
    description: 'Bát sứ cổ xưa được nâng cấp, dùng để hối lộ và giao dịch với Âm Sai Quỷ Tuần Tra đổi lấy Thư Mời Minh Phủ.',
    rarity: 'rare',
    tier: 'A',
    category: 'special',
    icon: '🥣',
    quantity: 1,
    stackable: true,
    value: 180
  },
  {
    id: 'item_minh_phu_invite',
    name: 'Thư Mời Minh Phủ',
    description: 'Thư mời độc quyền từ Quỷ Sai, cho phép ghép đội tiến vào phó bản Minh Phủ nhận kho báu thần thoại.',
    rarity: 'mythic',
    tier: 'SS',
    category: 'special',
    icon: '📜',
    quantity: 1,
    stackable: true,
    value: 1000
  },
  {
    id: 'item_wolf_pelt',
    name: 'Tấm Da Sói Băng Giá Chống Rét',
    description: 'Vật liệu giữ ấm quý giá rơi ra từ đại quân Song Quỷ, giá trị tăng vọt trong đêm bão tuyết -30°C.',
    rarity: 'uncommon',
    tier: 'B',
    category: 'material',
    icon: '🐺',
    quantity: 24,
    stackable: true,
    value: 80
  },
  {
    id: 'item_golden_serum',
    name: 'Dược Tề Tăng Cường Gen Hoàng Kim',
    description: 'Dược tề vắc-xin nâng cấp 3 cấp, kích hoạt hiệu ứng Thể chất tuyệt đỉnh +25 thuộc tính toàn diện.',
    rarity: 'divine',
    tier: 'SSS',
    category: 'consumable',
    icon: '🧪',
    quantity: 1,
    stackable: true,
    value: 800,
    stats: { hp: 100, mp: 50, atk: 25, def: 25 }
  },
  {
    id: 'food_bread',
    name: 'Bánh Mì Tinh Xảo Cấp 1',
    description: 'Bánh mì được Tiết Mộc nâng cấp bằng 5 Tiền Chúa Tể, tăng 50 điểm no và hồi phục thể lực nhanh.',
    rarity: 'uncommon',
    tier: 'C',
    category: 'consumable',
    icon: '🍞',
    quantity: 6,
    stackable: true,
    value: 15,
    stats: { hunger: 50, stamina: 30 }
  },
  {
    id: 'drink_water',
    name: 'Nước Tinh Khiết Máy Lọc 18L',
    description: 'Nước lọc tiệt trùng từ Máy Lọc Nước Cường Hóa, giải tỏa cơn khát và thanh lọc cơ thể.',
    rarity: 'uncommon',
    tier: 'C',
    category: 'consumable',
    icon: '💧',
    quantity: 8,
    stackable: true,
    value: 20,
    stats: { thirst: 50, sanity: 15 }
  },
  {
    id: 'special_crystal',
    name: 'Tinh Thể Dị Biến Não Quái',
    description: 'Tinh thể năng lượng phát sáng rơi ra từ xác sống dị biến, dùng để đột phá kỹ năng và xây tháp UV.',
    rarity: 'rare',
    tier: 'A',
    category: 'special',
    icon: '💎',
    quantity: 10,
    stackable: true,
    value: 50
  },
  {
    id: 'mat_scrap',
    name: 'Mảnh Kim Loại & Ốc Vít',
    description: 'Vật liệu cơ bản dùng để chế tạo và sửa chữa trang bị, công trình.',
    rarity: 'common',
    tier: 'F',
    category: 'material',
    icon: '🔩',
    quantity: 20,
    stackable: true,
    value: 2
  },
  {
    id: 'mat_wood',
    name: 'Thanh Gỗ Chắc KTX',
    description: 'Gỗ tháo từ bàn ghế cũ, dùng làm rào chắn phòng thủ hoặc cán vũ khí.',
    rarity: 'common',
    tier: 'F',
    category: 'material',
    icon: '🪵',
    quantity: 15,
    stackable: true,
    value: 2
  },
  {
    id: 'weapon_minh_vuong_sword',
    name: 'Thần Khảm Minh Vương Kiếm',
    description: 'Bảo kiếm chí tôn rèn từ Hắc Ám Minh Hỏa và Tinh Thể Não Quái Cấp 8, phát ra uy áp linh hồn trấn áp vạn quỷ.',
    rarity: 'divine',
    tier: 'EX',
    category: 'weapon',
    icon: '⚔️',
    quantity: 1,
    stackable: false,
    value: 3500,
    enhanceLevel: 0,
    stats: { atk: 120, critRate: 25, lifeSteal: 15 }
  },
  {
    id: 'armor_thap_nhat_giap',
    name: 'Chiến Giáp Thập Nhật Linh Tinh Vân',
    description: 'Bộ giáp tạo từ 10 mảnh Thập Nhật Linh và Hợp Kim Titan, phản 40% sát thương nhận vào.',
    rarity: 'divine',
    tier: 'EX',
    category: 'armor',
    icon: '🛡️',
    quantity: 1,
    stackable: false,
    value: 3000,
    enhanceLevel: 0,
    stats: { def: 95, hp: 200 }
  },
  {
    id: 'item_thap_nhat_linh',
    name: 'Mảnh Thần Khảm Thập Nhật Linh',
    description: 'Bảo vật tối thượng của thế giới sương mù máu, chìa khóa mở cổng dịch chuyển sang Đa Vũ Trụ Minh Phủ.',
    rarity: 'divine',
    tier: 'EX',
    category: 'special',
    icon: '🔮',
    quantity: 1,
    stackable: true,
    value: 5000
  },
  {
    id: 'item_co_thu_di_van',
    name: 'Cổ Thư Dị Văn Dân Gian (Cấp S)',
    description: 'Cuốn sách cổ ghi chép tường tận nguồn gốc, tập tính sinh học và điểm yếu chí mạng của 10 con Boss Thập Đại Ác Nhân cai quản 10 tầng lầu.',
    rarity: 'epic',
    tier: 'S',
    category: 'special',
    icon: '📖',
    quantity: 1,
    stackable: true,
    value: 1200
  },
  {
    id: 'item_map_sector09',
    name: 'Bản Đồ Khu Vực: Sương Mù Máu – Phân Vùng 09',
    description: 'Bản đồ quân sự rơi ra từ tay Boss Asith, hiển thị vị trí 8 Tế Đàn Ký Túc Xá lân cận đang sáp nhập vào Chiến Trường Thành Phố Hoang Tàn.',
    rarity: 'legendary',
    tier: 'SS',
    category: 'special',
    icon: '🗺️',
    quantity: 1,
    stackable: true,
    value: 2500
  },
  {
    id: 'item_khien_tru_phan_xa',
    name: 'Khiên Trụ Phản Xạ Cấp 3',
    description: 'Khiên phòng thủ đặc chế vớt từ đáy hồ Đồng Hồ, hấp thụ và phản xạ 35% sát thương ma pháp băng hỏa.',
    rarity: 'rare',
    tier: 'A',
    category: 'armor',
    icon: '🛡️',
    quantity: 1,
    stackable: false,
    value: 400,
    stats: { def: 42, hp: 60 }
  },
  {
    id: 'item_mau_cho_muc',
    name: 'Máu Chó Mực Pha Thi Độc',
    description: 'Vật phẩm dân gian chuyên khắc chế Cương Thi / Thi Khôi Tầng 10, tạt vào ngực sẽ phá hủy hoàn toàn Kim Cương Thân.',
    rarity: 'rare',
    tier: 'A',
    category: 'consumable',
    icon: '🩸',
    quantity: 3,
    stackable: true,
    value: 120
  },
  {
    id: 'item_guong_dong_bat_quai',
    name: 'Gương Đồng Bát Quái Chiếu Yêu',
    description: 'Phản chiếu chân dung tà ma, khiến Hồng Nương Tử (Tầng 4) tự nhìn thấy hình bóng thật mà hoảng loạn tan biến.',
    rarity: 'rare',
    tier: 'A',
    category: 'special',
    icon: '🪞',
    quantity: 1,
    stackable: true,
    value: 150
  },
  {
    id: 'item_huong_me_than',
    name: 'Hương Mê Thần Thôi Miên',
    description: 'Khói hương cổ xưa làm tê liệt thần kinh của Quỷ Thư Sinh (Tầng 8), phong tỏa kỹ năng đọc chú.',
    rarity: 'uncommon',
    tier: 'B',
    category: 'consumable',
    icon: '💨',
    quantity: 2,
    stackable: true,
    value: 90
  },
  {
    id: 'item_bay_thu_an_nac',
    name: 'Bẫy Thú Ẩn Nặc Bản Mệnh',
    description: 'Bẫy thép đặt ở lối rẽ, giẫm phải sẽ kích nổ sâu độc bản mệnh dưới lòng bàn chân Huyết Cốt Tử (Tầng 6).',
    rarity: 'rare',
    tier: 'A',
    category: 'special',
    icon: '🪤',
    quantity: 2,
    stackable: true,
    value: 160
  },
  {
    id: 'item_moc_tam_phien',
    name: 'Mộc Tâm Phiến Thanh Tâm',
    description: 'Quạt gỗ tâm linh thanh lọc khí tức, miễn nhiễm hoàn toàn mị hương quyến rũ của Hồ Yêu (Tầng 2).',
    rarity: 'rare',
    tier: 'A',
    category: 'special',
    icon: '🪭',
    quantity: 1,
    stackable: true,
    value: 140
  }
];

export const CRAFTING_RECIPES: Item[] = [
  {
    id: 'craft_machete_uv',
    name: 'Dao Phay UV Sát Quái',
    description: 'Vũ khí cận chiến được gắn ống thạch anh tia cực tím, gây thêm 30% sát thương lên zombie sợ ánh sáng.',
    rarity: 'rare',
    tier: 'B',
    category: 'weapon',
    icon: '🗡️',
    quantity: 1,
    stackable: false,
    value: 60,
    stats: { atk: 28 },
    craftRecipe: {
      materials: [
        { itemId: 'mat_scrap', name: 'Mảnh Kim Loại', count: 6 },
        { itemId: 'mat_wood', name: 'Thanh Gỗ Chắc', count: 4 },
        { itemId: 'special_crystal', name: 'Tinh Thể Não Quái', count: 1 }
      ]
    }
  },
  {
    id: 'craft_riot_armor',
    name: 'Áo Giáp Dã Chiến Chống Cắn',
    description: 'Áo giáp ghép từ các tấm biển nhôm và đệm cao su, chống móng vuốt và răng nanh xác sống hiệu quả.',
    rarity: 'rare',
    tier: 'B',
    category: 'armor',
    icon: '🛡️',
    quantity: 1,
    stackable: false,
    value: 55,
    stats: { def: 24, hp: 30 },
    craftRecipe: {
      materials: [
        { itemId: 'mat_scrap', name: 'Mảnh Kim Loại', count: 8 },
        { itemId: 'mat_wood', name: 'Thanh Gỗ Chắc', count: 5 }
      ]
    }
  },
  {
    id: 'craft_molotov_pack',
    name: 'Cụm Bom Cồn Lửa Molotov (x3)',
    description: 'Bộ 3 chai xăng cồn sát thương lửa diện rộng, thiêu rụi bầy xác sống trong chớp mắt.',
    rarity: 'uncommon',
    tier: 'C',
    category: 'consumable',
    icon: '🍾',
    quantity: 3,
    stackable: true,
    value: 40,
    stats: { atk: 55 },
    craftRecipe: {
      materials: [
        { itemId: 'drink_water', name: 'Nước Khoáng', count: 1 },
        { itemId: 'mat_scrap', name: 'Mảnh Kim Loại', count: 3 }
      ]
    }
  },
  {
    id: 'craft_med_military_kit',
    name: 'Hộp Cứu Thương Dã Chiến Quân Y',
    description: 'Bộ cứu thương cao cấp gồm thuốc tiêm hồi sức và gạc tiệt trùng, hồi 80 HP và thanh lọc độc tố.',
    rarity: 'epic',
    tier: 'A',
    category: 'consumable',
    icon: '🧰',
    quantity: 1,
    stackable: true,
    value: 80,
    stats: { hp: 80, sanity: 20 },
    craftRecipe: {
      materials: [
        { itemId: 'special_crystal', name: 'Tinh Thể Não Quái', count: 1 },
        { itemId: 'mat_scrap', name: 'Mảnh Kim Loại', count: 4 }
      ]
    }
  },
  {
    id: 'craft_plasma_spear',
    name: 'Giáo Phóng Điện Cao Áp Boss',
    description: 'Vũ khí tầm xa tích hợp tụ điện cao áp từ phòng thí nghiệm KTX, đâm xuyên giáp và gây tê liệt quái vật.',
    rarity: 'legendary',
    tier: 'S',
    category: 'weapon',
    icon: '⚡',
    quantity: 1,
    stackable: false,
    value: 150,
    stats: { atk: 52 },
    craftRecipe: {
      materials: [
        { itemId: 'mat_scrap', name: 'Mảnh Kim Loại', count: 15 },
        { itemId: 'mat_wood', name: 'Thanh Gỗ Chắc', count: 8 },
        { itemId: 'special_crystal', name: 'Tinh Thể Não Quái', count: 3 }
      ]
    }
  }
];

// ==========================================
// 4. CÁC GIAI ĐOẠN (STAGES) THEO KỊCH BẢN NGUYÊN TÁC
// ==========================================
export const STAGES: StagePhase[] = [
  {
    id: 1,
    name: 'Vòng 1: Đại Loạn Zombie KTX & Khởi Đầu Chúa Tể (Ngày 1 - 7)',
    timeFrame: 'Tuần 1 (Ngày 1 - 7)',
    minDay: 1,
    maxDay: 7,
    dangerLevel: 1,
    zombieMutations: ['Zombie Tàng Hình', 'Zombie Khổng Lồ Đột Kích', 'Zombie Bụng Bự Phun Axit'],
    bonusLootMultiplier: 1.0,
    description: '100 sinh viên bị dịch chuyển vào KTX hoang tàn. Tiết Mộc thức tỉnh Thiên Phú Chúa Tể, cùng Tinh Thần cố thủ phòng 200, nâng cấp cửa sắt đánh bại Vương Đại Tráng và săn Boss súng G17.',
    worldEvent: 'Tranh Giành Căn Tin & Sóng Quái Húc Cửa Ban Đêm',
    stageBoss: 'Zombie Khổng Lồ Đột Kích Cấp 3'
  },
  {
    id: 2,
    name: 'Vòng 2: Đêm Hồi Hồn & Quỷ Sai Tuần Tra (Ngày 8 - 14)',
    timeFrame: 'Tuần 2 (Ngày 8 - 14)',
    minDay: 8,
    maxDay: 14,
    dangerLevel: 2,
    zombieMutations: ['U Linh Oán Hận', 'Cương Thi Nhảy Cấp 2', 'Quỷ Sai Tuần Tra Khảo Sát'],
    bonusLootMultiplier: 1.6,
    description: 'Người chơi đã chết hóa thành u linh quay lại báo thù. Quỷ Đồng trên cửa phòng 200 hút sạch tà linh. Giao dịch Bát Sứ Thanh Hoa với Quỷ Sai nhận Thư Mời Minh Phủ.',
    worldEvent: 'Quỷ Sai Kiểm Tra Phòng & Tiếng Chuông Cương Thi Lầu Đạo',
    stageBoss: 'Ác Linh Hoàng Dũng Cầm Trường Kiếm'
  },
  {
    id: 3,
    name: 'Vòng 3: Đêm Cực Hàn & Song Quỷ Chi Vương Athi (Ngày 15 - 28)',
    timeFrame: 'Tuần 3 - 4 (Ngày 15 - 28)',
    minDay: 15,
    maxDay: 28,
    dangerLevel: 4,
    zombieMutations: ['Song Quỷ Băng Tuyết', 'Huyết Mộc Ma Cà Rồng', 'Song Quỷ Đại Pháp Sư'],
    bonusLootMultiplier: 2.5,
    description: 'Nhiệt độ giảm sâu tới -30°C. Tiết Mộc triển khai Pháo đài Kẻ Phân Tách Không Gian, cùng 4 bạn cùng phòng quét sạch đại quân Athi và thao túng thị trường Da Sói.',
    worldEvent: 'Bão Tuyết Đêm Nửa Đêm & Bẫy Đầu Cơ Vương Đức Lợi',
    stageBoss: 'Song Quỷ Chi Vương Athi (Ngai Vàng Băng Giá)'
  },
  {
    id: 4,
    name: 'Vòng 4: Đêm Sát Thủ 10 Tầng Lầu (Ngày 29 - 45)',
    timeFrame: 'Tháng 2 (Ngày 29 - 45)',
    minDay: 29,
    maxDay: 45,
    dangerLevel: 5,
    zombieMutations: ['Thi Khôi Đồng Giáp Cấp 4', 'Quỷ Thư Sinh & Lang Man', 'Phong Cương Cơ Quan Sư', 'Hồng Nương Tử Giày Hoa Đỏ'],
    bonusLootMultiplier: 4.0,
    description: 'Trận đại chiến 10 Boss trấn giữ 10 tầng lầu. Tiết Mộc kích hoạt điểm thù hận dẫn dụ quái vật, thu thập đủ Thập Nhật Linh, đăng quang Phong Vương Tối Thượng!',
    worldEvent: 'Đêm Sát Thủ 12 Tiếng & Đài Phát Thanh Huyết Vụ 107.5MHz',
    stageBoss: 'Đoàn Mới Sát Thủ Thi Khôi (Cấp 4)'
  },
  {
    id: 5,
    name: 'Vòng 5: Đại Chiến Minh Phủ & Tháp Thập Nhật Linh (Ngày 46+)',
    timeFrame: 'Hậu Chung Kết (Ngày 46+)',
    minDay: 46,
    maxDay: 365,
    dangerLevel: 5,
    zombieMutations: ['Ma Thần Cổ Xưa', 'Linh Hồn Minh Vương', 'Vạn Quỷ Dạ Hành', 'Thực Thể Hư Không'],
    bonusLootMultiplier: 6.0,
    description: 'Cánh cổng Minh Phủ mở ra, hàng trăm tòa KTX sáp nhập vào đấu trường đa vũ trụ. Tiết Mộc dẫn dắt 100 cư dân tiến vào chiều không gian tối cao, mở khóa Thần Khảm Minh Vương Kiếm!',
    worldEvent: 'Cổng Dịch Chuyển Minh Phủ & Huyết Chiến Đa Vũ Trụ',
    stageBoss: 'Minh Vương Thần Khảm Vô Hạn (Cấp EX)'
  }
];

// ==========================================
// 5. QUÁI VẬT & BOSS THEO KỊCH BẢN NGUYÊN TÁC
// ==========================================
export const ENEMIES: Enemy[] = [
  // Stage 1 Boss
  {
    id: 'enemy_boss_giant_zombie',
    name: 'Zombie Khổng Lồ Đột Kích (Cấp 3)',
    title: 'Thôn Phệ Đồng Loại Biến Dị - Chương 2',
    hp: 260,
    maxHp: 260,
    attack: 28,
    defense: 18,
    speed: 12,
    expReward: 180,
    stageId: 1,
    floor: 'Nhà Thi Đấu',
    isBoss: true,
    icon: '🧟',
    description: 'Con Zombie cấp 3 húc đổ cửa sắt các phòng yếu, hai cánh tay đột biến to như cột đình đập nát mọi chướng ngại vật.',
    skills: [
      { name: 'Nện Đất Cuồng Bạo', damageMultiplier: 1.4, description: 'Đập mạnh xuống sàn gây chấn động diện rộng.' },
      { name: 'Húc Cửa Tử Thần', damageMultiplier: 1.6, description: 'Gây sát thương cực lớn lên lá chắn phòng thủ.' }
    ],
    weakness: {
      description: 'Bắn phá chính xác vào hốc mắt bằng Súng Lục G17 Lôi Đình.',
      counterItemName: 'Súng Lục G17 Lôi Đình Bạc',
      counterItemId: 'weapon_g17_thunder',
      damageMultiplier: 2.0,
      folkLoreHint: 'Mắt là tử huyệt yếu nhất khi nó đang gầm thét lao tới.'
    },
    drops: [
      { itemId: 'weapon_g17_thunder', name: 'Súng Lục G17 Lôi Đình Bạc', chance: 1.0, count: 1 },
      { itemId: 'item_golden_serum', name: 'Dược Tề Gen Hoàng Kim', chance: 1.0, count: 1 },
      { itemId: 'item_lord_coin', name: 'Tiền Chúa Tể', chance: 1.0, count: 50 },
      { itemId: 'special_crystal', name: 'Tinh Thể Dị Biến', chance: 1.0, count: 3 }
    ]
  },

  // Stage 2 Boss
  {
    id: 'enemy_boss_ac_linh_hoang_dung',
    name: 'Ác Linh Hoàng Dũng & Âm Sai Minh Phủ',
    title: 'Oán Linh Kiếm Sĩ Đêm Hồi Hồn - Chương 3',
    hp: 400,
    maxHp: 400,
    attack: 40,
    defense: 26,
    speed: 18,
    expReward: 320,
    stageId: 2,
    floor: 'Tầng 10',
    isBoss: true,
    icon: '👻',
    description: 'Người chơi Hoàng Dũng dẫn đàn em cướp phòng 200 bị tiêu diệt, đêm hồi hồn hóa ác linh quay lại báo thù.',
    skills: [
      { name: 'Kiếm Khí Oán Linh', damageMultiplier: 1.5, description: 'Phóng luồng hắc kiếm khí xuyên thấu phòng thủ.' },
      { name: 'Xích Sắt Đoạt Hồn', damageMultiplier: 1.3, description: 'Trói chân và rút 20 MP của mục tiêu.' }
    ],
    weakness: {
      description: 'Quỷ Đồng Thần Khảm há miệng hút sạch oán linh và định thân trong 3 giây.',
      counterItemName: 'Bát Sứ Thanh Hoa Mai Tinh Xảo',
      counterItemId: 'item_porcelain_bowl',
      damageMultiplier: 2.2,
      folkLoreHint: 'Dâng Bát Sứ Thanh Hoa cho Âm Sai để hóa giải oán hận và đổi lấy Thư Mời Minh Phủ.'
    },
    drops: [
      { itemId: 'item_minh_phu_invite', name: 'Thư Mời Minh Phủ', chance: 1.0, count: 1 },
      { itemId: 'item_porcelain_bowl', name: 'Bát Sứ Thanh Hoa', chance: 1.0, count: 1 },
      { itemId: 'item_lord_coin', name: 'Tiền Chúa Tể', chance: 1.0, count: 100 }
    ]
  },

  // Stage 3 Boss
  {
    id: 'enemy_boss_song_quy_vuong',
    name: 'Song Quỷ Chi Vương Asith (Cấp 12)',
    title: 'Chúa Tể Ngai Vàng Băng Giá - Chương 6 & 7',
    hp: 680,
    maxHp: 680,
    attack: 58,
    defense: 42,
    speed: 19,
    expReward: 550,
    stageId: 3,
    floor: 'Tầng Thượng Băng Giá',
    isBoss: true,
    icon: '👑',
    description: 'Thủ lĩnh bộ tộc Song Quỷ, thi triển bão tuyết hạ nhiệt độ KTX xuống -30°C và chỉ huy vạn quân băng tuyết.',
    skills: [
      { name: 'Băng Phong Trí Tức', damageMultiplier: 1.8, description: 'Đóng băng pháo đài và làm chậm hành động của người chơi.' },
      { name: 'Cuồng Huyết Cực Hạn', damageMultiplier: 1.9, description: 'Song kiếm băng trảm nát độ bền cửa siêu hợp kim.' }
    ],
    weakness: {
      description: 'Nỏ Công Trình Cấp 5 kết hợp Lõi Hàn Khí bắn xuyên lồng ngực đóng đinh Asith lên lan can.',
      counterItemName: 'Khẩu Galax Sấm Sét & Nỏ Công Trình',
      counterItemId: 'weapon_galax_twin',
      damageMultiplier: 2.5,
      folkLoreHint: 'Khi Asith nứt vỡ lõi băng, dùng Minh Hỏa thiêu đốt lập tức hóa giải bão tuyết.'
    },
    drops: [
      { itemId: 'weapon_galax_twin', name: 'Song Súng Galax Sấm Sét Cấp 4', chance: 1.0, count: 1 },
      { itemId: 'item_map_sector09', name: 'Bản Đồ Khu Vực: Sương Mù Máu – Phân Vùng 09', chance: 1.0, count: 1 },
      { itemId: 'item_wolf_pelt', name: 'Da Sói Băng Giá', chance: 1.0, count: 15 },
      { itemId: 'item_lord_coin', name: 'Tiền Chúa Tể', chance: 1.0, count: 150 }
    ]
  },

  // ==========================================
  // THẬP ĐẠI ÁC NHÂN 10 TẦNG LẦU (CHƯƠNG 4)
  // ==========================================

  // Tầng 10: Thi Khôi Kim Cương Cấp 4
  {
    id: 'enemy_boss_thi_khoi',
    name: 'Thi Khôi Cương Thi Kim Cương (Tầng 10)',
    title: 'Thống Lĩnh Kim Cương Bất Hoại - Cấp 4',
    hp: 750,
    maxHp: 750,
    attack: 62,
    defense: 48,
    speed: 16,
    expReward: 650,
    stageId: 4,
    floor: 'Tầng 10',
    isBoss: true,
    icon: '🧟‍♂️',
    description: 'Boss cấp 4 toàn thân xích giao kim cương bất hoại, lắc chuông triệu hồi đàn thi ma đồng giáp trấn giữ 10 tầng.',
    skills: [
      { name: 'Kim Cương Hộ Thể', damageMultiplier: 1.5, description: 'Miễn nhiễm 50% sát thương vật lý và đập nát cửa phòng.' },
      { name: 'Chuông Triệu Hồn Ma', damageMultiplier: 1.2, description: 'Triệu hồi 6 thi ma phụ trợ chiến đấu.' }
    ],
    weakness: {
      description: 'Dùng máu chó mực pha thi độc tạt thẳng vào ngực phá hủy Kim Cương Thân, sau đó dùng súng bắn tỉa xuyên hộp sọ.',
      counterItemName: 'Máu Chó Mực Pha Thi Độc',
      counterItemId: 'item_mau_cho_muc',
      damageMultiplier: 2.5,
      folkLoreHint: 'Cổ Thư Dị Văn: Kim cương cương thi kỵ nhất máu chó mực hắc ám.'
    },
    drops: [
      { itemId: 'armor_kim_tieu', name: 'Kim Tiêu Ngọc Y Cấp 4', chance: 1.0, count: 1 },
      { itemId: 'item_co_thu_di_van', name: 'Cổ Thư Dị Văn Dân Gian', chance: 1.0, count: 1 },
      { itemId: 'item_lord_coin', name: 'Tiền Chúa Tể', chance: 1.0, count: 180 },
      { itemId: 'special_crystal', name: 'Tinh Thể Dị Biến', chance: 1.0, count: 8 }
    ]
  },

  // Tầng 9: Lang Man Tốc Độ
  {
    id: 'enemy_boss_lang_man',
    name: 'Lang Man Huyết Sói (Tầng 9)',
    title: 'Thần Tốc Đao Ma Tầng 9',
    hp: 420,
    maxHp: 420,
    attack: 48,
    defense: 28,
    speed: 26,
    expReward: 380,
    stageId: 4,
    floor: 'Tầng 9',
    isBoss: true,
    icon: '🐺',
    description: 'Nhanh như chớp giật, móng vuốt cào rách mọi tấm chắn kim loại trên hành lang tầng 9.',
    skills: [
      { name: 'Ảnh Lang Trảm', damageMultiplier: 1.6, description: 'Lướt qua bóng tối chém liên tiếp 3 nhát chí mạng.' }
    ],
    weakness: {
      description: 'Dùng kiếm phủ thi độc khắc chế tốc độ di chuyển.',
      counterItemName: 'Thanh Kiếm Độc Thi của Hứa Thanh Nhiên',
      damageMultiplier: 2.2,
      folkLoreHint: 'Cổ Thư Dị Văn: Độc thi ngấm vào gân cốt khiến Lang Man tê liệt chân.'
    },
    drops: [
      { itemId: 'item_wolf_pelt', name: 'Da Sói Băng Giá', chance: 1.0, count: 5 },
      { itemId: 'item_lord_coin', name: 'Tiền Chúa Tể', chance: 1.0, count: 60 }
    ]
  },

  // Tầng 8: Quỷ Thư Sinh
  {
    id: 'enemy_boss_quy_thu_sinh',
    name: 'Quỷ Thư Sinh Thôi Miên (Tầng 8)',
    title: 'Huyễn Thuật Chi Ma Tầng 8',
    hp: 390,
    maxHp: 390,
    attack: 42,
    defense: 25,
    speed: 18,
    expReward: 350,
    stageId: 4,
    floor: 'Tầng 8',
    isBoss: true,
    icon: '📜',
    description: 'Cầm quạt sắt ngâm thơ thôi miên người chơi khiến nạn nhân tự mở cửa nộp mạng.',
    skills: [
      { name: 'Mê Hồn Khúc Điệu', damageMultiplier: 1.4, description: 'Gây hỗn loạn và rút cạn năng lượng MP của mục tiêu.' }
    ],
    weakness: {
      description: 'Dùng Hương Mê Thần thôi miên ngược lại rồi chém đứt đầu trong chớp mắt.',
      counterItemName: 'Hương Mê Thần Thôi Miên',
      counterItemId: 'item_huong_me_than',
      damageMultiplier: 2.4,
      folkLoreHint: 'Cổ Thư Dị Văn: Kẻ dùng huyễn thuật sợ nhất bị mê hương phản phệ.'
    },
    drops: [
      { itemId: 'item_porcelain_bowl', name: 'Bát Sứ Thanh Hoa', chance: 1.0, count: 1 },
      { itemId: 'item_lord_coin', name: 'Tiền Chúa Tể', chance: 1.0, count: 70 }
    ]
  },

  // Tầng 7: Phong Cương Cơ Quan Sư
  {
    id: 'enemy_boss_phong_cuong',
    name: 'Phong Cương Cơ Quan Sư (Tầng 7)',
    title: 'Bậc Thầy Rối Thịt Xương Tầng 7',
    hp: 460,
    maxHp: 460,
    attack: 44,
    defense: 30,
    speed: 15,
    expReward: 400,
    stageId: 4,
    floor: 'Tầng 7',
    isBoss: true,
    icon: '🎎',
    description: 'Chỉ huy 3 con rối cơ quan từ xương thịt (Rối Đầu To bắn kim, Rối Vợ phun lửa, Rối Lực Sĩ).',
    skills: [
      { name: 'Mưa Phi Châm Thép', damageMultiplier: 1.5, description: 'Bắn hàng vạn cây kim xuyên thủng vách tường.' }
    ],
    weakness: {
      description: 'Dùng trường đao hợp kim bén ngót (Kim khắc Mộc) chặt đứt toàn bộ rối cơ quan trước khi chém nát lõi.',
      counterItemName: 'Đao Hợp Kim Cường Hóa',
      damageMultiplier: 2.3,
      folkLoreHint: 'Cổ Thư Dị Văn: Chặt đứt dây nối tơ rối sẽ khiến Phong Cương mất toàn bộ sức chiến đấu.'
    },
    drops: [
      { itemId: 'item_golden_serum', name: 'Dược Tề Gen Hoàng Kim', chance: 0.8, count: 1 },
      { itemId: 'mat_scrap', name: 'Mảnh Kim Loại', chance: 1.0, count: 15 }
    ]
  },

  // Tầng 6: Huyết Cốt Tử
  {
    id: 'enemy_boss_huyet_cot_tu',
    name: 'Huyết Cốt Tử (Tầng 6)',
    title: 'Tà Linh Huyết Cốt Tầng 6',
    hp: 440,
    maxHp: 440,
    attack: 46,
    defense: 29,
    speed: 17,
    expReward: 390,
    stageId: 4,
    floor: 'Tầng 6',
    isBoss: true,
    icon: '🦴',
    description: 'Toàn thân ghép từ xương máu người chết, dưới lòng bàn chân nuôi dưỡng sâu độc bản mệnh.',
    skills: [
      { name: 'Bão Xương Máu', damageMultiplier: 1.5, description: 'Phóng phi tiêu xương gai gây xuất huyết liên tục.' }
    ],
    weakness: {
      description: 'Đặt Bẫy Thú Ẩn Nặc ngay lối rẽ để kích nổ sâu độc bản mệnh dưới lòng bàn chân.',
      counterItemName: 'Bẫy Thú Ẩn Nặc Bản Mệnh',
      counterItemId: 'item_bay_thu_an_nac',
      damageMultiplier: 2.5,
      folkLoreHint: 'Cổ Thư Dị Văn: Sâu độc nổ tung sẽ triệt tiêu hoàn toàn sức mạnh của Huyết Cốt Tử.'
    },
    drops: [
      { itemId: 'special_crystal', name: 'Tinh Thể Dị Biến', chance: 1.0, count: 4 },
      { itemId: 'item_lord_coin', name: 'Tiền Chúa Tể', chance: 1.0, count: 75 }
    ]
  },

  // Tầng 5: Quỷ Họa Bì
  {
    id: 'enemy_boss_hoa_bi',
    name: 'Quỷ Họa Bì Giả Dạng (Tầng 5)',
    title: 'Kẻ Lột Da Đổi Mặt Tầng 5',
    hp: 360,
    maxHp: 360,
    attack: 38,
    defense: 22,
    speed: 21,
    expReward: 310,
    stageId: 4,
    floor: 'Tầng 5',
    isBoss: true,
    icon: '🎭',
    description: 'Khoác lớp da sinh viên để lừa người chơi mở cửa, khi tiếp cận sẽ xé xác nạn nhân.',
    skills: [
      { name: 'Cào Xé Lột Da', damageMultiplier: 1.4, description: 'Đòn đánh cào xé cực nhanh làm giảm phòng ngự.' }
    ],
    weakness: {
      description: 'Dùng nước sôi hoặc ngọn lửa thiêu rụi lớp da giả để lộ nguyên hình.',
      counterItemName: 'Hỏa Cầu Thuật hoặc Bom Cồn Lửa',
      damageMultiplier: 2.2,
      folkLoreHint: 'Cổ Thư Dị Văn: Lớp da nhân tạo kỵ nhất lửa nung.'
    },
    drops: [
      { itemId: 'food_bread', name: 'Bánh Mì Tinh Xảo', chance: 1.0, count: 3 },
      { itemId: 'item_lord_coin', name: 'Tiền Chúa Tể', chance: 1.0, count: 50 }
    ]
  },

  // Tầng 4: Hồng Nương Tử Giày Hoa Đỏ
  {
    id: 'enemy_boss_hong_nuong_tu',
    name: 'Hồng Nương Tử Giày Hoa Đỏ (Tầng 4)',
    title: 'Ác Quỷ Mê Hồn Huyết Hài Tầng 4',
    hp: 380,
    maxHp: 380,
    attack: 40,
    defense: 24,
    speed: 22,
    expReward: 340,
    stageId: 4,
    floor: 'Tầng 4',
    isBoss: true,
    icon: '👠',
    description: 'Ẩn hiện sau lưng người chơi với đôi giày thêu hoa đỏ, thì thầm mê hoặc và bóp nghẹt tâm trí.',
    skills: [
      { name: 'Hơi Thở Lạnh Lẽo', damageMultiplier: 1.4, description: 'Giảm 30 điểm tinh thần và làm tê liệt mục tiêu.' }
    ],
    weakness: {
      description: 'Sử dụng Gương Đồng Bát Quái phản chiếu chân dung tà ma khiến ả tự hoảng loạn tan biến.',
      counterItemName: 'Gương Đồng Bát Quái Chiếu Yêu',
      counterItemId: 'item_guong_dong_bat_quai',
      damageMultiplier: 2.6,
      folkLoreHint: 'Cổ Thư Dị Văn: Tự nhìn thấy dung mạo thật trong gương bát quái sẽ hoảng sợ tiêu tán.'
    },
    drops: [
      { itemId: 'item_porcelain_bowl', name: 'Bát Sứ Thanh Hoa', chance: 0.9, count: 1 },
      { itemId: 'special_crystal', name: 'Tinh Thể Dị Biến', chance: 1.0, count: 3 }
    ]
  },

  // Tầng 3: Kim Giao Tướng Quân
  {
    id: 'enemy_boss_kim_giao',
    name: 'Kim Giao Tướng Quân (Tầng 3)',
    title: 'Thiết Giáp Chiến Quỷ Tầng 3',
    hp: 480,
    maxHp: 480,
    attack: 50,
    defense: 35,
    speed: 14,
    expReward: 420,
    stageId: 4,
    floor: 'Tầng 3',
    isBoss: true,
    icon: '🛡️',
    description: 'Toàn thân bọc giáp sắt nặng nề, cầm đại kích quét sạch hành lang.',
    skills: [
      { name: 'Đại Kích Phá Thành', damageMultiplier: 1.6, description: 'Cú quét kích cực mạnh gây sát thương diện rộng.' }
    ],
    weakness: {
      description: 'Dẫn dụ vào cửa hợp kim phản sát thương kết hợp Song Súng Galax sấm sét truyền điện.',
      counterItemName: 'Song Súng Galax Sấm Sét',
      counterItemId: 'weapon_galax_twin',
      damageMultiplier: 2.2,
      folkLoreHint: 'Cổ Thư Dị Văn: Giáp kim loại dẫn điện cực mạnh khi bị sấm sét đánh trúng.'
    },
    drops: [
      { itemId: 'mat_scrap', name: 'Mảnh Kim Loại', chance: 1.0, count: 20 },
      { itemId: 'item_lord_coin', name: 'Tiền Chúa Tể', chance: 1.0, count: 85 }
    ]
  },

  // Tầng 2: Hồ Yêu Mị Hương
  {
    id: 'enemy_boss_ho_yeu',
    name: 'Hồ Yêu Mị Hương (Tầng 2)',
    title: 'Hồ Ly Huyễn Ảnh Tầng 2',
    hp: 350,
    maxHp: 350,
    attack: 36,
    defense: 22,
    speed: 23,
    expReward: 330,
    stageId: 4,
    floor: 'Tầng 2',
    isBoss: true,
    icon: '🦊',
    description: 'Hóa thân thành mỹ nữ tỏa mùi hương mê hồn khiến kẻ địch mất phương hướng.',
    skills: [
      { name: 'Mị Hương Điên Đảo', damageMultiplier: 1.3, description: 'Làm giảm 50% độ chính xác của người chơi.' }
    ],
    weakness: {
      description: 'Dùng Mộc Tâm Phiến miễn nhiễm mị hương để trảm sát trong một chiêu.',
      counterItemName: 'Mộc Tâm Phiến Thanh Tâm',
      counterItemId: 'item_moc_tam_phien',
      damageMultiplier: 2.5,
      folkLoreHint: 'Cổ Thư Dị Văn: Mộc Tâm Phiến xua tan hương độc, lộ ra tử huyệt ở đuôi.'
    },
    drops: [
      { itemId: 'drink_water', name: 'Nước Tinh Khiết 18L', chance: 1.0, count: 2 },
      { itemId: 'item_lord_coin', name: 'Tiền Chúa Tể', chance: 1.0, count: 65 }
    ]
  },

  // Tầng 1: Quỷ Mù Âm Thanh
  {
    id: 'enemy_boss_quy_mu',
    name: 'Quỷ Mù Âm Thanh (Tầng 1)',
    title: 'Thính Giác Thích Khách Tầng 1',
    hp: 370,
    maxHp: 370,
    attack: 42,
    defense: 24,
    speed: 20,
    expReward: 320,
    stageId: 4,
    floor: 'Tầng 1',
    isBoss: true,
    icon: '👂',
    description: 'Mắt bị mù hoàn toàn nhưng thính giác siêu nhạy, lao tới xé xác bất kỳ ai phát ra tiếng động.',
    skills: [
      { name: 'Âm Ba Thính Phong Trảm', damageMultiplier: 1.5, description: 'Đòn cắn xé bất ngờ dựa theo nguồn âm thanh.' }
    ],
    weakness: {
      description: 'Dùng gõ sàn hoặc ném đồ vật sang hướng khác để đánh lạc hướng rồi đánh lén sau lưng.',
      counterItemName: 'Bẫy Âm Thanh & Đánh Lạc Hướng',
      damageMultiplier: 2.3,
      folkLoreHint: 'Cổ Thư Dị Văn: Tạo tiếng động giả ở góc xa để Quỷ Mù sơ hở quay lưng lại.'
    },
    drops: [
      { itemId: 'special_crystal', name: 'Tinh Thể Dị Biến', chance: 1.0, count: 3 },
      { itemId: 'item_lord_coin', name: 'Tiền Chúa Tể', chance: 1.0, count: 60 }
    ]
  },

  // Stage 5 (Transcendence Boss)
  {
    id: 'enemy_boss_minh_vuong',
    name: 'Minh Vương Thần Khảm Vô Hạn (Cấp EX)',
    title: 'Chúa Tể Cõi U Minh Đa Vũ Trụ',
    hp: 1200,
    maxHp: 1200,
    attack: 88,
    defense: 65,
    speed: 24,
    expReward: 1500,
    stageId: 5,
    floor: 'Đa Vũ Trụ Minh Phủ',
    isBoss: true,
    icon: '🌌',
    description: 'Thực thể cai quản thế giới sương mù máu, nắm giữ 10 mảnh Thập Nhật Linh và quyền năng thao túng sinh tử.',
    skills: [
      { name: 'Minh Hỏa Phần Thiên', damageMultiplier: 2.0, description: 'Thiêu đốt linh hồn, gây sát thương bỏ qua 50% giáp.' },
      { name: 'Thập Nhật Trảm Quyết', damageMultiplier: 2.2, description: 'Đòn trảm diệt thế từ 10 thanh kiếm linh hồn.' }
    ],
    weakness: {
      description: 'Hợp lực của toàn bộ Bạn Cùng Phòng (Bách Quỷ Huyết Khế, Thanh Linh Kiếm, Súng Lôi Đình, Bất Tử).',
      counterItemName: 'Thần Khảm Minh Vương Kiếm & Chiến Giáp Thập Nhật',
      counterItemId: 'weapon_minh_vuong_sword',
      damageMultiplier: 2.0,
      folkLoreHint: 'Khai mở toàn bộ 10 Mảnh Thập Nhật Linh để phá vỡ kết giới bất tử của Minh Vương.'
    },
    drops: [
      { itemId: 'weapon_minh_vuong_sword', name: 'Thần Khảm Minh Vương Kiếm', chance: 1.0, count: 1 },
      { itemId: 'armor_thap_nhat_giap', name: 'Chiến Giáp Thập Nhật Linh Tinh Vân', chance: 1.0, count: 1 },
      { itemId: 'item_thap_nhat_linh', name: 'Mảnh Thần Khảm Thập Nhật Linh', chance: 1.0, count: 5 },
      { itemId: 'item_lord_coin', name: 'Tiền Chúa Tể', chance: 1.0, count: 500 }
    ]
  },

  // Minions
  {
    id: 'enemy_zombie_tang_hinh',
    name: 'Zombie Tàng Hình Bóng Tối',
    title: 'Thích Khách Hành Lang',
    hp: 120,
    maxHp: 120,
    attack: 24,
    defense: 12,
    speed: 20,
    expReward: 60,
    stageId: 1,
    icon: '👤',
    description: 'Ẩn thân trong không khí, móng vuốt sắc bén chực chờ xé xác con mồi.',
    skills: [{ name: 'Cào Xé Hư Không', damageMultiplier: 1.3, description: 'Đòn đánh bất ngờ gây xuất huyết.' }],
    drops: [
      { itemId: 'food_bread', name: 'Bánh Mì Tinh Xảo', chance: 0.8, count: 1 },
      { itemId: 'special_crystal', name: 'Tinh Thể Dị Biến', chance: 0.5, count: 1 }
    ]
  },
  {
    id: 'enemy_song_quy_linh',
    name: 'Binh Lính Song Quỷ Băng Tuyết',
    title: 'Quân Đoàn Băng Giá',
    hp: 160,
    maxHp: 160,
    attack: 28,
    defense: 22,
    speed: 14,
    expReward: 90,
    stageId: 3,
    icon: '❄️',
    description: 'Quái vật băng giá có thể kháng sát thương vật lý và cào cấu cửa phòng.',
    skills: [{ name: 'Hàn Khí Cào Cấu', damageMultiplier: 1.2, description: 'Gây sát thương băng giá.' }],
    drops: [
      { itemId: 'item_wolf_pelt', name: 'Da Sói Băng Giá', chance: 0.85, count: 2 },
      { itemId: 'mat_scrap', name: 'Mảnh Kim Loại', chance: 0.7, count: 3 }
    ]
  }
];

// ==========================================
// 6. ĐỊA ĐIỂM 7 TẦNG KÝ TÚC XÁ
// ==========================================
export const LOCATIONS: LocationArea[] = [
  {
    id: 'loc_room_200',
    name: 'Phòng 200 (Phòng Chúa Tể - Tầng 10)',
    floor: 'Tầng 10',
    danger: 1,
    description: 'Căn cứ địa của Tiết Mộc, Tinh Thần, Vương Như Huyên, Hứa Thanh Nhiên, Liễu Như Yên, Lô Nương và Kế Thư An. Trang bị Cửa Kim Cương, Quỷ Đồng và Pháo Đài Kẻ Phân Tách Không Gian.',
    icon: '👑',
    isLocked: false,
    requiredStage: 1,
    exploredPercentage: 100,
    possibleLoots: ['Bánh Mì Tinh Xảo', 'Nước Lọc 18L', 'Tiền Chúa Tể', 'Đồ Sứ Thanh Hoa'],
    zombieTypes: ['An Toàn Tuyệt Đối']
  },
  {
    id: 'loc_floor_10',
    name: 'Hành Lang Tầng 10 (Khu Trương Vũ Đình & Liễu Như Yên)',
    floor: 'Tầng 10',
    danger: 2,
    description: 'Tầng cao nhất với nhiều cao thủ và hỏa lực mạnh nhất tòa KTX.',
    icon: '🏢',
    isLocked: false,
    requiredStage: 1,
    exploredPercentage: 80,
    possibleLoots: ['Gậy Bóng Chày', 'Bản Thiết Kế Pháo Đài', 'Mảnh Kim Loại'],
    zombieTypes: ['Zombie Tàng Hình', 'Thi Khôi Đồng Giáp', 'Song Quỷ Cận Vệ']
  },
  {
    id: 'loc_floor_7_8',
    name: 'Tầng 7 & 8 (Khu Vực Phong Cương & Quỷ Thư Sinh)',
    floor: 'Tầng 7-8',
    danger: 3,
    description: 'Hành lang đầy rối cơ quan và sương độc, nơi Trịnh Siêu từng bị bao vây.',
    icon: '🎎',
    isLocked: false,
    requiredStage: 2,
    exploredPercentage: 50,
    possibleLoots: ['Phi Châm Thép', 'Trường Thương', 'Da Sói Băng'],
    zombieTypes: ['Rối Đầu To', 'Quỷ Thư Sinh', 'Huyết Cốt Tử']
  },
  {
    id: 'loc_canteen',
    name: 'Căn Tin & Nhà Ăn (Khu Phe Cánh Tống Vân Đề)',
    floor: 'Tầng 1-2',
    danger: 3,
    description: 'Nơi tập trung nguồn lương thực, bánh mì và máy lọc nước dự trữ.',
    icon: '🍲',
    isLocked: false,
    requiredStage: 1,
    exploredPercentage: 65,
    possibleLoots: ['Bánh Mì Cũ', 'Nước Ngọt', 'Dao Bếp Chém Thịt', 'Củi Khô'],
    zombieTypes: ['Zombie Đầu Bếp', 'Zombie Bụng Bự', 'Tiểu Quỷ Tàn Tật']
  },
  {
    id: 'loc_gymnasium',
    name: 'Nhà Thi Đấu Thể Thao KTX (Tổ Ấp Trứng Biến Dị)',
    floor: 'Tầng Trệt & Sân',
    danger: 4,
    description: 'Nơi Zombie tập kết thôn phệ đồng loại tiến hóa thành Zombie Khổng Lồ Cấp 3.',
    icon: '🏟️',
    isLocked: false,
    requiredStage: 2,
    exploredPercentage: 40,
    possibleLoots: ['Súng Lục G17', 'Thuốc Giảm Đau', 'Quân Bài Chuồn 3', 'Da Sói'],
    zombieTypes: ['Zombie Khổng Lồ', 'Zombie Bò Trườn', 'Zombie Tàng Hình']
  },
  {
    id: 'loc_dongho_park',
    name: 'Công Viên & Hồ Nước Đông Hồ',
    floor: 'Khu Hoang Dã Ngoại Vi',
    danger: 5,
    description: 'Lãnh địa riêng của Tiết Mộc, nơi lặn tìm bảo vật Khiên Trụ Phản Xạ và bí kíp Minh Hỏa dưới đáy hồ.',
    icon: '🌊',
    isLocked: false,
    requiredStage: 3,
    exploredPercentage: 30,
    possibleLoots: ['Khiên Trụ Phản Xạ Cấp 3', 'Cuộn Kỹ Năng Minh Hỏa', 'Mảnh Thần Khảm'],
    zombieTypes: ['Thuỷ Quái Đông Hồ', 'Ác Quỷ Băng Sương', 'Linh Hồn Tổ Tiên']
  }
];

// ==========================================
// 7. CỐT TRUYỆN THẾ GIỚI 7 CHƯƠNG THEO TIỂU THUYẾT NGUYÊN TÁC
// ==========================================
export const WORLD_LORE_CHAPTERS: WorldLoreChapter[] = [
  {
    id: 'lore_ch1',
    chapterNumber: 1,
    title: 'Chương 1: Khởi Đầu Hỗn Loạn – Thức Tỉnh Thiên Phú Chúa Tể',
    unlockedDay: 1,
    isUnlocked: true,
    content: `Tiết Mộc và hoa khôi lớp Tinh Thần đột ngột bị dịch chuyển vào Ký Túc Xá Sinh Tồn. Tiết Mộc kích hoạt thành công Thiên Phú Ẩn: CHÚA TỂ DUNG HỢP (Cấp 1):
- Quy tắc cốt lõi: Duy trì trạng thái nghỉ ngơi/ngủ để sản sinh Tiền Chúa Tể (40 xu/giờ).
- Đồng đội chất lượng cao Tinh Thần tăng +96% tốc độ sản xuất!
- Tiền Chúa Tể có thể cường hóa, tái cấu trúc và dung hợp mọi vật phẩm, kiến trúc, đạo cụ.

Khi tên côn đồ Vương Đại Tráng đá cửa phòng 200 đòi cướp vật tư tân thủ, Tiết Mộc tiêu hao Tiền Chúa Tể nâng cấp cánh cửa gỗ mục thành Cửa Hợp Kim Ánh Kim. Cú đá của Vương Đại Tráng bị phản chấn gãy xương ống chân. Đêm đầu tiên, Zombie sơ cấp tràn vào tàn sát người chơi ngoài hành lang, nhưng phòng 200 bất khả xâm phạm.`
  },
  {
    id: 'lore_ch2',
    chapterNumber: 2,
    title: 'Chương 2: Xây Dựng Cứ Điểm – Chiêu Mộ Đồng Minh & Bẫy Tiến Hóa',
    unlockedDay: 8,
    isUnlocked: false,
    content: `Ngày thứ 2, Tiết Mộc dùng 1 mẩu bánh mì đổi lấy chiếc Máy Lọc Nước cũ nát rồi nâng cấp thành Máy Lọc Nước Hợp Kim Nguyên Sinh (18L/ngày). Vấn đề nước sạch được giải quyết.

Tiết Mộc chiêu mộ Vương Như Huyên – nữ sinh thức tỉnh Thiên phú Ngự Quỷ Sư (Cấp SS, +90% cộng hưởng Tiền Chúa Tể). 

Ngày thứ 4, tại Nhà Thi Đấu, Zombie tiến hóa Thôn Phệ xuất hiện. Đợt tổng tấn công của các phe phái thất bại thảm hại trước Zombie Khổng Lồ Cấp 3. Một con Zombie Tàng Hình mò lên tầng 10, Tiết Mộc dùng 200 Tiền Chúa Tể nâng cấp khẩu Glock-17 thành Ánh Bạc Lôi Đình, bắn hạ chuẩn xác cả Zombie Tàng Hình lẫn Zombie Khổng Lồ, đoạt Top 1 Bảng Xếp Hạng Toàn Server!`
  },
  {
    id: 'lore_ch3',
    chapterNumber: 3,
    title: 'Chương 3: Phong Vương Đệ Nhất – Đêm Hồi Hồn & Thư Mời Minh Phủ',
    unlockedDay: 15,
    isUnlocked: false,
    content: `Phòng 200 nhận danh hiệu "Ký Túc Xá Phong Vương", mở khóa Quỷ Đồng Hộ Mệnh Cấp 3 và kỹ năng Siêu Trực Giác.

Hoàng Dũng dẫn tay sai lên tầng 10 cướp phòng, bị Quỷ Đồng định thân và Hắc Thiết Liên Nỗ bắn gục tại chỗ. Liễu Như Yên xuất hiện cảnh báo quy tắc ngầm về Chỉ Số Thù Hận. Tiết Mộc chiêu mộ Hứa Thanh Nhiên – nữ kiếm khách võ học cổ truyền.

Đêm Hồi Hồn giáng lâm: Oán linh người chơi quay lại báo thù, nhưng Quỷ Đồng hút sạch vào bụng tạo thành hàng vạn kinh nghiệm thuần khiết. Khi Âm Sai Minh Phủ tuần tra khảo sát, Tiết Mộc dâng lên Bát Sứ Thanh Hoa Cấp 1, nhận lại Thư Mời Minh Phủ và manh mối về Thập Nhật Linh!`
  },
  {
    id: 'lore_ch4',
    chapterNumber: 4,
    title: 'Chương 4: Điểm Yếu Dân Gian – Cuộc Càn Quét Thập Đại Ác Nhân',
    unlockedDay: 29,
    isUnlocked: false,
    content: `Nhờ cuốn Cổ Thư Dị Văn Dân Gian được cường hóa, Tiết Mộc nắm rõ điểm yếu của 10 con Boss cai quản 10 tầng lầu:
- Tầng 10 (Thi Khôi): Dùng máu chó mực phá Kim Cương Thân, bắn tỉa vỡ sọ (nhận Kim Tiêu Ngọc Y Cấp 4).
- Tầng 9 & 8 (Lang Man & Quỷ Thư Sinh): Dùng độc thi và Hương Mê Thần trảm sát.
- Tầng 7 (Phong Cương): Đao hợp kim chặt đứt rối cơ quan.
- Tầng 6 (Huyết Cốt Tử): Bẫy Thú Ẩn Nặc nổ sâu độc bản mệnh.
- Tầng 4 & 2 (Hồng Nương Tử & Hồ Yêu): Gương bát quái phản chiếu và Mộc Tâm Phiến miễn mị hương.

Phòng 200 độc chiếm Top 4 toàn bảng, thu về hơn 100.000 Tiền Vàng và Máy Thu Thanh Đa Chiều.`
  },
  {
    id: 'lore_ch5',
    chapterNumber: 5,
    title: 'Chương 5: Sóng Radio Bí Ẩn – Bước Chân Vào Hội Tương Trợ Huyết Vụ',
    unlockedDay: 40,
    isUnlocked: false,
    content: `Sau 47 lần dò sóng tốn hàng ngàn kim tệ, Tiết Mộc bắt được tần số 107.5MHz của Hội Tương Trợ Huyết Vụ từ Đao Khách Dạ Vũ (Top 97). Sự thật hé lộ: KTX chỉ là 1 trong hàng ngàn Tế Đàn, tồn tại các Du Hiệp bí ẩn và các tòa nhà sắp bị ép sáp nhập tàn sát lẫn nhau.

Tuyển thêm Lô Nương (+97 thoải mái, 500 xu/ngày). Vương Như Huyên mở khóa Bách Quỷ Huyết Khế, thu phục 3 tiểu quỷ và 2 Song Quỷ Đại Pháp Sư. Cùng Chu Lỗi lặn xuống hồ Đông Hồ tìm được Khiên Trụ Phản Xạ Cấp 3 và bí kíp Minh Hỏa.`
  },
  {
    id: 'lore_ch6',
    chapterNumber: 6,
    title: 'Chương 6: Đêm Cực Hàn & Đại Chiến Song Quỷ Chi Vương Asith',
    unlockedDay: 55,
    isUnlocked: false,
    content: `Hiện tượng Đêm Cực Hàn hạ nhiệt độ xuống -30°C và -40°C do ma pháp của Song Quỷ Chi Vương Asith (Cấp 12). Phe tài phiệt Vương Đức Lợi đầu cơ Da Sói đẩy giá lên 10.000 Tiền Vàng. Tiết Mộc âm thầm xả kho hàng trăm tấm Da Sói, thu về hơn 800.000 Tiền Vàng và đánh sập phe đầu cơ.

Tiết Mộc nâng cấp Pháo Đài Kẻ Phân Tách Không Gian (Cấp 6) và Nỏ Công Trình Cấp 5. Trong đêm Dạ Mị, Siêu Trực Giác phối hợp Quỷ Đồng tiêu diệt 10 Ma Cà Rồng Thuần Huyết, thu 10 Huyết Tinh Cực Phẩm.`
  },
  {
    id: 'lore_ch7',
    chapterNumber: 7,
    title: 'Chương 7: Bước Ra Sương Mù – Hướng Tới Thành Phố Hoang Tàn',
    unlockedDay: 70,
    isUnlocked: false,
    content: `Asith thân chinh giáng lâm tầng 10 trong trạng thái Cuồng Huyết Cực Hạn. Tiết Mộc kích hoạt Chúa Tể Dung Hợp Thức Tỉnh Cấp 2, bắn mũi trọng tiễn băng tím đóng đinh Asith lên lan can; Minh Hỏa của Như Huyên và kiếm của Thanh Nhiên kết liễu hoàn toàn gã vua quỷ.

Tiết Mộc thu được Bản Đồ Khu Vực: Sương Mù Máu – Phân Vùng 09 (8 Tế Đàn lân cận đang hợp nhất). Kế Thư An (người mang hệ thống Bất Tử) xuất hiện cảnh báo về cuộc chiến khốc liệt tiếp theo. 

Kỷ nguyên Ký Túc Xá khép lại, cánh cửa dẫn vào Thành Phố Hoang Tàn và Đại Chiến Các Tòa Tháp chính thức mở ra!`
  }
];

// ==========================================
// 8. ĐÀI PHÁT THANH HUYẾT VỤ (RADIO TRANSMISSIONS)
// ==========================================
export const RADIO_TRANSMISSIONS: RadioTransmission[] = [
  {
    id: 'radio_1',
    sender: 'Đao Khách Dạ Vũ (Top 97 Toàn Cầu)',
    rank: 'Quản Trị Viên Hội Tương Trợ Huyết Vụ',
    frequency: '107.5 MHz',
    title: 'Bí Mật 1000 Tế Đàn & Du Hiệp Thế Giới Sương Mù',
    message: 'Tân thủ phòng 200 nghe rõ! Tòa KTX của các cậu chỉ là 1 trong hàng ngàn Tế Đàn trong Thế Giới Sương Mù Máu. Những người chơi mang hệ thống Du Hiệp có thể di chuyển tự do ngoài hoang dã. Chuẩn bị tinh thần: các tòa tháp sắp bị ép sáp nhập để tàn sát lẫn nhau!',
    timestamp: 'Hôm nay 07:15',
    secretIntel: 'Đợt rét -30°C sinh ra từ ma pháp của Asith Cấp 12. Khi Asith chết nhiệt độ sẽ ấm lại ngay, tuyệt đối phải xả hàng Da Sói trước trận chiến!',
    isSecret: true,
    requiredAttempts: 47,
    isUnlocked: false
  },
  {
    id: 'radio_2',
    sender: 'Nữ Quỷ Nửa Đêm (Hội Tương Trợ)',
    rank: 'Hội Viên Kênh Huyết Vụ',
    frequency: '107.5 MHz',
    title: 'Quy Tắc Sinh Vật Bóng Tối & Đêm Dạ Mị',
    message: 'Sinh vật bóng tối trong đêm Dạ Mị có khả năng nguyên tố hóa né tránh đạn pháo. Phải dùng Quỷ Đồng định thân và kích hoạt Siêu Trực Giác mới bắn trúng được!',
    timestamp: 'Hôm qua 23:40',
    secretIntel: 'Thu thập đủ 10 Huyết Tinh Cực Phẩm có thể dung hợp Kỹ Năng Huyết Khí Thần Cấp.',
    isSecret: false,
    isUnlocked: true
  },
  {
    id: 'radio_3',
    sender: 'Kênh Cứu Trợ Tòa Tháp 04',
    rank: 'Kênh Khẩn Cấp Công Cộng',
    frequency: '98.2 MHz',
    title: 'Cảnh Báo Về Phe Đầu Cơ Vật Tư Chống Rét',
    message: 'Nhóm tài phiệt Vương Đức Lợi đang gom sạch Da Sói trên sàn đấu giá để ép giá sinh viên nghèo. Mọi người cẩn thận đừng bán tháo tài nguyên sinh tồn!',
    timestamp: 'Hôm qua 18:20',
    secretIntel: 'Vương Đức Lợi sẽ phá sản nếu giá Da Sói sụp đổ đột ngột trước khi bão tuyết tan.',
    isSecret: false,
    isUnlocked: true
  }
];

// ==========================================
// 9. CÁC HỆ THỐNG KHÁC (FACILITIES, PETS, TALENTS, QUESTS, SURVIVORS)
// ==========================================
export const BASE_FACILITIES: BaseFacility[] = [
  {
    id: 'fac_steel_fence',
    name: 'Hàng Rào Hợp Kim & Cửa Phòng 200',
    level: 3,
    maxLevel: 10,
    icon: '🚪',
    description: 'Cửa hợp kim cường hóa bằng Tiền Chúa Tể, có khả năng phản sát thương và tự động hồi phục độ bền.',
    currentEffect: 'Phòng thủ +80, Độ bền 130/130, Hồi 30 HP khi quái vật bị tiêu diệt.',
    defensePower: 80,
    upgradeCost: [
      { itemId: 'item_lord_coin', name: 'Tiền Chúa Tể', count: 150 },
      { itemId: 'mat_scrap', name: 'Mảnh Kim Loại', count: 10 }
    ]
  },
  {
    id: 'fac_uv_turret',
    name: 'Ụ Pháo Kẻ Phân Tách Không Gian',
    level: 4,
    maxLevel: 10,
    icon: '⚡',
    description: 'Máy bắn bi phân tách đạn pháo tử khí, quét sạch quái vật trong bán kính 5 mét.',
    currentEffect: 'Tấn công 180, Bắn 3 đạn phân tách tốc độ cực nhanh.',
    defensePower: 120,
    upgradeCost: [
      { itemId: 'item_lord_coin', name: 'Tiền Chúa Tể', count: 200 },
      { itemId: 'special_crystal', name: 'Tinh Thể Não Quái', count: 2 }
    ]
  },
  {
    id: 'fac_water_purifier',
    name: 'Máy Lọc Nước Cường Hóa 18L',
    level: 2,
    maxLevel: 5,
    icon: '💧',
    description: 'Máy lọc nước dã chiến mua với giá 1 lát bánh mì và nâng cấp bằng Tiền Chúa Tể.',
    currentEffect: 'Tự động cung cấp 8 bình nước sạch mỗi ngày.',
    defensePower: 15,
    upgradeCost: [
      { itemId: 'item_lord_coin', name: 'Tiền Chúa Tể', count: 60 }
    ],
    dailyProduction: {
      itemId: 'drink_water',
      name: 'Nước Tinh Khiết 18L',
      count: 4
    }
  },
  {
    id: 'fac_guardian_altar',
    name: 'Thần Khảm Quỷ Đồng Hộ Mệnh',
    level: 2,
    maxLevel: 5,
    icon: '⛩️',
    description: 'Tủ thờ trên cửa lớn nuôi dưỡng Quỷ Đồng hút u linh và định thân quái vật.',
    currentEffect: 'Tự động hấp thụ u linh tạo điểm tích lũy, trói chân Boss trong 3 giây.',
    defensePower: 90,
    upgradeCost: [
      { itemId: 'item_lord_coin', name: 'Tiền Chúa Tể', count: 300 },
      { itemId: 'item_porcelain_bowl', name: 'Bát Sứ Thanh Hoa', count: 1 }
    ]
  }
];

export const INITIAL_PETS: PetCompanion[] = [
  {
    id: 'pet_shadow_cat',
    name: 'Tiểu Quỷ Âm Ảnh (Ngự Quỷ Linh)',
    species: 'U Linh Thuộc Hạ',
    icon: '👻',
    level: 2,
    exp: 40,
    maxExp: 100,
    tier: 'A',
    skillName: 'Trói Chân & Khiếp Sợ',
    skillDesc: 'Đè bẹp kẻ địch xuống đất, làm giảm 30% tốc độ và phòng thủ của quái vật.',
    bonusStats: { atk: 12, critRate: 10, lootChance: 20 },
    hunger: 80,
    isActive: true
  },
  {
    id: 'pet_frost_mage',
    name: 'Song Quỷ Đại Pháp Sư (Đã Thu Phục)',
    species: 'Hồn Quái Băng Tuyết',
    icon: '🧙‍♂️',
    level: 3,
    exp: 60,
    maxExp: 200,
    tier: 'S',
    skillName: 'Song Diễm Băng Hỏa',
    skillDesc: 'Phun luồng lửa xanh đóng băng và thiêu đốt linh thể kẻ địch.',
    bonusStats: { atk: 25, def: 18, lootChance: 15 },
    hunger: 90,
    isActive: false
  }
];

export const INITIAL_TALENTS: TalentNode[] = [
  {
    id: 'talent_w1',
    name: 'Long Tượng Thể Phách',
    tree: 'warrior',
    icon: '💪',
    description: 'Tăng vĩnh viễn +5 STR và +10% Sát thương cận chiến bằng đao kiếm.',
    level: 1,
    maxLevel: 5,
    costPoints: 2,
    effect: { str: 5, atkPct: 10 }
  },
  {
    id: 'talent_m1',
    name: 'Trực Giác Ác Ý Toàn Tri',
    tree: 'mage',
    icon: '🔮',
    description: 'Cảm nhận trước ý đồ tấn công và điểm yếu của quái vật trong bán kính 10m.',
    level: 1,
    maxLevel: 5,
    costPoints: 2,
    effect: { int: 5, critRate: 8 }
  },
  {
    id: 'talent_l1',
    name: 'Thao Túng Thị Trường & Thu Mua',
    tree: 'leader',
    icon: '💰',
    description: 'Tăng 25% giá trị giao dịch vật tư và tăng tỉ lệ nhận Tiền Chúa Tể khi ngủ.',
    level: 1,
    maxLevel: 5,
    costPoints: 2,
    effect: { lck: 5, scavengeBonus: 25 }
  },
  {
    id: 'talent_i1',
    name: 'Cường Hóa Bất Tử Chi Khu',
    tree: 'immortal',
    icon: '🛡️',
    description: 'Tăng +15 VIT và hồi phục 5% HP mỗi lượt khi cố thủ trong phòng 200.',
    level: 1,
    maxLevel: 5,
    costPoints: 3,
    effect: { vit: 15, defPct: 15 }
  }
];

export const INITIAL_BESTIARY: BestiaryEntry[] = [
  {
    id: 'bestiary_thi_khoi',
    name: 'Thi Khôi Kim Cương Cấp 4',
    icon: '🧟‍♂️',
    type: 'Đoàn Mới Sát Thủ Thi Ma',
    threatLevel: 'Cực Kỳ Nguy Hiểm (Cấp 4)',
    killCount: 1,
    weakness: 'Chất lỏng hắc ám tanh nồng phá hủy lớp Kim Cương Bất Hoại, bắn tập trung vào đầu.',
    description: 'Boss thống lĩnh 10 tầng KTX, toàn thân cứng như kim cương, có khả năng lắc chuông triệu hồi tiểu đệ.',
    lore: 'Được ghi chép trong Cổ Thư Dị Văn Dân Gian là 1 trong 10 đại ác nhân biến dị.'
  },
  {
    id: 'bestiary_song_quy_vuong',
    name: 'Song Quỷ Chi Vương Athi',
    icon: '👑',
    type: 'Băng Tộc Ma Vương',
    threatLevel: 'Cấp Thần (Cấp 8/12)',
    killCount: 1,
    weakness: 'Nỏ Công Trình Cấp 5 bắn xuyên tim khi hắn giáp lá cà tại cửa phòng.',
    description: 'Thủ lĩnh mang ngai vàng băng giá, có khả năng hạ nhiệt độ toàn vùng xuống -30°C.',
    lore: 'Tiêu diệt Song Quỷ Chi Vương sẽ làm bão tuyết tan biến và nhặt được Song Súng Galax.'
  },
  {
    id: 'bestiary_hong_nuong_tu',
    name: 'Hồng Nương Tử Giày Hoa Đỏ',
    icon: '👠',
    type: 'Mê Hồn Oán Nữ',
    threatLevel: 'Nguy Hiểm (Tầng 4)',
    killCount: 1,
    weakness: 'Gương soi mặt thật và Bùa Trừ Tà dán sau lưng.',
    description: 'Xuất hiện sau lưng ghé sát tai thì thầm mê hoặc, nhét giày thêu hoa đỏ dưới gót chân nạn nhân.',
    lore: 'Tự nhìn thấy dung mạo thật trong gương sẽ hoảng sợ tan biến thành làn khói đen.'
  }
];

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'quest_1',
    title: 'Cố Thủ Phòng 200 & Nâng Cấp Cửa Kim Cương',
    description: 'Sử dụng Tiền Chúa Tể nâng cấp cửa phòng lên Cửa Kim Cương Cấp 3 để chống đỡ đợt sóng quái vật ban đêm.',
    rewardExp: 100,
    rewardItems: [{ ...INITIAL_ITEMS[0], quantity: 50 }],
    rewardPoints: 2,
    progress: 1,
    targetProgress: 1,
    type: 'upgrade_base',
    completed: true,
    claimed: false
  },
  {
    id: 'quest_2',
    title: 'Tiêu Diệt Đại Quân Song Quỷ & Boss Athi',
    description: 'Sử dụng Pháo đài Kẻ Phân Tách Không Gian và Song Súng Galax bắn hạ 10 quái vật băng giá.',
    rewardExp: 250,
    rewardItems: [{ ...INITIAL_ITEMS[2], quantity: 1 }],
    rewardPoints: 5,
    progress: 4,
    targetProgress: 10,
    type: 'kill',
    completed: false,
    claimed: false
  },
  {
    id: 'quest_3',
    title: 'Thu Thập Bát Sứ & Giao Dịch Âm Sai',
    description: 'Mua hoặc chế tạo Bát Sứ Thanh Hoa để giao dịch lấy Thư Mời Minh Phủ từ Quỷ Sai.',
    rewardExp: 200,
    rewardItems: [{ ...INITIAL_ITEMS[4], quantity: 1 }],
    rewardPoints: 4,
    progress: 1,
    targetProgress: 1,
    type: 'craft',
    completed: true,
    claimed: false
  }
];

export const INITIAL_MARKET_OFFERS: MarketOffer[] = [
  {
    id: 'offer_1',
    sellerName: 'Chu Lỗi (Trinh Sát Ống Gió)',
    room: 'Phòng Y Tế',
    offering: { name: 'Súng Lục G17 Tân Thủ', icon: '🔫', count: 1 },
    asking: { name: 'Thuốc Giảm Đau & Băng Gạc', icon: '🩹', count: 2 },
    completed: false
  },
  {
    id: 'offer_2',
    sellerName: 'Trương Vũ Đình (Đại Ca Tầng 10)',
    room: 'Phòng 204',
    offering: { name: 'Mảnh Kim Loại & Ốc Vít', icon: '🔩', count: 15 },
    asking: { name: 'Nước Tinh Khiết 18L', icon: '💧', count: 2 },
    completed: false
  },
  {
    id: 'offer_3',
    sellerName: 'Vương Đức Lợi (Đầu Cơ Tầng 3)',
    room: 'Phòng 301',
    offering: { name: 'Tiền Vàng KTX', icon: '💰', count: 8000 },
    asking: { name: 'Tấm Da Sói Băng Giá', icon: '🐺', count: 1 },
    completed: false
  }
];

export function generateInitialSurvivors(): Survivor[] {
  return [
    {
      id: 'survivor_tinh_than',
      name: 'Tinh Thần',
      room: 'Phòng 200',
      status: 'alive',
      role: 'guard',
      gender: 'female',
      originalJob: 'Hoa Khôi Khoa Kinh Tế',
      awakenedSkill: SKILL_POOL[0],
      hp: 100,
      maxHp: 100,
      mood: 95,
      specialty: 'Xạ thủ Súng Lôi Đình, tăng 96% sản xuất Tiền Chúa Tể'
    },
    {
      id: 'survivor_nhu_huyen',
      name: 'Vương Như Huyên',
      room: 'Phòng 200',
      status: 'alive',
      role: 'scavenger',
      gender: 'female',
      originalJob: 'Sinh Viên Năm Nhất',
      awakenedSkill: SKILL_POOL[7],
      hp: 90,
      maxHp: 90,
      mood: 90,
      specialty: 'Thức tỉnh Ngự Quỷ Linh, tăng 90% sản xuất Tiền Chúa Tể'
    },
    {
      id: 'survivor_thanh_nhien',
      name: 'Hứa Thanh Nhiên',
      room: 'Phòng 200',
      status: 'alive',
      role: 'guard',
      gender: 'female',
      originalJob: 'Kiếm Sư Trường Thể Thao',
      awakenedSkill: SKILL_POOL[6],
      hp: 110,
      maxHp: 110,
      mood: 95,
      specialty: 'Thanh Linh Kiếm Quyết, tăng 93% sản xuất Tiền Chúa Tể'
    },
    {
      id: 'survivor_lo_nuong',
      name: 'Lô Nương (Sona)',
      room: 'Phòng 200',
      status: 'alive',
      role: 'medic',
      gender: 'female',
      originalJob: 'Cựu Giảng Viên Ngoại Ngữ',
      awakenedSkill: SKILL_POOL[9] || SKILL_POOL[0],
      hp: 95,
      maxHp: 95,
      mood: 92,
      specialty: 'Trị Liệu Dã Chiến, tăng 97% sản xuất Tiền Chúa Tể (500 xu/ngày)'
    },
    {
      id: 'survivor_ke_thu_an',
      name: 'Kế Thư An',
      room: 'Phòng 200',
      status: 'alive',
      role: 'guard',
      gender: 'male',
      originalJob: 'Kẻ Nắm Giữ Hệ Thống Bất Tử',
      awakenedSkill: SKILL_POOL[5] || SKILL_POOL[0],
      hp: 150,
      maxHp: 150,
      mood: 99,
      specialty: 'Bất Tử Thần Khảm, Tái sinh vô hạn, tăng 120% Tiền Chúa Tể'
    },
    {
      id: 'survivor_truong_vu_dinh',
      name: 'Trương Vũ Đình',
      room: 'Phòng 204',
      status: 'alive',
      role: 'guard',
      gender: 'female',
      originalJob: 'Chiến Thần Tầng 10',
      awakenedSkill: SKILL_POOL[2],
      hp: 120,
      maxHp: 120,
      mood: 88,
      specialty: 'Chùy Gai & Gậy Sắt Cận Chiến'
    },
    {
      id: 'survivor_lieu_nhu_yen',
      name: 'Liễu Như Yên',
      room: 'Phòng 208',
      status: 'alive',
      role: 'scavenger',
      gender: 'female',
      originalJob: 'Thích Khách Mặt Nạ Kỳ Cựu',
      awakenedSkill: SKILL_POOL[4],
      hp: 105,
      maxHp: 105,
      mood: 90,
      specialty: 'Ám Sát Hư Không, Cảnh Báo Thù Hận'
    },
    {
      id: 'survivor_chu_loi',
      name: 'Chu Lỗi',
      room: 'Phòng Y Tế',
      status: 'alive',
      role: 'scavenger',
      gender: 'male',
      originalJob: 'Trinh Sát Đường Ống Thông Gió',
      awakenedSkill: SKILL_POOL[8] || SKILL_POOL[0],
      hp: 85,
      maxHp: 85,
      mood: 85,
      specialty: 'Chạy nước rút, do thám tin tức ngầm'
    }
  ];
}
