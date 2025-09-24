import { useState, useRef, useEffect } from 'react';
import { MindMapNode as NodeType } from '../../types';
import styles from './MindMapNode.module.css';

interface MindMapNodeProps {
  node: NodeType;
  isSelected: boolean;
  isRoot?: boolean;
  onSelect: (nodeId: string) => void;
  onContextMenu: (event: React.MouseEvent, nodeId: string) => void;
  onDragStart: (nodeId: string, event: React.MouseEvent) => void;
  onContentChange: (nodeId: string, content: string) => void;
}

export const MindMapNode = ({
  node,
  isSelected,
  isRoot = false,
  onSelect,
  onContextMenu,
  onDragStart,
  onContentChange
}: MindMapNodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(node.content);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditContent(node.content);
  }, [node.content]);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onSelect(node.id);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onContextMenu(event, node.id);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (event.button === 0 && !isEditing) {
      onDragStart(node.id, event);
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.focus();
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(contentRef.current);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }, 0);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editContent !== node.content) {
      onContentChange(node.id, editContent);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      setIsEditing(false);
      if (editContent !== node.content) {
        onContentChange(node.id, editContent);
      }
    } else if (event.key === 'Escape') {
      setEditContent(node.content);
      setIsEditing(false);
    }
  };

  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    setEditContent(event.currentTarget.textContent || '');
  };

  const nodeClasses = [
    styles.node,
    isSelected ? styles.selected : '',
    isRoot ? styles.rootNode : ''
  ].filter(Boolean).join(' ');

  return (
    <div
      className={nodeClasses}
      style={{
        left: node.style.left,
        top: node.style.top,
        backgroundColor: node.style.backgroundColor,
        color: node.style.color,
        fontSize: node.style.fontSize
      }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <div
        ref={contentRef}
        className={styles.nodeContent}
        contentEditable={isEditing}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        suppressContentEditableWarning={true}
      >
        {node.content}
      </div>
    </div>
  );
};