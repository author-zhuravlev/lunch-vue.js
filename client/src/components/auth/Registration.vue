<template>
  <form
    action="/registration"
    @submit.prevent="submitHandler"
  >
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
          placeholder="Your name...">
        <span class="focus-input"></span>
      </div>
      <p class="error" :class="{visible: ($v.name.$dirty && (!$v.name.minLength || !$v.name.required))}">
        <span v-if="!$v.name.minLength">Min length 2</span>
        <span v-else>Required field</span>
      </p>
    </div>
    <div
      class="group"
      :class="{'is-invalid': $v.email.$error}"
    >
      <div class="wrap-input">
        <span class="label-input">Email</span>
        <input
          class="input"
          type="text"
          v-model.trim="email"
          autocomplete="off"
          placeholder="Email address...">
        <span class="focus-input"></span>
      </div>
      <p class="error" :class="{visible: ($v.email.$dirty && (!$v.email.email || !$v.email.required))}">
        <span v-if="!$v.email.email">Incorrect email</span>
        <span v-else>Required field</span>
      </p>
    </div>
    <div
      class="group"
      :class="{'is-invalid': $v.password.$error}"
    >
      <div class="wrap-input">
        <span class="label-input">Password</span>
        <input
          class="input"
          type="password"
          v-model.trim="password"
          autocomplete="off"
          placeholder="******">
        <span class="focus-input"></span>
      </div>
      <p class="error" :class="{visible: ($v.password.$dirty && (!$v.password.minLength || !$v.password.required))}">
        <span v-if="!$v.password.minLength">Min length 6 (now it is {{ password.length }})</span>
        <span v-else>Required field</span>
      </p>
    </div>
    <AuthButtons
      :toggleForm="toggleForm"
      :btnClass="'btn-registration'"
      :btnText="btnText"
    />
  </form>
</template>

<script>
import {required, minLength, email} from 'vuelidate/lib/validators';
import {mapActions} from 'vuex';
import AuthButtons from '@/components/auth/AuthButtons';

export default {
  props: {
    toggleForm: {
      type: Function
    }
  },
  data() {
    return {
      email: '',
      name: '',
      password: '',
      btnText: {
        submit: 'Register',
        toggle: 'Already registered?'
      }
    }
  },
  methods: {
    ...mapActions(['registration']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.registration({
          email: this.email,
          password: this.password,
          name: this.name
        });

        this.$router.push('/home');
      } catch (err) {}
    }
  },
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(6)},
    name: {required, minLength: minLength(2)}
  },
  components: {
    AuthButtons
  },
  name: 'Registration'
}
</script>
