import { StoryArc } from '../types/game';

export const STORY_ARCS: StoryArc[] = [
  {
    id: 1,
    key: 'arc1_rooftop',
    title: 'Giai Đoạn 1: Sân Thượng Tử Thần',
    subtitle: 'Sự Trỗi Dậy Của "Nông Dân" & Cú Lăn Số 0',
    description: 'Tuyết Mộc vừa xuyên không rơi vào bầy Zombie vây hãm trên sân thượng tòa nhà cao tầng. Khởi đầu với Hệ Thống Sân Vườn Bác Sĩ kỳ lạ.',
    arcSummary: 'Thuyết phục Xạ Thủ Nuốt Chửng kiêu ngạo, rút thẻ Pi Bức Tường Hạt Dẻ lăn nghiền nát bầy zombie, cứu đoàn người La Quân và Tuyết Tĩnh.',
    backgroundTheme: 'rooftop',
    unlockCardIds: ['sunflower', 'peashooter_devourer', 'giant_walnut', 'newspaper_zombie', 'chomper'],
    rewardSouls: 200,
    rewardSun: 300,
    storyDialogs: [
      {
        id: '1_1',
        speakerName: 'Tuyết Mộc',
        speakerRole: 'Người Cầm Thẻ Mới Xuyên Không',
        speakerAvatar: 'tuyet_moc',
        expression: 'shocked',
        dialogue: 'Cái quái gì thế này?! Vừa mở mắt ra đã thấy tận thế bầy zombie phá cửa sân thượng! Hệ Thống của ta đâu? Hả... "Hệ Thống Sân Vườn Bác Sĩ"? Đồ chơi gì vậy trời?!',
        backgroundTheme: 'rooftop',
        sfxCue: 'splat'
      },
      {
        id: '1_2',
        speakerName: 'Xạ Thủ Nuốt Chửng',
        speakerRole: 'Thẻ Linh - Tiểu Thôn',
        speakerAvatar: 'tieu_thon',
        expression: 'smug',
        dialogue: 'Hừ! Tên nhóc nông dân rách rưới này là chủ nhân của bản đại gia sao? Cầm mấy hạt đậu bắn sâu bọ thì được chứ lũ zombie kia sao thấm! Không có vũ khí xịn thì ta không thèm ra sân!',
        backgroundTheme: 'rooftop',
        sfxCue: 'click'
      },
      {
        id: '1_3',
        speakerName: 'La Quân',
        speakerRole: 'Cựu Binh / Đội Trưởng Sống Sót',
        speakerAvatar: 'la_quan',
        expression: 'angry',
        dialogue: 'Cẩn thận! Thẻ linh "Gậy Sắt" của tôi đã cạn kiệt năng lượng! Cửa sắt sắp vỡ rồi! Cậu bé kia mau lùi lại phía sau!',
        backgroundTheme: 'rooftop',
        choices: [
          {
            text: 'Lừa Tiểu Thôn nuốt khẩu súng lục trên sàn: "Xem súng này có ngon hơn đậu của ngươi không?"',
            outcomeText: 'Tiểu Thôn phàm ăn nuốt chửng súng lục, biến thành nòng Gatling cực ngầu!',
            rewardSun: 100
          },
          {
            text: 'Rút Thẻ Pi Số 0 chuẩn bị mở đường máu!',
            outcomeText: 'Khí tức của Bức Tường Hạt Dẻ rung chuyển sàn bê tông!',
            grantPlantFood: 1
          }
        ]
      },
      {
        id: '1_4',
        speakerName: 'Tuyết Mộc',
        speakerRole: 'Tuyết Mộc (Bật Chế Độ Nghiêm Túc)',
        speakerAvatar: 'tuyet_moc',
        expression: 'determined',
        dialogue: 'Trồng Hoa Hướng Dương thu thập Ánh Sáng Mặt Trời! Tiểu Thôn lên nòng xả đạn! Chuẩn bị giải phóng Bức Tường Hạt Dẻ Số 0 nghiền nát đường máu!',
        backgroundTheme: 'rooftop',
        sfxCue: 'shoot'
      }
    ],
    battleConfig: {
      lanes: 4,
      cols: 8,
      durationSec: 60,
      startingSun: 150,
      startingPlantFood: 1,
      ambientSound: 'grasswalk',
      waves: [
        {
          timestampSec: 5,
          waveAlert: 'Bầy Zombie Sân Thượng bắt đầu phá cửa!',
          enemies: [
            { enemyTypeId: 'basic_zombie', count: 2, lane: 1 },
            { enemyTypeId: 'basic_zombie', count: 1, lane: 2 }
          ]
        },
        {
          timestampSec: 18,
          enemies: [
            { enemyTypeId: 'rooftop_runner', count: 2, lane: 0 },
            { enemyTypeId: 'conehead_mutant', count: 1, lane: 3 }
          ]
        },
        {
          timestampSec: 35,
          waveAlert: 'Đợt sóng Zombie Đột Biến tràn lên dữ dội! Hãy dùng Hạt Dẻ Lăn!',
          enemies: [
            { enemyTypeId: 'rooftop_runner', count: 3 },
            { enemyTypeId: 'conehead_mutant', count: 2 },
            { enemyTypeId: 'basic_zombie', count: 4 }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    key: 'arc2_fissure',
    title: 'Giai Đoạn 2: Bí Cảnh Khe Nứt',
    subtitle: 'Nhập Thể Bóng Bay & Màn Chiêu Mộ Võ Sĩ Cuồng Dưa Hấu',
    description: 'Bị hút vào khe nứt không gian lơ lửng trên vực thẳm. Nhập thể Zombie Bóng Bay, đối đầu dã nhân và gặp gỡ Samurai Yagu Yosuke.',
    arcSummary: 'Dùng quả bóng mặt quỷ thoát hiểm, dùng Dưa Hấu dụ dỗ Samurai Yagu Yosuke làm vệ sĩ đắc lực diệt Ma Thú Sói cấp 40.',
    backgroundTheme: 'fissure',
    unlockCardIds: ['melon_pult', 'balloon_zombie'],
    rewardSouls: 350,
    rewardSun: 450,
    storyDialogs: [
      {
        id: '2_1',
        speakerName: 'Tuyết Mộc',
        speakerRole: 'Tuyết Mộc (Lơ lửng vực sâu)',
        speakerAvatar: 'tuyet_moc',
        expression: 'shocked',
        dialogue: 'Oái! Vực sâu vạn trượng! Kích hoạt cơ chế Nhập Thể - "Zombie Bóng Bay"! Vù vù... Phù, may mà lơ lửng được trên không trung.',
        backgroundTheme: 'fissure',
        sfxCue: 'plant_food'
      },
      {
        id: '2_2',
        speakerName: 'Xạ Thủ Nuốt Chửng',
        speakerRole: 'Tiểu Thôn',
        speakerAvatar: 'tieu_thon',
        expression: 'angry',
        dialogue: 'Chủ nhân cẩn thận! Tên Dã Nhân đằng kia vừa bắn rụng bóng bay rồi! Nhận lấy quả bóng bay mặt quỷ này mau!',
        backgroundTheme: 'fissure',
        sfxCue: 'hit'
      },
      {
        id: '2_3',
        speakerName: 'Yagu Yosuke',
        speakerRole: 'Võ Sĩ Samurai Đảo Quốc',
        speakerAvatar: 'yosuke',
        expression: 'determined',
        dialogue: 'Ta nghe thấy mùi hương thanh ngọt... Đó có phải là... DƯA HẤU?! Nếu các hạ cho ta quả dưa hấu đó mang về chữa bệnh cho em gái, thanh kiếm của ta nguyện làm lá chắn cho các hạ!',
        backgroundTheme: 'fissure',
        choices: [
          {
            text: 'Dùng tay bổ đôi quả Dưa Hấu: "Mời huynh đài thưởng thức, dưa tuy hơi non nhưng bổ mát!"',
            outcomeText: 'Yosuke ăn dưa hấu trong cảm động, chỉ số trung thành đạt mức tối đa!',
            rewardSouls: 100
          },
          {
            text: 'Dàn trận Ném Dưa Hấu pháo kích yểm trợ từ xa!',
            outcomeText: 'Hỏa lực Dưa Hấu sẵn sàng nã bẹp đầu Ma Thú Sói!',
            rewardSun: 150
          }
        ]
      },
      {
        id: '2_4',
        speakerName: 'Eiker',
        speakerRole: 'Đại Lão Cấp 50 (Sửng Sốt)',
        speakerAvatar: 'eiker',
        expression: 'shocked',
        dialogue: 'Thằng nhóc cấp 15 này rốt cuộc là ai mà lại triệu hồi ra những thẻ bài thực vật kỳ dị đến vậy?! Thú Cứu Hộ của ta cũng phải e dè!',
        backgroundTheme: 'fissure'
      }
    ],
    battleConfig: {
      lanes: 4,
      cols: 8,
      durationSec: 70,
      startingSun: 200,
      startingPlantFood: 2,
      ambientSound: 'grasswalk',
      bossEnemyId: 'werewolf_beast_lv40',
      waves: [
        {
          timestampSec: 5,
          waveAlert: 'Dã Nhân Bắn Cung khe nứt tập kích!',
          enemies: [
            { enemyTypeId: 'savage_archer', count: 2, lane: 0 },
            { enemyTypeId: 'savage_archer', count: 1, lane: 2 }
          ]
        },
        {
          timestampSec: 25,
          enemies: [
            { enemyTypeId: 'basic_zombie', count: 3 },
            { enemyTypeId: 'conehead_mutant', count: 2 },
            { enemyTypeId: 'savage_archer', count: 2 }
          ]
        },
        {
          timestampSec: 45,
          waveAlert: 'CẢNH BÁO: Ma Thú Sói Cấp 40 xuất trận cuồng nộ!',
          enemies: [
            { enemyTypeId: 'werewolf_beast_lv40', count: 1, lane: 2 },
            { enemyTypeId: 'savage_archer', count: 2 },
            { enemyTypeId: 'rooftop_runner', count: 3 }
          ]
        }
      ]
    }
  },
  {
    id: 3,
    key: 'arc3_lake_kraken',
    title: 'Giai Đoạn 3: Cuộc Săn Boss Bạch Tuộc',
    subtitle: 'Chiến Thuật Thủy Quái & Cú Lật Kèo Đau Điếng',
    description: 'Bí Cảnh Hồ Nước bí ẩn với Ma Thú Bạch Tuộc cấp 61. Trận chiến nước độc hại và bài học khắc cốt ghi tâm về lòng dạ con người.',
    arcSummary: 'Phối hợp Rong Biển Quấn, Zombie Cá Heo và Bí Ngô câu giờ trước Bạch Tuộc cấp 61, nhưng bị sát thủ Tạ Giao cướp Boss phút chót.',
    backgroundTheme: 'lake_abyss',
    unlockCardIds: ['tangle_kelp', 'dolphin_zombie', 'pumpkin', 'cherry_bomb'],
    rewardSouls: 500,
    rewardSun: 600,
    storyDialogs: [
      {
        id: '3_1',
        speakerName: 'Tuyết Mộc',
        speakerRole: 'Tuyết Mộc',
        speakerAvatar: 'tuyet_moc',
        expression: 'determined',
        dialogue: 'Mặt hồ bốc lên làn sương mù xanh kịch độc! Thú Cứu Hộ của Eiker đã bị phế võ công, Yosuke cũng bị quất trúng! Phải tính toán từng điểm Ánh Sáng Mặt Trời!',
        backgroundTheme: 'lake_abyss',
        sfxCue: 'watering'
      },
      {
        id: '3_2',
        speakerName: 'Xạ Thủ Nuốt Chửng',
        speakerRole: 'Tiểu Thôn',
        speakerAvatar: 'tieu_thon',
        expression: 'smug',
        dialogue: 'Thả Rong Biển Quấn dìm xúc tu của nó xuống đáy bùn đi! Rồi cho Zombie Cưỡi Cá Heo ra rỉa thịt nó!',
        backgroundTheme: 'lake_abyss',
        choices: [
          {
            text: 'Triệu hồi Bí Ngô bọc ngoài thực vật làm lá chắn thịt!',
            outcomeText: 'Hàng phòng thủ vững chãi trước sương độc!',
            rewardSun: 150
          },
          {
            text: 'Chuẩn bị Thẻ Pi Bom Anh Đào dồn hỏa lực kết liễu!',
            outcomeText: 'Bom Anh Đào kích nổ tỏa ra năng lượng hủy diệt!',
            grantPlantFood: 1
          }
        ]
      },
      {
        id: '3_3',
        speakerName: 'Tạ Giao & Mạn Đà La',
        speakerRole: 'Nữ Sát Thủ Huyết Tộc & Tinh Linh',
        speakerAvatar: 'ta_giao',
        expression: 'smug',
        dialogue: 'Cảm ơn nhóc nông dân đã cày Boss hộ! Nhát chém Huyết Tộc... Tinh Hồn cấp 61 và 10 triệu kinh nghiệm này thuộc về ta!',
        backgroundTheme: 'lake_abyss',
        sfxCue: 'rage'
      },
      {
        id: '3_4',
        speakerName: 'Tuyết Mộc',
        speakerRole: 'Tuyết Mộc (Ánh mắt lạnh lùng)',
        speakerAvatar: 'tuyet_moc',
        expression: 'angry',
        dialogue: 'Tạ Giao... Ngươi dám cướp Boss ngay trước mũi ta! Thế giới này quả nhiên không có chỗ cho sự ngây thơ. Món nợ này, ta sẽ đòi lại cả vốn lẫn lời!',
        backgroundTheme: 'lake_abyss'
      }
    ],
    battleConfig: {
      lanes: 5,
      cols: 8,
      durationSec: 80,
      startingSun: 250,
      startingPlantFood: 2,
      isWaterStage: true,
      bossEnemyId: 'kraken_boss_lv61',
      ambientSound: 'grasswalk',
      waves: [
        {
          timestampSec: 5,
          waveAlert: 'Thủy Quái Lươn Đột Biến bơi ngầm xâm nhập!',
          enemies: [
            { enemyTypeId: 'lake_mutant_eel', count: 2, lane: 1 },
            { enemyTypeId: 'lake_mutant_eel', count: 2, lane: 3 }
          ]
        },
        {
          timestampSec: 25,
          enemies: [
            { enemyTypeId: 'lake_mutant_eel', count: 3 },
            { enemyTypeId: 'basic_zombie', count: 4 },
            { enemyTypeId: 'conehead_mutant', count: 2 }
          ]
        },
        {
          timestampSec: 45,
          waveAlert: 'CẢNH BÁO: Ma Thú Bạch Tuộc Cấp 61 ngoi lên từ lòng hồ!',
          enemies: [
            { enemyTypeId: 'kraken_boss_lv61', count: 1, lane: 2 },
            { enemyTypeId: 'lake_mutant_eel', count: 3 }
          ]
        }
      ]
    }
  },
  {
    id: 4,
    key: 'arc4_prison_tyrant',
    title: 'Giai Đoạn 4: Trừng Trị Bạo Chúa Nhà Tù',
    subtitle: 'Zombie Đọc Báo Quần Hồng & Cơn Lốc Từ Trường',
    description: 'Đột nhập Trại Sinh Tồn giải cứu La Quân. Dùng Zombie Đọc Báo phá sập tinh thần bạo chúa Vô Năng và Nấm Từ Lực tước sạch vũ khí RPG.',
    arcSummary: 'Zombie Đọc Báo thản nhiên đỡ đòn bạo chúa, Nấm Từ Lực bão từ trường tước vũ khí RPG, lật đổ Vô Năng trao trại cho La Quân.',
    backgroundTheme: 'prison_fortress',
    unlockCardIds: ['magnet_shroom', 'jalapeno', 'iron_gate_zombie'],
    rewardSouls: 600,
    rewardSun: 700,
    storyDialogs: [
      {
        id: '4_1',
        speakerName: 'Vô Năng',
        speakerRole: 'Bạo Chúa Trại Giam',
        speakerAvatar: 'vo_nang',
        expression: 'angry',
        dialogue: 'Thằng nhóc nào dám đột nhập lãnh địa của ta?! Thuộc hạ đâu, nã súng trường bắn nát nó ra cho ta!',
        backgroundTheme: 'prison_fortress',
        sfxCue: 'shoot'
      },
      {
        id: '4_2',
        speakerName: 'Zombie Đọc Báo',
        speakerRole: 'Nhị Gia (Quần Lót Hồng)',
        speakerAvatar: 'nhi_gia',
        expression: 'smug',
        dialogue: 'Khọt khẹt... Vô Năng bớt mồm lại cho Nhị Gia xem nốt trang tin giải trí xem nào. Đạn gãi ngứa thế mà cũng đòi khoe?',
        backgroundTheme: 'prison_fortress',
        sfxCue: 'hit'
      },
      {
        id: '4_3',
        speakerName: 'Vô Năng',
        speakerRole: 'Vô Năng (Nổi Điên Hóa Gấu)',
        speakerAvatar: 'vo_nang',
        expression: 'shocked',
        dialogue: 'Cái... cái quái vật mặc quần lót hồng này là thứ gì?! Tao phải dùng Súng Chống Tăng RPG bắn tan xác chúng mày!',
        backgroundTheme: 'prison_fortress',
        choices: [
          {
            text: 'Kích hoạt Nấm Từ Lực nạp Hạt Năng Lượng tạo lốc xoáy từ trường!',
            outcomeText: 'Hàng ngàn cánh tay từ trường tước sạch súng đạn và RPG của địch!',
            rewardSouls: 200
          },
          {
            text: 'Thả Ớt Nổ Tung Jalapeno thiêu rụi phòng tuyến bạo chúa!',
            outcomeText: 'Biển lửa thiêu rụi toàn bộ lính gác vũ trang!',
            rewardSun: 200
          }
        ]
      },
      {
        id: '4_4',
        speakerName: 'La Quân',
        speakerRole: 'La Quân (Được Giải Cứu)',
        speakerAvatar: 'la_quan',
        expression: 'determined',
        dialogue: 'Cảm ơn Tuyết Mộc đại nhân! Trại sinh tồn này từ nay sẽ là cứ điểm an toàn, cung cấp hậu cần và nhân lực cho đại nhân!',
        backgroundTheme: 'prison_fortress'
      }
    ],
    battleConfig: {
      lanes: 4,
      cols: 8,
      durationSec: 75,
      startingSun: 300,
      startingPlantFood: 2,
      bossEnemyId: 'tyrant_vo_nang',
      ambientSound: 'grasswalk',
      waves: [
        {
          timestampSec: 5,
          waveAlert: 'Lính Vũ Trang Trại Giam tràn ra!',
          enemies: [
            { enemyTypeId: 'prison_guard_armed', count: 2, lane: 0 },
            { enemyTypeId: 'prison_guard_armed', count: 2, lane: 3 }
          ]
        },
        {
          timestampSec: 25,
          enemies: [
            { enemyTypeId: 'prison_guard_armed', count: 3 },
            { enemyTypeId: 'conehead_mutant', count: 3 }
          ]
        },
        {
          timestampSec: 45,
          waveAlert: 'CẢNH BÁO: Bạo Chúa Vô Năng vác RPG & Hóa Gấu lao tới!',
          enemies: [
            { enemyTypeId: 'tyrant_vo_nang', count: 1, lane: 1 },
            { enemyTypeId: 'prison_guard_armed', count: 3 },
            { enemyTypeId: 'rooftop_runner', count: 2 }
          ]
        }
      ]
    }
  },
  {
    id: 5,
    key: 'arc5_dark_forest',
    title: 'Giai Đoạn 5: Hành Trình Rừng Sâu',
    subtitle: 'Bách Quỷ Dạ Hành & Đại Trận Hủy Diệt',
    description: 'Chuyến xe điện độ chế lạc đường trong rừng rậm hoang sơ. Đối đầu Khỉ Đen Sơn Thị cấp 38 và đại dịch thú biến dị trong đêm Bách Quỷ Dạ Hành.',
    arcSummary: 'Xạ Thủ biến thành tai nghe giảm thanh chặn tiếng gầm Sơn Thị, phối hợp toàn diện Nấm Thôi Miên, Cọc Gỗ Lửa, Dưa Hấu tạo nên trận đại sát!',
    backgroundTheme: 'dark_forest',
    unlockCardIds: ['torchwood', 'hypno_shroom', 'lightning_shroom'],
    rewardSouls: 1000,
    rewardSun: 1000,
    storyDialogs: [
      {
        id: '5_1',
        speakerName: 'Tuyết Mộc',
        speakerRole: 'Tuyết Mộc (Bất lực)',
        speakerAvatar: 'tuyet_moc',
        expression: 'funny',
        dialogue: 'Trời ơi là trời! Chiếc xe điện độ bằng Nấm Dòng Điện giao cho Zombie Xe Trượt Tuyết lái... rốt cuộc 2 bông Hướng Dương cứ quay đầu theo mặt trời lặn làm xe đi lạc 50km vào rừng sâu!',
        backgroundTheme: 'dark_forest',
        sfxCue: 'click'
      },
      {
        id: '5_2',
        speakerName: 'Khỉ Đen Sơn Thị (Cấp 38)',
        speakerRole: 'Chúa Tể Sơn Lâm',
        speakerAvatar: 'mountain_ape',
        expression: 'angry',
        dialogue: 'GRAOOOOO! (Tiếng gầm siêu thanh xé toạc không gian làm rung chuyển núi rừng!)',
        backgroundTheme: 'dark_forest',
        sfxCue: 'rage'
      },
      {
        id: '5_3',
        speakerName: 'Xạ Thủ Nuốt Chửng',
        speakerRole: 'Tiểu Thôn',
        speakerAvatar: 'tieu_thon',
        expression: 'determined',
        dialogue: 'Biến hình! Tai nghe giảm thanh chụp vào tai chủ nhân! Mau tung Cọc Gỗ Bốc Cháy và Nấm Thôi Miên ra, đêm Bách Quỷ Dạ Hành tới rồi!',
        backgroundTheme: 'dark_forest',
        choices: [
          {
            text: 'Dựng Cọc Gỗ Bốc Cháy cường hóa đạn lửa tối thượng!',
            outcomeText: 'Hàng rào lửa đỏ rực thắp sáng rừng sâu hoang tàn!',
            rewardSun: 200
          },
          {
            text: 'Cài Nấm Thôi Miên lừa bầy ma thú cắn lẫn nhau!',
            outcomeText: 'Trận tuyến ma thú hỗn loạn quay đầu đánh nhau!',
            grantPlantFood: 2
          }
        ]
      },
      {
        id: '5_4',
        speakerName: 'Tuyết Mộc',
        speakerRole: 'Tuyết Mộc - Card Master Đích Thực',
        speakerAvatar: 'tuyet_moc',
        expression: 'determined',
        dialogue: 'Toàn quân xuất trận! Zombie Cửa Sắt, Zombie Báo làm tiên phong! Hỏa Diệm Xạ Thủ, Nấm Sấm Sét, Pháo Dưa Hấu bắn tự do! Nghiền nát tất cả!',
        backgroundTheme: 'dark_forest'
      }
    ],
    battleConfig: {
      lanes: 5,
      cols: 8,
      durationSec: 90,
      startingSun: 350,
      startingPlantFood: 3,
      bossEnemyId: 'mountain_ape_lv38',
      ambientSound: 'grasswalk',
      waves: [
        {
          timestampSec: 5,
          waveAlert: 'Ma Thú Rừng Đột Biến xuất hiện từ bóng tối!',
          enemies: [
            { enemyTypeId: 'forest_mutated_beast', count: 3, lane: 0 },
            { enemyTypeId: 'forest_mutated_beast', count: 3, lane: 4 }
          ]
        },
        {
          timestampSec: 25,
          waveAlert: 'Tiếng gầm Khỉ Đen Sơn Thị Cấp 38 xuất thế!',
          enemies: [
            { enemyTypeId: 'mountain_ape_lv38', count: 1, lane: 2 },
            { enemyTypeId: 'forest_mutated_beast', count: 4 }
          ]
        },
        {
          timestampSec: 55,
          waveAlert: 'ĐỈNH ĐIỂM: BÁCH QUỶ DẠ HÀNH - Hàng trăm ma thú tổng lực tấn công!',
          enemies: [
            { enemyTypeId: 'forest_mutated_beast', count: 6 },
            { enemyTypeId: 'prison_guard_armed', count: 3 },
            { enemyTypeId: 'savage_archer', count: 3 },
            { enemyTypeId: 'conehead_mutant', count: 4 }
          ]
        }
      ]
    }
  }
];
