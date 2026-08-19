import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Item, Equipment, ItemCategory } from '../types';
import { soundManager } from '../utils/audio';
import { Backpack, X, Shield, Swords, Sparkles, Check, Trash2, Heart, Droplets, Utensils, Brain } from 'lucide-react';

interface InventoryModalProps {
  inventory: Item[];
  equipment: Equipment;
  onUseItem: (item: Item) => void;
  onEquipItem: (item: Item) => void;
  onUnequipItem: (slot: 'weapon' | 'armor' | 'accessory') => void;
  onClose: () => void;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  inventory,
  equipment,
  onUseItem,
  onEquipItem,
  onUnequipItem,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<Item | null>(inventory[0] || null);

  const filteredItems = inventory.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-3xl bg-neutral-950 border-2 border-cyan-500/50 p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh] relative"
      >
        {/* Badge */}
        <div className="absolute -top-3.5 left-6 bg-cyan-500 text-neutral-950 px-3 py-0.5 text-[11px] font-black uppercase tracking-tighter">
          Kho Đồ & Hành Trang Sinh Tồn
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 mb-3 mt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-neutral-800 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Backpack className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                Hành Trang ({inventory.reduce((acc, i) => acc + i.quantity, 0)} Món)
              </h3>
              <p className="text-[10px] text-neutral-400">
                Quản lý trang bị, thuốc men, thực phẩm và tinh thể dị biến
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

        {/* Equipment Slots Summary */}
        <div className="grid grid-cols-3 gap-2 p-2.5 bg-neutral-900 border border-neutral-800 mb-3 text-xs">
          {/* Weapon Slot */}
          <div className="flex items-center justify-between p-2 bg-neutral-950 border border-neutral-800">
            <div className="flex items-center gap-2 truncate">
              <span className="text-base">{equipment.weapon ? equipment.weapon.icon : '🗡️'}</span>
              <div className="truncate">
                <span className="text-[9px] text-neutral-500 uppercase block">Vũ Khí</span>
                <span className="font-bold text-white text-[11px] truncate block">
                  {equipment.weapon ? equipment.weapon.name : '(Trống)'}
                </span>
              </div>
            </div>
            {equipment.weapon && (
              <button
                onClick={() => onUnequipItem('weapon')}
                className="text-[9px] text-red-400 hover:text-red-300 ml-1 cursor-pointer"
              >
                Gỡ
              </button>
            )}
          </div>

          {/* Armor Slot */}
          <div className="flex items-center justify-between p-2 bg-neutral-950 border border-neutral-800">
            <div className="flex items-center gap-2 truncate">
              <span className="text-base">{equipment.armor ? equipment.armor.icon : '🛡️'}</span>
              <div className="truncate">
                <span className="text-[9px] text-neutral-500 uppercase block">Áo Giáp</span>
                <span className="font-bold text-white text-[11px] truncate block">
                  {equipment.armor ? equipment.armor.name : '(Trống)'}
                </span>
              </div>
            </div>
            {equipment.armor && (
              <button
                onClick={() => onUnequipItem('armor')}
                className="text-[9px] text-red-400 hover:text-red-300 ml-1 cursor-pointer"
              >
                Gỡ
              </button>
            )}
          </div>

          {/* Accessory Slot */}
          <div className="flex items-center justify-between p-2 bg-neutral-950 border border-neutral-800">
            <div className="flex items-center gap-2 truncate">
              <span className="text-base">{equipment.accessory ? equipment.accessory.icon : '💍'}</span>
              <div className="truncate">
                <span className="text-[9px] text-neutral-500 uppercase block">Phụ Kiện</span>
                <span className="font-bold text-white text-[11px] truncate block">
                  {equipment.accessory ? equipment.accessory.name : '(Trống)'}
                </span>
              </div>
            </div>
            {equipment.accessory && (
              <button
                onClick={() => onUnequipItem('accessory')}
                className="text-[9px] text-red-400 hover:text-red-300 ml-1 cursor-pointer"
              >
                Gỡ
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1 border-b border-neutral-800 pb-2 mb-3 overflow-x-auto text-[10px]">
          {[
            { id: 'all', label: 'TẤT CẢ' },
            { id: 'weapon', label: 'VŨ KHÍ' },
            { id: 'armor', label: 'ÁO GIÁP' },
            { id: 'consumable', label: 'DÙNG ĐƯỢC' },
            { id: 'material', label: 'VẬT LIỆU' },
            { id: 'special', label: 'ĐẶC BIỆT' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.play('click');
                setSelectedCategory(tab.id as any);
              }}
              className={`px-2.5 py-1 uppercase font-bold border transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-cyan-600 text-white border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Inventory Split View */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-1 overflow-hidden">
          {/* Item Grid List (7 cols) */}
          <div className="md:col-span-7 overflow-y-auto pr-1 space-y-1.5 max-h-[45vh] md:max-h-[50vh]">
            {filteredItems.length === 0 ? (
              <div className="text-center py-10 text-neutral-500 text-xs">Không có vật phẩm trong danh mục này.</div>
            ) : (
              filteredItems.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                const isEquipped =
                  equipment.weapon?.id === item.id ||
                  equipment.armor?.id === item.id ||
                  equipment.accessory?.id === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      soundManager.play('click');
                      setSelectedItem(item);
                    }}
                    className={`p-2 border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-950/50 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.2)]'
                        : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-8 h-8 bg-neutral-800 border border-neutral-700 rounded-sm flex items-center justify-center text-lg shrink-0">
                        {item.icon}
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white truncate">{item.name}</span>
                          {isEquipped && (
                            <span className="text-[8px] bg-emerald-950 border border-emerald-500 text-emerald-400 px-1 font-bold">
                              ĐANG DÙNG
                            </span>
                          )}
                        </div>
                        <div className="text-[9px] text-neutral-400">
                          Hạng {item.tier} | {item.category}
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-bold text-xs text-amber-400 shrink-0">
                      x{item.quantity}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Selected Item Details Panel (5 cols) */}
          <div className="md:col-span-5 bg-neutral-900 border border-neutral-800 p-3 flex flex-col justify-between">
            {selectedItem ? (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-800">
                  <div className="w-10 h-10 bg-neutral-800 border border-cyan-500/50 flex items-center justify-center text-2xl">
                    {selectedItem.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">{selectedItem.name}</h4>
                    <span className="text-[9px] text-cyan-400 uppercase">
                      HẠNG {selectedItem.tier} • {selectedItem.category}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-neutral-300 leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Stats */}
                {selectedItem.stats && (
                  <div className="p-2 bg-neutral-950 border border-neutral-800 text-[10px] space-y-1">
                    {selectedItem.stats.atk && <div className="text-amber-400">⚔️ Tấn Công: +{selectedItem.stats.atk}</div>}
                    {selectedItem.stats.def && <div className="text-cyan-400">🛡️ Phòng Thủ: +{selectedItem.stats.def}</div>}
                    {selectedItem.stats.hp && <div className="text-emerald-400">❤️ Hồi Máu: +{selectedItem.stats.hp} HP</div>}
                    {selectedItem.stats.mp && <div className="text-blue-400">⚡ Hồi Mana: +{selectedItem.stats.mp} MP</div>}
                    {selectedItem.stats.hunger && <div className="text-orange-400">🍲 Giảm Đói: +{selectedItem.stats.hunger}%</div>}
                    {selectedItem.stats.thirst && <div className="text-blue-300">💧 Giảm Khát: +{selectedItem.stats.thirst}%</div>}
                    {selectedItem.stats.sanity && <div className="text-purple-400">🧠 Tinh Thần: +{selectedItem.stats.sanity}%</div>}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10 text-neutral-500 text-xs">Hãy chọn một vật phẩm</div>
            )}

            {/* Actions for Selected Item */}
            {selectedItem && (
              <div className="pt-2 border-t border-neutral-800 space-y-1.5">
                {selectedItem.category === 'consumable' && (
                  <button
                    onClick={() => {
                      soundManager.play('item_get');
                      onUseItem(selectedItem);
                    }}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest border-b-2 border-emerald-800 cursor-pointer transition-all shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                  >
                    Sử Dụng
                  </button>
                )}

                {['weapon', 'armor', 'accessory'].includes(selectedItem.category) && (
                  <button
                    onClick={() => {
                      soundManager.play('item_get');
                      onEquipItem(selectedItem);
                    }}
                    className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-widest border-b-2 border-cyan-800 cursor-pointer transition-all shadow-[0_0_8px_rgba(6,182,212,0.3)]"
                  >
                    Trang Bị Ngay
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
