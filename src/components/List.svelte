<script>
  import { createEventDispatcher } from 'svelte';

  import XLg from 'svelte-bootstrap-icons/lib/XLg.svelte';

  import Card from './Card.svelte';
  import Confirm from './Confirm.svelte';
  import AddCard from './AddCard.svelte';
  import { clickOutside, focus } from '../helpers/element';

  export let list;

  const dispatch = createEventDispatcher();

  let hidden = true;
  let showTitleChangeForm = false;
  let showDelete = false;
  let title = list.title;

  const toggleTitleChangeForm = () => {
    showTitleChangeForm = !showTitleChangeForm;
  };

  const handleDeleteList = () => {
    dispatch('removelist', list.id);
  };

  const handleEditTitle = () => {
    dispatch('edittitle', { id: list.id, title });
    showTitleChangeForm = false;
  };
</script>

<div
  class="h-min card bg-base-200 text-primary-content mr-5"
  on:mouseenter={() => (showDelete = true)}
  on:mouseleave={() => (showDelete = false)}
>
  {#if showDelete}
    <div class="absolute top-2 right-2">
      <button
        class="btn btn-xs btn-circle btn-ghost"
        on:click={() => (hidden = false)}
      >
        <XLg />
      </button>
    </div>
  {/if}

  <div class="card-body w-72 p-5">
    {#if showTitleChangeForm}
      <form>
        <input
          type="text"
          class="input input-bordered input-ghost w-full max-w-xs card-title"
          bind:value={title}
          use:clickOutside
          use:focus
          on:click_outside={handleEditTitle}
        />
      </form>
    {:else}
      <h2
        class="card-title"
        on:click={toggleTitleChangeForm}
        on:keydown={toggleTitleChangeForm}
      >
        {list.title}
      </h2>
    {/if}
    <div id="cards">
      {#each list.cards as card (card.id)}
        <Card
          listTitle={list.title}
          listId={list.id}
          {card}
          on:editcard
          on:removecard
        />
      {/each}
    </div>
    <div class="card-actions"><AddCard listId={list.id} on:addcard /></div>
  </div>
</div>

<Confirm bind:hidden on:click={handleDeleteList}>
  Are you sure about deleting the list "{list.title}"?
</Confirm>
