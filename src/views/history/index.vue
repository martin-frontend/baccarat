<template>
  <div class="history">
    <table class="board">
      <tr v-for="(item,i) in boardRow" :key="item">
        <td v-for="(subitem,j) in boardColumn" :key="item+subitem">{{ boardDataList[i+(j*boardRow)] }}</td>
      </tr>
    </table>
    <table class="result">
      <tr v-for="item in resultList" :key="item">
        <td>
          <p class="title">{{ item.name }}</p>
          <p class="text">{{ item.value }}</p>
        </td>
      </tr>
    </table>
    <button class="testBtn" @click="OnTest">測試按鈕</button>
  </div>
</template>
<script>
export default {
  name: 'History',
  data() {
    return {
      boardRow: 8,
      boardColumn: 20,
      boardDataList: [],
      resultList: [
        { name: '莊', value: 0 },
        { name: '閒', value: 0 },
        { name: '和', value: 0 },
        { name: '莊對', value: 0 },
        { name: '閒對', value: 0 },
        { name: '總數', value: 0 },
        { name: '莊即贏', value: 0 },
        { name: '閒即贏', value: 0 }
      ],
      ruaultText: ['莊', '閒', '合'],
      currentIndex: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      for (let i = 0; i < this.boardRow * this.boardColumn; i++) {
        this.boardDataList.push(i)
      }
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
