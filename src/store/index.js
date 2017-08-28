import Vue from 'vue'
import Vuex from 'vuex'
import usersModule from './users'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        message: 'hello world'
    },
    modules:{
        users: usersModule
    }
});
export default store;