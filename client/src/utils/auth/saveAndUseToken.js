import saveDataInLocalStorage from '@/utils/saveDataInLocalStorage';
import api from '@/api';

export default (accessToken, commit) => {
  commit('AUTH_REQUEST');

  saveDataInLocalStorage('token', accessToken);

  api.defaults.headers.common['Authorization'] = accessToken;

  commit('AUTH_SUCCESS', accessToken);
}
