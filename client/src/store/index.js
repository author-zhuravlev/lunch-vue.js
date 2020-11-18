import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/auth';
import places from '@/store/places';
import rating from '@/store/rating';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    info: [],
  },
  mutations: {
    SET_INFO(state, info) {
      state.info.push(info);
    },
    CLEAR_INFO(state) {
      state.info = [];
    }
  },
  getters: {
    info: state => state.info
  },
  modules: {
    auth,
    places,
    rating
  }
});
