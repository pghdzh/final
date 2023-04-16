import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
import user from './user'

import contest from './contest';
export default new Vuex.Store({
    modules:{
        user,
    
        contest,
    }
})