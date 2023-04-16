import { setToken, clearToken, getToken } from "@/utils/token"

const state = {
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || { nickName: "", avatar: "" },
    token: getToken(),
}

const mutations = {
    updateUser(state, data) {
        state.userInfo = data
        console.log("userinfo", data)
        sessionStorage.setItem('userInfo', JSON.stringify(data))
    },
    updateToken(state, data) {
        state.token = data
        if (data == "") {
            clearToken()
        } else {
            setToken(data)
        }
    },

}

const actions = {

}

const getters = {
    userName(state) {
        return state.userInfo.nickName
    },
    userImg(state) {
        return state.userInfo.avatar
    },
    userId(state) {
        return state.userInfo.userId
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}