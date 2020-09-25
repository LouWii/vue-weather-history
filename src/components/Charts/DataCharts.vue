<template>
  <div class="data-charts">
    <data-chart title="Precipitations" dataId="prcp"/>
    <data-chart title="Sunshine Time" dataId="tsun"/>
    <data-chart title="Max Temp" dataId="tmax"/>
    <data-chart title="Min Temp" dataId="tmin"/>
  </div>
</template>

<script>
import DataChart from './DataChart'

export default {
  name: 'DataCharts',
  components: {DataChart}
}
</script>