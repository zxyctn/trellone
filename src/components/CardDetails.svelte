<script>
  import { createEventDispatcher } from 'svelte';

  import Time from 'svelte-time';
  import ViewList from 'svelte-bootstrap-icons/lib/ViewList.svelte';
  import JustifyLeft from 'svelte-bootstrap-icons/lib/JustifyLeft.svelte';
  import ListUl from 'svelte-bootstrap-icons/lib/ListUl.svelte';
  import XLg from 'svelte-bootstrap-icons/lib/XLg.svelte';

  import Confirm from './Confirm.svelte';
  import { clickOutside, focus } from '../helpers/element';

  export let hidden = true;
  export let listTitle;
  export let listId;
  export let card;

  const dispatch = createEventDispatcher();

  let title = card.title;
  let description = card.description;

  let showTitleChangeForm = false;
  let hideConfirm = true;

  const toggleTitleChangeForm = () => {
    showTitleChangeForm = !showTitleChangeForm;
  };

  const hide = () => {
    if (hideConfirm) {
      title = card.title;
      description = card.description;
      hidden = true;
    }
  };

  const handleSave = () => {
    dispatch('editcard', {
      id: listId,
      card: {
        ...card,
        title,
        description,
      },
    });

    hide();
  };

  const handleDelete = () => {
    dispatch('removecard', {
      id: listId,
      cardId: card.id,
    });

    hide();
  };
</script>

<div class="modal" class:modal-open={!hidden}>
  <div class="modal-box bg-base-100" use:clickOutside on:click_outside={hide}>
    <div class="absolute top-5 right-5">
      <button class="btn btn-xs btn-circle btn-ghost" on:click={hide}>
        <XLg />
      </button>
    </div>

    <div class="flex h-7 items-center">
      <div class="w-6"><ViewList /></div>
      {#if !showTitleChangeForm}
        <h1
          class="font-bold text-xl"
          on:click={toggleTitleChangeForm}
          on:keydown={toggleTitleChangeForm}
        >
          {title}
        </h1>
      {:else}
        <input
          type="text"
          class="input input-bordered input-ghost w-full max-w-xs font-bold text-xl h-7 p-0 m-0 "
          bind:value={title}
          use:clickOutside
          use:focus
          on:click_outside={() => (showTitleChangeForm = false)}
        />
      {/if}
    </div>

    <div class="flex h-4">
      <h5 class="ml-6 text-xs">
        in list {listTitle}
      </h5>
    </div>

    <br />

    <div class="flex h-8 items-center">
      <div class="w-6"><JustifyLeft /></div>
      <h2 class="font-semibold">Description</h2>
    </div>

    <div class="mx-6">
      <textarea
        class="textarea textarea-bordered w-full h-56"
        bind:value={description}
      />
    </div>

    <br />

    <div class="flex h-8 items-center">
      <div class="w-6"><ListUl /></div>
      <h2 class="font-semibold">Activity</h2>
    </div>

    <div class="mb-6">
      {#each card.comments as comment (comment)}
        <div class="flex mb-2 mx-6">
          <div>
            <p class="text-xs text-regular">{comment.message}</p>
            <p class="text-xs text-gray-400">
              <Time timestamp={comment.timestamp} live relative />
            </p>
          </div>
        </div>
      {/each}
    </div>

    <div class="modal-action justify-between mt-2 mx-6">
      <div>
        <button class="btn btn-sm btn-primary" on:click={handleSave}
          >Save</button
        >
        <button class="btn btn-sm btn-ghost" on:click={hide}>Cancel</button>
      </div>

      <button
        class="btn btn-sm btn-error text-right"
        on:click={() => (hideConfirm = false)}>Delete</button
      >
    </div>
  </div>
</div>

<Confirm bind:hidden={hideConfirm} on:click={handleDelete}
  >Are you sure about deleting this card?</Confirm
>
