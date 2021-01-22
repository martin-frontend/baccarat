<template>
  <div v-show="group.isDialogVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="handleClose()">&times;</span>
      <div class="pluker-container">
        <div v-for="(item, index) in cardsResult" :key="index" class="pluker">
          <div class="card">
            <div
              data-info="i"
              :class="[
                `face front ${handleSuits(item.suit, item.value)}`,
                { back: !item.hashKey ? true : false },
              ]"
              @click="handleInfoclick(item.id,item.suit, item.value)"
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
    ...mapGetters('app', ['cardsResult', 'cards'])
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
    handleInfoclick(id, suit, number) {
      const vm = this
      let all_p = document.querySelectorAll(`.${this.handleSuits(suit, number)}`)
      all_p = Array.prototype.slice.call(all_p)
      const event_list = ['click']
      event_list.forEach(function() {
        all_p.forEach(function() {
          vm.group.isInfoVisible = true
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
  .close {
    cursor: pointer;
    float: right;
    font-size: 20px;
  }

  .modal-content {
    background-color: #a46740;
    padding: 30px;
    border: 1px solid #888;
    width: 1250px;
    min-width: 1250px;
    height: 90%;
    overflow: auto;
  }

  .pluker-container {
    display: inline-block;
    text-align: left;
    .pluker {
      display: inline-block;
      margin: 5px;

      .card {
        position: relative;
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
