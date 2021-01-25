<template>
  <div class="history">
    <table class="board">
      <tr v-for="(item,i) in boardRow" :key="item">
        <td v-for="(subitem,j) in boardColumn" :key="item+subitem" @mouseenter="showResult(cardsByRound[i+(j*boardRow)])" @mouseleave="closeResult()">
          <div class="ball" :class="getBallColor(boardDataList[i+(j*boardRow)])">
            <p class="text">{{ boardDataList[i+(j*boardRow)] }}</p>
          </div>
        </td>
      </tr>
    </table>
    <table class="result">
      <tr v-for="item in resultList[0]" :key="item.name">
        <td :class="item.color">
          <p class="title">{{ item.name }}</p>
          <p class="text">{{ item.value }}</p>
        </td>
      </tr>
    </table>
    <table class="result">
      <tr v-for="item in resultList[1]" :key="item.name">
        <td :class="item.color">
          <p class="title">{{ item.name }}</p>
          <p class="text">{{ item.value }}</p>
        </td>
      </tr>
    </table>
    <CardResult ref="cardResult" />
  </div>
</template>
<script>
// import { getCards, getInit, doShuffle, doExecute } from '@/api/game'
import { mapGetters } from 'vuex'
import CardResult from './cardResult'
export default {
  name: 'History',
  components: { CardResult },
  data() {
    return {
      boardRow: 8,
      boardColumn: 16,
      boardDataList: [],
      resultList: [
        [
          { name: '閒贏', value: 0, color: 'blue' }, // 0
          { name: '和局', value: 0, color: 'green' }, // 1
          { name: '莊贏', value: 0, color: 'red' }, // 2
          { name: '莊贏(免傭)', value: 0, color: 'pink' }, // 3
          { name: '閒對', value: 0, color: 'blue' }, // 4
          { name: '莊對', value: 0, color: 'red' }, // 5
          { name: '任意對子', value: 0, color: 'chocolate' }, // 6
          { name: '完美對子', value: 0, color: 'chocolate' } // 7
        ],
        [
          { name: '大', value: 0, color: 'brown' }, // 8
          { name: '小', value: 0, color: 'brown' }, // 9
          { name: '閒單', value: 0, color: 'blue' }, // 10
          { name: '閒雙', value: 0, color: 'blue' }, // 11
          { name: '莊單', value: 0, color: 'red' }, // 12
          { name: '莊雙', value: 0, color: 'red' }, // 13
          { name: '超級6', value: 0, color: 'purple' } // 14
        ]
      ],
      currentResult: [],
      resultText: ['閒', '和', '莊'],
      currentIndex: 0
    }
  },
  computed: {
    ...mapGetters(['resultHistory', 'cardsByRound'])
  },
  watch: {
    resultHistory: function(data) {
      console.log(data)
      // console.log(1, data)
      if (data && !data.length) {
        this.init()
      }
      this.currentResult = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (let i = 0; i < data.length; i++) {
        const arr = data[i]
        for (let j = 0; j < this.currentResult.length; j++) {
          if (this.arrContain(arr, j)) {
            // 閒、和、莊 更新左板
            if (j === 0 || j === 1 || j === 2) {
              this.$set(this.boardDataList, i, this.resultText[j])
            }
            this.currentResult[j]++
          }
        }
      }
      for (let i = 0; i < this.currentResult.length; i++) {
        const element = this.currentResult[i]
        const j = i < 8 ? 0 : 1
        const k = i % 8
        // 更新右板
        this.resultList[j][k].value = element
      }
      // console.log(data)
    }
  },
  methods: {
    init() {
      this.boardDataList = []
      for (let i = 0; i < this.boardRow * this.boardColumn; i++) {
        this.boardDataList.push('')
      }
    },
    arrContain(arr, num) {
      return arr.includes(num)
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
    },
    showResult(data) {
      if (!data) return
      const { offsetTop } = event.target
      this.$refs.cardResult.handleOpen(data, offsetTop)
    },
    closeResult() {
      this.$refs.cardResult.handleClose()
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
        position: relative;
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
                &.chocolate{
                    color: chocolate;
                }
                &.brown{
                    color:brown;
                }
                &.purple{
                    color: purple;
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
