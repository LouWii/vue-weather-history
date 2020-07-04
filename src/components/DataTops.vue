<template>
  <div class="data-tops">
    <data-top title="Precipitations" dataId="prcp" units="mm"/>
  </div>
</template>

<script>
import DataTop from './DataTop'

export default {
  name: 'DataTops',
  components: {DataTop},
}
</script>