import request from "./request"

export const reqLogin = (params) => request({ url: '/login', method: 'post', data: params })
export const reqgetSentence = () => request({ url: '/getSentence', method: 'get' })