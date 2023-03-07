<script lang="ts">
  import type { Match, Score } from '$lib/model/match';
  import Fa from 'svelte-fa';
  import { faDownload, faTelevision } from '@fortawesome/free-solid-svg-icons';

  export let match: Match;
  const seriesScore = (scores: Score[]) => {
    if (scores.length > 1) {
      scores = scores
        .filter((s) => !(s.team_one_score === 0 && s.team_two_score === 0))
        .filter((s, i) => match.maps_info[i].completed);
      const team_one_score = scores.reduce(
        (prev, current) => (prev += current.team_one_score > current.team_two_score ? 1 : 0),
        0,
      );
      const team_two_score = scores.reduce(
        (prev, current) => (prev += current.team_one_score < current.team_two_score ? 1 : 0),
        0,
      );
      return { team_one_score, team_two_score };
    }
    return { team_one_score: scores[0].team_one_score, team_two_score: scores[0].team_two_score };
  };
  const demoBaseUrl = import.meta.env.VITE_S3_BASEURL;
  const lastPlayedMapIndex = match.maps_info.findIndex((m) => m.completed) + 1;
</script>

<div class="card m-4 match-card">
  <header class="card-header p-4">
    <div class="grid score-grid">
      <div class="text-right">
        {match.id}
        {match.team_one.name}
      </div>
      <div class="text-center font-bold">
        <span class="text-gray-400">
          {seriesScore(match.scores).team_one_score}
        </span>
        <span class="text-gray-400">-</span>
        <span class="text-blue-500">
          {seriesScore(match.scores).team_two_score}
        </span>
      </div>
      <div class="text-left">
        {match.team_two.name}
      </div>
    </div>
  </header>
  <div class="flex flex-col">
    {#each match.maps_info as info, i}
      <div
        class="w-full h-16 bg-no-repeat flex items-center justify-center"
        style="background-image: url({`/maps/${info.map}.jpg`}); background-size: cover; background-position: 50%"
      >
        <div class="w-full grid img-grid items-center">
          <span
            class={`badge variant-filled-surface ml-4 h-6 flex flex-row ${
              match.scores[i].team_one_score === 0 &&
              match.scores[i].team_two_score === 0 &&
              info.completed
                ? 'line-through'
                : ''
            }`}
            style="width: fit-content;"
          >
            {info.map}
          </span>
          {#if match.scores.length > 1 && !(match.scores[i].team_one_score === 0 && match.scores[i].team_two_score === 0)}
            <div class="badge bg-surface-700 text-center h-6" style="width: fit-content;">
              <div class="font-bold">
                <span class="text-gray-400">
                  {match.scores[i].team_one_score}
                </span>
                <span class="text-gray-400">-</span>
                <span class="text-blue-500">
                  {match.scores[i].team_two_score}
                </span>
              </div>
            </div>
          {:else}
            <div />
          {/if}
          {#if match.completed_at && !(match.scores[i].team_one_score === 0 && match.scores[i].team_two_score === 0)}
            <div class="flex justify-end">
              <a
                target="_blank"
                rel="noreferrer"
                href={match.scores.length > 1
                  ? `${demoBaseUrl}/${match.dathost_match}_${i + 1}.dem`
                  : `${demoBaseUrl}/${match.dathost_match}.dem`}
                class="btn btn-sm bg-surface-500 mr-4"
              >
                <span><Fa icon={faDownload} /></span>
                <span>Demo</span>
              </a>
            </div>
          {:else if match.server && !info.completed && i === lastPlayedMapIndex}
            <div class="flex justify-end">
              <div class="relative inline-block">
                <span class="badge absolute text-red-500 -top-2 -left-2 z-10 blob" />
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`steam://connect/${match.server.hostname}:${match.server.gotv_port}`}
                  class="btn btn-sm bg-surface-500 mr-4"
                >
                  <span><Fa icon={faTelevision} /></span>
                  <span>GOTV</span>
                </a>
              </div>
            </div>
          {:else}
            <div />
          {/if}
        </div>
      </div>
    {/each}
  </div>
  <div class="card-footer" />
</div>

<style>
  .match-card {
    height: fit-content;
    width: 500px;
  }
  .score-grid {
    grid-template-columns: 1fr 0.5fr 1fr;
  }
  .img-grid {
    grid-template-columns: 1.25fr 0.5fr 1fr;
  }
  .blob {
    box-shadow: 0 0 0 0 rgb(255, 0, 0);
    animation: pulse 2s infinite;
    transform: scale(0.8);
    border-radius: 50%;
    background: red;
    margin: 5px;
    height: 16px;
    width: 14px;
  }
  @keyframes pulse {
    0% {
      transform: scale(0.75);
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
    }

    70% {
      transform: scale(0.8);
      box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
    }

    100% {
      transform: scale(0.75);
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
    }
  }
</style>
