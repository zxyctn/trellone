<script>
  import ViewList from 'svelte-bootstrap-icons/lib/ViewList.svelte';
  import JustifyLeft from 'svelte-bootstrap-icons/lib/JustifyLeft.svelte';
  import XLg from 'svelte-bootstrap-icons/lib/XLg.svelte';

  import { clickOutside } from '../helpers/clickOutside';

  export let hidden = true;
  export let title;
  export let list;

  let showTitleChangeForm = false;

  const toggleTitleChangeForm = () => {
    showTitleChangeForm = !showTitleChangeForm;
  };

  const handleOutsideClick = () => {
    showTitleChangeForm = false;
  };

  const handleOutsideClickModal = () => {
    hidden = true;
  };
</script>

<div class="modal" class:modal-open={!hidden}>
  <div
    class="modal-box bg-base-100"
    use:clickOutside
    on:click_outside={handleOutsideClickModal}
  >
    <div class="absolute top-5 right-5">
      <button
        class="btn btn-xs btn-circle btn-ghost"
        on:click={() => (hidden = true)}
      >
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
          class="input input-bordered input-ghost w-full max-w-xs font-bold text-xl h-7 p-0 m-0"
          bind:value={title}
          use:clickOutside
          on:click_outside={handleOutsideClick}
        />
      {/if}
    </div>

    <div class="flex h-4">
      <h5 class="ml-6 text-xs">
        in list {list}
      </h5>
    </div>

    <br />

    <div class="flex h-8 items-center">
      <div class="w-6"><JustifyLeft /></div>
      <h2 class="font-semibold">Description</h2>
    </div>

    <div class="mx-6">
      <textarea class="textarea textarea-bordered w-full" />
    </div>

    <div class="modal-action justify-start mt-2">
      <button class="btn btn-sm btn-primary ml-6">Save</button>
      <button class="btn btn-sm btn-ghost ml-6" on:click={() => (hidden = true)}
        >Cancel</button
      >
    </div>
  </div>
</div>
