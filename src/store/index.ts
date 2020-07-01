import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';
import router from '@/router'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        windowWidth: window.innerWidth,
        payments: {},
        status: '',
        token: localStorage.getItem('token') || '',
        user: {},
        isLoading: false,
        ledger:{}
    },
    mutations: {
        setWindowWidth(state: any) {
            state.windowWidth = window.innerWidth;
        },
        updatePayments(state, data) {
            state.payments = data
        },
        authRequest(state) {
            state.status = 'loading'
        },
        authError(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
        authSuccess(state, { token, user }) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        setAnimation(state, arg) {
            state.isLoading = arg
        },
        setUser(state: any, user: any) {
            state.user = user
        },
        setLedger(state:any,ledger:any){
            state.ledger = ledger
        }
    },
    actions: {
        singin({ commit }, auth) {
            commit('setAnimation', true)
            return new Promise((resolve, reject) => {
                commit('auth_request')
                Axios({ url: 'https://api-sacco.tritel.co.ke/api/token', method: 'GET', auth: auth, })
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        Axios.defaults.headers.common['Authorization'] = token
                        commit('authSuccess', { token, user })
                        commit('setAnimation', false)
                        resolve(resp)

                    })
                    .catch(err => {
                        alert(err)
                        commit('authError')
                        commit('setAnimation', false)
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        signup({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('authRequest')
                Axios({ url: 'https://api-sacco.tritel.co.ke/api/signUp', data: user, method: 'POST', })
                    .then(resp => {

                        resolve(resp)
                    })
                    .catch(err => {
                        commit('authError', err)
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                delete Axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        fetchUser({ commit }) {
            return new Promise((resolve, reject) => {
                Axios({
                    url: 'https://api-sacco.tritel.co.ke/api/member',
                    method: "GET",
                    headers: { Authorization: "Bearer " + this.state.token }
                }).then(resp => {
                    commit('setUser', resp)
                    resolve(resp)
                }).catch(err => {
                    router.push("/error");
                    reject(err)
                })
            })
        },
        registerUser({ commit }, data) {
            return new Promise((resolve, reject) => {
                commit("setAnimation", true);
                Axios({
                    url: "https://api-sacco.tritel.co.ke/api/registerMember",
                    data: data,
                    method: "POST",
                    headers: { Authorization: "Bearer " + this.state.token }

                })
                    .then(res => {
                        resolve(res)
                        commit("setAnimation", false);

                    })
                    .catch(err => {
                        reject(err)
                        commit("setAnimation", false);
                    });
            })
        },
        makePayment({ commit }, data) {
            return new Promise((resolve, reject) => {
                commit("setAnimation", true);
                Axios({
                    url: "https://api-sacco.tritel.co.ke/api/MakePayment",
                    data: data,
                    method: "POST",
                    headers: { Authorization: "Bearer " + this.state.token }

                })
                    .then(res => {
                        resolve(res)
                        commit("setAnimation", false);
                    })
                    .catch(err => {
                        reject(err)
                        commit("setAnimation", false);
                    });
            })
        },
        getLedger({commit}){
            return new Promise((resolve, reject)=>{
                commit("setAnimation", true);
                Axios({
                    url: "https://api-sacco.tritel.co.ke/api/ledger",
                    method: "GET",
                    headers: { Authorization: "Bearer " + this.state.token }

                })
                    .then(res => {
                        commit("setLedger",res)
                        commit("setAnimation", false);
                    })
                    .catch(err => {
                        router.push("/error");
                        reject(err)
                        commit("setAnimation", false);
                    });
            })
        }

    },
    modules: {
    }
})
