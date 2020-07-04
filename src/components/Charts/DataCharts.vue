<template>
  <div class="data-charts">
    <data-chart title="Precipitations" dataId="prcp"/>
  </div>
</template>

<script>
import DataChart from './DataChart'

export default {
  name: 'DataCharts',
  components: {DataChart}
}
</script>