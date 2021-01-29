import { doExecute, doShuffle, getInit } from '@/api/game'
import initData from '../../../init.json'
import executeData from '../../../execute.json'
var cloneDeep = require('lodash.clonedeep')
const state = {
  cards: [],
  result: [],
  cardsResult: [],
  resultHistory: [],
  cardsByRound: [],
  cardName: ['', 'puker-club', 'puker-diamond', 'puker-heart', 'puker-spade'],
  pokerMachine: {},
  gameTable: {},
  bankerPoints: 0,
  playerPoints: 0,
  lastRound: false,
  isLoading: true,
  account: '',
  gameTableId: '',
  gameRoundId: '',
  index: 0
}

const mutations = {
  SET_DATA: (state, data) => {
    const { bankerPoints, cards, playerPoints, result, lastRound, gameRoundId } = data
    state.bankerPoints = bankerPoints
    cards[0].forEach(element => {
      if (element) { element['className'] = `${state.cardName[element.suit]}${element.value}` }
    })
    cards[1].forEach(element => {
      if (element) { element['className'] = `${state.cardName[element.suit]}${element.value}` }
    })
    state.cards = cards
    state.playerPoints = playerPoints
    state.result = result
    state.resultHistory.push(result)
    state.lastRound = lastRound
    state.cardsByRound.push(data)
    state.gameRoundId = gameRoundId
  },
  SET_CARDS_RESULT: (state, data) => {
    state.cardsResult = data.cards
    state.pokerMachine = data.pokerMachine
    state.gameTable = data.gameTable
  },
  SET_CARDS_BY_ROUND: (state, data) => {
    state.cardsByRound = data
  },
  SET_RESULT_HISTORY: (state, data) => {
    state.resultHistory = data
  },
  SET_LAST_ROUND: (state, data) => {
    state.lastRound = data
  },
  SET_CARDS_STATUS: (state, data) => {
    state.cardsResult = data
  },
  SET_ISLOADING: (state, data) => {
    state.isLoading = data
  },
  SET_USER: (state, data) => {
    const { account, gameTableId } = data
    state.account = account
    state.gameTableId = gameTableId
  },
  SET_GAMEROUNDID: (state, data) => {
    state.gameRoundId = data
  },
  ADD_INDEX: (state) => {
    state.index++
  },
  SET_INDEX: (state) => {
    state.index = 0
  }
}

const actions = {
  getInit({ commit }) {
    return new Promise((resolve, reject) => {
      // getInit({ account: 'player' }).then(({ data }) => {
      const refresh = cloneDeep(initData)
      commit('SET_CARDS_RESULT', refresh)
      commit('SET_USER', refresh.user)
      const cardDataList = refresh.results
      if (cardDataList.length > 0) {
        const resultList = []
        const cardsByRound = []
        cardDataList.forEach(element => {
          const data = JSON.parse(element.result)
          cardsByRound.push(data)
          resultList.push(data.result)
        })
        commit('SET_CARDS_BY_ROUND', cardsByRound)
        commit('SET_RESULT_HISTORY', resultList)

        // 解析lastRound
        const lastCardData = cardDataList[cardDataList.length - 1]
        const lastRound = JSON.parse(lastCardData.result).lastRound
        if (lastRound) {
          setTimeout(() => {
            alert('本局已結束，請重新洗牌')
          }, 500)
        }
        commit('SET_LAST_ROUND', lastRound)
      }
      commit('SET_ISLOADING', false)
      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },
  doExecute({ state, commit }) {
    return new Promise((resolve, reject) => {
      // doExecute().then((response) => {
      const data = executeData[state.index]
      commit('ADD_INDEX')
      commit('SET_DATA', data)
      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },
  doShuffle({ commit }) {
    commit('SET_ISLOADING', true)
    return new Promise((resolve, reject) => {
      // doShuffle().then(({ data }) => {
      setTimeout(() => {
        const refresh = cloneDeep(initData)
        commit('SET_CARDS_RESULT', refresh)
        commit('SET_RESULT_HISTORY', [])
        commit('SET_CARDS_BY_ROUND', [])
        commit('SET_GAMEROUNDID', '')
        commit('SET_LAST_ROUND', false)
        commit('SET_ISLOADING', false)
        commit('SET_INDEX')
        resolve()
      }, 500)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
