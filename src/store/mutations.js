const mutations = {
    change_account(state,obj){ //改变用户信息
        state.account = obj; 
    },
    change_betopt(state,obj){ //更新当前币种余额
        state.betopt = Object.assign(state.betopt, obj);
    }
}

export default mutations;