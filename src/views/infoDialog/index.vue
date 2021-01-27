<template>
  <div v-if="dialogVisible" class="dialog">
    <div class="dialog-content">
      <div class="close" @click="handleClose()">&times;</div>
      <p class="title">卡牌驗證</p>
      <hr />
      <div class="info-container">
        <div class="info-box">
          <div class="img-field">
            <div v-if="!cardInfo.isFirst">
              <p class="text">上一張</p>
              <div class="card">
                <div :class="[`face front noneInfo ${cardInfo.preSuitInfo.suitClass}`, { back: !cardInfo.preSuitInfo.suitClass ? true : false }]"></div>
              </div>
            </div>
          </div>
          <div class="text-field">
            <p v-if="cardInfo.isFirst" class="text">本局資訊</p>
            <p class="text">加密: <br /><span id="prehash">{{ cardInfo.preSuitInfo.hash }}</span> <button class="copyBtn" @click="Copyboard('prehash')"></button></p>
          </div>
        </div>
        <div class="info-box">
          <div class="img-field">
            <p class="text">本張</p>
            <div class="card">
              <div :class="[`face front noneInfo ${cardInfo.suitInfo.suitClass}`, { back: !cardInfo.suitInfo.suitClass ? true : false }]"></div>
            </div>
          </div>
          <div class="text-field">
            <p class="text">花色: <span>{{ cardInfo.suitInfo.suit }} {{ suitText(cardInfo.suitInfo.suit) }}</span></p>
            <p class="text">點數: <span>{{ cardInfo.suitInfo.value }}</span></p>
            <p class="text">加密: <br /><span id="hash">{{ cardInfo.suitInfo.hash }}</span> <button v-if="cardInfo.suitInfo.hash" class="copyBtn" @click="Copyboard('hash')"></button></p>
            <p class="text">加密金鑰: <br /><span id="hashKey">{{ cardInfo.suitInfo.hashKey }}</span> <button v-if="cardInfo.suitInfo.hashKey" class="copyBtn" @click="Copyboard('hashKey')"></button></p>
          </div>
        </div>
        <div v-if="isVaidatable()" class="check-box">
          <div class="textfield">
            <p class="text">驗證規則: HMAC-SHA512( 本回合花色 + 本回合點數 + '-' + 前一回合加密, 本回合加密金鑰) = 本回合加密</p>
          </div>
          <div class="textfield">
            <p class="text">第三方驗證:
              <a class="text result" href="https://www.freeformatter.com/hmac-generator.html" target="_blank">https://www.freeformatter.com/hmac-generator.html</a>
            </p>
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
    }
  },
  data() {
    return {
      validateResult: '',
      validateText: '',
      dialogVisible: false
    }
  },
  watch: {
    cardInfo: {
      handler: function() {
        const suit = this.cardInfo.suitInfo.suit ? this.cardInfo.suitInfo.suit : ''
        const value = this.cardInfo.suitInfo.value ? this.cardInfo.suitInfo.value : ''
        this.validateText = String(suit) +
         String(value) + '-' + String(this.cardInfo.preSuitInfo.hash)
      }
    }
  },
  methods: {
    handleOpen() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
      this.validateResult = ''
    },
    isVaidatable() {
      return this.cardInfo.suitInfo.suit && this.cardInfo.suitInfo.value && this.cardInfo.suitInfo.hashKey
    },
    validate() {
      const sha512 = require('js-sha512')
      const hashKey = this.cardInfo.suitInfo.hashKey ? this.cardInfo.suitInfo.hashKey : ''
      this.validateResult = sha512.hmac(hashKey, this.validateText)
    },
    compareStr(str1, str2) {
      return !str1.localeCompare(str2)
    },
    suitText(value) {
      switch (value) {
        case 1:
          return '(梅花)'
        case 2:
          return '(方塊)'
        case 3:
          return '(愛心)'
        case 4:
          return '(黑桃)'
      }
    },
    Copyboard(id) {
      var TextRange = document.createRange()

      TextRange.selectNode(document.getElementById(id))

      const sel = window.getSelection()

      sel.removeAllRanges()

      sel.addRange(TextRange)

      document.execCommand('copy')
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
  .copyBtn{
    width: 20px;
    height: 20px;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('../../assets/img/link.png');
    cursor: pointer;
    transform: translateY(25%);
    transition: opacity 0.3s ease;
    opacity: 0.6;
    &:hover{
      opacity: 1;
    }
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
     position: relative;
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
