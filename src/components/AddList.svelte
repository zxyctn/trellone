<script>
  import PlusLg from 'svelte-bootstrap-icons/lib/PlusLg.svelte';

  import AddListForm from './AddListForm.svelte';

  let showForm = false;

  const handleOutsideClick = () => {
    showForm = false;
  };
</script>

{#if !showForm}
  <button
    class="w-72 btn btn-outline btn-block"
    on:click={() => (showForm = true)}
  >
    <PlusLg />
    <p class="ml-2">Add another list</p>
  </button>
{:else}
  <AddListForm
    on:click_outside={handleOutsideClick}
    on:click={handleOutsideClick}
  />
{/if}
