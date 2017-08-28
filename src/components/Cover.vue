<template>
  <div id="cover">
    <img class="rose-flower" v-on:click="startRoseAnimation"/>
    <h1 class='title'>The eternal flower of Love</h1>
    <h1 class='title'>For my lovely Rose</h1>
    <div class='pass-code'>
       <input class='pass-code-text' type="text" placeholder="pass code for love" />
       <button type="button" v-on:click="decryptLetter" >Open!</button>
    </div>

  </div>
</template>

<script>
import eventHub from '../shared/EventHub'

export default {
  name: 'hello',
  data () {
    return {
      animationHanlder: null,
      countPlayedAnimation: 0
    }
  },
  methods: {
    startRoseAnimation: function () {
      let self = this
      if (self.$data.animationHanlder) {
        clearInterval(self.$data.animationHanlder)
        self.$data.animationHanlder = null
      }
      self.$data.countPlayedAnimation++
      let countRoseImg = 33
      let loadedImg = 0
      let roseFlowerElem = document.querySelector('.rose-flower')
      self.$data.animationHanlder = setInterval(() => {
        loadedImg++
        roseFlowerElem.src = `/static/rose-flower/rose-${loadedImg}.png`
        if (loadedImg === countRoseImg) {
          clearInterval(self.$data.animationHanlder)
          self.$data.animationHanlder = null
          if (self.$data.countPlayedAnimation > -1) {
            document.querySelectorAll('.pass-code')[0].style.display = 'block'
          }
        }
      }, 50)
    },
    decryptLetter: function () {
      let passcode = document.querySelector('.pass-code-text').value
      eventHub.$emit('decrypt-letter', passcode)
    }
  },
  mounted () {
    let coverElem = document.getElementById('cover')
    coverElem.style.height = `${window.innerHeight}px`
    eventHub.$on('app-ready', (someData) => {
      let roseFlowerElem = document.querySelector('.rose-flower')
      roseFlowerElem.src = '/static/rose-flower/rose-1.png'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @font-face {
    font-family: 'Great Vibes';
    src: url('/static/great-vibes.ttf') format('truetype');
  }
  #cover {
    width: 100%;
    font-family: 'Great Vibes', cursive;
    padding-top: 100px;
    box-sizing: border-box;
  }

  .title {
    font-size: 60px;
    color:#fff4f4;
  }

  .rose-flower {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .pass-code {
    position: absolute;
    width: 300px;
    height: 80px;
    top: 80%;
    left: 50%;
    transform: translate(-50%, 0);
    display: none;
  }

  .pass-code input {
    width: 100%;


    display: block;
    padding: .5rem .75rem;
    font-size: 37px;
    line-height: 1.25;
    color: #495057;
    background-color: #fff;
    background-image: none;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: .25rem;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  }

  .pass-code button {
    width: 80%;
    height: 60px;
    font-size: 37px;
    line-height: 1.25;
    margin-top: 30px;
  }
</style>
