<template>
  <form
    action="/add-place"
    @submit.prevent="submitHandler"
  >
    <div class="wrapper">
      <h3 class="title">Add new place:</h3>
      <div class="btn-block">
        <button
          type="submit"
          class="btn btn-add"
        >
          Add place
        </button>
      </div>
    </div>
    <div
      class="group"
      :class="{'is-invalid': $v.name.$error}"
    >
      <div class="wrap-input">
        <span class="label-input">Name</span>
        <input
          class="input"
          type="text"
          v-model.trim="name"
          autocomplete="off"
          placeholder="Enter place name...">
        <span class="focus-input"></span>
      </div>
      <p class="error" :class="{visible: ($v.name.$dirty && !$v.name.required)}">
        Required field
      </p>
    </div>
    <div
      class="group"
      :class="{'is-invalid': $v.address.$error}"
    >
      <div class="wrap-input">
        <span class="label-input">Address</span>
        <input
          class="input"
          type="text"
          v-model.trim="address"
          autocomplete="off"
          placeholder="Enter address of the place...">
        <span class="focus-input"></span>
      </div>
      <p class="error" :class="{visible: ($v.address.$dirty && !$v.address.required)}">
        Required field
      </p>
    </div>
    <div
      class="group"
      :class="{'is-invalid': $v.linkToMenu.$error}"
    >
      <div class="wrap-input">
        <span class="label-input">Link to menu</span>
        <input
          class="input"
          type="text"
          v-model.trim="linkToMenu"
          autocomplete="off"
          placeholder="Enter menu link...">
        <span class="focus-input"></span>
      </div>
      <p class="error" :class="{visible: ($v.linkToMenu.$dirty && !$v.linkToMenu.required)}">
        Required field
      </p>
    </div>
    <div
      class="group"
      :class="{'is-invalid': $v.description.$error}"
    >
      <div class="wrap-input">
        <span class="label-input">Description</span>
        <input
          class="input"
          type="text"
          v-model.trim="description"
          autocomplete="off"
          placeholder="Enter description of the place...">
        <span class="focus-input"></span>
      </div>
      <p class="error" :class="{visible: ($v.description.$dirty && !$v.description.required)}">
        Required field
      </p>
    </div>
  </form>
</template>

<script>
import {required} from 'vuelidate/lib/validators';
import {mapActions} from 'vuex';

export default {
  data() {
    return {
      name: '',
      address: '',
      linkToMenu: '',
      description: '',
      likesCount: 0,
      dislikesCount: 0
    }
  },
  methods: {
    ...mapActions(['addPlace']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.addPlace({
          name: this.name,
          address: this.address,
          linkToMenu: this.linkToMenu,
          description: this.description,
          likesCount: this.likesCount,
          dislikesCount: this.dislikesCount
        });

        this.clearFields();
      } catch (err) {
        this.clearFields();
      }
    },
    clearFields() {
      const fields = this.$data;

      for (let key in fields) {
        if (fields[key] === 'likesCount' || fields[key] === 'dislikesCount') {
          fields[key] = 0;
        }

        fields[key] = '';
      }
    }
  },
  validations: {
    name: {required},
    address: {required},
    linkToMenu: {required},
    description: {required}
  },
  name: 'AddPlace'
}
</script>

<style scoped>
form {
  background: #2f2f2f;
  margin-top: .5rem;
  border-radius: 5px;
  padding: 1rem 2rem .5rem 2rem;
  height: 100%;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.group {
  margin-bottom: 12px;
}

input {
  font-size: 18px;
}

.title {
  text-align: center;
  font-size: 22px;
  margin-top: .4rem;
  color: #fff;
}

.btn-block {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-add {
  font-size: 18px;
}
</style>
