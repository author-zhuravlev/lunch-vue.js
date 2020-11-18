<template>
  <div class="btn-block">
    <button
      type="submit"
      :class="`btn ${ btnClass }`"
    >
      {{ btnText.submit }}
    </button>
    <button
      type="button"
      class="btn"
      v-on:click="toggleForm"
    >
      {{ btnText.toggle }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    toggleForm: {
      type: Function
    },
    btnClass: {
      type: String
    },
    btnText: {
      type: Object,
      default() {
        return {
          submit: 'Submit',
          toggle: 'Toggle form?'
        };
      }
    }
  },
  name: 'AuthButtons'
}
</script>
