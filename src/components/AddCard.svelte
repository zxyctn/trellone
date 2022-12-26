<script>
  import { createEventDispatcher } from 'svelte';

  import PlusLg from 'svelte-bootstrap-icons/lib/PlusLg.svelte';

  import { focus, clickOutside } from '../helpers/element';

  export let listId;

  const dispatch = createEventDispatcher();

  let showForm = false;
  let title;

  const toggleShowForm = () => {
    showForm = !showForm;
    title = '';
  };

  const handleAddCard = () => {
    dispatch('addcard', {
      id: listId,
      card: {
        id: +new Date(),
        title: title,
        description: '',
      },
    });

    showForm = false;
    title = '';
  };
</script>

{#if !showForm}
  <button class="btn btn-ghost btn-block" on:click={toggleShowForm}>
    <PlusLg />
    <div class="ml-2">Add card</div>
  </button>
{:else}
  <form
    on:submit|preventDefault
    use:clickOutside
    on:click_outside={() => (showForm = false)}
  >
    <textarea
      class="textarea textarea-bordered textarea-ghost w-full mb-1"
      placeholder="To do..."
      use:focus
      bind:value={title}
    />
    <div class="inline-block">
      <button class="btn btn-primary" on:click={handleAddCard}>Add</button>
      <button class="btn btn-warning" on:click={toggleShowForm}>Cancel</button>
    </div>
  </form>
{/if}
