<template>
  <transition name="modal">
    <div class="modal-mask">
      <div
        class="modal-wrapper"
        @click="toggleModal"
      >
        <div class="modal-container">

          <div class="modal-header">
            <h2 class="title">Voting results:</h2>
          </div>

          <div
            class="modal-body"
            v-if="votingResult.result"
          >
            <h3 class="blue-text">{{ votingResult.date }}</h3>
            <div
              class="voting"
              v-for="result in votingResult.result"
              :key="result.time"
            >
              <p class="text">
                at:
                <span class="blue-text">{{ result.time }}</span>
              </p>
              <div class="rating-wrapper">
                <RatingList :places="result.rating"/>
              </div>
            </div>
          </div>

          <h3
            class="title"
            v-else
          >
            No result (:
          </h3>


          <div class="modal-footer df-center">
            <button class="btn btn-modal" @click.stop="toggleModal">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import RatingList from '@/components/rating/RatingList';

export default {
  methods: {
    ...mapMutations(['TOGGLE_MODAL']),
    toggleModal(e) {
      const target = e.target;

      if (target.matches('button') || target.matches('.modal-wrapper')) {
        this.TOGGLE_MODAL();
      }
    }
  },
  computed: mapGetters(['votingResult']),
  components: {
    RatingList
  },
  name: 'Modal'
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 40%;
  overflow: auto;
  max-height: 70%;
  margin: 0px auto;
  padding: 20px 30px;
  color: #fff;
  background: #2f2f2f;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

h3.blue-text {
  font-size: 28px;
  text-decoration: underline;
}

span.blue-text {
  letter-spacing: 0.1rem;
}

.btn-modal {
  font-size: 18px;
  padding: .5rem 2rem;
}

@media (max-width: 992px) {
  .modal-container {
    width: 90%;
  }
}
</style>
