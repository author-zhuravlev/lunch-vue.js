<template>
  <div class="places-list">
    <div class="places-list-content">
      <div class="sticky-block">
        <h2 class="title">
          The best places for lunch:
        </h2>
        <div class="btn-block">
          <button
            type="button"
            class="btn btn-logout"
            @click="logOut"
          >
            Logout
          </button>
        </div>
      </div>
      <div class="places">
        <Spinner v-if="loadingPlaces"/>

        <div v-else>
          <div v-if="placesLength && !loadingPlaces">
            <Place
              v-for="place in places"
              :key="place._id"
              :place="place"
            />
          </div>
          <h3
            class="title"
            v-else
          >
            No places (:
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Place from '@/components/place/Place';
import Spinner from '@/components/spinner/Spinner';

export default {
  methods: {
    ...mapActions(['logout']),
    async logOut() {
      try {
        await this.logout();

        this.$router.push('/');
      } catch (err) {}
    }
  },
  computed: mapGetters(['places', 'loadingPlaces', 'placesLength']),
  components: {
    Spinner,
    Place
  },
  name: 'PlacesList'
}
</script>

<style scoped>
.places-list {
  font-size: 18px;
  color: #2f2f2f;
}

.places-list-content {
  padding: 1rem;
}

.btn-logout {
  font-size: 22px;
  border: 1px solid red;
}

.btn-logout:hover {
  color: red;
}
</style>
