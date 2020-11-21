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
          <div class="title-block">
            <h1 class="title">Good Lunch</h1>
            <p class="blue-text">for you and your friends</p>
            <p class="text">Choose the best place for lunch where you and your friends can eat deliciously,
              relax from work and have a good time together</p>
          </div>
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
