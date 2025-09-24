import { useState, useEffect } from 'react';
import { MindMapNode } from '../../types';
import { Button } from '../../../../components/Button';
import { FormGroup } from '../../../../components/FormGroup';
import { Label } from '../../../../components/Label';
import { TextArea } from '../../../../components/TextArea';
import { Input } from '../../../../components/Input';
import { Select } from '../../../../components/Select';
import styles from './NodeEditor.module.css';

interface NodeEditorProps {
  selectedNode: MindMapNode | null;
  onApplyChanges: (nodeId: string, updates: Partial<MindMapNode>) => void;
}

const fontSizeOptions = [
  { value: '12px', label: '小' },
  { value: '16px', label: '中' },
  { value: '20px', label: '大' }
];

export const NodeEditor = ({
  selectedNode,
  onApplyChanges
}: NodeEditorProps) => {
  const [editText, setEditText] = useState('');
  const [editColor, setEditColor] = useState('#f8f9fa');
  const [editTextColor, setEditTextColor] = useState('#212529');
  const [editFontSize, setEditFontSize] = useState('16px');

  useEffect(() => {
    if (selectedNode) {
      setEditText(selectedNode.content);
      setEditColor(selectedNode.style.backgroundColor || '#f8f9fa');
      setEditTextColor(selectedNode.style.color || '#212529');
      setEditFontSize(selectedNode.style.fontSize || '16px');
    }
  }, [selectedNode]);

  const handleApplyChanges = () => {
    if (!selectedNode) return;

    onApplyChanges(selectedNode.id, {
      content: editText,
      style: {
        ...selectedNode.style,
        backgroundColor: editColor,
        color: editTextColor,
        fontSize: editFontSize
      }
    });
  };

  if (!selectedNode) {
    return (
      <div className={styles.nodeEditor}>
        <h3>ノード編集</h3>
        <p>ノードを選択してください</p>
      </div>
    );
  }

  return (
    <div className={styles.nodeEditor}>
      <h3>ノード編集</h3>
      <div className={styles.editorForm}>
        <FormGroup>
          <Label htmlFor="edit-text">テキスト:</Label>
          <TextArea
            id="edit-text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={3}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="edit-color">背景色:</Label>
          <Input
            type="color"
            id="edit-color"
            value={editColor}
            onChange={(e) => setEditColor(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="edit-text-color">文字色:</Label>
          <Input
            type="color"
            id="edit-text-color"
            value={editTextColor}
            onChange={(e) => setEditTextColor(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="edit-font-size">フォントサイズ:</Label>
          <Select
            id="edit-font-size"
            value={editFontSize}
            options={fontSizeOptions}
            onChange={(e) => setEditFontSize(e.target.value)}
          />
        </FormGroup>

        <Button onClick={handleApplyChanges}>
          適用
        </Button>
      </div>
    </div>
  );
};