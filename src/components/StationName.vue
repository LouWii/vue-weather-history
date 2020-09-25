<template>
  <span
    :class="[{focused: isFocusedStation(station.id)}, stationColorClass, 'station-name']"
    v-on:mouseenter="onMouseEnter"
    v-on:mouseleave="onMouseLeave">
    {{ stationName }}
  </span>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'StationName',
  props: {
    station: {
      required: true,
      type: Object,
    },
  },
  computed: {
    ...mapGetters(['getStationColor', 'isFocusedStation']),
    stationColorClass() {
      return 'color-' + this.getStationColor(this.station.id)
    },
    stationName() {
      if (this.station.name && this.station.name.en) {
        return this.station.name.en
      }
      return 'no station name'
    },
  },
  methods: {
    ...mapActions(['setFocusedStation']),
    onMouseEnter() {
      this.setFocusedStation(this.station.id)
    },
    onMouseLeave() {
      // TODO: do we unset the focus on leave or not?
    }
  }
}
</script>

<style lang="scss">
.station-name {
  &.focused {
    font-weight: bolder;
  }
}
</style>