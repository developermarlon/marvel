'use strict'
import createPersistedState from 'vuex-persistedstate'

export default {
    namespaced: true,
    state: {
        sesion: {
            auth: true,
            token: null,
            name: null
        }
    },
    getters: {
        sesion: (state) => {
            return state.sesion
        }
    },
    actions: {
        openSesion: ({commit}, user) => {
            commit('openSesion', user)
        },
        closeSesion: ({commit}) => {
            commit('closeSesion')
        }
    },
    mutations: {
        openSesion: (state, user) => {
            state.sesion.auth = true
            state.sesion.name = user.name
            state.sesion.token = user.token
        },
        closeSesion: (state) => {
            state.sesion.auth = false
            state.sesion.name = null
            state.sesion.token = null
        }
    },
    plugins: [createPersistedState()]
}