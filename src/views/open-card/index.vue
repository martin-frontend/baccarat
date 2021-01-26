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
      <button :disabled="isLoading || lastRound" class="btn" @click="init()">{{ type }}</button>
      <button :disabled="isLoading || lastRound" class="btn" style="margin-left:10px" @click="init1()">直接開牌</button>
      <div class="title">
        <h1 class="play-title">
          閒
          <span class="point">
            {{ newPlayerPoints }}
          </span>
        </h1>
        <h1 class="bank-title">
          莊
          <span class="point">
            {{ newBankerPoints }}
          </span>
        </h1>
      </div>
      <div class="wrap">
        <div class="play-content">
          <div class="common-card">
            <div class="card" :class="play.length > 0?'active':''">
              <template v-if="play.length > 0">
                <div class="face front" :class="play[0].className" @click="cardInfoClick(0,0)">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
            <div class="card" :class="play.length > 0?'active':''">
              <template v-if="play.length > 0">
                <div class="face front" :class="play[1].className" @click="cardInfoClick(0,1)">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
          </div>
          <div class="supply-card">
            <div class="card" :class="play.length > 2?'active':''">
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
            <div class="card" :class="bank.length > 0?'active':''">
              <template v-if="bank.length > 0">
                <div class="face front" :class="bank[0].className" @click="cardInfoClick(1,0)">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
            <div class="card" :class="bank.length > 0?'active':''">
              <template v-if="bank.length > 0">
                <div class="face front" :class="bank[1].className" @click="cardInfoClick(1,1)">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
          </div>
          <div class="supply-card">
            <div class="card" :class="bank.length > 2?'active':''">
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
      <div style="margin-top: 10px; font-size: 30px"> 結果: {{ final }}</div>
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
      newBankerPoints: null,
      newPlayerPoints: null,
      final: '',
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
    cardInfoClick(firstIndex, secondIndex) {
      const index = this.cards[firstIndex][secondIndex].id - 1
      const suitInfo = this.handleSuitInfo(index)
      const preSuitInfo = this.handleSuitInfo(index - 1)
      suitInfo.suitClass = this.handleSuits(suitInfo.suit, suitInfo.value)
      preSuitInfo.suitClass = this.handleSuits(preSuitInfo.suit, preSuitInfo.value)
      console.log(this.cardsResult)
      this.cardInfo = {
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
        this.timeID1 = setTimeout(() => { // 閒家計算第一次點數
          this.newPlayerPoints = this.countPoint(this.play[0].value, this.play[1].value)
        }, 500)
        this.timeID2 = setTimeout(() => { // 莊家 1000毫秒後翻牌
          this.bank = this.cards[1].slice(0, 2)
          this.timeID3 = setTimeout(() => { // 莊家計算第一次點數
            this.newBankerPoints = this.countPoint(this.bank[0].value, this.bank[1].value)
          }, 500)
        }, 1000)
        let i = 1 // i:計算補牌翻牌時機
        if (this.cards[0][2]) {
          i++
          this.timeID4 = setTimeout(() => { // 閒家補牌 1000*i毫秒後翻牌
            this.play.push(this.cards[0][2])
            this.timeID5 = setTimeout(() => { // 閒家計算最終點數 ( 後台有值就不計算了 )
              this.newPlayerPoints = this.playerPoints
            }, 500)
          }, 1000 * i)
        }
        if (this.cards[1][2]) {
          i++
          this.timeID6 = setTimeout(() => { // 莊家補牌 1000*i毫秒後翻牌
            this.bank.push(this.cards[1][2])
            this.timeID7 = setTimeout(() => { // 莊家計算最終點數 ( 後台有值就不計算了 )
              this.newBankerPoints = this.bankerPoints
            }, 500)
          }, 1000 * i)
        }
        this.timeID8 = setTimeout(() => { // 翻牌結束才resolve
          resolve()
        }, 1000 * i + 800)
      })
    },
    countPoint(firstValue, secondValue) {
      // 牌點數最大為10
      firstValue = firstValue > 10 ? 10 : firstValue
      // 牌點數最大為10
      secondValue = secondValue > 10 ? 10 : secondValue
      // ( 第一張牌 + 第二張牌 ) % 10
      return (firstValue + secondValue) % 10
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
      this.newPlayerPoints = this.playerPoints
      this.newBankerPoints = this.bankerPoints
      this.doResult()
      this.SET_ISLOADING(false)
      if (this.lastRound) {
        setTimeout(() => {
          alert('本局已結束，請重新洗牌')
        }, 1000)
      }
    },
    reset() {
      this.newPlayerPoints = null
      this.newBankerPoints = null
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
  transform-style: preserve-3d;
  &.active {
    transition: transform 1s;
    transform: rotateY(-180deg);
  }
}
.face {
  position: absolute;
}
.front {
  transform: rotateY(180deg);
}
///////////////

.btn {
  width: 80px;
  height: 30px;
  border: 1px solid #000;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  &:disabled {
    color: rgb(165, 161, 161);
    cursor: not-allowed;
  }
}
.open-card {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
        display: inline-block;
        .title {
            display: flex;
            color: white;
            .play-title {
                flex: 1;
                line-height: 36px;
                font-size: 20px;
                background: rgb(47, 47, 250);
            }
            .bank-title {
                flex: 1;
                line-height: 36px;
                font-size: 20px;
                background: rgb(248, 59, 59);
            }
            .point {
              font-size: 20px;
              margin-left: 10px;
            }
        }
        .wrap {
            display: flex;
            .play-content, .bank-content {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                padding: 10px;
                background: rgba($color: #000000, $alpha: .3);
                .common-card {
                    display: flex;
                    .card + .card {
                        margin-left: 10px;
                    }
                }
                .supply-card {
                    display: flex;
                    width: fit-content;
                    align-self: center;
                    transform: rotate(-90deg);
                }
            }
            .play-content {
                border-right: 1px solid rgb(136, 136, 136);
            }
        }
    }
}
</style>
