<script lang="ts">
  import { user, type User } from "../stores";
  import io from "socket.io-client";

  let userData: User;
  user.subscribe((val) => (userData = val));

  export let team1: string = "XXX";
  export let score1: number[] = [0, 0];

  export let team2: string = "XXX";
  export let score2: number[] = [0, 0];

  let matchBegun = false;

  let client = io("http://localhost:5000");

  function updateScore() {
    if (matchBegun) {
      const data = {
        ...userData,
        team1,
        team2,
        score1,
        score2,
      };
      client.send(data);
    }
  }
</script>

<div class="w-full xl:w-1/2 m-auto text-center bg-slate-600 text-black p-5">
  <h1 class="uppercase font-bold">
    <input type="text" bind:value={team1} on:input={updateScore} />
    -
    <input type="text" bind:value={team2} on:input={updateScore} />
  </h1>
  <p class="pt-3">
    <sup
      ><input
        type="number"
        bind:value={score1[0]}
        on:input={updateScore}
      /></sup
    >
    <input type="number" bind:value={score1[1]} on:input={updateScore} />
    -
    <input type="number" bind:value={score2[1]} on:input={updateScore} />
    <sup
      ><input
        type="number"
        bind:value={score2[0]}
        on:input={updateScore}
      /></sup
    >
  </p>
</div>

<div
  class="w-full xl:w-1/2 m-auto text-center bg-slate-600 text-white text-6xl xl:text-9xl p-5"
>
  <p class="pt-3">
    <sup
      ><button
        on:click={() => {
          score1[0]++;
          updateScore();
        }}>+</button
      ></sup
    >
    <sup
      ><button
        on:click={() => {
          score1[0]--;
          updateScore();
        }}>-</button
      ></sup
    >
    <button
      on:click={() => {
        score1[1]++;
        updateScore();
      }}>+</button
    >
    <button
      on:click={() => {
        score1[1]--;
        updateScore();
      }}>-</button
    >
    |
    <button
      on:click={() => {
        score2[1]--;
        updateScore();
      }}>-</button
    >
    <button
      on:click={() => {
        score2[1]++;
        updateScore();
      }}>+</button
    >
    <sup
      ><button
        on:click={() => {
          score2[0]--;
          updateScore();
        }}>-</button
      ></sup
    >
    <sup
      ><button
        on:click={() => {
          score2[0]++;
          updateScore();
        }}>+</button
      ></sup
    >
  </p>
</div>
<button
  class="w-full block m-auto p-4 {matchBegun ? 'bg-red-500' : 'bg-green-500'}"
  on:click={() => {
    if (matchBegun) {
      team1 = "XXX";
      score1 = [0, 0];
      team2 = "XXX";
      score2 = [0, 0];
    }
    updateScore();

    matchBegun = matchBegun ? false : true;
  }}
>
  {matchBegun ? "Zakończ mecz" : "Rozpocznij Mecz"}
</button>
