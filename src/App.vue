<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <router-view />
</template>

<script>
import { mapActions } from 'vuex'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: { HelloWorld },
  mounted() {
    this.getMenuItems()
  },
  methods: {
    ...mapActions('navigationStore', ['getMenuItems'])
  }
}
</script>

<style>
</style>
