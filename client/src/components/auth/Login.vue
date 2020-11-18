<template>
  <form
    action="/login"
    @submit.prevent="submitHandler"
  >
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
      :btnClass="'btn-login'"
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
      password: '',
      btnText: {
        submit: 'Login',
        toggle: 'Not registered yet?'
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.login({
          email: this.email,
          password: this.password
        });

        this.$router.push('/home');
      } catch (err) {}
    }
  },
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(6)}
  },
  components: {
    AuthButtons
  },
  name: 'Login'
}
</script>

