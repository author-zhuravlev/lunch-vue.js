<template>
  <section class="places">
    <div class="row">
      <div class="left places-left">
        <PlacesList/>
      </div>
      <div class="right places-right">
        <div class="right-content places-right-content">
          <Rating/>
          <AddPlace/>
        </div>
      </div>
    </div>

    <Modal v-show="showModal"/>
  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import PlacesList from '@/components/place/PlacesList';
import Rating from '@/components/rating/Rating';
import AddPlace from '@/components/place/AddPlace';
import Modal from '@/components/modal/Modal';

export default {
  methods: mapActions(['getPlaces']),
  async mounted() {
    try {
      await this.getPlaces();
    } catch (err) {}
  },
  computed: mapGetters(['showModal']),
  components: {
    PlacesList,
    Rating,
    AddPlace,
    Modal
  },
  name: 'Places'
}
</script>

<style>
.places {
  width: 100%;
}

.right.places-right {
  border: none;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.right-content.places-right-content {
  width: 100%;
  background: none;
}

.left.places-left {
  display: block;
  height: 100vh;
  background: #2f2f2f;
  overflow: auto;
}

.sticky-block {
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  top: 0;
  text-align: center;
  font-size: 25px;
  color: #fff;
  background: #2f2f2f;
  padding: .5rem 0;
}

.rating-item {
  font-size: 20px;
  padding: .5rem;
  border-bottom: 1px solid #3c3c3c;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rating-title {
  text-align: center;
  font-size: 22px;
}

@media (max-width: 992px) {
  .container {
    max-width: none;
  }

  .title {
    font-size: 28px;
  }

  .modal-container {
    width: 90%;
  }
}

@media (max-width: 768px) {
  main.main {
    height: 100%;
  }

  .container {
    max-width: none;
  }

  .row {
    flex-direction: column;
  }

  .left.places-left {
    display: block;
    width: 100%;
  }

  .right {
    width: 100%;
  }

  .places-list {
    height: 500px;
  }

  .address {
    font-size: 15px;
  }

  .rating-item {
    font-size: 16px;
    padding: .5rem;
  }

  input.search {
    font-size: 14px;
    padding: 0.4rem;
  }

  input.search::placeholder {
    font-size: 10px;
  }

  .rating-title {
    font-size: 18px;
  }
}
</style>
