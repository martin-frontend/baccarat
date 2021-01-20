<template>
  <div>
    <div class="blockchain">
      <h1 class="title">公開資訊區塊鏈牌組</h1>
      <button class="btn">洗牌</button>
      <button class="btn" @click="handleView(true)">檢視</button>
      <div v-for="(item, index) in 13" :key="index" class="pluker">
        <div :class="`club ${handleSuits('club', item)} `"></div>
        <div :class="`diamond ${handleSuits('diamond', item)}`"></div>
        <div :class="`heart ${handleSuits('heart', item)}`"></div>
        <div :class="`spade ${handleSuits('spade', item)}`"></div>
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
      result: '5,11,7,8'
    }
  },
  provide() {
    return {
      group: this
    }
  },
  methods: {
    handleSuits(suit, number) {
      return `${suit}-${number}`
    },
    handleView(value) {
      this.isVisible = value
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
  overflow: auto;
  height: 100%;
  margin-top: 0;
  background-color: rgb(117, 65, 65);

    .title{
        font-size: 25px;
        line-height: 35px;
        font-weight: bold;
        padding: 10px 0;
    }

  .btn{
      background-color: #f44336;
        padding: 5px;
  }

    .btn + .btn{
        margin: 5px;
    }

  .pluker {
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;
    width: 100%;
    height: auto;
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
      }
    }
  }
}
</style>
