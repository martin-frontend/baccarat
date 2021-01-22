const getters = {
  bankerPoints: state => state.app.bankerPoints,
  cards: state => state.app.cards,
  playerPoints: state => state.app.playerPoints,
  result: state => state.app.result,
  resultHistory: state => state.app.resultHistory,
  lastRound: state => state.app.lastRound
}
export default getters
