<template>
  <div class="open-card">
    <!-- open-card
        <div class="card">
            <div class="face front puker-spade1">
            </div>
        </div>
        <div class="card">
            <div class="face back">
            </div>
        </div> -->
    <div class="content">
      <div class="title">
        <h1 class="play-title">閒</h1>
        <h1 class="bank-title">莊</h1>
      </div>
      <div class="wrap">
        <div class="play-content">
          <div class="common-card">
            <div class="card">
              <div class="face front puker-spade1">
              </div>
            </div>
            <div class="card">
              <div class="face front puker-spade2">
              </div>
            </div>
          </div>
          <div class="supply-card">
            <div class="card">
              <div class="face front puker-spade3">
              </div>
            </div>
          </div>
        </div>
        <div class="bank-content">
          <div class="common-card">
            <div class="card">
              <div class="face front puker-heart1">
              </div>
            </div>
            <div class="card">
              <div class="face front puker-heart2">
              </div>
            </div>
          </div>
          <div class="supply-card">
            <div class="card">
              <div class="face front puker-heart7">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OpenCard',
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.open-card {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
        display: inline-block;
        .title {
            display: flex;
            color: white;
            .play-title {
                flex: 1;
                line-height: 36px;
                font-size: 20px;
                background: blue;
            }
            .bank-title {
                flex: 1;
                line-height: 36px;
                font-size: 20px;
                background: red;
            }
        }
        .wrap {
            display: flex;
            .play-content, .bank-content {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                padding: 10px;
                background: rgba($color: #000000, $alpha: .3);
                .common-card {
                    display: flex;
                    .card + .card {
                        margin-left: 10px;
                    }
                }
                .supply-card {
                    display: flex;
                    justify-content: center;
                    height: 80px;
                    margin-top: 10px;
                    .card {
                        transform: rotate(90deg);
                        margin-top: -20px;
                    }
                }
            }
            .play-content {
                border-right: 1px solid rgb(136, 136, 136);
            }
        }
    }
}
</style>
