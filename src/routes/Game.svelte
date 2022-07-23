<script>
  import {getNotificationsContext} from 'svelte-notifications';
  import {
    ApolloClient,
    gql,
    HttpLink,
    InMemoryCache
  } from "@apollo/client/core";
  import Key from "./Key.svelte";
  import Letter from "./Letter.svelte";
  import Cookies from "./Cookies.svelte";
  import Navbar from "./Navbar.svelte";
  import {onMount} from "svelte";

  const { addNotification } = getNotificationsContext();
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:4000',
    })
  });

  const GET_WORD = gql`
    query GET_WORD {
      getWord {
        text
      }
    }
  `;

  const GET_WORDS = gql`
    query {
      getWords
    }
  `;

  const gameboard_size = 5 * 6;
  const key_letters = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];

  let words = [];
  let chosen_word = "";

  let current_letter = 0;
  let current_row = 0;
  let current_word = [];
  let correct_letters = 0;

  let keys = [];
  let letters = [];

  const getWord = async () => {
    await client.query({ query: GET_WORD }).then(res => {
      chosen_word = res.data.getWord.text;
    });
  }

  const getWords = async () => {
    await client.query({ query: GET_WORDS }).then(res => {
      words = res.data.getWords;
    });
  }

  onMount(async () =>{
    await getWord();
    await getWords();
  })

  const jiggleLetters = () => {
    for(let i = current_row * 5; i < (current_row * 5) + 5; i++) {
      letters[i].animate(25*i);
    }
  }

  const handleKeypress = (event) => {
    const key = event.key;

    for(let i = 0; i < keys.length; i++) {
      if(keys[i].getLetter() !== key.toUpperCase())
        continue;

      keys[i].setPressed(true);
    }

    // WHEN PRESSING BACKSPACE
    if(key === "Backspace") {
      if(current_letter > 0) {
        current_word.pop();
        letters[--current_letter + (current_row * 5)].setLetter("");
      } else {
        console.log("nothing to delete");
        addNotification({
          text: "Nothing to delete",
          position: "top-right",
          type: "warning",
          removeAfter: 2000
        });
        jiggleLetters();
      }
      return;
    }

    // WHEN PRESSING ENTER
    if(key === "Enter") {
      // HANDLE ENTER
      if(current_letter <= 4) {
        console.log("word is not long enough");
        addNotification({
          text: "Word isn't long enough",
          position: "top-right",
          type: "warning",
          removeAfter: 2000
        });
        jiggleLetters();
        return;
      }

      let current_word_string = "";
      current_word.forEach(letter => {
        current_word_string += letter;
      });

      if(!words.includes(current_word_string)) {
        console.log("not included");
        addNotification({
          text: "Word is unknown",
          position: "top-right",
          type: "warning",
          removeAfter: 2000
        });
        jiggleLetters();
        return;
      }

      if(chosen_word.length !== current_word_string.length) {
        console.log("impossible word length");
        addNotification({
          text: "Impossible word length",
          position: "top-right",
          type: "danger",
          removeAfter: 2000
        });
        return;
      }

      for(let i = 0; i < 5; i++) {
        if(chosen_word[i] === current_word_string[i])
        {
          letters[i + (current_row * 5)].setStatus("correct");
          correct_letters++;
          continue;
        }

        if(chosen_word.includes(current_word_string[i]))
          letters[i + (current_row * 5)].setStatus("position");
        else
          letters[i + (current_row * 5)].setStatus("incorrect");

        for(let j = 0; j < keys.length; j++) {
          if(keys[j].getLetter() !== current_word_string[i])
            continue;

          if(chosen_word[i] === current_word_string[i])
          {
            keys[j].setStatus("correct");
            continue;
          }

          if(chosen_word.includes(current_word_string[i]))
            keys[j].setStatus("position");
          else
            keys[j].setStatus("incorrect");
        }
      }

      if(correct_letters === 5) {
        console.log("You found out the correct word");
        addNotification({
          text: "You found out the correct word!",
          position: "top-right",
          type: "success",
          removeAfter: 3000
        });
      } else if(current_row === 5) {
        console.log("You failed to find the correct word (" + chosen_word + ")");
        addNotification({
          text: "You lost! The correct word is: " + chosen_word,
          position: "top-right",
          type: "danger",
          removeAfter: 3000
        });
      }

      current_word = [];
      current_row++;
      current_letter = 0;
      correct_letters = 0;

      return;
    }

    if(!key_letters.includes(key.toUpperCase())) {
      console.log("pressed unknown key");
      addNotification({
        text: "Pressed an unknown key",
        position: "top-right",
        type: "danger",
        removeAfter: 2000
      });
      return false;
    }

    if(current_letter > 4)  {
      console.log("max word length reached");
      addNotification({
        text: "Max word length reached",
        position: "top-right",
        type: "warning",
        removeAfter: 2000
      });
      jiggleLetters();
      return;
    }

    current_word.push(...key.toUpperCase());
    letters[current_letter + (current_row * 5)].setLetter(key.toUpperCase());
    current_letter++;
  };

  const handleKeyrelease = (event) => {
    const key = event.key;

    for(let i = 0; i < keys.length; i++) {
      if(keys[i].getLetter() !== key.toUpperCase())
        continue;

      keys[i].setPressed(false);
    }
  };

  const simulateKeypress = (event) => {
    handleKeypress(event);
    handleKeyrelease(event);
  }
</script>

<svelte:window on:keydown={handleKeypress} on:keyup={handleKeyrelease}/>

<body>
  <Cookies />
  <Navbar />

  <div class="gameboard">
    {#each Array(gameboard_size) as _, i}
      <Letter letter={""} status={"unknown"} bind:this={letters[i]} />
    {/each}
  </div>

  <div class="keyboard">
    <div class="keys">
      {#each key_letters as key_letter, i}
        <Key
              letter={key_letter}
              status={"unknown"}
              pressed={false}
              bind:this={keys[i]}
              onClick={() => simulateKeypress({ key: key_letter })}
        />
      {/each}
    </div>
    <div class="inputs">
      <button class="inputs-backspace" on:click={() => simulateKeypress({ key: "Backspace" })}>
        Backspace
      </button>
      <button class="inputs-enter" on:click={() => simulateKeypress({ key: "Enter" })}>
        Enter
      </button>
    </div>
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

  .gameboard {
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;
    width: clamp(15rem, 20vw, 25rem);
    #width: 25rem;
  }

  .keyboard {
    margin: auto;
    display: flex;
    flex-direction: column;
    width: clamp(20rem, 25vw, 30rem);
    #width: 30rem;
  }

  .keys {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .inputs {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .inputs > button {
    border: none;
    padding: 1rem;
    margin: 0.5rem 0.5rem;
    color: #fff;
  }

  .inputs > button:hover {
    cursor: pointer;
  }

  .inputs-backspace {
    background-color: #c44536;
  }

  .inputs-backspace:hover {
    background-color: #a43a2d;
  }

  .inputs-enter {
    background-color: #197278;
  }

  .inputs-enter:hover {
    background-color: #145d62;
  }
</style>