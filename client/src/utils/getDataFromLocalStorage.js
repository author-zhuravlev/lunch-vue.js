export default (name) => {
  const data = localStorage.getItem(name);

  return data;
}
