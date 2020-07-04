<template>
  <div class="data-top">
    <div class="head">
      <h4>{{title}}</h4>
    </div>
    <div class="top-container">
      <ul>
        <li v-for="top in topData" :key="top.stationId">
          <station-name :station="getStation(top.stationId)" />: {{ top.value }} {{ units }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import StationName from './StationName'

export default {
  name: 'DataTop',
  components: {StationName},
  props: {
    dataId: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    units: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      topData: []
    }
  },
  beforeMount() {
    const stationsData = []
    // Gather all data
    this.stations.forEach(function(station) {
      console.log(station.id)
      const stationData = this.getStationClimateNormals(station.id)
      const stationTopValue = {
        stationId: station.id,
        isComplete: true,
        isSet: true,
        value: 0,
      }
      console.log(stationTopValue)
      if (stationData) {
        stationData.data.forEach(function(d) {
          if (null !== d[this.dataId]) {
            stationTopValue.value += d[this.dataId]
          } else {
            stationTopValue.isComplete = false
          }
        }.bind(this))
      } else {
        stationTopValue.isSet = false
      }

      stationsData.push(stationTopValue)
    }.bind(this))

    console.log(stationsData)
    this.topData = stationsData.sort((a, b) => a.value < b.value)
  },
  computed: {
    ...mapState(['stations', 'stationsClimateNormals']),
    ...mapGetters(['getStation', 'getStationClimateNormals']),
  },
}
</script>