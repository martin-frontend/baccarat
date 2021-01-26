<template>
  <div v-show="group.isDialogVisible" class="modal">
    <div class="modal-content">
      <span class="header-container" @click="handleClose()">
        <div class="close"></div>
      </span>
      <div class="pluker-container">
        <div v-for="item in cardsResult" :key="item.id" class="pluker">
          <div class="cardNumber">{{ item.id }}</div>
          <div class="card">
            <div
              data-info="i"
              :class="[
                `face front ${handleSuits(item.suit, item.value)}`,
                { back: !item.hashKey ? true : false },
              ]"
              @click="handleInfoclick(item.id)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import constants from './constants'
import { mapGetters } from 'vuex'

export default {
  name: 'Dialog',
  inject: ['group'],
  data() {
    return {
      isFold: false,
      result: [1, 5, 11],
      suitInfo: {},
      constants
    }
  },
  computed: {
    ...mapGetters(['cardsResult', 'cards'])
  },
  methods: {
    handleSuits(suit, number) {
      const { constants } = this
      const suitName = (
        constants.suitList.filter((a) => a.id === suit)[0] || {}
      ).name
      return constants.AllCards.filter(
        (a) => a === `puker-${suitName}${number}`
      )[0]
    },
    handleClose() {
      this.group.isDialogVisible = !this.group.isDialogVisible
    },
    handleResult(number) {
      return this.result.filter((a) => a === number).length
    },
    handleInfoclick(id) {
      this.group.isInfoVisible = true
      this.group.suitInfo = this.handleSuitInfo(id)
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

.modal {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 1250px;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  overflow: auto;

  .modal-content {
    background-color: #a46740;
    border: 1px solid #888;
    width: 1250px;
    min-width: 1250px;
    height: 90%;
    overflow: auto;

    .header-container {
      position: fixed;
      width: 1231px;
      z-index: 1;
      background-color: #a46740;
      height: 30px;
      cursor: pointer;
      display: flex;
      justify-content: flex-end;
      font-size: 20px;
      padding: 5px 10px;

      .close{
        &::before{
          content: "X";
        }
      }
    }
  }

  .pluker-container {
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    padding: 30px;
    .pluker {
      display: inline-block;
      margin: 5px;

      .card {
        position: relative;
      }

      .cardNumber {
        display: flex;
        justify-content: center;
        color: #fff;
        padding-bottom: 5px;
        font-size: 15px;
      }
    }
  }

  .title {
    font-size: 25px;
    line-height: 35px;
    font-weight: bold;
    padding: 10px 0;
  }

  .btn {
    background-color: #f44336;
    padding: 5px;
  }

  .btn + .btn {
    margin: 5px;
  }
}
</style>
