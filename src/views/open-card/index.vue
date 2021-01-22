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
      <button class="btn" @click="init()">{{ type }}</button>
      <div class="title">
        <h1 class="play-title">
          閒
          <span class="point">
            {{ firstPlayerPoints }}
          </span>
        </h1>
        <h1 class="bank-title">
          莊
          <span class="point">
            {{ firstBankerPoints }}
          </span>
        </h1>
      </div>
      <div class="wrap">
        <div class="play-content">
          <div class="common-card">
            <div class="card" :class="play.length > 0?'active':''">
              <template v-if="play.length > 0">
                <div class="face front" :class="play[0].className">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
            <div class="card" :class="play.length > 0?'active':''">
              <template v-if="play.length > 0">
                <div class="face front" :class="play[1].className">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
          </div>
          <div class="supply-card">
            <div class="card" :class="play.length > 2?'active':''">
              <template v-if="play.length > 2">
                <div class="face front" :class="play[2].className">
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
                <div class="face front" :class="bank[0].className">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
            <div class="card" :class="bank.length > 0?'active':''">
              <template v-if="bank.length > 0">
                <div class="face front" :class="bank[1].className">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
          </div>
          <div class="supply-card">
            <div class="card" :class="bank.length > 2?'active':''">
              <template v-if="bank.length > 2">
                <div class="face front" :class="bank[2].className">
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
import { mapGetters } from 'vuex'
export default {
  name: 'OpenCard',
  data() {
    return {
      play: [],
      bank: [],
      AllCards: [
        'puker-spade1', 'puker-spade2', 'puker-spade3', 'puker-spade4', 'puker-spade5', 'puker-spade6', 'puker-spade7', 'puker-spade8', 'puker-spade9', 'puker-spade10', 'puker-spade11', 'puker-spade12', 'puker-spade13',
        'puker-heart1', 'puker-heart2', 'puker-heart3', 'puker-heart4', 'puker-heart5', 'puker-heart6', 'puker-heart7', 'puker-heart8', 'puker-heart9', 'puker-heart10', 'puker-heart11', 'puker-heart12', 'puker-heart13',
        'puker-diamond1', 'puker-diamond2', 'puker-diamond3', 'puker-diamond4', 'puker-diamond5', 'puker-diamond6', 'puker-diamond7', 'puker-diamond8', 'puker-diamond9', 'puker-diamond10', 'puker-diamond11', 'puker-diamond12', 'puker-diamond13',
        'puker-club1', 'puker-club2', 'puker-club3', 'puker-club4', 'puker-club5', 'puker-club6', 'puker-club7', 'puker-club8', 'puker-club9', 'puker-club10', 'puker-club11', 'puker-club12', 'puker-club13'
      ],
      type: '開牌',
      randomArr: [],
      cardName: ['', 'puker-club', 'puker-diamond', 'puker-heart', 'puker-spade'],
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
      final: ''
    }
  },
  computed: {
    ...mapGetters(['bankerPoints', 'cards', 'playerPoints', 'result'])
  },
  mounted() {
  },
  methods: {
    async init() {
      this.reset()
      let isShuffle = false
      await this.$store.dispatch('app/doExecute').catch(async(res) => {
        await this.$store.dispatch('app/doShuffle')
        await this.$store.dispatch('app/getCards')
        isShuffle = true
        alert('重新洗牌')
        return
      })
      if (!isShuffle) {
        const a = new Promise((resolve, reject) => {
          this.play = this.cards[0].slice(0, 2)
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
          this.timeID8 = setTimeout(() => {
            resolve()
          }, 1000 * i + 800)
        })
        await a
        if (!this.timeID1) return
        this.final = `${this.bankerPoints > this.playerPoints ? '莊贏' : this.bankerPoints === this.playerPoints ? '和局' : '閒贏'}`
      }
    },
    reset() {
      this.firstPlayerPoints = null
      this.firstBankerPoints = null
      this.randomArr = []
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
    },
    randomData() {
      const arr = []
      for (let i = 0; i < 52; i++) { // 一個從0到52的陣列
        arr.push(i)
      }
      arr.sort(function() { // 隨機打亂這個陣列
        return Math.random() - 0.5
      })
      arr.length = 6
      // arr.length = this.getRandom(4, 6) // 改寫長度
      this.randomArr = arr
    },
    // 產生min到max之間的亂數
    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
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
                    justify-content: center;
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
