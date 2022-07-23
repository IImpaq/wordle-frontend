<script context="module">

</script>

<script>
  import {onMount} from "svelte";

  let visible = false;

  onMount(() => {
    if(localStorage.getItem("read_tutorial") === null) {
      localStorage.setItem("read_tutorial", "no");
    }

    if(localStorage.getItem("read_tutorial") === "no") {
      visible = true;
    }
  });

  export const open = () => {
    visible = true;
  };

  const close = () => {
    visible = false;
    localStorage.setItem("read_tutorial", "yes");
  };
</script>

{#if visible}
  <div class="tutorial-box">
    <div class="tutorial-content-box">
      <p class="tutorial-title">
        How to play?
      </p>
    </div>
    <p class="tutorial-text">
      Everyday a new word is selected. When you finish the game you have to
      wait for a new word to be selected. Each day there is a new leaderboard
      to compare your score to the rest.
    </p>
    <p class="tutorial-text">

    </p>
    <div class="tutorial-content-box">
      <button class="tutorial-button" on:click={close}>Understand</button>
    </div>
  </div>
{/if}

<style>
  .tutorial-box {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    box-shadow: 0 0 10px #ddd;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 25vw;
    height: 50vh;
  }

  .tutorial-title {
    font-size: 1.25rem;
    font-weight: bold;
  }

  .tutorial-text {
    font-size: 1rem;
  }

  .tutorial-content-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
  }

  .tutorial-button {
    background-color: #eee;
    font-weight: bold;
    border: none;
    padding: 1rem;
  }

  .tutorial-button:hover {
    background-color: #ddd;
  }
</style>