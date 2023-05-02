import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PageTree from '../components/PageTree';

const initialPages = [
  { id: 1, title: 'Home', parent_id: null },
  { id: 2, title: 'About Us', parent_id: 1 },
  { id: 3, title: 'Contacts', parent_id: 1 },
  { id: 4, title: 'Phones', parent_id: 3 },
  { id: 5, title: 'Phones1', parent_id: 3 },
  { id: 6, title: 'Phones2', parent_id: 5 },
  { id: 7, title: 'Phones3', parent_id: 5 },
  { id: 8, title: 'Phones4', parent_id: 7 },
  { id: 9, title: 'Phones5', parent_id: 7 },
  { id: 10, title: 'Phones6', parent_id: 9 },
  { id: 11, title: 'Phones7', parent_id: 10 },
];

export default function Home() {
  const [pages, setPages] = useState(initialPages);

  const movePage = (draggedId: number, newParentId: number | null) => {
    if (draggedId === newParentId) {
      return;
    }

    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === draggedId ? { ...page, parent_id: newParentId } : page
      )
    );
  };

  return (
    <div>
      <h1>Nested Page Tree</h1>
      <DndProvider backend={HTML5Backend}>
        <PageTree pages={pages} movePage={movePage} />
      </DndProvider>
    </div>
  );
}
