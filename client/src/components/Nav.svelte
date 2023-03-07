<script lang="ts">
  import { Link } from "svelte-routing";
  export let isLoggedIn: boolean = false;
</script>

<nav
  class="h-[5vh] bg-slate-800 text-white text-lg font-bold flex justify-center align-middle items-center uppercase gap-5"
>
  <Link to="/" class="hover:underline">Wyniki</Link>
  <a href="https://www.youtube.com/@zstv5655/live" class="hover:underline">
    Transmisja
  </a>
  <Link to="/login" class="hover:underline">login</Link>
  {#if isLoggedIn}
    <Link to="/edit" class="hover:underline">edit</Link>
  {/if}
</nav>
