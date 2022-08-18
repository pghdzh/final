
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)


let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
    if (reject && resolve) {
        originPush.call(this, location, resolve, reject);
    }
    else {
        originPush.call(this, location, () => { }, () => { });
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (reject && resolve) {
        originReplace.call(this, location, resolve, reject);
    }
    else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savePosition) {
        return { y: 0 }
    }
})


export default router