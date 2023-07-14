<script lang="ts">
  import { user } from "./../stores";
  import { navigate } from "svelte-routing";

  let code: string;
  let err: string = "";

  async function handleSubmit() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    let req = await fetch("/login", {
      body: JSON.stringify({ password: code }),
      method: "POST",
      headers,
      redirect: "follow",
    });
    err = "";

    if (!req.ok) {
      err = "Spróbuj ponownie!";
      return;
    }

    let state = await req.json();
    user.set(state);
    navigate("/");
  }
</script>

<form class="w-9/12 md:w-1/2 m-auto" on:submit|preventDefault={handleSubmit}>
  <p class="text-red text-center {err ? 'invisible' : 'visible'}">
    {err}
  </p>
  <label class="text-center text-xl md:text-5xl" for="password">
    <p class="my-6">Wprowadź kod stanowiska:</p>
  </label>
  <input
    id="password"
    type="password"
    class="m-auto my-6 border-slate-900 border block w-full"
    bind:value={code}
  />
  <button class="bg-slate-900 rounded text-white m-auto block w-full">
    Login
  </button>
</form>
