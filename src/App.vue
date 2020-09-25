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

$blue: #7fdfd4;
$orange: #fbac91;
$yellow: #fbe1b6;
$purple: #bc7fdf;

.color-blue {
  color:$blue;
}
.bg-color-blue {
  background: $blue;
}
.curve-blue {
  .stroke {
    stroke: $blue;
  }
  .point {
    fill: $blue;
    stroke: $blue;
  }
}
.color-yellow {
  color: $yellow;
}
.bg-color-yellow {
  background: $yellow;
}
.curve-yellow {
  .stroke {
    stroke: $yellow;
  }
  .point {
    fill: $yellow;
    stroke: $yellow;
  }
}
.color-orange {
  color: $orange;
}
.bg-color-orange {
  background: $orange;
}
.curve-orange {
  .stroke {
    stroke: $orange;
  }
  .point {
    fill: $orange;
    stroke: $orange;
  }
}
.color-purple {
  color: $purple;
}
.bg-color-purple {
  background: $purple;
}
.curve-purple {
  .stroke {
    stroke: $purple;
  }
  .point {
    fill: $purple;
    stroke: $purple;
  }
}

// Tooltip Styling
.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, .1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}
</style>
