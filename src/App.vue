<template>
  <div id="app">
    <h1>Vue Weather History</h1>
    <key-init v-if="!apiKey"/>
    <add-station/>
    <stations-list/>
    <period-select/>
    <stations-climate-normals v-if="showStationsClimateNormals"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AddStation from './components/AddStation'
import KeyInit from './components/KeyInit.vue'
import PeriodSelect from './components/PeriodSelect'
import StationsClimateNormals from './components/StationsClimateNormals'
import StationsList from './components/StationsList'

export default {
  name: 'App',
  components: {
    AddStation,
    KeyInit,
    PeriodSelect,
    StationsClimateNormals,
    StationsList,
  },
  computed: {
    ...mapState(['apiKey', 'periodType']),
    showStationsClimateNormals: function() {
      return 'climate-normals' === this.periodType
    },
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
