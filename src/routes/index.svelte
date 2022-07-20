<script>
  import Notifications from 'svelte-notifications';
  import Game from "./Game.svelte";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
        rel="stylesheet">

  <title>Wordle</title>
</svelte:head>

<Notifications>
  <Game />
</Notifications>
