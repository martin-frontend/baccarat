<template>
  <div>
    <!-- <Baccarat msg="Welcome to Your Vue.js App"/> -->

    <div class="container">
      <div class="left">
        <div class="top">
          <OpenCard @OpenCardData="OpenCardData" />
          <Information />
        </div>
        <div class="bottom">
          <History />
        </div>
      </div>
      <div class="right">
        <Blockchain @BlockData="BlockData" />
      </div>
      <InfoDialog ref="infoDialog" :card-info="cardInfo" />
    </div>
  </div>
</template>
<script>
// import Baccarat from './components/Baccarat.vue'
import History from './history/index.vue'
import Blockchain from './blockchain/index.vue'
import Information from './information/index.vue'
import OpenCard from './open-card/index.vue'
import InfoDialog from './infoDialog/index.vue'
export default {
  name: 'Home',
  components: {
    History,
    Blockchain,
    Information,
    OpenCard,
    InfoDialog
  },
  data() {
    return {
      cardInfo: {}
    }
  },
  mounted() {
    this.$store.dispatch('app/getInit')
  },
  methods: {
    BlockData(data) {
      this.cardInfo = Object.assign(data)
      this.$refs.infoDialog.handleOpen()
    },
    OpenCardData(data) {
      this.cardInfo = Object.assign(data)
      this.$refs.infoDialog.handleOpen()
    }
  }
}
</script>
<style lang="scss" scoped>
body {
  margin: 0;
}
.container {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #000;
  .left {
    display: flex;
    flex-direction: column;
    flex:1;
    border-right: 1px solid #000;
    .top {
      display: flex;
      height: 100%;
      border-bottom: 1px solid #000;
      position: relative;
    }
  }
  .right {
    flex: auto 0 0 ;
    z-index: 1;
  }
}
</style>
