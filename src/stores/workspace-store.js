import { writable } from 'svelte/store';

const workspace = writable([
  {
    id: 1,
    title: 'To Do',
    cards: [],
  },
  {
    id: 2,
    title: 'Doing',
    cards: [],
  },
  {
    id: 3,
    title: 'Done',
    cards: [],
  },
]);

const workspaceStore = {
  subscribe: workspace.subscribe,
  addList: (list) => {
    workspace.update((lists) => [...lists, list]);
  },
  removeList: (id) => {
    workspace.update((lists) => lists.filter((l) => l.id !== id));
  },
  addCard: (id, card) => {
    workspace.update((lists) => {
      const listId = lists.findIndex((l) => l.id === id);

      lists[listId] = {
        ...lists[listId],
        cards: [...lists[listId].cards, card],
      };

      return lists;
    });
  },
  removeCard: (id, cardId) => {
    workspace.update((lists) => {
      const listId = lists.findIndex((l) => l.id === id);

      lists[listId] = {
        ...lists[listId],
        cards: [...lists[listId].cards.filter((card) => card.id !== cardId)],
      };

      return lists;
    });
  },
  editCard: (id, card) => {
    workspace.update((lists) => {
      const listId = lists.findIndex((l) => l.id === id);

      const oldCardId = lists[listId].cards.findIndex((c) => c.id === card.id);
      const oldCard = {
        ...lists[listId].cards[oldCardId],
        ...card,
      };
      lists[listId].cards[oldCardId] = oldCard;
      return lists;
    });
  },
  editTitle: (id, title) => {
    workspace.update((lists) => {
      const listId = lists.findIndex((l) => l.id === id);
      lists[listId] = { ...lists[listId], title: title };

      return lists;
    });
  },
};

export default workspaceStore;
