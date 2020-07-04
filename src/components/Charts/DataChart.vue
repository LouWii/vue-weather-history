<template>
  <div class="data-chart">
    <div class="head">
      <h3>{{ title }}</h3>
    </div>
    <div class="chart-container">
      <trend-chart :datasets="dataSets" :grid="grid" :labels="labels" :min="min"/>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
  name: 'DataChart',
  props: {
    dataId: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      dataSets: [],
      grid: {
        verticalLines: true,
        horizontalLines: true
      },
      labels: {
        xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        yLabels: 5
      },
      min: 0,
    }
  },
  beforeMount() {
    const tempDataSets = []
    // Gather all data
    this.stations.forEach(function(station, idx) {
      const stationData = this.getStationClimateNormals(station.id)
      const dataSet = {
        data: [],
        className: 'curve' + idx,
        showPoints: true,
        smooth: false,
        fill: false,
      }

      if (stationData) {
        stationData.data.forEach(function(d) {
          if (null !== d[this.dataId]) {
            // stationTopValue.isMissing = false
            // stationTopValue.value += d[this.dataId]
            dataSet.data.push(d[this.dataId])
          } else {
            // stationTopValue.isComplete = false
            console.warn('Data missing for station ' + station.id)
          }
        }.bind(this))
      } else {
        // stationTopValue.isSet = false
      }

      tempDataSets.push(dataSet)
    }.bind(this))

    this.dataSets = tempDataSets
  },
  computed: {
    ...mapState(['stations', 'stationsClimateNormals']),
    ...mapGetters(['getStation', 'getStationClimateNormals']),
  },
}
</script>

<style lang="scss">
.data-chart {
  .chart-container {
    height: 280px;
  }

  .curve1 {
    .stroke {
      stroke: #fbac91;
      stroke-width: 2;
    }
    .point {
      fill: #fbac91;
      stroke: #fbac91;
    }
  }
  .curve2 {
    .stroke {
      stroke: #fbe1b6;
      stroke-width: 2;
    }
    .point {
      fill: #fbe1b6;
      stroke: #fbe1b6;
    }
  }
  .curve3 {
    .stroke {
      stroke: #7fdfd4;
      stroke-width: 2;
    }
    .point {
      fill: #7fdfd4;
      stroke: #7fdfd4;
    }
  }
}
</style>