<template>
  <div>
    <!-- <Baccarat msg="Welcome to Your Vue.js App"/> -->

    <div class="container">
      <div class="left">
        <div class="top">
          <OpenCard />
          <Information />
        </div>
        <div class="bottom">
          <History />
        </div>
      </div>
      <div class="right">
        <Blockchain />
      </div>
    </div>
  </div>
</template>
<script>
// import Baccarat from './components/Baccarat.vue'
import History from './history/index.vue'
import Blockchain from './blockchain/index.vue'
import Information from './information/index.vue'
import OpenCard from './open-card/index.vue'
export default {
  name: 'Home',
  components: {
    History,
    Blockchain,
    Information,
    OpenCard
  },
  data() {
    return {

    }
  },
  mounted() {
    this.$store.dispatch('app/getInit')
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
  .left {
    display: flex;
    flex-direction: column;
    width: 90%;
    border-right: 1px solid #000;
    .top {
      display: flex;
      height: 100%;
      border-bottom: 1px solid #000;
    }
    .bottom {
    }
  }
  .right {
    flex: 1;
  }
}
</style>
