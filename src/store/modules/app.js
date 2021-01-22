import { doExecute, getCards, doShuffle, getInit } from '@/api/game'

const state = {
  cards: [],
  result: [],
  cardsResult: [],
  resultHistory: [],
  cardName: ['', 'puker-club', 'puker-diamond', 'puker-heart', 'puker-spade'],
  bankerPoints: 0,
  playerPoints: 0
}
const getters = {
  cardsResult: () => state.cardsResult || '',
  cards: () => state.cards || ''
}
const mutations = {
  SET_DATA: (state, data) => {
    const { bankerPoints, cards, playerPoints, result } = data
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
  },
  SET_CARDS_RESULT: (state, data) => {
    state.cardsResult = data
  },
  SET_RESULTHISTORY: (state, data) => {
    state.resultHistory = data
  }
}

const actions = {
  getInit({ commit }) {
    getInit().then(({ data }) => {
      const { refresh } = data
      commit('SET_CARDS_RESULT', refresh.cards)
      const cardDataList = refresh.results
      if (cardDataList) {
        const resultList = []
        cardDataList.forEach(element => {
          const data = JSON.parse(element.result)
          resultList.push(data.result)
        })
        commit('SET_RESULTHISTORY', resultList)
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
