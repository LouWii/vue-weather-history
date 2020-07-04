<template>
  <div class="stations-climate-normals">
    <h3>Climate Normals</h3>
    <loading/>
    <div v-if="!isFetchingData" class="data-display-container">
      <data-tops/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import DataTops from './DataTops'
import Loading from './Loading'

export default {
  name: 'StationsClimateNormals',
  components: {DataTops, Loading},
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