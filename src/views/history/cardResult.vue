<template>
  <div v-if="isOpened" :style="{top}" class="card-result">
    <div class="content">
      <div class="title">
        <h1 class="play-title">
          閒
          <span class="point">
            {{ playerPoints }}
          </span>
        </h1>
        <h1 class="bank-title">
          莊
          <span class="point">
            {{ bankerPoints }}
          </span>
        </h1>
      </div>
      <div class="wrap">
        <div class="play-content">
          <div class="common-card">
            <div class="card">
              <template v-if="cards[0].length > 0">
                <div class="face front" :class="cards[0][0].className">
                </div>
              </template>
            </div>
            <div class="card">
              <template v-if="cards[0].length > 0">
                <div class="face front" :class="cards[0][1].className">
                </div>
              </template>
            </div>
          </div>
          <div class="supply-card">
            <div class="card">
              <template v-if="cards[0][2]">
                <div class="face front" :class="cards[0][2].className">
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="bank-content">
          <div class="common-card">
            <div class="card">
              <template v-if="cards[1].length > 0">
                <div class="face front" :class="cards[1][0].className">
                </div>
              </template>
            </div>
            <div class="card">
              <template v-if="cards[1].length > 0">
                <div class="face front" :class="cards[1][1].className">
                </div>
              </template>
            </div>
          </div>
          <div class="supply-card">
            <div class="card">
              <template v-if="cards[1][2]">
                <div class="face front" :class="cards[1][2].className">
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="result">
        <span :class="getBallColor()">{{ final }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardResult',
  data() {
    return {
      isOpened: false,
      top: 0,
      bankerPoints: 0,
      cards: [],
      playerPoints: 0,
      final: ''
    }
  },
  methods: {
    handleOpen(data, top) {
      const { bankerPoints, cards, playerPoints } = data
      const cardName = this.$store.state.app.cardName
      cards[0].forEach(element => {
        if (element) { element['className'] = `${cardName[element.suit]}${element.value}` }
      })
      cards[1].forEach(element => {
        if (element) { element['className'] = `${cardName[element.suit]}${element.value}` }
      })
      this.bankerPoints = bankerPoints
      this.cards = cards
      this.playerPoints = playerPoints
      this.isOpened = true
      this.top = (top - 400) + 'px'
      this.doResult()
    },
    handleClose() {
      this.isOpened = false
    },
    reset() {
      this.bankerPoints = 0
      this.cards = []
      this.playerPoints = 0
    },
    doResult() {
      this.final = this.bankerPoints > this.playerPoints ? '莊贏' : this.bankerPoints === this.playerPoints ? '和局' : '閒贏'
    },
    getBallColor() {
      switch (this.final) {
        case '莊贏':
          return 'red'
        case '閒贏':
          return 'blue'
        case '和局':
          return 'green'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.card-result {
  position: absolute;
  left: 0;
  .content {
      display: inline-block;
      .title {
          display: flex;
          color: white;
          .play-title {
              flex: 1;
              line-height: 36px;
              font-size: 20px;
              background: rgb(47, 47, 250);
          }
          .bank-title {
              flex: 1;
              line-height: 36px;
              font-size: 20px;
              background: rgb(248, 59, 59);
          }
          .point {
            font-size: 20px;
            margin-left: 10px;
          }
      }
      .wrap {
        display: flex;
        .play-content, .bank-content {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 10px;
          background: rgba($color: #000000, $alpha: .8);
          .common-card {
            display: flex;
            .card + .card {
              margin-left: 10px;
            }
          }
          .supply-card {
            display: flex;
            justify-content: center;
            transform: rotate(-90deg);
          }
        }
        .play-content {
          border-right: 1px solid rgb(136, 136, 136);
        }
      }
      .result {
        padding: 20px 0;
        font-size: 30px;
        background: rgba($color: #000000, $alpha: .8);
        color: white;
        span {
          padding: 10px;
          background: blue;
          &.blue {
            background: rgb(47, 47, 250);
          }
          &.red {
            background: rgb(248, 59, 59);
          }
          &.green{
            background-color: green;
          }
        }
      }
  }
}
.front::after {
  display: none !important;
}
</style>
