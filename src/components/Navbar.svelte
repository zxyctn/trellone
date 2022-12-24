<script>
  import DarkModeToggle from './DarkModeToggle.svelte';
</script>

<div class="navbar bg-primary text-primary-content">
  <div class="container mx-auto">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost normal-case text-xl">Trellone</a>
    </div>
    <div class="flex-none">
      <DarkModeToggle />
    </div>
  </div>
</div>
