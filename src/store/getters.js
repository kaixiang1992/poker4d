const getters = {
    connected: state => state.connected,
    account: state => state.account,
    coin: state => state.betopt.coin,
    betopt: state => state.betopt
}

export default getters;