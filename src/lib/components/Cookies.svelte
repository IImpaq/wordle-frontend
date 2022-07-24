<script>
  import {onMount} from "svelte";

  let shown = false;

  const hide = () => {
    shown = false;
    localStorage.setItem("consent_to_cookies", "yes");
  };

  const close = () => {
    window.close();
  };

  onMount(() => {
    if(localStorage.getItem("consent_to_cookies") === null) {
      localStorage.setItem("consent_to_cookies", "no");
    }

    if(localStorage.getItem("consent_to_cookies") === "no") {
      shown = true;
    }
  });
</script>

{#if shown}
  <div class="cookie-box">
    <div class="cookie-info">
      <p class="cookie-title">
        We are using 🍪 to store relevant data
      </p>
      <p class="cookie-text">
        We are using cookies only for essential purposes to store relevant
        data to improve the game experience. If you do not accept the usage
        of cookies, please do not use the website as we require the use of
        essential cookies.
      </p>
    </div>
    <div class="cookie-action">
      <button class="cookie-button accept" on:click={hide}>Accept</button>
      <button class="cookie-button deny" on:click={close}>Deny</button>
    </div>
  </div>
{/if}

<style>
  .cookie-box {
    position: absolute;
    background-color: #fff;
    box-shadow: 0 0 10px #ddd;
    margin: 1rem 1rem;
    padding: 1.5rem 3rem;
    display: flex;
    gap: 2rem;
  }

  .cookie-action {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .cookie-title {
    font-size: 1.3rem;
    font-weight: bold;
  }

  .cookie-button {
    border: none;
    padding: 1rem;
    font-weight: bold;
    box-shadow: 0 0 10px #ddd;
  }

  .cookie-button.deny {
    background-color: #c44536;
    color: #fff;
  }

  .cookie-button.deny:hover {
    background-color: #a43a2d;
    cursor: pointer;
  }

  .cookie-button.accept {
    background-color: #ddd;
  }

  .cookie-button.accept:hover {
    background-color: #ccc;
    cursor: pointer;
  }
</style>