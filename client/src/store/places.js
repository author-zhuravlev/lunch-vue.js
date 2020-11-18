import api from '@/api';
import paths from '@/api/apiPaths';
import errorHandlerUnauthorized from '@/utils/auth/errorHandlerUnauthorized';
import setPlaceStatus from '@/utils/home/setPlaceStatus';

export default {
  state: {
    places: [],
    loadingPlaces: true
  },
  actions: {
    async getPlaces({dispatch, commit}) {
      try {
        const {data: {places, placesStatus}} = await api.get(paths.getPlaces);

        places.forEach(place => {
          setPlaceStatus(place, placesStatus);
        });

        commit('SET_PLACES', places);
        commit('PLACE_LOADING_COMPLETED');
      } catch (err) {
        commit('PLACE_LOADING_COMPLETED');
        await errorHandlerUnauthorized(
          err, dispatch, paths.getPlaces, 'getPlaces'
        );
      }
    },
    async addPlace({dispatch, commit}, formData) {
      try {
        const {data: {place, message}} = await api.post(paths.addPlace, formData);

        commit('PUSH_PLACE', place);
        commit('SET_INFO', message);
      } catch (err) {
        await errorHandlerUnauthorized(
          err, dispatch, paths.addPlace, 'addPlace', formData
        );
        throw err;
      }
    },
    async deletePlace({dispatch, commit}, formData) {
      try {
        const {data: {deletedPlace, message}} = await api.delete(paths.deletePlace, {data: formData});

        commit('DELETE_PLACE', deletedPlace._id);
        commit('SET_INFO', message);
      } catch (err) {
        await errorHandlerUnauthorized(
          err, dispatch, paths.deletePlace, 'deletePlace', formData
        );
        throw err;
      }
    },
    async updatePlaceRating({dispatch, commit}, data) {
      try {
        const {data: {place}} = await api.patch(paths.updatePlaceRating, data);

        commit('UPDATE_PLACE_RATING', place);
      } catch (err) {
        await errorHandlerUnauthorized(
          err, dispatch, paths.updatePlaceRating, 'updatePlaceRating', data
        );
        throw err;
      }
    }
  },
  mutations: {
    PLACE_LOADING_COMPLETED(state) {
      state.loadingPlaces = false;
    },
    SET_PLACES(state, places) {
      state.places = places;
    },
    CLEAR_PLACES(state) {
      state.places = [];
    },
    PUSH_PLACE(state, place) {
      state.places.push(place);
    },
    DELETE_PLACE(state, _id) {
      state.places = state.places.filter(place => place._id !== _id);
    },
    UPDATE_PLACE_RATING(state, place) {
      state.places = state.places
        .map(p => p._id === place._id ? {...p, ...place} : p)
    }
  },
  getters: {
    placesLength: (state) => state.places.length,
    places: (state) => state.places
      .sort((a, b) => (a.countDislike - a.countLike) - (b.countDislike - b.countLike)),
    loadingPlaces: (state) => state.loadingPlaces
  }
}
