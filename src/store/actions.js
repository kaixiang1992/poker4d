const actions = {
    change_connected({commit}, bool){
        commit('change_connected', bool);
    },
    change_account({commit},obj){
        commit('change_account', obj);
    },
    change_betopt({commit},obj){
        commit('change_betopt',obj);
    }
}

export default actions;