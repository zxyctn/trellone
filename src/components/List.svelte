<script>
  import Card from './Card.svelte';
  import AddCard from './AddCard.svelte';
  import { clickOutside, focus } from '../helpers/element';

  export let title;
  export let cards;

  let showTitleChangeForm = false;

  const toggleTitleChangeForm = () => {
    showTitleChangeForm = !showTitleChangeForm;
  };
</script>

<div class="h-min  card bg-base-200 text-primary-content mr-5">
  <div class="card-body w-72">
    {#if showTitleChangeForm}
      <form>
        <input
          type="text"
          class="input input-bordered input-ghost w-full max-w-xs card-title"
          bind:value={title}
          use:clickOutside
          use:focus
          on:click_outside={() => (showTitleChangeForm = false)}
        />
      </form>
    {:else}
      <h2
        class="card-title"
        on:click={toggleTitleChangeForm}
        on:keydown={toggleTitleChangeForm}
      >
        {title}
      </h2>
    {/if}
    <div id="cards">
      <Card list={title} />
    </div>
    <div class="card-actions"><AddCard /></div>
  </div>
</div>
