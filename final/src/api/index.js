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
export const requpdateViewCount = (id) => request({ url: `/article/updateViewCount/${id}`, method: 'put' })//添加访问量
// 用户接口
export const reqgetInfo = () => request({ url: '/getInfo', method: 'get' })//获取用户信息
export const reqregister = (params) => request({ url: '/register', method: 'post', data: params })//注册
export const reqemailVerify = (params) => request({ url: '/emailVerify', method: 'get', params })//邮箱注册

//评论接口
export const reqcommentList = (params) => request({ url: "/comment/commentList", method: 'get', params })//获取评论
export const reqaddComment = (params) => request({ url: '/comment/addComment', method: 'post', data: params })


//打卡签到
export const reqsign = () => request({ url: `/common/sign`, method: 'get' })//签到
export const reqsignInfo = () => request({ url: `/common/signInfo`, method: 'get' })//签到

//更新信息
export const requpdateavatar = (params) => request({ url: '/update/avatar', method: 'post', data: params })//上传头像
export const requpdatecustomize = (file, filePath) => request({ url: `/update/customize/?filePath=${filePath}`, method: 'post', data: file })//上传自定义文件
export const requpdateuserinfo = (params) => request({ url: '/update/userInfo', method: 'post', data: params })//更新用户信息


//招募信息
export const reqpostRecruit = (params) => request({ url: '/recruit/postRecruit', method: 'post', data: params })//发布招募
export const reqgetRecruitById = (params) => request({ url: '/recruit/getRecruitById', method: 'get', params })//通过招募id查详情
export const reqgetRecruitList = (params) => request({ url: '/recruit/getRecruitList', method: 'get', params })//分页获取招募
export const reqselectRecruitList = (params) => request({ url: '/recruit/selectRecruitList', method: 'get', params })//模糊查询
export const reqgetLab = () => request({ url: '/recruit/getLabel', method: 'get' })//获取标签
export const reqgetRecruitListByUserId = (params) => request({ url: '/recruit/getRecruitListByUserId', method: 'get', params })//通过用户id查列表
export const reqdeleteRecruit = (params) => request({ url: '/recruit/delete', method: 'delete', params })//删除招募
export const reqgetRecruitByLabelName = (params) => request({ url: '/recruit/getRecruitByLabelName', method: 'get', params })//通过标签查列表

//验证码
export const reqcaptchaImage = () => request({ url: '/captchaImage', method: 'get' })//获取验证码
