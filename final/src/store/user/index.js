const state = {
    userName: (JSON.parse(localStorage.getItem('userInfo'))).userName,
    userImg: (JSON.parse(localStorage.getItem('userInfo'))).userImg,
}

const mutations = {
    updateUser(state,userInfo){
        state.userName = userInfo.userName
        state.userImg = userInfo.userImg
        localStorage.setItem('userInfo',JSON.stringify(userInfo))
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