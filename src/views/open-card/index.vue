<template>
  <div class="open-card">
    <!-- open-card
        <div class="card">
            <div class="face front puker-spade1">
            </div>
        </div>
        <div class="card">
            <div class="face back">
            </div>
        </div> -->
    <div class="content">
      <div class="title-field">
        <h1 class="play-title">
          閒家
          <span v-if="firstPlayerPoints != null" class="point">
            {{ firstPlayerPoints }} 點
          </span>
        </h1>
        <h1 class="bank-title">
          莊家
          <span v-if="firstBankerPoints != null" class="point">
            {{ firstBankerPoints }} 點
          </span>
        </h1>
      </div>
      <div class="wrap">
        <div class="play-content">
          <div class="common-card">
            <div class="card">
              <template v-if="play.length > 0">
                <div class="face front" :class="play[0].className" @click="cardInfoClick(0,0)">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
            <div class="card">
              <template v-if="play.length > 0">
                <div class="face front" :class="play[1].className" @click="cardInfoClick(0,1)">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
          </div>
          <div class="supply-card">
            <div class="card">
              <template v-if="play.length > 2">
                <div class="face front" :class="play[2].className" @click="cardInfoClick(0,2)">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="bank-content">
          <div class="common-card">
            <div class="card">
              <template v-if="bank.length > 0">
                <div class="face front" :class="bank[0].className" @click="cardInfoClick(1,0)">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
            <div class="card">
              <template v-if="bank.length > 0">
                <div class="face front" :class="bank[1].className" @click="cardInfoClick(1,1)">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
          </div>
          <div class="supply-card">
            <div class="card">
              <template v-if="bank.length > 2">
                <div class="face front" :class="bank[2].className" @click="cardInfoClick(1,2)">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div :class="['resText',resTextColor(final)]">{{ final }}</div>
      <button :disabled="isLoading || lastRound" class="btn" @click="init()">{{ type }}</button>
      <button :disabled="isLoading || lastRound" class="btn" style="margin-left:10px" @click="init1()">直接開牌</button>
    </div>
  </div>
</template>
<script>
import constants from '../../utils/constants'

import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'OpenCard',
  data() {
    return {
      play: [],
      bank: [],
      type: '開牌',
      timeID1: 0,
      timeID2: 0,
      timeID3: 0,
      timeID4: 0,
      timeID5: 0,
      timeID6: 0,
      timeID7: 0,
      timeID8: 0,
      firstBankerPoints: null,
      firstPlayerPoints: null,
      final: '',
      isShuffle: false,
      isOpened: false,
      isLast: false,
      constants
    }
  },

  computed: {
    ...mapGetters(['bankerPoints', 'cards', 'playerPoints', 'result', 'resultHistory', 'lastRound', 'isLoading', 'cardsResult', 'pokerMachine'])
  },
  watch: {
    resultHistory: function(data) {
      if (data && !data.length) {
        this.reset()
      }
    }
  },
  mounted() {
  },
  methods: {
    ...mapMutations('app', ['SET_ISLOADING']),
    async init() {
      if (this.lastRound) return
      this.SET_ISLOADING(true)
      this.reset()
      await this.$store.dispatch('app/doExecute')
      await this.openCard()
      this.doResult()
      this.SET_ISLOADING(false)
      if (this.lastRound) {
        setTimeout(() => {
          alert('本局已結束，請重新洗牌')
        }, 1000)
      }
    },
    resTextColor(text) {
      switch (text) {
        case '莊贏':
          return 'red'
        case '閒贏':
          return 'blue'
        case '和局':
          return 'green'
      }
    },
    cardInfoClick(firstIndex, secondIndex) {
      const index = this.cards[firstIndex][secondIndex].id - 1
      const suitInfo = this.handleSuitInfo(index)
      const preSuitInfo = this.handleSuitInfo(index - 1)
      suitInfo.suitClass = this.handleSuits(suitInfo.suit, suitInfo.value)
      preSuitInfo.suitClass = this.handleSuits(preSuitInfo.suit, preSuitInfo.value)
      console.log(this.cardsResult)
      this.cardInfo = {
        isFirst: index === 0,
        suitInfo: suitInfo,
        preSuitInfo: preSuitInfo
      }
      this.$emit('OpenCardData', this.cardInfo)
    },
    handleSuitInfo(index) {
      if (index === -1) { return this.pokerMachine }
      return this.cardsResult[index]
    },
    handleSuits(suit, number) {
      const { constants } = this
      const suitName = (constants.suitList.filter(a => a.id === suit)[0] || {}).name
      return constants.AllCards.filter(a => a === `puker-${suitName}${number}`)[0]
    },
    openCard() {
      return new Promise(resolve => {
        this.play = this.cards[0].slice(0, 2)
        console.log(this.cards)
        this.timeID1 = setTimeout(() => {
          this.firstPlayerPoints = ((this.play[0].value > 10 ? 10 : this.play[0].value) + (this.play[1].value > 10 ? 10 : this.play[1].value)) % 10
        }, 500)
        this.timeID2 = setTimeout(() => {
          this.bank = this.cards[1].slice(0, 2)
          this.timeID3 = setTimeout(() => {
            this.firstBankerPoints = ((this.bank[0].value > 10 ? 10 : this.bank[0].value) + (this.bank[1].value > 10 ? 10 : this.bank[1].value)) % 10
          }, 500)
        }, 1000)
        let i = 1
        if (this.cards[0][2]) {
          i++
          this.timeID4 = setTimeout(() => {
            this.play.push(this.cards[0][2])
            this.timeID5 = setTimeout(() => {
              this.firstPlayerPoints = this.playerPoints
            }, 500)
          }, 1000 * i)
        }
        if (this.cards[1][2]) {
          i++
          this.timeID6 = setTimeout(() => {
            this.bank.push(this.cards[1][2])
            this.timeID7 = setTimeout(() => {
              this.firstBankerPoints = this.bankerPoints
            }, 500)
          }, 1000 * i)
        }
        this.timeID8 = setTimeout(() => { // 翻牌結束才resolve
          resolve()
        }, 1000 * i + 800)
      })
    },
    doResult() {
      this.final = this.bankerPoints > this.playerPoints ? '莊贏' : this.bankerPoints === this.playerPoints ? '和局' : '閒贏'
    },
    async init1() { // 直接開牌
      if (this.lastRound) return
      this.SET_ISLOADING(true)
      this.reset()
      await this.$store.dispatch('app/doExecute')
      this.play = this.cards[0].slice(0, 2)
      this.bank = this.cards[1].slice(0, 2)
      if (this.cards[0][2]) {
        this.play.push(this.cards[0][2])
      }
      if (this.cards[1][2]) {
        this.bank.push(this.cards[1][2])
      }
      this.firstPlayerPoints = this.playerPoints
      this.firstBankerPoints = this.bankerPoints
      this.doResult()
      // this.timeID1 = setTimeout(() => {
      this.SET_ISLOADING(false)
      // }, 800)
      if (this.lastRound) {
        setTimeout(() => {
          alert('本局已結束，請重新洗牌')
        }, 1000)
      }
    },
    reset() {
      this.firstPlayerPoints = null
      this.firstBankerPoints = null
      this.play = []
      this.bank = []
      clearTimeout(this.timeID1)
      clearTimeout(this.timeID2)
      clearTimeout(this.timeID3)
      clearTimeout(this.timeID4)
      clearTimeout(this.timeID5)
      clearTimeout(this.timeID6)
      clearTimeout(this.timeID7)
      clearTimeout(this.timeID8)
      this.final = ''
    }
  }
}
</script>
<style lang="scss" scoped>
///////// 翻牌樣式
.card {
  position: relative;
}
.face {
  position: absolute;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  left: 0;
  right: 0;
}
.front {
  transform: rotateY(180deg);
  animation: openCard 1s forwards;
}
.back {
  transform: rotateY(0);
  animation: closeCard 1s forwards;
}
@keyframes openCard {
  0% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(0);
  }
}
@keyframes closeCard {
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(180deg);
  }
}
///////////////

