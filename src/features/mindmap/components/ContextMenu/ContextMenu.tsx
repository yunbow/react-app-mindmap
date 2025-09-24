import { useEffect, useRef } from 'react';
import { ContextMenuPosition } from '../../types';
import styles from './ContextMenu.module.css';

interface ContextMenuProps {
  position: ContextMenuPosition;
  onAddChild: () => void;
  onEditNode: () => void;
  onDeleteSelected: () => void;
  onChangeColor: () => void;
  onClose: () => void;
}

export const ContextMenu = ({
  position,
  onAddChild,
  onEditNode,
  onDeleteSelected,
  onChangeColor,
  onClose
}: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (position.visible) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [position.visible, onClose]);

  useEffect(() => {
    if (position.visible && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let left = position.x;
      let top = position.y;

      if (rect.right > windowWidth) {
        left = windowWidth - rect.width;
      }

      if (rect.bottom > windowHeight) {
        top = windowHeight - rect.height;
      }

      menuRef.current.style.left = left + 'px';
      menuRef.current.style.top = top + 'px';
    }
  }, [position]);

  if (!position.visible) {
    return null;
  }

  return (
    <div
      ref={menuRef}
      className={styles.contextMenu}
      style={{
        left: position.x,
        top: position.y
      }}
    >
      <ul>
        <li onClick={onAddChild}>子ノード追加</li>
        <li onClick={onEditNode}>編集</li>
        <li onClick={onDeleteSelected}>削除</li>
        <li onClick={onChangeColor}>色変更</li>
      </ul>
    </div>
  );
};