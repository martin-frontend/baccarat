<template>
  <div id="app">
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
import History from './views/history/index.vue'
import Blockchain from './views/blockchain/index.vue'
import Information from './views/information/index.vue'
import OpenCard from './views/open-card/index.vue'
import { getInit } from '@/api/game'

export default {
  name: 'App',
  components: {
    // Baccarat,
    History,
    Blockchain,
    Information,
    OpenCard
  },
  data() {
    return {
    }
  },
  computed: {
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getInit()
        .then(async(response) => {
          await this.$store.dispatch('app/doShuffle')
          await this.$store.dispatch('app/getCards')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
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