.btn {
  width: 120px;
  height: 40px;
  border: 2px solid #000;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #fff;
  color: #fff;
  background: linear-gradient(180deg, #3D3D3D 21%, #636363 80%);
  background: -moz-linear-gradient(180deg, #3D3D3D 21%, #636363 80%);
  background: -webkit-linear-gradient(180deg, #3D3D3D 21%, #636363 80%);
  background: -o-linear-gradient(180deg, #3D3D3D 21%, #636363 80%);
  cursor: pointer;
  font-size: 16px;
  &:disabled {
    color: rgb(165, 161, 161);
    cursor: not-allowed;
  }
}
.open-card {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('~@/assets/img/pokerTable.jpg');
    background-repeat: no-repeat;
    background-size: cover 100%;
    background-position: center;
    .content {
        display: inline-block;
        padding: 10px;
        margin-top: 100px;
        width: 100%;
        .title-field {
          color: white;
          font-family: 'Noto Serif TC', serif;
          text-shadow: -1px 1px 0 #fff, 1px 1px 0 #fff,1px -1px 0 #fff,-1px -1px 0 #fff;
          font-size: 40px;
          display: flex;
          font-weight: bold;
          justify-content: center;
          margin-bottom: 10px;
          position: relative;
          .point {
            position: absolute;
          }
          .play-title {
            color: #0066fffd;
            width: 250px;
            .point {
              left: calc(50% - 370px);
              bottom: -100px;
            }
          }
          .bank-title {
            width: 250px;
            color: #ff0000fd;
            .point {
              right: calc(50% - 370px);
              bottom: -100px;
            }
          }
        }
        .wrap {
            display: flex;
            justify-content: center;
            width: 100%;
            .play-content, .bank-content {
                display: flex;
                flex-direction: column;
                padding: 10px;
                width: 250px;
                justify-content: center;
                .card{
                  min-width: 88px;
                  height: 128px;
                }
                .common-card {
                  display: flex;
                  justify-content: center;
                  .card + .card {
                    margin-left: 40px;
                  }
                }
                .supply-card {
                  display: flex;
                  width: fit-content;
                  align-self: center;
                  transform: rotate(-90deg);
                }
            }
        }
        .resText{
          font-family: 'Noto Serif TC', serif;
          margin-bottom: 20px;
          font-size: 40px;
          font-weight: bold;
          height: 40px;
          text-shadow: -1px 1px 0 #fff, 1px 1px 0 #fff,1px -1px 0 #fff,-1px -1px 0 #fff;
          &.red{
            color: red;
          }
          &.blue{
            color: blue;
          }
          &.green{
            color: green;
          }
        }
    }
}
</style>
