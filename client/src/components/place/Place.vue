<template>
  <article class="place">
    <div class="place-content">
      <h3 class="place-title">{{ place.name }}</h3>
      <div class="link">
        <span class="link-to-menu">
          <a :href="place.linkToMenu" target="_blank">
            Link to menu
            <i class="fas fa-utensils"></i>
          </a>
        </span>
      </div>
      <p class="description">
        {{ place.description }}
      </p>
      <div class="address-block">
        <span class="address">Address: </span>
        <span class="address address-value">{{ place.address }}</span>
      </div>
    </div>
    <PlaceActions :place="place"/>
  </article>
</template>

<script>
import PlaceActions from '@/components/place/PlaceActions';

export default {
  props: {
    place: {
      type: Object
    }
  },
  components: {
    PlaceActions
  },
  name: 'Place'
}
</script>

<style scoped>
.place {
  margin: 1rem 0;
}

.place-title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 1rem;
}

.place-content {
  background: #fff;
  padding: 1.5rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.link {
  text-align: center;
  margin: 1rem 0;
  color: #74b0e9;
}

.description {
  text-align: center;
}

.address-block {
  margin: 1rem 0;
  display: flex;
  justify-content: flex-end;
}

.address {
  display: inline-block;
}

.address.address-value {
  font-weight: 700;
  margin-left: 1rem;
}
</style>
<!--.count {-->
<!--font-size: 30px;-->
<!--color: #2f2f2f;-->
<!--margin: 0 .1rem;-->
<!--}-->
