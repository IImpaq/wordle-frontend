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
      You have 6 tries to guess a 5 letter word. With each guess you will get
      a hint bringing you closer to finding the correct word. Hints:
    </p>
    <ul class="tutorial-list">
      <li>
        <strong class="red">Red:</strong> The word doesn't contain this letter.
      </li>
      <li>
        <strong class="yellow">Yellow:</strong> The word contains this letter,
        but it's at the wrong position.
      </li>
      <li>
        <strong class="blue">Blue:</strong> The word contains this letter and
        it's at the correct position.
      </li>
    </ul>
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
    padding: 2rem 2.5rem 2.5rem 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 25vw;
    height: 50vh;
  }

  .tutorial-title {
    font-size: 1.25rem;
    font-weight: bold;
  }

  .tutorial-text {
    font-size: 1rem;
    margin: 0.5rem 0;
  }

  .tutorial-content-box {
    display: flex;
    justify-content: center;
  }

  .tutorial-button {
    background-color: #eee;
    font-weight: bold;
    border: none;
    padding: 1rem;
  }

  .tutorial-button:hover {
    background-color: #ddd;
    cursor: pointer;
  }

  .tutorial-list {
    padding: 0 0 2rem 1.5rem;
    margin: 0;
  }

  .red {
    color: #c44536;
  }
  .yellow {
    color: #ffa62b;
  }
  .blue {
    color: #197278;
  }
</style>