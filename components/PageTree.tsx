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

interface PageTreeNodesProps {
  pages: Page[];
  parent_id: number | null;
  movePage: (draggedId: number, newParentId: number | null) => void;
}

const PageTreeNodes: React.FC<PageTreeNodesProps> = ({
  pages,
  parent_id,
  movePage,
}) => {
  const renderNode = (page: Page) => (
    <div key={page.id} className={styles.pageTreeNode}>
      <PageTreeItem
        id={page.id}
        title={page.title}
        parent_id={page.parent_id}
        movePage={movePage}
      />
      <div className={styles.pageTreeChildren}>
        <PageTreeNodes pages={pages} parent_id={page.id} movePage={movePage} />
      </div>
    </div>
  );

  return (
    <>{pages.filter((page) => page.parent_id === parent_id).map(renderNode)}</>
  );
};

const PageTree: React.FC<PageTreeProps> = ({ pages, movePage }) => {
  return (
    <div className={styles.pageTree}>
      <PageTreeNodes pages={pages} parent_id={null} movePage={movePage} />
    </div>
  );
};

export default PageTree;
