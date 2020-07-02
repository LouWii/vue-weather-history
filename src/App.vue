<template>
  <div id="app">
    <h1>Vue Weather History</h1>
    <key-init v-if="!apiKey"/>
    <add-station/>
    <stations-list/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AddStation from './components/AddStation'
import KeyInit from './components/KeyInit.vue'
import StationsList from './components/StationsList'

export default {
  name: 'App',
  components: {
    AddStation,
    KeyInit,
    StationsList,
  },
  computed: {
    ...mapState(['apiKey']),
  },
  beforeCreate: function() {
    this.$store.commit('initializeFromLocalStorage')
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
