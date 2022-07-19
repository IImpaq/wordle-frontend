<script>
  const gameboard_size = 5 * 6;
  const keys = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "&", "V", "W", "X", "Y", "Z", "-"
  ];
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
        rel="stylesheet">

  <title>Wordle</title>
</svelte:head>

<body>
  <navbar>
    <ul class="nav-list">
      <li class="nav-item">
        <button>?</button>
      </li>
      <li class="nav-item">
        <a href="/">
          Wordle
        </a>
      </li>
      <li class="nav-item">
        <button>#</button>
      </li>
    </ul>
  </navbar>

  <div class="gameboard">
    {#each Array(gameboard_size) as _}
      <div class="letter-box"><p class="letter"></p></div>
    {/each}
  </div>

  <div class="keyboard">
    {#each keys as key}
      <div class="key-box">
        <p class="key">
          {key}
        </p>
      </div>
    {/each}
  </div>
</body>

<style>
  * {
    font-family: "Lato", sans-serif;
    font-size: 16px;
  }

  body {
    background-color: #edddd4;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .nav-list {
    background: #fff;
    box-shadow: 0 0 10px #ddd;
    margin: 1rem 1rem;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    list-style: none;
  }

  .nav-item > a {
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
    color: #000;
  }

  .nav-item > button {
    border-style: none;
    background-color: #fff;
    font-weight: bold;
    color: #000;
    font-size: 1.25rem;
    cursor: pointer;
  }

  .gameboard {
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;
    width: 25rem;
  }

  .letter-box {
    background-color: #fff;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    box-shadow: 0 0 10px #ddd;
  }

  .letter {
    margin: 0;
    font-weight: bold;
    font-size: 1.75rem;
  }

  .keyboard {
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 30rem;
  }

  .key-box {
    flex: 0 0 calc(12%);
    background-color: #fff;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0.25rem;
    cursor: pointer;
    box-shadow: 0 0 10px #ddd;
  }

  .key {
    margin: 0;
    font-weight: bold;
    font-size: 1rem;
  }
</style>
