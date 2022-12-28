<script>
  import { flip } from 'svelte/animate';

  import { dndzone } from 'svelte-dnd-action';

  import List from './List.svelte';
  import AddList from './AddList.svelte';
  import workspace from '../stores/workspace-store';

  const flipDurationMs = 300;

  const removeList = (e) => {
    workspace.removeList(e.detail);
  };

  const setList = (e) => {
    workspace.setList(e.detail);
  };

  const addList = (e) => {
    workspace.addList(e.detail);
  };

  const addCard = (e) => {
    workspace.addCard(e.detail.id, e.detail.card);
  };

  const editCard = (e) => {
    workspace.editCard(e.detail.id, e.detail.card);
  };

  const removeCard = (e) => {
    workspace.removeCard(e.detail.id, e.detail.cardId);
  };

  const editTitle = (e) => {
    workspace.editTitle(e.detail.id, e.detail.title);
  };

  const handleDndConsiderLists = (e) => {
    workspace.set(e.detail.items);
  };

  const handleDndFinalizeLists = (e) => {
    workspace.set(e.detail.items);
  };

  const handleListFinalize = (list) => {
    workspace.setList(list, true);
  };
</script>

<div
  class="flex py-5 overflow-x-auto"
  use:dndzone={{
    items: $workspace,
    flipDurationMs,
    type: 'column',
    dropTargetStyle: {
      outline: '',
    },
  }}
  on:consider={handleDndConsiderLists}
  on:finalize={handleDndFinalizeLists}
>
  {#each $workspace as list (list.id)}
    <div animate:flip={{ duration: flipDurationMs }}>
      <List
        {list}
        on:removelist={removeList}
        on:addcard={addCard}
        on:editcard={editCard}
        on:removecard={removeCard}
        on:edittitle={editTitle}
        on:setlist={setList}
        onDrop={(data) => handleListFinalize({ id: list.id, cards: data })}
      />
    </div>
  {/each}

  <AddList on:addlist={addList} />
</div>
