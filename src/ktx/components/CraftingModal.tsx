import React from 'react';
import { motion } from 'motion/react';
import { CRAFTING_RECIPES } from '../data/initialData';
import { Item } from '../types';
import { soundManager } from '../utils/audio';
import { Hammer, X, Sparkles, Check, AlertCircle, Swords, Shield, Heart } from 'lucide-react';

interface CraftingModalProps {
  inventory: Item[];
  onCraftItem: (recipe: Item) => void;
  onClose: () => void;
}

export const CraftingModal: React.FC<CraftingModalProps> = ({
  inventory,
  onCraftItem,
  onClose
}) => {
  const getMaterialCount = (itemId: string): number => {
    const item = inventory.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  };

  const canCraft = (recipe: Item): boolean => {
    if (!recipe.craftRecipe) return false;
    return recipe.craftRecipe.materials.every((mat) => {
      const owned = getMaterialCount(mat.itemId);
      return owned >= mat.count;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-2xl bg-neutral-950 border-2 border-cyan-500/50 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative"
      >
        {/* Badge */}
        <div className="absolute -top-3.5 left-6 bg-cyan-500 text-neutral-950 px-3 py-0.5 text-[11px] font-black uppercase tracking-tighter">
          Bàn Chế Tạo Dã Chiến (Phòng 304)
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 mb-3 mt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-neutral-800 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Hammer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                Chế Tạo Vũ Khí & Trang Bị
              </h3>
              <p className="text-[10px] text-neutral-400">
                Sử dụng các linh kiện nhặt được trong Ký Túc Xá để nâng cấp sức mạnh
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.play('click');
              onClose();
            }}
            className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Recipes Grid */}
        <div className="overflow-y-auto space-y-2.5 flex-1 pr-1">
          {CRAFTING_RECIPES.map((recipe) => {
            const craftable = canCraft(recipe);
            return (
              <div
                key={recipe.id}
                className={`p-3 border transition-all ${
                  craftable
                    ? 'bg-neutral-900/90 border-cyan-500/50 shadow-[0_0_8px_rgba(6,182,212,0.15)]'
                    : 'bg-neutral-950/80 border-neutral-800 opacity-80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-neutral-800 border border-neutral-700 rounded-sm flex items-center justify-center text-xl shrink-0">
                      {recipe.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white uppercase">{recipe.name}</span>
                        <span className="text-[9px] px-1.5 py-0.2 bg-cyan-950 border border-cyan-500/40 text-cyan-400 uppercase">
                          {recipe.tier || recipe.rarity}
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-0.5">{recipe.description}</p>
                      
                      {/* Stats tag */}
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-amber-300">
                        {recipe.stats?.atk && <span>+ {recipe.stats.atk} Sát thương (ATK)</span>}
                        {recipe.stats?.def && <span>+ {recipe.stats.def} Giáp (DEF)</span>}
                        {recipe.stats?.hp && <span>+ {recipe.stats.hp} HP Hồi phục</span>}
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={!craftable}
                    onClick={() => {
                      soundManager.play('craft');
                      onCraftItem(recipe);
                    }}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border-b-2 transition-all shrink-0 ${
                      craftable
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-800 cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                        : 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
                    }`}
                  >
                    Chế Tạo
                  </button>
                </div>

                {/* Materials required */}
                <div className="mt-2 pt-2 border-t border-neutral-800/80 flex flex-wrap gap-2 text-[10px]">
                  <span className="text-neutral-500 uppercase">Nguyên liệu:</span>
                  {recipe.craftRecipe?.materials.map((mat) => {
                    const owned = getMaterialCount(mat.itemId);
                    const sufficient = owned >= mat.count;
                    return (
                      <span
                        key={mat.itemId}
                        className={`px-2 py-0.5 border text-[10px] font-mono ${
                          sufficient
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                            : 'bg-red-950/40 border-red-500/40 text-red-300'
                        }`}
                      >
                        {mat.name}: {owned}/{mat.count}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
