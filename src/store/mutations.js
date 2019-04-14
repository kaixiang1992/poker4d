const mutations = {
    change_account(state,obj){ //改变用户信息
        state.account = obj; 
    },
    change_currentEOS(state,num){ //当前余额
        state.currentEOS = num;
    }
}

export default mutations;