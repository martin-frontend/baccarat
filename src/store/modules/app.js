import { doExecute, getCards, doShuffle } from '@/api/game'

const state = {
  bankerPoints: 0,
  cards: [],
  playerPoints: 0,
  result: [],
  resultHistory: []
}

const mutations = {
  SET_DATA: (state, data) => {
    const { bankerPoints, cards, playerPoints, result } = data
    state.bankerPoints = bankerPoints
    state.cards = cards
    state.playerPoints = playerPoints
    state.result = result
    state.resultHistory.push(result)
  }
}

const actions = {
  doExecute({ commit }) {
    doExecute().then((response) => {
      const { data } = response
      commit('SET_DATA', data.data)
    })
  },
  getCards({ commit }) {
    getCards().then((response) => {
      // const { data } = response
      // commit('SET_DATA', data.data)
    })
  },
  doShuffle({ commit }) {
    doShuffle().then((response) => {
      // const { data } = response
      // commit('SET_DATA', data.data)
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
