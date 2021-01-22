<template>
  <div v-show="group.isInfoVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="handleClose()">&times;</span>
      <div class="info-container">
        <span class="item">ID:{{ group.suitInfo.id }}</span>
        <span class="item">Hash:{{ group.suitInfo.hash }}</span>
        <span class="item">Hash Key:{{ group.suitInfo.hashKey }}</span>
        <span class="item">Poker Machine ID:{{ group.suitInfo.pokerMachineId }}</span>
        <span class="item">Suit:{{ group.suitInfo.suit }}</span>
        <span class="item">Value:{{ group.suitInfo.value }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InfoDialog',
  inject: ['group'],
  methods: {
    handleClose() {
      this.group.isInfoVisible = !this.group.isInfoVisible
    }
  }
}
</script>
<style lang="scss" scoped>
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
    cursor: pointer;
    float: right;
    font-size: 20px;
  }

  .modal-content {
    height: 100%;
    background-color: #a46740;
    margin: auto;
    padding: 30px;
    border: 1px solid #888;
    width: 95%;

    .info-container {
        .item{
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          width: 100%;
          margin: 10px 0;
      }
    }
  }
}
</style>
