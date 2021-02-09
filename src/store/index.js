import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import user from './user'
import superheros from './superheros'

const ls = new SecureLS({isCompression: false})

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        superheros
    },
    state: {
        loading: {
            show: false,
            label: ''
        }
    },
    getters: {
        loading: (state) => {
            return state.loading
        }
    },
    actions: {
        processOn: ({state, commit}, msg) => {
            commit('processOn', msg)
        },
        processOff: ({state, commit}, msg) => {
            commit('processOff')
        }
    },
    mutations: {
        processOn: (state, msg) => {
            state.loading.show = true
            state.loading.label = msg
        },
        processOff: (state) => {
            state.loading.show = false
            state.loading.label = ''
        }
    },
    plugins: [createPersistedState({
        storage: {
            getItem: key => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: key => ls.remove(key)
        }
    })]
})