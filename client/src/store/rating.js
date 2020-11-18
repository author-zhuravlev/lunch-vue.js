import api from '@/api';
import paths from '@/api/apiPaths';
import errorHandlerUnauthorized from '@/utils/auth/errorHandlerUnauthorized';

export default {
  state: {
    votingResult: {},
    loadingVotingResult: true,
    showModal: false
  },
  actions: {
    async saveVotingResult({dispatch, commit}, data) {
      try {
        const {data: {message}} = await api.post(paths.saveVotingResult, data);

        commit('SET_INFO', message);
      } catch (err) {
        await errorHandlerUnauthorized(
          err, dispatch, paths.saveVotingResult, 'saveVotingResult', data
        );
        throw err;
      }
    },
    async searchResultsVote({dispatch, commit}, formData) {
      try {
        const {data: {rating}} = await api.post(paths.searchResultsVote, formData);

        commit('SET_VOTING_RESULT', rating);
        commit('VOTING_RESULT_LOADING_COMPLETED');
        commit('TOGGLE_MODAL');
      } catch (err) {
        commit('VOTING_RESULT_LOADING_COMPLETED');
        await errorHandlerUnauthorized(
          err, dispatch, paths.searchResultsVote, 'searchResultsVote', formData
        );
        throw err;
      }
    }
  },
  mutations: {
    VOTING_RESULT_LOADING_COMPLETED(state) {
      state.loadingVotingResult = false;
    },
    SET_VOTING_RESULT(state, rating) {
      state.votingResult = rating;
    },
    CLEAR_VOTING_RESULT(state) {
      state.votingResult = {};
    },
    TOGGLE_MODAL(state) {
      state.showModal = !state.showModal;
    }
  },
  getters: {
    votingResult: (state) => state.votingResult,
    loadingVotingResult: (state) => state.loadingVotingResult,
    showModal: (state) => state.showModal
  }
}
