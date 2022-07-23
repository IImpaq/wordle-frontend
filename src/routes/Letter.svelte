<script>
  export let letter;
  export let status;

  export const setLetter = (a_letter) => {
    letter = a_letter;
  };

  export const setStatus = (a_status) => {
    status = a_status;
  };
</script>

<div
      class="letter-box"
      class:correct={status === "correct"}
      class:wrong-position={status === "position"}
      class:incorrect={status === "incorrect"}
>
  <p class="letter">{letter}</p>
</div>

<style>
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
    font-size: clamp(1rem, 1.5vw, 1.75rem);
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
    color: white;
  }
</style>