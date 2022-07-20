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

<style>
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
</style>
