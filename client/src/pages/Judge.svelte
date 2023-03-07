<script lang="ts">
  import EditableMatch from "../components/EditableMatch.svelte";
  let random = { team1: "XXX", team2: "XXX", score1: [0, 0], score2: [0, 0] };
</script>

<EditableMatch {...random} />
