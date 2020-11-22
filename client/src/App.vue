<template>
  <div id="app">
    <main class="main">
      <div class="container df-center">
        <router-view/>
      </div>
    </main>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Auth from '@/views/Auth';
import Home from '@/views/Home';

export default {
  computed: mapGetters(['info']),
  watch: {
    info(info) {
      this.$toasted.show(info[info.length - 1], {
        icon: 'INFO: ',
        theme: 'outline',
        position: 'bottom-right',
        duration: 5000
      });
    }
  },
  components: {
    Auth,
    Home
  },
  name: 'App'
}
</script>

<style>
html, body, div, span, h1, h2, h3, h4, h5, h6, p,
a, img, i, ol, ul, li, form, label {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
}

* {
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  line-height: 1;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
}

ol, ul {
  list-style: none;
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  color: #6095c4;
}

main {
  background: #212121;
  height: 100vh;
}

.container {
  display: flex;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.row {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.df-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.left {
  width: 60%;
}

.auth-left img {
  margin: 0;
  padding: 0;
  display: block;
  max-width: 100%;
  object-fit: cover;
}

.right {
  width: 40%;
}

.right-content {
  width: 75%;
  background: #2f2f2f;
  border-radius: 5px;
  padding: .5rem;
}

.title {
  font-size: 40px;
  margin: 1rem 0;
  color: #fff;
  text-align: center;
}

.blue-text {
  font-size: 20px;
  text-align: center;
  color: #74b0e9;
}

.text {
  word-wrap: break-word;
  color: #999;
  margin: 1rem 0 0 0;
  text-align: center;
  line-height: 1.5;
}

form {
  padding: 1rem;
}

.group {
  margin-bottom: 1rem;
  color: #74b0e9;
}
.group:last-child{
  margin-bottom: 0rem;
}

input:focus::-webkit-input-placeholder { color:transparent; }
input:focus:-moz-placeholder { color:transparent; }
input:focus::-moz-placeholder { color:transparent; }
input:focus:-ms-input-placeholder { color:transparent; }

input {
  outline: none;
  border: none;
}
.wrap-input {
  width: 100%;
  position: relative;
  border-bottom: 2px solid #999;
  margin-bottom: 5px;
}

.label-input {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: inherit;
  line-height: 1;
}

.input {
  display: block;
  width: 100%;
  color: inherit;
  background: transparent;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  line-height: 1;
  padding: 0.6rem 0;
}

.focus-input {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.focus-input::before {
  content: "";
  display: block;
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;

  background: #74b0e9;
}

.input:focus + .focus-input::before {
  width: 100%;
}

.has-val.input + .focus-input::before {
  width: 100%;
}

.rating-wrapper {
  margin-top: .5rem;
  overflow: auto;
  height: 132px;
}

.error {
  visibility: hidden;
  color: red;
  margin: .1rem;
}

.is-invalid {
  color: red;
}

.visible {
  visibility: visible;
}

.btn-block {
  display: flex;
  justify-content: space-between;
}

.btn {
  border: none;
  background: #3c3c3c;
  font-size: 16px;
  padding: .5rem 1rem;
  color: #999;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  color: #74b0e9;
  background: #404040;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #4c4c4c;
  cursor: pointer;
}

::-webkit-scrollbar-thumb {
  background: #74b0e9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #5588b3;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}

.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}

@media (max-width: 1200px) {
  .container {
    max-width: 1140px;
  }

  .title {
    font-size: 28px;
    margin: .5rem 0;
  }

  .text {
    font-size: 15px;
  }

  .blue-text {
    font-size: 14px;
  }

  .group {
    margin-bottom: .5rem;
  }

  .error {
    font-size: 12px;
  }

  input.input {
    font-size: 15px;
  }

  .label-input {
    font-size: 14px;
  }

  .btn {
    font-size: 14px;
  }
}

@media (max-width: 992px) {
  .container {
    max-width: 960px;
  }

  input.input {
    padding: .2rem 0;
  }

  .btn {
    font-size: 12px;
    padding: .5rem;
  }
}

@media (max-width: 768px) {
  .container {
    max-width: none;
  }

  body {
    overflow: auto;
  }

  .left {
    display: none;
  }

  .right {
    width: 100%;
  }

  .title {
    font-size: 40px;
  }

  .blue-text {
    font-size: 18px;
  }

  .btn {
    font-size: 12px;
  }
}

@media (max-width: 540px) {
  .btn {
    font-size: 12px;
    padding: .4rem .6rem;
  }
}
</style>
