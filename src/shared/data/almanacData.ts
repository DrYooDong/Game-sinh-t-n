// Suburban Almanac Data for Plants and Zombies with Original PopCap Lore and Statistics

export interface PlantAlmanacEntry {
  id: string;
  name: string;
  vnName: string;
  sunCost: number;
  recharge: 'Rất nhanh' | 'Nhanh' | 'Trung bình' | 'Chậm' | 'Rất chậm';
  damage?: string;
  toughness?: string;
  range?: string;
  special?: string;
  image: string;
  description: string;
  lore: string;
  category: 'day' | 'night' | 'pool' | 'fog' | 'roof' | 'upgrade';
}

export interface ZombieAlmanacEntry {
  id: string;
  name: string;
  vnName: string;
  toughness: 'Thấp' | 'Trung bình' | 'Cao' | 'Rất cao' | 'Cực kỳ cao';
  speed: 'Chậm' | 'Cơ bản' | 'Nhanh' | 'Rất nhanh' | 'Đột biến';
  weakness?: string;
  special?: string;
  image: string;
  description: string;
  lore: string;
}

export const ALMANAC_PLANTS: PlantAlmanacEntry[] = [
  {
    id: 'peashooter',
    name: 'Peashooter',
    vnName: 'Đậu Xanh Bắn Tỉa',
    sunCost: 100,
    recharge: 'Nhanh',
    damage: '20 sát thương / hạt đậu',
    toughness: '300 HP (Tiêu chuẩn)',
    range: 'Đường thẳng phía trước',
    image: '/pvz_assets/plants/plant_peashooter.png',
    description: 'Bắn những viên đậu xanh tròn trịa về phía thây ma tiến đến.',
    lore: '"Làm thế nào một cái cây có thể lớn lên và bắn đậu nhanh như vậy?" Peashooter thổ lộ: "Sự cống hiến hết mình, chế độ tập luyện chăm chỉ kết hợp cùng một bữa sáng giàu ánh nắng mặt trời và chất xơ!"',
    category: 'day'
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    vnName: 'Hoa Hướng Dương',
    sunCost: 50,
    recharge: 'Nhanh',
    toughness: '300 HP (Tiêu chuẩn)',
    special: 'Sản xuất 25 Mặt trời mỗi chu kỳ',
    image: '/pvz_assets/plants/plant_sunflower.png',
    description: 'Cung cấp nguồn năng lượng Mặt trời thiết yếu để bạn trồng thêm nhiều loại cây phòng thủ khác.',
    lore: 'Sunflower không thể kiềm chế niềm vui khi nhảy múa theo điệu nhạc. Đó là bài hát nào ư? Tất nhiên là giai điệu ngọt ngào của ánh nắng Mặt trời rực rỡ!',
    category: 'day'
  },
  {
    id: 'cherry_bomb',
    name: 'Cherry Bomb',
    vnName: 'Bom Quả Anh Đào',
    sunCost: 150,
    recharge: 'Rất chậm',
    damage: '1800 sát thương (Hủy diệt cực lớn)',
    range: 'Phạm vi 3x3 ô xung quanh',
    special: 'Kích nổ tức thì sau 1.2 giây',
    image: '/pvz_assets/plants/plant_cherry_bomb.png',
    description: 'Phát nổ và thổi bay toàn bộ thây ma trong một khu vực 3x3.',
    lore: '"Chúng tôi muốn nổ tung!" Cherry số một nói. "Không, chúng tôi sẽ BÙM!" Cherry số hai phản bác. Sau một hồi tranh cãi nảy lửa, cả hai quyết định nổ tung cùng nhau!',
    category: 'day'
  },
  {
    id: 'wallnut',
    name: 'Wall-nut',
    vnName: 'Hạt Dẻ Khiên Chắn',
    sunCost: 50,
    recharge: 'Chậm',
    toughness: '4000 HP (Cực trâu)',
    special: 'Chặn đường và cản bước tiến của quái',
    image: '/pvz_assets/plants/giant_walnut.png',
    description: 'Hạt dẻ có lớp vỏ cứng cáp dùng để làm rào chắn bảo vệ các cây trồng phía sau.',
    lore: '"Mọi người hỏi tôi cảm thấy thế nào khi bị thây ma nhai suốt ngày?" Wall-nut mỉm cười: "Họ không hiểu được cảm giác thư giãn tuyệt vời như đang được mát-xa lưng đâu!"',
    category: 'day'
  },
  {
    id: 'potato_mine',
    name: 'Potato Mine',
    vnName: 'Khoai Tây Bom Mìn',
    sunCost: 25,
    recharge: 'Chậm',
    damage: '1800 sát thương',
    special: 'Cần vài giây vùi mình dưới đất để kích hoạt mìn',
    image: '/pvz_assets/plants/plant_plantern.png',
    description: 'Khoai tây phát nổ khi thây ma dẫm lên, nhưng cần thời gian để chuẩn bị mìn.',
    lore: 'Nhiều người nói Potato Mine lười biếng vì hay ngủ gật dưới lòng đất. Nhưng khi anh ấy trồi lên, câu nói đầu tiên của anh ấy luôn là: "SPUDOW!"',
    category: 'day'
  },
  {
    id: 'snow_pea',
    name: 'Snow Pea',
    vnName: 'Đậu Băng Giá',
    sunCost: 175,
    recharge: 'Nhanh',
    damage: '20 sát thương + Làm chậm 50%',
    range: 'Đường thẳng phía trước',
    image: '/pvz_assets/plants/plant_snow_pea.png',
    description: 'Bắn ra những hạt đậu băng gây sát thương và làm chậm tốc độ di chuyển của zombie.',
    lore: 'Mọi người thường khen Snow Pea có vẻ ngoài "ngầu lòi". Anh ấy chỉ gật đầu: "Không chỉ ngầu đâu, tôi còn siêu lạnh lùng nữa đấy!"',
    category: 'day'
  },
  {
    id: 'chomper',
    name: 'Chomper',
    vnName: 'Cây Nắp Ấm Nuốt Chửng',
    sunCost: 150,
    recharge: 'Nhanh',
    damage: 'Ăn trọn 1 Zombie bất kể lượng máu',
    range: 'Cận chiến 1 ô phía trước',
    special: 'Mất thời gian nhai sau mỗi lần nuốt',
    image: '/pvz_assets/plants/plant_chomper.png',
    description: 'Nuốt chửng hoàn toàn một thây ma, nhưng sẽ dễ bị tổn thương khi đang bận nhai.',
    lore: 'Chomper từng tham gia một cuộc thi ăn nhanh thế giới và suýt giành giải nhất, nhưng anh bị loại vì đã lỡ nuốt luôn cả trọng tài bàn.',
    category: 'day'
  },
  {
    id: 'repeater',
    name: 'Repeater',
    vnName: 'Đậu Kép Bắn Đôi',
    sunCost: 200,
    recharge: 'Nhanh',
    damage: '40 sát thương (2 viên/lần)',
    range: 'Đường thẳng phía trước',
    image: '/pvz_assets/plants/plant_repeater.png',
    description: 'Bắn hai viên đậu cùng lúc về phía kẻ địch.',
    lore: 'Repeater rất nghiêm túc và ít khi cười. Anh ấy luôn nhắc nhở bản thân: "Một phát để cảnh cáo, phát thứ hai để chắc chắn!"',
    category: 'day'
  },
  {
    id: 'fume_shroom',
    name: 'Fume-shroom',
    vnName: 'Nấm Khói Độc',
    sunCost: 75,
    recharge: 'Nhanh',
    damage: '20 sát thương xuyên thấu',
    range: 'Phạm vi 4 ô phía trước',
    special: 'Bắn xuyên qua cửa lưới sắt và khiên',
    image: '/pvz_assets/plants/plant_fume_shroom.png',
    description: 'Bắn ra những làn khói độc có khả năng xuyên qua mọi lớp phòng hộ của zombie.',
    lore: '"Công việc ở tiệm bánh men trước đây rất tẻ nhạt", Fume-shroom chia sẻ. "Bắn khói độc vào lũ xác sống thú vị hơn nhiều!"',
    category: 'night'
  },
  {
    id: 'hypno_shroom',
    name: 'Hypno-shroom',
    vnName: 'Nấm Thôi Miên',
    sunCost: 75,
    recharge: 'Chậm',
    special: 'Thôi miên zombie quay lại chiến đấu cho bạn',
    image: '/pvz_assets/plants/plant_hypno_shroom.png',
    description: 'Khi bị zombie ăn, Hypno-shroom sẽ thôi miên kẻ đó quay đầu đánh lại đồng bọn.',
    lore: '"Hãy nhìn vào mắt tôi... bạn đang cảm thấy buồn ngủ... và bạn muốn quay lại cắn mông gã zombie đi sau lưng mình..."',
    category: 'night'
  },
  {
    id: 'doom_shroom',
    name: 'Doom-shroom',
    vnName: 'Nấm Nguyên Tử Tận Thế',
    sunCost: 125,
    recharge: 'Rất chậm',
    damage: '1800 sát thương (Toàn màn hình)',
    range: 'Phạm vi cực rộng',
    special: 'Để lại một hố sâu không thể trồng cây',
    image: '/pvz_assets/plants/plant_doom_shroom.png',
    description: 'Phát nổ với sức công phá hủy diệt toàn bộ màn hình, để lại một hố bom lớn.',
    lore: '"Tôi có thể hủy diệt mọi thứ bạn yêu quý", Doom-shroom nói với giọng trầm ấm. "Nhưng đừng lo, tôi là người phe bạn mà!"',
    category: 'night'
  },
  {
    id: 'squash',
    name: 'Squash',
    vnName: 'Bí Ngô Đè Bẹp',
    sunCost: 50,
    recharge: 'Chậm',
    damage: '1800 sát thương',
    range: '1 ô xung quanh',
    special: 'Nhảy lên đè bẹp bất kỳ zombie nào lại gần',
    image: '/pvz_assets/plants/plant_squash.png',
    description: 'Đè bẹp thây ma đầu tiên xuất hiện gần nó.',
    lore: '"Tôi đã sẵn sàng!" Squash gầm lên. "Kẻ nào dám bước vào sân nhà này? Tôi sẽ nghiền nát hắn thành tương cà!"',
    category: 'pool'
  },
  {
    id: 'jalapeno',
    name: 'Jalapeno',
    vnName: 'Ớt Lửa Thiêu Rụi',
    sunCost: 125,
    recharge: 'Rất chậm',
    damage: '1800 sát thương',
    range: 'Toàn bộ 1 hàng ngang',
    special: 'Phá hủy băng tuyết và thiêu rụi toàn bộ hàng',
    image: '/pvz_assets/plants/plant_jalapeno.png',
    description: 'Phát nổ và tạo ra một vệt lửa thiêu rụi toàn bộ zombie trên cùng một hàng.',
    lore: 'Jalapeno lúc nào cũng nóng tính. Khi anh ấy cáu giận, nhiệt độ xung quanh tăng vọt đến mức làm tan chảy cả xe Zomboni!',
    category: 'pool'
  },
  {
    id: 'spikeweed',
    name: 'Spikeweed',
    vnName: 'Gai Chông Sân Cỏ',
    sunCost: 100,
    recharge: 'Nhanh',
    damage: '20 sát thương liên tục',
    special: 'Làm nổ lốp xe Zomboni ngay lập tức',
    image: '/pvz_assets/plants/plant_spikeweed.png',
    description: 'Đâm chọc vào chân thây ma dẫm lên nó và phá hủy phương tiện cơ giới.',
    lore: 'Spikeweed thích chơi khúc côn cầu và xem xiếc gai nhọn. Sở thích bí mật của anh ấy là sưu tầm đinh gỉ.',
    category: 'pool'
  },
  {
    id: 'torchwood',
    name: 'Torchwood',
    vnName: 'Thân Cây Đuốc Lửa',
    sunCost: 175,
    recharge: 'Nhanh',
    special: 'Nhân đôi sát thương đạn đậu thành Đạn Lửa',
    image: '/pvz_assets/plants/plant_torchwood.png',
    description: 'Biến những hạt đậu thường bay qua nó thành những quả cầu lửa có sức sát thương gấp đôi.',
    lore: 'Mọi người đều yêu mến Torchwood vì sự ấm áp và tính tình vui vẻ. Chỉ có tuyết và đá lạnh là không dám đến gần anh.',
    category: 'pool'
  },
  {
    id: 'tallnut',
    name: 'Tall-nut',
    vnName: 'Hạt Dẻ Khổng Lồ',
    sunCost: 125,
    recharge: 'Chậm',
    toughness: '8000 HP (Siêu trâu bò)',
    special: 'Không thể bị nhảy qua bởi sào, cá heo hay pogo',
    image: '/pvz_assets/plants/plant_tallnut.png',
    description: 'Hàng rào hạt dẻ cao lớn không thể bị vượt qua bởi bất kỳ kỹ năng nhảy nào.',
    lore: 'Tall-nut cảm thấy một sự gắn kết mãnh liệt với các bức tường thành cổ đại. Anh ấy thường rơi nước mắt vì tự hào mỗi khi cản được cú nhảy của kẻ thù.',
    category: 'pool'
  },
  {
    id: 'gatling_pea',
    name: 'Gatling Pea',
    vnName: 'Đậu Súng Máy Gatling (Nâng cấp)',
    sunCost: 250,
    recharge: 'Rất chậm',
    damage: '80 sát thương (4 viên/lần)',
    range: 'Đường thẳng phía trước',
    special: 'Trồng đè lên Repeater để nâng cấp',
    image: '/pvz_assets/plants/plant_gatling_pea.png',
    description: 'Bắn liên hoàn 4 viên đậu cùng lúc, tạo ra cơn mưa hỏa lực áp đảo.',
    lore: 'Gatling Pea từng phục vụ trong quân ngũ. Chiếc mũ cối sắt và 4 nòng súng là minh chứng cho sự dũng cảm trên mọi chiến trường!',
    category: 'upgrade'
  },
  {
    id: 'twin_sunflower',
    name: 'Twin Sunflower',
    vnName: 'Hoa Hướng Dương Kép (Nâng cấp)',
    sunCost: 150,
    recharge: 'Rất chậm',
    special: 'Sản xuất gấp đôi Mặt trời (50 nắng/lần)',
    image: '/pvz_assets/plants/plant_twin_sunflower.png',
    description: 'Cho lượng mặt trời gấp đôi hoa hướng dương bình thường. Trồng đè lên Sunflower.',
    lore: 'Họ là một cặp chị em sinh đôi không thể tách rời. Họ luôn hoàn thành câu nói của nhau và cùng tạo nên một tương lai ngập tràn ánh nắng.',
    category: 'upgrade'
  },
  {
    id: 'winter_melon',
    name: 'Winter Melon',
    vnName: 'Dưa Hấu Băng Tuyết (Nâng cấp)',
    sunCost: 200,
    recharge: 'Rất chậm',
    damage: '80 sát thương nổ lan + Làm chậm diện rộng',
    range: 'Cầu vồng toàn sân',
    special: 'Trồng đè lên Melon-pult để nâng cấp',
    image: '/pvz_assets/plants/plant_winter_melon.png',
    description: 'Ném những quả dưa hấu đông lạnh cực lớn gây sát thương nặng và làm chậm cả bầy zombie.',
    lore: 'Winter Melon luôn giữ một cái đầu lạnh trong mọi tình huống. Phương châm sống của anh là: "Bình tĩnh, thư giãn và đông cứng kẻ địch!"',
    category: 'upgrade'
  }
];

