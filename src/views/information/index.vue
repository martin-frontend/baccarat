<template>
  <div class="information">
    <p class="ellipsis">帳號：{{ account }}</p>
    <p class="ellipsis">桌號：{{ gameTableId }}</p>
    <p class="ellipsis">局號：{{ gameRoundId }}</p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Information',
  computed: {
    ...mapGetters(['gameTableId', 'account', 'gameRoundId'])
  }
}
</script>
<style lang="scss" scoped>
.information {
  background: rgba($color: #000000, $alpha: 0.6);
  width: 250px;
  // max-height: 250px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 25px;
  // border: 1px solid rgb(32, 32, 28);
  p {
    color: rgb(255, 255, 255);
    font-size: 20px;
    line-height: 1.4;
    text-align: left;
  }
}
</style>
