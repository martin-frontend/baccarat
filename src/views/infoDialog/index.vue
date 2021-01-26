<template>
  <div v-if="dialogFormVisible" class="dialog">
    <div class="dialog-content">
      <div class="close" @click="handleClose()">&times;</div>
      <p class="title">卡牌驗證</p>
      <hr />
      <div class="info-container">
        <div class="info-box">
          <div class="img-field">
            <p class="text">上一張</p>
            <div :class="['card',cardInfo.preSuitInfo.suitClass]"></div>
          </div>
          <div class="text-field">
            <p class="text">Hash: <br /><span>{{ cardInfo.preSuitInfo.hash }}</span></p>
          </div>
        </div>
        <div class="info-box">
          <div class="img-field">
            <p class="text">本張</p>
            <div :class="['card',cardInfo.suitInfo.suitClass]"></div>
          </div>
          <div class="text-field">
            <p class="text">Suit: <span>{{ cardInfo.suitInfo.suit }}</span></p>
            <p class="text">Value: <span>{{ cardInfo.suitInfo.value }}</span></p>
            <p class="text">Hash: <br /><span>{{ cardInfo.suitInfo.hash }}</span></p>
            <p class="text">Hash Key: <br /><span>{{ cardInfo.suitInfo.hashKey }}</span></p>
          </div>
        </div>
        <div class="check-box">
          <div class="textfield">
            <p class="text">驗證規則: SHA512( 本回合suit + 本回合value + '-' + 前一回合Hash + 本回合Hash Key) = 本回合Hash</p>
          </div>
          <div class="textfield">
            <input v-model="validateText" type="text" />
            <button @click="validate">驗證</button>
            <div v-if="validateResult">
              <p v-if="compareStr(validateResult,cardInfo.suitInfo.hash)" class="text correct">比對成功</p>
              <p v-else class="text fail">比對失敗</p>
            </div>
          </div>
          <div v-if="validateResult" class="textfield">
            <p class="text result">驗證結果: {{ validateResult }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InfoDialog',
  props: {
    cardInfo: {
      type: Object,
      default: null
    },
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      validateResult: ''
    }
  },
  watch: {
    cardInfo: {
      handler: function() {
        this.validateText = String(this.cardInfo.suitInfo.suit) +
         String(this.cardInfo.suitInfo.value) + '-' + String(this.cardInfo.preSuitInfo.hash)
      }
    }
  },
  methods: {
    handleOpen() {
      this.dialogFormVisible = true
    },
    handleClose() {
      this.dialogFormVisible = false
      this.validateResult = ''
    },
    validate() {
      const sha512 = require('js-sha512')
      this.validateResult = sha512.hmac(this.cardInfo.suitInfo.hashKey, this.validateText)
    },
    compareStr(str1, str2) {
      return !str1.localeCompare(str2)
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog {
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000000d5;
  z-index: 1;

  .close {
    cursor: pointer;
    position: absolute;
    font-size: 50px;
    color: #fff;
    top: 10px;
    right: 30px;

  }

  .dialog-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 30px;
    width: 95%;
    max-width: 1200px;
    .title{
      font-size: 22px;
      color: #fff;
      font-weight: bold;
      margin-bottom: 20px;
    }
    hr{
      border: 0;
      border-top: 1px solid #327edb;
      margin-bottom: 20px;
    }
    .card{
      width: 100%;
      background-size: 100%;
    }
    .info-container {
      .info-box{
        padding: 20px;
        background-color: #575757;
        width: 100%;
        border-radius: 10px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .img-field{
          min-width: 150px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0px 30px;
          .text{
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
          }
        }
        .text-field{
          width: calc(100% - 150px);
          text-align: left;
          padding-left: 0;
          .text{
            margin-bottom: 10px;
            font-size: 18px;
            color: #fff;
            word-break: break-all;
            span{
              color:#00dde0;
            }
            span+br{
              margin-top: 5px;
            }
          }
        }
      }
      .check-box{
        padding: 20px;
        width: 100%;
        .textfield{
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          .text{
            text-align: left;
            font-size: 18px;
            color: #fff;
            word-break: break-all;
            &.result{
              color: #00dde0;
            }
            &.correct{
              font-size: 22px;
              font-weight: bold;
              color: #00cc00;
            }
            &.fail{
              font-size: 22px;
              font-weight: bold;
              color: red;
            }
          }
          input{
            width: 50%;
            margin-right: 10px;
            padding: 5px;
          }
          button{
            width: 150px;
            background-color: #0191FA;
            color: #fff;
            font-size: 16px;
            padding: 10px;
            border-radius: 5px;
            margin-right: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
