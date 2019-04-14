const actions = {
    change_account({commit},obj){
        commit('change_account', obj);
    },
    change_currentEOS({commit},num){
        commit('change_currentEOS',num);
    }
}

export default actions;