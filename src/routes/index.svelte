<script>
  import {onMount} from "svelte";
  import Key from "./Key.svelte";
  import Letter from "./Letter.svelte";

  const gameboard_size = 5 * 6;
  const key_letters = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "&", "V", "W", "X", "Y", "Z", "-"
  ];
  let words = ["ASDFG", "ASGFD", "FRANZ"];
  let chosen_word = "ASDFG";
  let current_letter = 0;
  let current_row = 0;
  let current_word = [];

  const keys = [];
  key_letters.forEach(key_letter => {
    keys.push({ letter: key_letter, status: "unknown", pressed: false });
  });

  let letters = [];
  for(let i = 0; i < gameboard_size; i++) {
    letters.push({ letter: "", status: "unknown" });
  }

  onMount(async () => {
    for (const key_letter of key_letters) {
      if(key_letter === "&" || key_letter === "-")
        continue;

      //const res = await fetch("https://api.datamuse.com/words?sp=" + key.toLowerCase() + "????&max=100");
      //words.push(... await res.json().toUpperCase());
    }

    console.log(words);
  });

  const handleKeypress = (event) => {
    const key = event.key;
    const key_code = event.keyCode;

    for(let i = 0; i < keys.length; i++) {
      if(keys[i].letter !== key.toUpperCase())
        continue;

      keys[i].pressed = true;
    }

    if(key_code === 8) {
      if(current_letter > 0) {
        current_word.pop();
        letters[--current_letter + (current_row * 5)].letter = "";
      } else {
        console.log("nothing to delete");
      }
      return;
    }

    if(key_code === 13) {
      // HANDLE ENTER
      if(current_letter < 4) {
        console.log("word is not long enough");
        return;
      }

      let current_word_string = "";
      current_word.forEach(letter => {
        current_word_string += letter;
      });

      if(!words.includes(current_word_string)) {
        console.log("not included");
        return;
      }

      console.log("word is included in list")

      if(chosen_word.length !== current_word_string.length) {
        console.log("impossible word length");
        return;
      }

      /*for(let i = 0; i < 5; i++)
      {
        if(chosen_word[i] === current_word_string[i]) {
          for(let j = 0; j < keys.length; j++) {
            if(keys[j].letter !== current_word_string[i])
              continue;

            keys[j].status = "correct";
          }
          letters[i + (current_row * 5)].status = "correct";
        }

        if(chosen_word.includes(current_word_string[i])) {
          for(let j = 0; j < keys.length; j++) {
            if(keys[j].letter !== current_word_string[i] || keys[j].status !== "unknown")
              continue;

            keys[j].status = "position";
          }
          letters[i + (current_row * 5)].status = "position";
        }
      }*/

      for(let i = 0; i < 5; i++) {
        if(chosen_word[i] === current_word_string[i])
        {
          letters[i + (current_row * 5)].status = "correct";
          continue;
        }

        if(chosen_word.includes(current_word_string[i]))
          letters[i + (current_row * 5)].status = "position";
        else
          letters[i + (current_row * 5)].status = "incorrect";
      }

      for(let i = 0; i < 5; i++) {
        for(let j = 0; j < keys.length; j++) {
          if(keys[j].letter !== current_word_string[i])
            continue;

          if(chosen_word[i] === current_word_string[i])
          {
            keys[j].status = "correct";
            continue;
          }

          if(chosen_word.includes(current_word_string[i]))
            keys[j].status = "position";
          else
            keys[j].status = "incorrect";
        }
      }

      current_word = [];
      current_row++;
      current_letter = 0;

      return;
    }

    if(!key_letters.includes(key.toUpperCase())) {
      console.log("pressed unknown key");
      return false;
    }

    if(current_letter > 4)  {
      console.log("max word length reached");
      return;
    }

    current_word.push(...key.toUpperCase());
    letters[current_letter + (current_row * 5)].letter = key.toUpperCase();
    current_letter++;
  };

  const handleKeyrelease = (event) => {
    const key = event.key;

    for(let i = 0; i < keys.length; i++) {
      if(keys[i].letter !== key.toUpperCase())
        continue;

      keys[i].pressed = false;
    }
  };
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
        rel="stylesheet">

  <title>Wordle</title>
</svelte:head>

<svelte:window on:keydown={handleKeypress} on:keyup={handleKeyrelease}/>

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
    {#each letters as letter}
      <svelte:component this={Letter} {...letter} />
    {/each}
  </div>

  <div class="keyboard">
    {#each keys as key}
      <svelte:component this={Key} {...key} />
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

  .keyboard {
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 30rem;
  }
</style>
