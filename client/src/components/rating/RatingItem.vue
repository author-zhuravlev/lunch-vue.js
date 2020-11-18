<template>
  <li class="rating-item">
    <div class="wrapper">
      <span class="position">
        {{ position }}.
      </span>
      <span class="place">
        {{ place.name }}
      </span>
    </div>
    <div class="result">
      <div class="result-wrapper">
        <span class="count">
          {{ place.countLike }}
        </span>
        <span class="icon heart">
          <i class="fas far fa-heart"></i>
        </span>
      </div>
      <div class="result-wrapper">
        <span class="count">
          {{ place.countDislike }}
        </span>
        <span class="icon heart-broken">
          <i class="fas fa-heart-broken"></i>
        </span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    place: {
      type: Object
    },
    position: {
      type: Number
    }
  },
  name: 'RatingItem'
}
</script>

<style scoped>
.wrapper {
  display: flex;
}

span {
  display: inline-block;
}

.result {
  color: red;
  font-size: 22px;
  display: flex;
  justify-content: space-between;
}

.result-wrapper {
  margin: 0 .5rem;
  display: flex;
}

.count {
  margin-right: .3rem;
  display: inline-block;
}

.icon {
  display: inline-block;
}
</style>
