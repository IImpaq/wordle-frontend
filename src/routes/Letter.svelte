<script>
  export let letter;
  export let status;

  let delay;
  let duration;
  let animation_type;
  let clicked = false;
  let timeout_id = 0;
  const onClick = () => {
    clicked = !clicked;
    timeout_id++;
    const t_id = timeout_id;
    setTimeout(() => {
      // cancel timeout if new was set
      if(t_id === timeout_id)
        clicked = false;
    }, 650);
  };

  export const animate = (a_animation_type, a_delay, a_duration) => {
    animation_type = a_animation_type;
    delay = a_delay;
    duration = a_duration;
    onClick();
  };

  export const setLetter = (a_letter) => {
    letter = a_letter;
  };

  export const setStatus = (a_status) => {
    status = a_status;
  };
</script>

<span class={`boop${clicked ? (" " + animation_type) : ""}`} class:active={clicked} style="--animation: boop; animation-delay: {delay}ms; animation-duration: {duration}ms;">
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

  @keyframes scale {
    0% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1.25, 1.25);
    }
    100% {
      transform: scale(1, 1);
    }
  }
  .boop.scale {
    animation-name: scale;
    animation-play-state: running;
  }
</style>