<template>
  <div class="stations-climate-normals">
    <h3>Climate Normals</h3>
    <loading/>
    <div v-if="!isFetchingData" class="data-display-container">
      <data-tops/>
      <data-charts/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import DataCharts from './Charts/DataCharts'
import DataTops from './DataTops'
import Loading from './Loading'

export default {
  name: 'StationsClimateNormals',
  components: {DataCharts, DataTops, Loading},
  beforeMount: function() {
    this.fetchAllClimateNormals()
  },
  computed: {
    ...mapGetters(['isFetchingData']),
  },
  methods: {
    ...mapActions(['fetchAllClimateNormals'])
  },
}
</script>