<script lang="ts">
  export let team1: string;
  export let score1: number[];

  export let team2: string;
  export let score2: number[];
</script>

<div class="md:w-1/2 m-auto text-center rounded-xl bg-slate-600 text-white p-5">
  <h1 class="text-4xl sm:text-7xl uppercase font-bold">{team1} - {team2}</h1>
  <p class="text-6xl sm:text-9xl pt-3">
    <sup>{score1[0]}</sup>
    {score1[1] > 9 ? score1[1] : "0" + score1[1]}
    -
    {score2[1] > 9 ? score2[1] : "0" + score2[1]}
    <sup>{score2[0]}</sup>
  </p>
</div>
