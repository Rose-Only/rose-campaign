<template>
  <div id="app">
    <cover></cover>
    <letter></letter>
    <surprise></surprise>
    <img class="app-bg" src="./assets/background.jpg">
    <img class="loading-wheel" src="./assets/loading.gif">
  </div>
</template>

<script>
import Promise from 'promise'
import eventHub from './shared/EventHub'
import Cover from './components/Cover'
import Letter from './components/Letter'
import Surprise from './components/Surprise'

export default {
  name: 'app',
  components: {
    Cover,
    Letter,
    Surprise
  },
  mounted () {
    preloadResource()
      .then(initApp)
  }
}

function initApp () {
  eventHub.$emit('app-ready')
}

function preloadResource () {
  return new Promise((resolve, reject) => {
    let countRoseImg = 33
    let loadedImg = 0
    for (let i = 1; i <= countRoseImg; i++) {
      let roseImg = document.createElement('img')
      roseImg.classList.add(`rose-${i}`)
      roseImg.classList.add('rose-flower')
      roseImg.src = `/static/rose-flower/rose-${i}.png`
      roseImg.onload = (e) => {
        loadedImg++
        if (loadedImg === countRoseImg) {
          document.querySelector('.loading-wheel').style.display = 'none'
          resolve()
        }
      }
    }
  })
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}

.app-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.loading-wheel {
  z-index: 999;
  position: fixed;
  width: 500px;
  height: 300px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
