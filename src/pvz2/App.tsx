import React, { useState, useEffect } from 'react';
import { GameView, PlayerProfile, StoryChoice, CardDefinition } from './types/game';
import { STORY_ARCS } from './data/storyData';
import { ALL_CARDS, INITIAL_DECK } from './data/cardsData';
import { TopBar } from './components/TopBar';
import { StageMap } from './components/StageMap';
import { StoryDialog } from './components/StoryDialog';
import { Battlefield } from './components/Battlefield';
import { CampHub } from './components/CampHub';
import { CardAlmanac } from './components/CardAlmanac';
import { DeckBuilder } from './components/DeckBuilder';
import { FusionModal } from './components/FusionModal';
import { GachaSummon } from './components/GachaSummon';
import { BattlePass } from './components/BattlePass';
import { VipShop } from './components/VipShop';
import { EndlessAbyss } from './components/EndlessAbyss';
import { ShopItem } from './data/monetizationData';
import { sound } from './utils/audio';
import { AlmanacModal } from '../shared/components/AlmanacModal';
import { CrazyDaveShopModal } from '../shared/components/CrazyDaveShopModal';
import { PvzMinigamesModal } from '../shared/components/PvzMinigamesModal';

const STORAGE_KEY = 'pvz_destiny_era_save_v2';
const PVZ_COINS_KEY = 'pvz_player_coins_v1';
const PVZ_PURCHASED_ITEMS_KEY = 'pvz_purchased_shop_items_v1';

interface Pvz2AppProps {
  onReturnToWorldSelect?: () => void;
}

