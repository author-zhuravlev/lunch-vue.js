<template>
  <div class="rating">
    <div class="wrapper">
      <h3 class="rating-title">Rating:</h3>
      <Search/>
    </div>
    <Spinner v-if="loadingPlaces"/>

    <div class="rating-wrapper" v-else>
      <RatingList
        v-if="placesLength && !loadingPlaces"
        :places="places"
      />
      <h3
        class="title"
        v-else
      >
        No result (:
      </h3>
    </div>
    <div class="btn-block">
      <button
        type="button"
        class="btn btn-reset"
        @click="sendVotingResult"
      >
        Save result
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import RatingList from '@/components/rating/RatingList';
import Search from '@/components/rating/Search';
import Spinner from '@/components/spinner/Spinner';

export default {
  methods: {
    ...mapActions(['saveVotingResult']),
    dateNow() {
      const when = new Date();

      const date = `${when.getFullYear()}.${when.getMonth()+1}.${when.getDate()}`;
      const time = when.toLocaleTimeString();

      return {date, time};
    },
    async sendVotingResult() {
      try {
        const {date, time} = this.dateNow();

        await this.saveVotingResult({
          date,
          result: {
            time,
            rating: this.places.map(({_id, name, countLike, countDislike}) => ({
              _id,
              name,
              countLike,
              countDislike
            }))
          }
        });
      } catch (err) {}
    }
  },
  computed: mapGetters(['places', 'loadingPlaces', 'placesLength']),
  components: {
    RatingList,
    Search,
    Spinner
  },
  name: 'Rating'
}
</script>

<style scoped>
.rating {
  color: #fff;
  background: #2f2f2f;
  padding: 1.5rem;
  border-radius: 5px;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3.title {
  margin: 0;
}

button.btn-reset {
  font-size: 20px;
  padding: .5rem 2rem;
  margin: 1rem 0 0 0;
}
</style>
