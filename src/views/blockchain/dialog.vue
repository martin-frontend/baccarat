<template>
  <div v-show="group.isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="handleClose()">&times;</span>
      <div class="pluker">
        <div v-for="(item, index) in 13" :key="index">
          <div
            :class="[
              `club ${handleSuits('club', item)} `,
              { isFold: handleResult(item) ? true : false },
            ]"
          ></div>
          <div
            :class="[
              `diamond ${handleSuits('diamond', item)}`,
              { isFold: handleResult(item) ? true : false },
            ]"
          ></div>
          <div
            :class="[
              `heart ${handleSuits('heart', item)}`,
              { isFold: handleResult(item) ? true : false },
            ]"
          ></div>
          <div
            :class="[
              `spade ${handleSuits('spade', item)}`,
              { isFold: handleResult(item) ? true : false },
            ]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Dialog',
  inject: ['group'],
  data() {
    return {
      isFold: false,
      result: [1, 5, 11]
    }
  },
  methods: {
    handleSuits(suit, number) {
      return `${suit}-${number}`
    },
    handleClose() {
      this.group.isVisible = !this.group.isVisible
    },
    handleResult(number) {
      return this.result.filter((a) => a === number).length
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
  overflow: auto;
  height: 100%;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  .close {
    float: right;
    font-size: 20px;
  }

  .modal-content {
    background-color: #a46740;
    margin: auto;
    padding: 30px;
    border: 1px solid #888;
    width: 95%;
  }

  .pluker {
    display: flex;
    justify-content: center;
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
          background-position: (($i - 1) * 8.333%) ($suitNumber * 25%);
          background-repeat: no-repeat;
        }
      }
    }

    .isFold {
      background-image: url("../../assets/puker-css-sprites/img/puker.png");
      background-position: 0 100%;
      background-repeat: no-repeat;
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

/* Modal Content */
</style>
