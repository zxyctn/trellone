<script>
  import PencilFill from 'svelte-bootstrap-icons/lib/PencilFill.svelte';
  import JustifyLeft from 'svelte-bootstrap-icons/lib/JustifyLeft.svelte';
  import Check2Square from 'svelte-bootstrap-icons/lib/Check2Square.svelte';

  import CardDetails from './CardDetails.svelte';
  import AddCard from './AddCard.svelte';
  import List from './List.svelte';

  export let listTitle;
  export let listId;
  export let card;

  // export let labels = ['in progress'];
  // export let checklists = [];
  // export let comments;

  let editButtonHidden = true;
  let hideCardDetails = true;

  const setEditButton = (val) => {
    editButtonHidden = val;
  };

  const showCardDetails = () => {
    hideCardDetails = false;
  };
</script>

<div
  class="card bg-base-100 shadow-xl cursor-pointer mb-2"
  on:mouseenter={() => setEditButton(false)}
  on:mouseleave={() => setEditButton(true)}
  on:click={showCardDetails}
  on:keydown={showCardDetails}
>
  <div class="card-body justify-end">
    <div class="flex justify-between items-center">
      <h2 class="card-title">{card.title}</h2>
      <button class:hidden={editButtonHidden === true}>
        <PencilFill />
      </button>
    </div>
    <div class="flex justify-start gap-1">
      {#if card.description.length}
        <JustifyLeft />
      {/if}
      <!-- {#if checklists.length}
        <Check2Square />
      {/if} -->
    </div>
  </div>
</div>

<CardDetails
  bind:hidden={hideCardDetails}
  {listTitle}
  {listId}
  {card}
  on:editcard
  on:removecard
/>
