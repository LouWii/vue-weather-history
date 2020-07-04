<template>
  <div v-if="isFetchingData" class="loading">
    Loading data...
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Loading',
  computed: {
    ...mapGetters(['isFetchingData'])
  }
}
</script>