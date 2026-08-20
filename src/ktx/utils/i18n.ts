export type Language = 'vi' | 'en';

export const DICTIONARY: Record<Language, Record<string, string>> = {
  vi: {
    // Top Bar & Meta
    'app.title': 'KÝ TÚC XÁ SINH TỒN RPG',
    'app.subtitle': 'Tận Thế Dị Biến & Thức Tỉnh Kỹ Năng',
    'app.day': 'NGÀY',
    'app.stage': 'GIAI ĐOẠN',
    'app.danger': 'NGUY HIỂM',
    'app.coins': 'Xu Chúa Tể',
    'app.crystals': 'Tinh Thể Dị Biến',
    'app.aggro': 'Điểm Thù Hận',
    'app.pioneer': 'Điểm Phong Vương',
    'app.back_world': 'Chọn Thế Giới',
    'app.mute': 'Tắt Âm',
    'app.unmute': 'Bật Âm',
    'app.reset': 'Khởi Động Lại',
    'app.reset_confirm': 'Bạn có chắc chắn muốn xóa toàn bộ dữ liệu và bắt đầu lại từ đầu?',
    'app.language': 'Ngôn Ngữ',
    
    // Survival Gauges
    'gauge.hp': 'HP (SINH LỰC)',
    'gauge.sp': 'SP (THỂ LỰC)',
    'gauge.mp': 'MP (NĂNG LƯỢNG)',
    'gauge.hunger': 'Đói',
    'gauge.thirst': 'Khát',
    'gauge.sanity': 'Tâm Trí',
    'gauge.level': 'Cấp',
    'gauge.exp': 'EXP',

    // Character Stats
    'stat.str': 'Sức Mạnh (STR)',
    'stat.agi': 'Thân Pháp (AGI)',
    'stat.vit': 'Thể Lực (VIT)',
    'stat.int': 'Trí Tuệ (INT)',
    'stat.lck': 'May Mắn (LCK)',
    'stat.unspent_points': 'Điểm Tiềm Năng',
    'stat.allocate': 'Cộng Điểm',
    'stat.equipment': 'Trang Bị Hiện Tại',
    'stat.weapon': 'Vũ Khí',
    'stat.armor': 'Áo Giáp',
    'stat.accessory': 'Phụ Kiện',
    'stat.companion': 'Bạn Đồng Hành',
    'stat.bond': 'Độ Thân Mật',

    // Tactical Deck / Navigation Menu
    'menu.explore': 'Thám Hiểm KTX',
    'menu.lord_room': 'Phòng 200 Chúa Tể',
    'menu.defense': 'Thủ Thành KTX',
    'menu.skill_tree': 'Đột Phá Kỹ Năng',
    'menu.blacksmith': 'Lò Rèn Vạn Vật',
    'menu.crafting': 'Chế Tạo Đồ',
    'menu.inventory': 'Túi Đồ',
    'menu.survivors': '100 Cư Dân KTX',
    'menu.quests': 'Nhiệm Vụ & Luật',
    'menu.radio': 'Đài Radio 107.5MHz',
    'menu.pets': 'Thú Cưng Dị Biến',
    'menu.codex': 'Bách Khoa Toàn Thư',
    'menu.oracle': 'AI Tiên Tri',

    // Actions & Combat
    'action.attack': 'Tấn Công Thường',
    'action.skill': 'Thi Triển Kỹ Năng',
    'action.item': 'Dùng Vật Phẩm',
    'action.escape': 'Rút Lui / Bỏ Chạy',
    'action.upgrade': 'Nâng Cấp',
    'action.fuse': 'Dung Hợp',
    'action.equip': 'Trang Bị',
    'action.unequip': 'Tháo Ra',
    'action.use': 'Sử Dụng',
    'action.craft': 'Chế Tạo',
    'action.trade': 'Trao Đổi',
    'action.claim': 'Nhận Thưởng',
    'action.close': 'Đóng',
    'action.confirm': 'Xác Nhận',
    'action.rest': 'Nghỉ Ngơi',
    'action.sleep': 'Đi Ngủ & Thu Hoạch',
    'action.feed': 'Cho Ăn',
    'action.enhance': 'Cường Hóa',

    // Lord Room & Defense
    'lord.bed': 'Giường Ngủ Chúa Tể',
    'lord.door': 'Cửa Thép Phòng Thủ',
    'lord.turret_left': 'Tháp Pháo Trái',
    'lord.turret_right': 'Tháp Pháo Phải',
    'lord.guardian': 'Bảo Hộ Thần Thú',
    'lord.tenants': 'Danh Sách Bạn Cùng Phòng',
    'lord.hourly_production': 'Sản lượng/Giờ',
    'lord.defense_power': 'Lực Phòng Thủ',
    'lord.aggro_toggle': 'Chế Độ Thu Hút Quái',
    'lord.sleep_success': 'Bạn đã ngủ say 8 tiếng! Thu được tài nguyên và hồi phục toàn bộ thể lực.',

    // Radio
    'radio.title': 'TRẠM THU PHÁT RADIO TẦN SỐ KHẨN CẤP 107.5 MHz',
    'radio.scan': 'Quét Sóng Quân Sự',
    'radio.secret_intel': 'Tình Báo Mật',
    'radio.transmissions': 'Nhật Ký Tín Hiệu Sóng Radio',

    // Weather & Stages
    'weather.clear': 'Trời Quang',
    'weather.acid_rain': 'Mưa Axit',
    'weather.blood_moon': 'Huyết Nguyệt Đỏ',
    'weather.toxic_fog': 'Sương Mù Độc',
    'weather.radiation_storm': 'Bão Bức Xạ',
    'weather.blizzard': 'Bão Tuyết Đóng Băng',

    // Common labels
    'common.level': 'Cấp',
    'common.power': 'Uy Lực',
    'common.cost': 'Tiêu Hao',
    'common.duration': 'Thời Lượng',
    'common.cooldown': 'Hồi Chiêu',
    'common.turns': 'lượt',
    'common.materials': 'Nguyên Liệu',
    'common.success_rate': 'Tỉ Lệ Thành Công',
    'common.required': 'Yêu Cầu',
    'common.unlocked': 'Đã Mở Khóa',
    'common.locked': 'Đang Khóa',
    'common.reward': 'Phần Thưởng'
  },
  en: {
    // Top Bar & Meta
    'app.title': 'DORMITORY SURVIVAL RPG',
    'app.subtitle': 'Mutant Apocalypse & Skill Awakening',
    'app.day': 'DAY',
    'app.stage': 'STAGE',
    'app.danger': 'DANGER',
    'app.coins': 'Lord Coins',
    'app.crystals': 'Mutation Crystals',
    'app.aggro': 'Aggro Score',
    'app.pioneer': 'Pioneer Points',
    'app.back_world': 'Select World',
    'app.mute': 'Mute Audio',
    'app.unmute': 'Unmute Audio',
    'app.reset': 'Reset Game',
    'app.reset_confirm': 'Are you sure you want to reset all game data and start over?',
    'app.language': 'Language',

    // Survival Gauges
    'gauge.hp': 'HP (HEALTH)',
    'gauge.sp': 'SP (STAMINA)',
    'gauge.mp': 'MP (ENERGY)',
    'gauge.hunger': 'Hunger',
    'gauge.thirst': 'Thirst',
    'gauge.sanity': 'Sanity',
    'gauge.level': 'Lv',
    'gauge.exp': 'EXP',

    // Character Stats
    'stat.str': 'Strength (STR)',
    'stat.agi': 'Agility (AGI)',
    'stat.vit': 'Vitality (VIT)',
    'stat.int': 'Intelligence (INT)',
    'stat.lck': 'Luck (LCK)',
    'stat.unspent_points': 'Unspent Points',
    'stat.allocate': 'Allocate',
    'stat.equipment': 'Current Gear',
    'stat.weapon': 'Weapon',
    'stat.armor': 'Armor',
    'stat.accessory': 'Accessory',
    'stat.companion': 'Companion',
    'stat.bond': 'Bond Level',

    // Tactical Deck / Navigation Menu
    'menu.explore': 'Scout Dorm',
    'menu.lord_room': 'Lord Room 200',
    'menu.defense': 'Base Defense',
    'menu.skill_tree': 'Skill Evolution',
    'menu.blacksmith': 'Blacksmith',
    'menu.crafting': 'Crafting',
    'menu.inventory': 'Inventory',
    'menu.survivors': '100 Survivors',
    'menu.quests': 'Quests & Rules',
    'menu.radio': 'Radio 107.5MHz',
    'menu.pets': 'Mutant Pets',
    'menu.codex': 'World Codex',
    'menu.oracle': 'AI Oracle',

    // Actions & Combat
    'action.attack': 'Basic Attack',
    'action.skill': 'Cast Skill',
    'action.item': 'Use Item',
    'action.escape': 'Flee / Escape',
    'action.upgrade': 'Upgrade',
    'action.fuse': 'Fuse Skills',
    'action.equip': 'Equip',
    'action.unequip': 'Unequip',
    'action.use': 'Use',
    'action.craft': 'Craft',
    'action.trade': 'Trade',
    'action.claim': 'Claim',
    'action.close': 'Close',
    'action.confirm': 'Confirm',
    'action.rest': 'Rest',
    'action.sleep': 'Sleep & Harvest',
    'action.feed': 'Feed',
    'action.enhance': 'Enhance',

    // Lord Room & Defense
    'lord.bed': 'Lord Slumber Bed',
    'lord.door': 'Reinforced Steel Door',
    'lord.turret_left': 'Left Defense Turret',
    'lord.turret_right': 'Right Defense Turret',
    'lord.guardian': 'Guardian Spirit',
    'lord.tenants': 'Roommate Tenants List',
    'lord.hourly_production': 'Output/Hour',
    'lord.defense_power': 'Defense Rating',
    'lord.aggro_toggle': 'Monster Lure Mode',
    'lord.sleep_success': 'You slept soundly for 8 hours! Harvested coins and recovered full stamina.',

    // Radio
    'radio.title': 'MILITARY EMERGENCY TRANSCEIVER 107.5 MHz',
    'radio.scan': 'Scan Military Band',
    'radio.secret_intel': 'Classified Intel',
    'radio.transmissions': 'Radio Signal Logs',

    // Weather & Stages
    'weather.clear': 'Clear Sky',
    'weather.acid_rain': 'Acid Rain',
    'weather.blood_moon': 'Crimson Blood Moon',
    'weather.toxic_fog': 'Toxic Fog',
    'weather.radiation_storm': 'Radiation Storm',
    'weather.blizzard': 'Freezing Blizzard',

    // Common labels
    'common.level': 'Lv',
    'common.power': 'Power',
    'common.cost': 'Cost',
    'common.duration': 'Duration',
    'common.cooldown': 'Cooldown',
    'common.turns': 'turns',
    'common.materials': 'Materials',
    'common.success_rate': 'Success Rate',
    'common.required': 'Required',
    'common.unlocked': 'Unlocked',
    'common.locked': 'Locked',
    'common.reward': 'Reward'
  }
};

export function t(key: string, lang: Language = 'vi', fallback?: string): string {
  if (DICTIONARY[lang] && DICTIONARY[lang][key]) {
    return DICTIONARY[lang][key];
  }
  if (DICTIONARY['vi'][key]) {
    return DICTIONARY['vi'][key];
  }
  return fallback || key;
}

export function formatNumberWithComma(n: number): string {
  if (isNaN(n) || n === null || n === undefined) return '0';
  return n.toLocaleString();
}
