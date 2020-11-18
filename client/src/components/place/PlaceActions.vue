<template>
  <div class="place-actions">
    <button
      type="button"
      class="btn-icon"
      @click="likeHandler"
    >
    <span class="icon">
      <i :class="`fas far fa-heart ${ place.status === 'like' ? 'active' : '' }`"></i>
    </span>
    </button>
    <button
      type="button"
      class="btn-icon"
      @click="dislikeHandler"
    >
    <span class="icon">
      <i :class="`fas fa-heart-broken ${ place.status === 'dislike' ? 'active' : '' }`"></i>
    </span>
    </button>
    <button
      type="button"
      class="btn-icon"
      @click="deletionHandler"
    >
    <span class="icon">
      <i :class="'fas fa-trash'"></i>
    </span>
    </button>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  props: {
    place: {
      type: Object
    }
  },
  data() {
    return {
      likes: {
        like: {
          operations: {countLike: 'minus'},
          status: 'notSelected'
        },
        dislike: {
          operations: {countDislike: 'minus', countLike: 'plus'},
          status: 'like'
        },
        notSelected: {
          operations: {countLike: 'plus'},
          status: 'like'
        }
      },
      dislikes: {
        like: {
          operations: {countLike: 'minus', countDislike: 'plus'},
          status: 'dislike'
        },
        dislike: {
          operations: {countDislike: 'minus'},
          status: 'notSelected'
        },
        notSelected: {
          operations: {countDislike: 'plus'},
          status: 'dislike'
        }
      }
    }
  },
  methods: {
    ...mapActions(['deletePlace', 'updatePlaceRating']),
    async deletionHandler() {
      try {
        await this.deletePlace(this.place);
      } catch (err) {}
    },
    getPropertiesForUpdate(operations) {
      const placeRating = {};

      for (let property in operations) {
        let propertyValue = this.place[property];

        placeRating[property] = operations[property] === 'plus'
          ? propertyValue + 1
          : propertyValue - 1;
      }

      return placeRating;
    },
    async updateRating({operations, status}) {
      const placeRating = this.getPropertiesForUpdate(operations);

      try {
        await this.updatePlaceRating({
          placeRating,
          placeId: this.place._id,
          status
        });
      } catch (err) {}
    },
    async handler(behavior) {
      try {
        if (this.place.status === 'like') {
          await this.updateRating(behavior.like);
        } else if(this.place.status === 'dislike') {
          await this.updateRating(behavior.dislike);
        } else {
          await this.updateRating(behavior.notSelected);
        }
      } catch (err) {}
    },
    async likeHandler() {
      await this.handler(this.likes);
    },
    async dislikeHandler() {
      await this.handler(this.dislikes);
    }
  },
  name: 'PlaceActions'
}
</script>

<style scoped>
select {
  width: 100%;
  border: none;
  display: flex;
  justify-content: space-between;
}

.place-actions {
  display: flex;
  justify-content: space-around;
  background: #74b0e9;
  padding: .5rem 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.btn-icon {
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
}

.icon {
  font-size: 1.7rem;
  color: #2f2f2f;
}

.icon:hover {
  color: red;
}

.active {
  color: red;
}
</style>
