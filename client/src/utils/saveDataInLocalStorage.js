export default (name, data) => {
  if (name && data) {
    if (typeof data ===  'object') {
      data = JSON.stringify(data);
    }

    localStorage.setItem(name, data);
  }
}
