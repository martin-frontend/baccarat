const getters = {
  bankerPoints: state => state.app.bankerPoints,
  cards: state => state.app.cards,
  playerPoints: state => state.app.playerPoints,
  result: state => state.app.result,
  resultHistory: state => state.app.resultHistory,
  lastRound: state => state.app.lastRound,
  pokerMachine: state => state.app.pokerMachine,
  cardsByRound: state => state.app.cardsByRound,
  cardsResult: state => state.app.cardsResult || '',
  gameTable: state => state.app.gameTable || ''
}
export default getters
