import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: true,
        user: {
            name: 'Usuário Mock',
            email: 'mock@cod3r.com.br'
        }
    },
    mutations: {
        toggleMenu(state, isVisible){
            //if isVisible isn't passed as args, the state takes it's oposite
            if(isVisible === undefined){
                state.isMenuVisible = !state.isMenuVisible
            } else { //
                state.isMenuVisible = isVisible
            }

        }
    }
})