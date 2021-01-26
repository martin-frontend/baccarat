import { doExecute, doShuffle, getInit } from '@/api/game'

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
  lastRound: false
}

const mutations = {
  SET_DATA: (state, data) => {
    const { bankerPoints, cards, playerPoints, result, lastRound } = data
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
  }
}

const actions = {
  getInit({ commit }) {
    return new Promise((resolve, reject) => {
      getInit().then(({ data }) => {
        const { refresh } = data
        commit('SET_CARDS_RESULT', refresh)
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
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  doExecute({ commit }) {
    return new Promise((resolve, reject) => {
      doExecute().then((response) => {
        const { data } = response
        commit('SET_DATA', data.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  doShuffle({ commit }) {
    return new Promise((resolve, reject) => {
      doShuffle().then(({ data }) => {
        const { refresh } = data
        commit('SET_CARDS_RESULT', refresh)
        commit('SET_RESULT_HISTORY', [])
        commit('SET_LAST_ROUND', false)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
