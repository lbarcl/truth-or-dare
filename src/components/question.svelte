<style>  
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

  button {
    margin-right: 2%;
    margin-top: 5%;
  }
</style>

<script>
  import { onMount } from "svelte";

  /**
* @type {string[]}
*/
  const dares = [];
  /**
* @type {string[]}
*/
  const truths = [];

  let title = "D mi, C mi?";
  let currentQuestion = "Doğruluk mu, cesaret mi?";
  let state = "welcome";

  onMount(async () => {
    for (let i = 0; i < 4; i++) {
      dares.push(await getDare());
      truths.push(await getTruth());
    }
  });

  async function getTruth() {
    const response = await fetch("/api/truth");
    const data = await response.text();
    return data;
  }

  async function getDare() {
    const response = await fetch("/api/dare");
    const data = await response.text();
    return data;
  }

  async function nextQuestion() {
    if (state === "truth") {
      currentQuestion = truths[0];
      truths.shift();
      truths.push(await getTruth());
    } else {
      currentQuestion = dares[0];
      dares.shift();
      dares.push(await getDare());
    }
  }

  function nextTruthQuestion() {
    state = "truth";
    nextQuestion();
  }

  function nextDareQuestion() {
    state = "dare";
    nextQuestion();
  }

  function skip() {
    nextQuestion();
  }
</script>
  

  
<div class="box">
  <h2>{title}</h2>
  <hr>
  <p>{currentQuestion}</p>
  <div class="container">    
    <button on:click={nextTruthQuestion} class="button is-primary">Doğruluk</button>
    {#if state != 'welcome'}
    <button on:click={skip} class="button is-info">Geç</button>
    {/if}
    <button on:click={nextDareQuestion} class="button is-warning" style="margin-right: 0">Cesaret</button>
  </div>
</div>