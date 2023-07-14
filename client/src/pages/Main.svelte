<script lang="ts">
  import { onMount } from "svelte";
  import io from "socket.io-client";
  import { user } from "./../stores";
  import Match from "../components/Match.svelte";

  let fields = [
    { team1: "XXX", team2: "XXX", score1: [0, 0], score2: [0, 0] },
    { team1: "XXX", team2: "XXX", score1: [0, 0], score2: [0, 0] },
    { team1: "XXX", team2: "XXX", score1: [0, 0], score2: [0, 0] },
  ];

  let loginData;

  user.subscribe((val) => (loginData = val));

  onMount(() => {
    let client = io();

    client.on("score_change", (msg) => {
      try {
        const fieldData = msg;
        fields = fieldData;
      } catch (err) {
        console.log(err);
      }
    });
  });
</script>

<main class="w-full min-h-[78vh] md:min-h-[90vh] flex flex-col">
  {#each fields as field}
    <Match {...field} />
  {/each}
</main>
