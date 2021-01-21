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
          <a
            :href="`#${drawAmount}`"
          ><button class="btn" @click="handleFake(true)">開牌數量</button></a>
        </div>
      </div>
      <div class="pluker-container">
        <router-link
          v-for="(item, index) in result"
          :id="index"
          :key="index"
          class="pluker"
        >
          <div
            :class="[
              `${getRandomSuit()} ${handleSuits(getRandomSuit(), item)}`,
              { isFold: index + 1 > drawAmount || isAllFold ? true : false },
            ]"
          ></div>
        </router-link>
      </div>
      <Dialog />
    </div>
  </div>
</template>
<script>
import Dialog from './dialog'
export default {
  name: 'Blockchain',
  components: { Dialog },
  data() {
    return {
      isVisible: false,
      isAllFold: false,
      shuffleText: '洗牌',
      resetText: '重設',
      result: [],
      suitList: ['club', 'diamond', 'heart', 'spade'],
      drawAmount: 155 // 假設開獎數,
    }
  },
  provide() {
    return {
      group: this
    }
  },
  created() {
    this.handleDraw()
  },
  methods: {
    handleDraw() {
      for (let i = 0; i < 416; i++) {
        this.result.push(Math.floor(parseInt(Math.random() * 416) / 52) % 12)
      }
    },
    handleShuffle() {
      this.isAllFold = !this.isAllFold
    },
    handleSuits(suit, number) {
      return `${suit}-${number}`
    },
    handleView(value) {
      this.isVisible = value
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
    .pluker {
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;
      width: 100%;
      // height: auto;
      @each $suitNumber, $suit in $suitsList {
        @for $i from 1 through 13 {
          .#{$suit}-#{$i} {
            margin: 10px 5px;
            border-radius: 10px;
            height: 120px;
            width: 80px;
            background-image: url("../../assets/puker-css-sprites/img/puker.png");
            background-position: (($i - 1) * -80px) ($suitNumber * -120px);
            background-repeat: no-repeat;
          }

          .isFold {
            background-image: url("../../assets/puker-css-sprites/img/puker.png");
            background-position: 0 100%;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
}
</style>
