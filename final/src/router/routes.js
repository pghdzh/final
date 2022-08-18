export default [
    {
        path: '/',
        redirect: '/home'
    }, 
    {
        path:'/talkPage',
        component:() => import('@/views/talkPage'),
        children:[
            {
                path:'',
                redirect:'mainArea'
            },
            {
                path:'mainArea',
                component:() => import('@/views/talkPage/mainArea')
            },
            {
                path:'specificitem',
                component:() => import('@/views/talkPage/specificItem')
            }
        ]
    },
    {
        path: '/personSet',
        component: () => import('@/views/userPage/personSet')
    },
    {
        path: '/user',
        component: () => import("@/views/userPage")
    },
    {
        path: '/login',
        component: () => import('@/views/Login')
    },
    {
        path: '/home',
        component: () => import("@/views/HomePage")
    },
    {
        path: '/group',
        component: () => import('@/views/groupPage')
    },
    {
        path: '/intor',
        component: () => import('@/views/IntorPage')
    },
    {
        path: '/senior',
        component: () => import('@/views/SeniorPage')
    },
    {
        path: '/suggest',
        component: () => import("@/views/suggestPage")
    }
]