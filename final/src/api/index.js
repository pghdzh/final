import request from "./request"

// export const reqLogin = (params) => request({ url: 'http://localhost:3000/api/login', method: 'post', data: params })
export const reqgetSentence = () => request({ url: 'http://localhost:3000/api/getSentence', method: 'get' })
//登陆相关接口
export const reqLogin = (params) => request({ url: '/login', method: 'post', data: params })//获取token
export const reqLogout = () => request({ url: '/logout', method: 'post' })


//分类接口
export const reqgetCategoryList = () => request({ url: '/category/info', method: 'get' })

//文章接口
export const reqarticleList = (params) => request({ url: "/article/articleList", method: 'get', params })//分页查文章
export const reqhotArticleList = () => request({ url: '/article/popularArticleList', method: 'get' })//热门文章
export const reqarticle = (id) => request({ url: `/article/getArticle/${id}`, method: 'get' })//获取文章
export const reqwrite = (params) => request({ url: '/article/writeArticle', method: 'post', data: params })//写文章
export const reqgetArticleById = (params) => request({ url: `/article/getArticleListById`, method: 'get', params })
export const reqdeleteArticle = (id) => request({ url: `/article/deleteArticle/${id}`, method: 'delete' })
export const reqinitArticle = () => request({ url: "/article/initArticle", method: 'get' })//检查是否有草稿
export const reqgetArticleListByTitle = (params) => request({ url: '/article/getArticleListByTitle', method: 'get', params })//根据标题搜索
// 用户接口
export const reqgetInfo = () => request({ url: '/getInfo', method: 'get' })//获取用户信息
export const reqregister = (params) => request({ url: '/register', method: 'post', data: params })//注册


//评论接口
export const reqcommentList = (params) => request({ url: "/comment/commentList", method: 'get', params })//获取评论
export const reqaddComment = (params) => request({ url: '/comment/addComment', method: 'post', data: params })


//打卡签到
export const reqsign = (userId) => request({ url: `/common/sign`, method: 'get' })//签到
export const reqsignInfo = (userId) => request({ url: `/common/signInfo`, method: 'get' })//签到

//更新信息
export const requpdateavatar = (params) => request({ url: '/update/avatar', method: 'post', data: params })//上传头像
export const requpdatecustomize = (file,filePath) => request({ url: `/update/customize/?filePath=${filePath}`, method: 'post', data: file })//上传自定义文件
export const requpdateuserinfo = (params) => request({ url: '/update/userInfo', method: 'post', data: params })//更新用户信息


