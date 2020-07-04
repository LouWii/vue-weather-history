<template>
  <div class="data-top">
    <div class="head">
      <h4>{{title}}</h4>
    </div>
    <div class="top-container">
      <ul>
        <li v-for="top in topData" :key="top.stationId">
          <station-name :station="getStation(top.stationId)" />:
          <span v-if="top.isMissing">
            ~ <span v-tooltip="'Data Missing'">?</span>
          </span>
          <span v-else>
            <span v-if="!top.isComplete">~</span>
            {{ top.value }} {{ units }}
            <span v-if="!top.isComplete" v-tooltip="'Incomplete Data'">?</span>
          </span>
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
    topType: {
      type: String,
      default: 'total',
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
      const stationData = this.getStationClimateNormals(station.id)
      let defaultValue = 0
      if (this.topType == 'min') {
        defaultValue = Number.MAX_SAFE_INTEGER
      } else if (this.topType == 'max') {
        defaultValue = Number.NEGATIVE_INFINITY
      }
      const stationTopValue = {
        stationId: station.id,
        isComplete: true, // Got all values
        isMissing: true, // Got no values at all for this specific measurement
        isSet: true, // Got no data at all
        value: defaultValue,
      }

      if (stationData) {
        stationData.data.forEach(function(d) {
          if (null !== d[this.dataId]) {
            stationTopValue.isMissing = false
            if (this.topType === 'total') {
              stationTopValue.value += d[this.dataId]
            } else if (this.topType === 'min') {
              if (stationTopValue.value > d[this.dataId]) {
                stationTopValue.value =  d[this.dataId]
              }
            } else if (this.topType === 'max') {
              if (stationTopValue.value < d[this.dataId]) {
                stationTopValue.value =  d[this.dataId]
              }
            }
          } else {
            stationTopValue.isComplete = false
          }
        }.bind(this))
      } else {
        stationTopValue.isSet = false
      }

      stationsData.push(stationTopValue)
    }.bind(this))

    if (this.topType == 'min') {
      this.topData = stationsData.sort((a, b) => a.value > b.value)
    } else {
      this.topData = stationsData.sort((a, b) => a.value < b.value)
    }
  },
  computed: {
    ...mapState(['stations', 'stationsClimateNormals']),
    ...mapGetters(['getStation', 'getStationClimateNormals']),
  },
}
</script>