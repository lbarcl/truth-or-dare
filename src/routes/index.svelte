<svelte:head>
    <title>D mi, C mi?</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
</svelte:head>

<style>
  :global(html) {
    height: 100%;
  }

  :global(body) { 
    background-color: rgb(251, 255, 0);
    height: 100%;
    position: relative;
  }

  .container { 
    padding-top: 5%;
    padding-left: 20%;
    padding-right: 20%;
  }

  .box { 
    text-align: center;
    max-width: 100%;
  }

  hr { 
    border-radius: 5%;
  }

  h2 {
    font-weight: 700;
    font-size: large;
    color: black;
  }

  .container > button {
    margin-right: 2%;
    margin-top: 5%;
  }
</style>

<script>
  import { onMount } from "svelte";

  let title = "Truth Or Dare"
  let currentText = "Welcome to the Truth or Dare game";
  var dares = [];
  onMount(() => {

  });
</script>

<div class="container">

  <div class="box">
    <h2>{title}</h2>
    <hr>
    <p>{currentText}</p>
    <div class="container">    
      <button class="button is-primary">Truth</button>
      <button class="button is-info">Skip</button>
      <button class="button is-warning" style="margin-right: 0">Dare</button>
    </div>
  </div>
</div>