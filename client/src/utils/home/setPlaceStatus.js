export default (place, placesStatus) => {
  for (let _id in placesStatus) {
    if (place._id === _id) {
      place.status = placesStatus[_id];
    }
  }
}