export const ALMANAC_ZOMBIES: ZombieAlmanacEntry[] = [
  {
    id: 'zombie_normal',
    name: 'Regular Zombie',
    vnName: 'Zombie Cơ Bản',
    toughness: 'Thấp',
    speed: 'Cơ bản',
    image: '/pvz_assets/zombies/zombie_normal.png',
    description: 'Thây ma đi bộ thông thường hay lảng vảng trong vườn.',
    lore: 'Zombie này rất thích ăn não. Hắn không bao giờ chán não. Não sáng, não trưa, não tối... hắn sẵn sàng làm mọi thứ vì một miếng não tươi ngon!'
  },
  {
    id: 'zombie_flag',
    name: 'Flag Zombie',
    vnName: 'Zombie Cầm Cờ Đầu Đàn',
    toughness: 'Thấp',
    speed: 'Nhanh',
    image: '/pvz_assets/zombies/zombie_flag.png',
    description: 'Báo hiệu một đợt tấn công lớn (Huge Wave) của bầy thây ma đang ập tới.',
    lore: 'Flag Zombie rất tự hào về lá cờ của mình. Mặc dù lá cờ có hình một bộ não bị cắn dở, hắn luôn giương cao nó với tất cả sự trang nghiêm.'
  },
  {
    id: 'zombie_conehead',
    name: 'Conehead Zombie',
    vnName: 'Zombie Đội Nón Giao Thông',
    toughness: 'Trung bình',
    speed: 'Cơ bản',
    weakness: 'Bị bào mòn bởi đạn đậu hoặc nổ',
    image: '/pvz_assets/zombies/zombie_conehead.png',
    description: 'Chiếc nón giao thông hình nón giúp tăng gấp đôi độ bền của hắn.',
    lore: 'Hắn nhặt được chiếc nón này trên đường cao tốc. Hắn nghĩ đội nó trông rất thời thượng và có thể bảo vệ bộ não quý giá khỏi đạn đậu.'
  },
  {
    id: 'zombie_buckethead',
    name: 'Buckethead Zombie',
    vnName: 'Zombie Đội Xô Sắt',
    toughness: 'Cao',
    speed: 'Cơ bản',
    weakness: 'Bị Magnet-shroom hút xô sắt',
    image: '/pvz_assets/zombies/zombie_buckethead.png',
    description: 'Chiếc xô kim loại giúp hắn chống chịu lượng sát thương cực lớn từ cây trồng.',
    lore: 'Chiếc xô sắt này từng đựng sơn, nhưng giờ nó là chiếc mũ giáp bất khả xâm phạm của hắn... cho đến khi Magnet-shroom xuất hiện.'
  },
  {
    id: 'zombie_newspaper',
    name: 'Newspaper Zombie',
    vnName: 'Zombie Cầm Báo',
    toughness: 'Trung bình',
    speed: 'Đột biến',
    weakness: 'Fume-shroom bắn xuyên qua tờ báo',
    image: '/pvz_assets/zombies/zombie_newspaper.png',
    description: 'Tờ báo bảo vệ hắn. Khi tờ báo bị rách, hắn sẽ nổi điên và lao như tên bắn!',
    lore: 'Hắn vừa tìm thấy trang giải ô chữ trong tờ báo buổi sáng thì bị đạn đậu bắn rách. Không ai được phép làm gián đoạn trò chơi ô chữ của hắn!'
  },
  {
    id: 'zombie_screendoor',
    name: 'Screen Door Zombie',
    vnName: 'Zombie Cửa Lưới Sắt',
    toughness: 'Cao',
    speed: 'Cơ bản',
    weakness: 'Fume-shroom bắn xuyên qua cửa, Magnet-shroom hút cửa',
    image: '/pvz_assets/zombies/zombie_screendoor.png',
    description: 'Chiếc cửa lưới chống muỗi tạo thành lá chắn chắn mọi loại đạn bắn thẳng.',
    lore: 'Hắn lấy trộm chiếc cửa này từ nhà hàng xóm. Hắn tin rằng nó vừa chống được đạn đậu, vừa ngăn muỗi cắn khi đi săn não ban đêm.'
  },
  {
    id: 'zombie_disco',
    name: 'Dancing Zombie',
    vnName: 'Zombie Vũ Công Disco',
    toughness: 'Trung bình',
    speed: 'Cơ bản',
    special: 'Triệu hồi 4 vũ công phụ Backup Dancer hỗ trợ',
    image: '/pvz_assets/zombies/zombie_disco.png',
    description: 'Khiêu vũ điêu luyện và liên tục triệu hồi thêm vũ công phụ xung quanh.',
    lore: 'Bất kỳ sự tương đồng nào giữa Dancing Zombie và các siêu sao âm nhạc quá cố chỉ là sự trùng hợp ngẫu nhiên. Hắn chỉ đơn giản là đam mê disco!'
  },
  {
    id: 'zombie_balloon',
    name: 'Balloon Zombie',
    vnName: 'Zombie Bóng Bay',
    toughness: 'Thấp',
    speed: 'Nhanh',
    weakness: 'Blover thổi bay, Cactus bắn vỡ bóng',
    image: '/pvz_assets/zombies/zombie_balloon.png',
    description: 'Bay lơ lửng trên không trung và bay qua hầu hết các loại cây trồng mặt đất.',
    lore: 'Hắn may mắn tìm thấy quả bóng bay còn nguyên vẹn. Cảm giác lơ lửng ngắm nhìn sân vườn từ trên cao thật là tuyệt vời!'
  },
  {
    id: 'zombie_imp',
    name: 'Imp Zombie',
    vnName: 'Zombie Quỷ Lùn',
    toughness: 'Thấp',
    speed: 'Rất nhanh',
    image: '/pvz_assets/zombies/zombie_imp.png',
    description: 'Thây ma tí hon nhanh nhẹn, thường được Gargantuar ném thẳng vào sâu trong vườn.',
    lore: 'Imp nhỏ con nhưng rất hiếu động. Hắn đã học karate, taekwondo và kỹ năng cắn lén trong suốt 3 năm ở trường mầm non zombie.'
  },
  {
    id: 'zombie_gargantuar',
    name: 'Gargantuar',
    vnName: 'Quái Thú Khổng Lồ Gargantuar',
    toughness: 'Cực kỳ cao',
    speed: 'Chậm',
    special: 'Đập nát mọi cây trồng bằng cột điện và ném Imp khi mất 50% máu',
    image: '/pvz_assets/zombies/zombie_gargantuar.png',
    description: 'Thây ma khổng lồ đè bẹp mọi cây trồng trên đường đi và ném Imp vào giữa sân.',
    lore: 'Gargantuar không cần nói nhiều. Khi hắn bước đi, mặt đất rung chuyển và lũ cây trồng bắt đầu run rẩy sợ hãi.'
  },
  {
    id: 'zombie_boss_zomboss',
    name: 'Dr. Zomboss Mech',
    vnName: 'Robot Khổng Lồ Tiến Sĩ Zomboss',
    toughness: 'Cực kỳ cao',
    speed: 'Đột biến',
    special: 'Bắn cầu lửa, cầu băng tuyết, thả xe RV và triệu hồi mọi chủng zombie',
    image: '/pvz_assets/zombies/zombie_boss_lion_king.png',
    description: 'Cỗ máy chiến tranh tối thượng do chính Tiến sĩ Edgar Zomboss điều khiển.',
    lore: 'Edgar Zomboss sở hữu tấm bằng Tiến sĩ ngành Cơ điện tử Thây ma. Ước mơ lớn nhất đời ông là chiếm trọn mọi bãi cỏ và ăn sạch não nhân loại!'
  }
];
