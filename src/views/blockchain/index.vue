<template>
  <div>
    <div class="blockchain">
      <div class="title-container">
        <div class="title-info">
          <h1 class="title">公開資訊區塊鏈牌組</h1>
          <button class="btn" @click="handleShuffle()">
            {{ isAllFold ? shuffleText : resetText }}
          </button>
          <button class="btn" @click="handleView(true)">檢視</button>
          <a id="position" ref="position" :href="handleDrawAmount()"><button class="btn">開牌數量</button></a>
        </div>
      </div>
      <div class="pluker-container">
        <div
          v-for="(item, index) in cardsResult"
          :id="index+1"
          :key="item.id"
          class="pluker"
        >
          <div class="card">
            <div
              :class="[
                `face front ${handleSuits(item.suit, item.value)}`,
                { back: !item.hashKey ? true : false },
              ]"
              @click="handleInfoclick(item.id,item.suit, item.value)"
            >
            </div>
          </div>
        </div>
      </div>
      <Dialog />
      <info-dialog />
    </div>
  </div>
</template>
<script>
import Dialog from './dialog'
import constants from './constants'
import { mapActions, mapGetters } from 'vuex'
import infoDialog from './infoDialog'

export default {
  name: 'Blockchain',
  components: { Dialog, infoDialog },
  data() {
    return {
      isDialogVisible: false,
      isAllFold: false,
      isInfoVisible: false,
      shuffleText: '洗牌',
      resetText: '重設',
      drawAmount: 0,
      suitList: [{ id: 1, name: 'club' }, { id: 2, name: 'diamond' }, { id: 3, name: 'heart' }, { id: 4, name: 'spade' }],
      constants
    }
  },
  provide() {
    return {
      group: this
    }
  },
  computed: {
    ...mapGetters('app', ['cardsResult', 'cards', 'pokerMachine', 'gameTable'])
  },
  watch: {
    // cardsResult 所有牌的結果 cards 當次開牌的結果
    cards(list) {
      const { cardsResult } = this
      // 塞掉null
      const concatList = list[0].concat(list[1]).filter(a => a)
      concatList.forEach((item) => {
        cardsResult.forEach((element) => {
          if (parseInt(item.id) === parseInt(element.id)) {
            element.suit = item.suit
            element.value = item.value
            element.hashKey = item.hashKey
          }
        })
      })
      this.handlePosition('change', cardsResult.filter((a) => a.suit).length - concatList.length + 1)
    },
    // 初始化
    gameTable: {
      deep: true,
      handler(val) {
        if (val) {
          this.handlePosition('init')
        }
      }
    },
    drawAmount: {
      deep: true,
      handler(val) {
        if (val) {
          setTimeout(() => {
            if (location.hash) {
              const a = document.createElement('a')
              a.href = location.hash
              a.click()
            }
          }, 300)
        }
      }
    }
  },
  created() {
    this.getCards()
  },
  methods: {
    ...mapActions('app', ['getCards']),
    handleShuffle() {
      this.isAllFold = !this.isAllFold
    },
    handleSuits(suit, number) {
      const { constants, suitList } = this
      const suitName = (suitList.filter(a => a.id === suit)[0] || {}).name
      return constants.AllCards.filter(a => a === `puker-${suitName}${number}`)[0]
    },
    handleView(value) {
      this.isDialogVisible = value
    },
    handlePosition(status, nowPosition) {
      const { pokerMachine } = this
      status === 'init' ? this.drawAmount = pokerMachine.cardId : this.drawAmount = nowPosition
      this.$router.push({ path: `#${this.drawAmount}` })
    },
    handleDrawAmount() {
      if (this.drawAmount) {
        return `#${this.drawAmount}`
      }
      return false
    },
    handleInfoclick(id, suit, number) {
      const vm = this
      let all_p = document.querySelectorAll(`.${this.handleSuits(suit, number)}`)
      all_p = Array.prototype.slice.call(all_p)
      const event_list = ['click']
      event_list.forEach(function() {
        all_p.forEach(function() {
          vm.isInfoVisible = true
          vm.suitInfo = vm.handleSuitInfo(id)
        })
      })
    },
    handleSuitInfo(id) {
      return this.cardsResult.filter((a) => a.id === id)[0] || {}
    },
    getRandomSuit() {
      return this.suitList[Math.floor(Math.random() * this.suitList.length)]
    }
  }
}
</script>
<style lang="scss" scoped>
$suitsList: (
  0: "club",
  1: "diamond",
  2: "heart",
  3: "spade",
);
.blockchain {
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin-top: 0;
  margin: auto;
  background-color: #a46740;

  .title-container {
    position: fixed;
    top: 0;
    padding: 5px;
    height: auto;
    max-width: 200px;
    min-height: 100px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    background-color: #a46740;
    .title-info {
      .title {
        font-size: 25px;
        line-height: 35px;
        font-weight: bold;
        padding: 10px 0;
      }

      .btn {
        cursor: pointer;
        background-color: #f44336;
        padding: 5px;
      }

      .btn + .btn {
        margin: 5px;
      }
    }
  }
  .pluker-container {
    margin-top: 200px;
    overflow: auto;
    flex: 1;
    width: 100%;

    .pluker {
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;
      margin: 10px 5px;

      .card{
        position: relative;
      }
    }
  }
}
</style>
