export default async (error, dispatch, path, action, data) => {
  if (error.response && error.response.status === 401) {
    try {
      await dispatch('updateTokens');

      if (data) {
        await dispatch(action, data);
      } else {
        await dispatch(action);
      }
    } catch (err) {}
  }
}
