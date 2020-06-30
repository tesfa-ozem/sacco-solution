import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        windowWidth: window.innerWidth,
    },
    mutations: {
        setWindowWidth(state:any) {
            state.windowWidth = window.innerWidth;
          }
    },
    actions: {
    },
    modules: {
    }
})
