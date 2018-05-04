import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


import actions from './actions';
import state from './state';
import mutations from './mutations';

export default new Vuex.Store({
	actions,
	state,
	mutations
});