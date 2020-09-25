<template>
  <div class="data-chart">
    <div class="head">
      <h3>{{ title }}</h3>
    </div>
    <div class="chart-container">
      <trend-chart
        :datasets="dataSets"
        :grid="grid"
        :labels="labels"
        :min="min"
        :interactive="true"
        ref="chart"
        @mouse-move="onMouseOver"/>
      <div :class="['chart-tooltip', {'is-active': tooltipData}]" ref="tooltip">
        <table class="stats" v-if="tooltipData">
          <tr class="stat" v-for="(item, index) in tooltipData.data" :key="index">
            <td class="title"><strong><station-name :station="getStationByIndex(index)"/>:</strong></td>
            <td class="value">{{item}} {{unit}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import {createPopper} from '@popperjs/core'
import {getClimateNormalsUnitsFromDataType} from '../../extra/meteostat'
import StationName from '../StationName'

export default {
  name: 'DataChart',
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
      tooltipData: null,
      tooltip: null,
      elChart: null,
      elChartRef: null,
      elTooltip: null,
    }
  },
  beforeMount() {
    const tempDataSets = []
    // Gather all data
    this.stations.forEach(function(station, idx) {
      const stationData = this.getStationClimateNormals(station.id)
      const colorClass = 'curve-' + this.getStationColor(station.id)
      const stationClass = 'station-' + station.id
      const dataSet = {
        data: [],
        className: `${colorClass} ${stationClass} curve${idx}`,
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
  mounted() {
    this.elChart = this.$refs.chart.$el
    this.elChartRef = this.elChart.querySelector('.active-line')
    this.elTooltip = this.$refs.tooltip
  },
  computed: {
    ...mapState(['focusedStation', 'stations', 'stationsClimateNormals']),
    ...mapGetters(['getStation', 'getStationByIndex', 'getStationClimateNormals', 'getStationColor']),
    unit: function() {
      return getClimateNormalsUnitsFromDataType(this.dataId)
    }
  },
  methods: {
    onMouseOver(params) {
      this.tooltipData = params || null
      createPopper(this.elChartRef, this.elTooltip, {
        placement: 'right',
        modifiers: [
          {
            name: 'preventOverflow',
            options: {
              boundary: this.elChart
            },
          },
          {
            name: 'offset',
            options: {
              offset: [0, 20],
            },
          },
        ]
      })
    },
  },
  watch: {
    focusedStation() {
      console.log(this.elChart)
      this.elChart.querySelectorAll('.curve').forEach(el => el.classList.remove('focused'))
      this.elChart.querySelector('.curve.station-' + this.focusedStation).classList.add('focused')
    }
  }
}
</script>

<style lang="scss">
.data-chart {
  .chart-container {
    height: 280px;
  }

  .curve {
    .stroke {
      stroke-width: 2;
    }

    &.focused {
      .stroke {
        stroke-width: 4;
      }
    }
  }

  .chart-tooltip {
    &:not(.is-active) {
      display: none;
    }

    padding: 10px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    pointer-events: none;

    .stats {
      width: 100%;
      .title {
        text-align: right;
      }
      .value {
        text-align: left;
      }
    }

    &-data {
      display: flex;
      &-item {
        display: flex;
        align-items: center;
        &:not(:first-child) {
          margin-left: 20px;
        }
        &:before {
          content: "";
          display: block;
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
        &--1:before {
          background: #fbac91;
        }
        &--2:before {
          background: #fbe1b6;
        }
        &--3:before {
          background: #7fdfd4;
        }
      }
    }
  }
}
</style>