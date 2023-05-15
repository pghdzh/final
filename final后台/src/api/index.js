import request from './request'


// //用户接口
// export const reqaddUser = (params) => request({ url: '/addUser', method: 'post', data: params })
// export const reqgetUser = () => request({ url: '/getUser', method: 'get' })
// export const reqdeteuser = (id) => request({ url: `/deteuser?id=${id}`, method: 'get' })
// //句子接口
// export const reqaddSen = (params) => request({ url: '/addSentence', method: 'post', data: params })
// export const reqgetSentence = () => request({ url: '/getSentence', method: 'get' })
// export const reqdeteSentence = (id) => request({ url: `/deteSentence?id=${id}`, method: 'get' })

//文章信息

export const reqgetAllarticle = (params) => request({ url: '/admin/article/getAll', method: 'get',params })//获取全部
export const reqdeleteArticle = (id) => request({ url: `/admin/article/deleteArticle/${id}`, method: 'delete' })//删除

//用户

export const reqgetAlluser = (params) => request({ url: '/admin/user/getAll', method: 'get',params })//获取全部
export const reqdeleteuser = (params) => request({ url: '/admin/user/delete', method: 'delete',params })//删除