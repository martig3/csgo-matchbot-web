<script lang="ts">
  import type { Match } from '$lib/model/match';
  import type { PageData } from './$types';
  export let data: PageData;
  import MatchCard from '../../lib/components/match-card.svelte';
  const completed: Match[] = data.matches.completed;
  const inprogress: Match[] = data.matches.in_progress;
</script>

<h2 class="m-4 border-b-2 border-surface-500">In Progress</h2>
{#each inprogress as match}
  <MatchCard {match} />
{/each}
<h2 class="m-4 border-b-2 border-surface-500">Completed</h2>
{#each completed as match}
  <MatchCard {match} />
{/each}
