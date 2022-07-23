<script>
  export let letter;
  export let status;

  let delay = 0;
  let clicked = false;
  let timeoutId = 0;
  export const onClick = () => {
    clicked = !clicked;
    timeoutId++;
    const tId = timeoutId;
    setTimeout(() => {
      // cancel timeout if new was set
      if(tId === timeoutId)
        clicked = false;
    }, 1000);
  };

  export const animate = (a_delay) => {
    delay = a_delay;
    onClick();
  };

  export const setLetter = (a_letter) => {
    letter = a_letter;
  };

  export const setStatus = (a_status) => {
    status = a_status;
  };
</script>

<span class={`boop${clicked ? (" wiggle") : ""}`} class:active={clicked} style="--animation: boop; animation-delay: {delay}ms;">
  <div
        class="letter-box"
        class:correct={status === "correct"}
        class:wrong-position={status === "position"}
        class:incorrect={status === "incorrect"}
  >
  <p class="letter">{letter}</p>
</div>
</span>

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

  .boop {
    display: inline-block;
  }
  .boop.active {
    animation-duration: 650ms;
    animation-play-state: paused;
    animation-fill-mode: forwards;
  }

  @keyframes wiggle {
    0% {
      transform: translateX(0px);
    }
    20% {
      transform: translateX(10px);
    }
    40% {
      transform: translateX(-10px);
    }
    60% {
      transform: translateX(5px);
    }
    80% {
      transform: translateX(-5px);
    }
    90% {
      transform: translateX(1px);
    }
    95% {
      transform: translateX(-1px);
    }
    100% {
      transform: translateX(0px);
    }
  }
  .boop.wiggle {
    animation-name: wiggle;
    animation-play-state: running;
  }
</style>