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


</style>

<script>
  import Question from "../components/question.svelte";
  import Bottle from "../components/bottle.svelte";

</script>

<div class="container">
  <Question />
  <Bottle />
</div>