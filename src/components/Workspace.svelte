<script>
  import List from './List.svelte';
  import AddList from './AddList.svelte';

  let lists = [
    {
      title: 'To Do',
      cards: [],
    },
    {
      title: 'Doing',
      cards: [],
    },
    {
      title: 'Done',
      cards: [],
    },
  ];
</script>

<div class="flex py-5 overflow-x-auto">
  <!-- TODO: Lists should be coming from list store and produced within each block -->
  {#each lists as list (list.title)}
    <List title={list.title} cards={list.cards} />
  {/each}
  <AddList />
</div>

<style>
</style>
