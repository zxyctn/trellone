<script>
  import { createEventDispatcher } from 'svelte';

  import XLg from 'svelte-bootstrap-icons/lib/XLg.svelte';

  import { clickOutside, focus } from '../helpers/element';

  const dispatch = createEventDispatcher();

  let title;

  const addList = () => {
    dispatch('addlist', {
      id: +new Date(),
      title: title,
      cards: [],
    });

    dispatch('click_outside');
  };
</script>

<form on:submit|preventDefault>
  <div class="card w-72 bg-base-200" use:clickOutside on:click_outside>
    <div class="card-body p-2">
      <input
        type="text"
        class="w-full input input-bordered input-ghost w-full max-w-xs"
        bind:value={title}
        use:focus
      />
      <div class="card-actions">
        <button class="btn btn-primary" on:click={addList}>Add list</button>
        <button class="btn btn-ghost" on:click><XLg /></button>
      </div>
    </div>
  </div>
</form>
