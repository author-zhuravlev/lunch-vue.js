<template>
  <section class="auth df-center">
    <div class="row">
      <div class="left auth-left">
        <img
          src="../assets/lunch.jpg"
          alt="Lunch"
        >
      </div>
      <div class="right auth-right df-center">
        <div class="right-content">
          <Title/>
          <transition
            name="component-fade"
            mode="out-in"
          >
            <Login
              v-if="isRegistered"
              :toggleForm="toggleForm"
            />
            <Registration
              v-else
              :toggleForm="toggleForm"
            />
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Title from '@/components/titel/Title';
import Login from '@/components/auth/Login';
import Registration from '@/components/auth/Registration';

export default {
  data() {
    return {
      isRegistered: true
    }
  },
  methods: {
    toggleForm() {
      this.isRegistered = !this.isRegistered;
    }
  },
  components: {
    Title,
    Login,
    Registration
  },
  name: 'Home'
}
</script>

<style>
.auth {
  height: 100vh;
}
</style>
