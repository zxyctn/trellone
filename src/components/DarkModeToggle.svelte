<script>
  import { onMount } from 'svelte';
  import { themeChange } from 'theme-change';

  import MoonStarsFill from 'svelte-bootstrap-icons/lib/MoonStarsFill.svelte';
  import SunFill from 'svelte-bootstrap-icons/lib/SunFill.svelte';

  let darkMode = localStorage.theme === 'light';

  onMount(() => {
    themeChange(false);
  });
</script>

<button
  data-toggle-theme="cmyk, dark"
  data-act-class="ACTIVECLASS"
  class="btn btn-ghost"
  on:click={() => (darkMode = !darkMode)}
>
  {#if darkMode}
    <SunFill />
  {:else}
    <MoonStarsFill />
  {/if}
</button>
