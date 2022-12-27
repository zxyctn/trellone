<script>
  import { createEventDispatcher } from 'svelte';
  import { flip } from 'svelte/animate';

  import { dndzone } from 'svelte-dnd-action';
  import XLg from 'svelte-bootstrap-icons/lib/XLg.svelte';

  import Card from './Card.svelte';
  import Confirm from './Confirm.svelte';
  import AddCard from './AddCard.svelte';
  import { clickOutside, focus } from '../helpers/element';

  export let list;
  export let onDrop;

  const dispatch = createEventDispatcher();
  const flipDurationMs = 150;

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

  const handleDndConsiderCards = (e) => {
    dispatch('setlist', { id: list.id, cards: e.detail.items });
  };

  const handleDndFinalizeCards = (e) => {
    onDrop(e.detail.items);
  };
</script>

<div
  class="card bg-base-200 text-primary-content mr-5"
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
    <div
      use:dndzone={{
        items: list.cards,
        flipDurationMs,
        zoneTabIndex: -1,
        dropTargetStyle: {
          outline: '',
          transition: 'padding-bottom 300ms',
        },
        dropTargetClasses: ['pb-8'],
      }}
      on:consider={handleDndConsiderCards}
      on:finalize={handleDndFinalizeCards}
    >
      {#each list.cards as card (card.id)}
        <div animate:flip={{ duration: flipDurationMs }}>
          <Card
            listTitle={list.title}
            listId={list.id}
            {card}
            on:editcard
            on:removecard
          />
        </div>
      {/each}
    </div>
    <div class="card-actions">
      <AddCard listId={list.id} on:addcard />
    </div>
  </div>
</div>

<Confirm bind:hidden on:click={handleDeleteList}>
  Are you sure about deleting the list "{list.title}"?
</Confirm>
