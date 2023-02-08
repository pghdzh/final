import { setToken, clearToken, getToken } from "@/utils/token"

const state = {
    userInfo: ((JSON.parse(localStorage.getItem('userInfo'))) || ""),
    token: getToken(),
}

const mutations = {
    updateUser(state, data) {
        state.userInfo = data.userInfo
        state.token = data.token
        if (data.token == "") {
            clearToken()
        } else {
            setToken(data.token)
        }

        localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
    },
    updateUserInfo(state, userInfo) {
        state.userInfo = userInfo
       
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
}

const actions = {

}

const getters = {
    userName(state){
        return state.userInfo.nickName
    },
    userImg(state){
        return state.userInfo.avatar
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}