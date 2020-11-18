import api from '@/api';
import paths from '@/api/apiPaths';
import saveAndUseToken from '@/utils/auth/saveAndUseToken';
import getDataFromLocalStorage from '@/utils/getDataFromLocalStorage';
import saveDataInLocalStorage from '@/utils/saveDataInLocalStorage';

export default {
  state: {
    authStatus: '',
    token: getDataFromLocalStorage('token')
  },
  actions: {
    async login({dispatch, commit}, formData) {
      try {
        const {data: {accessToken, placesStatus}} = await api.post(paths.login, formData);

        saveAndUseToken(accessToken, commit);
        saveDataInLocalStorage('placesStatus', placesStatus);
      } catch (err) {
        commit('SET_INFO', err.response.data.message);
        throw err;
      }
    },
    async registration({dispatch, commit}, formData) {
      try {
        const {data: {accessToken, placesStatus}} = await api.post(paths.registration, formData);

        saveAndUseToken(accessToken, commit);
        saveDataInLocalStorage('placesStatus', placesStatus);
      } catch (err) {
        commit('SET_INFO', err.response.data.message);
        throw err;
      }
    },
    async logout({commit}) {
      try {
        await api.get(paths.logout);

        commit('LOGOUT');

        localStorage.clear();
        delete api.defaults.headers.common['Authorization'];

        commit('CLEAR_INFO');
        commit('CLEAR_PLACES');
        commit('CLEAR_VOTING_RESULT');
      } catch (err) {
        commit('SET_INFO', err.response.data.message);
      }
    },
    async updateTokens({dispatch, commit}) {
      try {
        const {data: {accessToken}} = await api.get(paths.updateTokens);

        saveAndUseToken(accessToken, commit);
      } catch (err) {
        dispatch('logout');
        throw err;
      }
    }
  },
  mutations: {
    AUTH_REQUEST(state) {
      state.authStatus = 'loading';
    },
    AUTH_SUCCESS(state, token) {
      state.authStatus = 'success';
      state.token = token;
    },
    LOGOUT(state) {
      state.authStatus = '';
      state.token = null;
    }
  },
  getters: {
    isLoggedIn: state => state.token
  }
}
