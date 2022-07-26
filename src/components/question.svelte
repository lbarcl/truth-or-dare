<style>  
  .box { 
    text-align: center;
    max-width: 100%;
  }

  hr { 
    border-radius: 5%;
    margin-top: 5px;
    margin-bottom: 5px;
    background-color:rgb(228, 228, 228);
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

  .settingsbutton {
    background-color: transparent;
    border: none;
  }
</style>

<script lang="ts">
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
  import { onMount } from "svelte";

  interface question {
    id: number,
    text: string,
    nsfw: boolean
  }

  // @ts-ignore
  let dares: question[] = [];
  // @ts-ignore
  let truths: question[] = [];

  const settings = {
    'nsfw': false
  };

  let body: HTMLElement | null;
  let currentQuestion: question = {'id': 0, 'text': 'Doğruluk mu, cesaret mi?', 'nsfw': false};
  let previousState = '';
  let state = 'start';
  let report = '';

  onMount(() => {
    getQuestions('truth', {count: 5, nsfw: settings.nsfw}).then(t => {
      t.map(q => {
        truths.push(q);
      });
    });

    getQuestions('dare', {count: 5, nsfw: settings.nsfw}).then(d => {
      d.map(q => {
        dares.push(q);
      });
    });

    body = document.querySelector('body');
    currentQuestion = {'id': 0, 'text': 'Doğruluk mu, cesaret mi?', 'nsfw': false};
  });

  //#region [blue] Question Functions
  async function getQuestions(type: string, options?: {nsfw?: boolean, count?: number}): Promise<Array<question>> {
    let url = `/api/question/${type}`;

    if (options) {
      const arrOptions = [];
      if (options.nsfw) {
        arrOptions.push("nsfw=true");
      }

      if (options.count) {
        arrOptions.push(`count=${options.count}`);
      }

      if (arrOptions.length > 0) {
        url += `?${arrOptions.join("&")}`;
      }
    }

    const response = await fetch(url);
    return await response.json();
  }

  async function processQuestion(): Promise<void> {
    currentQuestion = (state === 'truth') ? truths[0] : dares[0];
    if (body) {
      body.style.backgroundColor = currentQuestion.nsfw ? '#eb30ff' : 'rgb(0, 0, 255)';
    }

    const question = (state === 'truth') ? truths.shift() : dares.shift();
    if (!question) {
      return;
    }
    
    const newQuestion = await getQuestions(state, {count: 1, nsfw: settings.nsfw});
    state === 'truth' ? truths.push(newQuestion[0]) : dares.push(newQuestion[0]);
  }

  function t() {
    changeState('truth');
    processQuestion();
  }

  function d() {
    changeState('dare');
    processQuestion();
  }

  //#endregion
  
  //#region [pink] Settings Functions
  function openSettings() {
    changeState('settings');
  }

  async function nsfw() {
    settings.nsfw = !settings.nsfw;
    truths = await getQuestions('truth', {count: 5, nsfw: settings.nsfw});
    dares = await getQuestions('dare', {count: 5, nsfw: settings.nsfw});
    processQuestion();
    addNotification('NSFW ayarlarını değiştirdiniz.', 'success');
  }

  //#endregion


  //#region [red] Report Functions
  function openReport() {
    report = '';
    changeState('report');
  }

  async function sendReport() {
    if (!report) {
      addNotification('Lütfen bir şeyler yazın.', 'warning');
      return;
    }
      const reportBody = JSON.stringify({
        id: currentQuestion.id,
        type: previousState,
        report: report
      })

      try {
        fetch('/api/question/report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: reportBody 
        })

        addNotification('Şikayetiniz gönderildi.', 'success');
        
        changeState(previousState);
        processQuestion();
        report = '';
      }
      catch (e) {
        addNotification('Bir hata oluştu.', 'error');
      }
  }

  //#endregion

  //#region [green] Global functions

  function addNotification(message: string, type: string, timeout?: number) {
    const t = timeout || 5000; 
    
    if (type == 'success') {
      notifier.success(message, t);
    } else if (type == 'warning') {
      notifier.warning(message, t);
    } else if (type == 'error') {
      notifier.danger(message, t);
    } else {
      notifier.info(message, t);
    }
  }

  function changeState(newState: string) {
    previousState = state;
    state = newState;
  }

  function closeTab() {
    changeState(previousState);
  }
  
  //#endregion
</script>
  

<NotificationDisplay />

<div class="box">
  {#if state === 'start' || state === 'truth' || state === 'dare'}
    <h2>
      {#if state != 'start'}
        <button on:click={openReport} class="settingsbutton">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </button> 
      {/if}
      D mi, C mi? 
      <button on:click={openSettings} class="settingsbutton">
        <i class="fa-solid fa-gear"></i></button>
      </h2>
    <hr>
    <p>{currentQuestion.text}</p>
    <div class="container">    
      <button on:click={t} class="button is-primary">Doğruluk</button>
      {#if state != 'start'}
        <button on:click={processQuestion} class="button is-info">Geç</button>
      {/if}
      <button on:click={d} class="button is-warning" style="margin-right: 0">Cesaret</button>
    </div>

  {:else if state == 'settings'} 
    <h2>Ayarlar</h2>
    <hr>
    <div class="container">
      <label class="checkbox">
        <button class="button" on:click={nsfw} >{settings.nsfw ? "+18 zorlama" : "+18 zorla"}</button>
      <button on:click={closeTab} class="button is-primary">Tamam</button>
    </div>

  {:else if state == 'report'}

    <h2>Rapor</h2>
    <hr>
    <div class="container">
      <p>{currentQuestion.text}</p>
      <textarea bind:value={report} class="textarea" placeholder="Raporunuzu buraya yazın"></textarea>
      <button on:click={sendReport} class="button is-primary">Tamam</button>
      <button on:click={closeTab} class="button is-warning" style="margin-right: 0">İptal</button>
    </div>
  {/if}
</div>