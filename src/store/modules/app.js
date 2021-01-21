import { doExecute, getCards, doShuffle } from '@/api/game'

const state = {
  bankerPoints: 0,
  cards: [],
  playerPoints: 0,
  result: [],
  cardName: ['', 'puker-club', 'puker-diamond', 'puker-heart', 'puker-spade']
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
  }
}

const actions = {
  doExecute({ commit }) {
    return new Promise((resolve, reject) => {
      doExecute().then((response) => {
        const { data } = response
        commit('SET_DATA', data.data)
        resolve()
      })
    })
  },
  getCards({ commit }) {
    return new Promise((resolve, reject) => {
      getCards().then((response) => {
      // const { data } = response
      // commit('SET_DATA', data.data)
        resolve()
      })
    })
  },
  doShuffle({ commit }) {
    return new Promise((resolve, reject) => {
      doShuffle().then((response) => {
      // const { data } = response
      // commit('SET_DATA', data.data)
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
  actions
}
