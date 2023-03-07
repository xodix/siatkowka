<script lang="ts">
  import Nav from "./components/Nav.svelte";
  import { Route, Router } from "svelte-routing";
  import { user, type User } from "./stores";
  import Main from "./pages/Main.svelte";
  import Judge from "./pages/Judge.svelte";
  import Login from "./pages/Login.svelte";

  let userData: User;

  user.subscribe((val) => {
    userData = val;
  });
</script>

<Router url={window.location.pathname}>
  <Nav isLoggedIn={!!userData.jwt} />
  <div>
    {#if userData.jwt}
      <Route path="/edit" component={Judge} />
    {/if}
    <Route path="/login" component={Login} />
    <Route path="/" component={Main} />
  </div>
</Router>
