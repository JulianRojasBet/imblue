<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapActions('main', { setOnline: 'setOnline' }),
    setNetStatus: function () {
      this.setOnline(window.navigator.onLine)
    }
  },
  created () {
    window.addEventListener('online', this.setNetStatus)
    window.addEventListener('offline', this.setNetStatus)
  },
}
</script>
