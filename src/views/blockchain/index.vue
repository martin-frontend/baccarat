<template>
  <div class="blockchain">
    <!-- <div class="puker"></div> -->
    <div v-for="(item, index) in 13" :key="index" class="pluker">
      <div :class="`club ${handleSuits('club', item)}`"></div>
      <div :class="`diamond ${handleSuits('diamond', item)}`"></div>
      <div :class="`heart ${handleSuits('heart', item)}`"></div>
      <div :class="`spade ${handleSuits('spade', item)}`"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Blockchain',
  methods: {
    handleSuits(suit, number) {
      return `${suit}-${number}`
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
  .pluker {
    width: 100%;
    height: auto;
    @each $suitNumber, $color in $suitsList {
      @for $i from 1 through 13 {
        .#{$color}-#{$i} {
          margin: 10px 5px;
          border-radius: 10px;
          height: 120px;
          width: 85px;
          background-image: url("../../assets/puker-css-sprites/img/puker.png");
          background-position: (($i - 1) * -80px) ($suitNumber * -120px);
          background-repeat: no-repeat;
        }
      }
    }
  }
}
</style>
