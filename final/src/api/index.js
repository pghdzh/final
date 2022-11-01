import request from "./request"

// export const reqLogin = (params) => request({ url: '/login', method: 'post', data: params })
export const reqgetSentence = () => request({ url: 'http://localhost:3000/api/getSentence', method: 'get' })
//登陆相关接口
export const reqLogin = (params) => request({ url: '/login', method: 'post', data: params })
export const reqLogout = () => request({ url: '/logout', method: 'post' })
//分类接口
export const reqgetCategoryList = () => request({ url: '/category/getCategoryList', method: 'get' })
//文章接口
export const reqarticleList = (params) => request({ url: "/article/articleList", method: 'get', params })
export const reqhotArticleList = () => request({ url: '/article/hotArticleList', method: 'get' })
export const reqarticle = (id) => request({ url: `/article/${id}`, method: 'get' })


// 用户接口
export const requserInfo = () => request({ url: '/user/userInfo', method: 'get' })
export const reqUpdatauerInfo = (params) => request({ url: "/user/userInfo", method: 'put', data: params })
export const reqregister = (params) => request({ url: '/user/register', method: 'post', data: params })
//评论接口

export const reqcommentList = (params) => request({ url: "/comment/commentList", method: 'get', params })