<template>
  <form
    action="/search-voting-result"
    @submit.prevent="submitHandler"
  >
    <div
      class="group"
      :class="{'is-invalid': $v.date.$error}"
    >
      <div class="wrap-input">
        <input
          class="input search"
          type="text"
          v-model.trim="date"
          autocomplete="off"
          @input="checkField"
          placeholder="Type date (YYYY.MM.DD)"
        />
        <span class="focus-input"></span>
      </div>
    </div>
    <div class="btn-block">
      <button
        type="submit"
        class="btn btn-search"
      >
        Search
      </button>
    </div>
  </form>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  data() {
    return {
      date: ''
    }
  },
  methods: {
    ...mapActions(['searchResultsVote']),
    async submitHandler() {
      try {
        if (this.$v.$invalid) {
          return;
        }

        await this.searchResultsVote({
          date: this.date
        });

        this.clearField();
      } catch (e) {
        this.clearField();
      }
    },
    checkField() {
      this.$v.$touch();
    },
    clearField() {
      this.date = ''
    }
  },
  validations: {
    date: {
      isDate: (value) => !isNaN(Date.parse(value))
    }
  },
  name: 'Search'
}
</script>

<style scoped>
form {
  padding: 0;
  display: flex;
  align-items: center;
}

.wrap-input {
  border-bottom: 1px solid #74b0e9;
}

input.search {
  text-align: center;
  font-size: 18px;
  padding: 0.5rem;
}

.group {
  margin: 0 7px 0 0;
}

button {
  font-size: 16px;
  padding: 0.5rem 1rem;
}

button.btn-search {
  border: 1px solid #74b0e9;
}
</style>
