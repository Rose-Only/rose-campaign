<template>
  <div id="letter">
  </div >
</template>

<script>
import eventHub from '../shared/EventHub'

export default {
  name: 'hello',
  data () {
    return {
      animationHanlder: null,
      msg: '亲爱的宝贝，如果此时此刻你正在阅读此封情书，那恭喜你！你已经用爱情的密码成功的打开了通往爱情世界的大门，并且已经成为这爱情世界里的女主人了。在这里一个值得纪念的一天，爱情世界这唯一的一位王子有份献给女主人的告白信。亲爱的张丹路小姐，到今天为止我们已经认识2个月，77天，1848个小时，10910880分钟，654652800秒。在这相识的每分每秒里，我想告诉你，你给我的爱让我无比幸福！在认识宝贝之前，我仅仅认为爱能让我幸福是因为我可以让对方开心。但是认识宝贝之后我才发觉，爱的很大一部分辛福感来自被爱，从来没有一个女生见到我会笑的比花还美，从来没有一个女生为我买这么多衣服帮我打扮的这么帅，从来没有一个女生会在我生病的时候来探望我陪伴在我身边。' // '请爱的宝贝，如果此时此刻你正在阅读此封情书，那恭喜你！你已经用爱情的密码成功的打开了通往爱情世界的大门，并且已经成为这爱情世界里的女主人了。在这里一个值得纪念的一天，爱情世界这唯一的一位王子有份献给女主人的告白信。亲爱的张丹路小姐，到今天为止我们已经认识2个月，77天，1848个小时，10910880分钟，654652800秒。在这相识的每分每秒里，我想告诉你，你给我的爱让我无比幸福！在认识宝贝之前，我仅仅认为爱能让我幸福是因为我可以让对方开心。但是认识宝贝之后我才发觉，爱的很大一部分辛福感来自被爱，从来没有一个女生见到我会笑的比花还美，从来没有一个女生为我买这么多衣服帮我打扮的这么帅，从来没有一个女生会在我生病的时候来探望我陪伴在我身边。'
    }
  },
  mounted () {
    let self = this

    let letterElem = document.getElementById('letter')
    letterElem.style.height = `${window.innerHeight}px`
    /* eslint-disable no-eval */
    let ciphertext = self.$data.msg
    let wordElemArr = []
    for (let index = 0; index < ciphertext.length; index++) {
      let wordElem = document.createElement('span')
      wordElem.classList.add('word')
      wordElemArr.push(wordElem)
      let text = ciphertext[index]
      let newText = String.fromCharCode(text.charCodeAt() + 0x1314)
      wordElem.textContent = newText
      letterElem.appendChild(wordElem)
    }
    eventHub.$on('decrypt-letter', (passcode) => {
      passcode = parseInt(passcode, 16)
      if (!passcode && passcode < 5000 && passcode > 0) { return false }
      if (self.$data.animationHanlder) {
        clearInterval(self.$data.animationHanlder)
      }
      let translatedWord = 0
      self.$data.animationHanlder = setInterval(() => {
        // if (wordElemArr[translatedWord].className.includes('translated')) {
        //   wordElemArr[translatedWord].classList.remove('translated')
        // }
        let word = wordElemArr[translatedWord].textContent
        wordElemArr[translatedWord].classList.add('translated')
        wordElemArr[translatedWord].textContent = String.fromCharCode(word.charCodeAt() - passcode)

        translatedWord++
        if (translatedWord === wordElemArr.length) {
          clearInterval(self.$data.animationHanlder)
          self.$data.animationHanlder = null
        }
      }, 150)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  @font-face {
    font-family: 'Chinese Romantic';
    src: url('/static/downcc.ttf') format('truetype');
  }
  #letter {
    padding: 20px 60px;
    font-size: 40px;
    color:#fff4f4;
  }
  .word {
    font-family: 'Chinese Romantic';
  }

  .translated {
    animation: show .5s forwards;
  }

  @keyframes show {
    0% {opacity: 0}
    100% {opacity: 1}
  }

</style>
