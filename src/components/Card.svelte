<script>
  import PencilFill from 'svelte-bootstrap-icons/lib/PencilFill.svelte';
  import JustifyLeft from 'svelte-bootstrap-icons/lib/JustifyLeft.svelte';
  import Check2Square from 'svelte-bootstrap-icons/lib/Check2Square.svelte';

  import CardDetails from './CardDetails.svelte';
  import AddCard from './AddCard.svelte';

  export let title = 'Test';
  export let labels = ['in progress'];
  export let description = 'testing';
  export let checklists = [];
  // export let comments;

  let editButtonHidden = true;
  let showCardDetails = true;

  const setEditButton = (val) => {
    editButtonHidden = val;
  };

  const setShowCardDetails = (val) => {
    showCardDetails = val;
  };
</script>

<div
  class="card bg-base-100 shadow-xl"
  on:mouseenter={() => setEditButton(false)}
  on:mouseleave={() => setEditButton(true)}
  on:click={() => setShowCardDetails(true)}
  on:keydown={() => setShowCardDetails(true)}
>
  <div class="card-body justify-end">
    <div class="flex justify-between items-center">
      <h2 class="card-title">{title}</h2>
      <button class:hidden={editButtonHidden === true}>
        <PencilFill />
      </button>
    </div>
    <div class="flex justify-start gap-1">
      {#if description.length}
        <JustifyLeft />
      {/if}
      {#if checklists.length}
        <Check2Square />
      {/if}
    </div>
  </div>
</div>

{#if showCardDetails}
  <CardDetails />
{:else}
  <div />
{/if}
