<template>
  <div class="main">
    <div class="top">
      <div class="video-outer">
        <video class="video" autoplay muted loop>
          <source src="http://127.0.0.1:8887/baccarat.mp4" type="video/mp4" />
        </video>
        <div class="open-cards">
          <div class="subject">撲克牌</div>
        </div>
        <div class="info">
          <div class="subject">資訊</div>
        </div>
      </div>
    </div>
    <div class="history">
      <div class="title">
        歷史紀錄
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Baccarat',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.main {
  .video-outer {
    max-height: 80vh;
    min-height: 80vh;
    color: rgb(255, 255, 255);
    display: flex;
    position: relative;
    overflow: hidden;
    width: 100%;
    justify-content: space-between;
    .video {
      min-height: 80vh;
      min-width: 100vw;
      position: absolute;
      height: auto;
      width: auto;
      z-index: -1;
    }
    .open-cards,
    .info {
      font-size: 50px;
      height: auto;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;
    }
  }
  .history {
    .title {
      font-size: 4rem;
    }
  }
}
</style>
