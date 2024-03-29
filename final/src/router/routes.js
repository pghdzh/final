export default [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/registerPage',
        component: () => import("@/views/registerPage")
    },
    {
        path: '/amap',
        component: () => import("@/views/amap")
    },

    {
        path: '/contestPage',
        component: () => import("@/views/contestPage"),
        children: [
            {
                path: '',
                redirect: "mainArea"
            },
            {
                path: 'mainArea',
                component: () => import("@/views/contestPage/mainArea")
            },
            {
                path: 'contestItem:id',
                component: () => import("@/views/contestPage/contestItem")
            }
        ]
    },
    {
        path: '/talkPage',
        component: () => import('@/views/talkPage'),
       
    },
    {
        path: '/talkspecificitem/:id',
        component: () => import('@/views/talkPage/specificItem')
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
        component: () => import('@/views/NewLogin')
    },
    {
        path: '/home',
        component: () => import("@/views/HomePage")
    },
    {
        path: '/file',
        component: () => import('@/views/filePage')
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
        path: '/getnew',
        component: () => import("@/views/getNewPage")
    },
    {
        path: '/mymessage',
        component: () => import("@/views/myMessage"),
        children: [
            {
                path: '',
                redirect: "sysMes"
            },
            {
                path: 'sysMes',
                component: () => import("@/views/myMessage/sysMes")
            },
            {
                path: 'myMes',
                component: () => import("@/views/myMessage/myMes")
            },
            {
                path: 'myReply',
                component: () => import("@/views/myMessage/myReply")
            }
        ]
    }
]