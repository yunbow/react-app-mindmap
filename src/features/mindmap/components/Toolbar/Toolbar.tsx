import { Button } from '../../../../components/Button';
import { ColorPicker } from '../ColorPicker';
import styles from './Toolbar.module.css';

interface ToolbarProps {
  onAddNode: () => void;
  onDeleteNode: () => void;
  onClearAll: () => void;
  onSaveMap: () => void;
  onLoadMap: () => void;
  nodeColor: string;
  onNodeColorChange: (color: string) => void;
}

export const Toolbar = ({
  onAddNode,
  onDeleteNode,
  onClearAll,
  onSaveMap,
  onLoadMap,
  nodeColor,
  onNodeColorChange
}: ToolbarProps) => {
  return (
    <div className={styles.toolbar}>
      <Button onClick={onAddNode}>
        ノード追加
      </Button>
      <Button onClick={onDeleteNode} variant="secondary">
        ノード削除
      </Button>
      <Button onClick={onClearAll} variant="danger">
        全消去
      </Button>
      <Button onClick={onSaveMap}>
        保存
      </Button>
      <Button onClick={onLoadMap}>
        読込
      </Button>
      <ColorPicker
        label="ノードの色:"
        value={nodeColor}
        onChange={onNodeColorChange}
      />
    </div>
  );
};