const state = {
    topMsg:{
        // minNav:['讨论区/','讨论列表/','讨论详情'],
        minNav:[],
        title:'讨论列表',
      }
}

const mutations = {
    updatetopMsg(state,topMsg){
       state.topMsg.minNav = topMsg.minNav
       state.topMsg.title = topMsg.title
    }
}

const actions = {

}

const getters = {

}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}