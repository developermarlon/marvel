'use strict'
import createPersistedState from 'vuex-persistedstate'

export default {
    namespaced: true,
    state: {
        list: [],
        votes: 
        []
    },
    getters: {
        list: (state) => {
            return state.list
        },
        votes: (state) => {
            return state.votes
        }
    },
    actions: {
        addLike: ({state, commit}, id) => {
            const superhero = state.list.filter((superhero) => superhero.id === id)
            const index = state.list.indexOf(superhero[0])
            commit('addLike', index)
        },
        addDislike: ({state, commit}, id) => {
            const superhero = state.list.filter((superhero) => superhero.id === id)
            const index = state.list.indexOf(superhero[0])
            commit('addDislike', index)
        },
        updateSuperheros: ({state, commit}, superheros) => {
            commit('updateSuperheros', superheros)
        }
    },
    mutations: {
        updateSuperheros: (state, superheros) => {
            state.list = superheros
        },
        addLike: (state, index) => {
            state.list[index].votes.push({like: true})
        },
        addDislike: (state, index) => {
            state.list[index].votes.push({like: false})
        }
    },
    plugins: [createPersistedState()]
}