import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "@/router";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
const localurl = "http://127.0.0.1:5000/";
const liveUrl = "https://api-sacco.tritel.co.ke/";




export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        windowWidth: window.innerWidth,
        payments: {},
        status: "",
        token: localStorage.getItem("token") || "",
        user: {},
        isLoading: false,
        ledger: {},
        loanCategories: {},
        outStandingLoans: {}
    },
    mutations: {
        setWindowWidth(state: any) {
            state.windowWidth = window.innerWidth;
        },
        updatePayments(state, data) {
            state.payments = data;
        },
        authRequest(state) {
            state.status = "loading";
        },
        authError(state) {
            state.status = "error";
        },
        logout(state) {
            state.status = "";
            state.token = "";
            state.payment = {};
            state.user = {};
        },
        authSuccess(state, { token }) {
            state.status = "success";
            state.token = token;
        },
        setAnimation(state, arg) {
            state.isLoading = arg;
        },
        setUser(state: any, user: any) {
            state.user = user;
        },
        setLedger(state: any, ledger: any) {
            state.ledger = ledger;
        },
        setLoanCategories(state: any, category: any) {
            state.loanCategories = category;
        },
        setLoans(state: any, loan: any) {
            state.outStandingLoans = loan
        }
    },
    actions: {
        fetchToken({ commit }, auth) {
            commit("setAnimation", true);
            return new Promise((resolve, reject) => {

                Axios({ url: liveUrl + "api/token", method: "GET", auth: auth })
                    .then(resp => {
                        const token = resp.data.token;

                        localStorage.setItem("token", token);
                        Axios.defaults.headers.common["Authorization"] = token;

                        commit("authSuccess", { token });
                        commit("setAnimation", false);
                        resolve(resp);
                    })
                    .catch(err => {
                        alert(err);
                        commit("authError");
                        commit("setAnimation", false);
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },
        singin({ commit }, auth) {
            commit("setAnimation", true);
            return new Promise((resolve, reject) => {
                commit("authRequest");
                Axios({ url: liveUrl + "api/token", method: "GET", auth: auth })
                    .then(resp => {
                        const token = resp.data.token;

                        localStorage.setItem("token", token);
                        Axios.defaults.headers.common["Authorization"] = token;
                        this.dispatch("fetchUser");
                        commit("authSuccess", { token });
                        commit("setAnimation", false);
                        resolve(resp);
                    })
                    .catch(err => {
                        alert(err);

                        commit("authError");
                        commit("setAnimation", false);
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },
        signup({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit("setAnimation", true);
                commit("authRequest");
                Axios({ url: liveUrl + "api/member", data: user, method: "POST" })
                    .then(resp => {
                        commit("setAnimation", false);
                        resolve(resp);
                    })
                    .catch(err => {
                        commit("setAnimation", false);
                        if (err.response.status == 401) {
                            localStorage.removeItem("token");
                            console.log(err.response)
                            router.push("/");

                        }
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit("logout");
                localStorage.clear();
                delete Axios.defaults.headers.common["Authorization"];
                resolve();
            });
        },
        fetchUser({ commit }) {
            return new Promise((resolve, reject) => {
                commit("setAnimation", false);
                Axios({
                    url: liveUrl + "api/member",
                    method: "GET",
                    headers: { Authorization: "Bearer " + this.state.token }
                })
                    .then(resp => {

                        commit("setUser", resp);
                        resolve(resp);
                    })
                    .catch(err => {
                        commit("setAnimation", false);
                        if (err.response.status == 401) {
                            localStorage.clear();
                            console.log(err.response)
                            router.push("/");
                        }

                        reject(err);
                    });
            });
        },
        registerUser({ commit }, data) {
            return new Promise((resolve, reject) => {
                commit("setAnimation", true);
                Axios({
                    url: liveUrl + "api/registerMember",
                    data: data,
                    method: "POST",
                    headers: { Authorization: "Bearer " + this.state.token }
                })
                    .then(res => {
                        resolve(res);
                        commit("setAnimation", false);
                    })
                    .catch(err => {
                        if (err.response.status == 401) {
                            localStorage.clear();
                            console.log(err.response)
                            router.push("/");
                        }
                        reject(err);
                        commit("setAnimation", false);
                    });
            });
        },
        updateUser({ commit }, data) {
            return new Promise((resolve, reject) => {
                commit("setAnimation", true);
                Axios({
                    url: liveUrl + "api/member",
                    data: data,
                    method: "PUT",
                    headers: { Authorization: "Bearer " + this.state.token }
                })
                    .then(res => {
                        resolve(res);
                        commit("setAnimation", false);
                    })
                    .catch(err => {
                        if (err.response.status == 401) {
                            localStorage.clear();
                            console.log(err.response)
                            router.push("/");
                        }
                        reject(err);
                        commit("setAnimation", false);
                    });
            });
        },
        makePayment({ commit }, data) {
            return new Promise((resolve, reject) => {
                commit("setAnimation", true);
                Axios({
                    url: "https://api-sacco.tritel.co.ke/api/MpesaPayment",
                    data: data,
                    method: "POST",
                    headers: { Authorization: "Bearer " + this.state.token }
                })
                    .then(res => {
                        resolve(res);
                        commit("setAnimation", false);
                    })
                    .catch(err => {
                        if (err.response.status == 401) {
                            console.log(err.response)
                            router.push("/");
                        }
                        reject(err);
                        commit("setAnimation", false);
                    });
            });
        },
        getLedger({ commit }) {
            return new Promise((resolve, reject) => {
                commit("setAnimation", true);
                Axios({
                    url: liveUrl + "api/ledger",
                    method: "GET",
                    headers: { Authorization: "Bearer " + this.state.token }
                })
                    .then(res => {
                        commit("setLedger", res);
                        commit("setAnimation", false);
                    })
                    .catch(err => {
                        if (err.response.status == 401) {
                            localStorage.clear();
                            console.log(err.response)
                            router.push("/");
                        }
                        reject(err);
                        commit("setAnimation", false);
                    });
            });
        },
        getLoanCategories({ commit }) {
            return new Promise((resolve, reject) => {
                commit("setAnimation", true);
                Axios({
                    url: liveUrl + "api/GetLoanProducts",
                    method: "GET"
                })
                    .then(res => {
                        commit("setLoanCategories", res);
                    })
                    .catch(err => {
                        if (err.response.status == 401) {
                            localStorage.clear();
                            console.log(err.response)
                            router.push("/");
                        }
                        reject(err);
                        commit("setAnimation", false);
                    });
            });
        },
        calculateLoan({ commit }, data) {
            return new Promise((resolve, reject) => {
                commit("setAnimation", true);
                Axios({
                    url: liveUrl + "api/loanCalculator",
                    method: "POST",
                    data: data
                })
                    .then(res => {
                        console.log(res)
                        resolve(res);
                    })
                    .catch(err => {

                        if (err.response.status == 401) {
                            localStorage.clear();
                            console.log(err.response)
                            router.push("/");
                        }
                        reject(err);
                        commit("setAnimation", false);
                    });
            });
        },
        applyLoan({ commit }, data) {
            return new Promise((resolve, reject) => {
                commit("setAnimation", true);
                Axios({
                    url: liveUrl + "api/ApplyLoan",
                    method: "POST",
                    data: data,
                    headers: { Authorization: "Bearer " + this.state.token }
                })
                    .then(res => {
                        console.log(res)
                        resolve(res);
                        commit("setAnimation", false);
                    })
                    .catch(err => {
                        if (err.response.status == 401) {
                            localStorage.clear();
                            console.log(err.response)
                            router.push("/");
                        }

                        reject(err);
                        commit("setAnimation", false);
                    });
            });
        },
        getAllLoans({ commit }) {
            return new Promise((resolve, reject) => {
                commit("setAnimation", true);
                Axios({
                    url: liveUrl + "api/loans",
                    method: "GET",
                    headers: { Authorization: "Bearer " + this.state.token }
                })
                    .then(res => {
                      

                        commit("setAnimation", false);
                        commit("setLoans", res);
                        resolve(res);
                    })
                    .catch(err => {
                        if (err.response.status == 401) {
                            localStorage.clear();
                            console.log(err.response)
                            router.push("/");
                        }

                        reject(err);
                        commit("setAnimation", false);
                    });
            });
        }
    },
    modules: {}
});
