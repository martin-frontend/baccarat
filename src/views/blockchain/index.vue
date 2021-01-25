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
          :id="index"
          :key="item.id"
          class="pluker"
        >
          <div class="card">
            <div
              :class="[
                `face front ${handleSuits(item.suit, item.value)}`,
                { back: !item.hashKey ? true : false },
              ]"
              @click="handleInfoclick(index)"
            ></div>
          </div>
        </div>
      </div>
      <Dialog />
      <info-dialog ref="infoDialog" :card-info="cardInfo" />
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
      result: [],
      suitList: [{ id: 1, name: 'club' }, { id: 2, name: 'diamond' }, { id: 3, name: 'heart' }, { id: 4, name: 'spade' }],
      constants,
      cardInfo: {}
    }
  },
  provide() {
    return {
      group: this
    }
  },
  computed: {
    ...mapGetters('app', ['cardsResult', 'cards', 'pokerMachine'])
  },
  watch: {
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
      this.handlePosition()
    },
    drawAmount(val) {
      if (val) {
        this.handleSimulate()
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
    handlePosition() {
      this.drawAmount = this.cardsResult.filter(a => a.suit).length
      this.$router.push({ path: `#${this.drawAmount}` })
    },
    handleDrawAmount() {
      return `#${this.drawAmount}`
    },
    handleSimulate() {
      document.querySelector('#position').click()
    },
    // handleInfoclick(id, suit, number) {
    //   const vm = this
    //   let all_p = document.querySelectorAll(`.${this.handleSuits(suit, number)}`)
    //   all_p = Array.prototype.slice.call(all_p)
    //   const event_list = ['click']
    //   event_list.forEach(function() {
    //     all_p.forEach(function() {
    //       vm.isInfoVisible = true
    //       vm.suitInfo = vm.handleSuitInfo(id)
    //     })
    //   })
    // },
    handleInfoclick(index) {
      const suitInfo = this.handleSuitInfo(index)
      const preSuitInfo = this.handleSuitInfo(index - 1)
      suitInfo.suitClass = this.handleSuits(suitInfo.suit, suitInfo.value)
      preSuitInfo.suitClass = this.handleSuits(preSuitInfo.suit, preSuitInfo.value)
      this.cardInfo = {
        suitInfo: suitInfo,
        preSuitInfo: preSuitInfo
      }
      this.$refs.infoDialog.handleOpen()
    },
    handleSuitInfo(index) {
      if (index === -1) { return this.pokerMachine }
      return this.cardsResult[index]
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
