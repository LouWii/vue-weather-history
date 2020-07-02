<template>
  <div class="stations-list">
    <div class="stations-container">
        <stations-list-item v-for="(station, index) in stations" :key="index" :station="station" />
    </div>
    <div class="actions">
      <button @click.prevent="onAddStation">Add more</button>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import StationsListItem from './StationsListItem'

export default {
  name: 'StationsList',
  components: {StationsListItem},
  computed: {
    ...mapState(['stations']),
  },
  methods: {
    ...mapActions(['triggerAddStationPane']),
    onAddStation() {
      this.triggerAddStationPane(true)
    }
  }
}
</script>