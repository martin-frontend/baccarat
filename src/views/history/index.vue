<template>
  <div class="history">
    <table class="board">
      <tr v-for="(item,i) in boardRow" :key="item">
        <td v-for="(subitem,j) in boardColumn" :key="item+subitem">
          <div class="ball" :class="getBallColor(boardDataList[i+(j*boardRow)])">
            <p class="text">{{ boardDataList[i+(j*boardRow)] }}</p>
          </div>
        </td>
      </tr>
    </table>
    <table class="result">
      <tr v-for="item in resultList" :key="item.name">
        <td :class="item.color">
          <p class="title">{{ item.name }}</p>
          <p class="text">{{ item.value }}</p>
        </td>
      </tr>
    </table>
    <button class="testBtn" @click="OnTest">測試按鈕</button>
    <button class="testBtn" @click="Shuffle">洗牌</button>
    <button class="testBtn" @click="Execute">開牌</button>
    <button class="testBtn" @click="Card">取得牌組</button>
  </div>
</template>
<script>
import { getCards, getInit, doShuffle, doExecute } from '@/api/game'

export default {
  name: 'History',
  data() {
    return {
      boardRow: 8,
      boardColumn: 20,
      boardDataList: [],
      resultList: [
        { name: '莊', value: 0, color: 'red' },
        { name: '閒', value: 0, color: 'blue' },
        { name: '和', value: 0, color: 'green' },
        { name: '莊對', value: 0, color: 'pink' },
        { name: '閒對', value: 0, color: 'blue' },
        { name: '總數', value: 0, color: 'brown' },
        { name: '莊即贏', value: 0, color: 'brown' },
        { name: '閒即贏', value: 0, color: 'brown' }
      ],
      ruaultText: ['莊', '閒', '和'],
      currentIndex: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // getInit()
      //   .then((response) => {
      //     console.log(1, response)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
      for (let i = 0; i < this.boardRow * this.boardColumn; i++) {
        this.boardDataList.push(i)
      }
    },
    Shuffle() {
      // doShuffle()
      //   .then((response) => {
      //     console.log(response)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
    },
    Card() {
      // getCards()
      //   .then((response) => {
      //     console.log(response)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
    },
    Execute() {
      // doExecute()
      //   .then((response) => {
      //     console.log(response)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
    },
    OnTest() {
      const resultNum = this.getRandomInt(3)
      switch (resultNum) {
        case 0:
          this.resultList[0].value++
          break
        case 1:
          this.resultList[1].value++
          break
        case 2:
          this.resultList[2].value++
          break
      }
      this.resultList[5].value++
      this.$set(this.boardDataList, this.currentIndex, this.ruaultText[resultNum])
      this.currentIndex++
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max))
    },
    getBallColor(text) {
      switch (text) {
        case '莊':
          return 'red'
        case '閒':
          return 'blue'
        case '和':
          return 'green'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    .history{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-end;
        .board{
            border: 1px solid #000;
            border-collapse: collapse;
            td {
                border:1px solid #000;
                width: 30px;
                height: 30px;
                .ball{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    background-color: gray;
                    &.red{
                        background-color: red;
                    }
                    &.green{
                        background-color: green;
                    }
                    &.blue{
                        background-color: blue;
                    }
                    .text{
                        color: white;
                    }
                }
            }
        }
        .result{
            border: 0px solid #000;
            border-collapse: collapse;
            tr{
                border:1px solid #000;
                border-left: 0;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                height: 30px;
            }
            td {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 5px;
                width: 120px;
                font-weight: bold;
                &.red{
                    color: red;
                }
                &.green{
                    color: green;
                }
                &.blue{
                    color: blue;
                }
                &.pink{
                    color: deeppink;
                }
                &.brown{
                    color: chocolate;
                }
            }
        }
        .testBtn{
            width: 100px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #000;
            border-radius: 10px;
            margin-left: 30px;
            cursor: pointer;
        }
    }
</style>
