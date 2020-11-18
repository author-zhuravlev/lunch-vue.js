<template>
  <ul class="rating-list">
    <RatingItem
      v-for="(place, i) in places"
      :key="place._id"
      :place="place"
      :position="i + 1"
    />
  </ul>
</template>

<script>
import RatingItem from '@/components/rating/RatingItem';

export default {
  props: {
    places: {
      type: Array
    }
  },
  components: {
    RatingItem
  },
  name: 'RatingList'
}
</script>

<style scoped>
.rating-list {
  margin: .5rem 0;
}
</style>
