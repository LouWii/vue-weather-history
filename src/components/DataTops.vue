<template>
  <div class="data-tops">
    <data-top title="Precipitations" dataId="prcp" units="mm"/>
    <data-top title="Sunshine" dataId="tsun" units="hours"/>
    <data-top title="Avg Min Temp" dataId="tmin" units="°C" topType="min"/>
    <data-top title="Avg Max Temp" dataId="tmax" units="°C" topType="max"/>
  </div>
</template>

<script>
import DataTop from './DataTop'

export default {
  name: 'DataTops',
  components: {DataTop},
}
</script>

<style lang="scss">
.data-tops {
  display: flex;

  .data-top {
    width: 25%;
  }
}
</style>