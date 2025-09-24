export interface MindMapNode {
  id: string;
  parentId: string | null;
  content: string;
  style: {
    left: string;
    top: string;
    backgroundColor: string;
    color: string;
    fontSize: string;
  };
}

export interface SavedMap {
  id: string;
  name: string;
  saveDate: string;
  scale: number;
  nodes: MindMapNode[];
  lastNodeId: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface DragState {
  isDragging: boolean;
  draggedNode: string | null;
  offset: Position;
}

export interface AppState {
  selectedNode: string | null;
  scale: number;
  lastNodeId: number;
  dragState: DragState;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface ContextMenuPosition {
  x: number;
  y: number;
  visible: boolean;
}