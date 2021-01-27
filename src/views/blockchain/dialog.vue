<template>
  <div v-show="group.isDialogVisible" class="modal">
    <div class="modal-content">
      <span class="header-container">
        <div class="close" @click="handleClose()">&times;</div>
      </span>
      <div class="pluker-container">
        <div v-for="(item,index) in cardsResult" :key="item.id" class="pluker">
          <div class="cardNumber">{{ item.id }}</div>
          <div class="card">
            <div
              data-info="i"
              :class="[
                `face front ${handleSuits(item.suit, item.value)}`,
                { back: !item.hashKey ? true : false },
              ]"
              @click="handleInfoclick(index)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import constants from '../../utils/constants'
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
    handleInfoclick(index) {
      this.$emit('handleInfoclick', index)
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
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: auto;

  .modal-content {
    background-color: #00000093;
    border: 1px solid #888;
    width: 60%;
    height: 90%;
    overflow: auto;
    position: relative;
    .header-container {
      position: fixed;
      width: calc(60% - 20px);
      z-index: 1;
      height: 30px;
      display: flex;
      justify-content: flex-end;
      font-size: 20px;
      padding: 5px 10px;

      .close{
        position: absolute;
        top: 15px;
        right: 30px;
        cursor: pointer;
        font-size: 50px;
        color: #fff;
      }
    }
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
  }

  .pluker-container {
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    padding: 30px 0;
    padding-left: 60px;
    padding-right: 40px;
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
