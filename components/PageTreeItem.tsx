import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemType } from './PageTree';
import styles from './PageTree.module.scss';

interface PageTreeItemProps {
  id: number;
  title: string;
  parent_id: number | null;
  movePage: (draggedId: number, newParentId: number | null) => void;
}

const PageTreeItem: React.FC<PageTreeItemProps> = ({
  id,
  title,
  parent_id,
  movePage,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.PAGE,
    item: { id, parent_id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemType.PAGE,
    drop: (item: { id: number; parent_id: number | null }) => {
      movePage(item.id, id);
    },
  }));

  return (
    <div ref={drop} className={styles.pageTreeItem}>
      <div
        ref={drag}
        className={styles.pageTreeTitle}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        {title}
      </div>
    </div>
  );
};

export default PageTreeItem;
