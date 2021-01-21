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
        <h1 class="play-title">閒</h1>
        <h1 class="bank-title">莊</h1>
      </div>
      <div class="wrap">
        <div class="play-content">
          <div class="common-card">
            <div class="card" :class="play.length > 0?'active':''">
              <template v-if="play.length > 0">
                <div class="face front" :class="AllCards[play[0]]">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
            <div class="card" :class="play.length > 0?'active':''">
              <template v-if="play.length > 0">
                <div class="face front" :class="AllCards[play[1]]">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
          </div>
          <div class="supply-card">
            <div class="card" :class="play.length > 2?'active':''">
              <template v-if="play.length > 2">
                <div class="face front" :class="AllCards[play[2]]">
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
                <div class="face front" :class="AllCards[bank[0]]">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
            <div class="card" :class="bank.length > 0?'active':''">
              <template v-if="bank.length > 0">
                {{ bank[1] }}
                <div class="face front" :class="AllCards[bank[1]]">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
          </div>
          <div class="supply-card">
            <div class="card" :class="bank.length > 2?'active':''">
              <template v-if="bank.length > 2">
                {{ bank[2] }}
                <div class="face front" :class="AllCards[bank[2]]">
                </div>
                <div class="face back">
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
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
      cardName: ['puker-spade', 'puker-heart', 'puker-diamond', 'puker-club'],
      timeID1: 0,
      timeID2: 0,
      timeID3: 0
    }
  },
  computed: {
    ...mapGetters(['bankerPoints', 'cards', 'playerPoints', 'result'])
  },
  mounted() {
  },
  methods: {
    init() {
      this.reset()
      this.$store.dispatch('app/doExecute')
      // clearTimeout(this.timeID1)
      // clearTimeout(this.timeID2)
      // clearTimeout(this.timeID3)
      // if (this.randomArr.length !== 0) {
      //   this.reset()
      // } else {
      //   this.type = 'reset'
      //   this.randomData()
      //   // setTimeout(() => {}, 1500)
      //   this.play = this.randomArr.slice(0, 2)
      //   this.timeID1 = setTimeout(() => {
      //     this.bank = this.randomArr.slice(2, 4)
      //   }, 1000)
      //   // if (this.randomArr.length > 4) { this.play.push(this.randomArr[4]) }
      //   if (this.randomArr.length > 4) {
      //     this.timeID2 = setTimeout(() => {
      //       this.play.push(this.randomArr[4])
      //     }, 2000)
      //   }
      //   // if (this.randomArr.length > 5) { this.bank.push(this.randomArr[5]) }
      //   if (this.randomArr.length > 5) {
      //     this.timeID3 = setTimeout(() => {
      //       this.bank.push(this.randomArr[5])
      //     }, 3000)
      //   }
      // }
    },
    reset() {
      this.randomArr = []
      this.play = []
      this.bank = []
      this.type = '開牌'
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
                background: blue;
            }
            .bank-title {
                flex: 1;
                line-height: 36px;
                font-size: 20px;
                background: red;
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
