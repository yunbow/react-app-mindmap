import { useState } from 'react';
import { MindMapNode, SavedMap, Position } from '../types';
import { Toolbar } from '../components/Toolbar';
import { MindMapCanvas } from '../components/MindMapCanvas';
import { NodeEditor } from '../components/NodeEditor';
import { Modal } from '../../../components/Modal';
import { FormGroup } from '../../../components/FormGroup';
import { Label } from '../../../components/Label';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { SavedMapsList } from '../components/SavedMapsList';
import { useMindMapStorage } from '../useMindMapStorage';
import styles from './MindMapApp.module.css';

export const MindMapApp = () => {
  const [nodes, setNodes] = useState<MindMapNode[]>([
    {
      id: 'root',
      parentId: null,
      content: '中心トピック',
      style: {
        left: '400px',
        top: '300px',
        backgroundColor: '#4a86e8',
        color: 'white',
        fontSize: '16px'
      }
    }
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [lastNodeId, setLastNodeId] = useState(0);
  const [nodeColor, setNodeColor] = useState('#f8f9fa');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [mapName, setMapName] = useState('');

  const { savedMaps, saveMap, deleteSavedMap } = useMindMapStorage();

  const selectedNode = nodes.find(node => node.id === selectedNodeId) || null;

  const addNode = (parentNodeId?: string) => {
    const parentId = parentNodeId || selectedNodeId || 'root';
    const parent = nodes.find(node => node.id === parentId);
    if (!parent) return;

    const newId = `node-${lastNodeId + 1}`;
    const parentX = parseFloat(parent.style.left);
    const parentY = parseFloat(parent.style.top);

    const newNode: MindMapNode = {
      id: newId,
      parentId,
      content: `ノード ${lastNodeId + 1}`,
      style: {
        left: `${parentX + 150}px`,
        top: `${parentY}px`,
        backgroundColor: nodeColor,
        color: '#212529',
        fontSize: '16px'
      }
    };

    setNodes(prev => [...prev, newNode]);
    setLastNodeId(prev => prev + 1);
    setSelectedNodeId(newId);
  };

  const deleteNode = (nodeId: string) => {
    if (nodeId === 'root') return;

    const getChildrenRecursive = (id: string): string[] => {
      const children = nodes.filter(node => node.parentId === id);
      const childIds = children.map(child => child.id);
      return childIds.concat(...childIds.map(getChildrenRecursive));
    };

    const idsToDelete = [nodeId, ...getChildrenRecursive(nodeId)];
    setNodes(prev => prev.filter(node => !idsToDelete.includes(node.id)));

    if (selectedNodeId && idsToDelete.includes(selectedNodeId)) {
      setSelectedNodeId(null);
    }
  };

  const clearAllNodes = () => {
    if (confirm('マインドマップを全て消去しますか？')) {
      setNodes([
        {
          id: 'root',
          parentId: null,
          content: '中心トピック',
          style: {
            left: '400px',
            top: '300px',
            backgroundColor: '#4a86e8',
            color: 'white',
            fontSize: '16px'
          }
        }
      ]);
      setSelectedNodeId(null);
      setLastNodeId(0);
    }
  };

  const moveNode = (nodeId: string, position: Position) => {
    setNodes(prev => prev.map(node =>
      node.id === nodeId
        ? {
            ...node,
            style: {
              ...node.style,
              left: `${position.x}px`,
              top: `${position.y}px`
            }
          }
        : node
    ));
  };

  const updateNodeContent = (nodeId: string, content: string) => {
    setNodes(prev => prev.map(node =>
      node.id === nodeId ? { ...node, content } : node
    ));
  };

  const updateNode = (nodeId: string, updates: Partial<MindMapNode>) => {
    setNodes(prev => prev.map(node =>
      node.id === nodeId ? { ...node, ...updates } : node
    ));
  };

  const changeNodeColor = (nodeId: string) => {
    const color = prompt('色を入力してください（例: #4a86e8）', nodeColor);
    if (color) {
      updateNode(nodeId, {
        style: {
          ...nodes.find(n => n.id === nodeId)?.style!,
          backgroundColor: color
        }
      });
    }
  };

  const handleSaveMap = (e?: React.MouseEvent) => {
    e?.preventDefault();
    const name = mapName.trim();
    if (!name) {
      alert('名前を入力してください');
      return;
    }

    const mapData: SavedMap = {
      id: Date.now().toString(),
      name,
      saveDate: new Date().toISOString(),
      scale,
      nodes,
      lastNodeId
    };

    saveMap(mapData);
    setShowSaveDialog(false);
    setMapName('');
    alert(`マインドマップ "${name}" を保存しました`);
  };

  const handleLoadMap = (mapId: string) => {
    const mapData = savedMaps.find(map => map.id === mapId);
    if (!mapData) {
      alert('マップが見つかりません');
      return;
    }

    setNodes(mapData.nodes);
    setScale(mapData.scale);
    setLastNodeId(mapData.lastNodeId);
    setSelectedNodeId(null);
    setShowLoadDialog(false);
    alert(`マインドマップ "${mapData.name}" を読み込みました`);
  };

  return (
    <div className={styles.container}>
      <Toolbar
        onAddNode={() => addNode()}
        onDeleteNode={() => selectedNodeId && deleteNode(selectedNodeId)}
        onClearAll={clearAllNodes}
        onSaveMap={() => setShowSaveDialog(true)}
        onLoadMap={() => setShowLoadDialog(true)}
        nodeColor={nodeColor}
        onNodeColorChange={setNodeColor}
      />

      <MindMapCanvas
        nodes={nodes}
        selectedNodeId={selectedNodeId}
        scale={scale}
        onNodeSelect={setSelectedNodeId}
        onNodeDeselect={() => setSelectedNodeId(null)}
        onNodeMove={moveNode}
        onNodeContentChange={updateNodeContent}
        onAddChildNode={addNode}
        onDeleteNode={deleteNode}
        onChangeNodeColor={changeNodeColor}
        onScaleChange={setScale}
      />

      <NodeEditor
        selectedNode={selectedNode}
        onApplyChanges={updateNode}
      />

      <Modal
        isOpen={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        title="マインドマップを保存"
      >
        <FormGroup>
          <Label htmlFor="map-name">名前:</Label>
          <Input
            id="map-name"
            value={mapName}
            onChange={(e) => setMapName(e.target.value)}
            placeholder="マインドマップの名前"
          />
        </FormGroup>
        <Button onClick={handleSaveMap}>
          保存
        </Button>
      </Modal>

      <Modal
        isOpen={showLoadDialog}
        onClose={() => setShowLoadDialog(false)}
        title="マインドマップを読込"
      >
        <SavedMapsList
          savedMaps={savedMaps}
          onLoadMap={handleLoadMap}
          onDeleteMap={deleteSavedMap}
        />
      </Modal>
    </div>
  );
};