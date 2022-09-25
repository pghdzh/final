import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
import user from './user'
import talk from './talk'
import contest from './contest';
export default new Vuex.Store({
    modules:{
        user,
        talk,
        contest,
    }
})