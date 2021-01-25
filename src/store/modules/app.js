import { doExecute, getCards, doShuffle, getInit } from '@/api/game'

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
const getters = {
  cardsResult: () => state.cardsResult || '',
  cards: () => state.cards || '',
  pokerMachine: () => state.pokerMachine || '',
  results: () => state.results || '',
  gameTable: () => state.gameTable || ''
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
  },
  SET_CARDS_RESULT: (state, data) => {
    state.cardsResult = data.cards
    state.pokerMachine = data.pokerMachine
    state.gameTable = data.gameTable
  },
  SET_CARDS_BY_ROUND: (state, data) => {
    state.cardsByRound = data
  },
  SET_RESULTHISTORY: (state, data) => {
    state.resultHistory = data
  },
  SET_LASTROUND: (state, data) => {
    state.lastRound = data
  }
}

const actions = {
  getInit({ commit }) {
    getInit().then(({ data }) => {
      const { refresh } = data
      commit('SET_CARDS_RESULT', refresh)
      const cardDataList = refresh.results
      if (cardDataList.length > 0) {
        const resultList = []
        const cardsByRound = []
        cardDataList.forEach(element => {
          const data = JSON.parse(element.result)
          cardsByRound.push(data.cards)
          resultList.push(data.result)
        })
        commit('SET_CARDS_BY_ROUND', cardsByRound)
        commit('SET_RESULTHISTORY', resultList)

        // 解析lastRound
        const lastCardData = cardDataList[cardDataList.length - 1]
        const lastRound = JSON.parse(lastCardData.result).lastRound
        if (lastRound) {
          setTimeout(() => {
            alert('本局已結束，請重新洗牌')
          }, 500)
        }
        commit('SET_LASTROUND', lastRound)
      }
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
  getCards({ commit }) {
    return new Promise((resolve, reject) => {
      getCards().then(({ data }) => {
        // const { data } = response
        commit('SET_CARDS_RESULT', data.data)
        resolve()
      })
    })
  },
  doShuffle({ commit }) {
    return new Promise((resolve, reject) => {
      doShuffle().then(({ data }) => {
        const { refresh } = data
        commit('SET_CARDS_RESULT', refresh.cards)
        commit('SET_RESULTHISTORY', [])
        commit('SET_LASTROUND', false)
        resolve()
      })
    })
  }
  // toggleSideBar({ commit }) {
  //   commit('TOGGLE_SIDEBAR')
  // },
  // closeSideBar({ commit }, { withoutAnimation }) {
  //   commit('CLOSE_SIDEBAR', withoutAnimation)
  // },
  // toggleDevice({ commit }, device) {
  //   commit('TOGGLE_DEVICE', device)
  // },
  // setLanguage({ commit }, language) {
  //   commit('SET_LANGUAGE', language)
  // },
  // setSize({ commit }, size) {
  //   commit('SET_SIZE', size)
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
