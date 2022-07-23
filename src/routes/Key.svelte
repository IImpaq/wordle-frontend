<script>
  export let letter;
  export let status;
  export let pressed;
  let hovered;

  export let onClick = () => {};

  export const getLetter = () => {
    return letter;
  }

  export const setLetter = (a_letter) => {
    letter = a_letter;
  };

  export const setStatus = (a_status) => {
    status = a_status;
  };

  export const setPressed = (a_pressed) => {
    pressed = a_pressed;
  };
</script>

<div
      class="key-box {pressed ? 'selected' : ''} {hovered ? 'selected' : ''}"
      class:correct={status === "correct"}
      class:wrong-position={status === "position"}
      class:incorrect={status === "incorrect"}
      on:mouseover={() => hovered = true}
      on:mouseleave={() => hovered = false}
      on:click={onClick}
>
  <p class="key">
    {letter}
  </p>
</div>

<style>
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
    font-size: clamp(0.75rem, 1.5vw, 1rem);
  }

  .selected {
    background-color: #eee;
  }

  .correct {
    background-color: #197278;
    color: #fff;
  }

  .wrong-position {
    background-color: #ffa62b;
    color: #fff;
  }

  .incorrect {
    background-color: #c44536;
    color: #fff;
  }
</style>
