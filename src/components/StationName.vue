<template>
  <span>{{ stationName }}</span>
</template>

<script>
export default {
  name: 'StationName',
  props: {
    station: {
      required: true,
      type: Object,
    },
  },
  computed: {
    stationName: function() {
      if (this.station.name && this.station.name.en) {
        return this.station.name.en
      }
      return 'no station name'
    }
  },
}
</script>