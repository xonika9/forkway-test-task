import React from 'react';
import PageTreeItem from './PageTreeItem';
import styles from './PageTree.module.scss';

export const ItemType = {
  PAGE: 'page',
};

interface Page {
  id: number;
  title: string;
  parent_id: number | null;
}

interface PageTreeProps {
  pages: Page[];
  movePage: (draggedId: number, newParentId: number | null) => void;
}

const renderPages = (
  pages: Page[],
  parent_id: number | null,
  movePage: (draggedId: number, newParentId: number | null) => void
) => {
  return pages
    .filter((page) => page.parent_id === parent_id)
    .map((page) => (
      <div key={page.id} className={styles.pageTreeNode}>
        <PageTreeItem
          id={page.id}
          title={page.title}
          parent_id={page.parent_id}
          movePage={movePage}
        />
        <div className={styles.pageTreeChildren}>
          {renderPages(pages, page.id, movePage)}
        </div>
      </div>
    ));
};

const PageTree: React.FC<PageTreeProps> = ({ pages, movePage }) => {
  return (
    <div className={styles.pageTree}>{renderPages(pages, null, movePage)}</div>
  );
};

export default PageTree;
