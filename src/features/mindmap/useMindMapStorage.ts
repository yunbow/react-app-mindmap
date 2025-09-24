import { useState, useEffect } from 'react';
import { SavedMap } from './types';

export const useMindMapStorage = () => {
  const [savedMaps, setSavedMaps] = useState<SavedMap[]>([]);

  useEffect(() => {
    loadSavedMaps();
  }, []);

  const loadSavedMaps = () => {
    try {
      const mapsString = localStorage.getItem('mindmaps');
      const maps = mapsString ? JSON.parse(mapsString) : [];
      setSavedMaps(maps);
    } catch (error) {
      console.error('Failed to load saved maps:', error);
      setSavedMaps([]);
    }
  };

  const saveMap = (mapData: SavedMap) => {
    try {
      const updatedMaps = [...savedMaps, mapData];
      localStorage.setItem('mindmaps', JSON.stringify(updatedMaps));
      setSavedMaps(updatedMaps);
    } catch (error) {
      console.error('Failed to save map:', error);
      throw new Error('マップの保存に失敗しました');
    }
  };

  const loadMap = (mapId: string): SavedMap | null => {
    const map = savedMaps.find(m => m.id === mapId);
    return map || null;
  };

  const deleteSavedMap = (mapId: string) => {
    try {
      const updatedMaps = savedMaps.filter(map => map.id !== mapId);
      localStorage.setItem('mindmaps', JSON.stringify(updatedMaps));
      setSavedMaps(updatedMaps);
    } catch (error) {
      console.error('Failed to delete map:', error);
      throw new Error('マップの削除に失敗しました');
    }
  };

  return {
    savedMaps,
    saveMap,
    loadMap,
    deleteSavedMap,
    refreshSavedMaps: loadSavedMaps
  };
};