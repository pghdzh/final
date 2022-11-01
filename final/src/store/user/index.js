import { setToken, clearToken, getToken } from "@/utils/token"

const state = {
    userName: ((JSON.parse(localStorage.getItem('userInfo'))).nickName || ""),
    userImg: ((JSON.parse(localStorage.getItem('userInfo'))).avatar || ""),
    token: getToken(),
}

const mutations = {
    updateUser(state, data) {
        state.userName = data.userInfo.nickName
        state.token = data.token
        state.userImg = data.userInfo.avatar
        if (data.token == "") {
            clearToken()
        } else {
            setToken(data.token)
        }

        localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
    },
    updateUserInfo(state, userInfo) {
        state.userName = userInfo.nickName
        state.userImg = userInfo.avatar
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
}

const actions = {

}

const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}