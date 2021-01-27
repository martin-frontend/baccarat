<template>
  <div>
    <div class="blockchain">
      <div class="header-container">
        <div class="title-info">
          <h1 class="title">公開資訊區塊鏈牌組</h1>
          <div class="menu-info">
            <button class="btn" @click="handleShuffle()">洗牌</button>
            <button class="btn" @click="handleView(true)">檢視</button>
          </div>
        </div>
      </div>
      <div class="pluker-container">
        <div
          v-for="(item, index) in cardsResult"
          :id="index + 1"
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
      <Dialog @handleInfoclick="handleInfoclick" />
    </div>
  </div>
</template>
<script>
import Dialog from './dialog'
import constants from '../../utils/constants'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Blockchain',
  components: { Dialog },
  data() {
    return {
      isDialogVisible: false,
      isInfoVisible: false,
      drawAmount: 0,
      result: [],
      suitList: [
        { id: 1, name: 'club' },
        { id: 2, name: 'diamond' },
        { id: 3, name: 'heart' },
        { id: 4, name: 'spade' }
      ],
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
    ...mapGetters(['cardsResult', 'cards', 'pokerMachine', 'gameTable'])
  },
  watch: {
    // cardsResult 所有牌的結果 cards 當次開牌的結果
    cards(list) {
      const { cardsResult } = this
      // 塞掉null
      const concatList = list[0].concat(list[1]).filter((a) => a)
      concatList.forEach((item) => {
        cardsResult.forEach((element) => {
          if (parseInt(item.id) === parseInt(element.id)) {
            element.suit = item.suit
            element.value = item.value
            element.hashKey = item.hashKey
          }
        })
      })
      this.handlePosition(
        'change',
        cardsResult.filter((a) => a.suit).length - concatList.length + 1
      )
    },
    // 初始化
    gameTable: {
      deep: true,
      handler(val) {
        if (val) {
          this.handlePosition('init')
        }
      }
    }
  },
  methods: {
    ...mapActions('app', ['doShuffle']),
    handleShuffle() {
      this.doShuffle()
    },
    handleSuits(suit, number) {
      const { constants } = this
      const suitName = (
        constants.suitList.filter((a) => a.id === suit)[0] || {}
      ).name
      if (
        constants.AllCards.filter(
          (a) => a === `puker-${suitName}${number}`
        )[0] === undefined
      ) {
        return ''
      } else {
        return constants.AllCards.filter(
          (a) => a === `puker-${suitName}${number}`
        )[0]
      }
    },
    handleView(value) {
      this.isDialogVisible = value
    },
    handlePosition(status, nowPosition) {
      const { pokerMachine } = this
      status === 'init'
        ? (this.drawAmount = pokerMachine.cardId)
        : (this.drawAmount = nowPosition)
      this.$router.push({ path: `#${this.drawAmount}` })
      setTimeout(() => {
        if (location.hash) {
          const a = document.createElement('a')
          a.href = location.hash
          a.click()
        }
      }, 300)
    },
    handleInfoclick(index) {
      const suitInfo = this.handleSuitInfo(index)
      const preSuitInfo = this.handleSuitInfo(index - 1)
      suitInfo.suitClass = this.handleSuits(suitInfo.suit, suitInfo.value)
      preSuitInfo.suitClass = this.handleSuits(
        preSuitInfo.suit,
        preSuitInfo.value
      )
      this.cardInfo = {
        isFirst: index === 0,
        suitInfo: suitInfo,
        preSuitInfo: preSuitInfo
      }
      this.$emit('BlockData', this.cardInfo)
    },
    handleSuitInfo(index) {
      if (index === -1) {
        return this.pokerMachine
      }
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
  height: 100vh;
  margin-top: 0;
  margin: auto;
  background-color: #200700;

  .header-container {
    transition: width .28s;
    position: sticky;
    top: 0;
    overflow-y: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #200700;

    .title-info {
      width: 100%;
      color: transparent;
      background-image: linear-gradient(
        to right,
        #462523 0,
        #cb9b51 22%,
        #f6e27a 45%,
        #f6f2c0 50%,
        #f6e27a 55%,
        #cb9b51 78%,
        #462523 100%
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;

      .title {
        font-size: 25px;
        line-height: 35px;
        font-weight: bold;
        padding: 10px 0;
      }

      .menu-info {
        display: flex;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
        .btn {
          font-size: 20px;
          width: 100%;
          cursor: pointer;
          font-weight: bold;
          padding: 5px;
          border-top: 0;
          background-image: linear-gradient(
            to right,
            #462523 0,
            #cb9b51 22%,
            #f6e27a 45%,
            #f6f2c0 50%,
            #f6e27a 55%,
            #cb9b51 78%,
            #462523 100%
          );
          background-size: 100% 1px;
          background-position: 0 100%, 0 100%;
          background-repeat: no-repeat;

          &:hover {
            background-color: rgb(203, 155, 81, 0.5);
          }
        }
      }
    }
  }

  .pluker-container {
    margin-top: 50px;
    z-index: 1;
    overflow: auto;
    flex: 1;
    width: 100%;

    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #99a9bf;
      border-radius: 20px;
    }

    .pluker {
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;
      margin: 10px 5px;

      .card {
        position: relative;
      }
    }
  }
}
</style>
