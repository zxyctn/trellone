<script>
  import List from './List.svelte';
  import AddList from './AddList.svelte';
  import workspace from '../stores/workspace-store';

  const removeList = (e) => {
    workspace.removeList(e.detail);
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
</script>

<div class="flex py-5 overflow-x-auto">
  {#each $workspace as list (list.id)}
    <List
      {list}
      on:removelist={removeList}
      on:addcard={addCard}
      on:editcard={editCard}
      on:removecard={removeCard}
      on:edittitle={editTitle}
    />
  {/each}
  <AddList on:addlist={addList} />
</div>