export function Pvz2App({ onReturnToWorldSelect }: Pvz2AppProps) {
  const [currentView, setCurrentView] = useState<GameView>('stage_map');
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAlmanacOpen, setIsAlmanacOpen] = useState<boolean>(false);
  const [isDaveShopOpen, setIsDaveShopOpen] = useState<boolean>(false);
  const [isMinigamesOpen, setIsMinigamesOpen] = useState<boolean>(false);

  // Coins & Shop items
  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem(PVZ_COINS_KEY);
    return saved ? parseInt(saved, 10) : 1250;
  });

  const [purchasedShopItemIds, setPurchasedShopItemIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(PVZ_PURCHASED_ITEMS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Player Profile State with local storage persistence
  const [player, setPlayer] = useState<PlayerProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load save state:', e);
      }
    }
    return {
      name: 'Tuyết Mộc',
      level: 1,
      exp: 0,
      maxExp: 100,
      sunlight: 400,
      spiritSouls: 350,
      diamonds: 150, // Starter gems for 1st x10 Gacha!
      plantFood: 3,
      goldenWateringCharges: 3,
      currentArcId: 1,
      completedArcs: [],
      unlockedCards: [
        'sunflower',
        'peashooter_devourer',
        'giant_walnut',
        'newspaper_zombie',
        'chomper',
        'cherry_bomb',
        'magnet_shroom'
      ],
      activeDeck: [...INITIAL_DECK],
      equippedFusion: 'balloon_zombie',
      
      // VIP & Pass initial state
      hasVipMonthly: true,
      vipMonthlyDaysLeft: 30,
      hasPremiumPass: false,
      passLevel: 1,
      passExp: 120,
      claimedFreePassTiers: [],
      claimedPremiumPassTiers: [],
      gachaPityCount: 0,
      totalSummons: 0,
      endlessWaveRecord: 12,
      endlessScore: 14500,

      campUpgrades: {
        laQuanHeadquarters: 1,
        tuyetTinhScouts: 1,
        yosukeDojo: 1,
        goldenGarden: 1
      },
      cardLevels: {
        sunflower: 1,
        peashooter_devourer: 1,
        giant_walnut: 1,
        newspaper_zombie: 1,
        chomper: 1,
        cherry_bomb: 1,
        magnet_shroom: 1
      },
      stats: {
        zombiesKilled: 0,
        bossesDefeated: 0,
        sunlightHarvested: 0,
        cherryExplosions: 0,
        watermelonsEaten: 0
      }
    };
  });


  // Save to localStorage on state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
    } catch (e) {
      console.error('Could not save to localStorage:', e);
    }
  }, [player]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const currentArc = STORY_ARCS.find((a) => a.id === player.currentArcId) || STORY_ARCS[0];

  // Choice reward in story
  const handleChoiceReward = (choice: StoryChoice) => {
    setPlayer((prev) => ({
      ...prev,
      sunlight: prev.sunlight + (choice.rewardSun || 0),
      spiritSouls: prev.spiritSouls + (choice.rewardSouls || 0),
      plantFood: Math.min(5, prev.plantFood + (choice.grantPlantFood || 0)),
      unlockedCards: choice.grantCardId && !prev.unlockedCards.includes(choice.grantCardId)
        ? [...prev.unlockedCards, choice.grantCardId]
        : prev.unlockedCards
    }));
    showToast('✨ Nhận phần thưởng quyết định chiến thuật!');
  };

  // Battle Victory
  const handleBattleVictory = (gainedSun: number, gainedSouls: number) => {
    setPlayer((prev) => {
      const expGain = 80;
      let nextExp = prev.exp + expGain;
      let nextLvl = prev.level;
      let nextMaxExp = prev.maxExp;

      if (nextExp >= prev.maxExp) {
        nextExp -= prev.maxExp;
        nextLvl += 1;
        nextMaxExp = Math.floor(prev.maxExp * 1.5);
        sound.playVictory();
      }

      // Unlock new cards from this arc
      const newUnlocked = [...prev.unlockedCards];
      currentArc.unlockCardIds.forEach((cId) => {
        if (!newUnlocked.includes(cId)) {
          newUnlocked.push(cId);
        }
      });

      const nextCompleted = prev.completedArcs.includes(currentArc.id)
        ? prev.completedArcs
        : [...prev.completedArcs, currentArc.id];

      const nextArcId = currentArc.id < STORY_ARCS.length ? currentArc.id + 1 : currentArc.id;

      return {
        ...prev,
        level: nextLvl,
        exp: nextExp,
        maxExp: nextMaxExp,
        sunlight: prev.sunlight + gainedSun,
        spiritSouls: prev.spiritSouls + gainedSouls,
        unlockedCards: newUnlocked,
        completedArcs: nextCompleted,
        currentArcId: nextArcId,
        stats: {
          ...prev.stats,
          zombiesKilled: prev.stats.zombiesKilled + 20,
          bossesDefeated: prev.stats.bossesDefeated + 1
        }
      };
    });

    showToast(`🎉 Vượt màn thành công: ${currentArc.title}! Đã mở khóa khu vực mới!`);
    setCurrentView('stage_map');
  };

  // Upgrade Camp
  const handleUpgradeCamp = (facility: keyof PlayerProfile['campUpgrades'], costSouls: number) => {
    if (player.spiritSouls < costSouls) return;

    setPlayer((prev) => ({
      ...prev,
      spiritSouls: prev.spiritSouls - costSouls,
      campUpgrades: {
        ...prev.campUpgrades,
        [facility]: prev.campUpgrades[facility] + 1
      }
    }));
    sound.playSunPickup();
    showToast('🏰 Nâng cấp công trình trại thành công!');
  };

  // Collect daily supply
  const handleCollectDailySupplies = () => {
    const sunBonus = 150 + player.campUpgrades.laQuanHeadquarters * 50;
    const soulBonus = 100 + player.campUpgrades.tuyetTinhScouts * 30;

    setPlayer((prev) => ({
      ...prev,
      sunlight: prev.sunlight + sunBonus,
      spiritSouls: prev.spiritSouls + soulBonus,
      plantFood: Math.min(5, prev.plantFood + 1)
    }));
    showToast(`📦 Nhận tiếp tế: +${sunBonus} ☀️ và +${soulBonus} 🔮!`);
  };

  // Refill Golden Watering Can
  const handleRefillWateringCan = () => {
    if (player.spiritSouls < 50) {
      showToast('❌ Cần 50 Tinh Hồn để nạp nước thần!');
      return;
    }
    setPlayer((prev) => ({
      ...prev,
      spiritSouls: prev.spiritSouls - 50,
      goldenWateringCharges: prev.goldenWateringCharges + 3
    }));
    sound.playWateringCan();
    showToast('💧 Đã nạp đầy 3 lần dùng Bình Tưới Vàng!');
  };

  // Upgrade Card in Almanac
  const handleUpgradeCard = (cardId: string, costSouls: number) => {
    if (player.spiritSouls < costSouls) return;

    setPlayer((prev) => ({
      ...prev,
      spiritSouls: prev.spiritSouls - costSouls,
      cardLevels: {
        ...prev.cardLevels,
        [cardId]: (prev.cardLevels[cardId] || 1) + 1
      }
    }));
    showToast(`⚡ Thẻ bài ${ALL_CARDS.find((c) => c.id === cardId)?.vietnameseTitle} đã lên cấp!`);
  };

  // Toggle card in deck
  const handleToggleDeckCard = (cardId: string) => {
    setPlayer((prev) => {
      if (prev.activeDeck.includes(cardId)) {
        if (prev.activeDeck.length <= 1) {
          showToast('⚠️ Phải giữ ít nhất 1 thẻ bài trong bộ!');
          return prev;
        }
        return {
          ...prev,
          activeDeck: prev.activeDeck.filter((id) => id !== cardId)
        };
      } else {
        if (prev.activeDeck.length >= 7) {
          showToast('⚠️ Bộ bài chỉ tối đa 7 ô xuất trận!');
          return prev;
        }
        return {
          ...prev,
          activeDeck: [...prev.activeDeck, cardId]
        };
      }
    });
  };

  // Auto optimize deck
  const handleAutoOptimizeDeck = () => {
    const recommended = [
      'sunflower',
      'peashooter_devourer',
      'giant_walnut',
      'newspaper_zombie',
      'magnet_shroom',
      'melon_pult',
      'cherry_bomb'
    ].filter((id) => player.unlockedCards.includes(id));

    setPlayer((prev) => ({
      ...prev,
      activeDeck: recommended.slice(0, 7)
    }));
    showToast('⚡ Đã sắp xếp đội hình thẻ bài cân bằng tối ưu!');
  };

  // Gacha Summon Result handler
  const handleSummon = (costDiamonds: number, count: number, results: CardDefinition[]) => {
    setPlayer((prev) => {
      const newUnlocked = [...prev.unlockedCards];
      let soulBonus = 0;

      results.forEach((c) => {
        if (!newUnlocked.includes(c.id)) {
          newUnlocked.push(c.id);
        } else {
          // Duplicate card converted to soul fragments
          soulBonus += c.rarity === 'Pi' ? 500 : c.rarity === 'SS' ? 300 : c.rarity === 'S' ? 150 : 50;
        }
      });

      return {
        ...prev,
        diamonds: Math.max(0, prev.diamonds - costDiamonds),
        unlockedCards: newUnlocked,
        spiritSouls: prev.spiritSouls + soulBonus,
        gachaPityCount: prev.gachaPityCount + count,
        totalSummons: prev.totalSummons + count,
        passExp: prev.passExp + count * 25
      };
    });
    showToast(`✨ Chiêu mộ thành công ${count} Thẻ Linh!`);
  };

  // VIP Shop Purchase handler
  const handlePurchaseShopItem = (item: ShopItem) => {
    setPlayer((prev) => {
      const newUnlocked = [...prev.unlockedCards];
      if (item.reward.cards) {
        item.reward.cards.forEach((cId) => {
          if (!newUnlocked.includes(cId)) newUnlocked.push(cId);
        });
      }

      return {
        ...prev,
        diamonds: prev.diamonds + (item.reward.diamonds || 0),
        sunlight: prev.sunlight + (item.reward.sun || 0),
        spiritSouls: prev.spiritSouls + (item.reward.souls || 0),
        hasVipMonthly: item.reward.isMonthlyVip ? true : prev.hasVipMonthly,
        vipMonthlyDaysLeft: item.reward.isMonthlyVip ? 30 : prev.vipMonthlyDaysLeft,
        hasPremiumPass: item.reward.isBattlePass ? true : prev.hasPremiumPass,
        unlockedCards: newUnlocked
      };
    });
    showToast(`👑 Mua thành công [${item.name}]! Đã nhận đặc quyền.`);
  };

  // Daily VIP Claim handler
  const handleClaimDailyVip = () => {
    setPlayer((prev) => ({
      ...prev,
      sunlight: prev.sunlight + 100,
      diamonds: prev.diamonds + 60,
      lastDailyClaimTimestamp: Date.now()
    }));
    showToast('🎁 Đã nhận đặc quyền VIP: +100 ☀️ và +60 💎!');
  };

  // Claim Battle Pass Rewards
  const handleClaimFreeTier = (tierLevel: number, reward: any) => {
    setPlayer((prev) => {
      let sun = prev.sunlight;
      let souls = prev.spiritSouls;
      let dia = prev.diamonds;
      let water = prev.goldenWateringCharges;
      let cards = [...prev.unlockedCards];

      if (reward.type === 'sun') sun += reward.amount;
      if (reward.type === 'souls') souls += reward.amount;
      if (reward.type === 'diamonds') dia += reward.amount;
      if (reward.type === 'water') water += reward.amount;
      if (reward.type === 'card' && reward.cardId && !cards.includes(reward.cardId)) {
        cards.push(reward.cardId);
      }

      return {
        ...prev,
        sunlight: sun,
        spiritSouls: souls,
        diamonds: dia,
        goldenWateringCharges: water,
        unlockedCards: cards,
        claimedFreePassTiers: [...prev.claimedFreePassTiers, tierLevel]
      };
    });
    showToast(`🎁 Đã nhận thưởng Cấp ${tierLevel}: ${reward.label}!`);
  };

  const handleClaimPremiumTier = (tierLevel: number, reward: any) => {
    setPlayer((prev) => {
      let sun = prev.sunlight;
      let souls = prev.spiritSouls;
      let dia = prev.diamonds;
      let water = prev.goldenWateringCharges;
      let cards = [...prev.unlockedCards];

      if (reward.type === 'sun') sun += reward.amount;
      if (reward.type === 'souls') souls += reward.amount;
      if (reward.type === 'diamonds') dia += reward.amount;
      if (reward.type === 'water') water += reward.amount;
      if (reward.type === 'card' && reward.cardId && !cards.includes(reward.cardId)) {
        cards.push(reward.cardId);
      }

      return {
        ...prev,
        sunlight: sun,
        spiritSouls: souls,
        diamonds: dia,
        goldenWateringCharges: water,
        unlockedCards: cards,
        claimedPremiumPassTiers: [...prev.claimedPremiumPassTiers, tierLevel]
      };
    });
    showToast(`👑 Đã nhận thưởng VIP Cấp ${tierLevel}: ${reward.label}!`);
  };

  const handleToggleAudio = () => {
    const muted = sound.toggleMute();
    setIsAudioMuted(muted);
    showToast(muted ? '🔇 Đã tắt âm thanh' : '🔊 Đã bật âm thanh');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white font-bold text-xs md:text-sm px-4 py-2.5 rounded-2xl shadow-2xl border border-emerald-400 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Persistent Navigation & Profile TopBar */}
      <TopBar
        player={player}
        currentView={currentView}
        isAudioMuted={isAudioMuted}
        onSelectView={setCurrentView}
        onSelectArc={(arcId) => {
          setPlayer((p) => ({ ...p, currentArcId: arcId }));
          setCurrentView('story');
        }}
        onToggleAudio={handleToggleAudio}
        onReturnToWorldSelect={onReturnToWorldSelect}
        onOpenAlmanac={() => setIsAlmanacOpen(true)}
        onOpenCrazyDaveShop={() => setIsDaveShopOpen(true)}
        onOpenMinigames={() => setIsMinigamesOpen(true)}
      />

      {/* Main Interactive Screen Content */}
      <main className="flex-1 p-3 md:p-6 max-w-7xl mx-auto w-full flex flex-col justify-start">
        {currentView === 'stage_map' && (
          <StageMap
            player={player}
            onSelectStage={(arcId) => {
              setPlayer((p) => ({ ...p, currentArcId: arcId }));
            }}
            onStartBattle={(arcId) => {
              setPlayer((p) => ({ ...p, currentArcId: arcId }));
              sound.playClick();
              setCurrentView('battle');
            }}
            onViewStory={(arcId) => {
              setPlayer((p) => ({ ...p, currentArcId: arcId }));
              sound.playClick();
              setCurrentView('story');
            }}
            onOpenDeck={() => {
              sound.playClick();
              setCurrentView('deck');
            }}
          />
        )}

        {currentView === 'story' && (
          <StoryDialog
            arc={currentArc}
            onStartBattle={() => {
              sound.playClick();
              setCurrentView('battle');
            }}
            onChoiceReward={handleChoiceReward}
            onSkipStory={() => {
              sound.playClick();
              setCurrentView('battle');
            }}
          />
        )}

        {currentView === 'battle' && (
          <Battlefield
            arc={currentArc}
            deck={player.activeDeck}
            sunlight={player.sunlight}
            plantFoodCount={player.plantFood}
            goldenWateringCharges={player.goldenWateringCharges}
            onBattleVictory={handleBattleVictory}
            onBattleDefeat={() => {
              showToast('Thử lại trận đấu với sự chuẩn bị kỹ càng hơn!');
            }}
            onReturnToStory={() => setCurrentView('stage_map')}
          />
        )}

        {currentView === 'gacha' && (
          <GachaSummon
            player={player}
            onSummon={handleSummon}
          />
        )}

        {currentView === 'pass' && (
          <BattlePass
            player={player}
            onClaimFreeTier={handleClaimFreeTier}
            onClaimPremiumTier={handleClaimPremiumTier}
            onUnlockPremiumPass={() => {
              setPlayer((p) => ({ ...p, hasPremiumPass: true, diamonds: p.diamonds + 150 }));
              showToast('👑 Đã mở khóa Vé Sinh Tồn Mùa 1 Thượng Đỉnh!');
            }}
          />
        )}

        {currentView === 'shop' && (
          <VipShop
            player={player}
            onPurchaseItem={handlePurchaseShopItem}
            onClaimDailyVip={handleClaimDailyVip}
          />
        )}

        {currentView === 'endless' && (
          <EndlessAbyss
            player={player}
            onStartEndlessBattle={() => {
              sound.playClick();
              setCurrentView('battle');
              showToast('⚔️ Bước vào Vực Thẳm Vô Tận!');
            }}
          />
        )}

        {currentView === 'camp' && (
          <CampHub
            player={player}
            onUpgradeCamp={handleUpgradeCamp}
            onCollectDailySupplies={handleCollectDailySupplies}
            onRefillWateringCan={handleRefillWateringCan}
          />
        )}

        {currentView === 'almanac' && (
          <CardAlmanac
            player={player}
            onUpgradeCard={handleUpgradeCard}
          />
        )}

        {currentView === 'deck' && (
          <DeckBuilder
            player={player}
            onToggleDeckCard={handleToggleDeckCard}
            onAutoOptimizeDeck={handleAutoOptimizeDeck}
          />
        )}

        {currentView === 'fusion' && (
          <FusionModal
            player={player}
            onSelectFusion={(fusionId) => {
              setPlayer((p) => ({ ...p, equippedFusion: fusionId }));
              showToast('🎈 Đã kích hoạt trang bị Nhập Thể thành công!');
            }}
          />
        )}
      </main>

      {/* Suburban Almanac Pop-up Modal */}
      <AlmanacModal
        isOpen={isAlmanacOpen}
        onClose={() => setIsAlmanacOpen(false)}
      />

      {/* Crazy Dave Twiddydinkies Shop Modal */}
      <CrazyDaveShopModal
        isOpen={isDaveShopOpen}
        onClose={() => setIsDaveShopOpen(false)}
        coins={coins}
        onUpdateCoins={(newCoins) => {
          setCoins(newCoins);
          localStorage.setItem(PVZ_COINS_KEY, newCoins.toString());
        }}
        purchasedItemIds={purchasedShopItemIds}
        onPurchaseItem={(itemId) => {
          const next = [...purchasedShopItemIds, itemId];
          setPurchasedShopItemIds(next);
          localStorage.setItem(PVZ_PURCHASED_ITEMS_KEY, JSON.stringify(next));
          showToast('🛒 Giao dịch thành công tại cửa hàng Crazy Dave!');
        }}
      />

      {/* PopCap Minigames Modal (Vasebreaker, Bowling, I Zombie) */}
      <PvzMinigamesModal
        isOpen={isMinigamesOpen}
        onClose={() => setIsMinigamesOpen(false)}
        onRewardCoins={(amount) => {
          const next = coins + amount;
          setCoins(next);
          localStorage.setItem(PVZ_COINS_KEY, next.toString());
          showToast(`🏆 Chiến thắng Minigame! +${amount} Xu Vàng!`);
        }}
      />

      {/* Footer info */}
      <footer className="w-full bg-neutral-950 border-t border-neutral-900 py-3 px-6 text-center text-xs text-neutral-400">
        Plants vs. Zombies: Kỷ Nguyên Vận Mệnh Quốc Gia • Game Sinh Tồn Thẻ Bài Nhập Vai • Tuyết Mộc & Hệ Thống Sân Vườn Bác Sĩ
      </footer>
    </div>
  );
}

export default Pvz2App;

