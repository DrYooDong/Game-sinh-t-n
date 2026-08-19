import React, { useState } from 'react';
import KtxApp from './ktx/KtxApp';
import { PvzApp } from './pvz/PvzApp';
import { WorldSelectScreen } from './shared/components/WorldSelectScreen';

type WorldMode = 'select' | 'ktx' | 'pvz';

const SELECTED_WORLD_STORAGE_KEY = 'active_survival_world_v1';

export const RootRouter: React.FC = () => {
  const [world, setWorld] = useState<WorldMode>(() => {
    const saved = localStorage.getItem(SELECTED_WORLD_STORAGE_KEY) as WorldMode;
    return saved && (saved === 'ktx' || saved === 'pvz') ? saved : 'select';
  });

  const handleSelectWorld = (worldId: 'ktx' | 'pvz') => {
    setWorld(worldId);
    localStorage.setItem(SELECTED_WORLD_STORAGE_KEY, worldId);
  };

  const handleReturnToSelect = () => {
    setWorld('select');
    localStorage.setItem(SELECTED_WORLD_STORAGE_KEY, 'select');
  };

  if (world === 'ktx') {
    return <KtxApp onReturnToWorldSelect={handleReturnToSelect} />;
  }

  if (world === 'pvz') {
    return <PvzApp onReturnToWorldSelect={handleReturnToSelect} />;
  }

  return <WorldSelectScreen onSelectWorld={handleSelectWorld} />;
};

export default RootRouter;
