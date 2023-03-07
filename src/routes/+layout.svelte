<script>
  import '../theme.postcss';
  import '@skeletonlabs/skeleton/styles/all.css';
  import '../app.postcss';
  import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->
<AppShell>
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
        <strong class="text-xl uppercase">CSGO Matchbot</strong>
        <a href="/matches" class="btn variant-ringed-surface btn-sm mx-4">Matches</a>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <a
          class="btn btn-sm variant-ghost-surface"
          href="https://discord.gg/EXqV7W8MtY"
          target="_blank"
          rel="noreferrer"
        >
          Login
        </a>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <!-- Page Route Content -->
  <slot />
</AppShell>
