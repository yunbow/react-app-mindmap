import { useRef, useEffect, useState } from 'react';
import { MindMapNode as NodeType, Position, ContextMenuPosition } from '../../types';
import { MindMapNode } from '../MindMapNode';
import { ContextMenu } from '../ContextMenu';
import styles from './MindMapCanvas.module.css';

interface Connection {
  parentId: string;
  childId: string;
}

interface MindMapCanvasProps {
  nodes: NodeType[];
  selectedNodeId: string | null;
  scale: number;
  onNodeSelect: (nodeId: string) => void;
  onNodeDeselect: () => void;
  onNodeMove: (nodeId: string, position: Position) => void;
  onNodeContentChange: (nodeId: string, content: string) => void;
  onAddChildNode: (parentNodeId: string) => void;
  onDeleteNode: (nodeId: string) => void;
  onChangeNodeColor: (nodeId: string) => void;
  onScaleChange: (scale: number) => void;
}

export const MindMapCanvas = ({
  nodes,
  selectedNodeId,
  scale,
  onNodeSelect,
  onNodeDeselect,
  onNodeMove,
  onNodeContentChange,
  onAddChildNode,
  onDeleteNode,
  onChangeNodeColor,
  onScaleChange
}: MindMapCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [contextMenu, setContextMenu] = useState<ContextMenuPosition>({
    x: 0,
    y: 0,
    visible: false
  });
  const [contextNodeId, setContextNodeId] = useState<string | null>(null);

  const connections: Connection[] = nodes
    .filter(node => node.parentId)
    .map(node => ({
      parentId: node.parentId!,
      childId: node.id
    }));

  const handleCanvasClick = (event: React.MouseEvent) => {
    if (event.target === canvasRef.current) {
      onNodeDeselect();
      setContextMenu({ x: 0, y: 0, visible: false });
    }
  };

  const handleWheel = (event: React.WheelEvent) => {
    if (event.ctrlKey) {
      event.preventDefault();
      const delta = event.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(0.3, Math.min(3, scale * delta));
      onScaleChange(newScale);
    }
  };

  const handleNodeDragStart = (nodeId: string, event: React.MouseEvent) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node || !canvasRef.current) return;

    setIsDragging(true);
    setDraggedNodeId(nodeId);

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const nodeLeft = parseFloat(node.style.left);
    const nodeTop = parseFloat(node.style.top);

    setDragOffset({
      x: event.clientX - canvasRect.left - (nodeLeft * scale),
      y: event.clientY - canvasRect.top - (nodeTop * scale)
    });

    onNodeSelect(nodeId);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging && draggedNodeId && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const left = (event.clientX - canvasRect.left - dragOffset.x) / scale;
      const top = (event.clientY - canvasRect.top - dragOffset.y) / scale;

      onNodeMove(draggedNodeId, { x: left, y: top });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setDraggedNodeId(null);
    }
  };

  const handleNodeContextMenu = (event: React.MouseEvent, nodeId: string) => {
    event.preventDefault();
    onNodeSelect(nodeId);
    setContextNodeId(nodeId);
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      visible: true
    });
  };

  const handleContextMenuClose = () => {
    setContextMenu({ x: 0, y: 0, visible: false });
    setContextNodeId(null);
  };

  const handleAddChild = () => {
    if (contextNodeId) {
      onAddChildNode(contextNodeId);
    }
    handleContextMenuClose();
  };

  const handleEditNode = () => {
    handleContextMenuClose();
  };

  const handleDeleteSelected = () => {
    if (contextNodeId && contextNodeId !== 'root') {
      onDeleteNode(contextNodeId);
    }
    handleContextMenuClose();
  };

  const handleChangeColor = () => {
    if (contextNodeId) {
      onChangeNodeColor(contextNodeId);
    }
    handleContextMenuClose();
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setDraggedNodeId(null);
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging]);

  return (
    <div className={styles.canvasContainer}>
      <div
        ref={canvasRef}
        className={styles.canvas}
        onClick={handleCanvasClick}
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        {connections.map((connection) => {
          const parent = nodes.find(n => n.id === connection.parentId);
          const child = nodes.find(n => n.id === connection.childId);

          if (!parent || !child) return null;

          const parentX = parseFloat(parent.style.left) + 100;
          const parentY = parseFloat(parent.style.top) + 25;
          const childX = parseFloat(child.style.left) + 100;
          const childY = parseFloat(child.style.top) + 25;

          const length = Math.sqrt(Math.pow(childX - parentX, 2) + Math.pow(childY - parentY, 2));
          const angle = Math.atan2(childY - parentY, childX - parentX) * (180 / Math.PI);

          return (
            <div
              key={`${connection.parentId}-${connection.childId}`}
              className={styles.connection}
              style={{
                width: `${length}px`,
                left: `${parentX}px`,
                top: `${parentY}px`,
                transform: `rotate(${angle}deg)`
              }}
            />
          );
        })}

        {nodes.map((node) => (
          <MindMapNode
            key={node.id}
            node={node}
            isSelected={selectedNodeId === node.id}
            isRoot={node.id === 'root'}
            onSelect={onNodeSelect}
            onContextMenu={handleNodeContextMenu}
            onDragStart={handleNodeDragStart}
            onContentChange={onNodeContentChange}
          />
        ))}
      </div>

      <ContextMenu
        position={contextMenu}
        onAddChild={handleAddChild}
        onEditNode={handleEditNode}
        onDeleteSelected={handleDeleteSelected}
        onChangeColor={handleChangeColor}
        onClose={handleContextMenuClose}
      />
    </div>
  );
};