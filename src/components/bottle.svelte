<div class="box">
    <button on:click={spin}><img class="bottle" src="/beer-bottle.png" alt="beer bottle"></button>
</div>

<script>
    function spin() {
        const spin = document.querySelector(".bottle");
        if (spin) {
          const deg = Math.floor(Math.random() * (360 - 9999)) + 9999;
          // @ts-ignore
          spin.style.transform = `rotate(${deg}deg)`;
        }
    }
</script>

<style>
  .box { 
    text-align: center;
    max-width: 100%;
  }

  img {
    max-width: 40%;
    transition: all ease 2s;
  }

  button {
    border-radius: 0;
    border-color: transparent;
    background-color: transparent;
  }
</style>