import { SavedMap } from '../../types';
import { Button } from '../../../../components/Button';
import styles from './SavedMapsList.module.css';

interface SavedMapsListProps {
  savedMaps: SavedMap[];
  onLoadMap: (mapId: string) => void;
  onDeleteMap: (mapId: string) => void;
}

export const SavedMapsList = ({
  savedMaps,
  onLoadMap,
  onDeleteMap
}: SavedMapsListProps) => {
  if (savedMaps.length === 0) {
    return (
      <div className={styles.savedMapsList}>
        <p>保存されたマップはありません</p>
      </div>
    );
  }

  return (
    <div className={styles.savedMapsList}>
      {savedMaps.map((map) => (
        <div
          key={map.id}
          className={styles.savedMapItem}
          onClick={(e) => {
            if (e.target !== e.currentTarget) return;
            onLoadMap(map.id);
          }}
        >
          <div className={styles.mapInfo}>
            <span className={styles.mapName}>{map.name}</span>
            <span className={styles.mapDate}>
              {new Date(map.saveDate).toLocaleString()}
            </span>
          </div>
          <Button
            onClick={() => {
              if (confirm(`"${map.name}"を削除しますか？`)) {
                onDeleteMap(map.id);
              }
            }}
            variant="danger"
            className={styles.deleteButton}
          >
            削除
          </Button>
        </div>
      ))}
    </div>
  );
};