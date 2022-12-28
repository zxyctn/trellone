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
  set: workspace.set,
  setList: (list, dropped = false) => {
    workspace.update((lists) => {
      const listIdx = lists.findIndex((l) => l.id === list.id);
      const tmp = lists[listIdx];

      lists[listIdx] = { ...lists[listIdx], ...list };

      if (dropped) {
        tmp.cards.forEach((c) => {
          if ('isDndShadowItem' in c && c.current !== lists[listIdx].title) {
            const cardIdx = lists[listIdx].cards.findIndex(
              (card) => card.id === c.id
            );

            lists[listIdx].cards[cardIdx].comments = [
              {
                message: `Moved this card from ${c.current} to ${lists[listIdx].title}`,
                timestamp: new Date(),
              },
              ...c.comments,
            ];

            lists[listIdx].cards[cardIdx].current = lists[listIdx].title;
          }
        });
      }

      lists[listIdx].cards.forEach((c) => console.log(c.comments));

      return lists;
    });
  },
  addList: (list) => {
    workspace.update((lists) => [...lists, list]);
  },
  removeList: (id) => {
    workspace.update((lists) => lists.filter((l) => l.id !== id));
  },
  addCard: (id, card) => {
    workspace.update((lists) => {
      const listIdx = lists.findIndex((l) => l.id === id);

      lists[listIdx] = {
        ...lists[listIdx],
        cards: [...lists[listIdx].cards, card],
      };

      return lists;
    });
  },
  removeCard: (id, cardId) => {
    workspace.update((lists) => {
      const listIdx = lists.findIndex((l) => l.id === id);

      lists[listIdx] = {
        ...lists[listIdx],
        cards: [...lists[listIdx].cards.filter((card) => card.id !== cardId)],
      };

      return lists;
    });
  },
  editCard: (id, card) => {
    workspace.update((lists) => {
      const listIdx = lists.findIndex((l) => l.id === id);

      const oldCardId = lists[listIdx].cards.findIndex((c) => c.id === card.id);
      const oldCard = {
        ...lists[listIdx].cards[oldCardId],
        ...card,
      };
      lists[listIdx].cards[oldCardId] = oldCard;
      return lists;
    });
  },
  editTitle: (id, title) => {
    workspace.update((lists) => {
      const listIdx = lists.findIndex((l) => l.id === id);
      lists[listIdx] = { ...lists[listIdx], title: title };

      return lists;
    });
  },
};

export default workspaceStore;
