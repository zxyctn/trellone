<script>
  import PlusLg from 'svelte-bootstrap-icons/lib/PlusLg.svelte';

  let showForm = false;

  const toggleShowForm = () => {
    showForm = !showForm;
  };
</script>

{#if !showForm}
  <button class="btn btn-ghost btn-block" on:click={toggleShowForm}>
    <PlusLg />
    <div class="ml-2">Add card</div>
  </button>
{:else}
  <form on:submit|preventDefault>
    <textarea
      class="textarea textarea-bordered textarea-ghost w-full mb-1"
      placeholder="To do..."
    />
    <div class="inline-block">
      <button class="btn btn-primary">Add card</button>
      <button class="btn btn-warning" on:click={toggleShowForm}>Cancel</button>
    </div>
  </form>
{/if}
